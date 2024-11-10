<script lang="ts">
	import type { Snippet } from 'svelte';

	let { key, activeTab, children }: { key: string; activeTab: string; children: Snippet<[]> } =
		$props();
</script>

{#if activeTab === key} {@render children()} {/if}
