import { PUBLIC_BASE_URL } from '$env/static/public';
import { fetcher } from '$lib/index';

import type {
	InterfaceGetEvolution,
	BaseResponse,
	BaseResponseSpecies,
	Evolution,
	Evolve
} from './types';

const adapter = (base: Evolve, evolutions: Array<Evolution>) => {
	evolutions.push({name: base.species.name, current: false});
	base.evolves_to.forEach((evolve) => {
		adapter(evolve, evolutions);
	});
};

const GetEvolution =
	(customFetch = fetch) =>
	(id: number): InterfaceGetEvolution => ({
		queryKey: ['pokemon', id],
		queryFn: async ({ queryKey }: { queryKey: [string, number] }): Promise<Array<Evolution>> => {
			const [, id] = queryKey;
			const responseSpecies: BaseResponseSpecies = await fetcher(
				customFetch,
				`${PUBLIC_BASE_URL}/pokemon-species/${id}`
			);

			const response: BaseResponse = await fetcher(
				customFetch,
				responseSpecies.evolution_chain.url
			);
			const evolutions: Array<Evolution> = [];
			adapter(response.chain, evolutions);
			return evolutions;
		}
	});

export default GetEvolution;
