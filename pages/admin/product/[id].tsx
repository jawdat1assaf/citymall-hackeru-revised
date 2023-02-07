import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';


const ProductDetails: NextPage = (props: any) => {


    return (
        <AdminLayout>
            <>
                <div className="product-details card bg-white text-primary rounded-lg">
                    <div className="card-body flex flex-row p-4">

                        <div className="img-wrapper w-32 h-32 flex justify-center items-center rounded-lg overflow-hidden">
                            <Image width={100} height={100} className="object-cover h-full" src="https://source.unsplash.com/random/?bill" alt="img title" />
                        </div>
                        <div className="py-2 ml-10">
                            <h1 className="h6 text-6xl">{props.product.name}</h1>

                            <ul className="mt-2">
                                <li><strong>Id</strong>: {props.product._id}</li>
                                <li><strong>Admin</strong>: {props.product.name}</li>
                            </ul>
                        </div>

                    </div>
                </div>

            </>
        </AdminLayout>
    );
}

export async function getServerSideProps(context: any) {
    await dbConnect();
    const product = await Product.findById(context.query.id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product))
        },
    }
}

export default ProductDetails
