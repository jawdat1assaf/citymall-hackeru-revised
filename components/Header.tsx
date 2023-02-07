import person from "./images/person3.png";
import { useState, useEffect, Component, useContext } from "react";
import Image from "next/image";
import Head from 'next/head'
import { AuthContext } from "../context/authContext";
import Link from "next/link";
import { useRouter } from "next/router";


export const Header = () => {

  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);


  const logout = () => {
    setUser(null);
    router.push('/login');
  }

  return (
    <>
      <Head>
        <script src="https://www.paypal.com/sdk/js?client-id=Afi7uzNbjODz0LVwxBmEsBZ-1uNp4PKCC176VE_694yVYicTAHF8gqd3ItmfjcIcGzKQIGurQDopMNsr&components=buttons"></script>
        <link href="/img/favicon.ico" rel="icon" />
        <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400|Source+Code+Pro:700,900&display=swap" rel="stylesheet" />

        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="/lib/slick/slick.css" rel="stylesheet" />
        <link href="/lib/slick/slick-theme.css" rel="stylesheet" />

        <link href="/css/style.css" rel="stylesheet" />
      </Head>
      <div className="header top-bar">
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-6">
              <i className="fa fa-envelope"></i>
              support@email.com
            </div>
            <div className="col-sm-6">
              <i className="fa fa-phone-alt"></i>
              +012-345-6789
            </div>
          </div>
        </div>
      </div>



      <div className="nav">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">
            <a href="#" className="navbar-brand">MENU</a>
            <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse justify-content-between" id="navbarCollapse">
              {/* <div className="navbar-nav mr-auto">
                <a href="index.html" className="nav-item nav-link active">Home</a>
                <a href="product-list.html" className="nav-item nav-link">Products</a>
                <a href="product-detail.html" className="nav-item nav-link">Product Detail</a>
                <a href="cart.html" className="nav-item nav-link">Cart</a>
                <a href="checkout.html" className="nav-item nav-link">Checkout</a>
                <a href="my-account.html" className="nav-item nav-link">My Account</a>
                <div className="nav-item dropdown">
                  <a href="#" className="nav-link dropdown-toggle" data-toggle="dropdown">More Pages</a>
                  <div className="dropdown-menu">
                    <a href="wishlist.html" className="dropdown-item">Wishlist</a>
                    <a href="login.html" className="dropdown-item">Login & Register</a>
                    <a href="contact.html" className="dropdown-item">Contact Us</a>
                  </div>
                </div>
              </div> */}
              <div className="navbar-nav ml-auto">
                {
                  user ? <>
                    <a href="cart.html" className="nav-item nav-link">{user?.firstname || 'User Account'}</a>
                    <button onClick={logout} className="nav-item nav-link text-danger">Logout</button>
                  </> : <>
                    <Link href="/login" >
                      <a className="nav-item nav-link">Login</a>
                    </Link>
                    <Link href="/login" >
                      <a className="nav-item nav-link">Register</a>
                    </Link>
                  </>
                }
              </div>
            </div>
          </nav>
        </div>
      </div>



      <div className="bottom-bar">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-3">
              <div className="logo">
                <Link href="/">
                  <img src="/img/logo.png" alt="Logo" />
                </Link>
              </div>
            </div>
            <div className="col-md-6">
              <div className="search">
                <input type="text" placeholder="Search" />
                <button><i className="fa fa-search"></i></button>
              </div>
            </div>
            {
              user && (
                <div className="col-md-3">
                  <div className="user">
                    <a href="/wishlist" className="btn wishlist">
                      <i className="fa fa-heart"></i>
                      <span>({user?.wishlist.length})</span>
                    </a>
                    <a href="/cart" className="btn cart">
                      <i className="fa fa-shopping-cart"></i>
                      <span>({user?.cart.items.length})</span>
                    </a>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

