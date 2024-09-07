import requests
from bs4 import BeautifulSoup
import sys

print("Step 1: Get the login page to retrieve the VIEWSTATE")
def get_login_page():
    url = 'https://chreg.eng.cu.edu.eg/login.aspx'
    session = requests.Session()
    response = session.get(url)

    print("Parsing the response to extract the VIEWSTATE...")
    soup = BeautifulSoup(response.text, 'html.parser')

    # Extract the __VIEWSTATE and other necessary hidden inputs
    viewstate = soup.find('input', {'name': '__VIEWSTATE'})['value']
    viewstate_generator = soup.find('input', {'name': '__VIEWSTATEGENERATOR'})['value']
    event_validation = soup.find('input', {'name': '__EVENTVALIDATION'})['value']

    print("VIEWSTATE:", viewstate)
    if viewstate is None:
        print("Failed to extract VIEWSTATE")
        sys.exit(1)

    return viewstate, viewstate_generator, event_validation

viewstate, viewstate_generator, event_validation = get_login_page()

print("Step 2: Send a POST request with the VIEWSTATE and login details")
def login(viewstate, viewstate_generator, event_validation):
    session = requests.Session()
    url = 'https://chreg.eng.cu.edu.eg/login.aspx?locked=true'
    import os
    username = os.getenv('USERNAME')
    password = os.getenv('PASSWORD')
    payload = {
        '__EVENTTARGET': 'ctl03',
        '__EVENTARGUMENT': 'Button1|event|Click',
        '__VIEWSTATE': viewstate,
        '__VIEWSTATEGENERATOR': viewstate_generator,
        '__EVENTVALIDATION': event_validation,
        'txtUsername': username,  # Replace with your username
        'txtPassword': password,  # Replace with your password
    }

    headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Referer': url
    }

    # Submit the POST request to log in
    login_response = session.post(url, data=payload, headers=headers)
    print("Response URL:", login_response.url)
    print("Response status code:", login_response.status_code)
    # print("Response text:", login_response.text)

    if login_response.url == 'https://chreg.eng.cu.edu.eg/SIS/Default.aspx':
        print("Login successful")
    else:
        print("Login failed")
        sys.exit(1)

    return session

session = login(viewstate, viewstate_generator, event_validation)

print("Step 3: Scrape the registration status report")
def get_reg_status_report():
    report_url = "https://chreg.eng.cu.edu.eg/SIS/Default.aspx?_dc=1725662314528"

    # Headers for the report request
    status_headers = {
        'Host': 'chreg.eng.cu.edu.eg',
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:129.0) Gecko/20100101 Firefox/129.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br, zstd',
        'X-Ext.Net': 'delta=true',
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Referer': 'https://chreg.eng.cu.edu.eg/SIS/Default.aspx',
        'Connection': 'keep-alive',
    }

    # Data payload for the request
    status_data = {
        'submitDirectEventConfig': '{"config":{"extraParams":{"WindowID":"win_17","ControlPath":"~/SIS/Modules/Student/RegistrationStatus/RegistrationStatus.ascx"}}}',
        '__EVENTTARGET': 'ResourceManager1',
        '__EVENTARGUMENT': '-|public|LoadWindowControl',
        '__VIEWSTATE': viewstate,
        '__VIEWSTATEGENERATOR': viewstate_generator,
        '__EVENTVALIDATION': event_validation,
    }

    # Make the POST request to get the registration status
    status_response = session.post(report_url, headers=status_headers, data=status_data)

    # Handle the response (status_response.text will contain the HTML or data you're looking for)
    if status_response.status_code == 200:
        print("Registration status report retrieved successfully")
    else:
        print("Failed to retrieve registration status report")
        sys.exit(1)
    
    return status_response

status_response = get_reg_status_report()


print("Step 4: Parse the response to extract the registration status data")
def parse_reg_status_report(response):    
    soup = BeautifulSoup(response, 'html.parser')

    # Find all rows in the table
    table_rows = soup.find_all('tr')

    # Extract each row's data
    data = []
    for row in table_rows:
        columns = row.find_all('td')
        column_data = [col.get_text(strip=True) for col in columns]  # Get text from each column
        if len(column_data) > 0:
            data.append(column_data)

    print("Extracted " + str(len(data)) + " rows of data")
    if len(data) == 0:
        print("No data extracted")
        sys.exit(1)

    # timestamp is located in the date column of each row
    timestamp = data[0][-1]
    normalized_timestamp = timestamp.replace(":", "-")
    normalized_timestamp = timestamp.replace("/", "-")
    normalized_timestamp = timestamp.replace(" ", "_")
    # print("Step 5: Dump the extracted data into a CSV file")
    # import csv

    # # header = id,Code,Name,Group,Type,Day,From,To,Class Size,Enrolled,Waiting,Status,Location,Date
    # header = ["id", "Code", "Name", "Group", "Type", "Day", "From", "To", "Class Size", "Enrolled", "Waiting", "Status",
    #         "Location", "Date"]

    # filename = "output_" + timestamp + ".csv"
    # # the file should be new one with the new timestamp
    # with open(filename, 'w', newline='') as file:
    #     writer = csv.writer(file)
    #     writer.writerow(header)
    #     writer.writerows(data)
    # print("Data extracted and saved to " + filename)
    return data, timestamp, normalized_timestamp

data, timestamp, normalized_timestamp = parse_reg_status_report(status_response.text)

print("Step 6: Clean the data to get courses and timeslots")
import re
import json
from utils import from_12hrs_to_24hrs, caclulate_time_from_8am, calculate_duration

def clean_data(data):
    timeslots = []
    courses = set()
    for row in data:
        courseCode = row[1]
        courseCode = re.sub(r'[\.\s_]', '', courseCode)
        courseName = row[2]
        timeslotGroup = row[3]
        timslotType = row[4]
        timslotType = re.sub(r'[\.\s_]', '', timslotType)
        timeslotDay = row[5]
        timeslotFrom = row[6]
        timeslotFrom = re.sub(r'[\.\s_]', '', timeslotFrom)
        timeslotFrom = from_12hrs_to_24hrs(timeslotFrom)
        timeslotTo = row[7]
        timeslotTo = re.sub(r'[\.\s_]', '', timeslotTo)
        timeslotTo = from_12hrs_to_24hrs(timeslotTo)
        duration = calculate_duration(timeslotFrom, timeslotTo)
        timeFrom8am = caclulate_time_from_8am(timeslotFrom)
        timeslotSize = row[8]
        timeslotSize = re.sub(r'[\.\s_]', '', timeslotSize)
        timeslots.append([courseCode, courseName, timeslotGroup, timslotType, timeslotDay, timeslotFrom, timeslotTo, timeFrom8am, duration, timeslotSize])
        courses.add(courseCode + ' :: ' + courseName)
    return timeslots, courses

timeslots, courses = clean_data(data)
print("I have extracted " + str(len(timeslots)) + " timeslots from the csv file.")
print("I have extracted " + str(len(courses)) + " courses from the csv file.")

print("Writing to json file...")
with open('./src/data/reg-stat-data.json', 'w') as json_file:
    data = {}
    data['timeslots'] = []
    data['courses'] = []
    for timeslot in timeslots:
        data['timeslots'].append({
            'courseCode': timeslot[0],
            'courseName': timeslot[1],
            'timeslotGroup': timeslot[2],
            'timslotType': timeslot[3],
            'timeslotDay': timeslot[4],
            'timeslotFrom': timeslot[5],
            'timeslotTo': timeslot[6],
            'timeFrom8am': timeslot[7],
            'duration': timeslot[8],
            'timeslotSize': timeslot[9]
        })
    for course in courses:
        courseCode = course.split(' :: ')[0]
        courseName = course.split(' :: ')[1]
        data['courses'].append({
            'courseCode': courseCode,
            'courseName': courseName
        })
    json.dump(data, json_file)


print("Done for the timestamp " + timestamp + "!")
print("Step 7: Update the timestamp in the .env file")
with open('./.env', 'w') as env_file:
    env_file.write("REACT_APP_DATA_TIMESTAMP=" + timestamp)

print("Well done boooooooooooys!")




