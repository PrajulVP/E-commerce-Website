import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Base from './Base';
import axios from 'axios';

const ProductView = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/product/${productId}/`);
                setProduct({ ...response.data, quantity: 1 });
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchData();
    }, [productId]);

    return (
        <Base>
            <div className="container mt-5">
                {product ? (
                    <div className="card border-primary col-9 shadow">
                        <div className="card-body d-flex ml-4">
                            <div className='col-6'>
                                <h3 className="card-title mb-4">{product.name}</h3>
                                <div className='rounded border border-success p-2 d-flex' style={{ height: "270px", maxWidth: "70%", justifyContent: "center" }}>
                                    <img src={product.image} alt='' style={{ maxHeight: "100%", maxWidth: "100%", width: "auto", height: "auto" }} className='card-img'></img>
                                </div>
                            </div>
                            <div className='col-6 p-4 mt-4'>
                                <h5 className="card-text mt-3">{product.description}</h5>
                                <h6 className="btn btn-success rounded text-white mt-2">Price: ${product.price}</h6>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </Base>
    );
};

export default ProductView;
