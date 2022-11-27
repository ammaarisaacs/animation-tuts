let el = drag,
  mouseDownPosition = 0,
  currentTranslateX = 0,
  moveBy = 0,
  isRunning = false,
  isMouseDown = false,
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
  console.log("hello");
  cancelAnimationFrame(slideAnimationId);
  isMouseDown = true;
  currentTranslateX = getTranslateX();
  mouseDownPosition = e.clientX;
  requestAnimationFrame(mouseDownAnimation);
};

const handleMouseMove = (e) => {
  e.preventDefault();
  moveBy = e.clientX - mouseDownPosition + currentTranslateX;
  if (needRAF && isMouseDown) {
    needRAF = false;
    mouseDownAnimationId = requestAnimationFrame(mouseDownAnimation);
  }
};

const handleMouseUp = (e) => {
  e.preventDefault();
  cancelAnimationFrame(mouseDownAnimationId);
  isMouseDown = false;
  mouseUpPosition = el.getBoundingClientRect().left;
  slideAnimationId = requestAnimationFrame(slideAnimation);
  mouseUpTranslateX = getTranslateX();
  console.log(mouseUpTranslateX);
};

const mouseDownAnimation = () => {
  needRAF = true;
  el.style.transform = `translateX(${moveBy}px)`;
};

const slideAnimation = (timeStamp) => {
  if (!slideStartTime) slideStartTime = timeStamp;

  startTranslateX = mouseUpTranslateX;
  // need to give curr pos + transform value to start position in this anim
  // need to change the transform using speed
  // think about times

  //must pause the animation or reset the time to zero

  el.style.transform = `translateX(${startTranslateX}px)`;

  time = time + timeStamp - previousTime;
  timeElapsed = timeStamp - slideStartTime - pauseTime;
  previousTime = timeStamp;
  startTranslateX = pos(timeElapsed);

  el.style.transform = `translateX(${startTranslateX}px)`;
  //el.style.transform = `translateX(${moveBy}px)`;
  slideAnimationId = requestAnimationFrame(slideAnimation);
};

const getTranslateX = () => {
  let translateX = parseInt(
    getComputedStyle(el, null).getPropertyValue("transform").split(",")[4]
  );
  return translateX;
};

const pos = (time) => {
  return (X_SPEED * time) % WIDTH;
};

el.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
el.addEventListener("mouseup", handleMouseUp);
