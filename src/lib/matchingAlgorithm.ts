export interface CandidateProfile {
  id?: string;
  first_name: string;
  last_name: string;
  title: string;
  sector: string;
  experience_years: number;
  availability?: string;
  skills: string[];
  languages: string[];
  summary?: string;
  cv_url?: string;
}

export interface JobOffer {
  id?: string;
  company_name: string;
  title: string;
  sector: string;
  contract_type?: string;
  location?: string;
  salary?: string;
  description?: string;
  requirements: string[];
}

export interface MatchResult {
  score: number; // 0 to 100
  breakdown: {
    sectorScore: number; // Max 30
    skillsScore: number; // Max 50
    experienceScore: number; // Max 20
  };
}

/**
 * Calculates a matching score between a Candidate and a Job Offer.
 * Returns a score from 0 to 100.
 */
export function calculateMatchScore(candidate: CandidateProfile, job: JobOffer): MatchResult {
  let sectorScore = 0;
  let skillsScore = 0;
  let experienceScore = 0;

  // 1. Sector Match (Max 30)
  if (candidate.sector && job.sector) {
    if (candidate.sector.toLowerCase().trim() === job.sector.toLowerCase().trim()) {
      sectorScore = 30;
    } else {
      // Basic partial match (e.g. "Tech" vs "Technology")
      if (candidate.sector.toLowerCase().includes(job.sector.toLowerCase()) || 
          job.sector.toLowerCase().includes(candidate.sector.toLowerCase())) {
        sectorScore = 15;
      }
    }
  }

  // 2. Skills Match (Max 50)
  // We check how many of the job requirements are met by the candidate's skills or summary
  if (job.requirements && job.requirements.length > 0) {
    let matchedRequirements = 0;
    const candidateText = [...(candidate.skills || []), candidate.summary || '', candidate.title || ''].join(' ').toLowerCase();
    
    job.requirements.forEach(req => {
      const reqLower = req.toLowerCase();
      // Simple word match logic
      if (candidateText.includes(reqLower)) {
        matchedRequirements++;
      } else {
        // Break requirement into words and see if any significant word matches
        const words = reqLower.split(/[\s,]+/);
        const hasPartialMatch = words.some(w => w.length > 3 && candidateText.includes(w));
        if (hasPartialMatch) matchedRequirements += 0.5;
      }
    });

    skillsScore = Math.min(50, Math.round((matchedRequirements / job.requirements.length) * 50));
  } else {
    // If no specific requirements are listed, use Title text matching as fallback
    const titleMatch = (candidate.title || '').toLowerCase().includes((job.title || '').toLowerCase()) || 
                       (job.title || '').toLowerCase().includes((candidate.title || '').toLowerCase());
    skillsScore = titleMatch ? 40 : 10;
  }

  // 3. Experience Match (Max 20)
  // We assume job description might contain terms like "junior", "senior", "X ans d'expérience"
  // For a robust implementation, this would require parsed min_experience on the JobOffer object.
  // Here we do a heuristic based on candidate experience
  const jobText = `${job.title} ${job.description} ${(job.requirements || []).join(' ')}`.toLowerCase();
  
  let requiredYears = 0;
  const yearMatch = jobText.match(/(\d+)\s*(ans? d'exp|années? d'exp)/);
  if (yearMatch) {
    requiredYears = parseInt(yearMatch[1], 10);
  } else if (jobText.includes('senior') || jobText.includes('confirmé')) {
    requiredYears = 5;
  } else if (jobText.includes('junior') || jobText.includes('débutant')) {
    requiredYears = 0;
  }

  if (candidate.experience_years >= requiredYears) {
    experienceScore = 20; // Meets or exceeds requirements
  } else {
    // Penalize proportionally, but keep a minimum if they have some experience
    const deficit = requiredYears - candidate.experience_years;
    experienceScore = Math.max(0, 20 - (deficit * 5)); 
  }

  const totalScore = sectorScore + skillsScore + experienceScore;

  return {
    score: Math.min(100, Math.max(0, totalScore)),
    breakdown: {
      sectorScore,
      skillsScore,
      experienceScore
    }
  };
}
