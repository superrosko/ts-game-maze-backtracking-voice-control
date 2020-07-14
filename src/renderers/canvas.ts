import {Maze} from '../maze';
import {Point} from '../point';

/**
 * Class CanvasRenderer
 */
class CanvasRenderer {
  private maze: Maze;
  private canvas: HTMLCanvasElement;
  private readonly pointSize: number;
  private readonly colorBorder: string;
  private readonly colorPath: string;
  private readonly colorWay: string;
  private readonly colorStartPoint: string;
  private readonly colorEndPoint: string;
  private readonly colorCurrentPoint: string;

  /**
   * Constructor
   * @param {Maze} maze
   * @param {HTMLCanvasElement} canvas
   * @param {number} pointSize
   * @param {string} colorBorder
   * @param {string} colorPath
   * @param {string} colorWay
   * @param {string} colorStartPoint
   * @param {string} colorEndPoint
   * @param {string} colorCurrentPoint
   */
  constructor(maze: Maze, canvas: HTMLCanvasElement,
      pointSize: number,
      colorBorder = '#032B43',
      colorPath = '#3F88C5',
      colorWay = '#F19953',
      colorStartPoint = '#136F63',
      colorEndPoint = '#FFBA08',
      colorCurrentPoint = '#D00000',
  ) {
    this.pointSize = pointSize;
    this.colorBorder = colorBorder;
    this.colorPath = colorPath;
    this.colorWay = colorWay;
    this.colorStartPoint = colorStartPoint;
    this.colorEndPoint = colorEndPoint;
    this.colorCurrentPoint = colorCurrentPoint;

    this.maze = maze;
    this.canvas = canvas;
    canvas.width = this.pointSize * this.maze.getWidth();
    canvas.height = this.pointSize * this.maze.getHeight();
  }

  /**
   * render
   */
  public render(): void {
    const ctx = this.canvas.getContext('2d');
    if (ctx !== null) {
      ctx.fillStyle = this.colorBorder;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      for (let y = 0; y < this.maze.getHeight(); y++) {
        for (let x = 0; x < this.maze.getWidth(); x++) {
          const point = new Point(x, y);
          const type = this.maze.getFieldPointType(point);

          if (this.maze.isCurrentPoint(point)) {
            ctx.fillStyle = this.colorCurrentPoint;
          } else if (this.maze.isStartPoint(point)) {
            ctx.fillStyle = this.colorStartPoint;
          } else if (this.maze.isEndPoint(point)) {
            ctx.fillStyle = this.colorEndPoint;
          } else if (type === Maze.MAZE_PATH) {
            ctx.fillStyle = this.colorPath;
          } else if (type === Maze.MAZE_WAY) {
            ctx.fillStyle = this.colorWay;
          }
          if (type !== Maze.MAZE_WALL) {
            ctx.fillRect(this.pointSize * x, this.pointSize * y,
                this.pointSize, this.pointSize);
          }
        }
      }
    }
  }
}

export {CanvasRenderer};
