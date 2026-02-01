<script lang="ts">
	import Button from '$lib/components/ui/Button.svelte';
</script>

<svelte:head>
	<title>Impart | Auth Error</title>
	<meta name="description" content="Authentication Error Page." />

	<meta property="og:title" content="Impart | Auth Error" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="/auth-error.webp" />
	<meta property="og:url" content="https://www.imparteducation.com/" />
</svelte:head>

<div class="px-12 py-24 w-full max-w-md mx-auto text-center">
	<h1 class="text-4xl font-brand text-stone-900 mb-4">Something went wrong</h1>

	<p class="text-stone-600 leading-relaxed mb-8">
		We encountered an error during authentication. This could be due to an expired link or an
		invalid request.
	</p>

	<div class="space-y-3">
		<a href="/auth/signup" class="block">
			<Button class="w-full">Try signing up again</Button>
		</a>
		<a href="/auth/login" class="block">
			<Button variant="secondary" class="w-full">Go to sign in</Button>
		</a>
	</div>

	<p class="mt-8 text-xs text-stone-500">If this issue persists, please contact support.</p>
</div>