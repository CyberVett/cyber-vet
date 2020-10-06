import { formatDistance } from "date-fns";

/* Combine a number of classes removing undefined values
* @param {string} styles A list of classes to compose together
*/
export const composeClasses = (...styles: (string | boolean | undefined)[]): string => styles
  .filter(item => item)
  .join(' ');

export const formatPhoneNumber = (phoneNo: string) => {
  let formattedPhoneNo: string = phoneNo
  // currently accepting only +234 numbers
  const isValidNumber = /^[+]?[234][0-9]{12}$/
  const startsWithPlus = /^\+/
  // const startsWithZero =/^0/
  const isLocalNumber = /^0[789][01]\d{8}$/
  const isLocalWithoutZero = /^[789][01]\d{8}$/
  const isLandLine = /^0?[0-9]{8}$/
  if (isLocalNumber.test(phoneNo)) {
    // remove 0
    let remaining = phoneNo.slice(1, phoneNo.length)
    formattedPhoneNo = "+234" + remaining
  } else if (isLocalWithoutZero.test(phoneNo) || isLandLine.test(phoneNo)) {
    formattedPhoneNo = "+234" + phoneNo
  } else if (isValidNumber.test(phoneNo)) {
    if (!startsWithPlus.test(phoneNo)) {
      // prepend +
      formattedPhoneNo = "+" + phoneNo
    }
  } else {
    formattedPhoneNo = '';
  }
  return formattedPhoneNo
};

export const getAge = (dob: Date | string): string => {
  if (dob) {
    return formatDistance(new Date(), new Date(dob));
  }
  return 'enter date of birth';
};

// export const uploadToCloudinary = (imgToUpload: string) => {
//   const [percentage, setPercentage] = useState(0);
//   const [imgUrl, setImgUrl] = useState('');

//   useEffect(() => {
//     let formData = new FormData();
//     formData.append('image', imgToUpload);
//     requestClient.post('images', formData, {
//       onUploadProgress: (ProgressEvent) => {
//         const { loaded, total } = ProgressEvent;
//         setPercentage(Math.floor((loaded * 100) / total));
//       }
//     })
//       .then(res => {
//         console.log(res);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//       return () => { };
//   },[])

//   return {
//     percentage,
//     imgUrl
//   }
// }

// export const formatDate = (dob: Date | string): string => {
//   if (dob) {
//     const date = new Date(dob);
//     utcToZonedTime(date, timeZone);
//   }
//   return 'enter date of birth';
// };