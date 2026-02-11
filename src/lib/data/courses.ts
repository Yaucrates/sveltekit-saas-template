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

export const courses: Course[] = ([
	{
		title: 'Introduction to Computer Science',
		description:
			'Build a strong foundation in programming fundamentals, problem-solving strategies, and computational thinking. Learn core concepts through hands-on coding exercises and real-world applications.',
		category: 'core-cs',
        status: 'Released'
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
