import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="w-full max-w-lg">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-8">

          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-3xl font-bold text-white shadow-lg shadow-blue-900/20">
              $
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
              Currency Exchanger
            </h1>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Convert your currency easily
            </p>
          </div>

          <CurrencyConverter />
        </div>
      </div>
    </main>
  );
}

export default App;