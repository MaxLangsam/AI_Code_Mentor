
export function getDefaultCode(language: string): string {
  switch (language.toLowerCase()) {
    case 'javascript':
      return `// Welcome to the JavaScript Playground!
console.log("Hello, World!");

// Try some basic operations
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2);
console.log("Doubled numbers:", doubled);

// Function example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Fibonacci(10):", fibonacci(10));`;

    case 'python':
      return `# Welcome to the Python Playground!
print("Hello, World!")

# Try some basic operations
numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print("Doubled numbers:", doubled)

# Function example
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Fibonacci(10):", fibonacci(10))`;

    case 'java':
      return `// Welcome to the Java Playground!
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
        
        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        System.out.print("Numbers: ");
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Method example
        System.out.println("Fibonacci(10): " + fibonacci(10));
    }
    
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }
}`;

    default:
      return `// Welcome to the ${language} Playground!
// Write your ${language} code here and click Run to execute it

console.log("Hello, World!");`;
  }
}

export function getFileExtension(language: string): string {
  switch (language.toLowerCase()) {
    case 'javascript': return 'js';
    case 'python': return 'py';
    case 'java': return 'java';
    case 'typescript': return 'ts';
    case 'c++': return 'cpp';
    case 'c': return 'c';
    default: return 'txt';
  }
}
