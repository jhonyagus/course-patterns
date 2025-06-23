import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Builder:
 * Es un patrón de diseño creacional que nos permite construir objetos complejos
 * paso a paso.
 *
 * El patrón nos permite producir distintos tipos y representaciones
 * de un objeto empleando el mismo código de construcción.
 *
 * * Es útil cuando necesitamos construir un objeto complejo con muchas partes
 * * y queremos que el proceso de construcción sea independiente de las partes
 * * que lo componen.
 *
 * https://refactoring.guru/es/design-patterns/builder
 */
export class Computer {
  private _cpu: string = "Undefined CPU";
  private _ram: string = "Undefined RAM";
  private _storage: string = "Undefined Storage";
  private _gpu?: string;

  public displayConfigurations(): void {
    console.log(`Configurations: 
    CPU: ${this._cpu}
    RAM: ${this._ram}
    Storage: ${this._storage}
    GPU: ${this._gpu ?? "No GPU installed"}
    `);
  }

  public set cpu(value: string) {
    this._cpu = value;
  }
  public get cpu(): string {
    return this._cpu;
  }
  public set ram(value: string) {
    this._ram = value;
  }
  public get ram(): string {
    return this._ram;
  }
  public set storage(value: string) {
    this._storage = value;
  }
  public get storage(): string {
    return this._storage;
  }
  public set gpu(value: string) {
    this._gpu = value;
  }
  public get gpu(): string | undefined {
    return this._gpu;
  }
}

export class ComputerBuilder {
  private readonly computer: Computer;

  constructor() {
    this.computer = new Computer();
  }

  public setCPU(cpu: string): this {
    this.computer.cpu = cpu;
    return this;
  }

  public setRAM(ram: string): this {
    this.computer.ram = ram;
    return this;
  }

  public setStorage(storage: string): this {
    this.computer.storage = storage;
    return this;
  }

  public setGPU(gpu: string): this {
    this.computer.gpu = gpu;
    return this;
  }

  public build(): Computer {
    return this.computer;
  }
}

function main() {
  const computer = new ComputerBuilder().build();
  console.log("%cDefault Computer:", COLORS.green);
  computer.displayConfigurations();

  const basicComputer = new ComputerBuilder()
    .setCPU("Intel Duo 2")
    .setRAM("4GB")
    .setStorage("256GB")
    .build();
  console.log("%cBasic Computer:", COLORS.cyan);
  basicComputer.displayConfigurations();

  const gamingComputer = new ComputerBuilder()
    .setCPU("AMD Ryzen 9")
    .setRAM("32GB")
    .setStorage("1TB SSD")
    .setStorage("2TB HDD")
    .setGPU("NVIDIA RTX 3080")
    .build();
  console.log("%cGaming Computer:", COLORS.yellow);
  gamingComputer.displayConfigurations();
}

main();
