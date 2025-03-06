import axios from 'axios';

const handleDownloadAllExcel = async (filters) => {
    try {
        const response = await axios.post(
            'http://localhost:4005/exportToXlsx',
            {
                JobName: filters.jobName,
                JobCategory: filters.jobCategory,
                Provinsi: filters.provinsi,
                KabKota: filters.kabKota,
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
        link.setAttribute('download', 'lamaran_pekerjaan.xlsx'); // Nama file
        document.body.appendChild(link);
        link.click();

        // Hapus link setelah selesai
        link.remove();
    } catch (error) {
        console.error('Error downloading Excel:', error);
        throw error; // Melempar error agar bisa ditangani di komponen
    }
};

export default handleDownloadAllExcel;