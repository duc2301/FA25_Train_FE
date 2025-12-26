import { Search, Home, Tv, Store, Users, Gamepad2, Menu, MessageCircle, Bell, ChevronDown, User } from 'lucide-react';
import Logo from "../../../Shared/Assets/Icon/Fakebook_Icon.png";
import { useNavigate } from 'react-router-dom';
import { AuthService } from "../../../Features/Auth";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed top-0 left-0 right-0 h-14 bg-[#242526] border-b border-[#393a3b] flex items-center justify-between px-4 z-50">
      
      {/* LEFT: Logo & Search */}
      <div className="flex items-center gap-2">
        <img src={Logo} alt="FakeBook Logo" className="w-8 h-8 rounded-full" />
        <div className="relative hidden xl:block">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Tìm kiếm trên Facebook"
            className="bg-[#3a3b3c] text-gray-200 pl-10 pr-4 py-2 rounded-full w-64 focus:outline-none placeholder-gray-400 text-[15px]"
          />
        </div>
        {/* Mobile Search Icon */}
        <div className="xl:hidden w-10 h-10 bg-[#3a3b3c] rounded-full flex items-center justify-center text-gray-200">
            <Search className="w-5 h-5" />
        </div>
      </div>

      {/* CENTER: Navigation Icons */}
      <div className="hidden md:flex items-center gap-1 h-full">
        <NavItem Icon={Home} active />
        <NavItem Icon={Tv} />
        <NavItem Icon={Store} />
        <NavItem Icon={Users} />
        <NavItem Icon={Gamepad2} />
      </div>

      {/* RIGHT: User Actions */}
      <div className="flex items-center gap-2">
        <ActionBtn Icon={Menu} />
        <ActionBtn Icon={MessageCircle} />
        <ActionBtn Icon={Bell} />
        <div className="relative">
          <input id="avatar-toggle" type="checkbox" className="peer hidden" />
          <label htmlFor="avatar-toggle" className="w-10 h-10 flex justify-center items-center bg-gray-600 rounded-full cursor-pointer">
            <User className="w-6 h-6" />
          </label>

          <div className="absolute right-0 mt-2 w-44 bg-[#3a3b3c] rounded-md shadow-lg text-sm text-gray-200 hidden peer-checked:block">
            <a href="/profile" className="block px-4 py-2 hover:bg-[#4e4f50]">Profile</a>
            <button
              type="button"
              className="w-full text-left px-4 py-2 hover:bg-[#4e4f50]"
              onClick={() => {
                AuthService.logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


const NavItem = ({ Icon, active }) => (
  <div className={`h-full px-8 flex items-center cursor-pointer relative group ${active ? 'text-blue-500' : 'text-gray-400 hover:bg-[#3a3b3c] rounded-lg my-1'}`}>
    <Icon className={`w-7 h-7 ${active ? 'fill-current' : ''}`} strokeWidth={active ? 2.5 : 2} />
    {/* Tooltip ảo hoặc hiệu ứng hover */}
    {active && <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-blue-500 rounded-t-sm"></div>}
  </div>
);


const ActionBtn = ({ Icon }) => (
  <div className="w-10 h-10 bg-[#3a3b3c] hover:bg-[#4e4f50] rounded-full flex items-center justify-center text-gray-200 cursor-pointer transition-colors">
    <Icon className="w-5 h-5" />
  </div>
);

export default Navbar;