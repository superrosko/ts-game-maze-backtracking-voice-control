"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextRenderer = void 0;
const maze_1 = require("../maze");
const point_1 = require("../point");
/**
 * Class TextRenderer
 */
class TextRenderer {
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
    constructor(maze, symbolBorder = '#', symbolPath = ' ', symbolWay = '*', symbolStart = 'O', symbolEnd = 'X', symbolCurrent = '@') {
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
    render() {
        let screen = '';
        for (let y = 0; y < this.maze.getHeight(); y++) {
            for (let x = 0; x < this.maze.getWidth(); x++) {
                const point = new point_1.Point(x, y);
                const type = this.maze.getFieldPointType(point);
                if (this.maze.isCurrentPoint(point)) {
                    screen += this.symbolCurrent;
                }
                else if (this.maze.isStartPoint(point)) {
                    screen += this.symbolStart;
                }
                else if (this.maze.isEndPoint(point)) {
                    screen += this.symbolEnd;
                }
                else if (type === maze_1.Maze.MAZE_WALL) {
                    screen += this.symbolBorder;
                }
                else if (type === maze_1.Maze.MAZE_PATH) {
                    screen += this.symbolPath;
                }
                else if (type === maze_1.Maze.MAZE_WAY) {
                    screen += this.symbolWay;
                }
            }
            screen += '\n';
        }
        return screen;
    }
}
exports.TextRenderer = TextRenderer;
