/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Interfaz Document
interface Document {
  displayContent(user: User): void;
}

// 2. Clase que representa el Documento Confidencial - ConfidentialDocument
class ConfidentialDocument implements Document {
  private content: string;

  constructor(content: string) {
    this.content = content;
  }

  displayContent(): void {
    console.log(`Contenido del documento: \n%c${this.content}\n`, COLORS.blue);
  }
}

// 3. Clase Proxy - DocumentProxy
class DocumentProxy implements Document {
  private document: Document;
  private permissions: string[];

  constructor(document: Document, permissions: string[]) {
    this.document = document;
    this.permissions = permissions;
  }

  mustHaveRole(rol: string): boolean {
    return this.permissions.includes(rol);
  }

  displayContent(user: User): void {
    if (!this.mustHaveRole(user.getRole()))
      return console.log(
        `%cAccess denied. ${user.getName()}, you do not have sufficient permissions to view this document.`,
        COLORS.red
      );

    this.document.displayContent(user);
  }
}

// 4. Clase que representa al Usuario - User
class User {
  private name: string;
  private role: "admin" | "user";

  constructor(name: string, role: "admin" | "user") {
    this.name = name;
    this.role = role;
  }

  getName(): string {
    return this.name;
  }

  getRole(): string {
    return this.role;
  }
}

// 5. Código Cliente para probar el Proxy

function main() {
  const confidentialDoc = new ConfidentialDocument(
    "Este es el contenido confidencial del documento."
  );
  const proxy = new DocumentProxy(confidentialDoc, ["admin", "user"]);

  const user1 = new User("Juan", "user");
  const user2 = new User("Ana", "admin");

  console.log("Intento de acceso del usuario 1:");
  proxy.displayContent(user1); // Debería denegar el acceso

  console.log("\nIntento de acceso del usuario 2:");
  proxy.displayContent(user2); // Debería permitir el acceso
}

main();
