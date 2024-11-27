import React from 'react'

function Navbar() {
    return (
        <>
            <nav className='flex justify-between align-middle text-white text-lg bg-blue-900'>
                <div className="logo mx-2">
                    Task Manager
                </div>
                <ul className='flex gap-3 mx-2 hover:cursor-pointer '>
                    <li className='hover:underline decoration-slate-300 hover:font-bold transition-all '>Home</li >
                    <li className='hover:underline decoration-slate-300 hover:font-bold transition-all'>About</li >
                    <li className='hover:underline decoration-slate-300 hover:font-bold transition-all'>More</li >
                </ul>
            </nav>
        </>
    )
}

export default Navbar
