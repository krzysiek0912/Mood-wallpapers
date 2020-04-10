export const firstfunc = () => {};
export const objectValueToString = (objects) => {
    if (!objects) return '';
    return objects
        .map((obj) => {
            return obj.value;
        })
        .join(' ')
        .trim();
};
export const defaultSearchOptions = () => {
    const hour = new Date().getHours();
    const month = new Date().getMonth();
    const searchOptions = {
        timeOfDay: [],
        timeOfYear: [],
    };

    if (month >= 1 && month < 3) {
        searchOptions.timeOfYear.push({ label: 'Winter', vabel: 'Winter' });
    } else if (month >= 3 && month < 5) {
        searchOptions.timeOfYear.push({ label: 'Spring', value: 'Spring' });
    } else if (month >= 5 && month < 9) {
        searchOptions.timeOfYear.push({ label: 'Summer', value: 'Summer' });
    } else {
        searchOptions.timeOfYear.push({ label: 'Autumn', value: 'Autumn' });
    }

    if (hour < 12 && hour > 4) {
        searchOptions.timeOfDay.push({ label: 'Morning', value: 'Morning' });
    } else if (hour > 12 && hour < 19) {
        searchOptions.timeOfDay.push({ label: 'Afternoon', value: 'Afternoon' });
    } else if (hour > 19 && hour < 23) {
        searchOptions.timeOfDay.push({ label: 'Evening', value: 'Evening' });
    } else {
        searchOptions.timeOfDay.push({ label: 'Night', value: 'Night' });
    }

    return searchOptions;
};

export const changeParamsToString = (searchParams) => {
    const { timeOfDay, timeOfYear, customText = '', weather, place } = searchParams;
    const timeOfDayToString = timeOfDay ? objectValueToString(timeOfDay) : '';
    const timeOfYearToString = timeOfYear ? objectValueToString(timeOfYear) : '';
    const placeString = place ? objectValueToString(place) : '';
    const weatherString = weather ? objectValueToString(weather) : '';

    const searchString = `${timeOfDayToString} ${timeOfYearToString} ${weatherString} ${placeString} ${customText}`
        .trim()
        .replace(/\s\s+/g, ' ');
    return searchString;
};
