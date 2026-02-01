<script lang="ts">
	import ImpartNameLogo from '$lib/components/logos/ImpartNameLogo.svelte';
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props();
</script>

<div class="min-h-screen bg-stone-50 flex flex-col">
	<header class="py-8 px-12">
		<a href="/" class="inline-block hover:opacity-80 transition-opacity">
			<ImpartNameLogo />
		</a>
	</header>

	<main class="flex-1 flex items-center justify-center">
		{@render children()}
	</main>

	<Footer />
</div>