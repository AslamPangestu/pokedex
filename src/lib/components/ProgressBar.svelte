<script lang="ts">
	let { value }: { value: number } = $props();
</script>

<div data-testid="progressbar-component" class="w-full rounded-full bg-gray-200">
	<div
		class="rounded-full {value > 50 ? 'bg-green-500' : 'bg-red-500'} p-0.5"
		style="width: {value}%"
	></div>
</div>
