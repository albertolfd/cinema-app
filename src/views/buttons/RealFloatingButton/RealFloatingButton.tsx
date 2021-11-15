import { Fab } from '@mui/material';
import React, { FC } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface RealFloatingButtonProps {
  onClickHandler: () => void;
}

const RealFloatingButton: FC<RealFloatingButtonProps> = (props: RealFloatingButtonProps) => {
  const { onClickHandler } = props;

  return (
    <Fab
      onClick={onClickHandler}
      color="primary"
      sx={{ position: 'fixed', bottom: '2%', right: '2%' }}
    >
      <KeyboardArrowUpIcon />
    </Fab>
  );
};

export default RealFloatingButton;
