import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Video = () => {
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
                setPlaying(true);
                playerRef.current.seekTo(time, 'seconds');
            }, 100);
        }
    };

    const timeStamps = [
        { label: 'Concept of Foliation', time: 3 },
        { label: 'FoliatedRepMap Construction', time: 23 },
        { label: 'FoliatedRepMap Updating', time: 77 },
        { label: 'Sampling from Atlas', time: 110 },
        { label: 'Experiments', time: 149 },
    ];

    const formatTime = (seconds) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
    };

    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/demo.mp4` : "/demo.mp4";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-2 text-left">
            <h2 className="text-5xl font-bold mb-4">Video</h2>
            <div className="flex flex-wrap justify-left items-center">
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
            <div className="flex justify-center items-center mt-8">
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="1250px"
                    height="700px"
                    muted={true}
                    controls={true}
                    playing={playing}
                    playbackRate={1.0}
                    // light={playing ? false : "/image.png"}
                    onPlay={() => setPlaying(true)}
                    onStart={() => {
                        setPlaying(true);
                        playerRef.current.seekTo(20, 'seconds');
                    }}
                />}
            </div>
        </div>
    );
};

export default Video;
