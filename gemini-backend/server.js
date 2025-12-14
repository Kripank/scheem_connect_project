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
    eligibility: "Graduates, diploma holders, or students with an innovative business idea seeking startup support",
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
    category: "Benefits & Social development",
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
  {
  id: 107,
  name: "Sukanya Samriddhi Yojana (SSY)",
  category: "Benefits & Social Development",
  sector: "women-child",
  targetGroups: "Girl child and parents",
  minAge: 0,
  maxAge: 10,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "High-interest savings scheme for girl child education and marriage.",
  eligibility: "Parents of a girl child below 10 years can open an account.",
  link: "https://www.india.gov.in/spotlight/sukanya-samriddhi-yojana"
},
{
  id: 108,
  name: "Beti Bachao Beti Padhao",
  category: "Benefits & Social development",
  sector: "women-empowerment",
  targetGroups: "Girl children and women",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Promotes education and welfare of girl children.",
  eligibility: "Applicable to all citizens, especially families with girl children.",
  link: "https://wcd.nic.in/bbbp-schemes"
},
{
  id: 109,
  name: "Pradhan Mantri Mudra Yojana (PMMY)",
  category: "Business & Self-employed",
  sector: "micro-business",
  targetGroups: "Small business owners, entrepreneurs",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Collateral-free loans up to ₹10 lakh for micro enterprises.",
  eligibility: "Non-corporate, non-farm small business owners.",
  link: "https://www.mudra.org.in/"
},
{
  id: 110,
  name: "Skill India Mission",
  category: "Education & Learning",
  sector: "skill-development",
  targetGroups: "Youth, job seekers",
  minAge: 15,
  maxAge: 45,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free skill training and certification for employment.",
  eligibility: "Indian citizens seeking skill development.",
  link: "https://www.skillindia.gov.in/"
},
{
  id: 111,
  name: "Atal Pension Yojana (APY)",
  category: "Benefits & Social Development",
  sector: "pension",
  targetGroups: "Unorganized sector workers",
  minAge: 18,
  maxAge: 40,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Guaranteed monthly pension after age 60.",
  eligibility: "Indian citizens aged 18–40 with bank account.",
  link: "https://www.npscra.nsdl.co.in/scheme-details.php"
},
{
  id: 112,
  name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
  category: "Agriculture, Rural & Environment",
  sector: "crop-insurance",
  targetGroups: "Farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Crop insurance against natural calamities.",
  eligibility: "All farmers including tenant farmers.",
  link: "https://pmfby.gov.in/"
},
{
  id: 113,
  name: "Digital India Mission",
  category: "Technology & Governance",
  sector: "digital-services",
  targetGroups: "All citizens",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Digital access to government services.",
  eligibility: "All Indian citizens.",
  link: "https://www.digitalindia.gov.in/"
},
{
  id: 114,
  name: "National Scholarship Portal (NSP)",
  category: "Education & Learning",
  sector: "scholarship",
  targetGroups: "School and college students",
  minAge: 5,
  maxAge: null,
  maxIncome: 800000,
  educationRequired: "School / College",
  benefit: "Financial assistance for students through multiple central and state scholarships.",
  eligibility: "Students studying in school or college with valid documents.",
  link: "https://scholarships.gov.in/"
},
{
  id: 115,
  name: "PM POSHAN (Mid Day Meal Scheme)",
  category: "Education & Learning",
  sector: "school-education",
  targetGroups: "School children",
  minAge: 6,
  maxAge: 14,
  maxIncome: null,
  educationRequired: "Primary / Upper Primary",
  benefit: "Free nutritious meals to school children.",
  eligibility: "Students enrolled in government and government-aided schools.",
  link: "https://pmposhan.education.gov.in/"
},
{
  id: 116,
  name: "Samagra Shiksha Abhiyan",
  category: "Education & Learning",
  sector: "school-education",
  targetGroups: "Students, teachers",
  minAge: 3,
  maxAge: 18,
  maxIncome: null,
  educationRequired: "Pre-school to Class 12",
  benefit: "Improves quality of school education and infrastructure.",
  eligibility: "Applicable to all government and aided schools.",
  link: "https://samagra.education.gov.in/"
},
{
  id: 117,
  name: "PM eVIDYA",
  category: "Education & Learning",
  sector: "digital-learning",
  targetGroups: "Students, teachers",
  minAge: 6,
  maxAge: null,
  maxIncome: null,
  educationRequired: "School / Higher Education",
  benefit: "Digital education via TV channels, online platforms, and radio.",
  eligibility: "Open to all students and teachers.",
  link: "https://www.education.gov.in/pm-vidya"
},
{
  id: 118,
  name: "SWAYAM",
  category: "Education & Learning",
  sector: "online-courses",
  targetGroups: "Students, professionals",
  minAge: 14,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free online courses from school to postgraduate level.",
  eligibility: "Any Indian citizen can enroll.",
  link: "https://swayam.gov.in/"
},
{
  id: 119,
  name: "SWAYAM PRABHA",
  category: "Education & Learning",
  sector: "educational-tv",
  targetGroups: "Students, competitive exam aspirants",
  minAge: 10,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "24x7 educational TV channels for learning.",
  eligibility: "Open to all learners.",
  link: "https://www.swayamprabha.gov.in/"
},
{
  id: 120,
  name: "National Means-cum-Merit Scholarship (NMMS)",
  category: "Education & Learning",
  sector: "scholarship",
  targetGroups: "Economically weaker students",
  minAge: 12,
  maxAge: 18,
  maxIncome: 350000,
  educationRequired: "Class 8 onwards",
  benefit: "Scholarship to reduce school dropout rate.",
  eligibility: "Students with merit from economically weaker sections.",
  link: "https://scholarships.gov.in/"
},
{
  id: 121,
  name: "AICTE Pragati Scholarship for Girls",
  category: "Education & Learning",
  sector: "higher-education",
  targetGroups: "Girl students",
  minAge: 17,
  maxAge: null,
  maxIncome: 800000,
  educationRequired: "Technical Diploma / Degree",
  benefit: "₹50,000 per year scholarship for girl students.",
  eligibility: "Girl students admitted to AICTE-approved institutions.",
  link: "https://www.aicte-india.org/"
},
{
  id: 122,
  name: "Prime Minister’s Research Fellowship (PMRF)",
  category: "Education & Learning",
  sector: "research",
  targetGroups: "PhD scholars",
  minAge: 22,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Postgraduate",
  benefit: "High-value fellowship for research scholars.",
  eligibility: "Meritorious students pursuing PhD.",
  link: "https://pmrf.in/"
},
{
  id: 123,
  name: "National Health Mission (NHM)",
  category: "Health & Wellness",
  sector: "public-health",
  targetGroups: "Women, children, rural and urban poor",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Improves access to quality healthcare services.",
  eligibility: "All citizens, especially vulnerable groups.",
  link: "https://nhm.gov.in/"
},
{
  id: 124,
  name: "Janani Suraksha Yojana (JSY)",
  category: "Health & Wellness",
  sector: "maternal-health",
  targetGroups: "Pregnant women from low-income families",
  minAge: 18,
  maxAge: 45,
  maxIncome: 300000,
  educationRequired: "Any",
  benefit: "Financial assistance for institutional delivery.",
  eligibility: "Pregnant women from BPL households.",
  link: "https://nhm.gov.in/index1.php?lang=1&level=3&sublinkid=841"
},
{
  id: 125,
  name: "Pradhan Mantri Surakshit Matritva Abhiyan (PMSMA)",
  category: "Health & Wellness",
  sector: "antenatal-care",
  targetGroups: "Pregnant women",
  minAge: 18,
  maxAge: 45,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free antenatal checkups by doctors.",
  eligibility: "All pregnant women in 2nd and 3rd trimester.",
  link: "https://pmsma.nhp.gov.in/"
},
{
  id: 126,
  name: "Mission Indradhanush",
  category: "Health & Wellness",
  sector: "immunization",
  targetGroups: "Children and pregnant women",
  minAge: 0,
  maxAge: 2,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free vaccination against life-threatening diseases.",
  eligibility: "Children below 2 years and pregnant women.",
  link: "https://nhm.gov.in/index1.php?lang=1&level=2&sublinkid=824"
},
{
  id: 127,
  name: "National Tuberculosis Elimination Programme (NTEP)",
  category: "Health & Wellness",
  sector: "disease-control",
  targetGroups: "TB patients",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free diagnosis and treatment for TB.",
  eligibility: "All TB patients in India.",
  link: "https://tbcindia.gov.in/"
},
{
  id: 128,
  name: "National AIDS Control Programme (NACP)",
  category: "Health & Wellness",
  sector: "disease-control",
  targetGroups: "High-risk groups and general public",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Prevention, testing, and free treatment for HIV/AIDS.",
  eligibility: "All citizens, especially high-risk groups.",
  link: "https://naco.gov.in/"
},
{
  id: 129,
  name: "Ayushman Bharat – Health and Wellness Centres (HWCs)",
  category: "Health & Wellness",
  sector: "primary-healthcare",
  targetGroups: "Rural and underserved populations",
  minAge: 0,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Free primary healthcare and essential medicines.",
  eligibility: "All citizens.",
  link: "https://ab-hwc.nhp.gov.in/"
},
{
  id: 130,
  name: "Make in India",
  category: "Infrastructure & Industries",
  sector: "manufacturing",
  targetGroups: "Manufacturers and investors",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Business / Technical preferred",
  benefit: "Boosts manufacturing and industrial growth.",
  eligibility: "Indian and foreign manufacturing companies.",
  link: "https://www.makeinindia.com/"
},
{
  id: 131,
  name: "Production Linked Incentive (PLI) Scheme",
  category: "Infrastructure & Industries",
  sector: "manufacturing-incentive",
  targetGroups: "Manufacturers in key sectors",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Business / Technical",
  benefit: "Financial incentives for increased production.",
  eligibility: "Manufacturers meeting production targets.",
  link: "https://www.investindia.gov.in/production-linked-incentives-schemes-india"
},
{
  id: 132,
  name: "National Infrastructure Pipeline (NIP)",
  category: "Infrastructure & Industries",
  sector: "infrastructure",
  targetGroups: "Infrastructure developers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Technical / Business",
  benefit: "Large-scale infrastructure development.",
  eligibility: "Public and private infrastructure entities.",
  link: "https://www.nip.gov.in/"
},
{
  id: 133,
  name: "Pradhan Mantri Gati Shakti",
  category: "Infrastructure & Industries",
  sector: "logistics",
  targetGroups: "Infrastructure and logistics projects",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Technical / Planning",
  benefit: "Integrated infrastructure planning.",
  eligibility: "Government and private sector projects.",
  link: "https://gati.gov.in/"
},
{
  id: 134,
  name: "UDYAM Registration (MSME)",
  category: "Infrastructure & Industries",
  sector: "msme",
  targetGroups: "Micro, Small and Medium Enterprises",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Legal recognition and MSME benefits.",
  eligibility: "Business owners of MSMEs.",
  link: "https://udyamregistration.gov.in/"
},
{
  id: 135,
  name: "Credit Linked Capital Subsidy Scheme (CLCSS)",
  category: "Infrastructure & Industries",
  sector: "technology-upgradation",
  targetGroups: "MSMEs upgrading machinery",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Technical / Business",
  benefit: "Capital subsidy for technology upgrade.",
  eligibility: "Eligible MSMEs.",
  link: "https://msme.gov.in/schemes/credit-linked-capital-subsidy-scheme"
},
{
  id: 136,
  name: "National Industrial Corridor Development Programme (NICDP)",
  category: "Infrastructure & Industries",
  sector: "industrial-corridor",
  targetGroups: "Industrial units and investors",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Technical / Business",
  benefit: "World-class industrial corridor development.",
  eligibility: "Industries in corridor regions.",
  link: "https://nicdc.in/"
},
{
  id: 137,
  name: "Startup India Seed Fund Scheme",
  category: "Infrastructure & Industries",
  sector: "startup-funding",
  targetGroups: "Early-stage startups",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Innovation / Business",
  benefit: "Seed funding for startups.",
  eligibility: "DPIIT-recognized startups.",
  link: "https://seedfund.startupindia.gov.in/"
},
{
  id: 138,
  name: "Soil Health Card Scheme",
  category: "Agriculture, Rural & Environment",
  sector: "soil-management",
  targetGroups: "Farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Soil testing and crop recommendations.",
  eligibility: "All farmers.",
  link: "https://soilhealth.dac.gov.in/"
},
{
  id: 139,
  name: "Paramparagat Krishi Vikas Yojana (PKVY)",
  category: "Agriculture, Rural & Environment",
  sector: "organic-farming",
  targetGroups: "Organic farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Support for organic farming.",
  eligibility: "Farmers adopting organic farming.",
  link: "https://pgsindia-ncof.gov.in/"
},
{
  id: 140,
  name: "National Mission for Sustainable Agriculture (NMSA)",
  category: "Agriculture, Rural & Environment",
  sector: "sustainable-agriculture",
  targetGroups: "Climate-affected farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Climate-resilient farming support.",
  eligibility: "Farmers.",
  link: "https://nmsa.dac.gov.in/"
},
{
  id: 141,
  name: "Pradhan Mantri Krishi Sinchai Yojana (PMKSY)",
  category: "Agriculture, Rural & Environment",
  sector: "irrigation",
  targetGroups: "Farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Improves irrigation efficiency.",
  eligibility: "Farmers and landholders.",
  link: "https://pmksy.gov.in/"
},
{
  id: 142,
  name: "National Livestock Mission (NLM)",
  category: "Agriculture, Rural & Environment",
  sector: "animal-husbandry",
  targetGroups: "Livestock farmers",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Livestock productivity enhancement.",
  eligibility: "Livestock farmers.",
  link: "https://nlm.udyamimitra.in/"
},
{
  id: 143,
  name: "Pradhan Mantri Garib Kalyan Anna Yojana (PMGKAY)",
  category: "Benefits & Social development",
  sector: "food-security",
  targetGroups: "Low-income households",
  minAge: 0,
  maxAge: null,
  maxIncome: 200000,
  educationRequired: "Any",
  benefit: "Free food grains.",
  eligibility: "NFSA beneficiaries.",
  link: "https://nfsa.gov.in/"
},
{
  id: 144,
  name: "DAY-NRLM",
  category: "Benefits & Social development",
  sector: "rural-livelihood",
  targetGroups: "Rural poor households",
  minAge: 18,
  maxAge: null,
  maxIncome: 200000,
  educationRequired: "Any",
  benefit: "Self-employment and skill development.",
  eligibility: "Rural BPL families.",
  link: "https://aajeevika.gov.in/"
},
{
  id: 145,
  name: "DAY-NULM",
  category: "Benefits & Social development",
  sector: "urban-livelihood",
  targetGroups: "Urban poor",
  minAge: 18,
  maxAge: null,
  maxIncome: 200000,
  educationRequired: "Any",
  benefit: "Employment and skill training.",
  eligibility: "Urban poor households.",
  link: "https://nulm.gov.in/"
},
{
  id: 146,
  name: "Pradhan Mantri Matru Vandana Yojana (PMMVY)",
  category: "Benefits & Social development",
  sector: "maternal-welfare",
  targetGroups: "Pregnant women",
  minAge: 18,
  maxAge: 45,
  maxIncome: 300000,
  educationRequired: "Any",
  benefit: "Cash incentive for mothers.",
  eligibility: "Pregnant women for first birth.",
  link: "https://pmmvy.wcd.gov.in/"
},
{
  id: 147,
  name: "National Social Assistance Programme (NSAP)",
  category: "Benefits & Social development",
  sector: "social-security",
  targetGroups: "Elderly, widows, disabled",
  minAge: 18,
  maxAge: null,
  maxIncome: 200000,
  educationRequired: "Any",
  benefit: "Financial assistance to vulnerable groups.",
  eligibility: "Economically weaker sections.",
  link: "https://nsap.nic.in/"
},
{
  id: 148,
  name: "Stand Up India Scheme",
  category: "Business & Self-employed",
  sector: "entrepreneurship",
  targetGroups: "SC/ST and women entrepreneurs",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Loans for new enterprises.",
  eligibility: "SC/ST and women entrepreneurs.",
  link: "https://www.standupmitra.in/"
},
{
  id: 149,
  name: "PM SVANidhi",
  category: "Business & Self-employed",
  sector: "street-vendors",
  targetGroups: "Street vendors",
  minAge: 18,
  maxAge: null,
  maxIncome: 200000,
  educationRequired: "Any",
  benefit: "Working capital loans.",
  eligibility: "Urban street vendors.",
  link: "https://pmsvanidhi.mohua.gov.in/"
},
{
  id: 150,
  name: "CGTMSE",
  category: "Business & Self-employed",
  sector: "msme-credit",
  targetGroups: "MSMEs",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Collateral-free loans.",
  eligibility: "Micro and Small Enterprises.",
  link: "https://www.cgtmse.in/"
},
{
  id: 151,
  name: "PMEGP",
  category: "Business & Self-employed",
  sector: "self-employment",
  targetGroups: "Unemployed youth, SHGs",
  minAge: 18,
  maxAge: 50,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Financial support for micro-enterprises.",
  eligibility: "Unemployed individuals and SHGs.",
  link: "https://www.kviconline.gov.in/pmegpeportal/"
},
{
  id: 152,
  name: "NSIC Schemes",
  category: "Business & Self-employed",
  sector: "msme-support",
  targetGroups: "Registered MSMEs",
  minAge: 18,
  maxAge: null,
  maxIncome: null,
  educationRequired: "Any",
  benefit: "Marketing and financial assistance.",
  eligibility: "Registered MSMEs.",
  link: "https://www.nsic.co.in/"
}


];

// Convert schemes to rich text so the model can “see” all details
const SCHEMES_TEXT = SCHEMES.map(
  (s) => `
Name: ${s.name}
Category: ${s.category}
Sector: ${s.sector}
Target groups: ${s.targetGroups}
New scheme: ${s.isNew ? "Yes" : "No"}
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

6. Do NOT invent schemes or links.
   Use ONLY the schemes and links given in WEBSITE CONTENT.

7. Show links as plain URLs like:
   Official link: https://pmkisan.gov.in/

8. If the user asks for "new schemes", "newly added schemes", or "latest schemes":
   - Prefer schemes marked as "New scheme: Yes"

YOUR TASK:

GENERAL UNDERSTANDING:
The website content contains a LIST of MANY government schemes.
The user may ask questions in different ways:
- By mentioning a scheme name directly
- By asking for schemes for a group (women, students, farmers, etc.)
- By asking for age-based schemes
- By describing their personal profile

You must decide the intent and respond accordingly.

---

A) SCHEME-NAME BASED QUESTIONS (IMPORTANT)

If the user asks about ANY PARTICULAR SCHEME NAME
(for example: "What is <scheme name>", "Tell me about <scheme name>", "Explain <scheme name>")

Then:
- Identify the scheme from WEBSITE CONTENT whose Name closely matches the user's query
- This rule applies to ALL schemes listed in the data, not just examples
- Respond with:
  • Scheme name
  • Benefit (1–2 lines)
  • Eligibility
  • Official link (plain URL)
- Do NOT suggest other schemes unless the user explicitly asks

---

B) CATEGORY / GROUP BASED QUESTIONS

If the user asks for schemes for a group or category
(for example: women, students, farmers, entrepreneurs, business owners, children, senior citizens)

Then:
- Match schemes using:
  • Category
  • Sector
  • Target groups
- Recommend 2–4 BEST matching schemes
- For EACH scheme include:
  • Scheme name
  • Short benefit
  • Who it is suitable for
  • Official link

---

C) AGE-BASED QUESTIONS

If the user asks for schemes based on age
(for example: 18+ schemes, children schemes, youth schemes, senior citizen schemes)

Then:
- Identify schemes where:
  • minAge ≤ user age
  • maxAge ≥ user age (if maxAge exists)
- Recommend 2–4 suitable schemes
- Explain briefly why they match the age group

---

D) PROFILE-BASED QUESTIONS

If the user describes a personal profile
(for example: age, gender, occupation, education, income)

Then:
- Combine:
  • Age
  • Target group
  • Sector / Category
  • Income (if relevant)
- Recommend the BEST matching schemes from the data

---

STRICT RULES:
- Use ONLY schemes listed in WEBSITE CONTENT
- Do NOT invent schemes or links
- Do NOT assume eligibility beyond the given data
- Always show official links as plain URLs


--- WEBSITE CONTENT START ---
${SITE_CONTENT}
--- WEBSITE CONTENT END ---

User question or profile: ${message}
    `;

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_ID}:generateContent?key=${API_KEY}`;

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
