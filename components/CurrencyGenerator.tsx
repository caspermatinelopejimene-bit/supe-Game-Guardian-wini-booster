
import React, { useState, useCallback, useEffect } from 'react';
import { GeneratedCurrency } from '../types';

const LOCAL_STORAGE_CURRENCY_KEY = 'generatedCurrencyHistory';

const CurrencyGenerator: React.FC = () => {
  const [game, setGame] = useState<'Roblox' | 'Free Fire'>('Roblox');
  const [userId, setUserId] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const [history, setHistory] = useState<GeneratedCurrency[]>([]);

  useEffect(() => {
    const storedHistory = localStorage.getItem(LOCAL_STORAGE_CURRENCY_KEY);
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const saveHistoryToLocalStorage = useCallback((newHistory: GeneratedCurrency[]) => {
    localStorage.setItem(LOCAL_STORAGE_CURRENCY_KEY, JSON.stringify(newHistory));
  }, []);

  const handleGenerateCurrency = () => {
    if (!userId || amount <= 0) {
      setMessage('Por favor, ingresa un ID de usuario válido y una cantidad mayor que cero.');
      return;
    }

    const newEntry: GeneratedCurrency = {
      game,
      userId,
      amount,
      timestamp: new Date().toLocaleString(),
    };

    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    saveHistoryToLocalStorage(updatedHistory);

    setMessage(
      `¡Simulación de generación de ${amount} ${game === 'Roblox' ? 'Robux' : 'Diamantes'} para el ID ${userId} completada con éxito!`
    );
    setUserId('');
    setAmount(0);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-purple-400">Generador de Moneda Virtual (Simulación)</h2>
      <p className="text-gray-400 mb-6">
        Esta herramienta simula la generación de Robux o Diamantes. Es solo para fines de entretenimiento
        y no interactúa con los servidores de juegos reales.
      </p>

      <div className="flex mb-6 space-x-4">
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
            game === 'Roblox'
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => {
            setGame('Roblox');
            setMessage('');
          }}
        >
          Roblox Robux
        </button>
        <button
          className={`flex-1 py-2 px-4 rounded-lg font-semibold transition duration-200 ${
            game === 'Free Fire'
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => {
            setGame('Free Fire');
            setMessage('');
          }}
        >
          Free Fire Diamantes
        </button>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="userId" className="block text-gray-300 text-sm font-bold mb-2">
            ID de Usuario de {game}:
          </label>
          <input
            type="text"
            id="userId"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
              setMessage('');
            }}
            placeholder={`Ingresa tu ID de usuario de ${game}`}
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-300 text-sm font-bold mb-2">
            Cantidad a Generar:
          </label>
          <input
            type="number"
            id="amount"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            value={amount === 0 ? '' : amount}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setAmount(isNaN(val) ? 0 : val);
              setMessage('');
            }}
            placeholder="Ej: 1000"
            min="0"
          />
        </div>
      </div>

      <button
        onClick={handleGenerateCurrency}
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 transform hover:scale-105"
      >
        Generar {game === 'Roblox' ? 'Robux' : 'Diamantes'}
      </button>

      {message && (
        <p className="mt-6 p-4 bg-lime-700 text-lime-100 rounded text-center text-lg font-medium">
          {message}
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Historial de Generación (Local):</h3>
        {history.length === 0 ? (
          <p className="text-gray-500 italic">No hay historial de generación aún.</p>
        ) : (
          <ul className="space-y-3">
            {history.map((entry, index) => (
              <li key={index} className="bg-gray-700 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-gray-200 mb-1 sm:mb-0">
                  <strong className="text-purple-300">{entry.game}:</strong> {entry.amount} {' '}
                  {entry.game === 'Roblox' ? 'Robux' : 'Diamantes'} para ID <span className="font-mono text-sm bg-gray-600 px-2 py-0.5 rounded">{entry.userId}</span>
                </span>
                <span className="text-gray-400 text-xs">{entry.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
        {history.length > 0 && (
          <button
            onClick={() => {
              setHistory([]);
              localStorage.removeItem(LOCAL_STORAGE_CURRENCY_KEY);
              setMessage('Historial de generación borrado.');
            }}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 text-sm"
          >
            Borrar Historial
          </button>
        )}
      </div>
    </div>
  );
};

export default CurrencyGenerator;
    