import axios from "axios";
import { useEffect, useState } from "react"

function TransacStats() {
    const [month, setMonth] = useState<number | undefined>();
    const [data, setData] = useState<any>(undefined);
    useEffect(() => {
        (async () => {
            if (month) {
                try {
                    const res = await axios.get(`http://localhost:3000/sale/${month}`);
                setData(res.data);

                //console.log(res.data)
                } catch (error) {
                    console.log(error)
                }
            }
        })()
    }, [month])
    return (
        <div className=" p-4 flex justify-center items-center h-screen">
            <div className=" bg-sky-50 p-5 rounded-xl">
                <div className=" flex flex-row mt-2">
                <h1 className=" font-serif text-xl flex-1 px-3">Statistics</h1>
                <div className=' px-3 border-2 rounded-lg bg-gray-100'>
                    <select value={month} onChange={async (e: React.ChangeEvent<HTMLSelectElement>) => setMonth(await JSON.parse(e.target.value))} className=' outline-none border-2 border-gray-100 bg-gray-100'>
                        <option value={undefined} disabled selected>Select a month </option>
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
                <table className=" my-4">
                    <thead className=" bg-sky-100">
                        <th className=" px-3">Total Sale</th>
                        <th  className=" px-3">Total Sold Items</th>
                        <th className=" px-3">Total Unsold Items</th>
                    </thead>
                    {data && (
                        <tbody className="">
                            <tr>
                                <td className="px-3 text-center">
                                   Rs. {data.totalSales}
                                </td>
                                <td className="px-3 text-center">
                                    {data.totalSold}
                                </td>
                                <td className="px-3 text-center">
                                    {data.totalUnsold}
                                </td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default TransacStats