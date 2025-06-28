
import { BrowserRouter,Routes,Route } from "react-router-dom";
import FoodCyclePage from "./pages/FoodCyclePage";
import Signup from "./pages/Signup";

function App(){

  return (
   <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FoodCyclePage/>}/>
        <Route path="/login" element={<h1>About Page</h1>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/homepage" element={<FoodCyclePage/>} />
        <Route path="/cart" element={<h1>Contact Page</h1>} />
      </Routes>
    </BrowserRouter>

   </>
  );
}

export default App;