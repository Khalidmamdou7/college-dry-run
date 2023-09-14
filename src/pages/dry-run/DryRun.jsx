import styles from './DryRun.module.css';

import TimeTable from './time-table/TimeTable';

function DryRun() {
    return (
        <div className={styles['page-container']}>
            <div className={styles['page-header']}>
                <h1>Dry Run تحت السلم</h1>
            </div>
            <div className={styles['page-content']} >
                <div className={styles['dry-run-container']} style={{ backgroundColor: 'white'}}>
                    <div className={styles['time-table-container']} >
                        <TimeTable />
                    </div>
                </div>
                <div className={styles['courses-selector-container']} >
                </div>
            </div>
            
        </div>
    );
}

export default DryRun;