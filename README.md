# NYC Blockchain Events

The purpose of this code is to provide a simple interface for quickly retreiving
all NYC blockchain events for a given week from a variety of sources.

## Objective
Inputs:
- Start date
- End date
- Querystring (i.e. "blockchain" or "bitcoin")

Outputs:
- TSV file (importable to Google Sheets)
- Links to each event, organized by date and source
- Quick sumary of each event, so that user does not necessarily need to click into it to see what it is

## How to use
First, you'll need to make sure you have a .env file with the following
environment variables:
```
MEETUP_API_KEY=<your Meetup api key>
MEETUP_HOST=https://api.meetup.com
EVENTBRITE_TOKEN=<your Eventbrite OAuth token>
EVENTBRITE_HOST=https://www.eventbriteapi.com
```

To run the program, a convenient shell script is provided via the file
`generate_tsv.sh`. This script offers a few configurable parameters:
- **output_file**: The name of the output file. Should end in .tsv
- **start_date**: The start date of the search. Should be in format YYYY-MM-DD. Search will include this date
- **end_date**: The end date of the search. YYYY-MM-DD. Search will include date immediately prior to this date, but exclude this date itself
- **search_term**: A comma-separated list of terms that you want to search for. Something like "blockchain,crypto,bitcoin"

Configure the parameters to your liking, then from a shell, run this:
```
$ bash generate_tsv.sh
```
Upon success, an output file should exist at the filepath specified by
`output_file`. You can then import the file into a spreadsheet program like
Google Sheets to visually view the results.

---

## Anatomy of the script
1. User inputs dates and a query
2. For each data source (Eventbrite, Meetup, etc...)
    1. Fetch events in the date range and with the query string
    2. Normalize the response data
    3. Add normalized response data to array of response data
3. Sort response data array by date
4. Output data in tsv format
- Will want a global header row as the first line written to StdOut. Data source can be a column in the object schema

## Status
I have a collection of TypeScript (!) files that are working right now for
fetching from Meetup.com and Eventbrite. A lot of values, like dates,
querystrings, and locations, are hardcoded right now, but I will separate them
out into command-line inputs in the future. I should use the commander package
to build a CLI.

In order to actually generate the final .tsv file that can be imported to Google
Sheets (I went with .tsv instead of .csv because sometimes the names and
descriptions have commas in them), I made a short shell script called
`generate_tsv.sh`, which calls the node script and directs the output to a local
file.
