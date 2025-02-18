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
  const [numberArray, setNumberArray] = useState([]);

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
    active();
  };
  const handleTouchStart = (e) => {
    setTouchStart([e.touches[0].clientX, e.touches[0].clientY]);
  };
  const handleTouchEnd = (e) => {
    setTouchEnd([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);

    const diffX = touchStart[0] - e.clientX;
    const diffY = touchStart[1] - e.clientY;
    console.log(diffX, diffY);

    if (Math.abs(diffX) > Math.abs(diffY)) {
      diffX > 0 ? setDirection("left") : setDirection("right");
    } else {
      diffY > 0 ? setDirection("up") : setDirection("down");
    }
    active();
  };
  const goAction = () => {
    const moveTiles = () => {
      console.log("move tiles");
      if (direction === "left") {
        setNumberArray((prevArray) => {
          return prevArray.map((obj) => {
            const newPosX = obj.posX - 1;
            if (newPosX >= 0) {
              return {
                ...obj,
                posX: newPosX,
                position: { ...obj.position, left: newPosX * 100 },
              };
            } else {
              return obj;
            }
          });
          // const isDuplicate = prevArray.length
          //   ? prevArray.some((obj) => {
          //       console.log(numX, numY, obj.posX === numX, obj.posY === numY);
          //       return obj.posX === numX && obj.posY === numY;
          //     })
          //   : false;
          // if (!isDuplicate) {
          //   const newTile = {
          //     num: num,
          //     posX: numX,
          //     posY: numY,
          //     position: {
          //       top: numY * 100,
          //       left: numX * 100,
          //     },
          //   };
          //   return [...prevArray, newTile];
          // } else {
          //   addNewNumber();
          //   return prevArray;
          // }
        });
      }
    };
    const addTileNumber = () => {
      console.log("add numbers");
    };
    moveTiles();
    addTileNumber();
  };

  // new tile
  const addNewNumber = () => {
    const num = getRandom(1, 2) * 2;
    const numX = getRandom(0, 3);
    const numY = getRandom(0, 3);

    setNumberArray((prevArray) => {
      const isDuplicate = prevArray.length
        ? prevArray.some((obj) => {
            console.log(numX, numY, obj.posX === numX, obj.posY === numY);
            return obj.posX === numX && obj.posY === numY;
          })
        : false;
      if (!isDuplicate) {
        const newTile = {
          num: num,
          posX: numX,
          posY: numY,
          position: {
            top: numY * 100,
            left: numX * 100,
          },
        };
        return [...prevArray, newTile];
      } else {
        addNewNumber();
        return prevArray;
      }
    });
  };

  const active = () => {
    if (numberArray.length < 16) {
      addNewNumber();
      console.log("numberArray ", numberArray);
    } else {
      console.log("게임끝");
      finishGame();
    }
    goAction();
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
