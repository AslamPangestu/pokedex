export type Params = { limit: number; offset: number };

export type Ability = { name: string; hidden: boolean }

export type Stat = { name: string; base_stat: number }

export type About = {
	species: BaseItem & { id: number };
	height: number; // in decimeters
	weight: number; // in hectograms
	abilities: Array<Ability>;
};

export type Item = {
	id: number;
	name: string;
	types: Array<string>;
	image: string;
	about: About;
	stats: Array<Stat>;
	moves: Array<string>;
	color: string
};

export type BaseItem = { name: string; url: string; };

export type BaseType = { type: { name: string }; };

export type BaseStat = { base_stat: number; stat: { name: string }; };

export type BaseMove = { move: { name: string } }

export type BaseAbility = { is_hidden: boolean; ability: { name: string; } }

type BaseSprite = {
	other?: { 'official-artwork'?: { front_default?: string; }; };
}

export type BaseDetail = {
	id: number;
	name: string;
	height: number;
	weight: number;
	types: Array<BaseType>;
	sprites: BaseSprite;
	stats: Array<BaseStat>;
	species: BaseItem;
	moves: Array<BaseMove>;
	abilities: Array<BaseAbility>;
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
