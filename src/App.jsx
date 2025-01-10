import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  // 程式碼寫這裡
  const [snake, setSnake] = useState([
    { x: 5, y: 5 },
    { x: 5, y: 6 },
    { x: 5, y: 7 },
  ]); // 蛇的起始位置
  const [apple, setApple] = useState({ x: 6, y: 6 }); // 蘋果的位置
  const [direction, setDirection] = useState("left"); // 蛇的移動方向
  const [over, setOver] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      if (over) {
        // clearInterval(timer);
        return;
      }
      const head = { ...snake[0] };

      if (direction === "right") head.x += 1;
      else if (direction === "left") head.x -= 1;
      else if (direction === "down") head.y += 1;
      else if (direction === "up") head.y -= 1;

      if (head.x > 14 || head.x < 0 || head.y > 14 || head.y < 0) {
        // alert("Game Over");
        window.location.reload(); //自動重整視窗
        handleGameover();
        return;
      }

      const snakeCopy = [head, ...snake];
      snakeCopy.pop();
      setSnake(snakeCopy);
    }, 200);
    return () => clearInterval(timer);
  }, [snake, direction]);

  const handleGameover = () => {
    setDirection("stop");
    setOver(true);
  };

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
