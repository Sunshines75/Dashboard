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

// Simulated job data (for testing when API is blocked)
const simulatedJobs = [
  {
    job_title: "Customer Success Manager - DevSecOps",
    company_name: "Snyk",
    location: "Remote, US",
    salary: "$120,000 - $160,000",
    posted_via: "ZipRecruiter",
    URL: "https://jobs.lever.co/snyk/",
    date: "2 days ago"
  },
  {
    job_title: "Senior Customer Success Manager",
    company_name: "Palo Alto Networks",
    location: "Remote, US",
    salary: "$130,000 - $170,000",
    posted_via: "ZipRecruiter",
    URL: "https://jobs.paloaltonetworks.com/",
    date: "3 days ago"
  },
  {
    job_title: "Customer Success Manager - Security",
    company_name: "GitLab",
    location: "Remote, US",
    salary: "$125,000 - $155,000",
    posted_via: "ZipRecruiter",
    URL: "https://about.gitlab.com/jobs/",
    date: "1 day ago"
  },
  {
    job_title: "CSM - Cloud Security",
    company_name: "Okta",
    location: "Remote, US",
    salary: "$115,000 - $150,000",
    posted_via: "ZipRecruiter",
    URL: "https://www.okta.com/careers/",
    date: "4 days ago"
  },
  {
    job_title: "Customer Success Manager",
    company_name: "Checkmarx",
    location: "Remote, US",
    salary: "$110,000 - $145,000",
    posted_via: "ZipRecruiter",
    URL: "https://www.checkmarx.com/careers/",
    date: "1 week ago"
  },
];

// Search jobs - Try real API first, fallback to simulated data
app.post('/api/scrape', async (req, res) => {
  console.log('📍 POST /api/scrape called');
  
  try {
    const { searchQuery, location, maxResults = 30 } = req.body;

    if (!searchQuery) {
      return res.status(400).json({ error: 'searchQuery is required' });
    }

    console.log(`🔍 Searching: "${searchQuery}" in ${location}`);

    // Try ZipRecruiter API
    const searchTerm = `${searchQuery} ${location || ''}`.trim();
    const query = encodeURIComponent(searchTerm);
    
    try {
      console.log('📌 Attempting ZipRecruiter API...');
      
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
      
      if (zipResponse.ok) {
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

        if (jobs && jobs.length > 0) {
          console.log(`✅ Got ${jobs.length} jobs from ZipRecruiter`);

          const formattedJobs = jobs.map(job => ({
            job_title: job.name || job.job_title || 'Job Title',
            company_name: job.employer || job.company_name || 'Company',
            location: job.location || location || 'Location',
            salary: job.salary || job.salary_range || '',
            posted_via: 'ZipRecruiter',
            URL: job.url || job.apply_url || '#',
            date: job.posted_date || job.date || '',
          }));

          return res.json({
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
        }
      }
    } catch (apiError) {
      console.error('❌ ZipRecruiter API failed:', apiError.message);
    }

    // Fallback: Use simulated data if API fails
    console.log('⚠️ Using simulated job data (API unavailable)');
    
    const filteredJobs = simulatedJobs.filter(job => 
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const results = filteredJobs.length > 0 ? filteredJobs : simulatedJobs.slice(0, maxResults);

    res.json({
      status: 'success',
      actors: {
        ziprecruiter: {
          name: 'ZipRecruiter (Simulated)',
          results: results,
          count: results.length,
        },
      },
      totalResults: results.length,
      note: 'Using simulated data - API may be rate limited or blocked',
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

    console.log(`🔍 Searching: "${searchQuery}" in ${location}`);

    const searchTerm = `${searchQuery} ${location || ''}`.trim();
    const query = encodeURIComponent(searchTerm);
    
    try {
      const response = await fetch(
        `https://api.ziprecruiter.com/jobs?search=${query}&per_page=${Math.min(maxResults, 50)}`,
        {
          method: 'GET',
          headers: { 
            'Accept': 'application/json', 
            'User-Agent': 'CSM-Job-Dashboard/1.0' 
          },
        }
      );

      if (response.ok) {
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

        if (jobs && jobs.length > 0) {
          const formattedJobs = jobs.map(job => ({
            job_title: job.name || job.job_title || 'Job Title',
            company_name: job.employer || job.company_name || 'Company',
            location: job.location || location || 'Location',
            salary: job.salary || job.salary_range || '',
            posted_via: 'ZipRecruiter',
            URL: job.url || job.apply_url || '#',
            date: job.posted_date || job.date || '',
          }));

          return res.json({ jobs: formattedJobs, count: formattedJobs.length });
        }
      }
    } catch (apiError) {
      console.error('❌ API Error:', apiError.message);
    }

    // Fallback to simulated data
    const filteredJobs = simulatedJobs.filter(job => 
      job.job_title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const results = filteredJobs.length > 0 ? filteredJobs : simulatedJobs.slice(0, maxResults);

    res.json({ 
      jobs: results, 
      count: results.length,
      note: 'Using simulated data'
    });

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
