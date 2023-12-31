import styles from './DryRun.module.css';
import img from './registration.png';
import { useState } from 'react';


import TimeTable from './time-table/TimeTable';
import CourseSelector from './course-selector/CourseSelector';

function DryRun() {

    const [timeslots, setTimeslots] = useState([]);

    const handleCoursesChange = async (timeslots) => {
        await setTimeslots(timeslots)
    }




    return (
        <div className={styles['page-container']}>
            <div className={styles['page-header']} style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <img src={img} alt=" " style={{ marginLeft: '300px' }} />
                <h1 style={{ marginLeft: '30px' }}> Dry Run تحت السلم</h1>
            </div>
            <div className={styles['page-content']} >
                <div className={styles['dry-run-container']} style={{ backgroundColor: 'white' }}>
                    <div className={styles['time-table-container']} >
                        <TimeTable timeslots={timeslots} />
                    </div>
                    {/* <p>Based on the data sent on pdfs at 21/12/2023</p>
                    <p>Special thanks to Yousif Ismail for collecting the data</p> */}
                    <div className={styles['landing-page-footer']}>

                        <p>Based on registration status report 24/12/2023 2:30 PM</p>
                        {/* <p>Special thanks to Yousif Ismail for collecting the data</p> */}
                        <p>Developed by <a href="https://www.linkedin.com/in/khalidmamdou7/" target='_blank' rel="noreferrer">Khaled Mamdouh</a> and <a href="https://www.instagram.com/o.al.sharif/" target='_blank' rel="noreferrer">Omar Al Sharif</a></p>
                        <p>Feel free to contribute to the <a href="https://github.com/Khalidmamdou7/college-dry-run">Github Repository</a></p>
                    </div>
                </div>
                <div className={styles['courses-selector-container']}>
                    <CourseSelector handleCoursesChange={handleCoursesChange} />
                </div>
            </div>

        </div>
    );
}

export default DryRun;