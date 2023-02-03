import React from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import { useSelector } from 'react-redux';
import {  setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort, sorts } from '../components/Sort';
import { fetchPizzas, SearchPizzaParrams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  //@ts-ignore
  const categoryId = useSelector((state) => state.filter.categoryId);
   //@ts-ignore
  const searchValue = useSelector((state) => state.filter.searchValue);
   //@ts-ignore
  const sortCategory = useSelector((state) => state.filter.sort.sortProperty);
   //@ts-ignore
  const currentPage = useSelector((state) => state.filter.currentPage);
  const { items, status } = useSelector(selectPizzaData);

  const onChangeCategory = (id: number) => {
    dispatch(setCategoryId(id));
  };
  const paginationPage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  //если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortCategory,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortCategory, currentPage]);

  //если был первый рендер то проверяем url параметры и сохраняем в рудакс
  React.useEffect(() => {
    const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParrams;
    if (window.location.search) {
      //@ts-ignore
      const sort = sorts.find((obj) => obj.sortProperty === params.sortProperty);
     
      if(sort) {
         //@ts-ignore
        params.sort = sort
      }
       //@ts-ignore
      dispatch(setFilters(params))
    }

    isSearch.current = true;
  }, []);

  //елси был первый рендер то запрашиваем пиццы
  React.useEffect(() => {
    const getPizzas = async () => {
      if ((isSearch.current = true)) {
        dispatch(
          fetchPizzas({
            categoryId,
            sortCategory,
            searchValue,
            currentPage,
          }),
        );
        window.scrollTo(0, 0);
      }
      isSearch.current = false;
    };
    getPizzas();
  }, [categoryId, sortCategory, searchValue, currentPage]);

  const pizzas = items.map((item: any) => (
    <PizzaBlock
      key={item.id}
      id={item.id}
      title={item.title}
      item={item}
      imageUrl={item.imageUrl}
      price={item.price}
      sizes={item.sizes}
      types={item.types}
    />
  ));
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories value={categoryId} onChangeCategory={(id: number) => onChangeCategory(id)} />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      {status === 'error' ? (
        <div className='content__error-info'>
          <h2>
            Произошла ошибка <span>😕</span>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы. <br /> Попробуйте повторить попытку позже
          </p>
        </div>
      ) : (
        <div className='content__items'>{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination onChangePage={(number: number) => paginationPage(number)} />
    </div>
  );
};