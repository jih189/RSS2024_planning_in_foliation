import React, {useState, useRef, useEffect, Suspense} from 'react';
import ReactPlayer from 'react-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {

    const getModelURL = (model) => {
        return process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/${model}` : `/${model}`;
    }

    const { scene } = useGLTF(getModelURL('/seq.glb'));
    return <primitive object={scene} scale={0.5} />;
}

const ProblemVisualization = () => {
    const [playing, setPlaying] = useState(true);
    const playerRef = useRef(null);
    const problems = [
        { label: 'Sliding Cup', id: 1, description: "1", videoRange: [149, 157], model: "sc.obj" },
        { label: 'Pouring Water', id: 2, description: "1", videoRange: [159, 198], model: "rs.obj" },
    ];
    const [currentRange, setCurrentRange] = useState(problems[0].videoRange);
    const [hasWindow, setHasWindow] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    useEffect(() => {
        checkAndSeek(playerRef, currentRange[0]);
    }, [currentRange]);

    const checkAndSeek = (playerRef, start) => {
        if (playerRef.current) {
            setTimeout(() => playerRef.current.seekTo(start), 100);
            console.log("set to start")
        } else {
            setTimeout(() => checkAndSeek(playerRef, start), 500);
        }
    };

    const handleProgress = ({ playedSeconds }) => {
        if (playedSeconds >= currentRange[1]) {
            playerRef.current.seekTo(currentRange[0], 'seconds');
        }
    };

    const jumpTo = (range) => {
        setCurrentRange(range);
    };

    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/demo.mp4` : "/demo.mp4";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-4 text-left">
            <h2 className="text-5xl font-bold mb-3">Foliated Manifolds Problem</h2>
            <div className="flex flex-wrap justify-start mb-3">
                {problems.map((item, index) => (
                    <button
                        key={index}
                        onClick={() => jumpTo(item.videoRange)}
                        className="bg-transparent text-gray-800 font-semibold py-2 px-4 m-2 hover:bg-gray-200 hover:text-gray-900 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <p className="text-lg text-gray-700 text-justify">
                Each task with its abstract manifold structure. We group the tasks with a similar structure in the same color. Each plane represents an abstract manifold. In all tasks, the vertical planes represent the un-grasping manifolds, defined by placements, while the horizontal planes represent sliding/transporting manifolds, defined by grasp poses.
            </p>
            <div className="flex mt-8 justify-between">
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="49%"
                    height="350px"
                    muted={true}
                    controls={false}
                    playing={playing}
                    playbackRate={1}
                    loop={true}
                    onProgress={handleProgress}
                />
                }
                <div style={{height: '350px', width: '49%'}}>
                    <Canvas camera={{position: [2, 2, 2], fov: 60}}>
                        <ambientLight intensity={0.5} color="#ffffff"/>
                        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={0.8} color="#ffffff"/>
                        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ffffff"/>
                        <directionalLight position={[0, 10, 5]} intensity={0.5} color="#ffffff"/>
                        <Suspense fallback={null}>
                            <Model/>
                        </Suspense>
                        <OrbitControls target={[0, 0, 0.6]} enablePan={true} enableZoom={true}
                                       enableRotate={true}/>
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default ProblemVisualization;
