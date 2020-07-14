import { Point } from './point';
/**
 * Class Maze
 */
declare class Maze {
    static readonly MAZE_EMPTY = 0;
    static readonly MAZE_WALL = 1;
    static readonly MAZE_PATH = 2;
    static readonly MAZE_WAY = 3;
    protected width: number;
    protected height: number;
    protected field: number[][];
    protected startPoint: Point;
    protected currentPoint: Point;
    protected endPoint: Point;
    /**
     * Constructor
     * @param {number} width
     * @param {number} height
     */
    constructor(width?: number, height?: number);
    /**
     * reInit
     * @param {number} width
     * @param {number} height
     */
    reInit(width: number, height: number): void;
    /**
     * getWidth
     * @return {Point} width
     */
    getWidth(): number;
    /**
     * getHeight
     * @return {Point} width
     */
    getHeight(): number;
    /**
     * getField
     * @return {[][]} field
     */
    getField(): number[][];
    /**
     * genEmptyField
     * @return {[][]} field
     */
    protected genEmptyField(): number[][];
    /**
     * getFieldPointType
     * @param {Point} point
     * @return {number}
     */
    getFieldPointType(point: Point): number;
    /**
     * setFieldPointType
     * @param {Point} point
     * @param {number} type
     */
    setFieldPointType(point: Point, type: number): void;
    /**
     * getStartPoint
     * @return {Point} startPoint
     */
    getStartPoint(): Point;
    /**
     * isStartPoint
     * @param {Point} point
     * @return {boolean}
     */
    isStartPoint(point: Point): boolean;
    /**
     * getEndPoint
     * @return {Point} endPoint
     */
    getEndPoint(): Point;
    /**
     * setEndPoint
     * @param {Point} point
     * @return {boolean}
     */
    setEndPoint(point: Point): boolean;
    /**
     * isEndPoint
     * @param {Point} point
     * @return {boolean}
     */
    isEndPoint(point: Point): boolean;
    /**
     * getCurrentPoint
     * @return {Point} currentPoint
     */
    getCurrentPoint(): Point;
    /**
     * setCurrentPoint
     * @param {Point} point
     * @return {boolean}
     */
    setCurrentPoint(point: Point): boolean;
    /**
     * isCurrentPoint
     * @param {Point} point
     * @return {boolean}
     */
    isCurrentPoint(point: Point): boolean;
    /**
     * getNeighboursPoints
     * @param {Point} point
     * @param {number} distance
     * @param {Function} checkFunction
     * @return {Point[]}
     */
    protected getNeighboursPoints(point: Point, distance: number, checkFunction: (type: number) => boolean): Point[];
    /**
     * move
     * @param {Function} step
     */
    move(step: () => boolean): void;
    /**
     * moveLeft
     * @return {void}
     */
    moveLeft(): void;
    /**
     * moveRight
     * @return {void}
     */
    moveRight(): void;
    /**
     * moveUp
     * @return {void}
     */
    moveUp(): void;
    /**
     * moveDown
     * @return {void}
     */
    moveDown(): void;
}
export { Maze };
