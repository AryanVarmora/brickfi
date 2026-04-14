import { useState } from 'react';

const RentalCalculator = () => {
  const [form, setForm] = useState({
    purchasePrice: '',
    monthlyRent: '',
    downPayment: '20',
    interestRate: '7',
    loanTerm: '30',
    propertyTax: '1.2',
    insurance: '0.5',
    maintenance: '1',
    vacancyRate: '5',
    managementFee: '10',
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setResult(null);
  };

  const calculate = () => {
    const price = parseFloat(form.purchasePrice);
    const rent = parseFloat(form.monthlyRent);
    const downPct = parseFloat(form.downPayment) / 100;
    const rate = parseFloat(form.interestRate) / 100 / 12;
    const months = parseFloat(form.loanTerm) * 12;
    const taxRate = parseFloat(form.propertyTax) / 100;
    const insuranceRate = parseFloat(form.insurance) / 100;
    const maintenanceRate = parseFloat(form.maintenance) / 100;
    const vacancy = parseFloat(form.vacancyRate) / 100;
    const mgmtFee = parseFloat(form.managementFee) / 100;

    if (!price || !rent) return;

    // Mortgage calculation
    const loanAmount = price * (1 - downPct);
    const monthlyMortgage = rate === 0 ? loanAmount / months :
      (loanAmount * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);

    // Annual income
    const grossAnnualRent = rent * 12;
    const effectiveRent = grossAnnualRent * (1 - vacancy);
    const managementCost = effectiveRent * mgmtFee;
    const netRentalIncome = effectiveRent - managementCost;

    // Annual expenses
    const annualTax = price * taxRate;
    const annualInsurance = price * insuranceRate;
    const annualMaintenance = price * maintenanceRate;
    const annualMortgage = monthlyMortgage * 12;
    const totalExpenses = annualTax + annualInsurance + annualMaintenance + annualMortgage + managementCost;

    // Yields
    const grossYield = (grossAnnualRent / price) * 100;
    const netYield = (netRentalIncome / price) * 100;
    const cashFlow = netRentalIncome - annualTax - annualInsurance - annualMaintenance - annualMortgage;
    const monthlyCashFlow = cashFlow / 12;
    const capRate = ((netRentalIncome - annualTax - annualInsurance - annualMaintenance) / price) * 100;
    const downPaymentAmount = price * downPct;
    const cashOnCash = (cashFlow / downPaymentAmount) * 100;
    const breakEven = cashFlow > 0 ? (downPaymentAmount / cashFlow).toFixed(1) : 'N/A';

    setResult({
      monthlyMortgage: monthlyMortgage.toFixed(0),
      grossAnnualRent: grossAnnualRent.toFixed(0),
      netRentalIncome: netRentalIncome.toFixed(0),
      grossYield: grossYield.toFixed(2),
      netYield: netYield.toFixed(2),
      capRate: capRate.toFixed(2),
      cashOnCash: cashOnCash.toFixed(2),
      monthlyCashFlow: monthlyCashFlow.toFixed(0),
      annualCashFlow: cashFlow.toFixed(0),
      totalExpenses: totalExpenses.toFixed(0),
      breakEven,
      downPaymentAmount: downPaymentAmount.toFixed(0),
      loanAmount: loanAmount.toFixed(0),
    });
  };

  const fmt = (val) => `$${Math.round(val).toLocaleString()}`;
  const isPositive = (val) => parseFloat(val) >= 0;

  return (
    <div className="calculator-page">
      <div className="compare-hero">
        <h2>💰 Rental Yield Calculator</h2>
        <p>Analyze the investment potential of any rental property</p>
      </div>

      <div className="calculator-grid">
        {/* Input Form */}
        <div className="calculator-form">
          <h3>Property Details</h3>

          <div className="calc-section">
            <h4>Purchase Info</h4>
            <div className="calc-field">
              <label>Purchase Price ($)</label>
              <input type="number" name="purchasePrice" value={form.purchasePrice}
                onChange={handleChange} placeholder="e.g. 350000" />
            </div>
            <div className="calc-field">
              <label>Monthly Rent ($)</label>
              <input type="number" name="monthlyRent" value={form.monthlyRent}
                onChange={handleChange} placeholder="e.g. 2500" />
            </div>
            <div className="calc-field">
              <label>Down Payment (%)</label>
              <input type="number" name="downPayment" value={form.downPayment}
                onChange={handleChange} />
            </div>
          </div>

          <div className="calc-section">
            <h4>Mortgage</h4>
            <div className="calc-field">
              <label>Interest Rate (%)</label>
              <input type="number" name="interestRate" value={form.interestRate}
                onChange={handleChange} step="0.1" />
            </div>
            <div className="calc-field">
              <label>Loan Term (years)</label>
              <input type="number" name="loanTerm" value={form.loanTerm}
                onChange={handleChange} />
            </div>
          </div>

          <div className="calc-section">
            <h4>Annual Expenses (% of property value)</h4>
            <div className="calc-field">
              <label>Property Tax (%)</label>
              <input type="number" name="propertyTax" value={form.propertyTax}
                onChange={handleChange} step="0.1" />
            </div>
            <div className="calc-field">
              <label>Insurance (%)</label>
              <input type="number" name="insurance" value={form.insurance}
                onChange={handleChange} step="0.1" />
            </div>
            <div className="calc-field">
              <label>Maintenance (%)</label>
              <input type="number" name="maintenance" value={form.maintenance}
                onChange={handleChange} step="0.1" />
            </div>
            <div className="calc-field">
              <label>Vacancy Rate (%)</label>
              <input type="number" name="vacancyRate" value={form.vacancyRate}
                onChange={handleChange} step="0.1" />
            </div>
            <div className="calc-field">
              <label>Management Fee (%)</label>
              <input type="number" name="managementFee" value={form.managementFee}
                onChange={handleChange} step="0.1" />
            </div>
          </div>

          <button onClick={calculate} disabled={!form.purchasePrice || !form.monthlyRent}>
            💰 Calculate Returns
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="calculator-results">
            <h3>Investment Analysis</h3>

            {/* Key Metrics */}
            <div className="calc-metrics">
              <div className={`calc-metric-card ${parseFloat(result.cashOnCash) >= 5 ? 'positive' : 'negative'}`}>
                <span className="metric-label">Cash-on-Cash Return</span>
                <span className="metric-value">{result.cashOnCash}%</span>
                <span className="metric-hint">{parseFloat(result.cashOnCash) >= 5 ? '✅ Good investment' : '⚠️ Below average'}</span>
              </div>
              <div className={`calc-metric-card ${parseFloat(result.capRate) >= 5 ? 'positive' : 'negative'}`}>
                <span className="metric-label">Cap Rate</span>
                <span className="metric-value">{result.capRate}%</span>
                <span className="metric-hint">{parseFloat(result.capRate) >= 5 ? '✅ Good cap rate' : '⚠️ Low cap rate'}</span>
              </div>
              <div className={`calc-metric-card ${isPositive(result.monthlyCashFlow) ? 'positive' : 'negative'}`}>
                <span className="metric-label">Monthly Cash Flow</span>
                <span className="metric-value">{isPositive(result.monthlyCashFlow) ? '+' : ''}{fmt(result.monthlyCashFlow)}</span>
                <span className="metric-hint">{isPositive(result.monthlyCashFlow) ? '✅ Positive cash flow' : '❌ Negative cash flow'}</span>
              </div>
              <div className="calc-metric-card neutral">
                <span className="metric-label">Break Even</span>
                <span className="metric-value">{result.breakEven} {result.breakEven !== 'N/A' ? 'yrs' : ''}</span>
                <span className="metric-hint">Years to recoup investment</span>
              </div>
            </div>

            {/* Detailed Breakdown */}
            <div className="calc-breakdown">
              <h4>📊 Income & Expenses</h4>
              <div className="breakdown-row">
                <span>Gross Annual Rent</span>
                <span className="green">+{fmt(result.grossAnnualRent)}</span>
              </div>
              <div className="breakdown-row">
                <span>Net Rental Income (after vacancy & mgmt)</span>
                <span className="green">+{fmt(result.netRentalIncome)}</span>
              </div>
              <div className="breakdown-row">
                <span>Annual Mortgage Payments</span>
                <span className="red">-{fmt(result.monthlyMortgage * 12)}</span>
              </div>
              <div className="breakdown-row">
                <span>Total Annual Expenses</span>
                <span className="red">-{fmt(result.totalExpenses)}</span>
              </div>
              <div className="breakdown-row total">
                <span>Annual Cash Flow</span>
                <span style={{ color: isPositive(result.annualCashFlow) ? '#22c55e' : '#ef4444' }}>
                  {isPositive(result.annualCashFlow) ? '+' : ''}{fmt(result.annualCashFlow)}
                </span>
              </div>
            </div>

            <div className="calc-breakdown">
              <h4>📈 Yield Metrics</h4>
              <div className="breakdown-row">
                <span>Gross Rental Yield</span>
                <span>{result.grossYield}%</span>
              </div>
              <div className="breakdown-row">
                <span>Net Rental Yield</span>
                <span>{result.netYield}%</span>
              </div>
              <div className="breakdown-row">
                <span>Cap Rate</span>
                <span>{result.capRate}%</span>
              </div>
              <div className="breakdown-row">
                <span>Cash-on-Cash Return</span>
                <span>{result.cashOnCash}%</span>
              </div>
            </div>

            <div className="calc-breakdown">
              <h4>🏦 Financing</h4>
              <div className="breakdown-row">
                <span>Down Payment</span>
                <span>{fmt(result.downPaymentAmount)}</span>
              </div>
              <div className="breakdown-row">
                <span>Loan Amount</span>
                <span>{fmt(result.loanAmount)}</span>
              </div>
              <div className="breakdown-row">
                <span>Monthly Mortgage</span>
                <span>{fmt(result.monthlyMortgage)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentalCalculator;