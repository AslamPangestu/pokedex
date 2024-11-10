<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	import type { About, Ability } from '$lib/services/get-all/types';

	let { data }: { data: About | undefined } = $props();
</script>

<section class="my-4 flex flex-col gap-2">
	<div class="flex gap-2">
		<span class="prose prose-sm basis-1/4">Species</span>
		<span class="prose prose-sm basis-3/4">{capitalizeFirstLetters(data?.species.name || '')}</span>
	</div>
	<div class="flex gap-2">
		<span class="prose prose-sm basis-1/4">Height</span>
		<span class="prose prose-sm basis-3/4">2'3.6" (0.70 cm)</span>
	</div>
	<div class="flex gap-2">
		<span class="prose prose-sm basis-1/4">Weight</span>
		<span class="prose prose-sm basis-3/4">15.2 lbs (6.9 kg)</span>
	</div>
	<div class="flex gap-2">
		<span class="prose prose-sm basis-1/4">Abilities</span>
		<span class="prose prose-sm basis-3/4"
			>{data?.abilities
				.map((item: Ability) => {
					let name = capitalizeFirstLetters(dashToSpace(item.name));
					if (item.hidden) name += '(H)';
					return name;
				})
				.join(', ')}</span
		>
	</div>
</section>
