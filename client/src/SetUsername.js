import React from 'react'

export default function SetUsername({changeUsername}) {
    return (
        <div className="username">
            <input type="text" placeholder="Wumpus..." onChange={changeUsername}/>
        </div>
    )
}
