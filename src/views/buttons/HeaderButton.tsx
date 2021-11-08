import Button from '@mui/material/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { styled } from '@mui/material/styles';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import React, { FC } from 'react';

interface HeaderButtonProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
}

const StyledHeaderButton = styled(Button)`
  color: #9aa9bb;
  font-size: 16px;
  text-transform: none;
`;

const HeaderButton: FC<HeaderButtonProps> = (props: HeaderButtonProps) => {
  const { label, Icon } = props;

  return <StyledHeaderButton startIcon={<Icon />}>{label}</StyledHeaderButton>;
};

export default HeaderButton;
