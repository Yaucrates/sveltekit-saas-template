<script lang="ts">
    import Button from '$lib/components/ui/Button.svelte';
    import { Upload, X, FileCode, CircleCheck, CircleX, LoaderCircle } from '@lucide/svelte';
    import type { GradeResult } from '$lib/gradescript';
    import { enhance } from '$app/forms';
    import { page } from '$app/state';
    import { onMount } from 'svelte';

    let { assignmentName, acceptedExtension = '.py' }: { assignmentName: string; acceptedExtension?: string; } = $props();

    let file = $state<File | null>(null);
    let isDragOver = $state(false);
    let isLoading = $state(true);
    let result = $state<GradeResult | null>(null);
    let previousResult = $state<GradeResult | null>(null);
    let error = $state('');
    let fileInput = $state<HTMLInputElement>(null!);

    let submitted = $derived(result !== null);
    let fileName = $derived(file?.name ?? '');
    let fileSize = $derived(file ? formatBytes(file.size) : '');

    onMount(async () => {
        try {
            const session = page.data.session;
            if (!session?.user) return;

            const { data, error } = await page.data.supabase
                .from('submissions')
                .select('results')
                .eq('assignment_id', assignmentName)
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(1)
                .maybeSingle();

            if (error) {
                console.error('Failed to fetch previous submission:', error);
                return;
            }

            if (data) {
                result = data.results as unknown as GradeResult;
            }
        } catch (e) {
            console.error('An unexpected error occurred in onMount:', e);
        } finally {
            isLoading = false;
        }
    });

    function formatBytes(bytes: number): string {
        if (bytes < 1024) return `${bytes} B`;
        if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
        return `${(bytes / 1048576).toFixed(1)} MB`;
    }

    function selectFile(f: File | null | undefined) {
        if (!f || !f.name.endsWith(acceptedExtension)) return;
        file = f;
        result = null;
        error = '';
    }

    function reset() {
        file = null;
        result = null;
        error = '';
    }

    function resubmit() {
        previousResult = result;
        file = null;
        result = null;
        error = '';
    }

    function cancelResubmit() {
        result = previousResult;
        previousResult = null;
        file = null;
        error = '';
    }

    function handleDrop(e: DragEvent) {
        e.preventDefault();
        isDragOver = false;
        selectFile(e.dataTransfer?.files[0]);
    }

    function handleSubmit({ formData }: { formData: FormData }) {
        isLoading = true;
        error = '';
        formData.set('file', file!);

        return async ({ result: res }: { result: any }) => {
            isLoading = false;
            if (res.type === 'success' && res.data?.result) {
                result = res.data.result as GradeResult;
                previousResult = null;
            } else if (res.type === 'failure' && res.data?.error) {
                error = res.data.error as string;
            } else {
                error = 'An unexpected error occurred';
            }
        };
    }
</script>

<div class="not-prose mt-8">
    <h2 class="text-2xl font-semibold text-stone-900 mb-2 font-brand">Submit Your Work</h2>
    <p class="text-stone-500 mb-6 text-sm">
        Upload your
        <code class="text-stone-900 bg-stone-200/70 px-1.5 py-0.5 rounded text-xs">
            {assignmentName}
        </code>
        file below.
    </p>

    <!-- Loading state -->
    {#if isLoading && !file}
        <div class="w-full px-6 py-12 flex items-center justify-center">
            <LoaderCircle class="w-6 h-6 animate-spin text-stone-400" />
        </div>

    <!-- Dropzone -->
    {:else if !file && !submitted}
        <button
            type="button"
            class="w-full px-6 py-12 border-2 border-dashed rounded-xl transition-colors cursor-pointer text-center
                {isDragOver ? 'border-blue-400 bg-blue-50' : 'border-stone-300 bg-stone-50 hover:border-stone-400 hover:bg-stone-100'}"
            ondragover={(e) => { e.preventDefault(); isDragOver = true; }}
            ondragleave={() => (isDragOver = false)}
            ondrop={handleDrop}
            onclick={() => fileInput.click()}
        >
            <Upload class="w-8 h-8 mx-auto mb-3 text-stone-400" />
            <p class="text-sm font-medium text-stone-700">
                Drag and drop your file here, or <span class="text-blue-600">browse</span>
            </p>
            <p class="text-xs text-stone-400 mt-1">Accepted: {acceptedExtension}</p>
        </button>
        <input
            bind:this={fileInput}
            type="file"
            accept={acceptedExtension}
            class="hidden"
            onchange={(e) => selectFile((e.target as HTMLInputElement).files?.[0])}
        />
        {#if previousResult}
            <button type="button" onclick={cancelResubmit} class="mt-3 text-sm text-stone-500 hover:text-stone-700">
                Cancel
            </button>
        {/if}

    <!-- File selected, ready to submit -->
    {:else if file && !submitted}
        <form method="POST" action="?/submit" enctype="multipart/form-data" use:enhance={handleSubmit}>
            <input type="hidden" name="assignment" value={assignmentName} />

            <div class="rounded-xl border border-stone-200 shadow-sm">
                <div class="p-5 flex items-center justify-between gap-4">
                    <div class="flex items-center gap-3 min-w-0">
                        <div class="p-2 rounded-lg bg-blue-50">
                            <FileCode class="w-5 h-5 text-blue-600" />
                        </div>
                        <div class="min-w-0">
                            <p class="text-sm font-medium text-stone-900 truncate">{fileName}</p>
                            <p class="text-xs text-stone-400">{fileSize}</p>
                        </div>
                    </div>

                    {#if !isLoading}
                        <button
                            type="button"
                            onclick={reset}
                            class="p-1.5 rounded-lg hover:bg-stone-100 text-stone-400 hover:text-stone-600 transition-colors"
                        >
                            <X class="w-4 h-4" />
                        </button>
                    {/if}
                </div>

                <div class="px-5 pb-5">
                    <Button variant="primary" type="submit" loading={isLoading}>
                        {#if isLoading}
                            <span class="flex items-center gap-2">
                                <LoaderCircle class="w-4 h-4 animate-spin" />
                                Grading…
                            </span>
                        {:else}
                            Submit
                        {/if}
                    </Button>
                </div>

                {#if error}
                    <div class="mx-5 mb-5 p-3 rounded-lg bg-red-50 border border-red-200">
                        <p class="text-sm text-red-700">{error}</p>
                    </div>
                {/if}
            </div>
        </form>

    <!-- Results -->
    {:else if result}
        <div class="rounded-xl border border-stone-200 shadow-sm">
            <div class="p-5 flex items-center justify-between">
                <div>
                    <p class="text-sm text-stone-500">Score</p>
                    <p class="text-2xl font-semibold text-stone-900">{result.score}</p>
                </div>
                <button type="button" onclick={resubmit} class="text-sm text-blue-600 hover:underline">
                    Resubmit
                </button>
            </div>

            <div class="border-t border-stone-100">
                {#each result.checks as check (check.id)}
                    <div class="px-5 py-3 flex items-start gap-3 border-b border-stone-100 last:border-b-0">
                        {#if check.passed}
                            <CircleCheck class="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                        {:else}
                            <CircleX class="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        {/if}
                        <div class="min-w-0">
                            <p class="text-sm font-medium text-stone-900">{check.check}</p>
                            <p class="text-xs text-stone-500">{check.description}</p>
                            {#if !check.passed && check.error_message}
                                <p class="text-xs text-red-600 mt-1 font-mono">{check.error_message}</p>
                            {/if}
                        </div>
                    </div>
                {/each}
            </div>
        </div>
    {/if}
</div>
