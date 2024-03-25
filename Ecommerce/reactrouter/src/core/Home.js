import React from 'react';
import { useState, useEffect } from 'react';
import { getProducts } from './helper/coreapicalls';
import Base from './Base';
import '../styles.css';
import Card from './Card';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';



const Home = () => {

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false)

  const loadAllProducts = () => {
    getProducts()
      .then(data => {
        if (data.error) {
          setError(data.error);
          console.log(error);
        }
        else {
          setProducts(data);
        }
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, [])

  const slicedProducts = products.slice(0, 8);

  const pairs = [];
  for (let i = 0; i < products.length; i += 2) {
    pairs.push([products[i], products[i + 1]]);
  }

  return (
    <Base>
      <div className='container-fluid mb-4'>
        <div className='row display'>
          <div className='col-6'>
            <Carousel controls={false} interval={2000}>
              {pairs.map((pair, index) => (
                <Carousel.Item key={index}>
                  <div className="row">
                    {pair.map((product, idx) => (
                      <div className="col-6 mb-4" key={idx}>
                        {product && product.id && (
                          <Card product={product} />
                        )}
                      </div>
                    ))}
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </div>

          <div className="col-6" style={{ padding: "50px", paddingLeft: "120px" }}>
            <h1 style={{ fontSize: "53px" }}>SUMMER SALE!!</h1><br />
            <label className='fs-2'>AMAZING OFFERS UPTO <br />60% DISCOUNT.</label><br />
            <label className='fs-5'>HomeScape provide consumer electronics,
              fashion, home essentials & and lifestyle products.</label><br /><br />
            <Link to="/product">
              <input type="button" value="Shop Now" className="shopnow" />
            </Link>
          </div>
        </div>
      </div>

      <div className="container-fluid flex-wrap p-4" style={{ marginTop: "100px", backgroundColor: "rgb(255, 255, 255, 0.4)" }}>
        <h1 className='text-center'>Why Shop With Us</h1>
        <div className="d-flex justify-content-evenly" style={{ marginTop: "50px" }}>
          <div className="col-3 text-center text-white">
            <img src="images/free-delivery.png" width="100px" height="100px" alt="Free Delivery" /><br />
            <label style={{ fontSize: "22px" }}>FREE SHIPPING</label>
            <label style={{ fontSize: "17px" }}>ENJOY FREE SHIPPING ON ALL ORDERS-<br />NO MINIMUM PURCHASE REQUIRED.</label>
          </div>
          <div className="col-3 text-center text-white">
            <img src="images/24-hours-support.png" width="100px" height="100px" alt="24/7 Support" /><br />
            <label style={{ fontSize: "22px" }}>24/7 SUPPORT</label>
            <label className='text-white' style={{ fontSize: "17px" }}>OUR TEAM IS AVAILABLE 24/7 TO HELP<br />WITH ANY QUESTIONS OR CONCERNS.</label>
          </div>
          <div className="col-3 text-center text-white">
            <img src="images/cashback.png" width="100px" height="100px" alt="Moneyback" /><br />
            <label style={{ fontSize: "22px" }}>MONEYBACK</label>
            <label className='text-white' style={{ fontSize: "17px" }}>WE OFFER A 100% MONEYBACK<br />GUARANTEE FOR YOUR SATISFACTION.</label>
          </div>
          <div className="col-3 text-center text-white">
            <img src="images/discount.png" width="100px" height="100px" alt="Discount" /><br />
            <label style={{ fontSize: "22px" }}>DISCOUNT</label>
            <label className='text-white' style={{ fontSize: "17px" }}>WE OFFER UPTO 75% DISCOUNT<br />FOR OUR BESTSELLING PRODUCTS.</label>
          </div>
        </div>
      </div>


      <div className='container mx-auto' style={{ marginTop: "100px" }}>
        <div className='text-center text-white'>
          <label className='text-decoration-underline fs-1 fw-bold mb-4'>Best Sell Products</label>
        </div>
        <div className="row">
          {slicedProducts.map((product, index) => (
            <div className="col-3 mt-4 mb-4" key={index} style={{ maxHeight: "450px" }}>
              <Card product={product} />
            </div>
          ))}
        </div>
      </div>


      <div
        className="row container mx-auto d-flex"
        style={{ backgroundColor: "rgb(0, 0, 0, 0.4)", marginTop: "150px", padding: "80px" }}
      >
        <div className="col-2 px-4" style={{ marginRight: "60px" }}>
          <h3 className="">
            Customer <br /> Reviews
          </h3>
        </div>
        <div className="col-4 px-4" style={{ marginRight: "80px" }}>
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <br />
          <br />
          <label>
            Thanks E-kart for providing such a great deal for me buying of LG smart
            TV. Awesome packing and 100% genuine product without any mis-handling and
            scratch.{" "}
          </label>
          <br />
          <br />
          <label style={{ color: "rgb(255, 255, 255, 0.8)" }}>
            John SA
          </label>
        </div>
        <div className="col-4 px-4">
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />
          <FontAwesomeIcon icon={faStar} style={{ color: 'yellow' }} />

          <br />
          <br />
          <label>
            I've ordered RedMi note 5 phone from E-kart, its awesome. Original
            quality, no fraud, and the delivery was also faster than estimated time.
            100% genuine company, 100% genuine.
          </label>
          <br />
          <br />
          <label style={{ color: "rgb(255, 255, 255, 0.8)" }}>
            Amar chauhan
          </label>
        </div>
      </div>

    </Base>
  );

}


export default Home