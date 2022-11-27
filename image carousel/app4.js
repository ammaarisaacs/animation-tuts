import { urls } from "./images.js";
let el = drag,
  docFrag = document.createDocumentFragment(),
  cntr = container,
  containerLeft = cntr.getBoundingClientRect().left,
  containerRight = cntr.getBoundingClientRect().right,
  containerWidth = cntr.getBoundingClientRect().width,
  mouseDownPosition = 0,
  mouseUpPosition = null,
  isSlidingForward = true,
  currentTranslateX = 0,
  slideTranslateX = 0,
  moveBy = 0,
  isMouseDown = false,
  shouldMove = true,
  mouseMoveAnimationId;

urls.forEach((url) => {
  let img = document.createElement("img");
  img.src = url;
  docFrag.appendChild(img);
  img.className = "block";
});

el.appendChild(docFrag);

let divWidth = el.getBoundingClientRect().width,
  isWider = divWidth > containerWidth;

const handleMouseDown = (e) => {
  e.preventDefault();
  isMouseDown = true;
  slideTranslateX = 0;
  mouseDownPosition = e.clientX;
  currentTranslateX = parseInt(
    getComputedStyle(el, null).getPropertyValue("transform").split(",")[4]
  );

  moveBy = e.clientX - mouseDownPosition + currentTranslateX;
};

const handleMouseMove = (e) => {
  if (
    isWider &&
    (el.getBoundingClientRect().left > containerLeft ||
      el.getBoundingClientRect().right < containerRight)
  )
    return;

  moveBy = e.clientX - mouseDownPosition + currentTranslateX;

  if (isMouseDown && shouldMove) {
    mouseMoveAnimationId = requestAnimationFrame(mouseMoveAnimation);
  }
};

const handleMouseUp = (e) => {
  cancelAnimationFrame(mouseMoveAnimationId);
  mouseUpPosition = e.clientX;
  el.style.left = "0px";
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
      el.style.left = "0px";
      slideTranslateX = divLeft - containerLeft;
      mouseUpPosition = null;
    }

    if (isWider) {
      if (isSlidingForward) {
        slideTranslateX += 3;
        if (divLeft >= containerLeft) {
          isSlidingForward = false;
        }
      } else {
        slideTranslateX -= 3;
        if (divRight <= containerRight) {
          isSlidingForward = true;
        }
      }
    } else {
      if (isSlidingForward) {
        slideTranslateX += 3;
        if (divLeft >= containerLeft) {
          isSlidingForward = false;
        }
      } else {
        slideTranslateX -= 3;
        if (divRight <= containerLeft) {
          isSlidingForward = true;
        }
      }
    }

    el.style.transform = `translateX(${slideTranslateX}px)`;
    requestAnimationFrame(slideAnimation);
  }
};

el.addEventListener("mousedown", handleMouseDown);
document.addEventListener("mousemove", handleMouseMove);
el.addEventListener("mouseup", handleMouseUp);
document.addEventListener("onload", requestAnimationFrame(slideAnimation));
// links
// https://medium.com/@pasutosh/moving-a-div-in-both-direction-by-requestanimationframe-fdfe5c33089b
// https://stackoverflow.com/questions/16554094/canvas-requestanimationframe-pause
// https://stackoverflow.com/questions/36098039/javascript-move-element-with-mousemove-event-60-fps-requestanimationframe
//
