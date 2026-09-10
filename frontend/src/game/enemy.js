// Inimigo Goomba: anda para frente e para trás entre minX e maxX.
export class Enemy {
  constructor({ minX, maxX, y }) {
    this.minX = minX;
    this.maxX = maxX;
    this.startX = minX;
    this.x = minX;
    this.y = y;
    this.w = 32;
    this.h = 32;
    this.speed = 1.2;
    this.dir = 1;
    this.alive = true;
  }

  reset() {
    this.x = this.startX;
    this.dir = 1;
    this.alive = true;
  }

  update() {
    if (!this.alive) return;
    this.x += this.speed * this.dir;
    if (this.x <= this.minX) {
      this.x = this.minX;
      this.dir = 1;
    } else if (this.x + this.w >= this.maxX) {
      this.x = this.maxX - this.w;
      this.dir = -1;
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
    if (!this.alive) return;
    const { x, y, w, h } = this;
    // Corpo marrom
    ctx.fillStyle = "#8b4513";
    ctx.fillRect(x, y + 8, w, h - 8);
    // Cabeça
    ctx.fillStyle = "#a0522d";
    ctx.beginPath();
    ctx.ellipse(x + w / 2, y + 12, w / 2, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    // Pés
    ctx.fillStyle = "#3d2410";
    ctx.fillRect(x + 2, y + h - 6, 10, 6);
    ctx.fillRect(x + w - 12, y + h - 6, 10, 6);
    // Olhos
    ctx.fillStyle = "#fff";
    ctx.fillRect(x + 6, y + 8, 7, 9);
    ctx.fillRect(x + w - 13, y + 8, 7, 9);
    ctx.fillStyle = "#000";
    ctx.fillRect(x + 9, y + 11, 3, 5);
    ctx.fillRect(x + w - 10, y + 11, 3, 5);
  }
}
