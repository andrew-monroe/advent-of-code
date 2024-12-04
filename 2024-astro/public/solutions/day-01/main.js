function part1(input) {
  const list1 = [];
  const list2 = [];

  for (const line of input.split("\n")) {
    const [num1, num2] = line.split(/\s+/).map(Number);
    list1.push(num1);
    list2.push(num2);
  }
  list1.sort();
  list2.sort();

  let sumOfDifferences = 0;
  for (let i = 0; i < list1.length; i++) {
    sumOfDifferences += Math.abs(list1[i] - list2[i]);
  }
  return sumOfDifferences;
}

function part2(input) {
  const hash1 = {};
  const hash2 = {};

  for (const line of input.split("\n")) {
    const [num1, num2] = line.split(/\s+/).map(Number);
    hash1[num1] = num1 in hash1 ? hash1[num1] + 1 : 1;
    hash2[num2] = num2 in hash2 ? hash2[num2] + 1 : 1;
  }

  let sumOfSimilarities = 0;
  for (const n of Object.keys(hash1).map(Number)) {
    sumOfSimilarities += n * hash1[n] * (hash2[n] ?? 0);
  }
  return sumOfSimilarities;
}

onmessage = function (e) {
  const { input, part } = e.data;
  const output = part === 1 ? part1(input) : part2(input);
  postMessage({
    output,
    part,
  });
}