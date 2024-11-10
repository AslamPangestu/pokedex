<script lang="ts">
	import { capitalizeFirstLetters, dashToSpace } from '$lib/index';

	import type { About, Ability } from '$lib/services/get-all/types';

	let { data }: { data: About | undefined } = $props();

	const _round = (value: number) => {
		return Math.round((value + Number.EPSILON) * 100) / 100;
	};
	const _formatHeight = (height: number) => {
		const inches = height * 3.93701;

		const feet = Math.floor(inches / 12);
		const remainingInches = inches % 12;

		return `${feet}'${_round(remainingInches)}" (${height / 10} cm)`;
	};

	const _formatWeight = (weight: number) => {
		const lbsPerHg = 0.220462;
		return `${_round(weight * lbsPerHg)} lbs (${weight / 10} kg)`;
	};

	const fields = $derived([
		{
			label: 'Species',
			value: capitalizeFirstLetters(data?.species.name || '')
		},
		{
			label: 'Height',
			value: _formatHeight(data?.height || 0)
		},
		{
			label: 'Weight',
			value: _formatWeight(data?.weight || 0)
		},
		{
			label: 'Abilities',
			value: data?.abilities
				.map((item: Ability) => {
					let name = capitalizeFirstLetters(dashToSpace(item.name));
					if (item.hidden) name += '(H)';
					return name;
				})
				.join(', ')
		}
	]);
</script>

<section class="my-4 flex flex-col gap-2">
	{#each fields as field}
		<div class="flex gap-2">
			<span class="prose prose-base basis-1/4 text-gray-400">{field.label}</span>
			<span class="prose prose-base basis-3/4 text-gray-800 font-bold">{field.value}</span>
		</div>
	{/each}
</section>
