import levelsJson from "@/data/levels.json";
import level1 from "@/data/level-1.json";
import level2 from "@/data/level-2.json";
import level3 from "@/data/level-3.json";
import level4 from "@/data/level-4.json";
import type { LevelContent, LevelId, LevelInfo, SchoolYear } from "./types";

export const schoolYears = levelsJson.schoolYears as SchoolYear[];
export const levels = levelsJson.levels as LevelInfo[];

const content: Record<LevelId, LevelContent> = {
  1: level1 as LevelContent,
  2: level2 as LevelContent,
  3: level3 as LevelContent,
  4: level4 as LevelContent,
};

export function getLevelContent(level: LevelId): LevelContent {
  return content[level];
}

export function getLevelInfo(level: LevelId): LevelInfo {
  return levels.find((l) => l.level === level)!;
}

export function getSchoolYear(id: string | null): SchoolYear | undefined {
  return schoolYears.find((y) => y.id === id);
}
