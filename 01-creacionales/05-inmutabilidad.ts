/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

import { COLORS } from "../helpers/colors.ts";

class CodeEditorState {
  constructor(
    public readonly content: string,
    public readonly cursorPosition: number,
    public readonly unsavedChanges: boolean
  ) {}

  //* This is a important on the pattern
  copyWith(partialCodeEditorState: Partial<CodeEditorState>): CodeEditorState {
    const { content, cursorPosition, unsavedChanges } = partialCodeEditorState;
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsavedChanges ?? this.unsavedChanges
    );
  }

  display(): void {
    console.log(`%cIDE State`, COLORS.cyan);
    console.log(`Content: ${this.content}`);
    console.log(`Cursor Position: ${this.cursorPosition}`);
    console.log(`Unsaved Changes: ${this.unsavedChanges}`);
  }
}

class CodeEditorHistory {
  private readonly history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState | null): void {
    if (!state) return;
    if (this.currentIndex < this.history.length - 1) {
      this.history.splice(0, this.currentIndex + 1);
    }
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState: CodeEditorState | null = new CodeEditorState(
    'console.log("Hello World")',
    2,
    false
  );

  history.save(editorState);

  console.log(`%cInitial State`, COLORS.green);
  editorState.display();
  console.log({ history });
  console.log(`%cAfter first Change`, COLORS.green);
  editorState = editorState.copyWith({
    content: 'console.log("Hello World") \nconsole.log("Hello TypeScript")`',
    cursorPosition: 5,
    unsavedChanges: true,
  });
  history.save(editorState);
  console.log({ history });

  editorState.display();

  console.log(`%cAfter move cursor`, COLORS.green);
  editorState = editorState.copyWith({
    cursorPosition: 1,
  });
  editorState.display();
  history.save(editorState);

  console.log(`%cAfter UNDO 1`, COLORS.green);
  editorState = history.undo();
  editorState?.display();
  console.log({ history });

  console.log(`%cAfter UNDO 2`, COLORS.green);
  editorState = history.undo();
  editorState?.display();
  history.save(editorState);
  console.log({ history });

  console.log(`%cAfter REDO`, COLORS.green);
  editorState = history.redo();
  editorState?.display();
  console.log({ history });
}

main();
