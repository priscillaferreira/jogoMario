// Definição da fase: plataformas, moedas, inimigos e bandeira final.
export const TILE = 40;
export const GRAVITY = 0.6;
export const LEVEL_WIDTH = 2600;

// Plataformas do tipo { x, y, w, h }
export const platforms = [
  // Chão principal (dividido para criar um buraco)
  { x: 0, y: 360, w: 720, h: 40 },
  { x: 820, y: 360, w: 1780, h: 40 },
  // Blocos flutuantes
  { x: 300, y: 260, w: 120, h: 24 },
  { x: 520, y: 200, w: 120, h: 24 },
  { x: 900, y: 250, w: 160, h: 24 },
  { x: 1200, y: 200, w: 120, h: 24 },
  { x: 1450, y: 280, w: 120, h: 24 },
  { x: 1700, y: 220, w: 160, h: 24 },
  { x: 2050, y: 260, w: 120, h: 24 },
];

// Moedas do tipo { x, y }
export const coins = [
  { x: 340, y: 220 },
  { x: 560, y: 160 },
  { x: 960, y: 210 },
  { x: 1240, y: 160 },
  { x: 1500, y: 240 },
  { x: 1760, y: 180 },
  { x: 2090, y: 220 },
  { x: 2300, y: 320 },
];

// Inimigos (Goombas) do tipo { x, y, w, h, dir, minX, maxX }
export const enemies = [
  { minX: 420, maxX: 700, y: 328 },
  { minX: 920, maxX: 1180, y: 328 },
  { minX: 1500, maxX: 1900, y: 328 },
];

// Bandeira final
export const flag = { x: 2480, y: 160, w: 12, h: 200 };

// Posição inicial do jogador
export const spawn = { x: 60, y: 300 };
