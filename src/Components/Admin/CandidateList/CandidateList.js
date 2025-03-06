import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CandidateList() {
  const [filters, setFilters] = useState({
    "Nama Pekerjaan": '',
    "Kategori Pekerjaan": '',
    "Tanggal Dibuka Lowongan": '',
    "Tanggal Ditutup Lowongan": '',
    Provinsi: '',
    "Kab/Kota": '',
    Kecamatan: '',
    Desa: '',
    "Pendidikan Terakhir": '',
    Jurusan: '',
  });
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [candidates, setCandidates] = useState([]);

  const fetchData = async (currentFilters) => {
    try {
      const queryParams = new URLSearchParams(currentFilters).toString();
      const response = await axios.get(`http://153.92.5.18:4005/getCandidates?${queryParams}`);
      setCandidates(response.data);

      // Update dropdown options dynamically
      const updatedOptions = {};
      response.data.forEach((item) => {
        Object.keys(currentFilters).forEach((key) => {
          if (!updatedOptions[key]) updatedOptions[key] = new Set();
          updatedOptions[key].add(item[key]);
        });
      });
      const formattedOptions = Object.fromEntries(
        Object.entries(updatedOptions).map(([key, values]) => [key, Array.from(values)])
      );
      setDropdownOptions(formattedOptions);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  useEffect(() => {
    fetchData(filters);
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);
    fetchData(updatedFilters);
  };

  const exportToExcel = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();

      const response = await fetch(`http://153.92.5.18:4005/exportToXlsx?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to export file');
      }

      // Create a Blob from the response and initiate a download
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'Daftar_Kandidat.xlsx';
      link.click();
    } catch (error) {
      console.error('Error exporting to Excel:', error);
    }
  };

  const handleUpdateStatus = async (NIK, JobId, newStatus) => {
    try {
      await axios.put('http://153.92.5.18:4005/updateStatusCandidate', {
        NIK,
        JobId,
        Status: newStatus,
      });

      // Update local state after status change
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.NIK === NIK && candidate.JobId === JobId
            ? { ...candidate, Status: newStatus }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleUpdateSubStatus = async (NIK, JobId, newStatus) => {
    try {
      await axios.put('http://153.92.5.18:4005/updateSubStatusCandidate', {
        NIK,
        JobId,
        Sub_Status: newStatus,
      });

      // Update local state after status change
      setCandidates((prevCandidates) =>
        prevCandidates.map((candidate) =>
          candidate.NIK === NIK && candidate.JobId === JobId
            ? { ...candidate, ['Sub Status']: newStatus }
            : candidate
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDownloadDocument = async (nik) => {
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

  const downloadAllDocuments = async () => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const response = await fetch(`http://153.92.5.18:4005/downloadDocuments?${queryParams}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Dokumen.zip';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        console.error('Failed to download:', error.message);
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error('Error during download:', error);
      alert('An error occurred while downloading the documents.');
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

  return (
    <>
      <div className="xl:pl-72 bg-gray-900 min-h-screen">
        <header className="bg-gray-800 px-4 py-4 flex justify-between items-center">
          <h1 className="text-white text-lg">Candidate List</h1>
          <div className="flex gap-2">
            <button
              onClick={exportToExcel}
              className="bg-blue-700 text-white text-xs px-4 py-2 rounded-lg"
            >
              Export to Excel
            </button>
            <button
              onClick={downloadAllDocuments}
              className="bg-green-600 text-white text-xs px-4 py-2 rounded-lg"
            >
              Download All Documents
            </button>
          </div>
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
                  {(dropdownOptions[key] || []).map((option) => (
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
                <th className="p-2 capitalize">Dokumen</th>
                {Object.keys(candidates[0] || {}).map((header) => (
                  <th key={header} className="p-2 capitalize">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate, index) => (
                <tr key={index} className="text-center border-b border-gray-700 text-xs whitespace-nowrap">
                  <td className="p-2 flex flex-col space-y-2">
                    <button
                      onClick={() => handleDownloadDocument(candidate.NIK)}
                      className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Unduh Dokumen
                    </button>
                    <button
                      onClick={() => handleViewDocument(candidate.NIK)}
                      className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                    >
                      Lihat Dokumen
                    </button>
                  </td>
                  {Object.entries(candidate).map(([key, value], i) => (
                    <td key={i} className="p-2">
                      {key === "Status" ? (
                        <select
                          value={value}
                          onChange={(e) => handleUpdateStatus(candidate.NIK, candidate.JobId, e.target.value)}
                          className="p-2 rounded bg-gray-700 text-white text-xs"
                        >
                          <option value="Screening CV">Screening CV</option>
                          <option value="Psikotest">Psikotest</option>
                          <option value="Interview HR">Interview HR</option>
                          <option value="Interview User">Interview User</option>
                          <option value="Offering Salary">Offering Salary</option>
                          <option value="MCU">MCU</option>
                          <option value="SPK">SPK</option>
                        </select>
                      ) :
                        key === "Sub Status" ? (
                          <select
                            value={value}
                            onChange={(e) => handleUpdateSubStatus(candidate.NIK, candidate.JobId, e.target.value)}
                            className={`p-2 rounded text-white text-xs ${value === "Qualified" ? "bg-green-800" : value === "Not Qualified" ? "bg-red-800" : "bg-gray-700"}`}
                          >
                            <option value={candidate['Sub Status']} hidden>
                              {candidate['Sub Status']}
                            </option>
                            <option value="Qualified">Qualified</option>
                            <option value="Not Qualified">Not Qualified</option>
                          </select>
                        ) : (
                          value
                        )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
