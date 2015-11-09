#!/bin/sh
echo { \"ASPNET_ENV\": \"$2\"} > $1/approot/src/viper/env.json