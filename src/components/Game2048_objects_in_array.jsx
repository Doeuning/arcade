"use client";

import { useState, useEffect, useCallback } from "react";
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
  transition: 0.3s ease-in all;
`;

function Game2048() {
  // number array
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  const firstPosX = getRandom(0, 3);
  const firstPosY = getRandom(0, 3);
  const firstObj = {
    num: 2,
    posX: firstPosX,
    posY: firstPosY,
    position: { top: firstPosY * 100, left: firstPosX * 100 },
  };
  const [numberArray, setNumberArray] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const [count, setCount] = useState(0);

  // direction
  const [touchStart, setTouchStart] = useState([0, 0]);
  const [touchEnd, setTouchEnd] = useState([0, 0]);
  const [direction, setDirection] = useState(null);

  const handleMouseStart = (e) => {
    setTouchStart([e.clientX, e.clientY]);
  };
  const handleMouseEnd = (e) => {
    setTouchEnd([e.clientX, e.clientY]);

    const diffX = touchStart[0] - e.clientX;
    const diffY = touchStart[1] - e.clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("left") : setDirection("right");
    } else {
      diffY > 0 ? setDirection("up") : setDirection("down");
    }
    active();
  };
  const handleTouchStart = (e) => {
    setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
  };
  const handleTouchEnd = (e) => {
    setTouchEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);

    const diffX = touchStart[0] - e.changedTouches[0].clientX;
    const diffY = touchStart[1] - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("left") : setDirection("right");
    } else {
      diffY > 0 ? setDirection("up") : setDirection("down");
    }

    active();
  };
  const goAction = () => {
    const moveTiles = () => {
      console.log("move tiles start");
      if (direction === "left") {
        // setNumberPosition((prevArray) => {
        //   return prevArray.forEach((row, i) => {
        //     return row.forEach((cell, j) => {
        //       if (cell) {

        //       }
        //     });
        //   });
        // });
        numberArray.forEach((row, i) => {
          // row.forEach((obj, j) => {
          for (let j = 0; j < row[i].length; j++) {
            if (row[i][j] !== 0) {
              // for (let index = 0; index < obj.length; index++) {
              if (row[i][j].num === row[i][j + 1].num) {
                console.log("다음 숫자랑 같은 숫자");
                setNumberArray((prevArray) => {
                  return prevArray.map((prevRow, prevI) => {
                    return prevRow.map((prevObj, prevJ) => {
                      if (prevI === i && prevJ === j) {
                        return null;
                      } else if (prevI === i && prevJ === j + 1) {
                        return {
                          num: prevObj.num * 2,
                          posX: i,
                          posY: j,
                          position: {
                            top: i * 100,
                            left: j * 100,
                          },
                        };
                      } else {
                        return prevObj;
                      }
                    });
                  });
                });
                break;
              }
            }
          }
        });
      }
      console.log("----------move tiles finished");
      addNewNumber();
    };
    const plusTileNumber = () => {
      console.log("plus numbers");
    };
    moveTiles();
    plusTileNumber();
  };

  // new tile
  const addNewNumber = () => {
    console.log("add number");
    const num = getRandom(1, 2) * 2;
    const numX = getRandom(0, 3);
    const numY = getRandom(0, 3);
    const available = numberArray.some((row, i) => {
      if (i === numY) {
        return row.some((obj, j) => {
          return j === numX && obj === 0;
        });
      }
      return false;
    });

    if (available) {
      setNumberArray((prevArray) => {
        const newTile = {
          num: num,
          posX: numX,
          posY: numY,
          position: {
            top: numY * 100,
            left: numX * 100,
          },
        };
        return prevArray.map((row, i) => {
          if (i === numY) {
            return row.map((obj, j) => (j === numX ? newTile : obj));
          }
          return row;
        });
      });
      setCount((prev) => prev + 1);
    } else {
      addNewNumber();
    }
  };

  useEffect(() => {
    console.log("                     count ", count);
  }, [count]);

  const active = () => {
    if (count < 16) {
      goAction();
    } else {
      console.log("게임끝");
      finishGame();
    }
  };

  // finish game
  const finishGame = () => {
    alert("죽었다!");
  };

  useEffect(() => {
    console.log("load -------------");
    addNewNumber();
    console.log("------------finish load");
  }, []);

  return (
    <GameWrapper
      onMouseDown={handleMouseStart}
      onTouchStart={handleTouchStart}
      onMouseUp={handleMouseEnd}
      onTouchEnd={handleTouchEnd}
    >
      {numberArray.flatMap((row, i) => {
        return row
          .filter((numObj) => numObj !== 0)
          .map((numObj, j) => (
            <NumberBox
              key={`number_${i}_${j}`}
              style={{
                top: numObj.position.top,
                left: numObj.position.left,
              }}
            >
              {numObj.num}
            </NumberBox>
          ));
      })}
    </GameWrapper>
  );
}

export default Game2048;
