import React, { useState }  from "react";
import geminiData from "C:\\Users\\anany\\OneDrive\\Desktop\\Finsight\\project\\finsight\\gemini_output.json";
import { AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";


// Mock Data (Replace with API response after PDF extraction)
const data = geminiData;
  // "companyName": "Zomato Limited",
  // "financials": [
  //   {
  //     "quarter": "December 31, 2024",
  //     "totalIncome": 5657.0,
  //     "totalExpenses": 5533.0,
  //     "netProfit": 59.0,
  //     "netProfitPercentage": 1.04,
  //     "earningsPerShare": 0.07
  //   },
  //   {
  //     "quarter": "September 30, 2024",
  //     "totalIncome": 5020.0,
  //     "totalExpenses": 4783.0,
  //     "netProfit": 176.0,
  //     "netProfitPercentage": 3.50,
  //     "earningsPerShare": 0.21
  //   },
  //   {
  //     "quarter": "December 31, 2023",
  //     "totalIncome": 3507.0,
  //     "totalExpenses": 3383.0,
  //     "netProfit": 138.0,
  //     "netProfitPercentage": 3.93,
  //     "earningsPerShare": 0.16
  //   }
  // ],
  // "segmentResults": [
  //   {
  //     "quarter": "December 31, 2024",
  //     "segments": [
  //       {
  //         "name": "India food ordering and delivery",
  //         "totalIncome": 2072.0,
  //         "netProfit": 432.0,
  //         "netProfitPercentage": 20.86
  //       },
  //       {
  //         "name": "Hyperpure supplies (B2B business)",
  //         "totalIncome": 1671.0,
  //         "netProfit": -9.0,
  //         "netProfitPercentage": -0.54
  //       },
  //       {
  //         "name": "Quick commerce",
  //         "totalIncome": 1399.0,
  //         "netProfit": -30.0,
  //         "netProfitPercentage": -2.14
  //       },
  //       {
  //         "name": "Going Out",
  //         "totalIncome": 259.0,
  //         "netProfit": -15.0,
  //         "netProfitPercentage": -5.79
  //       },
  //       {
  //         "name": "All other segments (Residual)",
  //         "totalIncome": 4.0,
  //         "netProfit": 1.0,
  //         "netProfitPercentage": 25.0
  //       }
  //     ]
  //   },
  //   {
  //     "quarter": "September 30, 2024",
  //     "segments": [
  //       {
  //         "name": "India food ordering and delivery",
  //         "totalIncome": 2012.0,
  //         "netProfit": 349.0,
  //         "netProfitPercentage": 17.35
  //       },
  //       {
  //         "name": "Hyperpure supplies (B2B business)",
  //         "totalIncome": 1473.0,
  //         "netProfit": -12.0,
  //         "netProfitPercentage": -0.81
  //       },
  //       {
  //         "name": "Quick commerce",
  //         "totalIncome": 1156.0,
  //         "netProfit": 48.0,
  //         "netProfitPercentage": 4.15
  //       },
  //       {
  //         "name": "Going Out",
  //         "totalIncome": 154.0,
  //         "netProfit": 18.0,
  //         "netProfitPercentage": 11.68
  //       },
  //       {
  //         "name": "All other segments (Residual)",
  //         "totalIncome": 4.0,
  //         "netProfit": 2.0,
  //         "netProfitPercentage": 50.0
  //       }
  //     ]
  //   },
  //   {
  //     "quarter": "December 31, 2023",
  //     "segments": [
  //       {
  //         "name": "India food ordering and delivery",
  //         "totalIncome": 1704.0,
  //         "netProfit": 258.0,
  //         "netProfitPercentage": 15.14
  //       },
  //       {
  //         "name": "Hyperpure supplies (B2B business)",
  //         "totalIncome": 859.0,
  //         "netProfit": -27.0,
  //         "netProfitPercentage": -3.14
  //       },
  //       {
  //         "name": "Quick commerce",
  //         "totalIncome": 644.0,
  //         "netProfit": -56.0,
  //         "netProfitPercentage": -8.70
  //       },
  //       {
  //         "name": "Going Out",
  //         "totalIncome": 73.0,
  //         "netProfit": 2.0,
  //         "netProfitPercentage": 2.74
  //       },
  //       {
  //         "name": "All other segments (Residual)",
  //         "totalIncome": 8.0,
  //         "netProfit": -4.0,
  //         "netProfitPercentage": -50.0
  //       }
  //     ]
  //   }
  // ],
  // "insights": {
  //   "totalIncomeGrowth": [
  //     "Total income showed a significant increase from 3507.0 in Dec 2023 to 5657.0 in Dec 2024.",
  //     "The growth rate of total income slowed down from Sep 2024 to Dec 2024."
  //   ],
  //   "netProfitGrowth": [
  //     "Net profit declined from 176.0 in Sep 2024 to 59.0 in Dec 2024.",
  //     "Profit percentage also decreased from 3.50% in Sep 2024 to 1.04% in Dec 2024, indicating a substantial drop in profitability."
  //   ],
  //   "earningsPerShareGrowth": [
  //     "Earnings per share (EPS) decreased from 0.21 in Sep 2024 to 0.07 in Dec 2024.",
  //     "This decline in EPS is consistent with the overall decline in net profit."
  //   ],
  //   "segmentPerformance": [
  //     "India food ordering and delivery segment shows consistent net profit margins across quarters, while other segments show more variability.",
  //     "Quick commerce segment shows significant fluctuation in net profit margins, indicating operational challenges."
  //   ]
  // },
  // "managementCommentary": [
  //   "The Financial Results have been reviewed by the Audit Committee and approved by the Board of Directors.",
  //   "The Company received demand orders from GST authorities for tax on delivery charges.",
  //   "The Company has filed appeals against these demand orders.",
  //   "The Company believes it has a strong case on merits regarding the GST dispute.",
  //   "Zomato Limited completed the acquisition of Orbgen Technologies Private Limited and Wasteland Entertainment Private Limited.",
  //   "The Company allotted equity shares to Foodie Bay Employees ESOP Trust."
  // 
  

function AnalysisPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-center mb-4">{data.companyName} - Balance Sheet Analysis</h1>
      <Charts financials={data.financials} segments={data.segmentResults} insights={data.insights} />

      {/* Management Commentary Section */}
      <div className="mt-12 p-6 bg-white shadow-lg rounded-lg w-full max-w-[1400px] mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Management Commentary</h2>
        <ul className="list-disc list-inside text-gray-700">
          {data.managementCommentary.map((point, index) => (
            <li key={index} className="mb-2">{point}</li>
          ))}
        </ul>
      </div>

    </div>
  );
}

function Charts({ financials, segments, insights }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
      <GridItem 
        title="Total Income vs Expenses" 
        insights={insights.totalIncomeGrowth}
      >
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={financials}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="totalIncome" stroke="#8884d8" fill="#8884d8" name="Total Income" />
            <Area type="monotone" dataKey="totalExpenses" stroke="#82ca9d" fill="#82ca9d" name="Total Expenses" />
          </AreaChart>
        </ResponsiveContainer>
      </GridItem>

      <GridItem 
        title="Profit vs Profit Margin" 
        insights={insights.netProfitGrowth}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={financials}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="netProfit" stroke="#ff7300" name="Net Profit" />
            <Line type="monotone" dataKey="netProfitPercentage" stroke="#387908" name="Profit Margin (%)" />
          </LineChart>
        </ResponsiveContainer>
      </GridItem>

      <GridItem 
        title="Earnings Per Equity Share" 
        insights={insights.earningsPerShareGrowth}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={financials}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="earningsPerShare" fill="#8884d8" name="EPS" />
          </BarChart>
        </ResponsiveContainer>
      </GridItem>

      <GridItem 
        title="Revenue by Segment" 
        insights={insights.segmentPerformance}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={segments.flatMap(s => 
            s.segments.map(seg => ({
              quarter: s.quarter,
              [seg.name]: seg.totalIncome
            }))
          ).reduce((acc, curr) => {
            let found = acc.find(item => item.quarter === curr.quarter);
            if (found) Object.assign(found, curr);
            else acc.push(curr);
            return acc;
          }, [])}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Legend />
            {segments[0].segments.map(seg => (
              <Bar key={seg.name} dataKey={seg.name} stackId="a" fill={`#${Math.floor(Math.random() * 16777215).toString(16)}`} name={seg.name} />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </GridItem>
    </div>
  );
}

function GridItem({ title, children, insights }) {
  return (
    <div className="p-6 border border-gray-300 bg-white text-black rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      {children}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">Key Insights:</h4>
        <ul className="list-disc list-inside text-sm text-gray-700">
          {insights.map((insight, index) => (
            <li key={index} className="mb-1">{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AnalysisPage;