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
import Link from 'next/link';

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
  }, []);



  const updateCart = (itemId: any, quantity: any) => {
    toast.promise(axios.patch(`/cart/update`, { itemId, quantity }).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `Cart Updated`,
      error: 'Can not update wishlist'
    })
  }

  if (!hasMounted) {
    return null;
  }



  return (

    <div>

      <Header></Header>

      <div className="cart">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-page-inner">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {
                        user.cart.items.map((item: any) => (
                          <tr key={item.id}>
                            <td>
                              <div className="img">
                                <a href="#"><img src={item.product.imagePath as any} alt="Image" /></a>
                                <p>{item.product.name}</p>
                              </div>
                            </td>
                            <td>${item.product.price}</td>
                            <td>
                              <div className="qty">
                                <button className="btn-minus" onClick={() => updateCart(item.id, item.quantity - 1)}><i className="fa fa-minus"></i></button>
                                <input type="text" value={item.quantity} />
                                <button className="btn-plus" onClick={() => updateCart(item.id, item.quantity + 1)}><i className="fa fa-plus"></i></button>
                              </div>
                            </td>
                            <td>${item.sub_total}</td>
                            <td><button onClick={() => updateCart(item.id, 0)}><i className="fa fa-trash"></i></button></td>
                          </tr>
                        ))
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-page-inner">
                <div className="row">
                  <div className="col-md-12">
                    <div className="cart-summary">
                      <div className="cart-content">
                        <h1>Cart Summary</h1>
                        <h2>Grand Total<span>${user.cart.total}</span></h2>
                      </div>
                      <div className="cart-btn">
                        <Link href={'/checkout'}>
                          <button style={{ width: "100%" }}>Checkout</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Footer></Footer>




    </div>
  )
}

export default Wishlist
