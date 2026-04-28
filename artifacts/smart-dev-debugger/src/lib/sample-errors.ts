import { AnalyzeRequestLanguage } from "@workspace/api-client-react";

export interface SampleError {
  code: string;
  error: string;
}

export interface SampleErrorSelection extends SampleError {
  index: number;
  poolType: "basic" | "complex";
}

export const SAMPLE_ERRORS_BY_LANGUAGE: Record<AnalyzeRequestLanguage, SampleError[]> = {
  python: [
    {
      code: "def divide(a, b):\n    return a / b\n\nresult = divide(10, 0)\nprint(result)",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 4, in <module>\n    result = divide(10, 0)\n  File \"main.py\", line 2, in divide\n    return a / b\nZeroDivisionError: division by zero",
    },
    {
      code: "fruits = [\"apple\", \"banana\", \"cherry\"]\nprint(fruits[5])",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 2, in <module>\n    print(fruits[5])\nIndexError: list index out of range",
    },
    {
      code: "user = {\"name\": \"Alice\", \"age\": 25}\nprint(user[\"email\"])",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 2, in <module>\n    print(user[\"email\"])\nKeyError: 'email'",
    },
    {
      code: "def add(a, b):\n    return a + b\n\nresult = add(\"hello\", 5)",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 4, in <module>\n    result = add(\"hello\", 5)\n  File \"main.py\", line 2, in add\n    return a + b\nTypeError: can only concatenate str (not \"int\") to str",
    },
    {
      code: "number = 42\nnumber.append(10)",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 2, in <module>\n    number.append(10)\nAttributeError: 'int' object has no attribute 'append'",
    },
    {
      code: "with open(\"nonexistent_file.txt\", \"r\") as f:\n    content = f.read()",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    with open(\"nonexistent_file.txt\", \"r\") as f:\nFileNotFoundError: [Errno 2] No such file or directory: 'nonexistent_file.txt'",
    },
    {
      code: "def factorial(n):\n    return n * factorial(n - 1)\n\nprint(factorial(10))",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 4, in <module>\n    print(factorial(10))\n  File \"main.py\", line 2, in factorial\n    return n * factorial(n - 1)\n  [Previous line repeated 996 more times]\nRecursionError: maximum recursion depth exceeded",
    },
    {
      code: "number = int(\"abc\")",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    number = int(\"abc\")\nValueError: invalid literal for int() with base 10: 'abc'",
    },
    {
      code: "import numpy_fake",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    import numpy_fake\nModuleNotFoundError: No module named 'numpy_fake'",
    },
    {
      code: "print(undefined_variable)",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    print(undefined_variable)\nNameError: name 'undefined_variable' is not defined",
    },
    {
      code: "def greet():\nprint(\"Hello\")",
      error: "  File \"main.py\", line 2\n    print(\"Hello\")\n    ^\nIndentationError: expected an indented block after function definition on line 1",
    },
    {
      code: "huge_list = [0] * (10**12)",
      error: "Traceback (most recent call last):\n  File \"main.py\", line 1, in <module>\n    huge_list = [0] * (10**12)\nMemoryError",
    },
  ],
  javascript: [
    {
      code: "const user = null;\nconsole.log(user.name);",
      error: "TypeError: Cannot read properties of null (reading 'name')\n    at Object.<anonymous> (/app/main.js:2:18)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)\n    at node:internal/modules/cjs/loader:1422:10\n    at node:internal/modules/cjs/loader:1273:5",
    },
    {
      code: "console.log(myVariable);",
      error: "ReferenceError: myVariable is not defined\n    at Object.<anonymous> (/app/main.js:1:13)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)\n    at node:internal/modules/cjs/loader:1422:10",
    },
    {
      code: "const obj = {name: \"Alice\" age: 25};",
      error: "SyntaxError: Unexpected identifier 'age'\n    at internalCompileFunction (node:internal/vm:77:18)\n    at wrapSafe (node:internal/modules/cjs/loader:1288:20)\n    at Module._compile (node:internal/modules/cjs/loader:1340:27)",
    },
    {
      code: "function infiniteRecurse() {\n    return infiniteRecurse();\n}\ninfiniteRecurse();",
      error: "RangeError: Maximum call stack size exceeded\n    at infiniteRecurse (/app/main.js:2:12)\n    at infiniteRecurse (/app/main.js:2:12)\n    at infiniteRecurse (/app/main.js:2:12)\n    ... (repeated)",
    },
    {
      code: "async function fetchData() {\n    const res = await fetch(\"https://invalid.url/api\");\n    return res.json();\n}\nfetchData();",
      error: "UnhandledPromiseRejection: TypeError: fetch failed\n    at fetchData (/app/main.js:3:24)\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\nCaused by: Error: getaddrinfo ENOTFOUND invalid.url",
    },
    {
      code: "const num = 42;\nnum.map(x => x * 2);",
      error: "TypeError: num.map is not a function\n    at Object.<anonymous> (/app/main.js:2:5)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)",
    },
    {
      code: "const data = JSON.parse(\"{ invalid json }\");",
      error: "SyntaxError: Expected property name or '}' in JSON at position 2\n    at JSON.parse (<anonymous>)\n    at Object.<anonymous> (/app/main.js:1:14)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)",
    },
    {
      code: "const express = require('express-fake-module');",
      error: "Error: Cannot find module 'express-fake-module'\nRequire stack:\n- /app/main.js\n    at Function.Module._resolveFilename (node:internal/modules/cjs/loader:1039:15)\n    at Function.Module._load (node:internal/modules/cjs/loader:885:27)",
    },
    {
      code: "decodeURIComponent('%');",
      error: "URIError: URI malformed\n    at decodeURIComponent (<anonymous>)\n    at Object.<anonymous> (/app/main.js:1:1)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)",
    },
    {
      code: "eval(\"function() {}\");",
      error: "SyntaxError: Function statements require a function name\n    at new Script (node:vm:100:7)\n    at Object.runInThisContext (node:vm:121:12)\n    at Object.<anonymous> (/app/main.js:1:1)",
    },
    {
      code: "const items = null;\nfor (const item of items) {\n    console.log(item);\n}",
      error: "TypeError: null is not iterable\n    at Object.<anonymous> (/app/main.js:2:20)\n    at Module._compile (node:internal/modules/cjs/loader:1364:14)",
    },
    {
      code: "const fs = require('fs');\nfs.readFileSync('/nonexistent/path/file.txt', 'utf8');",
      error: "Error: ENOENT: no such file or directory, open '/nonexistent/path/file.txt'\n    at Object.openSync (node:fs:596:3)\n    at Object.readFileSync (node:fs:464:35)\n    at Object.<anonymous> (/app/main.js:2:4)",
    },
  ],
  typescript: [
    {
      code: "let age: number = \"twenty-five\";",
      error: "error TS2322: Type 'string' is not assignable to type 'number'.\n  --> src/main.ts:1:5\n   |\n 1 | let age: number = \"twenty-five\";\n   |     ^^^",
    },
    {
      code: "interface User {\n    name: string;\n    age: number;\n}\nconst user: User = { name: \"Alice\", age: 25 };\nconsole.log(user.email);",
      error: "error TS2339: Property 'email' does not exist on type 'User'.\n  --> src/main.ts:6:18\n   |\n 6 | console.log(user.email);\n   |                  ^^^^^",
    },
    {
      code: "interface Product {\n    id: number;\n    name: string;\n    price: number;\n}\nconst product: Product = { id: 1, name: \"Laptop\" };",
      error: "error TS2741: Property 'price' is missing in type '{ id: number; name: string; }' but required in type 'Product'.\n  --> src/main.ts:7:16\n   |\n 7 | const product: Product = { id: 1, name: \"Laptop\" };\n   |                ^^^^^^^",
    },
    {
      code: "function greet(name: string): string {\n    return `Hello, ${name}`;\n}\ngreet(123);",
      error: "error TS2345: Argument of type 'number' is not assignable to parameter of type 'string'.\n  --> src/main.ts:4:7\n   |\n 4 | greet(123);\n   |       ^^^",
    },
    {
      code: "function getUser(): string | undefined {\n    return undefined;\n}\nconst user = getUser();\nconsole.log(user.toUpperCase());",
      error: "error TS2532: Object is possibly 'undefined'.\n  --> src/main.ts:5:13\n   |\n 5 | console.log(user.toUpperCase());\n   |             ^^^^",
    },
    {
      code: "import { something } from './nonexistent-module';",
      error: "error TS2307: Cannot find module './nonexistent-module' or its corresponding type declarations.\n  --> src/main.ts:1:27\n   |\n 1 | import { something } from './nonexistent-module';\n   |                           ^^^^^^^^^^^^^^^^^^^^^^",
    },
    {
      code: "function identity(value) {\n    return value;\n}",
      error: "error TS7006: Parameter 'value' implicitly has an 'any' type.\n  --> src/main.ts:1:19\n   |\n 1 | function identity(value) {\n   |                   ^^^^^",
    },
    {
      code: "function getCount(): number {\n    return \"ten\";\n}",
      error: "error TS2322: Type 'string' is not assignable to type 'number'.\n  --> src/main.ts:2:12\n   |\n 2 |     return \"ten\";\n   |            ^^^^^",
    },
    {
      code: "interface Config {\n    readonly apiKey: string;\n}\nconst config: Config = { apiKey: \"secret\" };\nconfig.apiKey = \"new-secret\";",
      error: "error TS2540: Cannot assign to 'apiKey' because it is a read-only property.\n  --> src/main.ts:5:1\n   |\n 5 | config.apiKey = \"new-secret\";\n   | ^^^^^^^^^^^^^",
    },
    {
      code: "type ID = string | number;\nfunction printId(id: ID) {\n    console.log(id.toUpperCase());\n}",
      error: "error TS2339: Property 'toUpperCase' does not exist on type 'string | number'.\n  Property 'toUpperCase' does not exist on type 'number'.\n  --> src/main.ts:3:20\n   |\n 3 |     console.log(id.toUpperCase());\n   |                    ^^^^^^^^^^^",
    },
    {
      code: "interface Animal {\n    speak(): string;\n    move(): void;\n}\nclass Dog implements Animal {\n    speak() { return \"Woof\"; }\n}",
      error: "error TS2420: Class 'Dog' incorrectly implements interface 'Animal'.\n  Property 'move' is missing in type 'Dog' but required in type 'Animal'.\n  --> src/main.ts:5:7\n   |\n 5 | class Dog implements Animal {\n   |       ^^^",
    },
    {
      code: "enum Direction { Up, Down, Left, Right }\nlet dir: Direction = \"Up\";",
      error: "error TS2322: Type 'string' is not assignable to type 'Direction'.\n  --> src/main.ts:2:5\n   |\n 2 | let dir: Direction = \"Up\";\n   |     ^^^",
    },
  ],
  cpp: [
    {
      code: "#include <iostream>\nint main() {\n    int* ptr = nullptr;\n    *ptr = 10;\n    return 0;\n}",
      error: "Segmentation fault (core dumped)\nProgram received signal SIGSEGV, Segmentation fault.\n0x0000000000401156 in main ()\n(gdb) backtrace\n#0  0x0000000000401156 in main ()",
    },
    {
      code: "#include <iostream>\nint recurse(int n) {\n    return recurse(n + 1);\n}\nint main() {\n    std::cout << recurse(0);\n    return 0;\n}",
      error: "Segmentation fault (core dumped)\nProgram received signal SIGSEGV, Segmentation fault.\nrecurse (n=261993) at main.cpp:3\n(gdb) backtrace\n#0  recurse (n=261993) at main.cpp:3\n#1  recurse (n=261992) at main.cpp:3\n... (repeated thousands of times)",
    },
    {
      code: "#include <iostream>\nint main() {\n    int* ptr = new int(42);\n    delete ptr;\n    std::cout << *ptr << std::endl;\n    return 0;\n}",
      error: "==1234==ERROR: AddressSanitizer: heap-use-after-free on address 0x602000000010\nREAD of size 4 at 0x602000000010 thread T0\n    #0 0x401234 in main main.cpp:5\n    #1 0x7f1234 in __libc_start_main\nFREED by thread T0 here:\n    #0 0x401210 in main main.cpp:4",
    },
    {
      code: "#include <iostream>\nint main() {\n    std::cout << undeclaredVar << std::endl;\n    return 0;\n}",
      error: "main.cpp:3:18: error: 'undeclaredVar' was not declared in this scope\n    3 |     std::cout << undeclaredVar << std::endl;\n      |                  ^~~~~~~~~~~~~",
    },
    {
      code: "#include <iostream>\nint main() {\n    int x = 2147483647;\n    x = x + 1;\n    std::cout << x << std::endl;\n    return 0;\n}",
      error: "main.cpp:4:11: warning: integer overflow in expression of type 'int' results in '-2147483648' [-Woverflow]\nRuntime output: -2147483648\n(Undefined Behavior - AddressSanitizer may report:)\n==1234==ERROR: undefined behavior: signed integer overflow",
    },
    {
      code: "#include <iostream>\nint main() {\n    int arr[5] = {1, 2, 3, 4, 5};\n    std::cout << arr[10] << std::endl;\n    return 0;\n}",
      error: "==1234==ERROR: AddressSanitizer: stack-buffer-overflow on address 0x7ffce1234568\nREAD of size 4 at 0x7ffce1234568 thread T0\n    #0 0x401234 in main main.cpp:4\nHINT: this may be a false positive if your program uses some custom stack unwind mechanism",
    },
    {
      code: "#include <iostream>\nint getValue() {\n    int x = 5;\n}\nint main() {\n    std::cout << getValue();\n    return 0;\n}",
      error: "main.cpp:3:1: warning: control reaches end of non-void function [-Wreturn-type]\n    3 | }\n      | ^\nmain.cpp: In function 'int getValue()':\nmain.cpp:3:1: error: no return statement in function returning 'int'",
    },
    {
      code: "#include <iostream>\n#include <string>\nint add(int a, int b) { return a + b; }\nint main() {\n    std::cout << add(\"hello\", 5);\n    return 0;\n}",
      error: "main.cpp:5:24: error: invalid conversion from 'const char*' to 'int' [-fpermissive]\n    5 |     std::cout << add(\"hello\", 5);\n      |                      ^~~~~~~\n      |                      |\n      |                      const char*",
    },
    {
      code: "#include <cstdlib>\nint main() {\n    int* p = (int*)malloc(sizeof(int));\n    free(p);\n    free(p);\n    return 0;\n}",
      error: "==1234==ERROR: AddressSanitizer: attempting double-free on 0x602000000010 in thread T0:\n    #0 0x7f12345 in free\n    #1 0x401234 in main main.cpp:5\nPreviously freed by thread T0 here:\n    #0 0x7f12345 in free\n    #1 0x401210 in main main.cpp:4",
    },
    {
      code: "// main.cpp\nvoid myFunction();  // declared but not defined anywhere\nint main() {\n    myFunction();\n    return 0;\n}",
      error: "/usr/bin/ld: /tmp/ccXYZ.o: in function `main':\nmain.cpp:(.text+0x9): undefined reference to `myFunction()'\ncollect2: error: ld returned 1 exit status",
    },
    {
      code: "#include <iostream>\n#include <stdexcept>\nint main() {\n    throw std::runtime_error(\"Something went wrong!\");\n    return 0;\n}",
      error: "terminate called after throwing an instance of 'std::runtime_error'\n  what():  Something went wrong!\nAborted (core dumped)",
    },
    {
      code: "#include <iostream>\nclass Shape {\npublic:\n    virtual double area() = 0;\n};\nclass Circle : public Shape {\npublic:\n    double radius = 5.0;\n};\nint main() {\n    Circle c;\n    return 0;\n}",
      error: "main.cpp:10:12: error: cannot declare variable 'c' to be of abstract type 'Circle'\n   10 |     Circle c;\n      |            ^\nmain.cpp:6:7: note: because the following virtual functions are pure within 'Circle':\n    6 | class Circle : public Shape {\n      |       ^^^^^^\nmain.cpp:4:20: note:     'virtual double Shape::area()'\n    4 |     virtual double area() = 0;",
    },
  ],
  java: [
    {
      code: "public class Main {\n    public static void main(String[] args) {\n        String str = null;\n        System.out.println(str.length());\n    }\n}",
      error: "Exception in thread \"main\" java.lang.NullPointerException: Cannot invoke \"String.length()\" because \"str\" is null\n\tat Main.main(Main.java:4)",
    },
    {
      code: "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {1, 2, 3};\n        System.out.println(arr[5]);\n    }\n}",
      error: "Exception in thread \"main\" java.lang.ArrayIndexOutOfBoundsException: Index 5 out of bounds for length 3\n\tat Main.main(Main.java:4)",
    },
    {
      code: "public class Main {\n    public static void main(String[] args) {\n        Object obj = \"Hello\";\n        Integer num = (Integer) obj;\n    }\n}",
      error: "Exception in thread \"main\" java.lang.ClassCastException: class java.lang.String cannot be cast to class java.lang.Integer\n\tat Main.main(Main.java:4)",
    },
    {
      code: "public class Main {\n    static int factorial(int n) {\n        return n * factorial(n - 1);\n    }\n    public static void main(String[] args) {\n        System.out.println(factorial(10));\n    }\n}",
      error: "Exception in thread \"main\" java.lang.StackOverflowError\n\tat Main.factorial(Main.java:3)\n\tat Main.factorial(Main.java:3)\n\tat Main.factorial(Main.java:3)\n\t... (repeated 1024 times)",
    },
    {
      code: "public class Main {\n    public static void main(String[] args) {\n        int num = Integer.parseInt(\"abc\");\n        System.out.println(num);\n    }\n}",
      error: "Exception in thread \"main\" java.lang.NumberFormatException: For input string: \"abc\"\n\tat java.base/java.lang.NumberFormatException.forInputString(NumberFormatException.java:67)\n\tat java.base/java.lang.Integer.parseInt(Integer.java:668)\n\tat Main.main(Main.java:3)",
    },
    {
      code: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<int[]> list = new ArrayList<>();\n        while (true) list.add(new int[1000000]);\n    }\n}",
      error: "Exception in thread \"main\" java.lang.OutOfMemoryError: Java heap space\n\tat Main.main(Main.java:5)",
    },
    {
      code: "import java.util.*;\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));\n        for (Integer i : list) {\n            if (i == 2) list.remove(i);\n        }\n    }\n}",
      error: "Exception in thread \"main\" java.util.ConcurrentModificationException\n\tat java.base/java.util.ArrayList$Itr.checkForComodification(ArrayList.java:1013)\n\tat java.base/java.util.ArrayList$Itr.next(ArrayList.java:967)\n\tat Main.main(Main.java:6)",
    },
    {
      code: "import java.util.ArrayList;\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<Integer> list = new ArrayList<>(-1);\n    }\n}",
      error: "Exception in thread \"main\" java.lang.IllegalArgumentException: Illegal Capacity: -1\n\tat java.base/java.util.ArrayList.<init>(ArrayList.java:164)\n\tat Main.main(Main.java:4)",
    },
    {
      code: "import java.io.*;\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        FileReader fr = new FileReader(\"missing.txt\");\n    }\n}",
      error: "Exception in thread \"main\" java.io.FileNotFoundException: missing.txt (No such file or directory)\n\tat java.base/java.io.FileInputStream.open0(Native Method)\n\tat java.base/java.io.FileInputStream.open(FileInputStream.java:216)\n\tat java.base/java.io.FileInputStream.<init>(FileInputStream.java:157)\n\tat java.base/java.io.FileReader.<init>(FileReader.java:75)\n\tat Main.main(Main.java:4)",
    },
    {
      code: "public class Main {\n    public static void main(String[] args) {\n        int result = 10 / 0;\n        System.out.println(result);\n    }\n}",
      error: "Exception in thread \"main\" java.lang.ArithmeticException: / by zero\n\tat Main.main(Main.java:3)",
    },
    {
      code: "public class Main {\n    static int getValue(int x) {\n        if (x > 0) {\n            return x;\n        }\n    }\n    public static void main(String[] args) {}\n}",
      error: "Main.java:6: error: missing return statement\n    }\n    ^\n1 error",
    },
    {
      code: "public class Main {\n    public static void main(String[] args) throws Exception {\n        Class.forName(\"com.nonexistent.MyClass\");\n    }\n}",
      error: "Exception in thread \"main\" java.lang.ClassNotFoundException: com.nonexistent.MyClass\n\tat java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:445)\n\tat java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:592)\n\tat java.base/java.lang.ClassLoader.loadClass(ClassLoader.java:525)\n\tat java.base/java.lang.Class.forName0(Native Method)\n\tat java.base/java.lang.Class.forName(Class.java:467)\n\tat Main.main(Main.java:3)",
    },
  ],
  go: [
    {
      code: "package main\n\nimport \"fmt\"\n\ntype User struct{ Name string }\n\nfunc main() {\n    var u *User\n    fmt.Println(u.Name)\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:9 +0x18\nexit status 2\npanic: runtime error: invalid memory address or nil pointer dereference\n[signal SIGSEGV: segmentation violation code=0x1 addr=0x0 pc=0x47f3a8]",
    },
    {
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := []int{1, 2, 3}\n    fmt.Println(s[10])\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:7 +0x1d\nexit status 2\npanic: runtime error: index out of range [10] with length 3",
    },
    {
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    a, b := 10, 0\n    fmt.Println(a / b)\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:7 +0x11\nexit status 2\npanic: runtime error: integer divide by zero",
    },
    {
      code: "package main\n\nfunc main() {\n    x := 42\n}",
      error: "./main.go:4:2: x declared and not used",
    },
    {
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    fmt.Println(undefinedVar)\n}",
      error: "./main.go:6:18: undefined: undefinedVar",
    },
    {
      code: "package main\n\nfunc main() {\n    ch := make(chan int)\n    ch <- 1\n}",
      error: "fatal error: all goroutines are asleep - deadlock!\n\ngoroutine 1 [chan send]:\nmain.main()\n        /app/main.go:5 +0x28\nexit status 2",
    },
    {
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    var i interface{} = \"hello\"\n    num := i.(int)\n    fmt.Println(num)\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:7 +0x25\nexit status 2\npanic: interface conversion: interface {} is string, not int",
    },
    {
      code: "package main\n\nfunc recurse() { recurse() }\n\nfunc main() { recurse() }",
      error: "runtime: goroutine stack exceeds 1000000000-byte limit\nruntime: sp=0xc0200e0370 stack=[0xc0200e0000, 0xc0400e0000]\nfatal error: stack overflow\n\ngoroutine 1 [running]:\nmain.recurse(...)\n        /app/main.go:3",
    },
    {
      code: "package main\n\nimport \"sync\"\n\nfunc main() {\n    m := make(map[int]int)\n    var wg sync.WaitGroup\n    for i := 0; i < 100; i++ {\n        wg.Add(1)\n        go func(n int) { defer wg.Done(); m[n] = n }(i)\n    }\n    wg.Wait()\n}",
      error: "fatal error: concurrent map writes\n\ngoroutine 12 [running]:\nmain.main.func1(0x5)\n        /app/main.go:10 +0x44\ngoroutine 7 [running]:\nmain.main.func1(0x2)\n        /app/main.go:10 +0x44",
    },
    {
      code: "package main\n\nfunc main() {\n    ch := make(chan int)\n    close(ch)\n    close(ch)\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:6 +0x2d\nexit status 2\npanic: close of closed channel",
    },
    {
      code: "package main\n\nimport \"fmt\"\n\nfunc main() {\n    s := []int{1, 2, 3}\n    fmt.Println(s[1:10])\n}",
      error: "goroutine 1 [running]:\nmain.main()\n        /app/main.go:7 +0x1d\nexit status 2\npanic: runtime error: slice bounds out of range [1:10] with capacity 3",
    },
    {
      code: "// package a imports package b, and package b imports package a",
      error: "can't load package: package main: import cycle not allowed\npackage main\n        imports github.com/user/project/a\n        imports github.com/user/project/b\n        imports github.com/user/project/a",
    },
  ],
  rust: [
    {
      code: "fn main() {\n    let s1 = String::from(\"hello\");\n    let s2 = s1;\n    println!(\"{}\", s1);\n}",
      error: "error[E0382]: borrow of moved value: `s1`\n --> src/main.rs:4:20\n  |\n2 |     let s1 = String::from(\"hello\");\n  |         -- move occurs because `s1` has type `String`\n3 |     let s2 = s1;\n  |              -- value moved here\n4 |     println!(\"{}\", s1);\n  |                    ^^ value borrowed here after move",
    },
    {
      code: "fn main() {\n    let mut v = vec![1, 2, 3];\n    let first = &v[0];\n    v.push(4);\n    println!(\"{}\", first);\n}",
      error: "error[E0502]: cannot borrow `v` as mutable because it is also borrowed as immutable\n --> src/main.rs:4:5\n  |\n3 |     let first = &v[0];\n  |                  - immutable borrow occurs here\n4 |     v.push(4);\n  |     ^^^^^^^^^ mutable borrow occurs here\n5 |     println!(\"{}\", first);\n  |                    ----- immutable borrow later used here",
    },
    {
      code: "use std::thread;\nuse std::rc::Rc;\n\nfn main() {\n    let rc = Rc::new(5);\n    thread::spawn(move || {\n        println!(\"{}\", rc);\n    });\n}",
      error: "error[E0277]: `Rc<i32>` cannot be sent between threads safely\n --> src/main.rs:6:19\n  |\n6 |     thread::spawn(move || {\n  |                   ^^^^^^^ `Rc<i32>` cannot be sent between threads safely\n  = help: the trait `Send` is not implemented for `Rc<i32>`",
    },
    {
      code: "fn longest(x: &str, y: &str) -> &str {\n    if x.len() > y.len() { x } else { y }\n}",
      error: "error[E0106]: missing lifetime specifier\n --> src/main.rs:1:33\n  |\n1 | fn longest(x: &str, y: &str) -> &str {\n  |                --       --      ^ expected named lifetime parameter\n  |\n  = help: this function's return type contains a borrowed value, but the signature does not say whether it is borrowed from `x` or `y`",
    },
    {
      code: "fn main() {\n    let x: u8 = 255;\n    let y = x + 1;\n    println!(\"{}\", y);\n}",
      error: "thread 'main' panicked at 'attempt to add with overflow', src/main.rs:3:13\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace",
    },
    {
      code: "fn main() {\n    let v = vec![1, 2, 3];\n    println!(\"{}\", v[10]);\n}",
      error: "thread 'main' panicked at 'index out of bounds: the len is 3 but the index is 10', src/main.rs:3:20\nstack backtrace:\n   0: rust_begin_unwind\n   1: core::panicking::panic_fmt\n   2: core::slice::index_failed\n   3: main::main",
    },
    {
      code: "fn main() {\n    let v: Vec<i32> = vec![];\n    let first = v.first().unwrap();\n    println!(\"{}\", first);\n}",
      error: "thread 'main' panicked at 'called `Option::unwrap()` on a `None` value', src/main.rs:3:30\nnote: run with `RUST_BACKTRACE=1` environment variable to display a backtrace",
    },
    {
      code: "fn add(a: i32, b: i32) -> i32 {\n    a + b\n}\n\nfn main() {\n    println!(\"{}\", add(1.5, 2));\n}",
      error: "error[E0308]: mismatched types\n --> src/main.rs:6:24\n  |\n6 |     println!(\"{}\", add(1.5, 2));\n  |                        ^^^ expected `i32`, found floating-point number",
    },
    {
      code: "fn main() {\n    let x = 42;\n}",
      error: "warning: unused variable: `x`\n --> src/main.rs:2:9\n  |\n2 |     let x = 42;\n  |         ^ help: if this is intentional, prefix it with an underscore: `_x`\n  |\n  = note: `#[warn(unused_variables)]` on by default",
    },
    {
      code: "fn main() {\n    let a = 10;\n    let b = 0;\n    println!(\"{}\", a / b);\n}",
      error: "thread 'main' panicked at 'attempt to divide by zero', src/main.rs:4:20\nstack backtrace:\n   0: rust_begin_unwind\n   1: core::panicking::panic_fmt\n   2: main::main",
    },
    {
      code: "fn main() {\n    let x = 5;\n    x = 10;\n    println!(\"{}\", x);\n}",
      error: "error[E0384]: cannot assign twice to immutable variable `x`\n --> src/main.rs:3:5\n  |\n2 |     let x = 5;\n  |         -\n  |         |\n  |         first assignment to `x`\n  |         help: consider making this binding mutable: `mut x`\n3 |     x = 10;\n  |     ^^^^^^ cannot assign twice to immutable variable",
    },
    {
      code: "fn recurse(n: u64) -> u64 {\n    recurse(n + 1)\n}\n\nfn main() {\n    println!(\"{}\", recurse(0));\n}",
      error: "thread 'main' has overflowed its stack\nfatal runtime error: stack overflow",
    },
  ],
  php: [
    {
      code: "<?php\necho $undefinedVariable;\n?>",
      error: "Warning: Undefined variable $undefinedVariable in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\n$result = 10 / 0;\necho $result;\n?>",
      error: "Warning: Division by zero in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\n$result = nonExistentFunction(5, 10);\necho $result;\n?>",
      error: "Fatal error: Uncaught Error: Call to undefined function nonExistentFunction() in /var/www/html/index.php:2\nStack trace:\n#0 {main}\n  thrown in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\n$obj = new NonExistentClass();\n?>",
      error: "Fatal error: Uncaught Error: Class \"NonExistentClass\" not found in /var/www/html/index.php:2\nStack trace:\n#0 {main}\n  thrown in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\nfunction addNumbers(int $a, int $b): int {\n    return $a + $b;\n}\necho addNumbers(\"hello\", 5);\n?>",
      error: "Fatal error: Uncaught TypeError: addNumbers(): Argument #1 ($a) must be of type int, string given, called in /var/www/html/index.php on line 5\nStack trace:\n#0 /var/www/html/index.php(5): addNumbers('hello', 5)\n#1 {main}\n  thrown in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\n$data = [\"name\" => \"Alice\", \"age\" => 25];\necho $data[\"email\"];\n?>",
      error: "Warning: Undefined array key \"email\" in /var/www/html/index.php on line 3",
    },
    {
      code: "<?php\n$x = 10\n$y = 20;\necho $x + $y;\n?>",
      error: "Parse error: syntax error, unexpected variable \"$y\" in /var/www/html/index.php on line 3",
    },
    {
      code: "<?php\ninclude 'nonexistent_file.php';\n?>",
      error: "Warning: include(nonexistent_file.php): Failed to open stream: No such file or directory in /var/www/html/index.php on line 2\nWarning: include(): Failed opening 'nonexistent_file.php' for inclusion (include_path='.:/usr/share/php') in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\nwhile (true) {\n    // infinite loop\n}\n?>",
      error: "Fatal error: Maximum execution time of 30 seconds exceeded in /var/www/html/index.php on line 3",
    },
    {
      code: "<?php\n$obj = null;\n$obj->doSomething();\n?>",
      error: "Fatal error: Uncaught Error: Call to a member function doSomething() on null in /var/www/html/index.php:3\nStack trace:\n#0 {main}\n  thrown in /var/www/html/index.php on line 3",
    },
    {
      code: "<?php\n$data = str_repeat(\"x\", PHP_INT_MAX);\n?>",
      error: "Fatal error: Allowed memory size of 134217728 bytes exhausted (tried to allocate 9223372036854775808 bytes) in /var/www/html/index.php on line 2",
    },
    {
      code: "<?php\n$pdo = new PDO(\"mysql:host=localhost;dbname=mydb\", \"user\", \"wrongpassword\");\n?>",
      error: "Fatal error: Uncaught PDOException: SQLSTATE[HY000] [1045] Access denied for user 'user'@'localhost' (using password: YES) in /var/www/html/index.php:2\nStack trace:\n#0 /var/www/html/index.php(2): PDO->__construct('mysql:host=loca...', 'user', 'wrongpassword')\n#1 {main}\n  thrown in /var/www/html/index.php on line 2",
    },
  ],
  ruby: [
    {
      code: "num = 42\nnum.push(10)",
      error: "Traceback (most recent call last):\n        1: from main.rb:2:in `<main>'\nmain.rb:2:in `<main>': undefined method `push' for 42:Integer (NoMethodError)",
    },
    {
      code: "puts undefined_variable",
      error: "Traceback (most recent call last):\n        1: from main.rb:1:in `<main>'\nmain.rb:1:in `<main>': undefined local variable or method `undefined_variable' for main:Object (NameError)",
    },
    {
      code: "result = 10 / 0\nputs result",
      error: "Traceback (most recent call last):\n        1: from main.rb:1:in `<main>'\nmain.rb:1:in `/': divided by 0 (ZeroDivisionError)",
    },
    {
      code: "result = \"hello\" + 5\nputs result",
      error: "Traceback (most recent call last):\n        1: from main.rb:1:in `<main>'\nmain.rb:1:in `+': no implicit conversion of Integer into String (TypeError)",
    },
    {
      code: "def greet(name, age)\n  puts \"#{name} is #{age}\"\nend\ngreet(\"Alice\")",
      error: "Traceback (most recent call last):\n        1: from main.rb:4:in `<main>'\nmain.rb:4:in `<main>': wrong number of arguments (given 1, expected 2) (ArgumentError)",
    },
    {
      code: "arr = [1, 2, 3]\nputs arr.fetch(10)",
      error: "Traceback (most recent call last):\n        1: from main.rb:2:in `<main>'\nmain.rb:2:in `fetch': index 10 outside of array bounds: -3...3 (IndexError)",
    },
    {
      code: "require 'nonexistent_gem'",
      error: "Traceback (most recent call last):\n        2: from main.rb:1:in `<main>'\n        1: from /usr/lib/ruby/2.7.0/rubygems/core_ext/kernel_require.rb:92:in `require'\nmain.rb:1:in `require': cannot load such file -- nonexistent_gem (LoadError)",
    },
    {
      code: "def process(value)\n  raise \"Invalid value: #{value}\" if value < 0\n  value * 2\nend\nputs process(-5)",
      error: "Traceback (most recent call last):\n        2: from main.rb:5:in `<main>'\n        1: from main.rb:5:in `process'\nmain.rb:2:in `process': Invalid value: -5 (RuntimeError)",
    },
    {
      code: "def infinite\n  infinite\nend\ninfinite",
      error: "Traceback (most recent call last):\n        ...9999 levels...\nmain.rb:2:in `infinite': stack level too deep (SystemStackError)",
    },
    {
      code: "str = \"\\xFF\\xFE\"\nputs str.encode(\"UTF-8\")",
      error: "Traceback (most recent call last):\n        1: from main.rb:2:in `<main>'\nmain.rb:2:in `encode': \"\\xFF\" from ASCII-8BIT to UTF-8 (Encoding::UndefinedConversionError)",
    },
    {
      code: "str = \"hello\".freeze\nstr << \" world\"",
      error: "Traceback (most recent call last):\n        1: from main.rb:2:in `<main>'\nmain.rb:2:in `<<': can't modify frozen String: \"hello\" (FrozenError)",
    },
    {
      code: "require 'timeout'\nTimeout.timeout(1) do\n  sleep 5\nend",
      error: "Traceback (most recent call last):\n        3: from main.rb:2:in `<main>'\n        2: from /usr/lib/ruby/2.7.0/timeout.rb:95:in `timeout'\n        1: from main.rb:3:in `block in <main>'\n/usr/lib/ruby/2.7.0/timeout.rb:107:in `timeout': execution expired (Timeout::Error)",
    },
  ],
  csharp: [
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        string str = null;\n        Console.WriteLine(str.Length);\n    }\n}",
      error: "Unhandled exception. System.NullReferenceException: Object reference not set to an instance of an object.\n   at Program.Main() in /app/Program.cs:line 6",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        int[] arr = {1, 2, 3};\n        Console.WriteLine(arr[10]);\n    }\n}",
      error: "Unhandled exception. System.IndexOutOfRangeException: Index was outside the bounds of the array.\n   at Program.Main() in /app/Program.cs:line 6",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        object obj = \"Hello\";\n        int num = (int)obj;\n    }\n}",
      error: "Unhandled exception. System.InvalidCastException: Unable to cast object of type 'System.String' to type 'System.Int32'.\n   at Program.Main() in /app/Program.cs:line 6",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        int a = 10, b = 0;\n        Console.WriteLine(a / b);\n    }\n}",
      error: "Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.\n   at Program.Main() in /app/Program.cs:line 6",
    },
    {
      code: "using System;\n\nclass Program {\n    static int Recurse(int n) => Recurse(n + 1);\n    static void Main() => Console.WriteLine(Recurse(0));\n}",
      error: "Stack overflow.\n   at Program.Recurse(Int32)\n   at Program.Recurse(Int32)\n   at Program.Recurse(Int32)\n   ... (process terminated)",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        int num = int.Parse(\"abc\");\n        Console.WriteLine(num);\n    }\n}",
      error: "Unhandled exception. System.FormatException: Input string was not in a correct format.\n   at System.Number.ThrowOverflowOrFormatException(ParsingStatus status, TypeCode type)\n   at System.Int32.Parse(String s)\n   at Program.Main() in /app/Program.cs:line 5",
    },
    {
      code: "using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        var list = new List<byte[]>();\n        while (true) list.Add(new byte[1024 * 1024 * 100]);\n    }\n}",
      error: "Unhandled exception. System.OutOfMemoryException: Insufficient memory to continue the execution of the program.\n   at System.Collections.Generic.List`1.AddWithResize(T item)\n   at Program.Main() in /app/Program.cs:line 7",
    },
    {
      code: "using System.IO;\n\nclass Program {\n    static void Main() {\n        string content = File.ReadAllText(\"nonexistent.txt\");\n    }\n}",
      error: "Unhandled exception. System.IO.FileNotFoundException: Could not find file '/app/nonexistent.txt'.\n   at System.IO.FileSystem.ReadAllText(String path, Encoding encoding)\n   at Program.Main() in /app/Program.cs:line 5",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        int x = 10\n        Console.WriteLine(x);\n    }\n}",
      error: "error CS1002: ; expected\n --> /app/Program.cs(5,20)\n  |\n5 |         int x = 10\n  |                    ^",
    },
    {
      code: "using System;\nusing System.Collections.Generic;\n\nclass Program {\n    static void Main() {\n        var dict = new Dictionary<string, int> { {\"a\", 1} };\n        Console.WriteLine(dict[\"z\"]);\n    }\n}",
      error: "Unhandled exception. System.Collections.Generic.KeyNotFoundException: The given key 'z' was not present in the dictionary.\n   at System.Collections.Generic.Dictionary`2.get_Item(TKey key)\n   at Program.Main() in /app/Program.cs:line 7",
    },
    {
      code: "using System;\n\nclass Program {\n    static void Main() {\n        checked {\n            int x = int.MaxValue;\n            int y = x + 1;\n            Console.WriteLine(y);\n        }\n    }\n}",
      error: "Unhandled exception. System.OverflowException: Arithmetic operation resulted in an overflow.\n   at Program.Main() in /app/Program.cs:line 7",
    },
    {
      code: "using System;\nusing System.Net.Http;\nusing System.Threading;\nusing System.Threading.Tasks;\n\nclass Program {\n    static async Task Main() {\n        var cts = new CancellationTokenSource(TimeSpan.FromMilliseconds(1));\n        var client = new HttpClient();\n        await client.GetStringAsync(\"https://example.com\", cts.Token);\n    }\n}",
      error: "Unhandled exception. System.Threading.Tasks.TaskCanceledException: The request was canceled due to the configured HttpClient.Timeout of 0.001 seconds elapsing.\n   at System.Net.Http.HttpClient.GetStringAsync(Uri requestUri, CancellationToken cancellationToken)\n   at Program.Main() in /app/Program.cs:line 10",
    },
  ],
};

export interface SampleErrorPools {
  basic: SampleError[];
  complex: SampleError[];
}

export const COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE: Record<AnalyzeRequestLanguage, SampleError[]> = {
  python: [
    {
      code: "from services.email_service import send_welcome_email   # imports from services\n\nclass User:\n    def __init__(self, name: str, email: str):\n        self.name = name\n        self.email = email\n\n    def save(self):\n        # Save user to DB (simulated)\n        send_welcome_email(self)\n        return self\n\nfrom models.user import User   # imports from models — CIRCULAR!\n\ndef send_welcome_email(user: User):\n    print(f\"Sending email to {user.email}\")\n\ndef get_all_users():\n    return User.query.all()\n\nfrom models.user import User\n\nif __name__ == \"__main__\":\n    u = User(\"Alice\", \"alice@example.com\")\n    u.save()",
      error: "Traceback (most recent call last):\n  File \"/app/app.py\", line 1, in <module>\n    from models.user import User\n  File \"/app/models/user.py\", line 1, in <module>\n    from services.email_service import send_welcome_email\n  File \"/app/services/email_service.py\", line 1, in <module>\n    from models.user import User\nImportError: cannot import name 'User' from partially initialized module\n'models.user' (most likely due to a circular import)",
    },
    {
      code: "from celery import shared_task\nfrom datetime import datetime\nfrom decimal import Decimal\nfrom myapp.models import Order\n\n@shared_task(bind=True, max_retries=3)\ndef generate_monthly_report(self, filters: dict, requested_by: object):\n    \"\"\"\n    BUG 1: 'requested_by' is a Django User model instance — not JSON serializable\n    BUG 2: filters dict contains Decimal and datetime objects — not serializable\n    BUG 3: task result stored but never checked — silent failure path\n    \"\"\"\n    try:\n        orders = Order.objects.filter(\n            created_at__gte=filters['start_date'],\n            user_id=requested_by.id\n        )\n        total = sum(o.amount for o in orders)\n        return {\"total\": total, \"count\": orders.count()}\n    except Exception as exc:\n        raise self.retry(exc=exc, countdown=60)\n\nfrom django.contrib.auth.decorators import login_required\nfrom django.http import JsonResponse\nfrom datetime import datetime\nfrom decimal import Decimal\nfrom tasks.reports import generate_monthly_report\n\n@login_required\ndef request_report(request):\n    filters = {\n        'start_date': datetime(2024, 1, 1),   # BUG: datetime not JSON-safe\n        'min_amount': Decimal('100.00'),       # BUG: Decimal not JSON-safe\n    }\n\n    # BUG: passing Django User object directly — not serializable\n    task = generate_monthly_report.delay(filters, request.user)\n\n    return JsonResponse({'task_id': task.id, 'status': 'queued'})",
      error: "--- Celery Worker Log ---\n[2024-03-15 14:22:10,441: ERROR/MainProcess] Received unregistered task of\ntype 'tasks.reports.generate_monthly_report'.\nThe message has been ignored and discarded.\n\nkombu.exceptions.EncodeError: Object of type datetime is not JSON serializable\n  File \".../celery/app/amqp.py\", line 541, in publish_task\n    ...\n  File \".../kombu/serialization.py\", line 49, in dumps\n    return encoder(data)\n  File \".../json.py\", line 231, in encode\n    return _encoder(o, ...)\n  File \".../json/encoder.py\", line 180, in default\n    raise TypeError(f'Object of type {o.__class__.__name__} is not JSON serializable')\n\n[2024-03-15 14:22:10,445: CRITICAL] Task silently dropped. Message not enqueued.\n[2024-03-15 14:22:10,445: WARNING] No error surfaced to user — JsonResponse\nreturned {'task_id': 'abc123', 'status': 'queued'} but task never ran.\n\n--- If serialization passes (with pickle) — security issue:\n[2024-03-15 14:22:11,001: WARNING] Celery pickle serializer used — arbitrary\ncode execution possible if message broker (Redis/RabbitMQ) is compromised.",
    },
  ],
  javascript: [
    {
      code: "const express = require('express');\nconst router = express.Router();\nconst db = require('../db');\n\n// BUG: No transaction or lock — two simultaneous requests cause race condition\nrouter.post('/deduct', async (req, res) => {\n    const { userId, amount } = req.body;\n\n    try {\n        const user = await db.query(\n            'SELECT balance FROM users WHERE id = $1', [userId]\n        );\n\n        const currentBalance = user.rows[0].balance;\n\n        if (currentBalance < amount) {\n            return res.status(400).json({ error: 'Insufficient funds' });\n        }\n\n        // Race condition: another request reads the same balance here\n        await new Promise(resolve => setTimeout(resolve, 50));\n\n        await db.query(\n            'UPDATE users SET balance = $1 WHERE id = $2',\n            [currentBalance - amount, userId]\n        );\n\n        res.json({ success: true, newBalance: currentBalance - amount });\n    } catch (err) {\n        next(err);  // BUG: 'next' is not defined in this scope!\n    }\n});\n\nmodule.exports = router;",
      error: "[2024-03-15T10:23:41.234Z] POST /api/wallet/deduct 500\nReferenceError: next is not defined\n    at /app/routes/wallet.js:27:9\n    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)\n\n[2024-03-15T10:23:41.235Z] UnhandledPromiseRejection:\nError: Cannot set headers after they are sent to the client\n    at new NodeError (node:internal/errors:399:5)\n    at ServerResponse.setHeader (node:_http_outgoing:644:11)\n    at ServerResponse.header (/app/node_modules/express/lib/response.js:794:10)\n    at ServerResponse.json (/app/node_modules/express/lib/response.js:275:10)\n    at /app/routes/wallet.js:30:13\n\nSIDE EFFECT (Race Condition):\n  User starts with balance: $100\n  Request A reads $100, Request B reads $100 simultaneously\n  Request A deducts $80 → sets balance to $20\n  Request B deducts $80 → also sets balance to $20 (should be -$60, caught by check)\n  Net result: User deducted $160 but balance shows $20",
    },
    {
      code: "import React, { useState, useEffect } from 'react';\nimport axios from 'axios';\n\nconst LiveDashboard = ({ userId, config }) => {\n    const [metrics, setMetrics] = useState([]);\n    const [loading, setLoading] = useState(false);\n    const [filters, setFilters] = useState({ range: '7d', type: 'all' });\n\n    const fetchMetrics = async () => {\n        setLoading(true);\n        try {\n            const res = await axios.get(`/api/metrics/${userId}`, {\n                params: { ...filters, ...config }\n            });\n            setMetrics(res.data);\n        } catch (err) {\n            console.error(err);\n        } finally {\n            setLoading(false);\n        }\n    };\n\n    useEffect(() => {\n        fetchMetrics();\n    }, [fetchMetrics]);\n\n    useEffect(() => {\n        const interval = setInterval(fetchMetrics, 5000);\n        return;\n    }, []);\n\n    useEffect(() => {\n        console.log('Config changed:', config);\n        fetchMetrics();\n    }, [config]);\n\n    return (\n        <div>\n            <button onClick={() => setFilters({ ...filters, range: '30d' })}>\n                Last 30 Days\n            </button>\n            {loading && <p>Loading...</p>}\n            {metrics.map(m => <div key={m.id}>{m.value}</div>)}\n        </div>\n    );\n};\n\nexport default LiveDashboard;\n\nconst ParentComponent = () => {\n    const [user, setUser] = useState({ id: 1 });\n    return <LiveDashboard userId={user.id} config={{ theme: 'dark' }} />;\n};",
      error: "--- Browser Console ---\nWarning: Can't perform a React state update on an unmounted component.\nThis is a no-op, but it indicates a memory leak in your application.\nTo fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup.\n    at LiveDashboard (LiveDashboard.jsx:13)\n\nWarning: Maximum update depth exceeded. This can happen when a component\ncalls setState inside useEffect, but useEffect either doesn't have a\ndependency array, or one of the dependencies changes on every render.\n    at LiveDashboard\n    at ParentComponent\n\n--- React DevTools Profiler ---\n  Renders in 5s: 2,847 (infinite loop)\n  Wasted renders: 2,841\n\n--- Chrome Memory Tab ---\n  Heap snapshot: 487 MB\n  Detached DOM nodes: 1,240\n  Listeners not removed: 48 (setInterval callbacks)\n  Growing at: ~4 MB/second\n\n--- Network Tab ---\n  GET /api/metrics/1 — (PENDING)   ×1\n  GET /api/metrics/1 — (PENDING)   ×1\n  GET /api/metrics/1 — (PENDING)   ×1\n  ... (hundreds of in-flight requests)",
    },
  ],
  typescript: [
    {
      code: "interface Entity {\n    id: number;\n    createdAt: Date;\n}\n\nclass BaseRepository<T extends Entity> {\n    private items: T[] = [];\n\n    save(entity: T): T {\n        this.items.push(entity);\n        return entity;\n    }\n\n    findById(id: number): T | undefined {\n        return this.items.find(item => item.id === id);\n    }\n\n    findAll(): T[] {\n        return this.items;\n    }\n}\n\ninterface User extends Entity {\n    name: string;\n    email: string;\n    role: 'admin' | 'user';\n}\n\ninterface RawUser {\n    id: number;\n    name: string;\n    email: string;\n    role: string;\n    createdAt: string;\n}\n\nclass UserRepository extends BaseRepository<User> {\n    saveFromApi(rawUser: RawUser): User {\n        return this.save(rawUser as unknown as User);\n    }\n}\n\nconst repo = new UserRepository();\n\nasync function syncUsers() {\n    const response = await fetch('/api/users');\n    const users: RawUser[] = await response.json();\n\n    for (const raw of users) {\n        const user = repo.saveFromApi(raw);\n        const daysSinceCreation = Math.floor(\n            (Date.now() - user.createdAt.getTime()) / 86400000\n        );\n        console.log(`User ${user.name} joined ${daysSinceCreation} days ago`);\n    }\n}\n\nsyncUsers();",
      error: "error TS2345: Argument of type 'RawUser' is not assignable to parameter of\ntype 'User'.\n  Types of property 'role' are incompatible.\n    Type 'string' is not assignable to type '\"admin\" | \"user\"'.\n --> src/repositories/user.repository.ts:24:21\n  |\n24|         return this.save(rawUser as unknown as User);\n  |                     ^^^^^ (cast suppresses compile error)\n\nRUNTIME ERROR (after forced cast):\nTypeError: user.createdAt.getTime is not a function\n    at syncUsers (/app/services/user.service.ts:12:42)\n    at async Object.<anonymous> (/app/services/user.service.ts:17:1)",
    },
  ],
  cpp: [
    {
      code: "#include <iostream>\n#include <vector>\n#include <string>\n#include <thread>\n#include <chrono>\n#include <algorithm>\n#include <mutex>\n\nstruct Connection {\n    int id;\n    std::string host;\n    bool isAlive;\n    std::chrono::steady_clock::time_point lastUsed;\n};\n\nclass ConnectionPool {\nprivate:\n    std::vector<Connection> connections;\n    std::mutex mtx;\n\npublic:\n    void addConnection(int id, const std::string& host) {\n        std::lock_guard<std::mutex> lock(mtx);\n        connections.push_back({id, host, true,\n            std::chrono::steady_clock::now()});\n    }\n\n    void removeStaleConnections() {\n        for (auto it = connections.begin(); it != connections.end(); ++it) {\n            auto age = std::chrono::steady_clock::now() - it->lastUsed;\n            if (age > std::chrono::seconds(30)) {\n                it = connections.erase(it);\n            }\n        }\n    }\n\n    void sendHeartbeat() {\n        for (auto& conn : connections) {\n            conn.isAlive = ping(conn.host);\n            conn.lastUsed = std::chrono::steady_clock::now();\n        }\n    }\n\n    bool ping(const std::string& host) { return true; }\n};\n\nint main() {\n    ConnectionPool pool;\n    for (int i = 0; i < 100; i++) {\n        pool.addConnection(i, \"db-host-\" + std::to_string(i));\n    }\n\n    std::thread cleanup([&pool]() {\n        while (true) {\n            pool.removeStaleConnections();\n            std::this_thread::sleep_for(std::chrono::seconds(5));\n        }\n    });\n\n    std::thread heartbeat([&pool]() {\n        while (true) {\n            pool.sendHeartbeat();\n            std::this_thread::sleep_for(std::chrono::seconds(2));\n        }\n    });\n\n    cleanup.join();\n    heartbeat.join();\n    return 0;\n}",
      error: "==12345==ERROR: AddressSanitizer: heap-use-after-free on address 0x6020000001c0\nREAD of size 8 at 0x6020000001c0 thread T2\n    #0 0x402a34 in ConnectionPool::sendHeartbeat() connection_pool.cpp:38\n    #1 0x403b12 in main::lambda()::operator()() connection_pool.cpp:57\n    #2 0x7f...  in std::thread::_State_impl...\n\nTHREAD T1 freed 0x6020000001c0 here:\n    #0 0x401f10 in ConnectionPool::removeStaleConnections() connection_pool.cpp:30\n    #1 0x403a44 in main::lambda()::operator()() connection_pool.cpp:51\n\nSUMMARY: AddressSanitizer: heap-use-after-free connection_pool.cpp:38 in\nConnectionPool::sendHeartbeat()\n\nGDB BACKTRACE:\nProgram received signal SIGSEGV, Segmentation fault.\n[Switching to Thread 0x7f... (LWP 12347)]\n0x00007f... in std::vector<Connection>::_M_realloc_insert<Connection>()\n(gdb) bt\n#0  0x00007f... in std::vector<Connection>::_M_realloc_insert<Connection>()\n#1  0x00000000004029ab in ConnectionPool::removeStaleConnections() at connection_pool.cpp:30\n#2  0x0000000000402b44 in <lambda> at connection_pool.cpp:51",
    },
  ],
  java: [
    {
      code: "package com.app.services;\n\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class OrderService {\n\n    @Autowired\n    private PaymentService paymentService;\n\n    public void placeOrder(String orderId, double amount) {\n        System.out.println(\"Placing order: \" + orderId);\n        paymentService.processPayment(orderId, amount);\n    }\n\n    public void handleRefund(String orderId) {\n        System.out.println(\"Handling refund for: \" + orderId);\n    }\n}\n\npackage com.app.services;\n\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.stereotype.Service;\n\n@Service\npublic class PaymentService {\n\n    @Autowired\n    private OrderService orderService;\n\n    public void processPayment(String orderId, double amount) {\n        System.out.println(\"Processing payment of $\" + amount);\n    }\n\n    public void refundPayment(String orderId) {\n        orderService.handleRefund(orderId);\n    }\n}\n\npackage com.app;\n\nimport org.springframework.boot.SpringApplication;\nimport org.springframework.boot.autoconfigure.SpringBootApplication;\n\n@SpringBootApplication\npublic class Application {\n    public static void main(String[] args) {\n        SpringApplication.run(Application.class, args);\n    }\n}",
      error: ".   ____          _            __ _ _\n /\\\\ / ___'_ __ _ _(_)_ __  __ _ \\ \\ \\ \\\n( ( )\\___ | '_ | '_| | '_ \\/ _` | \\ \\ \\ \\\n \\\\/  ___)| |_)| | | | | || (_| |  ) ) ) )\n  '  |____| .__|_| |_|_| |_\\__, | / / / /\n =========|_|==============|___/=/_/_/_/\n\nThe dependencies of some of the beans in the application context form a cycle:\n\norderService -> paymentService -> orderService\n\nAction:\nRelying upon circular references is discouraged and they are prohibited by\ndefault. Update your application to remove the dependency cycle between beans.\nAs a last resort, it may be possible to break the dependency cycle automatically\nby setting spring.main.allow-circular-references to true.\n\n***************************\nAPPLICATION FAILED TO START\n***************************\n\nDescription:\nThe dependencies of some of the beans in the application context form a cycle:\n\ncom.app.services.OrderService defined in file [.../OrderService.class]\n      ↓\ncom.app.services.PaymentService defined in file [.../PaymentService.class]\n      ↑\ncom.app.services.OrderService (original bean)",
    },
  ],
  go: [
    {
      code: "package handlers\n\nimport (\n    \"context\"\n    \"encoding/json\"\n    \"fmt\"\n    \"net/http\"\n    \"time\"\n)\n\ntype ReportResult struct {\n    Data  string `json:\"data\"`\n    Error string `json:\"error,omitempty\"`\n}\n\nfunc GenerateReport(w http.ResponseWriter, r *http.Request) {\n    resultCh := make(chan ReportResult)\n\n    go func() {\n        ctx := context.Background()\n        result, err := runHeavyReport(ctx)\n        if err != nil {\n            resultCh <- ReportResult{Error: err.Error()}\n            return\n        }\n        resultCh <- ReportResult{Data: result}\n    }()\n\n    select {\n    case res := <-resultCh:\n        json.NewEncoder(w).Encode(res)\n    case <-r.Context().Done():\n        http.Error(w, \"request cancelled\", http.StatusRequestTimeout)\n        return\n    }\n}\n\nfunc runHeavyReport(ctx context.Context) (string, error) {\n    for i := 0; i < 10; i++ {\n        select {\n        case <-ctx.Done():\n            return \"\", fmt.Errorf(\"context cancelled: %w\", ctx.Err())\n        case <-time.After(2 * time.Second):\n            fmt.Printf(\"processing step %d\\n\", i)\n        }\n    }\n    return \"report complete\", nil\n}\n\npackage main\n\nimport (\n    \"fmt\"\n    \"handlers\"\n    \"net/http\"\n    \"runtime\"\n    \"time\"\n)\n\nfunc main() {\n    http.HandleFunc(\"/report\", handlers.GenerateReport)\n\n    go func() {\n        for {\n            time.Sleep(5 * time.Second)\n            fmt.Printf(\"[MONITOR] Active goroutines: %d\\n\", runtime.NumGoroutine())\n        }\n    }()\n\n    http.ListenAndServe(\":8080\", nil)\n}",
      error: "[MONITOR] Active goroutines: 3\n[MONITOR] Active goroutines: 3\n# (50 clients connect and immediately cancel)\n[MONITOR] Active goroutines: 53\n[MONITOR] Active goroutines: 103\n[MONITOR] Active goroutines: 153\nprocessing step 0\nprocessing step 1\nprocessing step 2\n... (leaked goroutines running indefinitely)\n\nRUNTIME DETECTION (with goleak in tests):\n--- FAIL: TestGenerateReport (0.01s)\n    goleak: found unexpected goroutines:\n    goroutine 35 [sleep]:\n        time.Sleep(0x77359400)\n            /usr/local/go/src/runtime/time.go:195 +0xd2\n        handlers.runHeavyReport(0x0?, 0xc000012060)\n            /app/handlers/report.go:40 +0x6c\n        handlers.GenerateReport.func1()\n            /app/handlers/report.go:22 +0x45",
    },
  ],
  rust: [
    {
      code: "use actix_web::{web, Error, HttpRequest, HttpResponse};\nuse serde::Deserialize;\nuse sqlx::PgPool;\n\n#[derive(Deserialize)]\npub struct UploadPayload {\n    pub filename: String,\n    pub content: String,\n    pub user_id: i64,\n}\n\npub async fn upload_file(\n    req: HttpRequest,\n    payload: web::Json<UploadPayload>,\n    pool: web::Data<PgPool>,\n) -> Result<HttpResponse, Error> {\n    let filename_ref: &str = &payload.filename;\n    let content_ref: &str = &payload.content;\n\n    let result = sqlx::query!(\n        \"INSERT INTO files (name, content, user_id) VALUES ($1, $2, $3)\",\n        filename_ref,\n        content_ref,\n        payload.user_id\n    )\n    .execute(pool.get_ref())\n    .await\n    .map_err(|e| {\n        actix_web::error::ErrorInternalServerError(e)\n    })?;\n\n    Ok(HttpResponse::Ok().json(serde_json::json!({\n        \"message\": \"Uploaded\",\n        \"rows\": result.rows_affected()\n    })))\n}",
      error: "error[E0597]: `payload` does not live long enough\n  --> src/handlers/upload.rs:19:29\n   |\n14 |     payload: web::Json<UploadPayload>,\n   |     ------- binding `payload` declared here\n...\n19 |     let filename_ref: &str = &payload.filename;\n   |                               ^^^^^^^ borrowed value does not live long enough\n...\n31 |     .await\n   |      ----- await occurs here, with `payload` borrowed\n...\n40 | }\n   | - `payload` dropped here while still borrowed\n\nerror[E0597]: `payload` does not live long enough\n  --> src/handlers/upload.rs:20:29\n   |\n20 |     let content_ref: &str = &payload.content;\n   |                              ^^^^^^^ borrowed value does not live long enough\n\nerror: future cannot be sent between threads safely\n  --> src/handlers/upload.rs:13:1\n   |\n13 | pub async fn upload_file(\n   |              ^^^^^^^^^^^ future is not `Send`\n   |\n   = note: captured value is not `Send` because borrow of\n     non-Send type `str` is held across an `await` point",
    },
  ],
  php: [
    {
      code: "<?php\n\nclass UserRepository {\n    private PDO $db;\n\n    public function __construct(PDO $db) {\n        $this->db = $db;\n    }\n\n    public function findByUsername(string $username): ?array {\n        $sql = \"SELECT * FROM users WHERE username = '$username'\";\n        $stmt = $this->db->query($sql);\n        return $stmt->fetch(PDO::FETCH_ASSOC) ?: null;\n    }\n\n    public function updateProfile(int $id, string $name, string $email): bool {\n        $stmt = $this->db->prepare(\n            \"UPDATE users SET name = ?, email = ?, updated_at = NOW() WHERE id = ?\"\n        );\n        return $stmt->execute([$name, $email]);\n    }\n\n    public function deleteUser(int $id): array {\n        $stmt = $this->db->prepare(\"DELETE FROM users WHERE id = ?\");\n        $stmt->execute([$id]);\n        return $stmt->fetchAll();\n    }\n}\n\n<?php\nrequire 'UserRepository.php';\n\n$pdo = new PDO('mysql:host=localhost;dbname=app', 'root', 'password');\n$repo = new UserRepository($pdo);\n\n$maliciousInput = \"' OR '1'='1\";\n$user = $repo->findByUsername($maliciousInput);\nvar_dump($user);\n\n$repo->updateProfile(1, \"Alice\", \"alice@example.com\");\n\n$deleted = $repo->deleteUser(2);\nvar_dump($deleted);",
      error: "--- findByUsername (SQL Injection) ---\nSQL Executed: SELECT * FROM users WHERE username = '' OR '1'='1'\nResult: Returns ALL users in the table  <- security breach\n\n--- updateProfile (parameter mismatch) ---\nFatal error: Uncaught PDOException: SQLSTATE[HY093]: Invalid parameter number:\nnumber of bound variables does not match number of tokens in\n/app/UserRepository.php:21\nStack trace:\n#0 /app/UserRepository.php(21): PDOStatement->execute(Array)\n#1 /app/index.php(13): UserRepository->updateProfile(1, 'Alice', 'alice@...')\n#2 {main}\n  thrown in /app/UserRepository.php on line 21\n\n--- deleteUser (fetchAll on DELETE) ---\nWarning: PDOStatement::fetchAll(): SQLSTATE[HY000]: General error in\n/app/UserRepository.php on line 28\nStack trace:\n#0 /app/UserRepository.php(28): PDOStatement->fetchAll()\n#1 /app/index.php(17): UserRepository->deleteUser(2)\n#2 {main}",
    },
  ],
  ruby: [
    {
      code: "module Api\n  class OrdersController < ApplicationController\n    def index\n      @orders = Order.all\n\n      result = @orders.map do |order|\n        {\n          id:          order.id,\n          total:       order.total,\n          user_name:   order.user.name,\n          user_city:   order.user.address.city,\n          item_count:  order.line_items.count\n        }\n      end\n\n      render json: result\n    end\n  end\nend\n\nclass Order < ApplicationRecord\n  belongs_to :user\n  has_many   :line_items\nend\n\nclass User < ApplicationRecord\n  has_one  :address\n  has_many :orders\nend",
      error: "--- Rails Server Log (with 500 orders in DB) ---\nStarted GET \"/api/orders\" for 127.0.0.1 at 2024-03-15 11:04:22 +0000\nProcessing by Api::OrdersController#index as JSON\n\n  Order Load (3.2ms)  SELECT \"orders\".* FROM \"orders\"\n\n  User Load (0.4ms)   SELECT \"users\".* FROM \"users\" WHERE \"users\".\"id\" = 1  LIMIT 1\n  Address Load (0.3ms) SELECT \"addresses\".* FROM \"addresses\" WHERE \"addresses\".\"user_id\" = 1 LIMIT 1\n   (0.2ms)  SELECT COUNT(*) FROM \"line_items\" WHERE \"line_items\".\"order_id\" = 1\n\n  User Load (0.4ms)   SELECT \"users\".* FROM \"users\" WHERE \"users\".\"id\" = 2  LIMIT 1\n  Address Load (0.3ms) SELECT \"addresses\".* FROM \"addresses\" WHERE \"addresses\".\"user_id\" = 2 LIMIT 1\n   (0.2ms)  SELECT COUNT(*) FROM \"line_items\" WHERE \"line_items\".\"order_id\" = 2\n  ... (x500 more times)\n\nCompleted 200 OK in 4823ms (Views: 0.3ms | ActiveRecord: 4780.4ms | GC: 312ms)\n\nBULLET GEM ALERT:\n  GET /api/orders\n  USE eager loading detected for:\n    ↳ N+1 Query detected: Order => [:user]          (500 queries)\n    ↳ N+1 Query detected: Order => [user: :address] (500 queries)\n    ↳ N+1 Query detected: Order => [:line_items]    (500 counts)\n  Total extra queries: 1500\n\nMEMORY PROFILER (ruby-prof):\n  Total allocated: 142.8 MB (1,892,340 objects)\n  Retained:         88.3 MB (842,100 objects)\n  Top allocator: Order.all -> ActiveRecord::Result (120.4 MB)",
    },
  ],
  csharp: [
    {
      code: "using Microsoft.AspNetCore.Mvc;\nusing System.Threading.Tasks;\n\n[ApiController]\n[Route(\"api/[controller]\")]\npublic class ReportController : ControllerBase\n{\n    private readonly IReportService _reportService;\n\n    public ReportController(IReportService reportService)\n    {\n        _reportService = reportService;\n    }\n\n    [HttpGet(\"{id}\")]\n    public IActionResult GetReport(int id)\n    {\n        var report = _reportService.GenerateReportAsync(id).Result;\n        return Ok(report);\n    }\n}\n\nusing System.Net.Http;\nusing System.Threading.Tasks;\n\npublic class ReportService : IReportService\n{\n    private readonly HttpClient _httpClient;\n    private readonly IDbContext _db;\n\n    public ReportService(HttpClient httpClient, IDbContext db)\n    {\n        _httpClient = httpClient;\n        _db = db;\n    }\n\n    public async Task<Report> GenerateReportAsync(int id)\n    {\n        var data = await _httpClient.GetStringAsync($\"/data/{id}\");\n        var meta = await _db.Reports.FindAsync(id);\n\n        return new Report {\n            Id = id,\n            Data = data,\n            Title = meta?.Title ?? \"Untitled\"\n        };\n    }\n}",
      error: "GET /api/report/42\n\n[12:05:01.000] Request received: GET /api/report/42\n[12:05:01.001] Calling _reportService.GenerateReportAsync(42).Result\n[12:05:01.002] HttpClient.GetStringAsync started...\n[12:05:01.002] Awaiting continuation on SynchronizationContext...\n...\n[12:06:01.002] (60 seconds later — IIS/Kestrel request timeout)\n\nHTTP/1.1 504 Gateway Timeout\n\nIIS Application Pool Event Log:\n  Warning: A request has been aborted due to timeout (60000ms).\n  Thread pool starvation detected. Queued work items: 48\n  Active threads: 48 / 48 (all blocked)\n  Application pool: DefaultAppPool\n\nVISUAL STUDIO DIAGNOSTIC (Threads Window during hang):\n  Thread 12 (Request Thread) — BLOCKED at:\n    ReportController.GetReport() → Task.Result (waiting for Task)\n  Thread 13 (Async Continuation) — WAITING for:\n    SynchronizationContext (held by Thread 12)\n  → Thread 12 waits for Thread 13\n  → Thread 13 waits for Thread 12\n  → DEADLOCK",
    },
  ],
};

export const SAMPLE_ERROR_POOLS_BY_LANGUAGE: Record<AnalyzeRequestLanguage, SampleErrorPools> = {
  python: { basic: SAMPLE_ERRORS_BY_LANGUAGE.python, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.python },
  javascript: { basic: SAMPLE_ERRORS_BY_LANGUAGE.javascript, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.javascript },
  typescript: { basic: SAMPLE_ERRORS_BY_LANGUAGE.typescript, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.typescript },
  cpp: { basic: SAMPLE_ERRORS_BY_LANGUAGE.cpp, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.cpp },
  java: { basic: SAMPLE_ERRORS_BY_LANGUAGE.java, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.java },
  go: { basic: SAMPLE_ERRORS_BY_LANGUAGE.go, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.go },
  rust: { basic: SAMPLE_ERRORS_BY_LANGUAGE.rust, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.rust },
  php: { basic: SAMPLE_ERRORS_BY_LANGUAGE.php, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.php },
  ruby: { basic: SAMPLE_ERRORS_BY_LANGUAGE.ruby, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.ruby },
  csharp: { basic: SAMPLE_ERRORS_BY_LANGUAGE.csharp, complex: COMPLEX_SAMPLE_ERRORS_BY_LANGUAGE.csharp },
};

function getSampleKey(sample: Pick<SampleError, "code" | "error">): string {
  return `${sample.code}:::${sample.error}`;
}

function pickRandomSample(
  samples: SampleError[],
  poolType: "basic" | "complex",
  excludeSampleKey?: string,
): SampleErrorSelection | null {
  if (samples.length === 0) {
    return null;
  }

  let selectedIndex = Math.floor(Math.random() * samples.length);

  if (samples.length > 1 && excludeSampleKey) {
    let attempts = 0;
    while (getSampleKey(samples[selectedIndex]) === excludeSampleKey && attempts < samples.length * 2) {
      selectedIndex = Math.floor(Math.random() * samples.length);
      attempts += 1;
    }
  }

  const selectedSample = samples[selectedIndex];
  if (!selectedSample) {
    return null;
  }

  return {
    ...selectedSample,
    index: selectedIndex,
    poolType,
  };
}

export function getRandomSampleError(
  language: AnalyzeRequestLanguage,
  previousSampleKey?: string,
): SampleErrorSelection | null {
  const pools = SAMPLE_ERROR_POOLS_BY_LANGUAGE[language];
  if (!pools) {
    return null;
  }

  const { basic, complex } = pools;

  if (basic.length === 0 && complex.length === 0) {
    return null;
  }

  if (complex.length === 0) {
    return pickRandomSample(basic, "basic", previousSampleKey);
  }

  if (basic.length === 0) {
    return pickRandomSample(complex, "complex", previousSampleKey);
  }

  const useComplexPool = Math.random() < 0.75;
  const preferredPool = useComplexPool ? complex : basic;
  const preferredPoolType = useComplexPool ? "complex" : "basic";
  const fallbackPool = useComplexPool ? basic : complex;
  const fallbackPoolType = useComplexPool ? "basic" : "complex";

  const preferredSample = pickRandomSample(preferredPool, preferredPoolType, previousSampleKey);
  if (preferredSample && getSampleKey(preferredSample) !== previousSampleKey) {
    return preferredSample;
  }

  return pickRandomSample(fallbackPool, fallbackPoolType, previousSampleKey) ?? preferredSample;
}
