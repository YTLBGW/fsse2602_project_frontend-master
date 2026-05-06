export const getGlowClass = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes("charizard") || n.includes("fire")) return "neon-glow-fire";
  if (n.includes("blastoise") || n.includes("water")) return "neon-glow-water";
  if (n.includes("venusaur") || n.includes("grass")) return "neon-glow-grass";
  if (n.includes("pikachu") || n.includes("electric")) return "neon-glow-electric";
  return "neon-glow-default";
};
