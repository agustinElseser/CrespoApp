export const getDateFirstDate = (date:any) => {
    const dateInString = date.toISOString();
    const startIndex = dateInString.lastIndexOf('-') + 1;
    const FirstDateString =
      dateInString.slice(0, startIndex) +
      '01' +
      dateInString.slice(startIndex + 2, dateInString.length);
    const firstDate = new Date(FirstDateString);

    return firstDate;
  }
