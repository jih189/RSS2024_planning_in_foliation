import styles from '../styles/Navbar.module.css';
import { FaFileAlt, FaArrowsAlt, FaVideo, FaCode } from 'react-icons/fa';

const Navbar = () => {
    return (
        <div className={`${styles.navContainer} flex justify-center space-x-6 mt-12`}>
            <a href="/paper" className={styles.btn}>
                <FaFileAlt className={styles.icon} />Paper
            </a>
            <a href="/video" className={styles.btn}>
                <FaVideo className={styles.icon} />Video
            </a>
            <a href="/code" className={styles.btn}>
                <FaCode className={styles.icon} />Code
            </a>
        </div>
    );
};

export default Navbar;