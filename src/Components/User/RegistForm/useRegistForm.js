// useRegistForm.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
export const useRegistForm = () => {
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
        ageBelow18: false,
    });

    const [error, setError] = useState(null);
    const [provincesData, setProvincesData] = useState([]);
    const [kabKotaData, setKabKotaData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [desaData, setDesaData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openerrorMessage, setOpensetErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [riwayatPekerjaanRows, setRiwayatPekerjaanRows] = useState([{}]);
    const [dokumenTambahan, setDokumenTambahan] = useState({ dokumen: null });
    const [fileErrorDokumenTambahan, setFileErrorDokumenTambahan] = useState("");

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

        setFormData((prev) => ({
            ...prev,
            TanggalLahir: tanggalLahir,
            ageBelow18: age < 18,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.TanggalLahir) {
                const tanggal = new Date(formData.TanggalLahir);
                formData.TanggalLahir = tanggal.toISOString().split('T')[0];
            }

            const response = await axios.post(
                'http://153.92.5.18:4005/registUser',
                formData,
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );

            if (response.status === 200) {
                setErrorMessage('');
                setOpen(true);
            }

            const nik = formData.NIK;

            const uploadData = new FormData();
            uploadData.append("nik", nik);

            if (!dokumenTambahan.dokumen) {
                setFileErrorDokumenTambahan("Dokumen wajib diunggah!");
                return;
            }

            if (dokumenTambahan.dokumen) uploadData.append("dokumen", dokumenTambahan.dokumen);

            const responseDokumenTambahan = await fetch("http://153.92.5.18:4005/uploadDokumen", {
                method: "POST",
                body: uploadData,
            });

            if (!responseDokumenTambahan.ok) {
                throw new Error("Gagal menyimpan dokumen.");
            }


        } catch (err) {
            if (err.response) {
                const errorMessage = err.response.data.message || 'Terjadi kesalahan saat registrasi.';
                setErrorMessage(errorMessage);
                console.log("test",errorMessage);
            } else {
                setErrorMessage('Terjadi kesalahan saat registrasi.');
            }
            setOpensetErrorMessage(true);
        }
    };

    const addRow = () => {
        setRiwayatPekerjaanRows([...riwayatPekerjaanRows, {}]);
    };

    const handleRiwayatPekerjaanChange = (index, field, value) => {
        const updatedRows = [...riwayatPekerjaanRows];
        updatedRows[index] = { ...updatedRows[index], [field]: value };
        setRiwayatPekerjaanRows(updatedRows);
    };

    const handleFileChangeDokumenTambahan = (e, type) => {
        const file = e.target.files[0];
        const allowedTypes = ["application/pdf"];
        if (file && !allowedTypes.includes(file.type)) {
            const errorMessage = "Hanya file dengan format PDF yang diperbolehkan.";
            if (type === "dokumen") setFileErrorDokumenTambahan(errorMessage);
            setDokumenTambahan({ dokumen: null });
            return;
        }

        if (file && file.size > 2 * 1024 * 1024) {
            const errorMessage = "Ukuran file melebihi 2MB. Silakan unggah file yang lebih kecil.";
            if (type === "dokumen") setFileErrorDokumenTambahan(errorMessage);
            setDokumenTambahan({ dokumen: null });
            return;
        }

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
            for (const row of riwayatPekerjaanRows) {
                const { NamaPerusahaan, Jabatan, Departemen, MulaiKerja, TerakhirKerja } = row;

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

            const password = formData.Password;

            if (!nik || !password) {
                alert("NIK dan Password wajib diisi untuk login!");
                return;
            }

            const responseLogin = await axios.post("http://153.92.5.18:4005/login", {
                nik,
                password,
            });

            const { user } = responseLogin.data;
            const { token } = responseLogin.data;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
            localStorage.setItem('nikJX2Career', user.id);

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

            const { user } = responseLogin.data;
            const { token } = responseLogin.data;
            Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
            localStorage.setItem('nikJX2Career', user.id);

            window.location.href = "/";
        } catch (error) {
            console.error(error);
            alert("Terjadi kesalahan saat login. Coba lagi.");
        }
    };

    return {
        formData,
        setFormData,
        error,
        provincesData,
        kabKotaData,
        kecamatanData,
        desaData,
        open,
        openerrorMessage,
        errorMessage,
        showPassword,
        riwayatPekerjaanRows,
        dokumenTambahan,
        fileErrorDokumenTambahan,
        handleChange,
        handleProvinceChange,
        handleKabKotaChange,
        handleKecamatanChange,
        handleCheckboxChange,
        handleLainnyaChange,
        handleRadioChange,
        checkAge,
        handleSubmit,
        addRow,
        handleRiwayatPekerjaanChange,
        handleFileChangeDokumenTambahan,
        handleSubmitDokumenTambahan,
        handleLewati,
        setOpen,
        setOpensetErrorMessage,
        setShowPassword,
    };
};