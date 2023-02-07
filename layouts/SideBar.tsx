

const SideBar = () => {

    return (
        <div id="sideBar" className="relative flex flex-col flex-wrap bg-white border-r border-gray-300 p-6 flex-none w-64  animated faster">
            <div className="flex flex-col">

                <a href="/admin" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-chart-pie text-xs mr-2"></i>
                    Dashboard
                </a>

                <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">Users</p>

                <a href="/admin/user" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                    Users
                </a>

                <p className="uppercase text-xs text-gray-600 mb-4 mt-4 tracking-wider">General</p>

                <a href="/admin/product" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                    Products
                </a>


                <a href="/admin/order" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                    Orders
                </a>


                <a href="/admin/review" className="mb-3 capitalize font-medium text-sm hover:text-teal-600 transition ease-in-out duration-500">
                    <i className="fad fa-envelope-open-text text-xs mr-2"></i>
                    Reviews
                </a>
                

                
                <a href="/admin/logout" className="my-3 capitalize font-medium text-sm py-2 rounded-md px-5 bg-primary text-white text-center">
                    <i className="fa-solid fa-arrow-right-from-bracket text-xs mr-2"></i>
                    Logout
                </a>

            </div>

        </div>
    )
}

export default SideBar;