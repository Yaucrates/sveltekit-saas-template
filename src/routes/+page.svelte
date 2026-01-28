<script lang="ts">
	import { onMount } from "svelte";
	import { setNavigationCollapse } from "$lib/components/Navigation/Navigation.svelte";
	import MeetingCTA from "$lib/components/MeetingCTA.svelte";

	let heroSection: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				const entry = entries[0];
				// true when hero is visible, false when scrolled past
				setNavigationCollapse(!entry.isIntersecting);
			},
			{
				root: null,
				// threshold: 0 means "trigger as soon as even 1 pixel is visible/hidden"
				// You can adjust rootMargin if you want it to trigger slightly earlier
				threshold: 0
			}
		);

		if (heroSection) {
			observer.observe(heroSection);
		}

		return () => {
			if (heroSection) observer.disconnect();
            setNavigationCollapse(true);
		};
	});
</script>

<!-- Hero Section -->
<!-- Added bind:this={heroSection} here -->
<section bind:this={heroSection} class="max-w-6xl mx-auto px-12 py-24">
    <div class="max-w-3xl">
        <h1 class="text-6xl tracking-tighter leading-[1.1] font-normal mb-8 text-stone-900">
            Meet Your All-in-One<br>
            <span class="text-stone-400">Active Learning Platform</span>
        </h1>
        <p class="text-xl text-stone-600 mb-10 leading-relaxed max-w-xl">
            Impart is the easiest way to adopt a complete modern Course. Curriculums, auto-graded assignments, and flipped classroom tools are all built into one interactive platform.
        </p>
        <div class="flex items-center gap-4 mb-20">
            <button class="bg-stone-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-black transition-all">Get Started &rarr;</button>
        </div>
    </div>

    <!-- Hero Image Simulation -->
    <div class="w-full aspect-video bg-[#EBE9E4] rounded-xl p-4 shadow-2xl border border-stone-200 overflow-hidden relative">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <!-- Mock UI Interface -->
        <div class="bg-white w-full h-full rounded-lg shadow-sm border border-stone-200 flex overflow-hidden">
            <div class="w-64 border-r border-stone-100 bg-stone-50 p-4 space-y-3 hidden md:block">
                <div class="h-8 w-full bg-stone-200 rounded animate-pulse"></div>
                <div class="h-4 w-2/3 bg-stone-200 rounded animate-pulse"></div>
                <div class="h-4 w-3/4 bg-stone-200 rounded animate-pulse"></div>
                <div class="h-4 w-1/2 bg-stone-200 rounded animate-pulse"></div>
            </div>
            <div class="flex-1 p-8">
                <div class="flex justify-between mb-8">
                    <div class="h-10 w-1/3 bg-stone-100 rounded"></div>
                    <div class="h-10 w-24 bg-stone-900 rounded-sm"></div>
                </div>
                <div class="grid grid-cols-2 gap-6">
                    <div class="h-40 bg-stone-50 border border-stone-100 rounded-lg p-4"></div>
                    <div class="h-40 bg-stone-50 border border-stone-100 rounded-lg p-4"></div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Social Proof -->
<section class="border-y border-stone-200 bg-white py-12">
    <div class="max-w-6xl mx-auto px-12 flex flex-wrap items-center justify-between text-stone-400 grayscale opacity-70 gap-8">
        <span class="text-sm font-medium text-stone-500">Trusted by educators at</span>
        <span class="font-brand font-bold text-lg tracking-widest">SCHS</span>
        <span class="font-brand font-bold text-lg">UNIVERSITY OF TENNESSEE</span>
        <span class="font-brand font-bold text-lg">MARYVILLE COLLEGE</span>
        <span class="font-brand font-bold text-lg">BELMONT</span>
    </div>
</section>

<!-- Feature 1: Interactive Curriculum -->
<section id="curriculum" class="max-w-6xl mx-auto px-12 py-32 grid md:grid-cols-2 gap-20 items-center">
    <div>
        <h2 class="text-4xl tracking-tight leading-tight mb-6">A complete curriculum<br>with labs and problem sets.</h2>
        <p class="text-lg text-stone-600 leading-relaxed mb-6">
            Impart delivers a fully structured course out of the box.
            From comprehensive lecture materials to challenging problem
            sets and hands-on labs, everything is pre-built so you can
            focus on teaching rather than content creation.
        </p>
    </div>
    <div class="bg-[#EBE9E4] p-6 rounded-xl rotate-1 shadow-xl">
        <!-- Curriculum UI Mock -->
        <div class="bg-white rounded-lg p-4 shadow-sm border border-stone-200">
            <div class="border-b border-stone-100 pb-3 mb-4">
                <div class="text-xs text-stone-400 uppercase tracking-wide mb-1">Chapter 3</div>
                <div class="font-medium text-stone-900">Data Structures & Algorithms</div>
            </div>
            <div class="space-y-3">
                <div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full bg-green-500"></div><div class="text-sm text-stone-600">Arrays and Lists</div></div>
                <div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full bg-green-500"></div><div class="text-sm text-stone-600">Stacks and Queues</div></div>
                <div class="flex items-center gap-3"><div class="w-4 h-4 rounded-full border-2 border-blue-500 bg-blue-50"></div><div class="text-sm text-stone-900 font-medium">Binary Trees</div></div>
                <div class="flex items-center gap-3 opacity-50"><div class="w-4 h-4 rounded-full border border-stone-300"></div><div class="text-sm text-stone-400">Hash Tables</div></div>
            </div>
        </div>
    </div>
</section>

<!-- Feature 2: Automated Grading (Reversed Layout) -->
<section id="automated-grading" class="max-w-6xl mx-auto px-12 py-32 grid md:grid-cols-2 gap-20 items-center">
    <div class="bg-[#D8D5CD] p-6 rounded-xl -rotate-1 shadow-xl order-2 md:order-1">
        <!-- Grading UI Mock -->
        <div class="bg-white rounded-lg p-6 shadow-sm border border-stone-200 text-sm">
            <div class="font-mono text-xs bg-stone-900 text-green-400 p-3 rounded mb-4">
                <div class="text-stone-500">// Student submission</div>
                <div>def fibonacci(n):</div>
                <div class="pl-4">if n {'<='} 1: return n</div>
                <div class="pl-4">return fibonacci(n-1) + fibonacci(n-2)</div>
            </div>
            <div class="p-3 bg-green-50 rounded border border-green-200">
                <div class="flex items-center gap-2 text-green-800 font-medium mb-1">
                    <span>✓</span> All tests passed
                </div>
                <div class="text-xs text-green-700">Correct output for n=0,1,5,10,20. Runtime: 0.03s</div>
            </div>
        </div>
    </div>
    <div class="order-1 md:order-2">
        <h2 class="text-4xl tracking-tight leading-tight mb-6">Instant feedback on every submission. No grading backlog.</h2>
        <p class="text-lg text-stone-600 leading-relaxed">
            Students can submit at anytime and get immediate feedback—not just pass/fail, but hints on edge cases, time complexity insights, and suggestions for improvement.
        </p>
    </div>
</section>

<!-- Classroom Flexibility Section -->
<section id="classroom-format" class="max-w-6xl mx-auto px-12 py-32">
    <div class="text-center mb-16">
        <h2 class="text-4xl tracking-tight leading-tight mb-4">Built for every classroom format</h2>
        <p class="text-lg text-stone-600 max-w-2xl mx-auto">Whether you teach in-person, online, or a blend of both—Impart adapts to how you want to run your course.</p>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
        <!-- Traditional Classroom Card -->
        <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                </svg>
            </div>
            <h3 class="text-xl font-medium mb-3">Traditional Classrooms</h3>
            <p class="text-stone-600 leading-relaxed">Use Impart to supplement your lectures with interactive content. Assign problem sets that reinforce what you taught in class, and use analytics to see who needs extra help before the next session.</p>
        </div>

        <!-- Flipped/Async/Online Card -->
        <div class="bg-white border border-stone-200 rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center mb-6">
                <svg class="w-6 h-6 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
            </div>
            <h3 class="text-xl font-medium mb-3">Flipped, Async & Online</h3>
            <p class="text-stone-600 leading-relaxed">Let students learn at their own pace with self-guided interactive lessons. Automated grading means they get instant feedback without waiting for you—perfect for asynchronous and online courses.</p>
        </div>
    </div>
</section>

<!-- Comparison Section -->
<section id="impart-tooling" class="bg-white py-32 border-y border-stone-200">
    <div class="max-w-6xl mx-auto px-12">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div class="max-w-xl">
                <h2 class="text-4xl tracking-tighter mb-4 text-stone-900">From static lectures to active learning.</h2>
                <p class="text-stone-500 text-lg">Traditional tools were built to distribute information. Impart was built to ensure it’s understood.</p>
            </div>
            <div class="flex gap-4 text-sm font-medium">
                <span class="flex items-center gap-2 text-stone-400">
                    <div class="w-2 h-2 rounded-full bg-stone-300"></div> Traditional
                </span>
                <span class="flex items-center gap-2 text-stone-900">
                    <div class="w-2 h-2 rounded-full bg-blue-500"></div> Impart
                </span>
            </div>
        </div>

        <div class="grid grid-cols-1 divide-y divide-stone-200 border-t border-stone-200">
            <!-- Row 1: Content -->
            <div class="grid md:grid-cols-12 py-10 gap-8">
                <div class="md:col-span-4">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-stone-400">Content Delivery</h4>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-500 leading-relaxed">
                        <span class="block text-stone-900 font-medium mb-1">Static Textbooks</span>
                        Passive reading of PDFs and slide decks. Students "skim" rather than engage, leading to surface-level retention.
                    </p>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-900 leading-relaxed">
                        <span class="block text-blue-500 font-medium mb-1">Interactive Lessons</span>
                        Embedded code sandboxes and visualizations. Students manipulate data as they read, turning theory into practice.
                    </p>
                </div>
            </div>

            <!-- Row 2: Feedback -->
            <div class="grid md:grid-cols-12 py-10 gap-8">
                <div class="md:col-span-4">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-stone-400">Feedback Loop</h4>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-500 leading-relaxed">
                        <span class="block text-stone-900 font-medium mb-1">The Grading Gap</span>
                        Feedback arrives 7–14 days after submission. By the time students see their mistakes, the class has already moved on.
                    </p>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-900 leading-relaxed">
                        <span class="block text-blue-500 font-medium mb-1">Instant Iteration</span>
                        Automated grading guides students so that they can learn from their errors and fix them immediately while the context is still fresh.
                    </p>
                </div>
            </div>

            <!-- Row 3: Standardization -->
            <div class="grid md:grid-cols-12 py-10 gap-8">
                <div class="md:col-span-4">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-stone-400">Course Standardization</h4>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-500 leading-relaxed">
                        <span class="block text-stone-900 font-medium mb-1">Inconsistent Experience</span>
                        Course content varies significantly by instructor, creating knowledge gaps. Prerequisite disconnects (e.g., teaching ARM vs. x86) often leave students unprepared for follow-up courses.
                    </p>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-900 leading-relaxed">
                        <span class="block text-blue-500 font-medium mb-1">Centralized Rigor</span>
                        Unified curriculum management ensures every section meets the same high standards. Courses are tightly synchronized, guaranteeing students have the necessary foundation for advanced topics.
                    </p>
                </div>
            </div>

            <!-- Row 4: Academic Integrity -->
            <div class="grid md:grid-cols-12 py-10 gap-8">
                <div class="md:col-span-4">
                    <h4 class="text-sm font-semibold uppercase tracking-wider text-stone-400">Academic Integrity</h4>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-500 leading-relaxed">
                        <span class="block text-stone-900 font-medium mb-1">The "Cheating" Problem</span>
                        Copy-pasting code is typically undetectable in standard document submissions, leading to academic dishonesty.
                    </p>
                </div>
                <div class="md:col-span-4">
                    <p class="text-stone-900 leading-relaxed">
                        <span class="block text-blue-500 font-medium mb-1">Playback & Detection</span>
                        Impart uses MOSS-style plagiarism detection and coding playback history to catch cheating.
                    </p>
                </div>
            </div>
        </div>
    </div>
</section>

<MeetingCTA />