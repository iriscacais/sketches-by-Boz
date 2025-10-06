import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Home from "../pages/home";
import * as sketchesApi from "../services/sketches.api";

jest.mock("../services/sketches.api");

describe("Tests integration for update", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should open modal when click in update button, check if the previou text and theme are correct, update and check if the card was updated", async () => {
    const existingSketch = { id: "1", text: "This is an existing note", theme: "lilas" };

   //jest.spyOn garante que você está espiando a mesma função exportada do módulo.
    jest.spyOn(sketchesApi, "getSketches").mockResolvedValueOnce([existingSketch]);

    const updateSpy = jest
      .spyOn(sketchesApi, "updateSketchById")
      .mockResolvedValue({ id: "1", text: "This is an updated note", theme: "verde" });

    render(<Home />);

    expect(await screen.findByText(existingSketch.text)).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: /editar/i }));
    expect(await screen.findByText(/editar sketch/i)).toBeInTheDocument();

    const noteInput = screen.getByDisplayValue(/this is an existing note/i);
    await userEvent.clear(noteInput); // o imput vem preenchido mas precisa limpar em teste se não ele só concatena
    await userEvent.type(noteInput, "This is an updated note");

    const themeSelect = screen.getByLabelText(/tema/i);
    await userEvent.click(themeSelect);
    await userEvent.click(await screen.findByRole("option", { name: /verde/i }));

    await userEvent.click(screen.getByRole("button", { name: /salvar/i }));

    await waitFor(() => {
      expect(updateSpy).toHaveBeenCalledWith("1", {
        text: "This is an updated note",
        theme: "verde",
      });
    });

    await waitFor(() =>
      expect(screen.queryByText(/editar sketch/i)).not.toBeInTheDocument()
    );
    expect(await screen.findByText("This is an updated note")).toBeInTheDocument();
    expect(await screen.findByText(/atualizado com sucesso/i)).toBeInTheDocument();
  });
});
