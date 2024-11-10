<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	let { data }: { data: Array<string> | undefined } = $props();
</script>

<div class="grid grid-cols-2 gap-4">
	{#each data || [] as item}
		<div class="card text-center">
			<span class="prose prose-base text-gray-800 font-bold">
				{capitalizeFirstLetters(dashToSpace(item))}
			</span>
		</div>
	{/each}
</div>
