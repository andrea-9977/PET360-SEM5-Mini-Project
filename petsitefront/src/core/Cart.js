import React , {useEffect,useState} from "react";
import Layout from "./Layout";
import Card from "./Card";
import { Link } from 'react-router-dom';
import { getCart ,  } from "./cartHelpers";
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);
    

    useEffect(() => {
        setItems(getCart()); // makes sure items from state 
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h2>Heyy fellow animal lover! Your cart has {`${items.length}`} items</h2>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
    <div>        
    <h2>
        Your cart is empty. Lets go and find what more your pet needs !! <br />
    </h2>
    <h3>
    <hr/>
    <Link to="/shop">Continue shopping</Link>
    </h3></div>

    );

    return (
        <Layout
            title="Your Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container-fluid">
            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>
{/* checking if cart is filled or empty for display */}
                <div className="col-6">
                    <h2 className="mb-4">Your cart summary is here!</h2>
                    <hr />
                    <p>check out option.</p>
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;



