import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Cart from '../../../models/Cart';
import CartItem from '../../../models/CartItem';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import Review from '../../../models/Review';
import User from '../../../models/User';


const Reviews: NextPage = (props: any) => {
    return (
        <AdminLayout>
            <div className="review p-5 rounded-lg bg-white">
                <div className="card">
                    <div className="card-body">
                        <h2 className="font-bold text-lg mb-10">Review</h2>
                        <table className="w-full">
                            <thead className="text-left">
                                <tr> 
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">User</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Product</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Rating</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Feedback</th>
                                </tr>
                            </thead>
                            <tbody className="text-left text-gray-600">
                                {props.reviews.map((review: any) => (
                                    <tr className="border-y border-gray-200" key={review._id}>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{review.user.firstname}</th>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{review.product.name}</th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider flex flex-row items-center w-full">
                                            <p className="ml-3 name-1">{review.rating}</p>
                                        </th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider ">${review.text}</th>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    Cart; CartItem; Product; User;
    await dbConnect();
    const reviews = await Review.find();
    return {
        props: {
            reviews: JSON.parse(JSON.stringify(reviews))
        },
    }
}

export default Reviews
