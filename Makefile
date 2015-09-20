.PHONY : build watch compress

JS_SRC = ./main.js ./note.js ./device.js

watch:
	watch --color -n 1 make build

build: $(JS_SRC)
	node_modules/.bin/eslint --ignore-path ./.eslintignore $<
	make dist/widi.js

compress: dist/widi.js
	make dist/widi.min.js
	
dist/widi.min.js:
	node_modules/.bin/uglifyjs --compress --mangle --screw-ie8 -o $@ -r Widi -- $<

dist/widi.js: $(JS_SRC)
	node_modules/.bin/browserify -d -e -r ./main.js:Widi -t [ babelify --stage 0 ] > $@
