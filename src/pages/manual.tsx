import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { trpc } from "../utils/trpc";

interface Step {
  label: string;
  index: number;
  isActive: boolean;
  isDone: boolean;
}

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
      return Object.keys(conspiracy!).map((c, index) => {
        return {
          label: stepNameFactory(c),
          index: index,
          isActive: index === 0,
          isDone: false,
        };
      });
    });
  }, [conspiracy]);

  return (
    <>
      {isLoading && <ReactLoading />}
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
        {steps &&
          Object.values(conspiracy!)[
            steps!.find((s) => s.isActive)!.index
          ]?.map((w, index) => (
            <div key={index}>{typeof w === "string" ? w : w.text}</div>
          ))}
      </div>
    </>
  );
}
