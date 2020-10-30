import React, {useState, useEffect} from "react";
import {Container} from "native-base";
import ContentAddProduct from "../components/AddProduct/ContentAddProduct";

const AddProduct = () => {
  return (
    <>
      <Container>
        <ContentAddProduct />
      </Container>
    </>
  );
};

export default AddProduct;
