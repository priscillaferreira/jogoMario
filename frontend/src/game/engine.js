import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
import {
  platforms,
  coins as coinData,
  enemies as enemyData,
  flag,
  spawn,
  LEVEL_WIDTH,
} from "./level.js";

// Motor principal: controla o loop, a física, as colisões e o placar.
export class Engine {
  constructor(canvas, input, ui) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.input = input;
    this.ui = ui; // { coins, lives, time, overlay, title, text }
    this.width = canvas.width;
    this.height = canvas.height;

    this.state = "start"; // start | playing | won | lost
    this.camera = 0;
    this.reset();

    this.loop = this.loop.bind(this);
    requestAnimationFrame(this.loop);
  }

  reset() {
    this.player = new Player(spawn.x, spawn.y);
    this.enemies = enemyData.map((e) => new Enemy(e));
    this.coins = coinData.map((c) => ({ ...c, r: 9, taken: false }));
    this.lives = 3;
    this.score = 0;
    this.startTime = performance.now();
    this.camera = 0;
    this.updateHud(0);
  }

  start() {
    if (this.state === "playing") return;
    this.reset();
    this.state = "playing";
    this.hideOverlay();
  }

  loop(now) {
    if (this.state === "playing") {
      this.update();
      const elapsed = Math.floor((now - this.startTime) / 1000);
      this.updateHud(elapsed);
    }
    this.render();
    requestAnimationFrame(this.loop);
  }

  update() {
    const p = this.player;
    p.update(this.input, platforms);

    // Mantém o jogador dentro dos limites horizontais da fase
    if (p.x < 0) {
      p.x = 0;
      p.vx = 0;
    }
    if (p.x + p.w > LEVEL_WIDTH) {
      p.x = LEVEL_WIDTH - p.w;
      p.vx = 0;
    }

    // Câmera acompanha o jogador
    this.camera = Math.max(0, Math.min(p.x - this.width / 2, LEVEL_WIDTH - this.width));

    // Moedas
    for (const c of this.coins) {
      if (!c.taken && this.circleHitsBox(c, p)) {
        c.taken = true;
        this.score += 1;
      }
    }

    // Inimigos
    for (const e of this.enemies) {
      e.update();
      if (e.alive && e.intersects(p)) {
        const cameFromTop = p.vy > 0 && p.y + p.h - e.y < 24;
        if (cameFromTop) {
          e.alive = false;
          p.vy = -9; // quica ao derrotar
          this.score += 2;
        } else {
          this.loseLife();
          return;
        }
      }
    }

    // Caiu no buraco / fora da fase
    if (p.y > this.height + 60) {
      this.loseLife();
      return;
    }

    // Chegou na bandeira -> venceu
    if (p.intersects(flag)) {
      this.win();
    }
  }

  loseLife() {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.state = "lost";
      this.showOverlay("Game Over", `Você fez ${this.score} pontos. Pressione Enter para tentar de novo.`);
    } else {
      this.player.reset();
    }
    this.updateHud(Math.floor((performance.now() - this.startTime) / 1000));
  }

  win() {
    this.state = "won";
    this.showOverlay("Você venceu! 🏆", `Pontuação final: ${this.score}. Pressione Enter para jogar novamente.`);
  }

  circleHitsBox(c, box) {
    const cx = Math.max(box.x, Math.min(c.x, box.x + box.w));
    const cy = Math.max(box.y, Math.min(c.y, box.y + box.h));
    const dx = c.x - cx;
    const dy = c.y - cy;
    return dx * dx + dy * dy <= c.r * c.r;
  }

  updateHud(elapsed) {
    if (this.ui.coins) this.ui.coins.textContent = String(this.score);
    if (this.ui.lives) this.ui.lives.textContent = String(Math.max(0, this.lives));
    if (this.ui.time) this.ui.time.textContent = String(elapsed);
  }

  showOverlay(title, text) {
    this.ui.title.textContent = title;
    this.ui.text.textContent = text;
    this.ui.overlay.classList.remove("hidden");
  }

  hideOverlay() {
    this.ui.overlay.classList.add("hidden");
  }

  // ---------------- Renderização ----------------
  render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.width, this.height);
    this.drawBackground(ctx);

    ctx.save();
    ctx.translate(-this.camera, 0);

    this.drawPlatforms(ctx);
    this.drawCoins(ctx);
    this.drawFlag(ctx);
    for (const e of this.enemies) e.draw(ctx);
    this.player.draw(ctx);

    ctx.restore();
  }

  drawBackground(ctx) {
    // Céu já é o fundo do canvas; adiciona nuvens em parallax.
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    const offset = this.camera * 0.4;
    for (let i = 0; i < 6; i++) {
      const cx = ((i * 340 - offset) % (this.width + 200) + this.width + 200) % (this.width + 200) - 100;
      const cy = 60 + (i % 3) * 30;
      this.cloud(ctx, cx, cy);
    }
    // Colinas
    ctx.fillStyle = "#3aa14a";
    const hillOffset = this.camera * 0.6;
    for (let i = 0; i < 6; i++) {
      const hx = ((i * 300 - hillOffset) % (this.width + 300) + this.width + 300) % (this.width + 300) - 150;
      ctx.beginPath();
      ctx.arc(hx, this.height - 40, 80, Math.PI, 0);
      ctx.fill();
    }
  }

  cloud(ctx, x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.arc(x + 20, y + 6, 22, 0, Math.PI * 2);
    ctx.arc(x + 46, y, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  drawPlatforms(ctx) {
    for (const p of platforms) {
      const isGround = p.h >= 40;
      ctx.fillStyle = isGround ? "#c84c0c" : "#d98a3a";
      ctx.fillRect(p.x, p.y, p.w, p.h);
      // Topo em tom de grama para o chão
      ctx.fillStyle = isGround ? "#3aa14a" : "#b06a24";
      ctx.fillRect(p.x, p.y, p.w, 8);
      // "tijolos"
      ctx.strokeStyle = "rgba(0,0,0,0.15)";
      for (let bx = p.x; bx < p.x + p.w; bx += 20) {
        ctx.beginPath();
        ctx.moveTo(bx, p.y + 8);
        ctx.lineTo(bx, p.y + p.h);
        ctx.stroke();
      }
    }
  }

  drawCoins(ctx) {
    for (const c of this.coins) {
      if (c.taken) continue;
      ctx.fillStyle = "#ffd94a";
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#c99700";
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = "#c99700";
      ctx.fillRect(c.x - 1.5, c.y - 5, 3, 10);
    }
  }

  drawFlag(ctx) {
    ctx.fillStyle = "#dddddd";
    ctx.fillRect(flag.x, flag.y, flag.w, flag.h);
    ctx.fillStyle = "#20b020";
    ctx.beginPath();
    ctx.moveTo(flag.x + flag.w, flag.y);
    ctx.lineTo(flag.x + flag.w + 46, flag.y + 16);
    ctx.lineTo(flag.x + flag.w, flag.y + 32);
    ctx.fill();
    ctx.fillStyle = "#000";
    ctx.fillRect(flag.x - 6, flag.y + flag.h, flag.w + 24, 8);
  }
}
