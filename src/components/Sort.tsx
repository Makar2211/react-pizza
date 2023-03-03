import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSort, setSortCategory, SortPropertyEnum } from '../redux/slices/filterSlice';
import { IoMdArrowDropupCircle, IoMdArrowDropdownCircle } from 'react-icons/io';

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
}

export const sorts: SortItem[] = [
  { name: 'популярности(↓)', sortProperty: SortPropertyEnum.RAITING_DESC },
  { name: 'популярности(↑)', sortProperty: SortPropertyEnum.RAITING_ASC },
  { name: 'цене(↓)', sortProperty: SortPropertyEnum.PRICE_DESC},
  { name: 'цене(↑)', sortProperty: SortPropertyEnum.PRICE_ASC },
  { name: 'алфавиту(↓)', sortProperty: SortPropertyEnum.TITLE_DESC },
  { name: 'алфавиту(↑)', sortProperty: SortPropertyEnum.TITLE_ASC },
];

export const SortPopup: React.FC = () => {
  const sort = useSelector(selectSort);
  const dispatch = useDispatch();
  const sortRef = React.useRef<HTMLDivElement>(null);

  const [sortModal, setSortModal] = React.useState(false);

  const onClickListItem = (obj: SortItem) => {
     //@ts-ignore
    dispatch(setSortCategory(obj));
    setSortModal(false);
  };


  React.useEffect(() => {
    const handelSlickOutside = (event: MouseEvent) => {
      const _event = event as MouseEvent & {
        path: Node[]
      }
      if (sortRef.current && !_event.path.includes(sortRef.current)) {
        setSortModal(false);
      }
    };
    document.body.addEventListener('click', handelSlickOutside);

    return () => {
      document.body.removeEventListener('click', handelSlickOutside);
    };
  }, []);
  return (
    <div ref={sortRef} className='sort'>
      <div className='sort__label'>
        {sortModal ? <IoMdArrowDropupCircle className='arrow' /> : <IoMdArrowDropdownCircle />}
        <b>Сортировка по:</b>
        <span onClick={() => setSortModal(!sortModal)}>{sort.name}</span>
      </div>

      {sortModal ? (
        <div className='sort__popup'>
          <ul>
            {sorts.map((obj, index) => (
              <li
                key={index}
                className={sort.sortProperty === obj.sortProperty ? 'active' : ''}
                onClick={() => onClickListItem(obj)}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
