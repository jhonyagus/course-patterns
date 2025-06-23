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
 */

import { COLORS } from "../helpers/colors.ts";

//! Tarea: crear un QueryBuilder para construir consultas SQL
/**
 * Debe de tener los siguientes métodos:
 * - constructor(table: string)
 * - select(fields: string[]): QueryBuilder -- si no se pasa ningún campo, se seleccionan todos con el (*)
 * - where(condition: string): QueryBuilder - opcional
 * - orderBy(field: string, order: string): QueryBuilder - opcional
 * - limit(limit: number): QueryBuilder - opcional
 * - execute(): string - retorna la consulta SQL
 * 
 ** Ejemplo de uso:
  const usersQuery = new QueryBuilder("users") // users es el nombre de la tabla
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'")
    .orderBy("name", "ASC")
    .limit(10)
    .execute();

  console.log('Consulta: ', usersQuery);
  // Select id, name, email from users where age > 18 and country = 'Cri' order by name ASC limit 10;
 */

//! Solución

class QueryBuilder {
  private readonly table: string;
  private readonly fields: string[] = [];
  private readonly conditions: string[] = [];
  private readonly orderFields: string[] = [];
  private limitCount?: number;

  constructor(table: string) {
    this.table = table;
  }

  select(...fields: string[]): this {
    this.fields.push(...fields);
    return this;
  }

  where(condition: string): this {
    this.conditions.push(condition);
    return this;
  }

  orderBy(field: string, direction: "ASC" | "DESC" = "ASC"): this {
    this.orderFields.push(`${field} ${direction}`);
    return this;
  }

  limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  execute(): string {
    const fieldsPart = this.fields.length > 0 ? this.fields.join(", ") : "*";
    const conditionsPart =
      this.conditions.length > 0
        ? ` where ${this.conditions.join(" and ")}`
        : "";
    const orderPart =
      this.orderFields.length > 0
        ? ` order by ${this.orderFields.join(", ")}`
        : "";
    const limitPart =
      this.limitCount && this.limitCount > 0 ? ` limit ${this.limitCount}` : "";

    return `select ${fieldsPart} from ${this.table}${conditionsPart}${orderPart}${limitPart};`;
  }
}

function main() {
  const usersQuery = new QueryBuilder("users")
    .select("id", "name", "email")
    .where("age > 18")
    .where("country = 'Cri'") // Esto debe de hacer una condición AND
    .orderBy("name", "ASC")
    .limit(5)
    .execute();

  console.log("%cConsulta:\n", COLORS.red);
  console.log(usersQuery);

  const productsQuery = new QueryBuilder("products")
    .where("stock > 0")
    .orderBy("price", "DESC")
    .orderBy("name", "ASC")
    .execute();

  console.log("%cConsulta de productos:\n", COLORS.red);
  console.log(productsQuery);
}

main();
