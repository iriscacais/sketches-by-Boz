import styled from "styled-components";

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 64px;
  background: #fff;
  border-bottom: 1px dotted #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  z-index: 1000;
`;

export const Logo = styled.h1`
  font-family: "Georgia", serif;
  font-size: 24px;
  font-weight: bold;
  color: #222;
  letter-spacing: 1px;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;
