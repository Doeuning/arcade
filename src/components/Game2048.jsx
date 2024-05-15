"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const GameWrapper = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background: #222;
`;

const NumberBox = styled.div`
  user-select: none;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  border: 10px solid #333;
  border-radius: 20px;
  background: #000;
  font-weight: 700;
  font-size: 50px;
  color: #fff;
`;

function Game2048() {
  // number array
  const [numberArray, setNumberArray] = useState([
    {
      num: 2,
      posX: 0,
      posY: 0,
      position: { top: 0, left: 0 },
    },
  ]);

  // direction
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState([0, 0]);
  const [direction, setDirection] = useState(null);

  const handleMouseStart = (e) => {
    setTouchStart([e.clientX, e.clientY]);
  };
  const handleMouseEnd = (e) => {
    setTouchEnd([e.clientX, e.clientY]);
  };
  const handleTouchStart = (e) => {
    setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
  };
  const handleTouchEnd = (e) => {
    setTouchEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
  };
  const detectDirection = () => {
    const diffX = touchEnd[0] - touchStart[0];
    const diffY = touchEnd[1] - touchStart[1];
    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("right") : setDirection("left");
    } else {
      diffY > 0 ? setDirection("down") : setDirection("up");
    }
  };

  // new tile
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const addNewNumber = () => {
    const num = getRandom(1, 2) * 2;
    const numX = getRandom(0, 3);
    const numY = getRandom(0, 3);
    const isDuplicate = numberArray.some((obj) => {
      return obj.posX === numX && obj.posY === numY;
    });
    const makeNewTile = () => {
      const newTile = {
        num: num,
        posX: numX,
        posY: numY,
        position: {
          top: numY * 100,
          left: numX * 100,
        },
      };
      setNumberArray((prev) => [...prev, newTile]);
    };
    if (isDuplicate) {
      addNewNumber();
    } else {
      makeNewTile();
    }
  };

  // finish game
  const finishGame = () => {
    alert("죽었다!");
  };

  useEffect(() => {
    console.log("load -------------");
    console.log("방향", direction);
    console.log("------------finish load");
  }, []);

  useEffect(() => {
    return () => {
      console.log("touch end --------------");
      // 문제구간
      if (numberArray.length < 16) {
        detectDirection();
        addNewNumber();
        console.log("numberArray ", numberArray);
        console.log("direction", direction);
      } else {
        console.log("게임끝");
        finishGame();
      }

      console.log("-------------touend ");
    };
  }, [touchEnd]);

  return (
    <GameWrapper
      onMouseDown={handleMouseStart}
      onTouchStart={handleTouchStart}
      onMouseUp={handleMouseEnd}
      onTouchEnd={handleTouchEnd}
    >
      {numberArray.length &&
        numberArray.map((numObj, i) => {
          {
            /* console.log(numberArray, "###########################");
          console.log("----JSX load --number object 생성", i, numObj); */
          }
          return (
            <NumberBox
              key={i}
              style={{ top: numObj.position.top, left: numObj.position.left }}
            >
              {numObj.num}
            </NumberBox>
          );
        })}
    </GameWrapper>
  );
}

export default Game2048;
