<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { ArrowDown, CheckCircle } from 'lucide-svelte';

	import Loader from '$lib/components/Loader.svelte';

	import GetEvolution from '$lib/services/get-evolution';
	import type { Evolution } from '$lib/services/get-evolution/types';

	let { id, current }: { id: number | undefined; current: string | undefined } = $props();

	const client = useQueryClient();

	let query: {
		isLoading: boolean;
		isSuccess: boolean;
		data: Array<Evolution> | null;
		error: Error | null;
	} = $state({ isLoading: false, isSuccess: false, data: null, error: null });

	$effect(() => {
		const _onFetch = async () => {
			try {
				query.isLoading = true;
				query.data = null;
				const response = await client.fetchQuery(GetEvolution(fetch)(id || 0));
				query.data = response.map((item: Evolution) => ({
					...item,
					current: item.name === current
				}));
				query.isSuccess = true;
				query.isLoading = false;
			} catch (error) {
				query.error = error as Error;
				query.isLoading = false;
			}
		};
		_onFetch();
	});
</script>

{#if query.isLoading}
	<Loader />
{/if}
{#if query.error}
<span class="text-red-500 font-bold">Error: {query.error.message}</span>
{/if}
{#if query.isSuccess}
	<div class="flex flex-col gap-4">
		{#each query.data || [] as item, index}
			<div class="card flex justify-between gap-4">
				<span class="prose prose-base font-bold text-gray-800">
					{capitalizeFirstLetters(dashToSpace(item.name))}
				</span>
				{#if item.current}
					<span class="self-center text-green-500">
						<CheckCircle />
					</span>
				{/if}
			</div>

			{#if query.data && index !== query.data.length - 1}
				<div class="flex justify-center"><ArrowDown /></div>
			{/if}
		{/each}
	</div>
{/if}
