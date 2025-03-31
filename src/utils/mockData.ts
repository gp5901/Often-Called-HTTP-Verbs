import customers from "../data/customers.json";
import orders from "../data/orders.json";
import employees from "../data/employees.json";
import products from "../data/products.json";

// Define a flexible row type to accommodate varying table structures
type TableRow =
  | { [key: string]: string | number | boolean | null } // General structure
  | Partial<{
      customerID: string;
      companyName: string;
      contactName: string;
      contactTitle: string;
      address: string;
      city: string;
      region: string;
      postalCode: string;
      country: string;
      phone: string;
      fax?: string;
    }>
  | {
      employeeID: string;
      lastName: string;
      firstName: string;
      title: string;
      birthDate: string;
      hireDate: string;
      city: string;
      country: string;
      homePhone: string;
      extension: number;
      notes: string;
      reportsTo?: number;
    }
  | {
      orderID: number;
      customerID: string;
      employeeID: number;
      orderDate: string;
      requiredDate: string;
      shippedDate?: string;
      shipVia: number;
      freight: number;
      shipName: string;
      shipAddress: string;
      shipCity: string;
      shipRegion?: string;
      shipPostalCode?: string;
      shipCountry: string;
    }
  | {
      productID: number;
      productName: string;
      supplierID: number;
      categoryID: number;
      quantityPerUnit: string;
      unitPrice: number;
      unitsInStock: number;
      unitsOnOrder: number;
      reorderLevel: number;
      discontinued: boolean;
    };

// Transform products once and reuse it
const transformedProducts = products.map((product) => ({
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

export const mockDatabase: Record<string, TableRow[]> = {
  customers,
  orders,
  employees,
  products: transformedProducts,
};

// Normalize query keys to make lookups case-insensitive
export const queryKey = (query: string) => query.toLowerCase().trim();

export const mockQueryResults: Record<string, TableRow[]> = {
  "SELECT * FROM customers;": customers,
  "SELECT * FROM orders;": orders,
  "SELECT * FROM employees;": employees,
  "SELECT * FROM products;": transformedProducts, // Reusing transformedProducts
};

console.log("Mock Data:", JSON.stringify(mockDatabase, null, 2));
