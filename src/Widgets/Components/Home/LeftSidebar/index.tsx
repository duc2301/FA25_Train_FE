import React from 'react';
import { Users, Bookmark, History,  UsersRound, Tv, Store, ChevronDown, Bot, User } from 'lucide-react';

const LeftSidebar = () => {
  const menuItems = [
    { icon: <User className="w-6 h-6"/>, label: /*localStorage.get("User Name") ||*/ "User", isImg: true },
    { icon: <Bot className="text-blue-400" />, label: "Meta AI (Mô phỏng)" }, 
    { icon: <Users className="text-blue-400" />, label: "Bạn bè" },
    { icon: <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yJ/r/fGWbDwbx9W4.png" className="w-8 h-8" alt="memories"/>, label: "Kỷ niệm", isExternal: true }, // Bạn có thể thay bằng icon History
    { icon: <Bookmark className="text-purple-500" />, label: "Đã lưu" },
    { icon: <UsersRound className="text-blue-400" />, label: "Nhóm" },
    { icon: <Tv className="text-blue-400" />, label: "Video" },
    { icon: <Store className="text-blue-400" />, label: "Marketplace" },
    { icon: <ChevronDown className="text-gray-200" />, label: "Xem thêm", isControl: true },
  ];

  return (
    <div className="p-2 w-full">
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li key={index} className="flex items-center gap-3 p-2 hover:bg-[#3a3b3c] rounded-lg cursor-pointer transition-colors">
            {/* Xử lý hiển thị Icon */}
            <div className={`w-9 h-9 flex items-center justify-center rounded-full ${item.isControl ? 'bg-[#3a3b3c]' : ''}`}>
               {item.isImg || item.isExternal ? item.icon : React.cloneElement(item.icon, { className: "w-7 h-7" })}
            </div>
            <span className="text-[15px] font-medium text-[#e4e6eb]">{item.label}</span>
          </li>
        ))}
      </ul>
      
      <div className="border-t border-[#393a3b] my-4 mx-2"></div>
      
      <div className="px-2">
         <h3 className="text-[#b0b3b8] font-semibold text-[17px] mb-2">Lối tắt của bạn</h3>
         {/* Phần này render tương tự list trên nếu có dữ liệu */}
         <p className="text-xs text-[#b0b3b8]">Quyền riêng tư · Điều khoản · Quảng cáo · Lựa chọn quảng cáo · Cookie · Xem thêm · Meta © 2025</p>
      </div>
    </div>
  );
};

export default LeftSidebar;