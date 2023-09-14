import styles from './TimeTable.module.css';
import React, { useState } from 'react';

function TimeTable() {

    const [selectedCourses, setSelectedCourses] = useState([]);
    const toggleCourseSelection = (courseCode, day, group, from, to) => {
        const courseIdentifier = `${courseCode}-${day}-${group}-${from}-${to}`;
        setSelectedCourses((prevSelectedCourses) => {
            // Check if the course is already selected
            if (prevSelectedCourses.includes(courseIdentifier)) {
                // If selected, remove it from the list
                return prevSelectedCourses.filter((code) => code !== courseIdentifier);
            } else {
                // If not selected, add it to the list
                return [...prevSelectedCourses, courseIdentifier];
            }
        });
    };
    const coursesTimeslots = [
        {
            courseCode: "CMPN391",
            courseName: "Operating Systems",
            group: "1",
            day: "Wednesday",
            type: "Tutorial",
            from: "12:00",
            to: "14:50",
            duration: "3",
            timeFrom8am: 4,
        },
        {
            courseCode: "CMPN391",
            courseName: "Operating Systems",
            group: "1",
            day: "Tuesday",
            type: "Tutorial",
            from: "12:00",
            to: "15:50",
            duration: "4",
            timeFrom8am: 4,
        },
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
            courseCode: "CMPN301",
            courseName: "Operating Systems",
            group: "1",
            day: "Thursday",
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
                    {coursesTimeslots.map((timeslot) => {
                        const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                        const isSelected = selectedCourses.includes(courseIdentifier);
                        if (timeslot.day === "Sunday") {
                            return (
                                <tr key={courseIdentifier}>
                                    {
                                        timeslot.timeFrom8am > 0 &&
                                        <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                    }
                                    <td
                                        colSpan={timeslot.duration}
                                        className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                        onClick={() => toggleCourseSelection(timeslot.courseCode, timeslot.day, timeslot.group, timeslot.from, timeslot.to)}
                                    >
                                        {timeslot.courseCode}
                                    </td>
                                </tr>
                            );
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
                    {coursesTimeslots.map((timeslot) => {
                        const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                        const isSelected = selectedCourses.includes(courseIdentifier);
                        if (timeslot.day === "Monday") {
                            return (
                                <tr key={courseIdentifier}>
                                    {
                                        timeslot.timeFrom8am > 0 &&
                                        <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                    }
                                    <td
                                        colSpan={timeslot.duration}
                                        className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                        onClick={() => toggleCourseSelection(timeslot.courseCode, timeslot.day, timeslot.group, timeslot.from, timeslot.to)}
                                    >
                                        {timeslot.courseCode}
                                    </td>
                                </tr>
                            );
                        }

                        return null;
                    })
                    }
                </tbody>

            </table>

            <table className='table align-middle table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope="col" colSpan={12}>Tuesday</th>
                    </tr>
                    <tr>
                        {
                            Array.from(Array(12).keys()).map((i) => {
                                return <th scope="col" key={i} className={styles['time-slot']}>{`${i + 8}:00 - ${i + 8}:50`}</th>
                            })

                        }
                    </tr>
                </thead>
                <tbody name="tuesday-timeslots">
                    {coursesTimeslots.map((timeslot) => {
                        const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                        const isSelected = selectedCourses.includes(courseIdentifier);
                        if (timeslot.day === "Tuesday") {
                            return (
                                <tr key={courseIdentifier}>
                                    {
                                        timeslot.timeFrom8am > 0 &&
                                        <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                    }
                                    <td
                                        colSpan={timeslot.duration}
                                        className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                        onClick={() => toggleCourseSelection(timeslot.courseCode, timeslot.day, timeslot.group, timeslot.from, timeslot.to)}
                                    >
                                        {timeslot.courseCode}
                                    </td>
                                </tr>
                            );
                        }

                        return null;
                    })
                    }
                </tbody>

            </table>


            <table className='table align-middle table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope="col" colSpan={12}>Wednesday</th>
                    </tr>
                    <tr>
                        {
                            Array.from(Array(12).keys()).map((i) => {
                                return <th scope="col" key={i} className={styles['time-slot']}>{`${i + 8}:00 - ${i + 8}:50`}</th>
                            })

                        }
                    </tr>
                </thead>
                <tbody name="wednesday-timeslots">
                    {coursesTimeslots.map((timeslot) => {
                        const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                        const isSelected = selectedCourses.includes(courseIdentifier);
                        if (timeslot.day === "Wednesday") {
                            return (
                                <tr key={courseIdentifier}>
                                    {
                                        timeslot.timeFrom8am > 0 &&
                                        <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                    }
                                    <td
                                        colSpan={timeslot.duration}
                                        className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                        onClick={() => toggleCourseSelection(timeslot.courseCode, timeslot.day, timeslot.group, timeslot.from, timeslot.to)}
                                    >
                                        {timeslot.courseCode}
                                    </td>
                                </tr>
                            );
                        }

                        return null;
                    })
                    }
                </tbody>

            </table>

            <table className='table align-middle table-bordered table-hover'>
                <thead>
                    <tr>
                        <th scope="col" colSpan={12}>Thursday</th>
                    </tr>
                    <tr>
                        {
                            Array.from(Array(12).keys()).map((i) => {
                                return <th scope="col" key={i} className={styles['time-slot']}>{`${i + 8}:00 - ${i + 8}:50`}</th>
                            })

                        }
                    </tr>
                </thead>
                <tbody name="thursday-timeslots">
                    {coursesTimeslots.map((timeslot) => {
                        const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                        const isSelected = selectedCourses.includes(courseIdentifier);
                        if (timeslot.day === "Thursday") {
                            return (
                                <tr key={courseIdentifier}>
                                    {
                                        timeslot.timeFrom8am > 0 &&
                                        <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                    }
                                    <td
                                        colSpan={timeslot.duration}
                                        className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                        onClick={() => toggleCourseSelection(timeslot.courseCode, timeslot.day, timeslot.group, timeslot.from, timeslot.to)}
                                    >
                                        {timeslot.courseCode}
                                    </td>
                                </tr>
                            );
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