module.exports = function(grunt) {
	grunt.initConfig({

    concat: {
      html: {
        src: ['src/index.html'],
        dest: 'build/index.html'
      },
      js: {
        options: {
          separator: ';'
        },
        src: ['src/js/*.js'],
        dest: 'build/js/main.js'
      }
    },

    uglify: {
    	dist: {
    		src: ['build/js/main.js'],
    		dest: 'build/js/main.min.js'
    	}
    },

    cssmin: {
      dist: {
        files: {
         'build/css/style.min.css': ['src/css/main.css']
       }
     }
    },

    imagemin: {
      img: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['img/*.*'],
          dest: 'build/'
        }]
      },
      images: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['images/*.*'],
          dest: 'build/'
        }]
      }
    },

    browserSync: {
      files: ['build/css/*.css', 'build/js/*.js', 'build/*.html'],
      options: {
        watchTask: true,
        server: {
          baseDir: "build"
        }
      }
    },

    watch: {
      script: {
        files: ['src/js/*.js'],
        tasks: ['concat:js', 'uglify']
      },
      css: {
        files: ['src/css/*.css'],
        tasks: ['cssmin']
      },
      html: {
        files: ['src/**/*.html'],
        tasks: ['concat:html']
      }
    }
  
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('default', ['concat', 'uglify', 'cssmin', 'imagemin']);
  grunt.registerTask('start', ['browserSync', 'watch']);

};
