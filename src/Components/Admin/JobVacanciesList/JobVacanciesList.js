import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function JobVacanciesList() {
    const [filters, setFilters] = useState({
        "Nama Pekerjaan": '',
        "Kategori Pekerjaan": '',
    });

    const [originalData, setOriginalData] = useState([]);
    const [dropdownOptions, setDropdownOptions] = useState({
        "Nama Pekerjaan": [],
        "Kategori Pekerjaan": [],
    });
    const [vacancies, setVacancies] = useState([]);

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedVacancy, setSelectedVacancy] = useState(null);
    const [newClosingDate, setNewClosingDate] = useState('');
    
    // Add state to track sidebar collapsed status
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Fetch initial data and check sidebar state
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
        
        // Check sidebar collapsed state from localStorage
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState) {
            setSidebarCollapsed(savedState === 'true');
        }
        
        // Listen for changes to the sidebar state
        const handleStorageChange = () => {
            const currentState = localStorage.getItem('sidebarCollapsed');
            setSidebarCollapsed(currentState === 'true');
        };
        
        window.addEventListener('storage', handleStorageChange);
        
        // Add a MutationObserver to watch for class changes on the body
        // This helps detect sidebar state changes that happen in the same window
        const sidebarObserver = new MutationObserver(() => {
            const currentState = localStorage.getItem('sidebarCollapsed');
            setSidebarCollapsed(currentState === 'true');
        });
        
        // Start observing
        sidebarObserver.observe(document.body, { attributes: true, childList: false, subtree: false });
        
        return () => {
            window.removeEventListener('storage', handleStorageChange);
            sidebarObserver.disconnect();
        };
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

    // Fungsi untuk membuka modal update
    const handleOpenUpdateModal = (vacancy) => {
        setSelectedVacancy(vacancy);
        setNewClosingDate(vacancy['Tanggal Ditutup Lowongan']);
        setShowUpdateModal(true);
    };

    // Fungsi untuk menutup modal update
    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
        setSelectedVacancy(null);
        setNewClosingDate('');
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

    // Fungsi untuk mengupdate tanggal ditutup lowongan
    const handleUpdateClosingDate = async () => {
        try {
            const response = await axios.post('http://153.92.5.18:4005/updateClosingDate', {
                JobId: selectedVacancy['Id Pekerjaan'],
                ClosingDate: newClosingDate
            });
            alert(response.data); // Tampilkan pesan sukses atau error

            // Perbarui data vacancies di UI setelah berhasil update
            setVacancies((prevVacancies) =>
                prevVacancies.map((vacancy) =>
                    vacancy['Id Pekerjaan'] === selectedVacancy['Id Pekerjaan']
                        ? { ...vacancy, 'Tanggal Ditutup Lowongan': newClosingDate }
                        : vacancy
                )
            );

            // Tutup modal
            handleCloseUpdateModal();
        } catch (error) {
            console.error('Failed to update closing date:', error);
            alert('Gagal memperbarui tanggal ditutup lowongan.');
        }
    };

    // Define CSS variables to match with sidebar
    const contentStyle = {
        '--transition-speed': '250ms',
        '--expanded-width': '18rem',
        '--collapsed-width': '5rem',
    };

    // Apply the appropriate class based on sidebar state
    const contentClass = `transition-all duration-300 ease-in-out ${
        sidebarCollapsed 
            ? 'xl:ml-[var(--collapsed-width)]' 
            : 'xl:ml-[var(--expanded-width)]'
    }`;

    return (
        <>
            <div 
                className={`bg-gradient-to-br from-orange-50 via-white to-orange-50 min-h-screen ${contentClass}`}
                style={contentStyle}
            >
                <header className="bg-white shadow-sm border-b border-orange-100 px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Kelola Lowongan Pekerjaan</h1>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-lg shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200 font-medium"
                    >
                        Tambah Lowongan
                    </button>
                </header>

                <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-8">
                        <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter Lowongan</h2>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
                            {Object.keys(filters).map((key) => (
                                <div key={key} className="flex flex-col">
                                    <label htmlFor={key} className="text-sm font-medium text-gray-700 mb-2">
                                        {key}
                                    </label>
                                    <select
                                        id={key}
                                        name={key}
                                        value={filters[key]}
                                        onChange={handleFilterChange}
                                        className="p-2 rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300 transition-all duration-200"
                                    >
                                        <option value="">Semua {key}</option>
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

                    <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="bg-orange-50 text-left">
                                        {Object.keys(originalData[0] || {}).map((header) => (
                                            <th key={header} className="p-4 font-semibold text-gray-700 capitalize">{header}</th>
                                        ))}
                                        <th className="p-4 font-semibold text-gray-700">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {vacancies.map((vacancy, index) => (
                                        <tr key={index} className="hover:bg-orange-50 transition-colors duration-150">
                                            {Object.entries(vacancy).map(([key, value], i) => (
                                                <td key={i} className="p-4 text-gray-700">{value}</td>
                                            ))}
                                            <td className="p-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleOpenUpdateModal(vacancy)}
                                                        className="bg-orange-100 text-orange-700 hover:bg-orange-200 px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                                                    >
                                                        Update
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClick(vacancy['Id Pekerjaan'])}
                                                        className="bg-red-100 text-red-700 hover:bg-red-200 px-3 py-2 rounded-lg transition-colors duration-200 font-medium text-sm"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        
                        {vacancies.length === 0 && (
                            <div className="py-12 text-center">
                                <svg className="mx-auto h-12 w-12 text-orange-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <h3 className="mt-2 text-lg font-medium text-gray-900">Tidak ada lowongan ditemukan</h3>
                                <p className="mt-1 text-sm text-gray-500">Silakan tambahkan lowongan baru atau ubah filter pencarian.</p>
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Delete Confirmation Modal */}
                {showDeleteModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md mx-auto p-6">
                            <div className="text-center">
                                <svg className="mx-auto h-14 w-14 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mt-4">Konfirmasi Hapus</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                    Apakah Anda yakin ingin menghapus lowongan ini? Tindakan ini tidak dapat dibatalkan.
                                </p>
                            </div>
                            <div className="mt-6 flex justify-center gap-4">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Update Modal */}
                {showUpdateModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl max-w-md mx-auto p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Update Tanggal Ditutup Lowongan</h2>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tanggal Ditutup
                                </label>
                                <input
                                    type="date"
                                    value={newClosingDate}
                                    onChange={(e) => setNewClosingDate(e.target.value)}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                                />
                            </div>
                            <div className="flex justify-end gap-4">
                                <button
                                    onClick={handleCloseUpdateModal}
                                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={handleUpdateClosingDate}
                                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 font-medium"
                                >
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Add Job Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 overflow-hidden">
                            <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-4">
                                <h2 className="text-xl font-semibold text-white">
                                    Tambah Lowongan Pekerjaan
                                </h2>
                            </div>
                            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                                {Object.keys(newVacancy).map((alias) => (
                                    <div key={alias} className="space-y-2">
                                        <label
                                            htmlFor={alias}
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            {alias}
                                        </label>
                                        {alias === "Kategori Pekerjaan" ? (
                                            <select
                                                id={alias}
                                                name={alias}
                                                value={newVacancy[alias]}
                                                onChange={handleNewVacancyChange}
                                                className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
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
                                                        className="flex-grow p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddQualification}
                                                        className="p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="mt-3">
                                                    {qualifications.length > 0 && (
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Kualifikasi yang ditambahkan:</h4>
                                                    )}
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {qualifications.map((q, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center justify-between bg-orange-50 p-2 rounded-lg"
                                                            >
                                                                <span className="text-sm text-gray-700 truncate mr-2">
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
                                                        className="flex-grow p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={handleAddDescription}
                                                        className="p-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-lg shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <div className="mt-3">
                                                    {descriptions.length > 0 && (
                                                        <h4 className="text-sm font-medium text-gray-700 mb-2">Deskripsi yang ditambahkan:</h4>
                                                    )}
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                                        {descriptions.map((d, index) => (
                                                            <li
                                                                key={index}
                                                                className="flex items-center justify-between bg-orange-50 p-2 rounded-lg"
                                                            >
                                                                <span className="text-sm text-gray-700 truncate mr-2">
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
                                            </div>
                                        ) : (
                                            <input
                                                id={alias}
                                                name={alias}
                                                value={newVacancy[alias]}
                                                onChange={handleNewVacancyChange}
                                                type={alias.includes("Tanggal") ? "date" : "text"}
                                                className="w-full p-2.5 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-300"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-4 border-t border-gray-200">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={() => {
                                        handleSubmitNewVacancy();
                                        window.location.reload();
                                    }}
                                    className="px-4 py-2 text-white bg-gradient-to-r from-orange-400 to-orange-500 rounded-lg hover:from-orange-500 hover:to-orange-600 transition-all duration-200 shadow-sm font-medium"
                                >
                                    Simpan
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}