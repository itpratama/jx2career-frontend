import axios from 'axios';

const handleDownloadAllDocument = async (filters) => {
    try {
        const response = await axios.post(
            'http://localhost:4005/downloadDocuments', // Sesuaikan dengan URL API Anda
            {
                JobName: filters.jobName,
                JobCategory: filters.jobCategory,
                PostedDate: filters.postedDate,
                ClosingDate: filters.closingDate,
                Provinsi: filters.provinsi,
                KabKota: filters.kabKota,
                Kecamatan: filters.kecamatan,
                Desa: filters.desa,
                PendidikanTerakhir: filters.pendidikanTerakhir,
                Jurusan: filters.jurusan,
            },
            {
                responseType: 'blob', // Penting untuk menerima file binary
            }
        );

        // Buat link untuk mengunduh file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Dokumen.zip'); // Nama file
        document.body.appendChild(link);
        link.click();

        // Hapus link setelah selesai
        link.remove();
    } catch (error) {
        console.error('Error downloading documents:', error);
        throw error; // Melempar error agar bisa ditangani di komponen
    }
};

export default handleDownloadAllDocument;