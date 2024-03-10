import React from 'react'
import ReactDOM from 'react-dom/client'
import { AvatarVisualizer } from './pages/AvatarVisualizer/AvatarVisualizer'

function App() {
    return (
        <>
        <AvatarVisualizer/>
        </>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App />
)