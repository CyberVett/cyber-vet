import React, { useEffect, useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";

enum PaymentMethod {
  cash = "CASH",
  card = "CARD",
}

interface IData {
  services: any;
  paid: string;
  balance: string;
  method: PaymentMethod;
}

const Services = [
  { name: "Registration", value: "Registration", price: 100 },
  {
    name: "Heamoparasite screening",
    value: "Heamoparasite screening",
    price: 200,
  },
  { name: "Endectocides", value: "Endectocides", price: 300 },
  { name: "Vit Bco", value: "Vit Bco", price: 400 },
];

const defaultServices = [
  { name: "Registration", price: "100" },
  {
    name: "Heamoparasite screening",
    price: 200,
  },
  { name: "Endectocides", price: "300" },
  { name: "Vit Bco", price: "400" },
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
    paid: "0",
    balance: "0",
    method: PaymentMethod.card,
    services: defaultServices,
  });

  const [totalValue, setTotalValues] = useState<Number>(0);

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: IData) => {
      formValues = {
        ...formValues,
        [event.target.name]: event.target.value,
      };
      let total = 0;
      for (const key in formValues) {
        if (Object.prototype.hasOwnProperty.call(formValues, key)) {
          const element = formValues[key];
          total += element;
        }
      }

      return formValues;
    });
  };

  const handleBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    setFormValues((formValues: IData) => {
      const services = formValues.services || [];
      let item = services[parseInt(event.target.name)];
      if (item && event.target.value) {
        item.name = event.target.value;
        item.price = defaultServices[parseInt(event.target.name)].price;
      } else {
        item = { name: event.target.value, price: "" };
      }
      const _formValues = { ...formValues };
      _formValues.services.splice(parseInt(event.target.name), 1, item);
      const total = _formValues.services.reduce((acc, val) => {
        return parseInt(val.price) + acc;
      }, 0);

      setTotalValues(total);
      return _formValues;
    });
  };

  const handleBillValueChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    setFormValues((formValues: IData) => {
      const services = formValues.services || [];
      let item = (services || [])[parseInt(event.target.name)];

      if (item) {
        const val = parseInt(event.target.value);
        item.price = val && val > 1 ? val : 0;
      }

      const _formValues = { ...formValues };
      _formValues.services.splice(parseInt(event.target.name), 1, item);
      const total = _formValues.services.reduce((acc, val) => {
        return parseInt(val.price || 0) + acc;
      }, 0);

      setTotalValues(total);

      return _formValues;
    });
  };

  useEffect(() => {
    // @ts-ignore
    const totalPrice = formValues.services.reduce((acc, val) => {
      return acc + parseInt(val.price);
    }, 0);
    // @ts-ignore
    const balance: number = totalPrice - formValues.paid;
    // @ts-ignore
    if (balance !== formValues.balance) {
      // @ts-ignore
      setFormValues({ ...formValues, balance: balance });
    }
  }, [formValues]);

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
    >
      <form className="medical__report__form medical--bill">
        {Services.map((__service, index) => {
          const service = (formValues.services || [])[index] || {
            name: "",
            price: "",
          };
          return (
            <>
              <div className="physical__examination__form--input">
                <select
                  onChange={handleBillItemChange}
                  name={`${index}`}
                  defaultValue={service.name}
                >
                  <option value="">Select One</option>
                  {[...Services].map((serviceName) => {
                    return (
                      <option
                        value={serviceName.value}
                        // disabled={serviceName.disabled}
                        defaultChecked={serviceName.name === service.name}
                      >
                        {serviceName.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="physical__examination__form--input">
                {service.price ? (
                  <input
                    type="number"
                    name={`${index}`}
                    onChange={handleBillValueChange}
                    defaultValue={service.price}
                  />
                ) : (
                  <input
                    type="number"
                    name={`${index}`}
                    onChange={handleBillValueChange}
                    defaultValue={""}
                  />
                )}
              </div>
            </>
          );
        })}

        {/* <div style={{ display: "grid" }}> */}
        <div className="physical__examination__form--input">
          <input
            name={`total`}
            disabled
            defaultValue="Total"
            // onChange={handleBillValueChange}
            // defaultValue={service.price}
          />
        </div>
        <div className="physical__examination__form--input">
          <input type="number" name={"Total"} value={`${totalValue}`} />
        </div>
        {/* </div> */}

        <div>
          <div className="physical__examination__form--input">
            <label>Paid</label>
            <input
              name={"paid"}
              onChange={handleInputChange}
              defaultValue={formValues.paid}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Balance</label>
            <input
              name={"balance"}
              disabled
              // onChange={handleInputChange}
              value={formValues.balance}
            />
          </div>
        </div>

        <div className="physical__examination__form--input payment--method">
          <label>Payment Method</label>
          <select
            onChange={handleInputChange}
            name="method"
            defaultValue={formValues.method}
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
