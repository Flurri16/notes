import React from 'react'

export default function Main() {
    const date = new Date().toLocaleDateString();
    return (
        <div className='bg-indigo-800 flex flex-col justify-between mx-4 px-4 my-4 md:w-[55%] md:mx-auto'>
            <div className="flex justify-between my-2">
                <h1 className='text-white text-xl md:text-3xl'>Today is: </h1>
                <span className='text-indigo-300 pl-4 flex items-end'>{date}</span>
            </div>
            <textarea className='bg-indigo-500 w-full min-h-32 p-2 placeholder-indigo-200 border-2 border-indigo-200 rounded mb-4 text-indigo-100 md:text-2xl' placeholder='Describe your day: 😊'></textarea>
            <h1 className='text-white text-xl md:text-3xl my-2'>What is your mood today?? 🤔</h1>
            <select className='bg-indigo-500 w-full p-2 placeholder-indigo-200 border-2 text-indigo-200 border-indigo-200 rounded'>
                <option className='text-indigo-200' value="happy">Happy 😊</option>
                <option className='text-indigo-200' value="sad">Sad 😢</option>
                <option className='text-indigo-200' value="angry">Angry 😠</option>
                <option className='text-indigo-200' value="excited">Excited 🤩</option>
                <option className='text-indigo-200' value="anxious">Anxious 😰</option>
            </select>
            <div className="flex items-center my-4">
                <h1 className='text-xl md:text-3xl text-white'>Is this day important for you? 🤨</h1>
                <input type="checkbox" className='w-5 h-5 ml-4 accent-indigo-500'/>
            </div>
            <div className="flex gap-10 pb-4">
                <button className='bg-red-500 text-white text-xl md:text-3xl p-2 rounded w-full'>Delete note</button>
                <button className='bg-indigo-500 text-white text-xl md:text-3xl p-2 rounded w-full'>Clear</button>
                <button className='bg-indigo-600 text-white text-xl md:text-3xl p-2 rounded w-full'>Save Note</button>
            </div>
        </div>
    )
}
