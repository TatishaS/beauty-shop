import React from 'react';
import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Search from '../components/Search';
import ProductBlock from '../components/ProductBlock/ProductBlock';
import Skeleton from '../components/ProductBlock/Skeleton';

const api = 'https://my-beautyshop-api.herokuapp.com/products';

const Home = () => {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');

  React.useEffect(() => {
    fetch(api)
      .then(res => res.json())
      .then(data => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, []);

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
          <Categories />
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
