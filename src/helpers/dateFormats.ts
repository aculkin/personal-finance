import { format, formatDistance } from "date-fns";

const MONTH_DAY_YEAR_FORMAT = "MMM do, yyyy";
const SUPABASE_DATE_FORMAT = "yyyy-MM-dd";

const monthDayYear = (date: Date | string) => {
	if (typeof date === "string") {
		return format(new Date(date), MONTH_DAY_YEAR_FORMAT);
	}
	return format(date, MONTH_DAY_YEAR_FORMAT);
};

const timeAgo = (date: Date | string) => {
	if (typeof date === "string") {
		return formatDistance(new Date(), new Date(date)) + " ago";
	}
	return formatDistance(new Date(), date) + " ago";
};

const supabaseFormat = (date: Date | string) => {
	if (typeof date === "string") {
		return format(new Date(date), SUPABASE_DATE_FORMAT);
	}
	return format(date, SUPABASE_DATE_FORMAT);
};

export { monthDayYear, timeAgo, supabaseFormat };
