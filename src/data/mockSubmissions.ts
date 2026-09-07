import { Submission, PrizeItem } from '../types';

// Helper to generate self-contained inline SVG data URIs for mock charts
function generateChartDataUri(
  title: string,
  type: 'matplotlib' | 'seaborn' | 'plotly' | 'powerbi' | 'tableau',
  accentColor: string,
  statA: string,
  statB: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <defs>
      <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </linearGradient>
      <linearGradient id="chartGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${accentColor}" stop-opacity="0.8" />
        <stop offset="100%" stop-color="${accentColor}" stop-opacity="0.05" />
      </linearGradient>
    </defs>
    <rect width="800" height="450" fill="url(#bgGrad)" />
    <!-- Grid Lines -->
    <line x1="60" y1="80" x2="740" y2="80" stroke="#334155" stroke-dasharray="4" stroke-width="1" />
    <line x1="60" y1="160" x2="740" y2="160" stroke="#334155" stroke-dasharray="4" stroke-width="1" />
    <line x1="60" y1="240" x2="740" y2="240" stroke="#334155" stroke-dasharray="4" stroke-width="1" />
    <line x1="60" y1="320" x2="740" y2="320" stroke="#334155" stroke-dasharray="4" stroke-width="1" />
    <line x1="60" y1="380" x2="740" y2="380" stroke="#64748b" stroke-width="2" />
    <line x1="60" y1="60" x2="60" y2="380" stroke="#64748b" stroke-width="2" />

    <!-- Chart Header -->
    <text x="60" y="45" fill="#f8fafc" font-size="18" font-weight="bold" font-family="system-ui, sans-serif">${title}</text>
    <rect x="640" y="28" width="100" height="24" rx="12" fill="${accentColor}" fill-opacity="0.2" />
    <text x="690" y="44" fill="${accentColor}" font-size="11" font-weight="bold" text-anchor="middle" font-family="system-ui, sans-serif">${type.toUpperCase()}</text>

    <!-- Area & Line Graph -->
    <path d="M 70 340 Q 150 290 220 310 T 370 210 T 520 140 T 670 90 L 720 110 L 720 380 L 70 380 Z" fill="url(#chartGrad)" />
    <path d="M 70 340 Q 150 290 220 310 T 370 210 T 520 140 T 670 90 L 720 110" fill="none" stroke="${accentColor}" stroke-width="3.5" />

    <!-- Secondary Comparison Line -->
    <path d="M 70 360 Q 150 330 220 280 T 370 260 T 520 220 T 670 190 L 720 170" fill="none" stroke="#94a3b8" stroke-dasharray="6,4" stroke-width="2" />

    <!-- Data Points -->
    <circle cx="220" cy="310" r="5" fill="#ffffff" stroke="${accentColor}" stroke-width="2" />
    <circle cx="370" cy="210" r="5" fill="#ffffff" stroke="${accentColor}" stroke-width="2" />
    <circle cx="520" cy="140" r="5" fill="#ffffff" stroke="${accentColor}" stroke-width="2" />
    <circle cx="670" cy="90" r="6" fill="#ffffff" stroke="${accentColor}" stroke-width="3" />

    <!-- Metric Callout Card -->
    <rect x="530" y="60" width="170" height="50" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1" />
    <text x="545" y="80" fill="#94a3b8" font-size="10" font-family="system-ui, sans-serif">PEAK INSIGHT VALUE</text>
    <text x="545" y="100" fill="#38bdf8" font-size="16" font-weight="bold" font-family="system-ui, sans-serif">${statA}</text>

    <!-- Stat Badges along Bottom -->
    <text x="140" y="410" fill="#94a3b8" font-size="12" font-family="system-ui, sans-serif">Cohort Baseline</text>
    <text x="370" y="410" fill="#94a3b8" font-size="12" font-family="system-ui, sans-serif">Median Transition</text>
    <text x="650" y="410" fill="#38bdf8" font-size="12" font-weight="bold" font-family="system-ui, sans-serif">${statB}</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_SUBMISSIONS: Submission[] = [
  {
    id: 'sub-001',
    userId: 'user-001',
    title: 'Battery Longevity vs Fast Charging Degradation Dynamics',
    studentName: 'Aarav Patel & Neha Sen',
    teamMembers: ['Aarav Patel (CSE 3rd Yr)', 'Neha Sen (AI-DS 3rd Yr)'],
    collegeRollNo: 'ENG-2023-CS042',
    department: 'Computer Science & AI',
    yearOfStudy: '3rd Year',
    datasetId: 'ev-battery-specs',
    datasetTitle: 'Electric Vehicle Population & Battery Degradation',
    track: 'python',
    pythonLibraries: ['seaborn', 'matplotlib', 'plotly'],
    imageUrl: generateChartDataUri(
      'EV Battery Retention & 350kW DC Fast Charge Impact',
      'seaborn',
      '#10b981',
      '+88.4% Capacity @ 150k km',
      'Top LFP Chemistry Tier'
    ),
    imageFileName: 'ev_battery_retention_seaborn.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'ev_analysis_pipeline.ipynb',
    dashboardFileType: '.ipynb',
    externalLink: 'https://github.com/aarav-data/ev-battery-degradation-engiviz',
    keyInsights: [
      'Vehicles utilizing Lithium Iron Phosphate (LFP) chemistry maintained 88.4% nominal capacity after 150,000 miles, outperforming NMC packs by 7.2% under frequent DC fast charging.',
      'DC fast charging rates exceeding 180 kW induce thermal stress that accelerates capacity loss only when state-of-charge (SoC) exceeds 75%.',
      'Median real-world range expanded from 115 miles in 2014 to 312 miles in 2024, exhibiting an 11.2% compound annual improvement.'
    ],
    pythonCode: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

# Engineering Day Hackathon Submission
df = pd.read_csv("electric_vehicles.csv")

# Filter top chemistries & compute degradation index
sns.set_theme(style="whitegrid", palette="tab10")
plt.figure(figsize=(12, 6.5), dpi=200)

g = sns.lineplot(
    data=df,
    x="Odometer_Miles",
    y="Capacity_Retention_Pct",
    hue="Battery_Chemistry",
    style="Fast_Charging_Frequency",
    linewidth=2.8
)

plt.axvline(x=100000, color="#ef4444", linestyle="--", label="100k Mi Warranty Mark")
plt.title("EV Battery Capacity Degradation Curve: Impact of High-Power DC Fast Charging", fontsize=14, fontweight="bold")
plt.xlabel("Cumulative Mileage Traveled (Miles)", fontsize=11)
plt.ylabel("Battery Usable Capacity Retention (%)", fontsize=11)
plt.ylim(70, 102)
plt.legend(frameon=True, facecolor="white", loc="lower left")
plt.tight_layout()
plt.savefig("ev_battery_retention_seaborn.png", dpi=300)
plt.show()`,
    methodology: 'Normalized battery degradation against odometer readings across 12,000 BEVs using robust Seaborn regression fits with 95% confidence intervals.',
    submittedAt: '2026-09-07 09:30 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-01',
        judgeName: 'Dr. Vikram Malhotra',
        judgeRole: 'Head of Dept (Computer Engineering)',
        insightScore: 24,
        visualDesignScore: 25,
        technicalScore: 24,
        storytellingScore: 24,
        totalScore: 97,
        comments: 'Outstanding rigor in isolating LFP vs NMC chemistry degradation! The Seaborn line confidence bands and dual subplots are publication ready.',
        specialAwards: ['Best Python Code', 'Top Insight'],
        ratedAt: '2026-09-07 10:15 AM'
      },
      {
        judgeId: 'j-02',
        judgeName: 'Dr. Anita Joshi',
        judgeRole: 'Associate Professor & Data Science Chair',
        insightScore: 23,
        visualDesignScore: 24,
        technicalScore: 25,
        storytellingScore: 23,
        totalScore: 95,
        comments: 'Excellent Python implementation. The color palette choices prevent cognitive overload and the annotations clarify key thresholds.',
        specialAwards: ['Seaborn Statistical Excellence'],
        ratedAt: '2026-09-07 10:45 AM'
      }
    ],
    averageScore: 96,
    rank: 1,
    specialBadges: ['Best Python Code', '1st Place Contender']
  },
  {
    id: 'sub-002',
    userId: 'user-002',
    title: 'The Placement Crucible: Predictive CTC Drivers in Engineering',
    studentName: 'Kavya Krishnan & Rohan Verma',
    teamMembers: ['Kavya Krishnan (IT 4th Yr)', 'Rohan Verma (ECE 4th Yr)'],
    collegeRollNo: 'ENG-2022-IT018',
    department: 'Information Technology',
    yearOfStudy: '4th Year',
    datasetId: 'engineering-placements',
    datasetTitle: 'Engineering Campus Placements & Package Predictor',
    track: 'python',
    pythonLibraries: ['matplotlib', 'seaborn'],
    imageUrl: generateChartDataUri(
      'Engineering Placement CTC Elasticity & Coding Percentiles',
      'matplotlib',
      '#6366f1',
      '3.4x Salary Multiplier',
      '2+ Hackathon Wins Threshold'
    ),
    imageFileName: 'placement_elasticity_matplotlib.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'campus_placement_script.py',
    dashboardFileType: '.py',
    externalLink: 'https://github.com/kavya-k/engi-placement-viz',
    keyInsights: [
      'Students with 2 or more hackathon wins commanded an average 3.4x higher CTC package regardless of branch background compared to non-participants.',
      'Coding assessment score above the 88th percentile neutralized the GPA barrier, enabling students with <7.5 CGPA to secure Marquee offers (>16 LPA).',
      'Non-CS branches (Mechanical, Civil) saw their highest placement convergence in automation and cloud infrastructure roles.'
    ],
    pythonCode: `import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

df = pd.read_csv("engineering_placement_data.csv")
placed = df[df["Placement_Status"] == "Placed"]

fig, ax = plt.subplots(figsize=(11, 6), dpi=200, facecolor="#0f172a")
ax.set_facecolor("#0f172a")

scatter = ax.scatter(
    placed["Coding_Score"],
    placed["Salary_LPA"],
    c=placed["Hackathons_Won"],
    cmap="plasma",
    s=placed["CGPA"]**2.2,
    alpha=0.85,
    edgecolor="none"
)

# Custom colorbar & labels
cbar = plt.colorbar(scatter, ax=ax)
cbar.set_label("Hackathons Won", color="#f8fafc")
cbar.ax.yaxis.set_tick_params(color="#f8fafc")
plt.setp(plt.getp(cbar.ax.axes, 'yticklabels'), color="#f8fafc")

ax.set_title("Engineering Placements: Coding Mastery & Hackathon Leverage on Salary (LPA)", color="#f8fafc", fontsize=13, fontweight="bold")
ax.set_xlabel("DSA Coding Percentile", color="#cbd5e1", fontsize=11)
ax.set_ylabel("Annual Salary Package (LPA)", color="#cbd5e1", fontsize=11)
ax.tick_params(colors="#94a3b8")
plt.grid(color="#334155", linestyle=":", alpha=0.6)
plt.savefig("placement_elasticity_matplotlib.png", dpi=300, facecolor=fig.get_facecolor())
plt.show()`,
    methodology: 'Applied multi-variate bubble plotting in Matplotlib with point-size tied to CGPA and color hue tied to hackathon victories.',
    submittedAt: '2026-09-07 09:48 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-01',
        judgeName: 'Dr. Vikram Malhotra',
        judgeRole: 'Head of Dept (Computer Engineering)',
        insightScore: 24,
        visualDesignScore: 23,
        technicalScore: 23,
        storytellingScore: 24,
        totalScore: 94,
        comments: 'Very pertinent topic for Engineering Day! Clear correlation demonstrating that hands-on practical hackathon grit trumps raw theory.',
        specialAwards: ['Best Analytical Rigor'],
        ratedAt: '2026-09-07 10:20 AM'
      },
      {
        judgeId: 'j-03',
        judgeName: 'Tanvi Shah',
        judgeRole: 'Lead BI Architect @ CloudScale Solutions',
        insightScore: 23,
        visualDesignScore: 24,
        technicalScore: 24,
        storytellingScore: 23,
        totalScore: 94,
        comments: 'Loved the dark mode palette in Matplotlib. The sizing of bubbles according to CGPA made the visual immediately interpretable.',
        specialAwards: ['Best Matplotlib Art'],
        ratedAt: '2026-09-07 11:00 AM'
      }
    ],
    averageScore: 94,
    rank: 2,
    specialBadges: ['2nd Place Contender', 'Best Matplotlib Art']
  },
  {
    id: 'sub-003',
    userId: 'user-003',
    title: 'Grid Decarbonization: Curtailment & Duck Curve BESS Optimization',
    studentName: 'Devansh Kulkarni',
    teamMembers: ['Devansh Kulkarni (Electrical Eng 4th Yr)'],
    collegeRollNo: 'ENG-2022-EE007',
    department: 'Electrical Engineering',
    yearOfStudy: '4th Year',
    datasetId: 'renewable-energy-grid',
    datasetTitle: 'Global Renewable Energy Transition & Grid Storage',
    track: 'interactive',
    interactiveTool: 'powerbi',
    imageUrl: generateChartDataUri(
      'Power BI Smart Grid Renewable Curtailment Executive Suite',
      'powerbi',
      '#f59e0b',
      '4.2 GW Battery Arbitrage',
      '94% Carbon Reduction Peak'
    ),
    imageFileName: 'powerbi_smart_grid_dashboard.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'SmartGrid_Curtailment_BESS.pbix',
    dashboardFileType: '.pbix',
    externalLink: 'https://app.powerbi.com/view?r=eyJrIjoiZW5naXZpei1zbWFydC1ncmlkLTIwMjYifQ',
    keyInsights: [
      'Midday solar over-generation caused up to 1.8 GW of clean energy curtailment between 11:00 AM and 2:00 PM without battery storage.',
      'Deploying a 4.2 GWh BESS system shifts 86% of curtailed solar directly into the 7:00 PM evening peak, shaving expensive peaker-gas usage.',
      'Grid carbon intensity drops from 280 gCO2/kWh to 42 gCO2/kWh when wind output aligns with nocturnal hydro storage pump cycles.'
    ],
    pythonCode: `# Data cleaning & aggregation step performed before loading into Power BI
import pandas as pd
df = pd.read_csv("grid_generation_hourly.csv")
df["Net_Curtailment_Loss"] = df["Curtailed_Energy_MW"] * 48.5 # Market spot price
df.to_parquet("powerbi_feed_grid.parquet")`,
    methodology: 'Constructed an enterprise Power BI report with dynamic DAX measures for battery state-of-charge, cross-filtering, and what-if parameter sliders.',
    submittedAt: '2026-09-07 10:05 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-03',
        judgeName: 'Tanvi Shah',
        judgeRole: 'Lead BI Architect @ CloudScale Solutions',
        insightScore: 24,
        visualDesignScore: 24,
        technicalScore: 23,
        storytellingScore: 23,
        totalScore: 94,
        comments: 'Superb Power BI data modeling! The interactive what-if parameters for battery pack sizing give judges immediate exploratory power.',
        specialAwards: ['Power BI Masterpiece'],
        ratedAt: '2026-09-07 11:15 AM'
      },
      {
        judgeId: 'j-02',
        judgeName: 'Dr. Anita Joshi',
        judgeRole: 'Associate Professor & Data Science Chair',
        insightScore: 22,
        visualDesignScore: 24,
        technicalScore: 23,
        storytellingScore: 22,
        totalScore: 91,
        comments: 'A clean executive dashboard with brilliant electrical engineering domain context.',
        specialAwards: [],
        ratedAt: '2026-09-07 11:30 AM'
      }
    ],
    averageScore: 92.5,
    rank: 3,
    specialBadges: ['3rd Place Contender', 'Power BI Masterpiece']
  },
  {
    id: 'sub-004',
    userId: 'user-004',
    title: 'Orbit Economics: SpaceX Falcon 9 Reusability vs Legacy Launchers',
    studentName: 'Siddharth Rao & Priya Nair',
    teamMembers: ['Siddharth Rao (Aerospace 3rd Yr)', 'Priya Nair (Mechanical 3rd Yr)'],
    collegeRollNo: 'ENG-2023-AE015',
    department: 'Aerospace Engineering',
    yearOfStudy: '3rd Year',
    datasetId: 'space-missions-analytics',
    datasetTitle: 'Space Missions & Aerospace Launch Reliability',
    track: 'python',
    pythonLibraries: ['plotly', 'seaborn'],
    imageUrl: generateChartDataUri(
      'Plotly Reusable Rocket Cost Per Kg to LEO Orbit',
      'plotly',
      '#38bdf8',
      '-76% Cost / kg to LEO',
      '99.2% Booster Landing Rate'
    ),
    imageFileName: 'orbit_economics_plotly.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'space_launch_economics.html',
    dashboardFileType: '.html',
    externalLink: 'https://github.com/siddharth-aero/plotly-space-missions',
    keyInsights: [
      'First-stage booster reusability reduced launch cost per kg to Low Earth Orbit (LEO) from $18,500/kg (Space Shuttle era) to under $1,400/kg (Falcon 9).',
      'Commercial satellite deployments expanded by 420% between 2018 and 2023 driven by Starlink and OneWeb mega-constellation cadence.',
      'Indian space agency ISRO demonstrated the highest cost-efficiency ratio for lunar and interplanetary insertion missions ($45M Chandrayaan-3 vs $200M+ international counterparts).'
    ],
    pythonCode: `import plotly.express as px
import pandas as pd

df = pd.read_csv("space_missions.csv")
fig = px.scatter(
    df,
    x="Launch_Year",
    y="Price_Per_Kg_LEO",
    color="Company",
    size="Payload_Mass_Kg",
    hover_name="Rocket_Name",
    log_y=True,
    title="Space Flight Disruption: Cost per Kilogram to LEO (Logarithmic Scale 1960-2024)",
    template="plotly_dark"
)
fig.update_layout(height=600)
fig.write_html("space_launch_economics.html")`,
    methodology: 'Constructed an interactive logarithmic regression timeline in Plotly with hover annotations displaying rocket specs, booster flight numbers, and payload customer.',
    submittedAt: '2026-09-07 10:15 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-01',
        judgeName: 'Dr. Vikram Malhotra',
        judgeRole: 'Head of Dept (Computer Engineering)',
        insightScore: 23,
        visualDesignScore: 23,
        technicalScore: 24,
        storytellingScore: 22,
        totalScore: 92,
        comments: 'Plotly log-scale visualization makes the cost drop visceral. The interactive hover tools are silky smooth.',
        specialAwards: ['Plotly Interactive Genius'],
        ratedAt: '2026-09-07 11:20 AM'
      },
      {
        judgeId: 'j-03',
        judgeName: 'Tanvi Shah',
        judgeRole: 'Lead BI Architect @ CloudScale Solutions',
        insightScore: 22,
        visualDesignScore: 23,
        technicalScore: 23,
        storytellingScore: 22,
        totalScore: 90,
        comments: 'Engaging storytelling on the aerospace transition. Very clean code structure.',
        specialAwards: [],
        ratedAt: '2026-09-07 11:40 AM'
      }
    ],
    averageScore: 91,
    rank: 4,
    specialBadges: ['Plotly Interactive Genius']
  },
  {
    id: 'sub-005',
    userId: 'user-005',
    title: 'Urban IoT Smog Sentinel: Traffic Microclimate & Particulate Spikes',
    studentName: 'Meera Chawla',
    teamMembers: ['Meera Chawla (Civil & Environmental 4th Yr)'],
    collegeRollNo: 'ENG-2022-CE031',
    department: 'Civil & Environmental',
    yearOfStudy: '4th Year',
    datasetId: 'iot-smart-city-air',
    datasetTitle: 'Smart City Urban IoT & Air Quality Telemetry',
    track: 'interactive',
    interactiveTool: 'tableau',
    imageUrl: generateChartDataUri(
      'Tableau Public Live Urban Air Sensor Geospatial Hub',
      'tableau',
      '#ec4899',
      '78 min Peak Lag',
      'PM2.5 to Traffic Congestion'
    ),
    imageFileName: 'tableau_smog_sentinel.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'Urban_IoT_Air_Sentinel.twbx',
    dashboardFileType: '.twbx',
    externalLink: 'https://public.tableau.com/app/profile/meera.chawla/viz/UrbanSmogSentinel2026',
    keyInsights: [
      'Peak PM2.5 levels lag morning rush-hour traffic index by exactly 78 minutes due to boundary layer stagnation and secondary photochemical formation.',
      'Sensor nodes in urban green corridors registered 34% lower NO2 concentrations during peak traffic compared to parallel concrete arterial avenues.',
      'Wind speeds exceeding 2.8 m/s reduced localized particle concentration by 62% within 15 minutes.'
    ],
    pythonCode: `# Pre-processing Python script for geospatial sensor coordinates
import pandas as pd
raw_iot = pd.read_csv("iot_smart_city_air.csv")
raw_iot["AQI_Category"] = pd.cut(raw_iot["PM2_5"], bins=[0, 12, 35.4, 55.4, 150, 500], labels=["Good", "Moderate", "Unhealthy Sensitive", "Unhealthy", "Hazardous"])
raw_iot.to_csv("tableau_cleaned_iot.csv", index=False)`,
    methodology: 'Published an interactive Tableau Public dashboard featuring dual synchronized maps, density heat layers, and dynamic time-slider animations.',
    submittedAt: '2026-09-07 10:30 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-02',
        judgeName: 'Dr. Anita Joshi',
        judgeRole: 'Associate Professor & Data Science Chair',
        insightScore: 23,
        visualDesignScore: 23,
        technicalScore: 22,
        storytellingScore: 22,
        totalScore: 90,
        comments: 'The Tableau Public interface is intuitive. The 78-minute lag analysis provides actionable urban planning value.',
        specialAwards: ['Tableau Storyteller'],
        ratedAt: '2026-09-07 11:45 AM'
      },
      {
        judgeId: 'j-01',
        judgeName: 'Dr. Vikram Malhotra',
        judgeRole: 'Head of Dept (Computer Engineering)',
        insightScore: 21,
        visualDesignScore: 23,
        technicalScore: 22,
        storytellingScore: 23,
        totalScore: 89,
        comments: 'Great cross-disciplinary collaboration between civil engineering and data science.',
        specialAwards: [],
        ratedAt: '2026-09-07 11:55 AM'
      }
    ],
    averageScore: 89.5,
    rank: 5,
    specialBadges: ['Tableau Storyteller']
  },
  {
    id: 'sub-006',
    title: 'Predicting EV Resale Value Depletion using Multivariable Regression',
    studentName: 'Harsh Vardhan',
    teamMembers: ['Harsh Vardhan (Mechanical Eng 3rd Yr)'],
    collegeRollNo: 'ENG-2023-ME029',
    department: 'Mechanical Engineering',
    yearOfStudy: '3rd Year',
    datasetId: 'ev-battery-specs',
    datasetTitle: 'Electric Vehicle Population & Battery Degradation',
    track: 'python',
    pythonLibraries: ['matplotlib', 'seaborn'],
    imageUrl: generateChartDataUri(
      'Matplotlib Residuals & EV Resale Depreciation Curves',
      'matplotlib',
      '#06b6d4',
      '42% Retained Value',
      '5-Year BEV Benchmark'
    ),
    imageFileName: 'ev_resale_depreciation_matplotlib.png',
    dashboardFileUrl: '#',
    dashboardFileName: 'ev_depreciation_model.py',
    dashboardFileType: '.py',
    externalLink: 'https://github.com/harsh-me/ev-resale-viz',
    keyInsights: [
      'BEVs with active liquid cooling retained 42% resale value after 5 years, compared to just 26% for passive air-cooled battery packs.',
      'EPA certified range above 250 miles acts as the critical threshold for secondary market buyer confidence.'
    ],
    pythonCode: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.read_csv("electric_vehicles.csv")
plt.style.use("tableau-colorblind10")
fig, ax = plt.subplots(figsize=(10, 5), dpi=150)
sns.boxplot(data=df, x="Model_Year", y="Base_MSRP", hue="Thermal_Management_Type", ax=ax)
ax.set_title("EV Secondary Valuation vs Thermal Pack Engineering")
plt.tight_layout()
plt.show()`,
    methodology: 'Investigated mechanical cooling architectures on retained asset value using Seaborn boxplots with statistical outlier identification.',
    submittedAt: '2026-09-07 10:45 AM',
    status: 'scored',
    scores: [
      {
        judgeId: 'j-01',
        judgeName: 'Dr. Vikram Malhotra',
        judgeRole: 'Head of Dept (Computer Engineering)',
        insightScore: 21,
        visualDesignScore: 21,
        technicalScore: 22,
        storytellingScore: 22,
        totalScore: 86,
        comments: 'Good mechanical domain insight. Clear charts with clean legends.',
        specialAwards: [],
        ratedAt: '2026-09-07 12:05 PM'
      }
    ],
    averageScore: 86,
    rank: 6,
    specialBadges: []
  }
];

export const PRIZES: PrizeItem[] = [
  {
    rank: '1st Place',
    title: 'Grand Champion Trophy',
    reward: '₹25,000 Cash + Gold Cup + Cloud GPU Credits',
    trophy: '🥇',
    description: 'Awarded to the most comprehensive data discovery blending rigorous statistical depth with publication-grade design.',
    color: 'from-amber-500/20 to-yellow-500/5 border-amber-500/40 text-amber-300',
    icon: 'Trophy'
  },
  {
    rank: '2nd Place',
    title: 'First Runner-Up',
    reward: '₹15,000 Cash + Silver Plaque + DataCamp Premium',
    trophy: '🥈',
    description: 'Recognizing superior technical execution, clear explanatory visuals, and robust data integrity.',
    color: 'from-slate-400/20 to-slate-500/5 border-slate-400/40 text-slate-200',
    icon: 'Medal'
  },
  {
    rank: '3rd Place',
    title: 'Second Runner-Up',
    reward: '₹10,000 Cash + Bronze Plaque + Tech Swag Pack',
    trophy: '🥉',
    description: 'Honoring innovative data modeling and impactful communication of engineering trends.',
    color: 'from-amber-700/20 to-amber-800/5 border-amber-700/40 text-amber-400',
    icon: 'Award'
  },
  {
    rank: 'Special Prize',
    title: 'Best Python Visualization Award',
    reward: '₹5,000 Cash + JetBrains All Products License',
    trophy: '🐍',
    description: 'Dedicated honor for mastering Python visual ecosystems: Matplotlib fine control, Seaborn statistical styling, or Plotly responsiveness.',
    color: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/40 text-emerald-300',
    icon: 'Code'
  },
  {
    rank: 'Special Prize',
    title: 'Creative Interactive Dashboard Award',
    reward: '₹5,000 Cash + Microsoft / Tableau Cert Voucher',
    trophy: '📊',
    description: 'Best executive dashboard design utilizing Power BI, Tableau, or Streamlit with user-centric interaction.',
    color: 'from-cyan-500/20 to-blue-500/5 border-cyan-500/40 text-cyan-300',
    icon: 'BarChart3'
  }
];
