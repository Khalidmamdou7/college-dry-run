import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles['landing-page-container']}>
            <h1>Here is the ugliest College Schedule Maker (CUFE CHS Registration)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <button type="button" className='btn btn-primary' onClick={() => window.location.href = '/dry-run'}>Go to the Dry Run</button>

            <div className={styles['landing-page-footer']}>

                <p>Based on the latest Registration Status Report Data: 7:30 pm 14/9</p>
                <p>Developed by <a href="https://www.linkedin.com/in/khalidmamdou7/">Khaled Mamdouh</a> and <a href="https://www.linkedin.com/in/omar-al-sharif/">Omar Al Sharif</a></p>
                <p>Feel free to contribute to the <a href="https://github.com/Khalidmamdou7/college-dry-run">Github Repository</a></p>
            </div>

        </div>
    );
};

export default LandingPage;