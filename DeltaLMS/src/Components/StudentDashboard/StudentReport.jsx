import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StudentReport = () => {
    const navigate = useNavigate();
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get('https://deltawebservices.in/api/v1/report', {
                    headers: {
                        Authorization: `Bearer ${token}` // Include the token in the request header
                    }
                });
                setReportData(response.data.data);
            } catch (error) {
                console.error('Error fetching report data:', error);
            }
        };

        fetchReportData();
    }, []);

    const handleNavigate = () => {
        navigate(-1);
    };

    return (
        <>
            <style>
                {`
                    .progress-bar-container {
                        width: 100%;
                        background-color: #e7ebff;
                        border-radius: 5px;
                        height: 10px; /* Adjust height as needed */
                        margin-top: 10px;
                        position: relative;
                    }

                    .progress-bar {
                        height: 100%;
                        background-color: #4caf50; /* Adjust color as needed */
                        border-radius: 5px;
                        transition: width 0.5s ease;
                    }
                `}
            </style>
            <section className="login-steps report-sec">
                <div className="container">
                    
                    <div className="row">
                        <div className="col-lg-12 mx-auto text-center">
                            {reportData.length > 0 ? (
                                <>
                                    <div className="select-board-box">
                                        <h4>My Report</h4>
                                        <div className="report-time">
                                            <p>Time Spent on Learning</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        {reportData.map((item, index) => (
                                            <div className="col-lg-4" key={index}>
                                                <div className="creat-report">
                                                    <div className="dashboard__single__counter">
                                                        <img
                                                            loading="lazy"
                                                            src={item.subjectLogo} // Use the subjectLogo from the API response
                                                            alt="subject logo"
                                                            width={30}
                                                        />
                                                    </div>
                                                    <div className="creat-report-content">
                                                        <h4>{item.subjectName}</h4> {/* Use the subjectName from the API response */}
                                                        <p>
                                                            <b>{item.timeSpent} seconds</b>
                                                        </p>
                                                        <p>
                                                            <b>{item.percentage}%</b> of total time
                                                        </p>
                                                        <div className="progress-bar-container">
                                                            <div
                                                                className="progress-bar"
                                                                style={{ width: `${item.percentage}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="no-report">
                                    <h4>No Report Found</h4>
                                    <p>It seems like you don't have any report data yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default StudentReport;
