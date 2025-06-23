export class CommonUtils {
  private readonly store: { dispatch: (action: any) => void };
  constructor(store: { dispatch: (action: any) => void }) {
    this.store = store;
  }

  public getTime() {
    const date = new Date();
    this.store.dispatch({
      type: "UPDATE_TIME",
      payload: {
        time: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      },
    });
  }
}

export class StaticUtils {
  private static readonly commonUtils: CommonUtils = new CommonUtils({
    dispatch: (action: any) => {
      console.log(
        `Action dispatched: ${action.type} with payload:`,
        action.payload
      );
    },
  });

  public static getTime() {
    this.commonUtils.getTime();
  }
}

export class PrepStaticUtils {
  private static readonly commonUtils: CommonUtils = new CommonUtils({
    dispatch: (action: any) => {
      console.log(
        `Action dispatched: ${action.type} FROM PREP STATIC UTILS with payload:`,
        action.payload
      );
    },
  });

  public static getTime() {
    this.commonUtils.getTime();
  }
}
