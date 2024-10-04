export enum ScheduleDay {
	MONDAY = "monday",
	TUESDAY = "tuesday",
	WEDNESDAY = "wednesday",
	THURSDAY = "thursday",
	FRIDAY = "friday",
	SATURDAY = "saturday",
	SUNDAY = "sunday",
}

export class Schedule {
	readonly day: ScheduleDay;
	readonly begin: string;
	readonly end: string;

	constructor(day: ScheduleDay, begin: string, end: string) {
		this.day = day;
		this.begin = begin;
		this.end = end;
	}

	isValidInterval() {

		const _toMinutes = (time: string) => {
			const [hours, minutes] = time.split(":");
			return Number.parseInt(minutes) + Number.parseInt(hours) * 60;
		};

		return _toMinutes(this.end) - _toMinutes(this.begin) >= 15;
	}
}
