import YouTube from 'react-youtube';
import style from './style/API.module.css';
import { VideoOptions } from './VideoOptions';
import { ButtonPanel } from './ButtonPanel';
import { useState } from 'react';

export function API() {
    const [options, setOptions] = useState([]);
    const [video, changeVideo] = useState('M7lc1UVf-VE');

    const opts = {
        height: '780',
        width: '1280',
        playerVars: {
            autoplay: 1,
        },
    };

    function _onReady(event) {
        event.target.pauseVideo();
    }

    function handleSelection(videoID) {
        changeVideo(videoID)
    }

    function scroll() {
        window.scrollTo(0, 100);
    }

    return (
        <div className={style.container}>
            <div className={style.border}>
                <div className={style.content}>
                    <YouTube videoId={video} opts={opts} onReady={_onReady} />

                    <ButtonPanel setOptions={setOptions} />

                    <VideoOptions options={options} handleSelection={handleSelection} />
                </div>
            </div>

            <div onClick={scroll} className={style.scrollBtn}>
                <h3>To Screen</h3>
            </div>
        </div>
    )
}