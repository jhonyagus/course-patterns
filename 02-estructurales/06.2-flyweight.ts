/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Clase que representa el tipo de bala - BulletType (Flyweight)
class BulletType {
  private name: string;
  private damage: number;
  private color: string;

  constructor(name: string, damage: number, color: string) {
    this.name = name;
    this.damage = damage;
    this.color = color;
  }

  getName(): string {
    return this.name;
  }

  getDamage(): number {
    return this.damage;
  }

  getColor(): string {
    return this.color;
  }
}

// 2. Fábrica de Flyweights - BulletTypeFactory
class BulletTypeFactory {
  private static bulletTypes: Record<string, BulletType> = {};

  static getBulletKey(name: string, damage: number, color: string): string {
    return `${name.toLowerCase()}-${damage}-${color.toLowerCase()}`;
  }

  static getBulletTypeKey(name: string, damage: number, color: string): string {
    const key = this.getBulletKey(name, damage, color);

    if (!this.bulletTypes[key]) {
      console.log(`%cCreating a new bullet type: ${key}`, COLORS.red);
      const bulletType = new BulletType(name, damage, color);
      this.bulletTypes[key] = bulletType;
    }

    return key;
  }

  static getBulletTypeByKey(key: string): BulletType | undefined {
    return this.bulletTypes[key];
  }
}

// 3. Clase que representa una Bala - Bullet
class Bullet {
  private x: number;
  private y: number;
  private direction: number;
  private bulletTypeKey: string;

  constructor(x: number, y: number, direction: number, bulletTypeKey: string) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.bulletTypeKey = bulletTypeKey;
  }

  display(): void {
    const bulletType = this.getBulletType();
    const text = `
      Bala del tipo: %c"${bulletType?.getName()}" 
      %cCoords: (${this.x}, ${this.y})
      Dirección ${this.direction}
      Daño: ${bulletType?.getDamage()} 
      Color: ${bulletType?.getColor()}
    `;

    console.log(text, COLORS.green, COLORS.white);
  }

  getBulletType() {
    return BulletTypeFactory.getBulletTypeByKey(this.bulletTypeKey);
  }
}

// 4. Sistema de Disparos - ShootingSystem

class ShootingSystem {
  private bullets: Bullet[] = [];

  shoot(
    x: number,
    y: number,
    direction: number,
    type: string,
    damage: number,
    color: string
  ): void {
    const bulletTypeKey = BulletTypeFactory.getBulletTypeKey(
      type,
      damage,
      color
    );
    const bullet = new Bullet(x, y, direction, bulletTypeKey);
    this.bullets.push(bullet);
    bullet.display();
  }

  getBulletCount(): number {
    return this.bullets.length;
  }

  displayBullets(): void {
    console.log(`\n\n\n\n%cDisplaying all bullets:`, COLORS.blue);
    this.bullets.forEach((bullet) => console.log(bullet));
    console.log(
      "Check if instances are shared:",
      this.bullets[0].getBulletType() === this.bullets[3].getBulletType()
    ); // Should be true if Flyweight is working
  }
}

// 5. Código Cliente para probar el Flyweight

function main() {
  const shootingSystem = new ShootingSystem();

  // Disparar varias balas de diferentes tipos
  shootingSystem.shoot(10, 20, 0, "Pistola", 10, "Gris");
  shootingSystem.shoot(15, 25, 90, "Escopeta", 20, "Rojo");
  shootingSystem.shoot(20, 30, 180, "Rifle", 15, "Verde");
  shootingSystem.shoot(10, 20, 45, "Pistola", 10, "Gris");
  shootingSystem.shoot(25, 35, 270, "Escopeta", 20, "Rojo");

  console.log(
    `Total de balas disparadas: %c${shootingSystem.getBulletCount()}\n`,
    COLORS.yellow
  );

  shootingSystem.displayBullets();
}

main();
