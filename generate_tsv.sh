#!/bin/bash

# ============ search parameters ================
# - Edit these parameters to customize the search:
output_file=events_05.28-06.01.tsv
start_date=2018-05-28
end_date=2018-06-02
search_term=blockchain
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
