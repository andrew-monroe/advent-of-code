
function part1(input: string) {
  function isSafe(report: string) {
    const levels = report.split(" ").map(Number);
    
    if (levels.length <= 1) return true;

    if (levels.length === 2) {
      const diff = Math.abs(levels[1] - levels[0]);
      return diff >= 1 && diff <= 3;
    }
    
    for (let i = 1; i < levels.length - 1; i++) {
      const leftDiff = levels[i] - levels[i - 1];
      const rightDiff = levels[i + 1] - levels[i];

      if (Math.abs(leftDiff) > 3 || Math.abs(leftDiff) < 1 || Math.abs(rightDiff) > 3 || Math.abs(rightDiff) < 1) {
        return false;
      }

      if (leftDiff < 0 != rightDiff < 0) {
        return false;
      }
    }

    return true;
  }

  let safeCount = 0;
  for (const row of input.split("\n")) {
    if (isSafe(row)) {
      safeCount++;
    }
  }
  return safeCount;
}

function part2(input: string) {
  function threeAreGood(left: number, middle: number, right: number) {
    const leftDiff = left - middle;
    const rightDiff = middle - right;
    if (Math.abs(leftDiff) > 3 || Math.abs(leftDiff) < 1 || Math.abs(rightDiff) > 3 || Math.abs(rightDiff) < 1) {
      return false;
    }
    if (leftDiff < 0 != rightDiff < 0) {
      return false;
    }
    return true;
  }

  function isSafe(report: string): [boolean, number] {
    const levels = report.split(" ").map(Number);
    
    if (levels.length <= 2) return [true, -1];

    if (levels.length === 3) {
      return [threeAreGood(levels[0], levels[1], levels[2]), -1];
    }

    let badIndex = -1;
    
    for (let i = 0; i < levels.length - 2; i++) {
      if (!threeAreGood(levels[i], levels[i + 1], levels[i + 2])) {
        if (badIndex !== -1) {
          return [false, badIndex];
        }

        if (levels[i+3] === undefined) {
          badIndex = i + 2;
          return [true, badIndex];
        }

        badIndex = threeAreGood(levels[i+1], levels[i + 2], levels[i + 3])
          ? i
          : threeAreGood(levels[i], levels[i + 2], levels[i + 3])
          ? i + 1
          : threeAreGood(levels[i], levels[i + 1], levels[i + 3])
          ? i + 2
          : -1;

        if (badIndex === -1) {
          return [false, badIndex];
        }

        levels.splice(badIndex, 1);
        i--;
      }
      
    }

    return [true, badIndex];
  }

  let safeCount = 0;
  for (const row of input.split("\n")) {
    const [safe, badIndex] = isSafe(row);
    if (safe) {
      safeCount++;
      // const fmtRow = row.split(" ").map((val, index) => index === badIndex ? yellow(val) : green(val)).join(" ");
      // console.log(fmtRow);
    } else {
      // console.log(red(row));
    }
  }
  return safeCount;
}

onmessage = function (e) {
  const { input, part } = e.data;
  const output = part === 1 ? part1(input) : part2(input);
  postMessage({
    output,
    part,
  });
}