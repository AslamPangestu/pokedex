import { render, screen } from '@testing-library/svelte';
import { describe, expect, it } from 'vitest';

import Component from './ProgressBar.svelte';

describe('ProgressBar', () => {
	it('Render Red', () => {
		render(Component, { value: 40 });
		const component = screen.getByTestId('progressbar-component');
		expect(component).toBeInTheDocument();
		expect(component.children[0]).toHaveClass('bg-red-500');
	});
	it('Render Green', () => {
		render(Component, { value: 60 });
		const component = screen.getByTestId('progressbar-component');
		expect(component).toBeInTheDocument();
		expect(component.children[0]).toHaveClass('bg-green-500');
	});
});
