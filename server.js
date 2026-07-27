const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

console.log('🚀 CSM Job Dashboard Server Starting...');

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Search jobs using ZipRecruiter
app.post('/api/scrape', async (req, res) => {
  console.log('📍 POST /api/scrape called');
  
  try {
    const { searchQuery, location, maxResults = 30 } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ error: 'searchQuery is required' });
    }

    console.log(`🔍 Searching: "${searchQuery}" in ${location}`);

    const searchTerm = `${searchQuery} ${location || ''}`.trim();
    const query = encodeURIComponent(searchTerm);
    
    const zipResponse = await fetch(
      `https://api.ziprecruiter.com/jobs?search=${query}&per_page=${Math.min(maxResults, 50)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'CSM-Job-Dashboard/1.0',
        },
      }
    );

    console.log(`ZipRecruiter response: ${zipResponse.status}`);
    
    if (!zipResponse.ok) {
      const errorText = await zipResponse.text();
      console.error(`❌ Error: ${zipResponse.status}`, errorText);
      return res.status(500).json({ error: 'ZipRecruiter API error' });
    }

    const data = await zipResponse.json();

    // Handle various response formats
    let jobs = [];
    if (Array.isArray(data)) {
      jobs = data;
    } else if (data.jobs && Array.isArray(data.jobs)) {
      jobs = data.jobs;
    } else if (data.data && Array.isArray(data.data)) {
      jobs = data.data;
    } else if (data.results && Array.isArray(data.results)) {
      jobs = data.results;
    }

    console.log(`✅ Found ${jobs.length} jobs`);

    // Format jobs
    const formattedJobs = (jobs || []).map(job => ({
      job_title: job.name || job.job_title || 'Job Title',
      company_name: job.employer || job.company_name || 'Company',
      location: job.location || location || 'Location',
      salary: job.salary || job.salary_range || '',
      posted_via: 'ZipRecruiter',
      URL: job.url || job.apply_url || '#',
      date: job.posted_date || job.date || '',
    }));

    res.json({
      status: 'success',
      actors: {
        ziprecruiter: {
          name: 'ZipRecruiter',
          results: formattedJobs,
          count: formattedJobs.length,
        },
      },
      totalResults: formattedJobs.length,
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    res.status(500).json({ error: error.message || 'Failed to search jobs' });
  }
});

// Single job search
app.post('/api/search-jobs', async (req, res) => {
  try {
    const { searchQuery, location, maxResults = 30 } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ error: 'searchQuery is required' });
    }

    const searchTerm = `${searchQuery} ${location || ''}`.trim();
    const query = encodeURIComponent(searchTerm);
    
    const response = await fetch(
      `https://api.ziprecruiter.com/jobs?search=${query}&per_page=${Math.min(maxResults, 50)}`,
      {
        method: 'GET',
        headers: { 'Accept': 'application/json', 'User-Agent': 'CSM-Job-Dashboard/1.0' },
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'API error' });
    }

    const data = await response.json();

    let jobs = [];
    if (Array.isArray(data)) {
      jobs = data;
    } else if (data.jobs && Array.isArray(data.jobs)) {
      jobs = data.jobs;
    } else if (data.data && Array.isArray(data.data)) {
      jobs = data.data;
    } else if (data.results && Array.isArray(data.results)) {
      jobs = data.results;
    }

    const formattedJobs = (jobs || []).map(job => ({
      job_title: job.name || job.job_title || 'Job Title',
      company_name: job.employer || job.company_name || 'Company',
      location: job.location || location || 'Location',
      salary: job.salary || job.salary_range || '',
      posted_via: 'ZipRecruiter',
      URL: job.url || job.apply_url || '#',
      date: job.posted_date || job.date || '',
    }));

    res.json({ jobs: formattedJobs, count: formattedJobs.length });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
