import { useState } from 'react'

export default function HeaderSectionCompany() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white py-9 sm:py-19">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-orange-50/30 to-white pt-3">
                {/* Decorative element - diagonal background shape */}
                <div
                    className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-orange-600/5 ring-1 ring-orange-50 sm:-mr-80 lg:-mr-96"
                    aria-hidden="true"
                />
                
                {/* Subtle decorative pattern */}
                <div className="absolute inset-0 -z-10 opacity-5">
                    <svg className="h-full w-full" width="100%" height="100%">
                        <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M0 40L40 0" stroke="currentColor" strokeWidth="0.5" fill="none" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                    </svg>
                </div>
                
                <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-gray-800 sm:text-5xl lg:col-span-2 xl:col-auto">
                            Profil Perusahaan
                        </h1>
                        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p className="text-base leading-7 text-gray-600 text-justify">
                                PT. Pratama Abadi Industri didirikan pada tahun 1989, Perusahaan ini adalah salah satu produsen sepatu dengan sejarah terpanjang dalam memproduksi sepatu atletik untuk brand NIKE di Indonesia. PT. Pratama Abadi Industri terdiri dari empat Factory yaitu Factory Serpong (IR) sebagai Kantor Pusat, Factory Sukabumi (JX), Factory Brebes (PM), dan Factory Garut (JX2). PT. Pratama Abadi Industri dapat memproduksi 2 juta pasang sepatu atletik berkualitas tinggi dalam waktu satu bulan. Dilengkapi dengan mesin berteknologi modern serta didukung oleh tim yang berpengalaman dan berkomitmen menciptakan sepatu atletik berkualitas tinggi.
                            </p>
                            
                            <div className="mt-8 space-y-6">
                                <div className="border-l-4 border-orange-400 pl-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Visi</h3>
                                    <p className="mt-2 text-gray-600">Menjadi Perusahaan Sepatu Kelas Dunia.</p>
                                </div>
                                
                                <div className="border-l-4 border-orange-400 pl-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Misi</h3>
                                    <p className="mt-2 text-gray-600">Menjadi Kesatuan Usaha yang Berkelanjutan dan Memberikan Produk yang Premium.</p>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Core Value</h3>
                                    <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                        <div className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">•</span>
                                            <span className="text-gray-700">Team Work and Work Team</span>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">•</span>
                                            <span className="text-gray-700">Ownership</span>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">•</span>
                                            <span className="text-gray-700">Quality First</span>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">•</span>
                                            <span className="text-gray-700">Disruptive Innovation</span>
                                        </div>
                                        <div className="flex items-center space-x-3 rounded-lg bg-orange-50 px-4 py-2">
                                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-100 text-orange-500">•</span>
                                            <span className="text-gray-700">Open Mind</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8 rounded-lg border border-orange-100 bg-white p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-800">Hubungi Kami</h2>
                                <ul className="mt-4 space-y-3 text-gray-600">
                                    <li className="flex items-start">
                                        <span className="mr-2 font-medium text-orange-500">Alamat:</span>
                                        <span>Jl. Raya Bandung-Tasikmalaya KM.43 Desa Cijolang Kec. Blubur Limbangan Kab. Garut Prov. Jawa Barat</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 font-medium text-orange-500">Email:</span>
                                        <span>recruitment.jx2@jx.pratama.net</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 font-medium text-orange-500">Kontak:</span>
                                        <span>+62853-5281-2232</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-2 font-medium text-orange-500">Instagram:</span>
                                        <span>@pratamajx2</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        
                        {/* Company Image with refined styling */}
                        <div className="mt-10 lg:mt-0 xl:row-span-2 xl:row-end-2 xl:mt-8">
                            <div className="relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-lg">
                                <img
                                    src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                                    alt="Sepatu Nike"
                                    className="aspect-[6/5] w-full object-cover"
                                />
                                <div className="pointer-events-none absolute inset-0 rounded-lg ring-1 ring-inset ring-orange-100" />
                                
                                {/* Decorative gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent opacity-60"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Gradient fade at bottom */}
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>
        </div>
    )
}