<script lang="ts">
	interface Props {
		message?: string;
		show?: boolean;
		id?: string;
		class?: string;
	}

	let { message = '', show = true, id, class: className = '' }: Props = $props();
</script>

{#if show && message}
	<div
		{id}
		class="mt-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-3 py-2 {className}"
		role="alert"
		aria-live="polite"
	>
		{message}
	</div>
{/if}
