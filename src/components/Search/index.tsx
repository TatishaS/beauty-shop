import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { setSearchValue } from '../../redux/filter/slice';
import { ReactComponent as SearchIcon } from '../../assets/images/icon-search.svg';
import { ReactComponent as ClearIcon } from '../../assets/images/icon-close.svg';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const searchValue = useAppSelector(state => state.filter);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSearchValue = React.useCallback(
    debounce(value => dispatch(setSearchValue(value)), 500),
    []
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} width="20" height="20" />
      <input
        className={styles.input}
        placeholder="Поиск продукта по названию"
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
      />
      {searchValue && (
        <ClearIcon
          className={styles.clearIcon}
          width="18"
          height="18"
          onClick={onClickClear}
        />
      )}
    </div>
  );
};

export default Search;
