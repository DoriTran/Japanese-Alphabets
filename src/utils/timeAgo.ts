import moment from "moment";

const timeAgo = (timeString: string): string => {
  const now = moment();
  const past = moment(timeString);

  const duration = moment.duration(now.diff(past));
  const seconds = duration.asSeconds();

  if (seconds < 60) {
    return "now";
  }

  const minutes = duration.asMinutes();
  if (minutes < 60) {
    return `${Math.floor(minutes)} minutes ago`;
  }

  const hours = duration.asHours();
  if (hours < 24) {
    return `${Math.floor(hours)} hours ago`;
  }

  const days = duration.asDays();
  if (days < 7) {
    return `${Math.floor(days)} days ago`;
  }

  const weeks = duration.asWeeks();
  if (weeks < 4) {
    return `${Math.floor(weeks)} weeks ago`;
  }

  const months = duration.asMonths();
  if (months < 12) {
    return `${Math.floor(months)} months ago`;
  }

  const years = duration.asYears();
  if (Number.isInteger(years)) {
    return `${Math.floor(years)} years ago`;
  }
  return `${years.toFixed(1)} years ago`;
};

export default timeAgo;
