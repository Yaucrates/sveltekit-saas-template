<script lang="ts">
	import ImpartNameLogo from "../logos/ImpartNameLogo.svelte";
	import { getNavigationCollapse } from "./Navigation.svelte";

	let isHovered = $state(false);

	let isExpanded = $derived(!getNavigationCollapse() || isHovered);
</script>

<aside
	class="
        flex flex-col justify-between bg-white border-r border-stone-100 
        overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        {isExpanded ? 'w-56' : 'w-20'}
    "
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- Header / Logo Area -->
	<div class="relative h-24 w-full shrink-0">
		<a href="/"
			class="
                absolute left-8 top-6 origin-left transition-all duration-300
                {isExpanded
				? 'opacity-100 translate-x-0 scale-100 delay-100'
				: 'opacity-0 -translate-x-4 scale-95 pointer-events-none'}
            "
		>
			<ImpartNameLogo />
		</a>

		<h1
			class="
                font-brand text-3xl leading-tighter absolute left-1/2 top-6 -translate-x-1/2
                transition-all duration-300 origin-center
                {isExpanded
				? 'opacity-0 scale-50 pointer-events-none'
				: 'opacity-100 scale-100 delay-100'}
            "
		>
			I
		</h1>
	</div>

	<!-- Navigation Items & CTA -->
	<div
		class="
            flex-1 flex flex-col px-8 pb-6
            transition-all duration-300
            {isExpanded ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}
        "
	>
		<nav class="flex-1 flex flex-col justify-center gap-10 w-full">
			<div class="gap-3 flex flex-col text-sm whitespace-nowrap">
				<!-- <a href="/resources" class="hover:text-neutral-600 transition-colors">Resources</a> -->
				<a href="/auth/login" class="hover:text-neutral-600 transition-colors">Log In</a>
				<a href="/auth/signup" class="hover:text-neutral-600 transition-colors">Sign Up</a>
			</div>

			<div class="gap-3 flex flex-col text-xs whitespace-nowrap">
				<p class="text-neutral-400 uppercase">Platform</p>
				<a href="/#curriculum" class="text-neutral-500 hover:text-black transition-colors"
					>Course Curriculum</a
				>
				<a href="/#automated-grading" class="text-neutral-500 hover:text-black transition-colors"
					>Automated Grading</a
				>
				<a href="/#classroom-format" class="text-neutral-500 hover:text-black transition-colors"
					>Classroom Formats</a
				>
				<a href="/#impart-tooling" class="text-neutral-500 hover:text-black transition-colors"
					>Impart Tooling</a
				>
			</div>
		</nav>

		<a
			href="/"
			class="
                block w-full p-3 text-sm text-center bg-black text-white 
                rounded-sm hover:bg-neutral-800 transition-colors whitespace-nowrap
            "
		>
			Book a Demo
		</a>
	</div>
</aside>