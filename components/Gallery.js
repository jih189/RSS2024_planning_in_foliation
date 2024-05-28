import React, { useState } from 'react';

const Gallery = () => {
    const [showDescription1, setShowDescription1] = useState({ img1: false, img2: false, img3: false });
    const [showDescription2, setShowDescription2] = useState({ img1: false, img2: false, img3: false });

    const descriptions_1 = {
        img1: "GMM Self-collision-free space roadmap construction. Starting with self-collision-free trajectories, we partition the waypoints to create a GMM. From this GMM, we create a roadmap that incorporates these self-collision-free paths. This step is independent of any task or environment.",
        img2: "FoliatedRepMap construction. Based on abstract manifolds and intersections of the task, the GMM roadmap is duplicated for each abstract manifold, and connections between them are maintained through the intersection list I",
        img3: "Given start and goal configurations from different manifolds, an optimal node sequence (orange) is returned and divided into a sequence of motion tasks segmented by manifold intersections"
    };

    const descriptions_2 = {
        img1: "Updating process in one foliation. For abstract manifold of M, its roadmap node weights are increased based on the number of both valid (green dots) and invalid (red dots) sampled configurations from all abstract manifolds from the same foliation, such as M_1 and M_2. In this figure, due to the higher similarity between M and M_2, the weights in M are impacted more by the sampled configurations from M_2. In this figure, the darker color represents higher weight.",
    };

    const descriptions_3 = {
        img1: "Updating process in one foliation. For abstract manifold of M, its roadmap node weights are increased based on the number of both valid (green dots) and invalid (red dots) sampled configurations from all abstract manifolds from the same foliation, such as M_1 and M_2. In this figure, due to the higher similarity between M and M_2, the weights in M are impacted more by the sampled configurations from M_2. In this figure, the darker color represents higher weight.",
        img2: "Given a thin actual manifold (yellow curve), after motion planning, a set of projected valid configurations (green dots) and invalid configurations (red) are returned. FoliatedRepMap constructs each node's atlas (dark blue lines) from the projected valid configurations. While planning in manifold M, assume the FoliatedRepMap produces a list of nodes (green ellipses) as guidance. It extracts the Atlas from related nodes from all manifolds in that foliation, such as M_1 and M_2, and combines them into one atlas (orange line segments) to estimate the actual manifold.",
    };

    return (
        <>
            <div className="max-w-7xl mx-auto px-4 py-8 text-left">
                <h2 className="text-5xl font-bold mb-4">Planning in Foliated Manifolds</h2>
                <p className="text-lg text-gray-700 text-justify">
                    Our study introduces the <strong>FoliatedRepMap</strong>, a framework designed to incorporate motion
                    planning experience collected from prior foliated manifolds and continuously update itself after
                    each motion planning iteration.
                </p>
                <div className="flex mt-8 justify-between">
                    {Object.entries(descriptions_1).map(([key, desc], index) => (
                        <div className="relative"
                             onMouseEnter={() => setShowDescription1({[key]: true})}
                             onMouseLeave={() => setShowDescription1({[key]: false})}>
                            <img
                                src={`/image${index + 1}.png`}
                                alt={`Image ${index + 1}`}
                                className="h-64"
                            />
                            {showDescription1[key] && (
                                <div className="absolute top-0 left-0 bg-white p-4 shadow-lg">
                                    <p className="text-sm">{desc}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 text-left">
                <h2 className="text-3xl font-bold mb-4">Updating Foliated Repetition Roadmap</h2>
                <p className="text-lg text-gray-700 text-justify">
                    After motion planning in a foliated manifold, FoliatedRepMap must be updated by the sampled data in
                    this manifold as experience to guide the planning step in the next iteration.
                </p>
                <div className="flex mt-8 justify-center gap-6">
                    {Object.entries(descriptions_2).map(([key, desc], index) => (
                        <div className="relative"
                             onMouseEnter={() => setShowDescription2({[key]: true})}
                             onMouseLeave={() => setShowDescription2({[key]: false})}>
                            <img
                                src={`/a${index + 1}.png`}
                                alt={`a ${index + 1}`}
                                className="h-64"
                            />
                            {showDescription2[key] && (
                                <div className="absolute top-0 left-0 bg-white p-4 shadow-lg">
                                    <p className="text-sm">{desc}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
        ;
};

export default Gallery;
