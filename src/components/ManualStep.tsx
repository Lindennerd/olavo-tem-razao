import { useEffect, useState } from "react";
import { BiCheck } from "react-icons/bi";
import selectedOptionsStore from "../store/useManualSelected";

interface ManualStep {
  label: string;
  items: string[];
}

interface ManualStepProps {
  step: ManualStep;
}

export function ManualStep(props: ManualStepProps) {
  const { addSelected, getSelected, isStepDone } = selectedOptionsStore(
    (state) => state
  );

  return (
    <>
      <div>
        {props.step.items.map((item, index) => (
          <div
            key={index}
            onClick={(e) =>
              addSelected({ label: props.step.label, value: index })
            }
            className={`p-1 border rounded-md mb-1 hover:bg-base-200 cursor-pointer ${
              getSelected(props.step.label) === index && "bg-base-200"
            }`}
          >
            <span className="flex gap-3 items-center">
              {getSelected(props.step.label) === index && (
                <BiCheck className="text-xl p-0 rounded-full bg-blue-500 text-white" />
              )}
              {item}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
