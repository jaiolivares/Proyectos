import app from './app';
import config from './config';
import logger, { logInfo, logError } from './utils/logger';
import { validateDatabase } from './utils/db-validator';

const PORT = config.port || 3000;

(async () => {
    try {
        await validateDatabase();
        app.listen(PORT, () => {
            logInfo(`Server is running on http://localhost:${PORT}`);
            // also console for developer convenience
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (err) {
        logError('Error iniciando la aplicación', err);
        // show error for developer and exit with failure
        console.error(err);
        process.exit(1);
    }
})();