import customers from "../data/customers.json";
import orders from "../data/orders.json";
import employees from "../data/employees.json";
import products from "../data/products.json";

type TableRow = Record<string, string | number | boolean | null | undefined>;

const parseDate = (date: string | null | undefined): string | null => {
  if (!date) return null;
  const parsedDate = new Date(date);
  console.log("Parsing date:", date, "Parsed:", parsedDate);
  return isNaN(parsedDate.getTime()) ? null : parsedDate.toISOString();
};

const transformedEmployees: TableRow[] = employees.map(
  ({ birthDate, hireDate, ...rest }) => ({
    ...rest,
    birthDate: parseDate(birthDate),
    hireDate: parseDate(hireDate),
  })
);

const transformedProducts: TableRow[] = products.map((product) => ({
  ...product,
  productID: Number(product.productID) || 0,
  supplierID: Number(product.supplierID) || 0,
  categoryID: Number(product.categoryID) || 0,
  unitPrice: Number(product.unitPrice) || 0,
  unitsInStock: Number(product.unitsInStock) || 0,
  unitsOnOrder: Number(product.unitsOnOrder) || 0,
  reorderLevel: Number(product.reorderLevel) || 0,
  discontinued: Boolean(product.discontinued),
  productName: String(product.productName || ""),
  quantityPerUnit: String(product.quantityPerUnit || ""),
}));

const transformedOrders: TableRow[] = orders.map((order) => ({
  ...order,
  orderID: Number(order.orderID) || 0,
  employeeID: Number(order.employeeID) || 0,
  shipVia: Number(order.shipVia) || 0,
  freight: Number(order.freight) || 0,
  shippedDate: parseDate(order.shippedDate),
  orderDate: parseDate(order.orderDate),
  requiredDate: parseDate(order.requiredDate),
}));

export const mockDatabase: Record<string, TableRow[]> = {
  customers,
  employees: transformedEmployees,
  orders: transformedOrders,
  products: transformedProducts,
};

export const queryKey = (query: string) => query.toLowerCase().trim();

export const mockQueryResults: Record<string, TableRow[]> = {
  "SELECT * FROM customers;": customers,
  "SELECT * FROM employees;": transformedEmployees,
  "SELECT * FROM orders;": transformedOrders,
  "SELECT * FROM products;": transformedProducts,
  "SELECT firstName, lastName FROM employees;": transformedEmployees.map(
    ({ firstName, lastName }) => ({ firstName, lastName })
  ),
  "SELECT orderID, orderDate FROM orders;": transformedOrders.map(
    ({ orderID, orderDate }) => ({ orderID, orderDate })
  ),
  "SELECT COUNT(*) FROM customers;": [{ count: customers.length }],
  "SELECT COUNT(*) FROM employees;": [{ count: transformedEmployees.length }],
  "SELECT COUNT(*) FROM orders;": [{ count: transformedOrders.length }],
  "SELECT COUNT(*) FROM products;": [{ count: transformedProducts.length }],
  "SELECT * FROM employees ORDER BY hireDate ASC;": transformedEmployees.sort(
    (a, b) => {
      const dateA =
        a.hireDate && typeof a.hireDate === "string"
          ? new Date(a.hireDate).getTime()
          : 0;
      const dateB =
        b.hireDate && typeof b.hireDate === "string"
          ? new Date(b.hireDate).getTime()
          : 0;
      return dateA - dateB;
    }
  ),
  "SELECT * FROM orders ORDER BY orderDate DESC LIMIT 10;": transformedOrders
    .sort((a, b) => {
      const dateA =
        a.orderDate && typeof a.orderDate === "string"
          ? new Date(a.orderDate).getTime()
          : 0;
      const dateB =
        b.orderDate && typeof b.orderDate === "string"
          ? new Date(b.orderDate).getTime()
          : 0;
      return dateB - dateA;
    })
    .slice(0, 10),
};

console.log("📦 Mock Database Loaded:", Object.keys(mockDatabase));
