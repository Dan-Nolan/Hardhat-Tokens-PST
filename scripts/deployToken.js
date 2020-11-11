async function main() {
  const Cricket = await hre.ethers.getContractFactory("Cricket");
  const contract = await Cricket.deploy(ethers.utils.parseEther("1000"));

  await contract.deployed();

  console.log("Token deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
