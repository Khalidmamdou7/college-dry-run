import styles from './TimeTable.module.css';
import React, { useState } from 'react';

function TimeTable() {

    const [selectedCourses, setSelectedCourses] = useState([]);
    const [hoveredCourseCode, setHoveredCourseCode] = useState(null);
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

    const getSameCodeCourses = (courseCode) => {
        return coursesTimeslots.filter((course) => course.courseCode === courseCode);
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

    const daysOfWeek = ['Saturday','Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    return (
        <div className='table-responsive' style={{ backgroundColor: '#99CCFF'}}>
            <div className="row">
                {daysOfWeek.map((day, index) => (
                    <div className="col-md-6"style={{ margin: '0', padding: '0' }} key={index}>
                        <table className='table align-middle table-bordered table-hover' >
                            <thead>
                                <tr className={styles['table-header']}>
                                    <th scope="col" colSpan={12} style={{ border: '1px solid black', backgroundColor: '#f0f0f0', fontWeight: 'bold', textAlign: 'center' }}>{day}</th>
                                </tr>

                                <tr>
                                    {Array.from(Array(12).keys()).map((i) => (
                                        <th scope="col" key={i} className={styles['time-slot']}>
                                            {`${i + 8}:00 - ${i + 8}:50`}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody name={`${day.toLowerCase()}-timeslots`}>
                                {coursesTimeslots.map((timeslot) => {
                                    const courseIdentifier = `${timeslot.courseCode}-${timeslot.day}-${timeslot.group}-${timeslot.from}-${timeslot.to}`;
                                    const isSelected = selectedCourses.includes(courseIdentifier);
                                    const selectedCellStyle = isSelected ? { backgroundColor: '#22FF22' } : {};
                                    const isHovered = hoveredCourseCode === timeslot.courseCode;
                                    const courseCellStyle = {
                                        ...selectedCellStyle,
                                        fontSize: '10px',
                                        height: '15px',  
                                        fontWeight: 'bold',
                                        border: isHovered ? '2px solid red' : 'none'
     
                                    };

                                    if (timeslot.day === day) {
                                        return (
                                            <tr key={courseIdentifier}
                                            onMouseEnter={() => setHoveredCourseCode(timeslot.courseCode)} // Set hover course code
                                            onMouseLeave={() => setHoveredCourseCode(null)}
                                            >
                                                {timeslot.timeFrom8am > 0 && (
                                                    <td colSpan={timeslot.timeFrom8am} className={styles['blank-table-cell']}></td>
                                                )}
                                                <td
                                                    colSpan={timeslot.duration}
                                                    style={courseCellStyle}
                                                    className={`${styles['table-cell']} ${isSelected ? styles['selected-course'] : ''}`}
                                                    onClick={() =>
                                                        toggleCourseSelection(
                                                            timeslot.courseCode,
                                                            timeslot.day,
                                                            timeslot.group,
                                                            timeslot.from,
                                                            timeslot.to
                                                        )
                                                    }
                                                >
                                                    {timeslot.courseCode} - {timeslot.courseName} - {timeslot.type}
                                                </td>
                                            </tr>
                                        );
                                    }
                                    return null;
                                })}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TimeTable;

