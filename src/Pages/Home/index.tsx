import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUser } from "../../Features/User";

const HomePage = () => {
    const [data, setData] = useState<string>();

    const navigate = useNavigate();    

    const fetchData = async () => {
        const getData = await getAllUser();
        setData(getData);
    }
    
    // useEffect(() => {
    //     fetchData();
    // }, []);
    
    return (
    <>
        <div>data: {data}</div>        
        <button
            className="px-4 py-2  bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:opacity-90 transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            onClick={fetchData}
            aria-label="Fetch data"
        >
            Fetch data
        </button>

        <button
                className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-all"
                onClick={() => navigate("/post")} 
            >
                Quản lý Post
        </button>

        <button
                className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all"
                onClick={() => navigate("/user")}
            >
                Quản lý Admin User
        </button>

                        
    </>
    );
};

export default HomePage;