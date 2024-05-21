import React, { useRef } from 'react';

const Citation = () => {
    const textRef = useRef(null);

    const handleCopy = () => {
        navigator.clipboard.writeText(textRef.current.innerText);
        alert('Copied to clipboard');
    };

    const handleDownload = () => {
        const element = document.createElement("a");
        const file = new Blob([textRef.current.innerText], {type: 'text/plain'});
        element.href = URL.createObjectURL(file);
        element.download = "citation.bib";
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="bg-gray-100 p-5 my-8 mx-auto max-w-4xl relative">
            <h2 className="text-xl font-semibold mb-4">BibTeX</h2>
            <pre className="bg-white p-4 shadow rounded text-sm font-mono" ref={textRef}>
                <code>
                    {`@inproceedings{
    hu2024efficient,
    title={Efficient Motion Planning in Foliated Manifolds},
    author={Hu, Jiaming and Iyer, Shrutheesh Raman and Wang, Jiawei and Christensen, Henrik I},
    booktitle={Robotics: Science and Systems},
    year={2024},
}`}
                </code>
            </pre>
            <div className="absolute top-5 right-5 flex space-x-2">
                <button onClick={handleCopy}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-1 px-1 text-xs rounded">
                    Copy
                </button>
                <button onClick={handleDownload}
                        className="bg-gray-300 hover:bg-gray-400 text-black font-medium py-1 px-1 text-xs rounded">
                    Download
                </button>
            </div>

        </div>
    );
};

export default Citation;
