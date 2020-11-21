import React, { Component } from 'react';
import { Link } from "react-router-dom";
import logoImg from '../assets/library.jpg';

class Header extends Component {
    render() { 
        return ( 
            <>
                <nav className='nav-bar navbar-light bg-white d-flex'>
                    <Link className='mr-auto' to='/'>
                        <img src={logoImg}
                            className='navbar-brand' 
                            width='150' 
                            height='70' 
                            alt='logo'
                        />
                    </Link>
                    <Link className='nav-link' to='/users'>Users</Link>
                    <Link className='nav-link' to='/books'>Books</Link>
                    {/* <Link className='nav-link' to='/users/authors'>Authors</Link> */}
                    {/* <Link className='nav-link' to='/users/publishers'>Publishers</Link> */}
                </nav>
            </>
         );
    }
}
 
export default Header;