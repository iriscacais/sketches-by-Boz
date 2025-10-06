import React from 'react';
import {Button, Icon} from './styles';
import Tooltip from "@mui/material/Tooltip";
import { ButtonWithIconProps } from '../../types/notes';

const ButtonWithIcon : React.FC<ButtonWithIconProps> = ({
  onClick,
  icon,
  iconAlt = "ícone",
  label,
  disabled,
}) =>  {
  const hasIcon = Boolean(icon);
    return (
      <Tooltip title={label}>
        <Button onClick={onClick} type="button" disabled={disabled} aria-label={hasIcon ? label : undefined}>
             {hasIcon ? <Icon src={icon} alt={iconAlt} aria-hidden /> : label}
        </Button>
      </Tooltip>
    )
};

export default ButtonWithIcon;