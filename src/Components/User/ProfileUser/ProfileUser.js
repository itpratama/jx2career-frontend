import { useEffect, useState } from "react";
import axios from "axios";

export default function ProfileUser() {
    const [formData, setFormData] = useState({});
    const [provincesData, setProvincesData] = useState([]);
    const [kabKotaData, setKabKotaData] = useState([]);
    const [kecamatanData, setKecamatanData] = useState([]);
    const [desaData, setDesaData] = useState([]);
    const [error, setError] = useState(null);
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


    const [loading, setLoading] = useState(false);

    const handleUpdate = async () => {
        try {
            const response = await axios.put("http://153.92.5.18:4005/updateUserData", {
                ...formData,
            });

            if (response.status === 200) {
                alert("Data updated successfully!");
            } else {
                throw new Error("Failed to update data");
            }
        } catch (err) {
            console.error("Error updating user data:", err);
            alert("Error updating data!");
        }
    };



    console.log("Updated Data:", formData);
    return (
        <>
            <div>
                <div className="mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8">
                    <main className="lg:flex lg:gap-x-16">
                        <div className="w-full max-w-7xl mx-auto space-y-12">
                            <div className="space-y-4">
                                <h2 className="text-xl font-semibold leading-7 text-gray-800">Profile</h2>
                                <p className="text-sm text-gray-500">
                                    This information will be displayed publicly, so be cautious with what you share.
                                </p>
                            </div>
                            <div className="bg-white shadow rounded-lg p-6 lg:p-8">
                                <dl className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                                    {[
                                        { label: "NIK", type: "text", key: "NIK", readOnly: true },
                                        { label: "NO KK", type: "text", key: "NO KK", readOnly: true },
                                        { label: "Nama Lengkap", type: "text", key: "Nama Lengkap" },
                                        { label: "Tempat Lahir", type: "text", key: "Tempat Lahir" },
                                        { label: "Tanggal Lahir", type: "date", key: "Tanggal Lahir" },
                                        { label: "Jenis Kelamin", type: "text", key: "Jenis Kelamin" },
                                        { label: "Agama", type: "text", key: "Agama" },
                                        { label: "No Whatsapp", type: "text", key: "No Whatsapp" },
                                        { label: "No Handphone", type: "text", key: "No Handphone" },
                                        { label: "Email", type: "email", key: "Email" },
                                        { label: "Kewarganegaraan", type: "text", key: "Kewarganegaraan" },
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
                                        { label: "Status Pernikahan", type: "text", key: "Status Pernikahan" },
                                        { label: "Pendidikan Terakhir", type: "text", key: "Pendidikan Terakhir" },
                                        { label: "Nama Sekolah", type: "text", key: "Nama Sekolah" },
                                        { label: "Fakultas", type: "text", key: "Fakultas" },
                                        { label: "Jurusan", type: "text", key: "Jurusan" },
                                        { label: "Skill", type: "text", key: "Skill" },
                                        { label: "Catatan Disabilitas", type: "text", key: "Catatan Disabilitas" },
                                        { label: "Password", type: "password", key: "Password" },
                                    ].map((field, index) => (
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
                                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                >
                                                    <option value={formData[field.key] || ""} disabled>
                                                        {formData[field.label]}
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
                                                    className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                    placeholder={field.label}
                                                    readOnly={field.readOnly || false}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </dl>
                                <div className="mt-8 flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleUpdate}
                                        disabled={loading}
                                        className={`px-6 py-2 font-medium text-white ${loading ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-500"
                                            } rounded-lg shadow focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                                    >
                                        {loading ? "Updating..." : "Update All"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}
