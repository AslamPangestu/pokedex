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
	BaseDetail,
	BaseAbility,
	BaseMove
} from './types';

const TypeColor = {
	normal: 'bg-gray-300',
	fighting: 'bg-red-300',
	flying: 'bg-blue-200',
	poison: 'bg-purple-300',
	ground: 'bg-yellow-300',
	rock: 'bg-gray-400',
	bug: 'bg-green-300',
	ghost: 'bg-indigo-300',
	steel: 'bg-gray-400',
	fire: 'bg-red-200',
	water: 'bg-blue-300',
	grass: 'bg-green-300',
	electric: 'bg-yellow-200',
	psychic: 'bg-pink-300',
	ice: 'bg-blue-100',
	dragon: 'bg-purple-300',
	dark: 'bg-gray-500',
	fairy: 'bg-pink-200',
	stellar: 'bg-teal-300',
	unknown: 'bg-gray-200',
	shadow: 'bg-gray-600'
};


const adapter = (base: Array<BaseDetail>): Array<Item> =>
	base.map((item: BaseDetail) => {
		const type = item.types[0].type.name as keyof typeof TypeColor;
		return {
			id: item.id,
			name: item.name,
			types: item.types.map((type: BaseType) => type.type.name),
			color: TypeColor[type],
			image:
				item?.sprites?.other?.['official-artwork']?.front_default ??
				'https://png.pngtree.com/element_our/png/20181205/question-mark-vector-icon-png_256683.jpg',
			about: {
				height: item.height,
				weight: item.weight,
				species: {
					...item.species,
					id: parseInt(item.species.url.split('/')[6])
				},
				abilities: item.abilities.map((ability: BaseAbility) => ({
					name: ability.ability.name,
					hidden: ability.is_hidden
				}))
			},
			stats: item.stats.map((stat: BaseStat) => ({
				name: stat.stat.name,
				base_stat: stat.base_stat
			})),
			moves: item.moves.map((move: BaseMove) => move.move.name)
		};
	});

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
