<script lang="ts">
	import { Award, Trophy, Lock, CircleCheck, Clock } from '@lucide/svelte';
	import { toLink } from '$lib/utils';
	import type { GradeResult } from '$lib/gradescript';

	let { data } = $props();
	const course = $derived(data.course);
	const assignments = $derived(course.assignments);
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

	const assignmentGrades = $derived(
		assignments.map(a => {
			const result = a.submissionId ? submissions[a.submissionId] ?? null : null;
			const percentage = result ? parseScoreToPercentage(result.score) : null;
			return { assignment: a, result, percentage };
		})
	);

	const completedAssignments = $derived(
		assignmentGrades.filter(g => g.result !== null).length
	);

	const totalAssignments = $derived(assignments.length);

	const averageGrade = $derived.by(() => {
		const graded = assignmentGrades.filter(g => g.percentage !== null);
		if (graded.length === 0) return null;
		const sum = graded.reduce((acc, g) => acc + g.percentage!, 0);
		return Math.round(sum / graded.length);
	});

	const standing = $derived.by(() => {
		if (averageGrade === null) return null;
		if (averageGrade >= 90) return 'Excellent';
		if (averageGrade >= 80) return 'Great';
		if (averageGrade >= 70) return 'Good';
		if (averageGrade >= 60) return 'Satisfactory';
		return 'Needs Improvement';
	});
</script>

<svelte:head>
	<title>Grades | {course.title}</title>
</svelte:head>

<div class="min-h-screen w-full bg-stone-50">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:py-20">
		<div
			class="mb-8 flex flex-col justify-center gap-4 border-b border-stone-200 pb-6 text-stone-900"
		>
			<h1 class="text-3xl font-semibold tracking-tight lg:text-4xl">Grades</h1>
			<p class="mt-1 text-stone-500">Track your progress and performance across assignments</p>
		</div>

		<!-- Dashboard / Stats Cards -->
		<div class="mb-12 grid grid-cols-1 gap-6 md:grid-cols-3">
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Current Grade
				</span>
				<div class="flex items-baseline gap-2">
					<span class="text-4xl font-bold text-stone-900">{averageGrade ?? '--'}</span>
					<span class="font-medium text-stone-500">%</span>
				</div>
			</div>
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Assignments Completed
				</span>
				<div class="flex items-baseline gap-2">
					<span class="text-4xl font-bold text-stone-900">{completedAssignments}</span>
					<span class="font-medium text-stone-500">/ {totalAssignments}</span>
				</div>
			</div>
			<div class="flex flex-col gap-2 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
				<span class="text-sm font-semibold tracking-widest text-stone-400 uppercase">
					Course Standing
				</span>
				<div class="mt-1 flex items-center gap-2">
					<Trophy class="h-8 w-8 {standing ? 'text-amber-500' : 'text-stone-300'}" />
					<span class="text-lg font-medium {standing ? 'text-stone-900' : 'text-stone-500'}">
						{standing ?? 'Not available'}
					</span>
				</div>
			</div>
		</div>

		<!-- Grades Table -->
		<div class="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
			{#if assignments.length === 0}
				<!-- Empty State -->
				<div class="px-6 py-20 text-center">
					<div
						class="mx-auto mb-4 w-fit rounded-full border border-stone-100 bg-stone-50 p-4 text-stone-400"
					>
						<Award class="h-8 w-8" />
					</div>
					<h3 class="mb-2 text-xl font-medium text-stone-900">No Grades Yet</h3>
					<p class="mx-auto max-w-md text-stone-500">
						You haven't received any grades for this course yet. Complete assignments to see your
						progress here.
					</p>
				</div>
			{:else}
				<!-- Table Header -->
				<div class="grid grid-cols-12 gap-4 border-b border-stone-100 bg-stone-50/50 px-6 py-4 text-xs font-semibold tracking-wider text-stone-500 uppercase">
					<div class="col-span-6 sm:col-span-5">Assignment</div>
					<div class="hidden sm:col-span-3 sm:block">Section</div>
					<div class="col-span-3 text-center sm:col-span-2">Status</div>
					<div class="col-span-3 text-right sm:col-span-2">Score</div>
				</div>

				<!-- Table Body -->
				<div class="flex flex-col divide-y divide-stone-100">
					{#each assignmentGrades as { assignment, result, percentage }}
						<div class="grid grid-cols-12 items-center gap-4 px-6 py-4 transition-colors hover:bg-stone-50/50">
							<!-- Assignment Name & Type -->
							<div class="col-span-6 flex flex-col gap-1 sm:col-span-5">
                                {#if assignment.released}
                                    <a
                                        href="/courses/{toLink(course.title)}/assignments/{assignment.id}-{toLink(assignment.name)}"
                                        class="font-medium text-stone-900 underline decoration-dashed line-clamp-1 w-fit"
                                    >
                                        {assignment.name}
                                    </a>
                                {:else}
                                    <span class="font-medium text-stone-900 line-clamp-1">
                                        {assignment.name}
                                    </span>
                                {/if}
								<span class="text-xs font-medium text-stone-500">{assignment.header}</span>
							</div>

							<!-- Section Name -->
							<div class="hidden text-sm text-stone-500 sm:col-span-3 sm:block line-clamp-1">
								{course.sections[assignment.section].name}
							</div>

							<!-- Status -->
							<div class="col-span-3 text-center sm:col-span-2">
								{#if !assignment.released}
									<span class="inline-flex items-center gap-1 rounded-full bg-stone-50 px-2.5 py-0.5 text-xs font-medium text-stone-400">
										<Lock class="h-3 w-3" />
										Locked
									</span>
								{:else if result}
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

							<!-- Score -->
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
	</div>
</div>
