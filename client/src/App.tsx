import { useNavigate } from 'react-router-dom';
import Footer from './components/Footer';

function App() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-50 px-4">
      <div className="flex grow flex-col items-center justify-center">
        <div className="mb-1">
          <h1 className="text-6xl font-extrabold font-logo tracking-tight select-none">
            <span className="text-blue-800">kieli</span>
            <span className="text-red-700">buddy</span>
          </h1>
        </div>
        <p className="mt-2 text-lg text-slate-500 font-medium text-center">
          Finnish vocabulary, simplified.
        </p>
        <div className="mt-12">
          <button
            onClick={() => navigate('/puzzle')}
            className="bg-blue-900 text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-blue-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-900/20 cursor-pointer"
          >
            try now
          </button>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default App
