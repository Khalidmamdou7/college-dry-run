import styles from './DryRun.module.css';

import TimeTable from './time-table/TimeTable';
import CourseSelector from './course-selector/CourseSelector';

function DryRun() {
    return (
        <div className={styles['page-container']}>
            <div className={styles['page-header']}>
                <h1>Here is the ugliest Dry Run</h1>
            </div>
            <div className={styles['page-content']}>
                <div className={styles['dry-run-container']}>
                    <div className={styles['time-table-container']}>
                        <TimeTable />
                    </div>
                </div>
                <div className={styles['courses-selector-container']}>
                    <CourseSelector />
                </div>
            </div>
            
        </div>
    );
}

export default DryRun;