<script lang="ts">
    import type { Snippet } from 'svelte';

    let { children }: { children: Snippet } = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.22/dist/katex.css" integrity="sha384-o3WH+1yEhq+grOgz1BVYTZPyTlMXrDxnjN1By9/ba94JqJhva6wFm2Hb+URQX53v" crossorigin="anonymous">
</svelte:head>

{@render children()}