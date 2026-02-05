<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import PasswordStrength from '$lib/components/ui/PasswordStrength.svelte';
	import { isPasswordValid } from '$lib/utils/passwordValidation';

	let { form } = $props();

	let username = $state('');
	let password = $state('');

	const signup_success = $derived(form?.signup_succeeded ?? false);
	const passwordValid = $derived(username && isPasswordValid(password));
</script>

<svelte:head>
	<title>Sign Up | Impart</title>
	<meta name="description" content="Sign Up to Impart." />
</svelte:head>

{#if signup_success}
	<div class="px-12 py-24 w-full max-w-md mx-auto text-center">
		<h1 class="text-3xl font-brand text-stone-900 mb-4">Check your email</h1>
		<p class="text-stone-600 leading-relaxed">
			We've sent a confirmation link to your email address. Click the link to activate your
			account.
		</p>
	</div>
{:else}
	<div class="px-12 py-24 w-full max-w-md mx-auto">
		<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Create your account</h1>
		<p class="text-stone-600 mb-8">Start using Impart today</p>

		<form use:enhance method="POST" action="?/signup" class="space-y-6">
			<div>
				<Label for="email" required>Email</Label>
				<Input
					id="email"
					bind:value={username}
					type="email"
					name="email"
					required
					autocomplete="email"
				/>
			</div>

			<div>
				<Label for="password" required>Password</Label>
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

			<Button type="submit" disabled={!passwordValid} class="w-full">Create Account</Button>
		</form>

		<p class="mt-6 text-center text-sm text-stone-600">
			Already have an account?
			<a href="/auth/login" class="text-blue-600 hover:text-blue-700 hover:underline font-medium">
				Sign in
			</a>
		</p>
	</div>
{/if}