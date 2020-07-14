import { Maze } from '../maze';
/**
 * Class TextRenderer
 */
declare class TextRenderer {
    private maze;
    private readonly symbolBorder;
    private readonly symbolPath;
    private readonly symbolWay;
    private readonly symbolStart;
    private readonly symbolEnd;
    private readonly symbolCurrent;
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
    constructor(maze: Maze, symbolBorder?: string, symbolPath?: string, symbolWay?: string, symbolStart?: string, symbolEnd?: string, symbolCurrent?: string);
    /**
     * render
     * @return {string} screen
     */
    render(): string;
}
export { TextRenderer };
