<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import FormError from '$lib/components/ui/FormError.svelte';
	import PasswordStrength from '$lib/components/ui/PasswordStrength.svelte';
	import { isPasswordValid } from '$lib/utils/passwordValidation';

	let { form } = $props();

	let password = $state('');

	const passwordValid = $derived(isPasswordValid(password));
</script>

<svelte:head>
	<title>Impart | Reset Password</title>
	<meta name="description" content="Reset your Impart password." />

	<meta property="og:title" content="Impart | Reset Password" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.imparteducation.com/" />
</svelte:head>

<div class="px-12 py-24 w-full max-w-md mx-auto">
	<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Create new password</h1>
	<p class="text-stone-600 mb-8">Enter a strong password for your account</p>

	<form use:enhance method="POST" action="?/updatePassword" class="space-y-6">
		<div>
			<Label for="password" required>New Password</Label>
			<Input
				id="password"
				bind:value={password}
				type="password"
				name="password"
				required
				autocomplete="new-password"
			/>
			<PasswordStrength {password} show={password.length > 0} />
		</div>

		{#if form?.message}
			<FormError message={form.message} />
			<p class="text-sm text-stone-600 text-center">
				<a href="/forgot-password" class="text-blue-600 hover:text-blue-700 hover:underline">
					Request a new reset link
				</a>
			</p>
		{/if}

		<Button type="submit" disabled={!passwordValid} class="w-full">Update Password</Button>
	</form>
</div>
