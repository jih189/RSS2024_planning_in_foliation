import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Demo = () => {
    const [playing, setPlaying] = useState(false);
    const playerRef = useRef(null);
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const jumpTo = (time) => {
        setPlaying(true);
        if (playerRef.current) {
            setTimeout(() => {
                playerRef.current.seekTo(time, 'seconds');
            }, 100);
        }
    };

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-4 text-left">
            <h2 className="text-5xl font-bold mb-8">Video</h2>
            <div className="flex">
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url="/demo.mp4"
                    width="1280px"
                    height="699px"
                    muted={false}
                    controls={true}
                    playing={playing}
                    playbackRate={1}
                    onPlay={() => setPlaying(true)}
                    onStart={() => {
                        setPlaying(true);
                    }}
                />}
            </div>

        </div>
    );
};

export default Demo;
