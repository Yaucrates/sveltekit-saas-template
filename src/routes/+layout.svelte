<!-- src/routes/+layout.svelte -->
<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavigationBar from '$lib/components/Navigation/NavigationBar.svelte'; 
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props(); 
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="h-screen flex bg-stone-50 font-sans text-stone-900 overflow-hidden">
	<NavigationBar />

    <div class="min-h-screen flex-1 overflow-y-auto scroll-smooth w-full">
        {@render children()}

        <Footer />
    </div>
</div>
