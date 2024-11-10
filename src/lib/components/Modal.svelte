<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from 'lucide-svelte';

	let {
		showModal,
		children,
		closable = false,
		onclose
	}: {
		showModal: boolean;
		children: Snippet<[]>;
		closable?: boolean;
		onclose?: () => void;
	} = $props();

	let dialogElement: HTMLDialogElement;

	$effect(() => {
		if (showModal && dialogElement) dialogElement.showModal();
	});

	const _onClose = () => {
		if (dialogElement) {
			dialogElement.close();
		}
		if (onclose) {
			onclose();
		}
	};
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
	data-testid="modal-component"
	class="m-0 overflow-visible p-0"
	bind:this={dialogElement}
	onclose={_onClose}
	onclick={(e) => {
		if (e.target === dialogElement) dialogElement.close();
	}}
>
	{#if closable}
		<div class="fixed right-6 top-4 z-10">
			<button
				data-testid="close-modal"
				class="flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 bg-white"
				onclick={_onClose}
			>
				<X size={16} />
			</button>
		</div>
	{/if}
	<div class="h-screen w-screen">
		{@render children()}
	</div>
</dialog>

<style>
	dialog::backdrop {
		padding: 0;
	}
	dialog {
		width: 100%;
		max-width: 100%;
	}
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
