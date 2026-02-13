import { toLink } from "$lib/utils";
import type { Component } from "svelte";
import {
	GraduationCap, Binary, Cpu, Calculator, Sigma, Grid3x3,
	Infinity, Brain, Workflow, Terminal, Shield, Dices,
	Server, Code, Cog, Bot
} from '@lucide/svelte';

type category = Exclude<typeof categories[number]['id'], 'all'>;

interface ProtoCourse {
	title: string;
	description: string;
	category: category;
    status: 'Released' | 'Planned';
}

export interface Course extends ProtoCourse {
	id: number;
    slug: string;
}

export interface CourseChapter {
	id: number;
	name: string;
	description: string;
	section: number;
	header: string;      // "Lesson", "Lab", "Quiz", etc.
	released: boolean;
}

export interface CourseSection {
	section: number;
	name: string;
}

export interface CourseDetails {
	sections: CourseSection[];
	chapters: CourseChapter[];
}

export interface CourseWithDetails extends Course {
	details?: CourseDetails;
}

export const categories = [
    { id: 'all', label: 'All Courses' },
    { id: 'core-cs', label: 'Core CS' },
    { id: 'systems', label: 'Systems' },
    { id: 'mathematics', label: 'Math' },
    { id: 'theory', label: 'Theory' }
] as const;

export const iconConfig: Record<string, Component> = {
    'introduction-to-computer-science': GraduationCap,
    'introduction-to-data-structures-and-algorithms': Binary,
    'introduction-to-computer-organization': Cpu,
    'single-variable-calculus': Calculator,
    'multivariable-calculus': Sigma,
    'linear-algebra': Grid3x3,
    'discrete-math': Infinity,
    'theory-of-computation': Brain,
    'software-engineering': Workflow,
    'systems-programming': Terminal,
    'introduction-to-cybersecurity': Shield,
    'introduction-to-probability': Dices,
    'operating-systems': Server,
    'programming-languages': Code,
    'introduction-to-compilers': Cog,
    'introduction-to-artificial-intelligence': Bot
};

// Course details for Introduction to Computer Science
const introToCSDetails: CourseDetails = {
	sections: [
		"Getting Started",
		"Unit 1: Variables, Operators, and Functions",
		"Unit 2: Conditionals and Iteration",
		"Unit 3: More Functions, Scoping, and Abstraction",
		"Unit 4: Data Structures and Mutability",
		"Unit 5: Algorithms and Testing",
		"Unit 6: Object Oriented Programming",
		"Unit 7: Libraries, Exceptions, and Virtual Environments",
		"Unit 8: Working with Files",
		"Unit 9: Async and APIs",
		"Unit 10: Et. Cetera",
		"Project Submission and Course Completion"
	].map((name, i) => ({ section: i, name })),
	chapters: [
		// Section 0: Getting Started
		{
			name: "Course Information",
			description: "Introduces the course structure, learning objectives, and the prerequisites needed to get started.",
			section: 0,
			header: "Getting Started",
			released: true
		},
		{
			name: "Setting Up Your Development Environment",
			description: "Learn how to prepare your computer for programming by installing essential tools and configuring your environment for a smooth start.",
			section: 0,
			header: "Getting Started",
			released: true
		},

		// Section 1: Unit 1 - Variables, Operators, and Functions
		{
			name: "Python",
			description: "Introduces the Python programming language. You'll learn how to use it, how it works, and why it's one of the most widely used languages in computer science.",
			section: 1,
			header: "Lesson",
			released: true
		},
		{
			name: "Functions, Variables, and Operators",
			description: "Explore how to use functions to execute commands, and how to use variables to store and manage data.",
			section: 1,
			header: "Lesson",
			released: true
		},
		{
			name: "Typing, Comments, and More",
			description: "Learn to use typing, comments, and other tools to make your code easier to read and debug.",
			section: 1,
			header: "Lesson",
			released: true
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 1,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 1,
			header: "Problem Set",
			released: false
		},

		// Section 2: Unit 2 - Conditionals and Iteration
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 2,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 2,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 2,
			header: "Problem Set",
			released: false
		},

		// Section 3: Unit 3 - More Functions, Scoping, and Abstraction
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 3,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 3,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 3,
			header: "Problem Set",
			released: false
		},

		// Section 4: Unit 4 - Data Structures and Mutability
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 4,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 4,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 4,
			header: "Problem Set",
			released: false
		},

		// Section 5: Unit 5 - Algorithms and Testing
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 5,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 5,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 5,
			header: "Problem Set",
			released: false
		},

		// Section 6: Unit 6 - Object Oriented Programming
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 6,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 6,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 6,
			header: "Problem Set",
			released: false
		},

		// Section 7: Unit 7 - Libraries, Exceptions, and Virtual Environments
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 7,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 7,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 7,
			header: "Problem Set",
			released: false
		},

		// Section 8: Unit 8 - Working with Files
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 8,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 8,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 8,
			header: "Problem Set",
			released: false
		},

		// Section 9: Unit 9 - Async and APIs
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 9,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 9,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 9,
			header: "Problem Set",
			released: false
		},

		// Section 10: Unit 10 - Et. Cetera
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 10,
			header: "Lab",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 10,
			header: "Lesson",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 10,
			header: "Problem Set",
			released: false
		},

		// Section 11: Project Submission and Course Completion
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 11,
			header: "Conclusion",
			released: false
		},
		{
			name: "Name Not Applicable",
			description: "This description does not exist and is purely meant as a placeholder. I'm looking forward to actually writting and recording everything for this course!",
			section: 11,
			header: "Project",
			released: false
		}
	].map((chapter, i) => ({ id: i, ...chapter }))
};

export const courses: CourseWithDetails[] = ([
	{
		title: 'Introduction to Computer Science',
		description:
			'Build a strong foundation in programming fundamentals, problem-solving strategies, and computational thinking. Learn core concepts through hands-on coding exercises and real-world applications.',
		category: 'core-cs',
        status: 'Released',
		details: introToCSDetails
	},
	{
		title: 'Introduction to Data Structures and Algorithms',
		description:
			'Master essential data structures including arrays, linked lists, trees, and graphs. Develop algorithmic thinking through sorting, searching, and optimization techniques critical for technical interviews and software development.',
		category: 'core-cs',
        status: 'Planned'
	},
	{
		title: 'Introduction to Computer Organization',
		description:
			'Explore how computers work at the hardware level, from logic gates to processors. Understand assembly language, memory hierarchies, and system architecture to write more efficient code.',
		category: 'systems',
        status: 'Planned'
	},
	{
		title: 'Single Variable Calculus',
		description:
			'Study limits, derivatives, and integrals with applications to computer science. Learn optimization techniques and mathematical reasoning essential for algorithm analysis and machine learning.',
		category: 'mathematics',
        status: 'Planned'
	},
	{
		title: 'Multivariable Calculus',
		description:
			'Extend calculus concepts to functions of multiple variables. Master vector calculus, partial derivatives, and multiple integrals crucial for computer graphics, optimization, and data science.',
		category: 'mathematics',
        status: 'Planned'
	},
	{
		title: 'Linear Algebra',
		description:
			'Develop expertise in matrices, vector spaces, and linear transformations. Apply these concepts to computer graphics, machine learning models, and quantum computing algorithms.',
		category: 'mathematics',
        status: 'Planned'
	},
	{
		title: 'Discrete Math',
		description:
			'Study the mathematical foundations of computer science including logic, set theory, combinatorics, and graph theory. Build proof-writing skills essential for algorithm design and verification.',
		category: 'mathematics',
        status: 'Planned'
	},
	{
		title: 'Theory of Computation',
		description:
			'Investigate the theoretical limits of computation through automata theory, formal languages, and complexity classes. Understand what problems can and cannot be solved algorithmically.',
		category: 'theory',
        status: 'Planned'
	},
	{
		title: 'Software Engineering',
		description:
			'Learn professional software development practices including design patterns, testing methodologies, and agile workflows. Develop skills for building scalable, maintainable systems in team environments.',
		category: 'core-cs',
        status: 'Planned'
	},
	{
		title: 'Systems Programming',
		description:
			'Master low-level programming with C and systems-level concepts. Work directly with memory management, system calls, and concurrent programming to build high-performance applications.',
		category: 'systems',
        status: 'Planned'
	},
	{
		title: 'Introduction to CyberSecurity',
		description:
			'Learn security principles, cryptographic protocols, and threat analysis techniques. Understand common vulnerabilities and develop skills to build secure systems and protect against cyber attacks.',
		category: 'systems',
        status: 'Planned'
	},
	{
		title: 'Introduction to Probability',
		description:
			'Study probability theory, random variables, and statistical inference. Apply probabilistic reasoning to algorithm analysis, machine learning, and decision-making under uncertainty.',
		category: 'mathematics',
        status: 'Planned'
	},
	{
		title: 'Operating Systems',
		description:
			'Understand how operating systems manage hardware resources and provide services to applications. Explore process scheduling, memory management, file systems, and concurrency control mechanisms.',
		category: 'systems',
        status: 'Planned'
	},
	{
		title: 'Programming Languages',
		description:
			'Analyze different programming paradigms and language design principles. Study syntax, semantics, type systems, and runtime environments to become a more versatile programmer.',
		category: 'theory',
        status: 'Planned'
	},
	{
		title: 'Introduction to Compilers',
		description:
			'Discover how programming languages are translated into executable code. Learn lexical analysis, parsing techniques, optimization strategies, and code generation for modern compilers.',
		category: 'theory',
        status: 'Planned'
	},
	{
		title: 'Introduction to Artificial Intelligence',
		description:
			'Explore intelligent agent design, search algorithms, and machine learning fundamentals. Build AI systems that can reason, learn from data, and solve complex real-world problems.',
		category: 'theory',
        status: 'Planned'
	}
] as ProtoCourse[]).map((course, id) => {
    return {
        id,
        slug: toLink(course.title),
        ...course
    }
});

// Helper functions for course data access
export function getCourseBySlug(slug: string): CourseWithDetails | undefined {
	return courses.find(c => c.slug === slug);
}

export function getDetailedCourse(slug: string): CourseWithDetails | null {
	const course = getCourseBySlug(slug);
	if (!course || !course.details) return null;
	return course;
}
