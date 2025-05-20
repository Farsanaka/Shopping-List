import { render, screen } from "@testing-library/react";
import BackgroundLayout from "../components/BackgroundLayout";
import React from "react";

describe("BackgroundLayout", () => {
  const bgImage = "/test-image.jpg";
  const childText = "Test Content";

  it("renders the background image and children", () => {
    render(
      <BackgroundLayout bgImage={bgImage}>
        <div>{childText}</div>
      </BackgroundLayout>
    );

    expect(screen.getByText(childText)).toBeInTheDocument();

    const backgroundDiv =
      screen.getByText(childText).parentElement.parentElement;
    expect(backgroundDiv).toHaveStyle(`background-image: url(${bgImage})`);

    const overlay = backgroundDiv.querySelector(
      ".absolute.inset-0.bg-black.opacity-75"
    );
    expect(overlay).toBeInTheDocument();
  });
});
