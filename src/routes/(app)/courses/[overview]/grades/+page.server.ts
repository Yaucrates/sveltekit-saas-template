import { getDetailedCourse } from '$lib/data/courses';
import type { GradeResult } from '$lib/gradescript';

export const load = async ({ params, locals }: import('./$types').PageServerLoadEvent) => {
	const { supabase, user } = locals;

	if (!user) {
		return { submissions: {} as Record<string, GradeResult> };
	}

	const course = getDetailedCourse(params.overview);
	if (!course) {
		return { submissions: {} as Record<string, GradeResult> };
	}

	const submissionIds = course.assignments
		.map(a => a.submissionId)
		.filter((id): id is string => !!id);

	if (submissionIds.length === 0) {
		return { submissions: {} as Record<string, GradeResult> };
	}

	const { data, error } = await supabase
		.from('submissions')
		.select('assignment_id, results')
		.eq('user_id', user.id)
		.in('assignment_id', submissionIds)
		.order('created_at', { ascending: false });

	if (error) {
		console.error('Failed to fetch submissions for grades:', error);
		return { submissions: {} as Record<string, GradeResult> };
	}

	const submissions: Record<string, GradeResult> = {};
	for (const row of data) {
		if (!submissions[row.assignment_id]) {
			submissions[row.assignment_id] = row.results as unknown as GradeResult;
		}
	}

	return { submissions };
};
