import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const ModalBox = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 500px;
  max-width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  label {
    color: black;
  }
  textarea {
    width: 100%;
    padding: 8px;
    margin-top: 4px;
  }
`;

export const Title = styled.h2`
  color: black;
  font-size: 18px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
