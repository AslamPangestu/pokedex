<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	import ProgressBar from '$lib/components/ProgressBar.svelte';

	import type { Stat } from '$lib/services/get-all/types';

	let { data }: { data: Array<Stat> | undefined } = $props();
</script>

<section class="my-4 flex flex-col gap-2">
	{#each data || [] as item}
		<div class="flex gap-2">
			<span class="prose prose-sm basis-1/2">{capitalizeFirstLetters(dashToSpace(item.name))}</span>
			<div class="prose prose-sm basis-1/2 self-center"><ProgressBar value={item.base_stat} /></div>
		</div>
	{/each}
</section>
