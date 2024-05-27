import React, {useState, useRef, useEffect, Suspense} from 'react';
import ReactPlayer from 'react-player';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import {MeshStandardMaterial} from "three";

function Model({ modelName }) {
    const getModelURL = (model) => {
        return process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/${model}` : `/${model}`;
    };

    const [scene, setScene] = useState();
    const { scene: loadedScene, error } = useGLTF(getModelURL(modelName));

    useEffect(() => {
        if (loadedScene) {
            const newScene = loadedScene.clone();
            newScene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new MeshStandardMaterial({
                        color: child.material.color,
                        transparent: true,
                        opacity: 0.85,
                        emissive: child.material.color,
                        emissiveIntensity: 0.05,
                        roughness: 0.9,
                        metalness: 0.1
                    });
                }
            });
            setScene(newScene);
        }
    }, [loadedScene]);

    if (error) {
        console.error("Failed to load model:", error);
        return <div>Error loading model.</div>;
    }

    return scene ? <primitive object={scene} scale={0.8} /> : null;
}

const ProblemVisualization = () => {
    const [playing, setPlaying] = useState(true);
    const playerRef = useRef(null);
    const [modelName, setModelName] = useState('simple_1.glb');
    const problems = [
        { label: 'Sliding Cup', id: 1, description: "For Sliding Cup, each green plane is defined by sliding the cup with a certain grasp.", videoRange: [149, 157], model: "simple_1.glb" },
        { label: 'Pouring Water', id: 2, description: "For Pouring Water, horizontal planes with different colors are defined by the different stages of pouring water. For all subsequent tasks, each purple plane represents re-grasping at intermediate placements.", videoRange: [159, 198], model: "seq_2.glb" },
        { label: 'Opening Bottle', id: 3, description: "For Opening Bottle, yellow and green planes are defined by rotating the lid with a certain grasp; each red plane is defined by the initial half of the rotation.", videoRange: [312, 410], model: "bottle.glb" },
        { label: 'Opening Door', id: 4, description: "For Opening Door, each green plane is defined by opening the door with a grasp.", videoRange: [244, 270], model: "cross.glb" },
        { label: 'Opening Drawer', id: 5, description: "For Opening Drawer, each green plane is defined by dragging the drawer with a grasp.", videoRange: [277, 310], model: "cross.glb" },
        { label: 'Navigating Maze', id: 6, description: "For Navigating Maze, each green plane is defined by sliding the cup with a grasp.", videoRange: [230, 241], model: "cross.glb" },
        { label: 'Rearranging Shelf', id: 6, description: "For Rearranging Shelf, Blue, green, and yellow planes are defined by sliding the cup at different levels; each red plane is defined by lifting or lowering the first column of the cup between different heights.", videoRange: [211, 228], model: "shelf_1.glb" },
    ];
    const [currentRange, setCurrentRange] = useState(problems[0].videoRange);
    const [hasWindow, setHasWindow] = useState(false);
    const [description, setDescription] = useState(problems[0].description);

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
                        onClick={() => {
                                jumpTo(item.videoRange)
                                setModelName(item.model)
                                setDescription(item.description)
                            }
                        }
                        className="bg-transparent text-gray-800 font-semibold py-2 px-4 m-2 hover:bg-gray-200 hover:text-gray-900 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-110"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <p className="text-lg text-gray-700 text-justify">
                Each task with its abstract manifold structure. We group the tasks with a similar structure in the same color. Each plane represents an abstract manifold. In all tasks, the vertical planes represent the un-grasping manifolds, defined by placements, while the horizontal planes represent sliding/transporting manifolds, defined by grasp poses. {description}
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
                            <Model key={modelName} modelName={modelName}/>
                        </Suspense>
                        <OrbitControls target={[0, 0, 0]} enablePan={true} enableZoom={true}
                                       enableRotate={true}/>
                    </Canvas>
                </div>
            </div>
        </div>
    );
};

export default ProblemVisualization;
