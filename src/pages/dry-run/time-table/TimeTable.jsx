import styles from './TimeTable.module.css';

function TimeTable() {

    const coursesTimeslots = [
        {
            courseCode: "CMPN111",
            courseName: "Logic II",
            group: "1",
            day: "Sunday",
            type: "Lecture",
            from: "8:00",
            to: "10:50",
            duration: "3",
            timeFrom8am: 0,
        },
        {
            courseCode: "CMPN303",
            courseName: "Operating Systems",
            group: "1",
            day: "Sunday",
            type: "Lecture",
            from: "8:00",
            to: "10:50",
            duration: "3",
            timeFrom8am: 0,
        },
        {
            courseCode: "CMPN303",
            courseName: "Operating Systems",
            group: "1",
            day: "Sunday",
            type: "Tutorial",
            from: "12:00",
            to: "14:50",
            duration: "3",
            timeFrom8am: 4,
        },
        {
            courseCode: "CMPN101",
            courseName: "Logic II",
            group: "1",
            day: "Monday",
            type: "Tutorial",
            from: "8:00",
            to: "9:50",
            duration: "2",
            timeFrom8am: 0,
        },
    ]

    // Add the courses to the timetable

    return (
        <div className='table-responsive'>
            <table className='table align-middle table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope="col" colSpan={12}>Sunday</th>
                    </tr>
                    <tr>
                        {
                            Array.from(Array(12).keys()).map((i) => {
                                return <th scope="col" key={i} className={styles['time-slot']}>{`${i + 8}:00 - ${i + 8}:50`}</th>
                                })
                            
                        }
                    </tr>
                </thead>
                <tbody name="sunday-timeslots">
                    {
                        coursesTimeslots.map((timeslot) => {
                            if (timeslot.day === "Sunday") {
                                return (
                                    <tr>
                                        {
                                            timeslot.timeFrom8am > 0 &&
                                            <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                        }
                                        <td colSpan={timeslot.duration} className={styles['table-cell']}>{timeslot.courseCode}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })
                    }
                </tbody>
            </table>

            <table className='table align-middle table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope="col" colSpan={12}>Monday</th>
                    </tr>
                    <tr>
                        {
                            Array.from(Array(12).keys()).map((i) => {
                                return <th scope="col" key={i} className={styles['time-slot']}>{`${i + 8}:00 - ${i + 8}:50`}</th>
                                })
                            
                        }
                    </tr>
                </thead>
                <tbody name="monday-timeslots">
                {
                        coursesTimeslots.map((timeslot) => {
                            if (timeslot.day === "Monday") {
                                return (
                                    <tr>
                                        {
                                            timeslot.timeFrom8am > 0 &&
                                            <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                        }
                                        <td colSpan={timeslot.duration} className={styles['table-cell']}>{timeslot.courseCode}</td>
                                    </tr>
                                )
                            }
                            return null;
                        })
                    }
                </tbody>
            </table>
            
        </div>

    );
}

export default TimeTable;