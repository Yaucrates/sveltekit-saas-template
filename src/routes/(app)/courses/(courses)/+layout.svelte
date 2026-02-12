<script lang="ts">
    import { page } from '$app/state';
    import { BookOpen, ChevronDown, ChevronLeft, ChevronRight, X } from '@lucide/svelte';
    import { type CourseChapter, getDetailedCourse } from '$lib/data/courses';
    import { toLink } from '$lib/utils';

    let { children } = $props();

    // Extract course slug from URL pathname
    // URL structure: /courses/[courseSlug]/[chapterId]-[chapterName]
    // Layout groups (courses) don't appear in URL
    const courseSlug = $derived(page.url.pathname.split('/')[2]);

    // Load course data client-side
    const course = $derived(getDetailedCourse(courseSlug));
    const sections = $derived(course?.details?.sections ?? []);
    const chapters = $derived(course?.details?.chapters ?? []);

    const pathname = $derived( page.url.pathname );

    const currentChapterNumber = $derived( Number(pathname.split('/').reverse()[0].split('-')[0]) );
    const currentChapter = $derived( chapters.filter(chapter => chapter.id === currentChapterNumber)[0] );

    const releasedChapters = $derived(chapters.filter(c => c.released));
    const currentIndex = $derived(releasedChapters.findIndex(c => c.id === currentChapterNumber));
    const prevChapter = $derived(currentIndex > 0 ? releasedChapters[currentIndex - 1] : null);
    const nextChapter = $derived(currentIndex < releasedChapters.length - 1 ? releasedChapters[currentIndex + 1] : null);

    let currentSectionNumber = $derived(currentChapter.section);
    let toggleDropdown = $state(false);
    let toggleSidebar = $state(false);
</script>

<svelte:head>
	<title>{currentChapter.name} | Impart</title>
	<meta name="description" content={currentChapter.description} />
</svelte:head>

<div class="min-h-screen w-full flex flex-col items-center px-6 py-20 transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] {toggleSidebar ? 'lg:pr-80' : 'lg:pr-6'}">
    <article class="w-full prose prose-headings:text-stone-900 prose-headings:font-semibold prose-p:text-stone-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 prose-strong:font-semibold prose-code:text-stone-900 prose-code:bg-stone-200/70 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:rounded-xl prose-pre:border prose-pre:border-stone-200 prose-pre:shadow-sm prose-pre:overflow-x-auto prose-code:before:content-[''] prose-code:after:content-[''] prose-img:rounded-xl prose-img:shadow-sm prose-hr:border-stone-200">
        {@render children()}
    </article>

    <nav class="w-full max-w-prose flex items-stretch gap-4 mt-12 pt-6 border-t border-stone-200">
        {#if prevChapter}
            <a
                href="./{prevChapter.id}-{toLink(prevChapter.name)}"
                class="flex items-center gap-3 flex-1 px-4 py-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors duration-200 group"
            >
                <ChevronLeft class="w-5 h-5 text-stone-400 group-hover:text-stone-600 shrink-0 transition-colors duration-200" />
                <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-xs uppercase tracking-wide font-medium text-stone-400">Previous</span>
                    <span class="text-sm font-medium text-stone-700 group-hover:text-stone-900 truncate transition-colors duration-200">{prevChapter.name}</span>
                </div>
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}

        {#if nextChapter}
            <a
                href="./{nextChapter.id}-{toLink(nextChapter.name)}"
                class="flex items-center justify-end gap-3 flex-1 px-4 py-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors duration-200 group text-right"
            >
                <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-xs uppercase tracking-wide font-medium text-stone-400">Next</span>
                    <span class="text-sm font-medium text-stone-700 group-hover:text-stone-900 truncate transition-colors duration-200">{nextChapter.name}</span>
                </div>
                <ChevronRight class="w-5 h-5 text-stone-400 group-hover:text-stone-600 shrink-0 transition-colors duration-200" />
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}
    </nav>
</div>

<button
    onclick={() => { toggleSidebar = true; }}
    class="fixed right-6 bottom-6 z-30 p-4 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 {toggleSidebar && 'opacity-0 pointer-events-none'}"
>
    <BookOpen class="w-6 h-6" />
</button>

<div class="fixed right-0 top-0 h-screen w-80 bg-white border-l border-stone-200 shadow-sm z-40 p-6 flex flex-col gap-5 {toggleSidebar ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]">
    <div class="flex items-center justify-between mb-1 shrink-0">
        <h1 class="text-stone-900 text-xl font-semibold truncate">{course?.title}</h1>
        <button
            onclick={() => { toggleSidebar = false; }}
            class="p-1.5 rounded-sm hover:bg-stone-100 text-stone-600 transition-colors duration-200 shrink-0"
        >
            <X class="w-5 h-5" />
        </button>
    </div>
    
    <p class="text-sm text-stone-600 leading-relaxed mb-6 shrink-0">
        Prioritize <span class="text-blue-600 font-medium">understanding</span> over <span class="text-red-500 font-medium">memorization</span>. Good luck!
        <!-- You've completed <span class="text-red-500">7%</span> of the course and currently have a grade of <span class="text-green-500">A+</span>. -->
    </p>
    
    <div class="flex flex-col rounded-lg overflow-hidden border border-stone-200 shadow-sm mb-4 shrink-0">
        <button
            onclick={() => { toggleDropdown = !toggleDropdown; }}
            class="w-full px-4 py-3 flex items-center justify-between gap-3 bg-white hover:bg-stone-50 text-stone-900 font-medium text-sm transition-colors duration-200 {toggleDropdown && 'border-b border-stone-200'}"
        >
            <span class="truncate text-left">{sections![currentSectionNumber].name}</span>
            <ChevronDown class="w-4 h-4 shrink-0 text-stone-600 transition-transform duration-200 {toggleDropdown ? 'rotate-180' : 'rotate-0'}" />
        </button>
        <div class="flex flex-col w-full bg-stone-50 max-h-60 overflow-y-auto {toggleDropdown || 'hidden'}">
            {#each sections.filter(section => chapters.filter(chapter => chapter.section === section.section && chapter.released).length > 0) as section, i (section.section)}
                <button
                    onclick={() => { currentSectionNumber = i; toggleDropdown = false; }}
                    class="w-full px-4 py-2.5 text-left text-sm text-stone-700 hover:bg-white hover:text-stone-900 transition-colors duration-200 {i === currentSectionNumber ? 'bg-blue-50 text-blue-700 font-medium' : ''}"
                >
                    {section.name}
                </button>
            {/each}
        </div>
    </div>
    
    <div class="flex flex-col flex-1 min-h-0">
        <hr class="h-px w-full bg-stone-200 border-0 shrink-0"/>
        <div class="flex flex-col w-full overflow-y-auto flex-1">
            {#each chapters.filter(chapter => chapter.released && chapter.section === currentSectionNumber) as chapter (chapter.id)}
                {@const isActive = currentChapterNumber === chapter.id}

                <a
                    href="./{chapter.id}-{toLink(chapter.name)}"
                    class="relative flex items-center gap-3 px-3 py-3 rounded-sm transition-colors duration-200 border-b {isActive ? 'bg-blue-50 text-blue-700' : 'text-stone-700 hover:bg-stone-100'}"
                >
                    {@render chapterContent(chapter, isActive)}
                </a>
            {/each}
        </div>
    </div>
</div>

{#snippet chapterContent(chapter: CourseChapter, isActive: boolean)}
    <div class="flex flex-col gap-0.5 flex-1 min-w-0">
        <span class="text-xs uppercase tracking-wide font-medium {isActive ? 'text-blue-600' : 'text-stone-500'}">
            {chapter.header}
        </span>
        <span class="text-sm font-medium truncate">
            {chapter.name}
        </span>
    </div>

    {#if isActive}
        <div class="w-1 h-8 bg-blue-600 rounded-full shrink-0"></div>
    {/if}
{/snippet}