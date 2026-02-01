<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface Props extends HTMLButtonAttributes {
		variant?: 'primary' | 'secondary' | 'ghost';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		loading?: boolean;
		class?: string;
		onclick?: () => void;
		children?: Snippet;
	}

	let {
		variant = 'primary',
		type = 'button',
		disabled = false,
		loading = false,
		class: className = '',
		onclick,
		children,
		...restProps
	}: Props = $props();

	const baseClasses = 'px-8 py-3 rounded-sm font-medium transition-colors duration-200';

	const variantClasses = {
		primary: 'bg-stone-900 text-white hover:bg-stone-800',
		secondary: 'bg-stone-100 text-stone-900 hover:bg-stone-200',
		ghost: 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 px-4 py-2'
	};

	const disabledClasses = 'opacity-50 cursor-not-allowed pointer-events-none';

	const classes = $derived(
		`${baseClasses} ${variantClasses[variant]} ${disabled || loading ? disabledClasses : ''} ${className}`
	);
</script>

<button {type} class={classes} disabled={disabled || loading} onclick={onclick} {...restProps}>
	{@render children?.()}
</button>
