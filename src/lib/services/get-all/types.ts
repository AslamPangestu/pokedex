export type Params = { limit: number; offset: number };

type About = {
	species: string;
	height: number; // in decimeters
	weight: number; // in hectograms
	abilities: Array<{ name: string; hidden: boolean }>;
};

export type Item = {
	id: number;
	name: string;
	types: Array<string>;
	image: string;
	about: About;
	stats: Array<{ name: string; base_stat: number }>;
	species: BaseItem;
	moves: Array<string>;
};

export type BaseItem = {
	name: string;
	url: string;
};

export type BaseType = {
	type: { name: string };
};

export type BaseStat = {
	base_stat: number;
	stat: { name: string };
};

interface BaseSprite {
	other?: {
		'official-artwork'?: {
			front_default?: string;
		};
	};
}

export type BaseDetail = {
	id: number;
	name: string;
	types: Array<BaseType>;
	sprites: BaseSprite;
	about: About;
	stats: Array<BaseStat>;
	species: BaseItem;
	moves: Array<string>;
};

export interface Response<Model> {
	next: string | null;
	previous: string | null;
	count: number;
	results: Array<Model>;
}

export interface InterfaceGetAll {
	queryKey: string[];
	initialPageParam: Params;
	queryFn: (params: { pageParam: Params }) => Promise<Response<Item>>;
	getNextPageParam: (lastPage: Response<Item>) => Params | undefined;
}
