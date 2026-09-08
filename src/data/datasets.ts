import { Dataset } from '../types';

export const KAGGLE_DATASETS: Dataset[] = [
  {
    id: 'ev-battery-specs',
    title: 'Electric Vehicle Population & Battery Degradation',
    category: 'CleanTech & Automotive',
    kaggleSlug: 'gezaebs/electric-vehicle-population-data',
    kaggleUrl: 'https://www.kaggle.com/datasets/gezaebs/electric-vehicle-population-data',
    description: 'Real-world data tracking battery chemistry, electric range (EPA), charging speeds, model years, and state-wide EV adoption rates across 170,000+ vehicles.',
    recordCount: '177,800 records',
    fileSize: '14.2 MB',
    badgeColor: 'emerald',
    iconName: 'Zap',
    columns: [
      { name: 'VIN (1-10)', type: 'string', desc: 'The first 10 characters of the Vehicle Identification Number' },
      { name: 'County', type: 'string', desc: 'The geographic region of a state where the vehicle\'s owner is listed to reside' },
      { name: 'City', type: 'string', desc: 'The city in which the registered owner resides' },
      { name: 'State', type: 'string', desc: 'The geographic region of the country associated with the record' },
      { name: 'Postal Code', type: 'integer', desc: 'The 5-digit zip code where the registered owner resides' },
      { name: 'Model Year', type: 'integer', desc: 'The manufacturing year of the vehicle' },
      { name: 'Make', type: 'string', desc: 'The manufacturer or brand of the vehicle' },
      { name: 'Model', type: 'string', desc: 'The specific model of the vehicle' },
      { name: 'Electric Vehicle Type', type: 'string', desc: 'Indicates whether the vehicle is a Battery Electric Vehicle (BEV) or a Plug-in Hybrid Electric Vehicle (PHEV)' },
      { name: 'Clean Alternative Fuel Vehicle (CAFV) Eligibility', type: 'string', desc: 'Text describing the vehicle\'s eligibility for CAFV incentives' },
      { name: 'Electric Range', type: 'integer', desc: 'The electric range of the vehicle in miles' },
      { name: 'Base MSRP', type: 'integer', desc: 'The Manufacturer\'s Suggested Retail Price of the vehicle' },
      { name: 'Legislative District', type: 'integer', desc: 'The legislative district associated with the vehicle\'s registration' },
      { name: 'DOL Vehicle ID', type: 'integer', desc: 'A unique identifier for the vehicle from the Department of Licensing' },
      { name: 'Vehicle Location', type: 'string', desc: 'The precise location or address of the vehicle (POINT geometry)' },
      { name: 'Electric Utility', type: 'string', desc: 'The electric utility company that services the vehicles' },
      { name: '2020 Census Tract', type: 'integer', desc: 'The 2020 Census Tract associated with the vehicle\'s location' }
    ],
    sampleRows: [
      { 'VIN (1-10)': '5YJ3E1EB4K', 'County': 'King', 'City': 'Seattle', 'State': 'WA', 'Postal Code': 98115, 'Model Year': 2019, 'Make': 'TESLA', 'Model': 'MODEL 3', 'Electric Vehicle Type': 'Battery Electric Vehicle (BEV)', 'Clean Alternative Fuel Vehicle (CAFV) Eligibility': 'Clean Alternative Fuel Vehicle Eligible', 'Electric Range': 220, 'Base MSRP': 0, 'Legislative District': 46, 'DOL Vehicle ID': 255476329, 'Vehicle Location': 'POINT (-122.3185 47.67949)', 'Electric Utility': 'CITY OF SEATTLE - (WA)|CITY OF TACOMA - (WA)', '2020 Census Tract': 53033004301 },
      { 'VIN (1-10)': '1N4AZ0CP8D', 'County': 'Snohomish', 'City': 'Bothell', 'State': 'WA', 'Postal Code': 98021, 'Model Year': 2013, 'Make': 'NISSAN', 'Model': 'LEAF', 'Electric Vehicle Type': 'Battery Electric Vehicle (BEV)', 'Clean Alternative Fuel Vehicle (CAFV) Eligibility': 'Clean Alternative Fuel Vehicle Eligible', 'Electric Range': 75, 'Base MSRP': 0, 'Legislative District': 1, 'DOL Vehicle ID': 187654321, 'Vehicle Location': 'POINT (-122.18384 47.8031)', 'Electric Utility': 'PUGET SOUND ENERGY INC', '2020 Census Tract': 53061051918 }
    ],
    suggestedQuestions: [
      'How has median electric range evolved from 2012 to 2024 across BEVs vs PHEVs?',
      'Which manufacturers deliver the highest battery efficiency (Miles per kWh of capacity)?',
      'Is there a diminishing return in fast-charging speeds above 80 kWh battery capacity?'
    ],
    pythonStarters: [
      {
        library: 'matplotlib',
        title: 'Multi-Panel Range Distribution by Year',
        description: 'Clean publication-ready dual subplot showing range progression and manufacturer breakdown.',
        code: `import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.ticker as ticker

# Load Kaggle dataset
df = pd.read_csv("electric_vehicles.csv")

# Setup styling
plt.style.use("seaborn-v0_8-whitegrid")
fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(14, 5.5), dpi=150)
fig.suptitle("EV Market Evolution: Range & Market Share", fontsize=16, fontweight="bold", y=0.98)

# Panel 1: Median Range Over Time
yearly_range = df.groupby("Model_Year")["Electric_Range"].median().reset_index()
ax1.plot(yearly_range["Model_Year"], yearly_range["Electric_Range"], marker="o", color="#3b82f6", linewidth=2.5, label="Median EPA Range")
ax1.fill_between(yearly_range["Model_Year"], yearly_range["Electric_Range"]*0.8, yearly_range["Electric_Range"]*1.2, alpha=0.15, color="#3b82f6")
ax1.set_title("Progression of Median Range (2012 - 2024)", fontsize=12, fontweight="semibold")
ax1.set_xlabel("Model Year", fontsize=11)
ax1.set_ylabel("Electric Range (Miles)", fontsize=11)
ax1.yaxis.set_major_formatter(ticker.StrMethodFormatter('{x:,.0f} mi'))
ax1.legend(loc="upper left", frameon=True)

# Panel 2: Top 5 EV Makers
top_makes = df["Make"].value_counts().head(5)
colors = ["#10b981", "#6366f1", "#f59e0b", "#06b6d4", "#ec4899"]
bars = ax2.barh(top_makes.index, top_makes.values, color=colors, edgecolor="none", height=0.6)
ax2.invert_yaxis()
ax2.set_title("Top 5 Manufacturers Registered", fontsize=12, fontweight="semibold")
ax2.set_xlabel("Number of Registered Vehicles", fontsize=11)
for bar in bars:
    ax2.text(bar.get_width() + 500, bar.get_y() + bar.get_height()/2, f"{int(bar.get_width()):,}", va="center", fontsize=9, fontweight="bold")

plt.tight_layout()
plt.savefig("ev_insights_matplotlib.png", dpi=300, bbox_inches="tight")
plt.show()`
      },
      {
        library: 'seaborn',
        title: 'Seaborn Violin & Box Plot on Battery Capacity',
        description: 'Advanced statistical distribution across EV types and top manufacturers with custom palette.',
        code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("electric_vehicles.csv")
top_makes = df[df["Make"].isin(["Tesla", "Nissan", "Hyundai", "Chevrolet", "Ford"])]

sns.set_theme(style="darkgrid", font="sans-serif")
plt.figure(figsize=(12, 6), dpi=150)

# Violin plot with inner box representation
ax = sns.violinplot(
    data=top_makes,
    x="Make",
    y="Electric_Range",
    hue="Electric_Vehicle_Type",
    split=True,
    inner="quart",
    palette={"BEV": "#22c55e", "PHEV": "#0ea5e9"},
    cut=0
)

plt.title("Statistical Dispersion of Electric Range by Manufacturer & Powertrain", fontsize=14, fontweight="bold", pad=15)
plt.xlabel("Automotive Manufacturer", fontsize=12, labelpad=10)
plt.ylabel("EPA Certified Range (Miles)", fontsize=12)
plt.legend(title="Powertrain Architecture", loc="upper right")
plt.savefig("ev_seaborn_violin.png", dpi=300, bbox_inches="tight")
plt.show()`
      },
      {
        library: 'plotly',
        title: 'Plotly Interactive 3D Scatter & Hover Inspector',
        description: '3D interactive visualization plotting Price vs. Range vs. Battery kWh with rich tooltips.',
        code: `import plotly.express as px
import pandas as pd

df = pd.read_csv("electric_vehicles.csv")
df_filtered = df[(df["Base_MSRP"] > 20000) & (df["Electric_Range"] > 50)].dropna()

fig = px.scatter(
    df_filtered,
    x="Battery_KWh",
    y="Electric_Range",
    color="Make",
    size="Fast_Charge_KW",
    hover_name="Model",
    hover_data=["Model_Year", "Base_MSRP", "Electric_Vehicle_Type"],
    title="Interactive EV Efficiency: Battery Size (kWh) vs EPA Range (Miles)",
    labels={"Battery_KWh": "Battery Usable Capacity (kWh)", "Electric_Range": "EPA Range (Miles)"},
    template="plotly_dark",
    color_discrete_sequence=px.colors.qualitative.Prism
)

fig.update_layout(
    font=dict(family="Plus Jakarta Sans, sans-serif"),
    legend=dict(orientation="h", y=-0.2),
    margin=dict(l=40, r=40, t=60, b=60)
)
# Save interactive HTML or export static image
fig.write_html("ev_interactive_plotly.html")
fig.show()`
      }
    ]
  },
  {
    id: 'engineering-placements',
    title: 'Engineering Campus Placements & Package Predictor',
    category: 'Higher Education & Career Analytics',
    kaggleSlug: 'benroshan/factors-affecting-campus-placement',
    kaggleUrl: 'https://www.kaggle.com/datasets/benroshan/factors-affecting-campus-placement',
    description: 'Detailed student cohort dataset measuring engineering GPA (CGPA), coding test scores, branch of engineering, hackathon wins, internship counts, and final salary packages (CTC).',
    recordCount: '21,500 records',
    fileSize: '4.8 MB',
    badgeColor: 'indigo',
    iconName: 'GraduationCap',
    columns: [
      { name: 'sl_no', type: 'integer', desc: 'Serial number assigned to each entry' },
      { name: 'gender', type: 'string', desc: 'Gender of the student (M/F)' },
      { name: 'ssc_p', type: 'float', desc: 'Percentage in secondary education (10th Grade)' },
      { name: 'ssc_b', type: 'string', desc: 'Board of education for secondary school (Central/Others)' },
      { name: 'hsc_p', type: 'float', desc: 'Percentage in higher secondary education (12th Grade)' },
      { name: 'hsc_b', type: 'string', desc: 'Board of education for higher secondary school (Central/Others)' },
      { name: 'hsc_s', type: 'string', desc: 'Specialization in higher secondary education (Commerce/Science/Arts)' },
      { name: 'degree_p', type: 'float', desc: 'Undergraduate degree percentage' },
      { name: 'degree_t', type: 'string', desc: 'Type of undergraduate degree (Comm&Mgmt/Sci&Tech/Others)' },
      { name: 'workex', type: 'string', desc: 'Work experience (Yes/No)' },
      { name: 'etest_p', type: 'float', desc: 'Employability test percentage' },
      { name: 'specialisation', type: 'string', desc: 'MBA specialization (Mkt&Fin/Mkt&HR)' },
      { name: 'mba_p', type: 'float', desc: 'MBA percentage' },
      { name: 'status', type: 'string', desc: 'Placement status (Placed/Not Placed)' },
      { name: 'salary', type: 'float', desc: 'Salary offered after placement' }
    ],
    sampleRows: [
      { 'sl_no': 1, 'gender': 'M', 'ssc_p': 67.0, 'ssc_b': 'Others', 'hsc_p': 91.0, 'hsc_b': 'Others', 'hsc_s': 'Commerce', 'degree_p': 58.0, 'degree_t': 'Sci&Tech', 'workex': 'No', 'etest_p': 55.0, 'specialisation': 'Mkt&HR', 'mba_p': 58.8, 'status': 'Placed', 'salary': 270000.0 },
      { 'sl_no': 2, 'gender': 'M', 'ssc_p': 79.33, 'ssc_b': 'Central', 'hsc_p': 78.33, 'hsc_b': 'Others', 'hsc_s': 'Science', 'degree_p': 77.48, 'degree_t': 'Sci&Tech', 'workex': 'Yes', 'etest_p': 86.5, 'specialisation': 'Mkt&Fin', 'mba_p': 66.28, 'status': 'Placed', 'salary': 200000.0 },
      { 'sl_no': 3, 'gender': 'M', 'ssc_p': 65.0, 'ssc_b': 'Central', 'hsc_p': 68.0, 'hsc_b': 'Central', 'hsc_s': 'Arts', 'degree_p': 64.0, 'degree_t': 'Comm&Mgmt', 'workex': 'No', 'etest_p': 75.0, 'specialisation': 'Mkt&Fin', 'mba_p': 57.8, 'status': 'Placed', 'salary': 250000.0 }
    ],
    suggestedQuestions: [
      'What weighs more for tier-1 salary packages (>15 LPA): high CGPA or coding test percentiles?',
      'How does hackathon participation multiply the salary prospects across non-CS branches?',
      'What is the threshold score where placement probability transitions above 90%?'
    ],
    pythonStarters: [
      {
        library: 'seaborn',
        title: 'Seaborn Regression & Multi-Branch Facet Grid',
        description: 'Explore correlation between Coding Test Percentile, CGPA and Final Salary offer.',
        code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("engineering_placement_data.csv")
placed_df = df[df["Placement_Status"] == "Placed"]

sns.set_theme(style="white", palette="muted")
g = sns.lmplot(
    data=placed_df,
    x="Coding_Score",
    y="Salary_LPA",
    hue="Branch",
    col="Branch",
    col_wrap=3,
    height=3.5,
    aspect=1.2,
    scatter_kws={"alpha": 0.6, "s": 35},
    line_kws={"linewidth": 2}
)

g.fig.subplots_adjust(top=0.88)
g.fig.suptitle("Campus Engineering Placements: Coding Assessment vs CTC Package", fontsize=14, fontweight="bold")
g.set_axis_labels("Coding Assessment Score (0-100)", "Salary Package (LPA)")
plt.savefig("placement_seaborn_facet.png", dpi=300, bbox_inches="tight")
plt.show()`
      },
      {
        library: 'matplotlib',
        title: 'Correlation Heatmap & Placement Probabilities',
        description: 'Matrix of feature correlations with custom diverging colormap and annotations.',
        code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

df = pd.read_csv("engineering_placement_data.csv")
numeric_cols = ["CGPA", "Coding_Score", "Internships", "Hackathons_Won", "Salary_LPA"]
corr = df[numeric_cols].corr()

fig, ax = plt.subplots(figsize=(8, 6), dpi=150)
cax = ax.matshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
fig.colorbar(cax, fraction=0.046, pad=0.04)

ax.set_xticks(range(len(numeric_cols)))
ax.set_yticks(range(len(numeric_cols)))
ax.set_xticklabels(numeric_cols, rotation=35, ha="left", fontsize=10)
ax.set_yticklabels(numeric_cols, fontsize=10)

# Annotate correlation numbers
for i in range(len(numeric_cols)):
    for j in range(len(numeric_cols)):
        val = corr.iloc[i, j]
        color = "white" if abs(val) > 0.5 else "black"
        ax.text(j, i, f"{val:.2f}", ha="center", va="center", color=color, fontweight="bold")

plt.title("Correlation Matrix: Factors Driving Engineering Placements", fontsize=13, fontweight="bold", pad=20)
plt.tight_layout()
plt.savefig("placement_correlation_heatmap.png", dpi=300)
plt.show()`
      },
      {
        library: 'plotly',
        title: 'Plotly Interactive Sankey Diagram of Student Career Pathways',
        description: 'Track flows from engineering branches to salary tiers (<6L, 6-12L, >12L, Super Dream).',
        code: `import plotly.graph_objects as go
import pandas as pd

# Sankey diagram connecting Branch -> Hackathons -> Salary Tiers
labels = ["CSE", "AI-DS", "ECE", "Mech", "0-1 Hackathons", "2+ Hackathons", "Core Tier (<8 LPA)", "Dream Tier (8-16 LPA)", "Marquee Tier (>16 LPA)"]

fig = go.Figure(data=[go.Sankey(
    node=dict(
        pad=15,
        thickness=20,
        line=dict(color="black", width=0.5),
        label=labels,
        color=["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#64748b", "#10b981", "#f97316", "#06b6d4", "#a855f7"]
    ),
    link=dict(
        source=[0, 0, 1, 1, 2, 3, 4, 4, 5, 5],
        target=[4, 5, 4, 5, 4, 4, 6, 7, 7, 8],
        value=[30, 70, 20, 80, 50, 60, 80, 40, 50, 90]
    )
)])

fig.update_layout(
    title_text="Engineering Cohort Flow: Branch to Placement Tiers",
    font_size=12,
    template="plotly_white"
)
fig.show()`
      }
    ]
  },
  {
    id: 'renewable-energy-grid',
    title: 'Global Renewable Energy Transition & Grid Storage',
    category: 'Energy Engineering & Sustainability',
    kaggleSlug: 'belayeth/renewable-energy-world-data',
    kaggleUrl: 'https://www.kaggle.com/datasets/belayeth/renewable-energy-world-data',
    description: 'Hourly smart-grid power dispatch logs recording solar photovoltaic, offshore/onshore wind, battery energy storage systems (BESS), and carbon reduction metrics.',
    recordCount: '87,600 hourly timestamps',
    fileSize: '9.3 MB',
    badgeColor: 'amber',
    iconName: 'Sun',
    columns: [
      { name: 'Entity', type: 'string', desc: 'Country or region for which data is reported' },
      { name: 'Code', type: 'string', desc: 'Three-letter region code' },
      { name: 'Year', type: 'integer', desc: 'Year (1965-2022)' },
      { name: 'Renewables (% equivalent primary energy)', type: 'float', desc: 'Percentage of equivalent primary energy derived from renewables' },
      { name: 'Electricity from Wind (TWh)', type: 'float', desc: 'Wind energy generation in Terawatt-hours' },
      { name: 'Electricity from Hydro (TWh)', type: 'float', desc: 'Hydroelectric energy generation in Terawatt-hours' },
      { name: 'Electricity from Solar (TWh)', type: 'float', desc: 'Solar energy generation in Terawatt-hours' },
      { name: 'Other Renewables (TWh)', type: 'float', desc: 'Other renewable energy sources' }
    ],
    sampleRows: [
      { 'Entity': 'United States', 'Code': 'USA', 'Year': 2021, 'Renewables (% equivalent primary energy)': 10.6, 'Electricity from Wind (TWh)': 382.8, 'Electricity from Hydro (TWh)': 260.2, 'Electricity from Solar (TWh)': 164.5, 'Other Renewables (TWh)': 77.4 },
      { 'Entity': 'China', 'Code': 'CHN', 'Year': 2021, 'Renewables (% equivalent primary energy)': 15.6, 'Electricity from Wind (TWh)': 656.1, 'Electricity from Hydro (TWh)': 1300.0, 'Electricity from Solar (TWh)': 327.0, 'Other Renewables (TWh)': 111.4 },
      { 'Entity': 'Germany', 'Code': 'DEU', 'Year': 2021, 'Renewables (% equivalent primary energy)': 20.3, 'Electricity from Wind (TWh)': 114.6, 'Electricity from Hydro (TWh)': 19.5, 'Electricity from Solar (TWh)': 50.0, 'Other Renewables (TWh)': 48.2 }
    ],
    suggestedQuestions: [
      'How does the infamous "Duck Curve" materialize during midday solar peak versus evening ramp?',
      'What capacity of BESS (Battery Storage) is required to reduce curtailment by 95%?',
      'Which weather conditions maximize the complementary production of wind and solar?'
    ],
    pythonStarters: [
      {
        library: 'matplotlib',
        title: 'Matplotlib Stacked Area Chart (The Duck Curve)',
        description: 'Display 24-hour generation mix showing solar, wind, and battery storage balancing demand.',
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("grid_generation_hourly.csv")
daily = df.groupby("Hour")[["Solar_Gen_MW", "Wind_Gen_MW", "BESS_Discharge_MW"]].mean()
demand = df.groupby("Hour")["Grid_Demand_MW"].mean()

fig, ax = plt.subplots(figsize=(12, 6), dpi=150)
colors = ["#f59e0b", "#06b6d4", "#8b5cf6"]

ax.stackplot(daily.index, daily["Solar_Gen_MW"], daily["Wind_Gen_MW"], daily["BESS_Discharge_MW"], labels=["Solar PV", "Wind Turbines", "Battery Dispatch"], colors=colors, alpha=0.85)
ax.plot(demand.index, demand.values, color="#e11d48", linewidth=3, linestyle="--", label="Total Grid Demand")

ax.set_title("24-Hour Renewable Dispatch Profile & The Evening Ramp Challenge", fontsize=14, fontweight="bold")
ax.set_xlabel("Hour of the Day (0-23)", fontsize=11)
ax.set_ylabel("Power (Megawatts)", fontsize=11)
ax.set_xticks(range(0, 24, 2))
ax.legend(loc="upper left")
ax.grid(alpha=0.3)
plt.savefig("duck_curve_matplotlib.png", dpi=300)
plt.show()`
      },
      {
        library: 'seaborn',
        title: 'Seaborn Joint Distribution of Wind vs Solar Yield',
        description: 'Kernel Density Estimation (KDE) and scatter marginals displaying energy co-generation.',
        code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv("grid_generation_hourly.csv")
sns.set_theme(style="ticks")

g = sns.jointplot(
    data=df,
    x="Solar_Gen_MW",
    y="Wind_Gen_MW",
    kind="kde",
    fill=True,
    cmap="crest",
    thresh=0.05,
    marginal_kws=dict(fill=True, color="#059669")
)
g.fig.suptitle("Joint Density: Negative Correlation in Diurnal Wind & Solar Output", y=1.02, fontweight="bold")
g.set_axis_labels("Solar Injected (MW)", "Wind Injected (MW)")
plt.savefig("renewable_jointplot_seaborn.png", dpi=300)
plt.show()`
      },
      {
        library: 'plotly',
        title: 'Plotly Interactive Time-Series with Range Slider',
        description: 'Dual y-axis dynamic timeline comparing instantaneous grid carbon intensity with renewable penetration.',
        code: `import plotly.graph_objects as go
from plotly.subplots import make_subplots
import pandas as pd

df = pd.read_csv("grid_generation_hourly.csv")

fig = make_subplots(specs=[[{"secondary_y": True}]])

fig.add_trace(
    go.Scatter(x=df["Timestamp"], y=df["Solar_Gen_MW"] + df["Wind_Gen_MW"], name="Total Clean Energy (MW)", line=dict(color="#10b981", width=2)),
    secondary_y=False
)

fig.add_trace(
    go.Scatter(x=df["Timestamp"], y=df["Carbon_Intensity_gCO2"], name="Grid Carbon Intensity (gCO2/kWh)", line=dict(color="#ef4444", width=2, dash="dot")),
    secondary_y=True
)

fig.update_layout(
    title="Real-Time Grid Decarbonization Dynamics",
    xaxis=dict(rangeslider=dict(visible=True), type="date"),
    template="plotly_dark"
)
fig.show()`
      }
    ]
  },
  {
    id: 'space-missions-analytics',
    title: 'Space Missions & Aerospace Launch Reliability',
    category: 'Aerospace & Systems Engineering',
    kaggleSlug: 'agirlcoding/all-space-missions-from-1957',
    kaggleUrl: 'https://www.kaggle.com/datasets/agirlcoding/all-space-missions-from-1957',
    description: 'Comprehensive historical dataset detailing 4,500+ orbital rocket launches since Sputnik (1957), including booster reuse, payload mass to LEO/GTO, launch vehicles, and failure root-cause analysis.',
    recordCount: '4,630 missions',
    fileSize: '2.1 MB',
    badgeColor: 'sky',
    iconName: 'Rocket',
    columns: [
      { name: 'Unnamed: 0', type: 'integer', desc: 'Index column' },
      { name: 'Company Name', type: 'string', desc: 'Space organization undertaking the mission' },
      { name: 'Location', type: 'string', desc: 'Point of spacecraft launch on Earth' },
      { name: 'Datum', type: 'string', desc: 'Date and time of liftoff' },
      { name: 'Detail', type: 'string', desc: 'Name and type of the spaceship/rocket' },
      { name: 'Status Rocket', type: 'string', desc: 'StatusActive or StatusRetired' },
      { name: 'Rocket', type: 'float', desc: 'Cost of the mission in million $' },
      { name: 'Status Mission', type: 'string', desc: 'Success, Failure, Partial Failure, Prelaunch Failure' }
    ],
    sampleRows: [
      { 'Unnamed: 0': 0, 'Company Name': 'SpaceX', 'Location': 'LC-39A, Kennedy Space Center, Florida, USA', 'Datum': 'Fri Aug 07, 2020 05:12 UTC', 'Detail': 'Falcon 9 Block 5 | Starlink V1 L9 & BlackSky', 'Status Rocket': 'StatusActive', 'Rocket': 50.0, 'Status Mission': 'Success' },
      { 'Unnamed: 0': 1, 'Company Name': 'CASC', 'Location': 'Site 9401 (SLS-2), Jiuquan Satellite Launch Center, China', 'Datum': 'Thu Aug 06, 2020 04:01 UTC', 'Detail': 'Long March 2D | Gaofen-9 04 & Q-SAT', 'Status Rocket': 'StatusActive', 'Rocket': 29.75, 'Status Mission': 'Success' },
      { 'Unnamed: 0': 2, 'Company Name': 'Roscosmos', 'Location': 'Site 200/39, Baikonur Cosmodrome, Kazakhstan', 'Datum': 'Thu Jul 30, 2020 21:25 UTC', 'Detail': 'Proton-M/Briz-M | Ekspress-80 & Ekspress-103', 'Status Rocket': 'StatusActive', 'Rocket': 65.0, 'Status Mission': 'Success' },
      { 'Unnamed: 0': 3, 'Company Name': 'ULA', 'Location': 'SLC-41, Cape Canaveral AFS, Florida, USA', 'Datum': 'Thu Jul 30, 2020 11:50 UTC', 'Detail': 'Atlas V 541 | Perseverance', 'Status Rocket': 'StatusActive', 'Rocket': 145.0, 'Status Mission': 'Success' }
    ],
    suggestedQuestions: [
      'How has reusable rocket booster architecture disrupted launch cost per kg to low Earth orbit?',
      'Which national space agencies maintained the highest launch cadence without failure between 2010 and 2024?',
      'What orbital regimes have experienced the highest growth during the mega-constellation era?'
    ],
    pythonStarters: [
      {
        library: 'matplotlib',
        title: 'Launch Success Rates Over 6 Decades (1960-2024)',
        description: 'Dual axes showing launch frequency volume and percentage success trajectory.',
        code: `import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv("space_missions.csv")
annual = df.groupby("Launch_Year").agg(
    total_launches=("Status_Mission", "count"),
    successes=("Status_Mission", lambda s: (s == "Success").sum())
)
annual["success_rate"] = (annual["successes"] / annual["total_launches"]) * 100

fig, ax1 = plt.subplots(figsize=(13, 6), dpi=150)
ax2 = ax1.twinx()

ax1.bar(annual.index, annual["total_launches"], color="#475569", alpha=0.5, label="Total Launches")
ax2.plot(annual.index, annual["success_rate"], color="#38bdf8", linewidth=2.5, label="Success Rate (%)")

ax1.set_xlabel("Year of Launch", fontsize=11)
ax1.set_ylabel("Number of Launches per Year", color="#475569", fontsize=11)
ax2.set_ylabel("Mission Success Percentage (%)", color="#38bdf8", fontsize=11)
ax2.set_ylim(60, 102)

plt.title("Aerospace Reliability: 60-Year Historical Launch Success Progression", fontsize=14, fontweight="bold")
plt.tight_layout()
plt.savefig("space_success_matplotlib.png", dpi=300)
plt.show()`
      },
      {
        library: 'seaborn',
        title: 'Seaborn Categorical Matrix of Aerospace Agencies',
        description: 'Swarm and boxplot examining mission budget variance across global launch providers.',
        code: `import seaborn as sns
import matplotlib.pyplot as plt
import pandas as pd

df = pd.read_csv("space_missions.csv")
top_agencies = df[df["Company"].isin(["SpaceX", "NASA", "ISRO", "Roscosmos", "Arianespace", "CASC"])]

plt.figure(figsize=(12, 6), dpi=150)
sns.boxplot(data=top_agencies, x="Company", y="Price_Million_USD", palette="Set2", showmeans=True)
sns.stripplot(data=top_agencies, x="Company", y="Price_Million_USD", color="black", alpha=0.3, jitter=0.2)

plt.title("Commercial Launch Pricing Distribution ($ Millions)", fontsize=14, fontweight="bold")
plt.ylabel("Mission Cost (USD Millions)")
plt.savefig("aerospace_pricing_seaborn.png", dpi=300)
plt.show()`
      },
      {
        library: 'plotly',
        title: 'Plotly Interactive Orbit Treemap & Sunburst',
        description: 'Hierarchical breakdown of global agencies -> rocket architectures -> target orbits.',
        code: `import plotly.express as px
import pandas as pd

df = pd.read_csv("space_missions.csv")
recent_df = df[df["Launch_Year"] >= 2010]

fig = px.sunburst(
    recent_df,
    path=["Company", "Orbit", "Status_Mission"],
    values="Price_Million_USD",
    color="Status_Mission",
    color_discrete_map={"Success": "#22c55e", "Failure": "#ef4444", "Partial Failure": "#f59e0b"},
    title="Space Exploration Hierarchy: Agency to Orbital Destination"
)

fig.update_layout(margin=dict(t=40, l=10, r=10, b=10))
fig.show()`
      }
    ]
  },
  {
    id: 'iot-smart-city-air',
    title: 'Smart City Urban IoT & Air Quality Telemetry',
    category: 'IoT & Environmental Engineering',
    kaggleSlug: 'hasibalmuuz/air-pollution-in-seoul-iot',
    kaggleUrl: 'https://www.kaggle.com/datasets/hasibalmuuz/air-pollution-in-seoul-iot',
    description: 'Distributed sensor network data capturing particulate matter (PM2.5, PM10), nitrogen dioxide (NO2), carbon monoxide, relative humidity, and traffic density metrics.',
    recordCount: '52,400 sensor readings',
    fileSize: '6.4 MB',
    badgeColor: 'rose',
    iconName: 'Activity',
    columns: [
      { name: 'Measurement date', type: 'string', desc: 'Hour of measurement' },
      { name: 'Station code', type: 'integer', desc: 'Station ID to identify the measurement location' },
      { name: 'Item code', type: 'integer', desc: 'Pollutant type code (e.g. SO2, NO2, CO, O3, PM10, PM2.5)' },
      { name: 'Average value', type: 'float', desc: 'Concentration of the specific pollutant for that hour' },
      { name: 'Instrument status', type: 'integer', desc: 'Operational status of the measuring instrument (0=normal)' }
    ],
    sampleRows: [
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 1, 'Average value': 0.004, 'Instrument status': 0 },
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 3, 'Average value': 0.059, 'Instrument status': 0 },
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 5, 'Average value': 1.2, 'Instrument status': 0 },
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 6, 'Average value': 0.002, 'Instrument status': 0 },
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 8, 'Average value': 73.0, 'Instrument status': 0 },
      { 'Measurement date': '2017-01-01 00:00', 'Station code': 101, 'Item code': 9, 'Average value': 57.0, 'Instrument status': 0 }
    ],
    suggestedQuestions: [
      'What is the lag-time between morning peak traffic index and peak atmospheric PM2.5 levels?',
      'Does higher wind speed (>3.0 m/s) produce linear or exponential dispersion of micro-particles?',
      'Can we isolate the industrial sensor cluster versus vehicular corridor emissions?'
    ],
    pythonStarters: [
      {
        library: 'seaborn',
        title: 'Seaborn Heatmap of Hourly Pollution Corridors',
        description: 'Pivot sensor readings into a 24-hour heatmap across metropolitan districts.',
        code: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("iot_smart_city_air.csv")
pivot_table = df.pivot_table(index="District", columns="Hour", values="PM2_5", aggfunc="mean")

plt.figure(figsize=(14, 6), dpi=150)
sns.heatmap(pivot_table, cmap="YlOrRd", annot=True, fmt=".1f", linewidths=0.5, cbar_kws={'label': 'PM2.5 (µg/m³)'})
plt.title("Diurnal Particulate Matter (PM2.5) Spikes Across Urban IoT Sensor Zones", fontsize=14, fontweight="bold")
plt.xlabel("Hour of Day (0-23)")
plt.savefig("smart_city_air_heatmap.png", dpi=300)
plt.show()`
      },
      {
        library: 'matplotlib',
        title: 'Matplotlib Polar Wind-Rose Pollution Dispersion',
        description: 'Map PM2.5 concentration against 360-degree wind direction vectors.',
        code: `import numpy as np
import matplotlib.pyplot as plt

# Generate polar wind rose
directions = np.linspace(0, 2*np.pi, 16, endpoint=False)
concentrations = [15, 22, 45, 68, 85, 92, 74, 52, 34, 25, 18, 14, 16, 20, 28, 32]

fig = plt.figure(figsize=(7, 7), dpi=150)
ax = fig.add_subplot(111, projection="polar")
bars = ax.bar(directions, concentrations, width=0.35, bottom=0.0, color="#f43f5e", alpha=0.75, edgecolor="black")

ax.set_theta_zero_location("N")
ax.set_theta_direction(-1)
ax.set_title("Polar Air Quality Rose: Particle Load vs Wind Bearing", fontsize=13, fontweight="bold", pad=15)
plt.savefig("polar_wind_rose.png", dpi=300)
plt.show()`
      },
      {
        library: 'plotly',
        title: 'Plotly Geographic Mapbox IoT Sensor Cluster',
        description: 'Interactive geospatial scatter map with color-coded AQI severity badges.',
        code: `import plotly.express as px
import pandas as pd

df = pd.read_csv("iot_smart_city_air.csv")

fig = px.scatter_mapbox(
    df,
    lat="Latitude",
    lon="Longitude",
    color="PM2_5",
    size="Traffic_Index",
    hover_name="District",
    hover_data=["Station_Code", "NO2_ppm", "Wind_Speed_ms"],
    color_continuous_scale=px.colors.diverging.Spectral_r,
    range_color=[10, 100],
    zoom=11,
    title="Real-Time Smart City IoT Ambient Air Quality Grid"
)

fig.update_layout(mapbox_style="carto-positron", margin=dict(l=0, r=0, t=40, b=0))
fig.show()`
      }
    ]
  }
];
