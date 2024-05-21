import Head from '../components/Head';
import Footer from '../components/Footer';
import BibTeXDisplay from "../components/Citation";
import Abstract from "../components/Abstract";
import Video from "../components/Video";
import RealWorldExperiments from "../components/RealWorldExperiments";
import ProblemVisualization from "../components/Visualization";

export default function Home() {
    return (
        <div className="space-y-8">
            <Head/>
            <div className="mt-8">
                <Abstract/>
            </div>
            <div className="py-4 border-t border-gray-200">
                <Video/>
            </div>
            <div className="py-4 border-t border-gray-200">
                <ProblemVisualization />
                <RealWorldExperiments />
            </div>
            <div className="py-0.5 bg-gray-100">
                <BibTeXDisplay/>
                <Footer/>
            </div>
        </div>
    );
}
