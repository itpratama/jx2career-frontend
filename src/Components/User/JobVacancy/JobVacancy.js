import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'

export default function JobVacancy() {
    const [open, setOpen] = useState(false)
    const [JobVacanciesData, setJobVacanciesData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');

    // Fetch job vacancies data from API
    useEffect(() => {
        const fetchJobVacancies = async () => {
            try {
                const nik = localStorage.getItem("nikJX2Career"); // Ambil NIK dari localStorage
                const response = await axios.post('http://153.92.5.18:4005/getJobVacanciesUser', {
                    NIK: nik, // Kirim NIK ke API
                });
                const data = response.data;

                setJobVacanciesData(data);
                setFilteredData(data);

                const categoryCounts = data.reduce((acc, job) => {
                    acc[job.JobCategory] = (acc[job.JobCategory] || 0) + 1;
                    return acc;
                }, {});

                setCategories(Object.entries(categoryCounts));
            } catch (error) {
                setError('Failed to fetch job vacancies.');
                console.error('Error fetching job vacancies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJobVacancies();
    }, []);

    const handleFilter = (category) => {
        setActiveCategory(category); // Set kategori aktif
        if (category === 'All') {
            setFilteredData(JobVacanciesData);
        } else {
            setFilteredData(JobVacanciesData.filter(job => job.JobCategory === category));
        }
    };

    const handleSubmitApplied = async (jobId) => {
        const nik = localStorage.getItem("nikJX2Career");

        if (!nik) {
            navigate('/Login');
            return;
        }

        try {
            const response = await axios.post('http://153.92.5.18:4005/addCandidateApplied', {
                NIK: nik,
                JobId: jobId
            });
            setOpen(true)
            console.log('Application submitted successfully:', response.data);
        } catch (error) {
            console.error('Error submitting application:', error.response?.data || error.message);
            alert('Gagal mengajukan lamaran. Silakan coba lagi.');
        }
    };

    console.log(filteredData)

    return (
        <>
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-32 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl lg:max-w-7xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            Daftar Lowongan Pekerjaan
                        </h2>
                        <p className="mt-3 text-lg text-orange-500">
                            Bergabung bersama kami. Jadilah yang terbaik.
                        </p>
                    </div>

                    {/* Filter Buttons */}
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <button
                            className={`px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 font-medium text-sm ${
                                activeCategory === 'All'
                                    ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                                    : 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-50'
                            }`}
                            onClick={() => handleFilter('All')}
                        >
                            Semua ({JobVacanciesData.length})
                        </button>
                        {categories.map(([category, count]) => (
                            <button
                                key={category}
                                className={`px-5 py-2.5 rounded-full shadow-sm transition-all duration-200 font-medium text-sm ${
                                    activeCategory === category
                                        ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                                        : 'bg-white text-gray-700 border border-orange-200 hover:bg-orange-50'
                                }`}
                                onClick={() => handleFilter(category)}
                            >
                                {category} ({count})
                            </button>
                        ))}
                    </div>
                    
                    <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredData.map((post) => (
                            <article
                                key={post.JobId}
                                className="relative flex flex-col h-full bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                            >
                                {/* Image Section */}
                                <div className="relative aspect-[16/9]">
                                    <img
                                        src={
                                            post.JobCategory === 'Operator'
                                                ? 'https://i.pinimg.com/736x/c8/19/f2/c819f28e52092759a3088e80ed2ee464.jpg'
                                                : 'https://i.pinimg.com/736x/14/25/44/14254459f3f2d390af721f4f745958e9.jpg'
                                        }
                                        alt=""
                                        className="h-full w-full object-cover"
                                    />
                                </div>

                                {/* Job Details */}
                                <div className="flex flex-col grow p-6">
                                    <div className="flex items-center justify-between gap-x-2 text-xs mb-3">
                                        <time
                                            dateTime={post.ClosingDate}
                                            className="text-gray-500"
                                        >
                                            Batas Akhir: {post.ClosingDate}
                                        </time>
                                        <span
                                            className="rounded-full bg-orange-100 px-3 py-1 font-medium text-orange-600"
                                        >
                                            {post.JobCategory}
                                        </span>
                                    </div>
                                    
                                    <h3 className="text-xl font-semibold leading-6 text-gray-800 mb-4">
                                        {post.JobName}
                                    </h3>

                                    {/* Kualifikasi */}
                                    <div className="mb-4">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Kualifikasi:</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {post.Kualifikasi?.split(",").map((item, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-orange-500 mr-2">•</span>
                                                    <span>{item.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Job Description */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan:</h4>
                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                            {post.JobDescription?.split(",").map((desc, index) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-orange-500 mr-2">•</span>
                                                    <span>{desc.trim()}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {/* Button Section */}
                                <div className="px-6 pb-6 mt-auto">
                                    {post.Status === 'Sudah Dilamar' ? (
                                        <button
                                            className="w-full py-3 px-4 bg-gray-100 text-gray-500 rounded-md cursor-not-allowed font-medium"
                                            disabled
                                        >
                                            Sudah Dilamar
                                        </button>
                                    ) : (
                                        <button
                                            className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-md hover:from-orange-500 hover:to-orange-600 transition-all duration-200 font-medium"
                                            onClick={() => handleSubmitApplied(post.JobId)}
                                        >
                                            Lamar Sekarang
                                        </button>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </div>
        
        {/* Success Modal */}
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
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-6 pb-6 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                <div>
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                                        <CheckIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-800">
                                            Pekerjaan berhasil dilamar!
                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600">
                                                Lamaran Anda berhasil diajukan dan akan secepatnya kami proses berdasarkan permintaan
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="button"
                                        className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                        onClick={() => {
                                            setOpen(false);
                                            window.location.reload();
                                        }}
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    </>
    )
}
