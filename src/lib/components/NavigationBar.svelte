<!-- src/lib/components/Sidebar.svelte -->
<aside class="px-8 py-6 w-56 flex flex-col justify-between bg-white border-r border-stone-100">
	<a href="/" class="font-brand text-4xl leading-tighter">Impart</a>

	<nav class="flex flex-col gap-10">
		<div class="gap-3 flex flex-col text-sm">
			<a href="/" class="hover:text-neutral-600 transition-colors">Mission</a>
			<a href="/" class="hover:text-neutral-600 transition-colors">Resources</a>
			<a href="/" class="hover:text-neutral-600 transition-colors">Sign In</a>
		</div>

		<div class="gap-3 flex flex-col text-xs">
			<p class="text-neutral-400 uppercase">Platform</p>
			<a href="/#curriculum" class="text-neutral-500 hover:text-black transition-colors">Course Curriculum</a>
			<a href="/#automated-grading" class="text-neutral-500 hover:text-black transition-colors">Automated Grading</a>
			<a href="/#classroom-format" class="text-neutral-500 hover:text-black transition-colors">Classroom Formats</a>
			<a href="/#impart-tooling" class="text-neutral-500 hover:text-black transition-colors">Impart Tooling</a>
		</div>
	</nav>

	<a href="/" class="p-3 text-sm text-center bg-black text-white font-light rounded-sm hover:bg-neutral-800 transition-colors">
		Book a Demo
	</a>
</aside>