<script lang="ts">
    import ImpartNameLogo from '$lib/components/logos/ImpartNameLogo.svelte';
	import Footer from '$lib/components/Navigation/Footer.svelte';

    let { children } = $props();
</script>

<main class="min-h-screen pb-20 flex flex-col items-center">
    {@render children()}
</main>
<Footer />