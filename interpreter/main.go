package main

import (
	"bytes"
	"fmt"
	"strings"
	"syscall/js"

	"github.com/traefik/yaegi/interp"
	"github.com/traefik/yaegi/stdlib"
)

func runSource(src string, stdin string) (string, error) {
	var buf bytes.Buffer
	stdinReader := strings.NewReader(stdin)
	i := interp.New(interp.Options{
		Stdout: &buf,
		Stderr: &buf,
		Stdin:  stdinReader,
	})
	if err := i.Use(stdlib.Symbols); err != nil {
		return "", fmt.Errorf("Error loading stdlib: %w", err)
	}
	v, err := i.Eval(src)
	if err != nil {
		return "", err
	}
	//  v, err := i.Eval("__runTests()")
	//  if err != nil {
	//  	return "", fmt.Errorf("runtime error: %w", err)
	//  }
	return fmt.Sprint(v.Interface()), nil

}

func runGo(this js.Value, args []js.Value) any {
	if len(args) < 1 {
		return map[string]any{"error": "no source"}
	}

	stdin := ""
	if len(args) > 1 {
		stdin = args[1].String()
	}
	out, err := runSource(args[0].String(), stdin)
	if err != nil {
		return map[string]any{"ok": false, "error": err.Error()}
	}
	return map[string]any{"ok": true, "output": out}
}

func main() {
	js.Global().Set("runGo", js.FuncOf(runGo))
	select {}
}
