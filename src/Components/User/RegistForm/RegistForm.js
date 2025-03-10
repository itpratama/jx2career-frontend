// RegistForm.js
import { useRegistForm } from './useRegistForm';
import { RegistFormModal } from './RegistFormModal';
import { DocumentTextIcon, EyeSlashIcon, EyeIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import React, { Fragment, useState, useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline'
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

    const [openError, setOpenError] = useState(false);

    useEffect(() => {
        if (errorMessage) {
            setOpenError(true);
        }
    }, [errorMessage]);

    const renderSection = (title, children) => (
        <div className="bg-white rounded-xl shadow-sm border border-orange-100 overflow-hidden transition-all duration-200 hover:shadow-md p-6 mb-8">
            <h3 className="text-lg font-semibold mb-6 text-gray-800 border-b border-orange-100 pb-3">{title}</h3>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2 lg:grid-cols-3">
                {children}
            </div>
        </div>
    );

    return (
        <>
            <div className="bg-gradient-to-br from-orange-50 via-white to-orange-50 py-16 sm:py-24">
                <div className="min-h-screen flex items-center justify-center py-3">
                    <div className="w-full max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-4xl lg:max-w-7xl">
                            <div className="mb-12 text-center">
                                <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl">REGISTRATION FORM</h2>
                                <p className="mt-3 text-lg text-orange-500">
                                    Mohon isi data di bawah ini dengan benar, pastikan tidak ada data yang keliru.
                                </p>
                            </div>

                            {errorMessage && (
                                <Transition.Root show={openError} as={Fragment}>
                                    <Dialog as="div" className="relative z-50" onClose={() => setOpenError(false)}>
                                        <Transition.Child
                                            as={Fragment}
                                            enter="ease-out duration-300"
                                            enterFrom="opacity-0"
                                            enterTo="opacity-100"
                                            leave="ease-in duration-200"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                        >
                                            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity" />
                                        </Transition.Child>

                                        <div className="fixed inset-0 z-50 w-screen overflow-y-auto">
                                            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                                                <Transition.Child
                                                    as={Fragment}
                                                    enter="ease-out duration-300"
                                                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                                                    leave="ease-in duration-200"
                                                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                                >
                                                    <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white px-5 py-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-md sm:p-8">
                                                        <div>
                                                            {/* Error Icon with Animation */}
                                                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 animate-pulse">
                                                                <ExclamationCircleIcon className="h-10 w-10 text-red-500" aria-hidden="true" />
                                                            </div>

                                                            <div className="mt-4 text-center">
                                                                {/* Error Title */}
                                                                <Dialog.Title as="h3" className="text-xl font-bold leading-6 text-gray-900">
                                                                    Terjadi Kesalahan
                                                                </Dialog.Title>

                                                                {/* Error Message Description */}
                                                                <div className="mt-4">
                                                                    <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                                                        <p className="text-base text-red-800 font-medium">
                                                                            {errorMessage}
                                                                        </p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Action Buttons */}
                                                        <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full justify-center rounded-xl bg-white px-4 py-3 text-sm font-medium text-gray-700 border border-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                                                                onClick={() => setOpenError(false)}
                                                            >
                                                                Tutup
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="inline-flex w-full justify-center rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 px-4 py-3 text-sm font-medium text-white shadow-sm hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200"
                                                                onClick={() => {
                                                                    setOpenError(false);
                                                                }}
                                                            >
                                                                Coba Lagi
                                                            </button>
                                                        </div>
                                                    </Dialog.Panel>
                                                </Transition.Child>
                                            </div>
                                        </div>
                                    </Dialog>
                                </Transition.Root>
                            )}
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Informasi Akun */}
                                {renderSection("Informasi Akun",
                                    <>
                                        <div className="space-y-2">
                                            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
                                                Email
                                            </label>
                                            <input
                                                id="Email"
                                                name="Email"
                                                type="text"
                                                value={formData.Email}
                                                onChange={handleChange}
                                                placeholder="Username@gmail.com"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                Password
                                            </label>
                                            <div className="relative">
                                                <input
                                                    id="password"
                                                    name="Password"
                                                    type={showPassword ? "text" : "password"}
                                                    value={formData.Password}
                                                    onChange={handleChange}
                                                    placeholder="Password"
                                                    className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5 pr-10"
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
                                    </>
                                )}

                                {/* Data Pribadi */}
                                {renderSection("Data Pribadi",
                                    <>
                                        <div className="space-y-2">
                                            <label htmlFor="NIK" className="block text-sm font-medium text-gray-700">
                                                NIK KTP
                                            </label>
                                            <input
                                                id="NIK"
                                                name="NIK"
                                                type="text"
                                                value={formData.NIK}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    if (/^\d*$/.test(value)) {
                                                        setFormData((prev) => ({ ...prev, NIK: value }));
                                                    }
                                                }}
                                                placeholder="NIK"
                                                maxLength={16}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                            {formData.NIK && (
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
                                        <div className="space-y-2">
                                            <label htmlFor="NOKK" className="block text-sm font-medium text-gray-700">
                                                No. Kartu Keluarga
                                            </label>
                                            <input
                                                id="NOKK"
                                                name="NOKK"
                                                type="text"
                                                value={formData.NOKK}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    if (/^\d*$/.test(value)) {
                                                        setFormData((prev) => ({ ...prev, NOKK: value }));
                                                    }
                                                }}
                                                placeholder="No. Kartu Keluarga"
                                                maxLength={16}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                            {formData.NOKK && (
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
                                        <div className="space-y-2">
                                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                                Nama Lengkap
                                            </label>
                                            <input
                                                id="NamaLengkap"
                                                name="NamaLengkap"
                                                type="text"
                                                value={formData.NamaLengkap}
                                                onChange={handleChange}
                                                placeholder="Nama Lengkap"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="TempatLahir" className="block text-sm font-medium text-gray-700">
                                                Tempat Lahir
                                            </label>
                                            <input
                                                id="TempatLahir"
                                                name="TempatLahir"
                                                type="text"
                                                value={formData.TempatLahir}
                                                onChange={handleChange}
                                                placeholder="Tempat Lahir"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="TanggalLahir" className="block text-sm font-medium text-gray-700">
                                                Tanggal Lahir
                                            </label>
                                            <input
                                                id="TanggalLahir"
                                                name="TanggalLahir"
                                                type="date"
                                                value={formData.TanggalLahir}
                                                onChange={(e) => {
                                                    const { value } = e.target;
                                                    handleChange(e);
                                                    checkAge(value);
                                                }}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                            {formData.ageBelow18 && (
                                                <p className="mt-1 text-sm text-red-600">
                                                    Umur anda tidak mencukupi karena dibawah 18 tahun
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="JenisKelamin" className="block text-sm font-medium text-gray-700">
                                                Jenis Kelamin
                                            </label>
                                            <select
                                                id="JenisKelamin"
                                                name="JenisKelamin"
                                                value={formData.JenisKelamin}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Jenis Kelamin</option>
                                                <option value="laki-laki">Laki-laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Agama" className="block text-sm font-medium text-gray-700">
                                                Agama
                                            </label>
                                            <select
                                                id="Agama"
                                                name="Agama"
                                                value={formData.Agama}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Agama</option>
                                                <option value="Islam">Islam</option>
                                                <option value="Kristen Protestan">Kristen Protestan</option>
                                                <option value="Kristen Katolik">Kristen Katolik</option>
                                                <option value="Hindu">Hindu</option>
                                                <option value="Buddha">Buddha</option>
                                                <option value="Konghucu">Konghucu</option>
                                                <option value="Lainnya">Lainnya</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Kewarganegaraan" className="block text-sm font-medium text-gray-700">
                                                Kewarganegaraan
                                            </label>
                                            <select
                                                id="Kewarganegaraan"
                                                name="Kewarganegaraan"
                                                value={formData.Kewarganegaraan}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="">Pilih Kewarganegaraan</option>
                                                <option value="WNI">WNI</option>
                                                <option value="WNA">WNA</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="StatusPernikahan" className="block text-sm font-medium text-gray-700">
                                                Status Pernikahan
                                            </label>
                                            <select
                                                id="StatusPernikahan"
                                                name="StatusPernikahan"
                                                value={formData.StatusPernikahan}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>
                                                    Pilih Status Pernikahan
                                                </option>
                                                <option value="Menikah">Menikah</option>
                                                <option value="Belum Menikah">Belum Menikah/Lajang</option>
                                                <option value="Cerai">Cerai</option>
                                            </select>
                                        </div>
                                    </>
                                )}

                                {/* Kontak */}
                                {renderSection("Kontak",
                                    <>
                                        <div className="space-y-2">
                                            <label htmlFor="NoHandphone" className="block text-sm font-medium text-gray-700">
                                                No. Telepon
                                            </label>
                                            <input
                                                id="NoHandphone"
                                                name="NoHandphone"
                                                type="text"
                                                value={formData.NoHandphone}
                                                onChange={handleChange}
                                                placeholder="+62xxxx"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
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
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Alamat */}
                                {renderSection("Alamat",
                                    <>
                                        <div className="space-y-2">
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
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
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
                                                        handleChange(e);
                                                    }
                                                }}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                            {formData.RT.length === 3 ? (
                                                <p className="mt-1 text-sm text-green-600">RT sudah sesuai</p>
                                            ) : (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {formData.RT.length > 0 && "RT harus 3 angka"}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
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
                                                        handleChange(e);
                                                    }
                                                }}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                            {formData.RW.length === 3 ? (
                                                <p className="mt-1 text-sm text-green-600">RW sudah sesuai</p>
                                            ) : (
                                                <p className="mt-1 text-sm text-red-600">
                                                    {formData.RW.length > 0 && "RW harus 3 angka"}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Provinsi" className="block text-sm font-medium text-gray-700">
                                                Provinsi
                                            </label>
                                            <select
                                                id="Provinsi"
                                                name="Provinsi"
                                                value={formData.Provinsi}
                                                onChange={handleProvinceChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Provinsi</option>
                                                {provincesData.map((province) => (
                                                    <option key={province.id} value={province.name}>
                                                        {province.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="KabKota" className="block text-sm font-medium text-gray-700">
                                                Kabupaten/Kota
                                            </label>
                                            <select
                                                id="KabKota"
                                                name="KabKota"
                                                value={formData.KabKota}
                                                onChange={handleKabKotaChange}
                                                disabled={!formData.Provinsi}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Kabupaten/Kota</option>
                                                {kabKotaData.map((kabkota) => (
                                                    <option key={kabkota.id} value={kabkota.name}>
                                                        {kabkota.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Kecamatan" className="block text-sm font-medium text-gray-700">
                                                Kecamatan
                                            </label>
                                            <select
                                                id="Kecamatan"
                                                name="Kecamatan"
                                                value={formData.Kecamatan}
                                                onChange={handleKecamatanChange}
                                                disabled={!formData.KabKota}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Kecamatan</option>
                                                {kecamatanData.map((kecamatan) => (
                                                    <option key={kecamatan.id} value={kecamatan.NamaKecamatan}>
                                                        {kecamatan.NamaKecamatan}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Desa" className="block text-sm font-medium text-gray-700">
                                                Desa
                                            </label>
                                            <select
                                                id="Desa"
                                                name="Desa"
                                                value={formData.Desa}
                                                onChange={handleChange}
                                                disabled={!formData.Kecamatan}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            >
                                                <option value="" disabled>Pilih Desa</option>
                                                {desaData.map((desa) => (
                                                    <option key={desa.Id} value={desa.NamaDesa}>
                                                        {desa.NamaDesa}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="KodePos" className="block text-sm font-medium text-gray-700">
                                                Kode Pos
                                            </label>
                                            <input
                                                id="KodePos"
                                                name="KodePos"
                                                type="text"
                                                value={formData.KodePos}
                                                onChange={handleChange}
                                                autoComplete="postal-code"
                                                placeholder="Kode Pos"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="AlamatDomisili" className="block text-sm font-medium text-gray-700">
                                                Alamat Domisili (Jika berbeda dengan KTP)
                                            </label>
                                            <input
                                                id="AlamatDomisili"
                                                name="AlamatDomisili"
                                                type="text"
                                                value={formData.AlamatDomisili}
                                                onChange={handleChange}
                                                autoComplete="street-address"
                                                placeholder="Alamat Domisili"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Pendidikan */}
                                {renderSection("Pendidikan",
                                    <>
                                        <div className="space-y-2">
                                            <label htmlFor="PendidikanTerakhir" className="block text-sm font-medium text-gray-700">
                                                Pendidikan Terakhir
                                            </label>
                                            <select
                                                id="PendidikanTerakhir"
                                                name="PendidikanTerakhir"
                                                value={formData.PendidikanTerakhir}
                                                onChange={handleChange}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
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
                                        <div className="space-y-2">
                                            <label htmlFor="NamaSekolah" className="block text-sm font-medium text-gray-700">
                                                Nama Sekolah
                                            </label>
                                            <input
                                                id="NamaSekolah"
                                                name="NamaSekolah"
                                                type="text"
                                                value={formData.NamaSekolah}
                                                onChange={handleChange}
                                                autoComplete="address-level1"
                                                placeholder="Nama Sekolah"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="Fakultas"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Fakultas" : "Jurusan"}
                                            </label>
                                            <input
                                                id="Fakultas"
                                                name="Fakultas"
                                                type="text"
                                                value={formData.Fakultas}
                                                onChange={handleChange}
                                                autoComplete="Fakultas"
                                                placeholder={formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Fakultas" : "Jurusan"}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label
                                                htmlFor="Jurusan"
                                                className="block text-sm font-medium text-gray-700"
                                            >
                                                {formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Jurusan" : "Kompetensi"}
                                            </label>
                                            <input
                                                id="Jurusan"
                                                name="Jurusan"
                                                type="text"
                                                value={formData.Jurusan}
                                                onChange={handleChange}
                                                autoComplete="Jurusan"
                                                placeholder={formData.PendidikanTerakhir === "D1" || formData.PendidikanTerakhir === "D2" || formData.PendidikanTerakhir === "D3" || formData.PendidikanTerakhir === "S1" || formData.PendidikanTerakhir === "S2" || formData.PendidikanTerakhir === "S3" ? "Jurusan" : "Kompetensi"}
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="Skill" className="block text-sm font-medium text-gray-700">
                                                Skill
                                            </label>
                                            <input
                                                id="Skill"
                                                name="Skill"
                                                type="text"
                                                value={formData.Skill}
                                                onChange={handleChange}
                                                autoComplete="Skill"
                                                placeholder="Menjahit/Microsoft Excel/Cutting/Dll"
                                                className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
                                            />
                                        </div>
                                    </>
                                )}
                                {renderSection("Data Tambahan",
                                    <>
                                        <div className="space-y-2">
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
                                                    <div className="space-y-2 mt-2">
                                                        <input
                                                            type="text"
                                                            name="Lainnya"
                                                            value={formData.Lainnya || ""}
                                                            onChange={handleLainnyaChange}
                                                            placeholder="Silakan isi keterangan lainnya"
                                                            className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500 sm:text-sm px-3 py-2.5"
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
                                        <div className="space-y-2">
                                            <div className="rounded-lg border border-orange-100 bg-white p-6 shadow-sm">
                                                <label className="block text-sm font-medium text-gray-700 mb-2">Upload CV - Ijazah - Paklaring - Sertifikat (Jadikan 1 Pdf)</label>
                                                <p className="text-xs text-gray-500 mb-4">Format file yang didukung: PDF (Maksimal 2MB)</p>
                                                <div className="flex items-center justify-center w-full">
                                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-orange-200 border-dashed rounded-lg cursor-pointer bg-orange-50 hover:bg-orange-100 transition-colors duration-200">
                                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                            <DocumentTextIcon className="w-8 h-8 mb-3 text-orange-400" aria-hidden="true" />
                                                            <p className="mb-1 text-sm text-gray-600"><span className="font-medium">Klik untuk unggah</span></p>
                                                            <p className="text-xs text-gray-500">PDF (MAX. 2MB)</p>
                                                        </div>
                                                        <input
                                                            type="file"
                                                            className="hidden"
                                                            accept=".pdf"
                                                            onChange={(e) => handleFileChangeDokumenTambahan(e, 'dokumen')}
                                                        />
                                                    </label>
                                                </div>
                                                {fileErrorDokumenTambahan && (
                                                    <p className="text-sm text-red-500 mt-2">{fileErrorDokumenTambahan}</p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                )}
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
                            </form >
                        </div>
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
