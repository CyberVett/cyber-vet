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

    // @ts-ignore
    const mappedService = [];
    props.data.services.map((oldService) => {
      const anUpdate = formValues.services.find(
        // @ts-ignore
        (updatedService) => updatedService.name === oldService.name
      );

      if (anUpdate) {        
        mappedService.push({
          // @ts-ignore
          name: anUpdate.name,
          // @ts-ignore
          charges: anUpdate.price || anUpdate.charges,
          state: "UPDATE",
        });
      } else {
        mappedService.push({
          // @ts-ignore
          name: oldService.name,
          // @ts-ignore
          charges: oldService.amount,
          state: "REMOVED",
        });
      }
      return oldService;
    });

    formValues.services.map((service) => {
      // @ts-ignore
      const oldService = mappedService.find(
        // @ts-ignore
        (oldService) => service.name === oldService.name
      );
      if (!oldService) {
        mappedService.push({
          // @ts-ignore
          name: service.name,
          // @ts-ignore
          charges: service.charges,
          state: "ADDED",
        });
      }
      return service;
    });

    const data = {
      // @ts-ignore
      services: props.data.totalAmountInCheckin
      // @ts-ignore
        ? mappedService
        : formValues.services,
        // @ts-ignore
      payment: {
        // @ts-ignore
        paymentMethod: formValues.paymentMethod || "Card",
        // @ts-ignore
        amountPaid: paidAmount,
      },
    };

    props.onAdd(data);
  };
  const [formValues, setFormValues] = useState<IData>({
    paid: "0",
    balance: "0",
    // @ts-ignore
    method: "",
    services: [],
    amountPaid: "",
    amountToBalance: "",
    paymentMethod: PaymentMethod.cash,
    // services: props.data,
  });

  const [totalBalance, setTotalBalance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);

  const [serviceList, setServiceList] = useState<IService[]>([]);

  // @ts-ignore
  const [cummulativeValues, setCummulativeValues] = useState([]);

  const handleAddServiceList = (e: any) => {
    e.preventDefault();
    const service: IService = { name: "", price: 0 };
    serviceList.push(service);
    setServiceList([...serviceList]);
  };

  useEffect(() => {
    // @ts-ignore
    setTotalBalance(props.data.amountToBalanceInCheckin);

    // @ts-ignore
    const total = props.data.services
      ? props.data.services.reduce((acc: number, service) => {
          // @ts-ignore
          const price = service.price || 0;
          return parseInt(price || 0, 10) + acc;
        }, 0)
      : 0;

      // @ts-ignore
    setTotalPrice(props.data.totalAmountInCheckin);
    // @ts-ignore
    setPaidAmount(props.data.totalAmountPaidInCheckin || 0);
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
    const service: IService = serviceList[index];
    const name = event.target.value;
    service.name = name;
    const bService = props.billingServices.find(
      (s: IService) => s.name === name
    ) || {
      charges: 0,
    };
    // @ts-ignore
    service.price = parseInt(bService.charges);

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
    setTotalBalance(balance || 0);

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
    setTotalBalance(balance || 0);

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
        setTotalBalance(balance || 0);
        // @ts-ignore
        _formValues.balance = balance;
      }

      return _formValues;
    });
  };

  useEffect(() => {
    // @ts-ignore
    const total = props?.data?.services?.reduce((acc: number, val) => {
      // @ts-ignore
      return parseInt(val.charges || 0, 10) + acc;
    }, 0);
    // @ts-ignore
    setTotalPrice(parseInt(props.data.totalAmountInCheckin));
    // @ts-ignore
    setTotalBalance(parseInt(props.data.amountToBalanceInCheckin) || 0);
    // @ts-ignore
    setPaidAmount(parseInt(props.data.totalAmountPaidInCheckin || 0));
    const services = props?.data?.services?.map((service) => {
      return {
        // @ts-ignore
        name: service.name,
        // @ts-ignore
        price: service.amount,
      };
    });
    setServiceList(services);
    setFormValues({
      method: props.data.paymentMethod,
      paid: props.data.amountPaid,
      // @ts-ignore
      balance: props.data.amountToBalance,
      // @ts-ignore
      services: services,
    });
  }, [props.data]);

  return (
    <MedicalReportModalContentTemplate
      onAdd={handleGetReport}
      onCancel={props.onCancel}
      title={props.title}
      // @ts-ignore
      date={props.date}
      // @ts-ignore
      canEdit={props.data.totalAmountInCheckin}
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
                    return (
                      //  @ts-ignore
                      <option key={index} value={serviceName.name || ""}>
                        {
                          //  @ts-ignore
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
            required
            name="method"
            value={formValues.method}
          >
            <option value="">Select a payment option</option>
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
