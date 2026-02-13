<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import { Menu } from '@lucide/svelte';
    import CourseSidebar from '$lib/components/Navigation/CourseSidebar.svelte';

    let { children }: { children: Snippet } = $props();

    // Extract course slug — always the 2nd URL segment
    // Works for both /courses/[slug]/ and /courses/[slug]/[chapter]/
    const courseSlug = $derived(page.url.pathname.split('/')[2]);

    let sidebarOpen = $state(true);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
</svelte:head>

<div class="flex">
    <CourseSidebar {courseSlug} bind:isOpen={sidebarOpen} />

    <div class="flex-1 min-w-0 relative">
        <!-- Toggle button when sidebar is closed -->
        {#if !sidebarOpen}
            <div class="sticky top-0 z-20 h-0">
                <button
                    onclick={() => (sidebarOpen = true)}
                    class="
                        absolute left-4 top-6 p-2 rounded-sm bg-white border border-stone-200
                        hover:border-stone-300 hover:bg-stone-50 text-stone-500 hover:text-stone-700
                        transition-all duration-200 shadow-sm cursor-pointer
                    "
                >
                    <Menu size={18} />
                </button>
            </div>
        {/if}

        {@render children()}
    </div>
</div>
