import CurrencyConverter from "./components/CurrencyConverter";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-4 py-8">

      <div className="w-full max-w-lg">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl shadow-black/40 sm:p-8">

          <div className="mb-8 text-center">

            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-3xl font-bold text-white shadow-lg shadow-blue-900/20">
              $
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Currency Exchanger
            </h1>

            <p className="mt-2 text-sm text-slate-400 sm:text-base">
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