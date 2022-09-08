import { useState } from "react";
import {BiCheck} from "react-icons/bi"

interface ManualStepProps {
  step: Step;
  onSelected: (selected: SelectedOption) => void;
}

export interface SelectedOption {
  label: string;
  value: number;
}

export interface Step {
  label: string;
  index: number;
  isActive: boolean;
  isDone: boolean;
  items: string[];
}

export function ManualStep(props: ManualStepProps) {
  const [selected, setSelected] = useState<SelectedOption>();

    function select(selectedOption: SelectedOption) {
        setSelected(selectedOption);
        props.onSelected(selectedOption);
    }

  return (
    <>
      <div>
        {props.step.items.map((item, index) => (
          <div
            key={index}
            onClick={(e) => select({ label: props.step.label, value: index })}
            className={`p-1 border rounded-md mb-1 hover:bg-base-200 cursor-pointer ${
              selected?.value === index && "bg-base-200"
            }`}
          >
            <span className="flex gap-3 items-center">{selected?.value === index && <BiCheck className="text-xl p-0 rounded-full bg-blue-500 text-white"/>} {item}</span>
          </div>
        ))}

      </div>
    </>
  );
}
