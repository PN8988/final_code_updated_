// src/components/TransactionReportForm.jsx
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
// import {useLocation} from 'react';
import "./TransactionReport.css"; // optional
import { useLocation } from "react-router-dom";

const columns = [
  { key: "tx_year", label: "TX Year" },
  { key: "tx_month", label: "TX Month" },
  { key: "tx_date", label: "TX Date" },
  { key: "transaction_type", label: "Transaction Type" },
  { key: "trn_vch_id", label: "Voucher ID" },
  { key: "cheque_ref_no", label: "Cheque/Ref No" },
  { key: "narration", label: "Narration" },
  { key: "ledger_date", label: "Ledger Date" },
  { key: "payment_amt", label: "Payment Amt" },
  { key: "receipt_amt", label: "Receipt Amt" },
  { key: "balance_amt", label: "Balance Amt" },
  { key: "payment_ledger", label: "Payment Ledger" },
  { key: "recpt_ledger", label: "Receipt Ledger" },
  { key: "contra_ledger", label: "Contra Ledger" },
];

function formatINR(n) {
  if (n === null || n === undefined || n === "") return "";
  const v = Number(n);
  if (Number.isNaN(v)) return n;
  return v.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function TransactionReport() {
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [batchId, setBatchId] = useState(() => sessionStorage.getItem("lastImportBatchId") || "");
  const [fy, setFy] = useState("");
  const [month, setMonth] = useState("");
  const [search, setSearch] = useState("");
 const location = useLocation();
  const transactions = location.state?.transactions || [];

  const fetchData = async () => {
    setLoading(true);
    try {
      const params = {};
      if (batchId) params.batchId = batchId;
      if (fy) params.fy = fy;
      if (month) params.month = month;

      const res = await axios.get("/api/transactions", { params });
      const data = res.data || [];

      // Ensure running balance exists if backend didn’t send it
      let running = 0;
      const normalized = data.map((r) => {
        // tx_date is ISO date; tx_year/month derived if not present
        const d = r.tx_date ? new Date(r.tx_date) : null;
        const tx_year = r.tx_year ?? (d ? String(d.getFullYear()) : "");
        const tx_month = r.tx_month ?? (d ? String(d.getMonth() + 1).padStart(2, "0") : "");
        const payment = Number(r.payment_amt || 0);
        const receipt = Number(r.receipt_amt || 0);
        running = r.balance_amt != null ? Number(r.balance_amt) : running + receipt - payment;

        return {
          ...r,
          tx_year,
          tx_month,
          balance_amt: r.balance_amt != null ? r.balance_amt : running,
        };
      });

      setRows(normalized);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const q = search.toLowerCase();
    return rows.filter((r) =>
      Object.values(r).some((v) => String(v ?? "").toLowerCase().includes(q))
    );
  }, [rows, search]);

  const totals = useMemo(() => {
    const payment = filtered.reduce((s, r) => s + Number(r.payment_amt || 0), 0);
    const receipt = filtered.reduce((s, r) => s + Number(r.receipt_amt || 0), 0);
    return { payment, receipt };
  }, [filtered]);

  const exportCSV = () => {
    const header = columns.map(c => c.label).join(",");
    const lines = filtered.map(r =>
      columns.map(c => {
        const val = r[c.key] ?? "";
        const s = typeof val === "number" ? val : String(val).replaceAll('"', '""');
        return `"${s}"`;
      }).join(",")
    );
    const blob = new Blob([header + "\n" + lines.join("\n")], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transaction-report${batchId ? "-" + batchId : ""}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="txn-report-container">
      <h2 className="title">Transaction Report (Tally-style)</h2>

      <div className="toolbar">
        <input
          placeholder="Search narration, voucher, ref no, ledger..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          placeholder="Batch ID"
          value={batchId}
          onChange={(e) => setBatchId(e.target.value)}
        />
        <input
          placeholder="FY (e.g., 2024-2025)"
          value={fy}
          onChange={(e) => setFy(e.target.value)}
        />
        <input
          placeholder="Month (M01..M12 or 01..12)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />
        <button onClick={fetchData} disabled={loading}>{loading ? "Loading..." : "Refresh"}</button>
        <button onClick={exportCSV}>Export CSV</button>
      </div>

      <div className="table-wrap">
        <table className="txn-table">
          <thead>
            <tr>
              {columns.map((c) => (
                <th key={c.key}>{c.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr key={r.id ?? idx}>
                <td>{r.tx_year}</td>
                <td>{r.tx_month}</td>
                <td>{r.tx_date}</td>
                <td>{r.transaction_type}</td>
                <td>{r.trn_vch_id}</td>
                <td>{r.cheque_ref_no}</td>
                <td title={r.narration}>{r.narration}</td>
                <td>{r.ledger_date ?? ""}</td>
                <td style={{ textAlign: "right" }}>{formatINR(r.payment_amt)}</td>
                <td style={{ textAlign: "right" }}>{formatINR(r.receipt_amt)}</td>
                <td style={{ textAlign: "right" }}>{formatINR(r.balance_amt)}</td>
                <td>{r.payment_ledger}</td>
                <td>{r.recpt_ledger}</td>
                <td>{r.contra_ledger}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={8} style={{ textAlign: "right", fontWeight: 600 }}>Totals:</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>{formatINR(totals.payment)}</td>
              <td style={{ textAlign: "right", fontWeight: 600 }}>{formatINR(totals.receipt)}</td>
              <td colSpan={3}></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
