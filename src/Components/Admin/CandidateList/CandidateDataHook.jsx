import { useState, useEffect } from 'react';
import axios from 'axios';

const CandidateDataHook = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [jobName, setJobName] = useState('');
    const [jobCategory, setJobCategory] = useState('');
    const [provinsi, setProvinsi] = useState('');
    const [kabKota, setKabKota] = useState('');
    const [JenisKelamin, setJenisKelamin] = useState('');
    const [pendidikanTerakhir, setPendidikanTerakhir] = useState('');
    const [jurusan, setJurusan] = useState('');
    const [jobOptions, setJobOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [provinsiOptions, setProvinsiOptions] = useState([]);
    const [kabKotaOptions, setKabKotaOptions] = useState([]);
    const [JenisKelaminOptions, setJenisKelaminOptions] = useState([]);
    const [pendidikanOptions, setPendidikanOptions] = useState([]);
    const [jurusanOptions, setJurusanOptions] = useState([]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://153.92.5.18:4005/getCandidates');
            const dataArray = Object.values(response.data); // Convert object to array
            setData(dataArray);
            setFilteredData(dataArray); // Initialize filteredData with all data

            // Extract unique options for dropdowns
            setJobOptions(["", ...new Set(dataArray.map(item => item.JobName))]);
            setCategoryOptions(["", ...new Set(dataArray.map(item => item.JobCategory))]);
            setProvinsiOptions(["", ...new Set(dataArray.map(item => item.Provinsi))]);
            setKabKotaOptions(["", ...new Set(dataArray.map(item => item.KabKota))]);
            setJenisKelaminOptions(["", ...new Set(dataArray.map(item => item.JenisKelamin))]);
            setPendidikanOptions(["", ...new Set(dataArray.map(item => item.PendidikanTerakhir))]);
            setJurusanOptions(["", ...new Set(dataArray.map(item => item.Jurusan))]);
        } catch (error) {
            console.error('Error fetching candidates:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        // Apply filters whenever any filter value changes
        const filtered = data.filter(item => {
            return (jobName === '' || item.JobName === jobName) &&
                (jobCategory === '' || item.JobCategory === jobCategory) &&
                (provinsi === '' || item.Provinsi === provinsi) &&
                (kabKota === '' || item.KabKota === kabKota) &&
                (JenisKelamin === '' || item.JenisKelamin === JenisKelamin) &&
                (pendidikanTerakhir === '' || item.PendidikanTerakhir === pendidikanTerakhir) &&
                (jurusan === '' || item.Jurusan === jurusan);
        });
        setFilteredData(filtered);
    }, [jobName, jobCategory, provinsi, kabKota, JenisKelamin, pendidikanTerakhir, jurusan, data]);

    return {
        filteredData,
        setFilteredData,
        loading,
        jobName,
        setJobName,
        jobCategory,
        setJobCategory,
        provinsi,
        setProvinsi,
        kabKota,
        setKabKota,
        JenisKelamin,
        setJenisKelamin,
        JenisKelaminOptions,
        setJenisKelaminOptions,
        setKabKotaOptions,
        pendidikanTerakhir,
        setPendidikanTerakhir,
        jurusan,
        setJurusan,
        jobOptions,
        categoryOptions,
        provinsiOptions,
        kabKotaOptions,
        pendidikanOptions,
        jurusanOptions,
    };
};

export default CandidateDataHook;