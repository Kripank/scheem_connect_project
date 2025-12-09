import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ChatBot from "./ChatBot";
import ActsPage from "./pages/ActsPage";

// ---------------- ICON IMPORTS ----------------
import {
  Search,
  Accessibility,
  Languages,
  Settings,
  Wheat,
  Users,
  Briefcase,
  FileText,
  Globe,
  Car,
  Link as LinkIcon,
  BookOpen,
  Landmark,
  HeartPulse,
  Building2,
  Factory,
  MessageSquare,
  Calendar,
  HelpCircle,
  Menu,
  ScrollText,
  Gavel,
  BookA,
  Map,
  Info,
  Layers,
  BarChart4,
  Shield
} from "lucide-react";

// ---------- SCHEMES DATA ----------
const allGovernmentSchemes = [
  { id: 101, name: "Pradhan Mantri Jan Dhan Yojana (PMJDY)", category: "Benefits & Social development", benefit: "Financial inclusion: access to banking, credit, insurance, and pension.", eligibility: "Any individual aged 10 years and above without an existing bank account.", link: "https://pmjdy.gov.in/" },
  { id: 102, name: "Ayushman Bharat - PMJAY", category: "Health & Wellness", benefit: "Health cover of ₹5 Lakh per family per year.", eligibility: "Poor and vulnerable families as per SECC data.", link: "https://pmjay.gov.in/" },
  { id: 103, name: "PM Kisan Samman Nidhi", category: "Agriculture, Rural & Environment", benefit: "₹6000 yearly income support for farmers.", eligibility: "All landholding farmer families.", link: "https://pmkisan.gov.in/" },
  { id: 104, name: "Startup India", category: "Business & Self-employed", benefit: "Funding, tax exemptions, entrepreneurship support.", eligibility: "Recognized Private Ltd, LLP, or Partnership.", link: "https://www.startupindia.gov.in/" },
  { id: 105, name: "National Pension Scheme (NPS)", category: "Benefits & Social development", benefit: "Voluntary pension scheme for long-term savings.", eligibility: "Indian citizens aged 18-70.", link: "https://npscra.nsdl.co.in/" },
  { id: 106, name: "Pradhan Mantri Awas Yojana (PMAY)", category: "Housing & Local services", benefit: "Affordable housing for EWS, LIG, MIG.", eligibility: "People who don't own a pucca house.", link: "https://pmaymis.gov.in/" },
];

const featuredSchemes = allGovernmentSchemes.slice(0, 3);
const trendingSchemes = allGovernmentSchemes.map((s) => s.name);

const categories = [
  { title: "Agriculture, Rural & Environment", icon: Wheat, color: "blue" },
  { title: "Benefits & Social development", icon: Users, color: "red" },
  { title: "Business & Self-employed", icon: Briefcase, color: "green" },
  { title: "Education & Learning", icon: BookOpen, color: "pink" },
  { title: "Health & Wellness", icon: HeartPulse, color: "cyan" },
  { title: "Infrastructure & Industries", icon: Factory, color: "orange" },
];

// ---------- IMAGE SLIDER ----------
const ImageSlider = () => {
  const images = [
    "/assets/image1.jpg",
    "/assets/image2.jpg",
    "/assets/image5.jpg",
    "/assets/image3.jpg",
    "/assets/image4.jpg",
    "/assets/image6.jpeg",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setIndex((p) => (p + 1) % images.length), 2500);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="w-full flex justify-center mt-6">
      <div className="relative w-full max-w-6xl h-96 rounded-xl overflow-hidden shadow-2xl">
        <img src={images[index]} alt="" className="w-full h-full object-cover transition duration-700" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${i === index ? "bg-red-600 w-4 h-4" : "bg-white/60"}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ---------- NAV ITEM ----------
const NavItem = ({ title, active, onClick }) => (
  <button
    onClick={onClick}
    className={`py-3 px-4 text-sm md:text-base font-semibold transition relative group ${
      active ? "text-red-700" : "text-gray-600 hover:text-red-600"
    }`}
  >
    {title}
    <span
      className={`absolute bottom-0 left-0 w-full h-1 rounded-t-lg transition ${
        active ? "bg-red-600 scale-x-100" : "scale-x-0 group-hover:bg-red-300 group-hover:scale-x-75"
      }`}
    ></span>
  </button>
);

// ---------- SCHEME CARD ----------
const SchemeCard = ({ scheme }) => (
  <div className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-lg transition">
    <h4 className="font-bold text-lg flex items-center mb-2">
      <Info className="w-4 h-4 text-red-600 mr-2" />
      {scheme.name}
    </h4>
    <p className="text-xs uppercase font-semibold text-red-600 mb-2">{scheme.category}</p>
    <p className="text-sm text-gray-700 mb-1"><b>Eligibility:</b> {scheme.eligibility}</p>
    <p className="text-sm text-gray-700 mb-3"><b>Benefit:</b> {scheme.benefit}</p>
    <a href={scheme.link} target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700 flex items-center">
      View Details <LinkIcon className="ml-1 w-4 h-4" />
    </a>
  </div>
);

// ----------- CATEGORY CARD ----------
const colorClasses = {
  blue: "bg-blue-50 border-blue-300 text-blue-900",
  red: "bg-red-50 border-red-300 text-red-900",
  green: "bg-green-50 border-green-300 text-green-900",
  pink: "bg-pink-50 border-pink-300 text-pink-900",
  cyan: "bg-cyan-50 border-cyan-300 text-cyan-900",
  orange: "bg-orange-50 border-orange-300 text-orange-900",
};

const CategoryCard = ({ icon: Icon, title, color, onClick, active }) => (
  <div
    onClick={onClick}
    className={`p-6 transition cursor-pointer flex flex-col items-center rounded-xl border-2 ${
      active ? "scale-105 shadow-xl" : "hover:shadow-xl"
    } ${colorClasses[color]}`}
  >
    <div className="p-3 bg-white rounded-full mb-3">
      <Icon className="w-6 h-6" />
    </div>
    <h3 className="text-sm font-semibold">{title}</h3>
  </div>
);

// ----------- TAB CONTENT ----------
const TabContent = ({ activeTab, selectedCategory, setSelectedCategory, schemeRef }) => {
  switch (activeTab) {
    case "Home":
    case "Schemes":
      return (
        <div className="text-center">
          <section ref={schemeRef} id="schemes-section" className="pt-12">
            <h2 className="text-3xl font-extrabold">Explore Schemes By Focus Area</h2>
            <p className="text-gray-600 pb-4">Find the right scheme according to your need</p>
          </section>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {categories.map((c, i) => (
              <CategoryCard key={i} {...c} active={selectedCategory === c.title}
                onClick={() => setSelectedCategory(c.title)} />
            ))}
          </div>

          {selectedCategory && (
            <div className="mt-12 border-t pt-6">
              <h3 className="text-2xl font-bold">Showing Schemes for:{selectedCategory}</h3>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg mt-2" onClick={() => setSelectedCategory(null)}>
                Clear Filter
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {allGovernmentSchemes.filter((s) => s.category === selectedCategory).map((s) => (
                  <SchemeCard key={s.id} scheme={s} />
                ))}
              </div>
            </div>
          )}

          <div className="mt-10 border-t pt-8">
            <h3 className="text-2xl font-bold mb-6">Popular Schemes</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSchemes.map((s) => (
                <SchemeCard key={s.id} scheme={s} />
              ))}
            </div>
          </div>
        </div>
      );

    case "About":
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg text-left">
          <h2 className="text-3xl font-bold flex items-center mb-4">
            <Info className="mr-3 text-red-600" /> About SchemeConnect
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg">
            SchemeConnect is an initiative to simplify public access to Government Schemes,
            Acts & Rules, Government Forms and Official Resources from Central and State Government.
            Our goal is to provide accurate, fast and user-friendly information for students,
            farmers, business owners, job seekers and citizens.
          </p>

          <p className="text-gray-700 leading-relaxed text-lg mt-4">
            We collect publicly available data from trusted Government portals such as
            <b> india.gov.in</b>, <b>pmjay.gov.in</b>, <b>pmkisan.gov.in</b>,
            <b> indiacode.nic.in</b> and present it in a simple and accessible format.
          </p>

          <h3 className="text-xl font-bold mt-6">Main Objectives:</h3>
          <ul className="list-disc ml-6 text-gray-700 mt-2 text-lg">
            <li>Easy access to Government Schemes and Eligibility</li>
            <li>Real-time official updates and trusted source links</li>
            <li>Acts & Rules with search and filter options</li>
            <li>One platform for citizens to stay informed</li>
          </ul>

          <p className="mt-6 text-gray-600 italic">"Connecting citizens to governance digitally."</p>
        </div>
      );


      case "Contact":
            return (
              <div className="bg-white p-8 rounded-xl shadow-lg text-left">
                <h2 className="text-3xl font-bold flex items-center mb-4">
                  <MessageSquare className="mr-3 text-red-600" /> Contact Us
                </h2>

                <p className="text-gray-700 text-lg mb-4">
                  For support, questions or feedback, feel free to reach us:
                </p>

                <ul className="text-lg text-gray-800 space-y-2">
                  <li><b>Email:</b> support@schemeconnect.in</li>
                  <li><b>Phone:</b> +91 98765 43210</li>
                  <li><b>Location:</b> Bhopal, Madhya Pradesh (India)</li>
                </ul>

                <p className="mt-4 text-gray-600 italic">
                  We strive to respond within 24 hours. Thank you!
                </p>
              </div>
            );

    case "Acts & Rules":
      return (
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold flex items-center mb-4">
            <Gavel className="mr-3 text-red-600" /> Central Acts & Rules
          </h2>
          <p className="text-gray-600">A categorized list of important Indian legislation.</p>
        </div>
      );

    default:
      return null;
  }
};

// ================= MAIN APP =================
const App = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Home");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const schemeRef = React.useRef(null);

  const navigationItems = ["Home", "Schemes", "Acts & Rules", "About", "Contact"];

  const scrollToSchemes = () => {
    const doScroll = () => schemeRef.current?.scrollIntoView({ behavior: "smooth" });

    if (activeTab !== "Schemes") {
      setActiveTab("Schemes");
      setTimeout(doScroll, 300);
    } else doScroll();
  };

  const filteredSchemes = allGovernmentSchemes.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-lg border-b sticky top-0 z-50">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Map className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-black">
              <span className="text-red-600">Scheme</span>Connect
            </h1>
          </div>

          <nav className="hidden md:flex space-x-3">
            {navigationItems.map((tab) => (
              <NavItem
                key={tab}
                title={tab}
                active={activeTab === tab}
                onClick={() =>
                  tab === "Schemes"
                    ? scrollToSchemes()
                    : tab === "Acts & Rules"
                    ? navigate("/acts")
                    : setActiveTab(tab)
                }
              />
            ))}
          </nav>
        </div>

        <div className="bg-red-700 p-6">
          <div className="container mx-auto">
            <div className="bg-white rounded-xl shadow-xl flex items-center overflow-hidden pr-4">
              <div className="px-4 flex items-center">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
              </div>

              <input
                placeholder="Search Schemes, Acts, Forms..."
                className="flex-grow px-6 py-4 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />

              <button className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 text-white rounded-full font-semibold">
                Search
              </button>
            </div>

            <h3 className="text-white text-lg font-semibold mt-4">Trending:</h3>

            <div className="mt-2 overflow-hidden whitespace-nowrap">
              <div
                className="flex gap-4 animate-scroll-left text-white"
                onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = "paused")}
                onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = "running")}
              >
                {[...trendingSchemes, ...trendingSchemes].map((t, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      const selected = allGovernmentSchemes.find(s => s.name === t);
                      if (selected?.link) window.open(selected.link, "_blank", "noopener");
                    }}
                    className="bg-white/20 px-4 py-2 rounded-full hover:bg-white/30 transition">
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH RESULTS */}
      {searchQuery && (
        <div className="container mx-auto bg-white mt-6 p-6 rounded-xl shadow">
          <h3 className="text-xl font-bold mb-2">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSchemes.map((s) => (
              <SchemeCard key={s.id} scheme={s} />
            ))}
          </div>
        </div>
      )}

      {activeTab !== "About" && activeTab !== "Contact" && <ImageSlider />}

      <main className="container mx-auto p-6">
        <TabContent
          activeTab={activeTab}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          schemeRef={schemeRef}
        />
      </main>

      <footer className="bg-gray-900 text-gray-400 py-6 text-center mt-16">
        © {new Date().getFullYear()} GovConnect Portal.
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }

        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        .animate-scroll-left {
          animation: scroll-left 18s linear infinite;
          animation-play-state: running;
        }

        @media (max-width: 420px) {
          .animate-scroll-left > button { padding-left: 10px; padding-right: 10px; }
        }
      `}</style>
    </div>
  );
};

// -------- ROOT WRAPPER --------
const AppWrapper = () => (
  <Router>
    <>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/acts" element={<ActsPage />} />
      </Routes>

      {/* 🟢 AI ChatBot visible on every page */}
      <ChatBot />
    </>
  </Router>
);

export default AppWrapper;
