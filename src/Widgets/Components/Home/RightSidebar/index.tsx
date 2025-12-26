import React from 'react';
import { Search, MoreHorizontal } from 'lucide-react';

const RightSidebar = () => {
  // Danh sách giả lập từ ảnh của bạn
  const contacts = [
    { name: "Meta AI", isBot: true },
    { name: "Bạn bè 1", online: true },
    { name: "Bạn bè 1", online: true, time: "1 giờ" },
    { name: "Bạn bè 1", online: false },
    { name: "Bạn bè 1", online: true },
    { name: "Bạn bè 1", online: false },
    { name: "Bạn bè 1", online: true },
    { name: "Bạn bè 1", online: true },
    { name: "Bạn bè 1", online: false },
  ];

  return (
    <div className="p-2 w-full pr-4">
      {/* Header Người liên hệ */}
      <div className="flex items-center justify-between mb-2 px-2 pt-2">
        <h3 className="text-[#b0b3b8] font-semibold text-[17px]">Người liên hệ</h3>
        <div className="flex gap-4 text-[#b0b3b8]">
          <Search className="w-4 h-4 cursor-pointer hover:text-white" />
          <MoreHorizontal className="w-4 h-4 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* List */}
      <ul className="space-y-1">
        {contacts.map((contact, index) => (
          <li key={index} className="flex items-center gap-3 p-2 hover:bg-[#3a3b3c] rounded-lg cursor-pointer transition-colors group">
            <div className="relative">
              {/* Avatar giả lập */}
               <div className={`w-9 h-9 rounded-full overflow-hidden border border-[#3a3b3c] ${contact.isBot ? 'bg-gradient-to-tr from-blue-500 to-purple-500 p-[2px]' : ''}`}>
                  <img 
                    src={`https://ui-avatars.com/api/?name=${contact.name.replace(" ", "+")}&background=random`} 
                    alt={contact.name}
                    className="w-full h-full object-cover rounded-full"
                  />
               </div>
              
              {/* Green Dot (Online Status) */}
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#18191a]"></div>
              )}
              {/* Thời gian nếu có */}
              {contact.time && (
                 <div className="absolute bottom-0 right-0 bg-[#242526] text-[10px] px-1 rounded text-green-500 font-bold border border-[#18191a]">
                    {contact.time}
                 </div>
              )}
            </div>
            
            <span className="text-[15px] font-medium text-[#e4e6eb] truncate">{contact.name}</span>
          </li>
        ))}
      </ul>
      
      {/* Nút Tạo nhóm chat mới (Floating Action Button style bottom right if needed) */}
      <div className="fixed bottom-4 right-4 w-12 h-12 bg-[#3a3b3c] hover:bg-[#4e4f50] rounded-full flex items-center justify-center cursor-pointer text-[#e4e6eb] shadow-lg border border-[#393a3b]">
         <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M7 11.5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2zM13 11.5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2zM19 11.5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-2a1 1 0 011-1h2a1 1 0 011 1v2z"></path></svg>
      </div>
    </div>
  );
};

export default RightSidebar;