'use strict';

const { parallel , series } = require('gulp');
const GulpJSTaskManager = require('./func/gulp/classes/GulpJSTaskManager');
const GulpCSSTaskManager = require('./func/gulp/classes/GulpCSSTaskManager');
const GulpHTMLTasks = require('./func/gulp/classes/GulpHTMLTasks');
const GulpImageTasks = require('./func/gulp/classes/GulpImageTasks');
const utils = require('./func/gulp/classes/Utils');
const gulpKeyCheck = require('./func/gulp/classes/GulpKeyCheck');
const GulpIconTasks = require('./func/gulp/classes/GulpIconTasks');
const GulpResourceHandler = require('./func/gulp/classes/GulpResourceHandler');



/** Utils Tasks */

exports.default = utils.defaultSync.bind();

exports.check = utils.helloSync.bind();

exports.clean = utils.utilsCleanSync.bind();

/** Manually Check Keys */
exports.keyCheck = (cb) => {
    gulpKeyCheck.checkJSKeySync();
    gulpKeyCheck.checkCSSKeySync();
    cb();
}



/** CSS Tasks */
exports.compileCSS = (cb) => {
     /** Compile with options */
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: true , 
        watch: false });
    gulpCSSTaskManager.compileCSS();
    
    cb();
}

/** CSS Build Task */
exports.buildCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'css' });

    return gulpCSSTaskManager.compileCSS();
}

exports.buildSCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, watch:false, build: true, key: 'scss' });

    return gulpCSSTaskManager.compileCSS();
}

/** CSS and SCSS Watch */
exports.watchCSS = () => {
    const gulpCSSTaskManager = new GulpCSSTaskManager({ autoInit: false , build: true});
    gulpCSSTaskManager.watchCSS();
}

/** JS Tasks */
exports.compileJS = () => {
    /** Compile with options */
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: true });
    return gulpJSTaskManager.compileJS();
}

/** JS Watch */
exports.watchJS = () => { 
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , watch: true});
    return gulpJSTaskManager.watchJS();
}

/** JS Build Task */
exports.buildJS = () => {
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
            build: true, key: 'js'});
    return gulpJSTaskManager.compileJS();
}

/** Build HTML */
exports.buildHTML = (cb) => {

    const gulpHtmlTasks = new GulpHTMLTasks({ watch: false});
    gulpHtmlTasks.compileHtml();    
    cb();
}

/** Watch HTML */
exports.watchHTML = () => {
    const gulpHtmlTasks = new GulpHTMLTasks({ watch: true});
    gulpHtmlTasks.watchHtml();
}

/** Build Images */
exports.buildImages = (cb) => {
    const gulpImageTasks = new GulpImageTasks({ watch: false});
    gulpImageTasks.compileImages();
    cb();
}
/** Watch Image */
exports.watchImage = (cb) => {
    const gulpImageTasks = new GulpImageTasks({ watch: true});
    gulpImageTasks.watchImages();
    cb();
}

/** Init function */
exports.buildInit = series(this.buildHTML, 
    this.buildSCSS, this.buildCSS, 
    this.buildJS, this.buildImages);

/** Watch */
exports.watch = parallel(this.watchHTML, this.watchImage,
    this.watchCSS, this.watchJS);

/** Icons */

exports.compileIcons = (cb) => {
   const gulpIconTasks = new GulpIconTasks({ autoInit: true , build : false});
    gulpIconTasks.compileMultiDest();
    cb();
}

/**
 * fontawesome icon builder.
 * @param {*} cb 
 */
exports.buildAllFa = (cb) => {

    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'fontawesome' });

    const gulpIconTasks = new GulpIconTasks({ autoInit: false, watch: false,
        build: true, key: 'fontawesome'});

    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
        watch: false, build: true, key: 'fontawesome'});

    
    gulpCSSTaskManager.compileCSS(); 
    gulpIconTasks.compileIconSets();
    gulpJSTaskManager.compileJS();

    cb();
    
}

/**
 * bootstrap icon builder
 * @param {*} cb 
 */
exports.buildAllBi = (cb) => {

    const gulpCSSTaskManager = new GulpCSSTaskManager({ 
        autoInit: false, build: true, key: 'bootstrapIcon'  });

    const gulpIconTasks = new GulpIconTasks({ autoInit: false, watch: false,
        build: true, key: 'bootstrap'});
    
    /*
    const gulpJSTaskManager = new GulpJSTaskManager({ autoInit: false , 
        watch: false, build: true, key: ['bootstrap' , 'popper']}); */

    
    gulpCSSTaskManager.compileCSS(); 
    gulpIconTasks.compileIconSets();
    //gulpJSTaskManager.compileJS();

    cb();

}

exports.move = (cb) => {

    const gulpResourceHandler = new GulpResourceHandler();
    
    cb();
}