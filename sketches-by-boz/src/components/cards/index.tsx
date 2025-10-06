import React, { useState } from "react";
import { CardWrapper, ButtonsContainer, Content } from "./styles";
import Modal from "../modal";
import ButtonWithIcon from "../button/index";
import edit from "../../assets/edit.png";
import delet from "../../assets/delete.png";
import { CardProps, Theme } from "../../types/notes";

const themeStyles: Record<Theme, { bg: string; color: string }> = {
  amarelo: { bg: "#fcecac", color: "#f46bab" },
  verde: { bg: "#7d791b", color: "#d5d044" },
  laranja: { bg: "orange", color: "#fb059c" },
  lilas: { bg: "#e4d4eb", color: "#e1b745" },
};

const Card: React.FC<CardProps> = ({ id, text, theme, onDeleted, onUpdated }) => {
  const { bg, color } = themeStyles[theme];
  const [editing, setEditing] = useState(false);

  return (
    <>
      <CardWrapper bg={bg} color={color}>
        <Content>{text}</Content>

        <ButtonsContainer>
          <ButtonWithIcon onClick={() => setEditing(true)} label="Editar" icon={edit} iconAlt={"caneta"} />
          <ButtonWithIcon onClick={() => onDeleted(id)} label="Deletar" icon={delet} iconAlt={"lixeira"} />
        </ButtonsContainer>
      </CardWrapper>

      {editing && (
        <Modal
          title="Editar Sketch"
          onClose={() => setEditing(false)}
          initialText={text}
          initialTheme={theme}
          onSubmit={(payload) => onUpdated(id, payload)}
        />
      )}
    </>
  );
};

export default Card;