export class RecommendationEngine {
  /**
   * Calculate program match score based on RIASEC profile
   */
  static calculateProgramMatch(userScores, program) {
    let totalScore = 0;
    let weights = 0;
    program.riasecMatch.forEach(match => {
      const userScore = userScores[match.type.toLowerCase()];
      totalScore += userScore * match.score;
      weights += match.score;
    });
    return weights > 0 ? totalScore / weights * 100 : 0;
  }

  /**
   * Generate program recommendations
   */
  static recommendPrograms(userScores, programs, limit = 10) {
    const scored = programs.map(program => {
      const matchScore = this.calculateProgramMatch(userScores, program);
      const riasecAlignment = this.calculateRIASECAlignment(userScores, program);
      return {
        programId: program.id,
        matchScore,
        riasecAlignment,
        reasons: this.generateProgramReasons(userScores, program, matchScore)
      };
    });
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Calculate RIASEC alignment percentage
   */
  static calculateRIASECAlignment(userScores, program) {
    const topUserTypes = this.getTopRIASECTypes(userScores, 3);
    const programTypes = program.riasecMatch.map(m => m.type.toLowerCase());
    const matches = topUserTypes.filter(type => programTypes.includes(type)).length;
    return matches / topUserTypes.length * 100;
  }

  /**
   * Get top N RIASEC types for user
   */
  static getTopRIASECTypes(scores, count) {
    const entries = Object.entries(scores);
    return entries.sort(([, a], [, b]) => b - a).slice(0, count).map(([type]) => type);
  }

  /**
   * Generate reasons for program recommendation
   */
  static generateProgramReasons(userScores, program, matchScore) {
    const reasons = [];
    const topTypes = this.getTopRIASECTypes(userScores, 2);
    topTypes.forEach(type => {
      const match = program.riasecMatch.find(m => m.type.toLowerCase() === type);
      if (match) {
        reasons.push(`Strong ${type} personality match (${Math.round(match.score * 100)}%)`);
      }
    });
    if (program.jobGrowth > 10) {
      reasons.push(`High job growth rate (${program.jobGrowth}%)`);
    }
    if (matchScore > 85) {
      reasons.push("Excellent overall match for your profile");
    }
    return reasons.slice(0, 3);
  }

  /**
   * Recommend universities based on programs and preferences
   */
  static recommendUniversities(recommendedPrograms, universities, preferences, limit = 10) {
    const programIds = recommendedPrograms.map(p => p.programId);
    const scored = universities.filter(uni => {
      if (preferences?.location && !uni.location.includes(preferences.location)) {
        return false;
      }
      if (preferences?.maxFee && uni.fee.max > preferences.maxFee) {
        return false;
      }
      if (preferences?.type && uni.type !== preferences.type) {
        return false;
      }
      return uni.programs.some(p => programIds.includes(p));
    }).map(uni => {
      const matchingPrograms = uni.programs.filter(p => programIds.includes(p));
      const matchScore = matchingPrograms.length / programIds.length * 100;
      return {
        universityId: uni.id,
        matchScore,
        reasons: this.generateUniversityReasons(uni, matchingPrograms.length)
      };
    });
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Generate reasons for university recommendation
   */
  static generateUniversityReasons(university, matchingProgramsCount) {
    const reasons = [];
    if (matchingProgramsCount > 3) {
      reasons.push(`Offers ${matchingProgramsCount} matching programs`);
    }
    if (university.ranking <= 50) {
      reasons.push(`Top-ranked university (#${university.ranking})`);
    }
    if (university.acceptanceRate < 30) {
      reasons.push("Highly selective institution");
    }
    return reasons.slice(0, 3);
  }

  /**
   * Recommend careers based on RIASEC profile
   */
  static recommendCareers(userScores, careers, limit = 10) {
    const topUserTypes = this.getTopRIASECTypes(userScores, 3);
    const scored = careers.map(career => {
      const matches = career.riasecProfile.filter(type => topUserTypes.includes(type.toLowerCase())).length;
      const matchScore = matches / topUserTypes.length * 100;
      const salaryMatch = this.calculateSalaryMatch(career);
      return {
        careerId: career.id,
        matchScore,
        salaryMatch,
        reasons: this.generateCareerReasons(career, matches, matchScore)
      };
    });
    return scored.sort((a, b) => b.matchScore - a.matchScore).slice(0, limit);
  }

  /**
   * Calculate salary attractiveness (normalized)
   */
  static calculateSalaryMatch(career) {
    const avgSalary = (career.salary.min + career.salary.max) / 2;
    return Math.min(avgSalary / 200000 * 100, 100);
  }

  /**
   * Generate reasons for career recommendation
   */
  static generateCareerReasons(career, matches, matchScore) {
    const reasons = [];
    if (matchScore > 80) {
      reasons.push(`Excellent personality fit (${matches} RIASEC matches)`);
    }
    if (career.growth > 15) {
      reasons.push(`Strong growth potential (${career.growth}%)`);
    }
    if (career.demand === "High") {
      reasons.push("High market demand");
    }
    const avgSalary = (career.salary.min + career.salary.max) / 2;
    if (avgSalary > 100000) {
      reasons.push(`Competitive salary range`);
    }
    return reasons.slice(0, 3);
  }
}