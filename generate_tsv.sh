#!/bin/bash

# ============ search parameters ================
# - Edit these parameters to customize the search:
output_file=events_06.11-06.15.tsv
start_date=2018-06-11
end_date=2018-06-16
search_term=blockchain,bitcoin,crypto
# ===============================================


# ===== run script. do not modify ===============
npm run build
node build/main.js \
    --start $start_date \
    --end $end_date \
    --query $search_term \
    > $output_file

echo "Successfully generated $output_file"
# ===============================================
