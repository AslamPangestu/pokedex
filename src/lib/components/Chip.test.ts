import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';

import Component from './Chip.svelte';

it('Render Chip', () => {
	render(Component, { text: 'World' });
	const component = screen.getByTestId('chip-component');
	expect(component).toBeInTheDocument();
});
