<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import FormError from '$lib/components/ui/FormError.svelte';

	let { data, form } = $props();
</script>

<svelte:head>
	<title>Settings | Impart</title>
	<meta name="description" content="Manage your settings for Impart." />
</svelte:head>

<div class="px-12 py-24 max-w-3xl mx-auto">
	<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Settings</h1>
	<p class="text-stone-600 mb-12">Manage your account settings</p>

	<div class="space-y-6">
		<!-- Email Update Card -->
		<div class="bg-white border border-stone-200 rounded-sm p-6">
			<h2 class="text-xl font-medium text-stone-900 mb-4">Email Address</h2>
			<form use:enhance method="POST" action="?/updateEmail" class="space-y-4">
				<div>
					<Label for="email" required>Email</Label>
					<Input id="email" type="email" name="email" value={data.email} required autocomplete="email" />
				</div>

				{#if form?.emailError}
					<FormError message={form.emailError} />
				{/if}

				{#if form?.emailSuccess}
					<div class="text-sm text-green-600 bg-green-50 border border-green-200 rounded-sm px-3 py-2">
						Check your email to confirm the change
					</div>
				{/if}

				<Button type="submit" variant="secondary">Update Email</Button>
			</form>
		</div>

		<!-- Password Reset Card -->
		<div class="bg-white border border-stone-200 rounded-sm p-6">
			<h2 class="text-xl font-medium text-stone-900 mb-2">Password</h2>
			<p class="text-sm text-stone-600 mb-4">Reset your password using our secure password recovery flow</p>
			<a href="/auth/forgot-password" class="px-8 py-3 rounded-sm font-medium transition-colors duration bg-stone-100 text-stone-900 hover:bg-stone-200 cursor-default">Reset Password</a>
		</div>

		<!-- Sign Out Card -->
		<div class="bg-white border border-red-200 rounded-sm p-6">
			<h2 class="text-xl font-medium text-red-900 mb-2">Sign Out</h2>
			<p class="text-sm text-stone-600 mb-4">Sign out of your account on this device</p>
			<form use:enhance method="POST" action="?/signOut">
				<Button type="submit" variant="secondary">Sign Out</Button>
			</form>
		</div>
	</div>
</div>
