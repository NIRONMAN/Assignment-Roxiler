import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTbl = () => {
  const [stuff, setStuff] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPg, setCurrentPg] = useState(1);
  const [month,setMonth]=useState<number|undefined>();
  const [search,setSearch]=useState("");
  useEffect(() => {
    if(search==="")
      getProducts();
  }, [currentPg,search]);

  const getProducts = async () => {
    try {
      const resp = await axios.get(`http://localhost:3000/product/${currentPg}`);
      const sorted = await resp.data.data.sort((a: any, b: any) => a.id - b.id);
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
  useEffect(()=>{
    (async()=>{
      if(month){
        const res=await axios.get(`http://localhost:3000/sale/${month}`);
        const sorted = await res.data.saleData.sort((a: any, b: any) => a.id - b.id);
      setStuff(sorted);
        
        //console.log(res.data.sale)
      }
    })()
  },[month])
  useEffect(()=>{
    (async()=>{
      if(search!==""){
        const res=await axios.get(`http://localhost:3000/search/${search}`);
        const sorted = await res.data.products.sort((a: any, b: any) => a.id - b.id);
      setStuff(sorted);
        
        //console.log(res.data.sale)
      }
    })()
  },[search])

  return (
    <div className="container mx-auto p-4">
      <h1 className=' text-center text-4xl py-2'>Products</h1>
      <div className=' py-2 flex flex-row gap-2'>
        <div className=' flex-1  '>
          <input onChange={(e:React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)} className=' p-1 px-3 border-2 rounded-md focus:outline-slate-400 w-full' placeholder='Search...'></input>
        </div>
        <div className=' px-3 border-2 rounded-lg bg-gray-100'>

          
          <select value={month} onChange={async (e:React.ChangeEvent<HTMLSelectElement>)=>setMonth(await JSON.parse(e.target.value))} className=' outline-none border-2 border-gray-100 bg-gray-100'>
            <option value={undefined} disabled >Select a month </option>
            <option value={1}>Jan</option>
            <option value={2}>Feb</option>
            <option selected value={3}>Mar</option>
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
            {stuff.map((item: any) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rs. {item.price.toFixed(2)} </td>
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
      <div  className="mt-4 flex items-center justify-between">
        <button
          onClick={prevPage}
          disabled={currentPg === 1 || search!==""}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm text-gray-700">Page {currentPg}</span>
        <button
          onClick={nextPage}
          disabled={currentPg * 10 >= totalCount || search!==""}
          className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTbl;