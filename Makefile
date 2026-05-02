.PHONY: clean build serve

build: ./dist/index.html

generated/yaegi.wasm: interpreter/main.go
	make -C interpreter

clean:
	rm -rf generated dist

./dist/index.html: generated/yaegi.wasm
	bun install
	bun build ./index.html --outdir ./dist

serve: generated/yaegi.wasm
	bun ./index.html	