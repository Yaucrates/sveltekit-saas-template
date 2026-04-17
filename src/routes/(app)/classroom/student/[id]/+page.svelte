<script lang="ts">
	import { Award, Trophy, CircleCheck, Clock, ArrowLeft } from '@lucide/svelte';
	import type { GradeResult } from '$lib/gradescript';
	import type { Course } from '$lib/data/courses';

	let { data } = $props();
	const studentEmail = $derived(data.studentEmail);
	const courses = $derived(data.courses as Course[]);
	const submissions = $derived(data.submissions as Record<string, GradeResult>);

	function parseScoreToPercentage(score: string): number {
		if (score.includes('/')) {
			const [num, den] = score.split('/').map(Number);
			if (den === 0 || isNaN(num) || isNaN(den)) return 0;
			return Math.round((num / den) * 100);
		}
		if (score.endsWith('%')) {
			const val = parseFloat(score);
			return isNaN(val) ? 0 : Math.round(val);
		}
		return 0;
	}

	const courseGrades = $derived(
		courses.map(course => {
			const assignmentGrades = course.assignments.map(a => {
				const result = a.submissionId ? submissions[a.submissionId] ?? null : null;
				const percentage = result ? parseScoreToPercentage(result.score) : null;
				return { assignment: a, result, percentage };
			});

			const graded = assignmentGrades.filter(g => g.percentage !== null);
			const average = graded.length > 0
				? Math.round(graded.reduce((acc, g) => acc + g.percentage!, 0) / graded.length)
				: null;
			const completed = graded.length;

			return { course, assignmentGrades, average, completed };
		})
	);

	const overallAverage = $derived.by(() => {
		const allGraded = courseGrades.flatMap(c => c.assignmentGrades).filter(g => g.percentage !== null);
		if (allGraded.length === 0) return null;
		return Math.round(allGraded.reduce((acc, g) => acc + g.percentage!, 0) / allGraded.length);
	});

	const totalCompleted = $derived(courseGrades.reduce((acc, c) => acc + c.completed, 0));
	const totalAssignments = $derived(courseGrades.reduce((acc, c) => acc + c.course.assignments.length, 0));

	const standing = $derived.by(() => {
		if (overallAverage === null) return null;
		if (overallAverage >= 90) return 'Excellent';
		if (overallAverage >= 80) return 'Great';
		if (overallAverage >= 70) return 'Good';
		if (overallAverage >= 60) return 'Satisfactory';
		return 'Needs Improvement';
	});
</script>

<svelte:head>
	<title>Grades — {studentEmail}</title>
</svelte:head>

<div class="min-h-screen w-full bg-stone-50">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:py-20">
		<a href="/classroom" class="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors">
			<ArrowLeft class="h-4 w-4" />
			Back to Classroom
		</a>

		<div class="mb-8 flex flex-col justify-center gap-4 border-b border-stone-200 pb-6 text-stone-900">
			<h1 class="text-3xl font-semibold tracking-tight lg:text-4xl">Student Grades</h1>
			<p class="mt-1 text-stone-500">{studentEmail}</p>
		</div>

		<!-- Dashboard / Stats Cards -->
		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Overall Grade
				</span>
				<div class="flex items-baseline gap-2">
					<span class="text-4xl font-bold text-stone-900">{overallAverage ?? '--'}</span>
					<span class="font-medium text-stone-500">%</span>
				</div>
			</div>
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Assignments Completed
				</span>
				<div class="flex items-baseline gap-2">
					<span class="text-4xl font-bold text-stone-900">{totalCompleted}</span>
					<span class="font-medium text-stone-500">/ {totalAssignments}</span>
				</div>
			</div>
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Standing
				</span>
				<div class="mt-1 flex items-center gap-2">
					<Trophy class="h-8 w-8 {standing ? 'text-amber-500' : 'text-stone-300'}" />
					<span class="text-lg font-medium {standing ? 'text-stone-900' : 'text-stone-500'}">
						{standing ?? 'Not available'}
					</span>
				</div>
			</div>
		</div>

		<!-- Grades by Course -->
		{#each courseGrades as { course, assignmentGrades, average, completed } (course.id)}
			<div class="mb-8 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
				<!-- Course Header -->
				<div class="flex items-center justify-between border-b border-stone-100 bg-stone-50/50 px-6 py-4">
					<h2 class="text-lg font-semibold text-stone-900">{course.title}</h2>
					{#if average !== null}
						<span class="text-sm font-medium text-stone-600">
							Avg: {average}% &middot; {completed}/{course.assignments.length} completed
						</span>
					{:else}
						<span class="text-sm text-stone-400">No submissions</span>
					{/if}
				</div>

				{#if course.assignments.length === 0}
					<div class="px-6 py-12 text-center">
						<div class="mx-auto mb-4 w-fit rounded-full border border-stone-100 bg-stone-50 p-4 text-stone-400">
							<Award class="h-8 w-8" />
						</div>
						<p class="text-stone-500">No assignments in this course</p>
					</div>
				{:else}
					<!-- Table Header -->
					<div class="grid grid-cols-12 gap-4 border-b border-stone-100 px-6 py-3 text-xs font-semibold tracking-wider text-stone-500 uppercase">
						<div class="col-span-6 sm:col-span-5">Assignment</div>
						<div class="hidden sm:col-span-3 sm:block">Section</div>
						<div class="col-span-3 text-center sm:col-span-2">Status</div>
						<div class="col-span-3 text-right sm:col-span-2">Score</div>
					</div>

					<!-- Table Body -->
					<div class="flex flex-col divide-y divide-stone-100">
						{#each assignmentGrades as { assignment, result, percentage } (assignment.id)}
							<div class="grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-stone-50/50">
								<div class="col-span-6 flex flex-col gap-1 sm:col-span-5">
									<span class="font-medium text-stone-900 line-clamp-1">{assignment.name}</span>
									<span class="text-xs font-medium text-stone-500">{assignment.header}</span>
								</div>

								<div class="hidden text-sm text-stone-500 sm:col-span-3 sm:block line-clamp-1">
									{course.sections[assignment.section].name}
								</div>

								<div class="col-span-3 text-center sm:col-span-2">
									{#if result}
										<span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
											<CircleCheck class="h-3 w-3" />
											Graded
										</span>
									{:else}
										<span class="inline-flex items-center gap-1 rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-medium text-stone-600">
											<Clock class="h-3 w-3" />
											Pending
										</span>
									{/if}
								</div>

								<div class="col-span-3 text-right font-medium sm:col-span-2">
									{#if percentage !== null}
										<span class="text-stone-900">{percentage}</span>
										<span class="text-xs font-normal text-stone-400">/ 100</span>
									{:else}
										<span class="text-stone-400">--</span>
										<span class="text-xs font-normal text-stone-400">/ 100</span>
									{/if}
								</div>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>
