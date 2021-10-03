import React from 'react';
import CONSTANTS from '../../../constants';
import cl from './ProductImage.module.css'

export default function ProductImage({item}) {
  return (
    <div className={cl.product_image_container}>
      <img
        className={cl.product_image}
        src={CONSTANTS.PUBLIC_PATH + item.image}
        alt={item.name}
      />
    </div>
  );
}
