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
      // 이전 기록
      // const moveTiles = () => {
      //   if (direction === "left") {
      //     setNumberArray((prevArray) => {
      //       return prevArray
      //         .filter((tile, i) => {
      //           if (tile.posY === prevArray[i + 1]?.posY) {
      //             if (tile.num === prevArray[i + 1]?.num) {
      //               return false;
      //             }
      //           } else {
      //             return true;
      //           }
      //         })
      //         .map((tile, i) => {
      //           if (
      //             tile.posY === prevArray[i + 1]?.posY &&
      //             tile.num === prevArray[i + 1].num
      //           ) {
      //             console.log("조건 부합 ", tile);
      //             return { ...tile, num: tile.num * 2, posX: 0 };
      //           }
      //           return tile;
      //         });
      //     });
      //     console.log(numberArray);
      //   }
      //   // direction을 받아서
      //   // left일 때
      //   // tile의 posX와 posX-1의 posY가 같으면
      //   // number이 같으면
      //   // (tile의 posX를 제일 작은 수로)
      //   // tile의 posX를 posX-1로 이동하고
      //   // tile의 number를 더한다
      //   // tile 객체를 삭제한다
      //   // bottom일 때
      //   // tile의 posY와 posY+1의 posX가 같으면
      //   // number이 같으면
      //   // (tile의 posY를 제일 큰 수로)
      //   // tile의 posY를 posY+1로 이동하고
      //   // tile의 number를 더한다
      //   // tile 객체를 삭제한다
      //   console.log("move tiles");
      // };
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
    addNewNumber();
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
      goAction();
      console.log("numberArray ", numberArray);
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
      {numberArray.length &&
        numberArray.map((numObj, i) => {
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
