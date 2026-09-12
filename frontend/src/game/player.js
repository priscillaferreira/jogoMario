import { GRAVITY } from "./level.js";

// Personagem controlado pelo jogador (Mario).
export class Player {
  constructor(x, y) {
    this.startX = x;
    this.startY = y;
    this.reset();
    this.w = 30;
    this.h = 44;
    this.speed = 4.2;
    this.jumpForce = 13;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.vx = 0;
    this.vy = 0;
    this.onGround = false;
    this.facing = 1;
  }

  update(input, platforms) {
    // Movimento horizontal
    if (input.left) {
      this.vx = -this.speed;
      this.facing = -1;
    } else if (input.right) {
      this.vx = this.speed;
      this.facing = 1;
    } else {
      this.vx = 0;
    }

    // Pulo
    if (input.jump && this.onGround) {
      this.vy = -this.jumpForce;
      this.onGround = false;
    }

    // Gravidade
    this.vy += GRAVITY;
    if (this.vy > 16) this.vy = 16;

    // Aplica movimento e resolve colisões por eixo
    this.x += this.vx;
    this.resolveCollisions(platforms, "x");
    this.y += this.vy;
    this.onGround = false;
    this.resolveCollisions(platforms, "y");
  }

  resolveCollisions(platforms, axis) {
    for (const p of platforms) {
      if (this.intersects(p)) {
        if (axis === "x") {
          if (this.vx > 0) this.x = p.x - this.w;
          else if (this.vx < 0) this.x = p.x + p.w;
          this.vx = 0;
        } else {
          if (this.vy > 0) {
            this.y = p.y - this.h;
            this.onGround = true;
          } else if (this.vy < 0) {
            this.y = p.y + p.h;
          }
          this.vy = 0;
        }
      }
    }
  }

  intersects(box) {
    return (
      this.x < box.x + box.w &&
      this.x + this.w > box.x &&
      this.y < box.y + box.h &&
      this.y + this.h > box.y
    );
  }

  draw(ctx) {
    const { x, y, w, h } = this;
    // Corpo (macacão azul)
    ctx.fillStyle = "#2b5be2";
    ctx.fillRect(x, y + 20, w, h - 20);
    // Camisa vermelha
    ctx.fillStyle = "#e52521";
    ctx.fillRect(x, y + 14, w, 12);
    ctx.fillRect(x + 6, y + 20, w - 12, 16);
    // Rosto
    ctx.fillStyle = "#ffcc99";
    ctx.fillRect(x + 6, y + 6, w - 12, 12);
    // Boné vermelho
    ctx.fillStyle = "#e52521";
    ctx.fillRect(x + 2, y, w - 4, 8);
    ctx.fillRect(x + (this.facing === 1 ? w - 6 : -2), y + 2, 8, 6);
    // Olho
    ctx.fillStyle = "#000";
    ctx.fillRect(x + (this.facing === 1 ? w - 12 : 8), y + 9, 4, 4);
  }
}
