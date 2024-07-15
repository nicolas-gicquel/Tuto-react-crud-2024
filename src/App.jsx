import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Clubs from "./pages/clubs/Clubs";
import AddClub from "./pages/clubs/AddClub";
import EditClub from "./pages/clubs/EditClub";
import Players from "./pages/players/Players";
import AddPlayer from "./pages/players/AddPlayer";
import EditPlayer from "./pages/players/EditPlayer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

const token = localStorage.getItem("access_token");
console.log(token);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/clubs" element={token ? <Clubs/> : <Login/> }></Route>
      
        <Route path="/clubs/add" element={<AddClub />} />
        <Route path="/clubs/edit/:club" element={<EditClub/>} /> 
        {/* <Route path="/players" element={<Players />} /> */}
        <Route path="/players/add" element={<AddPlayer />} />
        {/* <Route path="/players/edit/:player" element={<EditPlayer />} /> */}
        <Route path="*" element={<Home />} />{" "}
      </Routes>{" "}
    </BrowserRouter>
  );
}
export default App;
