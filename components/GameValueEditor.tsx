
import React, { useState, useEffect, useCallback } from 'react';
import { GameValue } from '../types';

const LOCAL_STORAGE_KEY = 'gameValues';

const GameValueEditor: React.FC = () => {
  const [valueName, setValueName] = useState<string>('');
  const [currentValue, setCurrentValue] = useState<string>('');
  const [newValue, setNewValue] = useState<string>('');
  const [savedValues, setSavedValues] = useState<GameValue[]>([]);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const storedValues = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValues) {
      setSavedValues(JSON.parse(storedValues));
    }
  }, []);

  const saveValuesToLocalStorage = useCallback((values: GameValue[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(values));
  }, []);

  const handleApplyValue = () => {
    if (!valueName || !newValue) {
      setMessage('Por favor, ingresa el nombre y el nuevo valor.');
      return;
    }

    const updatedValues = savedValues.map((val) =>
      val.name === valueName ? { ...val, value: newValue } : val
    );

    if (!updatedValues.some((val) => val.name === valueName)) {
      updatedValues.push({ id: Date.now().toString(), name: valueName, value: newValue });
    }

    setSavedValues(updatedValues);
    saveValuesToLocalStorage(updatedValues);
    setMessage(`Valor '${valueName}' aplicado y guardado: ${newValue}`);
    setCurrentValue(newValue); // Update current value display
  };

  const handleLoadValue = () => {
    const found = savedValues.find((val) => val.name === valueName);
    if (found) {
      setCurrentValue(found.value);
      setNewValue(found.value);
      setMessage(`Valor '${valueName}' cargado: ${found.value}`);
    } else {
      setCurrentValue('');
      setNewValue('');
      setMessage(`Valor '${valueName}' no encontrado.`);
    }
  };

  const handleClearAll = () => {
    setSavedValues([]);
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setMessage('Todos los valores guardados han sido eliminados.');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-2xl mx-auto my-8">
      <h2 className="text-3xl font-bold mb-6 text-emerald-400">Editor de Valores de Juego (Simulación)</h2>
      <p className="text-gray-400 mb-6">
        Esta sección simula la modificación y el guardado de valores para fines de demostración.
        No interactúa con ningún juego externo.
      </p>

      <div className="space-y-4 mb-6">
        <div>
          <label htmlFor="valueName" className="block text-gray-300 text-sm font-bold mb-2">
            Nombre del Valor:
          </label>
          <input
            type="text"
            id="valueName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            value={valueName}
            onChange={(e) => {
              setValueName(e.target.value);
              setMessage(''); // Clear message on input change
            }}
            placeholder="Ej: Oro, Puntos, Vida"
          />
        </div>

        <div>
          <label htmlFor="currentValue" className="block text-gray-300 text-sm font-bold mb-2">
            Valor Actual (simulado):
          </label>
          <input
            type="text"
            id="currentValue"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100 cursor-not-allowed"
            value={currentValue}
            readOnly
            placeholder="Cargado o aplicado"
          />
        </div>

        <div>
          <label htmlFor="newValue" className="block text-gray-300 text-sm font-bold mb-2">
            Nuevo Valor:
          </label>
          <input
            type="text"
            id="newValue"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-700 border-gray-600 text-gray-100"
            value={newValue}
            onChange={(e) => {
              setNewValue(e.target.value);
              setMessage(''); // Clear message on input change
            }}
            placeholder="Ingrese el nuevo valor"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={handleApplyValue}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 min-w-[120px]"
        >
          Aplicar Valor
        </button>
        <button
          onClick={handleLoadValue}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 min-w-[120px]"
        >
          Cargar Valor
        </button>
        <button
          onClick={handleClearAll}
          className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 min-w-[120px]"
        >
          Borrar Todo
        </button>
      </div>

      {message && (
        <p className="mt-4 p-3 bg-indigo-700 text-indigo-100 rounded text-sm text-center">
          {message}
        </p>
      )}

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-200">Valores Guardados (simulados localmente):</h3>
        {savedValues.length === 0 ? (
          <p className="text-gray-500 italic">No hay valores guardados actualmente.</p>
        ) : (
          <ul className="list-disc list-inside space-y-2 text-gray-300">
            {savedValues.map((val) => (
              <li key={val.id} className="bg-gray-700 p-2 rounded-md flex justify-between items-center">
                <span>
                  <strong className="text-emerald-300">{val.name}:</strong> {val.value}
                </span>
                <button
                  onClick={() => {
                    const filteredValues = savedValues.filter((v) => v.id !== val.id);
                    setSavedValues(filteredValues);
                    saveValuesToLocalStorage(filteredValues);
                    setMessage(`Valor '${val.name}' eliminado.`);
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white text-xs py-1 px-2 rounded transition duration-200"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default GameValueEditor;
    