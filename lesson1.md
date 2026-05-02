# Lesson 1. Functions

In Go, a function is declared with the `func` keyword. The parameter
types come **after** the parameter names, and the return type comes
after the parameter list. This is the opposite order from C, Java,
or Python — it takes a minute to get used to.

```go
func Add(a, b int) int {
    return a + b
}
```

When several consecutive parameters share the same type, you can
declare the type only once, on the last one. So `func Max(a, b int) int`
means both `a` and `b` are `int`.

A function can return multiple values — a common Go pattern is to
return a result together with an `error`:

```go
func Divide(a, b int) (int, error) { ... }
```

You'll see this pattern everywhere in Go code.

## Task

Write a function `Sum(a, b int) int` that returns the sum of two
integers. The program reads two numbers separated by whitespace
from standard input and prints their sum.

## Template

```go
func Sum(a, b int) int {
// your code here
return 0
}
```

## Harness

```go
import "fmt"

@@@studentcode

func main() {
    var a, b int
    fmt.Scan(&a, &b)
    fmt.Println(Sum(a, b))
}
```

## Tests

```test
2 3
@@@
5
```

```test
-1 1
@@@
0
```

```test
100 200
@@@
300
```

```test
-50 -50
@@@
-100
```
