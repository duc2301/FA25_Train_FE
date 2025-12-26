import { useState } from "react";
import Navbar from "../../Widgets/Components/Navbar";
import LeftSidebar from "../../Widgets/Components/Home/LeftSidebar";
import RightSidebar from "../../Widgets/Components/Home/RightSidebar";

const HomePage = () => {
  const [data, setData] = useState<string[]>(["sdfsdf", "sdfsdf", "sdfsdf", "sdfsdf", "sdfsdf"]);

  return (
    <div className="min-h-screen bg-[#18191a] text-[#e4e6eb] font-sans">
      <Navbar />

      {/* BODY CONTAINER */}
      <div className="flex pt-14 h-screen overflow-hidden">

        <div className="hidden xl:block w-[360px] hover:overflow-y-auto overflow-hidden h-full pb-4">
          <LeftSidebar />
        </div>

        <div className="flex-1 flex justify-center overflow-y-auto scrollbar-hide bg-[#18191a]">
          <div className="w-full max-w-[700px] py-4 px-4 md:px-0">

            <div className="bg-[#242526] rounded-lg shadow p-6 mb-4 text-center">
              <h2 className="text-2xl font-bold text-blue-500 mb-2">Các bài post</h2>
            </div>

            {data && (
              <div className="bg-[#242526] rounded-lg shadow p-4 mb-4 border-l-4 border-blue-500">
                <h3 className="font-semibold text-gray-300 mb-2">Kết quả tải dữ liệu:</h3>
                {data.map((item, index) => (
                  <div key={index} className="bg-[#3a3b3c] p-3 rounded text-gray-200 mb-2 break-all font-mono text-sm">
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="hidden md:block w-[360px] hover:overflow-y-auto overflow-hidden h-full pb-4 right-0">
          <RightSidebar />
        </div>

      </div>
    </div>
  );
};

export default HomePage;