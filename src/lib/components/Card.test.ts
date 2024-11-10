import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event'
import { expect, it, vi } from 'vitest';

import Component from './Card.svelte';

it('Render Card', async () => {
    const onclick = vi.fn()
    const user = userEvent.setup()
    render(Component, {
        name: 'World',
        color: 'bg-red-500',
        image: 'https://via.placeholder.com/150',
        types: ['Grass', 'Poison'],
        onclick
    });
    
    const component = screen.getByTestId('card-component');
    expect(component).toBeInTheDocument();

    await user.click(component)
    expect(onclick).toHaveBeenCalled()
});
