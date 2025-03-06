import { useState } from 'react'

const navigation = [
    { name: 'Product', href: '#' },
    { name: 'Features', href: '#' },
    { name: 'Marketplace', href: '#' },
    { name: 'Company', href: '#' },
]

export default function HeaderSectionCompany() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <div className="bg-white">
            <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20 pt-3">
                <div
                    className="absolute inset-y-0 right-1/2 -z-10 -mr-96 w-[200%] origin-top-right skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:-mr-80 lg:-mr-96"
                    aria-hidden="true"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 sm:py-32 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:mx-0 lg:grid lg:max-w-none lg:grid-cols-2 lg:gap-x-16 lg:gap-y-6 xl:grid-cols-1 xl:grid-rows-1 xl:gap-x-8">
                        <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:col-span-2 xl:col-auto">
                            Profil Perusahaan
                        </h1>
                        <div className="mt-6 max-w-xl lg:mt-0 xl:col-end-1 xl:row-start-1">
                            <p className="text-lg leading-8 text-gray-600  text-justify">
                                PT. Pratama Abadi Industri didirikan pada tahun 1989, Perusahaan ini adalah salah satu produsen sepatu dengan sejarah terpanjang dalam memproduksi sepatu atletik untuk brand NIKE di Indonesia. PT. Pratama Abadi Industri terdiri dari empat Factory yaitu Factory Serpong (IR) sebagai Kantor Pusat, Factory Sukabumi (JX), Factory Brebes (PM), dan Factory Garut (JX2). PT. Pratama Abadi Industri dapat memproduksi 2 juta pasang sepatu atletik berkualitas tinggi dalam waktu satu bulan. Dilengkapi dengan mesin berteknologi modern serta didukung oleh tim yang berpengalaman dan berkomitmen menciptakan sepatu atletik berkualitas tinggi.<br /><br />

                                <strong>Visi</strong><br />
                                Menjadi Perusahaan Sepatu Kelas Dunia.<br /><br />

                                <strong>Misi</strong><br />
                                Menjadi Kesatuan Usaha yang Berkelanjutan dan Memberikan Produk yang Premium.<br /><br />

                                <strong>Core Value</strong><br />
                                <div className="grid grid-cols-2 gap-4 mt-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-900 font-medium">•</span>
                                        <span>Team Work and Work Team</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-900 font-medium">•</span>
                                        <span>Ownership</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-900 font-medium">•</span>
                                        <span>Quality First</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-900 font-medium">•</span>
                                        <span>Disruptive Innovation</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-900 font-medium">•</span>
                                        <span>Open Mind</span>
                                    </div>
                                </div>
                            </p>
                            <div className="mt-8">
                                <h2 className="text-2xl font-semibold text-gray-800">Hubungi Kami</h2>
                                <ul className="mt-4 text-lg text-gray-600">
                                    <li><strong>Alamat:</strong> Jl. Raya Bandung-Tasikmalaya KM.43 Desa Cijolang Kec. Blubur Limbangan Kab. Garut Prov. Jawa Barat</li>
                                    <li><strong>Email:</strong> recruitment.jx2@jx.pratama.net</li>
                                    <li><strong>Kontak:</strong> +62853-5281-2232</li>
                                    <li><strong>Instagram:</strong> @pratamajx2</li>
                                </ul>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1567532900872-f4e906cbf06a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1280&q=80"
                            alt="Sepatu Nike"
                            className="mt-10 aspect-[6/5] w-full max-w-lg rounded-2xl object-cover sm:mt-16 lg:mt-0 lg:max-w-none xl:row-span-2 xl:row-end-2 xl:mt-36"
                        />
                    </div>
                </div>
                <div className="absolute inset-x-0 bottom-0 -z-10 h-24 bg-gradient-to-t from-white sm:h-32" />
            </div>
        </div>
    )
}
