import moment from "moment";

export default function getAppropriateGreeting(): string {
  const currentHour = Number(moment().format("HH"));

  if (currentHour < 12) {
    return "Good Morning";
  } else if (currentHour >= 12 && currentHour < 15) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
}
