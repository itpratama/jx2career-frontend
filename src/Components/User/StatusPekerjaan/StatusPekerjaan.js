import React, { useState, useEffect } from 'react';

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

    useEffect(() => {
        const fetchData = async () => {
            try {
                const nik = localStorage.getItem("nikJX2Career");

                if (!nik) {
                    throw new Error('NIK is not found in localStorage');
                }

                const response = await fetch(`http://localhost:4005/getStatusPekerjaan?NIK=${nik}`);

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.message);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div className='mx-auto max-w-7xl px-6 lg:px-8 py-40'>
                <nav aria-label="Progress">
                    <ol role="list" className="space-y-6 md:flex md:space-x-12 md:space-y-0">
                        {stepCounts.map((step) => (
                            <li key={step.id} className="md:flex-1">
                                <button
                                    onClick={() => step.count && setSelectedStep(step)}
                                    disabled={!step.count}
                                    className={`group flex flex-col border-l-4 py-4 pl-6 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4 ${selectedStep?.id === step.id
                                        ? 'border-orange-500 text-orange-500'
                                        : !step.count
                                            ? 'border-gray-300 text-gray-300 cursor-not-allowed'
                                            : 'border-gray-500 text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                        }`}
                                >
                                    <span className="text-sm font-medium mt-1">{step.name} ({step.count || 0})</span>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav>
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 mb-12 py-6">
                    {filteredData.map((post) => (
                        <article
                            key={post.JobId}
                            className="relative flex flex-col justify-between gap-6 bg-white rounded-lg shadow-lg p-8"
                        >
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
                            <div className="flex flex-col grow">
                                <div className="flex items-center gap-x-4 text-xs">
                                    <time
                                        dateTime={post.ClosingDate}
                                        className="text-gray-500 mb-6"
                                    >
                                        Batas Akhir : {post.ClosingDate}
                                    </time>
                                </div>
                                <div className="relative mx-auto text-left">
                                    <span
                                        className={`px-4 py-2 text-sm text-white ${post['Sub Status'] === 'Qualified'
                                            ? 'bg-green-800'
                                            : post['Sub Status'] === 'Not Qualified'
                                                ? 'bg-red-800'
                                                : 'bg-gray-400'
                                            }`}
                                    >
                                        {post['Sub Status']}
                                    </span>
                                    {post['Sub Status'] === 'Qualified' && (
                                        <p className="mt-4 text-xs text-gray-700 italic opacity-50">
                                            Selamat! Anda lolos ke tahap selanjutnya. Kami menantikan kontribusi terbaik Anda.
                                        </p>
                                    )}
                                    {post['Sub Status'] === 'Not Qualified' && (
                                        <p className="mt-4 text-xs text-gray-700 italic opacity-50">
                                            Mohon maaf, saat ini kriteria Anda belum sesuai dengan kebutuhan kami.
                                        </p>
                                    )}
                                </div>

                                <h3 className="mt-4 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 text-left">
                                    {post.JobName}
                                </h3>
                                <div className="mt-4">
                                    <h4 className="text-sm font-semibold text-gray-800">Deskripsi :</h4>
                                    <ol className="mt-3 list-decimal list-inside text-sm leading-6 text-gray-600 text-justify">
                                        {post.JobDescription?.split(",").map((desc, index) => (
                                            <li key={index}>{desc.trim()}</li>
                                        ))}
                                    </ol>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </>
    );
}
