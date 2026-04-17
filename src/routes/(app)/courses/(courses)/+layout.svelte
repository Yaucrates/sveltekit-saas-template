<script lang="ts">
    import { page } from '$app/state';
    import { ChevronLeft, ChevronRight } from '@lucide/svelte';
    import { toLink } from '$lib/utils';
    import { getCourseItems, type CourseItem } from '$lib/data/courses';

    let { children, data } = $props();
    const course = $derived(data.course);

    const pathname = $derived(page.url.pathname);
    const isChapter = $derived(pathname.includes('/chapters/'));
    const currentId = $derived(Number(pathname.split('/').reverse()[0].split('-')[0]));
    const currentKind = $derived<'chapter' | 'assignment'>(isChapter ? 'chapter' : 'assignment');

    const allItems = $derived(getCourseItems(course));
    const releasedItems = $derived(allItems.filter(item => item.released));
    const currentItem = $derived(allItems.find(item => item.kind === currentKind && item.id === currentId)!);
    const currentIndex = $derived(releasedItems.findIndex(item => item.kind === currentKind && item.id === currentId));
    const prevItem = $derived<CourseItem | null>(currentIndex > 0 ? releasedItems[currentIndex - 1] : null);
    const nextItem = $derived<CourseItem | null>(currentIndex < releasedItems.length - 1 ? releasedItems[currentIndex + 1] : null);

    function itemHref(item: CourseItem): string {
        const type = item.kind === 'chapter' ? 'chapters' : 'assignments';
        return `/courses/${toLink(course.title)}/${type}/${item.id}-${toLink(item.name)}`;
    }
</script>

<svelte:head>
	<title>{currentItem.name} | Impart</title>
	<meta name="description" content={currentItem.description} />
</svelte:head>

<div class="min-h-screen w-full flex flex-col items-center px-6 py-20">
    <article class="w-full prose prose-headings:text-stone-900 prose-headings:font-semibold prose-p:text-stone-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-stone-900 prose-strong:font-semibold prose-code:text-stone-900 prose-code:bg-stone-200/70 prose-pre:rounded-xl prose-pre:border prose-pre:border-stone-200 prose-pre:shadow-sm prose-pre:overflow-x-auto prose-code:before:content-[''] prose-code:after:content-[''] prose-img:rounded-xl prose-img:shadow-sm prose-hr:border-stone-200">
        {@render children()}
    </article>

    <nav class="w-full max-w-prose flex items-stretch gap-4 mt-12 pt-6 border-t border-stone-200">
        {#if prevItem}
            <a
                href={itemHref(prevItem)}
                class="flex items-center gap-3 flex-1 px-4 py-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors duration-200 group"
            >
                <ChevronLeft class="w-5 h-5 text-stone-400 group-hover:text-stone-600 shrink-0 transition-colors duration-200" />
                <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-xs uppercase tracking-wide font-medium text-stone-400">Previous</span>
                    <span class="text-sm font-medium text-stone-700 group-hover:text-stone-900 truncate transition-colors duration-200">{prevItem.name}</span>
                </div>
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}

        {#if nextItem}
            <a
                href={itemHref(nextItem)}
                class="flex items-center justify-end gap-3 flex-1 px-4 py-4 rounded-lg border border-stone-200 hover:border-stone-300 hover:bg-stone-50 transition-colors duration-200 group text-right"
            >
                <div class="flex flex-col gap-0.5 min-w-0">
                    <span class="text-xs uppercase tracking-wide font-medium text-stone-400">Next</span>
                    <span class="text-sm font-medium text-stone-700 group-hover:text-stone-900 truncate transition-colors duration-200">{nextItem.name}</span>
                </div>
                <ChevronRight class="w-5 h-5 text-stone-400 group-hover:text-stone-600 shrink-0 transition-colors duration-200" />
            </a>
        {:else}
            <div class="flex-1"></div>
        {/if}
    </nav>
</div>
