export default function filterDate(value, format = "date") {
  const options = {};

  if (format.includes("date")) {
    options.day = "2-digit";
    options.month = "long";
    options.year = "numeric"
  }
  if (format.includes("time")) {
    options.hour = options.minute = options.second = "2-digit";
  }

  return Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
