/**
 * ! Patrón Iterator
 * Este patrón permite recorrer los elementos de una colección sin exponer
 * la estructura interna de la colección.
 *
 * * Es útil cuando se necesita recorrer una colección de elementos sin importar
 * * cómo se almacenan los elementos.
 *
 * https://refactoring.guru/es/design-patterns/iterator
 */
export {};
interface IIterator<T> {
  next(): T | null;
  hasNext(): boolean;
  current(): T | null;
}

class Pokemon {
  constructor(public name: string, public type: string) {}
}

class PokemonCollection {
  private pokemonCollection: Pokemon[] = [];

  addPokemon(pokemon: Pokemon): void {
    this.pokemonCollection.push(pokemon);
  }

  getPokemonAtIndex(index: number): Pokemon | null {
    if (index < 0 || index >= this.pokemonCollection.length) {
      return null;
    }

    return this.pokemonCollection[index];
  }

  createIterator(): PokemonIterator {
    return new PokemonIterator(this);
  }

  get pokemonLength(): number {
    return this.pokemonCollection.length;
  }
}

class PokemonIterator implements IIterator<Pokemon> {
  private collection: PokemonCollection;
  private position = 0;

  constructor(collection: PokemonCollection) {
    this.collection = collection;
  }

  next(): Pokemon | null {
    if (this.hasNext()) {
      return this.collection.getPokemonAtIndex(this.position++);
    }
    return null;
  }

  hasNext(): boolean {
    return this.position < this.collection.pokemonLength;
  }

  current(): Pokemon | null {
    return this.collection.getPokemonAtIndex(this.position);
  }
}

function main() {
  const pokedex = new PokemonCollection();
  pokedex.addPokemon(new Pokemon("Pikachu", "Electric"));
  pokedex.addPokemon(new Pokemon("Charmander", "Fire"));
  pokedex.addPokemon(new Pokemon("Squirtle", "Water"));
  pokedex.addPokemon(new Pokemon("Bulbasaur", "Grass"));
  pokedex.addPokemon(new Pokemon("Jigglypuff", "Normal"));

  const iterator = pokedex.createIterator();

  while (iterator.hasNext()) {
    const pokemon = iterator.next();
    if (pokemon) {
      console.log(`Pokemon: ${pokemon.name}, Type: ${pokemon.type}`);
    }
  }
}

main();
