import React, { FC } from 'react';

import { useAppSelector, useAppDispatch } from '../hooks';

import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Search from '../components/Search';
import ProductBlock from '../components/ProductBlock/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import { setActiveCategory, setFilters } from '../redux/slices/filterSlice';
import { fetchProducts } from '../redux/slices/productsSlice';

const api = 'https://my-beautyshop-api.herokuapp.com/products?';
// api query example
// https://my-beautyshop-api.herokuapp.com/products?_page=1&_limit=2

// sort query
// https://my-beautyshop-api.herokuapp.com/products?_sort=rating&_order=desc

// search query
// https://my-beautyshop-api.herokuapp.com/products?q=гель
const Home: FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  //const [isLoading, setIsLoading] = React.useState(true);
  //const [searchValue, setSearchValue] = React.useState('');
  const { activeCategory, sort, searchValue } = useAppSelector(
    state => state.filter
  );
  const categoryId = activeCategory;

  const { sortProperty, order } = sort;
  const { items, status } = useAppSelector(state => state.products);

  const onChangeCategory = React.useCallback((idx: number) => {
    dispatch(setActiveCategory(idx));
  }, []);

  const getProducts = async () => {
    try {
      dispatch(
        fetchProducts({ api, categoryId, sortProperty, order, searchValue })
      );
    } catch (error) {
      console.error(error);
      alert('ОШИБКА:' + error);
    }
  };

  /*  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty,
        order,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortProperty, order]); */

  /*  React.useEffect(() => {
    if (
      window.location.search &&
      window.location.search !== '?sortProperty=rating&categoryId=0&order=desc'
    ) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        obj =>
          obj.sortProperty === params.sortProperty && obj.order === params.order
      );

      // проверить сохранение данных в фильтрах
      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );

      isSearch.current = true;
    }
  }, []); */

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getProducts();
    }

    isSearch.current = false;
  }, [categoryId, sortProperty, order]);

  const products = items
    .filter((obj: any) =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false
    )
    .map((obj: any) => <ProductBlock key={obj.id} {...obj} />);
  const skeletons = [...new Array(12)].map((_, idx) => <Skeleton key={idx} />);
  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onClickCategory={onChangeCategory} />
          <Sort />
        </div>
        <div className="content__title-wrapper">
          <h2 className="content__title">Все продукты</h2>
          <Search />
        </div>

        {status === 'error' ? (
          <div className="content__error-info">
            <h2>Произошла ошибка</h2>
            <p>Пожалуйста, попробуйте зайти на страницу позже.</p>
          </div>
        ) : (
          <div className="content__items">
            {status === 'loading' ? skeletons : products}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
