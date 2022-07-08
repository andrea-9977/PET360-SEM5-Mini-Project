import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read } from './apiCore';
import Card from './Card';
import { listRelated } from './apiCore';

const Product = props => {
    //for grabbing product id from the route.
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => { //to get single product from api
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                //fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };
//grabbed pid
    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]); //when products change that time also do use effect

    return (
        <Layout  
            title={product && product.name}
            description= "Thank you for choosing our website! FYI you are supporting local pet stores!"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div>

                <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default Product;