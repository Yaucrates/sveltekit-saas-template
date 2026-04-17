<script lang="ts">
	import { courses } from '$lib/data/courses';
	import CourseCard from '$lib/components/ui/CourseCard.svelte';
</script>

<svelte:head>
	<title>Dashboard - Impart</title>
	<meta name="description" content="Your learning dashboard" />
</svelte:head>

<div class="min-h-screen max-w-6xl mx-auto px-6 md:px-12 py-24">
	<!-- Header -->
	<div class="mb-12">
		<h1 class="text-4xl tracking-tight text-stone-900 mb-2">Dashboard</h1>
		<p class="text-stone-600">Manage your classes.</p>
	</div>

	<!-- Courses Grid -->
	<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
		{#each courses.filter(course => course.status === "Released") as course (course.id)}
			<CourseCard {course} location="courses" />
		{/each}
	</div>
</div>
