"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BacktrackingGenerator = void 0;
const maze_1 = require("../maze");
const point_1 = require("../point");
/**
 * Class BacktrackingGenerator
 */
class BacktrackingGenerator extends maze_1.Maze {
    /**
     * Constructor
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    constructor(width, height, distance = 2) {
        super(width, height);
        this.reInit(width, height, distance);
    }
    /**
     * reInit
     * @param {number} width
     * @param {number} height
     * @param {number} distance
     */
    reInit(width, height, distance = 2) {
        super.reInit(width, height);
        if (BacktrackingGenerator.checkFieldSize(width, height)) {
            throw new Error('Field width and height MUST be odd');
        }
        this.field = this.genInitField();
        this.distance = distance;
        this.generate();
    }
    /**
     * genInitField
     * @return {[][]} field
     */
    genInitField() {
        const field = [];
        for (let y = 0; y < this.height; y++) {
            field[y] = [];
            for (let x = 0; x < this.width; x++) {
                if (x % 2 && y % 2) {
                    field[y][x] = maze_1.Maze.MAZE_EMPTY;
                }
                else {
                    field[y][x] = maze_1.Maze.MAZE_WALL;
                }
            }
        }
        return field;
    }
    /**
     * getUnvisitedPointsEx
     * @param {boolean} returnCount
     * @return {Point[]|number}
     */
    getUnvisitedPointsEx(returnCount = true) {
        let count = 0;
        const unvisitedPoints = [];
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const point = new point_1.Point(x, y);
                const type = this.getFieldPointType(point);
                if (type !== maze_1.Maze.MAZE_WALL &&
                    type !== BacktrackingGenerator.MAZE_POINT_VISITED) {
                    count++;
                    unvisitedPoints.push(point);
                }
            }
        }
        return returnCount ? count : unvisitedPoints;
    }
    /**
     * getUnvisitedPointsCount
     * @return {number}
     */
    getUnvisitedPointsCount() {
        return this.getUnvisitedPointsEx();
    }
    /**
     * getUnvisitedPoints
     * @return {Point[]}
     */
    getUnvisitedPoints() {
        return this.getUnvisitedPointsEx(false);
    }
    /**
     * removeWall
     * @param {Point} pointFrom
     * @param {Point} pointTo
     */
    removeWall(pointFrom, pointTo) {
        const xDiff = pointTo.x - pointFrom.x;
        const yDiff = pointTo.y - pointFrom.y;
        const target = new point_1.Point(pointFrom.x + ((xDiff !== 0) ? (xDiff / Math.abs(xDiff)) : 0), pointFrom.y + ((yDiff !== 0) ? (yDiff / Math.abs(yDiff)) : 0));
        this.setFieldPointType(target, BacktrackingGenerator.MAZE_POINT_VISITED);
    }
    /**
     * generate
     */
    generate() {
        let issetEndPoint = false;
        let neighbourPoints = [];
        let currentPoint = this.getStartPoint();
        const pathStack = [];
        pathStack.push(currentPoint);
        this.setFieldPointType(currentPoint, BacktrackingGenerator.MAZE_POINT_VISITED);
        let unvisitedPointsCount = this.getUnvisitedPointsCount();
        while (unvisitedPointsCount > 0) {
            neighbourPoints =
                this.getNeighboursPoints(currentPoint, this.distance, (type) => {
                    return type !== maze_1.Maze.MAZE_WALL &&
                        type !== maze_1.Maze.MAZE_PATH &&
                        type !== maze_1.Maze.MAZE_WAY &&
                        type !== BacktrackingGenerator.MAZE_POINT_VISITED;
                });
            if (neighbourPoints.length !== 0) {
                const randNum = BacktrackingGenerator.randomInt(0, neighbourPoints.length - 1);
                const nextPoint = neighbourPoints[randNum];
                this.removeWall(currentPoint, nextPoint);
                currentPoint = nextPoint;
                pathStack.push(currentPoint);
                this.setFieldPointType(currentPoint, BacktrackingGenerator.MAZE_POINT_VISITED);
                unvisitedPointsCount--;
                if (!issetEndPoint && unvisitedPointsCount === 0) {
                    issetEndPoint = this.setEndPoint(currentPoint);
                }
            }
            else if (pathStack.length > 0) {
                const pathStackPoint = pathStack.pop();
                if (pathStackPoint !== undefined) {
                    currentPoint = pathStackPoint;
                    if (!issetEndPoint) {
                        issetEndPoint = this.setEndPoint(currentPoint);
                    }
                }
            }
            else {
                const unvisitedPoints = this.getUnvisitedPoints();
                const randNum = BacktrackingGenerator.randomInt(0, unvisitedPoints.length - 1);
                currentPoint = unvisitedPoints[randNum];
            }
        }
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                const point = new point_1.Point(x, y);
                const type = this.getFieldPointType(point);
                if (type === BacktrackingGenerator.MAZE_POINT_VISITED) {
                    this.setFieldPointType(point, maze_1.Maze.MAZE_PATH);
                }
            }
        }
        const point = new point_1.Point(this.width - 2, this.height - 2);
        if (this.getFieldPointType(point) !== maze_1.Maze.MAZE_PATH) {
            neighbourPoints =
                this.getNeighboursPoints(point, 1, (type) => {
                    return type === maze_1.Maze.MAZE_PATH;
                });
            if (neighbourPoints.length !== 0) {
                const randNum = BacktrackingGenerator.randomInt(0, neighbourPoints.length - 1);
                this.setEndPoint(neighbourPoints[randNum]);
            }
        }
        else {
            this.setEndPoint(point);
        }
    }
    /**
     * randomInteger
     * @param {number} min
     * @param {number} max
     * @return {number}
     */
    static randomInt(min, max) {
        return Math.floor(min + Math.random() * (max + 1 - min));
    }
    /**
     * checkFieldSize
     * @param {number} width
     * @param {number} height
     * @return {boolean}
     */
    static checkFieldSize(width, height) {
        return (width - 1) % 2 !== 0 || (height - 1) % 2 !== 0;
    }
}
exports.BacktrackingGenerator = BacktrackingGenerator;
BacktrackingGenerator.MAZE_POINT_VISITED = 10;
