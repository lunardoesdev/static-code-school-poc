import yaegiWasmURL from "./generated/yaegi.wasm"

const go = new Go()
const {instance} = await WebAssembly.instantiateStreaming(
    fetch(yaegiWasmURL), go.importObject
)
go.run(instance)

export default function(code: string, stdin: string = ""): {ok: boolean, output: string} {
    const result = runGo(code, stdin)
    return result
}