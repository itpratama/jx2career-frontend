// RegistForm.js
import React from 'react';
import { useRegistForm } from './useRegistForm';
import { RegistFormModal } from './RegistFormModal';
import { CheckIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
export default function RegistForm() {
    const {
        formData,
        setFormData,
        error,
        provincesData,
        kabKotaData,
        kecamatanData,
        desaData,
        open,
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
        setErrorMessage,
        setShowPassword,
    } = useRegistForm();

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
                </div>
            </div>
            <RegistFormModal
                open={open}
                setOpen={setOpen}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                riwayatPekerjaanRows={riwayatPekerjaanRows}
                handleRiwayatPekerjaanChange={handleRiwayatPekerjaanChange}
                addRow={addRow}
                handleFileChangeDokumenTambahan={handleFileChangeDokumenTambahan}
                handleSubmitDokumenTambahan={handleSubmitDokumenTambahan}
                fileErrorDokumenTambahan={fileErrorDokumenTambahan}
                handleLewati={handleLewati}
            />
        </>
    );
}
