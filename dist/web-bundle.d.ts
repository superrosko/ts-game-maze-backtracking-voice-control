import { BacktrackingGenerator } from './generators/backtracking';
import { CanvasRenderer } from './renderers/canvas';
declare global {
    interface Window {
        mazeBacktrackingGenerator: BacktrackingGenerator;
        mazeCanvasRender: CanvasRenderer;
    }
}
