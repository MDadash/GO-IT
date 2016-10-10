module.exports = function(grunt) {
	grunt.initConfig({
    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['script/src/*.js'],
        dest: 'script/dist/main.js'
      }
    },
    uglify: {
    	dist: {
    		src: ['script/dist/main.js'],
    		dest: 'script/dist/main.min.js'
    	}
    }
    
  });


  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.registerTask('default', ['concat', 'uglify']);

};