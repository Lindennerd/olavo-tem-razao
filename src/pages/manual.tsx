import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ManualStep, SelectedOption, Step } from "../components/ManualStep";
import { trpc } from "../utils/trpc";

export default function ManualPage() {
  const {
    data: conspiracy,
    isLoading,
    error,
  } = trpc.useQuery(["conspiracies.getOlavosMind"], {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const [steps, setSteps] = useState<Step[]>();
  const [selectedOptions, setSelectedOption] = useState<SelectedOption[]>();

  function stepNameFactory(step: string) {
    switch (step) {
      case "who":
        return "Quem";
      case "are":
        return "Esta";
      case "workingWith":
        return "Trabalhando com";
      case "todo":
        return "Para quê?";
      default:
        return "";
    }
  }

  useEffect(() => {
    setSteps((curr) => {
      if (conspiracy)
        return Object.keys(conspiracy!).map((c, index) => {
          return {
            label: stepNameFactory(c),
            index: index,
            isActive: index === 0,
            isDone: false,
            items: getStepItems(index),
          };
        });
    });
  }, [conspiracy]);

  function getActiveStep() {
    if (steps && steps.some((s) => s.isActive))
      return steps?.find((s) => s.isActive);
  }

  function getStepItems(index: number): string[] {
    if (conspiracy) {
      const conspiracyValue = Object.values(conspiracy);
      const activeConspiracies = conspiracyValue[index]!;
      return activeConspiracies?.map((w) =>
        typeof w === "string" ? w : w.text
      );
    } else return [];
  }

  function onSelected(selected: SelectedOption) {
    setSelectedOption((curr) => {
      return [
        ...(curr ? curr.filter((s) => s.label !== selected.label) : []), selected
      ];
    });
  }

  return (
    <div className="flex flex-row lg:flex-col gap-2">
      {isLoading && <ReactLoading />}
      <div>
        {selectedOptions && selectedOptions.map(op => (
          <div>{op.label}</div>
        ))}
      </div>
      <div>
        <ul className="steps steps-vertical lg:steps-horizontal">
          {steps &&
            steps.map((s) => (
              <li
                key={s.index}
                className={`step 
              ${s.isActive && "step-primary"} 
              ${s.isDone && "step-success"}`}
              >
                {s.label}
              </li>
            ))}
        </ul>
      </div>
      <div>
        <div className="p-2 border rounded-md shadow-md mb-2">
          {getActiveStep() !== undefined && conspiracy && (
            <ManualStep step={getActiveStep()!} onSelected={onSelected} />
          )}
        </div>
        <div className="flex gap-2 justify-between">
          <button
            disabled={getActiveStep()?.index === 0}
            className="btn text-center"
          >
            Anterior
          </button>
          <button
            disabled={getActiveStep()?.index === steps?.length}
            className="btn text-center"
          >
            Próximo
          </button>
        </div>
      </div>
    </div>
  );
}
