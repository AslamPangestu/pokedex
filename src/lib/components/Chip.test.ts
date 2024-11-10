import { render, screen } from '@testing-library/svelte';
import { expect, test } from 'vitest';

import Component from './Chip.svelte';

test('no initial greeting', () => {
	render(Component, { text: 'World' });

	const component = screen.getByTestId('chip-component');

	expect(component).toBeInTheDocument();
});
