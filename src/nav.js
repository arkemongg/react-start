import { memo, useEffect, useState, userState } from "react"
import { Outlet, Link } from "react-router-dom";

function NavWithoutLogin() {
    const [navBtn, setNavBtn] = useState(true)
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            setLoading(false); // Set loading to false after 5 seconds
        }, 2000);

        return () => {
            setLoading(true);
            clearTimeout(timeoutId); // Clean up the timeout when the component unmounts or the effect re-runs
        };
    }, [navBtn]);
    const clickedNav = () => {
        setNavBtn(navBtn?false:true)
    }
    return (
        <>
            <div className="navbar bg-neutral text-neutral-content">
                <div className="navbar-start">
                    <div className="dropdown bg-neutral text-neutral-content">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 bg-neutral text-neutral-content  shadow rounded-box w-52">
                            <li>
                                <Link onClick={clickedNav} to="/" >Home </Link>
                            </li>
                            <li>
                                <Link onClick={clickedNav} to="/products" >Products </Link>
                            </li>
                            <li><Link onClick={clickedNav} to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
                </div>
                <div className="navbar-end hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li tabIndex={0}>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul>
                </div>
            </div>
            {isLoading ? (
                <span className="loading loading-spinner text-primary"></span>
            ) : (
                <Outlet />
            )}
        </>
    )

}
function NavWithLogin() {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <a className="btn btn-ghost normal-case text-xl">daisyUI</a>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>
                        <li><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

function Navigation() {
    const [isLogged, setIslogged] = useState(false)
    if (isLogged) {
        return (< NavWithLogin />)
    } else {
        return (< NavWithoutLogin />)
    }
}

export default memo(Navigation)