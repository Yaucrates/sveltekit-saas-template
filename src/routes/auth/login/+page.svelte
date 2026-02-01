<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import FormError from '$lib/components/ui/FormError.svelte';

	let { form } = $props();
</script>

<svelte:head>
	<title>Impart | Sign In</title>
	<meta name="description" content="Sign in to Impart." />

	<meta property="og:title" content="Impart | Sign In" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/login.webp" />
	<meta property="og:url" content="https://www.imparteducation.com/" />
</svelte:head>

<div class="px-12 py-24 w-full max-w-md mx-auto">
	<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Welcome back</h1>
	<p class="text-stone-600 mb-8">Sign in to your Impart account</p>

	<form use:enhance method="POST" action="?/auth/login" class="space-y-6">
		<div>
			<Label for="email" required>Email</Label>
			<Input id="email" type="email" name="email" required autocomplete="email" />
		</div>

		<div>
			<Label for="password" required>Password</Label>
			<Input id="password" type="password" name="password" required autocomplete="current-password" />
		</div>

		{#if form?.message}
			<FormError message="Invalid email or password. Please try again." />
		{/if}

		<Button type="submit" class="w-full">Sign In</Button>
	</form>

	<div class="mt-6 text-center space-y-3">
		<a
			href="/auth/forgot-password"
			class="text-sm text-blue-600 hover:text-blue-700 hover:underline block"
		>
			Forgot your password?
		</a>
		<p class="text-sm text-stone-600">
			Don't have an account?
			<a href="/auth/signup" class="text-blue-600 hover:text-blue-700 hover:underline font-medium">
				Sign up
			</a>
		</p>
	</div>
</div>