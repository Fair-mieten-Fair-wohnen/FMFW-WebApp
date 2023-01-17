#!/bin/bash

if [[ "stage" == $1 ]]; then
    echo "using stage configs"
    STAGE=1
    STAGEID='stage'
else
    echo "using prod configs"
    STAGE=0
    STAGEID='prod'
fi

cd ~/adw-documentation-system-1.0-SNAPSHOT

echo "starting $STAGEID env"
./bin/adw-documentation-system -Dconfig.resource=application.$STAGEID.conf -Dplay.http.secret.key=jerkthrkjtehterhtjkehtjkerht34535345345
