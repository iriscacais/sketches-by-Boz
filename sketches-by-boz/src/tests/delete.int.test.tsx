import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Home from "../pages/home";
import * as sketchesApi from "../services/sketches.api";

jest.mock("../services/sketches.api");

describe("Tests integration for delete", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("should delete a sketch when the delete button is clicked and the action is confirmed", async () => {
        const existingSketch = { id: "1", text: "This is an existing note", theme: "lilas" };

        jest.spyOn(sketchesApi, "getSketches").mockResolvedValueOnce([existingSketch]);

    });
});