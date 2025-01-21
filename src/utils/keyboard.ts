class KeyboardStateTracker {
    private keyStates: Record<string, boolean> = {};
  
    constructor() {
      window.addEventListener('keydown', this.handleKeyDown);
      window.addEventListener('keyup', this.handleKeyUp);
    }
  
    private handleKeyDown = (event: KeyboardEvent): void => {
        this.keyStates[event.key] = true;
    };
  
    private handleKeyUp = (event: KeyboardEvent): void => {
      this.keyStates[event.key] = false;
    };
  
    public isPressed(key: string): boolean {
      return !!this.keyStates[key];
    }
  
    public dispose(): void {
      window.removeEventListener('keydown', this.handleKeyDown);
      window.removeEventListener('keyup', this.handleKeyUp);
    }
}

export const keyboard = new KeyboardStateTracker();
