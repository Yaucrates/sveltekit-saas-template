<script lang="ts">
	import { toLink } from '$lib/utils';
	import { Lock, ChevronRight, BookOpen } from '@lucide/svelte';

	let { data } = $props();
	const course = $derived(data.course);
	const sections = $derived(course.sections);
	const chapters = $derived(course.chapters);
	const totalChapters = $derived(chapters.length);
	const releasedCount = $derived(chapters.filter((c: { released: boolean }) => c.released).length);
</script>

<svelte:head>
	<title>{course.title} - Chapters | Impart</title>
</svelte:head>

<div class="min-h-screen w-full bg-stone-50">
	<div class="mx-auto max-w-7xl px-6 py-12 lg:py-20">
		<div class="mb-8 flex flex-col justify-center gap-4 border-b border-stone-200 pb-6 text-stone-900">
			<h1 class="text-3xl font-semibold tracking-tight lg:text-4xl">Chapters</h1>
			<p class="mt-1 text-stone-500">
				{releasedCount} of {totalChapters} chapters available &mdash; work through them in order.
			</p>
		</div>

		{#if chapters.length === 0}
			<div class="flex flex-col divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
				<div class="px-6 py-24 text-center">
					<div class="mx-auto mb-4 w-fit rounded-full border border-stone-100 bg-stone-50 p-4 text-stone-400">
						<BookOpen class="h-8 w-8" />
					</div>
					<h3 class="mb-2 text-xl font-medium text-stone-900">No Chapters Yet</h3>
					<p class="mx-auto max-w-md text-stone-500">
						There are currently no chapters available for this course. Check back later as content is released.
					</p>
				</div>
			</div>
		{:else}
			<div class="flex flex-col gap-10">
				{#each sections as section (section.id)}
					{@const sectionChapters = chapters.filter((item: { section: number }) => item.section === section.id)}
					{#if sectionChapters.length > 0}
						<div class="flex flex-col gap-3">
							<div class="flex items-center gap-3 px-1">
								<span class="text-xs font-semibold uppercase tracking-widest text-stone-400">
									{section.name}
								</span>
							</div>

							<div class="flex flex-col divide-y divide-stone-100 overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
								{#each sectionChapters as chapter (chapter.id)}
									{@const globalNumber = chapters.indexOf(chapter) + 1}
									{#if chapter.released}
										<a
											href="/courses/{toLink(course.title)}/chapters/{chapter.id}-{toLink(chapter.name)}"
											class="group flex items-center gap-5 px-6 py-5 transition-colors duration-200 hover:bg-stone-50"
										>
											<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-sm font-bold text-blue-600 border border-blue-100">
												{globalNumber}
											</span>

											<div class="flex flex-1 flex-col gap-1 min-w-0">
												<div class="flex items-center gap-3">
													<span class="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-stone-500">
														{chapter.header}
													</span>
												</div>
												<h3 class="text-base font-semibold text-stone-900 group-hover:text-blue-600 transition-colors duration-200 truncate">
													{chapter.name}
												</h3>
												<p class="text-sm text-stone-500 leading-relaxed line-clamp-1">
													{chapter.description}
												</p>
											</div>

											<ChevronRight class="h-5 w-5 shrink-0 text-stone-300 transition-colors duration-200 group-hover:text-blue-600" />
										</a>
									{:else}
										<div class="flex items-center gap-5 px-6 py-5 cursor-not-allowed opacity-50">
											<span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-100 text-sm font-bold text-stone-400 border border-stone-200">
												{globalNumber}
											</span>

											<div class="flex flex-1 flex-col gap-1 min-w-0">
												<div class="flex items-center gap-3">
													<span class="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-stone-400">
														{chapter.header}
													</span>
													<span class="flex items-center gap-1 text-xs font-medium text-stone-400">
														<Lock class="h-3.5 w-3.5" />
														Locked
													</span>
												</div>
												<h3 class="text-base font-semibold text-stone-700 truncate">
													{chapter.name}
												</h3>
												<p class="text-sm text-stone-400 leading-relaxed line-clamp-1">
													{chapter.description}
												</p>
											</div>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
		{/if}
	</div>
</div>
