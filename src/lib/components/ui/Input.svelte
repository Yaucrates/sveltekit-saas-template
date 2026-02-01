<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	interface Props extends Omit<HTMLInputAttributes, 'type' | 'value'> {
		type?: 'text' | 'email' | 'password' | 'tel';
		name: string;
		value?: string;
		placeholder?: string;
		required?: boolean;
		error?: boolean;
		disabled?: boolean;
		class?: string;
		id?: string;
	}

	let {
		type = 'text',
		name,
		value = $bindable(''),
		placeholder = '',
		required = false,
		error = false,
		disabled = false,
		autocomplete,
		class: className = '',
		id,
		...restProps
	}: Props = $props();

	const baseClasses =
		'px-4 py-3 w-full bg-stone-50 border rounded-sm text-stone-900 placeholder:text-stone-400 transition-all duration-200 outline-none';
	const normalClasses = 'border-stone-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent';
	const errorClasses = 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent';
	const disabledClasses = 'opacity-50 cursor-not-allowed';

	const classes = $derived(
		`${baseClasses} ${error ? errorClasses : normalClasses} ${disabled ? disabledClasses : ''} ${className}`
	);
</script>

<input
	{type}
	{name}
	{id}
	bind:value
	{placeholder}
	{required}
	{disabled}
	{autocomplete}
	class={classes}
	aria-invalid={error}
	{...restProps}
/>
