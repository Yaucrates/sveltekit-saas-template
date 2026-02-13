<script lang="ts">
    import { page } from '$app/state';
    import { ChevronLeft, ChevronRight } from '@lucide/svelte';
    import { getDetailedCourse } from '$lib/data/courses';
    import { toLink } from '$lib/utils';

    let { children } = $props();

    // Extract course slug from URL pathname
    // URL structure: /courses/[courseSlug]/[chapterId]-[chapterName]
    // Layout groups (courses) don't appear in URL
    const courseSlug = $derived(page.url.pathname.split('/')[2]);

    // Load course data client-side
    const course = $derived(getDetailedCourse(courseSlug));
    const chapters = $derived(course?.details?.chapters ?? []);

    const pathname = $derived( page.url.pathname );

    const currentChapterNumber = $derived( Number(pathname.split('/').reverse()[0].split('-')[0]) );
    const currentChapter = $derived( chapters.filter(chapter => chapter.id === currentChapterNumber)[0] );

    const releasedChapters = $derived(chapters.filter(c => c.released));
    const currentIndex = $derived(releasedChapters.findIndex(c => c.id === currentChapterNumber));
    const prevChapter = $derived(currentIndex > 0 ? releasedChapters[currentIndex - 1] : null);
    const nextChapter = $derived(currentIndex < releasedChapters.length - 1 ? releasedChapters[currentIndex + 1] : null);

</script>

<svelte:head>
	<title>{currentChapter.name} | Impart</title>
	<meta name="description" content={currentChapter.description} />
</svelte:head>

<div class="min-h-screen w-full flex flex-col items-center px-6 py-20">
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

