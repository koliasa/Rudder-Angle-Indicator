const rudderScale = document.querySelector(".rudder-scale");
const rudderR = 60;
const rudderO = 7.5;
const rudderNeedle = document.querySelector(".rudder-needle");

for (let i = -45; i <= 45; i += 15) {
  const tick = document.createElement("div");
  tick.classList.add("rudder-tick");
  if (i < 0) tick.classList.add("red");
  if (i > 0) tick.classList.add("green");
  tick.style.transform = `rotate(${i}deg)`;
  rudderScale.appendChild(tick);

  const number = document.createElement("div");
  number.classList.add("rudder-number");
  number.textContent = i === 0 ? "0" : Math.abs(i);
  let angle = (i * Math.PI) / 180;
  let x = rudderR * Math.sin(angle);
  let y = -rudderR * Math.cos(angle);
  let ox = i === 0 ? 0 : i > 0 ? rudderO : -rudderO;
  let oy = -4;
  if (Math.abs(i) === 45) {
    ox += i > 0 ? -2.5 : 2.5;
    oy += 1.5;
  } else if (Math.abs(i) === 30) {
    oy += 1;
  }
  if (i < 0) {
    number.textContent = `-${Math.abs(i)}`;
  }
  number.style.left = 65 + x + ox + "px";
  number.style.top = 65 + y + oy + "px";
  rudderScale.appendChild(number);
}

const rudderSlider = document.querySelector('input[type="range"]');
const rudderSliderTicks = document.querySelector(".rudder-slider-ticks");
const rudderSliderMin = -45;
const rudderSliderMax = 45;
const rudderSliderStep = 15;
const rudderSliderRange = rudderSliderMax - rudderSliderMin;

for (let i = rudderSliderMin; i <= rudderSliderMax; i += rudderSliderStep) {
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
});
