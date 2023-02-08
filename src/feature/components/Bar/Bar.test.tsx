import React from "react";
import {render, screen} from "@testing-library/react";
import Bar from "./Bar";

describe("<Bar />", () => {
    it("renders expected elements", () => {
        render(<Bar />);
        expect(screen.getByText("Bar")).toBeVisible();
    });
});
