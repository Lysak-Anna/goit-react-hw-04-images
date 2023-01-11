import PropTypes from 'prop-types';
import { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Header,
  SearchForm,
  SearchFormButton,
  SearchFormButtonLabel,
  SearchFormInput,
  Icon,
} from './Searchbar.styled';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');

  function onChangeHandler(event) {
    setSearchValue(event.currentTarget.value.toLowerCase());
  }
  function onSubmitHandler(event) {
    event.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Enter search word');
      return;
    }
    onSubmit(searchValue);
    setSearchValue('');
  }

  return (
    <Header>
      <SearchForm onSubmit={onSubmitHandler}>
        <SearchFormButton type="submit">
          <Icon />
          <SearchFormButtonLabel>Search</SearchFormButtonLabel>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={onChangeHandler}
        />
      </SearchForm>
    </Header>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
