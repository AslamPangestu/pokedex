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

<div data-testid="tab-component" class="mx-auto max-w-xl">
	<div class="mb-4 flex justify-between">
		{#each data as { key, title }}
			<button
				onclick={() => _onSelect(key)}
				class="prose prose-base flex-1 py-2 text-center hover:bg-gray-100 active:font-bold active:text-blue-500 {activeTab ===
				key
					? 'border-red border-b border-blue-500 font-bold text-blue-500'
					: 'border-b border-gray-200 text-gray-400'} active:border-b active:border-blue-500"
				>{title}</button
			>
		{/each}
	</div>
	{@render children()}
</div>
