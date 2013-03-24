# @desandro only

zip:
	cp -r build packery-docs
	zip -rq build/packery-docs.zip packery-docs/
	rm -rf packery-docs

deploy:
	rsync -avz build/ ${BERNA}:~/subdomains/packery.metafizzy.co/
