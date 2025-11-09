
import React, { useState } from 'react';
import GameValueEditor from './components/GameValueEditor';
import CurrencyGenerator from './components/CurrencyGenerator';

enum AppView {
  GameValueEditor,
  CurrencyGenerator,
}

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.GameValueEditor);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-4xl text-center py-6 sm:py-10 mb-8 bg-gray-800 rounded-lg shadow-xl">
        <h1 className="text-5xl font-extrabold text-white leading-tight mb-2">
          Game <span className="text-purple-500">Utility</span> Simulator
        </h1>
        <p className="text-lg text-gray-400">
          Una herramienta de demostración interactiva
        </p>
      </header>

      <nav className="w-full max-w-xl flex justify-center space-x-4 sm:space-x-6 mb-10 p-2 bg-gray-800 rounded-full shadow-lg">
        <button
          onClick={() => setCurrentView(AppView.GameValueEditor)}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out ${
            currentView === AppView.GameValueEditor
              ? 'bg-emerald-600 text-white shadow-md transform scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
        >
          Editor de Valores
        </button>
        <button
          onClick={() => setCurrentView(AppView.CurrencyGenerator)}
          className={`px-6 py-3 rounded-full text-lg font-semibold transition-all duration-300 ease-in-out ${
            currentView === AppView.CurrencyGenerator
              ? 'bg-purple-600 text-white shadow-md transform scale-105'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
          }`}
        >
          Generador de Monedas
        </button>
      </nav>

      <main className="w-full max-w-4xl flex-grow">
        {currentView === AppView.GameValueEditor && <GameValueEditor />}
        {currentView === AppView.CurrencyGenerator && <CurrencyGenerator />}
      </main>

      <footer className="w-full max-w-4xl text-center py-6 mt-10 text-gray-500 text-sm border-t border-gray-700 pt-8">
        <p>
          Desarrollado como una simulación interactiva. No realiza modificaciones reales en juegos.
        </p>
        <p className="mt-2 text-xs">
          Roblox y Free Fire son marcas registradas de sus respectivos dueños.
        </p>
      </footer>
    </div>
  );
};

export default App;
    