import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'


import { Header } from "../components/Header";

import { useContext, useEffect, useState } from 'react';
import dbConnect from '../lib/dbConnect';
import Product from '../models/Product';
import { Footer } from '../components/Footer';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import axios from '../lib/axios';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../context/authContext';

const Index: NextPage = (props: any) => {

  const [hasMounted, setHasMounted] = useState(false);
  const [errorMessage, setErrorMessage] = useState([]);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }


  const router = useRouter();
  const [, setUser] = useContext(AuthContext);

  const register = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));

    validatePassword(payload['password'] as string);

    if ((payload['password'] != payload['password_confirmation']) || errorMessage.length != 0) {
      return toast.warning("Invalid password");
    }


    toast.promise(axios.post('/auth/register', payload).then(res => {
    }), {
      pending: 'Registering ...',
      success: 'Registered successfully',
      error: 'Registerating failed'
    })
  }


  const login = (e: any) => {
    e.preventDefault();
    const payload = Object.fromEntries(new FormData(e.target));


    toast.promise(axios.post('/auth/login', payload).then(({ data }) => {

      (axios.defaults as any).headers["Authorization"] = "Bearer " + data.access_token;
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user)
      router.push('/');
    }), {
      pending: 'Loggin In ...',
      success: 'Logged In successfully',
      error: 'Loggin In failed'
    })
  }

  const countSpecial = (str: string) => {
    const punct = `!@#$%^&*()_+-=\{};':"|,.<>/?`;
    let count = 0;
    for (let i = 0; i < str.length; i++) {
      if (!punct.includes(str[i])) {
        continue;
      };
      count++;
    };
    console
    return count;
  };

  const validatePassword = (value: string) => {
    let errors = [];
    if (value.length < 8) {
      errors.push('Minimium length should be 8');
    }
    if ((value.length - value.replace(/[A-Z]/g, '').length) < 1) {
      errors.push('Should at least have 1 uppercase character')
    }
    if ((value.length - value.replace(/[a-z]/g, '').length) < 1) {
      errors.push('Should at least have 1 lower character')
    }
    if ((value.length - value.replace(/[0-9]/g, '').length) < 1) {
      errors.push('Should at least have 1 number')
    }
    if (countSpecial(value) < 1) {
      errors.push('Should at least have 1 symbol')
    }
    setErrorMessage(errors as any);
  }

  return (
    <div>
      <Header></Header>
      <div className="login">
        <div className="container-fluid">
          <div className="row">
            <form onSubmit={register} className="col-lg-6">
              <div className="register-form">
                <div className="row">
                  <div className="col-md-6">
                    <label>First Name</label>
                    <input className="form-control" required type="text" name="firstname" placeholder="First Name" />
                  </div>
                  <div className="col-md-6">
                    <label>Last Name"</label>
                    <input className="form-control" required type="text" name="lastname" placeholder="Last Name" />
                  </div>
                  <div className="col-md-6">
                    <label>E-mail</label>
                    <input className="form-control" required type="text" name="email" placeholder="E-mail" />
                  </div>
                  <div className="col-md-6">
                    <label>Mobile No</label>
                    <input className="form-control" required type="text" name="phone" placeholder="Mobile No" />
                  </div>
                  <div className="col-md-6">
                    <label>Password</label>
                    <input className="form-control" required onChange={e => validatePassword(e.target.value)} type="text" name="password" placeholder="Password" />
                    {errorMessage.map(error => <p key={error} style={{
                      fontWeight: 'bold',
                      color: 'red',
                    }}>{error}</p>)
                    }
                  </div>
                  <div className="col-md-6">
                    <label>Confirm password</label>
                    <input className="form-control" required type="text" name="password_confirmation" placeholder="Password" />

                  </div>

                  <div className="col-md-12">
                    <button className="btn" type='submit'>Submit</button>
                  </div>
                </div>
              </div>
            </form>
            <form onSubmit={login} className="col-lg-6">
              <div className="login-form">
                <div className="row">
                  <div className="col-md-6">
                    <label>E-mail / Username</label>
                    <input className="form-control" type="text" required name='email' placeholder="E-mail / Username" />
                  </div>
                  <div className="col-md-6">
                    <label>Password</label>
                    <input className="form-control" type="text" required name='password' placeholder="Password" />
                  </div>
                  <div className="col-md-12">
                    <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id="newaccount" />
                      <label className="custom-control-label" htmlFor="newaccount">Keep me signed in</label>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <button className="btn" type='submit'>Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  )
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


export default Index
