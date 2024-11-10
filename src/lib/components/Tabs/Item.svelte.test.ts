import { render } from '@testing-library/svelte';
import { expect, it } from 'vitest';

import Component from './Item.svelte';
import { createRawSnippet } from 'svelte';

it('Render Tab Item', async () => {
	const activeTab: string = $state('world');
	const component = render(Component, {
		activeTab,
		key: "world",
		children: createRawSnippet(() => ({ render: () => '<div>Mock</div>' }))
	});

	expect(component.container).toHaveTextContent('Mock');
});
