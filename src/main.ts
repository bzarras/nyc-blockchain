import { config as dotenvConfig } from 'dotenv';
dotenvConfig();

import program from 'commander';
import { EventReporter } from './EventReporter'

program
    .version('0.1.0')
    .option('-s, --start <start-date>', 'The start date of the search (inclusive), YYYY-MM-DD')
    .option('-e, --end <end-date>', 'The end date of the search (exclusive), YYYY-MM-DD')
    .option('-q, --query <query>', 'The search term for the type of event')
    .parse(process.argv);

if (program.start && program.end && program.query) {
    const queries = (program.query as string).split(',');
    const reporter = new EventReporter(program.start as string, program.end as string, queries);
    reporter.reportResults();
}
