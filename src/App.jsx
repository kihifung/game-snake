import { useState, useEffect } from "react";
import "./App.css";

const randomPosition = () => ({
  x: Math.floor(Math.random() * 20),
  y: Math.floor(Math.random() * 20),
});
const initialApple = randomPosition;
const initialDirection = "right";
const initialScore = 0;

function App() {
  const [snake, setSnake] = useState([randomPosition()]);
  const [apple, setApple] = useState(initialApple);
  const [direction, setDirection] = useState(initialDirection);
  const [over, setOver] = useState(false);
  const [score, setScore] = useState(initialScore);

  useEffect(() => {
    const handleKeyDown = ({ key }) => {
      if (over && key === " ") {
        restartGame();
      }
      if (key === "ArrowUp" && direction !== "down") setDirection("up");
      else if (key === "ArrowDown" && direction !== "up") setDirection("down");
      else if (key === "ArrowLeft" && direction !== "right")
        setDirection("left");
      else if (key === "ArrowRight" && direction !== "left")
        setDirection("right");
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [direction]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (over) return;
      const head = { ...snake[0] };

      if (direction === "right") head.x += 1;
      else if (direction === "left") head.x -= 1;
      else if (direction === "up") head.y -= 1;
      else if (direction === "down") head.y += 1;

      if (
        head.x > 19 ||
        head.x < 0 ||
        head.y > 19 ||
        head.y < 0 ||
        snake.some(
          (body, index) => index !== 0 && body.x === head.x && body.y === head.y
        )
      ) {
        handleGameover();
        return;
      }
      const snakeCopy = [head, ...snake];

      if (apple.x === head.x && apple.y === head.y) {
        setApple({
          x: Math.floor(Math.random() * 20),
          y: Math.floor(Math.random() * 20),
        });
        setScore((prev) => prev + 1);
      } else {
        snakeCopy.pop();
      }

      setSnake(snakeCopy);
    }, 100);
    return () => clearInterval(timer);
  }, [snake, direction]);

  const handleGameover = () => {
    setDirection("stop");
    setOver(true);
  };

  const restartGame = () => {
    setOver(false);
    setSnake([randomPosition()]);
    setApple(initialApple);
    setScore(initialScore);
  };

  return (
    <div className="App">
      <h1>貪食蛇</h1>
      <div className="game-area">
        {Array(20)
          .fill(0)
          .map((_, rowY) =>
            Array(20)
              .fill(0)
              .map((_, colX) => {
                let celltype = "";
                if (apple.x === colX && apple.y === rowY) {
                  celltype = "apple";
                }
                if (snake.some((body) => body.x === colX && body.y === rowY))
                  celltype = "snake";

                return (
                  <div className={`cell ${celltype}`} key={`${colX}-${rowY}`} />
                );
              })
          )}
      </div>
      <div className="score">得分: {score}</div>
      {over && (
        <>
          <div className="score">你死了ＱＱ</div>
          <div className="score">按下"空白鍵"，再來一次吧</div>
        </>
      )}
    </div>
  );
}

export default App;
