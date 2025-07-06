/**
 * !Patrón Memento
 * Permite capturar y externalizar un estado interno de un objeto,
 * de manera que el objeto pueda ser restaurado a ese estado más tarde.
 *
 * * Es útil cuando se necesita guardar el estado de un objeto para poder
 * * volver a él en un futuro.
 *
 * https://refactoring.guru/es/design-patterns/memento
 */

import { COLORS } from "../helpers/colors.ts";

class GameMemento {
  constructor(
    private _level: number,
    private _health: number,
    private _position: string
  ) {}

  get level(): number {
    return this._level;
  }

  get health(): number {
    return this._health;
  }

  get position(): string {
    return this._position;
  }
}

class Game {
  constructor(
    private _level: number,
    private _health: number,
    private _position: string
  ) {
    console.log(
      `Playing game at level ${this._level}
        health: ${this._health} 
        position: ${this._position}`
    );
  }

  save(): GameMemento {
    return new GameMemento(this._level, this._health, this._position);
  }

  play(level: number, health: number, position: string): void {
    this._level = level;
    this._health = health;
    this._position = position;
    console.log(
      `%c\nMoving and now 
        Playing game at level ${this._level}
        health: ${this._health} 
        position: ${this._position}`,
      COLORS.green
    );
  }

  restore(memento: GameMemento | undefined): void {
    if (!memento) return;
    this._level = memento.level;
    this._health = memento.health;
    this._position = memento.position;
    console.log(
      `%c\nRestored game to level ${this._level}
            health: ${this._health} 
            position: ${this._position}`,
      COLORS.yellow
    );
  }
}

class GameHistory {
  private mementos: GameMemento[] = [];

  push(memento: GameMemento): void {
    this.mementos.push(memento);
  }

  pop(): GameMemento | undefined {
    return this.mementos.pop();
  }
}

function main() {
  const game = new Game(1, 100, "start");
  const history = new GameHistory();
  history.push(game.save());

  game.play(2, 80, "middle");
  history.push(game.save());

  game.play(3, 50, "Dark Forest");
  history.push(game.save());
  game.play(4, 10, "Final Boss");

  console.log(`%c\nCurrent game state: `, COLORS.gray);

  game.restore(history.pop());

  //   game.restore(history.pop());

  console.log({ history });
}

main();
