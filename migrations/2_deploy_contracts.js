const rideshare = artifacts.require("rideshare");

module.exports = function(deployer) {
  deployer.deploy(rideshare);
};
