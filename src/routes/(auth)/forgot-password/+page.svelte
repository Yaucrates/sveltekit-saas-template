<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Impart | Forgot Password</title>
	<meta name="description" content="Reset your Impart password." />

	<meta property="og:title" content="Impart | Forgot Password" />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://www.imparteducation.com/" />
</svelte:head>

<div class="px-12 py-24 w-full max-w-md mx-auto">
	{#if form?.success}
		<div class="text-center">
			<h1 class="text-3xl font-brand text-stone-900 mb-4">Check your inbox</h1>
			<p class="text-stone-600 leading-relaxed mb-6">
				We've sent a password reset link to your email address. Click the link to create a new
				password.
			</p>
			<a href="/login" class="text-sm text-blue-600 hover:text-blue-700 hover:underline">
				Return to sign in
			</a>
		</div>
	{:else}
		<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Reset your password</h1>
		<p class="text-stone-600 mb-8">Enter your email and we'll send you a reset link</p>

		<form use:enhance method="POST" action="?/sendResetEmail" class="space-y-6">
			<div>
				<Label for="email" required>Email</Label>
				<Input id="email" type="email" name="email" required autocomplete="email" />
			</div>

			<Button type="submit" class="w-full">Send Reset Link</Button>
		</form>

		<p class="mt-6 text-center text-sm text-stone-600">
			Remember your password?
			<a href="/login" class="text-blue-600 hover:text-blue-700 hover:underline font-medium">
				Sign in
			</a>
		</p>
	{/if}
</div>
