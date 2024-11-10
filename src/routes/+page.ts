import GetAll from '$lib/services/get-all';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent, fetch }) => {
	const { queryClient } = await parent();

	await queryClient.prefetchInfiniteQuery(
		GetAll(fetch)()
	);
};
