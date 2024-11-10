<script lang="ts">
	import { capitalizeFirstLetters } from '$lib/index';
	import Chip from './Chip.svelte';

	let {
		name,
		color,
		image,
		types,
		onclick
	}: { name: string; color: string; image: string; types: Array<string>; onclick: () => void } =
		$props();
</script>

<button class="rounded-3xl p-4 text-left {color} hover:opacity-80 shadow-lg" {onclick}>
	<div class="flex flex-col gap-2">
		<h2 class="prose prose-xl font-bold text-white">{capitalizeFirstLetters(name)}</h2>
		<div class="grid grid-cols-2 gap-4">
			<div class="flex h-min flex-wrap gap-2">
				{#each types as type}
					<Chip text={type} />
				{/each}
			</div>

			<div class="flex flex-col justify-end">
				<img class="object-fill" src={image} alt={name} />
			</div>
		</div>
	</div>
</button>
