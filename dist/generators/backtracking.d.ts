import { Maze } from '../maze';
/**
 * Class BacktrackingGenerator
 */
declare class BacktrackingGenerator extends Maze {
    static readonly MAZE_POINT_VISITED = 10;
    private distance;
    /**
     * Constructor
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    constructor(width: number, height: number, distance?: number);
    /**
     * reInit
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    reInit(width: number, height: number, distance?: number): void;
    /**
     * genInitField
     * @return {[][]} field
     */
    private genInitField;
    /**
     * getUnvisitedPointsEx
     * @param {boolean} returnCount
     * @return {Point[]|number}
     */
    private getUnvisitedPointsEx;
    /**
     * getUnvisitedPointsCount
     * @return {number}
     */
    private getUnvisitedPointsCount;
    /**
     * getUnvisitedPoints
     * @return {Point[]}
     */
    private getUnvisitedPoints;
    /**
     * removeWall
     * @param {Point} pointFrom
     * @param {Point} pointTo
     */
    private removeWall;
    /**
     * generate
     */
    private generate;
    /**
     * randomInteger
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    static randomInt(min: number, max: number): number;
    /**
     * checkFieldSize
     * @param {number} width
     * @param {number} height
     * @return {boolean}
     */
    private static checkFieldSize;
}
export { BacktrackingGenerator };
