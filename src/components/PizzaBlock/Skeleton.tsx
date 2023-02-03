import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton: React.FC = (props) => (
  <ContentLoader
    className='pizza-block'
    speed={2}
    width={280}
    height={460}
    viewBox='0 0 280 460'
    backgroundColor='#f3f3f3'
    foregroundColor='#ecebeb'
    {...props}
  >
    <circle cx='141' cy='125' r='125' />
    <rect x='0' y='267' rx='10' ry='10' width='280' height='26' />
    <rect x='0' y='306' rx='10' ry='10' width='280' height='93' />
    <rect x='73' y='438' rx='0' ry='0' width='1' height='0' />
    <rect x='0' y='420' rx='10' ry='10' width='112' height='37' />
    <rect x='137' y='408' rx='10' ry='10' width='141' height='51' />
  </ContentLoader>
);

export default Skeleton;
