<script lang="ts">
	import { page } from '$app/state';
	import AppSidebar from '$lib/components/Navigation/AppSidebar.svelte';
	import MobileAppHeader from '$lib/components/Navigation/MobileAppHeader.svelte';
	import Footer from '$lib/components/Navigation/Footer.svelte';

	let { children } = $props();

	const isCoursePage = $derived(page.url.pathname.startsWith('/courses/'));
</script>

<div class="flex flex-col sm:flex-row bg-stone-50 text-stone-900">
	{#if !isCoursePage}
		<MobileAppHeader />
	{/if}
	<AppSidebar />

	<div class="min-h-screen flex-1 scroll-smooth w-full">
		{@render children()}

        <Footer />
	</div>
</div>
