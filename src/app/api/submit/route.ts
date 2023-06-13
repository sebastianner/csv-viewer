import { NextResponse } from "next/server";
import fs from "fs";
import { cwd } from "process";
import { fromLocalPath } from "csv-easy-parse";

export async function POST(request: Request) {
  const clonedRequest = request.clone();
  const text = await request.text();
  const formData = await clonedRequest.formData();
  const file: {
    size: number;
    type: string;
    name: string;
    lastModified: number;
  } = formData.values().next().value;

  // Remove dashes and any additional metadata if needed
  const cleanedContent = text
    .replace(/--.*/g, "")
    .trim()
    .split("\n")
    .slice(3)
    .join("\n");

  const filename = file.name;
  const filePath = cwd() + `/public/csv/${filename}`;

  try {
    await fs.promises.writeFile(filePath, cleanedContent, { flag: "w" });
    const csvToJson = await fromLocalPath(filePath);
    return NextResponse.json({ result: JSON.parse(csvToJson) });
  } catch (error) {
    console.error("Error writing file:", error);
    return NextResponse.json({ success: false, error: "Error writing file" });
  }
}
