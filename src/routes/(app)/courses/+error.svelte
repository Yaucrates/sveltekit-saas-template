<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="w-full min-h-screen bg-stone-50">
	<div class="max-w-4xl mx-auto px-6 py-24 text-center">
		<h1 class="text-4xl font-bold mb-4 text-stone-900">Course Not Found</h1>
		<p class="text-stone-600 mb-8">
			{page.error?.message ?? 'The course you\'re looking for doesn\'t exist or hasn\'t been released yet.'}
		</p>
		<a href="/dashboard" class="text-blue-600 hover:underline">
			Return to Dashboard
		</a>
	</div>
</div>
