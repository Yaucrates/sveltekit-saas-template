<script lang="ts">
	import { FileText, Lock, ChevronRight } from '@lucide/svelte';
	import { toLink } from '$lib/utils';

	let { data } = $props();
	const course = $derived(data.course);
	const assignments = $derived(course.assignments);
</script>

<svelte:head>
	<title>Assignments | {course.title}</title>
</svelte:head>

<div class="min-h-screen w-full bg-stone-50">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:py-20">
		<div class="mb-8 flex flex-col justify-center gap-4 border-b border-stone-200 pb-6 text-stone-900">
			<h1 class="text-3xl font-semibold tracking-tight lg:text-4xl">Assignments</h1>
			<p class="mt-1 text-stone-500">View and manage all course coursework and deadlines</p>
		</div>

		<!-- Assignments List -->
		<div class="flex flex-col divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
			{#if assignments.length === 0}
				<!-- Empty State -->
				<div class="px-6 py-24 text-center">
					<div class="mx-auto mb-4 w-fit rounded-full border border-stone-100 bg-stone-50 p-4 text-stone-400">
						<FileText class="h-8 w-8" />
					</div>
					<h3 class="mb-2 text-xl font-medium text-stone-900">No Assignments Yet</h3>
					<p class="mx-auto max-w-md text-stone-500">
						There are currently no assignments available for this course. Check back later as the
						course progresses.
					</p>
				</div>
			{:else}
				{#each assignments as assignment}
					{#if assignment.released}
                        <a
                            href="/courses/{toLink(course.title)}/assignments/{assignment.id}-{toLink(assignment.name)}"
                            class="group flex flex-col justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center transition-colors hover:bg-stone-50 duration-300"
                        >
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center gap-3">
                                    <span class="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600">
                                        {assignment.header}
                                    </span>
                                    <span class="text-sm font-medium text-stone-500">
                                        {course.sections[assignment.section].name}
                                    </span>
                                </div>

                                <h3 class="text-lg font-semibold text-stone-900">
                                    {assignment.name}
                                </h3>

                                <p class="max-w-3xl text-sm leading-relaxed text-stone-500 line-clamp-2">
                                    {assignment.description}
                                </p>
                            </div>

                            <div class="shrink-0 pt-2 sm:pt-0">
                                <ChevronRight class="h-5 w-5 text-stone-400 transition-colors group-hover:text-stone-900" />
                            </div>
                        </a>
                    {:else}
                        <div class="group flex flex-col justify-between gap-4 px-6 py-6 sm:flex-row sm:items-center transition-colors hover:bg-stone-50 duration-300 cursor-not-allowed">
                            <div class="flex flex-col gap-2">
                                <div class="flex items-center gap-3">
                                    <span class="rounded-md bg-stone-100 px-2.5 py-1 text-xs font-semibold text-stone-600">
                                        {assignment.header}
                                    </span>
                                    <span class="text-sm font-medium text-stone-500">
                                        {course.sections[assignment.section].name}
                                    </span>
                                    <span class="flex items-center gap-1 text-xs font-medium text-stone-400">
                                        <Lock class="h-3.5 w-3.5" />
                                        Locked
                                    </span>
                                </div>

                                <h3 class="text-lg font-semibold text-stone-900">
                                    {assignment.name}
                                </h3>

                                <p class="max-w-3xl text-sm leading-relaxed text-stone-500 line-clamp-2">
                                    {assignment.description}
                                </p>
                            </div>
                        </div>
                    {/if}
				{/each}
			{/if}
		</div>
	</div>
</div>
