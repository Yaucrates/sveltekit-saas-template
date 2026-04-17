import { error } from '@sveltejs/kit';
import { getDetailedCourse } from '$lib/data/courses';

export function load({ url }) {
	const courseSlug = url.pathname.split('/')[2];
	const course = getDetailedCourse(courseSlug);
	if (!course) error(404, 'Course not found');
	return { course };
}
