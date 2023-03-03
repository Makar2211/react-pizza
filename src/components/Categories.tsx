import React from 'react';
import useWhyDidYouUpdate from 'ahooks/lib/useWhyDidYouUpdate'

const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

type CategoriesProps = {
  value : number;
  onChangeCategory: (i: number) => void;
}
export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
  /* useWhyDidYouUpdate('Categories', { value, onChangeCategory }) */
  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={value === index ? 'active' : ''}
            onClick={() => onChangeCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
})
