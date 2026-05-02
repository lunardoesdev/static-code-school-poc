package main

import (
	"fmt"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

func runSource(src string) (string, error) {
	i := interp.New(interp.Options{})
	if err := i.Use(stdlib.Symbols); err != nil {
		return "", fmt.Errorf("Error loading stdlib: %w", err)
	}
	if _, err := i.Eval(src); err != nil {
		return "", err
	}
	v, err := i.Eval("__runTests()")
	if err != nil {
		return "", fmt.Errorf("runtime error: %w", err)
	}
	return fmt.Sprint(v.Interface()), nil

}

func runGo(this js.Value, args []js.Value) any {
	if len(args) < 1 {
		return map[string]any{"error": "no source"}
	}
	out, err := runSource(args[0].String())
	if err != nil {
		return map[string]any{"error": err.Error()}
	}
	return map[string]any{"ok": true, "output": out}
}

func main() {
	js.Global().Set("runGo", js.FuncOf(runGo))
	select {}
}
