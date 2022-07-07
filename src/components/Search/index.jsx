import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/images/icon-search.svg';
import { ReactComponent as ClearIcon } from '../../assets/images/icon-close.svg';
import styles from './Search.module.scss';
import debounce from 'lodash.debounce';

const Search = ({ searchValue, setSearchValue }) => {
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef();

  const updateSearchValue = React.useCallback(
    debounce(value => setSearchValue(value), 500),
    []
  );

  const onChangeInput = event => {
    setValue(event.target.value);
    updateSearchValue(event.target.value);
  };

  const onClickClear = () => {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
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
