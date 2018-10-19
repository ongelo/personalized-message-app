/*
    @param timezone,
    Returns the proper timezone name for toLocaleString function
*/
export function getTimeZone(timezone) {
    if(timezone === 'US/Pacific') {
    return 'America/Los_Angeles';
    } else if(timezone === 'US/Central') {
    return 'America/Chicago';
    } else if(timezone === 'US/Eastern') {
    return 'America/New_York';
    }
}

/*
    @param company_timezone, timestamp
    Converts given timestamp to string based on company_timezone
    Returns the MM/DD/YYYY formatted date as a string
*/
export function getDateString(company_timezone, timestamp) {
    const date = new Date(timestamp * 1000);
    const timezone = getTimeZone(company_timezone); // set timezone based on company location
    var dateTimeZoned = date.toLocaleString('en-US', { timeZone: timezone, hour12: false }); // convert date Object to string based on timezone
    dateTimeZoned = dateTimeZoned.split(',')[0];

    return dateTimeZoned;
}

/*
    @param timezone, start_timestamp, end_timestamp
    Converts (via getDateString) start date and end date to string in given timezone
    Returns an object of startDate and endDate
*/
export function getStartEndDates(timezone, start_timestamp, end_timestamp) {
    const startDate = getDateString(timezone, start_timestamp);
    const endDate = getDateString(timezone, end_timestamp);

    return { startDate, endDate }
} 