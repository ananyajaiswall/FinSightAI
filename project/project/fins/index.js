require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const mime = require("mime-types");

// Validate API Key
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("API key not found. Please check your .env file.");
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const userPrompt = `
You are a balance sheet analyzer. I will input a balance sheet (PDF) of quarterly results of a listed company. Your task is to extract important data and return it in structured JSON format.

Provide:
Company name.
Financial summary for the current quarter, previous quarter, and the previous year's quarter. Include total income, total expenses, net profit, net profit as a percentage of revenue, and earnings per share.
Product segment-wise results for revenue and net profit as a percentage of revenue for each quarter.
2 insights each on 1) total income (revenue) growth and expenses growth, 2) profit after tax (net profit) growth and profit percentage growth, 3) and earnings per share growth.
2 insights on segment-wise performance in terms of revenue and net profit percentage (or EBITDA percentage, whichever is available) growth.
6 key management commentary points from the balance sheet.
Provide all outputs in a structured JSON format like this. In case of negative values inside '()', output them as -int instead of (int). Leave the data field empty in case of absent information. do not output anything extra. do not output any notes:

{
"companyName": "string",
"financials": [
{
"quarter": "string (select date from pdf)",
"totalIncome": float,
"totalExpenses": float,
"netProfit": float,
"netProfitPercentage": float,
"earningsPerShare": float
}
],
"segmentResults": [
{
"quarter": "string (select date from pdf)",
"segments": [
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
},
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
}
]
},
{
"quarter": "string (select date from pdf)",
"segments": [
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
},
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
}
]
},
{
"quarter": "string (select date from pdf)",
"segments": [
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
},
{
"name": "string (segment_name)",
"totalIncome": float,
"netProfit": float,
"netProfitPercentage": float
}
]
}
],
"insights": {
"totalIncomeGrowth": [],
"netProfitGrowth": [],
"earningsPerShareGrowth": [],
"segmentPerformance": []
},
"managementCommentary": []
}

`;


async function run() {
  console.log("Uploading PDF and analyzing data...");

  const pdfPath = 'sample.pdf';
  if (!fs.existsSync(pdfPath)) {
    console.error('PDF file not found! Please add sample.pdf to the project directory.');
    return;
  }

  const pdfData = fs.readFileSync(pdfPath);
  const pdfBase64 = pdfData.toString('base64');
  const pdfMimeType = mime.lookup(pdfPath) || 'application/pdf';

  try {
    const chatSession = model.startChat({
      history: [{ role: "user", parts: [{ text: userPrompt }] }],
    });

    const result = await chatSession.sendMessage([
      {
        inlineData: {
          mimeType: pdfMimeType,
          data: pdfBase64,
        },
      },
    ]);

    const candidates = result?.response?.candidates;
    if (!candidates || candidates.length === 0) {
      console.error("No response received from the model.");
      return;
    }

    let geminiOutput = "";
    for (const candidate of candidates) {
      if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.text) {
            geminiOutput += part.text;
          }
        }
      }
    }

    // Enhanced Cleanup for JSON Formatting
    const cleanOutput = geminiOutput
      .replace(/```json/g, "")  // Remove starting code block
      .replace(/```/g, "")      // Remove closing code block
      .replace(/\n/g, "")       // Remove unwanted newlines
      .replace(/\s{2,}/g, " ")  // Reduce extra spaces
      .trim();                  

    // Fallback: Extract JSON string from text if necessary
    const jsonMatch = cleanOutput.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : cleanOutput;

    // Save the output as JSON
    try {
      const jsonData = JSON.parse(jsonText); // Ensure valid JSON
      fs.writeFileSync('gemini_output.json', JSON.stringify(jsonData, null, 2));
      console.log("✅ Data successfully saved in 'gemini_output.json'");
    } catch (parseError) {
      console.error("Error parsing response to JSON:", parseError);
      console.error("🟠 Raw Response for Debugging:", jsonText);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
}

run();
