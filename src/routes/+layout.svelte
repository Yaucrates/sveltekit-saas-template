<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// Adjust import path based on where you put the component
	import NavigationBar from '$lib/components/NavigationBar.svelte'; 

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen flex bg-stone-50 font-sans text-stone-900 overflow-hidden">
	<NavigationBar />

	<main class="flex-1 overflow-y-auto scroll-smooth">
		{@render children()}
	</main>
</div>
