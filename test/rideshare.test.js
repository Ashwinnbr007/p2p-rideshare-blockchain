const Marketplace = artifacts.require('./rideshare.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('rideshare', ([deployer, seller, buyer]) => {
  let rideshare

  before(async () => {
    rideshare = await rideshare.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await rideshare.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await rideshare.name()
      assert.equal(name, 'rideshare')
    })
  })

  describe('rides', async () => {
    let result, rideCount

    before(async () => {
      result = await rideshare.createRide('tvm to ekm', web3.utils.toWei('1', 'Ether'), { from: seller })
      rideCount = await rideshare.rideCount()
    })

    it('creates rides', async () => {
      // SUCCESS
      assert.equal(rideCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), rideCount.toNumber(), 'id is correct')
      assert.equal(event.route, 'tvm to ekm', 'route is correct')
      assert.equal(event.fare, '1000000000000000000', 'fare is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')

      // FAILURE: Ride must have a route
      await await rideshare.createRide('', web3.utils.toWei('1', 'Ether'), { from: seller }).should.be.rejected;
      // FAILURE: Ride must have a fare
      await await rideshare.createRide('tvm to ekm', 0, { from: seller }).should.be.rejected;
    })

    it('lists rides', async () => {
      const rides = await rideshare.riders(rideCount)
      assert.equal(rides.id.toNumber(), rideCount.toNumber(), 'id is correct')
      assert.equal(rides.route, 'tvm to ekm', 'route is correct')
      assert.equal(rides.fare, '1000000000000000000', 'fare is correct')
      assert.equal(rides.owner, seller, 'owner is correct')
      assert.equal(rides.purchased, false, 'purchased is correct')
    })

    it('completes ride', async () => {
      // Track the seller balance before purchase
      let oldSellerBalance
      oldSellerBalance = await web3.eth.getBalance(seller)
      oldSellerBalance = new web3.utils.BN(oldSellerBalance)

      // SUCCESS: Buyer makes purchase
      result = await rideshare.purchaseProduct(rideCount, { from: buyer, value: web3.utils.toWei('1', 'Ether')})

      // Check logs
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), rideCount.toNumber(), 'id is correct')
      assert.equal(event.route, 'tvm to ekm', 'route is correct')
      assert.equal(event.fare, '1000000000000000000', 'fare is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')

      // Check that seller received funds
      let newSellerBalance
      newSellerBalance = await web3.eth.getBalance(seller)
      newSellerBalance = new web3.utils.BN(newSellerBalance)

      let fare
      fare = web3.utils.toWei('1', 'Ether')
      fare = new web3.utils.BN(fare)

      const exepectedBalance = oldSellerBalance.add(fare)

      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to buy a product that does not exist, i.e., product must have valid id
      await marketplace.purchaseProduct(99, { from: buyer, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;      // FAILURE: Buyer tries to buy without enough ether
      // FAILURE: Buyer tries to buy without enough ether
      await marketplace.purchaseProduct(rideCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      // FAILURE: Deployer tries to buy the product, i.e., product can't be purchased twice
      await marketplace.purchaseProduct(rideCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      // FAILURE: Buyer tries to buy again, i.e., buyer can't be the seller
      await marketplace.purchaseProduct(rideCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })
})
