export type Evolve = {
	evolves_to: Array<Evolve>;
	species: {
		name: string;
	};
};

export interface BaseResponse {
	id: number;
	chain: Evolve;
}

export interface BaseResponseSpecies {
	evolution_chain: {
		url: string;
	};
}

export interface Evolution {
	name: string;
	current: boolean;
}

export interface InterfaceGetEvolution {
	queryKey: [string, number];
	queryFn: ({ queryKey }: { queryKey: [string, number] }) => Promise<Array<Evolution>>;
}
