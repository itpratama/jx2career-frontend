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
            <div className="bg-white py-32 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl lg:max-w-7xl">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Daftar Lowongan Pekerjaan
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Bergabung bersama kami. Jadilah yang terbaik.
                        </p>

                        {/* Filter Buttons */}
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button
                                className={`px-5 py-2 border rounded-full shadow-sm transition-all ${activeCategory === 'All'
                                    ? 'bg-gray-700 text-white border-gray-700'
                                    : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                                    }`}
                                onClick={() => handleFilter('All')}
                            >
                                Semua ({JobVacanciesData.length})
                            </button>
                            {categories.map(([category, count]) => (
                                <button
                                    key={category}
                                    className={`px-5 py-2 border rounded-full shadow-sm transition-all ${activeCategory === category
                                        ? 'bg-gray-700 text-white border-gray-700'
                                        : 'bg-white text-gray-800 border-gray-300 hover:bg-gray-100'
                                        }`}
                                    onClick={() => handleFilter(category)}
                                >
                                    {category} ({count})
                                </button>
                            ))}
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:mt-6">
                            {filteredData.map((post) => (
                                <article
                                    key={post.JobId}
                                    className="relative flex flex-col justify-between gap-6 bg-white rounded-lg shadow-lg p-6"
                                >
                                    {/* Image Section */}
                                    <div className="relative aspect-[24/9]">
                                        <img
                                            src={
                                                post.JobCategory === 'Operator'
                                                    ? 'https://i.pinimg.com/736x/c8/19/f2/c819f28e52092759a3088e80ed2ee464.jpg'
                                                    : 'https://i.pinimg.com/736x/14/25/44/14254459f3f2d390af721f4f745958e9.jpg'
                                            }
                                            alt=""
                                            className="absolute inset-0 h-full w-full rounded-lg bg-gray-50 object-cover"
                                        />
                                        <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-gray-900/10" />
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex flex-col grow">
                                        <div className="flex items-center gap-x-4 text-xs">
                                            <time
                                                dateTime={post.ClosingDate}
                                                className="text-gray-500"
                                            >
                                                Batas Akhir : {post.ClosingDate}
                                            </time>
                                            <a
                                                href="#"
                                                className="relative rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                                            >
                                                {post.JobCategory}
                                            </a>
                                        </div>
                                        <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                                            {post.JobName}
                                        </h3>

                                        {/* Kualifikasi */}
                                        <div className="mt-5">
                                            <h4 className="text-sm font-semibold text-gray-800">Kualifikasi :</h4>
                                            <ol className="mt-2 list-decimal list-inside text-sm leading-6 text-gray-600 text-justify">
                                                {post.Kualifikasi?.split(",").map((item, index) => (
                                                    <li key={index}>{item.trim()}</li>
                                                ))}
                                            </ol>
                                        </div>

                                        {/* Job Description */}
                                        <div className="mt-5">
                                            <h4 className="text-sm font-semibold text-gray-800">Deskripsi Pekerjaan :</h4>
                                            <ol className="mt-2 list-decimal list-inside text-sm leading-6 text-gray-600 text-justify">
                                                {post.JobDescription?.split(",").map((desc, index) => (
                                                    <li key={index}>{desc.trim()}</li>
                                                ))}
                                            </ol>
                                        </div>
                                    </div>

                                    {/* Button Section */}
                                    <div className="mt-4">
                                        {post.Status === 'Sudah Dilamar' ? (
                                            <button
                                                className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                                                disabled
                                            >
                                                Sudah Dilamar
                                            </button>
                                        ) : (
                                            <button
                                                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700"
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                                            <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-5">
                                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                Pekerjaan berhasil dilamar!
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Lamaran Anda berhasil di ajukan dan akan secepatnya kami proses berdasarkan permintaan
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
