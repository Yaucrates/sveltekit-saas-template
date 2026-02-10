<script lang="ts">
	import MeetingCTA from "$lib/components/MeetingCTA.svelte";
	import { 
		GraduationCap, CircleCheck,
		Terminal, BookOpen, Users,
        LayoutTemplate, FileStack
	} from "@lucide/svelte";

    const curriculum = [
        {
            title: "Getting Started",
            description: "An introduction to the nature of computation. Topics include setting up the development environment, understanding the difference between source code and compiled executables, and identifying syntax versus logic errors."
        },
        {
            title: "Variables, Operators, and Functions",
            description: "Foundational programming concepts covering basic data types (integers, floats, booleans) and arithmetic expressions. This module introduces the concept of decomposition by creating basic functions to perform reusable calculations."
        },
        {
            title: "Conditionals and Iteration",
            description: "Mastering control flow using branching logic (if/else) and repetition (for/while loops). Concepts are applied visually through digital image processing tasks, such as manipulating RGB values and drawing geometric shapes on screen."
        },
        {
            title: "Number Systems and Bitwise Logic",
            description: "A look at the hardware level of computing. Topics include converting between Binary, Decimal, and Hexadecimal systems, Boolean algebra, and manipulating data at the bit-level using bitwise operators."
        },
        {
            title: "More Functions, Scoping, and Abstraction",
            description: "A deeper dive into abstraction and problem-solving. Topics include 'black-box' function design, understanding variable scope, and writing good code."
        },
        {
            title: "Data Structures and Mutability",
            description: "Managing collections of data using Lists, Tuples, Vectors, and Dictionaries (Hash Maps). A strong emphasis is placed on memory concepts, specifically the difference between mutable and immutable types, aliasing, and deep cloning."
        },
        {
            title: "Algorithms, Efficiency, and Testing",
            description: "Introduction to the formal analysis of programs using 'Big O' notation. Topics include searching algorithms (Linear vs. Bisection/Binary search), sorting (Merge/Selection sort), and validating code using Doctests and unit testing."
        },
        {
            title: "Object Oriented Programming",
            description: "Transitioning from procedural to object-based design. Students will learn to define custom Classes, manage state through Objects, enforce encapsulation, and utilize Inheritance to share behavior between classes."
        },
        {
            title: "Libraries and Exceptions",
            description: "Leveraging external code and managing runtime errors. This module covers importing standard modules, utilizing Jupyter notebooks, and handling program crashes gracefully using Try/Except blocks and assertions."
        },
        {
            title: "Working with Files and I/O",
            description: "Techniques for data persistence and user interaction. Students will write programs that parse text files, process command-line arguments, and format output streams for both the console and external storage."
        },
        {
            title: "Project Submission and Course Completion",
            description: "Final synthesis of all course topics. Students will submit a comprehensive final project demonstrating mastery of algorithms, data structures, and clean coding practices, followed by a final exam or review."
        },
    ].map((module, i) => ({ unit: i, ...module }));
</script>

<svelte:head>
	<title>Introduction to Computer Science | Impart Courseware</title>
	<meta name="description" content="A comprehensive introduction to computer science curriculum for Professors." />
</svelte:head>

<!-- Hero Section -->
<section class="max-w-6xl mx-auto px-6 md:px-12 py-16 md:py-24">
	<div class="grid lg:grid-cols-2 gap-16 items-center">
		<!-- Left: Copy -->
		<div>
			<div class="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6 border border-blue-200">
				<GraduationCap class="w-4 h-4" />
				<span class="text-sm font-medium">Standardized Curriculum</span>
			</div>

			<h1 class="text-4xl md:text-6xl tracking-tighter leading-[1.1] font-normal mb-6 text-stone-900">
				Introduction to <br />
				<span class="text-stone-400">Computer Science</span>
			</h1>
			
			<p class="text-lg text-stone-600 mb-8 leading-relaxed">
				The complete "CS101" experience. Replace your textbook with an affordable high quality online instructional content shown to improve grades and save time.
			</p>

			<div class="flex flex-col sm:flex-row gap-4 mb-12">
				<a href="" class="bg-stone-900 text-white px-8 py-3 rounded-sm font-medium hover:bg-black transition-all text-center">
					Get Evaluation Access
				</a>
				<a href="#syllabus" class="flex items-center justify-center gap-2 text-stone-600 hover:text-stone-900 font-medium transition-colors border border-stone-200 px-8 py-3 rounded-sm hover:bg-stone-50">
					<BookOpen class="w-4 h-4" /> View Syllabus
				</a>
			</div>

			<div class="flex items-center gap-6 text-sm text-stone-500 font-medium">
				<div class="flex items-center gap-2">
					<Users class="w-4 h-4" /> 16 Weeks
				</div>
				<div class="flex items-center gap-2">
					<Terminal class="w-4 h-4" /> Python 3
				</div>
			</div>
		</div>

		<!-- Right: Courseware Visual -->
		<div class="relative">
			<div class="absolute -inset-4 bg-linear-to-tr from-blue-50 to-stone-100 rounded-full blur-3xl opacity-60"></div>
			<div class="relative bg-white rounded-xl shadow-2xl border border-stone-200 overflow-hidden">
				<!-- Mock IDE Header -->
				<div class="bg-stone-50 border-b border-stone-200 px-4 py-3 flex items-center justify-between">
					<div class="flex gap-2">
						<div class="w-3 h-3 rounded-full bg-red-400"></div>
						<div class="w-3 h-3 rounded-full bg-amber-400"></div>
						<div class="w-3 h-3 rounded-full bg-green-400"></div>
					</div>
					<div class="text-xs font-mono text-stone-400">factorial.py</div>
				</div>
				
				<!-- Mock IDE Body -->
				<div class="grid grid-cols-12 h-85">
					<!-- Sidebar -->
					<div class="col-span-3 border-r border-stone-100 bg-stone-50/50 p-4 hidden sm:block">
						<div class="space-y-3">
							<div class="h-2 w-16 bg-stone-200 rounded"></div>
							<div class="h-2 w-24 bg-stone-200 rounded"></div>
							<div class="h-2 w-20 bg-stone-200 rounded"></div>
							<div class="mt-8 h-2 w-12 bg-blue-200 rounded"></div>
						</div>
					</div>
					<!-- Editor -->
					<div class="col-span-12 sm:col-span-9 p-6 font-mono text-sm leading-relaxed">
						<div class="text-stone-400 italic mb-2"># Task: Calculate factorial using recursion</div>
						<div class="text-purple-600">def <span class="text-blue-600">factorial</span>(n):</div>
						<div class="pl-4 text-stone-800">
							<span class="text-purple-600">if</span> n &lt;= <span class="text-orange-600">1</span>:
						</div>
						<div class="pl-8 text-stone-800">
							<span class="text-purple-600">return</span> <span class="text-orange-600">1</span>
						</div>
						<div class="pl-4 text-stone-800">
							<span class="text-purple-600">return</span> n * factorial(n - <span class="text-orange-600">1</span>)
						</div>
						<br />
						<div class="text-stone-400 italic mb-2"># Test your code</div>
						<div class="text-stone-800">print(factorial(<span class="text-orange-600">5</span>))</div>
						
						<!-- Output Console -->
						<div class="mt-8 bg-stone-900 rounded p-3 text-green-400 text-xs shadow-inner">
							> Running main.py...<br/>
							> 120<br/>
							> <span class="text-stone-500">Process finished with exit code 0</span>
						</div>
					</div>
				</div>
			</div>
			
			<!-- Floating Badge -->
			<div class="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-xl border border-stone-100 hidden md:block">
				<div class="flex items-center gap-3">
					<div class="bg-green-100 p-2 rounded-full text-green-600">
						<CircleCheck class="w-5 h-5" />
					</div>
					<div>
						<div class="text-xs text-stone-500 uppercase font-bold tracking-wide">Status</div>
						<div class="text-stone-900 font-medium">All Tests Passed</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Stats / Trust -->
<section class="border-y border-stone-200 bg-stone-50 py-12">
	<div class="max-w-6xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
		<div>
			<div class="text-3xl font-light text-stone-900 mb-1">10+</div>
			<div class="text-xs text-stone-500 uppercase tracking-wide">Interactive Labs</div>
		</div>
		<div>
			<div class="text-3xl font-light text-stone-900 mb-1">Beginners and Experienced</div>
			<div class="text-xs text-stone-500 uppercase tracking-wide">Difficulty Level</div>
		</div>
		<div>
			<div class="text-3xl font-light text-stone-900 mb-1">Premade</div>
			<div class="text-xs text-stone-500 uppercase tracking-wide">Exams</div>
		</div>
		<div>
			<div class="text-3xl font-light text-stone-900 mb-1">Automated</div>
			<div class="text-xs text-stone-500 uppercase tracking-wide">Grading and Feedback</div>
		</div>
	</div>
</section>

<!-- Feature Showcase (Targeting Professor Pain Points) -->
<section class="max-w-6xl mx-auto px-6 md:px-12 py-24 space-y-32">

	<!-- Courseware Infrastructure -->
	<div class="grid md:grid-cols-2 gap-12 items-center">
		<!-- Left: Copy -->
		<div>
			<div class="w-12 h-12 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center mb-6">
				<LayoutTemplate class="w-6 h-6" />
			</div>
			<h2 class="text-3xl md:text-4xl tracking-tight mb-4 text-stone-900">
				Complete courseware infrastructure.
			</h2>
			<p class="text-lg text-stone-600 leading-relaxed mb-6">
				We don't just provide content. We provide everything you need to manage your course.
			</p>
			
			<div class="space-y-4">
				<!-- Item 1: Content -->
				<div class="flex gap-4">
					<div class="mt-1 bg-stone-100 p-1.5 rounded-md h-fit text-stone-600">
						<BookOpen class="w-4 h-4" />
					</div>
					<div>
						<h4 class="font-medium text-stone-900">Rigorous Course Content</h4>
						<p class="text-sm text-stone-500 leading-relaxed">
							Access a comprehensive library of interactive readings, video lessons, and modules tailored to your syllabus.
						</p>
					</div>
				</div>

				<!-- Item 2: Course Materials -->
				<div class="flex gap-4">
					<div class="mt-1 bg-stone-100 p-1.5 rounded-md h-fit text-stone-600">
						<FileStack class="w-4 h-4" />
					</div>
					<div>
						<h4 class="font-medium text-stone-900">Exams & Practice Sets</h4>
						<p class="text-sm text-stone-500 leading-relaxed">
							Deploy homework, quizzes, and high-stakes exams instantly from our verified problem banks.
						</p>
					</div>
				</div>

				<!-- Item 3: Automated Grading -->
				<div class="flex gap-4">
					<div class="mt-1 bg-stone-100 p-1.5 rounded-md h-fit text-stone-600">
						<CircleCheck class="w-4 h-4" />
					</div>
					<div>
						<h4 class="font-medium text-stone-900">Automated Grading</h4>
						<p class="text-sm text-stone-500 leading-relaxed">
							Provide instant feedback for students and eliminate manual grading hours with our smart auto-grader.
						</p>
					</div>
				</div>
			</div>
		</div>

		<!-- Right: Dashboard Visual -->
		<div class="relative">
			<!-- Background decorative blob -->
			<div class="absolute -inset-4 bg-amber-50/50 rounded-full blur-3xl opacity-60"></div>
			
			<!-- Main Dashboard Card -->
			<div class="relative bg-white p-6 rounded-xl rotate-1 shadow-xl border border-stone-200">
				<div class="flex items-center justify-between mb-6 border-b border-stone-100 pb-4">
					<div class="flex items-center gap-3">
						<div class="w-8 h-8 rounded bg-stone-100 flex items-center justify-center">
							<Users class="w-4 h-4 text-stone-500" />
						</div>
						<div>
							<div class="text-sm font-bold text-stone-900">CS101: Fall Cohort</div>
							<div class="text-xs text-stone-500">Section A • 142 Students</div>
						</div>
					</div>
					<div class="px-2 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full border border-green-100 flex items-center gap-1">
						<div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> Live
					</div>
				</div>

				<!-- Stats Row -->
				<div class="grid grid-cols-2 gap-4 mb-6">
					<div class="bg-stone-50 p-3 rounded border border-stone-100">
						<div class="text-xs text-stone-500 uppercase tracking-wide mb-1">Avg Grade</div>
						<div class="text-2xl font-light text-stone-900">88.4%</div>
						<div class="text-xs text-green-600 flex items-center gap-1 mt-1">
							↑ 2.1% vs last week
						</div>
					</div>
					<div class="bg-stone-50 p-3 rounded border border-stone-100">
						<div class="text-xs text-stone-500 uppercase tracking-wide mb-1">Submissions</div>
						<div class="text-2xl font-light text-stone-900">120</div>
						<div class="text-xs text-stone-400 mt-1">
							All auto-graded
						</div>
					</div>
				</div>

				<!-- LMS Connection Badge -->
				<div class="bg-blue-50 rounded border border-blue-100 p-3 flex items-center gap-3">
					<div class="bg-white p-1.5 rounded shadow-sm">
						<CircleCheck class="w-4 h-4 text-blue-600" />
					</div>
					<div class="text-xs text-blue-800">
						<span class="font-semibold">Status:</span> All uploaded assignments have been graded.
					</div>
				</div>
			</div>
		</div>
	</div>

</section>

<!-- Curriculum Breakdown -->
<section class="bg-white border-y border-stone-200 py-24">
	<div class="max-w-4xl mx-auto px-6 md:px-12">
		<div class="text-center mb-16">
			<h2 id="syllabus" class="text-3xl md:text-4xl tracking-tight mb-4 text-stone-900 scroll-mt-24">Complete Syllabus</h2>
			<p class="text-stone-600">Designed to map to ACM/IEEE CS Curricula recommendations.</p>
		</div>

		<div class="space-y-4">
			{#each curriculum as module}
				<div class="group bg-white border border-stone-200 hover:border-blue-300 rounded-lg p-6 transition-all hover:shadow-md">
					<div class="flex gap-4 md:gap-6">
                        <!-- Unit Badge -->
                        <div class="shrink-0">
                            <div class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-stone-50 text-stone-500 group-hover:bg-blue-50 group-hover:text-blue-600 flex items-center justify-center font-mono text-sm md:text-base font-bold transition-colors">
                                {module.unit}
                            </div>
                        </div>

                        <!-- Content -->
                        <div class="space-y-2">
                            <h3 class="text-lg md:text-xl font-medium text-stone-900 group-hover:text-blue-700 transition-colors">
                                {module.title}
                            </h3>
                            <p class="text-sm md:text-base text-stone-600 leading-relaxed">
                                {module.description}
                            </p>
                        </div>
                    </div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Classroom Flexibility (Reused from Landing Page strategy) -->
<section class="max-w-6xl mx-auto px-6 md:px-12 py-24">
	<div class="text-center mb-16">
		<h2 class="text-3xl md:text-4xl tracking-tight mb-4 text-stone-900">
			One course. Any teaching format.
		</h2>
		<p class="text-lg text-stone-600 max-w-2xl mx-auto">
			We provide the tools. You choose how to use them.
		</p>
	</div>

	<div class="grid md:grid-cols-2 gap-8">
		<div class="bg-stone-50 border border-stone-200 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
			<div class="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
				<Users class="w-5 h-5 text-stone-700" />
			</div>
			<h3 class="text-xl font-medium mb-3 text-stone-900">For Hybrid & In-Person</h3>
			<p class="text-stone-600 leading-relaxed">
				Use Impart to replace your textbook. Assign pre-class readings and labs, 
				then use lecture time for high-value code reviews and collaborative problem solving 
				based on the data of where students struggled the night before.
			</p>
		</div>

		<div class="bg-stone-50 border border-stone-200 rounded-xl p-8 hover:bg-white hover:shadow-lg transition-all duration-300">
			<div class="w-10 h-10 bg-white border border-stone-200 rounded-lg flex items-center justify-center mb-4 shadow-sm">
				<Terminal class="w-5 h-5 text-stone-700" />
			</div>
			<h3 class="text-xl font-medium mb-3 text-stone-900">For Asynchronous Online</h3>
			<p class="text-stone-600 leading-relaxed">
				Run a completely self-paced section. The automated feedback loops act as a 
				24/7 TA, unblocking students instantly. You just monitor the analytics dashboard 
				to intervene only when true blockers arise.
			</p>
		</div>
	</div>
</section>

<!-- Final CTA -->
<MeetingCTA />