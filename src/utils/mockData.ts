import customers from "../data/customers.json";
import orders from "../data/orders.json";
import employees from "../data/employees.json";
import products from "../data/products.json";
import categories from "../data/categories.json";
import { TableRow } from "../types";

const parseDate = (date: string | null | undefined): string | null => {
  if (!date) return null;
  const parsed = new Date(date);
  return isNaN(parsed.getTime()) ? null : parsed.toISOString();
};

const transformedCustomers: TableRow[] = customers.map((customer) => {
  const normalized = toLowerCaseKeys(customer);
  return {
    ...normalized,
    customerID: String(normalized.customerid || ""),
    companyName: String(normalized.companyname || ""),
    contactName: String(normalized.contactname || ""),
    country: String(normalized.country || ""),
  } as TableRow;
});

const transformedEmployees: TableRow[] = employees.map(
  ({ birthDate, hireDate, ...rest }) => ({
    ...rest,
    city: rest.city ?? "",
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

// helper function
function toLowerCaseKeys<T extends Record<string, unknown>>(
  obj: T
): Record<Lowercase<keyof T & string>, T[keyof T]> {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key.toLowerCase(), value])
  ) as Record<Lowercase<keyof T & string>, T[keyof T]>;
}

const transformedOrders: TableRow[] = orders.map((order) => {
  // Normalize keys to handle any casing
  const normalized = toLowerCaseKeys(order);

  // Debug log to verify customerID normalization
  console.log("🧪 Order Debug:", {
    raw: order,
    normalizedCustomerID: normalized.customerid,
  });

  return {
    ...normalized,
    orderID: Number(normalized.orderid) || 0,
    employeeID: Number(normalized.employeeid) || 0,
    shipVia: Number(normalized.shipvia) || 0,
    freight: Number(normalized.freight) || 0,
    customerID: String(normalized.customerid || ""),
    shippedDate: parseDate(String(normalized.shippeddate)),
    orderDate: parseDate(String(normalized.orderdate)),
    requiredDate: parseDate(String(normalized.requireddate)),
    shipCountry: normalized.shipcountry ?? "",
  } as TableRow;
});

// 🔍 Log a sample to validate
console.log("📦 Orders Sample:", transformedOrders.slice(0, 3));

const transformedCategories: TableRow[] = categories.map((cat) => ({
  ...cat,
  categoryID: Number(cat.categoryID),
  categoryName: String(cat.categoryName || ""),
  description: String(cat.description || ""),
}));

export const mockDatabase: Record<string, TableRow[]> = {
  customers: transformedCustomers,
  employees: transformedEmployees,
  orders: transformedOrders,
  products: transformedProducts,
  categories: transformedCategories,
};

export const queryKey = (query: string) =>
  query.toLowerCase().trim().replace(/;$/, "");

export const mockQueryResults: Record<string, TableRow[]> = {
  "select * from customers": customers,
  "select * from employees": transformedEmployees,
  "select * from orders": transformedOrders,
  "select * from products": transformedProducts,
  "select * from categories": transformedCategories,

  "select customerid, companyname from customers": customers.map(
    ({ customerID, companyName }) => ({ customerID, companyName })
  ),
  "select firstname, lastname from employees": transformedEmployees.map(
    ({ firstName, lastName }) => ({ firstName, lastName })
  ),
  "select orderid, orderdate from orders": transformedOrders.map(
    ({ orderID, orderDate }) => ({ orderID, orderDate })
  ),
  "select productid, productname, unitprice from products":
    transformedProducts.map(({ productID, productName, unitPrice }) => ({
      productID,
      productName,
      unitPrice,
    })),
  "select categoryid, categoryname from categories": transformedCategories.map(
    ({ categoryID, categoryName }) => ({ categoryID, categoryName })
  ),

  "select count(*) from customers": [{ count: customers.length }],
  "select count(*) from employees": [{ count: transformedEmployees.length }],
  "select count(*) from orders": [{ count: transformedOrders.length }],
  "select count(*) from products": [{ count: transformedProducts.length }],
  "select count(*) from categories": [{ count: transformedCategories.length }],

  "select * from customers where country = 'usa'": customers.filter(
    (c) => (c.country ?? "").toLowerCase() === "usa"
  ),
  "select * from customers where country = 'germany'": customers.filter(
    (c) => (c.country ?? "").toLowerCase() === "germany"
  ),

  "select * from employees where city = 'london'": transformedEmployees.filter(
    (e) => String(e.city ?? "").toLowerCase() === "london"
  ),
  "select * from employees where city = 'seattle'": transformedEmployees.filter(
    (e) => String(e.city ?? "").toLowerCase() === "seattle"
  ),

  "select * from orders where shippeddate > '2023-01-01'":
    transformedOrders.filter(
      (o) =>
        typeof o.shippedDate === "string" &&
        new Date(o.shippedDate) > new Date("2023-01-01")
    ),

  "select * from orders where shipcountry = 'france'": transformedOrders.filter(
    (o) => String(o.shipCountry ?? "").toLowerCase() === "france"
  ),

  "select * from products where discontinued = 1": transformedProducts.filter(
    (p) => p.discontinued === true
  ),
  "select * from products where discontinued = false":
    transformedProducts.filter((p) => p.discontinued === false),

  "select * from employees order by hiredate asc": [
    ...transformedEmployees,
  ].sort((a, b) => {
    const dateA =
      typeof a.hireDate === "string" || typeof a.hireDate === "number"
        ? new Date(a.hireDate).getTime()
        : 0;
    const dateB =
      typeof b.hireDate === "string" || typeof b.hireDate === "number"
        ? new Date(b.hireDate).getTime()
        : 0;
    return dateA - dateB;
  }),

  "select * from orders order by orderdate desc limit 10": [
    ...transformedOrders,
  ]
    .sort((a, b) => {
      const dateA =
        typeof a.orderDate === "string" || typeof a.orderDate === "number"
          ? new Date(a.orderDate).getTime()
          : 0;
      const dateB =
        typeof b.orderDate === "string" || typeof b.orderDate === "number"
          ? new Date(b.orderDate).getTime()
          : 0;
      return dateB - dateA;
    })
    .slice(0, 10),

  "select * from categories where categoryname = 'beverages'": (
    mockDatabase.categories || []
  ).filter(
    (c) =>
      typeof c.categoryName === "string" &&
      c.categoryName.toLowerCase() === "beverages"
  ),

  "select * from products order by unitprice desc limit 5": [
    ...mockDatabase.products,
  ]
    .sort((a, b) => {
      const priceA = typeof a.unitPrice === "number" ? a.unitPrice : 0;
      const priceB = typeof b.unitPrice === "number" ? b.unitPrice : 0;
      return priceB - priceA;
    })
    .slice(0, 5),

  "select distinct customerid, companyname from customers join orders on customers.customerid = orders.customerid":
    [
      ...new Map(
        mockDatabase.orders
          .map((order) => {
            const customer = mockDatabase.customers.find(
              (c) =>
                String(c["customerID"]).toLowerCase() ===
                String(order["customerID"]).toLowerCase()
            );
            // Debug logs
            console.log("🔍 order.customerID:", order["customerID"]);
            console.log("🔍 matched customer:", customer);

            return customer
              ? [
                  String(customer["customerID"]),
                  {
                    customerID: customer["customerID"],
                    companyName: customer["companyName"],
                  },
                ]
              : null;
          })
          .filter(Boolean) as [string, TableRow][]
      ).values(),
    ],

  "select employeeid, firstname, lastname, count(orderid) from employees join orders on employees.employeeid = orders.employeeid group by employeeid order by count(orderid) desc limit 5":
    [
      ...mockDatabase.employees.map((emp) => {
        const count = mockDatabase.orders.filter(
          (o) => o.employeeID === emp.employeeID
        ).length;

        return {
          employeeID: emp.employeeID,
          firstName: emp.firstName,
          lastName: emp.lastName,
          count,
        };
      }),
    ]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5),
};

// Debug logs
console.log("📦 Mock Database Loaded:", Object.keys(mockDatabase));
console.log("📦 mockQueryResults Keys:", Object.keys(mockQueryResults));
