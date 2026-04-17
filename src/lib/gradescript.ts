import { GRADESCRIPT_URL } from "$env/static/private";

export interface GradeCheck {
	id: number;
	check: string;
	description: string;
	passed: boolean;
	error_message: string;
}

export interface GradeResult {
	score: string;
	checks: GradeCheck[];
}

export async function checkAssignment(problemName: string, file: File): Promise<GradeResult> {
	const formData = new FormData();
	formData.append("file", file);

	const response = await fetch(`${GRADESCRIPT_URL}/check/${problemName}`, {
		method: "POST",
		body: formData,
	});

	if (!response.ok) {
		const error = await response.json().catch(() => ({ detail: "Unknown error" }));
        console.error(`Grading service failed for ${problemName}:`, error.detail);
		throw new Error(error.detail ?? `Failed to check assignment. Please try again later.`);
	}

	return await response.json() as GradeResult;
}
