<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		for: string;
		required?: boolean;
		class?: string;
		children?: Snippet;
	}

	let { for: htmlFor, required = false, class: className = '', children }: Props = $props();
</script>

<label for={htmlFor} class="text-sm font-medium text-stone-700 mb-2 block {className}">
	{@render children?.()}
	{#if required}
		<span class="text-red-600">*</span>
	{/if}
</label>
