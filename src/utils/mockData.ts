import { parse, FromTable, SelectStatement } from "pgsql-ast-parser"; // PostgreSQL AST parser

export const mockDatabase = {
  users: [
    { id: 1, name: "Alice", age: 25, role: "Admin" },
    { id: 2, name: "Bob", age: 30, role: "User" },
    { id: 3, name: "Charlie", age: 22, role: "User" },
    { id: 4, name: "David", age: 35, role: "Admin" },
  ],
  employees: [
    { id: 1, name: "Nancy Davolio", salary: "N/A", department: "Sales" },
    { id: 2, name: "Andrew Fuller", salary: "N/A", department: "Sales" },
    { id: 3, name: "Janet Leverling", salary: "N/A", department: "Sales" },
    { id: 4, name: "Margaret Peacock", salary: "N/A", department: "Sales" },
    { id: 5, name: "Steven Buchanan", salary: "N/A", department: "Sales" },
    { id: 6, name: "Michael Suyama", salary: "N/A", department: "Sales" },
    { id: 7, name: "Robert King", salary: "N/A", department: "Sales" },
    { id: 8, name: "Laura Callahan", salary: "N/A", department: "Sales" },
    { id: 9, name: "Anne Dodsworth", salary: "N/A", department: "Sales" },
  ],
  orders: [
    {
      id: 10248,
      name: "Vins et alcools Chevalier",
      salary: 32.38,
      department: "Sales",
    },
    {
      id: 10249,
      name: "Toms Spezialitäten",
      salary: 11.61,
      department: "Sales",
    },
    { id: 10250, name: "Hanari Carnes", salary: 65.83, department: "Sales" },
    {
      id: 10251,
      name: "Victuailles en stock",
      salary: 41.34,
      department: "Sales",
    },
    { id: 10252, name: "Suprêmes délices", salary: 51.3, department: "Sales" },
    { id: 10253, name: "Hanari Carnes", salary: 58.17, department: "Sales" },
    {
      id: 10254,
      name: "Chop-suey Chinese",
      salary: 22.98,
      department: "Sales",
    },
    {
      id: 10255,
      name: "Richter Supermarkt",
      salary: 148.33,
      department: "Sales",
    },
    {
      id: 10256,
      name: "Wellington Importadora",
      salary: 13.97,
      department: "Sales",
    },
    { id: 10257, name: "HILARION-Abastos", salary: 81.91, department: "Sales" },
    { id: 10258, name: "Ernst Handel", salary: 140.51, department: "Sales" },
    {
      id: 10259,
      name: "Centro comercial Moctezuma",
      salary: 3.25,
      department: "Sales",
    },
    {
      id: 10260,
      name: "Ottilies Käseladen",
      salary: 55.09,
      department: "Sales",
    },
    { id: 10261, name: "Que Delícia", salary: 3.05, department: "Sales" },
    {
      id: 10262,
      name: "Rattlesnake Canyon Grocery",
      salary: 48.29,
      department: "Sales",
    },
    { id: 10263, name: "Ernst Handel", salary: 146.06, department: "Sales" },
    { id: 10264, name: "Folk och fä HB", salary: 3.67, department: "Sales" },
    {
      id: 10265,
      name: "Blondel père et fils",
      salary: 55.28,
      department: "Sales",
    },
    { id: 10266, name: "Wartian Herkku", salary: 25.73, department: "Sales" },
    { id: 10267, name: "Frankenversand", salary: 208.58, department: "Sales" },
    {
      id: 10268,
      name: "GROSELLA-Restaurante",
      salary: 66.29,
      department: "Sales",
    },
    {
      id: 10269,
      name: "White Clover Markets",
      salary: 4.56,
      department: "Sales",
    },
    { id: 10270, name: "Wartian Herkku", salary: 136.54, department: "Sales" },
    {
      id: 10271,
      name: "Split Rail Beer & Ale",
      salary: 4.54,
      department: "Sales",
    },
    {
      id: 10272,
      name: "Rattlesnake Canyon Grocery",
      salary: 98.03,
      department: "Sales",
    },
    { id: 10273, name: "QUICK-Stop", salary: 76.07, department: "Sales" },
    {
      id: 10274,
      name: "Vins et alcools Chevalier",
      salary: 6.01,
      department: "Sales",
    },
    {
      id: 10275,
      name: "Magazzini Alimentari Riuniti",
      salary: 26.93,
      department: "Sales",
    },
    {
      id: 10276,
      name: "Tortuga Restaurante",
      salary: 13.84,
      department: "Sales",
    },
    {
      id: 10277,
      name: "Morgenstern Gesundkost",
      salary: 125.77,
      department: "Sales",
    },
    {
      id: 10278,
      name: "Berglunds snabbköp",
      salary: 92.69,
      department: "Sales",
    },
    {
      id: 10279,
      name: "Lehmanns Marktstand",
      salary: 25.83,
      department: "Sales",
    },
    {
      id: 10280,
      name: "Berglunds snabbköp",
      salary: 8.98,
      department: "Sales",
    },
    { id: 10281, name: "Romero y tomillo", salary: 2.94, department: "Sales" },
    { id: 10282, name: "Romero y tomillo", salary: 12.69, department: "Sales" },
    {
      id: 10283,
      name: "LILA-Supermercado",
      salary: 84.81,
      department: "Sales",
    },
    {
      id: 10284,
      name: "Lehmanns Marktstand",
      salary: 76.56,
      department: "Sales",
    },
    { id: 10285, name: "QUICK-Stop", salary: 76.83, department: "Sales" },
  ],
  products: [
    { id: 1, name: "Chai", salary: 18, department: "Sales" },
    { id: 2, name: "Chang", salary: 19, department: "Sales" },
    { id: 3, name: "Aniseed Syrup", salary: 10, department: "Sales" },
    {
      id: 4,
      name: "Chef Anton's Cajun Seasoning",
      salary: 22,
      department: "Sales",
    },
    {
      id: 5,
      name: "Chef Anton's Gumbo Mix",
      salary: 21.35,
      department: "Sales",
    },
    {
      id: 6,
      name: "Grandma's Boysenberry Spread",
      salary: 25,
      department: "Sales",
    },
    {
      id: 7,
      name: "Uncle Bob's Organic Dried Pears",
      salary: 30,
      department: "Sales",
    },
    {
      id: 8,
      name: "Northwoods Cranberry Sauce",
      salary: 40,
      department: "Sales",
    },
    { id: 9, name: "Mishi Kobe Niku", salary: 97, department: "Sales" },
    { id: 10, name: "Ikura", salary: 31, department: "Sales" },
    { id: 11, name: "Queso Cabrales", salary: 21, department: "Sales" },
    {
      id: 12,
      name: "Queso Manchego La Pastora",
      salary: 38,
      department: "Sales",
    },
    { id: 13, name: "Konbu", salary: 6, department: "Sales" },
    { id: 14, name: "Tofu", salary: 23.25, department: "Sales" },
    { id: 15, name: "Genen Shouyu", salary: 15.5, department: "Sales" },
    { id: 16, name: "Pavlova", salary: 17.45, department: "Sales" },
    { id: 17, name: "Alice Mutton", salary: 39, department: "Sales" },
    { id: 18, name: "Carnarvon Tigers", unitPrice: 62.5, unitsInStock: 42 },
    {
      id: 19,
      name: "Teatime Chocolate Biscuits",
      unitPrice: 9.2,
      unitsInStock: 25,
    },
    { id: 20, name: "Sir Rodney's Marmalade", unitPrice: 81, unitsInStock: 40 },
    { id: 21, name: "Sir Rodney's Scones", unitPrice: 10, unitsInStock: 3 },
    { id: 22, name: "Gustaf's Knäckebröd", unitPrice: 21, unitsInStock: 104 },
    { id: 23, name: "Tunnbröd", unitPrice: 9, unitsInStock: 61 },
    { id: 24, name: "Guaraná Fantástica", unitPrice: 4.5, unitsInStock: 20 },
    {
      id: 25,
      name: "NuNuCa Nuß-Nougat-Creme",
      unitPrice: 14,
      unitsInStock: 76,
    },
    { id: 26, name: "Gumbär Gummibärchen", unitPrice: 31.23, unitsInStock: 15 },
    { id: 27, name: "Schoggi Schokolade", unitPrice: 43.9, unitsInStock: 49 },
    { id: 28, name: "Rössle Sauerkraut", unitPrice: 45.6, unitsInStock: 26 },
    {
      id: 29,
      name: "Thüringer Rostbratwurst",
      unitPrice: 123.79,
      unitsInStock: 0,
    },
    {
      id: 30,
      name: "Nord-Ost Matjeshering",
      unitPrice: 25.89,
      unitsInStock: 10,
    },
    { id: 31, name: "Gorgonzola Telino", unitPrice: 12.5, unitsInStock: 0 },
    { id: 32, name: "Mascarpone Fabioli", unitPrice: 32, unitsInStock: 9 },
    { id: 33, name: "Geitost", unitPrice: 2.5, unitsInStock: 112 },
    { id: 34, name: "Sasquatch Ale", unitPrice: 14, unitsInStock: 111 },
  ],
};

export const mockQueries = [
  "SELECT * FROM users;",
  "SELECT name, age FROM users WHERE age > 30;",
  "SELECT COUNT(*) FROM orders;",
  "SELECT id, name FROM orders WHERE salary < 20;",
  "SELECT name, department FROM products WHERE unitsInStock > 5;",
];

// Define the structure of a SQL query result row
type QueryResult = Record<string, string | number | boolean | undefined>;

export const mockQueryResults = (query: string): QueryResult[] => {
  try {
    const ast = parse(query);

    // Check for invalid or empty AST
    if (!Array.isArray(ast) || ast.length === 0) {
      console.warn("Invalid or empty SQL AST.");
      return [];
    }

    const statement = ast[0] as SelectStatement;
    // Only process SELECT queries
    if (statement.type !== "select") {
      console.warn("Only SELECT queries are supported.");
      return [];
    }

    // Safely extract the table name from the AST
    const table = (statement.from?.[0] as FromTable)?.name.name;
    if (!table || !(table in mockDatabase)) {
      console.warn(`Table "${table}" not found in mock database.`);
      return [];
    }

    // Extract selected columns (defaulting to "*" if none are specified)
    const selectedColumns = statement.columns
      ?.map((col) => (col.expr.type === "ref" ? col.expr.name : "*"))
      .filter(Boolean) as string[];

    const results = mockDatabase[table as keyof typeof mockDatabase];

    // Ensure that results is an array
    if (!Array.isArray(results)) {
      console.warn(`No data found for table "${table}".`);
      return [];
    }

    // Return filtered rows based on selected columns
    return selectedColumns.includes("*")
      ? results
      : results.map((row) =>
          Object.fromEntries(
            Object.entries(row).filter(([key]) => selectedColumns.includes(key))
          )
        );
  } catch (err) {
    console.error("SQL Parsing Error:", err);
    return [];
  }
};
