import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { MIN_DELAY } from "../helper-hardhat-config";

const deployTimelock: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    log("Deploying time lock contract...");
    const timeLock = await deploy("Timelock", {
        from: deployer,
        args: [MIN_DELAY, [], []],
        log: true,
    });
    log(`Deployed time lock to address ${timeLock.address}`);

    // await delegate(timeLock.address, deployer);
    // log("delegated");
};

// const delegate = async (
//     governanceTokenAddress: string, delegatedAccount: string
// ) => {
//     const governanceToken = await ethers.getContractAt(
//         "GovernanceToken", governanceTokenAddress
//     );
//     const tx = await governanceToken.delegate(delegatedAccount);
//     await tx.wait(1);
//     console.log(
//         `Checkpoints ${await governanceToken.numCheckpoints(delegatedAccount)}`
//     );
// }

export default deployTimelock;