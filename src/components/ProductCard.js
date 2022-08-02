import React from 'react';
import { Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';
import NumberFormat from 'react-number-format';

function ProductCard({ product }) {
    return(
        <Card>
            <CardTitle>
                {product.name}
            </CardTitle>
            <CardSubtitle>
                {product.description}
            </CardSubtitle>
            <CardBody>
                <img src={product.images[0]} width="250px" height="250px" />
                <p>${product.price.unit_amount / 100}</p>
            </CardBody>
        </Card>
    );
}

export default ProductCard;