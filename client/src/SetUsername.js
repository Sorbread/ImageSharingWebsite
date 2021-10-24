import React from 'react'

export default function SetUsername({changeUsername,submit}) {
    return (
        <div className="username">
            <input type="text" placeholder="Wumpus..." onChange={changeUsername} onKeyPress={(ev) => {ev.key === "Enter" && submit()}}/>
        </div>
    )
}
