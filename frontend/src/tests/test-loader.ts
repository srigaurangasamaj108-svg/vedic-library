import { loadVerseComposition } from "../features/scripture/scripture.loader";

async function test() {
  const verse = await loadVerseComposition("bg.2.47");
  console.log(verse);
}

test();
