import { client } from "queryClient";
import { Customer, Employee, ListSearchableEntitiesResult, Order } from "types";

export const searchRequest = async (
  searchInput: string,
  includeCustomers: boolean,
  searchCustomersHandler: (searchInput: string) => Promise<Customer[]>,
  includeEmployees: boolean,
  searchEmployeesHandler: (searchInput: string) => Promise<Employee[]>,
  includeOrders: boolean,
  searchOrdersHandler: (searchInput: string) => Promise<Order[]>,
): Promise<{
  customers: Customer[];
  employees: Employee[];
  orders: Order[];
}> => {
  const customers: Customer[] = [];
  const employees: Employee[] = [];
  const orders: Order[] = [];

  if (includeCustomers) {
    const customerList = await searchCustomers(
      searchInput,
      includeCustomers,
      searchCustomersHandler,
    );
    customers.push(...customerList);
  }

  if (includeEmployees) {
    const employeeList = await searchEmployees(
      searchInput,
      includeEmployees,
      searchEmployeesHandler,
    );
    employees.push(...employeeList);
  }

  if (includeOrders) {
    const orderList = await searchOrders(
      searchInput,
      includeOrders,
      searchOrdersHandler,
    );
    orders.push(...orderList);
  }

  return {
    customers,
    employees,
    orders,
  };
};

export const searchCustomers = async (
  searchInput: string,
  includeCustomers: boolean,
  searchCustomersHandler: (searchInput: string) => Promise<Customer[]>,
): Promise<Customer[]> => {
  if (!includeCustomers) {
    return [];
  }

  console.log("Searching for customers with searchInput: ", searchInput);
  const customers: Customer[] = await searchCustomersHandler(searchInput);

  return customers;
};

export const searchEmployees = async (
  searchInput: string,
  includeEmployees: boolean,
  searchEmployeesHandler: (searchInput: string) => Promise<Employee[]>,
): Promise<Employee[]> => {
  if (!includeEmployees) {
    return [];
  }

  console.log("Searching for employees with searchInput: ", searchInput);
  const employees: Employee[] = await searchEmployeesHandler(searchInput);

  return employees;
};

export const searchOrders = async (
  searchInput: string,
  includeOrders: boolean,
  searchOrdersHandler: (searchInput: string) => Promise<Order[]>,
): Promise<Order[]> => {
  if (!includeOrders) {
    return [];
  }

  console.log("Searching for orders with searchInput: ", searchInput);
  const orders: Order[] = await searchOrdersHandler(searchInput);

  return orders;
};

export const getSearchableEntityList =
  async (): Promise<ListSearchableEntitiesResult | null> => {
    // const { data } = await client.queries.listSearchableEntities();

    // return data;
  };
