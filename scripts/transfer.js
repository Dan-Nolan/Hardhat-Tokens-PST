const cricketAddr = "0x07B3de895ebd4c136e02C4b96075796621c34a0a";

async function main() {
  const Cricket = await hre.ethers.getContractFactory("Cricket");
  const contract = await Cricket.attach(cricketAddr);

  await contract.transfer(
    "tompas-ropsten.eth",
    ethers.utils.parseEther("100")
  );

  console.log("Token deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
