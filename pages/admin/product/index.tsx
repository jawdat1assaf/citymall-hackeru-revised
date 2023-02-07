import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const Products: NextPage = (props: any) => {
    return (
        <AdminLayout>
            <div className="product-list p-5 rounded-lg bg-white">
                <div className="card">
                    <div className="card-body">
                        <Link href="/admin/product/add" passHref>
                            <a className="py-2 rounded-md px-5 bg-primary text-white">add product</a>
                        </Link>
                        <h2 className="font-bold text-lg mb-10">Products</h2>
                        <table className="w-full">
                            <thead className="text-left">
                                <tr>
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">Id</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Name</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Price</th>
                                    <th className="pb-10 text-sm font-extrabold tracking-wide text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-left text-gray-600">
                                {props.products.map((product: any) => (
                                    <tr className="border-y border-gray-200" key={product._id}>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{product._id}</th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider flex flex-row items-center w-full">
                                            <div className="w-8 h-8 overflow-hidden rounded-full">
                                                <Image width="100%" height="100%" layout="responsive" objectFit="contain" src={product.imagePath} className="object-cover" />
                                            </div>
                                            <p className="ml-3 name-1">{product.name}</p>
                                        </th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider ">{product.price}</th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider text-right py-1">
                                            <a href={`/admin/product/${product._id}`} className="py-2 rounded-md px-5 bg-primary text-white">View</a>
                                        </th>

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
    await dbConnect();
    const products = await Product.find();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        },
    }
}

export default Products
