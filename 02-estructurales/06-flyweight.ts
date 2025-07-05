/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */

import { COLORS } from "../helpers/colors.ts";

type TCoordinates = { x: number; y: number };
type TLocationType = "hospital" | "school" | "restaurant";
interface ILocation {
  display: (coordinates: TCoordinates) => void;
}

//* This a Flyweight Class
class LocationIcon implements ILocation {
  private type: TLocationType;
  private iconImage: string; // URL of the icon image

  constructor(type: TLocationType, iconImage: string) {
    this.type = type;
    this.iconImage = iconImage;
  }

  display(coordinates: TCoordinates): void {
    console.log(
      `Coord ${this.type} en : (${coordinates.x}, ${coordinates.y}) con icon %c${this.iconImage}`,
      COLORS.green
    );
  }
}

//* This is a Flyweight Factory */
class LocationIconFactory {
  private icons: Map<TLocationType, LocationIcon> = new Map();

  getIcon(type: TLocationType): LocationIcon {
    const iconImage = `https://example.com/icons/${type}.png`; // Simulated icon URL
    if (!this.icons.has(type)) {
      console.log(`%cCreating icon for type: ${type}`, COLORS.orange);
      this.icons.set(type, new LocationIcon(type, iconImage));
    }
    return this.icons.get(type)!;
  }

  getTotalIcons(): number {
    return this.icons.size;
  }
}

class MapLocation {
  constructor(private coordinates: TCoordinates, private icon: LocationIcon) {}

  display(): void {
    this.icon.display(this.coordinates);
  }
}

function main() {
  const locationIconFactory = new LocationIconFactory();

  const mapLocations: MapLocation[] = [
    new MapLocation({ x: 10, y: 20 }, locationIconFactory.getIcon("hospital")),
    new MapLocation({ x: 15, y: 25 }, locationIconFactory.getIcon("school")),
    new MapLocation(
      { x: 30, y: 40 },
      locationIconFactory.getIcon("restaurant")
    ),
    new MapLocation({ x: 50, y: 60 }, locationIconFactory.getIcon("hospital")),
    new MapLocation({ x: 70, y: 80 }, locationIconFactory.getIcon("school")),
  ];

  mapLocations.forEach((location) => location.display());
}

main();
