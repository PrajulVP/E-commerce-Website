import Base from "./Base";
import '../styles.css'
import { getProducts } from "./helper/coreapicalls";
import Card from './Card';
import { useEffect, useState } from "react";

const Contact = () => {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

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

    const handleSendClick = () => {
        const emailInput = document.getElementById("email").value;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput)) {
            setError("Please enter a valid email address");
            return;
        }
        // If email is valid, proceed with sending the message or perform any other action
        setError(""); // Clear any previous error messages
        alert("Submitted! We will contact you soon.");
    };


    return (
        <Base>
            <div className="container contact row mx-auto py-4">
                <div className="col-lg-6 col-md-6 col-sm-12" >
                    <img src={'./images/abtus.jpg'} alt="" width="650px" height="450px" />
                </div>

                <div className="col-lg-6 col-md-6 col-sm-12" style={{ paddingLeft: "100px", paddingTop: "40px" }}>

                    <h1>Contact Us</h1>

                    <label className="mt-4 fs-5">Fill out the form below and
                        we will contact you soon <br /> as possible!</label>
                    <div className="d-flex mt-3">
                        <div>
                            <input type="text" className="contact-input text-white" placeholder="Your name" id="name" />
                            <hr style={{ height: "1px", marginTop: "2px", width: "230px" }} />
                        </div>
                        <div>
                            <input type="email" className="contact-input text-white" placeholder="Your email" id="email" style={{background:"none"}} />
                            <hr style={{ height: "1px", marginTop: "2px", width: "230px" }} /><br />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div>
                            <select className="contact-select" id="select" style={{ marginTop: "12px" }}>
                                <option>Choose topic</option>
                                <option>Electronics</option>
                                <option>Fashion</option>
                                <option>Home Essentials</option>
                            </select>
                            <hr style={{ height: "1px", marginTop: "4px", width: "230px" }} />
                        </div>
                        <div>
                            <input type="text" className="contact-input text-white" placeholder="Message" id="msg" />
                            <hr style={{ height: "1px", marginTop: "2px", width: "230px" }} /><br />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div>
                            {error && <p className="error-message">{error}</p>}
                            <input
                                type="button"
                                className="contact-sendbtn"
                                value="Send"
                                onClick={handleSendClick}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="container col-12" style={{ marginTop: "150px" }}>
                <div className="row">
                    {products.slice(0, 4).map((product, index) => (
                        <div key={index} className="col-lg-3">
                            <Card product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </Base>
    );
}


export default Contact
