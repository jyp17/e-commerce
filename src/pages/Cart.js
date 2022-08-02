import React from 'react';
import { Button } from 'reactstrap';
import { useCartContext } from '../contexts/cartContext';
import { useUserContext } from '../contexts/userContext';
import { useNavigate } from 'react-router-dom';
import createCheckoutSession from '../functions/createCheckoutSession';

function Cart() {
    const { cart } = useCartContext();
    const { user } = useUserContext();
    let navigate = useNavigate();

    const isAuth = () => {
        if (user) {
            createCheckoutSession(user.uid, cart);
        } else {
            navigate("/login");
        }
    }

    return(
        <div>
            {cart?.map((product) => {
                return(<p>{product.name} &nbsp; &nbsp; &nbsp; ${product.price.unit_amount / 100}</p>);
            })}
            <Button onClick={isAuth}>Checkout</Button>
        </div>
    );
}

export default Cart;