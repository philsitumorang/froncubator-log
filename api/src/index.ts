import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as logging from './controllers/logging';
import * as stats from './controllers/stats';
import { connect } from './config/db';

connect().then(() => {});

const app = express();

app.use(cors());
app.use(helmet());

app.use(cookieParser());
app.use(bodyParser.json({ limit: '5000mb' }));
app.use(bodyParser.urlencoded({ limit: '5000mb', extended: true }));

app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

app.get('/api/logs', logging.get);
app.post('/api/logs', logging.save);

app.get('/api/stats', stats.getStats);

app.listen(3000);