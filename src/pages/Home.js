import React, { useEffect, useState } from 'react';
import getProducts from '../functions/getProducts';
import ProductCard from '../components/ProductCard';
import { useCartContext } from '../contexts/cartContext';
import { Row, Col, Button } from 'reactstrap';

function Home() {
    const [products, setProducts] = useState(null);
    const { cart, setCart } = useCartContext();

    useEffect(() => {
        async function getProductList() {
            const productList = await getProducts();
            setProducts(productList);
        }
        getProductList();
    }, []);

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    return(
        <div className="homepage">
            {products? products.map((p) => <Row key={p.id}><Col md={3}><ProductCard product={p} /><Button onClick={() => (addToCart(p))}>Add To Cart</Button></Col></Row>) : null}
        </div>
    );
}

export default Home;