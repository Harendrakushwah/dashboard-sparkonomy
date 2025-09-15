import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import "./Dashboard.css";
import plusIcon from "../../assets/Vector.png";
import logo from '../../assets/logo.png'

type Invoice = {
  id: number;
  title: string;
  date: string;
  amount: string;
  status:
    | "Paid"
    | "Unpaid"
    | "Disputed"
    | "Partially Paid"
    | "Overdue"
    | "Archived"
    | "Draft";
};

const invoices: Invoice[] = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  title: `Income Trend`,
  date: `2024-06-${String(1 + i).padStart(2, "0")}`,
  amount: `\u20B9${(125000 + i * 2000).toLocaleString()}`,
  status: [
    "Paid",
    "Unpaid",
    "Disputed",
    "Partially Paid",
    "Overdue",
    "Archived",
    "Draft",
  ][i % 7] as Invoice["status"],
}));

const chartData = [
  { name: "Jan", income: 4000, momGrowth: 20 },
  { name: "Feb", income: 3000, momGrowth: 40 },
  { name: "Mar", income: 2000, momGrowth: 10 },
  { name: "Apr", income: 2780, momGrowth: 60 },
  { name: "May", income: 1890, momGrowth: 30 },
  { name: "Jun", income: 2390, momGrowth: 80 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <button className="back-btn">&lt; Back</button>
        <h3>Dashboard</h3>
        <div className="profile">H</div>
      </div>

      <div className="dashboard-card">
        <div className="invoice-card">
          <div className="plus-icon">
            <img src={plusIcon} alt="My Asset" width={200} />
          </div>
          <h2 className="gradient-title">Create New Invoice</h2>
          <p className="create-subText">
            Start by creating and sending new invoice
          </p>
        </div>

        <div>
          <p className="upload-subText">
            Or Upload an existing invoice and set payment remainder
          </p>
        </div>
        <div className="summary">
          <div className="time-period">
            <div className="summary-head-container">
              <span>Time Period</span>
            </div>
            <div className="period-btns">
              <button>1 Month</button>
              <button className="active">3 Months</button>
              <button>1 Year</button>
            </div>
          </div>
        </div>
        <div className="summary">
          <div className="earnings-container">
            <span>Total Earnings</span>
            <h3 className="earnings-text">$1,25,000</h3>
          </div>
        </div>

        <div className="payments">
          <div className="payment-box">
            <span>Payment Awaited</span>
            <p>$25,000</p>
          </div>
          <div className="payment-box">
            <span>Payment Overdue</span>
            <p>$25,000</p>
          </div>
        </div>

        <div className="content-section">
          <div className="chart-title-container">
            <p>Income Trend</p>
          </div>
          <div className="chart-subtitle-container">
            <p className="chart-subtitle">
              Your monthly income and growth for the last 6 months.
            </p>
          </div>
          <div className="chart-box">
            <div className="chart-container">
              <ResponsiveContainer>
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Bar
                    yAxisId="left"
                    dataKey="income"
                    barSize={20}
                    fill="#8b5cf6"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="momGrowth"
                    stroke="#ec4899"
                    strokeWidth={3}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="invoices-box">
          <div className="invoice-title-container">
            <h3>Your Invoices</h3>
          </div>
          <div className="invoices-list">
            {invoices.map((inv) => (
              <div key={inv.id} className="invoice-item">
                <div>
                  <p className="invoice-title">{inv.title}</p>
                  <div className="date-amount-container">
                    <p>{inv.amount},</p>
                    <p className="invoice-date">Due: {inv.date}</p>
                  </div>
                </div>
                <div className={`invoice-status ${inv.status
                      .toLowerCase()
                      .replace(" ", "-")}`}>
                  <span
                    className={`status ${inv.status
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  >
                    {inv.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer className="footer">
          <img src={logo} alt="Company logo" />
          <p>Sparkline · tracking the income recovery</p>
        </footer>
      </div>
    </div>
  );
}
