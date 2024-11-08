import styles from './DryRun.module.css';
import img from './registration.png';
import { useState } from 'react';


import TimeTable from './time-table/TimeTable';
import CourseSelector from './course-selector/CourseSelector';
import Footer from '../../generic-components/footer/Footer';

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
                    <div className={styles['footer-container']}>
                        <Footer />
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