# @desandro only

zip:
	rm -rf build/packery-docs.zip
	cp -r build packery-docs
	zip -rq build/packery-docs.zip packery-docs/
	rm -rf packery-docs

deploy:
	s3cmd -c ~/.s3cfg-fizzy sync build/. s3://packery.metafizzy.co

gulp:
	gulp

gulp-export:
	rm -rf build/
	gulp export
	make zip

prod: gulp-export gulp deploy
