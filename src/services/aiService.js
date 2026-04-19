export const getGeminiInsights = async (transactions) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    // Demo fallback insights
    return "Based on your data: \n• You're spending a significant portion on Food. Consider meal prepping.\n• Your savings rate is currently 15%.\n• Pro-tip: Setting a strict budget for 'Shopping' could save you $200/mo.";
  }

  const prompt = `
    Analyze these financial transactions and provide 3-4 concise, actionable insights or tips.
    Transactions: ${JSON.stringify(transactions.map(t => ({ amount: t.amount, category: t.category, type: t.type, description: t.description })))}
    
    Format the output as a bulleted list of insights.
  `;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
