// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GEMINI_API_KEY;
const MODEL_ID = "gemini-2.5-flash";

// ---------- YOUR WEBSITE / SCHEME DATA ----------
const SCHEMES = [
  {
    id: 101,
    name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)",
    category: "Benefits & Social development",
    sector: "financial-inclusion",
    targetGroups: "All citizens, especially low-income / unbanked people",
    minAge: 10,
    maxAge: null, // no upper limit
    maxIncome: null, // no strict limit
    educationRequired: "Any",
    benefit:
      "Financial inclusion: access to banking, credit, insurance, and pension.",
    eligibility:
      "Any individual aged 10 years and above without an existing bank account.",
    link: "https://pmjdy.gov.in/",
  },
  {
    id: 102,
    name: "Ayushman Bharat - PMJAY",
    category: "Health & Wellness",
    sector: "health",
    targetGroups: "Poor and vulnerable families",
    minAge: 0,
    maxAge: null,
    maxIncome: 300000, // example: low-income families
    educationRequired: "Any",
    benefit: "Health cover of ₹5 Lakh per family per year.",
    eligibility: "Poor and vulnerable families as per SECC data.",
    link: "https://pmjay.gov.in/",
  },
  {
    id: 103,
    name: "PM Kisan Samman Nidhi",
    category: "Agriculture, Rural & Environment",
    sector: "agriculture",
    targetGroups: "Small and marginal farmers with landholding",
    minAge: 18,
    maxAge: null,
    maxIncome: null,
    educationRequired: "Any",
    benefit: "₹6000 yearly income support for farmers.",
    eligibility: "All landholding farmer families.",
    link: "https://pmkisan.gov.in/",
  },
  {
    id: 104,
    name: "Startup India",
    category: "Business & Self-employed",
    sector: "business",
    targetGroups: "Young entrepreneurs, startup founders",
    minAge: 18,
    maxAge: null,
    maxIncome: null,
    educationRequired: "Preferably educated / business-minded but open",
    benefit: "Funding, tax exemptions, entrepreneurship support.",
    eligibility: "Recognized Private Ltd, LLP, or Partnership.",
    link: "https://www.startupindia.gov.in/",
  },
  {
    id: 105,
    name: "National Pension Scheme (NPS)",
    category: "Benefits & Social development",
    sector: "retirement",
    targetGroups: "Working individuals planning retirement",
    minAge: 18,
    maxAge: 70,
    maxIncome: null,
    educationRequired: "Any",
    benefit: "Voluntary pension scheme for long-term savings.",
    eligibility: "Indian citizens aged 18-70.",
    link: "https://npscra.nsdl.co.in/",
  },
  {
    id: 106,
    name: "Pradhan Mantri Awas Yojana (PMAY)",
    category: "Housing & Local services",
    sector: "housing",
    targetGroups: "People who don’t own a pucca house; EWS/LIG/MIG families",
    minAge: 18,
    maxAge: null,
    maxIncome: 1800000, // depends on EWS/LIG/MIG but okay as approx
    educationRequired: "Any",
    benefit: "Affordable housing for EWS, LIG, MIG.",
    eligibility: "People who don't own a pucca house.",
    link: "https://pmaymis.gov.in/",
  },
];

// Convert schemes to rich text so the model can “see” all details
const SCHEMES_TEXT = SCHEMES.map(
  (s) => `
Name: ${s.name}
Category: ${s.category}
Sector: ${s.sector}
Target groups: ${s.targetGroups}
Recommended age range: ${s.minAge ?? "Any"} to ${s.maxAge ?? "Any"}
Maximum income (approx): ${s.maxIncome ?? "No specific limit"}
Education required: ${s.educationRequired}
Benefit: ${s.benefit}
Eligibility: ${s.eligibility}
Link: ${s.link}
`
).join("\n");

// ---------- WEBSITE CONTENT FOR AI ----------
const SITE_CONTENT = `
Website: SchemeConnect (Government Scheme Connect)

ABOUT:
SchemeConnect is an initiative to simplify public access to Government Schemes,
Acts & Rules, Government Forms and Official Resources from Central and State Government.
Our goal is to provide accurate, fast and user-friendly information for students,
farmers, business owners, job seekers and citizens.

FEATURES:
- Explore schemes by focus area: Agriculture, Benefits & Social Development, Business & Self-employed,
  Education & Learning, Health & Wellness, Infrastructure & Industries.
- View important details like eligibility, benefits and official website links.
- Search bar to quickly find schemes, acts and forms.
- Trending schemes like PMJDY, Ayushman Bharat, PM Kisan, Startup India, PMAY, NPS.

CONTACT:
Email: support@schemeconnect.in
Location: Bhopal, Madhya Pradesh (India).

SCHEMES DATA:
${SCHEMES_TEXT}
`;

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;

    if (!API_KEY) {
      console.error("GEMINI_API_KEY is missing in .env");
      return res
        .status(500)
        .json({ error: "Server misconfigured: API key missing." });
    }

    const prompt = `
You are an AI assistant and scheme recommender for the "SchemeConnect" website.

You have structured data about many schemes. Each scheme has:
- Name
- Category
- Sector (agriculture, business, health, housing, retirement, financial-inclusion, etc.)
- Target groups (farmers, entrepreneurs, low-income families, students, etc.)
- Age range (minAge, maxAge)
- Approx income / salary limit
- Education requirements
- Benefit, eligibility, and official link.

USER QUESTIONS:
The user may describe their profile, for example:
- Age (e.g. 21 years, 35 years)
- Salary or income (e.g. 2 lakh per year, 50,000 per month)
- Sector / interest (e.g. agriculture, business, startup, health, housing, pension)
- Education (student, graduate, 10th pass, farmer, job seeker, etc.)

YOUR TASK:
1. Read the WEBSITE CONTENT and find schemes whose:
   - Sector or category matches the user's interest
   - Target group matches the user's description
   - Age fits between minAge and maxAge (if given)
   - Income is below maxIncome if the scheme is for low-income people

2. Suggest the 1–3 BEST matching schemes for the user's profile.
3. For EACH recommended scheme, ALWAYS show:
   - Scheme name
   - Short benefit (1–2 lines)
   - Who it is suitable for (age / occupation / income)
   - Official link: <paste the Link field exactly as a plain URL>

4. If the user only asks "What is PM Kisan" or "Tell me about PMJDY":
   - Explain benefit + eligibility
   - Include the official link.

5. If you cannot find a perfect match, say:
   "I don't have a perfect scheme for this profile on this site, but here are the closest schemes:"
   and then list the closest ones.

6. Do NOT invent schemes or links. Use ONLY the schemes and links given in WEBSITE CONTENT.
7. Show links as plain URLs like:
   Official link: https://pmkisan.gov.in/

--- WEBSITE CONTENT START ---
${SITE_CONTENT}
--- WEBSITE CONTENT END ---

User question or profile: ${message}
    `;

    const url = `https://generativelanguage.googleapis.com/v1/models/${MODEL_ID}:generateContent?key=${API_KEY}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(
        "Gemini API error:",
        response.status,
        response.statusText,
        errorBody
      );
      return res
        .status(500)
        .json({ error: "Error from Gemini API. Check backend logs for details." });
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "I could not generate a reply from the site information.";

    return res.json({ reply: text });
  } catch (error) {
    console.error("Error in /api/chat:", error);
    return res
      .status(500)
      .json({ error: "Something went wrong while talking to the AI model." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
