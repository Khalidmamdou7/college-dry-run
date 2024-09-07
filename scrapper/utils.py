def from_12hrs_to_24hrs(time):
    hrs = int(time.split(':')[0])
    mins = time.split(':')[1]
    if hrs < 8:
        hrs += 12
    return str(hrs) + ':' + mins

def caclulate_time_from_8am(time):
    hrs = int(time.split(':')[0])
    mins = int(time.split(':')[1])
    return int((hrs - 8))

def calculate_duration(from_time, to_time):
    from_hrs = int(from_time.split(':')[0])
    to_hrs = int(to_time.split(':')[0])
    # ciel the duration
    duration = int((to_hrs - from_hrs) + 1)
    return duration
    
