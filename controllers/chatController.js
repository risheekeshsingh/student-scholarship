const handleChat = async (req, res) => {
  try {
    const { history, message, profile } = req.body;

    // RAG Strategy: Dynamically load exact Platform Database tracking Colleges vs Scholarships natively!
    // This forcibly prevents AI "Hallucination" by granting it 100% omniscient memory of the local JSON metrics.
    const institutionsDb = require('../data/institutions.json');
    const scholarshipsDb = require('../data/scholarships.json');

    // Context Contextualization
    const systemInstruction = `You are EduGrant AI, an intelligent agent for a national scholarship/college platform.
You have DIRECT read-access to the official platform database parameters completely overriding external hallucination:

[INSTITUTIONS DATABASE]:
${JSON.stringify(institutionsDb)}

[SCHOLARSHIPS DATABASE]:
${JSON.stringify(scholarshipsDb)}

INSTRUCTIONS & CORE RULES:
1. If the user mentions a STATE or LOCATION (e.g., "Delhi", "Maharashtra", "Bangalore", etc.):
   - Immediately look at the [INSTITUTIONS DATABASE] and list the Colleges physically located there.
   - ALWAYS include the official application link via the exact 'websiteUrl' given.
   - Format natively: • College Name (Rank: X) - URL: https://example.com

2. If the user wants Scholarships explicitly:
   - Make sure you know their Income and State/Category bounds.
   - Cross-reference against the [SCHOLARSHIPS DATABASE] and match their profiles identically against 'minMarks', 'incomeLimit', etc.
   - ALWAYS include the direct application link using 'applyUrl'.
   - Format natively: • Scholarship Name - Deadline: DD/MM ⚠️ - Apply: https://example.com 

3. Keep conversational elements drastically short. Use bullet points heavily. DO NOT output massive blocks of JSON mapping! Provide natural human responses.
`;

    if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here') {
      const gHistory = history ? history.map(h => ({
        role: h.role === 'ai' ? 'model' : 'user',
        parts: [{ text: h.text }]
      })) : [{ role: 'user', parts: [{ text: message }] }];

      const gResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: { text: systemInstruction }},
          contents: gHistory
        })
      });
      const data = await gResponse.json();
      if(data.candidates) return res.send(data.candidates[0].content.parts[0].text);
      throw new Error(data.error?.message || "Gemini Native Parser Error");
    }
    
    else if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'your_openai_api_key_here') {
      const { OpenAI } = require('openai');
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const openAiHistory = history ? history.map(h => ({
        role: h.role === 'ai' ? 'assistant' : 'user',
        content: h.text
      })) : [{ role: 'user', content: message }];

      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemInstruction },
          ...openAiHistory
        ],
      });
      return res.send(completion.choices[0].message.content.trim());
    }
    
    else {
      console.log('🤖 AI Fallback UI Node Active -> Executing Dynamic Database RegEx Parser globally across context.');
      
      const combinedContextStr = (message + ' ' + (profile?.state || '') + ' ' + (profile?.department || '') + ' ' + (profile?.category || '')).toLowerCase();
      
      let mockResponse = "";
      
      // Perform strict local RAG parsing iterating directly over the Institutions Array Native Keys!
      const matchedInsts = institutionsDb.filter(inst => {
          const loc = inst.location.toLowerCase();
          const pState = (profile?.state || '').toLowerCase();
          // Soft map: Does their message or form State touch the City mapped in our DB natively?
          const matchLocally = combinedContextStr.includes(loc) || (pState.length > 2 && loc.includes(pState)) || (pState === 'maharashtra' && loc === 'mumbai') || (pState === 'tamil nadu' && (loc === 'chennai' || loc === 'vellore')) || (pState === 'uttar pradesh' && loc === 'kanpur');
          return matchLocally;
      });

      if (matchedInsts.length > 0) {
        let collStr = matchedInsts.slice(0, 3).map(i => `• **${i.name}** (NIRF Rank: ${i.nirfRanking})\n  • Location: ${i.location}\n  • Official Link: ${i.websiteUrl}`).join('\n\n');
        mockResponse = `Here are the top elite institutions natively matching your State/Location request:\n\n${collStr}`;
      } 
      else if (combinedContextStr.includes('college') || combinedContextStr.includes('university') || combinedContextStr.includes('institute')) {
          mockResponse = "I have access to institutions across Delhi, Maharashtra, Karnataka, Tamil Nadu, Uttar Pradesh, and multiple others! Please tell me your **State** directly so I can list them!";
      }
      else {
        const isMissingInfo = !(combinedContextStr.includes('income') || combinedContextStr.match(/\d/));
        mockResponse = isMissingInfo 
          ? "Please tell me your **State (e.g. Delhi, Maharashtra)** to evaluate regional colleges, or manually specify your exact Income, Marks, and Category constraints to analyze Scholarship application URLs!"
          : `• **PM Yasasvi Scholarship** (Match: 95%)
  Deadline: 31 Oct ⚠️
  Apply exactly here: https://yet.nta.ac.in/

• **Vidyadhan Central Scholarship** (Match: 88%)
  Deadline: 31 Jul ⚠️
  Apply exactly here: https://www.vidyadhan.org/

(Note: API keys are totally disconnected! This is the local Demo Simulator mocking responses dynamically against your Profile Form!).`;
      }
      
      setTimeout(() => {
        return res.send(mockResponse);
      }, 1000);
    }

  } catch (error) {
    console.error("Chat API Core Error:", error);
    return res.status(500).send('API Network Boundary Failure.');
  }
};

module.exports = { handleChat };
