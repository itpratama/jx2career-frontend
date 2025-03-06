import React from 'react';
import DataTable from 'react-data-table-component';
import CandidateDataHook from './CandidateDataHook';
import handleDownloadAllExcel from './handleDownloadAllExcel';
import handleDownloadAllDocument from './handleDownloadAllDocument';
import handleUpdateStatus from './handleUpdateStatus'; // Import fungsi handleUpdateStatus
import handleUpdateSubStatus from './handleUpdateSubStatus';

const CandidateList2 = () => {
    const {
        filteredData,
        setFilteredData,
        loading,
        jobName,
        setJobName,
        jobCategory,
        setJobCategory,
        provinsi,
        setProvinsi,
        kabKota,
        setKabKota,
        JenisKelamin,
        setJenisKelamin,
        JenisKelaminOptions,
        pendidikanTerakhir,
        setPendidikanTerakhir,
        jurusan,
        setJurusan,
        jobOptions,
        categoryOptions,
        provinsiOptions,
        kabKotaOptions,
        pendidikanOptions,
        jurusanOptions,
    } = CandidateDataHook();

    const handleDownloadDataExcel = async () => {
        try {
            await handleDownloadAllExcel({
                jobName,
                jobCategory,
                provinsi,
                kabKota,
                pendidikanTerakhir,
                jurusan,
            });
        } catch (error) {
            console.error('Error handling download:', error);
        }
    };

    const handleDownloadDocument = async () => {
        try {
            await handleDownloadAllDocument({
                jobName,
                jobCategory,
                provinsi,
                kabKota,
                pendidikanTerakhir,
                jurusan,
            });
        } catch (error) {
            console.error('Error handling download:', error);
        }
    };

    const handleDownloadDocumentByNIK = async (nik) => {
        try {
            // Kirim permintaan ke API download dengan metode POST
            const response = await fetch("http://153.92.5.18:4005/downloadFile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ nik }), // Mengirim NIK dalam body
            });

            if (!response.ok) {
                throw new Error("File tidak ditemukan atau terjadi kesalahan.");
            }

            // Mendapatkan file blob dari respons
            const blob = await response.blob();

            // Membuat link untuk mengunduh file
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;

            // Menggunakan nama file dari server jika tersedia
            const contentDisposition = response.headers.get("Content-Disposition");
            const fileName = contentDisposition
                ? contentDisposition.split("filename=")[1]?.replace(/"/g, "") || `${nik}_Dokumen`
                : `${nik}_Dokumen`;

            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (err) {
            console.error("Error download document:", err);
        }
    };

    const handleViewDocument = (nik) => {
        try {
            // URL endpoint API viewFile dengan query parameter
            const url = `http://153.92.5.18:4005/viewFile?nik=${nik}`;

            // Membuka dokumen di tab baru
            window.open(url, "_blank");
        } catch (err) {
            console.error("Error viewing document:", err);
        }
    };

    const handleStatusChange = async (NIK, JobId, newStatus) => {
        try {
            await handleUpdateStatus(NIK, JobId, newStatus, setFilteredData);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const handleSubStatusChange = async (NIK, JobId, newStatus) => {
        try {
            await handleUpdateSubStatus(NIK, JobId, newStatus, setFilteredData);
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const columns = [
        {
            name: 'Status',
            cell: (row) => (
                <select
                    value={row.Status}
                    onChange={(e) => handleStatusChange(row.NIK, row.JobId, e.target.value)}
                    className="w-24 py-1 text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none truncate"
                >
                    <option value="Screening CV">Screening CV</option>
                    <option value="Psikotest">Psikotest</option>
                    <option value="Interview HR">Interview HR</option>
                    <option value="Interview User">Interview User</option>
                    <option value="Offering Salary">Offering Salary</option>
                    <option value="MCU">MCU</option>
                    <option value="SPK">SPK</option>
                </select>
            ),
            sortable: true,
            grow: 2,
        },
        {
            name: 'Sub Status',
            cell: (row) => (
                <select
                    value={row.Sub_Status}
                    onChange={(e) => handleSubStatusChange(row.NIK, row.JobId, e.target.value)}
                    className="w-24 py-1 text-gray-800 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none truncate"
                >
                    <option value={row.Sub_Status} hidden>
                        {row.Sub_Status}
                    </option>
                    <option value="Qualified">Qualified</option>
                    <option value="Not Qualified">Not Qualified</option>
                </select>
            ),
            sortable: true,
            grow: 2,
        },
        { name: 'Tanggal Melamar', selector: row => row.Date, sortable: true },
        { name: 'Nama Lamaran Pekerjaan', selector: row => row.JobName, sortable: true },
        { name: 'Jenis Lamaran Pekerjaan', selector: row => row.JobCategory, sortable: true },
        { name: 'Nama', selector: row => row.NamaLengkap, sortable: true },
        { name: 'Jenis Kelamin', selector: row => row.JenisKelamin, sortable: true },
        { name: 'Alamat Lengkap', selector: row => row.AlamatLengkap, sortable: true },
        { name: 'Provinsi', selector: row => row.Provinsi, sortable: true },
        { name: 'Kab/Kota', selector: row => row.KabKota, sortable: true },
        { name: 'Kecamatan', selector: row => row.Kecamatan, sortable: true },
        { name: 'Desa', selector: row => row.Desa, sortable: true },
        { name: 'Alamat Domisili', selector: row => row.AlamatDomisili, sortable: true },
        { name: 'Pendidikan Terakhir', selector: row => row.PendidikanTerakhir, sortable: true },
        { name: 'Nama Sekolah', selector: row => row.NamaSekolah, sortable: true },
        { name: 'Fakultas', selector: row => row.Fakultas, sortable: true },
        { name: 'Jurusan', selector: row => row.Jurusan, sortable: true },
    ];

    const ExpandedComponent = ({ data }) => {
        return (
            <div className="p-6 bg-white my-4 rounded-xl shadow-lg border border-gray-200">
                <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                        <h4 className="text-sm text-gray-700 border-b pb-1">Detail Melamar Pekerjaan</h4>
                        <p><strong className="text-gray-600">Nama:</strong> {data.JobName}</p>
                        <p><strong className="text-gray-600">Jenis:</strong> {data.JobCategory}</p>
                        <p><strong className="text-gray-600">Tanggal Melamar:</strong> {data.Date}</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm text-gray-700 border-b pb-1">Detail Biodata</h4>
                        <p><strong className="text-gray-600">NIK:</strong> {data.NIK}</p>
                        <p><strong className="text-gray-600">Nama Lengkap:</strong> {data.NamaLengkap}</p>
                        <p><strong className="text-gray-600">Jenis Kelamin:</strong> {data.JenisKelamin}</p>
                        <p><strong className="text-gray-600">No. Handphone:</strong> {data.NoHandphone}</p>
                        <p><strong className="text-gray-600">No. Whatsapp:</strong> {data.NoHandphone2}</p>
                        <p><strong className="text-gray-600">Email:</strong> {data.Email}</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm text-gray-700 border-b pb-1">Detail Pendidikan</h4>
                        <p><strong className="text-gray-600">Pendidikan Terakhir:</strong> {data.PendidikanTerakhir}</p>
                        <p><strong className="text-gray-600">Nama Sekolah:</strong> {data.NamaSekolah}</p>
                        <p><strong className="text-gray-600">Fakultas:</strong> {data.Fakultas}</p>
                        <p><strong className="text-gray-600">Jurusan:</strong> {data.Jurusan}</p>
                        <p><strong className="text-gray-600">Skill:</strong> {data.Skill}</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm text-gray-700 border-b pb-1">Detail Riwayat Pekerjaan</h4>
                        <p><strong className="text-gray-600">Perusahaan:</strong> {data.NamaPerusahaan}</p>
                        <p><strong className="text-gray-600">Jabatan:</strong> {data.Jabatan}</p>
                        <p><strong className="text-gray-600">Departemen:</strong> {data.Departemen}</p>
                        <p><strong className="text-gray-600">Mulai Kerja:</strong> {data.MulaiKerja}</p>
                        <p><strong className="text-gray-600">Terakhir Kerja:</strong> {data.TerakhirKerja}</p>
                    </div>
                    <div className="space-y-2">
                        <h4 className="text-sm text-gray-700 border-b pb-1">Dokumen</h4>
                        <button
                            onClick={() => handleDownloadDocumentByNIK(data.NIK)}
                            className="bg-green-600 text-white px-2 py-2 rounded text-xs"
                        >
                            Unduh Dokumen
                        </button>
                        <button
                            onClick={() => handleViewDocument(data.NIK)}
                            className="bg-blue-600 text-white px-2 py-2 rounded text-xs"
                        >
                            Lihat Dokumen
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="xl:pl-72 bg-gray-200 min-h-screen">
            <header className="bg-gray-200 px-4 py-4 flex justify-between items-center">
                <h1 className="text-black text-sm">Candidate List</h1>
                <div className="flex gap-2">
                    <button
                        onClick={handleDownloadDataExcel}
                        className="bg-blue-700 text-white text-xs px-4 py-2 rounded-lg"
                    >
                        Export to Excel
                    </button>
                    <button
                        onClick={handleDownloadDocument}
                        className="bg-green-600 text-white text-xs px-4 py-2 rounded-lg"
                    >
                        Download All Documents
                    </button>
                </div>
            </header>
            <div className="p-4">
                <div className="grid grid-cols-5 md:grid-cols-2 gap-4 mb-4">
                    {[
                        { label: 'Job Name', state: jobName, setState: setJobName, options: jobOptions },
                        { label: 'Job Category', state: jobCategory, setState: setJobCategory, options: categoryOptions },
                        { label: 'Provinsi', state: provinsi, setState: setProvinsi, options: provinsiOptions },
                        { label: 'Kab/Kota', state: kabKota, setState: setKabKota, options: kabKotaOptions },
                        { label: 'Pendidikan', state: pendidikanTerakhir, setState: setPendidikanTerakhir, options: pendidikanOptions },
                        { label: 'Jurusan', state: jurusan, setState: setJurusan, options: jurusanOptions },
                        { label: 'Jenis Kelamin', state: JenisKelamin, setState: setJenisKelamin, options: JenisKelaminOptions },
                    ].map(({ label, state, setState, options }) => (
                        <div key={label} className="flex flex-col w-full max-w-xs">
                            <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
                            <select
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                className="text-gray-800 rounded-lg px-3 py-2 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                            >
                                {options.map(option => (
                                    <option key={option} value={option}>{option === "" ? "All" : option}</option>
                                ))}
                            </select>
                        </div>
                    ))}
                </div>
                <DataTable
                    columns={columns}
                    data={filteredData}
                    progressPending={loading}
                    pagination
                    expandableRows
                    expandableRowsComponent={ExpandedComponent}
                />
            </div>
        </div>
    );
};

export default CandidateList2;