const rudderScale = document.querySelector(".rudder-scale");
const rudderR = 60;
const rudderO = 8;
const rudderNeedle = document.querySelector(".rudder-needle");

const totalPoints = 40;
const verticalOffset = 5;

for (let i = 0; i < totalPoints; i++) {
  const point = document.createElement("div");
  point.classList.add("rudder-point");

  const angle = i * (100 / (totalPoints - 1)) - 45;
  const x = rudderR * Math.sin((angle * Math.PI) / 180);
  const y = rudderR * Math.cos((angle * Math.PI) / 180);

  if (i % 3 === 0) point.classList.add("rudder-point-red");
  else if (i % 3 === 1) point.classList.add("rudder-point-green");
  else point.classList.add("rudder-point-white");

  point.style.left = `calc(50% + ${x}px)`;
  point.style.top = `calc(50% + ${y + verticalOffset}px)`;

  rudderScale.appendChild(point);
}

for (let i = -45; i <= 45; i += 15) {
  const tick = document.createElement("div");
  tick.classList.add("rudder-tick");

  if (i < 0) tick.classList.add("red");
  if (i > 0) tick.classList.add("green");

  tick.style.transform = `rotate(${i}deg)`;
  rudderScale.appendChild(tick);

  const number = document.createElement("div");
  number.classList.add("rudder-number");
  number.textContent = i;

  const angle = (i * Math.PI) / 180;
  const x = rudderR * Math.sin(angle);
  const y = rudderR * Math.cos(angle);
  let ox = i === 0 ? 0 : i > 0 ? rudderO : -rudderO;
  let oy = 4;

  if (Math.abs(i) === 45) {
    ox += i > 0 ? -2.5 : 2.5;
    oy -= 1.5;
  } else if (Math.abs(i) === 30) {
    oy -= 1;
  }

  number.style.left = 65 + x + ox + "px";
  number.style.top = 30 + y + oy + "px";
  rudderScale.appendChild(number);
}

const rudderSlider = document.querySelector('input[type="range"]');
const rudderSliderTicks = document.querySelector(".rudder-slider-ticks");
const rudderSliderMin = -45;
const rudderSliderMax = 45;
const rudderSliderStep = 1;
const rudderSliderRange = rudderSliderMax - rudderSliderMin;

for (let i = rudderSliderMin; i <= rudderSliderMax; i++) {
  const tick = document.createElement("div");
  tick.classList.add("rudder-slider-dot");
  tick.style.left = ((i - rudderSliderMin) / rudderSliderRange) * 100 + "%";
  rudderSliderTicks.appendChild(tick);
}

for (let i = rudderSliderMin; i <= rudderSliderMax; i += 15) {
  const tick = document.createElement("div");
  tick.classList.add("rudder-slider-tick");
  tick.style.left = ((i - rudderSliderMin) / rudderSliderRange) * 100 + "%";

  const number = document.createElement("div");
  number.classList.add("rudder-slider-number");
  number.textContent = i;
  number.style.left = ((i - rudderSliderMin) / rudderSliderRange) * 100 + "%";

  rudderSliderTicks.appendChild(tick);
  rudderSliderTicks.appendChild(number);
}

rudderSlider.addEventListener("input", function () {
  const sliderValue = this.value;

  rudderNeedle.style.transform = `translate(-50%, -100%) rotate(${
    sliderValue * -1
  }deg)`;

  if (sliderValue < -1) rudderNeedle.style.backgroundColor = "#ff0000";
  else if (sliderValue > 1) rudderNeedle.style.backgroundColor = "#00ff00";
  else rudderNeedle.style.backgroundColor = "#ffffff";
});
