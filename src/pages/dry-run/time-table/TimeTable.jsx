import styles from './TimeTable.module.css';
import React, { useState } from 'react';

function TimeTable(props) {

    const [selectedTimeslots, setSelectedTimeslots] = useState([]);
    const [hoveredCourseCode, setHoveredCourseCode] = useState(null);
    const [mustBeSelectedTimeslots, setMustBeSelectedTimeslots] = useState([]);


    const updateMustBeSelectedTimeslots = (courseCode, timeslotType) => {
        if (!isCourseTimeslotsSelected(courseCode) || isBothLectureAndTutorialSelected(courseCode)) {
            setMustBeSelectedTimeslots((prevMustBeSelectedTimeslots) => {
                // Remove the timeslots of the same course and same type
                return prevMustBeSelectedTimeslots.filter((timeslotId) => {
                    const [code] = timeslotId.split('-');
                    return code !== courseCode
                });
            })
        }

        setMustBeSelectedTimeslots((prevMustBeSelectedTimeslots) => {
            // Remove the timeslots of the same course and same type
            return prevMustBeSelectedTimeslots.filter((timeslotId) => {
                const [code, type] = timeslotId.split('-');
                return code !== courseCode && type === timeslotType;
            });
        });

        if (!isOtherTypeTimeslotSelected(courseCode, timeslotType)) {
            let otherTypeTimeslotsIds = getOtherTypeTimeslotsIds(courseCode, timeslotType);
            setMustBeSelectedTimeslots((prevMustBeSelectedTimeslots) => {
                return [...prevMustBeSelectedTimeslots, ...otherTypeTimeslotsIds];
            });
        }
    }

    const isCourseTimeslotsSelected = (courseCode) => {
        console.log(getOtherTypeTimeslotsIds(courseCode, 'Lecture'))
        console.log(getOtherTypeTimeslotsIds(courseCode, 'Tutorial'))
        let courseTimeslotsIds = [...getOtherTypeTimeslotsIds(courseCode, 'Lecture'), ...getOtherTypeTimeslotsIds(courseCode, 'Tutorial')];
        console.log(typeof(courseTimeslotsIds))
        console.log(courseTimeslotsIds)
        return courseTimeslotsIds.some((timeslotId) => selectedTimeslots.includes(timeslotId));
    }

    const isBothLectureAndTutorialSelected = (courseCode) => {
        let lectureTimeslotsIds = getOtherTypeTimeslotsIds(courseCode, 'Lecture');
        let tutorialTimeslotsIds = getOtherTypeTimeslotsIds(courseCode, 'Tutorial');
        // check if both lecture and tutorial are selected
        return lectureTimeslotsIds.every((timeslotId) => selectedTimeslots.includes(timeslotId)) &&
            tutorialTimeslotsIds.every((timeslotId) => selectedTimeslots.includes(timeslotId));
    }

    const isOtherTypeTimeslotSelected = (courseCode, timeslotType) => {
        let otherTypeTimeslotsIds = getOtherTypeTimeslotsIds(courseCode, timeslotType);
        // check if any of the other type timeslots are selected or there is no other type timeslot
        return otherTypeTimeslotsIds.some((timeslotId) => selectedTimeslots.includes(timeslotId));
    }

    const getOtherTypeTimeslotsIds = (courseCode, timeslotType) => {
        let sameCourseTimeslots = getSameCodeCourses(courseCode);
        const otherTypeTimeslots = sameCourseTimeslots.filter((timeslot) => timeslot.timslotType !== timeslotType);
        const otherTypeTimeslotsIds = otherTypeTimeslots.map((timeslot) => {
            return getTimeslotIdentifier(timeslot.courseCode, timeslot.timslotType, timeslot.timeslotDay, timeslot.timeslotGroup, timeslot.timeslotFrom, timeslot.timeslotTo);
        });
        return otherTypeTimeslotsIds;
    }

    const toggleTimeslotSelection = (courseCode, timeslotType, day, group, from, to) => {
        const courseIdentifier = getTimeslotIdentifier(courseCode, timeslotType, day, group, from, to);
        setSelectedTimeslots((prevSelectedTimeslots) => {
            // Check if the course is already selected
            if (prevSelectedTimeslots.includes(courseIdentifier)) {

                return prevSelectedTimeslots.filter((code) => code !== courseIdentifier);
            } else {

                // Only one lecture/tut of a course can be selected
                prevSelectedTimeslots = prevSelectedTimeslots.filter((timeslotIdentifier) => {
                    const [code, type] = timeslotIdentifier.split('-');
                    return code !== courseCode || (code === courseCode && type !== timeslotType);
                });
                
                return [...prevSelectedTimeslots, courseIdentifier];
            }
        });
        updateMustBeSelectedTimeslots(courseCode, timeslotType);

    };

    const getSameCodeCourses = (courseCode) => {
        return coursesTimeslots.filter((course) => course.courseCode === courseCode);
    };
    const coursesTimeslots =  props.timeslots;

    const getTimeslotIdentifier = (courseCode, timeslotType, timeslotDay, timeslotGroup, timeslotFrom, timeslotTo) => {
        return `${courseCode}-${timeslotType}-${timeslotDay}-${timeslotGroup}-${timeslotFrom}-${timeslotTo}`;
    };
    

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
                                    const courseIdentifier = getTimeslotIdentifier(timeslot.courseCode, timeslot.timslotType, timeslot.timeslotDay, timeslot.timeslotGroup, timeslot.timeslotFrom, timeslot.timeslotTo);
                                    const isSelected = selectedTimeslots.includes(courseIdentifier);
                                    const isTutorial = timeslot.timslotType === 'Tutorial';
                                    const backgroundColor = isSelected ? '#22FF22' : isTutorial ? '#c4fdff' : '#ffff01';
                                    const isHovered = hoveredCourseCode === timeslot.courseCode;
                                    const courseCellStyle = {
                                        fontSize: '10px',
                                        height: '15px',  
                                        fontWeight: 'bold',
                                        backgroundColor: backgroundColor,
                                        border: isHovered ? '2px solid red' : 'none',
                                    };

                                    if (timeslot.timeslotDay === day) {
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
                                                        toggleTimeslotSelection(
                                                            timeslot.courseCode,
                                                            timeslot.timslotType,
                                                            timeslot.timeslotDay,
                                                            timeslot.timeslotGroup,
                                                            timeslot.timeslotFrom,
                                                            timeslot.timeslotTo,
                                                        )
                                                    }
                                                >
                                                    {timeslot.courseCode} - {timeslot.timslotType}
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

