const { getDeployableLibs, getPublishType } = require('./affected');
const { deployLib } = require('./publish-lib');
const { commitAndSaveChanges } = require('./tagging');

const type = getPublishType();

if (type) {
  console.log(`${type} publish started`);

  const deployableLibs = getDeployableLibs();

  if (deployableLibs.length) {
    console.log('deployable libs', deployableLibs);
    console.log('publishing deployable libs');

    let message = '';

    deployableLibs.forEach((lib, index) => {
      message += deployLib(lib, type);
      if (deployableLibs.length > 1 && index !== deployableLibs.length - 1) {
        message += ', ';
      }
    });
    console.log(`${type} publish finished`);

    commitAndSaveChanges(message);
  } else {
    console.log('no deployable libs');
  }
} else {
  console.log('no meaningful changes to publish');
}
