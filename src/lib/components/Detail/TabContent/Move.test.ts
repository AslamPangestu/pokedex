import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Component from './Move.svelte';

it('Render Detail Move', () => {
	render(Component, {
		data: ['Move']
	});
	const component = screen.getByTestId('detail-move-component');

	expect(component).toBeInTheDocument();
});
