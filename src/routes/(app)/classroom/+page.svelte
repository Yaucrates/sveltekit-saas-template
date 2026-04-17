<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/Button.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Label from '$lib/components/ui/Label.svelte';
	import FormError from '$lib/components/ui/FormError.svelte';

	let { data, form } = $props();

	let showJoinForm = $state(false);
</script>

<svelte:head>
	<title>Classroom | Impart</title>
	<meta name="description" content="Manage your classroom on Impart." />
</svelte:head>

<div class="px-12 py-24 max-w-3xl mx-auto">
	<h1 class="text-4xl font-brand tracking-tight text-stone-900 mb-2">Classroom</h1>

	{#if data.classroom}
		<!-- Classroom exists -->
		<p class="text-stone-600 mb-12">
			{data.userRole === 'professor' ? 'You created this classroom' : 'You are a student in this classroom'}
		</p>

		<div class="space-y-6">
			{#if data.userRole === 'professor'}
				<!-- Join Code Card -->
				<div class="bg-white border border-stone-200 rounded-sm p-6">
					<h2 class="text-xl font-medium text-stone-900 mb-2">Join Code</h2>
					<p class="text-sm text-stone-600 mb-4">Share this code with students so they can join your classroom</p>
					<div class="inline-block bg-stone-50 border border-stone-200 rounded-sm px-6 py-3">
						<span class="text-2xl font-mono font-semibold tracking-widest text-stone-900">
							{data.classroom.join_code}
						</span>
					</div>
				</div>
			{/if}

			<!-- Members Card -->
			<div class="bg-white border border-stone-200 rounded-sm p-6">
				<h2 class="text-xl font-medium text-stone-900 mb-4">
					Members ({data.members.length})
				</h2>
				<ul class="space-y-3">
					{#each data.members as member (member.user_id)}
						{#if data.userRole === 'professor' && member.user_role === 'student'}
							<li>
								<a href="/classroom/student/{member.user_id}" class="flex items-center justify-between py-2 px-3 rounded-sm bg-stone-50 hover:bg-stone-100 transition-colors">
									<span class="text-sm text-stone-700">{member.email}</span>
									<div class="flex items-center gap-2">
										<span class="text-xs font-medium px-2 py-0.5 rounded-sm bg-stone-100 text-stone-600">
											{member.user_role}
										</span>
										<span class="text-xs text-stone-400">View grades &rarr;</span>
									</div>
								</a>
							</li>
						{:else}
							<li class="flex items-center justify-between py-2 px-3 rounded-sm bg-stone-50">
								<span class="text-sm text-stone-700">{member.email}</span>
								<span class="text-xs font-medium px-2 py-0.5 rounded-sm
									{member.user_role === 'professor'
										? 'bg-blue-50 text-blue-700'
										: 'bg-stone-100 text-stone-600'}
								">
									{member.user_role}
								</span>
							</li>
						{/if}
					{/each}
				</ul>
			</div>
		</div>
	{:else}
		<!-- No classroom -->
		<p class="text-stone-600 mb-12">Create a new classroom or join an existing one</p>

		{#if form?.error}
			<div class="mb-6">
				<FormError message={form.error} />
			</div>
		{/if}

		<div class="space-y-6">
			<!-- Create Classroom Card -->
			<div class="bg-white border border-stone-200 rounded-sm p-6">
				<h2 class="text-xl font-medium text-stone-900 mb-2">Create a Classroom</h2>
				<p class="text-sm text-stone-600 mb-4">Start a new classroom as a professor. You'll receive a join code to share with students.</p>
				<form use:enhance method="POST" action="?/create">
					<Button type="submit">Create Classroom</Button>
				</form>
			</div>

			<!-- Join Classroom Card -->
			<div class="bg-white border border-stone-200 rounded-sm p-6">
				<h2 class="text-xl font-medium text-stone-900 mb-2">Join a Classroom</h2>
				<p class="text-sm text-stone-600 mb-4">Enter the join code provided by your professor</p>

				{#if showJoinForm}
					<form use:enhance method="POST" action="?/join" class="space-y-4">
						<div>
							<Label for="join_code" required>Join Code</Label>
							<Input
								id="join_code"
								type="text"
								name="join_code"
								placeholder="e.g. ABC123"
								required
								autocomplete="off"
							/>
						</div>

						{#if form?.joinError}
							<FormError message={form.joinError} />
						{/if}

						<div class="flex gap-3">
							<Button type="submit" variant="secondary">Join</Button>
							<Button variant="ghost" onclick={() => (showJoinForm = false)}>Cancel</Button>
						</div>
					</form>
				{:else}
					<Button variant="secondary" onclick={() => (showJoinForm = true)}>Enter Join Code</Button>
				{/if}
			</div>
		</div>
	{/if}
</div>
