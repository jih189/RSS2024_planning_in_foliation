import Head from 'next/head';
import Navbar from "./Navbar";
import Demo from "./Demo";
import { FaChevronDown } from 'react-icons/fa';

const PageHead = () => {
    return (
        <>
            <Head>
                <title>Motion Planning in Foliated Manifolds using Repetition Roadmap</title>
            </Head>
            <div
                className={`flex justify-center items-center bg-white min-h-screen max-h-screen transition-all duration-1000 ease-in-out`}>
                <div className="text-center">
                    <h1 className="text-5xl font-bold text-gray-900">Motion Planning in Foliated Manifolds using
                        Repetition Roadmap</h1>
                    <p className="text-xl text-gray-700 mt-4">Robotics: Science and Systems (RSS) 2024</p>
                    <p className="text-md text-gray-600 mt-4">
                        <a href="https://jih189.github.io/" className="hover:underline">Jiaming Hu<sup>1*</sup></a>,
                        <span> </span>
                        <a href="https://shrutheeshir.github.io/" className="hover:underline">Shrutheesh Raman
                            Iyer<sup>1,2*</sup></a>,
                        <span> </span>
                        <a href="https://jwjoel.com/" className="hover:underline">Jiawei Wang<sup>1</sup></a>,
                        <span> </span>
                        <a href="https://hichristensen.com/" className="hover:underline">Henrik I
                            Christensen<sup>1</sup></a>
                    </p>
                    <p className="text-sm text-gray-500 mt-1"><sup>1</sup>University of California, San
                        Diego, <sup>2</sup>Aurora Operations, Inc</p>
                    <Navbar/>

                </div>
                <div className="w-full h-14 bg-gradient-to-t from-gray-300 to-transparent absolute bottom-0 flex justify-center">
                    <FaChevronDown className="text-gray-400 text-2xl animate-bounce mt-6 opacity-60" />
                </div>
            </div>
        </>
    );
};

export default PageHead;
