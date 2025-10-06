import { render, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import Home from "../pages/home";
import { getSketches, postSketches } from "../services/sketches.api";

jest.mock("../services/sketches.api");

describe("Tests integration for create", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it("should open modal when click in create button, create a sketch, close modal and render new sketch", async () => {
        (getSketches as jest.Mock).mockResolvedValue([]); // necessário porque home chama getSketches ao montar
        (postSketches as jest.Mock).mockResolvedValue({
            id: "1",
            text: "This is a new note",
            theme: "verde",
        });

        render(<Home />);

        const createButton = await screen.findByRole("button", { name: /criar/i });
        await userEvent.click(createButton);

        const modalTitle = await screen.findByText(/criar sketch/i);
        expect(modalTitle).toBeInTheDocument();

        const saveButton = screen.getByRole("button", { name: /salvar/i });
        expect(saveButton).toBeDisabled();

        const noteInput = screen.getByLabelText(/nota/i);
        await userEvent.type(noteInput, "This is a new note");

        // aqui eu tentei usar o select options, mas no mui precisa de um clique para abrir o menu
        // e outro clique para selecionar a opção
        const themeSelect = screen.getByLabelText(/selecione um tema/i);
        await userEvent.click(themeSelect);

        const option = await screen.findByRole("option", { name: /verde/i });
        await userEvent.click(option);


        expect(saveButton).toBeEnabled();
        await userEvent.click(saveButton);

        await waitFor(() => {
            expect(postSketches).toHaveBeenCalledWith({ text: "This is a new note", theme: "verde" });
        })

        await waitFor(() => {
            expect(modalTitle).not.toBeInTheDocument();
        });

        const newNote = await screen.findByText("This is a new note");
        expect(newNote).toBeInTheDocument();

        expect(await screen.findByText(/criado com sucesso/i)).toBeInTheDocument();
    });
});