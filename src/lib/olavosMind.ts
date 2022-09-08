import {
  areList,
  Gender,
  TodoList,
  Who,
  WhoList,
  WorkingWith,
  WorkingWithList,
} from "./generator";

interface Phrase {
  who: Who;
  are: string;
  workingWith: WorkingWith;
  todo: string;
}

function OlavosMind() {
  function getPlural(word: string): string {
    if (word === "trabalha(m)") return "trabalham";
    if (word === "é/são") return "são";
    if (word === "conspira(m)") return "conspiram";
    if (word === "doa(m)") return "doam";
    if (word === "está(ão)") return "estão";
    if (word === "apoia(m)") return "apoiam";
    else return "";
  }

  function getSingular(word: string): string {
    if (word === "trabalha(m)") return "trabalha";
    if (word === "é/são") return "é";
    if (word === "conspira(m)") return "conspira";
    if (word === "doa(m)") return "doa";
    if (word === "está(ão)") return "está";
    if (word === "apoia(m)") return "apoia";
    else return "";
  }

  function getMasculino(word: string): string {
    if (word === "as/os") return "os";
    if (word === "pelos(as)") return "pelos";
    if (word === "às(aos)") return "aos";
    if (word === "das(os)") return "dos";
    else return "";
  }

  function getFeminino(word: string): string {
    if (word === "as/os") return "as";
    if (word === "pelos(as)") return "pelas";
    if (word === "às(aos)") return "às";
    if (word === "das(os)") return "das";
    else return "";
  }

  function createPhrase(phrase: Phrase) {
    var regExp = /(^.*?\s).*(\s.*$)/;
    const words = regExp.exec(phrase.are)?.map((word) => word.trim());
    if (words) {
      phrase.are = phrase.are.replace(
        words[1] as string,
        phrase.who.isPlural ? getPlural(words[1]!) : getSingular(words[1]!)
      );
    }

    if (words && words.length) {
      phrase.are = phrase.are.replace(
        words[words.length - 1]!,
        phrase.workingWith.gender === Gender.Male
          ? getMasculino(words[words.length - 1]!)
          : getFeminino(words[words.length - 1]!)
      );
    }

    return [
      phrase.who.text,
      phrase.are,
      phrase.workingWith.text,
      phrase.todo,
    ].join(" ");
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function generateTheory(
    whoInd?: number,
    areInd?: number,
    workingWithInd?: number,
    todoInd?: number
  ) {
    var whoIndex = whoInd ? whoInd : getRandomInt(0, WhoList().length);

    var areIndex = areInd ? areInd : getRandomInt(0, areList().length);

    var workingWithIndex = workingWithInd
      ? workingWithInd
      : getRandomInt(0, WorkingWithList().length);

    var todoIndex = todoInd ? todoInd : getRandomInt(0, TodoList().length);

    var olavoTheory = createPhrase({
      who: WhoList()[whoIndex]!,
      are: areList()[areIndex]!,
      workingWith: WorkingWithList()[workingWithIndex]!,
      todo: TodoList()[todoIndex]!,
    });

    return olavoTheory;
  }

  return {
    generateTheory,
  };
}

export default OlavosMind;
