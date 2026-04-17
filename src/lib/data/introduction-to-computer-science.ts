import type { CourseAssignment, CourseChapter, CourseSection } from './courses';

const sections: CourseSection[] = [
	"Getting Started",
	"Unit 1: Variables, Operators, and Functions",
	"Unit 2: Conditionals, Loops, and Collections",
	"Unit 3: Exceptions",
	"Unit 4: Testing",
	"Unit 5: Object-Oriented Programming",
	"Unit 6: File I/O",
	"Unit 7: Regular Expressions",
	"Unit 8: Et Cetera",
].map((name, i) => ({ id: i, name }));

const chapters: CourseChapter[] = ([
	// Getting Started
	{
		name: "Course Information",
		description: "Introduces the course structure, learning objectives, and the prerequisites needed to get started.",
		section: 0,
		header: "Getting Started",
		released: true,
		order: 0
	},
	{
		name: "Setting Up Your Development Environment",
		description: "Learn how to prepare your computer for programming by installing essential tools and configuring your environment for a smooth start.",
		section: 0,
		header: "Getting Started",
		released: true,
		order: 1
	},

	// Unit 1: Variables, Operators, and Functions
	{
		name: "Python",
		description: "Introduces the Python programming language. You'll learn how to use it, how it works, and why it's one of the most widely used languages in computer science.",
		section: 1,
		header: "Lesson",
		released: true,
		order: 0
	},
	{
		name: "Functions and Variables",
		description: "Write your first Python programs using the print and input functions, learn how to store values in variables, and understand how to read and fix bugs when things go wrong.",
		section: 1,
		header: "Lesson",
		released: true,
		order: 1
	},
	{
		name: "Strings and Numbers",
		description: "Go deeper with strings using comments, f-strings, and built-in methods. Explore integers and floats, then learn how to define your own functions and return values from them.",
		section: 1,
		header: "Lesson",
		released: true,
		order: 2
	},
	{
		name: "Your Own Functions",
		description: "Learn to define your own functions with the def keyword, add parameters and default values, organise programs with a main function, and return values back to callers.",
		section: 1,
		header: "Lesson",
		released: true,
		order: 3
	},

	// Unit 2: Conditionals and Iteration
	{
		name: "Conditionals",
		description: "Learn how to make decisions in Python using if, elif, and else statements, and combine conditions with the and and or operators.",
		section: 2,
		header: "Lesson",
		released: true,
		order: 0
	},
	{
		name: "Modulo, Functions, and match",
		description: "Use the modulo operator to check parity, write cleaner Boolean-returning functions, discover Pythonic style, and learn Python's match statement for handling multiple cases.",
		section: 2,
		header: "Lesson",
		released: true,
		order: 1
	},
	{
		name: "Loops",
		description: "Learn how to repeat code using while and for loops, control loop flow with break and continue, and validate user input through iteration.",
		section: 2,
		header: "Lesson",
		released: true,
		order: 2
	},
	{
		name: "Lists and Dictionaries",
		description: "Explore Python's list and dict data structures—iterate over collections, look up values by key, and store rich, nested data.",
		section: 2,
		header: "Lesson",
		released: true,
		order: 3
	},

	// Unit 3: Exceptions
	{
		name: "Exceptions",
		description: "Learn how to handle errors gracefully in Python using try, except, else, and pass—and build robust functions that keep asking until they get valid input.",
		section: 3,
		header: "Lesson",
		released: true,
		order: 0
	},

	// Unit 4: Testing
	{
		name: "Unit Tests",
		description: "Learn how to test your Python programs using assert and the pytest framework—write test functions, catch errors, test edge cases, and organize tests into folders.",
		section: 4,
		header: "Lesson",
		released: true,
		order: 0
	},

	// Unit 5: Object-Oriented Programming
	{
		name: "Object-Oriented Programming",
		description: "Learn how to design custom data types using classes, constructors, properties, class methods, inheritance, and operator overloading in Python.",
		section: 5,
		header: "Lesson",
		released: true,
		order: 0
	},
	{
		name: "Advanced Object-Oriented Programming",
		description: "Go deeper with OOP: use class methods as factory constructors, understand static methods, model hierarchies with inheritance and super(), and overload operators with dunder methods.",
		section: 5,
		header: "Lesson",
		released: true,
		order: 1
	},

	// Unit 6: File I/O
	{
		name: "File I/O",
		description: "Learn how to persist data beyond a program's lifetime by reading and writing text files, CSV files, and binary files using Python's built-in open function, the with keyword, the csv module, and the PIL library.",
		section: 6,
		header: "Lesson",
		released: true,
		order: 0
	},

	// Unit 7: Regular Expressions
	{
		name: "Regular Expressions",
		description: "Learn how to use Python's re module to validate, clean up, and extract user input using regular expression patterns—covering special symbols, flags, groups, and practical examples.",
		section: 7,
		header: "Lesson",
		released: true,
		order: 0
	},
	{
		name: "Regex in Practice",
		description: "Apply regular expressions to real problems: use flags for case-insensitive matching, clean up messy user input with capturing groups and the walrus operator, and extract data with re.sub and re.search.",
		section: 7,
		header: "Lesson",
		released: true,
		order: 1
	},

	// Unit 8: Et Cetera
	{
		name: "Et Cetera",
		description: "Explore Python's miscellaneous features: sets, global and constant conventions, type hints, docstrings, and argparse for command-line arguments.",
		section: 8,
		header: "Lesson",
		released: true,
		order: 0
	},
	{
		name: "Functional Python",
		description: "Master Python's functional tools: unpack sequences and dicts into arguments, write variadic functions with *args and **kwargs, and transform data elegantly with map, filter, and comprehensions.",
		section: 8,
		header: "Lesson",
		released: true,
		order: 1
	},
	{
		name: "Advanced Iteration",
		description: "Round out your Python toolkit with enumerate for index-value loops, and generators with yield for memory-efficient iteration over large sequences.",
		section: 8,
		header: "Lesson",
		released: true,
		order: 2
	}
] as Omit<CourseChapter, 'id'>[]).map((item, i) => ({ id: i, ...item }));

const assignments: CourseAssignment[] = ([
	// Unit 1: Variables, Operators, and Functions
	{
		name: "Problem Set 1",
		description: "This is meant to get you comfortable writing, checking, and submitting code.",
		section: 1,
		header: "Problem Set",
		released: true,
		order: 4,
		submissionId: "camel.py"
	},

	// Unit 2: Conditionals and Iteration
	{
		name: "Problem Set 2",
		description: "Use conditionals and iteration to control the flow of your programs and solve each problem.",
		section: 2,
		header: "Problem Set",
		released: true,
		order: 1,
		submissionId: "mario.py"
	},

	// Unit 3: Exceptions
	{
		name: "Problem Set 3",
		description: "Handle invalid input gracefully using exceptions to build robust, user-friendly programs.",
		section: 3,
		header: "Problem Set",
		released: true,
		order: 1,
		submissionId: "fuel.py"
	},

	// Unit 5: Object-Oriented Programming
	{
		name: "Problem Set 4",
		description: "Design a class with properties and methods to model real-world data using object-oriented programming.",
		section: 5,
		header: "Problem Set",
		released: true,
		order: 2,
		submissionId: "seasons.py"
	},

	// Unit 6: File I/O
	{
		name: "Problem Set 5",
		description: "Read and transform a CSV file, then write the cleaned data to a new file using Python's csv module.",
		section: 6,
		header: "Problem Set",
		released: true,
		order: 1,
		submissionId: "scourgify.py"
	},

	// Unit 7: Regular Expressions
	{
		name: "Problem Set 6",
		description: "Validate structured input using regular expressions and the re module.",
		section: 7,
		header: "Problem Set",
		released: true,
		order: 2,
		submissionId: "numb3rs.py"
	},

	// Unit 8: Et Cetera
	{
		name: "Problem Set 7",
		description: "Build a command-line tool that accepts arguments via sys.argv and processes a Python source file.",
		section: 8,
		header: "Problem Set",
		released: true,
		order: 3,
		submissionId: "lines.py"
	},
] as Omit<CourseAssignment, 'id'>[]).map((item, i) => ({ id: i, ...item }));

export const introToCSDetails: { sections: CourseSection[]; chapters: CourseChapter[]; assignments: CourseAssignment[] } = {
	sections,
	chapters,
	assignments
};
