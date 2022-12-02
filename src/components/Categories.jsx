import React from 'react';
export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];
  const onCLickCategory = (index) => {
    setActiveIndex(index);
  };
  return (
    <div className='categories'>
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            className={activeIndex === index ? 'active' : ''}
            onClick={() => onCLickCategory(index)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};
