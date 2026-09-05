Yes, I can create that `.md` execution specification for VS Code. Since your goal is not just documentation but a **developer implementation blueprint**, the Markdown file should act as a **single source of truth** for expanding the existing HTML POC.

I would structure it as a professional product requirements + technical implementation document:

**File name:**

```
NALCGPWU_MOKAULENGWE_DIGITAL_PLATFORM_IMPLEMENTATION_GUIDE.md
```

It will include:

# NALCGPWU / Mokaulengwe Digital Worker Welfare Platform

## Offline-First Progressive Web App (POC) Implementation Specification

---

## 1. Project Purpose

Defines the expansion of the existing HTML prototype into a stakeholder demonstration platform for:

* NALCGPWU union leadership
* Mokaulengwe Benefit Scheme management
* Public sector workers
* Government payroll-linked members
* Potential technical partners

Platform objective:

> Create a low-bandwidth digital welfare ecosystem allowing Botswana public sector workers to access insurance, benefits, claims assistance, loans, union communication, and membership services.

---

# 2. Organisation Structure

## Parent Organisation

## NALCGPWU

National Amalgamated Local & Central Government Parastatal Workers Union

Also known as:

* Manual Workers Union
* Babereki

Role:

* Worker representation
* Collective bargaining
* Labour rights
* Worker welfare advocacy

---

## Commercial Welfare Arm

## Mokaulengwe Benefit Scheme

Relationship:

```
NALCGPWU
      |
      |
Mokaulengwe Investments (Pty) Ltd
      |
      |
--------------------------------
|              |               |
Benefit      Microlenders     SACCOS
Scheme
|
Insurance + Welfare Services
```

---

# 3. Target Membership Architecture

The app MUST support the four public employment sectors:

```
Public Worker
      |
      |
Employment Sector
      |
      |
Department
      |
      |
Cadre / Job Role
```

---

# 4. Member Registration Data Model

Example:

```json
{
 "member":{
   "name":"",
   "omang":"",
   "payrollNumber":"",
   "unionNumber":"",
   "sector":"",
   "department":"",
   "cadre":"",
   "location":""
 }
}
```

---

# 5. Employment Sector Database

## Sector 1: Central Government

ID:

```
central_gov
```

Departments:

* Public Works (CTO/DEMS)
* Health
* Agriculture
* Education
* Wildlife & Environment

Cadres:

* Driver / Machine Operator
* Artisan / Tradesman
* General Maintenance Worker
* Roads Worker
* Hospital Orderly
* Health Auxiliary Worker
* Messenger
* Cleaner
* Security Guard
* Storekeeper

---

## Sector 2: Local Authorities

ID:

```
local_council
```

Departments:

* Civil Engineering
* Public Health & Waste
* Social Development
* Commercial Services

Cadres:

* Refuse Collector
* Street Cleaner
* Waste Operator
* Abattoir Worker
* Caretaker
* Cook
* Maintenance Technician
* Sewerage Operator

---

## Sector 3: Land Boards

ID:

```
land_board
```

Departments:

* Land Allocation
* Survey
* Compliance
* Regional Logistics

Cadres:

* Field Assistant
* Survey Assistant
* Demarcation Assistant
* Driver
* Records Assistant
* Customer Service Clerk

---

## Sector 4: Parastatals / SOEs

ID:

```
parastatal
```

Entities:

* WUC
* BPC
* Botswana Railways
* Air Botswana
* BMC
* BHC
* BAMB
* BotswanaPost
* BTC

Departments:

* Utilities
* Logistics
* Agriculture
* Housing

Cadres:

* Meter Reader
* Line Assistant
* Pipefitter
* Pump Operator
* Warehouse Assistant
* Courier
* Estate Maintenance Worker

---

# 6. Existing HTML Integration Rules

The current HTML already contains:

```
Timeline
Notices
Benefits
Claims
Menu
```

New modules must follow:

```
<body>

content-area

   tab-page

      feature card

      forms

      components

</tab-page>

</content-area>

<script>

feature logic

localStorage handlers

</script>
```

---

# 7. New Application Modules

## MODULE A

# Member Coverage System

Features:

* Covered family cards
* Dependants
* Policy status
* Waiting periods
* Funeral payout visibility
* Digital policy card

Data:

```
mokau_dependents
mokau_profile
mokau_policy
```

---

# MODULE B

# Public Sector Worker Profile

Profile captures:

## Personal

* Name
* Omang
* Photo

## Payroll

* Payroll number
* Employer
* Sector

## Organisation

* Ministry/company
* Department
* Cadre
* District

---

# MODULE C

# Insurance Claims Engine

Features:

## Death Claim Wizard

Supports:

* Member death
* Spouse death
* Child death
* Parent death
* Extended family death

Generates:

```
Required Documents Checklist
+
WhatsApp Support Message
```

---

# MODULE D

# Offline Document Vault

Stores:

```
mokau_docs[]
```

Allows:

* Camera capture
* Upload documents
* Claim attachments
* Payment proof

---

# MODULE E

# Funeral Support Network

Partner directory:

* Funeral services
* Grocery suppliers
* Regional offices

Search:

```
District
Town
Nearest office
```

---

# MODULE F

# Financial Services

Includes:

## Loan Calculator

Inputs:

* Amount
* Term
* Interest

Output:

* Monthly repayment

---

## Mokaulengwe Ecosystem Links

Connect:

* Microlenders
* SACCOS
* Insurance services

---

# MODULE G

# Union Communication

Features:

## Noticeboard

Offline cache:

```
mokau_notices
```

## WhatsApp Templates

Examples:

* Add dependent
* Claim assistance
* Loan enquiry

---

# MODULE H

# Worker Education

## Rights Quiz

Topics:

* Payroll deductions
* Union rights
* Benefits
* Worker protections

---

# MODULE I

# Offline-First System

Requirements:

## Storage

Use:

```
localStorage
```

Future migration:

```
IndexedDB
Firebase
Supabase
```

---

## Data Saver

Features:

* Disable images
* Reduce bandwidth
* Text-first mode

---

## Emergency Mode

Permanent button:

```
CALL MOKAULENGWE
```

---

# 8. UI Design Requirements

Design philosophy:

## "Digital Babereki Assistant"

Characteristics:

* Simple
* Trustworthy
* Government worker friendly
* Large buttons
* Low literacy friendly
* Setswana compatible

---

# 9. Future Backend Architecture

Recommended:

```
Frontend
HTML/CSS/JS PWA

        |

API Layer

        |

Database

        |

--------------------------------

Members
Claims
Payroll
Policies
Loans
Notifications

```

---

# 10. Development Checklist

## Phase 1

[x] Existing HTML prototype

## Phase 2

Add:

[x] Member profile

[x] Coverage cards

[x] Claims wizard

[x] Loan calculator

[x] Document vault

[x] Noticeboard

[x] Language toggle

## Phase 3

Backend:

* Authentication
* Government payroll integration
* Claims processing
* Admin dashboard

---

# 11. Stakeholder Demonstration Flow

Demo sequence:

1. Worker registers
2. Selects employment sector
3. Adds dependants
4. Views policy card
5. Simulates claim
6. Uploads documents
7. Calculates loan
8. Contacts union
9. Receives notices

---

This Markdown file will essentially become the **developer constitution for the HTML POC**, ensuring that when you or another developer opens VS Code, they know exactly what must be added, where it belongs, and how the system should evolve.

I would also recommend adding a second file afterwards:

```
NALCGPWU_ADMIN_DASHBOARD_SPECIFICATION.md
```

because stakeholders will likely ask: *"How does the union manage members, claims, payroll deductions, and notices from the back office?"* That is the missing half of the proof of concept.
