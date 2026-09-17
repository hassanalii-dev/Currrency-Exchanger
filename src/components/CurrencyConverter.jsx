import { useEffect, useState } from "react";
import axios from "axios";

function CurrencyConverter() {
  const API_KEY = "d2e4a485145c7d67ee7c1838";

  const [currencies, setCurrencies] = useState([]);

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(
          `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/USD`
        );

        const data = response.data;

        if (data.result !== "success") {
          throw new Error("Currency loading failed");
        }

        setCurrencies(Object.keys(data.conversion_rates).sort());
      } catch (error) {
        setError("Unable to load currencies.");
      } finally {
        setLoadingCurrencies(false);
      }
    };

    fetchCurrencies();
  }, []);

  const handleConvert = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      setResult(null);
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(Number(amount));
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await axios.get(
        `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromCurrency}`
      );

      const data = response.data;

      if (data.result !== "success") {
        throw new Error("Conversion failed");
      }

      const exchangeRate = data.conversion_rates[toCurrency];

      const convertedAmount = Number(amount) * exchangeRate;

      setResult(convertedAmount);
    } catch (error) {
      setError("Conversion failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loadingCurrencies) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        Loading currencies...
      </p>
    );
  }

  return (
    <div>
      <form onSubmit={handleConvert} className="space-y-5">

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            Amount
          </label>

          <input
            type="number"
            min="0"
            step="any"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-800 placeholder-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            From Currency
          </label>

          <select
            value={fromCurrency}
            onChange={(e) => {
              setFromCurrency(e.target.value);
              setResult(null);
            }}
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-base"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">
            To Currency
          </label>

          <select
            value={toCurrency}
            onChange={(e) => {
              setToCurrency(e.target.value);
              setResult(null);
            }}
            className="w-full cursor-pointer rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 sm:text-base"
          >
            {currencies.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-md transition duration-200 hover:bg-blue-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Converting..." : "Convert Currency"}
        </button>
      </form>

      {error && (
        <p className="mt-5 rounded-xl border border-red-200 bg-red-50 p-4 text-center text-sm text-red-600">
          {error}
        </p>
      )}

      {result !== null && !error && (
        <div className="mt-6 rounded-xl border border-blue-200 bg-blue-50 p-5 text-center">
          <p className="text-sm font-medium text-slate-500">
            Converted Amount
          </p>

          <h2 className="mt-2 break-words text-2xl font-bold text-slate-800 sm:text-3xl">
            {Number(result).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            })}{" "}
            <span className="">{toCurrency}</span>
          </h2>
        </div>
      )}
    </div>
  );
}

export default CurrencyConverter;