const axios = require('axios');
const fs = require('fs');
const { Parser } = require('json2csv');

const GITHUB_TOKEN = 'your_github_token';
const REPO_OWNER = 'repo_owner';
const REPO_NAME = 'repo_name';

const API_URL = `https://api.github.com/repos/cgadvisors/denta/issues`;

const headers = {
    'Authorization': `token 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`,
    'Accept': 'application/vnd.github.v3+json'
};


async function getIssues() {
    const response = await axios.get(API_URL, { headers });
    return response.data;
}

async function listIssueDetails() {
    const issues = await getIssues();
    const issueDetails = issues.map(issue => ({
        issue_id: issue.id,
        issue_name: issue.title,
        description: issue.body,
        assignee_login: issue.assignee ? issue.assignee.login : 'None',
        milestone_description: issue.milestone ? issue.milestone.description : 'None',
        pull_request_url: issue.pull_request ? issue.pull_request.html_url : 'None',
        closed_by_login: issue.closed_by ? issue.closed_by.login : 'None',
        state_reason: issue.state_reason ? issue.state_reason : 'None',
        closed_at: issue.closed_at ? issue.closed_at : 'None'
    }));

    console.log('Issue Details:');
    issueDetails.forEach(issue => console.log(issue));

    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(issueDetails);
    fs.writeFileSync('issue_data.csv', csv);
    console.log('Issue data exported to issue_data.csv successfully.');
}

listIssueDetails();