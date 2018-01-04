githubTrafficStats
======================
This is a [Serverless](https://serverless.com/) function that will scrape the GitHub Traffic API every
night for tracking metrics longer than GitHub.

## Description
githubTrafficStats is a serverless function that will collect your GitHub repo traffic stats every night before hit hits 12:00pmUTC when the counter restarts. The uses cases can be: 
- Keep stats of Views and Clones for time series data on any GitHub repo.
- Collect data longer than the GitHub UI which is typically 14 days. 
- Use something like Prometheus to analyze traffic spikes and dips
- Scrape as many repos as you want by adding them to the `serverless.yaml`
- Information is exported to CloudWatch logs
- Do whatever you want with the data

**Note**: This was a small side-project and only collected the logs in
CloudWatch. Use this code as a foundation for pushing to a webhook or some other
service.

## Installation
Edit `serverless.yaml` and use unique names for each function. The name of each
function will be seen in your CloudWatch logs where the information is
exported. Use the environment variables `GHOWNER` and `GHREPO` as targets for
the repo to be scraped

Run It:
```
serverless deploy -v
```

## Licensing
Licensed under the Apache License, Version 2.0 (the “License”); you may not use this file except in compliance with the License. You may obtain a copy of the License at <http://www.apache.org/licenses/LICENSE-2.0>

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an “AS IS” BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.

##Support
Please file bugs and issues on the Github issues page for this project. This is to help keep track and document everything related to this repo. The code and documentation are released with no warranties or SLAs and are intended to be supported through a community driven process.