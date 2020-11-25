import {format, formatDistanceStrict } from "date-fns";

/* Combine a number of classes removing undefined values
 * @param {string} styles A list of classes to compose together
 */
export const composeClasses = (
  ...styles: (string | boolean | undefined)[]
): string => styles.filter((item) => item).join(" ");

export const formatPhoneNumber = (phoneNo: string) => {
  let formattedPhoneNo: string = phoneNo;
  // currently accepting only +234 numbers
  const isValidNumber = /^[+]?[234][0-9]{12}$/;
  const startsWithPlus = /^\+/;
  // const startsWithZero =/^0/
  const isLocalNumber = /^0[789][01]\d{8}$/;
  const isLocalWithoutZero = /^[789][01]\d{8}$/;
  const isLandLine = /^0?[0-9]{8}$/;
  if (isLocalNumber.test(phoneNo)) {
    // remove 0
    let remaining = phoneNo.slice(1, phoneNo.length);
    formattedPhoneNo = "+234" + remaining;
  } else if (isLocalWithoutZero.test(phoneNo) || isLandLine.test(phoneNo)) {
    formattedPhoneNo = "+234" + phoneNo;
  } else if (isValidNumber.test(phoneNo)) {
    if (!startsWithPlus.test(phoneNo)) {
      // prepend +
      formattedPhoneNo = "+" + phoneNo;
    }
  } else {
    formattedPhoneNo = "";
  }
  return formattedPhoneNo;
};

export const getAge = (dob: Date | string): string => dob ? formatDistanceStrict(new Date(), new Date(dob)) : 'Enter Date of Birth'
 
export const formatDate = (datetime: Date | number): string => datetime ? format(new Date(datetime), 'MMM d, yyyy') : '';

export const formatDate = (datetime: Date | number): string =>
  datetime ? format(new Date(datetime), "MMM d, yyyy hh:mma") : "";

export const formatDateForCalendar = (datetime: Date | number): string =>
  datetime ? format(new Date(datetime), "yyyy-MM-dd") : "";
