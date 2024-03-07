import { atom } from "jotai";

type TableType = string[][];

export const tableAtom = atom<TableType>(Array.from({ length: 1000 }, () => Array(10).fill("test")));
export const sourceCellAtom = atom<{ rowIndex: number; colIndex: number } | null>(null);
