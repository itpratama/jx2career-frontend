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
                        <button onClick={() => handleNavigate('/')} className="-m-1.5 p-1.5 transition-all duration-300 hover:opacity-80 transform hover:scale-105">
                            <span className="sr-only">Your Company</span>
                            <img className="h-14 w-auto" src={Logo} alt="JX2 Logo" />
                        </button>
                    </div>
                    <div className="flex lg:hidden">
                        <button
                            type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2 text-gray-700 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500 transform hover:rotate-3"
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
                                className="text-sm font-medium text-gray-700 hover:text-orange-500 transition-all duration-300 px-3 py-2 relative group overflow-hidden"
                            >
                                {item.name}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                <span className="absolute inset-0 h-full w-full bg-orange-50 rounded-lg opacity-0 transform scale-95 group-hover:opacity-10 group-hover:scale-100 transition-all duration-300"></span>
                            </button>
                        ))}
                    </div>

                    <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                        {isAuthenticated ? (
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    <Menu.Button className="flex rounded-full bg-white ring-2 ring-orange-100 p-0.5 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 transition-all duration-300 transform hover:scale-110 hover:ring-orange-200">
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
                                    enter="transition ease-out duration-300"
                                    enterFrom="transform opacity-0 scale-95 translate-y-2"
                                    enterTo="transform opacity-100 scale-100 translate-y-0"
                                    leave="transition ease-in duration-200"
                                    leaveFrom="transform opacity-100 scale-100 translate-y-0"
                                    leaveTo="transform opacity-0 scale-95 translate-y-2"
                                >
                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none divide-y divide-orange-100">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleNavigateProfile}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${active ? "transform translate-x-1" : ""}`}
                                                >
                                                    Profile Lengkap
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleNavigateStatusPekerjaan}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${active ? "transform translate-x-1" : ""}`}
                                                >
                                                    Status Pekerjaan
                                                </button>
                                            )}
                                        </Menu.Item>
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={handleLogout}
                                                    className={`${active ? "bg-orange-50 text-orange-600" : "text-gray-700"} block w-full text-left px-4 py-2 text-sm transition-all duration-200 ${active ? "transform translate-x-1" : ""}`}
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
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-500 transition-all duration-300 relative overflow-hidden group"
                                >
                                    <span className="relative z-10">Sign In</span>
                                    <span className="absolute inset-0 bg-orange-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-lg"></span>
                                </button>
                                <button
                                    onClick={() => handleNavigate('/RegistForm')}
                                    className="rounded-lg px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-sm transition-all duration-300 transform hover:scale-105 hover:shadow-md overflow-hidden relative"
                                >
                                    <span className="relative z-10">Sign Up</span>
                                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transform -translate-x-full skew-x-12 group-hover:translate-x-full transition-all duration-700"></span>
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            <Transition show={mobileMenuOpen} as={Fragment}>
                <Dialog as="div" className="lg:hidden" onClose={setMobileMenuOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 z-10 bg-black/20 backdrop-blur-sm" />
                    </Transition.Child>
                    
                    <Transition.Child
                        as={Fragment}
                        enter="transition ease-out duration-300"
                        enterFrom="transform translate-x-full"
                        enterTo="transform translate-x-0"
                        leave="transition ease-in duration-200"
                        leaveFrom="transform translate-x-0"
                        leaveTo="transform translate-x-full"
                    >
                        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                            <div className="flex items-center justify-between">
                                <button onClick={() => handleNavigate('/')} className="-m-1.5 p-1.5 transition-all duration-300 hover:opacity-80 transform hover:scale-105">
                                    <span className="sr-only">Your Company</span>
                                    <img
                                        className="h-10 w-auto"
                                        src={Logo}
                                        alt=""
                                    />
                                </button>
                                
                                <button
                                    type="button"
                                    className="-m-2.5 rounded-md p-2.5 text-gray-700 transition-all duration-300 hover:bg-orange-50 hover:text-orange-500 transform hover:rotate-3"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            
                            <div className="mt-6 flow-root">
                                <div className="-my-6 divide-y divide-gray-200">
                                    <Transition.Child
                                        as="div"
                                        className="space-y-2 py-6"
                                        enter="transition-all ease-out duration-300"
                                        enterFrom="opacity-0 transform translate-y-4"
                                        enterTo="opacity-100 transform translate-y-0"
                                    >
                                        {navigation.map((item, index) => (
                                            <button
                                                key={item.name}
                                                onClick={() => handleNavigate(item.path)}
                                                className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 transform hover:translate-x-1"
                                                style={{ transitionDelay: `${150 + index * 75}ms` }}
                                            >
                                                {item.name}
                                            </button>
                                        ))}
                                    </Transition.Child>
                                    
                                    <Transition.Child
                                        as="div"
                                        className="py-6"
                                        enter="transition-all ease-out duration-300"
                                        enterFrom="opacity-0 transform translate-y-8"
                                        enterTo="opacity-100 transform translate-y-0"
                                        style={{ transitionDelay: "300ms" }}
                                    >
                                        {isAuthenticated ? (
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-orange-50 transform transition-all duration-300 hover:shadow-md hover:bg-orange-100">
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
                                                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 transform hover:translate-x-1"
                                                >
                                                    Profile Lengkap
                                                </button>
                                                <button
                                                    onClick={handleNavigateStatusPekerjaan}
                                                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 transform hover:translate-x-1"
                                                >
                                                    Status Pekerjaan
                                                </button>
                                                <button
                                                    onClick={handleLogout}
                                                    className="-mx-3 block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 transform hover:translate-x-1"
                                                >
                                                    Log Out
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="space-y-3 px-2">
                                                <button
                                                    onClick={() => handleNavigate('/Login')}
                                                    className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 border border-gray-200 hover:border-orange-200 transform hover:translate-y-[-2px] hover:shadow-md"
                                                >
                                                    Sign In
                                                </button>
                                                <button
                                                    onClick={() => handleNavigate('/RegistForm')}
                                                    className="w-full rounded-lg px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 shadow-sm transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-md relative overflow-hidden"
                                                >
                                                    <span className="relative z-10">Sign Up</span>
                                                    <span className="absolute top-0 left-0 w-full h-full bg-white opacity-0 hover:opacity-20 transform -translate-x-full skew-x-12 hover:translate-x-full transition-all duration-700"></span>
                                                </button>
                                            </div>
                                        )}
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </Dialog>
            </Transition>
        </header>
    )
}