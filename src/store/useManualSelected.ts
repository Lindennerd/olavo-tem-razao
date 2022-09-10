import create from "zustand";

export interface SelectedOption {
  label: string;
  value: number;
}

interface SelectedOptionsStore {
  selectedOptions: SelectedOption[];
  getSelected: (label: string) => number | undefined;
  addSelected: (selected: SelectedOption) => void;
  isStepDone: () => boolean;
}

const selectedOptionsStore = create<SelectedOptionsStore>((set, get) => ({
  selectedOptions: [],
  getSelected(label: string) {
    const options = get().selectedOptions;
    return (
      options &&
      options?.find((opt: SelectedOption) => opt.label === label)?.value
    );
  },
  isStepDone() {
    const options = get().selectedOptions;
    return options && options.length === 4;
  },
  addSelected: (selected: SelectedOption) =>
    set((state) => ({
      selectedOptions: [
        ...(state.selectedOptions
          ? state.selectedOptions.filter((s) => s.label !== selected.label)
          : []),
        selected,
      ],
    })),
}));

export default selectedOptionsStore;
