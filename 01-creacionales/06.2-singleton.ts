/**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 */

import { COLORS } from "../helpers/colors.ts";

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private connected: boolean;

  private constructor() {
    this.connected = false;
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
      console.log("%cDatabase instance created!!", COLORS.pink);
    }

    return DatabaseConnection.instance;
  }

  public connect(): void {
    if (this.connected)
      return console.log("%cYou already connected !", COLORS.red);
    this.connected = true;
    console.log("%cConnected to database successfully", COLORS.green);
  }

  public disconnect(): void {
    if (!this.connected)
      return console.log("%cYou already disconnected", COLORS.brown);
    this.connected = false;
    console.log("%cDisconnected from database successfully!", COLORS.cyan);
  }
}

function main() {
  const db1 = DatabaseConnection.getInstance();
  db1.connect(); // Debería conectar a la base de datos

  const db2 = DatabaseConnection.getInstance();
  db2.connect(); // Debería mostrar que ya existe una conexión activa

  console.log("Son iguales:", db1 === db2); // Debería mostrar true

  db1.disconnect(); // Debería cerrar la conexión

  db2.connect(); // Ahora debería conectar de nuevo, ya que se cerró la anterior
  db1.connect();
  db2.disconnect();
  db1.disconnect();
}

main();
