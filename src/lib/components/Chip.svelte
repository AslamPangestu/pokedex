<script lang="ts">
	import { capitalizeFirstLetters } from '$lib/index';

	let { text }: { text: string } = $props();
</script>

<span data-testid="chip-component" class="glass prose prose-sm rounded-3xl px-4 text-center text-white"
	>{capitalizeFirstLetters(text)}</span
>
