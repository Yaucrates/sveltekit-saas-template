<script lang="ts">
	import { fade } from 'svelte/transition';
	import ImpartNameLogo from '../logos/ImpartNameLogo.svelte';

	let isOpen = $state(false);

	function toggle() {
		isOpen = !isOpen;
	}

	function close() {
		isOpen = false;
	}
</script>

<!-- Mobile header bar -->
<header class="sm:hidden sticky top-0 z-50 flex items-center justify-between bg-white border-b border-stone-100 px-5 h-14">
	<a href="/" onclick={close}>
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
	<div class="flex-1 flex flex-col justify-center gap-10">
		<div class="gap-3 flex flex-col text-sm">
            <a href="/" class="hover:text-neutral-600 transition-colors">Home</a>
			<a href="/library" onclick={close} class="hover:text-neutral-600 transition-colors">Library</a>
			<a href="/auth/login" onclick={close} class="hover:text-neutral-600 transition-colors">Log In</a>
			<a href="/auth/signup" onclick={close} class="hover:text-neutral-600 transition-colors">Sign Up</a>
		</div>

		<div class="gap-3 flex flex-col text-xs">
			<p class="text-neutral-400 uppercase">Platform</p>
			<a href="/#curriculum" onclick={close} class="text-neutral-500 hover:text-black transition-colors">Course Curriculum</a>
			<a href="/#automated-grading" onclick={close} class="text-neutral-500 hover:text-black transition-colors">Automated Grading</a>
			<a href="/#classroom-format" onclick={close} class="text-neutral-500 hover:text-black transition-colors">Classroom Formats</a>
			<a href="/#impart-tooling" onclick={close} class="text-neutral-500 hover:text-black transition-colors">Impart Tooling</a>
		</div>
	</div>

	<a
		href="https://calendly.com/abdulhusseinyousifh/30min"
		target="_blank"
		rel="noopener noreferrer"
		onclick={close}
		class="block w-full p-3 text-sm text-center bg-black text-white rounded-sm hover:bg-neutral-800 transition-colors"
	>
		Book a Demo
	</a>
</nav>
