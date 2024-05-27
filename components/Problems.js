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
        return <div>Error loading model.</div>;
    }

    return scene ? <primitive object={scene} scale={0.8} /> : null;
}

const Problems = () => {
    const [playing, setPlaying] = useState(true);
    const playerRef = useRef(null);
    const [modelName, setModelName] = useState('simple_1.glb');
    const problems = [
        { label: 'Sliding Cup', id: 1, description: "For Sliding Cup, each green plane is defined by sliding the cup with a certain grasp.", videoRange: [149, 157], model: "simple_1.glb" },
        { label: 'Pouring Water', id: 2, description: "For Pouring Water, horizontal planes with yellow, blue, red and green are defined by the different stages of pouring water. For all subsequent tasks, each purple plane represents re-grasping at intermediate placements.", videoRange: [159, 198], model: "seq_2.glb" },
        { label: 'Opening Bottle', id: 3, description: "For Opening Bottle, yellow and green planes are defined by rotating the lid with a certain grasp; each red plane is defined by the initial half of the rotation.", videoRange: [312, 410], model: "bottle.glb" },
        { label: 'Opening Door', id: 4, description: "For Opening Door, each green plane is defined by opening the door with a grasp.", videoRange: [244, 270], model: "cross.glb" },
        { label: 'Opening Drawer', id: 5, description: "For Opening Drawer, each green plane is defined by dragging the drawer with a grasp.", videoRange: [277, 310], model: "cross.glb" },
        { label: 'Navigating Maze', id: 6, description: "For Navigating Maze, each green plane is defined by sliding the cup with a grasp.", videoRange: [230, 241], model: "cross.glb" },
        { label: 'Rearranging Shelf', id: 7, description: "For Rearranging Shelf, blue, green, and yellow planes are defined by sliding the cup at different levels; each red plane is defined by lifting or lowering the first column of the cup between different heights.", videoRange: [211, 228], model: "shelf_1.glb" },
    ];
    const [currentRange, setCurrentRange] = useState(problems[0].videoRange);
    const [hasWindow, setHasWindow] = useState(false);
    const [description, setDescription] = useState(problems[0].description);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setHasWindow(true);
        }
    }, []);

    const handleProgress = ({ playedSeconds }) => {
        if (playedSeconds >= 17) {
            playerRef.current.seekTo(0, 'seconds');
        }
    };

    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/rss_all_probs.webm` : "/rss_all_probs.webm";

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 mt-8 text-center">
            <div className="flex justify-center">
                {hasWindow && <ReactPlayer
                    ref={playerRef}
                    url={videoUrl}
                    width="100%"
                    height="auto"
                    muted={true}
                    controls={false}
                    playing={true}
                    playbackRate={1}
                    loop={true}
                    onProgress={handleProgress}
                />
                }
            </div>
        </div>
    );
};

export default Problems;
