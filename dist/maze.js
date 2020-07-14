"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maze = void 0;
const point_1 = require("./point");
/**
 * Class Maze
 */
class Maze {
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
    reInit(width, height) {
        this.width = width;
        this.height = height;
        this.field = this.genEmptyField();
        this.startPoint = new point_1.Point(1, 1);
        this.endPoint = new point_1.Point(1, 1);
        this.currentPoint = new point_1.Point(1, 1);
    }
    /**
     * getWidth
     * @return {Point} width
     */
    getWidth() {
        return this.width;
    }
    /**
     * getHeight
     * @return {Point} width
     */
    getHeight() {
        return this.height;
    }
    /**
     * getField
     * @return {[][]} field
     */
    getField() {
        return this.field;
    }
    /**
     * genEmptyField
     * @return {[][]} field
     */
    genEmptyField() {
        const field = [];
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
    getFieldPointType(point) {
        return this.field[point.y][point.x];
    }
    /**
     * setFieldPointType
     * @param {Point} point
     * @param {number} type
     */
    setFieldPointType(point, type) {
        this.field[point.y][point.x] = type;
    }
    /**
     * getStartPoint
     * @return {Point} startPoint
     */
    getStartPoint() {
        return this.startPoint;
    }
    /**
     * isStartPoint
     * @param {Point} point
     * @return {boolean}
     */
    isStartPoint(point) {
        return point.x === this.startPoint.x && point.y === this.startPoint.y;
    }
    /**
     * getEndPoint
     * @return {Point} endPoint
     */
    getEndPoint() {
        return this.endPoint;
    }
    /**
     * setEndPoint
     * @param {Point} point
     * @return {boolean}
     */
    setEndPoint(point) {
        const type = this.getFieldPointType(point);
        if (type !== Maze.MAZE_WALL) {
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
    isEndPoint(point) {
        return point.x === this.endPoint.x && point.y === this.endPoint.y;
    }
    /**
     * getCurrentPoint
     * @return {Point} currentPoint
     */
    getCurrentPoint() {
        return this.currentPoint;
    }
    /**
     * setCurrentPoint
     * @param {Point} point
     * @return {boolean}
     */
    setCurrentPoint(point) {
        const type = this.getFieldPointType(point);
        if (type !== Maze.MAZE_WALL) {
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
    isCurrentPoint(point) {
        return point.x === this.currentPoint.x && point.y === this.currentPoint.y;
    }
    /**
     * getNeighboursPoints
     * @param {Point} point
     * @param {number} distance
     * @param {Function} checkFunction
     * @return {Point[]}
     */
    getNeighboursPoints(point, distance, checkFunction) {
        const neighbourPoints = [];
        const points = [];
        points[0] = new point_1.Point(point.x, point.y - distance);
        points[1] = new point_1.Point(point.x + distance, point.y);
        points[2] = new point_1.Point(point.x, point.y + distance);
        points[3] = new point_1.Point(point.x - distance, point.y);
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
    move(step) {
        while (step()) {
            this.setFieldPointType(this.getCurrentPoint(), Maze.MAZE_WAY);
            const neighbourPoints = this.getNeighboursPoints(this.getCurrentPoint(), 1, (type) => {
                return type === Maze.MAZE_PATH || type === Maze.MAZE_WAY;
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
    moveLeft() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x - 1, this.currentPoint.y);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveRight
     * @return {void}
     */
    moveRight() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x + 1, this.currentPoint.y);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveUp
     * @return {void}
     */
    moveUp() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x, this.currentPoint.y - 1);
            return this.setCurrentPoint(nextPoint);
        });
    }
    /**
     * moveDown
     * @return {void}
     */
    moveDown() {
        this.move(() => {
            const nextPoint = new point_1.Point(this.currentPoint.x, this.currentPoint.y + 1);
            return this.setCurrentPoint(nextPoint);
        });
    }
}
exports.Maze = Maze;
Maze.MAZE_EMPTY = 0;
Maze.MAZE_WALL = 1;
Maze.MAZE_PATH = 2;
Maze.MAZE_WAY = 3;
