import { Button } from "antd";
import React from "react";

type AddToCartProps = {
  value: string;
  product: any;
};

const AddToCart = ({ value, product }: AddToCartProps) => {
  
    const handleAddToCart = (product: any) => {
    console.log(product);
  };

  return (
    <>
      {value === "" ? (
        <Button type="primary" block disabled>
          Add To Cart
        </Button>
      ) : (
        <Button
          onClick={() => handleAddToCart(product)}
          type="primary"
          block
        >
          Add To Cart
        </Button>
      )}
    </>
  );
};

export default AddToCart;
