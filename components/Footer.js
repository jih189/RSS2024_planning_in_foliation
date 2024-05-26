import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-100 py-4">
            <div className="container mx-auto flex justify-center items-center flex-col text-center">
                <p className="text-sm text-gray-600 mb-2">
                    © 2024 Motion Planning in Foliated Manifolds using Repetition Roadmap. This website is licensed under <a href={"https://creativecommons.org/licenses/by-sa/4.0/"}>CC BY-SA 4.0</a>.
                </p>
                <p className="text-sm text-gray-600 mb-2">
                    You are welcome to use this site's source code. Please credit us with a <a href={"https://github.com/jih189/RSS2024_planning_in_foliation"}> link </a>in your footer.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
