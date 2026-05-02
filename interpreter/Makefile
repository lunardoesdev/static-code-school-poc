../generated/yaegi.wasm: main.go | ../generated/wasm_exec.js ../generated
	GOOS=js GOARCH=wasm go build \
	 -o ../generated/yaegi.wasm -v \
	 -ldflags="-s -w" \
     -trimpath \
	 ./...

../generated:
	mkdir -p ../generated

../generated/wasm_exec.js: | ../generated
	cp -rf "$$(find "$$(go env GOROOT)" -name wasm_exec.js)" $@

.PHONY: clean
clean:
	rm -rf ../generated