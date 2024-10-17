import axios from "axios";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

function BarChartCompo() {
    const [month, setMonth] = useState<number | undefined>();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any>(undefined);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/bar/${month}`);
                const data = response.data;

                console.log("data", response.data);
                // Prepare labels and dataset for the bar chart
                const labels = data.map((item: any) => item._id === '901-above' ? '901+' : `${item._id - 100}-${item._id}`);
                const counts = data.map((item: any) => item.count);

                // Set chart data
                setData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Number of Products Sold',
                            data: counts,
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                        },
                    ],
                });
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        if (month)
            fetchData();
    }, [month]);

    return (
        <div className="flex justify-center items-center flex-col h-screen bg-sky-50">
            <div className="flex flex-row mt-2 my-3">
                <h1 className="font-serif text-xl flex-1 px-3">Bar Chart</h1>
                <div className='px-3 border-2 rounded-lg bg-gray-100'>
                    <select 
                        value={month} 
                        onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => setMonth(await JSON.parse(e.target.value))} 
                        className='outline-none border-2 border-gray-100 bg-gray-100'
                    >
                        <option value={undefined} disabled selected>Select a month</option>
                        <option value={1}>Jan</option>
                        <option value={2}>Feb</option>
                        <option value={3}>Mar</option>
                        <option value={4}>Apr</option>
                        <option value={5}>May</option>
                        <option value={6}>Jun</option>
                        <option value={7}>Jul</option>
                        <option value={8}>Aug</option>
                        <option value={9}>Sep</option>
                        <option value={10}>Oct</option>
                        <option value={11}>Nov</option>
                        <option value={12}>Dec</option>
                    </select>
                </div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl">
                {
                    (loading && !data) ? "Loading" : <Bar
                        data={data}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Allow flexible height
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                title: {
                                    display: true,
                                    text: `Product Sales by Price Range - Month ${new Date(2024,month!-1).toLocaleString('default',{month:'long'})}`,
                                },
                            },
                        }}
                        style={{ height: '400px' }} // Set a specific height for the chart
                    />
                }
            </div>
        </div>
    );
}

export default BarChartCompo;
