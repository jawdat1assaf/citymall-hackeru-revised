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


const Logout: NextPage = (props: any) => {

    const router = useRouter();

    useEffect(() => {
        axios.post('/auth/adminLogout', {}).then(res => {
            router.push('/admin');
        });
    }, []);

    return <p className='logout'>Logging out...</p>;

}

export default Logout
