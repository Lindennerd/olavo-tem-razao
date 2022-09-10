export enum Gender {
  Male = "M",
  Female = "F",
}

export type Who = {
  text: string;
  gender: Gender;
  isPlural: boolean;
};

export type WorkingWith = {
  text: string;
  gender: Gender;
};

export function WhoList(): Who[] {
  return [
    {
      text: "O Lula",
      gender: Gender.Male,
      isPlural: false,
    },
    {
      text: "A esquerda",
      gender: Gender.Female,
      isPlural: false,
    },
    {
      text: "Os Sindicatos",
      gender: Gender.Male,
      isPlural: true,
    },
    {
      text: "O PT",
      gender: Gender.Male,
      isPlural: false,
    },
    {
      text: "O Governo",
      gender: Gender.Male,
      isPlural: false,
    },
    {
      text: "A extrema-esquerda",
      gender: Gender.Female,
      isPlural: false,
    },
    {
      text: "Os movimentos sociais",
      gender: Gender.Male,
      isPlural: true,
    },
    {
      text: "O PSOL",
      gender: Gender.Male,
      isPlural: false,
    },
    {
      text: "Os black-blocs",
      gender: Gender.Male,
      isPlural: true,
    },
    {
      text: "Os imigrantes",
      gender: Gender.Male,
      isPlural: true,
    },
  ];
}

export function areList(): string[] {
  return [
    "trabalha(m) com as/os",
    "é/são financiado(s) pelos(as)",
    "conspira(m) com as/os",
    "doa(m) dinheiro às(aos)",
    "está(ão) aos serviços das(os)",
    "é/são um complô das(os)",
    "apoia(m) as/os",
    "é/são fachada das(os)",
  ];
}

export function WorkingWithList(): WorkingWith[] {
  return [
    {
      text: "chineses",
      gender: Gender.Male,
    },
    {
      text: "maçons",
      gender: Gender.Male,
    },
    {
      text: "globalistas",
      gender: Gender.Male,
    },
    {
      text: "transexuais",
      gender: Gender.Male,
    },
    {
      text: "muçulmanos",
      gender: Gender.Male,
    },
    {
      text: "comunistas",
      gender: Gender.Male,
    },
    {
      text: "feministas",
      gender: Gender.Female,
    },
    {
      text: "cubanos",
      gender: Gender.Male,
    },
    {
      text: "illuminatis",
      gender: Gender.Male,
    },
    {
      text: "judeus",
      gender: Gender.Male,
    },
  ];
}

export function TodoList(): string[] {
  return [
    "para desmaculinizar o Brasil",
    "para ensinar ideologia de gênero às nossas crianças",
    "para implantar a ditadura gayzista",
    "para acabar com os valores judaico-cristãos",
    "para instaurar a xaria",
    "para liberar a pedofilia",
    "para que todas mulheres abortem",
    "para entregar a soberania do país às elites globais",
    "para implantar o politicamente correto e nos censurar",
    "para doutrinar nossas crianças com o marxismo cultural",
  ];
}
