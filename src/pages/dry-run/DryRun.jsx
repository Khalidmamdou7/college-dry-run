import styles from './DryRun.module.css';

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
            <div className={styles['page-header']}>
                <h1>Dry Run تحت السلم</h1>
            </div>
            <div className={styles['page-content']} >
                <div className={styles['dry-run-container']} style={{ backgroundColor: 'white'}}>
                    <div className={styles['time-table-container']} >
                        <TimeTable timeslots={timeslots} />
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