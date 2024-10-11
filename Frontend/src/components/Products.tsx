import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTbl = () => {
  const [stuff, setStuff] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPg, setCurrentPg] = useState(1);

  useEffect(() => {
    getProducts();
  }, [currentPg]);

  const getProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:3000/product/${currentPg}`);
      const sorted=await resp.data.data.sort((a:any,b:any)=>a.id -b.id);
      setStuff(sorted);
      setTotalCount(resp.data.total);
    } catch (err) {
      console.log('Oops! Something went wrong:', err);
    }
  };

  const nextPage = () => {
    setCurrentPg(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPg > 1) {
      setCurrentPg(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className=' text-center text-4xl py-5'>Products</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sold</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stuff.map((item:any) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price.toFixed(2)} Rs.`</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.sold ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {item.sold ? 'Yes' : 'No'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={prevPage}
          disabled={currentPg === 1}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPg}</span>
        <button
          onClick={nextPage}
          disabled={currentPg * 10 >= totalCount}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTbl;