export const easeOut = [0.22, 1, 0.36, 1] as const;

export const springSoft = {
  type: "spring" as const,
  bounce: 0.18,
  visualDuration: 0.45,
};

export const springSnappy = {
  type: "spring" as const,
  bounce: 0.25,
  visualDuration: 0.35,
};
