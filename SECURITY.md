## SECURITY.md

```markdown
# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |

## Reporting a Vulnerability

If you discover a security vulnerability, please email **security@your-domain.com**
with `SECURITY` in the subject line.  

We will triage and respond as soon as possible.
```

---

## .github Issue & PR Templates

- **.github/ISSUE_TEMPLATE/bug_report.md**

  ```markdown
  ---
  name: Bug report
  about: Report a problem with notify-toast
  title: "[BUG] - "
  labels: bug
  assignees: ''

  ---

  **Describe the bug**
  A clear and concise description of what the bug is.

  **To Reproduce**
  Steps to reproduce the behavior:
  1. Go to '...'
  2. Click on '...'
  3. See error

  **Expected behavior**
  A clear and concise description of what you expected to happen.

  **Screenshots**  
  If applicable, add screenshots to help explain your problem.

  **Environment (please complete the following information):**
  - OS: [e.g. macOS 11.2]
  - Browser [e.g. Chrome, Safari]
  - Version [e.g. 2.1.0]

  **Additional context**
  Add any other context about the problem here.
  ```

- **.github/ISSUE_TEMPLATE/feature_request.md**

  ```markdown
  ---
  name: Feature request
  about: Suggest an idea for notify-toast
  title: "[FEATURE] - "
  labels: enhancement
  assignees: ''

  ---

  **Is your feature request related to a problem? Please describe.**
  A clear and concise description of the problem.

  **Describe the solution you'd like**
  A clear and concise description of what you want to happen.

  **Describe alternatives you've considered**
  A clear and concise description of any alternative solutions or features you've considered.

  **Additional context**
  Add any other context or screenshots about the feature request here.
  ```

- **.github/PULL_REQUEST_TEMPLATE.md**

  ```markdown
  ---
  name: Pull Request
  about: Submit changes for review
  title: "[TYPE] - "
  labels: ''
  assignees: ''

  ---

  **Description**
  Please include a summary of the change and which issue is fixed.  

  **Type of change**
  - [ ] Bug fix
  - [ ] New feature
  - [ ] Documentation update
  - [ ] Breaking change

  **Checklist**
  - [ ] My code follows the style guidelines  
  - [ ] I have performed a self-review of my own code  
  - [ ] I have added tests that prove my fix is effective or that my feature works  
  - [ ] I have added necessary documentation (if appropriate)  
  ```