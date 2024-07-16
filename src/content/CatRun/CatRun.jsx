import { Dash } from './Dash';
import { useState } from 'react';
import style from './style/CatRun.module.css';

export function CatRun() {
    const [run, setRun] = useState(1);

    function switchMode() {
        if (run === 3) setRun(2);
        else setRun(run + 1);
    }

    return (
        <div className={style.container}>
            <div className={style.display}>
                {run === 1 ? (
                    <h1>Play!</h1>
                ) : 
                    <Dash switchMode={switchMode} />
                }
            </div>
            <button onClick={switchMode}>Click To Start!</button>
        </div>
    );
}
