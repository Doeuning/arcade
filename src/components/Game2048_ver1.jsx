"use client";

import { Shadows_Into_Light_Two } from "next/font/google";
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
  transition: all 0.3s;
`;

function Game2048() {
  // number array
  const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const checkAllNonZero = (arr) => {
    return arr.every((subArr) => subArr.every((num) => num !== 0));
  };

  // data structure

  const [flag, setFlag] = useState(false);
  const [numberArray, setNumberArray] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
  const firstNum = 2;

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
    console.log(diffX, diffY);

    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("left") : setDirection("right");
    } else {
      diffY > 0 ? setDirection("up") : setDirection("down");
    }
    if (checkAllNonZero(numberArray)) {
      finishGame();
      return false;
    }
    moveTiles();
    console.log("move left done", numberArray);
  };
  const handleTouchStart = (e) => {
    setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
  };
  const handleTouchEnd = (e) => {
    setTouchEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
    setTimeout(() => {
      detectDirection();
    }, 1000);
  };
  const moveTiles = () => {
    console.log("move left", numberArray);

    // setNumberArray((prevArray) => {
    //   return prevArray.map((row, index) => {
    //     const removeZero = row.filter((num) => {
    //       return num > 0;
    //     });
    //     console.log(index, "filter zero", removeZero);

    //     const addNumbers = removeZero.map((num, i) => {
    //       if (num === removeZero[i + 1]) {
    //         return num * 2;
    //       } else if (num === removeZero[i - 1]) {
    //         return 0;
    //       } else {
    //         return num;
    //       }
    //     });
    //     console.log(index, "add number ", addNumbers);

    //     const zerosCount = row.length - addNumbers.length;
    //     console.log("innn", [...addNumbers, ...Array(zerosCount).fill(0)]);
    //     return [...addNumbers, ...Array(zerosCount).fill(0)];
    //   });
    // });
    const calculatedArray = numberArray.map((row, index) => {
      const removeZero = row.filter((num) => {
        return num > 0;
      });
      console.log(index, "filter zero", removeZero);

      const addNumbers = removeZero.map((num, i) => {
        if (num === removeZero[i + 1]) {
          return num * 2;
        } else if (num === removeZero[i - 1]) {
          return 0;
        } else {
          return num;
        }
      });
      console.log(index, "add number ", addNumbers);

      const zerosCount = row.length - addNumbers.length;
      console.log("innn", [...addNumbers, ...Array(zerosCount).fill(0)]);
      return [...addNumbers, ...Array(zerosCount).fill(0)];
    });
    setNumberArray(calculatedArray);
    addNewNumber(calculatedArray);
  };
  // new tile
  const addNewNumber = (calculatedArray) => {
    const array = calculatedArray ? calculatedArray : numberArray;
    setNumberArray(() => {
      const newArray = array.map((arr) => [...arr]);
      const r = getRandom(0, 3);
      const c = getRandom(0, 3);
      if (newArray[r][c] === 0) {
        newArray[r][c] = 2;
        return newArray;
      } else {
        return addNewNumber();
      }
    });
    // setNumberArray(() => {
    //   const newArray = numberArray.map((arr) => [...arr]);
    //   const r = getRandom(0, 3);
    //   const c = getRandom(0, 3);
    //   if (newArray[r][c] === 0) {
    //     newArray[r][c] = 2;
    //     return newArray;
    //   } else {
    //     return addNewNumber();
    //   }
    // });
  };

  // finish game
  const finishGame = () => {
    alert("죽었다!");
  };

  useEffect(() => {
    console.log("load -------------");
    console.log("방향", direction);

    addNewNumber();
    setFlag(true);
    console.log("numberArray 로드 시 =======", numberArray);

    console.log("------------finish load");
  }, []);

  useEffect(() => {
    return () => {
      console.log(
        "------------numberArray changed---------------------",
        numberArray
      );
    };
  }, [numberArray]);

  useEffect(() => {
    return () => {
      console.log("touch end --------------");

      console.log("direction", direction);

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
      {numberArray &&
        numberArray.map((numRow, i) => {
          {
            console.log("numRow", numRow);
          }
          return (
            numRow &&
            numRow.map((num, j) => {
              if (num !== 0) {
                return (
                  <NumberBox
                    key={i + "-" + j}
                    style={{ top: i * 100, left: j * 100 }}
                  >
                    {num}
                  </NumberBox>
                );
              }
            })
          );
        })}
    </GameWrapper>
  );
}

export default Game2048;
