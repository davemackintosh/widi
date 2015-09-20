.PHONY : build watch

JS_SRC = ./main.js ./note.js ./device.js

watch:
	watch --color -n 1 make build

build: $(JS_SRC)
	node_modules/.bin/eslint --ignore-path ./.eslintignore $<
	make dist/widi.js

dist/widi.js: $(JS_SRC)
	node_modules/.bin/browserify -d -e -r ./main.js:Widi -t [ babelify --stage 0 ] > $@
