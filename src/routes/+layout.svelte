<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	// Adjust import path based on where you put the component
	import Sidebar from '$lib/components/Sidebar.svelte'; 

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<!-- App Shell Container -->
<div class="h-screen flex bg-stone-50 font-sans text-stone-900 overflow-hidden">
	
	<!-- Reusable Sidebar -->
	<Sidebar />

	<!-- Main Content Area (Scrollable) -->
	<main class="flex-1 overflow-y-auto scroll-smooth">
		{@render children()}
	</main>

</div>
