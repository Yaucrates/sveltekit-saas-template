import { error } from '@sveltejs/kit';
import { getDetailedCourse } from '$lib/data/courses';

export function load({ params }) {
	const course = getDetailedCourse(params.overview);
	if (!course) error(404, 'Course not found');
	return { course };
}
