import groq from "../config/groq.js";

export const evaluateResume = async (extractedText: string) => {
  const prompt = `
You are an expert ATS (Applicant Tracking System) specialist and resume coach.
Analyse the resume below and return ONLY valid JSON — no explanation, no markdown, no backticks.

RESUME TEXT:
${extractedText}

Return this exact JSON structure:
{
  "atsScore": <0-100 integer>,
  "grammarScore": <0-100 integer>,
  "clarityScore": <0-100 integer>,
  "keywordScore": <0-100 integer>,
  "overallScore": <0-100 integer>,
  "experienceYears": <integer or null>,
  "skills": ["skill1", "skill2"],
  "experience": [
    { "company": "", "role": "", "duration": "" }
  ],
  "education": [
    { "degree": "", "institution": "", "year": "" }
  ],
  "strengths": ["strength1", "strength2"],
  "weaknesses": ["weakness1", "weakness2"],
  "suggestions": [
    {
      "type": "bullet | keyword | grammar | structure | missing_section",
      "priority": "high | medium | low",
      "original": "original text or section name",
      "improved": "improved version",
      "reason": "why this change improves ATS ranking"
    }
  ],
  "verdict": "<2-3 sentence overall summary of the resume quality>"
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  const raw = completion.choices[0].message.content || "";
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};

export const matchResumeToJob = async (
  extractedText: string,
  jobDescription: string,
) => {
  const prompt = `
You are an expert recruiter and ATS specialist.
Compare the resume against the job description below and return ONLY valid JSON — no explanation, no markdown, no backticks.

RESUME TEXT:
${extractedText}

JOB DESCRIPTION:
${jobDescription}

Return this exact JSON structure:
{
  "matchScore": <0-100 integer, how well the resume fits the job>,
  "matchLevel": "excellent | good | moderate | poor",
  "matchedSkills": ["skill1", "skill2"],
  "missingSkills": ["skill1", "skill2"],
  "matchedKeywords": ["keyword1", "keyword2"],
  "missingKeywords": ["keyword1", "keyword2"],
  "experienceMatch": {
    "required": "<what the JD requires>",
    "candidate": "<what the resume shows>",
    "matched": true | false
  },
  "educationMatch": {
    "required": "<what the JD requires>",
    "candidate": "<what the resume shows>",
    "matched": true | false
  },
  "sectionFeedback": [
    {
      "section": "Skills | Experience | Education | Summary",
      "status": "strong | average | weak",
      "comment": "specific feedback for this section against the JD"
    }
  ],
  "suggestions": [
    {
      "priority": "high | medium | low",
      "action": "what the candidate should add or change to match this JD better"
    }
  ],
  "verdict": "<2-3 sentence summary of how well this candidate fits the role>"
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });

  const raw = completion.choices[0].message.content || "";
  const cleaned = raw.replace(/```json|```/g, "").trim();
  return JSON.parse(cleaned);
};
