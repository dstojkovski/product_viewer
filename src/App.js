import Navbar from "./Components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import ParentComponent from "./Components/HomePage/ParentComponent";


function App() {
  return (
    <div className="App">
      <Navbar/>
      <div className="container">
        <div>
          <ParentComponent/>
        </div>
      </div>
    </div>
  );
}

export default App;
