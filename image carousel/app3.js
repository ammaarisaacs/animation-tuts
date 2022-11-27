let el = drag,
  elWidth = drag.getBoundingClientRect().width,
  cntr = container,
  containerLeft = cntr.getBoundingClientRect().left,
  containerWidth = cntr.getBoundingClientRect().width,
  containerRight = cntr.getBoundingClientRect().right,
  mouseDownPosition = 0,
  mouseUpPosition = null,
  isSlidingForward = true,
  currentTranslateX = 0,
  slideTranslateX = 0,
  moveBy = 0,
  isMouseDown = false,
  mouseMoveAnimationId;

const X_SPEED = 0.1;

const handleMouseDown = (e) => {
  e.preventDefault();
  isMouseDown = true;
  slideTranslateX = 0;
  currentTranslateX = getTranslateX();
  mouseDownPosition = e.clientX;
  requestAnimationFrame(mouseMoveAnimation);
};

const handleMouseMove = (e) => {
  moveBy = e.clientX - mouseDownPosition + currentTranslateX;
  if (isMouseDown) {
    mouseMoveAnimationId = requestAnimationFrame(mouseMoveAnimation);
  }
};

const handleMouseUp = (e) => {
  cancelAnimationFrame(mouseMoveAnimationId);
  mouseUpPosition = e.clientX;
  el.style.left = `${e.clientX}px`;
  isMouseDown = false;
  requestAnimationFrame(slideAnimation);
};

const mouseMoveAnimation = () => {
  el.style.transform = `translateX(${moveBy}px)`;
};

const slideAnimation = () => {
  if (!isMouseDown) {
    let divLeft = el.getBoundingClientRect().left;
    let divRight = el.getBoundingClientRect().right;

    if (mouseUpPosition) {
      if (mouseUpPosition < containerLeft) {
        el.style.left = "0px";
        slideTranslateX = -elWidth;
        isSlidingForward = true;
      }

      if (mouseUpPosition > containerRight) {
        el.style.left = "0px";
        slideTranslateX = containerWidth;
        isSlidingForward = false;
      }

      mouseUpPosition = null;
    }

    if (isSlidingForward) {
      slideTranslateX += 7;
      if (divLeft >= containerRight) {
        isSlidingForward = false;
      }
    } else {
      slideTranslateX -= 7;
      if (divRight <= containerLeft) {
        isSlidingForward = true;
      }
    }

    el.style.transform = `translateX(${slideTranslateX}px)`;
    requestAnimationFrame(slideAnimation);
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
el.addEventListener("mouseup", handleMouseUp);
document.addEventListener("onload", requestAnimationFrame(slideAnimation));
