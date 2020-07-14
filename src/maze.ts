import {Point} from './point';

/**
 * Class Maze
 */
class Maze {
  static readonly MAZE_EMPTY = 0;
  static readonly MAZE_WALL = 1;
  static readonly MAZE_PATH = 2;

  protected width!: number;
  protected height!: number;
  protected field!: number[][];
  protected startPoint!: Point;
  protected currentPoint!: Point;
  protected endPoint!: Point;

  /**
   * Constructor
   * @param {number} width
   * @param {number} height
   */
  constructor(width = 0, height = 0) {
    this.reInit(width, height);
  }

  /**
   * reInit
   * @param {number} width
   * @param {number} height
   */
  public reInit(width: number, height: number): void {
    this.width = width;
    this.height = height;
    this.field = this.genEmptyField();
    this.startPoint = new Point(1, 1);
    this.endPoint = new Point(1, 1);
    this.currentPoint = new Point(1, 1);
  }

  /**
   * getWidth
   * @return {Point} width
   */
  public getWidth(): number {
    return this.width;
  }

  /**
   * getHeight
   * @return {Point} width
   */
  public getHeight(): number {
    return this.height;
  }

  /**
   * getField
   * @return {[][]} field
   */
  public getField(): number[][] {
    return this.field;
  }

  /**
   * genEmptyField
   * @return {[][]} field
   */
  protected genEmptyField(): number[][] {
    const field: number[][] = [];
    for (let y = 0; y < this.height; y++) {
      field[y] = [];
      for (let x = 0; x < this.width; x++) {
        field[y][x] = Maze.MAZE_EMPTY;
      }
    }
    return field;
  }

  /**
   * getFieldPointType
   * @param {Point} point
   * @return {number}
   */
  public getFieldPointType(point: Point): number {
    return this.field[point.y][point.x];
  }

  /**
   * setFieldPointType
   * @param {Point} point
   * @param {number} type
   */
  public setFieldPointType(point: Point, type: number): void {
    this.field[point.y][point.x] = type;
  }

  /**
   * getStartPoint
   * @return {Point} startPoint
   */
  public getStartPoint(): Point {
    return this.startPoint;
  }

  /**
   * isStartPoint
   * @param {Point} point
   * @return {boolean}
   */
  public isStartPoint(point: Point): boolean {
    return point.x === this.startPoint.x && point.y === this.startPoint.y;
  }

  /**
   * getEndPoint
   * @return {Point} endPoint
   */
  public getEndPoint(): Point {
    return this.endPoint;
  }

  /**
   * setEndPoint
   * @param {Point} point
   * @return {boolean}
   */
  public setEndPoint(point: Point): boolean {
    const type = this.getFieldPointType(point);
    if (type != Maze.MAZE_WALL) {
      this.endPoint = point;
      return true;
    }
    return false;
  }

  /**
   * isEndPoint
   * @param {Point} point
   * @return {boolean}
   */
  public isEndPoint(point: Point): boolean {
    return point.x === this.endPoint.x && point.y === this.endPoint.y;
  }

  /**
   * getCurrentPoint
   * @return {Point} currentPoint
   */
  public getCurrentPoint(): Point {
    return this.currentPoint;
  }

  /**
   * setCurrentPoint
   * @param {Point} point
   * @return {boolean}
   */
  public setCurrentPoint(point: Point): boolean {
    const type = this.getFieldPointType(point);
    if (type != Maze.MAZE_WALL) {
      this.currentPoint = point;
      return true;
    }
    return false;
  }

  /**
   * isCurrentPoint
   * @param {Point} point
   * @return {boolean}
   */
  public isCurrentPoint(point: Point): boolean {
    return point.x === this.currentPoint.x && point.y === this.currentPoint.y;
  }

  /**
   * getNeighboursPoints
   * @param {Point} point
   * @param {number} distance
   * @param {Function} checkFunction
   * @return {Point[]}
   */
  protected getNeighboursPoints(point: Point, distance: number,
      checkFunction: (type: number) => boolean): Point[] {
    const neighbourPoints: Point[] = [];
    const points: Point[] = [];
    points[0] = new Point(point.x, point.y - distance);
    points[1] = new Point(point.x + distance, point.y);
    points[2] = new Point(point.x, point.y + distance);
    points[3] = new Point(point.x - distance, point.y);

    for (let i = 0; i < 4; i++) {
      if (points[i].x > 0 && points[i].x < this.width - 1 &&
        points[i].y > 0 && points[i].y < this.height - 1) {
        const type = this.getFieldPointType(points[i]);
        if (checkFunction(type)) {
          neighbourPoints.push(points[i]);
        }
      }
    }
    return neighbourPoints;
  }

  /**
   * move
   * @param {Function} step
   */
  public move(step: () => boolean): void {
    while (step()) {
      const neighbourPoints =
        this.getNeighboursPoints(this.getCurrentPoint(), 1,
            (type) => {
              return type === Maze.MAZE_PATH;
            });
      if (neighbourPoints.length > 2) {
        break;
      }
    }
  }

  /**
   * moveLeft
   * @return {void}
   */
  public moveLeft(): void {
    this.move(() => {
      const nextPoint: Point =
        new Point(this.currentPoint.x - 1, this.currentPoint.y);
      return this.setCurrentPoint(nextPoint);
    });
  }

  /**
   * moveRight
   * @return {void}
   */
  public moveRight(): void {
    this.move(() => {
      const nextPoint: Point =
        new Point(this.currentPoint.x + 1, this.currentPoint.y);
      return this.setCurrentPoint(nextPoint);
    });
  }

  /**
   * moveUp
   * @return {void}
   */
  public moveUp(): void {
    this.move(() => {
      const nextPoint: Point =
        new Point(this.currentPoint.x, this.currentPoint.y - 1);
      return this.setCurrentPoint(nextPoint);
    });
  }

  /**
   * moveDown
   * @return {void}
   */
  public moveDown(): void {
    this.move(() => {
      const nextPoint: Point =
        new Point(this.currentPoint.x, this.currentPoint.y + 1);
      return this.setCurrentPoint(nextPoint);
    });
  }
}

export {Maze};
