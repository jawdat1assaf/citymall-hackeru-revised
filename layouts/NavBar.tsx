import Image from "next/image";

const NavBar = () => {
    return (
        <div className="flex flex-row flex-wrap items-center bg-secondary p-6 border-b border-gray-300">

            <div className="flex-none w-56 flex flex-row items-center">
                <Image src="/logo.png" className="flex-none rounded-md" height={70} width={70}/> <span className="ml-3 text-white">E-Mobile</span>
            </div>

            <div id="navbar" className="animated flex-1 pl-3 flex  justify-between items-center md:items-center">
                <div className="text-gray-600">
                    <a className="mr-2 transition duration-500 ease-in-out hover:text-gray-900" href="#" title="email"><i className="fad fa-envelope-open-text"></i></a>
                    <a className="mr-2 transition duration-500 ease-in-out hover:text-gray-900" href="#" title="email"><i className="fad fa-comments-alt"></i></a>
                    <a className="mr-2 transition duration-500 ease-in-out hover:text-gray-900" href="#" title="email"><i className="fad fa-check-circle"></i></a>
                    <a className="mr-2 transition duration-500 ease-in-out hover:text-gray-900" href="#" title="email"><i className="fad fa-calendar-exclamation"></i></a>
                </div>
                <div className="flex flex-row-reverse items-center">
                    <div className="dropdown relative md:static">

                        <button className="menu-btn focus:outline-none focus:shadow-outline flex flex-wrap items-center">
                            <div className="w-8 h-8 overflow-hidden rounded-full">
                                {/* <Image className="w-full h-full object-cover" src="" layout="fill" /> */}
                            </div>

                            <div className="ml-2 capitalize flex ">
                                <h1 className="text-sm  font-semibold m-0 p-0 leading-none text-white">Username</h1>
                            </div>
                        </button>

                        <button className="hidden fixed top-0 left-0 z-10 w-full h-full menu-overflow"></button>

                        <div className="text-gray-500 menu hidden md:mt-10 md:w-full rounded bg-white shadow-md absolute z-20 right-0 w-40 mt-5 py-2 animated faster">


                            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                                <i className="fad fa-user-edit text-xs mr-1"></i>
                                edit my profile
                            </a>

                            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                                <i className="fad fa-inbox-in text-xs mr-1"></i>
                                my inbox
                            </a>


                            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                                <i className="fad fa-badge-check text-xs mr-1"></i>
                                tasks
                            </a>

                            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                                <i className="fad fa-comment-alt-dots text-xs mr-1"></i>
                                chats
                            </a>

                            <hr />
                            <a className="px-4 py-2 block capitalize font-medium text-sm tracking-wide bg-white hover:bg-gray-200 hover:text-gray-900 transition-all duration-300 ease-in-out" href="#">
                                <i className="fad fa-user-times text-xs mr-1"></i>
                                log out
                            </a>

                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
}


export default NavBar;