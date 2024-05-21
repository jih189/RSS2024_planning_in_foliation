const Abstract = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 mt-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Abstract</h2>
            <p className="text-lg text-gray-700 text-justify">
                Numerous classes of robotics motion planning problems involve searching in constrained configuration
                spaces where the constraints change during different stages of the motion, and these kinds of motion
                planning problems are named multi-modal problems. The most common method to solve these problems is to
                represent them as a set of manifolds and search for a trajectory across them. Often, instead of using
                manifolds alone, foliated manifolds, which are a union of disjoint manifolds, are a better way to model
                the manipulation problem. However, the complexity of planning in foliated manifolds is significant due
                to the increased number of manifolds, hard task constraints, and complex environments. To tackle these
                challenges, we propose an efficient planning framework that leverages a dynamic roadmap structure to
                learn from accumulated experience acquired during previous planning attempts in similar foliated
                manifolds. When planning in a new foliated manifold, this experience, captured in configuration distributions
                and an atlas, which are tangential charts approximating the new manifold with constraints, is effectively
                utilized to guide motion planning. We demonstrate the framework's performance for manipulation problems
                with different foliated manifold structures in simulation and real-world scenarios.
            </p>
        </div>
    );
};

export default Abstract;
