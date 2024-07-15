import { Dash } from './Dash';
import { useState } from 'react';
import style from './style/CatRun.module.css';

export function CatRun() {
    const [run, setRun] = useState(false);

    function startGame() {
        setRun(true);
    }

    return ( 
        <div className={style.container}>
            <div className={style.display}>
                { run ? 
                <Dash /> : 
                <button onClick={startGame}>Click To Start!</button>}
            </div>
        </div>
    )
}