<script lang="ts">
	import type { Snippet } from 'svelte';

	let { showModal, children }: { showModal: boolean; children: Snippet<[]> } = $props();

	let dialogElement: HTMLDialogElement;

	$effect(() => {
		if (showModal) dialogElement.showModal();
	});
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	class="m-0 h-screen w-screen overflow-visible p-0"
	bind:this={dialogElement}
	onclose={() => (showModal = false)}
	onclick={(e) => {
		if (e.target === dialogElement) dialogElement.close();
	}}
>
	<div class="h-screen w-screen">
		{@render children()}
	</div>
</dialog>

<style>
	dialog[open] {
		animation: zoom 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}
	@keyframes zoom {
		from {
			transform: scale(0.95);
		}
		to {
			transform: scale(1);
		}
	}
</style>
