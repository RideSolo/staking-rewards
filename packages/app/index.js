const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

const setup = require('./utils/web3');
const { info, error } = require('./utils/logger');

const argv = require('./utils/yargs');

const getLiquidityTask = require('./tasks/get-liquidity');
const getPositionsTask = require('./tasks/get-positions');
const getLastRemovalTimesTask = require('./tasks/get-last-removal-times');

const setLastRemovalTimesTask = require('./tasks/set-last-removal-times');
const setProgramsTask = require('./tasks/set-programs');

const main = async () => {
    try {
        // Set up local DB.
        const dbDir = path.resolve(__dirname, './data');

        const { reset } = argv;
        if (reset) {
            info('Resetting the local DB');

            fs.rmdirSync(dbDir, { recursive: true });
        }
        await mkdirp(dbDir);

        // Set up the local web3 environment.
        const env = await setup();

        // Handle all the tasks in the right order.
        const {
            getAll,
            getLiquidity,
            getPositions,
            getLastRemovalTimes,
            setAll,
            setLastRemovalTimes,
            setPrograms
        } = argv;

        if (getAll || getLiquidity) {
            await getLiquidityTask(env);
        }

        if (getAll || getPositions) {
            await getPositionsTask(env);
        }

        if (getAll || getLastRemovalTimes) {
            await getLastRemovalTimesTask(env);
        }

        if (setAll || setLastRemovalTimes) {
            await setLastRemovalTimesTask(env);
        }

        if (setAll || setPrograms) {
            await setProgramsTask(env);
        }

        process.exit(0);
    } catch (e) {
        error(e);

        process.exit(-1);
    }
};

main();
