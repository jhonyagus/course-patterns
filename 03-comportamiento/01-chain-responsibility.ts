/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */

import { COLORS } from "../helpers/colors.ts";

interface Handler {
  setNext(handler: Handler): Handler;
  handle(request: string): void;
}

abstract class BaseHandler implements Handler {
  private nextHandler?: Handler;

  setNext(handler: Handler): Handler {
    this.nextHandler = handler;
    return handler;
  }

  handle(request: string): void {
    if (this.nextHandler) this.nextHandler.handle(request);
  }
}

class BasicSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "basic") {
      console.log(
        "%cBasicSupport: Problem solved in BASIC request",
        COLORS.green
      );
      return;
    }

    console.log(
      "%cBasicSupport: Passing request to next handler (AdvancedSupport)",
      COLORS.orange
    );
    super.handle(request);
  }
}

class AdvancedSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "advanced") {
      console.log(
        "%cAdvancedSupport:Problem solved in ADVANCED request",
        COLORS.green
      );
      return;
    }

    console.log(
      "%cAdvancedSupport: Passing request to next handler (ExpertSupport)",
      COLORS.orange
    );
    super.handle(request);
  }
}

class ExpertSupport extends BaseHandler {
  override handle(request: string): void {
    if (request === "expert") {
      console.log(
        "%cExpertSupport: Problem solved in EXPERT request",
        COLORS.green
      );
      return;
    }

    console.log(
      "%cExpertSupport: We cannot handle this request, sorry for that",
      COLORS.red
    );
  }
}

function main() {
  const basicSupport = new BasicSupport();
  const advancedSupport = new AdvancedSupport();
  const expertSupport = new ExpertSupport();

  basicSupport.setNext(advancedSupport).setNext(expertSupport); //* This is how we set the chain of responsibility - form the chain

  basicSupport.handle("expert22"); // This will go through the chain and find the appropriate handler
}

main();
