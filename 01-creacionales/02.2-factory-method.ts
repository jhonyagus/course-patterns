/**
 * ! Factory Method:
 * El patrón Factory Method permite crear objetos sin especificar
 * la clase exacta del objeto que se creará.
 *
 * En lugar de eso, delegamos la creación de objetos a subclases o métodos
 * que encapsulan esta lógica.
 *
 * * Es útil cuando una clase no puede anticipar la clase
 * * de objetos que debe crear.
 *
 * https://refactoring.guru/es/design-patterns/factory-method
 */

/**
 * 	!Descripción:
  1.	Completen las clases SalesReport e InventoryReport para implementar 
      la interfaz Report, generando el contenido de cada reporte en el método generate.
	  
  2.	Implementen las clases SalesReportFactory e InventoryReportFactory 
      para crear instancias de SalesReport y InventoryReport, respectivamente.

	3.	Prueben el programa generando diferentes tipos de reportes usando
      el prompt para seleccionar el tipo de reporte.
 */

import { COLORS } from "../helpers/colors.ts";

// 1. Definir la interfaz Report
interface Report {
  generate(): void;
}

// 2. Clases concretas de Reportes
// Implementar SalesReport e InventoryReport

class SalesReport implements Report {
  generate(): void {
    console.log("%cGenerando reporte de ventas...", COLORS.gray);
  }
}

class InventoryReport implements Report {
  generate(): void {
    console.log("%cGenerando reporte de inventario...", COLORS.yellow);
  }
}

class AccountReport implements Report {
  generate(): void {
    console.log("%cGenerando reporte de contabilidad...", COLORS.cyan);
  }
}

// 3. Clase Base ReportFactory con el Método Factory

abstract class ReportFactory {
  abstract createReport(): Report;

  generateReport(): void {
    const report = this.createReport();
    report.generate();
  }
}

class SalesReportFactory extends ReportFactory {
  override createReport(): Report {
    return new SalesReport();
  }
}

class InventoryReportFactory extends ReportFactory {
  override createReport(): Report {
    return new InventoryReport();
  }
}

class AccountReportFactory extends ReportFactory {
  override createReport(): Report {
    return new AccountReport();
  }
}

function main() {
  const reportType = prompt(
    "¿Qué tipo de reporte deseas? %c(sales/inventory/account)"
  );

  let reportFactory: ReportFactory;
  switch (reportType?.toLowerCase()) {
    case "sales":
      reportFactory = new SalesReportFactory();
      break;
    case "inventory":
      reportFactory = new InventoryReportFactory();
      break;
    case "account":
      reportFactory = new AccountReportFactory();
      break;
    default:
      console.error("Tipo de reporte no válido.");
      return;
  }

  reportFactory.generateReport();
}

main();
