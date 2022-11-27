let el = drag,
  mouseDownPosition = 0,
  currentTranslateX = 0,
  slideTranslateX = 0,
  moveBy = 0,
  isSliding = false,
  isMouseDown = false,
  paused = false,
  needRAF = true,
  mouseDownAnimationId,
  slideAnimationId,
  timeStamp = 0,
  slideStartTime = null,
  timeElapsed = 0,
  pauseTime = 0,
  time = 0,
  previousTime = 0,
  mouseUpPosition = 0,
  startPosition = 0;

const X_SPEED = 0.1,
  WIDTH = screen.width;
divWidth = parseInt(getComputedStyle(el, null).getPropertyValue("width"));

const handleMouseDown = (e) => {
  e.preventDefault();
  isSliding = false;
  cancelAnimationFrame(slideAnimationId);
  isMouseDown = true;
  currentTranslateX = getTranslateX();
  mouseDownPosition = e.clientX;
  requestAnimationFrame(mouseDownAnimation);
};

const handleMouseMove = (e) => {
  moveBy = e.clientX - mouseDownPosition + currentTranslateX;
  if (needRAF && isMouseDown) {
    needRAF = false;
    mouseDownAnimationId = requestAnimationFrame(mouseDownAnimation);
  }
};

const handleMouseUp = (e) => {
  cancelAnimationFrame(mouseDownAnimationId);
  isMouseDown = false;
  isSliding = true;
  mouseUpTranslateX = getTranslateX();
  slideAnimationId = requestAnimationFrame(slideAnimation);
};

const mouseDownAnimation = () => {
  needRAF = true;
  el.style.transform = `translateX(${moveBy}px)`;
};

const slideAnimation = (timeStamp) => {
  //initializing startTime
  if (!slideStartTime) slideStartTime = timeStamp;

  //could possibly make another boolean to check make initial translation the same as the translation coming out of mouseUp
  startTranslateX = mouseUpTranslateX;

  //it's not only pause time, you are moving the div, so actually you need to cancel the animation and start the time from over and start on the mouseup translate
  //solutions
  //-> try using an incremental translate and add to it every request anim frame
  //->
  if (isSliding && !paused) {
    if (startTranslateX !== slideTranslateX) {
      timeElapsed = timeStamp - slideStartTime - pauseTime;
    }

    slideTranslateX = pos(timeElapsed);
    el.style.transform = `translateX(${slideTranslateX + startTranslateX}px)`;
    slideAnimationId = requestAnimationFrame(slideAnimation);
  } else if (isSliding && paused) {
    pauseTime = timeStamp - slideStartTime - timeElapsed;
    timeElapsed = timeStamp - slideStartTime - pauseTime;
    paused = false;
    requestAnimationFrame(slideAnimation);
    console.log("calculated paused time");
  }
};

const getTranslateX = () => {
  return parseInt(
    getComputedStyle(el, null).getPropertyValue("transform").split(",")[4]
  );
};

const pos = (time) => {
  return (X_SPEED * time) % WIDTH;
};

el.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
document.addEventListener("mouseup", handleMouseUp);
