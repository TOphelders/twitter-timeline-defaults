#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd $DIR
rm twitter_timeline_defaults.zip
zip -r ./twitter_timeline_defaults.zip . -x "./.git/*" "./README.md" "./build.sh"
cd -
