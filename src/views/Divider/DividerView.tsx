/* eslint-disable prettier/prettier */
import { Divider, Typography } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';

interface DividerViewProps {
  text?: string;
}

const StyledDivider = styled(Divider)`
  color: #ffffffab;
  margin-top: 15px;

  ::after, ::before {
    border-color: #ffffff4f;
  }
`;

const DividerView: FC<DividerViewProps> = (props: DividerViewProps) => {
  const { text } = props;

  return (
    <StyledDivider>
      <Typography variant="subtitle1">{text}</Typography>
    </StyledDivider>
  );
};

export default DividerView;
