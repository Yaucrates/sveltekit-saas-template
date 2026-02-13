<script lang="ts">
	import { BookOpen, FileCode, Award, RefreshCw } from '@lucide/svelte';
	import { getDetailedCourse } from '$lib/data/courses';
	import { page } from '$app/state';
	import Textbook from '$lib/components/ui/Textbook.svelte';

	// Get the course slug from the URL parameter
	const courseSlug = $derived(page.params.overview ?? '');

	// Load course data client-side
	const course = $derived(getDetailedCourse(courseSlug));
	const totalChapters = $derived(course?.details?.chapters.length ?? 0);
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
					<span class="w-fit py-1.5 px-4 text-xs font-medium uppercase tracking-widest text-blue-700 bg-blue-50 rounded-full border border-blue-200">
						Open Access Resource
					</span>

					<h1 class="text-4xl lg:text-5xl font-base leading-[1.1] tracking-tight text-stone-900">
						{course.title}
					</h1>

					<p class="text-lg text-stone-600 leading-relaxed">
						{course.description}
					</p>

					<!-- Course Meta Grid -->
					<div class="border-y border-stone-200 py-8">
						<div class="grid grid-cols-2 gap-y-8 gap-x-6">
							<div class="flex items-center gap-4">
								<div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
									<BookOpen class="w-5 h-5" />
								</div>
								<div class="flex flex-col">
									<span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Curriculum</span>
									<span class="text-stone-900">{totalChapters} Chapters</span>
								</div>
							</div>

							<div class="flex items-center gap-4">
								<div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
									<FileCode class="w-5 h-5" />
								</div>
								<div class="flex flex-col">
									<span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Resources</span>
									<span class="text-stone-900">Source Files Included</span>
								</div>
							</div>

							<div class="flex items-center gap-4">
								<div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
									<Award class="w-5 h-5" />
								</div>
								<div class="flex flex-col">
									<span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Recognition</span>
									<span class="text-stone-900">Certificate Provided</span>
								</div>
							</div>

							<div class="flex items-center gap-4">
								<div class="p-2.5 bg-blue-50 rounded-xl text-blue-600 border border-blue-100">
									<RefreshCw class="w-5 h-5" />
								</div>
								<div class="flex flex-col">
									<span class="text-xs font-semibold uppercase tracking-widest text-stone-400">Updates</span>
									<span class="text-stone-900">Always Current</span>
								</div>
							</div>
						</div>
					</div>

					<!-- CTA -->
                    <a href="/courses/{courseSlug}/chapters" class="w-fit py-4 px-10 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm">
                        Start Learning
                    </a>
				</div>
			</div>
		</div>
	</div>
{/if}
