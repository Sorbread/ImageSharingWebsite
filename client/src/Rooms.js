import React from 'react'

const rooms = [
    {
        name: "Threr",
        id: 1,
    },
    {
        name: "Good Room",
        id: 2,
    },
]

export default function Rooms({setroom}) {
    const onClick = () => {
        setroom(1);
    };

    return (
        <div>
            <div className="rooms">
                {rooms.map((room) => {
                    return <button onClick={onClick}>{room.name}</button>
                })}
            </div>
            
        </div>
    )
}
