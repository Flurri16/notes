import React from "react";
import Main from "./components/Main";
import Nav from "./components/Nav";
import Notes from "./components/Notes";
import Statistic from "./components/Statistic";

function App() {
  const [selectedNote, setSelectedNote] = React.useState(null);
  return (
    <div className="bg-indigo-950 min-h-screen font-['Carme']">
      <Nav></Nav>
      <Main note={selectedNote}></Main>
      <Statistic></Statistic>
      <Notes onSelectNote={setSelectedNote}></Notes>
    </div>
  );
}

export default App;
