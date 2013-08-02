# @desandro only

zip:
	cp -r build packery-docs
	zip -rq build/packery-docs.zip packery-docs/
	rm -rf packery-docs

deploy:
	s3cmd sync build/. s3://packery.metafizzy.co

grunt:
	grunt

grunt-dev:
	grunt --dev

prod: grunt-dev zip grunt deploy
