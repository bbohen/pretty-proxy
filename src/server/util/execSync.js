const childProcess = require('child_process');

function execSync(command) {
  let status = 0;
  let stdout;

  try {
    stdout = childProcess.execSync(command);
  } catch (err) {
    stdout = err.stdout;
    status = err.status;
  }

  return {
    stdout: stdout.toString(),
    status,
  };
}

module.exports = execSync;
