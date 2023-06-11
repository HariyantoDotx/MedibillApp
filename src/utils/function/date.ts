export const dateValidate = (data: any) => {
  if (!data) {
    return false;
  }
  const split = data.split('-');

  const day = split[0];
  const month = split[1];
  const year = split[2];

  if ((year && year.length) || year < 1000 || year > 3500) {
    return false;
  }
  if (month < 0 || month > 12) {
    return false;
  }
  if (day < 0 || day > 31) {
    return false;
  }
  return true;
};

export const timestampToDate = (timestamp?: number) => {
  const newTime = timestamp || Date.now();
  const year = new Date(newTime).getFullYear();
  const month =
    new Date(newTime).getMonth() < 10
      ? `0${new Date(newTime).getMonth() + 1}`
      : new Date(newTime).getMonth() + 1;
  const date =
    new Date(newTime).getDate() < 10
      ? `0${new Date(newTime).getDate()}`
      : new Date(newTime).getDate();
  const newValue = `${date}/${month}/${year}`;
  return newValue;
};

export const timestampToTime = (timestamp: any) => {
  const hour = timestamp.getHours();
  const minute = timestamp.getMinutes();
  const newValue = `${hour}:${minute}`;
  return newValue;
};

export const formatDate = (fullDate: Date | string) => {
  if (fullDate) {
    const timestamp = new Date(fullDate);
    const year = timestamp.getFullYear();
    const month =
      timestamp.getMonth() < 10
        ? `0${timestamp.getMonth() + 1}`
        : timestamp.getMonth() + 1;
    const date =
      timestamp.getDate() < 10
        ? `0${timestamp.getDate()}`
        : timestamp.getDate();
    const newValue = `${date}/${month}/${year}`;
    return newValue;
  } else {
    return '';
  }
};

export const mounth = (date: any) => {
  let month;

  switch (Number(date.split('-')[0])) {
    case 1:
      month = 'January';
      break;
    case 2:
      month = 'February';
      break;
    case 3:
      month = 'March';
      break;
    case 4:
      month = 'April';
      break;
    case 5:
      month = 'May';
      break;
    case 6:
      month = 'June';
      break;
    case 7:
      month = 'July';
      break;
    case 8:
      month = 'August';
      break;
    case 9:
      month = 'September';
      break;
    case 10:
      month = 'October';
      break;
    case 11:
      month = 'November';
      break;
    case 12:
      month = 'December';
      break;
  }

  const result = `${month} ${date.split('-')[1]}`;

  return result;
};

export const getDateFormat = (value: string) => {
  const s = value.split('/');
  const data = new Date(`${s[2]}-${s[1]}-${s[0]}`);
  return data;
};

export const ddmmyyyyToyyyymmdd = (value: string) => {
  const s = value.split('/');
  return `${s[2]}-${s[1]}-${s[0]}`;
};

export const yyyymmddToddmmyyyy = (value: string) => {
  const s = value.split('-');
  return `${s[2]}/${s[1]}/${s[0]}`;
};
