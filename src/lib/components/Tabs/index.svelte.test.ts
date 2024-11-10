import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';

import Component from './index.svelte';
import { createRawSnippet } from 'svelte';

it('Render Tab', async () => {
	const user = userEvent.setup();
	const activeTab: string = $state('world');
	render(Component, {
		activeTab,
		data: [
			{ key: 'world', title: 'World' },
			{ key: 'universe', title: 'Universe' }
		],
		children: createRawSnippet(() => ({ render: () => '<div>Mock</div>' }))
	});

	const component = screen.getByTestId('tab-component');
	expect(component).toBeInTheDocument();

	const button = component.getElementsByTagName('button')[0];
	await user.click(button);
	expect(activeTab).toBe('world');
});
