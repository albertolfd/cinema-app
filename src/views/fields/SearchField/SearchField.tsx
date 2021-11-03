import { TextField } from '@mui/material';
import React, { FC } from 'react';
import './SearchField.scss';

interface SearchFieldProps {
  placeholder: string;
}

const SearchField: FC<SearchFieldProps> = (props: SearchFieldProps) => {
  const { placeholder } = props;

  return <TextField variant="outlined" placeholder={placeholder} className="searchField" />;
};

export default SearchField;
