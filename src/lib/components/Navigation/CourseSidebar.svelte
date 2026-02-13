<script lang="ts">
	import { page } from '$app/state';
	import { House, BookOpen, ClipboardList, Award, X } from '@lucide/svelte';

	interface Props {
		courseSlug: string;
		isOpen: boolean;
	}

	let { courseSlug, isOpen = $bindable(true) }: Props = $props();

	const pathname = $derived(page.url.pathname);

	// Active state helpers
	function isHomeActive() {
		const segments = pathname.split('/').filter(Boolean);
		return segments.length === 2 && segments[0] === 'courses';
	}

	function isChaptersActive() {
		return pathname.includes('/chapters');
	}
</script>

<aside
	class="
		h-screen sticky top-0 flex flex-col bg-white border-r border-stone-100
		overflow-hidden transition-[width] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shrink-0
		{isOpen ? 'w-56' : 'w-0'}
	"
>
	<div class="w-56 h-full flex flex-col">
		<!-- Header -->
		<div class="h-24 shrink-0 flex items-center justify-end px-5">
			<button
				onclick={() => (isOpen = false)}
				class="p-1.5 rounded-sm hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors duration-200 shrink-0 cursor-pointer"
			>
				<X size={16} />
			</button>
		</div>

		<!-- Navigation -->
		<nav class="flex-1 flex flex-col gap-2 px-5 overflow-y-auto">
			<!-- Home -->
			<a
				href="/courses/{courseSlug}/"
				class="
					flex items-center gap-1.5 p-2 rounded-sm transition-colors duration-200
					{isHomeActive() ? 'bg-blue-50 text-blue-700' : 'hover:bg-stone-100 text-stone-700'}
				"
			>
				<House size={18} class="shrink-0 mx-0.5" />
				<span class="text-sm whitespace-nowrap">Home</span>
			</a>

			<!-- Chapters -->
			<a
				href="/courses/{courseSlug}/chapters"
				class="
					flex items-center gap-1.5 p-2 rounded-sm transition-colors duration-200
					{isChaptersActive() ? 'bg-blue-50 text-blue-700' : 'hover:bg-stone-100 text-stone-700'}
				"
			>
				<BookOpen size={18} class="shrink-0 mx-0.5" />
				<span class="text-sm whitespace-nowrap">Chapters</span>
			</a>

			<!-- Assignments (coming soon) -->
			<div
				class="flex items-center justify-between p-2 rounded-sm text-stone-400 cursor-default"
			>
				<div class="flex items-center gap-1.5">
					<ClipboardList size={18} class="shrink-0 mx-0.5" />
					<span class="text-sm whitespace-nowrap">Assignments</span>
				</div>
				<span
					class="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded uppercase font-bold"
					>Soon</span
				>
			</div>

			<!-- Grades (coming soon) -->
			<div
				class="flex items-center justify-between p-2 rounded-sm text-stone-400 cursor-default"
			>
				<div class="flex items-center gap-1.5">
					<Award size={18} class="shrink-0 mx-0.5" />
					<span class="text-sm whitespace-nowrap">Grades</span>
				</div>
				<span
					class="text-[9px] px-1.5 py-0.5 bg-stone-100 text-stone-500 rounded uppercase font-bold"
					>Soon</span
				>
			</div>
		</nav>
	</div>
</aside>
