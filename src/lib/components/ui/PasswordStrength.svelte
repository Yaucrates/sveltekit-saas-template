<script lang="ts">
	import {
		hasLowercase,
		hasUppercase,
		hasDigit,
		hasSymbol,
		hasMinLength
	} from '$lib/utils/passwordValidation';

	interface Props {
		password: string;
		show?: boolean;
		class?: string;
	}

	let { password, show = true, class: className = '' }: Props = $props();

	const requirements = $derived([
		{ label: 'One lowercase letter', met: hasLowercase(password) },
		{ label: 'One uppercase letter', met: hasUppercase(password) },
		{ label: 'One digit', met: hasDigit(password) },
		{ label: 'One special symbol (!@#$%^&*(),.?":{}|<>)', met: hasSymbol(password) },
		{ label: 'Minimum 8 characters', met: hasMinLength(password) }
	]);
</script>

{#if show}
	<div class="text-xs space-y-1 mt-2 {className}">
		{#each requirements as requirement}
			<div class={requirement.met ? 'text-green-600' : 'text-stone-500'}>
				<span class="mr-1">{requirement.met ? '✓' : '•'}</span>
				{requirement.label}
			</div>
		{/each}
	</div>
{/if}
