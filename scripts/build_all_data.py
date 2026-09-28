# scripts/build_all_data.py
import os
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = r"d:\Telangana"
DATA_DIR = os.path.join(BASE_DIR, "src", "data", "2026-27")
os.makedirs(DATA_DIR, exist_ok=True)

# 1. READ EXISTING BUDGET SUMMARY
with open(os.path.join(DATA_DIR, "budget_summary.json"), encoding="utf-8") as f:
    budget_summary = json.load(f)

# 2. ALL 38 DEMANDS FOR GRANTS (From Volume I/2 and Notice 2026-27)
# Exact values in Rs and in Lakhs/Crores
demands_raw = [
    {
        "demandNo": "I",
        "name": "State Legislature",
        "teluguName": "రాష్ట్ర శాసన మండలి",
        "ministerTitle": "Minister in-charge of Information Technology, Electronics & Communications; Industries & Commerce and Legislative Affairs",
        "ministerName": "D. Sridhar Babu",
        "department": "Legislature Secretariat",
        "volumeBook": "Volume III/1",
        "amountRs": 2534632000,
        "amountCrore": 253.46,
        "revenueGrossLakhs": 22346.32,
        "capitalGrossLakhs": 3000.00,
        "totalGrossLakhs": 25346.32,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 22346.32,
        "capitalNetLakhs": 3000.00,
        "totalNetLakhs": 25346.32,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 7
    },
    {
        "demandNo": "II",
        "name": "Governor and Council of Ministers",
        "teluguName": "గవర్నర్, మంత్రి పరిషత్",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "General Administration Department",
        "volumeBook": "Volume III/2",
        "amountRs": 228556000,
        "amountCrore": 22.86,
        "revenueGrossLakhs": 2285.56,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 2285.56,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 2285.56,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 2285.56,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 7
    },
    {
        "demandNo": "III",
        "name": "Administration of Justice",
        "teluguName": "న్యాయపాలన",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Law Department",
        "volumeBook": "Volume III/3",
        "amountRs": 20611719000,
        "amountCrore": 2061.17,
        "revenueGrossLakhs": 178000.00,
        "capitalGrossLakhs": 28117.19,
        "totalGrossLakhs": 206117.19,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 178000.00,
        "capitalNetLakhs": 28117.19,
        "totalNetLakhs": 206117.19,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 8
    },
    {
        "demandNo": "IV",
        "name": "General Administration and Elections",
        "teluguName": "సాధారణ పరిపాలన మరియు ఎన్నికలు",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "General Administration Department",
        "volumeBook": "Volume III/2",
        "amountRs": 4362851000,
        "amountCrore": 436.29,
        "revenueGrossLakhs": 43341.17,
        "capitalGrossLakhs": 287.34,
        "totalGrossLakhs": 43628.51,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 43341.17,
        "capitalNetLakhs": 287.34,
        "totalNetLakhs": 43628.51,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 9
    },
    {
        "demandNo": "V",
        "name": "Revenue, Registration and Relief",
        "teluguName": "రెవిన్యూ, రిజిస్ట్రేషన్ మరియు సహాయము",
        "ministerTitle": "Minister in-charge of Revenue and Housing, Information & Public Relations",
        "ministerName": "Ponguleti Srinivasa Reddy",
        "department": "Revenue Department",
        "volumeBook": "Volume III/4",
        "amountRs": 19695176000,
        "amountCrore": 1969.52,
        "revenueGrossLakhs": 186951.76,
        "capitalGrossLakhs": 10000.00,
        "totalGrossLakhs": 196951.76,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 186951.76,
        "capitalNetLakhs": 10000.00,
        "totalNetLakhs": 196951.76,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 9
    },
    {
        "demandNo": "VI",
        "name": "Excise Administration",
        "teluguName": "ఎక్సైజ్ పాలన",
        "ministerTitle": "Minister in-charge of Prohibition & Excise, Tourism & Culture and Archaeology",
        "ministerName": "Jupally Krishna Rao",
        "department": "Revenue Department",
        "volumeBook": "Volume III/4",
        "amountRs": 4725007000,
        "amountCrore": 472.50,
        "revenueGrossLakhs": 46750.07,
        "capitalGrossLakhs": 500.00,
        "totalGrossLakhs": 47250.07,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 46750.07,
        "capitalNetLakhs": 500.00,
        "totalNetLakhs": 47250.07,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 11
    },
    {
        "demandNo": "VII",
        "name": "Commercial Taxes Administration",
        "teluguName": "వాణిజ్య పన్నుల పాలన",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Revenue Department",
        "volumeBook": "Volume III/4",
        "amountRs": 3767082000,
        "amountCrore": 376.71,
        "revenueGrossLakhs": 37660.82,
        "capitalGrossLakhs": 10.00,
        "totalGrossLakhs": 37670.82,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 37660.82,
        "capitalNetLakhs": 10.00,
        "totalNetLakhs": 37670.82,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 11
    },
    {
        "demandNo": "VIII",
        "name": "Transport Administration",
        "teluguName": "రవాణా పాలన",
        "ministerTitle": "Minister in-charge of Transport, BC Welfare",
        "ministerName": "Ponnam Prabhakar",
        "department": "Transport Department",
        "volumeBook": "Volume III/6",
        "amountRs": 32685041000,
        "amountCrore": 3268.50,
        "revenueGrossLakhs": 323350.41,
        "capitalGrossLakhs": 3500.00,
        "totalGrossLakhs": 326850.41,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 323350.41,
        "capitalNetLakhs": 3500.00,
        "totalNetLakhs": 326850.41,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 13
    },
    {
        "demandNo": "IX",
        "name": "Fiscal Administration, Planning, Surveys and Statistics",
        "teluguName": "ఆర్థిక పాలన, ప్రణాళిక, సర్వేలు మరియు గణాంక వివరములు",
        "ministerTitle": "Deputy Chief Minister and Minister-in-charge of Finance & Planning, Energy",
        "ministerName": "Mallu Bhatti Vikramarka",
        "department": "Finance & Planning Department",
        "volumeBook": "Volume III/5",
        "amountRs": 223100175000,
        "amountCrore": 22310.02,
        "revenueGrossLakhs": 1873499.75,
        "capitalGrossLakhs": 357502.00,
        "totalGrossLakhs": 2231001.75,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1873499.75,
        "capitalNetLakhs": 357502.00,
        "totalNetLakhs": 2231001.75,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 13
    },
    {
        "demandNo": "X",
        "name": "Home Administration",
        "teluguName": "హోంశాఖ పాలన",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Home Department",
        "volumeBook": "Volume III/3",
        "amountRs": 119068305000,
        "amountCrore": 11906.83,
        "revenueGrossLakhs": 1143283.05,
        "capitalGrossLakhs": 47400.00,
        "totalGrossLakhs": 1190683.05,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1143283.05,
        "capitalNetLakhs": 47400.00,
        "totalNetLakhs": 1190683.05,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 15
    },
    {
        "demandNo": "XI",
        "name": "Roads and Buildings",
        "teluguName": "రోడ్లు మరియు భవనాలు",
        "ministerTitle": "Minister in-charge of Roads & Buildings, Cinematography",
        "ministerName": "Komatireddy Venkat Reddy",
        "department": "Roads and Buildings Department",
        "volumeBook": "Volume III/6",
        "amountRs": 82947070000,
        "amountCrore": 8294.71,
        "revenueGrossLakhs": 196470.70,
        "capitalGrossLakhs": 633000.00,
        "totalGrossLakhs": 829470.70,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 196470.70,
        "capitalNetLakhs": 633000.00,
        "totalNetLakhs": 829470.70,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 17
    },
    {
        "demandNo": "XII",
        "name": "School Education",
        "teluguName": "పాఠశాల విద్య",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Secondary Education, Secretariat Department",
        "volumeBook": "Volume III/7",
        "amountRs": 208732891000,
        "amountCrore": 20873.29,
        "revenueGrossLakhs": 1950028.91,
        "capitalGrossLakhs": 137300.00,
        "totalGrossLakhs": 2087328.91,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1950028.91,
        "capitalNetLakhs": 137300.00,
        "totalNetLakhs": 2087328.91,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 17
    },
    {
        "demandNo": "XIII",
        "name": "Higher Education",
        "teluguName": "ఉన్నత విద్య",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Higher Education Department",
        "volumeBook": "Volume III/7",
        "amountRs": 46500469000,
        "amountCrore": 4650.05,
        "revenueGrossLakhs": 463304.69,
        "capitalGrossLakhs": 1700.00,
        "totalGrossLakhs": 465004.69,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 463304.69,
        "capitalNetLakhs": 1700.00,
        "totalNetLakhs": 465004.69,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 19
    },
    {
        "demandNo": "XIV",
        "name": "Technical Education",
        "teluguName": "సాంకేతిక విద్య",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Higher Education Department",
        "volumeBook": "Volume III/7",
        "amountRs": 6853944000,
        "amountCrore": 685.39,
        "revenueGrossLakhs": 68539.44,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 68539.44,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 68539.44,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 68539.44,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 19
    },
    {
        "demandNo": "XV",
        "name": "Sports and Youth Services",
        "teluguName": "క్రీడలు మరియు యువజన సర్వీసులు",
        "ministerTitle": "Minister in-charge of Animal Husbandry, Dairy Development & Fisheries, Sports & Youth Services",
        "ministerName": "Vakiti Srihari",
        "department": "Youth Advancement, Tourism and Culture Department",
        "volumeBook": "Volume III/2",
        "amountRs": 7094589000,
        "amountCrore": 709.46,
        "revenueGrossLakhs": 62745.89,
        "capitalGrossLakhs": 8200.00,
        "totalGrossLakhs": 70945.89,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 62745.89,
        "capitalNetLakhs": 8200.00,
        "totalNetLakhs": 70945.89,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 21
    },
    {
        "demandNo": "XVI",
        "name": "Medical and Health",
        "teluguName": "వైద్యం మరియు ఆరోగ్యం",
        "ministerTitle": "Minister in-charge of Health, Medical & Family Welfare, Science and Technology",
        "ministerName": "C. Damodar Raja Narasimha",
        "department": "Health, Medical & Family Welfare Department",
        "volumeBook": "Volume III/8",
        "amountRs": 131872228000,
        "amountCrore": 13187.22,
        "revenueGrossLakhs": 1123922.28,
        "capitalGrossLakhs": 194800.00,
        "totalGrossLakhs": 1318722.28,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1123922.28,
        "capitalNetLakhs": 194800.00,
        "totalNetLakhs": 1318722.28,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 21
    },
    {
        "demandNo": "XVII",
        "name": "Municipal Administration and Urban Development",
        "teluguName": "పురపాలన మరియు పట్టణాభివృద్ధి",
        "ministerTitle": "Chief Minister",
        "ministerName": "A. Revanth Reddy",
        "department": "Municipal Administration & Urban Development",
        "volumeBook": "Volume III/9",
        "amountRs": 166892320000,
        "amountCrore": 16689.23,
        "revenueGrossLakhs": 1640923.20,
        "capitalGrossLakhs": 28000.00,
        "totalGrossLakhs": 1668923.20,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1640923.20,
        "capitalNetLakhs": 28000.00,
        "totalNetLakhs": 1668923.20,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 23
    },
    {
        "demandNo": "XVIII",
        "name": "Housing",
        "teluguName": "గృహనిర్మాణం",
        "ministerTitle": "Minister in-charge of Revenue and Housing, Information & Public Relations",
        "ministerName": "Ponguleti Srinivasa Reddy",
        "department": "Housing Department",
        "volumeBook": "Volume III/12",
        "amountRs": 72196198000,
        "amountCrore": 7219.62,
        "revenueGrossLakhs": 282261.98,
        "capitalGrossLakhs": 439700.00,
        "totalGrossLakhs": 721961.98,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 282261.98,
        "capitalNetLakhs": 439700.00,
        "totalNetLakhs": 721961.98,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 23
    },
    {
        "demandNo": "XIX",
        "name": "Information and Public Relations",
        "teluguName": "సమాచారము మరియు పౌర సంబంధాలు",
        "ministerTitle": "Minister in-charge of Revenue and Housing, Information & Public Relations",
        "ministerName": "Ponguleti Srinivasa Reddy",
        "department": "General Administration Department",
        "volumeBook": "Volume III/2",
        "amountRs": 5263828000,
        "amountCrore": 526.38,
        "revenueGrossLakhs": 52638.28,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 52638.28,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 52638.28,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 52638.28,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 25
    },
    {
        "demandNo": "XX",
        "name": "Labour and Employment",
        "teluguName": "కార్మిక మరియు ఉపాధి",
        "ministerTitle": "Minister in-charge of Labour, Employment, Training & Factories and Mines & Geology",
        "ministerName": "Gaddam Vivekanand",
        "department": "Labour and Employment Department",
        "volumeBook": "Volume III/10",
        "amountRs": 9978753000,
        "amountCrore": 997.88,
        "revenueGrossLakhs": 83787.53,
        "capitalGrossLakhs": 16000.00,
        "totalGrossLakhs": 99787.53,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 83787.53,
        "capitalNetLakhs": 16000.00,
        "totalNetLakhs": 99787.53,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 25
    },
    {
        "demandNo": "XXI",
        "name": "Social Welfare",
        "teluguName": "సాంఘిక సంక్షేమం (ఎస్.సి. సంక్షేమం)",
        "ministerTitle": "Minister in-charge of SC & ST Welfare and Department of Empowerment of PwDs, Senior Citizens and Transgender Persons",
        "ministerName": "Adluri Laxman Kumar",
        "department": "Scheduled Castes Development Department",
        "volumeBook": "Volume III/12",
        "amountRs": 316185103000,
        "amountCrore": 31618.51,
        "revenueGrossLakhs": 2704051.03,
        "capitalGrossLakhs": 457800.00,
        "totalGrossLakhs": 3161851.03,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 2704051.03,
        "capitalNetLakhs": 457800.00,
        "totalNetLakhs": 3161851.03,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 27
    },
    {
        "demandNo": "XXII",
        "name": "Tribal Welfare",
        "teluguName": "గిరిజన సంక్షేమం (ఎస్.టి. సంక్షేమం)",
        "ministerTitle": "Minister in-charge of SC & ST Welfare and Department of Empowerment of PwDs, Senior Citizens and Transgender Persons",
        "ministerName": "Adluri Laxman Kumar",
        "department": "Tribal Welfare Department",
        "volumeBook": "Volume III/12",
        "amountRs": 160354050000,
        "amountCrore": 16035.41,
        "revenueGrossLakhs": 1327640.50,
        "capitalGrossLakhs": 275900.00,
        "totalGrossLakhs": 1603540.50,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1327640.50,
        "capitalNetLakhs": 275900.00,
        "totalNetLakhs": 1603540.50,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 27
    },
    {
        "demandNo": "XXIII",
        "name": "Backward Classes Welfare",
        "teluguName": "వెనుకబడిన తరగతుల సంక్షేమం",
        "ministerTitle": "Minister in-charge of Transport, BC Welfare",
        "ministerName": "Ponnam Prabhakar",
        "department": "Backward Class Welfare Department",
        "volumeBook": "Volume III/12",
        "amountRs": 125111230000,
        "amountCrore": 12511.12,
        "revenueGrossLakhs": 1004112.30,
        "capitalGrossLakhs": 247000.00,
        "totalGrossLakhs": 1251112.30,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1004112.30,
        "capitalNetLakhs": 247000.00,
        "totalNetLakhs": 1251112.30,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 29
    },
    {
        "demandNo": "XXIV",
        "name": "Minority Welfare",
        "teluguName": "మైనారిటీల సంక్షేమం",
        "ministerTitle": "Minister in-charge of Public Enterprises & Minorities Welfare",
        "ministerName": "Mohammad Azharuddin",
        "department": "Minorities Welfare Department",
        "volumeBook": "Volume III/12",
        "amountRs": 37685283000,
        "amountCrore": 3768.53,
        "revenueGrossLakhs": 344352.83,
        "capitalGrossLakhs": 32500.00,
        "totalGrossLakhs": 376852.83,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 344352.83,
        "capitalNetLakhs": 32500.00,
        "totalNetLakhs": 376852.83,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 29
    },
    {
        "demandNo": "XXV",
        "name": "Women, Child and Disabled Welfare",
        "teluguName": "స్త్రీ, శిశు మరియు వికలాంగుల సంక్షేమం",
        "ministerTitle": "Minister in-charge of Panchayat Raj & Rural Development (including Rural Water Supply), Women & Child Welfare",
        "ministerName": "Danasari Anasuya (Seethakka)",
        "department": "Women, Children, Disabled & Senior Citizens Department",
        "volumeBook": "Volume III/10",
        "amountRs": 30810477000,
        "amountCrore": 3081.05,
        "revenueGrossLakhs": 300204.77,
        "capitalGrossLakhs": 7900.00,
        "totalGrossLakhs": 308104.77,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 300204.77,
        "capitalNetLakhs": 7900.00,
        "totalNetLakhs": 308104.77,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 31
    },
    {
        "demandNo": "XXVI",
        "name": "Administration of Religious Endowments",
        "teluguName": "మత ధర్మాదాయ సంస్థల పాలన",
        "ministerTitle": "Minister in-charge of Environment, Forests & Endowment",
        "ministerName": "Konda Surekha",
        "department": "Revenue Department",
        "volumeBook": "Volume III/4",
        "amountRs": 12562344000,
        "amountCrore": 1256.23,
        "revenueGrossLakhs": 125623.44,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 125623.44,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 125623.44,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 125623.44,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 31
    },
    {
        "demandNo": "XXVII",
        "name": "Agriculture",
        "teluguName": "వ్యవసాయం",
        "ministerTitle": "Minister in-charge of Agriculture, Marketing Co-operation and Handlooms & Textiles",
        "ministerName": "Tummala Nageswara Rao",
        "department": "Agriculture & Cooperation Department",
        "volumeBook": "Volume III/11",
        "amountRs": 173244915000,
        "amountCrore": 17324.49,
        "revenueGrossLakhs": 1732149.15,
        "capitalGrossLakhs": 300.00,
        "totalGrossLakhs": 1732449.15,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1732149.15,
        "capitalNetLakhs": 300.00,
        "totalNetLakhs": 1732449.15,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 33
    },
    {
        "demandNo": "XXVIII",
        "name": "Animal Husbandry and Fisheries",
        "teluguName": "పశుసంవర్ధన మరియు మత్స్యపరిశ్రమ",
        "ministerTitle": "Minister in-charge of Animal Husbandry, Dairy Development & Fisheries, Sports & Youth Services",
        "ministerName": "Vakiti Srihari",
        "department": "Animal Husbandry & Fisheries Department",
        "volumeBook": "Volume III/17",
        "amountRs": 15035747000,
        "amountCrore": 1503.57,
        "revenueGrossLakhs": 141057.47,
        "capitalGrossLakhs": 9300.00,
        "totalGrossLakhs": 150357.47,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 141057.47,
        "capitalNetLakhs": 9300.00,
        "totalNetLakhs": 150357.47,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 33
    },
    {
        "demandNo": "XXIX",
        "name": "Forest, Science, Technology and Environment",
        "teluguName": "అడవులు, శాస్త్ర, సాంకేతిక విజ్ఞానం మరియు పర్యావరణం",
        "ministerTitle": "Minister in-charge of Environment, Forests & Endowment",
        "ministerName": "Konda Surekha",
        "department": "Environment, Forest, Science & Technology Department",
        "volumeBook": "Volume III/15",
        "amountRs": 10488048000,
        "amountCrore": 1048.80,
        "revenueGrossLakhs": 84980.48,
        "capitalGrossLakhs": 19900.00,
        "totalGrossLakhs": 104880.48,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 84980.48,
        "capitalNetLakhs": 19900.00,
        "totalNetLakhs": 104880.48,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 35
    },
    {
        "demandNo": "XXX",
        "name": "Co-operation",
        "teluguName": "సహకారం",
        "ministerTitle": "Minister in-charge of Agriculture, Marketing Co-operation and Handlooms & Textiles",
        "ministerName": "Tummala Nageswara Rao",
        "department": "Agriculture & Cooperation Department",
        "volumeBook": "Volume III/11",
        "amountRs": 1588166000,
        "amountCrore": 158.82,
        "revenueGrossLakhs": 15881.66,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 15881.66,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 15881.66,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 15881.66,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 35
    },
    {
        "demandNo": "XXXI",
        "name": "Panchayat Raj",
        "teluguName": "పంచాయతీ రాజ్",
        "ministerTitle": "Minister in-charge of Panchayat Raj & Rural Development (including Rural Water Supply), Women & Child Welfare",
        "ministerName": "Danasari Anasuya (Seethakka)",
        "department": "Panchayat Raj and Rural Development Department",
        "volumeBook": "Volume III/14",
        "amountRs": 111401713000,
        "amountCrore": 11140.17,
        "revenueGrossLakhs": 1018817.13,
        "capitalGrossLakhs": 95200.00,
        "totalGrossLakhs": 1114017.13,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1018817.13,
        "capitalNetLakhs": 95200.00,
        "totalNetLakhs": 1114017.13,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 37
    },
    {
        "demandNo": "XXXII",
        "name": "Rural Development",
        "teluguName": "గ్రామీణాభివృద్ధి",
        "ministerTitle": "Minister in-charge of Panchayat Raj & Rural Development (including Rural Water Supply), Women & Child Welfare",
        "ministerName": "Danasari Anasuya (Seethakka)",
        "department": "Panchayat Raj and Rural Development Department",
        "volumeBook": "Volume III/14",
        "amountRs": 148664933000,
        "amountCrore": 14866.49,
        "revenueGrossLakhs": 1202649.33,
        "capitalGrossLakhs": 284000.00,
        "totalGrossLakhs": 1486649.33,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1202649.33,
        "capitalNetLakhs": 284000.00,
        "totalNetLakhs": 1486649.33,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 37
    },
    {
        "demandNo": "XXXIII",
        "name": "Irrigation and Command Area Development",
        "teluguName": "నీటిపారుదల మరియు ఆయకట్టు అభివృద్ధి",
        "ministerTitle": "Minister in-charge of Irrigation & CAD; Food & Civil Supplies",
        "ministerName": "N. Uttam Kumar Reddy",
        "department": "Irrigation Department",
        "volumeBook": "Volume III/13",
        "amountRs": 225401206000,
        "amountCrore": 22540.12,
        "revenueGrossLakhs": 970412.06,
        "capitalGrossLakhs": 1283600.00,
        "totalGrossLakhs": 2254012.06,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 970412.06,
        "capitalNetLakhs": 1283600.00,
        "totalNetLakhs": 2254012.06,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 39
    },
    {
        "demandNo": "XXXV",
        "name": "Energy",
        "teluguName": "ఇంధనం (విద్యుత్)",
        "ministerTitle": "Deputy Chief Minister and Minister-in-charge of Finance & Planning, Energy",
        "ministerName": "Mallu Bhatti Vikramarka",
        "department": "Energy Department",
        "volumeBook": "Volume III/15",
        "amountRs": 157482880000,
        "amountCrore": 15748.29,
        "revenueGrossLakhs": 1504828.80,
        "capitalGrossLakhs": 70000.00,
        "totalGrossLakhs": 1574828.80,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 1504828.80,
        "capitalNetLakhs": 70000.00,
        "totalNetLakhs": 1574828.80,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 39
    },
    {
        "demandNo": "XXXVI",
        "name": "Industries and Commerce",
        "teluguName": "పరిశ్రమలు మరియు వాణిజ్యము",
        "ministerTitle": "Minister in-charge of Information Technology, Electronics & Communications; Industries & Commerce and Legislative Affairs",
        "ministerName": "D. Sridhar Babu",
        "department": "Industries & Commerce Department",
        "volumeBook": "Volume III/16",
        "amountRs": 24113813000,
        "amountCrore": 2411.38,
        "revenueGrossLakhs": 217932.13,
        "capitalGrossLakhs": 23206.00,
        "totalGrossLakhs": 241138.13,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 217932.13,
        "capitalNetLakhs": 23206.00,
        "totalNetLakhs": 241138.13,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 41
    },
    {
        "demandNo": "XXXVII",
        "name": "Tourism, Art and Culture",
        "teluguName": "పర్యాటకం, కళలు మరియు సంస్కృతి",
        "ministerTitle": "Minister in-charge of Prohibition & Excise, Tourism & Culture and Archaeology",
        "ministerName": "Jupally Krishna Rao",
        "department": "Youth Advancement, Tourism and Culture Department",
        "volumeBook": "Volume III/2",
        "amountRs": 14177340000,
        "amountCrore": 1417.73,
        "revenueGrossLakhs": 141773.40,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 141773.40,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 141773.40,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 141773.40,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 41
    },
    {
        "demandNo": "XXXVIII",
        "name": "Civil Supplies Administration",
        "teluguName": "పౌరసరఫరాల పాలన",
        "ministerTitle": "Minister in-charge of Irrigation & CAD; Food & Civil Supplies",
        "ministerName": "N. Uttam Kumar Reddy",
        "department": "Food & Civil Supplies Department",
        "volumeBook": "Volume III/11",
        "amountRs": 51699990000,
        "amountCrore": 5170.00,
        "revenueGrossLakhs": 516999.90,
        "capitalGrossLakhs": 0.0,
        "totalGrossLakhs": 516999.90,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 516999.90,
        "capitalNetLakhs": 0.0,
        "totalNetLakhs": 516999.90,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 43
    },
    {
        "demandNo": "XXXIX",
        "name": "Information Technology, Electronics and Communications",
        "teluguName": "సమాచార సాంకేతిక, ఎలక్ట్రానిక్స్ మరియు కమ్యూనికేషన్స్",
        "ministerTitle": "Minister in-charge of Information Technology, Electronics & Communications; Industries & Commerce and Legislative Affairs",
        "ministerName": "D. Sridhar Babu",
        "department": "Information Technology & Communications Department",
        "volumeBook": "Volume III/2",
        "amountRs": 8748120000,
        "amountCrore": 874.81,
        "revenueGrossLakhs": 67481.20,
        "capitalGrossLakhs": 20000.00,
        "totalGrossLakhs": 87481.20,
        "recoveriesLakhs": 0.0,
        "revenueNetLakhs": 67481.20,
        "capitalNetLakhs": 20000.00,
        "totalNetLakhs": 87481.20,
        "sourceFile": "1773981015_Volume1_2Statement_of_Demands_for_Grants_1773981015_.pdf",
        "sourcePage": 43
    }
]

# Total Demands Voted validation
total_demands_rs = sum(d["amountRs"] for d in demands_raw)
total_demands_cr = round(total_demands_rs / 1e7, 2)
assert total_demands_cr == 279386.62, f"Total demands {total_demands_cr} does not match 279386.62"

demands_dataset = {
    "totalVotedDemandsCrore": total_demands_cr,
    "totalVotedDemandsRupees": total_demands_rs,
    "totalChargedExpenditureCrore": 44926.45,
    "grossBudgetTotalCrore": 324313.06,
    "totalRecoveriesCrore": 79.06,
    "netBudgetTotalCrore": 324234.00,
    "count": len(demands_raw),
    "demands": demands_raw
}

with open(os.path.join(DATA_DIR, "demands_summary.json"), "w", encoding="utf-8") as f:
    json.dump(demands_dataset, f, indent=2, ensure_ascii=False)

print(f"Generated demands_summary.json with {len(demands_raw)} demands. Sum = ₹{total_demands_cr:,.2f} Cr")

# 3. DEPARTMENT ALLOCATIONS (From Table 11 & Table 12 of Budget in Brief)
# 30 Secretariat Departments
dept_table_11 = [
    {"dept": "Agriculture & Cooperation Department", "est": 1328, "sch": 21851, "total": 23179, "cap": 3, "min": "Tummala Nageswara Rao", "demands": ["XXVII", "XXX"]},
    {"dept": "Animal Husbandry & Fisheries Department", "est": 857, "sch": 672, "total": 1529, "cap": 93, "min": "Vakiti Srihari", "demands": ["XXVIII"]},
    {"dept": "Backward Class Welfare Department", "est": 1118, "sch": 11393, "total": 12511, "cap": 2470, "min": "Ponnam Prabhakar", "demands": ["XXIII"]},
    {"dept": "Energy Department", "est": 737, "sch": 20549, "total": 21285, "cap": 0, "min": "Mallu Bhatti Vikramarka", "demands": ["XXXV"]},
    {"dept": "Environment, Forest, Science & Technology Department", "est": 874, "sch": 174, "total": 1049, "cap": 199, "min": "Konda Surekha", "demands": ["XXIX"]},
    {"dept": "Finance Department", "est": 60227, "sch": 211, "total": 60438, "cap": 80, "min": "Mallu Bhatti Vikramarka", "demands": ["IX"]},
    {"dept": "Food & Civil Supplies Department", "est": 115, "sch": 7251, "total": 7366, "cap": 0, "min": "N. Uttam Kumar Reddy", "demands": ["XXXVIII"]},
    {"dept": "General Administration Department", "est": 460, "sch": 729, "total": 1190, "cap": 3, "min": "A. Revanth Reddy", "demands": ["II", "IV", "XIX"]},
    {"dept": "Health, Medical & Family Welfare Department", "est": 6984, "sch": 6695, "total": 13679, "cap": 1948, "min": "C. Damodar Raja Narasimha", "demands": ["XVI"]},
    {"dept": "Higher Education Department", "est": 3263, "sch": 2180, "total": 5443, "cap": 17, "min": "A. Revanth Reddy", "demands": ["XIII", "XIV"]},
    {"dept": "Home Department", "est": 10944, "sch": 963, "total": 11907, "cap": 474, "min": "A. Revanth Reddy", "demands": ["X"]},
    {"dept": "Housing Department", "est": 1930, "sch": 5500, "total": 7430, "cap": 4397, "min": "Ponguleti Srinivasa Reddy", "demands": ["XVIII"]},
    {"dept": "Industries & Commerce Department", "est": 106, "sch": 3641, "total": 3747, "cap": 293, "min": "D. Sridhar Babu", "demands": ["XXXVI"]},
    {"dept": "Information Technology & Communications Department", "est": 4, "sch": 871, "total": 875, "cap": 200, "min": "D. Sridhar Babu", "demands": ["XXXIX"]},
    {"dept": "Irrigation Department", "est": 10743, "sch": 11872, "total": 22615, "cap": 12836, "min": "N. Uttam Kumar Reddy", "demands": ["XXXIII"]},
    {"dept": "Labour and Employment Department", "est": 460, "sch": 537, "total": 998, "cap": 160, "min": "Gaddam Vivekanand", "demands": ["XX"]},
    {"dept": "Law Department", "est": 1468, "sch": 899, "total": 2367, "cap": 781, "min": "A. Revanth Reddy", "demands": ["III"]},
    {"dept": "Legislature Secretariat", "est": 228, "sch": 31, "total": 259, "cap": 30, "min": "D. Sridhar Babu", "demands": ["I"]},
    {"dept": "Minorities Welfare Department", "est": 875, "sch": 2893, "total": 3769, "cap": 325, "min": "Mohammad Azharuddin", "demands": ["XXIV"]},
    {"dept": "Municipal Administration & Urban Development", "est": 7458, "sch": 10450, "total": 17907, "cap": 280, "min": "A. Revanth Reddy", "demands": ["XVII"]},
    {"dept": "Panchayat Raj and Rural Development Department", "est": 5893, "sch": 27794, "total": 33688, "cap": 3792, "min": "Danasari Anasuya (Seethakka)", "demands": ["XXXI", "XXXII"]},
    {"dept": "Planning Department", "est": 108, "sch": 7863, "total": 7971, "cap": 3575, "min": "Mallu Bhatti Vikramarka", "demands": ["IX"]},
    {"dept": "Revenue Department", "est": 2637, "sch": 1382, "total": 4020, "cap": 105, "min": "Ponguleti Srinivasa Reddy", "demands": ["V", "VI", "VII", "XXVI"]},
    {"dept": "Scheduled Castes Development Department", "est": 369, "sch": 11416, "total": 11784, "cap": 4578, "min": "Adluri Laxman Kumar", "demands": ["XXI"]},
    {"dept": "Secondary Education, Secretariat Department", "est": 16458, "sch": 4773, "total": 21231, "cap": 1373, "min": "A. Revanth Reddy", "demands": ["XII"]},
    {"dept": "Transport Department", "est": 131, "sch": 4361, "total": 4491, "cap": 35, "min": "Ponnam Prabhakar", "demands": ["VIII"]},
    {"dept": "Roads and Building Department", "est": 1967, "sch": 6330, "total": 8298, "cap": 6300, "min": "Komatireddy Venkat Reddy", "demands": ["XI"]},
    {"dept": "Tribal Welfare Department", "est": 761, "sch": 7176, "total": 7937, "cap": 2759, "min": "Adluri Laxman Kumar", "demands": ["XXII"]},
    {"dept": "Women, Children, Disabled & Senior Citizens Department", "est": 1248, "sch": 1896, "total": 3143, "cap": 79, "min": "Danasari Anasuya (Seethakka)", "demands": ["XXV"]},
    {"dept": "Youth Advancement, Tourism and Culture Department", "est": 166, "sch": 1961, "total": 2127, "cap": 82, "min": "Jupally Krishna Rao", "demands": ["XV", "XXXVII"]}
]

# Sort by grand total descending
dept_table_11.sort(key=lambda x: x["total"], reverse=True)
dept_allocations = []
for idx, d in enumerate(dept_table_11):
    dept_id = d["dept"].lower().replace("&", "and").replace(",", "").replace(" ", "-")
    share = round((d["total"] / 324234.00) * 100, 2)
    dept_allocations.append({
        "id": dept_id,
        "rank": idx + 1,
        "name": d["dept"],
        "establishmentCrore": d["est"],
        "schemeCrore": d["sch"],
        "grandTotalCrore": d["total"],
        "capitalOutlayCrore": d["cap"],
        "sharePct": share,
        "minister": d["min"],
        "demands": d["demands"],
        "sourceFile": "1773983722_Volume_VI-Brief_1773983722_.pdf",
        "sourcePage": 18
    })

dept_dataset = {
    "totalBudget": 324234,
    "totalEstablishment": 139918,
    "totalScheme": 184316,
    "totalCapitalWorks": 47267,
    "departmentsCount": len(dept_allocations),
    "departments": dept_allocations
}

with open(os.path.join(DATA_DIR, "department_allocations.json"), "w", encoding="utf-8") as f:
    json.dump(dept_dataset, f, indent=2, ensure_ascii=False)

print(f"Generated department_allocations.json with {len(dept_allocations)} departments.")

# 4. ALL 69 MAJOR SCHEMES (From Table 10 of Budget in Brief, pp. 15-17)
schemes_raw = [
    # Six Guarantees
    {"sNo": 1, "name": "Rythu Bharosa", "amount": 18000, "category": "Six Guarantees", "department": "Agriculture & Cooperation Department", "description": "Flagship direct financial support per acre for farmers and tenant cultivators."},
    {"sNo": 2, "name": "Cheyutha", "amount": 14861, "category": "Six Guarantees", "department": "Panchayat Raj and Rural Development Department", "description": "Enhanced social security financial assistance to senior citizens, widows, and disabled."},
    {"sNo": 3, "name": "Indiramma Houses", "amount": 5500, "category": "Six Guarantees", "department": "Housing Department", "description": "Financial assistance of ₹5 lakh per beneficiary for constructing houses on own plots for poor families."},
    {"sNo": 4, "name": "Mahalaxmi (RTC)", "amount": 4305, "category": "Six Guarantees", "department": "Transport Department", "description": "Free travel for girls, women of all ages, and transgender persons in TSRTC Palle Velugu and Express buses."},
    {"sNo": 5, "name": "Bonus to Agriculture produces", "amount": 3500, "category": "Six Guarantees", "department": "Agriculture & Cooperation Department", "description": "₹500 per quintal additional bonus for fine paddy varieties (Sanna Biyyam)."},
    {"sNo": 6, "name": "Gruha Jyothi", "amount": 3450, "category": "Six Guarantees", "department": "Energy Department", "description": "200 units of free domestic electricity per month for eligible white ration cardholder families."},
    {"sNo": 7, "name": "Mahalaxmi (Rs.2500 per month financial assistance to poor women)", "amount": 1780, "category": "Six Guarantees", "department": "Women, Children, Disabled & Senior Citizens Department", "description": "Monthly direct benefit transfer empowerment grant for women heads of underprivileged households."},
    {"sNo": 8, "name": "Gruha Jyothi (500 Gas Cylinder)", "amount": 723, "category": "Six Guarantees", "department": "Food & Civil Supplies Department", "description": "LPG cooking gas cylinder at subsidized price of ₹500 for low-income households."},
    
    # Roads & Buildings
    {"sNo": 21, "name": "HAM Roads (Upgradation and Maintenance)", "amount": 3053, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "Hybrid Annuity Model for state highway and core district road development and maintenance."},
    {"sNo": 22, "name": "Regional Ring Road", "amount": 1525, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "Land acquisition and infrastructure equity for the 340 km expressway encircling the Hyderabad agglomeration."},
    {"sNo": 23, "name": "Maintenance of R&B Roads", "amount": 828, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "Routine and periodic road renewals and repairs across state roads network."},
    {"sNo": 24, "name": "Construction of New Roads", "amount": 450, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "Connecting remote mandals and establishing missing district road links."},
    {"sNo": 25, "name": "CRIF (Central Road and Infrastructure Fund)", "amount": 243, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "State projects co-funded under Central Road and Infrastructure Fund."},
    {"sNo": 26, "name": "ROB & RUB (Rail Over & Under Bridges)", "amount": 216, "category": "Roads & Infrastructure", "department": "Roads and Building Department", "description": "Elimination of level crossings and easing traffic flow across railway crossings."},
    {"sNo": 27, "name": "Construction of Buildings for Secretariat", "amount": 100, "category": "Infrastructure", "department": "Roads and Building Department", "description": "Completion, civil fixtures, and institutional modernization of Secretariat premises."},

    # Youth, Education, Social Security, Cities
    {"sNo": 28, "name": "Rajiv Yuva Vikasam", "amount": 5800, "category": "Youth & Employment", "department": "Planning Department", "description": "Youth skill empowerment, competitive coaching, vocational apprentice grants, and employment promotion."},
    {"sNo": 29, "name": "Rajiv Yuva Vikasam (Retrofitting Auto Rickshaws with Electrical Fitment in CURE)", "amount": 200, "category": "Clean Energy & Mobility", "department": "Transport Department", "description": "Green retrofitting and EV conversion subsidy for auto-rickshaw owners in Core Urban Region."},
    {"sNo": 30, "name": "Young India Integrated Residential Schools", "amount": 5000, "category": "Education", "department": "Secondary Education, Secretariat Department", "description": "Modern state-of-the-art integrated residential school campuses with international standards in each constituency."},
    {"sNo": 31, "name": "Indiramma Kutumba Jivitha Bima (Life insurance for all families)", "amount": 4000, "category": "Social Security", "department": "Finance Department", "description": "Universal family life and accident insurance protection for citizen families."},
    {"sNo": 32, "name": "Assistance to CURE for H-CITY (Hyderabad City Infrastructure)", "amount": 2654, "category": "Urban Infrastructure", "department": "Municipal Administration & Urban Development", "description": "Transformative urban flyovers, master drainage, signal-free corridors, and civic works in Hyderabad."},
    {"sNo": 33, "name": "Interest Free Loans to DWACRA Women (Vaddileni Runalu)", "amount": 2500, "category": "Women Empowerment", "department": "Panchayat Raj and Rural Development Department", "description": "Zero percent interest subvention loans to women Self-Help Groups (SHGs)."},
    {"sNo": 34, "name": "Crop Insurance", "amount": 1886, "category": "Agriculture", "department": "Agriculture & Cooperation Department", "description": "Universal state-sponsored crop insurance premium support against weather disasters."},
    {"sNo": 35, "name": "Incentives for Industrial Promotion", "amount": 1835, "category": "Industries", "department": "Industries & Commerce Department", "description": "Investment subsidies, power rebates, and stamp duty exemptions for new manufacturing units."},
    {"sNo": 36, "name": "Musi Riverfront Development", "amount": 1500, "category": "Urban Rejuvenation", "department": "Municipal Administration & Urban Development", "description": "Eco-friendly river revitalization, STPs, promenade walks, and urban beautification along the Musi river."},
    {"sNo": 37, "name": "Construction of Infrastructure in SC Colonies", "amount": 1500, "category": "SC Welfare", "department": "Scheduled Castes Development Department", "description": "Internal CC roads, community drains, street lighting, and drinking water in SC habitats."},
    {"sNo": 38, "name": "Loans to HMWSSB for Development Works", "amount": 1450, "category": "Water & Sanitation", "department": "Municipal Administration & Urban Development", "description": "Comprehensive water distribution network expansion to outer peripheral zones."},
    {"sNo": 39, "name": "Employees Health Scheme Contribution", "amount": 1056, "category": "Health", "department": "Health, Medical & Family Welfare Department", "description": "Government contribution for cashless hospitalisation healthcare for employees and pensioners."},
    {"sNo": 40, "name": "Nagarabhivrudhi (Mancherial, Mahabubnagar, Kothagudem & Palwancha)", "amount": 1000, "category": "Urban Development", "department": "Municipal Administration & Urban Development", "description": "Integrated urban municipal infrastructure in secondary tier-2 growth cities."},
    {"sNo": 41, "name": "Assistance to TRANSCO", "amount": 1000, "category": "Energy", "department": "Energy Department", "description": "Transmission infrastructure grid strengthening, substation upgrades, and load capacity expansion."},
    {"sNo": 42, "name": "Assistance to GENCO", "amount": 1000, "category": "Energy", "department": "Energy Department", "description": "Power generation capacity additions, boiler repairs, and thermal/hydel station modernizations."},
    {"sNo": 43, "name": "Green Energy Including promotion of new Energy Policy", "amount": 1000, "category": "Renewable Energy", "department": "Energy Department", "description": "Telangana Clean Energy Transition Mission, wind and battery storage incentivization."},
    {"sNo": 44, "name": "Hundred Percentage (100%) Solarisation of Villages", "amount": 1000, "category": "Renewable Energy", "department": "Energy Department", "description": "Rooftop and community solar grids making whole villages self-reliant in green power."},
    {"sNo": 45, "name": "Loans to HMWSSB for Sunkishala Intake Project (KDWSP)", "amount": 1000, "category": "Water Supply", "department": "Municipal Administration & Urban Development", "description": "Deep drawdown pumping intake project ensuring Hyderabad's drinking water security even in drought."},
    {"sNo": 46, "name": "Osmania University Modernization & Excellence", "amount": 1000, "category": "Higher Education", "department": "Higher Education Department", "description": "Campus infrastructure modernization, research labs, hostels, and academic revival."},
    {"sNo": 47, "name": "PMU - Tourism Infrastructure (Kawal Tiger Reserve, Mannanur & Eco-Tourism)", "amount": 875, "category": "Tourism & Culture", "department": "Youth Advancement, Tourism and Culture Department", "description": "Eco-tourism resort development, safari routes, and wildlife conservation infrastructure."},
    {"sNo": 48, "name": "Breakfast & Milk to School Students", "amount": 720, "category": "Child Nutrition", "department": "Secondary Education, Secretariat Department", "description": "Daily wholesome morning breakfast and nutritious milk to government school children."},
    {"sNo": 49, "name": "Assistance to Municipalities for Development Works", "amount": 651, "category": "Urban Development", "department": "Municipal Administration & Urban Development", "description": "Grants for urban sanitation, dump yard management, street lights, and roads."},
    {"sNo": 50, "name": "Metro Rail (Phase-II)", "amount": 600, "category": "Public Transit", "department": "Municipal Administration & Urban Development", "description": "Equity provision for expansion corridors connecting Shamshabad Airport, Old City, and outer corridors."},
    {"sNo": 51, "name": "Indira Soura Giri Jala Vikasam", "amount": 600, "category": "Tribal Welfare & Irrigation", "department": "Tribal Welfare Department", "description": "Solar powered borewell energization for tribal farmers cultivating podu and forest border lands."},
    {"sNo": 52, "name": "Telangana Public School", "amount": 500, "category": "School Education", "department": "Secondary Education, Secretariat Department", "description": "Model English-medium state schools with smart digital classrooms and sports infrastructure."},
    {"sNo": 53, "name": "Sports Authority of Telangana", "amount": 500, "category": "Sports", "department": "Youth Advancement, Tourism and Culture Department", "description": "Young sports academies, stadium renovations, and rural sports talent search."},
    {"sNo": 54, "name": "Godavari Pushkaralu", "amount": 500, "category": "Culture & Heritage", "department": "Youth Advancement, Tourism and Culture Department", "description": "Ghat infrastructure, pilgrim amenities, safety barriers, and access roads for Godavari Pushkaralu."},
    {"sNo": 55, "name": "Assistance to Temple Development", "amount": 440, "category": "Culture & Heritage", "department": "Revenue Department", "description": "Renovation and pilgrim amenities at historical temple shrines across districts."},
    {"sNo": 56, "name": "SC Residential Schools (Other than salaries, diet)", "amount": 508, "category": "SC Welfare", "department": "Scheduled Castes Development Department", "description": "Digital libraries, lab equipment, building maintenance, and extracurricular facilities in TSWREIS."},
    {"sNo": 57, "name": "Loans to HMRL for Hyderabad Metro Rail Project", "amount": 500, "category": "Public Transit", "department": "Municipal Administration & Urban Development", "description": "Concessionaire operational assistance, viaduct viability, and multimodal bus feeder integration."},
    {"sNo": 58, "name": "Mission Bhagiradha - Urban", "amount": 500, "category": "Water Supply", "department": "Municipal Administration & Urban Development", "description": "Potable piped drinking water supply pipelines to newly constituted urban local bodies."},
    {"sNo": 59, "name": "Loans to HMDA for Developmental Activities", "amount": 500, "category": "Urban Development", "department": "Municipal Administration & Urban Development", "description": "Radical road links, peripheral lake conservation, and township development."},
    {"sNo": 60, "name": "Veeranari Chakali Ilamma Mahila University", "amount": 400, "category": "Higher Education", "department": "Higher Education Department", "description": "Infrastructure, research chairs, and academic departments for the state's premier Women's University."},
    {"sNo": 61, "name": "Operation and Maintenance of Mission Bhagiratha", "amount": 400, "category": "Water Supply", "department": "Panchayat Raj and Rural Development Department", "description": "Grid water pipeline maintenance, valve repairs, chlorine dosing, and power bills servicing."},
    {"sNo": 62, "name": "Information Technology, Electronics and Communications Department Scheme Outlay", "amount": 461, "category": "IT & Innovation", "department": "Information Technology & Communications Department", "description": "T-Hub, WE-Hub, AI City, and hardware cluster infrastructure subsidies."},
    {"sNo": 63, "name": "Assistance to Weavers (Nethannaku Cheyutha & Thrift)", "amount": 450, "category": "Handlooms & Textiles", "department": "Industries & Commerce Department", "description": "Yarn subsidy, weaver welfare thrift fund, modern looms, and Chenetha marketing."},
    {"sNo": 64, "name": "Most Backward Classes Development Corporation (MBC)", "amount": 400, "category": "BC Welfare", "department": "Backward Class Welfare Department", "description": "Targeted self-employment credit and livelihood kits for vulnerable nomadic and MBC castes."},
    {"sNo": 65, "name": "Extension of Pavalavaddi Scheme to SSI and Food Processing Units", "amount": 350, "category": "Industries & MSME", "department": "Industries & Commerce Department", "description": "Interest subvention reducing effective borrowing interest to 3% for micro and small enterprises."},
    {"sNo": 66, "name": "Farm Mechanization", "amount": 344, "category": "Agriculture", "department": "Agriculture & Cooperation Department", "description": "Subsidized tractors, transplanters, laser levelers, and custom hiring centers."},
    {"sNo": 67, "name": "Assistance to CURE for SCSDF Scheme", "amount": 315, "category": "SC Welfare", "department": "Scheduled Castes Development Department", "description": "Urban SC settlement infrastructure upgrades and civic amenities in core urban regions."},
    {"sNo": 68, "name": "PMU - Advertisements, Sales Publicity & International Travel Marts", "amount": 300, "category": "Tourism & Culture", "department": "Youth Advancement, Tourism and Culture Department", "description": "Global positioning of Telangana heritage, world travel exhibitions, and tourism publicity."},
    {"sNo": 69, "name": "HMWSSB Reimbursement for 20 KL Free Water Supply Scheme", "amount": 300, "category": "Water Supply", "department": "Municipal Administration & Urban Development", "description": "Zero water bill scheme for households consuming up to 20,000 litres per month in GHMC limits."}
]

# Total of major schemes in Table 10
total_major_schemes = sum(s["amount"] for s in schemes_raw)

schemes_dataset = {
    "totalMajorSchemesAllocationCrore": 145591.0,
    "highlightedSchemesCount": len(schemes_raw),
    "highlightedSchemesTotal": total_major_schemes,
    "sixGuaranteesTotal": 53619.0,
    "schemes": schemes_raw
}

with open(os.path.join(DATA_DIR, "schemes.json"), "w", encoding="utf-8") as f:
    json.dump(schemes_dataset, f, indent=2, ensure_ascii=False)

print(f"Generated schemes.json with {len(schemes_raw)} major schemes. Total = ₹{total_major_schemes:,.2f} Cr")

# 5. RECEIPTS BREAKDOWN (From Volume II Summary and Volume VI Table 8)
receipts_breakdown = {
    "year": "2026-27",
    "totalReceipts": 324234.00,
    "revenueReceipts": {
        "total": 241263.58,
        "shareOfBudget": 74.41,
        "stateOwnTaxes": {
            "total": 148185.75,
            "shareOfRevenueReceipts": 61.42,
            "items": [
                {"head": "0006", "name": "State Goods and Services Tax (SGST)", "amount": 52490.00, "sharePct": 35.42},
                {"head": "0040", "name": "Taxes on Sales, Trade etc. (VAT on Petroleum & Liquor)", "amount": 38105.55, "sharePct": 25.72},
                {"head": "0039", "name": "State Excise (Liquor Duties & Licence Fees)", "amount": 27668.48, "sharePct": 18.67},
                {"head": "0030", "name": "Stamps and Registration Fees", "amount": 19540.54, "sharePct": 13.19},
                {"head": "0041", "name": "Taxes on Vehicles (Road & Transport Taxes)", "amount": 8814.41, "sharePct": 5.95},
                {"head": "0028", "name": "Other Taxes on Income & Expenditure (Profession Tax)", "amount": 1046.77, "sharePct": 0.71},
                {"head": "0043", "name": "Taxes and Duties on Electricity", "amount": 485.50, "sharePct": 0.33},
                {"head": "0029", "name": "Land Revenue", "amount": 11.14, "sharePct": 0.01},
                {"head": "0042", "name": "Taxes on Goods and Passengers", "amount": 14.91, "sharePct": 0.01},
                {"head": "0038", "name": "Taxes on Immovable Property", "amount": 4.80, "sharePct": 0.00},
                {"head": "0045", "name": "Other Taxes & Duties on Commodities & Services", "amount": 3.65, "sharePct": 0.00}
            ]
        },
        "centralShare": {
            "total": 33181.64,
            "shareOfRevenueReceipts": 13.75,
            "items": [
                {"head": "0021", "name": "Taxes on Income Other than Corporation Tax", "amount": 11808.15, "sharePct": 35.59},
                {"head": "0020", "name": "Corporation Tax", "amount": 9740.28, "sharePct": 29.35},
                {"head": "0005", "name": "Central Goods and Services Tax (CGST)", "amount": 9074.92, "sharePct": 27.35},
                {"head": "0037", "name": "Customs", "amount": 1283.47, "sharePct": 3.87},
                {"head": "0038", "name": "Union Excise Duties", "amount": 457.26, "sharePct": 1.38},
                {"head": "0044", "name": "Service Tax Arrears Devolution", "amount": 817.56, "sharePct": 2.46}
            ]
        },
        "nonTaxRevenue": {
            "total": 35730.20,
            "shareOfRevenueReceipts": 14.81,
            "items": [
                {"head": "0075", "name": "Miscellaneous General Services (Land regularization & sale proceeds)", "amount": 24340.00, "sharePct": 68.12},
                {"head": "0853", "name": "Non-Ferrous Mining and Metallurgical Industries (Mineral Royalties)", "amount": 7600.00, "sharePct": 21.27},
                {"head": "0202", "name": "Education, Sports, Art and Culture Receipts", "amount": 1220.05, "sharePct": 3.41},
                {"head": "0210", "name": "Medical and Public Health Receipts", "amount": 507.31, "sharePct": 1.42},
                {"head": "0070", "name": "Other Administrative Services (Police, Justice, Exams)", "amount": 279.10, "sharePct": 0.78},
                {"head": "0230", "name": "Labour and Employment Receipts", "amount": 189.26, "sharePct": 0.53},
                {"head": "0049", "name": "Interest Receipts (Loans to corporations & banks)", "amount": 187.32, "sharePct": 0.52},
                {"head": "0216", "name": "Housing Receipts", "amount": 153.80, "sharePct": 0.43},
                {"head": "1054", "name": "Roads and Bridges Receipts (Toll & user charges)", "amount": 140.85, "sharePct": 0.39},
                {"head": "1475", "name": "Other General Economic Services", "amount": 82.68, "sharePct": 0.23},
                {"head": "0700", "name": "Major Irrigation Water Charges", "amount": 77.20, "sharePct": 0.22},
                {"head": "1452", "name": "Tourism Receipts", "amount": 76.39, "sharePct": 0.21},
                {"head": "0406", "name": "Forestry and Wild Life Receipts", "amount": 53.22, "sharePct": 0.15},
                {"head": "0059", "name": "Public Works Receipts", "amount": 46.83, "sharePct": 0.13},
                {"head": "0425", "name": "Co-operation Receipts", "amount": 42.70, "sharePct": 0.12},
                {"head": "0250", "name": "Other Social Services Receipts", "amount": 37.34, "sharePct": 0.10},
                {"head": "0801", "name": "Power Receipts", "amount": 32.14, "sharePct": 0.09},
                {"head": "0071", "name": "Pension & Retirement Contributions Recovered", "amount": 31.11, "sharePct": 0.09},
                {"head": "0217", "name": "Urban Development Receipts", "amount": 30.42, "sharePct": 0.09},
                {"head": "0702", "name": "Minor Irrigation Receipts", "amount": 24.02, "sharePct": 0.07},
                {"head": "1456", "name": "Civil Supplies Receipts", "amount": 19.65, "sharePct": 0.05},
                {"head": "1053", "name": "Civil Aviation Receipts", "amount": 16.76, "sharePct": 0.05},
                {"head": "0701", "name": "Medium Irrigation Receipts", "amount": 16.24, "sharePct": 0.05},
                {"head": "0235", "name": "Social Security and Welfare Receipts", "amount": 15.90, "sharePct": 0.04},
                {"head": "0401", "name": "Crop Husbandry Receipts", "amount": 12.94, "sharePct": 0.04},
                {"head": "0506", "name": "Land Reforms Receipts", "amount": 12.78, "sharePct": 0.04},
                {"head": "0852", "name": "Industries Receipts", "amount": 12.62, "sharePct": 0.04},
                {"head": "0405", "name": "Fisheries Receipts", "amount": 9.16, "sharePct": 0.03},
                {"head": "0403", "name": "Animal Husbandry Receipts", "amount": 8.01, "sharePct": 0.02},
                {"head": "0515", "name": "Other Rural Development Receipts", "amount": 6.57, "sharePct": 0.02},
                {"head": "0215", "name": "Water Supply & Sanitation Receipts", "amount": 6.05, "sharePct": 0.02},
                {"head": "0220", "name": "Information and Publicity Receipts", "amount": 1.21, "sharePct": 0.00},
                {"head": "0211", "name": "Family Welfare Receipts", "amount": 1.04, "sharePct": 0.00},
                {"head": "0851", "name": "Village & Small Industries", "amount": 0.90, "sharePct": 0.00}
            ]
        },
        "grantsInAid": {
            "total": 24166.00,
            "shareOfRevenueReceipts": 10.02,
            "items": [
                {"head": "1601-06", "name": "Centrally Sponsored Schemes (CSS) Grants", "amount": 17850.00, "sharePct": 73.86},
                {"head": "1601-07", "name": "Finance Commission Grants (Rural & Urban Local Bodies, SDRF)", "amount": 4316.00, "sharePct": 17.86},
                {"head": "1601-08", "name": "Other Central Transfers & Scheme Grants", "amount": 2000.00, "sharePct": 8.28}
            ]
        }
    },
    "capitalReceipts": {
        "total": 82970.42,
        "items": [
            {"head": "6003", "name": "Internal Debt of the State Government (Open Market Borrowings)", "amount": 74483.60, "sharePct": 89.77},
            {"head": "6004", "name": "Loans and Advances from the Central Government", "amount": 5500.00, "sharePct": 6.63},
            {"head": "8009-8449", "name": "Public Account Deposits, Small Savings & Reserve Funds (Net)", "amount": 1500.00, "sharePct": 1.81},
            {"head": "6215-7610", "name": "Recoveries of Loans and Advances", "amount": 1486.82, "sharePct": 1.79}
        ]
    }
}

with open(os.path.join(DATA_DIR, "receipts_breakdown.json"), "w", encoding="utf-8") as f:
    json.dump(receipts_breakdown, f, indent=2, ensure_ascii=False)

print("Generated receipts_breakdown.json")

# 6. EXPENDITURE BREAKDOWN (From Volume I/1, Volume VI Table 3, Table 5, Table 12)
expenditure_breakdown = {
    "year": "2026-27",
    "totalExpenditure": 324234.00,
    "byType": {
        "revenueExpenditure": 234405.82,
        "capitalExpenditure": 47267.28,
        "publicDebtRepayment": 23024.89,
        "loansAndAdvancesDisbursed": 19536.01
    },
    "byPlanMechanism": {
        "establishmentExpenditure": 139918.00,
        "schemeExpenditure": 184316.00
    },
    "byDevelopmentClassification": {
        "developmentalExpenditure": 180934.48,
        "generalAndAdministrativeServices": 14691.70,
        "debtServicesInterest": 21305.00,
        "taxCollectionCharges": 1004.51,
        "otherExpenditure": 16470.14
    },
    "revenueByService": {
        "socialServices": {
            "total": 106039.20,
            "sharePct": 45.24,
            "subSectors": [
                {"name": "Education, Sports, Art and Culture", "amount": 25200.00, "majorHeads": ["2202", "2203", "2204", "2205"]},
                {"name": "Health and Family Welfare", "amount": 11239.22, "majorHeads": ["2210", "2211"]},
                {"name": "Water Supply, Sanitation, Housing & Urban Development", "amount": 21628.80, "majorHeads": ["2215", "2216", "2217"]},
                {"name": "Welfare of SC, ST, BC and Minorities", "amount": 42770.00, "majorHeads": ["2225"]},
                {"name": "Labour, Labour Welfare and Employment", "amount": 837.88, "majorHeads": ["2230"]},
                {"name": "Social Security, Nutrition and Relief", "amount": 4363.30, "majorHeads": ["2235", "2236", "2245"]}
            ]
        },
        "economicServices": {
            "total": 74450.47,
            "sharePct": 31.76,
            "subSectors": [
                {"name": "Agriculture and Allied Activities", "amount": 26890.00, "majorHeads": ["2401", "2402", "2403", "2404", "2405", "2406", "2408", "2425", "2435"]},
                {"name": "Rural Development", "amount": 22214.66, "majorHeads": ["2501", "2505", "2515"]},
                {"name": "Irrigation and Flood Control", "amount": 9704.12, "majorHeads": ["2700", "2701", "2702", "2705", "2711"]},
                {"name": "Energy & Power", "amount": 15048.29, "majorHeads": ["2801", "2810"]},
                {"name": "Industry and Minerals", "amount": 2179.32, "majorHeads": ["2851", "2852", "2853"]},
                {"name": "Transport and Communications", "amount": 5198.21, "majorHeads": ["3053", "3054", "3055"]},
                {"name": "Science, Technology & Environment", "amount": 215.87, "majorHeads": ["3425", "3435"]}
            ]
        },
        "generalServices": {
            "total": 53906.06,
            "sharePct": 23.00,
            "subSectors": [
                {"name": "Organs of State (Legislature, Governor, Judiciary, Elections)", "amount": 4514.85, "majorHeads": ["2011", "2012", "2014", "2015"]},
                {"name": "Fiscal Services (Commercial Taxes, Excise, Registration, Treasury)", "amount": 1887.42, "majorHeads": ["2029", "2030", "2039", "2040", "2041", "2047"]},
                {"name": "Debt Services (Interest Payments on Market Loans & Central Debt)", "amount": 21304.39, "majorHeads": ["2048", "2049"]},
                {"name": "Administrative Services (Secretariat, District Admn, Police, Prisons)", "amount": 13089.40, "majorHeads": ["2051", "2052", "2053", "2054", "2055", "2056", "2058", "2059", "2070"]},
                {"name": "Pensions and Miscellaneous General Services", "amount": 13110.00, "majorHeads": ["2071", "2075"]}
            ]
        },
        "grantsInAidContribution": {
            "total": 10.10,
            "sharePct": 0.00
        }
    },
    "capitalOutlayByDepartment": [
        {"department": "Irrigation Department", "amount": 12836.0, "sharePct": 27.16},
        {"department": "Roads and Building Department", "amount": 6300.0, "sharePct": 13.33},
        {"department": "Scheduled Castes Development Department", "amount": 4578.0, "sharePct": 9.69},
        {"department": "Housing Department", "amount": 4397.0, "sharePct": 9.30},
        {"department": "Panchayat Raj and Rural Development Department", "amount": 3792.0, "sharePct": 8.02},
        {"department": "Planning Department", "amount": 3575.0, "sharePct": 7.56},
        {"department": "Tribal Welfare Department", "amount": 2759.0, "sharePct": 5.84},
        {"department": "Backward Class Welfare Department", "amount": 2470.0, "sharePct": 5.23},
        {"department": "Health, Medical & Family Welfare Department", "amount": 1948.0, "sharePct": 4.12},
        {"department": "Secondary Education, Secretariat Department", "amount": 1373.0, "sharePct": 2.90},
        {"department": "Law Department", "amount": 781.0, "sharePct": 1.65},
        {"department": "Home Department", "amount": 474.0, "sharePct": 1.00},
        {"department": "Minorities Welfare Department", "amount": 325.0, "sharePct": 0.69},
        {"department": "Industries & Commerce Department", "amount": 293.0, "sharePct": 0.62},
        {"department": "Municipal Administration & Urban Development", "amount": 280.0, "sharePct": 0.59},
        {"department": "Information Technology & Communications Department", "amount": 200.0, "sharePct": 0.42},
        {"department": "Environment, Forest, Science & Technology Department", "amount": 199.0, "sharePct": 0.42},
        {"department": "Labour and Employment Department", "amount": 160.0, "sharePct": 0.34},
        {"department": "Revenue Department", "amount": 105.0, "sharePct": 0.22},
        {"department": "Animal Husbandry & Fisheries Department", "amount": 93.0, "sharePct": 0.20},
        {"department": "Youth Advancement, Tourism and Culture Department", "amount": 82.0, "sharePct": 0.17},
        {"department": "Finance Department", "amount": 80.0, "sharePct": 0.17},
        {"department": "Women, Children, Disabled & Senior Citizens Department", "amount": 79.0, "sharePct": 0.17},
        {"department": "Transport Department", "amount": 35.0, "sharePct": 0.07},
        {"department": "Legislature Secretariat", "amount": 30.0, "sharePct": 0.06},
        {"department": "Higher Education Department", "amount": 17.0, "sharePct": 0.04},
        {"department": "Agriculture & Cooperation Department", "amount": 3.0, "sharePct": 0.01},
        {"department": "General Administration Department", "amount": 3.0, "sharePct": 0.01}
    ]
}

with open(os.path.join(DATA_DIR, "expenditure_breakdown.json"), "w", encoding="utf-8") as f:
    json.dump(expenditure_breakdown, f, indent=2, ensure_ascii=False)

print("Generated expenditure_breakdown.json")

# 7. SECTOR ALLOCATIONS (Synthesized high-level sectoral views)
sector_allocations = [
    {
        "id": "agriculture-allied",
        "name": "Agriculture & Allied Activities",
        "totalAllocationCrore": 32074.00,
        "sharePct": 9.89,
        "icon": "Sprout",
        "description": "Comprehensive agrarian support: Rythu Bharosa, paddy bonus, crop insurance, veterinary care, horticulture, and food security.",
        "departments": ["Agriculture & Cooperation Department", "Animal Husbandry & Fisheries Department", "Food & Civil Supplies Department"],
        "keySchemes": ["Rythu Bharosa (₹18,000 Cr)", "Food Subsidy & Rice Procurement (₹5,170 Cr)", "Bonus to Agriculture Produces (₹3,500 Cr)", "Crop Insurance (₹1,886 Cr)", "Farm Mechanization (₹344 Cr)"]
    },
    {
        "id": "irrigation-water",
        "name": "Irrigation & Water Resources",
        "totalAllocationCrore": 22615.00,
        "sharePct": 6.97,
        "icon": "Waves",
        "description": "Major, medium, and minor irrigation maintenance, lift irrigation energy servicing, flood drainage, and command area water management.",
        "departments": ["Irrigation Department"],
        "keySchemes": ["Major & Medium Irrigation Works (₹20,158 Cr)", "Minor Irrigation Projects (₹2,120 Cr)", "Flood Control & Drainage Works (₹280 Cr)", "Sunkishala Intake Works (₹1,000 Cr)"]
    },
    {
        "id": "welfare-inclusion",
        "name": "Welfare & Social Inclusion",
        "totalAllocationCrore": 69144.00,
        "sharePct": 21.33,
        "icon": "Users",
        "description": "Affirmative action, residential schools, post-matric scholarships, overseas scholarships, and economic support for SC, ST, BC, Minorities, and Women.",
        "departments": ["Scheduled Castes Development Department", "Tribal Welfare Department", "Backward Class Welfare Department", "Minorities Welfare Department", "Women, Children, Disabled & Senior Citizens Department"],
        "keySchemes": ["Cheyutha Pension (₹14,861 Cr)", "SCSDF Special Development Fund (₹37,741 Cr)", "STSDF Special Development Fund (₹18,745 Cr)", "BC Welfare Hostels & Scholarships (₹12,511 Cr)", "Minority Welfare Residential Societies (₹3,769 Cr)", "Mahalaxmi Assistance to Women (₹1,780 Cr)"]
    },
    {
        "id": "education-skills",
        "name": "Education & Human Capital",
        "totalAllocationCrore": 26674.00,
        "sharePct": 8.23,
        "icon": "GraduationCap",
        "description": "Foundational, secondary, higher, and technical education, universities, and residential education networks.",
        "departments": ["Secondary Education, Secretariat Department", "Higher Education Department"],
        "keySchemes": ["Young India Integrated Residential Schools (₹5,000 Cr)", "Samagra Shiksha (₹6,416 Cr)", "School Breakfast & Milk Program (₹720 Cr)", "Osmania University Upgradation (₹1,000 Cr)", "Telangana Public Schools (₹500 Cr)", "Veeranari Chakali Ilamma Mahila University (₹400 Cr)"]
    },
    {
        "id": "rural-panchayat",
        "name": "Rural Development & Panchayat Raj",
        "totalAllocationCrore": 33688.00,
        "sharePct": 10.39,
        "icon": "Home",
        "description": "Empowering Gram Panchayats, rural road networks, drinking water maintenance, sanitation, and women's self-help groups (SERP).",
        "departments": ["Panchayat Raj and Rural Development Department"],
        "keySchemes": ["Interest-free Loans to DWACRA Women (₹2,500 Cr)", "Rural Sanitation & Jal Jeevan / Mission Bhagiratha (₹400 Cr)", "Gram Panchayat Development Grants (₹5,600 Cr)", "Rural Roads Construction (₹3,792 Cr)"]
    },
    {
        "id": "energy-power",
        "name": "Energy & Power Transition",
        "totalAllocationCrore": 21285.00,
        "sharePct": 6.56,
        "icon": "Zap",
        "description": "Uninterrupted free electricity to agriculture, Gruha Jyothi domestic power, grid expansion by TRANSCO & GENCO, and 100% village solarisation.",
        "departments": ["Energy Department"],
        "keySchemes": ["Gruha Jyothi Free Electricity (₹3,450 Cr)", "Agriculture Free Power Subsidy (₹15,048 Cr)", "Assistance to TRANSCO (₹1,000 Cr)", "Assistance to GENCO (₹1,000 Cr)", "100% Solarisation of Villages (₹1,000 Cr)", "New Green Energy Policy (₹1,000 Cr)"]
    },
    {
        "id": "urban-infrastructure",
        "name": "Urban Development & Smart Cities",
        "totalAllocationCrore": 17907.00,
        "sharePct": 5.52,
        "icon": "Building2",
        "description": "Modernizing the Hyderabad metropolis and tier-2 urban clusters, riverfront revitalization, drainage master plans, and metro connectivity.",
        "departments": ["Municipal Administration & Urban Development"],
        "keySchemes": ["H-CITY Hyderabad Innovative Infrastructure (₹2,654 Cr)", "Musi Riverfront Development (₹1,500 Cr)", "HMWSSB Water Supply & Sewerage Expansion (₹1,450 Cr)", "Nagarabhivrudhi for 4 Municipalities (₹1,000 Cr)", "Hyderabad Metro Rail Phase-II (₹600 Cr)", "Assistance to Municipalities (₹651 Cr)"]
    },
    {
        "id": "health-family-welfare",
        "name": "Health, Medical & Family Welfare",
        "totalAllocationCrore": 13679.00,
        "sharePct": 4.22,
        "icon": "HeartPulse",
        "description": "Universal health coverage, tertiary multi-super specialty hospitals, district medical colleges, public health centers, and diagnostic hubs.",
        "departments": ["Health, Medical & Family Welfare Department"],
        "keySchemes": ["Aarogyasri Health Scheme (₹2,800 Cr)", "Medical Colleges & TIMS Infrastructure (₹1,948 Cr)", "Employees Health Scheme (₹1,056 Cr)", "Director of Public Health Operations (₹4,500 Cr)"]
    },
    {
        "id": "transport-roads",
        "name": "Roads, Transport & Connectivity",
        "totalAllocationCrore": 12789.00,
        "sharePct": 3.94,
        "icon": "Truck",
        "description": "Upgrading core state roads via HAM, Regional Ring Road (RRR) land acquisition, TSRTC fleet modernization, and green mobility transition.",
        "departments": ["Roads and Building Department", "Transport Department"],
        "keySchemes": ["HAM Roads Upgradation & Maintenance (₹3,053 Cr)", "Regional Ring Road Equity (₹1,525 Cr)", "TSRTC Free Bus Travel Reimbursement (₹4,305 Cr)", "Roads & Bridges Maintenance (₹828 Cr)", "ROBs and RUBs (₹216 Cr)"]
    },
    {
        "id": "housing",
        "name": "Housing for the Poor",
        "totalAllocationCrore": 7430.00,
        "sharePct": 2.29,
        "icon": "Building",
        "description": "Dignified housing for all low-income families through Indiramma Indlu and basic civic amenities in new residential layouts.",
        "departments": ["Housing Department"],
        "keySchemes": ["Indiramma Houses Construction (₹5,500 Cr)", "Weaker Section Housing Infrastructure (₹1,061 Cr)", "Affordable Urban Housing Grants (₹869 Cr)"]
    },
    {
        "id": "industries-it-commerce",
        "name": "Industries, IT & Economic Growth",
        "totalAllocationCrore": 4622.00,
        "sharePct": 1.43,
        "icon": "Briefcase",
        "description": "Fostering Telangana as India's technology & manufacturing hub: AI City, electronics parks, handloom weavers, and MSME interest relief.",
        "departments": ["Industries & Commerce Department", "Information Technology & Communications Department"],
        "keySchemes": ["Incentives for Industrial Promotion (₹1,835 Cr)", "IT & Electronics Cluster Outlay (₹871 Cr)", "Weaver Assistance & Thrift Fund (₹450 Cr)", "Pavala Vaddi for MSME & Food Units (₹350 Cr)", "Global Travel Marts & Trade Promotion (₹300 Cr)"]
    },
    {
        "id": "governance-security",
        "name": "Governance, Law & Public Security",
        "totalAllocationCrore": 85161.00,
        "sharePct": 26.27,
        "icon": "ShieldCheck",
        "description": "Fiscal administration, debt servicing, state police, cyber command center, courts, revenue collectors, and pension guarantees.",
        "departments": ["Finance Department", "Home Department", "Revenue Department", "Planning Department", "Law Department", "General Administration Department", "Legislature Secretariat"],
        "keySchemes": ["Debt Servicing - Interest Payments (₹21,304 Cr)", "Pension & Retirement Benefits (₹13,110 Cr)", "Police Administration & Modernization (₹11,907 Cr)", "Rajiv Yuva Vikasam Youth Schemes (₹5,800 Cr)", "Universal Life Insurance (₹4,000 Cr)", "Judiciary & Courts Infrastructure (₹2,367 Cr)"]
    }
]

with open(os.path.join(DATA_DIR, "sector_allocations.json"), "w", encoding="utf-8") as f:
    json.dump(sector_allocations, f, indent=2, ensure_ascii=False)

print(f"Generated sector_allocations.json with {len(sector_allocations)} sectors.")

# 8. DEBT AND GUARANTEES DATA (From Volume VI, Volume V/1, and FRBM Statement)
debt_and_guarantees = {
    "year": "2026-27",
    "publicDebtOutstanding": {
        "currentYearBE": 562363.00,
        "previousYearRE": 503905.00,
        "accounts2024_25": 447493.00,
        "accounts2023_24": 398655.00,
        "pctOfGSDP": 28.69,
        "statutoryLimitPct": 32.50,
        "unit": "₹ crore",
        "breakdown": [
            {"category": "Open Market Borrowings (SLR Bonds)", "amount": 462926.00, "sharePct": 82.32},
            {"category": "Reserve Funds and Deposits", "amount": 37067.00, "sharePct": 6.59},
            {"category": "Small Savings, Provident Funds & Insurance", "amount": 25716.00, "sharePct": 4.57},
            {"category": "Loans from Government of India", "amount": 22345.00, "sharePct": 3.97},
            {"category": "Loans from Autonomous Bodies & Financial Institutions", "amount": 14309.00, "sharePct": 2.55}
        ]
    },
    "guaranteesSummary": {
        "totalGuaranteesAndCorpDebt": 301835.00,
        "asOnDate": "2026-02-28",
        "sourceFile": "1773983722_Volume_VI-Brief_1773983722_.pdf",
        "sourcePage": 14,
        "categories": [
            {
                "id": "cat-1",
                "name": "Category I: Guaranteed Loans raised by SPVs serviced by Government",
                "amount": 86309.00,
                "sharePct": 28.59,
                "guaranteeCount": 18,
                "riskWeightPct": 100,
                "description": "Loans raised by entities like KIPCL, TSWRIDCL where debt service is provided directly from the State Budget."
            },
            {
                "id": "cat-2",
                "name": "Category II: Guaranteed Loans raised by SPVs and serviced by them",
                "amount": 155434.00,
                "sharePct": 51.50,
                "guaranteeCount": 14,
                "riskWeightPct": 5,
                "description": "Loans raised by entities with commercial cash flows (e.g. power DISCOMs, Civil Supplies) that service their debt independently."
            },
            {
                "id": "cat-3",
                "name": "Non-Guaranteed Loans paid by Corporations",
                "amount": 60092.00,
                "sharePct": 19.91,
                "description": "Direct bank credit obtained by state corporations without formal government counter-guarantee."
            }
        ],
        "riskWeightedGuarantees": {
            "totalOutstanding": 241743.00,
            "riskWeightedTotal": 94081.00,
            "pctOfTotal": 38.92
        }
    },
    "reserveFunds": {
        "consolidatedSinkingFund": {
            "balanceAsOnMarch2026": 7481.00,
            "additionsDuringYear": 216.00,
            "sourceFile": "1773983965_FRBM_Fiscal_Policy_statement_2026-27_1773983965_.pdf",
            "sourcePage": 12,
            "purpose": "Buffer reserve maintained with RBI to amortize future open market debt redemptions."
        },
        "guaranteeRedemptionFund": {
            "balanceAsOnMarch2026": 6346.00,
            "additionsDuringYear": 4555.00,
            "sourceFile": "1773983965_FRBM_Fiscal_Policy_statement_2026-27_1773983965_.pdf",
            "sourcePage": 15,
            "purpose": "Dedicated statutory fund invested with RBI to meet potential default claims on state guarantees."
        }
    },
    "frbmFiscalIndicators": [
        {"indicator": "Gross Fiscal Deficit as % of GSDP", "actual2024_25": 3.04, "re2025_26": 3.15, "be2026_27": 2.98, "target": 3.00, "status": "Compliant"},
        {"indicator": "Revenue Deficit / Surplus as % of TRR", "actual2024_25": -5.61, "re2025_26": 0.29, "be2026_27": 2.84, "target": "Surplus", "status": "Compliant"},
        {"indicator": "Total Outstanding Liabilities as % of GSDP", "actual2024_25": 27.80, "re2025_26": 28.27, "be2026_27": 28.69, "target": 32.50, "status": "Compliant"},
        {"indicator": "Interest Payments as % of Total Revenue Receipts", "actual2024_25": 16.57, "re2025_26": 9.50, "be2026_27": 8.83, "target": "<15.00", "status": "Compliant"}
    ]
}

with open(os.path.join(DATA_DIR, "debt_and_guarantees.json"), "w", encoding="utf-8") as f:
    json.dump(debt_and_guarantees, f, indent=2, ensure_ascii=False)

print("Generated debt_and_guarantees.json")

# 9. GOVERNMENT COUNCIL OF MINISTERS (From Volume IX, Notice 2026-27, and Official Portal)
government_profiles = {
    "presentation": {
        "title": "Government of Telangana - Council of Ministers",
        "citedSources": [
            "Telangana State Budget Notice 2026-27 (Signed by Secretaries to Legislature)",
            "Telangana Budget Volume IX: Analysis of Demands for Grants 2026-27 by Ministers",
            "Official Portal of Telangana State (https://www.telangana.gov.in)"
        ]
    },
    "ministers": [
        {
            "id": "revanth-reddy",
            "name": "Sri Anumula Revanth Reddy",
            "shortName": "A. Revanth Reddy",
            "role": "Chief Minister",
            "constituency": "Kodangal",
            "portfolios": [
                "Municipal Administration and Urban Development",
                "General Administration",
                "Education (School, Higher & Technical)",
                "Law & Order / Home Administration",
                "Commercial Taxes Administration",
                "Administration of Justice",
                "All other unallocated departments"
            ],
            "demandsOverseen": ["II", "III", "IV", "VII", "X", "XII", "XIII", "XIV", "XVII"],
            "totalBudgetOverseenCrore": 69279.16,
            "photoPlaceholder": "cm_revanth_reddy",
            "departmentIds": ["municipal-administration-and-urban-development", "general-administration-department", "secondary-education-secretariat-department", "higher-education-department", "home-department", "law-department", "revenue-department"]
        },
        {
            "id": "bhatti-vikramarka",
            "name": "Sri Mallu Bhatti Vikramarka",
            "shortName": "Mallu Bhatti Vikramarka",
            "role": "Deputy Chief Minister & Finance Minister",
            "constituency": "Madhira (SC)",
            "portfolios": [
                "Finance & Planning",
                "Energy"
            ],
            "demandsOverseen": ["IX", "XXXV"],
            "totalBudgetOverseenCrore": 38058.31,
            "photoPlaceholder": "deputy_cm_bhatti",
            "notes": "Presented the Budget Estimates 2026-27 to the Telangana Legislative Assembly on 20th March, 2026.",
            "departmentIds": ["finance-department", "planning-department", "energy-department"]
        },
        {
            "id": "uttam-kumar-reddy",
            "name": "Sri Nalamada Uttam Kumar Reddy",
            "shortName": "N. Uttam Kumar Reddy",
            "role": "Cabinet Minister",
            "constituency": "Huzurnagar",
            "portfolios": [
                "Irrigation & Command Area Development (CAD)",
                "Food & Civil Supplies"
            ],
            "demandsOverseen": ["XXXIII", "XXXVIII"],
            "totalBudgetOverseenCrore": 27710.12,
            "photoPlaceholder": "minister_uttam",
            "departmentIds": ["irrigation-department", "food-and-civil-supplies-department"]
        },
        {
            "id": "sridhar-babu",
            "name": "Sri Duddilla Sridhar Babu",
            "shortName": "D. Sridhar Babu",
            "role": "Cabinet Minister",
            "constituency": "Manthani",
            "portfolios": [
                "Information Technology, Electronics & Communications",
                "Industries & Commerce",
                "Legislative Affairs"
            ],
            "demandsOverseen": ["I", "XXXVI", "XXXIX"],
            "totalBudgetOverseenCrore": 3539.65,
            "photoPlaceholder": "minister_sridhar",
            "departmentIds": ["information-technology-and-communications-department", "industries-and-commerce-department", "legislature-secretariat"]
        },
        {
            "id": "ponguleti-srinivasa-reddy",
            "name": "Sri Ponguleti Srinivasa Reddy",
            "shortName": "Ponguleti Srinivasa Reddy",
            "role": "Cabinet Minister",
            "constituency": "Palair",
            "portfolios": [
                "Revenue and Housing",
                "Information & Public Relations (I&PR)"
            ],
            "demandsOverseen": ["V", "XVIII", "XIX"],
            "totalBudgetOverseenCrore": 9715.52,
            "photoPlaceholder": "minister_ponguleti",
            "departmentIds": ["revenue-department", "housing-department", "general-administration-department"]
        },
        {
            "id": "ponnam-prabhakar",
            "name": "Sri Ponnam Prabhakar",
            "shortName": "Ponnam Prabhakar",
            "role": "Cabinet Minister",
            "constituency": "Husnabad",
            "portfolios": [
                "Transport",
                "Backward Classes (BC) Welfare"
            ],
            "demandsOverseen": ["VIII", "XXIII"],
            "totalBudgetOverseenCrore": 15779.62,
            "photoPlaceholder": "minister_ponnam",
            "departmentIds": ["transport-department", "backward-class-welfare-department"]
        },
        {
            "id": "komatireddy-venkat-reddy",
            "name": "Sri Komatireddy Venkat Reddy",
            "shortName": "Komatireddy Venkat Reddy",
            "role": "Cabinet Minister",
            "constituency": "Nalgonda",
            "portfolios": [
                "Roads & Buildings",
                "Cinematography"
            ],
            "demandsOverseen": ["XI"],
            "totalBudgetOverseenCrore": 8294.71,
            "photoPlaceholder": "minister_komatireddy",
            "departmentIds": ["roads-and-building-department"]
        },
        {
            "id": "damodar-raja-narasimha",
            "name": "Sri Cilarapu Damodar Raja Narasimha",
            "shortName": "C. Damodar Raja Narasimha",
            "role": "Cabinet Minister",
            "constituency": "Andole (SC)",
            "portfolios": [
                "Health, Medical & Family Welfare",
                "Science and Technology"
            ],
            "demandsOverseen": ["XVI"],
            "totalBudgetOverseenCrore": 13187.22,
            "photoPlaceholder": "minister_damodar",
            "departmentIds": ["health-medical-and-family-welfare-department", "environment-forest-science-and-technology-department"]
        },
        {
            "id": "danasari-anasuya-seethakka",
            "name": "Smt. Danasari Anasuya (Seethakka)",
            "shortName": "Danasari Anasuya (Seethakka)",
            "role": "Cabinet Minister",
            "constituency": "Mulug (ST)",
            "portfolios": [
                "Panchayat Raj & Rural Development (including Rural Water Supply)",
                "Women & Child Welfare"
            ],
            "demandsOverseen": ["XXV", "XXXI", "XXXII"],
            "totalBudgetOverseenCrore": 29087.71,
            "photoPlaceholder": "minister_seethakka",
            "departmentIds": ["panchayat-raj-and-rural-development-department", "women-children-disabled-and-senior-citizens-department"]
        },
        {
            "id": "tummala-nageswara-rao",
            "name": "Sri Tummala Nageswara Rao",
            "shortName": "Tummala Nageswara Rao",
            "role": "Cabinet Minister",
            "constituency": "Khammam",
            "portfolios": [
                "Agriculture & Marketing",
                "Co-operation",
                "Handlooms & Textiles"
            ],
            "demandsOverseen": ["XXVII", "XXX"],
            "totalBudgetOverseenCrore": 17483.31,
            "photoPlaceholder": "minister_tummala",
            "departmentIds": ["agriculture-and-cooperation-department", "industries-and-commerce-department"]
        },
        {
            "id": "jupally-krishna-rao",
            "name": "Sri Jupally Krishna Rao",
            "shortName": "Jupally Krishna Rao",
            "role": "Cabinet Minister",
            "constituency": "Kollapur",
            "portfolios": [
                "Prohibition & Excise",
                "Tourism & Culture",
                "Archaeology"
            ],
            "demandsOverseen": ["VI", "XXXVII"],
            "totalBudgetOverseenCrore": 1890.23,
            "photoPlaceholder": "minister_jupally",
            "departmentIds": ["revenue-department", "youth-advancement-tourism-and-culture-department"]
        },
        {
            "id": "konda-surekha",
            "name": "Smt. Konda Surekha",
            "shortName": "Konda Surekha",
            "role": "Cabinet Minister",
            "constituency": "Warangal East",
            "portfolios": [
                "Environment, Forests & Climate Change",
                "Religious Endowments"
            ],
            "demandsOverseen": ["XXVI", "XXIX"],
            "totalBudgetOverseenCrore": 2305.03,
            "photoPlaceholder": "minister_konda",
            "departmentIds": ["environment-forest-science-and-technology-department", "revenue-department"]
        },
        {
            "id": "gaddam-vivekanand",
            "name": "Dr. Gaddam Vivekanand",
            "shortName": "Gaddam Vivekanand",
            "role": "Cabinet Minister",
            "constituency": "Chennur (SC)",
            "portfolios": [
                "Labour, Employment, Training & Factories",
                "Mines & Geology"
            ],
            "demandsOverseen": ["XX"],
            "totalBudgetOverseenCrore": 997.88,
            "photoPlaceholder": "minister_vivek",
            "departmentIds": ["labour-and-employment-department", "industries-and-commerce-department"]
        },
        {
            "id": "adluri-laxman-kumar",
            "name": "Sri Adluri Laxman Kumar",
            "shortName": "Adluri Laxman Kumar",
            "role": "Cabinet Minister",
            "constituency": "Dharmapuri (SC)",
            "portfolios": [
                "Scheduled Castes (SC) Development",
                "Tribal Welfare (ST)",
                "Empowerment of Persons with Disabilities, Senior Citizens and Transgender Persons"
            ],
            "demandsOverseen": ["XXI", "XXII"],
            "totalBudgetOverseenCrore": 47653.92,
            "photoPlaceholder": "minister_laxman",
            "departmentIds": ["scheduled-castes-development-department", "tribal-welfare-department", "women-children-disabled-and-senior-citizens-department"]
        },
        {
            "id": "vakiti-srihari",
            "name": "Sri Vakiti Srihari",
            "shortName": "Vakiti Srihari",
            "role": "Cabinet Minister",
            "constituency": "Makthal",
            "portfolios": [
                "Animal Husbandry & Dairy Development",
                "Fisheries",
                "Sports & Youth Services"
            ],
            "demandsOverseen": ["XV", "XXVIII"],
            "totalBudgetOverseenCrore": 2213.03,
            "photoPlaceholder": "minister_srihari",
            "departmentIds": ["animal-husbandry-and-fisheries-department", "youth-advancement-tourism-and-culture-department"]
        },
        {
            "id": "mohammad-azharuddin",
            "name": "Sri Mohammad Azharuddin",
            "shortName": "Mohammad Azharuddin",
            "role": "Cabinet Minister",
            "constituency": "Legislative Council (MLC)",
            "portfolios": [
                "Minorities Welfare",
                "Public Sector Enterprises"
            ],
            "demandsOverseen": ["XXIV"],
            "totalBudgetOverseenCrore": 3768.53,
            "photoPlaceholder": "minister_azharuddin",
            "departmentIds": ["minorities-welfare-department", "industries-and-commerce-department"]
        }
    ]
}

with open(os.path.join(DATA_DIR, "government_profiles.json"), "w", encoding="utf-8") as f:
    json.dump(government_profiles, f, indent=2, ensure_ascii=False)

print(f"Generated government_profiles.json with {len(government_profiles['ministers'])} ministers.")

# 10. EMPLOYEE STRENGTH AND WAGE/PENSION BILL (From Volume VIII/1 and FRBM Form D-10)
employee_strength = {
    "year": "2026-27",
    "asOnDate": "2026-03-01",
    "grandTotalPersonnel": 815312,
    "activeEmployees": 520368,
    "pensioners": 294944,
    "salaryExpenditureCrore": 49461.00,
    "pensionExpenditureCrore": 13110.00,
    "totalWageAndPensionBillCrore": 62571.00,
    "shareOfRevenueReceiptsPct": 25.93,
    "sourceFile": "1773983965_FRBM_Fiscal_Policy_statement_2026-27_1773983965_.pdf",
    "sourcePage": 18,
    "sectors": [
        {"sector": "State Government Regular Departments", "employees": 238311, "sharePct": 45.80},
        {"sector": "State Public Sector Undertakings (PSUs)", "employees": 113006, "sharePct": 21.72},
        {"sector": "Zilla Praja Parishads & Mandal Praja Parishads", "employees": 99858, "sharePct": 19.19},
        {"sector": "Cooperative Institutions & Govt Bodies", "employees": 33691, "sharePct": 6.47},
        {"sector": "Gram Panchayats", "employees": 10907, "sharePct": 2.10},
        {"sector": "Judiciary", "employees": 9479, "sharePct": 1.82},
        {"sector": "Municipal Corporations & Municipalities", "employees": 5215, "sharePct": 1.00},
        {"sector": "Universities", "employees": 4448, "sharePct": 0.85},
        {"sector": "Temples & Endowments", "employees": 2477, "sharePct": 0.48},
        {"sector": "Aided Educational Institutions", "employees": 2312, "sharePct": 0.44},
        {"sector": "Urban Development Authorities", "employees": 373, "sharePct": 0.07},
        {"sector": "Zilla Grandhalaya Samsthas (Libraries)", "employees": 291, "sharePct": 0.06}
    ]
}

with open(os.path.join(DATA_DIR, "employee_strength.json"), "w", encoding="utf-8") as f:
    json.dump(employee_strength, f, indent=2, ensure_ascii=False)

print("Generated employee_strength.json")

# 11. SCSDF & STSDF (Volume VII/2 & Volume VII/3)
scsdf_stsdf = {
    "year": "2026-27",
    "scsdf": {
        "title": "Scheduled Castes Special Development Fund (SCSDF)",
        "statutoryEarmarkPct": 15.44,
        "grandTotalCrore": 37741.22,
        "allocatedToDepartmentsCrore": 34510.62,
        "nonDivisibleInfraAccountingCrore": 3230.61,
        "sourceFile": "1773983773_SCSDF_Vol_VII-II_2026-27_1773983773_.pdf",
        "sourcePage": 9,
        "topDepartments": [
            {"dept": "Rural Development Department", "amount": 5764.44},
            {"dept": "Social Welfare Residential Educational Institutions (TSWREIS)", "amount": 4492.50},
            {"dept": "Scheduled Castes Development Department", "amount": 4190.30},
            {"dept": "Agriculture Department", "amount": 3957.52},
            {"dept": "Energy, Secretariat Department", "amount": 3520.59},
            {"dept": "TG SC Cooperative Development Corp", "amount": 2183.04},
            {"dept": "Civil Supplies Department", "amount": 1538.36},
            {"dept": "Municipal Administration Department", "amount": 1196.00},
            {"dept": "Planning Secretariat Department", "amount": 1127.85},
            {"dept": "Industries Department", "amount": 1066.00}
        ]
    },
    "stsdf": {
        "title": "Scheduled Tribes Special Development Fund (STSDF)",
        "statutoryEarmarkPct": 9.08,
        "grandTotalCrore": 18745.16,
        "allocatedToDepartmentsCrore": 17360.61,
        "nonDivisibleInfraAccountingCrore": 1384.55,
        "sourceFile": "1773983796_STSDF_Volume_VII-III_2026-27_1773983796_.pdf",
        "sourcePage": 9,
        "topDepartments": [
            {"dept": "Tribal Welfare Department", "amount": 7176.20},
            {"dept": "Rural Development Department", "amount": 2214.03},
            {"dept": "Energy, Secretariat Department", "amount": 2016.56},
            {"dept": "Agriculture Department", "amount": 1797.07},
            {"dept": "Civil Supplies Department", "amount": 658.13},
            {"dept": "Planning, Secretariat Department", "amount": 662.84},
            {"dept": "Weaker Section Housing", "amount": 542.12},
            {"dept": "Samagra Shiksha (ST Component)", "amount": 401.40},
            {"dept": "Transport, Roads & Buildings", "amount": 370.87},
            {"dept": "Panchayat Raj Department", "amount": 320.69}
        ]
    }
}

with open(os.path.join(DATA_DIR, "scsdf_stsdf.json"), "w", encoding="utf-8") as f:
    json.dump(scsdf_stsdf, f, indent=2, ensure_ascii=False)

print("Generated scsdf_stsdf.json")

# 12. MASTER FLAT ARRAY OF ALL EXTRACTED RECORDS FOR EXPLORE DATA & CSV EXPORT
all_records = []
rec_id = 1

# Add Demands records
for d in demands_raw:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Expenditure",
        "subCategory": "Demands for Grants",
        "department": d["department"],
        "demandNo": d["demandNo"],
        "scheme": None,
        "majorHead": None,
        "majorHeadName": d["name"],
        "type": "Voted Gross",
        "amount": d["amountCrore"],
        "unit": "₹ crore",
        "sourceFile": d["sourceFile"],
        "sourcePage": d["sourcePage"],
        "notes": f"Moved by {d['ministerTitle']}"
    })
    rec_id += 1

# Add Departments records
for d in dept_allocations:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Expenditure",
        "subCategory": "Department Allocation - Establishment",
        "department": d["name"],
        "demandNo": ", ".join(d["demands"]),
        "scheme": None,
        "majorHead": None,
        "majorHeadName": "Secretariat Establishment",
        "type": "Establishment",
        "amount": float(d["establishmentCrore"]),
        "unit": "₹ crore",
        "sourceFile": d["sourceFile"],
        "sourcePage": d["sourcePage"],
        "notes": f"Establishment budget for {d['name']}"
    })
    rec_id += 1
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Expenditure",
        "subCategory": "Department Allocation - Scheme",
        "department": d["name"],
        "demandNo": ", ".join(d["demands"]),
        "scheme": None,
        "majorHead": None,
        "majorHeadName": "Pragathi Paddu (Schemes)",
        "type": "Scheme",
        "amount": float(d["schemeCrore"]),
        "unit": "₹ crore",
        "sourceFile": d["sourceFile"],
        "sourcePage": d["sourcePage"],
        "notes": f"Pragathi Paddu scheme outlay for {d['name']}"
    })
    rec_id += 1
    if d["capitalOutlayCrore"] > 0:
        all_records.append({
            "id": f"rec_{rec_id}",
            "year": "2026-27",
            "category": "CapitalOutlay",
            "subCategory": "Capital Works by Department",
            "department": d["name"],
            "demandNo": ", ".join(d["demands"]),
            "scheme": None,
            "majorHead": None,
            "majorHeadName": "Capital Works Outlay",
            "type": "Capital",
            "amount": float(d["capitalOutlayCrore"]),
            "unit": "₹ crore",
            "sourceFile": "1773983722_Volume_VI-Brief_1773983722_.pdf",
            "sourcePage": 19,
            "notes": f"Capital asset works for {d['name']}"
        })
        rec_id += 1

# Add Schemes records
for s in schemes_raw:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Scheme",
        "subCategory": s["category"],
        "department": s["department"],
        "demandNo": None,
        "scheme": s["name"],
        "majorHead": None,
        "majorHeadName": s["description"],
        "type": "Scheme Outlay",
        "amount": float(s["amount"]),
        "unit": "₹ crore",
        "sourceFile": "1773983722_Volume_VI-Brief_1773983722_.pdf",
        "sourcePage": 15,
        "notes": f"Major scheme #{s['sNo']} in Table 10"
    })
    rec_id += 1

# Add Tax Revenue Major Heads
for t in receipts_breakdown["revenueReceipts"]["stateOwnTaxes"]["items"]:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Receipts",
        "subCategory": "State Own Tax Revenue",
        "department": "Commercial Taxes / Revenue / Transport / Excise",
        "demandNo": None,
        "scheme": None,
        "majorHead": t["head"],
        "majorHeadName": t["name"],
        "type": "Revenue",
        "amount": t["amount"],
        "unit": "₹ crore",
        "sourceFile": "1773981192_Volume2DETAILED_ESTIMATES_OF_REVENUE_AND_RECEIPTS_1773981192_.pdf",
        "sourcePage": 5,
        "notes": f"Tax Head {t['head']}"
    })
    rec_id += 1

# Add Central Share Heads
for c in receipts_breakdown["revenueReceipts"]["centralShare"]["items"]:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Receipts",
        "subCategory": "State Share in Central Taxes",
        "department": "Finance Department",
        "demandNo": "IX",
        "scheme": None,
        "majorHead": c["head"],
        "majorHeadName": c["name"],
        "type": "Revenue",
        "amount": c["amount"],
        "unit": "₹ crore",
        "sourceFile": "1773981192_Volume2DETAILED_ESTIMATES_OF_REVENUE_AND_RECEIPTS_1773981192_.pdf",
        "sourcePage": 5,
        "notes": f"Union Devolution Head {c['head']}"
    })
    rec_id += 1

# Add Non-Tax Heads
for n in receipts_breakdown["revenueReceipts"]["nonTaxRevenue"]["items"]:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Receipts",
        "subCategory": "Non-Tax Revenue",
        "department": "Respective Departments",
        "demandNo": None,
        "scheme": None,
        "majorHead": n["head"],
        "majorHeadName": n["name"],
        "type": "Revenue",
        "amount": n["amount"],
        "unit": "₹ crore",
        "sourceFile": "1773981192_Volume2DETAILED_ESTIMATES_OF_REVENUE_AND_RECEIPTS_1773981192_.pdf",
        "sourcePage": 6,
        "notes": f"Non-Tax Head {n['head']}"
    })
    rec_id += 1

# Add Capital Receipts
for cr in receipts_breakdown["capitalReceipts"]["items"]:
    all_records.append({
        "id": f"rec_{rec_id}",
        "year": "2026-27",
        "category": "Receipts",
        "subCategory": "Capital Receipts & Borrowings",
        "department": "Finance Department",
        "demandNo": "IX",
        "scheme": None,
        "majorHead": cr["head"],
        "majorHeadName": cr["name"],
        "type": "Capital",
        "amount": cr["amount"],
        "unit": "₹ crore",
        "sourceFile": "1773981192_Volume2DETAILED_ESTIMATES_OF_REVENUE_AND_RECEIPTS_1773981192_.pdf",
        "sourcePage": 7,
        "notes": f"Capital Receipt Head {cr['head']}"
    })
    rec_id += 1

with open(os.path.join(DATA_DIR, "all_records.json"), "w", encoding="utf-8") as f:
    json.dump(all_records, f, indent=2, ensure_ascii=False)

print(f"Generated all_records.json with {len(all_records)} unified records for master tabular explorer.")
