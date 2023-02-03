import React from 'react';
import style from './Pagination.module.scss';
import ReactPaginate from 'react-paginate';

type PaginationProps ={
  onChangePage: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({ onChangePage }) => {
  return (
    <ReactPaginate
      className={style.root}
      breakLabel='...'
      previousLabel='<'
      nextLabel=' >'
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
    />
  );
};
