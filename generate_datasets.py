import json

datasets = [
    {
        "id": "superstore-dataset",
        "title": "Superstore Dataset (E-Commerce & Sales)",
        "category": "E-Commerce & Sales",
        "kaggleSlug": "braverhart101/sample-supermarket-dataset",
        "kaggleUrl": "https://www.kaggle.com/datasets/braverhart101/sample-supermarket-dataset",
        "description": "This is the gold standard for mock business intelligence hackathons. It tracks orders, shipping dates, product categories, geographic locations, and financial metrics (sales, profit, discounts). Perfect for building standard corporate dashboards. You can easily map sales performance geographically, show seasonal trends via time-series line graphs, or contrast profit margins against shipping modes using matrix plots.",
        "recordCount": "9,994 records",
        "fileSize": "3.2 MB",
        "badgeColor": "blue",
        "iconName": "ShoppingCart",
        "columns": [
            {"name": "Row ID", "type": "integer", "desc": "Unique row identifier"},
            {"name": "Order ID", "type": "string", "desc": "Unique order identifier"},
            {"name": "Order Date", "type": "string", "desc": "Date the order was placed"},
            {"name": "Ship Date", "type": "string", "desc": "Date the order was shipped"},
            {"name": "Ship Mode", "type": "string", "desc": "Shipping mode (Standard, First Class, etc.)"},
            {"name": "Customer ID", "type": "string", "desc": "Unique customer identifier"},
            {"name": "Segment", "type": "string", "desc": "Customer segment (Consumer, Corporate, etc.)"},
            {"name": "Country", "type": "string", "desc": "Country of the customer"},
            {"name": "City", "type": "string", "desc": "City of the customer"},
            {"name": "State", "type": "string", "desc": "State of the customer"},
            {"name": "Category", "type": "string", "desc": "Product category"},
            {"name": "Sub-Category", "type": "string", "desc": "Product sub-category"},
            {"name": "Sales", "type": "float", "desc": "Sales value of the transaction"},
            {"name": "Quantity", "type": "integer", "desc": "Quantity of products ordered"},
            {"name": "Discount", "type": "float", "desc": "Discount applied to the order"},
            {"name": "Profit", "type": "float", "desc": "Profit generated from the transaction"}
        ],
        "sampleRows": [
            {"Row ID": 1, "Order ID": "CA-2016-152156", "Order Date": "11/8/2016", "Ship Date": "11/11/2016", "Ship Mode": "Second Class", "Customer ID": "CG-12520", "Segment": "Consumer", "Country": "United States", "City": "Henderson", "State": "Kentucky", "Category": "Furniture", "Sub-Category": "Bookcases", "Sales": 261.96, "Quantity": 2, "Discount": 0.0, "Profit": 41.91},
            {"Row ID": 2, "Order ID": "CA-2016-152156", "Order Date": "11/8/2016", "Ship Date": "11/11/2016", "Ship Mode": "Second Class", "Customer ID": "CG-12520", "Segment": "Consumer", "Country": "United States", "City": "Henderson", "State": "Kentucky", "Category": "Furniture", "Sub-Category": "Chairs", "Sales": 731.94, "Quantity": 3, "Discount": 0.0, "Profit": 219.58},
            {"Row ID": 3, "Order ID": "CA-2016-138688", "Order Date": "6/12/2016", "Ship Date": "6/16/2016", "Ship Mode": "Second Class", "Customer ID": "DV-13045", "Segment": "Corporate", "Country": "United States", "City": "Los Angeles", "State": "California", "Category": "Office Supplies", "Sub-Category": "Labels", "Sales": 14.62, "Quantity": 2, "Discount": 0.0, "Profit": 6.87}
        ],
        "suggestedQuestions": [
            "Which product sub-categories drive the highest profit margins?",
            "Are there specific geographic regions that consistently operate at a loss?",
            "How does shipping mode affect overall profit and sales volume?"
        ],
        "pythonStarters": [
            {
                "library": "pandas",
                "title": "Analyze Sales by Category",
                "description": "Group sales by category and sub-category to find top performers.",
                "code": "import pandas as pd\n\ndf = pd.read_csv('superstore.csv')\ncategory_sales = df.groupby(['Category', 'Sub-Category'])['Sales'].sum().reset_index()\nprint(category_sales.sort_values(by='Sales', ascending=False).head())"
            },
            {
                "library": "seaborn",
                "title": "Profit Distribution by Segment",
                "description": "Visualize profit distribution across different customer segments.",
                "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\n\nplt.figure(figsize=(10, 6))\nsns.boxplot(x='Segment', y='Profit', data=df[df['Profit'] < 500])\nplt.title('Profit Distribution by Customer Segment')\nplt.show()"
            }
        ]
    },
    {
        "id": "spotify-streaming-data",
        "title": "Spotify Streaming Data & Audio Features",
        "category": "Pop Culture & Music",
        "kaggleSlug": "nelgiriyewithana/top-spotify-songs-2023",
        "kaggleUrl": "https://www.kaggle.com/datasets/nelgiriyewithana/top-spotify-songs-2023",
        "description": "Hackathon judges love pop-culture themes because they are immediately engaging. This dataset provides track popularity metrics alongside acoustic metadata like 'danceability,' 'energy,' and 'tempo'. Ideal for complex radar charts mapping song characteristics, trend analysis tracking how genres evolve over time, and interactive scatterplots correlating a song’s tempo to its stream count.",
        "recordCount": "953 records",
        "fileSize": "400 KB",
        "badgeColor": "emerald",
        "iconName": "Music",
        "columns": [
            {"name": "track_name", "type": "string", "desc": "Name of the track"},
            {"name": "artist(s)_name", "type": "string", "desc": "Name of the artist(s)"},
            {"name": "released_year", "type": "integer", "desc": "Year the track was released"},
            {"name": "streams", "type": "integer", "desc": "Total number of streams on Spotify"},
            {"name": "bpm", "type": "integer", "desc": "Beats per minute (tempo)"},
            {"name": "danceability_%", "type": "integer", "desc": "Danceability percentage"},
            {"name": "energy_%", "type": "integer", "desc": "Energy percentage"},
            {"name": "acousticness_%", "type": "integer", "desc": "Acousticness percentage"},
            {"name": "instrumentalness_%", "type": "integer", "desc": "Instrumentalness percentage"},
            {"name": "liveness_%", "type": "integer", "desc": "Liveness percentage"},
            {"name": "speechiness_%", "type": "integer", "desc": "Speechiness percentage"}
        ],
        "sampleRows": [
            {"track_name": "Seven (feat. Latto)", "artist(s)_name": "Latto, Jung Kook", "released_year": 2023, "streams": 141381703, "bpm": 125, "danceability_%": 80, "energy_%": 83, "acousticness_%": 31, "instrumentalness_%": 0, "liveness_%": 8, "speechiness_%": 4},
            {"track_name": "LALA", "artist(s)_name": "Myke Towers", "released_year": 2023, "streams": 133716286, "bpm": 92, "danceability_%": 71, "energy_%": 74, "acousticness_%": 7, "instrumentalness_%": 0, "liveness_%": 10, "speechiness_%": 4},
            {"track_name": "vampire", "artist(s)_name": "Olivia Rodrigo", "released_year": 2023, "streams": 140003974, "bpm": 138, "danceability_%": 51, "energy_%": 53, "acousticness_%": 17, "instrumentalness_%": 0, "liveness_%": 31, "speechiness_%": 6}
        ],
        "suggestedQuestions": [
            "What audio features (e.g., danceability, energy) most strongly correlate with high stream counts?",
            "How has the average tempo of top hits changed over the recent years?",
            "Do solo artists or collaborations tend to have higher streaming success?"
        ],
        "pythonStarters": [
            {
                "library": "plotly",
                "title": "Audio Features Radar Chart",
                "description": "Create a radar chart to compare the acoustic features of different tracks.",
                "code": "import plotly.graph_objects as go\nimport pandas as pd\n\ndf = pd.read_csv('spotify.csv')\ntrack = df.iloc[0]\n\ncategories = ['danceability_%', 'energy_%', 'acousticness_%', 'liveness_%', 'speechiness_%']\n\nfig = go.Figure()\nfig.add_trace(go.Scatterpolar(\n      r=[track[c] for c in categories],\n      theta=categories,\n      fill='toself',\n      name=track['track_name']\n))\n\nfig.update_layout(polar=dict(radialaxis=dict(visible=True, range=[0, 100])), showlegend=True)\nfig.show()"
            }
        ]
    },
    {
        "id": "airbnb-listings",
        "title": "Airbnb Listings & Reviews",
        "category": "Geospatial & Hospitality",
        "kaggleSlug": "dgomonov/new-york-city-airbnb-open-data",
        "kaggleUrl": "https://www.kaggle.com/datasets/dgomonov/new-york-city-airbnb-open-data",
        "description": "Available for multiple global cities, this dataset includes spatial coordinates (latitude/longitude), pricing, room types, and customer review scores. A playground for geospatial analysis. Use it to build interactive choropleth maps, density heatmaps highlighting price surges across different neighborhoods, or price distribution violin plots.",
        "recordCount": "48,895 records",
        "fileSize": "7.1 MB",
        "badgeColor": "rose",
        "iconName": "MapPin",
        "columns": [
            {"name": "id", "type": "integer", "desc": "Unique listing identifier"},
            {"name": "name", "type": "string", "desc": "Name of the listing"},
            {"name": "host_id", "type": "integer", "desc": "Unique host identifier"},
            {"name": "neighbourhood_group", "type": "string", "desc": "Broader area/borough (e.g., Manhattan, Brooklyn)"},
            {"name": "neighbourhood", "type": "string", "desc": "Specific neighborhood"},
            {"name": "latitude", "type": "float", "desc": "Latitude coordinate"},
            {"name": "longitude", "type": "float", "desc": "Longitude coordinate"},
            {"name": "room_type", "type": "string", "desc": "Type of room (Entire home, Private room, etc.)"},
            {"name": "price", "type": "integer", "desc": "Price per night in local currency"},
            {"name": "minimum_nights", "type": "integer", "desc": "Minimum stay requirement"},
            {"name": "number_of_reviews", "type": "integer", "desc": "Total number of reviews"}
        ],
        "sampleRows": [
            {"id": 2539, "name": "Clean & quiet apt home by the park", "host_id": 2787, "neighbourhood_group": "Brooklyn", "neighbourhood": "Kensington", "latitude": 40.64749, "longitude": -73.97237, "room_type": "Private room", "price": 149, "minimum_nights": 1, "number_of_reviews": 9},
            {"id": 2595, "name": "Skylit Midtown Castle", "host_id": 2845, "neighbourhood_group": "Manhattan", "neighbourhood": "Midtown", "latitude": 40.75362, "longitude": -73.98377, "room_type": "Entire home/apt", "price": 225, "minimum_nights": 1, "number_of_reviews": 45},
            {"id": 3647, "name": "THE VILLAGE OF HARLEM....NEW YORK !", "host_id": 4632, "neighbourhood_group": "Manhattan", "neighbourhood": "Harlem", "latitude": 40.80902, "longitude": -73.9419, "room_type": "Private room", "price": 150, "minimum_nights": 3, "number_of_reviews": 0}
        ],
        "suggestedQuestions": [
            "How do prices vary across different neighborhoods and room types?",
            "Are there geospatial clusters of highly reviewed listings?",
            "What is the correlation between minimum nights and listing availability?"
        ],
        "pythonStarters": [
            {
                "library": "plotly",
                "title": "Geospatial Heatmap",
                "description": "Plot listing prices on a geographic map.",
                "code": "import plotly.express as px\nimport pandas as pd\n\ndf = pd.read_csv('airbnb.csv')\nfig = px.density_mapbox(df, lat='latitude', lon='longitude', z='price', radius=10, center=dict(lat=40.7, lon=-73.9), zoom=9, mapbox_style='carto-positron')\nfig.show()"
            }
        ]
    },
    {
        "id": "netflix-movies",
        "title": "Netflix Movies and TV Shows",
        "category": "Entertainment & Text",
        "kaggleSlug": "shivamb/netflix-shows",
        "kaggleUrl": "https://www.kaggle.com/datasets/shivamb/netflix-shows",
        "description": "A rich dataset featuring structured attributes (release year, country, rating, duration) alongside text data (descriptions and genres). Great for tracking content strategy shifts over the years via stacked area charts. The raw text allows you to bring in NLP elements like custom word clouds or network graphs showing which directors work most frequently with certain actors.",
        "recordCount": "8,807 records",
        "fileSize": "3.4 MB",
        "badgeColor": "red",
        "iconName": "Film",
        "columns": [
            {"name": "show_id", "type": "string", "desc": "Unique ID for every Movie / TV Show"},
            {"name": "type", "type": "string", "desc": "Identifier - Movie or TV Show"},
            {"name": "title", "type": "string", "desc": "Title of the Movie / TV Show"},
            {"name": "director", "type": "string", "desc": "Director of the movie"},
            {"name": "cast", "type": "string", "desc": "Actors involved in the movie/show"},
            {"name": "country", "type": "string", "desc": "Country where the movie/show was produced"},
            {"name": "date_added", "type": "string", "desc": "Date it was added on Netflix"},
            {"name": "release_year", "type": "integer", "desc": "Actual release year of the movie/show"},
            {"name": "rating", "type": "string", "desc": "TV Rating of the movie/show"},
            {"name": "duration", "type": "string", "desc": "Total duration (in minutes or seasons)"},
            {"name": "listed_in", "type": "string", "desc": "Genres"},
            {"name": "description", "type": "string", "desc": "Synopsis description"}
        ],
        "sampleRows": [
            {"show_id": "s1", "type": "Movie", "title": "Dick Johnson Is Dead", "director": "Kirsten Johnson", "cast": "NaN", "country": "United States", "date_added": "September 25, 2021", "release_year": 2020, "rating": "PG-13", "duration": "90 min", "listed_in": "Documentaries", "description": "As her father nears the end of his life, filmmaker Kirsten Johnson stages his death in inventive and comical ways to help them both face the inevitable."},
            {"show_id": "s2", "type": "TV Show", "title": "Blood & Water", "director": "NaN", "cast": "Ama Qamata, Khosi Ngema, Gail Mabalane...", "country": "South Africa", "date_added": "September 24, 2021", "release_year": 2021, "rating": "TV-MA", "duration": "2 Seasons", "listed_in": "International TV Shows, TV Dramas, TV Mysteries", "description": "After crossing paths at a party, a Cape Town teen sets out to prove whether a private-school swimming star is her sister who was abducted at birth."},
            {"show_id": "s3", "type": "TV Show", "title": "Ganglands", "director": "Julien Leclercq", "cast": "Sami Bouajila, Tracy Gotoas, Samuel Jouy...", "country": "NaN", "date_added": "September 24, 2021", "release_year": 2021, "rating": "TV-MA", "duration": "1 Season", "listed_in": "Crime TV Shows, International TV Shows, TV Action & Adventure", "description": "To protect his family from a powerful drug lord, skilled thief Mehdi and his expert team of robbers are pulled into a violent and deadly turf war."}
        ],
        "suggestedQuestions": [
            "How has the proportion of TV Shows vs Movies added to Netflix changed over the last decade?",
            "Which countries are the largest producers of Netflix content?",
            "What are the most common genre combinations?"
        ],
        "pythonStarters": [
            {
                "library": "seaborn",
                "title": "Content Added Over Time",
                "description": "Visualize the trend of Netflix content additions over the years.",
                "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.read_csv('netflix.csv')\ndf['date_added'] = pd.to_datetime(df['date_added'])\ndf['year_added'] = df['date_added'].dt.year\n\ncounts = df.groupby(['year_added', 'type']).size().reset_index(name='count')\nplt.figure(figsize=(12, 6))\nsns.lineplot(data=counts, x='year_added', y='count', hue='type')\nplt.title('Content Added on Netflix Over Time')\nplt.show()"
            }
        ]
    },
    {
        "id": "data-science-salaries",
        "title": "AI & Data Science Job Salaries",
        "category": "Tech Industry & Careers",
        "kaggleSlug": "ruchi798/data-science-job-salaries",
        "kaggleUrl": "https://www.kaggle.com/datasets/ruchi798/data-science-job-salaries",
        "description": "Extremely relevant to a hackathon audience, this dataset looks at remote work ratios, job titles, experience levels, geographic locations, and compensation. Perfect for structural salary breakdowns. You can utilize box plots to contrast experience levels against pay scale, Sankey diagrams to map employment types to target job titles, and global maps tracking compensation variation across countries.",
        "recordCount": "3,755 records",
        "fileSize": "120 KB",
        "badgeColor": "indigo",
        "iconName": "Briefcase",
        "columns": [
            {"name": "work_year", "type": "integer", "desc": "The year the salary was paid (e.g., 2020, 2021, 2022)"},
            {"name": "experience_level", "type": "string", "desc": "EN (Entry), MI (Mid), SE (Senior), EX (Executive)"},
            {"name": "employment_type", "type": "string", "desc": "PT (Part-time), FT (Full-time), CT (Contract), FL (Freelance)"},
            {"name": "job_title", "type": "string", "desc": "The role worked in during the year"},
            {"name": "salary", "type": "integer", "desc": "The total gross salary amount paid"},
            {"name": "salary_currency", "type": "string", "desc": "The currency of the salary paid as an ISO 4217 currency code"},
            {"name": "salary_in_usd", "type": "integer", "desc": "The salary converted to USD"},
            {"name": "employee_residence", "type": "string", "desc": "Employee's primary country of residence"},
            {"name": "remote_ratio", "type": "integer", "desc": "Overall amount of work done remotely (0, 50, 100)"},
            {"name": "company_location", "type": "string", "desc": "Country of the employer's main office"},
            {"name": "company_size", "type": "string", "desc": "S (Small), M (Medium), L (Large)"}
        ],
        "sampleRows": [
            {"work_year": 2023, "experience_level": "SE", "employment_type": "FT", "job_title": "Principal Data Scientist", "salary": 80000, "salary_currency": "EUR", "salary_in_usd": 85847, "employee_residence": "ES", "remote_ratio": 100, "company_location": "ES", "company_size": "L"},
            {"work_year": 2023, "experience_level": "MI", "employment_type": "CT", "job_title": "ML Engineer", "salary": 30000, "salary_currency": "USD", "salary_in_usd": 30000, "employee_residence": "US", "remote_ratio": 100, "company_location": "US", "company_size": "S"},
            {"work_year": 2023, "experience_level": "MI", "employment_type": "FT", "job_title": "ML Engineer", "salary": 25500, "salary_currency": "USD", "salary_in_usd": 25500, "employee_residence": "US", "remote_ratio": 100, "company_location": "US", "company_size": "S"}
        ],
        "suggestedQuestions": [
            "How does experience level impact the average salary in USD?",
            "What is the salary difference between fully remote and in-office roles?",
            "Which job titles have the highest variance in compensation?"
        ],
        "pythonStarters": [
            {
                "library": "seaborn",
                "title": "Salary Distribution by Experience Level",
                "description": "Plot a boxplot to see how salary scales with experience.",
                "code": "import seaborn as sns\nimport matplotlib.pyplot as plt\nimport pandas as pd\n\ndf = pd.read_csv('ds_salaries.csv')\nplt.figure(figsize=(10, 6))\nsns.boxplot(data=df, x='experience_level', y='salary_in_usd', order=['EN', 'MI', 'SE', 'EX'])\nplt.title('Data Science Salaries by Experience Level (USD)')\nplt.show()"
            }
        ]
    },
    {
        "id": "world-development-indicators",
        "title": "World Development Indicators",
        "category": "Socio-Economics & Global Trends",
        "kaggleSlug": "theworldbank/world-development-indicators",
        "kaggleUrl": "https://www.kaggle.com/datasets/theworldbank/world-development-indicators",
        "description": "Sourced originally from the World Bank, this contains hundreds of global metrics spanning decades—including health markers, education stats, GDP growth, and environmental factors. The best choice for recreating iconic gapminder-style animated bubble charts. You can track long-term global trajectories, create correlation matrices, and tell macro-level stories about global development.",
        "recordCount": "7.1M records",
        "fileSize": "820 MB",
        "badgeColor": "sky",
        "iconName": "Globe",
        "columns": [
            {"name": "CountryName", "type": "string", "desc": "Name of the country"},
            {"name": "CountryCode", "type": "string", "desc": "ISO country code"},
            {"name": "IndicatorName", "type": "string", "desc": "Name of the development indicator"},
            {"name": "IndicatorCode", "type": "string", "desc": "Unique code for the indicator"},
            {"name": "Year", "type": "integer", "desc": "Year of measurement"},
            {"name": "Value", "type": "float", "desc": "Measured value of the indicator"}
        ],
        "sampleRows": [
            {"CountryName": "Arab World", "CountryCode": "ARB", "IndicatorName": "Adolescent fertility rate (births per 1,000 women ages 15-19)", "IndicatorCode": "SP.ADO.TFRT", "Year": 1960, "Value": 133.56090740552298},
            {"CountryName": "Arab World", "CountryCode": "ARB", "IndicatorName": "Age dependency ratio (% of working-age population)", "IndicatorCode": "SP.POP.DPND", "Year": 1960, "Value": 87.7976011532547},
            {"CountryName": "Arab World", "CountryCode": "ARB", "IndicatorName": "Age dependency ratio, old (% of working-age population)", "IndicatorCode": "SP.POP.DPND.OL", "Year": 1960, "Value": 6.634579191565161}
        ],
        "suggestedQuestions": [
            "How has global life expectancy evolved over the last 50 years?",
            "What is the correlation between GDP per capita and education enrollment rates?",
            "How do carbon emissions correlate with economic growth trajectories?"
        ],
        "pythonStarters": [
            {
                "library": "plotly",
                "title": "Animated Gapminder Bubble Chart",
                "description": "Create an animated bubble chart tracking life expectancy vs GDP.",
                "code": "import plotly.express as px\nimport pandas as pd\n\n# NOTE: Real implementation requires pivoting indicators to columns\ndf = pd.read_csv('wdi_subset.csv')\nfig = px.scatter(df, x='gdp_per_capita', y='life_expectancy', animation_frame='year', \n                 animation_group='country', size='population', color='continent', \n                 hover_name='country', log_x=True, size_max=55, range_x=[100,100000], range_y=[25,90])\nfig.show()"
            }
        ]
    },
    {
        "id": "kolkata-climate-weather",
        "title": "Kolkata Climate & Weather Daily Data",
        "category": "Environment & Climate",
        "kaggleSlug": "subhamnandi/kolkata-weather-data",
        "kaggleUrl": "https://www.kaggle.com/datasets/subhamnandi/kolkata-weather-data",
        "description": "Weather data provides deep, continuous time-series numbers that allow you to demonstrate high-level data manipulation. Ideal for creating highly technical and visually stunning charts like circular weather calendars, temperature anomaly strip charts (frequently used in climate reporting), and multi-axis dual plots pairing humidity shifts with rainfall spikes.",
        "recordCount": "5,000+ records",
        "fileSize": "500 KB",
        "badgeColor": "amber",
        "iconName": "Sun",
        "columns": [
            {"name": "Date", "type": "string", "desc": "Date of measurement"},
            {"name": "Temperature_Max", "type": "float", "desc": "Maximum temperature in Celsius"},
            {"name": "Temperature_Min", "type": "float", "desc": "Minimum temperature in Celsius"},
            {"name": "Humidity_Mean", "type": "float", "desc": "Mean relative humidity percentage"},
            {"name": "Wind_Speed_Max", "type": "float", "desc": "Maximum wind speed in km/h"},
            {"name": "Precipitation_mm", "type": "float", "desc": "Total daily rainfall in mm"}
        ],
        "sampleRows": [
            {"Date": "2015-01-01", "Temperature_Max": 26.1, "Temperature_Min": 14.5, "Humidity_Mean": 62.0, "Wind_Speed_Max": 11.2, "Precipitation_mm": 0.0},
            {"Date": "2015-01-02", "Temperature_Max": 25.8, "Temperature_Min": 15.0, "Humidity_Mean": 65.5, "Wind_Speed_Max": 9.8, "Precipitation_mm": 0.0},
            {"Date": "2015-07-15", "Temperature_Max": 34.2, "Temperature_Min": 28.1, "Humidity_Mean": 88.4, "Wind_Speed_Max": 18.5, "Precipitation_mm": 45.2}
        ],
        "suggestedQuestions": [
            "Are the monsoon seasons starting earlier or later over the decade?",
            "What is the correlation between peak humidity days and extreme temperature dips?",
            "Can we detect a general warming trend in Kolkata's winter minimum temperatures?"
        ],
        "pythonStarters": [
            {
                "library": "matplotlib",
                "title": "Temperature Anomalies Over Time",
                "description": "Plot temperature trends over multiple years.",
                "code": "import pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv('kolkata_weather.csv')\ndf['Date'] = pd.to_datetime(df['Date'])\nplt.figure(figsize=(15, 5))\nplt.plot(df['Date'], df['Temperature_Max'], label='Max Temp', alpha=0.7)\nplt.plot(df['Date'], df['Temperature_Min'], label='Min Temp', alpha=0.7)\nplt.title('Kolkata Daily Temperatures')\nplt.legend()\nplt.show()"
            }
        ]
    }
]

output_code = "import { Dataset } from '../types';\n\nexport const KAGGLE_DATASETS: Dataset[] = " + json.dumps(datasets, indent=2) + ";\n"

with open("src/data/datasets.ts", "w") as f:
    f.write(output_code)
