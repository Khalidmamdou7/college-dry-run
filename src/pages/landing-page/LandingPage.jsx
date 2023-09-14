import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div>
            <h1>Here is the ugliest College Schedule Maker (CUFE CHS Registration)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <a href="/dry-run" className={styles['button']}>Go to Dry Run</a>
        </div>
    );
};

export default LandingPage;