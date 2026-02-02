import Main from "./components/Main";
import Nav from "./components/Nav";
import Statistic from "./components/Statistic";

function App() {
  return (
    <div className="bg-indigo-950 min-h-screen font-['Carme']">
      <Nav></Nav>
      <Main></Main>
      <Statistic></Statistic>
    </div>
  );
}

export default App;
