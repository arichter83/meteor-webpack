
import * as apm from 'elastic-apm-node/start'
apm.start()
apm.flush()

import '../imports/api/tasks.js';
