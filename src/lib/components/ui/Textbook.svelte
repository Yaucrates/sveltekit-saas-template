<script lang="ts">
	import ImpartNameLogo from '$lib/components/logos/ImpartNameLogo.svelte';

	interface Props {
		courseTitle: string;
		description: string;
		class?: string;
	}

	let { 
		courseTitle, 
		description,
		class: className = '' 
	}: Props = $props();
</script>

<div
	class="bg-blue-600 rounded-3xl shadow-2xl p-10 lg:p-16 flex flex-col min-h-125 lg:min-h-175 relative overflow-hidden text-white {className}"
>
	<!-- Decorative Background Shapes -->
	<!-- Large bottom-right blob -->
	<div
		class="absolute -bottom-20 -right-20 w-[120%] h-[60%] bg-blue-400 opacity-50 rounded-[100%_0%_40%_60%] rotate-12"
	></div>
	<!-- Medium overlapping blob -->
	<div
		class="absolute -bottom-10 -left-10 w-[80%] h-[50%] bg-blue-300 opacity-40 rounded-[60%_40%_0%_100%] -rotate-6"
	></div>
    <!-- Smaller bottom-left blob -->
	<div
		class="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-500 opacity-60 rounded-tr-[100%]"
	></div>

	<!-- Logo in top-left -->
	<div class="relative z-10 mb-20">
		<!-- Assuming ImpartNameLogo can be styled white via CSS or props -->
		<div class="brightness-0 invert">
			<ImpartNameLogo />
		</div>
	</div>

	<!-- Left-aligned content -->
	<div class="relative z-10 mt-auto flex flex-col items-start text-left gap-4 max-w-2xl">
		<p class="text-lg lg:text-xl font-medium opacity-90 tracking-tight">
			Impart Digital Textbook
		</p>
		
		<h1 class="text-3xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
			{courseTitle}
		</h1>

		{#if description}
			<p class="opacity-80 mt-4 leading-relaxed max-w-md">
				{description}
			</p>
		{/if}
	</div>
</div>

<style>
	/* Optional: Add a specific brand font if you have one */
	h1 {
		font-family: 'Inter', system-ui, sans-serif;
	}
</style>