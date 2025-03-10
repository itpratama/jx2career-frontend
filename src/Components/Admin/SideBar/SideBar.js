import { useNavigate } from 'react-router-dom';
import React, { Fragment, useEffect, useState, useMemo } from 'react';
import Logo from "../../../Assets/img/PratamaLogowhite.png";
import Avatar from "../../../Assets/img/Avatar.jpg";
import { Dialog, Transition } from '@headlessui/react';
import {
  BriefcaseIcon,
  ServerIcon,
  XMarkIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  UsersIcon
} from '@heroicons/react/24/outline';
import { Bars3Icon } from '@heroicons/react/20/solid';
import Cookies from 'js-cookie';

// Memisahkan data navigasi untuk meningkatkan keterbacaan
const navigation = [
  { name: 'Daftar User', path: '/AccountList', icon: UsersIcon, current: false },
  { name: 'Daftar Lowongan Pekerjaan', path: '/JobVacanciesList', icon: BriefcaseIcon, current: false },
  { name: 'Daftar Pelamar Kerja', path: '/CandidateList', icon: ServerIcon, current: false },
];

// Utility function untuk class names
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [isHovered, setIsHovered] = useState(null);

  // Memuat username dan status sidebar saat komponen dimount
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }

    // Cek status sidebar yang tersimpan
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  // Fungsi untuk toggle sidebar dengan animasi
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
  };

  // Fungsi untuk logout
  const handleLogout = () => {
    Cookies.remove('token');
    localStorage.removeItem('usernameJX2CareerAdmin');
    navigate('/Admin');
  };

  // Menggunakan useMemo untuk mencegah re-render yang tidak perlu
  const currentPath = useMemo(() => window.location.pathname, []);

  // Mengoptimalkan animasi dengan CSS variables
  const sidebarStyle = {
    '--transition-speed': '250ms',
    '--expanded-width': '18rem',
    '--collapsed-width': '5rem',
  };

  return (
    <>
      {/* Mobile sidebar - dioptimalkan dengan transition yang lebih halus */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog 
          as="div" 
          className="relative z-50 xl:hidden" 
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-200"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute right-0 top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5 text-white bg-orange-500 rounded-full shadow-lg hover:bg-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </Transition.Child>

                {/* Mobile sidebar content */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 px-6 pb-4 shadow-xl">
                  <div className="flex h-24 shrink-0 items-center justify-center">
                    <img
                      className="h-16 w-auto drop-shadow-lg"
                      src={Logo}
                      alt="Company Logo"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-8">
                      <li>
                        <ul role="list" className="-mx-2 space-y-4">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <button
                                onClick={() => {
                                  navigate(item.path);
                                  setSidebarOpen(false);
                                }}
                                className={classNames(
                                  currentPath === item.path
                                    ? 'bg-orange-600 text-white shadow-md'
                                    : 'text-white/90 hover:text-white hover:bg-orange-600/70',
                                  'group flex gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200 ease-in-out w-full'
                                )}
                              >
                                <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                {item.name}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="-mx-6 mt-auto mb-2">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-x-4 px-6 py-4 text-sm font-medium leading-6 text-white hover:bg-orange-600/60 rounded-xl transition-all duration-200 ease-in-out"
                        >
                          <img
                            className="h-10 w-10 rounded-full border-2 border-white/40 shadow-md"
                            src={Avatar}
                            alt="User avatar"
                          />
                          <div className="flex flex-col items-start">
                            <span className="text-white font-semibold">{username || 'Administrator'}</span>
                            <span className="text-white/80 text-xs">Logout</span>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 xl:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-700 xl:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        
        <div className="flex flex-1 gap-x-4 self-stretch items-center">
          <div className="flex flex-1 justify-center">
            <img
              className="h-8 w-auto"
              src={Logo}
              alt="Company Logo"
            />
          </div>
        </div>
      </div>

      {/* Desktop sidebar - Dengan animasi yang lebih halus dan desain yang lebih modern */}
      <div
        style={sidebarStyle}
        className={classNames(
          "hidden xl:fixed xl:inset-y-0 xl:z-40 xl:flex xl:flex-col",
          "transition-all duration-300 ease-in-out shadow-xl",
          collapsed ? "xl:w-[var(--collapsed-width)]" : "xl:w-[var(--expanded-width)]"
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gradient-to-br from-orange-600 via-orange-700 to-orange-800 px-4 ring-1 ring-white/10">
          {/* Toggle button yang lebih terlihat */}
          <div className="flex justify-end py-4">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full bg-orange-600/70 text-white hover:bg-orange-500 shadow-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-400"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronDoubleRightIcon className="h-5 w-5" />
              ) : (
                <ChevronDoubleLeftIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Logo area */}
          <div className="flex h-20 shrink-0 items-center justify-center py-3">
            {!collapsed && (
              <img
                className="h-14 w-auto drop-shadow-lg transition-opacity duration-200"
                src={Logo}
                alt="Company Logo"
              />
            )}
            {collapsed && (
              <div className="rounded-full bg-orange-600/70 p-2 shadow-lg">
                <BriefcaseIcon className="h-8 w-8 text-white" />
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-8">
              <li>
                <ul role="list" className="-mx-2 space-y-4">
                  {navigation.map((item, index) => (
                    <li key={item.name}>
                      <button
                        onClick={() => navigate(item.path)}
                        onMouseEnter={() => setIsHovered(index)}
                        onMouseLeave={() => setIsHovered(null)}
                        className={classNames(
                          currentPath === item.path
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'text-white/90 hover:text-white hover:bg-orange-600/70',
                          'relative group flex items-center gap-x-3 rounded-xl p-3 text-sm leading-6 font-medium transition-all duration-200 ease-in-out w-full',
                          collapsed ? 'justify-center' : '',
                          collapsed && isHovered === index ? 'overflow-visible' : ''
                        )}
                      >
                        <item.icon 
                          className={classNames(
                            "h-6 w-6 shrink-0 transition-transform duration-200",
                            currentPath === item.path ? "text-white" : "text-white/90 group-hover:text-white",
                            collapsed && currentPath === item.path ? "scale-110" : ""
                          )} 
                          aria-hidden="true" 
                        />
                        {!collapsed && (
                          <span className="transition-opacity duration-200">{item.name}</span>
                        )}
                        
                        {/* Tooltip untuk mode collapsed */}
                        {collapsed && isHovered === index && (
                          <div className="absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white shadow-lg z-10">
                            {item.name}
                          </div>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </li>
              
              {/* Logout button */}
              <li className={classNames("mt-auto mb-4", collapsed ? "mx-0" : "-mx-2")}>
                <button
                  onClick={handleLogout}
                  onMouseEnter={() => setIsHovered('logout')}
                  onMouseLeave={() => setIsHovered(null)}
                  className={classNames(
                    "relative flex items-center gap-x-4 py-4 text-sm font-medium leading-6 text-white hover:bg-orange-600/60 rounded-xl transition-all duration-200 ease-in-out",
                    collapsed ? "justify-center px-2" : "px-4 w-full"
                  )}
                >
                  <img
                    className={classNames(
                      "rounded-full border-2 border-white/40 shadow-md transition-all duration-200",
                      collapsed ? "h-9 w-9" : "h-10 w-10"
                    )}
                    src={Avatar}
                    alt="User avatar"
                  />
                  {!collapsed && (
                    <div className="flex flex-col items-start transition-opacity duration-200">
                      <span className="text-white font-semibold">{username || 'Administrator'}</span>
                      <span className="text-white/80 text-xs">Logout</span>
                    </div>
                  )}
                  
                  {/* Tooltip untuk mode collapsed */}
                  {collapsed && isHovered === 'logout' && (
                    <div className="absolute left-full ml-2 whitespace-nowrap rounded-md bg-gray-800 px-3 py-2 text-sm font-medium text-white shadow-lg z-10">
                      Logout ({username || 'Administrator'})
                    </div>
                  )}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Push content when sidebar is open */}
      <div className={classNames(
        "xl:pl-[var(--collapsed-width)]",
        "transition-all duration-300 ease-in-out",
        !collapsed && "xl:pl-[var(--expanded-width)]"
      )}>
        {/* Content placeholder */}
      </div>
    </>
  );
}