import React, { useState } from "react";
import { CardWrapper, ButtonsContainer, Content} from "./styles";
import Modal from "../modal";
import { deleteSketchById, updateSketchById } from "../../services/sketches.api";
import ButtonWithIcon from "../button/index";
import edit from "../../assets/edit.png";
import delet from "../../assets/delete.png";

type Theme = "laranja" | "verde" | "lilas" | "amarelo";

type Sketch = {
  id: number | string;
  text: string;
  theme: Theme;
};

type CardProps = {
  id: number | string;
  text: string;
  theme: Theme;
  onDeleted: (id: number | string) => void;
  onUpdated: (updated: Sketch) => void;
};

const themeStyles: Record<Theme, { bg: string; color: string }> = {
  amarelo: { bg: "#fcecac", color: "#f46bab" },
  verde: { bg: "#7d791b", color: "#d5d044" },
  laranja: { bg: "orange", color: "#fb059c" },
  lilas: { bg: "#e4d4eb", color: "#e1b745" },
};

const Card: React.FC<CardProps> = ({ id, text, theme, onDeleted, onUpdated }) => {
  const { bg, color } = themeStyles[theme];
  const [editing, setEditing] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteSketchById(id);
      if (res.success) onDeleted(id);
    } catch (err) {
      console.error("Erro ao deletar:", err);
    }
  };

  const handleUpdate = async (payload: { text: string; theme: Theme }) => {
    try {
      console.log(payload)
      const updated = await updateSketchById(id, payload);
      onUpdated(updated as Sketch);
    } catch (err) {
      console.error("Erro ao atualizar:", err);
    }
  };

  return (
    <>
      <CardWrapper bg={bg} color={color}>
        <Content>{text}</Content>

        <ButtonsContainer>
          <ButtonWithIcon onClick={() => setEditing(true)} label="Editar" icon={edit} iconAlt={"caneta"} />
          <ButtonWithIcon onClick={handleDelete} label="Deletar" icon={delet} iconAlt={"lixeira"}/>
        </ButtonsContainer>
      </CardWrapper>

      {editing && (
        <Modal
          title="Editar Sketch"
          onClose={() => setEditing(false)}
          initialText={text}
          initialTheme={theme}
          onSubmit={async (payload) => {
            await handleUpdate(payload);
            setEditing(false);
          }}
        />
      )}
    </>
  );
};

export default Card;