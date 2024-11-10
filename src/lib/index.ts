// place files you want to import through the `$lib` alias in this folder.

export const fetcher = async (customFetch = fetch, url: string) => {
	const fetcher = await customFetch(url);
	const data = await fetcher.json();
	return data;
};

export const sleep = (ms: number) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const capitalizeFirstLetters = (value: string) =>
	value
		.split(' ')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');

export const dashToSpace = (value: string) => value.replace(/-/g, ' ');
