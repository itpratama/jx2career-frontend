import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom';
export default function HeaderSection() {
    const [open, setOpen] = useState(true)
    const navigate = useNavigate();
    return (
        <div className="bg-white py-16 sm:py-20">
            <main>
                <div className="relative isolate">
                    {/* Subtle gradient background pattern - matching login theme */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-orange-200/20 via-orange-100/10 to-orange-50/5"></div>

                    {/* Decorative pattern - more subtle than before */}
                    <svg
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-orange-100 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
                        aria-hidden="true"
                    >
                        <defs>
                            <pattern
                                id="1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84"
                                width={200}
                                height={200}
                                x="50%"
                                y={-1}
                                patternUnits="userSpaceOnUse"
                            >
                                <path d="M.5 200V.5H200" fill="none" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                    </svg>

                    {/* Subtle color gradient accent - changed to orange to match login */}
                    <div
                        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-orange-400 to-orange-200 opacity-20"
                            style={{
                                clipPath:
                                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                            }}
                        />
                    </div>

                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pt-24 lg:px-8 lg:pt-16">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    {/* More refined typography to match minimalist theme */}
                                    <h1 className="text-3xl font-semibold tracking-tight text-gray-800 sm:text-4xl">
                                        WELCOME TO PT. PRATAMA ABADI INDUSTRI JX2
                                    </h1>
                                    <h3 className="mt-4 text-3xl font-light tracking-tight text-orange-500 sm:text-4xl">
                                        LET'S GROW WITH US
                                    </h3>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                        Bergabunglah dengan Kami untuk Berbagai Peluang Karir Menarik. Temukan Peran yang Sesuai dengan Keahlian Anda dan Berkembang Bersama Tim Profesional Kami.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        {/* Buttons styled to match login button */}
                                        <button
                                            onClick={() => navigate("/JobVacancy")}
                                            className="rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-orange-500 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-200"
                                        >
                                            Karir
                                        </button>
                                        <button
                                            onClick={() => navigate("/Company")}
                                            className="text-sm font-semibold leading-6 text-orange-500 hover:text-orange-600 transition-all duration-200"
                                        >
                                            Tentang JX2 <span aria-hidden="true">→</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Gallery with refined layout and consistent styling */}
                                <div className="mt-14 flex justify-end gap-4 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-6 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/af/d3/90/afd390d40a076c6f8cffc8021a7a803f.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-lg bg-gray-900/5 object-cover shadow-md transition-all duration-300 hover:shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-6 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/be/a9/4c/bea94cd38b7caef4a8a279fd44858f9b.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-lg bg-gray-900/5 object-cover shadow-md transition-all duration-300 hover:shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/8f/85/a6/8f85a6deff743ef0f53169f959892bbd.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-lg bg-gray-900/5 object-cover shadow-md transition-all duration-300 hover:shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-6 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/3d/90/b9/3d90b98021ce2bd260932420fb68382c.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-lg bg-gray-900/5 object-cover shadow-md transition-all duration-300 hover:shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/c6/ed/d0/c6edd0132db5542d2302b0ac675c0d6d.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-lg bg-gray-900/5 object-cover shadow-md transition-all duration-300 hover:shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Warning modal with styling matching the premium theme */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 backdrop-blur-sm transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-6 text-center sm:p-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-8 py-10 text-left shadow-xl border border-orange-100 transition-all sm:max-w-2xl">
                                    <div className="absolute right-4 top-4">
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2 transition-all duration-200"
                                            onClick={() => setOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-50">
                                            <ExclamationTriangleIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
                                        </div>
                                        <div className="ml-4">
                                            <Dialog.Title as="h3" className="text-lg font-semibold text-gray-800">
                                                WASPADALAH TERHADAP PENIPUAN REKRUTMEN
                                            </Dialog.Title>
                                            <p className="mt-1 text-sm text-gray-500">Yang Mengatasnamakan PT. Pratama Abadi Industri JX2</p>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-4 border-t border-gray-100 pt-4">
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-700">
                                                1. Seluruh proses rekrutmen PT. Pratama Abadi Industri JX2 <span className="font-semibold">TIDAK DIPUNGUT BIAYA</span> apapun.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-700">
                                                2. Rekrutmen PT. Pratama Abadi Industri JX2 <span className="font-semibold">TIDAK PERNAH</span> bekerja sama dengan pihak manapun.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-700">
                                                3. Informasi mengenai lowongan kerja hanya diberitahukan melalui LinkedIn, JobStreet, Glints, Instagram (@pratamajx2) dan Website Career PT. Pratama Abadi Industri JX2.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-700">
                                                4. Informasi panggilan dan hasil seleksi hanya diumumkan melalui Email (recruitment.jx2@jx.pratama.net) dan Nomor official rekrutmen PT. Pratama Abadi Industri JX2
                                                <span className="text-orange-500 font-medium"> (085352812232 dan 081296354148).</span>
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-700 text-center">
                                                Jika Anda menemukan isu penipuan terkait panggilan kerja palsu, harap laporkan ke nomor handphone
                                                <span className="text-orange-500 font-medium"> 085352812232</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:from-orange-500 hover:to-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all duration-200"
                                            onClick={() => setOpen(false)}
                                        >
                                            Saya Mengerti
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}