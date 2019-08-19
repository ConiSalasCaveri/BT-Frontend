/* eslint-env node */

const types = [
  {
    value: 'feat',
    name: 'feat:     A new feature'
  },
  {
    value: 'fix',
    name: 'fix:      A bug fix'
  },
  {
    value: 'docs',
    name: 'docs:     Documentation only changes'
  },
  {
    value: 'style',
    name: `style:    Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc)`
  },
  {
    value: 'refactor',
    name: 'refactor: A code change that neither fixes a bug nor adds a feature'
  },
  {
    value: 'perf',
    name: 'perf:     A code change that improves performance'
  },
  {
    value: 'test',
    name: 'test:     Adding missing tests'
  },
  {
    value: 'build',
    name: 'build:     Changes that affect the build system or external depedencies (example scopes: gulp, broccoli, npm)'
  },
  {
    value: 'ci',
    name: `ci:    changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)`
  },
  {
    value: 'chore',
    name: `chore:    Changes to the build process or auxiliary tools
              and libraries such as documentation generation`
  },
  {
    value: 'revert',
    name: 'revert:   Revert to a commit'
  }
];

module.exports = {
  types,
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix', 'perf', 'refactor']
};
