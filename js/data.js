/* =====================================================
   1. EMPLOYMENT REFERENCE DATA - 5 level taxonomy
   Used for member registration (Form A - Employment)
   ===================================================== */
window.BOPEU_EMPLOYMENT_DATA = {
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
   2. BOPEU OFFICES & AFFILIATES
   ===================================================== */
window.BOPEU_OFFICES = [
    { id: "gaborone", name: "BOPEU Headquarters Gaborone", category: "Corporate Hubs & Headquarters", plot: "Plot 54374, CBD, Grand Union Building, Gaborone", phone: "+267 3214 200", tel: "2673214200", email: "info@bopeu.org.bw", district: "Gaborone" },
    { id: "francistown", name: "BOPEU Francistown Office", category: "Corporate Hubs & Headquarters", plot: "Raphael Sikwane House, Plot 4900, Sam Nujoma Street, Light Industrial Area, Francistown", phone: "+267 231 0000", tel: "2672310000", email: "francistown@bopeu.org.bw", district: "Francistown" },
    { id: "palapye", name: "BOPEU Palapye Office", category: "Regional Offices", plot: "Plot 23229, Palapye", phone: "+267 480 0000", tel: "2674800000", email: "palapye@bopeu.org.bw", district: "Central" },
    { id: "maun", name: "BOPEU Maun Office", category: "Regional Offices", plot: "Plot 693, Main Mall, Maun", phone: "+267 688 0000", tel: "2676880000", email: "maun@bopeu.org.bw", district: "North West" },
    { id: "kang", name: "BOPEU Kang Office", category: "Regional Offices", plot: "Plot KA5 / KA6 / KA7, Kang", phone: "+267 651 1198", tel: "2676511198", email: "kang@bopeu.org.bw", district: "Kgalagadi" }
];

window.BOPEU_AFFILIATES = [
    { name: "Diagnofirm Medical Laboratories", sector: "Health", detail: "Health & fitness discounts for members" },
    { name: "Babereki SACCOS", sector: "Finance", detail: "Cooperative savings and credit solutions" },
    { name: "Babereki Investments", sector: "Finance", detail: "Investment opportunities for members" },
    { name: "BLIC", sector: "Insurance", detail: "Insurance arm of the BOPEU family" }
];

/* =====================================================
   3. CONTACTS / CAMPAIGN PHONE NUMBERS
   ===================================================== */
window.BOPEU_CONTACTS = {
    generalLine: "2673214200",
    supportPhone: "+267 393 4222",
    supportTel: "2673934222",
    whatsapp: "2673214200",
    email: "info@bopeu.org.bw",
    supportEmail: "support@bopeu.org.bw",
    baberekiEmail: "communications@babereki.co.bw",
    baberekiContact: "+267 392 2526 / +267 316 2335",
    buildingPhone: "316 2335",
    buildingWhatsapp: "74906982",
    accessWhatsapp1: "26775750701",
    accessWhatsapp2: "2677324028"
};

/* =====================================================
   3b. DOCUMENT VAULT - OFFICIAL PDF FORMS (downloads)
   ===================================================== */
window.BOPEU_PDF_FORMS = [
    { name: "Extended Family Application", disc: "BLIC \u00b7 BOPEU Group Funeral Scheme", file: "docs/PDFs/BOPEU_BABEREKI_EXTENDED FAMILY APPLICATION FORM.pdf" },
    { name: "Extended Family (Funeral Cover)", disc: "BOPEU Group Funeral Scheme \u00b7 Bona Life", file: "docs/PDFs/BOPEU_FAMILY - EXTENDED FAMILY.pdf" },
    { name: "Group Life Nomination of Beneficiaries", disc: "BLIC \u00b7 Group Life Assurance form", file: "docs/PDFs/BOPEU_BLIC-APPLICATION - GROUP LIFE ASSURANCE NOMINATION OF BENEFICIARIES.pdf" },
    { name: "Know Your Customer (KYC)", disc: "BLIC \u00b7 Group Funeral Scheme claim form", file: "docs/PDFs/BOPEU_BLIC-KNOW YOUR CUSTOMER.pdf" },
    { name: "Funeral Cover Amendment", disc: "Babereki Insurance Brokers \u00b7 Bona Life", file: "docs/PDFs/BOPEU_BABEREKI_AMMENDMENT FORM.pdf" },
    { name: "Membership Application", disc: "Babereki Insurance Brokers \u00b7 Bona Life", file: "docs/PDFs/BOPEU_BABEREKI_MEMBERSHIP  APPLICATION FORM.pdf" }
];

/* =====================================================
   4. STATS / MEMBERSHIP NUMBER FORMAT
   ===================================================== */
window.BOPEU_STATS = {
    members: "37,000+",
    offices: "5",
    services: "9",
    affiliates: "4",
    memberNoPrefix: "BOPEU-37K-"
};

/* =====================================================
   5. ARTICLES & NOTICES
   ===================================================== */
window.BOPEU_ARTICLES = [
    {
        id: "article1",
        modalId: "article1-modal",
        title: "Educational Bursary Scheme — What You Need to Know",
        preview: "Interest-free financial assistance up to P 30,000 for your tuition, accommodation, books or research. Repay over up to 24 months..."
    },
    {
        id: "article2",
        modalId: "article2-modal",
        title: "BOPEU & Archein Hardware Building Materials Partnership",
        preview: "Build your dream home without a deposit — up to P 200,000 at 4% monthly interest on a reduced balance, with FREE nationwide delivery over P 100,000..."
    },
    {
        id: "article3",
        modalId: "article3-modal",
        title: "BOPEU Funeral Cover, underwritten by Metropolitan Life",
        preview: "Minimal red tape, no medical tests. Subscription of just 1% of basic salary (capped P 39.90 - P 100.00) for coreP 60,000 cover..."
    },
    {
        id: "article4",
        modalId: "article4-modal",
        title: "BOPEU Lending Schemes: Access Bank & In-House Loans",
        preview: "From quick P 500 loans to P 3,000,000 mortgages. Compare Access Bank facilities with BOPEU Direct / Babereki SACCOS in-house loans..."
    },
    {
        id: "article5",
        modalId: "article5-modal",
        title: "Diagnofirm+, Your Health, Your Union, Your Benefit",
        preview: "Exclusive health & fitness discounts: no 10% patient share, up to 35% off without medical aid, Virgin Active 10% off, Penalty Box 15% off..."
    },
    {
        id: "article6",
        modalId: "article6-modal",
        title: "Who We Are & How to Become a BOPEU Member",
        preview: "The Botswana Public Employees Union, founded 2007 from the BCSA (roots 1942/1960). Learn how to register at your workplace or office..."
    }
];

window.BOPEU_NOTICES = [
    {
        id: "n1",
        title: "Revised Lending Scheme - Effective 1 March 2026",
        body: "Take advantage of the revised lending scheme through our Access Bank partnership. WhatsApp the word 'payslip' to apply.",
        date: "2026-09-14"
    },
    {
        id: "n2",
        title: "Monthly Subscription Deduction",
        body: "BOPEU subscriptions and funeral cover premiums are deducted via payroll stop-order on the 15th of each month.",
        date: "2026-09-01"
    },
    {
        id: "n3",
        title: "Diagnofirm+ Health Partnership Reminder",
        body: "Present your BOPEU membership card at Diagnofirm Medical Laboratories for exclusive discounts on your lab tests.",
        date: "2026-08-26"
    },
    {
        id: "n4",
        title: "Funeral Claim Deadline Reminder",
        body: "Funeral claims must be filed within 6 months of death and all documents submitted within 12 months.",
        date: "2026-08-20"
    }
];

/* =====================================================
   6A. TIMELINE FEED POSTS (Home / Timeline tab)
   Cover artwork lives in Assets/timeline_feed_images.
   ===================================================== */
window.BOPEU_TIMELINE_POSTS = [
    {
        id: "what-we-stand-for",
        title: "What We Stand For",
        teaser: "Justice. Equality. Representation. Solidarity. Empowerment.",
        date: "September 2026",
        category: "Our Values",
        tag: "Values",
        cover: "Assets/timeline_feed_images/What_We_Stand_For-Our-Values.jpg",
        paragraphs: [
            "BOPEU exists to protect workers, strengthen their collective voice and help create fairer workplaces and better conditions of service.",
            "Every action we take is guided by effective labour representation, protecting workers' rights, fair wages and better working conditions, social justice and equality, empowered and informed members, and worker solidarity."
        ],
        sections: [
            { h: "What we stand for", b: "Effective Labour Representation - representing members and protecting their interests in the workplace. Protecting Workers' Rights - protecting and representing workers on labour matters. Fair Wages & Better Working Conditions - working toward fair wages, safe workplaces and improved conditions of service. Social Justice & Equality - promoting social justice, equality and good governance. Empowered & Informed Members - building an empowered, informed and united public workforce. Worker Solidarity - standing in solidarity with workers locally, regionally and internationally." },
            { h: "What BOPEU actually does for members", b: "Legal Representation, Organising Members, Dispute Resolution, Collective Bargaining, Grievance Management and Disciplinary Hearing Assistance." }
        ]
    },
    {
        id: "member-benefits",
        title: "Member Benefits - What You Get",
        teaser: "Your membership card isn't just proof of membership - it connects you to a growing network of financial, health, lifestyle and family benefits.",
        date: "September 2026",
        category: "Membership",
        tag: "Benefits",
        cover: "Assets/timeline_feed_images/memeber_benefits-What-You-Get.webp",
        paragraphs: [
            "Your BOPEU membership gives you more. Education, finance, family protection, health, shopping, travel, building materials and connectivity - all in one union card.",
            "Your membership card isn't just proof of membership - it connects you to a growing network of financial, health, lifestyle and family benefits."
        ],
        sections: [
            { h: "Education", b: "Educational bursary and interest-free financial assistance. Maximum stated amount: P30,000 with a maximum repayment period of 24 months. Can support tuition, study accommodation, books/materials and academic research." },
            { h: "Home & Building", b: "Archein Hardware partnership for building-material financing: up to P200,000 credit, 4% monthly interest calculated on a reduced balance, up to 36 months, no deposit, and nationwide delivery with free delivery stated for material values above P100,000." },
            { h: "Financial Services", b: "Access to Babereki SACCOS, BOPEU Direct Loans, Quick Loan, Emergency Loan, Ordinary Loan and Access Bank lending facilities." },
            { h: "Family Protection", b: "BOPEU Funeral Cover: P60,000 core benefit for member, spouse and qualifying children, no medical tests, and a 12-month premium waiver." },
            { h: "Health & Wellness", b: "Diagnofirm partnership with no 10% patient share and up to 35% off for members without medical aid. Additional listed benefits: 10% off Virgin Active and 15% off Penalty Box." },
            { h: "Lifestyle & Shopping", b: "Up to 10% off at selected supermarkets and clothing stores, selected health and wellness discounts, hotel and travel member rates, and hardware and automotive savings." },
            { h: "Utilities & Connectivity", b: "Airtime schemes, building-material schemes and other partner-based utility benefits." }
        ]
    },
    {
        id: "family-protection",
        title: "Complete Family Protection",
        teaser: "Because your family deserves financial security when it matters most. BOPEU Funeral Cover protects members, spouses and children under 21.",
        date: "September 2026",
        category: "Family Protection",
        tag: "Insurance",
        cover: "Assets/timeline_feed_images/Complete_Family_Protection-Insurance.jpg",
        paragraphs: [
            "BOPEU provides a group funeral scheme underwritten by Metropolitan Life, designed to provide financial protection to members and their families when a death occurs.",
            "Compulsory cover for the member, spouse and qualifying children under 21 comes with a 12-month premium waiver, no medical tests, an easy claims process and quick settlement - all at a discounted rate available specifically to BOPEU members."
        ],
        sections: [
            { h: "Key benefits", b: "P60,000 core benefit. Compulsory cover for the member, spouse and children under 21. 12-month premium waiver included. No medical tests. Easy claims process and quick settlement. Discounted cover specifically available to BOPEU members." },
            { h: "Subscription", b: "Subscription is 1% of basic salary, with the stated subscription range capped between P39.90 and P100.00 per month." }
        ],
        funeralTable: {
            title: "Family benefit structure",
            rows: [
                { label: "Member / spouse / qualifying core family", value: "P60,000" },
                { label: "Child aged 16-21", value: "P60,000" },
                { label: "Child aged 7-15", value: "P30,000" },
                { label: "Child aged 0-6", value: "P15,000" }
            ]
        }
    },
    {
        id: "financial-support",
        title: "Financial Support When Life Takes an Unexpected Turn",
        teaser: "Emergency loans, savings and credit through Babereki SACCOS, and BOPEU financial assistance when you need it most.",
        date: "September 2026",
        category: "Financial Support",
        tag: "Finance",
        cover: "Assets/timeline_feed_images/Emergency_Funds_Available-Union-Loan-Scheme.png",
        paragraphs: [
            "BOPEU's in-house lending scheme includes an Emergency Loan designed for members who need short-term financial assistance.",
            "The wider BOPEU benefits information also describes financial-assistance services providing emergency loans and financial advisory services to support members' economic stability."
        ],
        sections: [
            { h: "BOPEU Emergency Loan", b: "P2,001 - P20,000 with a repayment period of up to 24 months. Published information states a minimum loan of P1,000 and an approval turnaround of 48 hours." },
            { h: "Babereki SACCOS", b: "BOPEU provides access to Babereki SACCOS, described as providing cooperative savings and credit solutions for members." },
            { h: "Union financial support", b: "BOPEU also provides financial advisory services to support members' economic stability, alongside the Emergency Loan and Babereki savings and credit facilities." }
        ]
    },
    {
        id: "educational-bursary",
        title: "Educational Bursary - Interest-Free Support",
        teaser: "Interest-free financial assistance up to P30,000 for tuition, study accommodation, books, materials and academic research.",
        date: "September 2026",
        category: "Education",
        tag: "Bursary",
        cover: "Assets/timeline_feed_images/educational_bursaries.webp",
        paragraphs: [
            "BOPEU members can access an educational bursary with interest-free financial assistance. The maximum stated amount is P30,000, repaid over a maximum of 24 months.",
            "The bursary can support tuition, study accommodation, books and materials, and academic research - giving members a practical route to further their education."
        ],
        sections: [
            { h: "What it covers", b: "Tuition, study accommodation, books and materials, and academic research." },
            { h: "Amount & repayment", b: "Maximum stated amount: P30,000. Maximum repayment period: 24 months. Financial assistance is interest-free." }
        ]
    },
    {
        id: "lifestyle-shopping",
        title: "Lifestyle & Shopping Discounts",
        teaser: "Up to 10% off at selected supermarkets and clothing stores, plus health, wellness, hotel, travel, hardware and automotive savings.",
        date: "September 2026",
        category: "Lifestyle",
        tag: "Shopping",
        cover: "Assets/timeline_feed_images/lifestyle_discounts_at_selected_retailers_and_hotels.webp",
        paragraphs: [
            "Your membership unlocks lifestyle and shopping savings across selected retailers, hotels, health and wellness providers, and more.",
            "Enjoy up to 10% off at selected supermarkets and clothing stores, plus hotel and travel member rates, hardware and automotive savings, and selected health and wellness discounts."
        ],
        sections: [
            { h: "Lifestyle & Shopping", b: "Up to 10% off at selected supermarkets and clothing stores, selected health and wellness discounts, hotel and travel member rates, and hardware and automotive savings." }
        ]
    },
    {
        id: "utilities-connectivity",
        title: "Utilities & Connectivity",
        teaser: "Airtime schemes, building-material schemes and other partner-based utility benefits for BOPEU members.",
        date: "September 2026",
        category: "Utilities",
        tag: "Connectivity",
        cover: "Assets/timeline_feed_images/utilities_airtime_and_building_materia_schemes.webp",
        paragraphs: [
            "Beyond the core benefits, BOPEU members can access convenient utility and connectivity offerings through partner schemes.",
            "This includes airtime schemes, building-material schemes and other partner-based utility benefits - helping members save on everyday needs."
        ],
        sections: [
            { h: "Utilities & Connectivity", b: "Airtime schemes, building-material schemes and other partner-based utility benefits." }
        ]
    },
    {
        id: "funeral-cover",
        title: "BOPEU Funeral Cover",
        teaser: "Group funeral cover underwritten by Metropolitan Life - subscription is 1% of basic salary, capped between P39.90 and P100.00.",
        date: "September 2026",
        category: "Family Protection",
        tag: "Insurance",
        cover: "Assets/timeline_feed_images/insurance_bopeu_funeral_cover.webp",
        paragraphs: [
            "BOPEU provides a group funeral scheme underwritten by Metropolitan Life, designed to give members and their families financial protection when a death occurs.",
            "Subscription is 1% of basic salary, with the stated subscription range capped between P39.90 and P100.00 per month. Cover is discounted specifically for BOPEU members."
        ],
        sections: [
            { h: "How it works", b: "Group funeral scheme underwritten by Metropolitan Life. Compulsory cover for the member, spouse and children under 21, with a 12-month premium waiver included." },
            { h: "Key benefits", b: "P60,000 core benefit, no medical tests, easy claims process and quick settlement, at a discounted rate available specifically to BOPEU members. Subscription is 1% of basic salary, capped between P39.90 and P100.00." }
        ]
    },
    {
        id: "emergency-loan",
        title: "Emergency Loan & Financial Assistance",
        teaser: "BOPEU's in-house Emergency Loan: P2,001-P20,000, repayable over up to 24 months, with a stated 48-hour approval turnaround.",
        date: "September 2026",
        category: "Financial Support",
        tag: "Finance",
        cover: "Assets/timeline_feed_images/finance_financial_assistance.webp",
        paragraphs: [
            "BOPEU's in-house lending scheme includes an Emergency Loan designed for members who need short-term financial assistance.",
            "The wider BOPEU benefits information describes financial-assistance services providing emergency loans and financial advisory services to support members' economic stability."
        ],
        sections: [
            { h: "Emergency Loan", b: "P2,001 - P20,000 with a repayment period of up to 24 months. Published information states a minimum loan of P1,000 and an approval turnaround of 48 hours." },
            { h: "Financial assistance", b: "BOPEU provides financial advisory services alongside emergency lending to support members' economic stability." }
        ]
    },
    {
        id: "babereki-saccos",
        title: "Babereki SACCOS - Savings & Credit",
        teaser: "Cooperative savings and credit solutions for BOPEU members through Babereki SACCOS.",
        date: "September 2026",
        category: "Financial Support",
        tag: "Savings",
        cover: "Assets/timeline_feed_images/finane_access_to_babareki_saccos.webp",
        paragraphs: [
            "BOPEU provides access to Babereki SACCOS, described as providing cooperative savings and credit solutions for members.",
            "Members can use these savings and credit facilities alongside BOPEU Direct Loans and the Emergency Loan to manage short-term financial needs and build savings."
        ],
        sections: [
            { h: "Babereki SACCOS", b: "Cooperative savings and credit solutions for BOPEU members, supporting economic stability alongside BOPEU's lending and advisory services." }
        ]
    }
];

/* =====================================================
   6. MOCK MEMBERS (admin + login demo data)
   ===================================================== */
window.BOPEU_MOCK_MEMBERS = [
    { name: "Kabelo Modise", omang: "090000111", memberNo: "BOPEU-37K-1001", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Transport & Public Works", employerId: "mptw", departmentId: "roads", jobTitle: "Roads Maintenance Worker", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 4200, joined: "2023-04-10" },
    { name: "Kelebogile Moseki", omang: "090000222", memberNo: "BOPEU-37K-1002", sector: "local_council", sectorLabel: "Local Authority", employer: "Gaborone City Council", employerId: "gcc", departmentId: "public_health", jobTitle: "Refuse Collector / Loader", district: "Gaborone", office: "Gaborone", status: "pending_verification", basicSalary: 3100, joined: "2026-02-01" },
    { name: "Tumelo Rantao", omang: "090000333", memberNo: "BOPEU-37K-1003", sector: "land_board", sectorLabel: "Land Board", employer: "Malete Land Board", employerId: "mlb", departmentId: "allocation", jobTitle: "Land Board Field Assistant", district: "South East", office: "Gaborone", status: "active", basicSalary: 3600, joined: "2022-11-03" },
    { name: "Boitumelo Lesego", omang: "090000444", memberNo: "BOPEU-37K-1004", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Water Utilities Corporation (WUC)", employerId: "wuc", departmentId: "utilities", jobTitle: "Meter Reader", district: "Ngamiland", office: "Maun", status: "active", basicSalary: 5100, joined: "2021-07-12" },
    { name: "Olorato Keaikitse", omang: "090000555", memberNo: "BOPEU-37K-1005", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Health", employerId: "moh", departmentId: "hospitals", jobTitle: "Hospital Orderly", district: "Central District", office: "Palapye", status: "pending_verification", basicSalary: 2900, joined: "2026-03-15" },
    { name: "Moakofi Sethunya", omang: "090000666", memberNo: "BOPEU-37K-1006", sector: "local_council", sectorLabel: "Local Authority", employer: "Francistown City Council", employerId: "fcc", departmentId: "public_health", jobTitle: "Street Cleaner", district: "Francistown", office: "Francistown", status: "active", basicSalary: 2700, joined: "2020-01-20" },
    { name: "Lebogang Mokgakane", omang: "090000777", memberNo: "BOPEU-37K-1007", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "Botswana Power Corporation (BPC)", employerId: "bpc", departmentId: "utilities", jobTitle: "Electrical Line Assistant", district: "Gaborone", office: "Gaborone", status: "active", basicSalary: 5800, joined: "2019-09-01" },
    { name: "Refilwe Raditladi", omang: "090000888", memberNo: "BOPEU-37K-1008", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Education & Skills Development", employerId: "moes", departmentId: "schools", jobTitle: "General Maintenance Worker", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 3400, joined: "2022-05-18" },
    { name: "Kagiso Molapisi", omang: "090000999", memberNo: "BOPEU-37K-1009", sector: "land_board", sectorLabel: "Land Board", employer: "Ngwato Land Board", employerId: "nlb", departmentId: "ops", jobTitle: "Records Assistant", district: "Central District", office: "Palapye", status: "pending_verification", basicSalary: 3300, joined: "2026-01-25" },
    { name: "Oratile Sekhute", omang: "090001000", memberNo: "BOPEU-37K-1010", sector: "parastatal", sectorLabel: "Parastatal / SOE", employer: "BotswanaPost", employerId: "bpost", departmentId: "logistics", jobTitle: "Postal Courier", district: "Ngamiland", office: "Maun", status: "active", basicSalary: 3000, joined: "2021-03-09" },
    { name: "Aobakwe Sebina", omang: "090001111", memberNo: "BOPEU-37K-1011", sector: "central_gov", sectorLabel: "Central Government", employer: "Ministry of Agriculture", employerId: "moa", departmentId: "field_offices", jobTitle: "Field Assistant", district: "Ngwaketse", office: "Kang", status: "active", basicSalary: 3200, joined: "2018-08-05" },
    { name: "Gontse Wale", omang: "090001222", memberNo: "BOPEU-37K-1012", sector: "local_council", sectorLabel: "Local Authority", employer: "Kweneng District Council", employerId: "kdc", departmentId: "civil", jobTitle: "Maintenance Technician", district: "Kweneng", office: "Gaborone", status: "active", basicSalary: 3800, joined: "2020-06-15" }
];

/* =====================================================
   7. FUNERAL COVER RULES (Metropolitan Life)
   Subscription = 1% of basic salary capped P39.90 - P100.00
   Core cover P60,000 for member, spouse and children under 21.
   12-month premium waiver on death of a member.
   ===================================================== */
window.BOPEU_FUNERAL = {
    currency: "BWP",
    subscriptionRate: 0.01,
    subscriptionMin: 39.90,
    subscriptionMax: 100.00,
    coreCover: "P 60,000",
    childBrackets: [
        { key: 'Child 16-21', minAge: 16, maxAge: 21, cover: 'P 60,000' },
        { key: 'Child 7-15', minAge: 7, maxAge: 15, cover: 'P 30,000' },
        { key: 'Child 0-6', minAge: 0, maxAge: 6, cover: 'P 15,000' }
    ],
    spouseCover: 'P 60,000',
    parentCover: 'P 60,000',
    extendedCover: 'P 60,000',
    maxChildren: 10,
    premiumWaiverMonths: 12,
    claimWindowMonths: 6,
    docWindowMonths: 12
};

/* =====================================================
   8. AGE HELPERS
   ===================================================== */
function ageFromDob(dob) {
    if (!dob) return null;
    const d = new Date(dob);
    if (isNaN(d.getTime())) return null;
    const now = new Date();
    let age = now.getFullYear() - d.getFullYear();
    const m = now.getMonth() - d.getMonth();
    if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
    return age;
}

function ageBandFromDob(dob) {
    const age = ageFromDob(dob);
    if (age === null) return 'low';
    if (age <= 40) return 'low';
    if (age <= 75) return 'mid';
    return 'high';
}

function childBracketFromDob(dob) {
    const age = ageFromDob(dob);
    if (age === null || age < 0 || age > 21) return null;
    return BOPEU_FUNERAL.childBrackets.find(b => age >= b.minAge && age <= b.maxAge) || null;
}

function childBracketFromKey(key) {
    if (!key || key.indexOf('Child') !== 0) return null;
    return BOPEU_FUNERAL.childBrackets.find(b => b.key === key) || null;
}

function childBracketFor(relation, dob) {
    const byKey = childBracketFromKey(relation);
    if (byKey) return byKey;
    return relation && relation.indexOf('Child') === 0 ? childBracketFromDob(dob) : null;
}

function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}

/* Funeral cover: benefit by relation/age */
function familyMemberCover(relation, dob) {
    const fr = BOPEU_FUNERAL;
    if (relation === 'Spouse') return fr.spouseCover;
    if (relation === 'Parent / Extended') return fr.extendedCover;
    if (relation && relation.indexOf('Child') === 0) {
        const bracket = childBracketFor(relation, dob);
        return bracket ? bracket.cover : 'P 15,000';
    }
    return fr.spouseCover;
}

/* Subscription: 1% of basic salary capped P39.90 - P100.00 */
function funeralSubscription(basicSalary) {
    const fr = BOPEU_FUNERAL;
    const calc = (typeof basicSalary === 'number' && basicSalary > 0) ? basicSalary * fr.subscriptionRate : fr.subscriptionMin;
    return Math.min(Math.max(calc, fr.subscriptionMin), fr.subscriptionMax);
}

function computeFuneralTotals(basicSalary, family) {
    const sub = funeralSubscription(basicSalary);
    return {
        subscription: sub,
        coreCover: BOPEU_FUNERAL.coreCover,
        coveredMembers: (family || []).length + 1,
        total: sub
    };
}

/* =====================================================
   9. BENEFIT PARTNERS (discount verification)
   ===================================================== */
const BOPEU_PARTNER_LOGO = 'Assets/logo/partners/';
window.BOPEU_BENEFIT_PARTNERS = [
    { id: "absa", name: "Absa Bank Botswana", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "absa_logo.webp", discount: "Banking products & lending", detail: "Absa Bank Botswana provides retail, corporate and investment banking across a nationwide branch and ATM network. Member-relevant service areas include savings and current accounts, personal loans, mortgages, corporate finance and digital banking. A BOPEU-specific price, fee waiver or discount is not yet published.", how: "Ask at any Absa branch or contact your nearest BOPEU office. No BOPEU member rate is published yet, so confirm current terms at enquiry.", icon: "A", status: "coming", statusLabel: "Terms to Confirm", validity: "Partner service confirmed; BOPEU member terms to be confirmed", lastVerified: "22 Sep 2026" },
    { id: "access_bank", name: "Access Bank Botswana", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "access_bank_logo.webp", discount: "Personal, vehicle & mortgage lending", detail: "BOPEU-linked lending revised effective 1 March 2026. Personal loans P10,000–P700,000 up to 96 months; vehicle loans up to P1,200,000 (up to 72–84 months, 0% deposit for vehicles below P500,000 per a September 2026 Babereki notice); mortgages up to P3,000,000 / 360 months with up to 90% financing of the property's open market value. A promotional personal-loan rate was advertised until 15 December 2026. Credit is subject to affordability.", how: "Visit an Access Bank branch, or WhatsApp \u201cpayslip\u201d to +267 75 750 701 / +267 73 240 284.", icon: "AB", status: "verified", statusLabel: "Confirmed 2026", validity: "Scheme effective 1 Mar 2026 \u00b7 promo personal-loan rate to 15 Dec 2026", terms: "Terms & Conditions apply. Credit is subject to affordability assessment.", lastVerified: "22 Sep 2026" },
    { id: "acudetox", name: "AcuDetox Clinic", sector: "Health", category: "Health & Wellness", logo: BOPEU_PARTNER_LOGO + "acudetox_clinic_logo.webp", discount: "Acupuncture & holistic wellness", detail: "Acupuncture detoxification, holistic therapy and body-wellness treatments. Announced with Diagnofirm in February 2026 as an exclusive BOPEU health benefit. A current numeric member discount or service package is not yet published.", how: "Current member consultation/treatment discount to be confirmed with the clinic.", icon: "AD", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "archein", name: "Archein Hardware", sector: "Hardware", category: "Building Materials / Home Ownership", logo: BOPEU_PARTNER_LOGO + "archein_hardware_logo.webp", discount: "Up to P200,000 material credit", detail: "Home-ownership building-material scheme with subsidised materials, project-related credit and nationwide delivery. No deposit, 4% monthly interest on the reducing balance, repay up to 36 months, and free delivery on material values above P100,000. Coverage includes Phakalane, Tsabong, Letlhakane, Maun, Gumare and Shakwe.", how: "Apply by telephone, email or WhatsApp \u2014 316 2335 / 74906982.", icon: "AH", status: "verified", statusLabel: "Confirmed 2026", validity: "Ongoing until changed", terms: "Credit is a subsidised scheme, not a retail coupon \u2014 approval is subject to scheme requirements and affordability.", lastVerified: "22 Sep 2026" },
    { id: "builders_world", name: "Builders World", sector: "Hardware", category: "Hardware / Building Materials", logo: BOPEU_PARTNER_LOGO + "builders_world_logo.webp", discount: "Home-improvement materials", detail: "Home-improvement and building-material retailer operating across Botswana \u2014 cement, timber, roofing, tiles, sanitaryware, electrical supplies and hardware tools. BOPEU's general benefits page lists reduced pricing on building materials; a Builders World-specific percentage, credit limit or delivery rule is not yet published.", how: "Member price list / scheme to be confirmed with the partner.", icon: "BW", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "cresta_hotels", name: "Cresta Hotels", sector: "Travel", category: "Hospitality & Accommodation", logo: BOPEU_PARTNER_LOGO + "cresta_hotels_logo.webp", discount: "Special member accommodation rates", detail: "Botswana-wide hospitality group offering accommodation, conferences, restaurants and event hosting. Properties include Cresta Lodge Gaborone, Cresta Maun Hotel, Cresta Marang Gardens (Francistown) and Cresta Mahalapye. BOPEU members are offered special member rates at participating hotels; the Cresta-specific rate is not yet published.", how: "Member card may be required; specific rate and booking channel to be confirmed.", icon: "CH", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "diagnofirm", name: "Diagnofirm Medical Laboratories", sector: "Health", category: "Healthcare & Diagnostics", logo: BOPEU_PARTNER_LOGO + "diagnofirm_logo.webp", discount: "No 10% patient share \u00b7 up to 35% off", detail: "Exclusive health & fitness discounts for BOPEU members. No 10% patient share and up to 35% off for members without medical aid. Additional listed savings: Virgin Active 10% off and Penalty Box 15% off. Services include pathology, microbiology, molecular testing and health screenings.", how: "Carry your valid BOPEU membership card for verification at the laboratory.", icon: "D", status: "verified", statusLabel: "Confirmed 2026", validity: "Ongoing until changed", lastVerified: "22 Sep 2026" },
    { id: "drillonic", name: "Drillonic Water Development", sector: "Hardware", category: "Water Development / Boreholes", logo: BOPEU_PARTNER_LOGO + "drillonic_borehole_drilling_logo.webp", discount: "Borehole drilling & surveys", detail: "Water-development services for domestic, agricultural and industrial projects \u2014 hydrogeological surveys, underground-water exploration, borehole drilling, pump installation and yield testing. No BOPEU member discount, credit arrangement or installation concession is yet published.", how: "Member rate to be confirmed with the partner.", icon: "DW", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "first_capital_bank", name: "First Capital Bank", sector: "Finance", category: "Financial Services & Banking", logo: BOPEU_PARTNER_LOGO + "first_capital_bank_logo.webp", discount: "Babereki + FCB facility up to P200,000", detail: "Babereki Investments + First Capital Bank loan facility available to BOPEU members. Access up to P200,000 and repay up to 60 months. Qualifying third-party loans with other financial institutions may be cleared within the approved limit. September 2026 Babereki notices confirm the facility.", how: "Call or WhatsApp 316 2335, or visit your nearest BOPEU office.", icon: "FCB", status: "verified", statusLabel: "Confirmed 2026", validity: "September 2026 facility \u2014 current terms apply", terms: "Terms & Conditions apply; eligibility and interest rate to be confirmed at application.", lastVerified: "22 Sep 2026" },
    { id: "hollard", name: "Hollard", sector: "Insurance", category: "Insurance", logo: BOPEU_PARTNER_LOGO + "hollard_logo.webp", discount: "Life & short-term insurance", detail: "Life and short-term insurance including funeral, motor, home and commercial asset cover. A BOPEU/Babereki\u2013Hollard joint venture was announced in 2015 as a five-year arrangement, so those terms must not be treated as active 2026 member pricing without current BOPEU confirmation. Confirm the current agreement, product list and member pricing.", how: "Confirm the current partner agreement through Babereki Insurance Brokers.", icon: "H", status: "coming", statusLabel: "Terms to Verify", validity: "2015 JV terms historical \u2014 current 2026 pricing to verify", lastVerified: "22 Sep 2026" },
    { id: "majestic_five_hotel", name: "Majestic Five Hotel", sector: "Travel", category: "Hospitality & Accommodation", logo: BOPEU_PARTNER_LOGO + "majestic_five_hotel_logo.webp", discount: "Accommodation & conferences", detail: "Four-star property in Palapye with rooms and suites, conference halls, swimming pool, restaurant and bar. BOPEU uses the hotel as a venue for major union meetings and congresses. A current member accommodation discount or rate is not yet published.", how: "Member accommodation rate and booking/verification process to be confirmed.", icon: "M5", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "mascom", name: "Mascom", sector: "Telecom", category: "Telecommunications / Mobile Money", logo: BOPEU_PARTNER_LOGO + "mascom_logo.webp", discount: "Voice, data & MyZaka", detail: "Mobile voice and data, MyZaka mobile money, fibre internet and enterprise services. A historic BOPEU airtime contract with Mascom and Orange documented monthly salary deductions of P65\u2013P400 over two years; those amounts are historical and require current confirmation before being presented as 2026 terms.", how: "Current 2026 airtime bands and contract terms to be confirmed with Mascom/Babereki.", icon: "M", status: "coming", statusLabel: "Terms to Verify", validity: "Historical scheme \u2014 current 2026 terms to verify", lastVerified: "22 Sep 2026" },
    { id: "old_mutual", name: "Old Mutual", sector: "Insurance", category: "Insurance / Savings / Investments", logo: BOPEU_PARTNER_LOGO + "old_mutual_logo.webp", discount: "Household, car & business insurance", detail: "A BOPEU/Babereki + Old Mutual collaboration offers insurance cover for household contents, gadgets, cars and businesses, alongside long-term savings, investment, wealth management, unit trusts, life insurance and retirement planning. The scheme was re-launched in 2022; current 2026 member premiums and discounts need confirmation.", how: "Adjust cover via Babereki Insurance Brokers; current pricing to confirm.", icon: "OM", status: "coming", statusLabel: "Pricing to Verify", validity: "Scheme documented 2022 \u2014 current 2026 pricing to verify", lastVerified: "22 Sep 2026" },
    { id: "orange", name: "Orange Botswana", sector: "Telecom", category: "Telecommunications / Mobile Money", logo: BOPEU_PARTNER_LOGO + "orange_logo.webp", discount: "Voice, data & Orange Money", detail: "Prepaid and postpaid plans, Orange Money, home fibre, cloud and business connectivity. A historic BOPEU airtime salary-deduction arrangement with Mascom, Orange and beMobile documented P65\u2013P400 monthly bands over two years; the current 2026 individual terms require confirmation.", how: "Current 2026 airtime terms and bundles to be confirmed with Orange/Babereki.", icon: "O", status: "coming", statusLabel: "Terms to Verify", validity: "Historical scheme \u2014 current 2026 terms to verify", lastVerified: "22 Sep 2026" },
    { id: "royal_dental_clinic", name: "Royal Dental Clinic", sector: "Health", category: "Dental Care", logo: BOPEU_PARTNER_LOGO + "royal_dental_clinic_logo.webp", discount: "Dental care", detail: "Private dental practice in the Grand Union Building, Gaborone, providing general consultations, cleanings, restorative dentistry and cosmetic procedures. No current BOPEU-specific dental discount or treatment package is yet published.", how: "Member discount / treatment package and booking verification to be confirmed.", icon: "RD", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" },
    { id: "village_medical_day_care_centre", name: "Village Medical Day Care Centre", sector: "Health", category: "Medical / Day Care", logo: BOPEU_PARTNER_LOGO + "village_medical_day_care_centre_logo.webp", discount: "Day procedures & consultations", detail: "Day procedures, medical consultations and access to diagnostic imaging facilities in the Village precinct. No current BOPEU-specific rate or service entitlement is yet published; confirm the exact legal/business name and address before publishing.", how: "Member rate / service entitlement to be confirmed with the centre.", icon: "VM", status: "coming", statusLabel: "Terms to Confirm", validity: "Requires current confirmation", lastVerified: "22 Sep 2026" }
];

/* =====================================================
   10. WORKER EDUCATION QUIZ
   ===================================================== */
window.BOPEU_QUIZ = [
    { q: "When was BOPEU founded?", options: ["1995", "2001", "2007", "2012"], answer: 2 },
    { q: "Who can join BOPEU?", options: ["Only central government workers", "All eligible public sector employees", "Private sector only", "Students"], answer: 1 },
    { q: "The BOPEU Educational Bursary maximum loan is:", options: ["P 10,000", "P 20,000", "P 30,000", "P 50,000"], answer: 2 },
    { q: "Bursary funds are provided at what interest rate?", options: ["8%", "4%", "2%", "0% (interest-free)"], answer: 3 },
    { q: "Funeral cover subscription equals:", options: ["P 100 flat", "1% of basic salary (capped P39.90-P100)", "5% of salary", "P 30 per month"], answer: 1 },
    { q: "BOPEU members can get up to ___ off at Diagnofirm without medical aid.", options: ["10%", "20%", "35%", "50%"], answer: 2 },
    { q: "The Archein building materials scheme offers up to:", options: ["P 100,000", "P 200,000", "P 500,000", "P 1,000,000"], answer: 1 },
    { q: "BOPEU's head office is located in:", options: ["Francistown", "Maun", "Gaborone CBD", "Palapye"], answer: 2 }
];

/* =====================================================
   11. FAQ / KNOWLEDGE BASE (Menu tab)
   ===================================================== */
window.BOPEU_FAQ = [
    {
        cat: "Membership & Eligibility",
        items: [
            {
                q: "What is BOPEU?",
                a: "It is a registered trade union in Botswana originally founded in 2007 (evolving from the Botswana Civil Servants Association) that serves as a bargaining agent protecting the welfare of public and parastatal employees."
            },
            {
                q: "Who can join BOPEU?",
                a: "Any employee of the Government of the Republic of Botswana or parastatal organizations where the government has a financial interest (such as WUC, BOBS, BMC, and BTO)."
            },
            {
                q: "Which parastatals does BOPEU recruit from?",
                a: "They organize workers across several key entities, including the Water Utilities Corporation (WUC), Botswana Bureau of Standards (BOBS), Botswana Meat Commission (BMC), and the Botswana Tourism Organisation (BTO)."
            }
        ]
    },
    {
        cat: "Workplace Representation & Legal Rights",
        items: [
            {
                q: "How does BOPEU assist with workplace disputes?",
                a: "The union provides free legal representation, dispute resolution, grievance management, and collective bargaining to protect your terms of service."
            },
            {
                q: "Does BOPEU handle individual cases?",
                a: "Yes. BOPEU is one of the few trade unions in Botswana that manages individual employee grievances and disciplinary disputes free of charge."
            }
        ]
    },
    {
        cat: "Financial & Fringe Benefits",
        items: [
            {
                q: "What financial assistance programs are available?",
                a: "Members have access to low-interest microloans (short-term loans) at a 2% interest rate, commercial bank loan partnerships (with Access Bank and ABSA), and the Babereki SACCOS savings and investment scheme."
            },
            {
                q: "Are there any lifestyle or shopping discounts?",
                a: "Yes. Members receive up to 10% off at selected supermarkets, retail shops, and hardware stores (such as Sefalana, Motovac, and Cresta hotels)."
            },
            {
                q: "Does BOPEU offer educational support?",
                a: "Yes, the union runs a dedicated Bursary Scheme to financially assist eligible members with educational advancement."
            }
        ]
    },
    {
        cat: "Insurance & Funeral Cover",
        items: [
            {
                q: "How does the BOPEU Group Funeral Cover work?",
                a: "The scheme provides a core benefit of P60,000 for the main member and spouse. It requires a subscription fee of 1% of your basic salary (capped between P39.90 and P100.00) and includes a 12-month premium waiver."
            },
            {
                q: "How can I manage my insurance policies or file claims?",
                a: "Members can use the digital Babereki Insurance Brokers Portal to complete self-service registrations, amend family details, and submit claims online."
            }
        ]
    }
];