import { expect } from "jsr:@std/expect";

function getInput() {
  // "new URL" syntax works in more scenarios than raw relative paths.
  return Deno.readTextFileSync(new URL("input.txt", import.meta.url));
}

function part1(input: string) {
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

function part2(input: string) {
  const hash1: Record<number, number> = {};
  const hash2: Record<number, number> = {};

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

Deno.bench("day 01: part 1", (b) => {
  const input = getInput();
  b.start();
  part1(input);
  b.end();
});

Deno.bench("day 01: part 2", (b) => {
  const input = getInput();
  b.start();
  part2(input);
  b.end();
});

Deno.test("day 01: part 1", () => {
  const input = getInput();
  const answer = part1(input);
  expect(answer).toBe(2769675);
});

Deno.test("day 01: part 2", () => {
  const input = getInput();
  const answer = part2(input);
  expect(answer).toBe(24643097);
});
