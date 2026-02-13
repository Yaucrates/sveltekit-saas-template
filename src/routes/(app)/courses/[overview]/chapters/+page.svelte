<script lang="ts">
	import { toLink } from '$lib/utils';
	import { CirclePlay } from '@lucide/svelte';
	import { getDetailedCourse } from '$lib/data/courses';
	import { page } from '$app/state';

	const courseSlug = $derived(page.params.overview ?? '');
	const course = $derived(getDetailedCourse(courseSlug));
	const sections = $derived(course?.details?.sections ?? []);
	const chapters = $derived(course?.details?.chapters ?? []);
	const totalChapters = $derived(chapters.length);
</script>

<svelte:head>
	<title>{course?.title ?? 'Course'} - Chapters | Impart</title>
</svelte:head>

{#if course}
	<div class="w-full min-h-screen bg-stone-50">
		<div class="max-w-7xl mx-auto px-6 py-16">
			<div class="flex flex-col gap-12">
				<div class="flex flex-col gap-2">
					<h2 class="text-3xl font-extrabold text-stone-900">Course Curriculum</h2>
					<p class="text-stone-500">
						{totalChapters} chapters are available now.
					</p>
				</div>

				<div class="flex flex-col gap-16">
					{#each sections as section (section.section)}
						<div class="flex flex-col gap-8">
							<div class="flex items-center gap-4">
								<h3 class="text-xl font-bold text-stone-900">{section.name}</h3>
								<div class="flex-1 h-px bg-linear-to-r from-blue-500/20 to-transparent"></div>
							</div>

							<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
								{#each chapters.filter(chapter => chapter.section === section.section) as chapter (chapter.id)}
									{#if chapter.released}
										<a
											href="/courses/{toLink(course.title)}/{chapter.id}-{toLink(chapter.name)}"
											class="group relative flex flex-col gap-4 p-6 bg-white hover:bg-stone-50 rounded-xl transition-all border border-stone-200 hover:border-blue-500/50 shadow-sm hover:shadow-lg hover:-translate-y-1"
										>
											<div class="flex flex-col gap-3 flex-1">
												<div class="flex items-start justify-between gap-3">
													<h4 class="font-bold text-lg text-stone-900 group-hover:text-blue-600 transition-colors">
														{chapter.name}
													</h4>
													<CirclePlay class="w-5 h-5 shrink-0 text-stone-400 group-hover:text-blue-600 transition-colors" />
												</div>
												<p class="text-sm text-stone-600 leading-relaxed">
													{chapter.description}
												</p>
											</div>
											<span class="w-fit py-1 px-3 text-[10px] font-bold bg-blue-50 text-blue-700 rounded border border-blue-200 uppercase tracking-widest">
												{chapter.header}
											</span>
										</a>
									{:else}
										<div
											class="relative flex flex-col gap-4 p-6 bg-stone-50 rounded-xl border border-stone-200 opacity-60 cursor-default"
										>
											<div class="flex flex-col gap-3 flex-1">
												<div class="flex items-start justify-between gap-3">
													<h4 class="font-bold text-lg text-stone-900">
														{chapter.name}
													</h4>
													<CirclePlay class="w-5 h-5 shrink-0 text-stone-300" />
												</div>
												<p class="text-sm text-stone-600 leading-relaxed">
													{chapter.description}
												</p>
											</div>
											<span class="w-fit py-1 px-3 text-[10px] font-bold bg-stone-100 text-stone-500 rounded border border-stone-200 uppercase tracking-widest">
												Coming Soon
											</span>
										</div>
									{/if}
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
