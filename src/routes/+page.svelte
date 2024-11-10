<script lang="ts">
	import { createInfiniteQuery } from '@tanstack/svelte-query';
	import type { CreateInfiniteQueryResult, InfiniteData } from '@tanstack/svelte-query';

	import Card from '$lib/components/Card.svelte';
	import Detail from '$lib/components/Detail/index.svelte';
	import Loader from '$lib/components/Loader.svelte';
	import Modal from '$lib/components/Modal.svelte';

	import GetAll from '$lib/services/get-all';
	import type { Response, Item } from '$lib/services/get-all/types';

	let mainElement: HTMLElement;

	const query: CreateInfiniteQueryResult<
		InfiniteData<Response<Item>, unknown>,
		Error
	> = createInfiniteQuery(GetAll(fetch)());

	type DetailState = '' | 'modal' | 'page';

	let w: number = $state(0);

	let detail: { type: DetailState; data: Item | null } = $state({
		type: '',
		data: null
	});

	let isPageDetail: boolean = $derived(detail.type === 'page');
	let isModalDetail: boolean = $derived(detail.type === 'modal');

	const _onShowDetail = (data: Item) => {
		detail = {
			type: w >= 768 ? 'page' : 'modal',
			data
		};
	};

	const _onCloseDetail = () => {
		detail = {
			type: '',
			data: null
		};
	};

	const _onScroll = () => {
		if (!$query.hasNextPage || $query.isFetchingNextPage) {
			return;
		}

		if (mainElement.scrollTop + mainElement.clientHeight >= mainElement.scrollHeight) {
			$query.fetchNextPage();
		}
	};
</script>

<svelte:head>
	<title>Pokedex</title>
</svelte:head>

<svelte:window bind:innerWidth={w} />

{#if isPageDetail}
	<div
		class="md:left-2/5 md:-translate-x-2/5 fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform lg:left-1/3 lg:-translate-x-1/3"
	>
		<button
			onclick={_onCloseDetail}
			class="rounded-full bg-blue-500 px-4 py-2 font-bold text-white shadow-lg hover:bg-blue-600"
		>
			X
		</button>
	</div>
{/if}

{#if isModalDetail}
	<Modal showModal={isModalDetail}>
		<Detail data={detail.data} />
	</Modal>
{/if}

<div class="flex max-w-screen-xl flex-row">
	{#if isPageDetail}
		<div class="basis-1/2 lg:basis-1/3"><Detail data={detail.data} /></div>
	{/if}
	<div
		bind:this={mainElement}
		onscroll={_onScroll}
		class="{isPageDetail ? 'basis-1/2 lg:basis-2/3' : 'basis-1/1'} overflow-y-scroll"
	>
		<h1 class="prose prose-2xl mb-8 px-8 pt-8 font-bold">Pokedex</h1>

		<section class="px-8 pb-8">
			{#if $query.error}
				<span>Error: {$query.error.message}</span>
			{/if}
			{#if $query.isSuccess}
				<div
					class="grid grid-cols-1 gap-4 {isPageDetail
						? 'xl:grid-cols-3'
						: 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'}"
				>
					{#each $query.data.pages as { results }}
						{#each results as item}
							<Card
								name={item.name}
								types={item.types}
								color={item.color}
								image={item.image}
								onclick={() => _onShowDetail(item)}
							/>
						{/each}
					{/each}
				</div>
				<div>
					{#if $query.isFetching}
						<Loader />
					{/if}
				</div>
			{/if}
		</section>
	</div>
</div>
