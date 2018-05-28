#!/bin/bash

# ============ search parameters ================
# - Edit these parameters to customize the search:
output_file=events.tsv
start_date=2018-05-31
end_date=2018-06-03
search_term=blockchain
# ===============================================


# ===== run script. do not modify ===============
npm run build
node build/main.js \
    --start $start_date \
    --end $end_date\
    --query $search_term \
    > $output_file

echo "Successfully generated $output_file"
# ===============================================
