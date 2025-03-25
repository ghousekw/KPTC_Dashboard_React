# KPTC Dashboard React

![KPTC Dashboard](public/assets/images/kptc-logo.png)

A comprehensive React-based dashboard application for Kuwait Public Transport Company's vehicle maintenance and job order management system. The application features a bilingual interface (English and Arabic), interactive visualizations, and complete job order workflow management.

## Features

- **Bilingual Support**: Complete English and Arabic interface with RTL layout support
- **Interactive Dashboard**: Real-time statistics and performance metrics
- **Job Order Management**: Track maintenance requests from reception to delivery
- **Data Visualization**: Charts and graphs for performance analysis
- **Responsive Design**: Works on desktop and mobile devices

## Demo

Live demo available at: [https://dashboard.kptc.com](https://dashboard.kptc.com)

## Screenshots

![Dashboard Overview](https://example.com/screenshots/dashboard.png)
![Job Orders Management](https://example.com/screenshots/job-orders.png)
![Technician Performance](https://example.com/screenshots/technician-charts.png)

## Technologies Used

- React.js
- Vite
- Chart.js (with react-chartjs-2)
- Bootstrap Icons
- Context API for state management
- CSS3 with RTL support

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/kptc/KPTC_Dashboard.git
   cd KPTC_Dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```bash
   http://localhost:5173/
   ```

### Building for Production

```bash
npm run build
```

The compiled files will be generated in the `dist` directory.

## Detailed Project Structure

```
kptc-vite/
├── public/                      # Static files
│   ├── assets/                  # Public assets
│   │   └── images/              # Image assets
│   │       └── kptc-logo.png    # Company logo
│   └── vite.svg                 # Vite logo
├── src/
│   ├── components/              # Application components
│   │   ├── charts/              # Chart components
│   │   │   ├── ContractingPartyOverview.jsx     # Contracting party KPIs
│   │   │   ├── DetailedStats.jsx                # Detailed statistics breakdown
│   │   │   ├── ExecutiveSummaryChart.jsx        # Management dashboard overview
│   │   │   ├── InvoiceValuesChart.jsx           # Financial tracking charts
│   │   │   ├── JobCardCostProjection.jsx        # Cost analysis for job orders
│   │   │   ├── JobCardFlow.jsx                  # Workflow visualization
│   │   │   ├── JobOrderTrendsChart.jsx          # Time-series analysis
│   │   │   ├── JobTypesPieChart.jsx             # Type distribution
│   │   │   ├── PerformanceIndicators.jsx        # KPI gauge charts
│   │   │   ├── QuickActions.jsx                 # Action panels
│   │   │   ├── RepairJobStatusChart.jsx         # Status breakdown chart
│   │   │   ├── TechnicianJobsChart.jsx          # Technician efficiency chart
│   │   │   └── WorkflowStatusChart.jsx          # Process stage analysis
│   │   └── dashboard/                           # Dashboard layouts
│   │       ├── KPTCDashboard.jsx                # Main dashboard component
│   │       └── KPTCDashboard.css                # Dashboard styles with RTL support
│   ├── context/                                 # React Context providers
│   │   └── LanguageContext.jsx                  # Bilingual support system
│   ├── App.jsx                                  # Main application component
│   ├── App.css                                  # Global styles
│   └── main.jsx                                 # Application entry point
├── index.html                                   # HTML template
├── package.json                                 # Dependencies and scripts
└── vite.config.js                               # Vite configuration
```

## Component Functionality

### Core Components

- **App.jsx**: Root component that initializes the application and wraps children with context providers.
- **KPTCDashboard.jsx**: Main dashboard layout component that organizes the sidebar, header, content areas, and renders all chart components.

### Context Providers

- **LanguageContext.jsx**: Manages the application's language state (English/Arabic) and provides translation functions. Includes RTL layout switching functionality.

### Chart Components

- **ContractingPartyOverview.jsx**: Displays key metrics about contracting parties, including contract values, completion percentages, and balances.
- **DetailedStats.jsx**: Shows a detailed breakdown of job order statuses (In Register, Pending QA, etc.) with icons and explanations.
- **ExecutiveSummaryChart.jsx**: Management-focused dashboard with KPIs, work implementation status, financial overview, and priority pending tasks.
- **InvoiceValuesChart.jsx**: Financial visualization with invoice amounts, payment tracking, and revenue graphs.
- **JobCardCostProjection.jsx**: Cost analysis component that appears when a job card is selected, showing detailed cost breakdown and projections.
- **JobCardFlow.jsx**: Visual representation of the job order workflow from reception to delivery, showing counts at each stage.
- **JobOrderTrendsChart.jsx**: Time-series chart showing job order trends across months with comparison between new and completed orders.
- **JobTypesPieChart.jsx**: Distribution chart of job types (mechanical, electrical, body work, etc.) for analysis.
- **PerformanceIndicators.jsx**: Gauge charts showing KPIs like turnaround time, first-time fix rate, customer satisfaction, and labor utilization.
- **QuickActions.jsx**: Panel of quick action buttons for common tasks (create orders, view pending approvals, etc.).
- **RepairJobStatusChart.jsx**: Doughnut chart visualizing repair job statuses (completed, in progress, on hold, waiting parts).
- **TechnicianJobsChart.jsx**: Bar chart comparing technician workloads and efficiency metrics.
- **WorkflowStatusChart.jsx**: Bar chart showing the distribution of job orders across workflow stages.

## UI Components

The dashboard UI is built with several key layout components:

- **Sidebar**: Navigation menu with links to different sections of the application.
- **Header**: Contains language selector, notifications, and user profile.
- **Stats Cards**: Display key metrics with color-coded cards for quick reference.
- **Filter Section**: Provides filtering capabilities for job order data.
- **Job Orders Table**: Interactive table showing job order listings with actions.
- **Charts Grid**: Responsive layout for various data visualization components.
- **Footer**: Copyright and links to documentation, support, and settings.

## Internationalization System

The application uses a comprehensive translation system:

1. **Translation Object**: Central storage of all UI strings with English keys and Arabic translations.
2. **Language Toggle**: UI control to switch between languages.
3. **RTL Support**: Automatic right-to-left layout switching for Arabic.
4. **Context Provider**: `useLanguage` hook for accessing translations throughout the application.

### Translation Usage Example:

```jsx
import { useLanguage } from '../../context/LanguageContext';

const MyComponent = () => {
  const { getTranslation } = useLanguage();
  
  return (
    <h1>{getTranslation('Dashboard Title')}</h1>
  );
};
```

## Styling Architecture

The application uses CSS with variables for theming:

- **Base Variables**: Colors, shadows, transitions in `:root`.
- **Component Styles**: Modular CSS organized by component type.
- **Responsive Design**: Media queries for adapting to different screen sizes.
- **RTL Support**: Special CSS classes and flexbox direction changes for Arabic layout.

## Data Visualization

Chart.js is used for all data visualizations with specific configuration for each chart type:

- **Doughnut Charts**: For status distribution and proportional data.
- **Bar Charts**: For comparison across categories.
- **Line Charts**: For trend analysis and time-series data.
- **Custom Visualizations**: Special components for workflow stages and KPI gauges.

## Customization

### Theming

The application uses CSS variables for theming. You can customize colors, shadows, and transitions by modifying the CSS variables in `src/components/dashboard/KPTCDashboard.css`.

### Adding New Charts

1. Create a new chart component in the `src/components/charts` directory
2. Import the necessary chart components from react-chartjs-2
3. Add your data and configuration
4. Import and add the component to KPTCDashboard.jsx

## Contribution

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Chart.js for the visualization components
- Bootstrap Icons for the icon set
- React community for the excellent documentation and tools

## Contact

Project Link: [https://kptc.com/dashboard](https://kptc.com/dashboard)

KPTC Support - [support@kptc.com](mailto:support@kptc.com)

---

Made with ❤️ for Kuwait Public Transport Company
