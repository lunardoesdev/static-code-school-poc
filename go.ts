import yaegiWasmURL from "./generated/yaegi.wasm"

const go = new Go()
const {instance} = await WebAssembly.instantiateStreaming(
    fetch(yaegiWasmURL), go.importObject
)
go.run(instance)

export default function(code: string): any {
    return runGo(code)
}