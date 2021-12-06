// Each lanternfish creates a new fish every 7 days.
// Model each fish as a single number that represents the number of days until it creates a new lanternfish.
// New lanternfish need 2 days before first reproduction cycle.
const stat = document.querySelector("#status");
stat.textContent = "...loading";
const answer1 = document.querySelector("#answer1");
const answer2 = document.querySelector("#answer2");

const data = [
  3, 5, 3, 5, 1, 3, 1, 1, 5, 5, 1, 1, 1, 2, 2, 2, 3, 1, 1, 5, 1, 1, 5, 5, 3, 2,
  2, 5, 4, 4, 1, 5, 1, 4, 4, 5, 2, 4, 1, 1, 5, 3, 1, 1, 4, 1, 1, 1, 1, 4, 1, 1,
  1, 1, 2, 1, 1, 4, 1, 1, 1, 2, 3, 5, 5, 1, 1, 3, 1, 4, 1, 3, 4, 5, 1, 4, 5, 1,
  1, 4, 1, 3, 1, 5, 1, 2, 1, 1, 2, 1, 4, 1, 1, 1, 4, 4, 3, 1, 1, 1, 1, 1, 4, 1,
  4, 5, 2, 1, 4, 5, 4, 1, 1, 1, 2, 2, 1, 4, 4, 1, 1, 4, 1, 1, 1, 2, 3, 4, 2, 4,
  1, 1, 5, 4, 2, 1, 5, 1, 1, 5, 1, 2, 1, 1, 1, 5, 5, 2, 1, 4, 3, 1, 2, 2, 4, 1,
  2, 1, 1, 5, 1, 3, 2, 4, 3, 1, 4, 3, 1, 2, 1, 1, 1, 1, 1, 4, 3, 3, 1, 3, 1, 1,
  5, 1, 1, 1, 1, 3, 3, 1, 3, 5, 1, 5, 5, 2, 1, 2, 1, 4, 2, 3, 4, 1, 4, 2, 4, 2,
  5, 3, 4, 3, 5, 1, 2, 1, 1, 4, 1, 3, 5, 1, 4, 1, 2, 4, 3, 1, 5, 1, 1, 2, 2, 4,
  2, 3, 1, 1, 1, 5, 2, 1, 4, 1, 1, 1, 4, 1, 3, 3, 2, 4, 1, 4, 2, 5, 1, 5, 2, 1,
  4, 1, 3, 1, 2, 5, 5, 4, 1, 2, 3, 3, 2, 2, 1, 3, 3, 1, 4, 4, 1, 1, 4, 1, 1, 5,
  1, 2, 4, 2, 1, 4, 1, 1, 4, 3, 5, 1, 2, 1,
];

function getSchoolSize(n, i) {
  if (n == 0) {
    return 0;
  } else if (i == 0) {
    return getSchoolSize(n - 1, 6) + getSchoolSize(n - 1, 8) + 1;
  }
  return getSchoolSize(n - 1, i - 1);
}

const countMap = data.map((i) => getSchoolSize(256, i));
const reducer = (previousValue, currentValue) => previousValue + currentValue;
const everything = countMap.reduce(reducer, data.length);

console.log(everything);

// sum(map(f(256,i) for i in data)) + len(data)

const memoize = (func) => {
  const results = {};

  return (...args) => {
    const argsKey = JSON.stringify(args);

    if (!results[argsKey]) {
      results[argsKey] = func(...args);
    }
    return results[argsKey];
  };
};

function dailySchoolUpdate(school) {
  let newSchool = [];
  for (var i = 0; i < school.length; i++) {
    let fish = school[i];
    if (fish == 0) {
      newSchool.push(8, 6);
    } else {
      newSchool.push(fish - 1);
    }
  }
  return newSchool;
}

function startSchool(start, days) {
  let school = dailySchoolUpdate(start);
  for (var day = 1; day < days; day++) {
    school = dailySchoolUpdate(school);
  }
  return school.length;
}

// const schoolSize = startSchool(data, 56);
// console.log("school size", schoolSize);
// const school2 = memoize(startSchool(data, 200));

stat.textContent = "✅";
// answer1.textContent = schoolSize;
// answer2.textContent = school2;
