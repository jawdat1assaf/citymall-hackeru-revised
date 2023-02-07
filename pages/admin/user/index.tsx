import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';
import AdminLayout from '../../../layouts/AdminLayout';
import dbConnect from '../../../lib/dbConnect';
import User from '../../../models/User';


const Users: NextPage = (props: any) => {
    return (
        <AdminLayout>
            <div className="user-list p-5 rounded-lg bg-white">
                <div className="card">
                    <div className="card-body">
                        <h2 className="font-bold text-lg mb-10">Users</h2>
                        <table className="table-fixed w-full">
                            <thead className="text-left">
                                <tr>
                                    <th className="w-1/6 pl-3 pb-10 text-sm font-extrabold tracking-wide">Id</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">First name</th>
                                    <th className="w-1/6 pb-10 text-sm font-extrabold tracking-wide">Last name</th>
                                    <th className="pb-10 text-sm font-extrabold tracking-wide">Email</th>
                                    <th className="pb-10 text-sm font-extrabold tracking-wide text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-left text-gray-600">
                                {props.users.map((user: any) => (
                                    <tr className="border-y border-gray-200" key={user._id}>
                                        <th className="mb-4 pl-3 text-xs font-extrabold tracking-wider">{user._id}</th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider ">{ user.firstname} </th>
                                        <th className="my-2 text-xs font-extrabold tracking-wider ">{ user.lastname} </th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider ">{user.email}</th>
                                        <th className="mb-4 text-xs font-extrabold tracking-wider text-right py-1">
                                            <a href={`/admin/user/${user._id}`} className="py-2 rounded-md px-5 bg-primary text-white">View</a>
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
    await  dbConnect();
    const users = await User.find();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users))
        },
    }
}

export default Users
