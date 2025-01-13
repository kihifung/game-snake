import { useState, useEffect } from "react";
import "./App.css";

const randomPosition = () => ({
  x: Math.floor(Math.random() * 15),
  y: Math.floor(Math.random() * 15),
});
const initialApple = randomPosition; // 設定初始蘋果位置
const initialDirection = "right"; // 設定初始方向
const initialScore = 0; // 設定初始分數
// const initialHighScore = initialScore; // 設定初始歷史分數

function App() {
  const [snake, setSnake] = useState([randomPosition()]); // 蛇的起始位置
  const [apple, setApple] = useState(initialApple); // 蘋果的位置
  const [direction, setDirection] = useState(initialDirection); // 蛇的移動方向
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(initialScore);

  const [highScore, setHighScore] = useState(() => {
    const savedHighScore = localStorage.getItem("highScore");
    return savedHighScore ? parseInt(savedHighScore, 10) : 0; // 確保是數字，若無則預設為 0
  });

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (over && key === " ") {
        restartGame();
      }
      // 設定方向，不會來時的路徑
      if (key === "ArrowLeft" && direction !== "right") setDirection("left");
      else if (key === "ArrowRight" && direction !== "left")
        setDirection("right");
      else if (key === "ArrowUp" && direction !== "down") setDirection("up");
      else if (key === "ArrowDown" && direction !== "up") setDirection("down");
    };
    document.addEventListener("keydown", handleKeyDown); // 監聽鍵盤事件
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction, over]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (over) return;
      const head = { ...snake[0] };

      if (direction === "right") head.x += 1;
      else if (direction === "left") head.x -= 1;
      else if (direction === "down") head.y += 1;
      else if (direction === "up") head.y -= 1;

      if (
        head.x > 14 ||
        head.x < 0 ||
        head.y > 14 ||
        head.y < 0 ||
        snake.some((body) => body.x === head.x && body.y === head.y)
      ) {
        // alert("Game Over");
        //window.location.reload(); //自動重整視窗
        handleGameover();
        return;
      }

      const snakeCopy = [head, ...snake];

      if (apple.x === head.x && apple.y === head.y) {
        setApple({
          x: Math.floor(Math.random() * 15),
          y: Math.floor(Math.random() * 15),
        });
        // setScore(prev=> prev+1);
        setScore(score + 1);
      } else {
        snakeCopy.pop();
      }
      setSnake(snakeCopy);
    }, 100); // 速度
    return () => clearInterval(timer);
  }, [snake, direction, apple, score, over]);

  const handleGameover = () => {
    setDirection("stop");
    setOver(true);

    if (score > highScore) {
      localStorage.setItem("highScore", score); // 儲存最高分到localStorage
      setHighScore(score); //更新最高分
    }
  };

  const restartGame = () => {
    setOver(false);
    setSnake([randomPosition()]); // 重新設定蛇的位置
    setApple(initialApple); // 重新設定蘋果的位置
    setScore(initialScore);
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
      <div className="score">得分: {score} </div>
      <div className="score">歷史高分: {highScore} </div>
      {over && (
        <>
          <div className="score">遊戲結束</div>
          <div className="score">按下"空白鍵"，可重新遊戲</div>
        </>
      )}
    </div>
  );
}

export default App;
