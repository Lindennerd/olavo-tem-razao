import { useEffect, useState } from "react";

export interface Step {
  label: string;
  isActive: boolean;
  isDone: boolean;
  content: React.ReactNode;
}

interface StepperProps {
  steps: Step[];
}

export function Stepper(props: StepperProps) {
  const [steps, setSteps] = useState(props.steps);
  const [isFirst, setIsFirst] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setIsFirst(steps.findIndex((s) => s.isActive) === 0);
    setHasMore(steps.findIndex((s) => s.isActive) + 1 < steps.length);
  }, [steps]);

  function nextStep() {
    const currentActiveIndex = steps.findIndex((s) => s.isActive);
    setSteps((curr) => {
      return curr.map((s, index) => {
        s.isActive = currentActiveIndex + 1 == index;
        return s;
      });
    });
  }

  function previousStep() {
    const currentActiveIndex = steps.findIndex((s) => s.isActive);
    setSteps((curr) => {
      return curr.map((s, index) => {
        s.isActive = currentActiveIndex - 1 == index;
        return s;
      });
    });
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <ul className="steps steps-horizontal">
        {steps.map((s, index) => (
          <li
            key={index}
            className={`step 
              ${s.isActive && "step-primary"} 
              ${s.isDone && "step-success"}`}
          >
            {s.label}
          </li>
        ))}
      </ul>
      <div>
        <div className="mb-8">{steps.find((s) => s.isActive)?.content}</div>
        <div className="fixed bottom-1">
          <div className="flex justify-between gap-4">
            <button
              disabled={isFirst}
              className="btn text-center btn-sm"
              onClick={(e) => previousStep()}
            >
              Anterior
            </button>
            <button
              disabled={!hasMore}
              className="btn text-center btn-sm"
              onClick={(e) => nextStep()}
            >
              Próximo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
