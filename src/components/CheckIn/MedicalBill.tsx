import React, { useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

enum PaymentMethod {
  cash = "CASH",
  card = "CARD",
}

interface IData {
  medicalBill: {
    services: [{ name: string; price: string }] | null;
    paid: string;
    balance: string;
    method: PaymentMethod | null;
  };
}

const Services = [
  { name: "Select One", value: "Select One", disabled: true },
  { name: "Registration", value: "Registration" },
  { name: "Heamoparasite screening", value: "Heamoparasite screening" },
  { name: "Endectocides", value: "Endectocides" },
  { name: "Vit Bco", value: "Vit Bco" },
];

const VacinationReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: IData;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<IData>({
    ...props.data,
  });

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: IData) => {
      formValues.medicalBill = {
        ...formValues.medicalBill,
        [event.target.name]: event.target.value,
      };
      return formValues;
    });
  };

  const handleBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    setFormValues((formValues: IData) => {
      let item = (formValues.medicalBill.services || [])[
        parseInt(event.target.name)
      ];

      if (item) {
        item.name = event.target.value;
      } else {
        item = { name: event.target.value, price: "" };
      }

      return formValues;
    });
  };

  const handleBillValueChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    setFormValues((formValues: IData) => {
      let item = (formValues.medicalBill.services || [])[
        parseInt(event.target.name)
      ];

      if (item) {
        item.name = event.target.value;
      } else {
        item = { name: "", price: event.target.value };
      }

      return formValues;
    });
  };

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
    >
      <form className="medical__report__form medical--bill">
        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div className="physical__examination__form--input">
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {[...Services].map((serviceName) => {
              return (
                <option
                  value={serviceName.value}
                  disabled={serviceName.disabled}
                >
                  {serviceName.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="physical__examination__form--input">
          <input
            name={"name"}
            onChange={handleBillValueChange}
            defaultValue={
              (formValues.medicalBill.services || [{ price: "" }])[0].price
            }
          />
        </div>

        <div>
          <div className="physical__examination__form--input">
            <label>Vaccination Dosage</label>
            <input
              name={"dosage"}
              onChange={handleInputChange}
              defaultValue={formValues.medicalBill.paid}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Date of next shot</label>
            <input
              name={"nextDate"}
              onChange={handleInputChange}
              defaultValue={formValues.medicalBill.balance}
            />
          </div>
        </div>

        <div className="physical__examination__form--input payment--method">
          <label>Payment Method</label>
          <select
            onChange={handleBillItemChange}
            defaultValue={
              (formValues.medicalBill.services || [{ name: "" }])[0].name
            }
          >
            {["Cash", "Card"].map((method) => {
              return <option value={method}>{method}</option>;
            })}
          </select>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default VacinationReport;
