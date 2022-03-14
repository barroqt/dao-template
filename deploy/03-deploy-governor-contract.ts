import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { VOTING_DELAY, VOTING_PERIOD, QUORUM_PERCENTAGE } from "../helper-hardhat-config";

const deployGovernorContract: DeployFunction = async function (
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre;
    const { deploy, log, get } = deployments;
    const { deployer } = await getNamedAccounts();
    const governanceToken = await get("GovernanceToken");
    const timeLock = await get("Timelock");
    log("Deploying governor contract...");
    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: [
            governanceToken.address,
            timeLock.address,
            VOTING_DELAY,
            VOTING_PERIOD,
            QUORUM_PERCENTAGE
        ],
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

export default deployGovernorContract;