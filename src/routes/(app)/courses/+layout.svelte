<script lang="ts">
    import type { Snippet } from 'svelte';
    import { page } from '$app/state';
    import CourseSidebar from '$lib/components/Navigation/CourseSidebar.svelte';

    let { children }: { children: Snippet } = $props();

    // Extract course slug — always the 2nd URL segment
    // Works for both /courses/[slug]/ and /courses/[slug]/[chapter]/
    const courseSlug = $derived(page.url.pathname.split('/')[2]);
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
</svelte:head>

<div class="flex">
    <CourseSidebar {courseSlug} />

    <div class="flex-1 min-w-0 relative">
        {@render children()}
    </div>
</div>
