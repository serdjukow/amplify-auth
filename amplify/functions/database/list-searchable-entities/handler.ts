import type { Schema } from "../../../data/resource";
import { getItemsWithFieldsOfTable } from "../../../data/utils";
import {
  CustomerSearchEntity,
  EmployeeSearchEntity,
  InvoiceSearchEntity,
  OrderSearchEntity,
} from "../../../types";

const getCustomerSearchEntities = async (
  nextTokenParam: string | null | undefined = null,
  prevCustomerList: CustomerSearchEntity[] = [],
): Promise<CustomerSearchEntity[]> => {
  const { dataList, nextToken } = await getItemsWithFieldsOfTable(
    "Customer",
    [
      "id",
      "kundenNummer",
      "#name",
      "vorname",
      "telefon",
      "mobil",
      "email",
      "emailInvoices",
      "veranstaltungsort",
      "adresse",
    ],
    null,
    null,
    { "#name": "name" },
    30000,
    nextTokenParam,
  );

  console.log("Loaded customers: ", dataList);

  const newCustomerList: CustomerSearchEntity[] = dataList.map((customer) => {
    const adresse = customer.adresse
      ? customer.adresse.strasse +
        " " +
        customer.adresse.nummer +
        ", " +
        customer.adresse.plz +
        " " +
        customer.adresse.ort
      : "";

    return {
      i: customer.id,
      k: customer.kundenNummer,
      n: customer.name,
      v: customer.vorname ?? "",
      t: customer.telefon ?? "",
      m: customer.mobil ?? "",
      e: customer.email ?? "",
      c: customer.emailInvoices ?? "",
      o: customer.veranstaltungsort ?? "",
      a: adresse,
    };
  });

  const customerList = [...prevCustomerList, ...newCustomerList];

  console.log("customerList: ", customerList);

  return nextToken
    ? getCustomerSearchEntities(nextToken, customerList)
    : customerList;
};

const getEmployeeSearchEntities = async (
  nextTokenParam: string | null | undefined = null,
  prevEmployeeList: EmployeeSearchEntity[] = [],
): Promise<EmployeeSearchEntity[]> => {
  const { dataList, nextToken } = await getItemsWithFieldsOfTable(
    "Employee",
    [
      "id",
      "personalNummer",
      "vorname",
      "#name",
      "adresse",
      "email",
      "telefon",
      "mobil",
      "personalausweisnummer",
      "anmerkungen",
    ],
    null,
    null,
    { "#name": "name" },
    30000,
    nextTokenParam,
  );

  console.log("Loaded employees: ", dataList);

  const newEmployeeList: EmployeeSearchEntity[] = dataList.map((employee) => {
    const adresse = employee.adresse
      ? employee.adresse.strasse +
        " " +
        employee.adresse.nummer +
        ", " +
        employee.adresse.plz +
        " " +
        employee.adresse.ort
      : "";

    return {
      i: employee.id,
      p: employee.personalNummer,
      v: employee.vorname,
      n: employee.name,
      a: adresse,
      e: employee.email ?? "",
      t: employee.telefon ?? "",
      m: employee.mobil ?? "",
      w: employee.personalausweisnummer ?? "",
      c: employee.anmerkungen ?? "",
    };
  });

  const employeeList = [...prevEmployeeList, ...newEmployeeList];

  console.log("employeeList: ", employeeList);

  return nextToken
    ? getEmployeeSearchEntities(nextToken, employeeList)
    : employeeList;
};

const getOrderSearchEntities = async (
  nextTokenParam: string | null | undefined = null,
  prevOrderList: OrderSearchEntity[] = [],
): Promise<OrderSearchEntity[]> => {
  const { dataList, nextToken } = await getItemsWithFieldsOfTable(
    "Order",
    ["id", "auftragsNummer", "veranstaltungsort", "anmerkungen"],
    null,
    null,
    null,
    30000,
    nextTokenParam,
  );

  console.log("Loaded orders: ", dataList);

  const newOrderList: OrderSearchEntity[] = dataList.map((order) => {
    return {
      i: order.id,
      a: order.auftragsNummer,
      v: order.veranstaltungsort,
      c: order.anmerkungen ?? "",
    };
  });

  const orderList = [...prevOrderList, ...newOrderList];

  console.log("orderList: ", orderList);

  return nextToken ? getOrderSearchEntities(nextToken, orderList) : orderList;
};

const getInvoiceSearchEntities = async (
  nextTokenParam: string | null | undefined = null,
  prevInvoiceList: InvoiceSearchEntity[] = [],
): Promise<InvoiceSearchEntity[]> => {
  const { dataList, nextToken } = await getItemsWithFieldsOfTable(
    "Invoice",
    ["id", "rechnungsNummer", "veranstaltungsort", "anmerkungen"],
    null,
    null,
    null,
    30000,
    nextTokenParam,
  );

  console.log("Loaded invoices: ", dataList);

  const newInvoiceList: InvoiceSearchEntity[] = dataList.map((order) => {
    return {
      i: order.id,
      r: order.rechnungsNummer,
      v: order.veranstaltungsort,
      c: order.anmerkungen ?? "",
    };
  });

  const invoiceList = [...prevInvoiceList, ...newInvoiceList];

  console.log("invoiceList: ", invoiceList);

  return nextToken
    ? getInvoiceSearchEntities(nextToken, invoiceList)
    : invoiceList;
};

export const handler: Schema["listSearchableEntities"]["functionHandler"] =
  async () => {
    try {
      const [customerList, employeeList, orderList, invoiceList] =
        await Promise.all([
          getCustomerSearchEntities(),
          getEmployeeSearchEntities(),
          getOrderSearchEntities(),
          getInvoiceSearchEntities(),
        ]);

      return { customerList, employeeList, orderList, invoiceList };
    } catch (error) {
      console.error("Error in listSearchableEntities: ", error);
      return {
        customerList: [],
        employeeList: [],
        orderList: [],
        invoiceList: [],
      };
    }
  };
