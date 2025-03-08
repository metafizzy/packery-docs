# @desandro only

zip:
	rm -rf build/packery-docs.zip
	cp -r build packery-docs
	zip -rq build/packery-docs.zip packery-docs/
	rm -rf packery-docs

deploy:
	netlify deploy --dir=build

gulp:
	npx gulp

gulp-export:
	rm -rf build/
	npx gulp export
	make zip

prod: gulp-export gulp deploy
