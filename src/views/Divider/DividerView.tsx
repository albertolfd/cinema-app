import { Divider, Typography } from '@mui/material';
import React, { FC } from 'react';
import { styled } from '@mui/material/styles';
import SkeletonView from 'views/loadingIndicators/SkeletonView/SkeletonView';

interface DividerViewProps {
  text?: string;
  loading?: boolean;
}

const StyledDivider = styled(Divider)`
  color: #ffffffab;
  margin-top: 15px;
  border-color: #ffffff4f;

  ::after,
  ::before {
    border-color: #ffffff4f;
  }
`;

const DividerView: FC<DividerViewProps> = (props: DividerViewProps) => {
  const { text, loading } = props;

  return (
    <>
      {loading ? (
        <SkeletonView variant="text" height="25px" />
      ) : (
        <StyledDivider>{text && <Typography variant="subtitle1">{text}</Typography>}</StyledDivider>
      )}
    </>
  );
};

export default DividerView;
