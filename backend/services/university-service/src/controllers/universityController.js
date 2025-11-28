import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const listUniversities = (_req, res) => {
  try {
    // Resolve path to the shared data JSON file
    const dataPath = path.resolve(__dirname, '../../../../shared/data/universities data/universities intro details/universities_with_ratio.json');
    const raw = fs.readFileSync(dataPath, 'utf8');
    const json = JSON.parse(raw);
    // The JSON file may be an array or an object; normalize to an array under `universities`
    const universities = Array.isArray(json) ? json : (json.universities || json);
    return res.json({ universities });
  } catch (err) {
    // Log and return a 500 so frontend can surface the error during development
    // eslint-disable-next-line no-console
    console.error('Failed to read universities data:', err && err.message ? err.message : err);
    return res.status(500).json({ error: 'Failed to load universities data' });
  }
};