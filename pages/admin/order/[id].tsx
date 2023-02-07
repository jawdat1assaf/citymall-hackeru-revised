import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Order from '../../../models/Order';
import Product from '../../../models/Product';
import User from '../../../models/User';


const OrderDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="order-details card bg-white text-primary rounded-lg">
                    <div className="card-body flex flex-row p-4">

                        <div className="img-wrapper w-32 h-32 flex justify-center items-center rounded-lg overflow-hidden">
                            <Image width={100} height={100} className="object-cover h-full" src="https://source.unsplash.com/random/?bill" alt="img title" />
                        </div>
                        <div className="py-2 ml-10">
                            <h1 className="h6 text-6xl">${props.order.cart.total}</h1>

                            <ul className="mt-2">
                                <li><strong>Id</strong>: {props.order.id}</li>
                                <li><strong>Transaction ID</strong>: {props.order.transaction.id}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="card bg-white text-primary rounded-lg mt-5">
                    <div className="card-body flex flex-row p-4">


                        <div className="py-2 ml-10">
                            <h1 className="h4 text-4xl">Address</h1>
                            <ul className="mt-2">
                                <li><strong>First Name</strong>: {props.order.address.firstname}</li>
                                <li><strong>Last Name</strong>: {props.order.address.lastname}</li>
                                <li><strong>Email</strong>: {props.order.address.email}</li>
                                <li><strong>Mobile</strong>: {props.order.address.mobile}</li>
                                <li><strong>Address</strong>: {props.order.address.address}</li>
                                <li><strong>Country</strong>: {props.order.address.country}</li>
                                <li><strong>City</strong>: {props.order.address.city}</li>
                                <li><strong>State</strong>: {props.order.address.state}</li>
                                <li><strong>Zip</strong>: {props.order.address.zip}</li>
                            </ul>
                        </div>

                    </div>
                </div>
                <div className="p-5 rounded-lg bg-white mt-5">
                    <div className="card col-span-2 xl:col-span-1">
                        <div className="card-header my-5">Products</div>

                        <table className="table-auto w-full text-left">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 border-r">Id</th>
                                    <th className="px-4 py-2 border-r">Name</th>
                                    <th className="px-4 py-2 border-r">Price</th>
                                    <th className="px-4 py-2 border-r">Quantity</th>
                                    <th className="px-4 py-2 border-r">Sub total</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-600">
                                {props.order.cart.items.map((item: any) => (
                                    <tr key={item.id}>
                                        <td className="border border-l-0 px-4 py-2 ">
                                            <a className='text-blue-800 hover:underline' href={`/admin/user/${props.order.user.id}`}>{props.order.user.firstname}</a>
                                        </td>
                                        <td className="border border-l-0 px-4 py-2">{item.product.name}</td>
                                        <td className="border border-l-0 px-4 py-2">${item.product.price}</td>
                                        <td className="border border-l-0 px-4 py-2">{item.quantity}</td>
                                        <td className="border border-l-0 px-4 py-2">${item.sub_total}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const order = await Order.findById(context.query.id);
    return {
        props: {
            order: JSON.parse(JSON.stringify(order))
        },
    }
}

export default OrderDetails
