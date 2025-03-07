// RegistFormModal.js
import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, PlusIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useRegistForm } from './useRegistForm';

export const RegistFormModal = ({
    open,
    setOpen,
    errorMessage,
    setErrorMessage,
    riwayatPekerjaanRows,
    handleRiwayatPekerjaanChange,
    addRow,
    handleFileChangeDokumenTambahan,
    handleSubmitDokumenTambahan,
    fileErrorDokumenTambahan,
    handleLewati,
}) => {
    return (
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
                            <Dialog.Panel className="relative transform overflow-hidden rounded-xl bg-gradient-to-br from-orange-50 via-white to-orange-50 px-4 pb-6 pt-6 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl sm:p-8 border border-orange-100">
                                <div>
                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100">
                                        <CheckIcon className="h-7 w-7 text-orange-500" aria-hidden="true" />
                                    </div>
                                    <div className="mt-4 text-center">
                                        <Dialog.Title as="h3" className="text-xl font-semibold leading-6 text-gray-800">
                                            Registrasi Berhasil
                                        </Dialog.Title>
                                        <div className="mt-3">
                                            <p className="text-sm text-gray-600">
                                                Mohon lengkapi formulir tambahan di bawah ini untuk membantu kami memahami potensi Anda secara lebih mendalam.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8">
                                    <div className="flex justify-between items-center mb-3">
                                        <label className="block text-sm font-medium text-gray-700">Riwayat Pekerjaan (Jika ada)</label>
                                        <button
                                            type="button"
                                            className="inline-flex items-center text-orange-500 hover:text-orange-600 transition-colors duration-200 font-medium text-sm"
                                            onClick={addRow}
                                        >
                                            <PlusIcon className="w-4 h-4 mr-1" /> Tambah
                                        </button>
                                    </div>

                                    {/* Desktop View - Table */}
                                    <div className="hidden md:block overflow-x-auto rounded-lg border border-orange-100 shadow-sm">
                                        <table className="min-w-full border-collapse">
                                            <thead>
                                                <tr className="bg-gradient-to-r from-orange-100 to-orange-50">
                                                    <th className="border-b border-orange-100 px-4 py-3 text-left text-sm font-medium text-gray-700">Nama Perusahaan</th>
                                                    <th className="border-b border-orange-100 px-4 py-3 text-left text-sm font-medium text-gray-700">Departemen</th>
                                                    <th className="border-b border-orange-100 px-4 py-3 text-left text-sm font-medium text-gray-700">Jabatan</th>
                                                    <th className="border-b border-orange-100 px-4 py-3 text-left text-sm font-medium text-gray-700">Mulai Kerja</th>
                                                    <th className="border-b border-orange-100 px-4 py-3 text-left text-sm font-medium text-gray-700">Terakhir Kerja</th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white">
                                                {riwayatPekerjaanRows.map((row, index) => (
                                                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-orange-50"}>
                                                        <td className="border-b border-orange-100 px-4 py-3">
                                                            <input
                                                                type="text"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.NamaPerusahaan || ""}
                                                                onChange={(e) =>
                                                                    handleRiwayatPekerjaanChange(index, "NamaPerusahaan", e.target.value)
                                                                }
                                                                placeholder="PT Example"
                                                            />
                                                        </td>
                                                        <td className="border-b border-orange-100 px-4 py-3">
                                                            <input
                                                                type="text"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.Departemen || ""}
                                                                onChange={(e) =>
                                                                    handleRiwayatPekerjaanChange(index, "Departemen", e.target.value)
                                                                }
                                                                placeholder="Human Resources"
                                                            />
                                                        </td>
                                                        <td className="border-b border-orange-100 px-4 py-3">
                                                            <input
                                                                type="text"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.Jabatan || ""}
                                                                onChange={(e) =>
                                                                    handleRiwayatPekerjaanChange(index, "Jabatan", e.target.value)
                                                                }
                                                                placeholder="HR Manager"
                                                            />
                                                        </td>
                                                        <td className="border-b border-orange-100 px-4 py-3">
                                                            <input
                                                                type="date"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.MulaiKerja || ""}
                                                                onChange={(e) =>
                                                                    handleRiwayatPekerjaanChange(index, "MulaiKerja", e.target.value)
                                                                }
                                                            />
                                                        </td>
                                                        <td className="border-b border-orange-100 px-4 py-3">
                                                            <input
                                                                type="date"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
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

                                    {/* Mobile View - List */}
                                    <div className="md:hidden space-y-6">
                                        {riwayatPekerjaanRows.map((row, index) => (
                                            <div key={index} className="bg-white rounded-lg border border-orange-100 shadow-sm p-4">
                                                <div className="text-xs font-medium text-orange-500 mb-2">Pengalaman #{index + 1}</div>

                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Nama Perusahaan</label>
                                                        <input
                                                            type="text"
                                                            className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                            value={row.NamaPerusahaan || ""}
                                                            onChange={(e) => handleRiwayatPekerjaanChange(index, "NamaPerusahaan", e.target.value)}
                                                            placeholder="PT Example"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Departemen</label>
                                                        <input
                                                            type="text"
                                                            className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                            value={row.Departemen || ""}
                                                            onChange={(e) => handleRiwayatPekerjaanChange(index, "Departemen", e.target.value)}
                                                            placeholder="Human Resources"
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-700 mb-1">Jabatan</label>
                                                        <input
                                                            type="text"
                                                            className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                            value={row.Jabatan || ""}
                                                            onChange={(e) => handleRiwayatPekerjaanChange(index, "Jabatan", e.target.value)}
                                                            placeholder="HR Manager"
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-3">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Mulai Kerja</label>
                                                            <input
                                                                type="date"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.MulaiKerja || ""}
                                                                onChange={(e) => handleRiwayatPekerjaanChange(index, "MulaiKerja", e.target.value)}
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-700 mb-1">Terakhir Kerja</label>
                                                            <input
                                                                type="date"
                                                                className="w-full rounded-md border-orange-200 shadow-sm focus:ring-orange-500 focus:border-orange-500 text-sm"
                                                                value={row.TerakhirKerja || ""}
                                                                onChange={(e) => handleRiwayatPekerjaanChange(index, "TerakhirKerja", e.target.value)}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {riwayatPekerjaanRows.length === 0 && (
                                            <div className="text-center py-6 bg-white rounded-lg border border-orange-100 shadow-sm">
                                                <p className="text-sm text-gray-500">Belum ada riwayat pekerjaan. Tap tombol "Tambah" untuk menambahkan.</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="mt-8 flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4">
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto inline-flex justify-center rounded-md bg-white px-5 py-3 text-sm font-medium text-gray-700 shadow-sm border border-orange-200 hover:bg-orange-50 transition-colors duration-200"
                                        onClick={handleLewati}
                                    >
                                        Lewati
                                    </button>
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto inline-flex justify-center rounded-md bg-gradient-to-r from-orange-400 to-orange-500 px-5 py-3 text-sm font-medium text-white shadow-sm hover:from-orange-500 hover:to-orange-600 transition-all duration-200"
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
    );
};