import runGo from './go'

runGo(`
    package main
    import "fmt"

    func main() {
        fmt.Println("Hey")
    }
`)