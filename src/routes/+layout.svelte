<script lang="ts">
	import type { Snippet } from 'svelte';
	import { QueryClientProvider } from '@tanstack/svelte-query';
	import { SvelteQueryDevtools } from '@tanstack/svelte-query-devtools';

	import type { LayoutData } from './$types';
	import '../app.css';

	let { data, children }: { data: LayoutData; children: Snippet<[]> } = $props();
</script>

<QueryClientProvider client={data.queryClient}>
	<main class="flex justify-center bg-gray-100 h-screen scroll-smooth">
		{@render children()}
	</main>
	<SvelteQueryDevtools />
</QueryClientProvider>
