import './App.css';
import Header from './components/Header';
import HelpForm from './components/HelpForm';
import HoneycombBackground from './components/HoneycombBackground';

function App() {
  // Only keeping the current user string;

  return (
    <div className="container">
      <HoneycombBackground />
      
      <Header />
      
      <main>
        <HelpForm />
      </main>
      

    </div>
  );
}

export default App;