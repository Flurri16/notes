import React from 'react'

export default function Statistic() {
    const notesCount = 10
    const wordsCount = 1213423
    const timeToRead = 23
    return (
        <div className='bg-indigo-800 flex flex-col gap-2 p-4 my-4 md:w-[55%] md:mx-auto mx-4'>
            <h1 className='text-white text-xl mb-2 md:text-3xl'>Statistic: </h1>
            <h1 className='text-white text-xl md:text-3xl'>Total notes 📅:<span className='text-indigo-300 float-right'>{notesCount}</span></h1>
            <h1 className='text-white text-xl md:text-3xl'> Words in this note: ✍️<span className='text-indigo-300 float-right'>{wordsCount}</span></h1>
            <h1 className='text-white text-xl md:text-3xl'> Time to read: ⏳ <span className='text-indigo-300 float-right'>{timeToRead} min</span></h1>
        </div>
    )
}
