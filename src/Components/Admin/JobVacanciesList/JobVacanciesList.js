import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobVacanciesList() {
    const [filters, setFilters] = useState({
        "Nama Pekerjaan": '',
        "Kategori Pekerjaan": '',
        //"Tanggal Dibuka Lowongan": '',
        //"Tanggal Ditutup Lowongan": '',
    });

    const [originalData, setOriginalData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState({
        "Nama Pekerjaan": [],
        "Kategori Pekerjaan": [],
        //"Tanggal Dibuka Lowongan": [],
        //"Tanggal Ditutup Lowongan": [],
    });
    const [vacancies, setVacancies] = useState([]);

    // Fetch initial data
    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const response = await axios.get('http://153.92.5.18:4005/getJobVacancies');
                setOriginalData(response.data);
                updateDropdownOptions(response.data, {});
                setVacancies(response.data);
            } catch (error) {
                console.error('Failed to fetch initial data:', error);
            }
        };

        fetchInitialData();
    }, []);

    const updateDropdownOptions = (data, currentFilters) => {
        const filteredData = data.filter((item) =>
            Object.keys(currentFilters).every(
                (key) => !currentFilters[key] || item[key] === currentFilters[key]
            )
        );

        setDropdownOptions({
            "Nama Pekerjaan": [...new Set(filteredData.map((item) => item["Nama Pekerjaan"]))],
            "Kategori Pekerjaan": [...new Set(filteredData.map((item) => item["Kategori Pekerjaan"]))],
            //"Tanggal Dibuka Lowongan": [...new Set(filteredData.map((item) => item["Tanggal Dibuka Lowongan"]))],
            //"Tanggal Ditutup Lowongan": [...new Set(filteredData.map((item) => item["Tanggal Ditutup Lowongan"]))],
        });
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        const updatedFilters = { ...filters, [name]: value };

        setFilters(updatedFilters);
        updateDropdownOptions(originalData, updatedFilters);
        setVacancies(
            originalData.filter((item) =>
                Object.keys(updatedFilters).every(
                    (key) => !updatedFilters[key] || item[key] === updatedFilters[key]
                )
            )
        );
    };

    // BAGIAN INSERT DATA

    const [showModal, setShowModal] = useState(false);
    const [qualifications, setQualifications] = useState([]);
    const [descriptions, setDescriptions] = useState([]);

    const handleAddQualification = () => {
        if (newVacancy["Kualifikasi"].trim()) {
            setQualifications([...qualifications, newVacancy["Kualifikasi"].trim()]);
            setNewVacancy({ ...newVacancy, "Kualifikasi": '' });
        }
    };

    const handleRemoveQualification = (index) => {
        const updatedQualifications = qualifications.filter((_, i) => i !== index);
        setQualifications(updatedQualifications);
    };

    const handleAddDescription = () => {
        if (newVacancy["Deskripsi Pekerjaan"].trim()) {
            setDescriptions([...descriptions, newVacancy["Deskripsi Pekerjaan"].trim()]);
            setNewVacancy({ ...newVacancy, "Deskripsi Pekerjaan": '' });
        }
    };

    const handleRemoveDescription = (index) => {
        const updatedDescriptions = descriptions.filter((_, i) => i !== index);
        setDescriptions(updatedDescriptions);
    };

    const jobCategoryOptions = [
        "Senior Manager",
        "⁠Deputy Sr. Manager",
        "Manager",
        "Asst. Manager",
        "Supervisor",
        "Staff",
        "⁠Group Leader",
        "Team Leader",
        "Team Member/Operator Produksi",
    ];
    const [newVacancy, setNewVacancy] = useState({
        "Nama Pekerjaan": '',
        "Kualifikasi": '',
        "Deskripsi Pekerjaan": '',
        "Kategori Pekerjaan": '',
        "Tanggal Dibuka Lowongan": '',
        "Tanggal Ditutup Lowongan": ''
    });

    const aliasToFieldMap = {
        "Nama Pekerjaan": "JobName",
        "Kualifikasi": "Kualifikasi",
        "Deskripsi Pekerjaan": "JobDescription",
        "Kategori Pekerjaan": "JobCategory",
        "Tanggal Dibuka Lowongan": "PostedDate",
        "Tanggal Ditutup Lowongan": "ClosingDate"
    };

    const handleNewVacancyChange = (e) => {
        const { name, value } = e.target;
        const fieldName = aliasToFieldMap[name];
        setNewVacancy({ ...newVacancy, [name]: value });
    };

    const handleSubmitNewVacancy = async () => {
        try {
            const mappedVacancy = Object.keys(newVacancy).reduce((acc, alias) => {
                const fieldName = aliasToFieldMap[alias];
                acc[fieldName] = alias === "Kualifikasi" ? qualifications.join(', ') : alias === "Deskripsi Pekerjaan" ? descriptions.join(', ') : newVacancy[alias];
                return acc;
            }, {});

            await axios.post('http://153.92.5.18:4005/addJobVacancy', mappedVacancy);
            alert('Lowongan pekerjaan berhasil ditambahkan!');
            setShowModal(false);
            setNewVacancy({
                "Nama Pekerjaan": '',
                "Kualifikasi": '',
                "Deskripsi Pekerjaan": '',
                "Kategori Pekerjaan": '',
                "Tanggal Dibuka Lowongan": '',
                "Tanggal Ditutup Lowongan": ''
            });
            setQualifications([]);
            setDescriptions([]);
        } catch (error) {
            console.error('Failed to add new job vacancy:', error);
            alert('Terjadi kesalahan saat menambahkan lowongan.');
        }
    };

    // BAGIAN DELETE DATA

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [jobIdToDelete, setJobIdToDelete] = useState(null);

    const handleDeleteClick = (jobId) => {
        setJobIdToDelete(jobId);
        setShowDeleteModal(true);
    };


    const confirmDelete = async () => {
        try {
            const response = await fetch('http://153.92.5.18:4005/deleteJobvacancy', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ JobId: jobIdToDelete }),
            });

            if (response.ok) {
                alert(`Lowongan dengan JobId ${jobIdToDelete} berhasil dihapus.`);
                // Perbarui data setelah penghapusan
                setVacancies(vacancies.filter((v) => v['Id Pekerjaan'] !== jobIdToDelete));
            } else {
                const errorMessage = await response.text();
                alert(`Gagal menghapus: ${errorMessage}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menghapus data.');
        } finally {
            setShowDeleteModal(false);
        }
    };

    //Update Closing Date

    const [editMode, setEditMode] = useState({}); // State untuk menyimpan edit mode per baris

    const handleUpdateClosingDate = async (jobId, newClosingDate) => {
        try {
            const response = await axios.post('http://153.92.5.18:4005/updateClosingDate', {
                JobId: jobId,
                ClosingDate: newClosingDate
            });
            alert(response.data); // Tampilkan pesan sukses atau error

            // Perbarui data vacancies di UI setelah berhasil update
            setVacancies((prevVacancies) =>
                prevVacancies.map((vacancy) =>
                    vacancy['Id Pekerjaan'] === jobId
                        ? { ...vacancy, 'Tanggal Ditutup Lowongan': newClosingDate }
                        : vacancy
                )
            );

            // Keluarkan dari edit mode
            setEditMode((prev) => ({ ...prev, [jobId]: false }));
        } catch (error) {
            console.error('Failed to update closing date:', error);
            alert('Gagal memperbarui tanggal ditutup lowongan.');
        }
    };

    const formatDateForInput = (dateString) => {
        if (!dateString) return ""; // Jika nilai kosong, kembalikan string kosong
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Format ke yyyy-mm-dd
    };

    return (
        <>
            <div className="xl:pl-72 bg-gray-900 min-h-screen">
                <header className="bg-gray-800 px-4 py-4 flex justify-between items-center">
                    <h1 className="text-white text-sm">Job Vacancies</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-700 text-white text-xs px-4 py-2 rounded-lg"
                    >
                        Input Lowongan
                    </button>
                </header>

                <div className="p-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
                        {Object.keys(filters).map((key) => (
                            <div key={key} className="flex flex-col">
                                <label htmlFor={key} className="text-gray-300 text-xs mb-3">
                                    {key}
                                </label>
                                <select
                                    id={key}
                                    name={key}
                                    value={filters[key]}
                                    onChange={handleFilterChange}
                                    className="p-2 rounded bg-gray-800 text-white text-xs"
                                >
                                    <option value="">Select {key}</option>
                                    {dropdownOptions[key]?.map((option) => (
                                        <option key={option} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="p-4 overflow-x-auto">
                    <table className="w-full bg-gray-800 text-white text-xs">
                        <thead>
                            <tr className="text-center whitespace-nowrap">
                                {Object.keys(originalData[0] || {}).map((header) => (
                                    <th key={header} className="p-2 capitalize">{header}</th>
                                ))}
                                <th className="p-2">Aksi</th> {/* Kolom baru untuk Aksi */}
                            </tr>
                        </thead>
                        <tbody>
                            {vacancies.map((vacancy, index) => (
                                <tr key={index} className="text-center border-b border-gray-700 text-xs">
                                    {Object.entries(vacancy).map(([key, value], i) => (
                                        key === 'Tanggal Ditutup Lowongan' ? (
                                            <td key={i} className="p-2">
                                                <input
                                                    type="date"
                                                    value={formatDateForInput(value)}
                                                    className="bg-gray-900 text-white text-xs rounded-md p-1"
                                                    onChange={(e) => handleUpdateClosingDate(vacancy['Id Pekerjaan'], e.target.value)}
                                                />
                                            </td>
                                        ) : (
                                            <td key={i} className="p-2">{value}</td>
                                        )
                                    ))}
                                    <td className="p-2">
                                        <button
                                            onClick={() => handleDeleteClick(vacancy['Id Pekerjaan'])}
                                            className="bg-red-700 text-white text-xs px-4 py-2 rounded-lg"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Modal Konfirmasi Delete */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white text-center">
                            <p className="mb-4 text-sm">Apakah Anda yakin ingin menghapus lowongan ini?</p>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="bg-gray-500 px-4 py-2 rounded text-xs"
                                >
                                    Tidak
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="bg-red-700 px-4 py-2 rounded text-xs"
                                >
                                    Yakin
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg mx-4">
                        <header className="border-b border-gray-200 px-6 py-4">
                            <h2 className="text-xl font-semibold text-gray-700">
                                Tambah Lowongan Pekerjaan
                            </h2>
                        </header>
                        <div className="p-6 space-y-6">
                            {Object.keys(newVacancy).map((alias) => (
                                <div key={alias} className="space-y-2">
                                    <label
                                        htmlFor={alias}
                                        className="block text-sm font-medium text-gray-600"
                                    >
                                        {alias}
                                    </label>
                                    {alias === "Kategori Pekerjaan" ? (
                                        <select
                                            id={alias}
                                            name={alias}
                                            value={newVacancy[alias]}
                                            onChange={handleNewVacancyChange}
                                            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                        >
                                            <option value="">Pilih Kategori</option>
                                            {jobCategoryOptions.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : alias === "Kualifikasi" ? (
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    id={alias}
                                                    name={alias}
                                                    value={newVacancy[alias]}
                                                    onChange={handleNewVacancyChange}
                                                    type="text"
                                                    placeholder="Masukkan kualifikasi"
                                                    className="flex-grow p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddQualification}
                                                    className="p-2.5 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-150"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <ul className="mt-3 grid grid-cols-5 gap-4">
                                                {qualifications.map((q, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center bg-gray-100 p-2 rounded-lg shadow-sm"
                                                    >
                                                        <span
                                                            className="text-sm text-gray-700 truncate"
                                                            style={{ maxWidth: 'calc(100% - 24px)' }}
                                                        >
                                                            {q}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveQualification(index)}
                                                            className="text-red-500 hover:text-red-600 transition duration-150"
                                                        >
                                                            &times;
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : alias === "Deskripsi Pekerjaan" ? (
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    id={alias}
                                                    name={alias}
                                                    value={newVacancy[alias]}
                                                    onChange={handleNewVacancyChange}
                                                    type="text"
                                                    placeholder="Masukkan deskripsi pekerjaan"
                                                    className="flex-grow p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddDescription}
                                                    className="p-2.5 bg-blue-700 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-150"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <ul className="mt-3 grid grid-cols-5 gap-4">
                                                {descriptions.map((d, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center bg-gray-100 p-2 rounded-lg shadow-sm"
                                                    >
                                                        <span
                                                            className="text-sm text-gray-700 truncate"
                                                            style={{ maxWidth: 'calc(100% - 24px)' }}
                                                        >
                                                            {d}
                                                        </span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveDescription(index)}
                                                            className="text-red-500 hover:text-red-600 transition duration-150"
                                                        >
                                                            &times;
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ) : (
                                        <input
                                            id={alias}
                                            name={alias}
                                            value={newVacancy[alias]}
                                            onChange={handleNewVacancyChange}
                                            type={alias.includes("Tanggal") ? "date" : "text"}
                                            className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                        <footer className="flex justify-end gap-4 border-t border-gray-200 px-6 py-4">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150"
                            >
                                Batal
                            </button>
                            <button
                                onClick={() => {
                                    handleSubmitNewVacancy();
                                    window.location.reload();
                                }}
                                className="px-4 py-2 text-white bg-blue-700 rounded-lg hover:bg-blue-600 transition duration-150 shadow-md"
                            >
                                Simpan
                            </button>
                        </footer>
                    </div>
                </div>
            )}
        </>
    );
}
