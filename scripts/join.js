const cricketAddr = "0x07B3de895ebd4c136e02C4b96075796621c34a0a";
const clubAddr = "0x99b4C01c9152950050F8f99876378477e8aDC3e3";

async function main() {
  const Cricket = await hre.ethers.getContractFactory("Cricket");
  const token = await Cricket.attach(cricketAddr);

  const Club = await hre.ethers.getContractFactory("Club");
  const club = await Club.attach(clubAddr);

  const tx = await token.approve(club.address, ethers.utils.parseEther("10"));
  await tx.wait();

  await club.join(cricketAddr);

  console.log("Success!");
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
