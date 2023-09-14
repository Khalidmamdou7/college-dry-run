import React, { useState, useEffect } from 'react';
import styles from './CourseSelector.module.css';

import { searchCourses, getCoursesTimeslots } from '../services.js';

function CourseSelector(props) {

    const [search, setSearch] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [courses, setCourses] = useState([]);

    const handleSearchChange = async (event) => {
        setSearch(event.target.value);
        if (event.target.value === '') {
            setSearchResults([]);
            return;
        }
        let results = await searchCourses(event.target.value);
        setSearchResults(results);

    }

    const handleAddCourse = async (course) => {
        if (courses.includes(course)) {
            return;
        }
        setCourses([...courses, course]);
        let timeslots = await getCoursesTimeslots([...courses, course]);
        props.handleCoursesChange(timeslots)
    }

    const handleRemoveCourse = async (course) => {
        setCourses(courses.filter(c => c !== course));
        let timeslots = await getCoursesTimeslots(courses.filter(c => c !== course));
        props.handleCoursesChange(timeslots)
    }

    return (
        <div className={styles['courses-selector-container']}>
            <div className={styles['courses-selector-header']}>
                <h2>Course Selector</h2>
                <input type="text" placeholder="Search for courses" value={search} onChange={handleSearchChange} />
                <div className={styles['courses-selector-search-results']}>
                    <ul>
                        {searchResults.map(course => (
                            <li key={course.courseCode}>
                                <p>{course.courseCode + ' ' + course.courseName}</p>
                                <button onClick={() => handleAddCourse(course)} type="button" className='btn btn-primary'>Add</button>
                            </li>
                        ))}

                    </ul>
                </div>
            </div>
            <div className={styles['courses-selector-content']}>
                <div className={styles['courses-selector-list']}>
                    {courses.map(course => (
                        <div className={styles['courses-selector-list-item']} key={course.courseCode}>
                            <div className={styles['courses-selector-list-item-name']}>
                                {course.courseCode + ' ' + course.courseName}
                            </div>
                            <div className={styles['courses-selector-list-item-remove']}>
                                <button onClick={() => handleRemoveCourse(course)}>Remove</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CourseSelector;