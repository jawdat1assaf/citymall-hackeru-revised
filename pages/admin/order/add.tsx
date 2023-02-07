import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import AdminLayout from '../../../layouts/AdminLayout';
import axios from '../../../lib/axios';
import dbConnect from '../../../lib/dbConnect';
import Product from '../../../models/Product';
import User from '../../../models/User';

import 'react-toastify/dist/ReactToastify.css'


const AddProduct: NextPage = (props: any) => {

    const router = useRouter();

    const addProduct = (e: any) => {
        e.preventDefault();
        const payload = new FormData(e.target);


        toast.promise(axios.post('/product', payload).then(res => {
            router.back();
        }), {
            pending: 'Adding product',
            success: 'Product added',
            error: 'Product can not be added'
        })
    }


    return (
        <AdminLayout>
            <div className="add-order rounded-lg flex flex-col  justify-between">
                <div className="w-full max-w-md m-auto">
                    <form onSubmit={addProduct} className="bg-white rounded p-6" >
                        <h1 className="text-primary text-2xl font-bold text-center">Add product</h1>
                        <div className="my-3">
                            <label htmlFor="form_name" className="block text-primary mb-2">Name</label>
                            <input type="text" name="name" id="form_name" className="appearance-none normal-case border rounded w-full py-2 px-3 text-primary mb-3 leading-tight" placeholder="Enter name" />
                        </div>
                        <div className="my-3">
                            <label htmlFor="form_price" className="block text-primary mb-2">Price</label>
                            <input type="number" name="price" id="form_price" className="appearance-none normal-case border rounded w-full py-2 px-3 text-primary mb-3 leading-tight" placeholder="Enter amount in USD" />
                        </div>
                        <div className="my-3">
                            <label htmlFor="form_image" className="block text-primary mb-2">Image</label>
                            <input type="file" name="image" id="form_image" className="appearance-none normal-case border rounded w-full py-2 px-3 text-primary mb-3 leading-tight" placeholder="Enter amount in USD" />
                        </div>
                        <button type="submit" name='save' className="py-2 rounded-md px-5 bg-primary text-white">Add product</button>

                    </form>
                </div>
            </div>
        </AdminLayout >
    );
}

export default AddProduct
