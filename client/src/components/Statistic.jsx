import React from 'react'

export default function Statistic() {
    const notesCount = 10
    const wordsCount = 1213423
    const timeToRead = 23
    return (
        <div className='bg-indigo-800 mx-4 p-4'>
            <h1 className='text-white text-xl mb-2'>Statistic: </h1>
            <h1 className='text-white text-xl'>Total notes 📅:<span className='text-indigo-300 float-right'>{notesCount}</span></h1>
            <h1 className='text-white text-xl'> Words in this note: ✍️<span className='text-indigo-300 float-right'>{wordsCount}</span></h1>
            <h1 className='text-white text-xl'> Time to read: ⏳ <span className='text-indigo-300 float-right'>{timeToRead} min</span></h1>
        </div>
    )
}
