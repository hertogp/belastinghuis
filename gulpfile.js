const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const autoprefix = require('gulp-autoprefixer');

/* TOP LEVEL FUNCTIONS
 * - gulp.task  - define tasks
 * - gulp.src   - point to files to use
 * - gulp.dest  - point to folder to output
 * - gulp.watch - watch files and folders for changes
 *
 * Run gulp watch from root dir and off you go
 * */

// copy all HTML files
gulp.task('copyHtml', function(){
    gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));
});

// optimize Images
gulp.task('imageMin', () =>
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'))
);

// minify JS
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Compile SASS
gulp.task('sass', function(){
    gulp.src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefix({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('dist/css'));

});


// Minify JavaScript(s), if any
gulp.task('minify', function(){
    gulp.src('src/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
});


// default Task(s)

gulp.task('default', ['copyHtml', 'imageMin', 'sass', 'minify']);

gulp.task('watch', function(){
    gulp.watch('src/js/*.js', ['minify']);
    gulp.watch('src/img/*', ['imageMin']);
    gulp.watch('src/sass/*.scss', ['sass']);
    gulp.watch('src/*.html', ['copyHtml']);
});