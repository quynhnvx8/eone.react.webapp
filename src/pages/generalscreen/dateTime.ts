/** @format */

import { add0ToNumber } from "../../utils/add0ToNumber";

export function  formatDate(date: any) {
  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Pad month with leading zero
  let day = date.getDate().toString().padStart(2, '0'); // Pad day with leading zero

  return `${year}-${month}-${day}`;
}

export class DateTime {
	static getDate = (date: any) => {
		const newDate = new Date(date);

		return `${add0ToNumber(newDate.getDate())}/${add0ToNumber(
			newDate.getMonth() + 1
		)}/${newDate.getFullYear()}`;
	};

	static getFullTimeString = (date: number) => {
		const newDate = new Date(date);

		return `${add0ToNumber(newDate.getHours())}:${add0ToNumber(
			newDate.getMinutes()
		)} ${add0ToNumber(newDate.getDate())}/${add0ToNumber(
			newDate.getMonth() + 1
		)}/${newDate.getFullYear()}`;
	};
}
