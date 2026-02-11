<script lang="ts">
	import { toLink } from '$lib/utils';
	import { BookOpen, CircleCheck, CirclePlay } from '@lucide/svelte';
	import { getDetailedCourse } from '$lib/data/courses';
	import { page } from '$app/state';
	import Textbook from '$lib/components/ui/Textbook.svelte';

	// Get the course slug from the URL parameter
	const courseSlug = $derived(page.params.overview ?? '');

	// Load course data client-side
	const course = $derived(getDetailedCourse(courseSlug));
	const sections = $derived(course?.details?.sections ?? []);
	const chapters = $derived(course?.details?.chapters ?? []);

	const totalChapters = $derived(chapters.length);
</script>

<svelte:head>
	<title>{course?.title ?? 'Course'} | Impart</title>
	<meta name="description" content={course?.description ?? ''} />
</svelte:head>

{#if !course}
	<div class="w-full min-h-screen bg-stone-50">
		<div class="max-w-4xl mx-auto px-6 py-24 text-center">
			<h1 class="text-4xl font-bold mb-4 text-stone-900">Course Not Found</h1>
			<p class="text-stone-600 mb-8">
				The course you're looking for doesn't exist or hasn't been released yet.
			</p>
			<a href="/dashboard" class="text-blue-600 hover:underline">
				Return to Dashboard
			</a>
		</div>
	</div>
{:else}
	<div class="w-full min-h-screen bg-stone-50">
		<!-- Hero Section -->
		<div class="max-w-7xl mx-auto px-6 py-12 lg:py-20">
			<div class="grid lg:grid-cols-2 gap-12 items-start">

				<div class="flex flex-col gap-6">
					<Textbook courseTitle={course.title} description={course.description} />
				</div>

				<!-- Right Column: Course Info & CTA -->
				<div class="order-1 lg:order-2 flex flex-col gap-6">
					<h1 class="text-3xl lg:text-4xl font-extrabold leading-tight tracking-tight text-stone-900">
						{course.title}
					</h1>

					<p class="text-stone-600 leading-relaxed">
						{course.description}
					</p>

					<!-- Free Course Card -->
					<div class="bg-white border border-stone-200 rounded-2xl p-6 lg:p-8 shadow-lg">
						<div class="flex flex-col gap-6">
							<div class="flex items-baseline gap-2">
								<span class="text-5xl font-black text-blue-600">Free</span>
								<span class="text-stone-500 font-medium">Full course access</span>
							</div>

							<ul class="space-y-3">
								{#each ['Lifetime access to all videos', 'Source code & exercise files', 'Certificate of completion', 'Future course updates'] as benefit}
									<li class="flex items-center gap-3 text-sm text-stone-600">
										<CircleCheck class="text-blue-600 w-5 h-5" />
										{benefit}
									</li>
								{/each}
							</ul>

							<a href="#content" class="w-full py-4 px-6 text-center text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all">
								Get Started
							</a>
						</div>
					</div>
                    <!-- Course Meta -->
					<div class="flex flex-col gap-4 py-6 border-y border-stone-200">
						<!-- Chapter Count -->
						<div class="flex items-center gap-3 text-stone-600">
							<div class="p-2 bg-stone-100 rounded-lg text-blue-600">
								<BookOpen class="w-5 h-5" />
							</div>
							<span class="text-sm">Curriculum: <strong class="text-stone-900 ml-1">{totalChapters} Chapters</strong></span>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Course Content -->
		<div id="content" class="max-w-7xl mx-auto px-6 py-16 scroll-m-20">
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
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
{/if}
