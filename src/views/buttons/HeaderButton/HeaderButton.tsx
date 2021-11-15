import Button from '@mui/material/Button';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { styled } from '@mui/material/styles';
import { SvgIconTypeMap } from '@mui/material/SvgIcon';
import React, { FC } from 'react';

interface HeaderButtonProps {
  label: string;
  // eslint-disable-next-line @typescript-eslint/ban-types
  Icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  onClickHandler: () => void;
}

const StyledHeaderButton = styled(Button)`
  color: #9aa9bb;
  text-transform: none;
  font-weight: normal;
`;

const HeaderButton: FC<HeaderButtonProps> = (props: HeaderButtonProps) => {
  const { label, Icon, onClickHandler } = props;

  return (
    <StyledHeaderButton startIcon={<Icon />} onClick={onClickHandler}>
      {label}
    </StyledHeaderButton>
  );
};

export default HeaderButton;
