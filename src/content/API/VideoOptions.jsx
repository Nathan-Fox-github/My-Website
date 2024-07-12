import style from './style/API.module.css';
import { VideoOption } from './VideoOption';

export function VideoOptions( { options, handleSelection } ) {
    let videos = options[0];

    return (
        <>
            {videos === undefined ?
                <h1 className={style.header}>Search Something!</h1> :

                <ul className={style.optionList}>
                    {
                        videos.map(option => {
                            return (
                                <VideoOption key={crypto.randomUUID()} video={option} handleSelection={handleSelection} />
                            )
                        })}
                </ul>
            }
        </>
    )
}