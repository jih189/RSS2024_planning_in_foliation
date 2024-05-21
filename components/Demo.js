import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = () => {
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

    const timeStamps = [
        { label: 'Concept of Foliation', time: 3 },
        { label: 'FoliatedRepMap Updating', time: 77 },
        { label: 'Limitation of FoliatedRepMap', time: 112 },
        { label: 'Our Approach', time: 124 },
        { label: 'Simulation Experiments', time: 149 },
        { label: 'Real World Experiments', time: 421 }
    ];

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <div className="flex">
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url="/demo.mp4"
                    width="1280px"
                    height="600px"
                    muted={true}
                    controls={false}
                    playing={playing}
                    playbackRate={1.2}
                    light={playing ? false : "/image.png"}
                    onPlay={() => setPlaying(true)}
                    onStart={() => {
                        setPlaying(true);
                    }}
                />}
            </div>
            <div className="flex flex-wrap justify-center items-center mt-4">
                {timeStamps.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => jumpTo(item.time)}
                        className="bg-transparent text-gray-800 font-semibold py-2 px-4 m-2 hover:bg-gray-200 hover:text-gray-900 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        {item.label}
                    </button>
                ))}
            </div>

        </div>
    );
};

export default VideoPlayer;