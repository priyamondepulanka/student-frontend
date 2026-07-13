import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import Home from "./Home";
import StudentManage from "./StudentManage";
 
function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/manage" element={<StudentManage />} />
            </Routes>
        </BrowserRouter>
    );
}
 
export default App;