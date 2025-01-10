import "./App.css";

function App() {
  // 程式碼寫這裡

  return (
    <div className="App">
      <h1>貪食蛇</h1>
      <div className="game-area">
        {Array(15) /*每一列全部有幾格*/
          .fill(0)
          .map((_, rowY) =>
            Array(15) /*有幾列*/
              .fill(0)
              .map((_, colX) => {
                return <div className="cell" key={`${colX}-${rowY}`}></div>;
              })
          )}
      </div>
    </div>
  );
}

export default App;
