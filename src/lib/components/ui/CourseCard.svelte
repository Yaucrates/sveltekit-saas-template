<script lang="ts">
	import type { Course } from '$lib/data/courses';
	import { ArrowRight, Lock } from '@lucide/svelte';

	interface Props {
		course: Course;
	}

	let { course }: Props = $props();

	// Check if the course is planned
	const isPlanned = $derived(course.status === 'Planned');

	// Category Styling Logic
	const categoryConfig = {
		'core-cs': { label: 'Core CS', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100', iconColor: 'text-blue-600' },
		'mathematics': { label: 'Mathematics', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100', iconColor: 'text-amber-600' },
		'systems': { label: 'Systems', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-100', iconColor: 'text-emerald-600' },
		'theory': { label: 'Theory', bg: 'bg-violet-50', text: 'text-violet-700', border: 'border-violet-100', iconColor: 'text-violet-600' }
	};

	const theme = $derived(categoryConfig[course.category] || categoryConfig['core-cs']);
</script>

<!-- 
	Dynamic Classes:
	- If Planned: Opacity is lower, grayscale filter, cursor not-allowed, no hover effects.
	- If Released: Standard hover shadows, lift effects, and pointer cursor.
-->
<div 
	class={`
		relative border rounded-xl p-6 flex flex-col h-full transition-all duration-300
		${isPlanned 
			? 'bg-stone-50 border-stone-200 opacity-60 grayscale cursor-not-allowed' 
			: 'bg-white border-stone-200 shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer group'
		}
	`}
>
	
	<!-- Header: Icon & Category Badge -->
	<div class="flex justify-between items-start mb-6">
		<div class={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${theme.bg}`}>
			<course.icon class={`w-6 h-6 ${theme.iconColor}`} />
		</div>
		<span class={`text-xs font-semibold px-2.5 py-1 rounded-full border ${theme.bg} ${theme.text} ${theme.border} uppercase tracking-wide`}>
			{theme.label}
		</span>
	</div>

	<!-- Content -->
	<div class="flex-1">
		<h3 class={`text-xl font-medium mb-3 transition-colors ${isPlanned ? 'text-stone-600' : 'text-stone-900 group-hover:text-black'}`}>
			{course.title}
		</h3>
		<p class="text-sm text-stone-500 leading-relaxed mb-6">
			{course.description}
		</p>
	</div>

	<!-- Footer / CTA -->
	<div class="mt-auto pt-6 border-t border-stone-100 flex items-center text-sm font-medium transition-colors">
		{#if isPlanned}
			<!-- Planned State Footer -->
			<div class="text-stone-400 flex items-center">
				<Lock class="w-4 h-4 mr-2" />
				Coming Soon
			</div>
		{:else}
			<!-- Released State Footer -->
			<div class="text-stone-900 group-hover:text-blue-600 flex items-center w-full">
				View Syllabus 
				<ArrowRight class="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
			</div>
		{/if}
	</div>
</div>