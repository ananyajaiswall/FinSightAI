# from transformers import BertTokenizer, BertForSequenceClassification
# from transformers import pipeline

# # Load FinBERT model and tokenizer
# finbert = BertForSequenceClassification.from_pretrained('yiyanghkust/finbert-tone', num_labels=3)
# tokenizer = BertTokenizer.from_pretrained('yiyanghkust/finbert-tone')

# nlp = pipeline("sentiment-analysis", model=finbert, tokenizer=tokenizer)

# # Financial Insights categorized
# insights=[
#     "Revenue increased from ₹231,839 crore in Dec '23 to ₹248,079 crore in Dec'24, indicating positive top-line growth."
#     "Sequential revenue increased from ₹235,481 crore in Sep '24 to ₹248,079 crore in Dec '24, showcasing strong quarter-over-quarter performance."
# ]
# revenue_growth = [
#     "Revenue increased from ₹231,839 crore in Dec '23 to ₹248,079 crore in Dec '24, indicating positive top-line growth.",
#     "Sequential revenue increased from ₹235,481 crore in Sep '24 to ₹248,079 crore in Dec '24, showcasing strong quarter-over-quarter performance."
# ]

# expense_growth = [
#     "Total expenses increased from ₹206,006 crore in Dec '23 to ₹219,436 crore in Dec '24, implying increased operational costs.",
#     "Sequential expenses increased from ₹215,320 crore in Sep '24 to ₹219,436 crore in Dec '24, suggesting rising costs quarter-over-quarter."
# ]

# net_profit_growth = [
#     "Net profit increased from ₹19,488 crore in Dec '23 to ₹21,804 crore in Dec '24, demonstrating enhanced profitability.",
#     "Sequential net profit increased from ₹19,101 crore in Sep '24 to ₹21,804 crore in Dec '24, highlighting improved bottom-line performance."
# ]

# profit_percentage_growth = [
#     "Net profit as a percentage of revenue increased from 8.41% in Dec '23 to 8.79% in Dec '24, indicating better efficiency.",
#     "Sequential net profit as a percentage of revenue increased from 8.11% in Sep '24 to 8.79% in Dec '24, signaling improved profitability margins."
# ]

# eps_growth = [
#     "Basic EPS increased from ₹12.76 in Dec '23 to ₹13.70 in Dec '24, indicating enhanced shareholder value.",
#     "Sequential basic EPS increased from ₹12.24 in Sep '24 to ₹13.70 in Dec '24, reflecting a positive growth trajectory."
# ]

# segment_performance=[
#     "Oil and Gas segment profit percentage saw positive growth from 63.43% in Sep '24 to 66.28% in Dec '24, marking efficiency improvements."
#     "Retail segment revenue increased significantly from ₹76,325 crore in Sep '24 to ₹90,351 crore in Dec '24, showcasing robust growth."
# ]

# # Function to analyze sentiment for each category
# def analyze_sentiment(category, sentences):
#     print(f"\n🔹 Sentiment Analysis for {category}:")
#     results = nlp(sentences)
#     for sentence, result in zip(sentences, results):
#         print(f"{sentence} → {result['label']} (Confidence: {result['score']:.2f})")

# # Perform Sentiment Analysis
# analyze_sentiment("Key Insights", insights)
# analyze_sentiment("Revenue Growth", revenue_growth)
# analyze_sentiment("Expense Growth", expense_growth)
# analyze_sentiment("Net Profit Growth", net_profit_growth)
# analyze_sentiment("Profit Percentage Growth", profit_percentage_growth)
# analyze_sentiment("EPS Growth", eps_growth)
# analyze_sentiment("Segment Performance", segment_performance)

# print("✅ Sentiment analysis complete!")
import os
print("Current Working Directory:", os.getcwd())
print("File Exists:", os.path.exists("gemini_output.json"))


import json
from transformers import pipeline

# Load Gemini's JSON output
with open("gemini_output.json", "r") as file:
    data = json.load(file)

# Extract insights for analysis
revenue_growth = data['insights']['revenueGrowth']
net_profit_growth = data['insights']['netProfitGrowth']
eps_growth = data['insights']['earningsPerShareGrowth']
segment_performance = data['insights']['segmentPerformance']

# Combine insights for analysis
all_insights = (
    revenue_growth +
    net_profit_growth +
    eps_growth +
    segment_performance
)

# Load FinBERT model for sentiment analysis
sentiment_analyzer = pipeline("sentiment-analysis", model="ProsusAI/finbert")

# Perform sentiment analysis
results = sentiment_analyzer(all_insights)

# Display results
for insight, result in zip(all_insights, results):
    print(f"{insight} --> {result['label']} ({result['score']:.2f})")

# Save analyzed data back to JSON
analyzed_data = {
    "insights": [
        {"text": insight, "sentiment": result['label'], "score": result['score']}
        for insight, result in zip(all_insights, results)
    ]
}

with open("analyzed_insights.json", "w") as file:
    json.dump(analyzed_data, file, indent=2)

print("✅ Sentiment analysis results saved in 'analyzed_insights.json'")