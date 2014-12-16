var Grunt = function (grunt) {

	/*------------------------------------*\
		Load Package
		加载依赖，依赖声明在package.json中 
	\*------------------------------------*/
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-livereload');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	

	/*------------------------------------*\
		Config Grunt Tool
		配置Grunt工具 
	\*------------------------------------*/
	grunt.initConfig({

		tmp: 'tmp',
		dist: 'dist',
		imagesPath: '<%=tmp%>/img',
		fontsPath: '<%=tmp%>/font',
		stylesPath: '<%=tmp%>/css',


		connect: {
			main: {
				options: {
					port: 3000,
					protocol: 'http',
					hostname: 'localhost',
					base: '<%=tmp%>',
					livereload: true
				}
			}
		},


		watch: {
			main: {
				files: ['sass/**/*', '*.html', 'Gruntfile.js'],
				tasks: ['inject:main'],
				options: {
					livereload: true
				}
			},
			
		},


		clean: {
			main: {
				dot: true,
				src: ['<%=tmp%>/*']
			},
			build: {
				dot: true,
				src: ['<%=dist%>']
			}
		},
		copy: {
			html: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: ['*.html'],
				dest: '<%=tmp%>/'
			},
			styles: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: ['bower_components/normalize.css/normalize.css'],
				dest: '<%=stylesPath%>/'
			},
			images: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: ['images/*'],
				dest: '<%=imagesPath%>'
			},
			fonts: {
				expand: true,
				flatten: true,
				filter: 'isFile',
				src: ['fonts/*'],
				dest: '<%=fontsPath%>'
			}
		},


		sass: {
			main: {
				expand: true, 
				flatten: true, 
				ext: '.css',
				src: ['sass/blisss.scss'],
				dest: '<%=stylesPath%>'
			}
		},


		cssmin: {
			main: {
				options: {
					keepSpecialComments: 0,
					banner: '/*yufi*/'
				},
				files: {
					'<%=dist%>/blisss.min.css': ['bower_components/normalize.css/normalize.css', '<%=stylesPath%>/blisss.css']
				}
			}
		}
	});




	/*------------------------------------*\
		Tasks::Development Environment
		配置开发环境任务 
	\*------------------------------------*/
	grunt.registerTask('default', [
		'connect:main', 
		'inject:main', 
		'watch:main'
	]);



	/*------------------------------------*\
		Tasks::Injection File To Temporary
		文件修改时拷贝文件到临时文件夹
	\*------------------------------------*/
	grunt.registerTask('inject:main', [
		'clean:main',
		'copy:main'
	]);


	/*------------------------------------*\
		Tasks::Copy
		配置复制任务
	\*------------------------------------*/
	grunt.registerTask('copy:main', [
		'copy:html',
		'copy:styles',
		'copy:images',
		'copy:fonts',
		'sass:main'
	]);


	/*------------------------------------*\
		Tasks::Build 
		打包文件
	\*------------------------------------*/
	grunt.registerTask('build', [
		'clean:build',
		'cssmin:main'
	]);

}



module.exports = Grunt;