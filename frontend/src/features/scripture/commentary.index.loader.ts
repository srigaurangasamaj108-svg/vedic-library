import fs from "fs/promises";
import path from "path";

export interface CommentaryIndex {
  verse_uid: string;

  commentaries: {
    author: string;
    tradition?: string;
    languages: string[];
  }[];
}

export async function loadCommentaryIndex(
  scriptureRoot: string,
  uid: string
): Promise<CommentaryIndex | null> {

  const indexPath = path.join(
    scriptureRoot,
    "index",
    "commentary",
    `${uid}.commentaries.index.json`
  );

  try {

    const file = await fs.readFile(indexPath, "utf-8");

    return JSON.parse(file);

  } catch {

    return null;

  }
}
