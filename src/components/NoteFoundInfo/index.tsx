import style from './NoteFoundInfo.module.scss';
import React from 'react';

export const NotFoundInfo: React.FC = () => {
  return (
    <div className={style.root}>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className={style.description}>К сожалению данная страница отсутсвует в нашем магазине.</p>
    </div>
  );
};
