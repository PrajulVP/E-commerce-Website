import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const Base = ({ children }) => {
    const [email, setEmail] = useState('');

    const handleSubscribe = () => {
        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
        // Check if email input matches the regex pattern
        if (!emailPattern.test(email)) {
            alert('Please enter a valid email address');
            return; // Stop execution if email is invalid
        }
    
        const subject = 'Thank you for subscribing';
        const message = 'We appreciate your subscription to our newsletter. Stay tuned for exciting updates!';
        
        fetch('http://localhost:8000/api/sendmail/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, subject, message }),
        })
        .then(response => {
            if (response.ok) {
                console.log('Email sent successfully!');
                alert('Thank you for subscribing!');
            } else {
                console.error('Failed to send email:', response.statusText);
                alert('Failed to send email. Please try again later.');
            }
        })
        .catch(error => {
            console.error('Error sending email:', error);
            alert('Failed to send email. Please try again later.');
        });
    };
    
    

    return (
        <div className='bg-gradient'>
            <Navbar />
            <div className='container-fluid'>
                <div>{children}</div>
            </div>
            <footer>
                <div className="newsletter">
                    <div>
                        <label style={{ fontSize: "43px", marginBottom: "15px", color: "black", fontWeight: "500" }}>Join Our Newsletter</label><br />
                    </div>
                    <div className="d-flex flex-wrap fs-5">
                        <div>
                            <input
                                type="text"
                                id="email-input"
                                placeholder="Y O U R &nbsp;&nbsp; E M A I L"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <hr style={{ height: "1px", marginTop: "-3px" }} />
                        </div>
                        <div>
                            <input
                                type="button"
                                value="Subscribe"
                                className="shopnow"
                                onClick={handleSubscribe}
                            />
                        </div>
                    </div>
                </div>
                <div className="copyright d-flex flex-wrap justify-content-between mx-auto px-4 py-4">
                    <div>
                        <label className='text-white fs-6'>&#169; 2024 All Rights Reserved.</label>
                    </div>
                    <div className="help d-flex flex-wrap justify-content-between">
                        <div>
                            <Link to="" className="text-white text-decoration-none">Help & Info</Link>
                        </div>
                        <div>|</div>
                        <div>
                            <Link to="/contact" className="text-white text-decoration-none">Contact Us</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Base;
