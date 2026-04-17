import { supabaseAdmin } from '$lib/supabase.server.js';
import { error, redirect } from '@sveltejs/kit';
import { courses } from '$lib/data/courses';
import type { GradeResult } from '$lib/gradescript';

export const load = async ({ params, locals: { user } }) => {
	if (!user) redirect(303, '/login');

	const studentId = params.id;

	// Verify the requesting user is a professor in the same classroom as the student
	const { data: profMembership } = await supabaseAdmin
		.from('classroom_students')
		.select('classroom_id, user_role')
		.eq('user_id', user.id)
		.eq('user_role', 'professor')
		.limit(1)
		.single();

	if (!profMembership) error(403, 'Only professors can view student grades');

	const { data: studentMembership } = await supabaseAdmin
		.from('classroom_students')
		.select('classroom_id')
		.eq('user_id', studentId)
		.eq('classroom_id', profMembership.classroom_id)
		.limit(1)
		.single();

	if (!studentMembership) error(404, 'Student not found in your classroom');

	// Get the student's email
	const { data: studentUser } = await supabaseAdmin.auth.admin.getUserById(studentId);
	const studentEmail = studentUser.user?.email ?? studentId;

	// Gather all submission IDs across all released courses
	const releasedCourses = courses.filter(c => c.status === 'Released' && c.assignments.length > 0);

	const allSubmissionIds = releasedCourses.flatMap(c =>
		c.assignments.map(a => a.submissionId).filter((id): id is string => !!id)
	);

	if (allSubmissionIds.length === 0) {
		return { studentEmail, courses: releasedCourses, submissions: {} };
	}

	// Fetch all of this student's submissions using admin (bypasses RLS)
	const { data, error: dbError } = await supabaseAdmin
		.from('submissions')
		.select('assignment_id, results')
		.eq('user_id', studentId)
		.in('assignment_id', allSubmissionIds)
		.order('created_at', { ascending: false });

	if (dbError) {
		console.error('Failed to fetch student submissions:', dbError);
		return { studentEmail, courses: releasedCourses, submissions: {} };
	}

	const submissions: Record<string, GradeResult> = {};
	for (const row of data) {
		if (!submissions[row.assignment_id]) {
			submissions[row.assignment_id] = row.results as unknown as GradeResult;
		}
	}

	return { studentEmail, courses: releasedCourses, submissions };
};
