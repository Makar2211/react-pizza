import React from 'react';
import style from './Search.module.scss';
import { AiOutlineSearch, AiOutlineCloseCircle } from 'react-icons/ai';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/filterSlice';

export const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const updateSeatchValue = React.useCallback(
    debounce((value: string) => {
      dispatch(setSearchValue(value));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    updateSeatchValue(event.target.value);
  };

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
   /*  if(inputRef.current) {
      inputRef.current.focus()
    } */
    inputRef.current?.focus()
  };

  return (
    <div className={style.root}>
      <AiOutlineSearch className={style.icon} />
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={style.input}
        placeholder='поиск ...'
        type='text'
      />
      {value.length > 0 ? (
        <AiOutlineCloseCircle onClick={onClickClear} className={style.close} />
      ) : null}
    </div>
  );
};
