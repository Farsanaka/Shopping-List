import { render, screen } from "@testing-library/react";
import Logo from "./Logo";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
//describe what you are testing  here it is  Logo component

//test inside this
// it-> decsribe what a specific test does
// expect-> checks if your code behaves as expected
//logo component->label for tis grp o test
//it->single test case
describe("Logo component", () => {
  it("renders the logo text", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );
    //find element that contains the exact text shoppie
    const logoText = screen.getByText("Shoppie");
    expect(logoText).toBeInTheDocument();
  });

  it("renders a link to home page", () => {
    render(
      <BrowserRouter>
        <Logo />
      </BrowserRouter>
    );

    const link = screen.getAllByRole("link");
    link.forEach((aTag) => {
      expect(aTag).toHaveAttribute("href"); // Just checks if href exists
    });
  });
});
