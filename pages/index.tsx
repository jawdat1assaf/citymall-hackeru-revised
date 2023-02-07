import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (

    <div>

      <Header></Header>


      <div className="home header">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <nav className="navbar bg-light">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-home"></i>Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-shopping-bag"></i>Best Selling</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-plus-square"></i>New Arrivals</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-female"></i>Fashion & Beauty</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-child"></i>Kids & Babies Clothes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-tshirt"></i>Men & Women Clothes</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-mobile-alt"></i>Gadgets & Accessories</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#"><i className="fa fa-microchip"></i>Electronics & Accessories</a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="col-md-6">
              <div className="header-slider normal-slider">
                <div className="header-slider-item">
                  <img src="/img/slider-1.jpg" alt="Slider Image" />
                  <div className="header-slider-caption">
                    <p>Some text goes here that describes the image</p>
                    <a className="btn" href="#featured-product"><i className="fa fa-shopping-cart"></i>Shop Now</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div className="header-img">
                <div className="img-item">
                  <img src="/img/category-1.jpg" />
                  <a className="img-text" href="">
                    <p>Some text goes here that describes the image</p>
                  </a>
                </div>
                <div className="img-item">
                  <img src="/img/category-2.jpg" />
                  <a className="img-text" href="">
                    <p>Some text goes here that describes the image</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="feature">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fab fa-cc-mastercard"></i>
                <h2>Secure Payment</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-truck"></i>
                <h2>Worldwide Delivery</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-sync-alt"></i>
                <h2>90 Days Return</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur elit
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 feature-col">
              <div className="feature-content">
                <i className="fa fa-comments"></i>
                <h2>24/7 Support</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur elit
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="category">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <div className="category-item ch-400">
                <img src="/img/category-3.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-250">
                <img src="/img/category-4.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
              <div className="category-item ch-150">
                <img src="/img/category-5.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-150">
                <img src="/img/category-6.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
              <div className="category-item ch-250">
                <img src="/img/category-7.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
            <div className="col-md-3">
              <div className="category-item ch-400">
                <img src="/img/category-8.jpg" />
                <a className="category-name" href="">
                  <p>Some text goes here that describes the image</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="call-to-action">
        <div className="container-fluid">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1>call us for any queries</h1>
            </div>
            <div className="col-md-6">
              <a href="tel:0123456789">+012-345-6789</a>
            </div>
          </div>
        </div>
      </div>



      <div className="featured-product product">
        <div className="container-fluid">
          <div className="section-header">
            <h1 id="featured-product">Featured Product</h1>
          </div>
          <div className="row align-items-center product-slider product-slider-4">
            {props.products.map((product: any) => (
              <ProductCard product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  await dbConnect();
  const products = await Product.find();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    },
  }
}


export default Index
