// import logo from './logo.svg';
import './App.css';
import Hero from './components/Hero';
function App() {
  console.log(process.env.REACT_APP_GOOGLE_PLACE_API_KEY)
  return (
    <div className="App ">
{/* <h1 className='bg-slate-700'>hii this is ai-travel-planning</h1> */}


 <Hero/>
    </div>
    
  );
}

export default App;
