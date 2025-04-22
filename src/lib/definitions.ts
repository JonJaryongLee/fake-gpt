export type History = {
  role: "user" | "model";
  parts: [
    {
      text: string;
    }
  ];
};
