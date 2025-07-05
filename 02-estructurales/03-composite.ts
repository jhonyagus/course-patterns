/**
 * ! Patrón Composite
 * Es un patrón de diseño estructural que permite componer objetos
 * en estructuras de árbol para representar jerarquías.
 *
 * El patrón permite a los clientes tratar de manera uniforme a los objetos
 * individuales y a sus composiciones.
 *
 * * Es útil cuando necesitas tratar a los objetos individuales
 * * y a sus composiciones de manera uniforme, y la estructura
 * * de los objetos forma una jerarquía en árbol.
 *
 * https://refactoring.guru/es/design-patterns/composite
 *
 */

import { COLORS } from "../helpers/colors.ts";

interface IFileSystemComponent {
  displayFiles(indent: string): void;
}

class FFile implements IFileSystemComponent {
  constructor(private readonly name: string) {}

  displayFiles(indent: string): void {
    console.log(`%c${indent}- File: ${this.name}`, COLORS.orange);
  }
}

class Folder implements IFileSystemComponent {
  private readonly contents: IFileSystemComponent[] = [];
  constructor(private readonly name: string) {}

  add(component: IFileSystemComponent): void {
    this.contents.push(component);
  }

  displayFiles(indent: string): void {
    console.log(`%c${indent}+ Folder: ${this.name}`, COLORS.green);
    this.contents.forEach((component) => {
      component.displayFiles(indent + " ");
    });
  }
}

function main() {
  const rootFolder = new Folder("Root");
  const folder1 = new Folder("Folder1");
  const file1 = new FFile("File1.txt");
  const file2 = new FFile("File2.txt");
  const file3 = new FFile("File3.txt");
  const file4 = new FFile("File4.txt");
  const file5 = new FFile("File5.txt");

  const folder2 = new Folder("Folder2");
  const folder3 = new Folder("Folder3");
  const folder5 = new Folder("Folder5");

  folder1.add(file1);
  folder1.add(file2);
  folder2.add(file3);

  folder3.add(folder5);
  folder3.add(file4);
  rootFolder.add(folder1);
  rootFolder.add(folder2);
  rootFolder.add(folder3);
  folder5.add(file5);
  rootFolder.add(new FFile("File6.txt"));

  rootFolder.displayFiles("");
}

main();
