<script lang="ts">
	let { value }: { value: number } = $props();
</script>

<div class="w-full rounded-full bg-gray-200">
	<div
		class="rounded-full {value > 50 ? 'bg-green-300' : 'bg-red-300'} p-0.5"
		style="width: {value}%"
	></div>
</div>
