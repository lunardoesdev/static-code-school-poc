import yaegiWasmURL from "./generated/yaegi.wasm"

const go = new Go()
const {instance} = await WebAssembly.instantiateStreaming(
    fetch(yaegiWasmURL), go.importObject
)
go.run(instance)

runGo(`
    package main
    import "fmt"

    func main() {
        fmt.Println("Hello from deep wasm")
    }
`)