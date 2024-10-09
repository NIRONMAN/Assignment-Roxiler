import { Link } from "react-router-dom"

function Home() {
    return (
        <div className=' bg-sky-100 flex justify-center items-center h-screen'>
            <div className='flex flex-col justify-center items-center'>
                <h1 className=' text-4xl py-10 font-semibold'>Welcome to Roxiler Assignment</h1>
                <div className=" h-full flex flex-1">
                    <Link to={"/Products"} className=" h-32 w-32 bg-purple-200 rounded-xl flex justify-center items-center m-2 text-center ">Transaction Table</Link>
                    <Link to={"/Products"} className=" h-32 w-32 bg-purple-200 rounded-xl flex justify-center items-center m-2 text-center ">Transaction Statistics</Link>
                    <Link to={"/Products"} className=" h-32 w-32 bg-purple-200 rounded-xl flex justify-center items-center m-2 text-center ">Transaction Bar chart</Link>

                </div>
            </div>
        </div>
    )
}

export default Home