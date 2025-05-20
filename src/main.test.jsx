import { describe, it, expect, beforeEach } from "vitest";
import { waitFor } from "@testing-library/react";
 
beforeEach(() => {
  const root = document.createElement("div");
  root.id = "root";
  document.body.innerHTML = "";
  document.body.appendChild(root);
});
 
describe("Main entry point", () => {
  it("renders without crashing", async () => {
    // Import AFTER DOM is set
    await import("./main.jsx");
 
    const root = document.getElementById("root");
 
    // Wait for something to render
    await waitFor(() => {
      expect(root.innerHTML.length).toBeGreaterThan(0);
    });
  });
});
 