#! /bin/bash
DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

rm twitter_timeline_defaults.zip
zip -r $DIR/twitter_timeline_defaults.zip $DIR -x "$DIR/.git/*" "$DIR/README.md" "$DIR/build.sh"
