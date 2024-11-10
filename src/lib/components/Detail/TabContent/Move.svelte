<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	let { data }: { data: Array<string> | undefined } = $props();
</script>

<div class="grid grid-cols-2 gap-4">
	{#each data || [] as item}
		<div class="card">
			{capitalizeFirstLetters(dashToSpace(item))}
		</div>
	{/each}
</div>
