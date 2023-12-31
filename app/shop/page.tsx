// pages/index.tsx
import React from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    title: 'Product 1',
    price: 19.99,
    image: '/product1.webp',
  },
  {
    id: 2,
    title: 'Product 2',
    price: 29.99,
    image: '/product2.webp',
  },
  // Add more products as needed
];

interface ProductItemProps {
  id: number;
  title: string;
  price: number;
  image: string;
}



const ProductItem: React.FC<ProductItemProps> = ({ id, title, price, image }) => {    
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
        <Image className="m-2 rounded w-64" src={image} alt={title} width={256} height={256}/>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">Price: ${price}</p>
      </div>
      <div className="px-6 py-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Buy
        </button>
      </div>
    </div>
  );
};

const Home: React.FC = () => {


    
  return (

<div>
  <div className="text-center">
    <p className="text-2xl m-2 font-semibold">The store:</p>
  </div>
  <div className="flex flex-wrap justify-center">
    {products.map((product) => (
      <ProductItem key={product.id} {...product} />
    ))}
  </div>
</div>

  );
};

export default Home;
