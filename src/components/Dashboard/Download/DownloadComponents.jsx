import React, { useState } from 'react';
import axios from 'axios';

const DownloadComponents = () => {
    const [password, setPassword] = useState('');
    const [selectedData, setSelectedData] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDownload = async () => {
        if (password !== import.meta.env.VITE_PASSWORD) {
            setErrorMessage('Incorrect password');
            return;
        }

        setIsLoading(true);

        try {
            const url = selectedData;
            const response = await axios.get(url, {
                responseType: 'blob'
            });

            const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = urlBlob;
            link.setAttribute('download', 'data.csv'); // or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
            setErrorMessage('');
            document.getElementById('my_modal_5').close();
        } catch (error) {
            console.error(error);
            setErrorMessage('Error downloading file');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectChange = (e) => {
        setSelectedData(e.target.value);
        document.getElementById('my_modal_5').showModal();
    };

    return (
        <div>
            <select className="select select-bordered w-full max-w-xs" onChange={handleSelectChange} value="">
                <option value="" disabled>Select Data to Download</option>
                <option value={import.meta.env.VITE_DOWNLOAD_100DATA}>Download 100 Data</option>
                <option value={import.meta.env.VITE_DOWNLOAD_DAILY_DATA}>Download Daily Data</option>
                <option value={import.meta.env.VITE_DOWNLOAD_WEEKLY_DATA}>Download Weekly Data</option>
                <option value={import.meta.env.VITE_DOWNLOAD_MONTHLY_DATA}>Download Monthly Data</option>
            </select>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Enter Password Before Downloading Data</h3>
                    <p className="py-4">Please enter your password to proceed with the download.</p>

                    <input
                        type="password"
                        placeholder="Password"
                        className="input input-bordered w-full max-w-xs"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                    {isLoading && <p className="text-blue-500">Loading Download Data...</p>}
                    <div className="modal-action">
                        <button className="btn" onClick={handleDownload} disabled={isLoading}>Download</button>
                        <form method="dialog">
                            <button className="btn" disabled={isLoading}>Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    )
}

export default DownloadComponents;
