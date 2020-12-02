import { format, formatDistanceStrict } from "date-fns";

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

export const formatDate = (datetime: Date | number): string => {
  return datetime ? format(new Date(datetime), "MMM d, yyyy hh:mma") : "";
}

export const formatDateForCalendar = (datetime: Date | number | string): string =>
  datetime ? format(new Date(datetime), "yyyy-MM-dd") : "";

export const convertURIToImageData = (URI: any) => {
  return new Promise(function (resolve, reject) {
    if (URI == null) return reject();
    const canvas = document.createElement('canvas'),
      context = canvas.getContext('2d'),
      image = new Image();
    image.addEventListener('load', function () {
      canvas.width = image.width * 0.4;
      canvas.height = image.height * 0.4;
      context?.drawImage(image, 0, 0, canvas.width * 0.4, canvas.height * 0.4);
      resolve(canvas.toBlob(() => { }, 'image/png', 0.95));
    }, false);
    image.src = URI;
  });
}

export const dataURLtoFile = (dataurl: string, filename: string) => {

  let arr = dataurl.split(','),
  // @ts-ignore
    mime = arr[0]?.match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], filename, { type: mime });
}