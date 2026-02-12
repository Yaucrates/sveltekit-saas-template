<script lang="ts">
	import NavigationBar from '$lib/components/Navigation/NavigationBar.svelte'; 
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props(); 
</script>

<svelte:head>
    <meta property="og:title" content="Impart | Digital Courseware" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="/ogImage.png" />
    <meta property="og:url" content="https://www.imparteducation.com/" />
</svelte:head>

<div class="flex bg-stone-50 text-stone-900">
	<NavigationBar />

    <div class="min-h-screen flex-1 scroll-smooth w-full">
        {@render children()}

        <Footer />
    </div>
</div>