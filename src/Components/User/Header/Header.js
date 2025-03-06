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
        Cookies.remove('token');
        localStorage.removeItem('nikJX2Career');
        setIsAuthenticated(false);
        navigate("/Login");
    };

    const handleNavigate = (path) => {
        navigate(path);
        setMobileMenuOpen(false); // Close mobile menu when navigating
    };

    const handleNavigateProfile = () => {
        navigate('/ProfileUser');
        setMobileMenuOpen(false);
    };

    const handleNavigateStatusPekerjaan = () => {
        navigate('/StatusPekerjaan');
        setMobileMenuOpen(false);
    };

    return (
        <header className="fixed top-0 w-full bg-white shadow-sm z-10 backdrop-blur-sm bg-white/90">
            <div className="border-b border-orange-100">
                <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <button onClick={() => handleNavigate('/')} className="-m-1.5 p-1.5 transition-all duration-200 hover:opacity-80">
                            <span className="sr-only">Your Company</span>
                            <img className="h-14 w-auto" src={Logo} alt="JX2 Logo" />
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
                            <button 
                                key={item.name} 
                                onClick={() => handleNavigate(item.path)} 
                                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200 px-3 py-2 relative group"
                            >
                                {item.name}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {isAuthenticated ? (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex rounded-full bg-white ring-2 ring-orange-100 p-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-200">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="h-8 w-8 rounded-full object-cover"
                                            src={Avatar}
                                            alt="Profile"
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
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleNavigateProfile}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-colors duration-150`}
                                                >
                                                    Profile Lengkap
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleNavigateStatusPekerjaan}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-colors duration-150`}
                                                >
                                                    Status Pekerjaan
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-colors duration-150`}
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
                                    onClick={() => handleNavigate('/Login')}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-colors duration-200"
                                >
                                    Sign In
                                </button>
                                <button
                                    onClick={() => handleNavigate('/RegistForm')}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-sm transition-all duration-200"
                                >
                                    Sign Up
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <button onClick={() => handleNavigate('/')} className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img
                                className="h-10 w-auto"
                                src={Logo}
                                alt=""
                            />
                        </button>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-200">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavigate(item.path)}
                                        className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                            <div className="py-6">
                                {isAuthenticated ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-orange-50">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover border-2 border-orange-200"
                                                src={Avatar}
                                                alt="Profile"
                                            />
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-800">User Profile</p>
                                                <p className="text-sm text-gray-500">Manage your account</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={handleNavigateProfile}
                                            className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
                                        >
                                            Profile Lengkap
                                        </button>
                                        <button
                                            onClick={handleNavigateStatusPekerjaan}
                                            className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
                                        >
                                            Status Pekerjaan
                                        </button>
                                        <button
                                            onClick={handleLogout}
                                            className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3 px-2">
                                        <button
                                            onClick={() => handleNavigate('/Login')}
                                            className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-colors duration-150 border border-gray-200"
                                        >
                                            Sign In
                                        </button>
                                        <button
                                            onClick={() => handleNavigate('/RegistForm')}
                                            className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-sm transition-all duration-200"
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