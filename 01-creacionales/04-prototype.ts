/**
 * ! Patrón Prototype:

 * Es un patrón de diseño creacional que nos permite copiar objetos existentes sin hacer
 * que el código dependa de sus clases.
 * 
 * * Es útil cuando queremos duplicar el contenido, 
 * * el título y el autor de un documento, por ejemplo o cualquier objeto complejo.
 * 
 * https://refactoring.guru/es/design-patterns/prototype
 */

class DocumentClass {
  title: string;
  private readonly content: string;
  author: string;

  constructor(title: string, content: string, author: string) {
    this.title = title;
    this.content = content;
    this.author = author;
  }

  clone() {
    return new DocumentClass(this.title, this.content, this.author);
  }

  displayInfo() {
    console.log(`
        Title: ${this.title}
        Author: ${this.author}
        Content: ${this.content}
    `);
  }
}

function main() {
  const document1 = new DocumentClass(
    "Design Patterns",
    "This document explains various design patterns in software development.",
    "John Doe"
  );

  console.log({ document1 });
  document1.displayInfo();

  const document2 = structuredClone(document1);
  document2.title = "Advanced Design Patterns";

  console.log({ document2 });
  document1.displayInfo();

  const document3 = document1.clone();
  document3.title = "Design Patterns in TypeScript";
  console.log({ document3 });
  document3.displayInfo();
}

main();
