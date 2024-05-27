import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';

const RealWorldExperiments = () => {
    const [playing, setPlaying] = useState(true);
    const playerLeftRef = useRef(null);
    const playerRightRef = useRef(null);
    const [hasWindow, setHasWindow] = useState(false);
    const leftVideoRange = [420, 438];
    const rightVideoRange = [440, 441.5];

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

        checkAndSeek(playerLeftRef, leftVideoRange[0]);
        checkAndSeek(playerRightRef, rightVideoRange[0]);
    }, []);

    const handleLeftProgress = ({ playedSeconds }) => {
        if (playedSeconds >= leftVideoRange[1]) {
            playerLeftRef.current.seekTo(leftVideoRange[0]);
        }
    };

    const handleRightProgress = ({ playedSeconds }) => {
        if (playedSeconds >= rightVideoRange[1]) {
            playerRightRef.current.seekTo(rightVideoRange[0]);
        }
    };

    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/demo.mp4` : "/demo.mp4";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 text-left">
            <h2 className="text-5xl font-bold mb-4">Real World Experiment</h2>
            <p className="text-lg text-gray-700 text-justify">
                To showcase the feasibility of our planner, we conducted
                real-world tests using a Fetch Robot to perform two tasks: opening a drawer and pouring water. We assume
                that the locations of objects involved in these tasks are known in advance. The number of manifolds and
                intersections are generated similar to the simulation experiments. As seen in the figure, the robot is
                capable of planning and executing these plans in the real world.
            </p>
            <div className="flex mt-8 justify-between">
                {hasWindow && <ReactPlayer
                    ref={playerLeftRef}
                    url={videoUrl}
                    width="49%"
                    height="auto"
                    muted={true}
                    controls={false}
                    playing={playing}
                    playbackRate={1}
                    loop={true}
                    onProgress={handleLeftProgress}
                />}
                {hasWindow && <ReactPlayer
                    ref={playerRightRef}
                    url={videoUrl}
                    width="49%"
                    height="auto"
                    muted={true}
                    controls={false}
                    playing={playing}
                    playbackRate={1}
                    loop={true}
                    onProgress={handleRightProgress}
                />}
            </div>
        </div>
    );
};

export default RealWorldExperiments;
