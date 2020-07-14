import {BacktrackingGenerator} from './generators/backtracking';
import {CanvasRenderer} from './renderers/canvas';

const canvas = <HTMLCanvasElement>document.getElementById("canvas");

const mazeBacktrackingGenerator = new BacktrackingGenerator(41, 41);
const mazeCanvasRender = new CanvasRenderer(mazeBacktrackingGenerator, canvas,20);

declare global {
  interface Window {
    mazeBacktrackingGenerator: BacktrackingGenerator;
    mazeCanvasRender: CanvasRenderer;
  }
}
window.mazeBacktrackingGenerator = mazeBacktrackingGenerator;
window.mazeCanvasRender = mazeCanvasRender;
