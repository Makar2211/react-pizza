import React from 'react';
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io';
export const Sort = () => {
  const [sortCategory, setSortCategory] = React.useState(0);
  const [sortModal, setSortModal] = React.useState(false);
  const sorts = ['популярности', 'цене', 'алфавиту'];
  const sortName = sorts[sortCategory];

  const onClickListItem = (index) => {
    setSortCategory(index);
    setSortModal(false);
  };
  return (
    <div className='sort'>
      <div className='sort__label'>
        {sortModal ? <IoMdArrowDropupCircle className='arrow' /> : <IoMdArrowDropdownCircle />}
        <b>Сортировка по:</b>
        <span onClick={() => setSortModal(!sortModal)}>{sortName}</span>
      </div>

      {sortModal ? (
        <div className='sort__popup'>
          <ul>
            {sorts.map((sort, index) => (
              <li
                key={index}
                className={sortCategory === index ? 'active' : ''}
                onClick={() => onClickListItem(index)}
              >
                {sort}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
