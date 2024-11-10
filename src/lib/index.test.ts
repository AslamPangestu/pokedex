import { expect, it } from "vitest";

import { capitalizeFirstLetters, dashToSpace, fetcher, sleep } from './index';

it("Capitalize all first letter in sentence", () => {
    expect(capitalizeFirstLetters("hello world")).toBe("Hello World");
})

it("Remove all dash to space", () => {
    expect(dashToSpace("hello-world")).toBe("hello world");
})