 import React, {useState} from "react";
 import { 
  HeaderContainer, 
  Logo, 
  ButtonsContainer, 
} from "./styles";
import Modal from "../modal/index";
import ButtonWithIcon from "../button/index";
import pen from "../../assets/caneta-pena.png";
import { Theme, HeaderProps} from "../../types/notes";

const Header: React.FC<HeaderProps> = ({onCreate}) => {
  const [open, setOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>Notas</Logo>
      <ButtonsContainer>
        <ButtonWithIcon onClick={() => setOpen(true)} icon={pen} iconAlt={"caneta"} disabled={false} label={"Criar"} />
      </ButtonsContainer>

      {open && <Modal onClose={() => setOpen(false)} title="Criar Sketch" initialTheme="" onSubmit={onCreate}/>}
    </HeaderContainer>
  );
};

export default Header;