const div = document.querySelector(".first");
const button = document.querySelector("button");
console.log(button);

button.addEventListener("click", () => {
  div.classList.add("clicked");
});

// div.style.setProperty("border-bottom-left-radius", setRadii());

// function setRadii() {
//   const x = getRandomNumber(0, 100);
//   const y = getRandomNumber(0, 100);
//   return `${x}% ${y}%`;
// }

// function getRandomNumber(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }
