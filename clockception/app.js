const container = document.querySelector(".container");
const normalDivs = document.querySelectorAll(".clock div");
let number = 0;
const patterns = [
  [
    [90, -90, 0, 0, 0, 0],
    [180, 180, 180, -180, 90, -90],
  ],
  [
    [45, 180, 45, 0, 45, 0],
    [45, 180, 45, 180, 45, 0],
  ],
  [
    [90, -90, 90, 0, 0, -90],
    [90, 180, 180, -90, 90, -90],
  ],
  [
    [90, -90, 90, 0, 90, -90],
    [90, 180, 90, -90, 90, 0],
  ],
  [
    [180, 180, 0, 0, 45, 0],
    [180, 180, 90, -90, 45, 0],
  ],
  [
    [90, -90, 0, -90, 90, 0],
    [180, -90, 90, 180, 90, -90],
  ],
  [
    [90, -90, 90, -90, 90, 0],
    [180, -90, 180, 180, 0, -90],
  ],
  [
    [90, -90, 45, 0, 45, 0],
    [90, 180, 45, 180, 45, 0],
  ],
  [
    [90, -90, 90, -90, 90, 0],
    [180, 180, 180, 180, 0, -90],
  ],
  [
    [90, -90, 0, -90, 90, 0],
    [180, 180, 90, 180, 90, -90],
  ],
];
const hours1 = document.querySelectorAll(".hours1 .clock");
const hours2 = document.querySelectorAll(".hours2 .clock");
const minutes1 = document.querySelectorAll(".minutes1 .clock");
const minutes2 = document.querySelectorAll(".minutes2 .clock");
const seconds1 = document.querySelectorAll(".seconds1 .clock");
const seconds2 = document.querySelectorAll(".seconds2 .clock");
// console.log(clocks[0].firstElementChild);

function secondsFunction() {
  const date = new Date();
  const seconds = date.getSeconds();
  seconds1Value = !seconds.toString()[1] ? 0 : seconds.toString()[0];
  seconds2Value = !seconds.toString()[1]
    ? seconds.toString()[0]
    : seconds.toString()[1];
  for (let i = 0; i < 6; i++) {
    let hourAngles = [
      patterns[seconds1Value][0][i],
      patterns[seconds2Value][0][i],
    ];
    let secondAngles = [
      patterns[seconds1Value][1][i],
      patterns[seconds2Value][1][i],
    ];
    seconds1[i].firstElementChild.style.transform =
      `rotate(${hourAngles[0]}deg)`;
    seconds1[i].lastElementChild.style.transform =
      `rotate(${secondAngles[0]}deg)`;
    seconds2[i].firstElementChild.style.transform =
      `rotate(${hourAngles[1]}deg)`;
    seconds2[i].lastElementChild.style.transform =
      `rotate(${secondAngles[1]}deg)`;
  }
  console.log(seconds);
}

function minutesFunction() {
  const date = new Date();
  const minutes = date.getMinutes();
  minutes1Value = !minutes.toString()[1] ? 0 : minutes.toString()[0];
  minutes2Value = !minutes.toString()[1]
    ? minutes.toString()[0]
    : minutes.toString()[1];
  for (let i = 0; i < 6; i++) {
    let hourAngles = [
      patterns[minutes1Value][0][i],
      patterns[minutes2Value][0][i],
    ];
    let secondAngles = [
      patterns[minutes1Value][1][i],
      patterns[minutes2Value][1][i],
    ];
    minutes1[i].firstElementChild.style.transform =
      `rotate(${hourAngles[0]}deg)`;
    minutes1[i].lastElementChild.style.transform =
      `rotate(${secondAngles[0]}deg)`;
    minutes2[i].firstElementChild.style.transform =
      `rotate(${hourAngles[1]}deg)`;
    minutes2[i].lastElementChild.style.transform =
      `rotate(${secondAngles[1]}deg)`;
  }

  //   console.log(seconds);
}

function hoursFunction() {
  const date = new Date();
  let hours = Number(date.getHours());
  if (hours > 12) {
    hours -= 12;
  }
  hours1Value = !hours.toString()[1] ? 0 : hours.toString()[0];
  hours2Value = !hours.toString()[1]
    ? hours.toString()[0]
    : hours.toString()[1];
  for (let i = 0; i < 6; i++) {
    let hourAngles = [patterns[hours1Value][0][i], patterns[hours2Value][0][i]];
    let secondAngles = [
      patterns[hours1Value][1][i],
      patterns[hours2Value][1][i],
    ];
    hours1[i].firstElementChild.style.transform = `rotate(${hourAngles[0]}deg)`;
    hours1[i].lastElementChild.style.transform =
      `rotate(${secondAngles[0]}deg)`;
    hours2[i].firstElementChild.style.transform = `rotate(${hourAngles[1]}deg)`;
    hours2[i].lastElementChild.style.transform =
      `rotate(${secondAngles[1]}deg)`;
  }
  //   console.log(seconds);
}

function increment() {
  secondsFunction();
  minutesFunction();
  hoursFunction();
}

setInterval(increment, 1000);
