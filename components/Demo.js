import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const Demo = () => {
    const playerRef = useRef(null);
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }

        const checkAndSeek = (playerRef, start) => {
            console.log("Still checking...")
            if (playerRef.current) {
                setTimeout(() => playerRef.current.seekTo(start), 100);
                console.log("set to start")
            } else {
                setTimeout(() => checkAndSeek(playerRef, start), 500);
            }
        };

        checkAndSeek(playerRef, 21);
    }, []);

    const handleProgress = ({ playedSeconds }) => {
        if (playedSeconds >= 71) {
            playerRef.current.seekTo(22);
        }
    };

    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/demo.mp4` : "/demo.mp4";

    return (
        <div className="flex flex-col items-center justify-center mt-12">
            <div className={`flex`}>
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="900px"
                    height="500px"
                    muted={true}
                    controls={false}
                    playing={true}
                    playbackRate={1.5}
                    onProgress={handleProgress}
                />}
            </div>
        </div>
    );
};

export default Demo;
