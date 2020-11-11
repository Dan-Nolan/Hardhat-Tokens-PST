async function main() {
  const Club = await hre.ethers.getContractFactory("Club");
  const contract = await Club.deploy();

  await contract.deployed();

  console.log("Club deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
