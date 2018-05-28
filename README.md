# NYC Blockchain Events

The purpose of this code is to provide a simple interface for quickly retreiving all NYC blockchain events
for a given week from a variety of sources.

## Objective
Inputs:
- Start date
- End date
- Querystring (i.e. "blockchain" or "bitcoin")

Outputs:
- TSV file (importable to Google Sheets)
- Links to each event, organized by date and source
- Quick sumary of each event, so that user does not necessarily need to click into it to see what it is

I could do this as a Node cli + an orchestration shell script that coordinates passing the inputs and directing
the output. I'd rather not have the Node script handle file I/O. The shell can do that.

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
I have a collection of TypeScript (!) files that are working right now for fetching from Meetup.com and Eventbrite.
A lot of values, like dates, querystrings, and locations, are hardcoded right now, but I will separate them out
into command-line inputs in the future. I should use the commander package to build a CLI.

The only thing left to do now is to parameterize some of the hard-coded values into command line
arguments, so that the overall script can be used to easily fetch data for different weeks
and different query strings (i.e., not just "blockchain").

In order to actually generate the final .tsv file that can be imported to Google Sheets (I went with .tsv instead
of .csv because sometimes the names and descriptions have commas in them), I made a short shell
script called `generate_tsv.sh`, which calls the node script and directs the output to a local file.
