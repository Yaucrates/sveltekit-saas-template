<script lang="ts">
	import NavigationBar from '$lib/components/Navigation/NavigationBar.svelte'; 
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props(); 
</script>

<div class="h-screen flex bg-stone-50 text-stone-900 overflow-hidden">
	<NavigationBar />

    <div class="min-h-screen flex-1 overflow-y-auto scroll-smooth w-full">
        {@render children()}

        <Footer />
    </div>
</div>