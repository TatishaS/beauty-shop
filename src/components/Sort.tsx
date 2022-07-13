import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks';
import {
  setSelectedSort,
  SortPropertyEnum,
  OrderEnum,
} from '../redux/slices/filterSlice';

type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
  order: OrderEnum;
};

export const sortList: SortItem[] = [
  {
    name: 'популярности',
    sortProperty: SortPropertyEnum.RATING,
    order: OrderEnum.DESC,
  },
  {
    name: 'цене: по убыванию',
    sortProperty: SortPropertyEnum.PRICE,
    order: OrderEnum.DESC,
  },
  {
    name: 'цене: по возрастанию',
    sortProperty: SortPropertyEnum.PRICE,
    order: OrderEnum.ASC,
  },
  {
    name: 'названию: А-Я',
    sortProperty: SortPropertyEnum.TITLE,
    order: OrderEnum.ASC,
  },
  {
    name: 'названию: Я-А',
    sortProperty: SortPropertyEnum.TITLE,
    order: OrderEnum.DESC,
  },
];

const Sort: FC = React.memo(() => {
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);
  const { name, sortProperty } = useAppSelector(state => state.filter.sort);
  const [openSortPopup, setOpenSortPopup] = React.useState(false);

  const onClickSelectSort = (obj: SortItem) => {
    dispatch(setSelectedSort(obj));
    setOpenSortPopup(false);
  };

  React.useEffect(() => {
    const handleSortPopup = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpenSortPopup(false);
      }
    };
    document.body.addEventListener('click', handleSortPopup);

    return () => {
      document.body.removeEventListener('click', handleSortPopup);
    };
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка по:</b>
        <span onClick={() => setOpenSortPopup(!openSortPopup)}>{name}</span>
      </div>
      {openSortPopup && (
        <div className="sort__popup">
          <ul>
            {sortList.map((item, idx) => (
              <li
                className={sortProperty === item.sortProperty ? 'active' : ''}
                key={idx}
                onClick={() => onClickSelectSort(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;
