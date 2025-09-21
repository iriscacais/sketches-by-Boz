import React, { useState } from "react";
import {Overlay, ModalBox, Title, ButtonsContainer} from "./styles";
import { postSketches } from "../../services/sketches.api";
import ButtonWithIcon from "../button/index";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import type { SelectChangeEvent } from "@mui/material/Select";

type ModalProps = {
  onClose: () => void;
  title: string;
  initialText?: string;
  initialTheme?: Theme | "";
  onSubmit?: (payload: { text: string; theme: Theme }) => Promise<void> | void;
};

type Theme = "laranja" | "verde" | "lilas" | "amarelo";

const Modal: React.FC<ModalProps> = ({ onClose, title, initialTheme = "", onSubmit, initialText }) => {
  const [text, setText] = useState(initialText || "");
  const [theme, setTheme] = useState<Theme | "">(initialTheme);

  const isDisabled = !text.trim() || !theme;

   const handleSubmit = async () => {
    try {
      if (onSubmit) {
        await onSubmit({ text, theme: theme as Theme });
      } else {
        await postSketches({ text, theme: theme as Theme });
      }
      onClose();
    } catch (error) {
      console.error("Erro ao salvar:", error);
    }
  };

  const handleThemeChange = (e: SelectChangeEvent) => {
    setTheme(e.target.value as Theme | "");
  };

  return (
    <Overlay>
      <ModalBox>
        <Title>{title}</Title>

        <TextField
          label="Nota"
          placeholder="Escreva sua nota..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          minRows={4}
          variant="outlined"
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="tema-label" shrink>Tema</InputLabel>
          <Select
            labelId="tema-label"
            id="tema"
            label="Tema"
            value={theme}
            onChange={handleThemeChange}
            displayEmpty
          >
            <MenuItem value="" disabled>
              Selecione um tema
            </MenuItem>
            <MenuItem value="laranja">Laranja</MenuItem>
            <MenuItem value="verde">Verde</MenuItem>
            <MenuItem value="lilas">Lilás</MenuItem>
            <MenuItem value="amarelo">Amarelo</MenuItem>
          </Select>
        </FormControl>


        <ButtonsContainer>
          <ButtonWithIcon onClick={handleSubmit} disabled={isDisabled} label={"Salvar"} />
          <ButtonWithIcon onClick={onClose} disabled={false} label={"Cancelar"} />
        </ButtonsContainer>
      </ModalBox>
    </Overlay>
  );
};

export default Modal;