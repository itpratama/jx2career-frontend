import axios from 'axios';

const handleUpdateSubStatus = async (NIK, JobId, newStatus, setFilteredData) => {
    try {
        // Kirim permintaan PUT ke API untuk memperbarui status
        await axios.put('http://localhost:4005/updateSubStatusCandidate', {
            NIK,
            JobId,
            Sub_Status: newStatus,
        });

        // Update local state setelah status berubah
        setFilteredData((prevCandidates) =>
            prevCandidates.map((candidate) =>
                candidate.NIK === NIK && candidate.JobId === JobId
                    ? { ...candidate, Sub_Status: newStatus }
                    : candidate
            )
        );

        console.log('Status updated successfully!');
    } catch (error) {
        console.error('Error updating status:', error);
        throw error; // Melempar error agar bisa ditangani di komponen yang memanggil
    }
};

export default handleUpdateSubStatus;