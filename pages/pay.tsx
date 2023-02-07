import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useRef, useState } from 'react';
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




  const checkout = (transaction: any) => {
    const payload = { ...JSON.parse(localStorage.getItem('checkout') as any), transaction };

    toast.promise(axios.post('/order/add', payload).then(
      ({ data }) => {
        setUser(data.user)
        router.push('/');
      }), {
      pending: 'Loading ...',
      success: 'Order completed',
      error: 'Order failed'
    })
  }



  return !user ? null : (

    <div>

      <Head>

      </Head>

      <Header></Header>

      <div className="pay checkout">
        <div className="container-fluid">
          <form className="row" id="form">
            <div className="col-lg-8">
            </div>
            <div className="col-lg-4">
              <div className="checkout-inner">
                <div className="checkout-summary">
                  <h1>Cart Total</h1>
                  <h2>Grand Total<span>${user.cart.total}</span></h2>
                </div>

                <div className="checkout-payment">
                  <div className="checkout-btn">
                    <PayPalScriptProvider options={{ "client-id": "Afi7uzNbjODz0LVwxBmEsBZ-1uNp4PKCC176VE_694yVYicTAHF8gqd3ItmfjcIcGzKQIGurQDopMNsr" }}>
                      <PayPalButtons
                        createOrder={(data, actions) => {
                          return actions.order.create({
                            purchase_units: [
                              {
                                amount: {
                                  value: user.cart.total,
                                },
                              },
                            ],
                          });
                        }}
                        onApprove={(data, actions: any) => {
                          return actions.order.capture().then((transaction: any) => {
                            checkout(transaction);
                          });
                        }}
                        style={{ layout: "horizontal" }} />
                    </PayPalScriptProvider>
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
