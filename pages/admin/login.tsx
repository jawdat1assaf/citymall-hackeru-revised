import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../lib/axios';
import dbConnect from '../../lib/dbConnect';
import Product from '../../models/Product';
import User from '../../models/User';

import 'react-toastify/dist/ReactToastify.css'


const Login: NextPage = (props: any) => {

    const router = useRouter();

    const login = (e: any) => {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(e.target));


        toast.promise(axios.post('/auth/adminLogin', payload).then(res => {
            router.push('/admin');
            location.reload();
        }), {
            pending: 'Logging in',
            success: 'Login',
            error: 'Unable to login'
        })
    }


    return (
        <div className="login rounded-lg flex flex-col  justify-between">
            <div className="w-full max-w-md m-auto">
                <form onSubmit={login} className="bg-white rounded p-6" >
                    <h1 className="text-primary text-2xl font-bold text-center">Login</h1>
                    <div className="my-3">
                        <label htmlFor="form_email" className="block text-primary mb-2">Email</label>
                        <input type="text" name="email" id="form_email" className="appearance-none normal-case border rounded w-full py-2 px-3 text-primary mb-3 leading-tight" placeholder="Enter email" />
                    </div>
                    <div className="my-3">
                        <label htmlFor="form_password" className="block text-primary mb-2">Password</label>
                        <input type="password" name="password" id="form_password" className="appearance-none normal-case border rounded w-full py-2 px-3 text-primary mb-3 leading-tight" placeholder="Enter password" />
                    </div>
                    <button type="submit" name='save' className="py-2 rounded-md px-5 bg-primary text-white">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login
