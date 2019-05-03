var gulp = require('gulp'),
babel = require('gulp-babel');

gulp.task('full-conv',function(){
    return gulp
    .src(['./**/*.js','!./**/node_modules/**','!gulpfile.js','!es5'])
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(gulp.dest('es5'));
});
gulp.task('full-copy',function(){
    return gulp
    .src(['./**','!./**/*.js','!./**/node_modules/**','!gulpfile.js','!es5'])
    .pipe(gulp.dest('es5'));
});

gulp.task('brows-conv',function(){
    return gulp
    .src(['./public/**/*.js','!./public/es5'])
    .pipe(babel({presets: ['@babel/preset-env']}))
    .pipe(gulp.dest('public/es5'));
});
gulp.task('brows-copy',function(){
    return gulp
    .src(['./public/**','!./public/**/*.js','!./public/es5'])
    .pipe(gulp.dest('public/es5'));
});