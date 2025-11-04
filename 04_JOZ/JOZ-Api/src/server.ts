import app from './app';
import config from './config';
import logger, { logInfo } from './utils/logger';

const PORT = config.port || 3000;

app.listen(PORT, () => {
    logInfo(`Server is running on http://localhost:${PORT}`);
    // also console for developer convenience
    console.log(`Server is running on http://localhost:${PORT}`);
});