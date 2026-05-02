PHONY: build

build:
	mkdir -p ../generated
	GOOS=js GOARCH=wasm go build \
	 -o ../generated/yaegi.wasm -v \
	 -ldflags="-s -w" \
     -trimpath \
	 ./...
