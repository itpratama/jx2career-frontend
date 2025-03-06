import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function UserList() {
  const [filters, setFilters] = useState({
    "Kab/Kota": '',
    "Provinsi": '',
    "Pendidikan Terakhir": '',
    "Nama Sekolah": '',
    "Jurusan": '',
  });
  
  const [originalData, setOriginalData] = useState([]); // Store all data
  
  const [dropdownOptions, setDropdownOptions] = useState({
    "Kab/Kota": [],
    "Provinsi": [],
    "Pendidikan Terakhir": [],
    "Nama Sekolah": [],
    "Jurusan": [],
  });
  
  const [accounts, setAccounts] = useState([]);

  // Fetch initial data for accounts and dropdown options
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await axios.post('http://153.92.5.18:4005/getUserData', {});
        setOriginalData(response.data);
        updateDropdownOptions(response.data, {});
        setAccounts(response.data); 
      } catch (error) {
        console.error('Failed to fetch initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  const updateDropdownOptions = (data, currentFilters) => {
    const filteredData = data.filter((item) =>
      Object.keys(currentFilters).every(
        (key) => !currentFilters[key] || item[key] === currentFilters[key]
      )
    );

    setDropdownOptions({
      "Kab/Kota": [...new Set(filteredData.map((item) => item["Kab/Kota"]))],
      "Provinsi": [...new Set(filteredData.map((item) => item.Provinsi))],
      "Pendidikan Terakhir": [...new Set(filteredData.map((item) => item["Pendidikan Terakhir"]))],
      "Nama Sekolah": [...new Set(filteredData.map((item) => item["Nama Sekolah"]))],
      "Jurusan": [...new Set(filteredData.map((item) => item.Jurusan))],
    });
    
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };

    setFilters(updatedFilters);
    updateDropdownOptions(originalData, updatedFilters); 
    setAccounts(
      originalData.filter((item) =>
        Object.keys(updatedFilters).every(
          (key) => !updatedFilters[key] || item[key] === updatedFilters[key]
        )
      )
    ); 
  };

  return (
    <>
      <div className="xl:pl-72 bg-gray-900 min-h-screen">
        <header className="bg-gray-800 px-4 py-4">
          <h1 className="text-white text-lg">Account List</h1>
        </header>

        <div className="p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {Object.keys(filters).map((key) => (
              <div key={key} className="flex flex-col">
                <label htmlFor={key} className="text-gray-300 text-xs mb-3">
                  {key}
                </label>
                <select
                  id={key}
                  name={key}
                  value={filters[key]}
                  onChange={handleFilterChange}
                  className="p-2 rounded bg-gray-800 text-white text-xs"
                >
                  <option value="">Select {key}</option>
                  {dropdownOptions[key]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 overflow-x-auto">
          <table className="w-full bg-gray-800 text-white text-xs">
            <thead>
              <tr className="text-center whitespace-nowrap">
                {Object.keys(originalData[0] || {}).map((header) => (
                  <th key={header} className="p-2 capitalize">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {accounts.map((account, index) => (
                <tr key={index} className="text-center border-b border-gray-700 text-xs">
                  {Object.values(account).map((value, i) => (
                    <td key={i} className="p-2">{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
