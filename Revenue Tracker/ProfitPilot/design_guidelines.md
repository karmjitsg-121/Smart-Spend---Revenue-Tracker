# Revenue Tracker Design Guidelines

## Design Approach
**Design System**: Modern Dashboard Design inspired by Linear and Stripe Dashboard
- Clean, data-focused interface prioritizing clarity and efficiency
- Consistent component hierarchy for financial data display
- Professional aesthetic suitable for business/finance context

## Typography System
**Font Families** (via Google Fonts):
- Primary: Inter (weights: 400, 500, 600, 700)
- Monospace: JetBrains Mono (for currency values)

**Hierarchy**:
- Page Titles: 2xl, semibold (600)
- Section Headers: xl, semibold (600)
- Card Titles: lg, medium (500)
- Body Text: base, regular (400)
- Labels: sm, medium (500)
- Currency Values: lg-2xl, monospace, semibold (600)
- Metrics/Stats: 3xl-4xl, monospace, bold (700)

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Card spacing: space-y-4
- Form field spacing: gap-4

**Grid Structure**:
- Main dashboard: 3-column metric cards at top (grid-cols-3)
- Charts section: 2-column layout (grid-cols-1 lg:grid-cols-2)
- Transaction history: Full-width table below charts
- Sidebar navigation: Fixed 16-unit width with main content area

**Container Strategy**:
- App container: max-w-7xl with px-6
- Cards: Full width within grid cells
- Forms: max-w-2xl for optimal input width

## Core Components

**Dashboard Layout**:
- Top navigation bar with app logo, date range selector, add transaction button
- Three metric cards: Total Revenue, Total Expenses, Net Profit (prominent display)
- Two-column chart section: Line chart (Monthly Trends) + Pie chart (Expense Breakdown)
- Transaction history table with filters (date, category, type)

**Metric Cards**:
- Large monospace numbers with trend indicators (up/down arrows with percentages)
- Icon representing metric type (Heroicons: arrow-trending-up, arrow-trending-down, banknotes)
- Subtle description text below main value
- Card elevation with rounded-lg borders

**Transaction Form** (Modal or Slide-over):
- Date picker input (default: today)
- Amount input with currency symbol prefix
- Type selector: Income/Expense (toggle or radio buttons)
- Category dropdown with icon prefixes
- Description textarea
- Save/Cancel button pair (primary + ghost)

**Charts Integration**:
- Chart.js via CDN for data visualization
- Line chart: X-axis (months), Y-axis (amount), two lines (revenue/expenses)
- Pie chart: Category breakdown with legend
- Chart containers with equal height (h-80)

**Transaction Table**:
- Columns: Date, Description, Category (with icon), Type (badge), Amount (right-aligned monospace)
- Row hover states
- Pagination or infinite scroll for long lists
- Filter bar above table: Date range, category dropdown, type filter
- Icons: Heroicons (calendar, tag, currency-dollar)

**Form Controls**:
- Input fields with labels above
- Focus rings using Tailwind's ring utilities
- Error states with message below input
- Dropdown with chevron indicator
- Date picker with calendar icon

**Buttons**:
- Primary: Solid background, rounded-lg, px-6 py-3
- Secondary: Outlined with border
- Ghost: Transparent with hover state
- Sizes: sm (forms), base (cards), lg (primary actions)

**Navigation**:
- Sidebar with icon + label navigation items
- Active state indicator (vertical accent line or background highlight)
- Sections: Dashboard, Transactions, Categories, Reports

## Component Specifications

**Metric Card Structure**:
- Icon in top-left (h-10 w-10)
- Label text below icon
- Large value (4xl monospace)
- Trend indicator with percentage change
- Padding: p-6

**Category Badge**:
- Small rounded pill with icon + text
- Icon from Heroicons matching category (shopping-bag, briefcase, home, etc.)
- Consistent sizing: px-3 py-1, text-sm

**Empty States**:
- Centered content with icon (h-16 w-16)
- Heading explaining no data
- CTA button to add first transaction
- Spacing: py-12

## Responsive Behavior
- Desktop (lg+): 3-column metrics, 2-column charts, full table
- Tablet (md): 2-column metrics, stacked charts, scrollable table
- Mobile: Single column metrics, stacked charts, card-based transactions (replace table)

## Data Display Patterns
- Currency formatting: Always 2 decimal places, comma separators
- Positive values: Standard display
- Negative values: Minus sign prefix for expenses
- Date formatting: MMM DD, YYYY
- Percentage changes: +/- with one decimal place

## Accessibility
- All form inputs with associated labels
- ARIA labels for icon-only buttons
- Keyboard navigation for all interactive elements
- Sufficient contrast for all text (AA standard)
- Focus indicators on all interactive elements