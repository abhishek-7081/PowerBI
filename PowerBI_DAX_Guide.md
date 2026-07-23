# 📊 Power BI Executive Analytics Project Guide

Welcome to the **Power BI Analytics Project**. This project includes both a standalone **Interactive Web Dashboard** (React + Express API) and a complete set of dataset files and DAX formulas ready to load into **Microsoft Power BI Desktop**.

---

## 📁 Project Architecture

```
c:\Users\HP Victus\Desktop\PowerBI\
├── Backend/
│   ├── data/
│   │   └── sales_analytics.csv    <-- Primary Data Source
│   ├── server.js                  <-- REST API & DAX Engine Simulation
│   └── package.json
├── Frontend/
│   └── PowerBi-Front/            <-- Web Dashboard App (React + Recharts)
└── PowerBI_DAX_Guide.md           <-- Power BI Desktop & DAX Instructions
```

---

## 🚀 How to Run the Web Dashboard Application

### 1. Start Backend Data API Server
Open terminal in `Backend/` directory:
```bash
cd Backend
npm start
```
*Server runs on:* `http://localhost:5000`

### 2. Start Frontend Power BI App
Open another terminal in `Frontend/PowerBi-Front/` directory:
```bash
cd Frontend/PowerBi-Front
npm run dev
```
*App runs on:* `http://localhost:5173`

---

## 🧮 DAX Measure Reference for Power BI Desktop

If you open `Backend/data/sales_analytics.csv` in **Microsoft Power BI Desktop**, use the following DAX measure formulas:

### 1. Total Sales Revenue
```dax
Total Sales = SUM(sales_analytics[Sales])
```

### 2. Net Profit
```dax
Total Profit = SUM(sales_analytics[Profit])
```

### 3. Net Profit Margin %
```dax
Profit Margin % = 
DIVIDE(
    [Total Profit], 
    [Total Sales], 
    0
) * 100
```

### 4. Year-To-Date (YTD) Revenue
```dax
YTD Sales = 
TOTALYTD(
    [Total Sales], 
    sales_analytics[Date]
)
```

### 5. Same Period Last Year (SPLY) Comparison
```dax
Sales SPLY = 
CALCULATE(
    [Total Sales], 
    SAMEPERIODLASTYEAR(sales_analytics[Date])
)
```

### 6. Technology Enterprise Sales Filter
```dax
Tech Enterprise Sales = 
CALCULATE(
    [Total Sales],
    sales_analytics[Category] = "Technology",
    sales_analytics[Segment] = "Enterprise"
)
```

---

## 🛠️ Step-by-Step Instructions to Load in Power BI Desktop

1. Open **Microsoft Power BI Desktop**.
2. Click **Get Data** -> **Text/CSV**.
3. Browse and select: `c:\Users\HP Victus\Desktop\PowerBI\Backend\data\sales_analytics.csv`.
4. Click **Load** (or **Transform Data** to verify column data types: `Sales` as Currency/Decimal, `Units` as Whole Number, `Date` as Date).
5. Click **New Measure** in the Modeling tab and paste the DAX formulas above.
6. Drag and drop visuals:
   - **Card Visuals**: `Total Sales`, `Total Profit`, `Profit Margin %`
   - **Clustered Bar Chart**: Axis = `Region`, Values = `Total Sales` and `Total Profit`
   - **Line Chart**: Axis = `Date` (Month), Values = `Total Sales`
   - **Slicers**: Fields = `Region`, `Category`, `Segment`
