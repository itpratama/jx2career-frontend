import { useState, useEffect, Fragment } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Logo from "../../../Assets/img/PratamaLogo.png"
import Avatar from "../../../Assets/img/Avatar.jpg"

const navigation = [
    { name: 'Beranda', path: '/' },
    { name: 'Career', path: '/JobVacancy' },
    { name: 'Tentang JX2', path: '/Company' },
]

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = Cookies.get('token');
        const nik = localStorage.getItem('nikJX2Career');
        if (nik) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('token'); // Remove token from cookies
        localStorage.removeItem('nikJX2Career'); // Remove email from localStorage
        setIsAuthenticated(false); // Update state to reflect the logout
        navigate("/Login"); // Redirect to login page using navigate
    };

    const handleNavigateProfile = () => {
        navigate('/ProfileUser');
    };

    const handleNavigateStatusPekerjaan = () => {
        navigate('/StatusPekerjaan');
    };

    return (
        <header className="fixed top-0 w-full bg-white border-b border-gray-200 shadow-md z-10">
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-6" aria-label="Global">
                <div className="flex lg:flex-1">
                    <button onClick={() => navigate('/')} className="-m-1.5 p-1.5">
                        <span className="sr-only">Your Company</span>
                        <img className="h-16 w-auto" src={Logo} alt="" />
                    </button>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-8">
                    {navigation.map((item) => (
                        <button key={item.name} onClick={() => navigate(item.path)} className="text-sm font-semibold leading-6 text-gray-900">
                            {item.name}
                        </button>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    {isAuthenticated ? (
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                    <span className="sr-only">Open user menu</span>
                                    <img
                                        className="h-8 w-8 rounded-full"
                                        src={Avatar}
                                        alt=""
                                    />
                                </Menu.Button>
                            </div>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleNavigateProfile}
                                                className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                            >
                                                Profile Lengkap
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleNavigateStatusPekerjaan}
                                                className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                            >
                                                Status Pekerjaan
                                            </button>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <button
                                                onClick={handleLogout}
                                                className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                            >
                                                Log Out
                                            </button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                    ) : (
                        <div className="flex space-x-4">
                            <button
                                onClick={() => navigate('/Login')}
                                className="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Sign In
                            </button>
                            <button
                                onClick={() => navigate('/RegistForm')}
                                className="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                                Sign Up
                            </button>
                        </div>
                    )}
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-4 py-4 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button onClick={() => navigate('/')} className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-8 w-auto"
                                src={Logo}
                                alt=""
                            />
                        </button>
                        <button
                            type="button"
                            className="-m-2 rounded-md p-2 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-4 flow-root">
                        <div className="-my-4 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-4">
                                {navigation.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => navigate(item.path)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <div className="py-4">
                                {isAuthenticated ? (
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="sr-only">Open user menu</span>
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={Avatar}
                                                    alt=""
                                                />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={handleNavigateProfile}
                                                            className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        >
                                                            Profile
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={handleNavigateStatusPekerjaan}
                                                            className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        >
                                                            Status Pekerjaan
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                                <Menu.Item>
                                                    {({ active }) => (
                                                        <button
                                                            onClick={handleLogout}
                                                            className={`${active ? "bg-gray-100" : ""} block w-full text-left px-4 py-2 text-sm text-gray-700`}
                                                        >
                                                            Log Out
                                                        </button>
                                                    )}
                                                </Menu.Item>
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                ) : (
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => navigate('/Login')}
                                            className="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => navigate('/RegistForm')}
                                            className="block rounded-lg px-3 py-2.5 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                        >
                                            Sign Up
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    )
}