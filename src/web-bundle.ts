import {BacktrackingGenerator} from './generators/backtracking';
import {TextRenderer} from './renderers/text';
import {CanvasRenderer} from './renderers/canvas';

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const mazeBacktrackingGenerator = new BacktrackingGenerator(41, 41);
const mazeTextRender = new TextRenderer(mazeBacktrackingGenerator);
const mazeCanvasRender = new CanvasRenderer(mazeBacktrackingGenerator, canvas,20);

declare global {
  interface Window {
    mazeBacktrackingGenerator: BacktrackingGenerator;
    mazeTextRender: TextRenderer;
    mazeCanvasRender: CanvasRenderer;
  }
}
window.mazeBacktrackingGenerator = mazeBacktrackingGenerator;
window.mazeTextRender = mazeTextRender;
window.mazeCanvasRender = mazeCanvasRender;
