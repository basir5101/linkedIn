import React from 'react'
import Feed from './Feed'
import Sidebar from './Sidebar'
import Widget from './Widget'

export default function Home() {
    return (
        <div className="app_body">
            <Sidebar />
            <Feed />
            <Widget />
        </div>
    )
}
