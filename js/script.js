document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const animateBrowser = document.querySelector('.animate-browser'),
      animateLeftSide = document.querySelector('.animate-left-side'),
      animateTopSide = document.querySelector('.animate-top-side'),
      animateRightSide = document.querySelector('.animate-right-side'),
      progressContainer = document.querySelector('.progress-container'),
      stackCoins = document.querySelector('.animate-stack-manets'),
      coins = document.querySelectorAll('.animate-maneta'),
      bars = document.querySelectorAll('.bar');

  const browserBlock = { count : 87, speed: 3, startPos: 85, endPos: 0 };
  const leftSideBlock = { count : -285, speed: 5, startPos: -285, endPos: 0 };
  const topSideBlock = { count : -156, speed: 3, startPos: -156, endPos: 0 };
  const rightSideBlock = { count : 444, speed: 6, startPos: 444, endPos: 0 };
  const progressContainerBlock = { count : 185, speed: 5, startPos: 185, endPos: 0 };
  const coinsBlock = { count : -1275, speed: 75, startPos: -1275, endPos: 0 };
  const stackCoinsBlock = { count : 0, speed: 19, startPos: 0, endPos: 190 };

  const regVariant = (() => {
    return requestAnimationFrame ||
      webkitRequestAnimationFrame ||
      mozRequestAnimationFrame ||
      oRequestAnimationFrame ||
      msRequestAnimationFrame ||
      function(callback) {
        setTimeout(callback, 1000 / 60)
      }
  })();

  const firstAnimate = () => {
      browserBlock.count -= browserBlock.speed;
      animateBrowser.style.transform = `translateX(${browserBlock.count}%)`;
      if (browserBlock.count > 0) {
        regVariant(firstAnimate);
      } else {
        regVariant(secondAnimate);
        regVariant(thirdAnimate);
        regVariant(fourthAnimate);
        regVariant(fifthAnimate);
        dropCoins(); 
      }
  };
  regVariant(firstAnimate);

  const secondAnimate = () => {
    leftSideBlock.count += leftSideBlock.speed;
    animateLeftSide.style.transform = `translateX(${leftSideBlock.count}%)`;
    if (leftSideBlock.count < leftSideBlock.endPos) requestAnimationFrame(secondAnimate);
  };

  const thirdAnimate = () => {
    topSideBlock.count += topSideBlock.speed;
    animateTopSide.style.transform = `translateY(${topSideBlock.count}%)`;
    if (topSideBlock.count < leftSideBlock.endPos) requestAnimationFrame(thirdAnimate);
  };

  const fourthAnimate = () => {
    rightSideBlock.count -= rightSideBlock.speed;
    animateRightSide.style.transform = `translateX(${rightSideBlock.count}%)`;
    if (rightSideBlock.count > rightSideBlock.endPos) requestAnimationFrame(fourthAnimate);
  };

  const fifthAnimate = () => {
    progressContainerBlock.count -= progressContainerBlock.speed;
    progressContainer.style.transform = `translateY(${progressContainerBlock.count}%) skewY(26deg)`;
    if (progressContainerBlock.count > progressContainerBlock.endPos) {
      requestAnimationFrame(fifthAnimate);
    } else {
      blockBars(bars[0], 30);
      setTimeout(() => {
        blockBars(bars[1], 55);
      }, 500);
      setTimeout(() => {
        blockBars(bars[2], 35);
      }, 1000);
      setTimeout(() => {
        blockBars(bars[3], 75);
      }, 1500);
      setTimeout(() => {
        randomizerFunc();
      }, 4000);
    }
  };

  // Coins down
  const funcCoins = (elem) => {
    const coinsAnimate = () => {
      coinsBlock.count += coinsBlock.speed;
      elem.style.transform = `translateY(${coinsBlock.count}%)`;
      if (coinsBlock.count < coinsBlock.endPos) {
        regVariant(coinsAnimate);
      } else {
        coinsBlock.count = coinsBlock.startPos;
      }
    };
    regVariant(coinsAnimate);
  };

  const dropCoins = () => {
    funcCoins(coins[0]);
    setTimeout(() => {
      funcCoins(coins[1]);
    }, 500);
    setTimeout(() => {
      funcCoins(coins[2]);
    }, 1000);
    setTimeout(() => {
      funcCoins(coins[3]);
    }, 1500);
    setTimeout(() => {
      funcCoins(coins[4]);
    }, 2000);
    setTimeout(() => {
      funcCoins(coins[5]);
    }, 2500);
    setTimeout(() => {
      funcCoins(coins[6]);
    }, 3000);
    setTimeout(() => {
      funcCoins(coins[7]);
      setTimeout(() => {
        dropCoinsStack();
      }, 1000);
    }, 3500);
  };

  const dropCoinsStack = () => {
    const stackAnimate = () => {
      stackCoinsBlock.count += stackCoinsBlock.speed;
      stackCoins.style.transform = `translateY(${stackCoinsBlock.count}px)`;
      if (stackCoinsBlock.count < stackCoinsBlock.endPos) {   regVariant(stackAnimate);
      } else {
        stackCoinsBlock.count = stackCoinsBlock.startPos;
        setTimeout(() => {
          stackCoins.style.transform = `translateY(${stackCoinsBlock.startPos}%)`;
          coins.forEach(item => {
            item.style.transform = `translateY(${coinsBlock.startPos}%)`;
          });
          setTimeout(() => {
            dropCoins();
          }, 1000) ;
        }, 2000);
      }
    };
    regVariant(stackAnimate);
  };

  // Blocks with Numbers
  const blockBars = (elem, height) => {
    let count = 0;
    const barsAnimate = () => {
      count++;
      elem.style.height = `${count}%`;
      if (count >= 5) {
        elem.querySelector('span').style.fontSize = '20px';
        elem.querySelector('span').textContent = count + '%';
      }
      if (count < height) regVariant(barsAnimate);
    };
    regVariant(barsAnimate);
  };
  const randomizerFunc = () => {
    let index = Math.floor(Math.random() * 4);
    let element = bars[index];
    let height = element.style.height;
    let heightNum = +height.substring(0, height.length - 1);
    let step = 1,
        count = 0;

    const randBarAniPlus = () => {
      heightNum += step;
      element.style.height = heightNum + '%';
      count += step;
      element.querySelector('span').textContent = heightNum + '%';

      if ( count < 25) {
        regVariant(randBarAniPlus);
      } else {
        count = 0;
        regVariant(randBarAniMinus);
      }
    };
    const randBarAniMinus = () => {
      heightNum -= step;
      element.style.height = heightNum + '%';
      count += step;
      element.querySelector('span').textContent = heightNum + '%';
      if ( count < 25) {
        regVariant(randBarAniMinus);
      } else {
        count = 0;
        randomizerFunc();
      }
    };
    regVariant(randBarAniPlus);
  };
  
});