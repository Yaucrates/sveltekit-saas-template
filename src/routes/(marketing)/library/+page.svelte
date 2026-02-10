<script lang="ts">
	import { categories, courses } from '$lib/data/courses';
	import CourseCard from '$lib/components/ui/CourseCard.svelte';
	import { Search } from '@lucide/svelte';

	let searchQuery = $state('');
	let selectedCategory = $state('all');

	// Derived state for filtering
	let filteredCourses = $derived(
		courses.filter((course) => {
			const matchesSearch =
				course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
				course.description.toLowerCase().includes(searchQuery.toLowerCase());
			
			const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;

			return matchesSearch && matchesCategory;
		})
	);
</script>

<svelte:head>
	<title>Computer Science Courseware | Impart</title>
	<meta name="description" content="Explore our comprehensive Computer Science Courseware." />
</svelte:head>

<!-- Hero Section with Texture -->
<section class="relative bg-stone-50 border-b border-stone-200 overflow-hidden">
	<!-- Subtle Background Texture -->
	<div class="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] pointer-events-none"></div>
	
	<div class="max-w-6xl mx-auto px-6 md:px-12 py-24 relative z-10">
		<div class="max-w-2xl">
			<div class="text-sm font-semibold tracking-widest text-blue-600 uppercase mb-4">Curriculum Catalog</div>
			<h1 class="text-5xl md:text-6xl tracking-tighter leading-[1.1] font-medium mb-6 text-stone-900">
				Browse the<br>
				<span class="text-stone-400">Knowledge Base.</span>
			</h1>
			<p class="text-lg text-stone-600 leading-relaxed max-w-lg">
				A structured path from "Hello World" to Machine Learning. 
				Explore courseware designed for modern classes.
			</p>
		</div>
	</div>
</section>

<!-- Controls & Grid Section -->
<section class="max-w-6xl mx-auto px-6 md:px-12 py-12 pb-32 min-h-150">
	
	<!-- Filter Bar -->
	<div class="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
		<!-- Category Tabs -->
		<div class="flex flex-wrap justify-center gap-2 p-1.5 bg-stone-100/50 rounded-xl border border-stone-200/60">
			{#each categories as category}
				<button
					onclick={() => selectedCategory = category.id}
					class="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 {selectedCategory === category.id ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-700 hover:bg-stone-200/50'}"
				>
					{category.label}
				</button>
			{/each}
		</div>

		<!-- Search Input -->
		<div class="relative w-full md:w-72 group">
			<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
				<Search class="h-4 w-4 text-stone-400 group-focus-within:text-blue-500 transition-colors" />
			</div>
			<input
				type="text"
				bind:value={searchQuery}
				placeholder="Search courses..."
				class="block w-full pl-10 pr-3 py-2.5 bg-white border border-stone-200 rounded-lg leading-5 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm"
			/>
		</div>
	</div>

	<!-- Results Grid -->
	{#if filteredCourses.length > 0}
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
			{#each filteredCourses as course (course.id)}
				<CourseCard {course} location="library" />
			{/each}
		</div>
	{:else}
		<!-- Empty State -->
		<div class="py-24 text-center">
			<div class="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<Search class="w-8 h-8 text-stone-400" />
			</div>
			<h3 class="text-lg font-medium text-stone-900 mb-2">No courses found</h3>
			<p class="text-stone-500 max-w-sm mx-auto">
				We couldn't find any courses matching "{searchQuery}" in the {selectedCategory === 'all' ? 'catalog' : 'category'}.
			</p>
			<button 
				onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}
				class="mt-6 text-blue-600 font-medium hover:underline"
			>
				Clear filters
			</button>
		</div>
	{/if}
</section>
