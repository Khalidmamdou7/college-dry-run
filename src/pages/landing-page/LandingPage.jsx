import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles['landing-page-container']}>
            <h1>Here is the ugliest College Schedule Maker (CUFE CHS Registration)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <button type="button" className='btn btn-primary' onClick={() => window.location.href = '/dry-run'}>Go to the Dry Run</button>

            <p style={{ marginTop: '32px', color: 'grey'}}>Based on the latest Registration Status Report Data: 7:00 pm 14/9</p>
            <p style={{ color: 'grey'}}>Developed by <a href="https://www.linkedin.com/in/khalidmamdou7/">Khaled Mamdouh</a> and <a href="https://www.linkedin.com/in/omar-al-sharif/">Omar Al Sharif</a></p>
        </div>
    );
};

export default LandingPage;