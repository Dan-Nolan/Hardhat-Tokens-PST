const { assert } = require("chai");

describe("Cricket", function() {
  let token;
  let club;
  let deployer;
  const supply = "1000";
  beforeEach(async () => {
    deployer = ethers.provider.getSigner(0);

    const Club = await ethers.getContractFactory("Club");
    club = await Club.deploy();
    await club.deployed();

    const Cricket = await ethers.getContractFactory("Cricket");
    token = await Cricket.deploy(ethers.utils.parseEther(supply));
    await token.deployed();
  });

  it("should mint everything to the deployer", async () => {
    const balance = await token.balanceOf(deployer.getAddress());
    assert.equal(
      balance.toString(),
      ethers.utils.parseEther(supply).toString()
    );
  });

  describe('a transfer', () => {
    let recipient;
    beforeEach(async () => {
      recipient = ethers.provider.getSigner(1);
      await token.transfer(
        recipient.getAddress(),
        ethers.utils.parseEther("10")
      );
    });

    it('should transfer 10 tokens to the recipient', async () => {
      const balance = await token.balanceOf(recipient.getAddress());
      assert.equal(
        balance.toString(),
        ethers.utils.parseEther("10").toString()
      );
    });

    it('should leave the deployer with 990 tokens', async () => {
      const balance = await token.balanceOf(deployer.getAddress());
      assert.equal(
        balance.toString(),
        ethers.utils.parseEther("990").toString()
      );
    });
  });

  describe("join the club without approving tokens", () => {
    it('should revert', async () => {
      let ex;
      try {
        await club.join(token.address);
      }
      catch(_ex) {
        ex = _ex;
      }
      assert(ex);
    });
  });

  describe("join the club by approving tokens", () => {
    it('should allow us in', async () => {
      await token.approve(club.address, ethers.utils.parseEther("10"));
      await club.join(token.address);
      assert(await club.isMember(deployer.getAddress()));

      assert.equal(
        (await token.balanceOf(club.address)).toString(),
        ethers.utils.parseEther("10").toString()
      );
    });
  });
});
