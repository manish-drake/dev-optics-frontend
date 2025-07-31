export class DebugLogging {
    public log(msg: string) {
      const error = new Error();
    //   console.log("stack:", error.stack);
  
      const errorStack = error.stack;
    //   console.log("stack:", errorStack);
  
      const realStringStack = "-> " + error.stack;
      console.log("stack:", realStringStack);
  
      debugger
  
      console.log(msg);
    }
  }
  
 