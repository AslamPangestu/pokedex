import { expect, it } from "vitest";
import { render, screen } from "@testing-library/svelte";

import Component from './About.svelte';

it("Render Detail About", () => {
    render(Component, {
        data: {
            abilities: [{ name: 'Ability', hidden: false }],
            height: 1,
            weight: 1,
            species: { name: 'Species', id: 1, url: '' },
        }
    });
    const component = screen.getByTestId('detail-about-component');
    
    expect(component).toBeInTheDocument();

});