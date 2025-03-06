import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileUser() {
    const [formData, setFormData] = useState({});
    const [provincesData, setProvincesData] = useState([]);
    const [kabKotaData, setKabKotaData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [desaData, setDesaData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const nik = localStorage.getItem("nikJX2Career");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://153.92.5.18:4005/getUserDataByNIK", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ NIK: nik }),
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }

                const data = await response.json();
                // Format Tanggal Lahir ke format YYYY-MM-DD
                if (data["Tanggal Lahir"]) {
                    data["Tanggal Lahir"] = new Date(data["Tanggal Lahir"])
                        .toISOString()
                        .split("T")[0]; // Extract only the date part
                }

                setFormData(data); // Set the data in state
            } catch (error) {
                console.error("Error fetching user data:", error);
                setError("Failed to fetch user data. Please try again later.");
            }
        };

        if (nik) {
            fetchData();
        }
    }, [nik]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [id]: value }));
    };

    // Fetch data untuk Provinsi
    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await axios.get("http://153.92.5.18:4005/getProvinces");
                setProvincesData(response.data);
            } catch (err) {
                setError("Error fetching provinces data");
                console.error(err);
            }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (event) => {
        const provinceName = event.target.value;

        const selectedProvince = provincesData.find((province) => province.name === provinceName);
        const province_id = selectedProvince ? selectedProvince.id : null;

        setFormData({ ...formData, Provinsi: provinceName, KabKota: "", Kecamatan: "", Desa: "" });

        if (province_id) {
            try {
                const response = await axios.get("http://153.92.5.18:4005/getKabKota", {
                    params: { province_id },
                });
                setKabKotaData(response.data);
            } catch (err) {
                setError("Error fetching kabupaten/kota data");
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

        setFormData({ ...formData, KabKota: kabKotaName, Kecamatan: "", Desa: "" });

        if (kabKotaId) {
            try {
                const response = await axios.post("http://153.92.5.18:4005/getKecamatan", {
                    KabKotaId: kabKotaId,
                });
                setKecamatanData(response.data);
            } catch (err) {
                setError("Error fetching kecamatan data");
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

        setFormData({ ...formData, Kecamatan: kecamatanName, Desa: "" });

        if (kecamatanId) {
            try {
                const response = await axios.post("http://153.92.5.18:4005/getDesa", {
                    KecamatanId: kecamatanId,
                });
                setDesaData(response.data);
            } catch (err) {
                setError("Error fetching desa data");
                console.error(err);
            }
        } else {
            setDesaData([]);
        }
    };

    const handleDesaChange = (event) => {
        setFormData({ ...formData, Desa: event.target.value });
    };

    const handleUpdate = async () => {
        setLoading(true);
        try {
            const response = await axios.put("http://153.92.5.18:4005/updateUserData", {
                ...formData,
            });

            if (response.status === 200) {
                setUpdateSuccess(true);
                setTimeout(() => setUpdateSuccess(false), 3000);
            } else {
                throw new Error("Failed to update data");
            }
        } catch (err) {
            console.error("Error updating user data:", err);
            setError("Failed to update data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Group fields for better organization
    const personalFields = [
        { label: "NIK", type: "text", key: "NIK", readOnly: true },
        { label: "NO KK", type: "text", key: "NO KK", readOnly: true },
        { label: "Nama Lengkap", type: "text", key: "Nama Lengkap" },
        { label: "Tempat Lahir", type: "text", key: "Tempat Lahir" },
        { label: "Tanggal Lahir", type: "date", key: "Tanggal Lahir" },
        { label: "Jenis Kelamin", type: "text", key: "Jenis Kelamin" },
        { label: "Agama", type: "text", key: "Agama" },
        { label: "Kewarganegaraan", type: "text", key: "Kewarganegaraan" },
    ];

    const contactFields = [
        { label: "No Whatsapp", type: "text", key: "No Whatsapp" },
        { label: "No Handphone", type: "text", key: "No Handphone" },
        { label: "Email", type: "email", key: "Email" },
        { label: "Password", type: "password", key: "Password" },
    ];

    const addressFields = [
        { label: "Alamat Lengkap", type: "text", key: "Alamat Lengkap" },
        {
            label: "Provinsi",
            type: "select",
            key: "Provinsi",
            options: provincesData.map((p) => p.name),
            onChange: handleProvinceChange,
        },
        {
            label: "Kab/Kota",
            type: "select",
            key: "KabKota",
            options: kabKotaData.map((k) => k.name),
            onChange: handleKabKotaChange,
        },
        {
            label: "Kecamatan",
            type: "select",
            key: "Kecamatan",
            options: kecamatanData.map((k) => k.NamaKecamatan),
            onChange: handleKecamatanChange,
        },
        {
            label: "Desa",
            type: "select",
            key: "Desa",
            options: desaData.map((d) => d.NamaDesa),
            onChange: handleDesaChange,
        },
        { label: "RT", type: "text", key: "RT" },
        { label: "RW", type: "text", key: "RW" },
        { label: "Kode Pos", type: "text", key: "Kode Pos" },
        { label: "Alamat Domisili", type: "text", key: "Alamat Domisili" },
    ];

    const educationFields = [
        { label: "Pendidikan Terakhir", type: "text", key: "Pendidikan Terakhir" },
        { label: "Nama Sekolah", type: "text", key: "Nama Sekolah" },
        { label: "Fakultas", type: "text", key: "Fakultas" },
        { label: "Jurusan", type: "text", key: "Jurusan" },
    ];

    const otherFields = [
        { label: "Status Pernikahan", type: "text", key: "Status Pernikahan" },
        { label: "Skill", type: "text", key: "Skill" },
        { label: "Catatan Disabilitas", type: "text", key: "Catatan Disabilitas" },
    ];

    const renderFormSection = (title, fields) => (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-200 hover:shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b border-orange-100 pb-3">{title}</h3>
            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
                {fields.map((field, index) => (
                    <div className="space-y-2" key={index}>
                        <label
                            htmlFor={field.key}
                            className="block text-sm font-medium text-gray-700"
                        >
                            {field.label}
                        </label>
                        {field.type === "select" ? (
                            <select
                                id={field.key}
                                value={formData[field.key] || ""}
                                onChange={field.onChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5 bg-white"
                            >
                                <option value="" disabled>
                                    {formData[field.key] || `Pilih ${field.label}`}
                                </option>
                                {field.options.map((option, i) => (
                                    <option key={i} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <input
                                type={field.type}
                                id={field.key}
                                value={formData[field.key] || ""}
                                onChange={handleChange}
                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                placeholder={field.label}
                                readOnly={field.readOnly || false}
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl lg:max-w-7xl">
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">
                            Profil Pengguna
                        </h2>
                        <p className="mt-3 text-lg text-orange-500">
                            Lengkapi profil Anda untuk meningkatkan peluang karir
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 bg-red-50 border border-red-200 text-red-600 rounded-lg p-4">
                            {error}
                        </div>
                    )}

                    {updateSuccess && (
                        <div className="mb-6 bg-green-50 border border-green-200 text-green-600 rounded-lg p-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            Data berhasil diperbarui!
                        </div>
                    )}

                    {renderFormSection("Data Pribadi", personalFields)}
                    {renderFormSection("Kontak", contactFields)}
                    {renderFormSection("Alamat", addressFields)}
                    {renderFormSection("Pendidikan", educationFields)}
                    {renderFormSection("Informasi Tambahan", otherFields)}

                    <div className="flex justify-end mt-8">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            disabled={loading}
                            className={`px-6 py-3 font-medium text-white rounded-lg shadow transition-all duration-200 ${
                                loading 
                                ? "bg-gray-400 cursor-not-allowed" 
                                : "bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
                            }`}
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Memperbarui...
                                </span>
                            ) : (
                                "Perbarui Profil"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}