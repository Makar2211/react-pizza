import React, { useState } from 'react';

import './scss/app.scss';
import { Header } from './components/Header.jsx';
import { Categories } from './components/Categories.jsx';
import { Sort } from './components/Sort.jsx';
import { PizzaBlock } from './components/PizzaBlock.jsx';

function App() {
  const [pizzaItems, setPizzaItems] = useState([]);

  React.useEffect(() => {
    fetch('https://638624f5beaa64582674707b.mockapi.io/PizzaBlock')
      .then((response) => response.json())
      .then((arr) => setPizzaItems(arr));
  }, []);
  return (
    <>
      <div className='wrapper'>
        <Header />
        <div className='content'>
          <div className='container'>
            <div className='content__top'>
              <Categories />
              <Sort />
            </div>
            <h2 className='content__title'>Все пиццы</h2>
            <div className='content__items'>
              {pizzaItems.map((item, index) => {
                return (
                  <PizzaBlock key={item.id} item={item} sizes={item.sizes} types={item.types} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
