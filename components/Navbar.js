import styles from '../styles/Navbar.module.css';
import { FaFileAlt, FaArrowsAlt, FaVideo, FaCode } from 'react-icons/fa';

const Navbar = () => {
    const videoUrl = process.env.NEXT_PUBLIC_BASE_PATH ? `${process.env.NEXT_PUBLIC_BASE_PATH}/demo.mp4` : "/demo.mp4";

    return (
        <div className={`${styles.navContainer} flex justify-center space-x-6 mt-8`}>
            <a href="https://roboticsconference.org/" className={styles.btn}>
                <FaFileAlt className={styles.icon} />Paper
            </a>
            <a href={videoUrl} className={styles.btn}>
                <FaVideo className={styles.icon} />Video
            </a>
            <a href="https://github.com/jih189/RSS2024_planning_in_foliation" className={styles.btn}>
                <FaCode className={styles.icon} />Code
            </a>
        </div>
    );
};

export default Navbar;