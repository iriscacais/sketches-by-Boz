import styled from "styled-components";

export const CardWrapper = styled.div<{ bg: string; color: string }>`
  background: ${({ bg }) => bg};
  color: ${({ color }) => color};
  box-shadow: 2px 2px 6px rgba(0,0,0,0.15);
  border-radius: 16px;
  border: 1px solid rgba(244, 231, 231, 0.32);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 16px;
  text-align: center;
  font-size: 16px;

  max-width: 300px;
  height: 300px;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

export const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ButtonsContainer = styled.div`
  margin-top: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding-top: 12px;
`;
