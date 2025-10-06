import React, { useState, useEffect } from "react";
import { ContentArea } from "./styles";
import Card from "../cards/index";
import { Theme, CardData, ContentProps } from "../../types/notes";

const Content: React.FC<ContentProps> = ({ sketches, loading, error, onUpdated, onDeleted }) => {
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
          onDeleted={onDeleted}
          onUpdated={onUpdated}
          
          />
      ))}
    </ContentArea>
  );
};

export default Content;
