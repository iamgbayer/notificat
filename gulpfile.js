const gulp = require('gulp')
      , gulpLoadPlugins = require('gulp-load-plugins')
      , path = require('path')
      , del = require('del')
      , runSequence = require('run-sequence');

const plugins = gulpLoadPlugins();

const paths = {
  js: ['./**/*.js', '!dist/**', '!node_modules/**'],
  nonJs: ['./package.json', './.gitignore', './gulpfile.js'],
  filesToBuild: ['Procfile']
};

gulp.task('clean', () =>
  del(['**/*', '!dist/**', '!Procfile', '!gulpfile.js', '!package.json'])
);

gulp.task('copy', () =>
  gulp.src(paths.nonJs)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);

gulp.task('copyToBuild', () =>
  gulp.src(paths.filesToBuild)
    .pipe(plugins.newer('dist'))
    .pipe(gulp.dest('dist'))
);

gulp.task('babel', () =>
  gulp.src(['./**/*.js', '!dist/**', '!node_modules/**', '!gulpfile.js'], { base: '.' })
    .pipe(plugins.newer('dist'))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.babel())
    .pipe(plugins.sourcemaps.write('.', {
      includeContent: false,
      sourceRoot(file) {
        return path.relative(file.path, __dirname);
      }
    }))
    .pipe(gulp.dest('dist'))
);

gulp.task('nodemon', ['copy', 'babel'], () =>
  plugins.nodemon({
    script: path.join('dist', 'index.js'),
    ext: 'js',
    ignore: ['node_modules/**/*.js', 'dist/**/*.js'],
    tasks: ['copy', 'babel']
  })
);

gulp.task('serve', ['clean'], () => runSequence('nodemon'));

gulp.task('default', ['clean'], () => {
  runSequence(['copy', 'babel']);
});

gulp.task('build', ['babel', 'copyToBuild']);