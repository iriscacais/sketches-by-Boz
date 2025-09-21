import React from 'react';
import {Button, Icon} from './styles';
import Tooltip from "@mui/material/Tooltip";

type ButtonWithIconProps = {
  onClick?: () => void;
  icon?: string;
  iconAlt?: string;
  label: string;
  disabled?: boolean;
};

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