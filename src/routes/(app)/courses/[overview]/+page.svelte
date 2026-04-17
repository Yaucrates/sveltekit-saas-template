<script lang="ts">
	import { BookOpen, FileCode, Award, RefreshCw } from '@lucide/svelte';
	import { toLink } from '$lib/utils';
	import Textbook from '$lib/components/ui/Textbook.svelte';

	let { data } = $props();
	const course = $derived(data.course);
	const totalChapters = $derived(course.chapters.length + course.assignments.length);
</script>

<svelte:head>
	<title>{course.title} | Impart</title>
	<meta name="description" content={course.description} />
</svelte:head>

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
                <a href="/courses/{toLink(course.title)}/curriculum" class="w-fit py-4 px-10 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors shadow-sm">
                    Start Learning
                </a>
			</div>
		</div>
	</div>
</div>
