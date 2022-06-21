import React from 'react';
import { ReactComponent as SearchIcon } from '../../assets/images/icon-search.svg';
import { ReactComponent as ClearIcon } from '../../assets/images/icon-close.svg';
import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  return (
    <div className={styles.root}>
      <SearchIcon className={styles.icon} width="20" height="20" />
      <input
        className={styles.input}
        placeholder="Поиск продукта по названию"
        value={searchValue}
        onChange={event => setSearchValue(event.target.value)}
      />
      {searchValue && (
        <ClearIcon
          className={styles.clearIcon}
          width="18"
          height="18"
          onClick={() => setSearchValue('')}
        />
      )}
    </div>
  );
};

export default Search;
