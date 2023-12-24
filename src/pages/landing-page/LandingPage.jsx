import styles from './LandingPage.module.css';

function LandingPage() {
    return (
        <div className={styles['landing-page-container']}>
            {/* <h1>Welcome to the ugliest College Schedule Maker (CUFE CHS Registration)</h1> */}
            <h1>Welcome to the Dry Run - تحت السلم  (CUFE CHS College Schedule Maker)</h1>
            <p>It's ugly, but it works. Not like the real one.</p>
            <button type="button" className='btn btn-primary' onClick={() => window.location.href = '/dry-run'}>Go to the Dry Run</button>

            <div className={styles['landing-page-footer']}>

                <p>Based on registration status report 24/12/2023 2:30 PM</p>
                {/* <p>Special thanks to Yousif Ismail for collecting the data</p> */}
                <p>Developed by <a href="https://www.linkedin.com/in/khalidmamdou7/" target='_blank' rel="noreferrer">Khaled Mamdouh</a> and <a href="https://www.instagram.com/o.al.sharif/" target='_blank' rel="noreferrer">Omar Al Sharif</a></p>
                <p>Feel free to contribute to the <a href="https://github.com/Khalidmamdou7/college-dry-run">Github Repository</a></p>
            </div>

        </div>
    );
};

export default LandingPage;