import { React, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../auth/helper';
import "../../src/styles.css"

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleNavbar = () => {
        setIsOpen(!isOpen);
    };

    const currentTab = (path) => {
        return location.pathname === path ? { color: "white" } : { color: "rgb(170, 170, 170)" };
    };

    const handlelogout = () => {
        logout(() => {
            window.location.href = "/"; // Use window.location.href to navigate to home page
        });
    };

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searchVisible, setSearchVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/product/?name=${searchQuery}`);
                const data = await response.json();
                const sortedData = data.sort((a, b) => {
                    const startsWithQueryA = a.name.toLowerCase().startsWith(searchQuery.toLowerCase());
                    const startsWithQueryB = b.name.toLowerCase().startsWith(searchQuery.toLowerCase());
                    if (startsWithQueryA && startsWithQueryB) {
                        return a.name.localeCompare(b.name);
                    }
                    if (startsWithQueryA) {
                        return -1;
                    }
                    if (startsWithQueryB) {
                        return 1;
                    }
                    return a.name.localeCompare(b.name);
                });
                setSearchResults(sortedData);
                localStorage.setItem('searchResults', JSON.stringify(sortedData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (searchQuery.trim() !== '') {
            fetchData();
        } else {
            setSearchResults([]);
            localStorage.removeItem('searchResults');
        }
    }, [searchQuery]);

    useEffect(() => {
        const storedSearchResults = JSON.parse(localStorage.getItem('searchResults'));
        if (storedSearchResults) {
            setSearchResults(storedSearchResults);
        }
    }, []);

    useEffect(() => {
        const storedSearchVisible = localStorage.getItem('searchVisible');
        if (storedSearchVisible) {
            setSearchVisible(JSON.parse(storedSearchVisible));
        }
    }, []);

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchVisible(true);
        localStorage.setItem('searchVisible', true);
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark p-3">
            <div className="container-fluid" >
                <div style={{ fontFamily: "'Playfair Display', serif" }}>
                    <Link className="navbar-brand mx-4" to="/" style={{ fontSize: "38px" }}>
                        HomeScape
                    </Link>
                </div>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={toggleNavbar}
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className={`collapse navbar-collapse ${isOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto" >
                        <li>
                            <div style={{ position: 'relative' }}>
                                <div style={{ position: 'relative' }}>
                                    <img
                                        src='images/Lens.png'
                                        alt='Search Icon'
                                        style={{ position: 'absolute', top: '63%', transform: 'translateY(-50%)', left: '10px' }}
                                        width="19px"
                                        height="19px"
                                        onClick={() => setSearchVisible(!searchVisible)}
                                    />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        placeholder="Search products"
                                        onChange={handleSearchInputChange}
                                    />
                                </div>
                                {searchVisible && searchResults.length > 0 && (
                                    <ul style={{ position: 'absolute', top: 'calc(100% + 5px)', left: 0, width: '100%', maxWidth: '200px', zIndex: 999, backgroundColor: '#fff', boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)', padding: '8px 0', overflow: 'auto' }}>
                                        {searchResults.map((product) => (
                                            <li key={product.id} className='list-unstyled text-dark' style={{ padding: '5px' }}>
                                                <li key={product.id} className="nav-item">
                                                    <Link to={`/singleproduct/${product.id}`} className="nav-link mx-2 text-dark">
                                                        {product.name}
                                                    </Link>
                                                </li>

                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/" style={currentTab("/")}>
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/product" style={currentTab("/products")}>
                                Products
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/about" style={currentTab("/about")}>
                                About
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/contact" style={currentTab("/contact")}>
                                Contact
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link mx-2" to="/cart" style={currentTab("/cart")}>
                                Cart
                            </Link>
                        </li>
                        {!isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link mx-2" to="/signup" style={currentTab("/signup")}>
                                    Register
                                </Link>
                            </li>
                        )}
                        {!isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link mx-2" to="/login" style={currentTab("/login")}>
                                    Login
                                </Link>
                            </li>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <button className='nav-link mx-2' style={{ color: "rgb(170, 170, 170)" }} onClick={handlelogout}>logout</button>
                            </li>
                        )}
                        {isAuthenticated() && (
                            <li className="nav-item">
                                <Link className="nav-link mx-2" to="/profile" style={currentTab("/user/dashboard")}>
                                    <img src="images/profile-user.png" alt="" style={{ width: "32px", height: "30px", marginTop: "-5px" }} />
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
