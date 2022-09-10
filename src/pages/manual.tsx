import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ManualStep } from "../components/ManualStep";
import { Meme } from "../components/Meme";
import { Stepper, Step } from "../components/Stepper";
import { useMemeStore } from "../store/memeStore";
import selectedOptionsStore from "../store/useManualSelected";
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
  const { setMeme } = useMemeStore((state) => state);
  const { selectedOptions, isStepDone } = selectedOptionsStore(
    (state) => state
  );

  const generateMeme = trpc.useMutation(["generator.manual"], {
    onSuccess: (data) => setMeme(data),
  });

  function stepNameFactory(step: string) {
    switch (step) {
      case "who":
        return "Quem";
      case "are":
        return "Esta";
      case "workingWith":
        return "Com";
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
          const stepName = stepNameFactory(c);
          return {
            label: stepName,
            index: index,
            isActive: index === 0,
            isDone: false,
            content: (
              <ManualStep
                step={{
                  label: stepName,
                  items: getStepItems(index),
                }}
              />
            ),
          };
        });
    });
  }, [conspiracy]);

  function getStepItems(index: number): string[] {
    if (conspiracy) {
      const conspiracyValue = Object.values(conspiracy);
      const activeConspiracies = conspiracyValue[index]!;
      return activeConspiracies?.map((w) =>
        typeof w === "string" ? w : w.text
      );
    } else return [];
  }

  const resultStep: Step = {
    isActive: false,
    isDone: false,
    label: "Resultado",
    content: <Meme />,
  };

  function getMeme() {
    generateMeme.mutate({
      who: selectedOptions.find((op) => op.label === "Quem")!.value,
      are: selectedOptions.find((op) => op.label === "Esta")!.value,
      workingWith: selectedOptions.find((op) => op.label === "Com")!.value,
      todo: selectedOptions.find((op) => op.label === "Para quê?")!.value,
    });
  }

  return (
    <>
      {isLoading && <ReactLoading />}
      {steps && <Stepper steps={[...steps, resultStep]} />}
      {isStepDone() && (
        <button className="btn btn-success w-full" onClick={(e) => getMeme()}>
          Gerar
        </button>
      )}
    </>
  );
}
