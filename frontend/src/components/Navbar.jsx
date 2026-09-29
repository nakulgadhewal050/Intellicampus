import { useState } from 'react'
import {Bell, ChevronDown, ChevronUp, Search} from 'lucide-react'
import { useSelector } from 'react-redux';

function Navbar() {
    const [showProflile, SetShowProfile] = useState(false)
    const { userData } = useSelector((state) => state.user);

  return (
    <nav className='bg-white shadow-sm border-b border-gray-200'>
        <div className='px-6 py-4 flex items-center justify-between'>
            {/**Search Bar */}
            <div className='flex-1 max-w-md'>
                <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5'/>
                    <input type="text"
                    placeholder='Search tickets, Knowledge base...' 
                    className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                    />
                </div>
            </div>
            {/**Right Section */}
            <div className='flex items-center gap-6 ml-6'> 
                <button className='relative text-gray-600 hover:text-gray-900 cursor-pointer'>
                    <Bell className='w-6 h-6'/>
                    <span className='absolute top-0 w-2 h-2 bg-red-600 rounded-full'>
                        
                    </span>
                </button>
                {/**Profile Dropdown */}
                <div className='relative'>
                    <button onClick={()=>SetShowProfile(!showProflile)}
                        className='flex items-center gap-3 hover:bg-gray-100 px-3 py-2 rounded-lg transition'
                        >
                        <div className='w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold'>
                            {userData.fullname.charAt(0).toUpperCase()}
                        </div>
                        <div className='text-left'>
                            <p className='text-sm font-semibold text-gray-900'>
                             {userData.fullname.charAt(0).toUpperCase()+userData.fullname.slice(1)}
                            </p>
                            <p className='text-xs text-gray-500'>
                                {userData.role}
                            </p>
                        </div>
                        {!showProflile?<ChevronDown className='w-4 h-4 text-gray-600'/>:<ChevronUp className='w-4 h-4 text-gray-600'/>}
                    </button>

                    {/**Dropdown Menu */}
                    {showProflile && (
                        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
                            <a href="#" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Profile Setting</a>
                            <a href="#" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Account</a>
                            <hr className='my-2'/>
                            <a href="#" className='block px-4 py-2 text-gray-700 hover:bg-gray-100'>Logout</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
  )
}

export default Navbar