import { render, screen } from '@testing-library/svelte';
import { expect, it } from 'vitest';

import Component from './Loader.svelte';

it('Render Loader', () => {
	render(Component);
	const component = screen.getByTestId('loader-component');
	expect(component).toBeInTheDocument();
});
