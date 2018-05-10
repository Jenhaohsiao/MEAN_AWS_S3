module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            "options": { "separator": ";" },
            build: {
                "src": [
                    "Front-end/*.js",
                    "Front-end/controllers/*.js"
                ],
                "dest": "Public/javascripts/jenhaoProject.js"
            },
            lib: {
                "src": [
                    "node_modules/angular/angular.js",
                    "node_modules/angular-material/angular-material.js",
                    "node_modules/angular-aria/angular-aria.js",
                    "node_modules/angular-animate/angular-animate.js",
                    'node_modules/angular-messages/angular-messages.js',
                    'node_modules/@uirouter/angularjs/release/angular-ui-router.js'
                ],
                "dest": "public/javascripts/jenhaoProject-packages.js"
            },
            css: {
                src: [
                    "node_modules/angular-material/angular-material.css",
                    "Front-end/CSS/style.css"
                ],
                dest: 'public/stylesheets/jenhaoProject.css'
            }
        }
    });

    // Load required modules //uglify
    grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-uglify');

    // Task definitions
    grunt.registerTask('default', ['concat']);
};