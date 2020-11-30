import React, { useEffect, useState } from "react";
import MedicalReportModalContentTemplate from "./MedicalReportModalContentTemplate";
enum PaymentMethod {
  cash = "CASH",
  card = "CARD",
}

interface IData {
  services: [];
  paid: string;
  balance: string;
  method: PaymentMethod;
}

const VacinationReport = (props: {
  title: string;
  onAdd: Function;
  onCancel: Function;
  data: IData;
  billingServices: [];
}) => {
  const handleGetReport = (e: Event) => {
    e.preventDefault();
    props.onAdd(formValues);
  };
  const [formValues, setFormValues] = useState<IData>({
    paid: "0",
    balance: "0",
    method: PaymentMethod.card,
    services: [],
    // services: props.data,
  });

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [cummulativeValues, setCummulativeValues] = useState([]);

  // const [selectedBillingValues, setSelectedBillinServices] = useState([]);
  const [actualBillingValues, setActualBillinServices] = useState([]);
  const [availableBillingValues, setAvailableBillinServices] = useState([]);

  useEffect(() => {
    // @ts-ignore
    const services = props.billingServices.filter((b) => b.name);
    setActualBillinServices(services);
    setAvailableBillinServices(services);

    const _cumm = Array.from({ length: services.length }).fill("");
    //  @ts-ignore
    setCummulativeValues(_cumm);
  }, []);

  useEffect(() => {
    setTotalBalance(props.data.amountToBalance);

    const total = props.data.services
      ? props.data.services.reduce((acc: number, service) => {
          const price = service.price || 0;
          return parseInt(price || 0, 10) + acc;
        }, 0)
      : 0;

    setTotalPrice(total);
    setPaidAmount(props.data.amountPaid || 0);
    setFormValues({
      ...formValues,
      paymentMethod: props.data.paymentMethod || "Card",
    });
  }, [props.data]);

  const handleSelectedBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    const index = event.target.name;
    // @ts-ignore
    const charge = actualBillingValues[index].charges;
    if (event.target.value) {
      // @ts-ignore
      cummulativeValues.splice(index, 1, charge);
    } else {
      // @ts-ignore
      cummulativeValues.splice(index, 1, 0);
    }
    setCummulativeValues([...cummulativeValues]);

    const total = cummulativeValues.reduce((acc: number, val) => {
      return parseInt(val || 0, 10) + acc;
    }, 0);

    const balance = total - paidAmount;
    console.log(balance, total, paidAmount);
    setTotalBalance(balance);

    setTotalPrice(total);
    // @ts-ignore
    const services = [];
    cummulativeValues.map((val) => {
      if (val) {
        const service = actualBillingValues[index];
        services.push({
          // @ts-ignore
          charges: service.charges,
          // @ts-ignore
          name: service.name,
        });
      }
    });

    const _formValues = {
      paid: paidAmount,
      balance: balance,
      method: formValues.method,
      // @ts-ignore
      services: [...services],
    };
    // @ts-ignore
    setFormValues(_formValues);

    return _formValues;
  };

  // const handleBillValueChange = (event: {
  //   persist: () => void;
  //   target: { name: any; value: any };
  // }) => {
  //   event.persist();
  //   return formValues;
  // };

  // const [totalValue, setTotalValues] = useState<Number>(0);

  const handleInputChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();
    setFormValues((formValues: IData) => {
      let _formValues = {
        ...formValues,
        [event.target.name]: event.target.value,
      };

      if (event.target.name === "paid") {
        setPaidAmount(event.target.value);
        const balance = totalPrice - event.target.value;
        setTotalBalance(balance);
        // @ts-ignore
        _formValues.balance = balance;
      }

      return _formValues;
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
      date={props.date}
      // @ts-ignore
      canEdit={!!props.date}
    >
      <form className="medical__report__form medical--bill">
        {[...availableBillingValues].map((service, index) => {
          //  @ts-ignore
          const savedService =
            props.data.services && props.data.services[index]
              ? props.data.services[index]
              : {};
          const price = savedService
            ? savedService.price
            : cummulativeValues[index];
          return service.name ? (
            <>
              <div className="physical__examination__form--input">
                <select
                  onChange={handleSelectedBillItemChange}
                  name={`${index}`}
                  defaultValue={savedService.name || ""}
                >
                  <option value="">Select One</option>
                  {[...availableBillingValues].map((serviceName, index) => {
                    return (
                      //  @ts-ignore
                      <option key={index} value={serviceName.name || ""}>
                        {
                          //  @ts-ignore
                          serviceName.name
                        }
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="physical__examination__form--input">
                <input
                  type="number"
                  defaultValue={`${price}`}
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
            {["Cash", "Card"].map((method, index) => {
              return (
                <option key={index} value={method}>
                  {method}
                </option>
              );
            })}
          </select>
        </div>
      </form>
    </MedicalReportModalContentTemplate>
  );
};

export default VacinationReport;
