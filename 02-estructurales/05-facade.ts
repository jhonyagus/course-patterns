/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Projector {
  turnOn() {
    console.log("Projector is now ON");
  }

  turnOff() {
    console.log("Projector is now OFF");
  }
}

class SoundSystem {
  on() {
    console.log("Sound System is now ON");
  }

  off() {
    console.log("Sound System is now OFF");
  }
}

class VideoPlayer {
  on() {
    console.log("Video Player is now ON");
  }

  play(movie: string) {
    console.log(`Playing movie: %c${movie}`, COLORS.orange);
  }

  stop() {
    console.log("Video Player stopped");
  }

  off() {
    console.log("Video Player is now OFF");
  }
}

class PopCornMachine {
  turnOn() {
    console.log("Popcorn Machine is now ON");
  }

  turnOff() {
    console.log("Popcorn Machine is now OFF");
  }

  pop() {
    console.log("Popping popcorn...");
  }

  stopPop() {
    console.log("Stopped popping popcorn");
  }
}

type THomeTheaterConstructor = {
  projector: Projector;
  soundSystem: SoundSystem;
  videoPlayer: VideoPlayer;
  popCornMachine: PopCornMachine;
};

class HomeTheaterFacade {
  private projector: Projector;
  private soundSystem: SoundSystem;
  private videoPlayer: VideoPlayer;
  private popCornMachine: PopCornMachine;

  constructor({
    popCornMachine,
    projector,
    soundSystem,
    videoPlayer,
  }: THomeTheaterConstructor) {
    this.popCornMachine = popCornMachine;
    this.projector = projector;
    this.soundSystem = soundSystem;
    this.videoPlayer = videoPlayer;
  }

  public watchMovie(movie: string) {
    console.log("%cStarting movie night...", COLORS.green);
    this.projector.turnOn();
    this.soundSystem.on();
    this.videoPlayer.on();
    this.popCornMachine.turnOn();
    this.popCornMachine.pop();
    this.videoPlayer.play(movie);
  }

  public endWatchingMovie() {
    console.log("\n\n%cEnding movie night...", COLORS.green);
    this.popCornMachine.stopPop();
    this.popCornMachine.turnOff();
    this.videoPlayer.stop();
    this.videoPlayer.off();
    this.soundSystem.off();
    this.projector.turnOff();
  }
}

function main() {
  const homeTheater = new HomeTheaterFacade({
    projector: new Projector(),
    soundSystem: new SoundSystem(),
    videoPlayer: new VideoPlayer(),
    popCornMachine: new PopCornMachine(),
  });

  homeTheater.watchMovie("Inception");
  console.log("Enjoy the movie!");
  homeTheater.endWatchingMovie();
}

main();
