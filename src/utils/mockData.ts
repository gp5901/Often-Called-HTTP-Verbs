import customers from "../data/customers.json";
import orders from "../data/orders.json";
import employees from "../data/employees.json";
import products from "../data/products.json";
import { TableRow } from "../types";

const parseDate = (date: string | null | undefined): string | null => {
  if (!date) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed.toISOString();
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

export const queryKey = (query: string) =>
  query.toLowerCase().trim().replace(/;$/, "");

export const mockQueryResults: Record<string, TableRow[]> = {
  "select * from customers": customers,
  "select * from employees": transformedEmployees,
  "select * from orders": transformedOrders,
  "select * from products": transformedProducts,

  "select firstname, lastname from employees": transformedEmployees.map(
    ({ firstName, lastName }) => ({ firstName, lastName })
  ),
  "select orderid, orderdate from orders": transformedOrders.map(
    ({ orderID, orderDate }) => ({ orderID, orderDate })
  ),

  "select count(*) from customers": [{ count: customers.length }],
  "select count(*) from employees": [{ count: transformedEmployees.length }],
  "select count(*) from orders": [{ count: transformedOrders.length }],
  "select count(*) from products": [{ count: transformedProducts.length }],

  "select * from employees order by hiredate asc": [
    ...transformedEmployees,
  ].sort((a, b) => {
    const dateA =
      a.hireDate && typeof a.hireDate === "string"
        ? new Date(a.hireDate).getTime()
        : 0;
    const dateB =
      b.hireDate && typeof b.hireDate === "string"
        ? new Date(b.hireDate).getTime()
        : 0;
    return dateA - dateB;
  }),

  "select * from orders order by orderdate desc limit 10": [
    ...transformedOrders,
  ]
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

// ✅ Debug logs
console.log("📦 Mock Database Loaded:", Object.keys(mockDatabase));
console.log("📦 mockQueryResults Keys:", Object.keys(mockQueryResults));
