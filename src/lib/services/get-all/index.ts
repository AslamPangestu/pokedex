import { PUBLIC_BASE_URL } from '$env/static/public';
import { fetcher } from '$lib/index';

import type {
	BaseItem,
	Item,
	Params,
	Response,
	InterfaceGetAll,
	BaseStat,
	BaseType,
	BaseDetail
} from './types';

const adapter = (base: Array<BaseDetail>): Array<Item> =>
	base.map((item: BaseDetail) => ({
		id: item.id,
		name: item.name,
		types: item.types.map((type: BaseType) => type.type.name),
		image:
			item?.sprites?.other?.['official-artwork']?.front_default ??
			'https://png.pngtree.com/element_our/png/20181205/question-mark-vector-icon-png_256683.jpg',
		about: item.about,
		stats: item.stats.map((stat: BaseStat) => ({
			name: stat.stat.name,
			base_stat: stat.base_stat
		})),
		species: item.species,
		moves: item.moves
	}));

const GetAll =
	(customFetch = fetch) =>
	(): InterfaceGetAll => ({
		queryKey: ['pokemon'],
		initialPageParam: {
			limit: 20,
			offset: 0
		},
		queryFn: async ({ pageParam }: { pageParam: Params }): Promise<Response<Item>> => {
			const response: Response<BaseItem> = await fetcher(
				customFetch,
				`${PUBLIC_BASE_URL}/pokemon/?limit=${pageParam.limit}&offset=${pageParam.offset}`
			);

			const responseDetails: Array<BaseDetail> = await Promise.all(
				response.results.map((item) => fetcher(customFetch, item.url))
			);
			return {
				count: response.count,
				next: response.next,
				previous: response.previous,
				results: adapter(responseDetails)
			};
		},
		getNextPageParam: (lastPage: Response<Item>) => {
			if (lastPage.next) {
				const params = new URLSearchParams(new URL(lastPage.next).search);
				const limit = parseInt(params.get('limit') || '20');
				const offset = parseInt(params.get('offset') || '0');
				return {
					limit,
					offset
				};
			}
			return undefined;
		}
	});

export default GetAll;
