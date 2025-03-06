import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { Dialog, Transition } from '@headlessui/react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

const steps = [
    { id: 'Step 1', name: 'Screening CV', href: '#', status: 'upcoming' },
    { id: 'Step 2', name: 'Psikotest', href: '#', status: 'upcoming' },
    { id: 'Step 3', name: 'Interview HR', href: '#', status: 'upcoming' },
    { id: 'Step 4', name: 'Interview User', href: '#', status: 'upcoming' },
    { id: 'Step 5', name: 'Offering Salary', href: '#', status: 'upcoming' },
    { id: 'Step 6', name: 'MCU', href: '#', status: 'upcoming' },
    { id: 'Step 7', name: 'SPK', href: '#', status: 'upcoming' },
];

export default function StatusPekerjaan() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStep, setSelectedStep] = useState(steps[0]); // Default to 'Screening CV'
    const [detailModal, setDetailModal] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nik = localStorage.getItem("nikJX2Career");

                if (!nik) {
                    throw new Error('NIK is not found in localStorage');
                }

                const response = await axios.get(`http://153.92.5.18:4005/getStatusPekerjaan?NIK=${nik}`);
                setData(response.data);
            } catch (error) {
                setError(error.message || 'Failed to fetch data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Count the number of posts for each step
    const stepCounts = steps.map((step) => ({
        ...step,
        count: data.filter((post) => post.Status === step.name).length,
    }));

    const filteredData = selectedStep
        ? data.filter((post) => post.Status === selectedStep.name)
        : data;

    const handleJobDetail = (job) => {
        setSelectedJob(job);
        setDetailModal(true);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
                <div className="bg-white p-8 rounded-xl shadow-md max-w-md">
                    <ExclamationCircleIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-center text-gray-900">Error</h3>
                    <p className="mt-2 text-sm text-center text-gray-600">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-32 sm:py-32">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl lg:max-w-7xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                                Status Lamaran Pekerjaan
                            </h2>
                            <p className="mt-3 text-lg text-orange-500">
                                Pantau proses seleksi lamaran Anda
                            </p>
                        </div>

                        {/* Steps Progress Navigation */}
                        <div className="mb-16">
                            <div className="overflow-x-auto pb-6">
                                <nav className="flex min-w-max" aria-label="Progress">
                                    <ol role="list" className="flex space-x-8">
                                        {stepCounts.map((step, stepIdx) => (
                                            <li key={step.id} className="relative">
                                                <button
                                                    onClick={() => step.count && setSelectedStep(step)}
                                                    disabled={!step.count}
                                                    className={`group flex flex-col items-center ${!step.count && 'opacity-50 cursor-not-allowed'}`}
                                                >
                                                    <span 
                                                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                                                            selectedStep?.id === step.id 
                                                                ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white'
                                                                : (step.count ? 'bg-white border-2 border-orange-300 text-orange-600 hover:border-orange-400' : 'bg-gray-100 border-2 border-gray-200 text-gray-400')
                                                        }`}
                                                    >
                                                        <span className="text-sm font-medium">
                                                            {stepIdx + 1}
                                                        </span>
                                                    </span>
                                                    <span className="mt-2 text-xs font-medium text-gray-700">
                                                        {step.name}
                                                    </span>
                                                    <span className={`mt-1 text-xs ${
                                                        selectedStep?.id === step.id ? 'text-orange-500 font-bold' : 'text-gray-500'
                                                    }`}>
                                                        ({step.count || 0})
                                                    </span>
                                                </button>
                                                {stepIdx < steps.length - 1 && (
                                                    <div className="absolute hidden top-5 left-full h-0.5 w-6 -translate-y-1/2 transform md:block bg-gray-200" />
                                                )}
                                            </li>
                                        ))}
                                    </ol>
                                </nav>
                            </div>
                        </div>

                        {/* No results message */}
                        {filteredData.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-xl shadow-sm border border-orange-100">
                                <ExclamationCircleIcon className="h-12 w-12 text-orange-300 mb-4" />
                                <h3 className="text-lg font-medium text-gray-900">Tidak ada lamaran</h3>
                                <p className="mt-2 text-sm text-gray-600">Anda belum memiliki lamaran pada tahap ini</p>
                            </div>
                        )}

                        {/* Job Cards Grid */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredData.map((post) => (
                                <article
                                    key={post.JobId}
                                    className="relative flex flex-col h-full bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-200 hover:shadow-md"
                                >
                                    {/* Status Badge */}
                                    <div className={`absolute top-4 right-4 z-10 rounded-full px-3 py-1 text-xs font-medium ${
                                        post['Sub Status'] === 'Qualified' 
                                            ? 'bg-green-100 text-green-800'
                                            : post['Sub Status'] === 'Not Qualified'
                                                ? 'bg-red-100 text-red-800'
                                                : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {post['Sub Status'] || 'Menunggu'}
                                    </div>

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
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                                    </div>

                                    {/* Job Details */}
                                    <div className="flex flex-col grow p-6">
                                        <div className="flex items-center gap-x-2 text-xs mb-3">
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

                                        {/* Status Message */}
                                        {post['Sub Status'] === 'Qualified' && (
                                            <div className="mb-4 p-3 bg-green-50 border border-green-100 rounded-lg">
                                                <p className="text-sm text-green-700">
                                                    Selamat! Anda lolos ke tahap selanjutnya. Kami akan menghubungi Anda untuk proses berikutnya.
                                                </p>
                                            </div>
                                        )}
                                        {post['Sub Status'] === 'Not Qualified' && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-100 rounded-lg">
                                                <p className="text-sm text-red-700">
                                                    Mohon maaf, saat ini kriteria Anda belum sesuai dengan kebutuhan kami. Tetap semangat untuk peluang berikutnya!
                                                </p>
                                            </div>
                                        )}

                                        {/* Current Status */}
                                        <div className="mb-6">
                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Status Saat Ini:</h4>
                                            <div className="flex items-center">
                                                <div className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                                    post['Sub Status'] === 'Qualified' 
                                                        ? 'bg-green-500'
                                                        : post['Sub Status'] === 'Not Qualified'
                                                            ? 'bg-red-500'
                                                            : 'bg-yellow-500'
                                                }`}></div>
                                                <p className="text-sm text-gray-600">
                                                    {post.Status || 'Menunggu Proses'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button Section */}
                                    <div className="px-6 pb-6 mt-auto">
                                        <button
                                            className="w-full py-3 px-4 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-md hover:from-orange-500 hover:to-orange-600 transition-all duration-200 font-medium"
                                            onClick={() => handleJobDetail(post)}
                                        >
                                            Lihat Detail
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Job Detail Modal */}
            <Transition.Root show={detailModal} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={setDetailModal}>
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-6 pb-6 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                    {selectedJob && (
                                        <>
                                            <div className="mt-2">
                                                <Dialog.Title as="h3" className="text-2xl font-semibold leading-6 text-gray-800 mb-4">
                                                    {selectedJob.JobName}
                                                </Dialog.Title>
                                                
                                                <div className="flex items-center gap-3 mb-6">
                                                    <span
                                                        className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-600"
                                                    >
                                                        {selectedJob.JobCategory}
                                                    </span>
                                                    <span
                                                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                            selectedJob['Sub Status'] === 'Qualified' 
                                                                ? 'bg-green-100 text-green-800'
                                                                : selectedJob['Sub Status'] === 'Not Qualified'
                                                                    ? 'bg-red-100 text-red-800'
                                                                    : 'bg-yellow-100 text-yellow-800'
                                                        }`}
                                                    >
                                                        {selectedJob['Sub Status'] || 'Menunggu'}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col space-y-6">
                                                    {/* Current Status */}
                                                    <div className="bg-gray-50 p-4 rounded-lg">
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Status Saat Ini:</h4>
                                                        <div className="flex items-center">
                                                            <div className={`h-3 w-3 rounded-full mr-2 ${
                                                                selectedJob['Sub Status'] === 'Qualified' 
                                                                    ? 'bg-green-500'
                                                                    : selectedJob['Sub Status'] === 'Not Qualified'
                                                                        ? 'bg-red-500'
                                                                        : 'bg-yellow-500'
                                                            }`}></div>
                                                            <p className="text-sm font-medium text-gray-700">
                                                                {selectedJob.Status || 'Menunggu Proses'}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Job Description */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Deskripsi Pekerjaan:</h4>
                                                        <ul className="space-y-1.5 text-sm text-gray-600">
                                                            {selectedJob.JobDescription?.split(",").map((desc, index) => (
                                                                <li key={index} className="flex items-start">
                                                                    <span className="text-orange-500 mr-2">•</span>
                                                                    <span>{desc.trim()}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>

                                                    {/* Kualifikasi if available */}
                                                    {selectedJob.Kualifikasi && (
                                                        <div>
                                                            <h4 className="text-sm font-medium text-gray-700 mb-2">Kualifikasi:</h4>
                                                            <ul className="space-y-1.5 text-sm text-gray-600">
                                                                {selectedJob.Kualifikasi?.split(",").map((item, index) => (
                                                                    <li key={index} className="flex items-start">
                                                                        <span className="text-orange-500 mr-2">•</span>
                                                                        <span>{item.trim()}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                    
                                                    {/* Application Timeline */}
                                                    <div>
                                                        <h4 className="text-sm font-medium text-gray-700 mb-3">Timeline Lamaran:</h4>
                                                        <ol className="relative border-l border-gray-200 ml-3">
                                                            <li className="mb-6 ml-6">
                                                                <span className="absolute flex items-center justify-center w-6 h-6 bg-orange-100 rounded-full -left-3 ring-8 ring-white">
                                                                    <svg className="w-2.5 h-2.5 text-orange-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                                                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                                    </svg>
                                                                </span>
                                                                <h3 className="flex items-center text-sm font-semibold text-gray-900">Lamaran Diajukan</h3>
                                                                <p className="text-xs font-normal text-gray-500 mt-1">Lamaran Anda telah diterima dan sedang dalam proses seleksi</p>
                                                            </li>
                                                            <li className="mb-6 ml-6">
                                                                <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${
                                                                    selectedJob.Status === 'Screening CV' 
                                                                        ? 'bg-orange-200' 
                                                                        : (selectedJob['Sub Status'] ? 'bg-green-100' : 'bg-gray-100')
                                                                }`}>
                                                                    <svg className={`w-2.5 h-2.5 ${
                                                                        selectedJob.Status === 'Screening CV' 
                                                                            ? 'text-orange-500' 
                                                                            : (selectedJob['Sub Status'] ? 'text-green-500' : 'text-gray-500')
                                                                    }`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                                        <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 13.5a.5.5 0 0 1-.5-.5v-1a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v1a.5.5 0 0 1-.5.5h-6ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Z"/>
                                                                    </svg>
                                                                </span>
                                                                <h3 className={`flex items-center text-sm font-semibold ${
                                                                    selectedJob.Status === 'Screening CV' 
                                                                        ? 'text-orange-600' 
                                                                        : (selectedJob['Sub Status'] ? 'text-green-600' : 'text-gray-500')
                                                                }`}>Screening CV</h3>
                                                                <p className="text-xs font-normal text-gray-500 mt-1">Tim HR sedang melakukan seleksi berdasarkan kualifikasi yang dibutuhkan</p>
                                                            </li>
                                                            {/* Add more timeline steps here */}
                                                        </ol>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="mt-8">
                                                <button
                                                    type="button"
                                                    className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                                    onClick={() => setDetailModal(false)}
                                                >
                                                    Tutup
                                                </button>
                                            </div>
                                        </>
                                    )}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}