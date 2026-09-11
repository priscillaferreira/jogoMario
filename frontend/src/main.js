import { Input } from "./game/input.js";
import { Engine } from "./game/engine.js";

// Ponto de entrada da aplicação Front-End do Jogo Mario.
const canvas = document.getElementById("game");
const input = new Input();

const ui = {
  coins: document.getElementById("coins"),
  lives: document.getElementById("lives"),
  time: document.getElementById("time"),
  overlay: document.getElementById("overlay"),
  title: document.getElementById("overlay-title"),
  text: document.getElementById("overlay-text"),
};

const engine = new Engine(canvas, input, ui);

// Enter inicia ou reinicia a partida.
input.onStart = () => engine.start();

console.log("🍄 Jogo Mario carregado. Pressione Enter para começar!");
