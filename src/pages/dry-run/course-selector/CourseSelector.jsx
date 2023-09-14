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
        // remove courses that are already selected
        results = results.filter(course => !courses.includes(course));
        setSearchResults(results);

    }

    const handleAddCourse = async (course) => {
        if (courses.includes(course)) {
            return;
        }
        setCourses([...courses, course]);
        setSearchResults(searchResults.filter(c => c !== course));
        let timeslots = await getCoursesTimeslots([...courses, course]);
        props.handleCoursesChange(timeslots)
    }

    const handleRemoveCourse = async (course) => {
        setCourses(courses.filter(c => c !== course));
        let timeslots = await getCoursesTimeslots(courses.filter(c => c !== course));
        props.handleCoursesChange(timeslots)
    }

    return (
        <div className={styles['container']}>
            <div className={styles['header']}>
                <h2>Course Selector</h2>
                <input type="text" placeholder="Search for courses" value={search} onChange={handleSearchChange} className='form-control' />
                <div className={styles['search-results']}>
                    <table className="table table-striped table-hover">
                        <tbody className={styles['search-results-item']}>
                        {/* {searchResults.map(course => (
                            <li key={course.courseCode}>
                                <p>{course.courseCode + ' ' + course.courseName}</p>
                                <button onClick={() => handleAddCourse(course)} type="button" className='btn btn-primary'>Add</button>
                            </li>
                        ))} */}
                        {searchResults.map(course => (
                            <tr>
                                <td className={styles['search-results-item-name']}>
                                    {course.courseCode + ' ' + course.courseName}
                                </td>
                                <td className={styles['search-results-item-add']}>
                                    <button onClick={() => handleAddCourse(course)} type="button" className='btn btn-primary'>Add</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                </div>
            </div>
            <div className={styles['content']}>
                <div className={styles['list']}>
                    <table className="table table-striped table-hover">
                        <tbody className={styles['list-item']}>
                            {courses.map(course => (
                                <tr>
                                    <td className={styles['list-item-name']}>
                                        {course.courseCode + ' ' + course.courseName}
                                    </td>
                                    <td className={styles['list-item-remove']}>
                                        <button onClick={() => handleRemoveCourse(course)} type="button" className='btn btn-danger'>Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default CourseSelector;