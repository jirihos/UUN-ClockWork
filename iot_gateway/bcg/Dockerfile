FROM python:3

WORKDIR /usr/src/app

RUN pip install --upgrade --no-cache-dir "bcg==1.17.0" "paho-mqtt<2.0.0"

CMD [ "python", "/usr/local/bin/bcg", "-H", "mosquitto", "--device", "/dev/ttyUSB0" ]