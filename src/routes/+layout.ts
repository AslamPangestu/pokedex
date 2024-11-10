import { browser } from '$app/environment';
import { QueryClient } from '@tanstack/svelte-query';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = () => {
	const queryClient: QueryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser,
				staleTime: 60 * 1000
			}
		}
	});

	return { queryClient };
};
