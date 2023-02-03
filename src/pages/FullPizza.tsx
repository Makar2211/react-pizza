import React from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

export const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pizza, setPizza] = React.useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://638624f5beaa64582674707b.mockapi.io/PizzaBlock/` + id,
        );
        setPizza(data);
      } catch (error) {
        alert('ошибка при получении пиццы!')
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return <>загрузка...</>;
  }
  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt={'пицца'}/>
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} грн.</h4>
    </div>
  );
};
