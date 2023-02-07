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

const Wishlist: NextPage = (props: any) => {
  const [hasMounted, setHasMounted] = useState(false);

  const [user, setUser] = useContext(AuthContext);
  useEffect(() => {
    setHasMounted(true);
  }, []);



  const removeFromWishList = (product: any) => {
    toast.promise(axios.patch(`/wishlist/${product.id}/remove`, {}).then(({ data }) => {
      setUser(data.user)
    }), {
      pending: 'Loading ...',
      success: `${product.name} removed successfully`,
      error: 'Can not update wishlist'
    })
  }


  const addToCart = (product: any) => {
    toast.promise(axios.post(`/cart/add`, {
        product_id: product.id,
        quantity: 1,
    }).then(({ data }) => {
        setUser(data.user)
    }), {
        pending: 'Loading ...',
        success: 'Product added to cart',
        error: 'Request failed'
    })
}

  if (!hasMounted) {
    return null;
  }



  return (

    <div>

      <Header></Header>

      <div className="wishlist wishlist-page">
        <div className="container-fluid">
          <div className="wishlist-page-inner">
            <div className="row">
              <div className="col-md-12">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Add to Cart</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {
                        user.wishlist.map((product: any) => (
                          <tr key={product.id}>
                            <td>
                              <div className="img">
                                <a href="#"><img src={product.imagePath as any} alt="Image" /></a>
                                <p>{product.name}</p>
                              </div>
                            </td>
                            <td>${product.price}</td>
                            <td><button className="btn-cart" onClick={() => addToCart(product)}>Add to Cart</button></td>
                            <td><button onClick={() => removeFromWishList(product)} ><i className="fa fa-trash"></i></button></td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
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
