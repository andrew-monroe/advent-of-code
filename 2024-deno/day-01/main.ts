import { TextLineStream } from "jsr:@std/streams";

async function showAnswer(func: () => Promise<number>) {
  const start = performance.now();
  const answer = await func();
  const end = performance.now();
  const difference = (end - start).toFixed(2);
  console.log(answer, `(${difference}ms)`);
}

async function getInputStream() {
  const byteStream = await Deno.open("input.txt");
  const textStream = byteStream.readable.pipeThrough(new TextDecoderStream())
    .pipeThrough(new TextLineStream());
  return textStream;
}

async function part1() {
  const list1 = [];
  const list2 = [];

  const inputStream = await getInputStream();
  for await (const line of inputStream) {
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

async function part2() {
  const hash1: Record<number, number> = {};
  const hash2: Record<number, number> = {};

  const inputStream = await getInputStream();
  for await (const line of inputStream) {
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

await showAnswer(part1);
await showAnswer(part2);
