<script lang="ts">
	import { capitalizeFirstLetters } from '$lib/index';

	import Chip from '$lib/components/Chip.svelte';
	import Tabs from '$lib/components/Tabs/index.svelte';
	import TabItem from '$lib/components/Tabs/Item.svelte';
	import type { TabHeaderType } from '$lib/components/Tabs/types';

	import type { Item } from '$lib/services/get-all/types';

	import AboutTab from './TabContent/About.svelte';
	import StatTab from './TabContent/Stat.svelte';
	import EvolutionTab from './TabContent/Evolution.svelte';
	import MoveTab from './TabContent/Move.svelte';

	let { data }: { data: Item | null } = $props();

	let activeTab: string = $state('about');

	const details: TabHeaderType = [
		{
			key: 'about',
			title: 'About'
		},
		{
			key: 'base-stat',
			title: 'Base Stat'
		},
		{
			key: 'evolution',
			title: 'Evolution'
		},
		{
			key: 'moves',
			title: 'Moves'
		}
	];
</script>

<div class="h-full overflow-hidden shadow-lg">
	<div class="h-full {data?.color} overflow-y-scroll text-white">
		<div class="flex justify-between gap-4 px-8 pt-8">
			<div>
				<h2 class="prose prose-xl font-bold text-white">
					{capitalizeFirstLetters(data?.name || '')}
				</h2>
				{#if data}
					<div class="flex flex-wrap gap-2">
						{#each data?.types as type}
							<Chip text={type} />
						{/each}
					</div>
				{/if}
			</div>

			<div class="self-center">
				<span class="text-md">#{data?.id.toString().padStart(3, '0')}</span>
			</div>
		</div>
		<div class="-mb-8 flex w-full justify-center">
			<img class="w-48 object-fill" src={data?.image} alt={data?.name} />
		</div>
		<div class="mx-1 min-h-full rounded-tl-3xl rounded-tr-3xl bg-white p-8 text-gray-700">
			<Tabs bind:activeTab data={details}>
				<TabItem {activeTab} key="about">
					<AboutTab data={data?.about} />
				</TabItem>
				<TabItem {activeTab} key="base-stat">
					<StatTab data={data?.stats} />
				</TabItem>
				<TabItem {activeTab} key="evolution">
					{#if data}
						<EvolutionTab id={data?.about.species.id} />
					{/if}
				</TabItem>
				<TabItem {activeTab} key="moves">
					<MoveTab data={data?.moves} />
				</TabItem>
			</Tabs>
		</div>
	</div>
</div>
