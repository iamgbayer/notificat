import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/routes/index';

const app = express();

/**
 * Set application port
 */
app.set('port', (process.env.PORT || 5000));


/**
 * Process application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({extended: false}));


/**
 * Process application/json
 */
app.use(bodyParser.json());


/**
 * Set a root to api
 */
app.use('/api', routes);


app.listen(app.get('port'), function () {
  console.log('running on port', app.get('port'));
})


export default app;
