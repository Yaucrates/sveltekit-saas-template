<script lang="ts">
	import NavigationBar from '$lib/components/Navigation/NavigationBar.svelte'; 
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props(); 
</script>

	<NavigationBar />

    <div class="min-h-screen flex-1 overflow-y-auto scroll-smooth w-full">
        {@render children()}

        <Footer />
    </div>
