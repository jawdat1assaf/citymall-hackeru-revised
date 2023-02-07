import { PropsWithChildren } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";


const AdminLayout = ({ children }: PropsWithChildren) => {
    return (
        <>
            <NavBar />
            <div className="h-screen flex flex-row flex-wrap">
                <SideBar />
                <div className="bg-gray-100 flex-1 p-6">
                    {children}
                </div>
            </div>
        </>

    )
}


export default AdminLayout;