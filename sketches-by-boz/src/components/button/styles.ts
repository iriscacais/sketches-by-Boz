import styled from "styled-components";

export const Button = styled.button`
  background: transparent;
  color: black;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background: rgba(245, 245, 245, 0.5);
  }
`;

export const Icon = styled.img`
  width: 30px;
  height: 30px;
  display: block;
`;
