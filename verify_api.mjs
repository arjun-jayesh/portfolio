async function run() {
    const baseUrl = process.env.TEST_BASE_URL || 'http://localhost:4321';
    console.log(`Starting API Verification on ${baseUrl}...`);

    try {
        // 1. Verify /api/ideas
        const postRes = await fetch(`${baseUrl}/api/ideas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Manual Verifier',
                email: 'manual@kinbosoft.com',
                idea_title: 'API Check',
                idea_description: 'Validating Idea Submissions',
                project_type: 'web_app'
            })
        });
        const postData = await postRes.json().catch(() => ({}));
        console.log('POST /api/ideas => Status:', postRes.status, postData);

        const getRes = await fetch(`${baseUrl}/api/ideas`);
        const getData = await getRes.json().catch(() => []);
        console.log('GET /api/ideas => Status:', getRes.status, 'Total Ideas:', Array.isArray(getData) ? getData.length : getData);

        // 2. Verify /api/config
        const configGet = await fetch(`${baseUrl}/api/config?key=enterprise_assets`);
        const configData = await configGet.json().catch(() => ({}));
        console.log('GET /api/config => Status:', configGet.status, 'Has Data:', Boolean(configData));

        // 3. Verify /api/products
        const prodGet = await fetch(`${baseUrl}/api/products`);
        const prodData = await prodGet.json().catch(() => []);
        console.log('GET /api/products => Status:', prodGet.status, 'Total Products:', Array.isArray(prodData) ? prodData.length : prodData);

        // 4. Verify /api/blog
        const blogGet = await fetch(`${baseUrl}/api/blog`);
        const blogData = await blogGet.json().catch(() => []);
        console.log('GET /api/blog => Status:', blogGet.status, 'Total Posts:', Array.isArray(blogData) ? blogData.length : blogData);

        // 5. Verify /api/redirects
        const redirGet = await fetch(`${baseUrl}/api/redirects`);
        const redirData = await redirGet.json().catch(() => ({}));
        console.log('GET /api/redirects => Status:', redirGet.status, 'Result:', redirData);

        // 6. Verify /api/leads
        const leadsPost = await fetch(`${baseUrl}/api/leads`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                form_type: 'Verification Lead',
                name: 'Test Engineer',
                email: 'verify@kinbosoft.com',
                contact: '+91 9074811984',
                goal: 'API verification check'
            })
        });
        const leadsData = await leadsPost.json().catch(() => ({}));
        console.log('POST /api/leads => Status:', leadsPost.status, leadsData);

        console.log('✓ All API endpoint checks completed.');
    } catch (err) {
        console.error('API Verification Encountered Error:', err);
    }
}

run();
