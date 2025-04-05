import React from 'react';
import ProductCard from "../../productCard/ProductCard";
import Header from "../../header/Header";

const Main = () => {
    return (
        <div>
            <Header/>
            <ProductCard title={"Стейк"} description={"Мраморная говядина, 200 г"} price={1000} imageUrl={""}/>
        </div>
    );
};

export default Main;