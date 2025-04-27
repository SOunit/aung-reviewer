// client/src/app/api/review/route.ts
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import os from 'os';

export async function GET() {
  try {
    const reviewerDir = path.join(os.homedir(), '.aung-reviewer');
    const resultPath = path.join(reviewerDir, 'result.json');
    const fileData = fs.readFileSync(resultPath, 'utf-8');
    const jsonData = JSON.parse(fileData);
    return NextResponse.json(jsonData);
  } catch (error) {
    console.error('Failed to read result.json:', error);
    return NextResponse.json([], { status: 200 }); // エラー時も空リスト返す
  }
}
