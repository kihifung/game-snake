import { useState } from "react";
import "./App.css";

function App() {
  // 程式碼寫這裡
  const [snake, setSnake] = useState([
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ]); // 蛇的起始位置
  const [apple, setApple] = useState({ x: 6, y: 6 }); // 蘋果的位置
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
                let celltype = "";
                if (apple.x === colX && apple.y === rowY) {
                  celltype = "apple";
                }
                if (snake.some((body) => body.x === colX && body.y === rowY)) {
                  celltype = "snake";
                }

                return (
                  <div
                    className={`cell ${celltype}`}
                    key={`${colX}-${rowY}`}
                  ></div>
                );
              })
          )}
      </div>
    </div>
  );
}

export default App;
