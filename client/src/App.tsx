import Items from "./features/Items";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <h1>YouTube Data APIを使って「料理」動画をリスト表示</h1>
      </header>
      <Items />
    </div>
  );
}

export default App;
