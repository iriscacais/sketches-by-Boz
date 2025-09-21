import React, { useState, useEffect } from "react";
import { ContentArea } from "./styles";
import Card from "../cards/index";

type CardData = {
  id: number | string;
  text: string;
  theme: "amarelo" | "verde" | "laranja" | "lilas";
};

type ContentProps = {
  sketches: CardData[];
  loading: boolean;
  error: string;
  onUpdate: (updated: CardData) => void;
  onDelete: (id: CardData["id"]) => void;
};


const Content: React.FC<ContentProps> = ({ sketches, loading, error, onUpdate, onDelete }) => {
  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentArea>
      {sketches.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          theme={card.theme}
          onDeleted={onDelete}
          onUpdated={onUpdate}
          
          />
      ))}
    </ContentArea>
  );
};

export default Content;
