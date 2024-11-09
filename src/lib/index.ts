// place files you want to import through the `$lib` alias in this folder.

export const fetcher = async (customFetch = fetch, url: string)=> {
	const fetcher = await customFetch(url);
	const data = await fetcher.json();
	return data;
};
