.PHONY: clean build serve

generated/yaegi.wasm:
	make -C interpreter

clean:
	rm -rf generated dist

./dist/index.html: generated/yaegi.wasm
	bun build ./index.html --outdir ./dist

build: ./dist/index.html

serve: generated/yaegi.wasm
	bun ./index.html	