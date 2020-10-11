import React from 'react';
import './App.css';
import Timer from '../Timer/Timer'

interface Props {
    
}

const App = (props: Props) =>
{
    return (<div className='app-container'>
        <Timer />
    </div>)
    }

export default App
