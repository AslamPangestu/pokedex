<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	import ProgressBar from '$lib/components/ProgressBar.svelte';

	import type { Stat } from '$lib/services/get-all/types';

	let { data }: { data: Array<Stat> | undefined } = $props();
</script>

<section class="my-4 flex flex-col gap-2">
	{#each data || [] as item}
		<div class="flex gap-2">
			<span class="prose prose-base basis-2/5 text-gray-400"
				>{capitalizeFirstLetters(dashToSpace(item.name))}</span
			>
			<div class="basis-3/5 flex gap-2">
				<span class="prose prose-base text-gray-800 font-bold">{item.base_stat}</span>
				<div class="w-full self-center"><ProgressBar value={item.base_stat} /></div>
			</div>
		</div>
	{/each}
</section>
