import { University } from '../models/University.js';

const extractNumericFee = (value) => {
  if (!value) return null;
  const normalized = String(value).replace(/,/g, '');
  const matched = normalized.match(/\d+(\.\d+)?/);
  return matched ? Number(matched[0]) : null;
};

const formatFeeRange = (fees) => {
  if (!fees.length) return null;
  const min = Math.min(...fees);
  const max = Math.max(...fees);
  if (min === max) return `PKR ${min.toLocaleString()}/semester`;
  return `PKR ${min.toLocaleString()} - ${max.toLocaleString()}/semester`;
};

export const listUniversities = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const universities = await University.find({}, 'name apiName location type affiliation totalStudents coordinates programs')
      .skip(skip)
      .limit(limit)
      .lean();

    const mappedUniversities = universities.map((uni) => {
      const programs = Array.isArray(uni.programs) ? uni.programs : [];
      const fees = programs
        .map(program => extractNumericFee(program.feePerSemester))
        .filter(fee => typeof fee === 'number' && Number.isFinite(fee));

      return {
        ...uni,
        tuitionFeeRange: formatFeeRange(fees),
        programCount: programs.length,
        programsSample: programs
          .map((program) => program.name)
          .filter(Boolean)
          .slice(0, 3)
      };
    });

    const total = await University.countDocuments();

    res.json({
      universities: mappedUniversities,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalCount: total
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch universities' });
  }
};

export const getUniversityPrograms = async (req, res) => {
  try {
    const { id } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Check if valid ObjectId
    let query = {};
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query = { _id: id };
    } else {
      // Escape special characters for regex
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      query = {
        $or: [
          { name: { $regex: new RegExp(`^${escapedId}$`, 'i') } },
          { apiName: { $regex: new RegExp(`^${escapedId}$`, 'i') } }
        ]
      };
    }

    const university = await University.findOne(query, { programs: { $slice: [skip, limit] } });

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    // Get total programs count separately since we sliced the array
    // We need to find the document again without slice but projecting only programs size
    // However, getting the full array just to count is inefficient for very large arrays, 
    // but for programs it should be fine. 
    // A better way with aggregation:
    const countResult = await University.aggregate([
      { $match: query },
      { $project: { count: { $size: "$programs" } } }
    ]);

    const totalPrograms = countResult.length > 0 ? countResult[0].count : 0;

    res.json({
      programs: university.programs,
      currentPage: page,
      totalPages: Math.ceil(totalPrograms / limit),
      totalCount: totalPrograms
    });

  } catch (error) {
    console.error('Error fetching university programs:', error);
    res.status(500).json({ error: 'Failed to fetch university programs' });
  }
};

export const getUniversity = async (req, res) => {
  try {
    const { id } = req.params;
    let university;

    // Check if valid ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      university = await University.findById(id);
    }

    // If not found by ID, try by name or apiName
    if (!university) {
      // Escape special characters for regex
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      university = await University.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${escapedId}$`, 'i') } },
          { apiName: { $regex: new RegExp(`^${escapedId}$`, 'i') } }
        ]
      });
    }

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    res.json(university);
  } catch (error) {
    console.error('Error fetching university:', error);
    res.status(500).json({ error: 'Failed to fetch university details' });
  }
};

export const getUniversityScholarships = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Lazy load the scholarshipMapper (correct path to backend/shared)
    const { scholarshipMapper } = await import('../../../../shared/utils/scholarshipMapper.js');
    
    // Initialize mapper if not already done
    if (!scholarshipMapper.scholarships || scholarshipMapper.scholarships.length === 0) {
      await scholarshipMapper.initialize();
    }

    let university;

    // Check if valid ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      university = await University.findById(id);
    }

    // If not found by ID, try by name or apiName
    if (!university) {
      // Escape special characters for regex
      const escapedId = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      university = await University.findOne({
        $or: [
          { name: { $regex: new RegExp(`^${escapedId}$`, 'i') } },
          { apiName: { $regex: new RegExp(`^${escapedId}$`, 'i') } }
        ]
      });
    }

    if (!university) {
      return res.status(404).json({ error: 'University not found' });
    }

    // Get scholarships for this university
    const scholarships = scholarshipMapper.getScholarshipsForUniversity(university.name);

    res.json({
      universityName: university.name,
      scholarships,
      totalCount: scholarships.length
    });
  } catch (error) {
    console.error('Error fetching university scholarships:', error);
    res.status(500).json({ error: 'Failed to fetch university scholarships', details: error.message });
  }
};