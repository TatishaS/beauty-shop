import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import Search from '../components/Search';
import ProductBlock from '../components/ProductBlock/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';
import { setActiveCategory, setFilters } from '../redux/slices/filterSlice';

const api = 'https://my-beautyshop-api.herokuapp.com/products?';
// api query example
// https://my-beautyshop-api.herokuapp.com/products?_page=1&_limit=2

// sort query
// https://my-beautyshop-api.herokuapp.com/products?_sort=rating&_order=desc

// search query
// https://my-beautyshop-api.herokuapp.com/products?q=гель
const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  /*  const [selectedSortType, setSelectedSortType] = React.useState({
    name: 'популярности',
    sortProperty: 'rating',
    order: 'desc',
  }); */

  const categoryId = useSelector(state => state.filter.activeCategory);
  const sort = useSelector(state => state.filter.sort);
  const { sortProperty, order } = sort;

  const onChangeCategory = React.useCallback(idx => {
    dispatch(setActiveCategory(idx));
  }, []);

  const fetchProducts = () => {
    setIsLoading(true);
    axios
      .get(
        `${api}${
          categoryId > 0 ? `category=${categoryId}` : ''
        }&_sort=${sortProperty}&_order=${order}`
      )
      .then(res => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        sortProperty,
        order,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortProperty, order]);

  React.useEffect(() => {
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
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchProducts();
    }

    isSearch.current = false;
  }, [categoryId, sortProperty, order]);

  const products = items
    .filter(obj =>
      obj.title.toLowerCase().includes(searchValue.toLowerCase()) ? true : false
    )
    .map(obj => <ProductBlock key={obj.id} {...obj} />);
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
          <Search searchValue={searchValue} setSearchValue={setSearchValue} />
        </div>

        <div className="content__items">{isLoading ? skeletons : products}</div>
      </div>
    </>
  );
};

export default Home;
