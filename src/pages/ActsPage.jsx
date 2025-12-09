import React, { useEffect, useState } from "react";
import { Gavel, Search } from "lucide-react";

// --------------- SAMPLE ACTS WITH OFFICIAL LINKS --------------
const fallbackActs = [
  {
    title: "The Tribhuvan Sahkari University Act, 2025",
    year: "2025",
    actNumber: "11",
    ministry: "Ministry Of Cooperation",
    department: "Central",
    state: "CENTRAL",
    url: "https://www.indiacode.nic.in/handle/123456789/24091",
  },
  {
    title: "The Mussalman Wakf (Repeal) Act, 2025",
    year: "2025",
    actNumber: "15",
    ministry: "Ministry Of Minority Affairs",
    department: "Central",
    state: "CENTRAL",
    url: "https://www.indiacode.nic.in/handle/123456789/24092",
  },
  {
    title: "The Maharashtra Settlement of Arrears of Tax Act, 2025",
    year: "2025",
    actNumber: "17",
    ministry: "Govt Of Maharashtra",
    department: "Finance",
    state: "Maharashtra",
    url: "https://www.indiacode.nic.in/handle/123456789/22005",
  },
  {
    title: "The Gujarat Bovine Breeding (Regulation) Act, 2025",
    year: "2025",
    actNumber: "21",
    ministry: "Govt Of Gujarat",
    department: "Animal Husbandry",
    state: "Gujarat",
    url: "https://www.indiacode.nic.in/handle/123456789/21835",
  },
  {
    title: "The Arunachal Pradesh Flood Plain Zoning Act, 2025",
    year: "2025",
    actNumber: "18",
    ministry: "Law and Judicial",
    department: "North East",
    state: "Arunachal Pradesh",
    url: "https://www.indiacode.nic.in/handle/123456789/21955",
  },
  {
    title: "Delhi Vehicle Pollution Control Act, 2024",
    year: "2024",
    actNumber: "09",
    ministry: "Transport",
    department: "Environment",
    state: "Delhi",
    url: "https://www.indiacode.nic.in/handle/123456789/21518",
  },
];

// ---------- STATE LIST FOR DROPDOWN ----------
const States = [
  "All India",
  "CENTRAL",
  "Delhi",
  "Maharashtra",
  "Gujarat",
  "Rajasthan",
  "Arunachal Pradesh",
  "Tamil Nadu",
  "Madhya Pradesh",
  "Uttar Pradesh",
];

const ActsPage = () => {
  const [acts, setActs] = useState([]);
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState("All India");

  const fetchActs = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/HiseryGov/openacts/main/acts.json"
      );

      if (res.status === 200) {
        const data = await res.json();
        setActs([...fallbackActs, ...data.acts]);
      } else {
        setActs(fallbackActs);
      }
    } catch {
      console.log("API failed, using fallback");
      setActs(fallbackActs);
    }
  };

  useEffect(() => {
    fetchActs();
  }, []);

  const filteredActs = acts.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) &&
      (stateFilter === "All India" ||
        a.state.toLowerCase() === stateFilter.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-4xl font-bold flex items-center mb-6">
        <Gavel className="mr-3 text-red-600" /> Acts & Rules
      </h2>

      <p className="text-sm mb-4">
        Total <strong>{filteredActs.length}</strong> Acts Available
      </p>

      {/* SEARCH + FILTER */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="flex items-center flex-grow gap-2 bg-white px-4 py-3 rounded-lg shadow">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            placeholder="Search Acts..."
            className="flex-grow outline-none text-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="px-5 py-3 rounded-lg bg-white shadow text-gray-700 font-semibold"
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value)}
        >
          {States.map((s, i) => (
            <option key={i}>{s}</option>
          ))}
        </select>
      </div>

      {/* ACTS LIST */}
      <div className="space-y-6">
        {filteredActs.map((a, i) => (
          <div
            key={i}
            className="pb-4 border-b cursor-pointer hover:bg-gray-50 p-3 rounded transition"
            onClick={() => window.open(a.url, "_blank", "noopener noreferrer")}
          >
            <h3 className="text-lg font-bold text-blue-800 hover:underline">
              {a.title}
            </h3>

            <p className="text-sm text-gray-700 mt-1">
              Act Number: {a.actNumber} &nbsp; | &nbsp; Year: {a.year}
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Ministry: {a.ministry} | State: {a.state}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActsPage;
