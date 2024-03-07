import { create } from "zustand";

interface AppState {
  data: string[][];
  dragStart: { rowIndex: number; colIndex: number } | null;
  updateField: (rowIndex: number, colIndex: number, value: string) => void;
  resetFields: () => void;
  setDragStart: (rowIndex: number, colIndex: number) => void;
  clearDragStart: () => void;
  handleDrop: (rowIndex: number, colIndex: number) => void;
}

const useAppState = create<AppState>((set) => ({
  data: Array.from({ length: 1000 }, () => Array(10).fill("test")),
  dragStart: null,
  updateField: (rowIndex, colIndex, value) => {
    set((state) => {
      const newData = [...state.data];
      newData[rowIndex][colIndex] = value;
      return { data: newData };
    });
  },
  resetFields: () => {
    set({ data: Array.from({ length: 1000 }, () => Array(10).fill("")) });
  },
  setDragStart: (rowIndex, colIndex) => {
    set({ dragStart: { rowIndex, colIndex } });
  },
  clearDragStart: () => {
    set({ dragStart: null });
  },
  handleDrop: (rowIndex, colIndex) => {
    set((state) => {
      if (state.dragStart) {
        const { rowIndex: startRow, colIndex: startCol } = state.dragStart;
        const data = [...state.data];
        [data[startRow][startCol], data[rowIndex][colIndex]] = [data[rowIndex][colIndex], data[startRow][startCol]];
        return { data };
      }
      return state;
    });
  },
}));

export default useAppState;
