import React, { useState, useEffect } from 'react';
import omit from 'lodash.omit';

import { composeClasses, formatPhoneNumber } from 'lib/utils';
import yup from 'lib/yup';

import styles from './input.module.scss';

export enum InputValidationTypes {
  alphanumeric = 'alphanumeric', // support only alphanumeric character
  id = 'id', // support ids fields
  email = 'email', // support only email
  text = 'text', // support only alphabet
  tel = 'tel', // support only telephone
  freeText = 'freeText', // support none empty string
  phoneOrEmail = 'phoneOrEmail' //custom for text and number field
}

export interface IOptions {
  key: number;
  label?: string;
  value: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  validation?: InputValidationTypes;
  maxlength?: number;
  handleInputChange?: (e: any) => void;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IMultiSelectProps extends React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: IOptions[];
  selected: string[];
  onSelectedChanged: (e: any) => void;
}

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(({ handleInputChange, maxlength, validation, ...props }, ref) => {
  const classes = composeClasses(styles.input, props.className);

  const [validationError, setValidationError] = useState('');

  const onBlurFormat = (event: any) => {
    let formatted = formatPhoneNumber(event.target.value)
    event.target.value = formatted
    if (handleInputChange) {
      handleInputChange(event)
    }
  }
  const onChangeValidation = async (event: any) => {

    // keep the value of the input in inputs state
    if (handleInputChange) {
      handleInputChange(event);
    }

    switch (validation) {
      case InputValidationTypes.email: {
        const schema = yup.string().email().required('This must be a valid email');
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.freeText: {
        const schema = yup.string().required('This mustn\'t be empty');
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.text: {
        const schema = yup.string().matches(/^([A-Za-z.'"]|,|_|-|\s)*$/,
          { excludeEmptyString: true, message: 'Special characters and numbers are not allowed.' });
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.alphanumeric: {
        const schema = yup.string().matches(/^([\w\s',"/#.-])+$/i,
          { excludeEmptyString: true, message: 'Special characters are not allowed.' });
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.tel: {
        const schema = yup.string().matches(/^([+]?[234][0-9]{8,13}|0?[789][01]\d{8}|[0-9]{8})$/,
          { excludeEmptyString: true, message: 'Incorrect phone number format.' });
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.id: { // prevent spaces
        const schema = yup.string().matches(/^[a-zA-Z0-9]{11}$/gm,
          { excludeEmptyString: true, message: 'ID number must be 11 digits.' });
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      case InputValidationTypes.phoneOrEmail: { // regex for phone or email address
        const schema = yup.string().matches(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})|^([+]?[234][0-9]{8,13}|0?[789][01]\d{8}|[0-9]{8})$/gm,
          { excludeEmptyString: true, message: 'only phone number or emails address allowed.' });
        const errMsg = await schema.validate(event.target.value)
          .then(() => '')
          .catch((err: yup.ValidationError) => {
            return err.message;
          });
        setValidationError(errMsg);
        break;
      }

      default:
        break;
    }
  };

  return (
    <>
      <input
        className={classes}
        maxLength={maxlength}
        onChange={validation && onChangeValidation}
        onBlur={(!validationError && validation == InputValidationTypes.tel) ? onBlurFormat : undefined}
        ref={ref}
        {...omit(props, ['className', 'validation'])}
      />
      {validationError !== '' ? <span className={styles.formErrors}>{validationError}</span> : ''}
    </>
  );
});

export const TextArea: React.SFC<React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>> = (props) => {
  const classes = composeClasses(styles.input, props.className);

  return (
    <textarea
      className={classes}
      cols={20}
      maxLength={props.maxLength}
      rows={3}
      {...omit(props, ['className'])}
    />
  );
};

export const Select: React.SFC<React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>> = (props) => {
  return (

    <select
      {...omit(props, ['className'])}
      className={composeClasses(styles.select, props.className)}
    />
  );
};

export const Multiselect: React.SFC<IMultiSelectProps> = ({ options, selected, onSelectedChanged, ...props }) => {
  return (
    <div className={composeClasses(styles.multiSelect, props.className)}>
      <MultiSelect
        options={options}
        selected={selected}
        onSelectedChanged={onSelectedChanged}
      />
    </div>
  );
};

export const InputGroup: React.SFC<{
  className?: string;
  horizontal?: boolean;
}> = ({ children, className, horizontal }) => {
  return (
    <div className={composeClasses(
      styles.inputGroup,
      horizontal && styles.inputGroupHorizontal,
      className,
    )}
    >
      {children}
    </div>
  );
};

export const Label: React.SFC<React.DetailedHTMLProps<React.LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>> = ({ children, className, ...rest }) => {
  const classes = composeClasses(styles.label, className);

  return (
    // eslint-disable-next-line jsx-a11y/label-has-for
    <label
      className={classes}
      {...rest}
    >
      {children}
    </label>
  );
};

export const FormErrors: React.SFC<{
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: any[] | string;
}> = ({ className, errors }) => {
  const classes = composeClasses(styles.formErrors, className);
  const [showErrorBox, toggleErrorBox] = useState(true);

  useEffect(() => {
    toggleErrorBox(true);
  }, [errors])

  if (!errors || (Array.isArray(errors) && errors.length < 1)) return null;

  return (
    <>
      {
      showErrorBox ?
        <InputGroup className={classes}>
          <span className={styles.closeButton} onClick={() => toggleErrorBox(false)}>X</span>
          {
            Array.isArray(errors)
              ? errors.map(err => (
                <span
                  className={styles.formErrorItem}
                  key={err.message}
                >{err.message}
                </span>
              ))
              : <span className={styles.formErrorItem}>{errors}</span>
          }
        </InputGroup>
      : <></>
      }
    </>

  );
};

export const FormMessages: React.SFC<{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  messages: any[] | string;
}> = ({ messages }) => {
  if (!messages) return null;

  return (
    <InputGroup className={styles.formSuccess}>
      {
        Array.isArray(messages)
          ? messages.map(err => (
            <span
              className={styles.formErrorItem}
              key={err.message}
            >{err.message}
            </span>
          ))
          : <span className={styles.formErrorItem}>{messages}</span>
      }
    </InputGroup>
  );
};

// interface IDateInput {
//   dayPickerProps?: DayPickerProps;
//   disabled?: boolean;
//   initialMonth?: Date;
//   onDayChange?: (day: Date) => void;
//   maxlength?: number;
//   name: string;
//   placeholder?: string;
//   required?: boolean;
//   selectedDays?: any;
//   value?: string;
// }
// export const DateInput: React.SFC<IDateInput> = ({
//   dayPickerProps = {}, disabled, initialMonth, maxlength, name, onDayChange, placeholder, required, selectedDays, value,
// }) => {
//   const currentYear = new Date().getFullYear();
//   const currentMonth = new Date().getMonth();
//   const fromMonth = new Date(1960, 0);
//   const toMonth = new Date(currentYear, currentMonth);
//   const [month, setMonth] = useState(fromMonth);

//   const InputStyle = {
//     backgroundColor: '#fff',
//     border: '1px solid #bdbdbd',
//     borderRadius: '3px',
//     marginTop: '5px',
//     padding: '15px',
//     width: '100%',
//   };

//   const YearMonthForm: React.SFC<{
//     date: Date;
//     localeUtils: LocaleUtils;
//     onChange(e: Date): void;
//   }> = ({ date, localeUtils, onChange: onYearMonthChange }) => {
//     const months = localeUtils.getMonths();

//     const years = [];
//     for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
//       years.push(i);
//     }

//     const handleChange = (e: React.FormEvent<EventTarget>) => {
//       const { year, month } = (e.target as any).form;
//       onYearMonthChange(new Date(year.value, month.value));
//     };

//     return (
//       <form className="DayPicker-Caption">
//         <select
//           name="month"
//           onChange={handleChange}
//           value={date.getMonth()}
//         >
//           {months.map((_month: string, i: number) => (
//             <option
//               key={_month}
//               value={i}
//             >
//               {_month}
//             </option>
//           ))}
//         </select>
//         <select
//           name="year"
//           onChange={handleChange}
//           value={date.getFullYear()}
//         >
//           {years.map(year => (
//             <option
//               key={year}
//               value={year}
//             >
//               {year}
//             </option>
//           ))}
//         </select>
//       </form>
//     );
//   };

//   // hack workaround for https://github.com/gpbl/react-day-picker/issues/579 on firefox
//   const updateInputRef = (ref: any) => {
//     if (ref) {
//       // eslint-disable-next-line
//       ref.input.focus = function () { }
//     }
//   };

//   const autoComplete = 'off';
//   return (
//     <>
//       <DayPickerInput
//         dayPickerProps={{
//           captionElement: ({ date, localeUtils }) => (
//             <YearMonthForm
//               date={date}
//               localeUtils={localeUtils}
//               onChange={(e: Date) => setMonth(e)}
//             />
//           ),
//           fromMonth,
//           initialMonth,
//           month,
//           toMonth,
//           selectedDays,
//           ...dayPickerProps,
//         }}
//         format="D/M/YYYY"
//         formatDate={date => date.toLocaleString()
//           .substring(0, 10)
//           .replace(',', '')
//           .replace(' ', '')
//         }
//         inputProps={{
//           autoComplete,
//           disabled,
//           maxLength: maxlength,
//           name,
//           placeholder,
//           required,
//           style: InputStyle,
//         }}
//         onDayChange={onDayChange}
//         ref={updateInputRef}
//         value={value}
//       />
//     </>
//   );
// };

export const CheckboxInput: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  className, children, id, ...props
}) => {
  const classes = composeClasses(styles.checkboxItem, className);

  const inputId = id || `${props.name}-${props.value}`;

  return (
    <div className={classes}>
      <input
        id={inputId}
        type="checkbox"
        {...props}
      />
      <label htmlFor={inputId}>{children}</label>
    </div>
  );
};


export const RadioInput: React.FC<React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>> = ({
  className, name, id, ...props
}) => {
  const classes = composeClasses(styles.radioBox, className);

  const inputId = id || `${name}-${props.value}`;

  return (
    <label htmlFor={inputId} className={classes}>{name}
      <input
        id={inputId}
        type="radio"
        {...props}
      />
      <span className={styles.checkmark}></span>
    </label>
  )
}
