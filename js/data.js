/* =====================================================
   1. EMPLOYMENT REFERENCE DATA - 5 level taxonomy
===================================================== */
window.NALCGPWU_EMPLOYMENT_DATA = {
    sectors: [
        {
            id: "central_gov",
            label: "Central Government",
            shortLabel: "Central Government",
            desc: "Ministries & Government Departments",
            icon: "🏛",
            employers: [
                {
                    id: "mptw",
                    label: "Ministry of Transport & Public Works",
                    departments: [
                        { id: "buildings", label: "Buildings", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["General Artisan (Plumber / Electrician / Carpenter / Welder)", "Painter", "Mason", "General Maintenance Worker"] },
                            { label: "Services & Support", jobs: ["Storekeeper / Inventory Assistant", "Messenger", "Cleaner", "Security Guard"] }
                        ] },
                        { id: "roads", label: "Roads", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["Roads Maintenance Worker", "Roads Worker", "General Artisan", "Heavy Equipment Operator", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Storekeeper", "Messenger", "Security Guard", "Night Watchman"] }
                        ] },
                        { id: "dems", label: "Mechanical & Electrical Services (DEMS)", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["General Artisan (Electrician)", "General Artisan (Plumber)", "Maintenance Technician", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger", "Security Guard"] }
                        ] },
                        { id: "cto", label: "Central Transport Organisation (CTO)", cadreGroups: [
                            { label: "Infrastructure & Trades", jobs: ["CTO Driver", "Heavy Equipment Operator", "Mechanic Assistant", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Yardman", "Cleaner", "Security Guard"] }
                        ] }
                    ]
                },
                {
                    id: "moh",
                    label: "Ministry of Health",
                    departments: [
                        { id: "hospitals", label: "Government Hospitals", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly", "Laundry Attendant", "Clinical Kitchen Worker", "Groundsman / Yard Assistant"] },
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Storekeeper / Inventory Assistant", "Security Guard", "Night Watchman"] }
                        ] },
                        { id: "clinics", label: "Primary Clinics", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly", "Pest Control Officer"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Groundsman", "Security Guard"] }
                        ] },
                        { id: "healthposts", label: "Health Posts", cadreGroups: [
                            { label: "Health & Sanitation", jobs: ["Health Auxiliary Worker", "Hospital Orderly"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger"] }
                        ] },
                        { id: "support_services", label: "Support Services", cadreGroups: [
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Storekeeper", "Security Guard", "Driver"] }
                        ] }
                    ]
                },
                {
                    id: "moa",
                    label: "Ministry of Agriculture",
                    departments: [
                        { id: "agric_research", label: "Agricultural Research", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Agriculture)", "Agricultural Research Assistant", "Livestock Assistant"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger", "Security Guard"] }
                        ] },
                        { id: "vet", label: "Veterinary Services", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Veterinary)", "Livestock Assistant", "Driver"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Messenger"] }
                        ] },
                        { id: "field_offices", label: "Field Offices", cadreGroups: [
                            { label: "Field Services", jobs: ["Field Assistant (Agriculture / Fisheries)", "Driver", "Plant Operator"] },
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Security Guard", "Storekeeper"] }
                        ] },
                        { id: "livestock", label: "Livestock Stations", cadreGroups: [
                            { label: "Field Services", jobs: ["Livestock Assistant", "Field Assistant", "Yardman"] },
                            { label: "Services & Support", jobs: ["Cleaner", "Security Guard"] }
                        ] }
                    ]
                },
                {
                    id: "moes",
                    label: "Ministry of Education & Skills Development",
                    departments: [
                        { id: "schools", label: "Government Schools", cadreGroups: [
                            { label: "Facilities & Support", jobs: ["General Maintenance Worker", "Groundsman / Yard Assistant", "Caretaker", "Cook", "Cleaner"] },
                            { label: "Services & Support", jobs: ["Messenger", "Security Guard"] }
                        ] },
                        { id: "boarding", label: "Boarding Facilities", cadreGroups: [
                            { label: "Facilities & Support", jobs: ["Matron Assistant", "Cook", "Laundry Attendant", "Caretaker", "Cleaner"] },
                            { label: "Services & Support", jobs: ["Storekeeper", "Security Guard"] }
                        ] },
                        { id: "regional", label: "Regional Education Offices", cadreGroups: [
                            { label: "Services & Support", jobs: ["Office Messenger", "Cleaner", "Driver", "Watchman"] }
                        ] }
                    ]
                },
                {
                    id: "met",
                    label: "Ministry of Environment & Tourism",
                    departments: [
                        { id: "parks", label: "National Parks", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Field Assistant", "Wildlife Ranger Assistant", "Horticulture Assistant"] },
                            { label: "Services & Support", jobs: ["Driver", "Cleaner", "Security Guard"] }
                        ] },
                        { id: "wildlife", label: "Wildlife Conservation", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Field Assistant", "Wildlife Ranger Assistant"] },
                            { label: "Services & Support", jobs: ["Messenger", "Cleaner"] }
                        ] },
                        { id: "forestry", label: "Forestry", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Forestry Worker", "Field Assistant"] },
                            { label: "Services & Support", jobs: ["Driver", "Cleaner"] }
                        ] },
                        { id: "waste", label: "Waste Management", cadreGroups: [
                            { label: "Field & Conservation", jobs: ["Waste Management Team Member", "Waste Segregation Worker"] },
                            { label: "Services & Support", jobs: ["Refuse Truck Driver", "Loader", "Cleaner"] }
                        ] }
                    ]
                }
            ]
        },
        {
            id: "local_council",
            label: "Local Authority / Council",
            shortLabel: "Local Authority",
            desc: "City, Town & District Councils",
            icon: "🏙",
            employers: [
                { id: "gcc", label: "Gaborone City Council" },
                { id: "fcc", label: "Francistown City Council" },
                { id: "ltc", label: "Lobatse Town Council" },
                { id: "jtc", label: "Jwaneng Town Council" },
                { id: "kdc", label: "Kweneng District Council" },
                { id: "cdc", label: "Central District Council" },
                { id: "other_council", label: "Other Council" }
            ],
            departments: [
                { id: "civil", label: "Civil Engineering & Infrastructure", cadreGroups: [
                    { label: "Technical Support", jobs: ["Maintenance Technician", "Pipefitter", "Road Maintenance Worker", "Storm Water Drainage Worker", "Council Yard Watchman"] }
                ] },
                { id: "public_health", label: "Public Health & Environmental Services", cadreGroups: [
                    { label: "Municipal Operations", jobs: ["Refuse Collector / Loader", "Refuse Truck Driver", "Street Cleaner", "Landfill Attendant", "Market Supervisor Assistant"] }
                ] },
                { id: "social", label: "Social & Community Development", cadreGroups: [
                    { label: "Community & Facility Maintenance", jobs: ["Primary School Caretaker", "Cook", "Community Worker Assistant", "Cemetery Attendant"] }
                ] },
                { id: "commercial", label: "Commercial Services", cadreGroups: [
                    { label: "Municipal Operations", jobs: ["Abattoir Worker", "Cemetery Attendant", "Bus Rank Attendant", "Market Assistant"] }
                ] }
            ]
        },
        {
            id: "land_board",
            label: "Land Board",
            shortLabel: "Land Board",
            desc: "Land Administration & Field Services",
            icon: "🗺",
            employers: [
                { id: "mlb", label: "Malete Land Board" },
                { id: "tlb", label: "Tlokweng Land Board" },
                { id: "nlb", label: "Ngwato Land Board" },
                { id: "other_lb", label: "Other Land Board / Sub-Land Board" }
            ],
            departments: [
                { id: "allocation", label: "Land Administration & Allocation", cadreGroups: [
                    { label: "Field Cadres", jobs: ["Land Board Field Assistant", "Survey Assistant", "Demarcation Assistant"] }
                ] },
                { id: "compliance", label: "Compliance & Inspection", cadreGroups: [
                    { label: "Field Cadres", jobs: ["Land Inspection Assistant", "Compliance Support Officer"] }
                ] },
                { id: "ops", label: "Administrative & Field Operations", cadreGroups: [
                    { label: "Logistics & General Support", jobs: ["Land Board Driver (4x4)", "Office Cleaner", "Messenger", "Yardman", "Security Guard"] },
                    { label: "Administrative Cadres", jobs: ["Registration Clerk", "Records Assistant", "Customer Service Support Clerk"] }
                ] }
            ]
        },
        {
            id: "parastatal",
            label: "Parastatal / SOE",
            shortLabel: "Parastatal",
            desc: "Public Utilities & State-Owned Enterprises",
            icon: "⚙️",
            employers: [
                { id: "wuc", label: "Water Utilities Corporation (WUC)" },
                { id: "bpc", label: "Botswana Power Corporation (BPC)" },
                { id: "br", label: "Botswana Railways" },
                { id: "ab", label: "Air Botswana" },
                { id: "bmc", label: "Botswana Meat Commission (BMC)" },
                { id: "bhc", label: "Botswana Housing Corporation (BHC)" },
                { id: "bamb", label: "Botswana Agricultural Marketing Board (BAMB)" },
                { id: "bpost", label: "BotswanaPost" },
                { id: "btc", label: "Botswana Telecommunications Corporation (BTC)" }
            ],
            departments: [
                { id: "utilities", label: "Utilities & Maintenance", cadreGroups: [
                    { label: "Utilities & Maintenance", jobs: ["Meter Reader", "Water Pipefitter / Mains Repairer", "Electrical Line Assistant", "Pump Station Operator", "Plant Maintenance Worker"] }
                ] },
                { id: "logistics", label: "Transportation & Logistics", cadreGroups: [
                    { label: "Logistics & Warehousing", jobs: ["Warehouse Assistant", "Grain Handler", "Postal Courier / Delivery Driver", "Freight Handler"] }
                ] },
                { id: "facilities", label: "Facilities & Support", cadreGroups: [
                    { label: "Facilities & Support", jobs: ["Abattoir Processing Assistant", "Estate Maintenance Helper", "General Utility Assistant"] }
                ] }
            ]
        }
    ]
};

/* =====================================================
   2. ARTICLES, NOTICES, PARTNERS, QUIZ, MOCK DATA
===================================================== */
window.NALCGPWU_ARTICLES = [
    {
        id: "article1",
        modalId: "article1-modal",
        title: "Understanding Mokaulengwe Insurance Coverage",
        preview: "Breaks down the base P100.00 funeral scheme versus extended family rider tiers. Learn about payout limits and dependent options..."
    },
    {
        id: "article2",
        modalId: "article2-modal",
        title: "Waiting Periods: Immediate vs Extended Family",
        preview: "Explains policy activation timelines and how immediate family coverage activates on 1st deduction versus 6 consecutive deductions for extended..."
    },
    {
        id: "article3",
        modalId: "article3-modal",
        title: "How to Access the Union Member Loan Scheme",
        preview: "A straightforward guide on borrowing limits, interest terms, and eligibility across different employment sectors with payroll authorization..."
    },
    {
        id: "article4",
        modalId: "article4-modal",
        title: "NALCGPWU Governance: Core Values & Member Rights",
        preview: "Educational piece reinforcing union principles: Honesty, Respect, Unity, Efficiency, Discipline, Commitment to Excellence, and Transparency..."
    },
    {
        id: "article5",
        modalId: "article5-modal",
        title: "Fast-Tracking Claims: Essential Document Checklist",
        preview: "Practical guide detailing every document required for emergency funeral claims. Avoid delays with this complete checklist..."
    }
];

window.NALCGPWU_NOTICES = [
    {
        id: "n1",
        title: "General Meeting Update",
        body: "Cluster offices will remain open during the election period. Visit your cluster office for membership verification and assistance.",
        date: "2026-09-01"
    },
    {
        id: "n2",
        title: "Monthly Subscription Deduction",
        body: "Union subscription and Mokaulengwe premiums are deducted on the 15th of each month via payroll stop-order.",
        date: "2026-08-25"
    },
    {
        id: "n3",
        title: "Claims Deadline Reminder",
        body: "Funeral claims must be filed within 6 months of death and all documents submitted within 12 months to avoid rejection.",
        date: "2026-08-20"
    }
];

window.NALCGPWU_MOCK_MEMBERS = [
    { name: "Kabelo Modise", omang: "090000111", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Transport & Public Works", employerId: "mptw", departmentId: "roads", jobTitle: "Roads Maintenance Worker", district: "Kweneng", clusterOffice: "Lobatse", status: "active" },
    { name: "Kelebogile Moseki", omang: "090000222", sector: "local_council", sectorLabel: "Local Authority", employer: "Gaborone City Council", employerId: "gcc", departmentId: "public_health", jobTitle: "Refuse Collector / Loader", district: "Gaborone", clusterOffice: "Lobatse", status: "pending_verification" },
    { name: "Tumelo Rantao", omang: "090000333", sector: "land_board", sectorLabel: "Land Board", employer: "Malete Land Board", employerId: "mlb", departmentId: "allocation", jobTitle: "Land Board Field Assistant", district: "South East", clusterOffice: "Lobatse", status: "active" },
    { name: "Boitumelo Lesego", omang: "090000444", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Water Utilities Corporation (WUC)", employerId: "wuc", departmentId: "utilities", jobTitle: "Meter Reader", district: "Ngamiland", clusterOffice: "Maun", status: "active" },
    { name: "Olorato Keaikitse", omang: "090000555", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Health", employerId: "moh", departmentId: "hospitals", jobTitle: "Hospital Orderly", district: "Central District", clusterOffice: "Palapye", status: "pending_verification" },
    { name: "Moakofi Sethunya", omang: "090000666", sector: "local_council", sectorLabel: "Local Authority", employer: "Francistown City Council", employerId: "fcc", departmentId: "public_health", jobTitle: "Street Cleaner", district: "Francistown", clusterOffice: "Francistown", status: "active" },
    { name: "Lebogang Mokgakane", omang: "090000777", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Botswana Power Corporation (BPC)", employerId: "bpc", departmentId: "utilities", jobTitle: "Electrical Line Assistant", district: "Gaborone", clusterOffice: "Lobatse", status: "active" },
    { name: "Refilwe Raditladi", omang: "090000888", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Education & Skills Development", employerId: "moes", departmentId: "schools", jobTitle: "General Maintenance Worker", district: "Kweneng", clusterOffice: "Lobatse", status: "active" },
    { name: "Kagiso Molapisi", omang: "090000999", sector: "land_board", sectorLabel: "Land Board", employer: "Ngwato Land Board", employerId: "nlb", departmentId: "ops", jobTitle: "Records Assistant", district: "Central District", clusterOffice: "Palapye", status: "pending_verification" },
    { name: "Oratile Sekhute", omang: "090001000", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "BotswanaPost", employerId: "bpost", departmentId: "logistics", jobTitle: "Postal Courier", district: "Ngamiland", clusterOffice: "Maun", status: "active" },
    { name: "Aobakwe Sebina", omang: "090001111", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Agriculture", employerId: "moa", departmentId: "field_offices", jobTitle: "Field Assistant", district: "Ngwaketse", clusterOffice: "Kang", status: "active" },
    { name: "Gontse Wale", omang: "090001222", sector: "local_council", sectorLabel: "Local Authority", employer: "Kweneng District Council", employerId: "kdc", departmentId: "civil", jobTitle: "Maintenance Technician", district: "Kweneng", clusterOffice: "Lobatse", status: "active" }
];

window.NALCGPWU_DEFAULT_DEPENDANTS = [
    { id: "dep1", name: "Kgosi Mokaulengwe", relation: "Spouse", status: "active", cover: "P 40,000 / P 60,000" },
    { id: "dep2", name: "Kabo Mokaulengwe", relation: "Child (16-21)", status: "active", cover: "P 40,000" },
    { id: "dep3", name: "Lerato Mokaulengwe", relation: "Child (6-15)", status: "pending", cover: "P 30,000" }
];

window.NALCGPWU_FUNERAL_PARTNERS = [
    { name: "Masiela Funeral Services", type: "Funeral Services", phone: "+267 311 5582", location: "Gaborone", detail: "Full funeral management & transport", icon: "M" },
    { name: "S & K Funeral Parlour", type: "Funeral Services", phone: "+267 492 2026", location: "Palapye", detail: "Burial services & casket supply", icon: "S" },
    { name: "Choppies Superstore", type: "Grocery Supplier", phone: "+267 533 0235", location: "Lobatse", detail: "Groceries benefit collection point", icon: "C" },
    { name: "Sefalana Groceries", type: "Grocery Supplier", phone: "+267 686 2184", location: "Maun", detail: "Casket & groceries package partner", icon: "S" }
];

window.NALCGPWU_QUIZ = [
    { q: "How much is the base funeral cover for the main member on natural death?", options: ["P 20,000", "P 40,000", "P 60,000", "P 80,000"], answer: 1 },
    { q: "When does immediate family coverage activate?", options: ["First deduction (1 month)", "After 6 months", "Immediately, no deduction", "After 1 year"], answer: 0 },
    { q: "The extended family waiting period is:", options: ["1 month", "3 months", "6 consecutive deductions", "12 months"], answer: 2 },
    { q: "What is the maximum extended family members you can nominate?", options: ["5", "8", "10", "15"], answer: 2 },
    { q: "Claims must be filed within:", options: ["1 month", "3 months", "6 months of death", "12 months of death"], answer: 2 },
    { q: "What is the union monthly subscription?", options: ["P 10.00", "P 30.00", "P 50.00", "P 100.00"], answer: 1 },
    { q: "Accidental death benefit for the main member is:", options: ["P 40,000", "P 50,000", "P 60,000", "P 70,000"], answer: 2 },
    { q: "All claim documents must be submitted within:", options: ["1 month", "6 months", "12 months", "24 months"], answer: 2 }
];