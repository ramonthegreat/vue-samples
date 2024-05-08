#!/bin/sh
set -ex

if [ $VUE_APP_ENV = "dev" ]; then
    npm run serve
fi

exec "$@"