const { execSync } = require('child_process');

/**
 * @returns {string} New tag for release
 */
function getReleaseVersion() {
  const lastTag = execSync('git tag | sort -V | tail -1').toString();

  if (lastTag) {
    return createReleaseTag(lastTag);
  }
  return createFirstTag();
}

/**
 * @param {string} lastTag
 * @returns {string} New tag for release
 */
function createReleaseTag(lastTag) {
  const splitted = lastTag.replace(/\D/g, '').split('');
  const major = Number(splitted[0]),
    minor = Number(splitted[1]),
    patch = Number(splitted[2]);

  let newVersion;

  if (patch > 8) {
    if (minor > 8) {
      newVersion = `${major + 1}.${0}.${0}`;
    } else {
      newVersion = `${major}.${minor + 1}.${0}`;
    }
  } else {
    newVersion = `${major}.${minor}.${patch + 1}`;
  }

  return newVersion;
}

/**
 * @returns {string} First tag
 */
function createFirstTag() {
  return '1.0.0';
}

/**
 * @description saves version and changes and saves it to the repo
 */
function commitAndSaveChanges(message) {
  const releaseVersion = getReleaseVersion();

  execSync(`git tag -a v${releaseVersion}-release -m "Release ${releaseVersion}"`);
  console.log('status:');
  execSync('git status');
  execSync('git add .');
  execSync(`git commit -m "chore(release):${releaseVersion}, libs versions: ${message}"`);
  execSync('git push --follow-tags');
  console.log('tags pushed to repo');
}

module.exports = {
  commitAndSaveChanges,
};
