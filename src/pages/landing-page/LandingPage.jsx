import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles['landing-page-container']}>
            <h1>Here is the ugliest College Schedule Maker (CUFE CHS Registration)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <button type="button" className='btn btn-primary' onClick={() => window.location.href = '/dry-run'}>Go to the Dry Run</button>
        </div>
    );
};

export default LandingPage;