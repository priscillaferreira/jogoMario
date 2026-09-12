// Gerencia o estado do teclado (input do jogador).
export class Input {
  constructor() {
    this.keys = new Set();
    this.onStart = null;

    window.addEventListener("keydown", (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
      if (e.key === "Enter" && typeof this.onStart === "function") {
        this.onStart();
      }
      this.keys.add(e.key.toLowerCase());
    });

    window.addEventListener("keyup", (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }

  get left() {
    return this.keys.has("arrowleft") || this.keys.has("a");
  }

  get right() {
    return this.keys.has("arrowright") || this.keys.has("d");
  }

  get jump() {
    return this.keys.has("arrowup") || this.keys.has("w") || this.keys.has(" ");
  }
}
