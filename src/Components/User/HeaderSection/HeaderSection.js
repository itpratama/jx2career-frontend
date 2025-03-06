import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function HeaderSection() {
    const [open, setOpen] = useState(true)
    return (
        <div className="bg-white py-24 sm:py-24">
            <main>
                <div className="relative isolate">
                    <svg
                        className="absolute inset-x-0 top-0 -z-10 h-[64rem] w-full stroke-gray-200 [mask-image:radial-gradient(32rem_32rem_at_center,white,transparent)]"
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
                        <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
                            <path
                                d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
                                strokeWidth={0}
                            />
                        </svg>
                        <rect width="100%" height="100%" strokeWidth={0} fill="url(#1f932ae7-37de-4c0a-a8b0-a6e3b4d44b84)" />
                    </svg>
                    <div
                        className="absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48"
                        aria-hidden="true"
                    >
                        <div
                            className="aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                            style={{
                                clipPath:
                                    'polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)',
                            }}
                        />
                    </div>
                    <div className="overflow-hidden">
                        <div className="mx-auto max-w-7xl px-6 pb-32 pt-12 sm:pt-60 lg:px-8 lg:pt-12">
                            <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                                <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                                    <h1 className="text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                                        WELCOME TO PT. PRATAMA ABADI INDUSTRI JX2
                                    </h1>
                                    <h3 className="mt-4 text-4xl tracking-tight text-gray-900 sm:text-5xl">
                                        LET’S GROW WITH US
                                    </h3>
                                    <p className="relative mt-6 text-lg leading-8 text-gray-600 sm:max-w-md lg:max-w-none">
                                        Bergabunglah dengan Kami untuk Berbagai Peluang Karir Menarik. Temukan Peran yang Sesuai dengan Keahlian Anda dan Berkembang Bersama Tim Profesional Kami. Jangan Lewatkan Kesempatan untuk Meraih Sukses Bersama Kami.
                                    </p>
                                    <div className="mt-10 flex items-center gap-x-6">
                                        <a
                                            href="/JobVacancy"
                                            className="rounded-md bg-gray-800 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Karir
                                        </a>
                                        <a href="/Company" className="text-sm font-semibold leading-6 text-gray-900">
                                            Tentang JX2 <span aria-hidden="true">→</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/af/d3/90/afd390d40a076c6f8cffc8021a7a803f.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/be/a9/4c/bea94cd38b7caef4a8a279fd44858f9b.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/8f/85/a6/8f85a6deff743ef0f53169f959892bbd.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/3d/90/b9/3d90b98021ce2bd260932420fb68382c.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                        <div className="relative">
                                            <img
                                                src="https://i.pinimg.com/736x/c6/ed/d0/c6edd0132db5542d2302b0ac675c0d6d.jpg"
                                                alt=""
                                                className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
                                            />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
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
                        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity" />
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-8 py-10 text-left shadow-2xl transition-all sm:max-w-6xl">
                                    <div className="absolute right-4 top-4">
                                        <button
                                            type="button"
                                            className="rounded-full bg-gray-100 text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                            onClick={() => setOpen(false)}
                                        >
                                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                        </button>
                                    </div>
                                    <div className="flex items-center">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                                            <ExclamationTriangleIcon className="h-8 w-8 text-red-600" aria-hidden="true" />
                                        </div>
                                        <div className="ml-4">
                                            <Dialog.Title as="h3" className="text-lg font-semibold text-gray-900">
                                                WASPADALAH TERHADAP PENIPUAN REKRUTMEN YANG MENGATASNAMAKAN
                                                PT. PRATAMA ABADI INDUSTRI JX2!
                                            </Dialog.Title>
                                        </div>
                                    </div>
                                    <div className="mt-6 space-y-4 font-bold">
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-800 ">
                                                1. Seluruh proses rekrutmen PT. Pratama Abadi Industri JX2 TIDAK DIPUNGUT BIAYA apapun.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-800 ">
                                                2. Rekrutmen PT. Pratama Abadi Industri JX2 TIDAK PERNAH bekerja sama dengan pihak manapun.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-800">
                                                3. Informasi mengenai lowongan kerja hanya diberitahukan melalui LinkedIn, JobStreet, Glints, Instagram (@pratamajx2) dan Website Career PT. Pratama Abadi Industri JX2.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-800">
                                                4. Informasi panggilan dan hasil seleksi hanya diumumkan melalui Email (recruitment.jx2@jx.pratama.net) dan Nomor official rekrutmen PT. Pratama Abadi Industri JX2
                                                <span className="text-blue-700 font-semibold"> (085352812232 dan 081296354148).</span>
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-sm text-gray-800 text-center">
                                                Jika Anda menemukan isu penipuan terkait panggilan kerja palsu, harap laporkan ke nomor handphone
                                                <span className="text-blue-700"> 085352812232</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex items-center justify-center rounded-lg bg-gray-800 px-4 py-2 text-sm font-medium text-white shadow-md hover:bg-gray-700"
                                            onClick={() => setOpen(false)}
                                        >
                                            Continue
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
