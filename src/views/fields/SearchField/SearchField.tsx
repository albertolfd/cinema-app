import { TextField } from '@mui/material';
import React, { FC } from 'react';
import './SearchField.scss';

export const SEARCH_FIELD_PLACEHOLDER = 'Search for a movie';

interface SearchFieldProps {
  placeholder: string;
  value: string;
  onChangeHandler: (newValue: string) => void;
}

const SearchField: FC<SearchFieldProps> = (props: SearchFieldProps) => {
  const { placeholder, value, onChangeHandler } = props;

  return (
    <TextField
      value={value}
      onChange={(event) => onChangeHandler(event?.target.value)}
      variant="outlined"
      placeholder={placeholder}
      className="searchField"
    />
  );
};

export default SearchField;
