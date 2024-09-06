import data from '../../data/reg-stat-data.json';

async function readTimeslots() {
    return data['timeslots']
}

async function readCourses() {
    return data['courses']
}

export const searchCourses = async (query) => {
    console.log('searching courses for query: ' + query);
    query = query.toLowerCase();
    let courses = await readCourses();

    let results = [];
    let resultsLimit = 10;
    for (let i = 0; i < courses.length; i++) {
        let course = courses[i].courseCode.toLowerCase() + ' ' + courses[i].courseName.toLowerCase();
        if (course.includes(query)) {
            results.push(courses[i]);
            if (results.length >= resultsLimit) {
                break;
            }
        }
    }
    console.log('found ' + results.length + ' results');
    console.log(results);
    return results;
}

export const getCoursesTimeslots = async (courses) => {
    console.log('getting timeslots for courses');
    let timeslots = await readTimeslots();

    let results = [];
    for (let i = 0; i < courses.length; i++) {
        let courseCode = courses[i].courseCode;
        for (let j = 0; j < timeslots.length; j++) {
            if (timeslots[j].courseCode === courseCode) {
                results.push(timeslots[j]);
            }
        }
    }
    console.log('found ' + results.length + ' results');
    console.log(results);
    return results;
}