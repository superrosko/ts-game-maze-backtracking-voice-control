import gulp from 'gulp';
import gulpClean from 'gulp-clean';
import eslint from 'gulp-eslint';
import ts from 'gulp-typescript';

const tsProject = ts.createProject('tsconfig.json');

/**
 * @type {{ts: [string, string]}}
 */
const paths = {
  ts: ['./src/**/*.ts', '!./src/web-bundle.ts'],
};

/**
 * Test TS lint
 * @return {*}
 */
function testTsLint() {
  return gulp.src(paths.ts).
      pipe(eslint()).
      pipe(eslint.format()).
      pipe(eslint.failAfterError());
}

/**
 * Clean dist folder
 * @return {*}
 */
function cleanDist() {
  return gulp.src('dist/*').
      pipe(gulpClean({force: true}));
}

/**
 * Build JS from TS
 * @return {*}
 */
function buildJS() {
  return tsProject.src().pipe(tsProject()).js.pipe(gulp.dest('dist'));
}

const tests = gulp.parallel(testTsLint);
exports.tests = tests;

const clean = gulp.series(cleanDist);
exports.clean = clean;

const build = gulp.series(tests, cleanDist, buildJS);
exports.build = build;

export default build;
