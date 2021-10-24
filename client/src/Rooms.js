import React from 'react'

const rooms = [
    {
        name: "Threr"
    },
    {
        name: "Good Room"
    },
]

export default function Rooms({socket}) {
    return (
        <div>
            <div className="rooms">
                {rooms.map((room) => {
                    return <button>{room.name}</button>
                })}
            </div>
            
        </div>
    )
}
