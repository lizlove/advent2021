const statEl = document.querySelector("#status");

async function getPuzzleInput(day) {
  statEl.textContent = "...Loading";

  const response = await fetch(
    `https://adventofcode.com/2021/day/${day}/input`,
    {
      cors: nocors,
    }
  );
  console.log(response.json);
}

function handleError(err) {
  console.log("OH NO!");
  console.log(err);
  statEl.textContent = `Something went wrong: ${err}`;
}

getPuzzleInput(1).catch(handleError);
