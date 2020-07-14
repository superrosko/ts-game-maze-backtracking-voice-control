import { Maze } from '../maze';
/**
 * Class CanvasRenderer
 */
declare class CanvasRenderer {
    private maze;
    private canvas;
    private readonly pointSize;
    private readonly colorBorder;
    private readonly colorPath;
    private readonly colorWay;
    private readonly colorStartPoint;
    private readonly colorEndPoint;
    private readonly colorCurrentPoint;
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
    constructor(maze: Maze, canvas: HTMLCanvasElement, pointSize: number, colorBorder?: string, colorPath?: string, colorWay?: string, colorStartPoint?: string, colorEndPoint?: string, colorCurrentPoint?: string);
    /**
     * render
     */
    render(): void;
}
export { CanvasRenderer };
