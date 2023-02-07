import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { ProductCard } from '../components/ProductCard';
import withAuth from '../middlewares/withAuth';
import axios from '../lib/axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';
import Cart from '../models/Cart';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useRouter } from 'next/router';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);
  const router = useRouter();

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }




  const saveAddress = (e: any) => {
    e.preventDefault();
    const address = Object.fromEntries(new FormData(e.target));
    const payload = {
      cart_id: user.cart.id,
      address
    }
    localStorage.setItem('checkout', JSON.stringify(payload));
    location.replace('/pay');
  }



  return (

    <div>

      <Header></Header>

      <div className="checkout">
        <div className="container-fluid">
          <form className="row" onSubmit={saveAddress}>
            <div className="col-lg-8">
              <div className="checkout-inner">
                <div className="billing-address">
                  <h2>Billing Address</h2>
                  <div className="row">
                    <div className="col-md-6">
                      <label>First Name</label>
                      <input className="form-control" type="text" name="firstname" defaultValue={user.firstname} placeholder="First Name" />
                    </div>
                    <div className="col-md-6">
                      <label>Last Name"</label>
                      <input className="form-control" type="text" name="lastname" defaultValue={user.lastname} placeholder="Last Name" />
                    </div>
                    <div className="col-md-6">
                      <label>E-mail</label>
                      <input className="form-control" type="email" name="email" defaultValue={user.email} placeholder="E-mail" />
                    </div>
                    <div className="col-md-6">
                      <label>Mobile No</label>
                      <input className="form-control" type="tel" name="mobile" defaultValue={user.mobile} placeholder="Mobile No" />
                    </div>
                    <div className="col-md-12">
                      <label>Address</label>
                      <input className="form-control" type="text" name="address" placeholder="Address" />
                    </div>
                    <div className="col-md-6">
                      <label>Country</label>
                      <select className="custom-select" name="country">
                        <option selected>United States</option>
                        <option>India</option>
                        <option>Israel</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>City</label>
                      <input className="form-control" name="city" type="text" placeholder="City" />
                    </div>
                    <div className="col-md-6">
                      <label>State</label>
                      <input className="form-control" name="state" type="text" placeholder="State" />
                    </div>
                    <div className="col-md-6">
                      <label>ZIP Code</label>
                      <input className="form-control" name="zip" type="text" placeholder="ZIP Code" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="checkout-inner">
                <div className="checkout-summary">
                  <h1>Cart Total</h1>
                  <h2>Grand Total<span>${user.cart.total}</span></h2>
                </div>

                <div className="checkout-payment">
                  <div className="checkout-btn">
                    <button type="submit">Save address</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>


      <Footer></Footer>




    </div>
  )
}

export default Wishlist
