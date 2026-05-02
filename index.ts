import runGo from './go'

document.write(runGo(`
    package main
    import "fmt"

    func main() {
        fmt.Println("Hey")
        fmt.Println("Hey")
        fmt.Println("Hey")
    }
`).output)