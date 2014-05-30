/*  
	Note: This gruntfile is just to concat and uglify the test code - not a "proper" build file 
*/
module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			options: {
				separator: ';'
			},
			dist: {
				src: ['libs/jquery/jquery-1.11.0.js', 'libs/jquery-ui-1.10.4/js/jquery-ui-1.10.4.js', 'libs/jquery-validation-1.12.0/dist/jquery-validate.js', 'libs/jquery-validation-1.12.0/dist/additional-methods.js'],
				dest: 'dist/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
				sourceMap: true
			},
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-concat');

	grunt.registerTask('default', ['concat', 'uglify']);
};