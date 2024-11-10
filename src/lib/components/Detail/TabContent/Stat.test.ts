import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/svelte';

import Component from './Stat.svelte';

it('Render Detail State', () => {
	render(Component, {
		data: [{ name: 'Stat', base_stat: 1 }]
	});
	const component = screen.getByTestId('detail-stat-component');

	expect(component).toBeInTheDocument();
});
