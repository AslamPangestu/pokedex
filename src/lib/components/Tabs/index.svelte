<script lang="ts">
	import type { Snippet } from 'svelte';

	import type { TabHeaderType } from './types';

	let {
		activeTab = $bindable(),
		data,
		children
	}: {
		activeTab: string;
		data: TabHeaderType;
		children: Snippet<[]>;
	} = $props();

	$effect(() => {
		_onSelect(data[0].key);
	});

	const _onSelect = (key: string) => {
		activeTab = key;
	};
</script>

<div class="mx-auto max-w-xl">
	<div class="flex justify-between mb-4">
		{#each data as { key, title }}
			<button
				onclick={() => _onSelect(key)}
				class="flex-1 {activeTab === key
					? 'border-red border-b font-bold text-blue-600'
					: 'border-b border-gray-200 text-gray-600'}  active:border-red py-2 text-center hover:bg-gray-100 focus:outline-none active:border-b active:font-bold active:text-blue-600"
				>{title}</button
			>
		{/each}
	</div>
	{@render children()}
</div>
