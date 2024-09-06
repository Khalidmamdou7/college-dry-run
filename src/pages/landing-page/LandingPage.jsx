import styles from './LandingPage.module.css';

import Footer from '../../generic-components/footer/Footer';

function LandingPage() {
    return (
        <div className={styles['landing-page-container']}>
            {/* <h1>Welcome to the ugliest College Schedule Maker (CUFE CHS Registration)</h1> */}
            <h1>Welcome to the Dry Run - تحت السلم  (CUFE CHS College Schedule Maker)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <button type="button" className='btn btn-primary' onClick={() => window.location.href = '/dry-run'}>Go to the Dry Run</button>

            <Footer />

        </div>
    );
};

export default LandingPage;