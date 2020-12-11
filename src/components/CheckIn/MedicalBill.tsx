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
  amountToBalance: string;
  amountPaid: string;
  paymentMethod: PaymentMethod;
}

interface IService {
  name: string;
  price: number;
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
    amountPaid: '',
    amountToBalance: '',
    paymentMethod: PaymentMethod.cash
    // services: props.data,
  });

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [serviceList, setServiceList] = useState<IService[]>([]);

  // @ts-ignore
  const [cummulativeValues, setCummulativeValues] = useState([]);

  // const [selectedBillingValues, setSelectedBillinServices] = useState([]);
  // const [actualBillingValues, setActualBillinServices] = useState([]);
  // const [availableBillingValues, setAvailableBillinServices] = useState([]);

  const handleAddServiceList = (e: any) => {
    e.preventDefault();
    const service: IService = { name: "", price: 0 };
    serviceList.push(service);
    setServiceList([...serviceList]);
  };

  useEffect(() => {
    // @ts-ignore
    // const services = props.billingServices.filter((b) => b.name);
    // setActualBillinServices(services);
    // setAvailableBillinServices(services);
    // const _cumm = Array.from({ length: services.length }).fill("");
    // //  @ts-ignore
    // setCummulativeValues(_cumm);
  }, []);

  useEffect(() => {
    // @ts-ignore
    setTotalBalance(props.data.amountToBalance);

    const total = props.data.services
      ? props.data.services.reduce((acc: number, service) => {
          // @ts-ignore
          const price = service.price || 0;
          return parseInt(price || 0, 10) + acc;
        }, 0)
      : 0;

    setTotalPrice(total);
    // @ts-ignore
    setPaidAmount(props.data.amountPaid || 0);
    setFormValues({
      ...formValues,
      // @ts-ignore
      paymentMethod: props.data.paymentMethod || "Card",
    });
  }, [props.data]);

  const handleSelectedBillItemChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    const index = event.target.name;
    const service:IService = serviceList[index];
    const name = event.target.value;
    service.name = name;
    const bService = props.billingServices.find((s: IService) => s.name === name) || {
      charges: 0,
    };
    // @ts-ignore
    service.price = parseInt(bService.charges);
    console.log(service);

    serviceList.splice(parseInt(index), 1, service);
    setServiceList([...serviceList]);

    const valInput = document.querySelector(`input[name='${index}']`);
    // @ts-ignore
    valInput.value = service.price;

    const total = serviceList.reduce((acc: number, val) => {
      // @ts-ignore
      return parseInt(val.price || 0, 10) + acc;
    }, 0);

    const balance = total - paidAmount;
    setTotalBalance(balance);

    setTotalPrice(total);
    // @ts-ignore
    const services = [];
    serviceList.map((service) => {
      if (service.price) {
        services.push({
          // @ts-ignore
          charges: service.price,
          // @ts-ignore
          name: service.name,
        });
      }
    });

    const _formValues = {
      balance: balance,
      method: formValues.method,
      paid: paidAmount,
      // @ts-ignore
      services: [...services],
    };
    // @ts-ignore
    setFormValues(_formValues);

    return _formValues;
  };

  const handleBillValueChange = (event: {
    persist: () => void;
    target: { name: any; value: any };
  }) => {
    event.persist();

    const index = event.target.name;
    const service = serviceList[index];
    service.price = event.target.value;

    serviceList.splice(parseInt(index), 1, service);

    const total = serviceList.reduce((acc: number, val) => {
      // @ts-ignore
      return parseInt(val.price || 0, 10) + acc;
    }, 0);

    const balance = total - paidAmount;
    setTotalBalance(balance);

    setTotalPrice(total);
    // @ts-ignore
    const services = [];
    serviceList.map((service) => {
      if (service.price) {
        services.push({
          // @ts-ignore
          charges: service.price,
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
    setServiceList([...serviceList]);
    return _formValues;
  };

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

  useEffect(() => {
    const total = props?.data?.services?.reduce((acc: number, val) => {
      // @ts-ignore
      return parseInt(val.charges || 0, 10) + acc;
    }, 0);
    setTotalPrice(total);
    setTotalBalance(parseInt(props.data.amountToBalance));
    setPaidAmount(parseInt(props.data.amountPaid));
    formValues.method = props.data.paymentMethod;
    formValues.paid = props.data.amountPaid;
    formValues.balance = props.data.amountToBalance;
    formValues.services = props.data.services;
  }, [props.data]);

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      // @ts-ignore
      date={props.date}
      // @ts-ignore
      canEdit={false}
    >
      <form className="medical__report__form medical--bill">
        {[...serviceList].map((service, index) => {
          //  @ts-ignore
          const savedService =
            props.data.services && props.data.services[index]
              ? props.data.services[index]
              : {};
              // @ts-ignore
          const price = savedService
            ? // @ts-ignore
              savedService.price
            : cummulativeValues[index];
          // @ts-ignore
          return (
            <>
              <div className="physical__examination__form--input">
                <select
                  // @ts-ignore
                  defaultValue={service.name || ""}
                  name={`${index}`}
                  onChange={handleSelectedBillItemChange}
                >
                  <option value="">Select One</option>
                  {[...props.billingServices].map((serviceName, index) => {   
                    console.log(serviceName);                  
                    return (
                      //  @ts-ignore
                      <option key={index} value={serviceName.name || ""}>
                        { //  @ts-ignore
                          `${serviceName?.department?.name}--${serviceName.name}`
                          }
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="physical__examination__form--input">
                <input
                  type="number"
                  defaultValue={`${service.price}`}
                  name={`${index}`}
                  // defaultValue={service.charges}
                  onChange={handleBillValueChange}
                />
              </div>
            </>
          );
        })}

        <div>
          <button onClick={handleAddServiceList}>+ Add item</button>
        </div>
        <div></div>

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
