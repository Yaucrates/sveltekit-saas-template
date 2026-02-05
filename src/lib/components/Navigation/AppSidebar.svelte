<script lang="ts">
	import ImpartNameLogo from '../logos/ImpartNameLogo.svelte';
	import { House, User, Settings, CircleQuestionMark } from '@lucide/svelte';
	import { page } from '$app/state';

	let isHovered = $state(false);

	// Helper to check if link is active
	function isActive(path: string) {
		return page.url.pathname === path;
	}
</script>

<aside
	class="
        flex flex-col justify-between bg-white border-r border-stone-100
        overflow-hidden transition-[width] duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
        {isHovered ? 'w-56' : 'w-20'}
    "
	onmouseenter={() => (isHovered = true)}
	onmouseleave={() => (isHovered = false)}
>
	<!-- Logo Area (same pattern as NavigationBar) -->
	<div class="relative h-24 w-full shrink-0">
		<a
			href="/dashboard"
			class="
                absolute left-8 top-6 origin-left transition-all duration-300
                {isHovered
				? 'opacity-100 translate-x-0 scale-100 delay-100'
				: 'opacity-0 -translate-x-4 scale-95 pointer-events-none'}
            "
		>
			<ImpartNameLogo />
		</a>

		<h1
			class="
                font-brand text-3xl leading-tighter absolute left-1/2 top-6 -translate-x-1/2
                transition-all duration-300 origin-center
                {isHovered
				? 'opacity-0 scale-50 pointer-events-none'
				: 'opacity-100 scale-100 delay-100'}
            "
		>
			I
		</h1>
	</div>

	<!-- Navigation Items -->
	<div class="flex-1 flex flex-col px-5 pb-6">
		<nav class="h-full flex flex-col gap-2">
			<!-- Dashboard Section -->
            <a
                href="/dashboard"
                class="
                    flex items-center gap-1.5 p-2 rounded-sm
                    transition-colors duration-200
                    {isActive('/dashboard')
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-stone-100 text-stone-700'}
                "
            >
                <House size={18} class="shrink-0 mx-0.5" />
                <span
                    class="
                        transition-all duration-300 whitespace-nowrap text-sm
                        {isHovered ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}
                    "
                >
                    Dashboard
                </span>
            </a>

            <a
                href="/profile"
                class="
                    flex items-center gap-1.5 p-2 rounded-sm
                    transition-colors duration-200
                    {isActive('/profile')
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-stone-100 text-stone-700'}
                "
            >
                <User size={18} class="shrink-0 mx-0.5" />
                <span
                    class="
                        transition-all duration-300 whitespace-nowrap text-sm
                        {isHovered ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}
                    "
                >
                    Profile
                </span>
            </a>

            <a
                href="/settings"
                class="
                    flex items-center gap-1.5 p-2 rounded-sm
                    transition-colors duration-200
                    {isActive('/settings')
                    ? 'bg-blue-50 text-blue-700'
                    : 'hover:bg-stone-100 text-stone-700'}
                "
            >
                <Settings size={18} class="shrink-0 mx-0.5" />
                <span
                    class="
                        transition-all duration-300 whitespace-nowrap text-sm
                        {isHovered ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}
                    "
                >
                    Settings
                </span>
            </a>
		</nav>
	</div>

	<!-- Support (Bottom) - Non-prominent -->
	<div class="px-6 pb-6">
		<a
			href="/support"
			class="
                flex items-center gap-2.5 p-2 rounded-sm
                text-stone-400 hover:text-stone-600 hover:bg-stone-50
                transition-colors duration-200
            "
		>
			<CircleQuestionMark size={14} class="shrink-0" />
			<span
				class="
                    text-sm transition-all duration-300 whitespace-nowrap
                    {isHovered ? 'opacity-100 delay-100' : 'opacity-0 pointer-events-none'}
                "
			>
				Request Support
			</span>
		</a>
	</div>
</aside>
