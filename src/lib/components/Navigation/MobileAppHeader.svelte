<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import ImpartNameLogo from '../logos/ImpartNameLogo.svelte';
	import { LayoutDashboard, Settings, CircleQuestionMark } from '@lucide/svelte';

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}

	function isActive(path: string) {
		return page.url.pathname === path;
	}
</script>

<!-- Mobile header bar -->
<header class="sm:hidden sticky top-0 z-50 flex items-center justify-between bg-white border-b border-stone-100 px-5 h-14">
	<a href="/dashboard" onclick={close}>
		<ImpartNameLogo />
	</a>

	<button onclick={toggle} class="relative z-50 w-8 h-8 flex flex-col items-center justify-center gap-1.5" aria-label="Toggle menu">
		<span class="block h-0.5 w-5 bg-stone-900 transition-all duration-300 {isOpen ? 'translate-y-1 rotate-45' : ''}"></span>
		<span class="block h-0.5 w-5 bg-stone-900 transition-all duration-300 {isOpen ? '-translate-y-1 -rotate-45' : ''}"></span>
	</button>
</header>

<!-- Overlay -->
{#if isOpen}
	<button
		type="button"
		class="sm:hidden fixed inset-0 z-40 bg-black/20 backdrop-blur-sm border-none cursor-default"
		onclick={close}
		aria-label="Close menu"
		transition:fade={{ duration: 200 }}
	></button>
{/if}

<!-- Slide-out drawer -->
<nav
	class="
		sm:hidden fixed top-0 right-0 z-40 h-full w-64 bg-white shadow-lg
		flex flex-col pt-20 px-8 pb-6
		transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]
		{isOpen ? 'translate-x-0' : 'translate-x-full'}
	"
>
	<div class="flex-1 flex flex-col gap-3 text-sm">
		<a
			href="/dashboard"
			onclick={close}
			class="flex items-center gap-2 p-2 rounded-sm transition-colors duration-200
				{isActive('/dashboard') ? 'bg-blue-50 text-blue-700' : 'hover:bg-stone-100 text-stone-700'}"
		>
			<LayoutDashboard size={18} />
			Dashboard
		</a>

		<a
			href="/settings"
			onclick={close}
			class="flex items-center gap-2 p-2 rounded-sm transition-colors duration-200
				{isActive('/settings') ? 'bg-blue-50 text-blue-700' : 'hover:bg-stone-100 text-stone-700'}"
		>
			<Settings size={18} />
			Settings
		</a>
	</div>

	<button
		onclick={() => { window.location.href = 'mailto:support@imparteducation.com'; close(); }}
		class="flex items-center gap-2 p-2 rounded-sm w-full text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-colors duration-200 cursor-pointer"
	>
		<CircleQuestionMark size={14} />
		<span class="text-sm">Request Support</span>
	</button>
</nav>
