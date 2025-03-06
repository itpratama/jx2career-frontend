import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function RegistForm() {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();
    const [openerrorMessage, setOpensetErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        NIK: '',
        NamaLengkap: '',
        JenisKelamin: '',
        AlamatLengkap: '',
        KabKota: '',
        Provinsi: '',
        AlamatDomisili: '',
        PendidikanTerakhir: '',
        NamaSekolah: '',
        Jurusan: '',
        NoHandphone: '',
        Email: '',
        Skill: '',
        Password: '',
        KodePos: '',
        TanggalLahir: '',
        NOKK: '',
        TempatLahir: '',
        Agama: '',
        NoHandphone2: '',
        Kewarganegaraan: '',
        RT: '',
        RW: '',
        Kecamatan: '',
        Desa: '',
        StatusPernikahan: '',
        CatatanDisabilitas: '',
        Fakultas: '',
        ageBelow18: false, // Tambahkan properti ini
    });

    const [error, setError] = useState(null);
    const [provincesData, setProvincesData] = useState([]);
    const [kabKotaData, setKabKotaData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [desaData, setDesaData] = useState([]);

    // Fetch data untuk Provinsi
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get('http://153.92.5.18:4005/getProvinces');
                setProvincesData(response.data);
            } catch (err) {
                setError('Error fetching provinces data');
                console.error(err);
            }
        };
        fetchProvinces();
    }, []);

    // Handle perubahan input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleProvinceChange = async (event) => {
        const provinceName = event.target.value;

        const selectedProvince = provincesData.find((province) => province.name === provinceName);
        const province_id = selectedProvince ? selectedProvince.id : null;

        setFormData({ ...formData, Provinsi: provinceName, KabKota: '', Kecamatan: '' });

        if (province_id) {
            try {
                const response = await axios.get('http://153.92.5.18:4005/getKabKota', {
                    params: { province_id }
                });
                setKabKotaData(response.data);
            } catch (err) {
                setError('Error fetching kabupaten/kota data');
                console.error(err);
            }
        } else {
            setKabKotaData([]);
        }
    };

    // Handle perubahan Kabupaten/Kota
    const handleKabKotaChange = async (event) => {
        const kabKotaName = event.target.value;

        const selectedKabKota = kabKotaData.find((kabkota) => kabkota.name === kabKotaName);
        const kabKotaId = selectedKabKota ? selectedKabKota.id : null;

        setFormData({ ...formData, KabKota: kabKotaName, Kecamatan: '' });

        if (kabKotaId) {
            try {
                const response = await axios.post('http://153.92.5.18:4005/getKecamatan', {
                    KabKotaId: kabKotaId
                });
                setKecamatanData(response.data);
            } catch (err) {
                setError('Error fetching kecamatan data');
                console.error(err);
            }
        } else {
            setKecamatanData([]);
        }
    };

    const handleKecamatanChange = async (event) => {
        const kecamatanName = event.target.value;

        const selectedKecamatan = kecamatanData.find((kecamatan) => kecamatan.NamaKecamatan === kecamatanName);
        const kecamatanId = selectedKecamatan ? selectedKecamatan.id : null;

        setFormData({ ...formData, Kecamatan: kecamatanName, Desa: '' });

        if (kecamatanId) {
            try {
                const response = await axios.post('http://153.92.5.18:4005/getDesa', {
                    KecamatanId: kecamatanId
                });
                setDesaData(response.data);
            } catch (err) {
                setError('Error fetching desa data');
                console.error(err);
            }
        } else {
            setDesaData([]);
        }
    };

    const handleCheckboxChange = (value) => {
        let selectedOptions = formData.CatatanDisabilitas ? formData.CatatanDisabilitas.split(',') : [];

        if (selectedOptions.includes(value)) {
            selectedOptions = selectedOptions.filter((item) => item !== value);
            if (value === "Lainnya") {
                setFormData({ ...formData, Lainnya: "", CatatanDisabilitas: selectedOptions.join(',') });
            } else {
                setFormData({ ...formData, CatatanDisabilitas: selectedOptions.join(',') });
            }
        } else {
            selectedOptions.push(value);
            setFormData({ ...formData, CatatanDisabilitas: selectedOptions.join(',') });
        }
    };

    const handleLainnyaChange = (e) => {
        const { value } = e.target;
        setFormData({
            ...formData,
            Lainnya: value,
            CatatanDisabilitas: formData.CatatanDisabilitas.includes("Lainnya")
                ? formData.CatatanDisabilitas
                : `${formData.CatatanDisabilitas},Lainnya`
        });
    };

    const handleRadioChange = (value) => {
        let updatedValues = formData.CatatanDisabilitas.split(',').filter(
            (item) => !item.startsWith("Menggunakan Alat Bantu")
        );
        updatedValues.push(value);
        setFormData({
            ...formData,
            CatatanDisabilitas: updatedValues.join(','),
        });
    };

    const checkAge = (tanggalLahir) => {
        const today = new Date();
        const birthDate = new Date(tanggalLahir);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        // Perbarui state dengan properti ageBelow18
        setFormData((prev) => ({
            ...prev,
            TanggalLahir: tanggalLahir, // Pastikan tanggal lahir diperbarui juga
            ageBelow18: age < 18,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Format tanggal lahir jika ada
            if (formData.TanggalLahir) {
                const tanggal = new Date(formData.TanggalLahir);
                formData.TanggalLahir = tanggal.toISOString().split('T')[0]; // Format YYYY-MM-DD
            }

            // Kirim data ke API
            const response = await axios.post(
                'http://153.92.5.18:4005/registUser',
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            // Tampilkan modal sukses jika berhasil
            if (response.status === 200) {
                setErrorMessage(''); // Reset pesan error
                setOpen(true); // Tampilkan modal sukses
            }
        } catch (err) {
            // Tangani respons kesalahan dari API
            if (err.response) {
                const errorMessage = err.response.data.message || 'Terjadi kesalahan saat registrasi.';
                setErrorMessage(errorMessage); // Simpan pesan error
            } else {
                setErrorMessage('Terjadi kesalahan saat registrasi.'); // Simpan pesan default
            }
            setOpensetErrorMessage(true); // Tampilkan modal
        }
    };

    const [riwayatPekerjaanRows, setRiwayatPekerjaanRows] = useState([{}]); // Array of rows for the table

    const addRow = () => {
        setRiwayatPekerjaanRows([...riwayatPekerjaanRows, {}]); // Add a new row to the table
    };

    // Modifikasi Input Row Riwayat Pekerjaan untuk mendukung pengisian data
    const handleRiwayatPekerjaanChange = (index, field, value) => {
        const updatedRows = [...riwayatPekerjaanRows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setRiwayatPekerjaanRows(updatedRows);
    };

    const [dokumenTambahan, setDokumenTambahan] = useState({ dokumen: null });
    const [fileErrorDokumenTambahan, setFileErrorDokumenTambahan] = useState("");

    const handleFileChangeDokumenTambahan = (e, type) => {
        const file = e.target.files[0];

        // Validasi tipe file
        const allowedTypes = ["application/pdf"];
        if (file && !allowedTypes.includes(file.type)) {
            const errorMessage = "Hanya file dengan format PDF yang diperbolehkan.";
            if (type === "dokumen") setFileErrorDokumenTambahan(errorMessage);

            // Reset dokumenTambahan if the file is not a PDF
            setDokumenTambahan({ dokumen: null });
            return;
        }

        // Validasi ukuran file
        if (file && file.size > 2 * 1024 * 1024) {
            const errorMessage = "Ukuran file melebihi 2MB. Silakan unggah file yang lebih kecil.";
            if (type === "dokumen") setFileErrorDokumenTambahan(errorMessage);
            // Reset dokumenTambahan if the file is not a 2MB
            setDokumenTambahan({ dokumen: null });
            return;
        }

        // Reset error dan set file ke state
        if (type === "dokumen") setFileErrorDokumenTambahan(null);

        setDokumenTambahan((prevState) => ({
            ...prevState,
            [type]: file,
        }));
    };


    const handleSubmitDokumenTambahan = async () => {
        const nik = formData.NIK;

        if (!nik) {
            alert("NIK wajib diisi!");
            return;
        }

        try {
            // 1. Kirim data Riwayat Pekerjaan ke API
            for (const row of riwayatPekerjaanRows) {
                const { NamaPerusahaan, Jabatan, Departemen, MulaiKerja, TerakhirKerja } = row;


                // Kirim data ke API Insert Riwayat Pekerjaan
                const response = await fetch("http://153.92.5.18:4005/insertRiwayatPekerjaan", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        NIK: nik,
                        NamaPerusahaan,
                        Jabatan,
                        Departemen,
                        MulaiKerja,
                        TerakhirKerja,
                    }),
                });

                if (!response.ok) {
                    throw new Error("Gagal menyimpan riwayat pekerjaan");
                }
            }

            // Gunakan nama variabel yang berbeda untuk FormData
            const uploadData = new FormData();
            uploadData.append("nik", nik);

            if (!dokumenTambahan.dokumen) {
                setFileErrorDokumenTambahan("Dokumen wajib diunggah!");
                return; // Menghentikan proses jika tidak ada dokumen
            }


            if (dokumenTambahan.dokumen) uploadData.append("dokumen", dokumenTambahan.dokumen);

            const responseDokumenTambahan = await fetch("http://153.92.5.18:4005/uploadDokumen", {
                method: "POST",
                body: uploadData,
            });

            if (!responseDokumenTambahan.ok) {
                throw new Error("Gagal menyimpan dokumen.");
            }

            // 3. Login setelah data berhasil disimpan
            const password = formData.Password;

            if (!nik || !password) {
                alert("NIK dan Password wajib diisi untuk login!");
                return;
            }

            const responseLogin = await axios.post("http://153.92.5.18:4005/login", {
                nik,
                password,
            });
            console.log(responseLogin.data);

            // If login is successful, save token and nik to localStorage
            const { user } = responseLogin.data;
            const { token } = responseLogin.data;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
            localStorage.setItem('nikJX2Career', user.id); // Save NIK

            window.location.href = "/";
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan saat menyimpan data. Silakan coba lagi.");
        }
    };

    const handleLewati = async () => {
        const nik = formData.NIK;
        const password = formData.Password;

        if (!nik || !password) {
            alert("NIK dan Password wajib diisi untuk login!");
            return;
        }

        try {
            const responseLogin = await axios.post("http://153.92.5.18:4005/login", {
                nik,
                password,
            });
            console.log(responseLogin.data);

            // If login is successful, save token and nik to localStorage
            const { user } = responseLogin.data;
            const { token } = responseLogin.data;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
            localStorage.setItem('nikJX2Career', user.id); // Save NIK

            window.location.href = "/";
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat login. Coba lagi.");
        }
    };

    return (
        <>
            <div className="bg-white py-32 sm:py-32">
                <div className="bg-gray-50 min-h-screen flex items-center justify-center py-3">
                    <div className="w-full max-w-7xl bg-white p-6 rounded-lg shadow-md">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-gray-900 text-center">REGISTRATION FORM</h2>
                                <p className="text-sm text-gray-600 text-center">
                                    Mohon isi data di bawah ini dengan benar, pastikan tidak ada data yang keliru.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
                                <div>
                                    <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Email"
                                            name="Email"
                                            type="text"
                                            value={formData.Email}
                                            onChange={handleChange}
                                            placeholder="Username@gmail.com"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="mt-2 relative">
                                        <input
                                            id="password"
                                            name="Password"
                                            type={showPassword ? "text" : "password"}
                                            value={formData.Password}
                                            onChange={handleChange}
                                            placeholder="Password"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                                        >
                                            {showPassword ? (
                                                <EyeIcon className="h-5 w-5" />
                                            ) : (
                                                <EyeSlashIcon className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    <p className="mt-2 text-sm text-gray-500">Silahkan catat Password Anda</p>
                                </div>
                                <div>
                                    <label htmlFor="NIK" className="block text-sm font-medium text-gray-700">
                                        NIK KTP
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="NIK"
                                            name="NIK"
                                            type="text"
                                            value={formData.NIK}
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                // Hanya izinkan angka
                                                if (/^\d*$/.test(value)) {
                                                    setFormData((prev) => ({ ...prev, NIK: value }));
                                                }
                                            }}
                                            placeholder="NIK"
                                            maxLength={16} // Batas maksimal 16 karakter
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {formData.NIK && ( // Hanya tampilkan notifikasi jika input tidak kosong
                                            <p
                                                className={`mt-1 text-sm ${formData.NIK.length === 16
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {formData.NIK.length === 16
                                                    ? "NIK Sesuai"
                                                    : "NIK harus terdiri dari 16 angka"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="NOKK" className="block text-sm font-medium text-gray-700">
                                        No. Kartu Keluarga
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="NOKK"
                                            name="NOKK"
                                            type="text"
                                            value={formData.NOKK}
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                // Hanya izinkan angka
                                                if (/^\d*$/.test(value)) {
                                                    setFormData((prev) => ({ ...prev, NOKK: value }));
                                                }
                                            }}
                                            placeholder="No. Kartu Keluarga"
                                            maxLength={16} // Batas maksimal 16 karakter
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                        {formData.NOKK && ( // Hanya tampilkan notifikasi jika input tidak kosong
                                            <p
                                                className={`mt-1 text-sm ${formData.NOKK.length === 16
                                                    ? "text-green-600"
                                                    : "text-red-600"
                                                    }`}
                                            >
                                                {formData.NOKK.length === 16
                                                    ? "NO KK Sesuai"
                                                    : "NO KK harus terdiri dari 16 angka"}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Nama Lengkap
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="NamaLengkap"
                                            name="NamaLengkap"
                                            type="text"
                                            value={formData.NamaLengkap}
                                            onChange={handleChange}
                                            placeholder="Nama Lengkap"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="TempatLahir" className="block text-sm font-medium text-gray-700">
                                        Tempat Lahir
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="TempatLahir"
                                            name="TempatLahir"
                                            type="text"
                                            value={formData.TempatLahir}
                                            onChange={handleChange}
                                            placeholder="Tempat Lahir"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="TanggalLahir" className="block text-sm font-medium text-gray-700">
                                        Tanggal Lahir
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="TanggalLahir"
                                            name="TanggalLahir"
                                            type="date"
                                            value={formData.TanggalLahir}
                                            onChange={(e) => {
                                                const { value } = e.target;
                                                handleChange(e); // Update nilai input
                                                checkAge(value); // Hitung umur dan cek batas usia
                                            }}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                    {formData.ageBelow18 && (
                                        <p className="mt-1 text-sm text-red-600">
                                            Umur anda tidak mencukupi karena dibawah 18 tahun
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                                        Jenis Kelamin
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="JenisKelamin"
                                            name="JenisKelamin"
                                            value={formData.JenisKelamin}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled selected>Pilih Jenis Kelamin</option>
                                            <option value="laki-laki">Laki-laki</option>
                                            <option value="perempuan">Perempuan</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Agama" className="block text-sm font-medium text-gray-700">
                                        Agama
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Agama"
                                            name="Agama"
                                            value={formData.Agama}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled selected>Pilih Agama</option>
                                            <option value="Islam">Islam</option>
                                            <option value="Kristen Protestan">Kristen Protestan</option>
                                            <option value="Kristen Katolik">Kristen Katolik</option>
                                            <option value="Hindu">Hindu</option>
                                            <option value="Buddha">Buddha</option>
                                            <option value="Konghucu">Konghucu</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="NoHandphone" className="block text-sm font-medium text-gray-700">
                                        No.Telepon
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="NoHandphone"
                                            name="NoHandphone"
                                            type="text"
                                            value={formData.NoHandphone}
                                            onChange={handleChange}
                                            placeholder="+62xxxx"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="NoHandphone2" className="block text-sm font-medium text-gray-700">
                                        No. Whatsapp
                                    </label>
                                    <input
                                        id="NoHandphone2"
                                        name="NoHandphone2"
                                        type="text"
                                        value={formData.NoHandphone2}
                                        onChange={handleChange}
                                        placeholder="+62xxxx"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="Kewarganegaraan" className="block text-sm font-medium text-gray-700">
                                        Kewarganegaraan
                                    </label>
                                    <select
                                        id="Kewarganegaraan"
                                        name="Kewarganegaraan"
                                        value={formData.Kewarganegaraan}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    >
                                        <option value="">Pilih Kewarganegaraan</option>
                                        <option value="WNI">WNI</option>
                                        <option value="WNA">WNA</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="AlamatLengkap" className="block text-sm font-medium text-gray-700">
                                        Alamat Lengkap (Sesuai KTP)
                                    </label>
                                    <input
                                        id="AlamatLengkap"
                                        name="AlamatLengkap"
                                        value={formData.AlamatLengkap}
                                        onChange={handleChange}
                                        type="text"
                                        placeholder="Alamat Lengkap (Sesuai KTP)"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="RT" className="block text-sm font-medium text-gray-700">
                                        RT
                                    </label>
                                    <input
                                        id="RT"
                                        name="RT"
                                        type="text"
                                        placeholder="RT"
                                        value={formData.RT}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value) && value.length <= 3) {
                                                handleChange(e); // Panggil handleChange jika valid
                                            }
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {formData.RT.length === 3 ? (
                                        <p className="mt-1 text-sm text-green-600">RT sudah sesuai</p>
                                    ) : (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formData.RT.length > 0 && "RT harus 3 angka"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="RW" className="block text-sm font-medium text-gray-700">
                                        RW
                                    </label>
                                    <input
                                        id="RW"
                                        name="RW"
                                        type="text"
                                        placeholder="RW"
                                        value={formData.RW}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*$/.test(value) && value.length <= 3) {
                                                handleChange(e); // Panggil handleChange jika valid
                                            }
                                        }}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                    />
                                    {formData.RW.length === 3 ? (
                                        <p className="mt-1 text-sm text-green-600">RW sudah sesuai</p>
                                    ) : (
                                        <p className="mt-1 text-sm text-red-600">
                                            {formData.RW.length > 0 && "RW harus 3 angka"}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label htmlFor="Provinsi" className="block text-sm font-medium text-gray-700">
                                        Provinsi
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Provinsi"
                                            name="Provinsi"
                                            value={formData.Provinsi}
                                            onChange={handleProvinceChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Pilih Provinsi</option>
                                            {provincesData.map((province) => (
                                                <option key={province.id} value={province.name}>
                                                    {province.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="KabKota" className="block text-sm font-medium text-gray-700">
                                        Kabupaten/Kota
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="KabKota"
                                            name="KabKota"
                                            value={formData.KabKota}
                                            onChange={handleKabKotaChange}
                                            disabled={!formData.Provinsi}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Pilih Kabupaten/Kota</option>
                                            {kabKotaData.map((kabkota) => (
                                                <option key={kabkota.id} value={kabkota.name}>
                                                    {kabkota.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Kecamatan" className="block text-sm font-medium text-gray-700">
                                        Kecamatan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Kecamatan"
                                            name="Kecamatan"
                                            value={formData.Kecamatan}
                                            onChange={handleKecamatanChange} // Memperbarui dengan handleKecamatanChange
                                            disabled={!formData.KabKota}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Pilih Kecamatan</option>
                                            {kecamatanData.map((kecamatan) => (
                                                <option key={kecamatan.id} value={kecamatan.NamaKecamatan}>
                                                    {kecamatan.NamaKecamatan}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Desa" className="block text-sm font-medium text-gray-700">
                                        Desa
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="Desa"
                                            name="Desa"
                                            value={formData.Desa}
                                            onChange={handleChange}
                                            disabled={!formData.Kecamatan} // Menonaktifkan jika Kecamatan tidak dipilih
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="" disabled>Pilih Desa</option>
                                            {desaData.map((desa) => (
                                                <option key={desa.Id} value={desa.NamaDesa}>
                                                    {desa.NamaDesa}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="KodePos" className="block text-sm font-medium text-gray-700">
                                        Kode Pos
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="KodePos"
                                            name="KodePos"
                                            type="text"
                                            value={formData.KodePos}
                                            onChange={handleChange}
                                            autoComplete="postal-code"
                                            placeholder="Kode Pos"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                        Alamat Domisili (Jika berbeda dengan KTP)
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="AlamatDomisili"
                                            name="AlamatDomisili"
                                            type="text"
                                            value={formData.AlamatDomisili}
                                            onChange={handleChange}
                                            autoComplete="street-address"
                                            placeholder="Alamat Domisili"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="StatusPernikahan" className="block text-sm font-medium text-gray-700">
                                        Status Pernikahan
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="StatusPernikahan"
                                            name="StatusPernikahan"
                                            value={formData.StatusPernikahan}
                                            onChange={handleChange}
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-2 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                        >
                                            <option value="" disabled>
                                                Pilih Status Pernikahan
                                            </option>
                                            <option value="Menikah">Menikah</option>
                                            <option value="Belum Menikah">Belum Menikah/Lajang</option>
                                            <option value="Cerai">Cerai</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="PendidikanTerakhir" className="block text-sm font-medium text-gray-700">
                                        Pendidikan Terakhir
                                    </label>
                                    <div className="mt-2">
                                        <select
                                            id="PendidikanTerakhir"
                                            name="PendidikanTerakhir"
                                            value={formData.PendidikanTerakhir}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="">Pilih Pendidikan</option>
                                            <option value="MA">MA</option>
                                            <option value="SMA">SMA</option>
                                            <option value="SMK">SMK</option>
                                            <option value="D1">D1</option>
                                            <option value="D2">D2</option>
                                            <option value="D3">D3</option>
                                            <option value="S1">S1</option>
                                            <option value="S2">S2</option>
                                            <option value="S3">S3</option>
                                        </select>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="NamaSekolah" className="block text-sm font-medium text-gray-700">
                                        Nama Sekolah
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="NamaSekolah"
                                            name="NamaSekolah"
                                            type="text"
                                            value={formData.NamaSekolah}
                                            onChange={handleChange}
                                            autoComplete="address-level1"
                                            placeholder="Nama Sekolah"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="Fakultas"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Fakultas" : "Jurusan"}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Fakultas"
                                            name="Fakultas"
                                            type="text"
                                            value={formData.Fakultas}
                                            onChange={handleChange}
                                            autoComplete="Fakultas"
                                            placeholder={formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Fakultas" : "Jurusan"}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label
                                        htmlFor="Jurusan"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Jurusan" : "Kompetensi"}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Jurusan"
                                            name="Jurusan"
                                            type="text"
                                            value={formData.Jurusan}
                                            onChange={handleChange}
                                            autoComplete="Jurusan"
                                            placeholder={formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Jurusan" : "Kompetensi"}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="Skill" className="block text-sm font-medium text-gray-700">
                                        Skill
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="Skill"
                                            name="Skill"
                                            type="text"
                                            value={formData.Skill}
                                            onChange={handleChange}
                                            autoComplete="Skill"
                                            placeholder="Menjahit/Microsoft Excel/Cutting/Dll"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm/6"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="CatatanDisabilitas" className="block text-sm font-medium text-gray-700">
                                        Catatan Disabilitas (Diisi jika kondisi anda Disabilitas)
                                    </label>
                                    <div className="mt-2 space-y-2">
                                        {[
                                            { label: "Tuna Netra : Disabilitas fisik tidak dapat melihat", value: "Tuna Netra" },
                                            { label: "Tuna Rungu : Disabilitas fisik tidak dapat mendengar", value: "Tuna Rungu" },
                                            { label: "Tuna Wicara : Disabilitas fisik tidak dapat berbicara", value: "Tuna Wicara" },
                                            { label: "Tuna Daksa : Disabilitas fisik cacat tubuh", value: "Tuna Daksa" },
                                            { label: "Tuna Ganda : Disabilitas ganda penderita cacat lebih dari satu kecacatan", value: "Tuna Ganda" },
                                            { label: "Lainnya", value: "Lainnya" },
                                        ].map((option) => (
                                            <div key={option.value} className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={option.value}
                                                    name="CatatanDisabilitas"
                                                    value={option.value}
                                                    checked={formData.CatatanDisabilitas.split(',').includes(option.value)}
                                                    onChange={() => handleCheckboxChange(option.value)}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label htmlFor={option.value} className="ml-2 text-sm text-gray-900">
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                        {formData.CatatanDisabilitas.split(',').includes("Lainnya") && (
                                            <div className="mt-2">
                                                <input
                                                    type="text"
                                                    name="Lainnya"
                                                    value={formData.Lainnya || ""}
                                                    onChange={handleLainnyaChange}
                                                    placeholder="Silakan isi keterangan lainnya"
                                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className="mt-4">
                                        <label className="block text-sm font-medium text-gray-700">Menggunakan Alat Bantu</label>
                                        <div className="flex items-center space-x-4 mt-2">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="AlatBantuYa"
                                                    name="MenggunakanAlatBantu"
                                                    value="Menggunakan Alat Bantu : Ya"
                                                    checked={formData.CatatanDisabilitas.split(',').includes("Menggunakan Alat Bantu : Ya")}
                                                    onChange={() => handleRadioChange("Menggunakan Alat Bantu : Ya")}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label htmlFor="AlatBantuYa" className="ml-2 text-sm text-gray-900">
                                                    Ya
                                                </label>
                                            </div>
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    id="AlatBantuTidak"
                                                    name="MenggunakanAlatBantu"
                                                    value="Menggunakan Alat Bantu : Tidak"
                                                    checked={formData.CatatanDisabilitas.split(',').includes("Menggunakan Alat Bantu : Tidak")}
                                                    onChange={() => handleRadioChange("Menggunakan Alat Bantu : Tidak")}
                                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                                />
                                                <label htmlFor="AlatBantuTidak" className="ml-2 text-sm text-gray-900">
                                                    Tidak
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end lg:space-x-4">
                                <button
                                    type="submit"
                                    className="w-full lg:w-auto rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 lg:order-1"
                                >
                                    Daftar
                                </button>
                                <p className="text-sm text-gray-700 mt-4 lg:mt-0 lg:order-2">
                                    Sudah punya akun?{' '}
                                    <a href="/" className="text-indigo-600 hover:underline">
                                        Masuk Sekarang
                                    </a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
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
                                <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-white px-4 pb-6 pt-6 text-left shadow-xl transition-all w-full max-w-full sm:my-8 sm:max-w-6xl sm:p-8">
                                    <div>
                                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                                            <CheckIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-800">
                                                Registrasi Berhasil
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-600">
                                                    Mohon lengkapi formulir tambahan di bawah ini untuk membantu kami memahami potensi Anda secara lebih mendalam.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <label className="block text-sm font-medium text-gray-700 mb-3">Riwayat Pekerjaan (Jika ada)</label>
                                        <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
                                            <div className="inline-block min-w-full py-2 align-middle px-4 sm:px-6 lg:px-8">
                                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                                    <table className="min-w-full divide-y divide-orange-100">
                                                        <thead className="bg-orange-50">
                                                            <tr>
                                                                <th scope="col" className="py-3 pl-4 pr-3 text-left text-sm font-medium text-gray-700 sm:pl-6">Nama Perusahaan</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-700">Departemen</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-700">Jabatan</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-700">Mulai Kerja</th>
                                                                <th scope="col" className="px-3 py-3 text-left text-sm font-medium text-gray-700">Terakhir Kerja</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody className="divide-y divide-orange-100 bg-white">
                                                            {riwayatPekerjaanRows.map((row, index) => (
                                                                <tr key={index}>
                                                                    <td className="whitespace-nowrap py-3 pl-4 pr-3 text-sm sm:pl-6">
                                                                        <input
                                                                            type="text"
                                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                            value={row.NamaPerusahaan || ""}
                                                                            onChange={(e) =>
                                                                                handleRiwayatPekerjaanChange(index, "NamaPerusahaan", e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-3 text-sm">
                                                                        <input
                                                                            type="text"
                                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                            value={row.Departemen || ""}
                                                                            onChange={(e) =>
                                                                                handleRiwayatPekerjaanChange(index, "Departemen", e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-3 text-sm">
                                                                        <input
                                                                            type="text"
                                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                            value={row.Jabatan || ""}
                                                                            onChange={(e) =>
                                                                                handleRiwayatPekerjaanChange(index, "Jabatan", e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-3 text-sm">
                                                                        <input
                                                                            type="date"
                                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                            value={row.MulaiKerja || ""}
                                                                            onChange={(e) =>
                                                                                handleRiwayatPekerjaanChange(index, "MulaiKerja", e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                    <td className="whitespace-nowrap px-3 py-3 text-sm">
                                                                        <input
                                                                            type="date"
                                                                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                            value={row.TerakhirKerja || ""}
                                                                            onChange={(e) =>
                                                                                handleRiwayatPekerjaanChange(index, "TerakhirKerja", e.target.value)
                                                                            }
                                                                        />
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex items-center text-orange-500 hover:text-orange-600 text-sm font-medium"
                                            onClick={addRow}
                                        >
                                            <span className="mr-2">+</span> Tambah Baris
                                        </button>
                                    </div>
                                    <div className="mt-8">
                                        <div className="mb-4">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Upload Dokumen Ijazah - CV - Paklaring - Sertifikat</label>
                                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-orange-100 border-dashed rounded-lg">
                                                <div className="space-y-1 text-center">
                                                    <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                                        <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                    <div className="flex flex-col sm:flex-row justify-center text-sm text-gray-600">
                                                        <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-medium text-orange-500 hover:text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-400">
                                                            <span>Upload file</span>
                                                            <input
                                                                id="file-upload"
                                                                name="file-upload"
                                                                type="file"
                                                                className="sr-only"
                                                                accept=".pdf"
                                                                onChange={(e) => handleFileChangeDokumenTambahan(e, 'dokumen')}
                                                            />
                                                        </label>
                                                        <p className="pl-1 mt-1 sm:mt-0">atau drag dan drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">PDF Maks 2MB</p>
                                                </div>
                                            </div>
                                            {fileErrorDokumenTambahan && (
                                                <p className="text-sm text-red-600 mt-2">{fileErrorDokumenTambahan}</p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto px-5 py-2.5 rounded-md shadow-sm transition-all duration-200 font-medium text-sm bg-white text-gray-700 border border-orange-200 hover:bg-orange-50"
                                            onClick={handleLewati}
                                        >
                                            Lewati
                                        </button>
                                        <button
                                            type="button"
                                            className="w-full sm:w-auto px-5 py-2.5 rounded-md shadow-sm transition-all duration-200 font-medium text-sm bg-gradient-to-r from-orange-400 to-orange-500 text-white hover:from-orange-500 hover:to-orange-600"
                                            onClick={handleSubmitDokumenTambahan}
                                        >
                                            Kirim
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>

            <Transition.Root show={openerrorMessage} as={Fragment}>
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
                                        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${errorMessage ? 'bg-red-100' : 'bg-orange-100'}`}>
                                            {errorMessage ? (
                                                <svg className="h-7 w-7 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            ) : (
                                                <CheckIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
                                            )}
                                        </div>
                                        <div className="mt-4 text-center">
                                            <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-800">
                                                {errorMessage ? 'Registrasi Gagal' : 'Registrasi Berhasil'}
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-600">
                                                    {errorMessage || 'Registrasi berhasil dilakukan. Silakan cek email untuk informasi lebih lanjut.'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-4 py-3 text-sm font-medium text-white shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
                                            onClick={() => {
                                                setOpensetErrorMessage(false);
                                                if (!errorMessage) {
                                                    window.location.reload();
                                                }
                                            }}
                                        >
                                            {errorMessage ? 'Tutup' : 'Kembali'}
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
