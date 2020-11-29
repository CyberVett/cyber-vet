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
  billingServices: object;
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<IData>({
    paid: "0",
    balance: "0",
    method: PaymentMethod.card,
    services: props.data,
  });

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [cummulativeValues, setCummulativeValues] = useState([]);

  const [selectedBillingValues, setSelectedBillinServices] = useState([]);
  const [actualBillingValues, setActualBillinServices] = useState([]);
  const [availableBillingValues, setAvailableBillinServices] = useState([]);

  useEffect(() => {
    const services = props.billingServices.filter((b) => b.name);
    setActualBillinServices(services);
    setAvailableBillinServices(services);

    const _cumm = Array.from({ length: services.length }).fill("");
    setCummulativeValues(_cumm);
  }, []);

  const handleBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    if (event.target.value) {
      const billingData = availableBillingValues.find((b) => {
        return event.target.name === b.name;
      });
      setSelectedBillinServices([...selectedBillingValues, billingData]);

      const availableData = availableBillingValues.filter((b) => {
        return event.target.name !== b.name;
      });
      setAvailableBillinServices(availableData);
    }
    return formValues;
  };

  const handleSelectedBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    const index = event.target.name;
    const charge = actualBillingValues[index].charges;
    if (event.target.value) {
      cummulativeValues.splice(index, 1, charge);
    } else {
      cummulativeValues.splice(index, 1, 0);
    }
    setCummulativeValues([...cummulativeValues]);

    const total = cummulativeValues.reduce((acc: number, val) => {
      return parseInt(val || 0, 10) + acc;
    }, 0);

    const balance = total - paidAmount;
    setTotalBalance(balance);

    setTotalPrice(total);
    return formValues;
  };

  const handleBillValueChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    console.log(event.target.value);

    return formValues;
  };

  // const [totalValue, setTotalValues] = useState<Number>(0);

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

      setPaidAmount(event.target.value);
      const balance = totalPrice - event.target.value;
      setTotalBalance(balance);

      return formValues;
    });
  };

  // useEffect(() => {
  //   // @ts-ignore
  //   const totalPrice = formValues.services.reduce((acc, val) => {
  //     return acc + parseInt(val.price);
  //   }, 0);
  //   // @ts-ignore
  //   const balance: number = totalPrice - formValues.paid;
  //   // @ts-ignore
  //   if (balance !== formValues.balance) {
  //     // @ts-ignore
  //     setFormValues({ ...formValues, balance: balance });
  //   }
  // }, [formValues]);

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      // @ts-ignore
      canEdit={!!props.date}
    >
      <form className="medical__report__form medical--bill">
        {[...availableBillingValues].map((service, index) => {
          return service.name ? (
            <>
              <div className="physical__examination__form--input">
                <select
                  onChange={handleSelectedBillItemChange}
                  name={`${index}`}
                  defaultValue={""}
                >
                  <option value="">Select One</option>
                  {[...availableBillingValues].map((serviceName) => {
                    return (
                      <option value={serviceName.name || ""}>
                        {serviceName.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="physical__examination__form--input">
                <input
                  type="number"
                  defaultValue={`${cummulativeValues[index]}`}
                  // defaultValue={service.charges}
                />
              </div>
            </>
          ) : null;
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
          <input type="number" name={"Total"} value={`${totalPrice}`} />
        </div>
        {/* </div> */}

        <div>
          <div className="physical__examination__form--input">
            <label>Paid</label>
            <input
              name={"paid"}
              onChange={handleInputChange}
              defaultValue={paidAmount}
            />
          </div>

          <div className="physical__examination__form--input">
            <label>Balance</label>
            <input name={"balance"} disabled value={totalBalance} />
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
