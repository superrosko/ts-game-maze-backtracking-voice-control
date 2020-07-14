import {Maze} from '../maze';
import {Point} from '../point';

/**
 * Class TextRenderer
 */
class TextRenderer {
  private maze: Maze
  private readonly symbolBorder: string;
  private readonly symbolPath: string;
  private readonly symbolWay: string;
  private readonly symbolStart: string;
  private readonly symbolEnd: string;
  private readonly symbolCurrent: string;

  /**
   * Constructor
   * @param {Maze} maze
   * @param {string} symbolBorder
   * @param {string} symbolPath
   * @param {string} symbolWay
   * @param {string} symbolStart
   * @param {string} symbolEnd
   * @param {string} symbolCurrent
   */
  constructor(maze: Maze,
      symbolBorder = '#',
      symbolPath = ' ',
      symbolWay = '*',
      symbolStart = 'O',
      symbolEnd = 'X',
      symbolCurrent = '@') {
    this.maze = maze;
    this.symbolBorder = symbolBorder;
    this.symbolPath = symbolPath;
    this.symbolWay = symbolWay;
    this.symbolStart = symbolStart;
    this.symbolEnd = symbolEnd;
    this.symbolCurrent = symbolCurrent;
  }

  /**
   * render
   * @return {string} screen
   */
  public render(): string {
    let screen = '';
    for (let y = 0; y < this.maze.getHeight(); y++) {
      for (let x = 0; x < this.maze.getWidth(); x++) {
        const point = new Point(x, y);
        const type = this.maze.getFieldPointType(point);

        if (this.maze.isCurrentPoint(point)) {
          screen += this.symbolCurrent;
        } else if (this.maze.isStartPoint(point)) {
          screen += this.symbolStart;
        } else if (this.maze.isEndPoint(point)) {
          screen += this.symbolEnd;
        } else if (type === Maze.MAZE_WALL) {
          screen += this.symbolBorder;
        } else if (type === Maze.MAZE_PATH) {
          screen += this.symbolPath;
        } else if (type === Maze.MAZE_WAY) {
          screen += this.symbolWay;
        }
      }
      screen += '\n';
    }
    return screen;
  }
}

export {TextRenderer};
