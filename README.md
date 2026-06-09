## Introduction

This is a modified version of the Transmission BitTorrent client, based on the official 4.1.2 release.

## What can it do

Block bad clients such as Thunder (Xunlei).  
Block P2P media players such as Xfplay.  
Block bad offline downloaders such as BaiduNetdisk.

## Build (Only for Ubuntu ≥22.04)

```
    $ sudo apt update
    $ sudo apt install build-essential automake autoconf cmake libtool pkg-config intltool libcurl4-openssl-dev libglib2.0-dev libevent-dev libminiupnpc-dev libgtk-3-dev libgtkmm-3.0-dev libglibmm-2.4-dev libssl-dev libsystemd-dev
    $ git clone --recurse-submodules https://github.com/zyjking/Transmission-modified Transmission
    $ cd Transmission
    $ cmake -DCMAKE_BUILD_TYPE=Release .
    $ cmake --build .
    $ sudo cmake --install .
```

## For systemctl service

In the ```/lib/systemd/system``` directory, create a file named ```transmission-daemon.service``` with the following content.  
Also, ensure you have created the user ```transmission``` or an alternative.

```
[Unit]
Description=Transmission BitTorrent Daemon
Wants=network-online.target
After=network-online.target

[Service]
User=transmission
Type=notify
ExecStart=/usr/local/bin/transmission-daemon -f --log-level=error
ExecReload=/bin/kill -s HUP $MAINPID
NoNewPrivileges=true
MemoryDenyWriteExecute=true
ProtectSystem=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

## For init.d script

In the ```/etc/init.d``` directory, create a file named ```transmission-daemon``` with the following content.  

```
#!/bin/sh -e
### BEGIN INIT INFO
# Provides:          transmission-daemon
# Required-Start:    $local_fs $remote_fs $network
# Required-Stop:     $local_fs $remote_fs $network
# Default-Start:     2 3 4 5
# Default-Stop:      0 1 6
# Short-Description: Start or stop the transmission-daemon.
# Description:       Enable service provided by transmission-daemon.
### END INIT INFO

NAME=transmission-daemon
DAEMON=/usr/bin/$NAME
USER=debian-transmission
STOP_TIMEOUT=30

export PATH="${PATH:+$PATH:}/sbin"

[ -x $DAEMON ] || exit 0

[ -e /etc/default/$NAME ] && . /etc/default/$NAME

. /lib/lsb/init-functions

start_daemon () {
    if [ $ENABLE_DAEMON != 1 ]; then
        log_progress_msg "(disabled)"
		log_end_msg 255 || true
    else    
        start-stop-daemon --start \
        --chuid $USER \
		$START_STOP_OPTIONS \
        --exec $DAEMON -- $OPTIONS || log_end_msg $?
		log_end_msg 0
    fi
}

case "$1" in
    start)
        log_daemon_msg "Starting bittorrent daemon" "$NAME"
        start_daemon
        ;;
    stop)
        log_daemon_msg "Stopping bittorrent daemon" "$NAME"
        start-stop-daemon --stop --quiet \
            --exec $DAEMON --retry $STOP_TIMEOUT \
            --oknodo || log_end_msg $?
        log_end_msg 0
        ;;
    reload)
        log_daemon_msg "Reloading bittorrent daemon" "$NAME"
        start-stop-daemon --stop --quiet \
            --exec $DAEMON \
            --oknodo --signal 1 || log_end_msg $?
        log_end_msg 0
        ;;
    restart|force-reload)
        log_daemon_msg "Restarting bittorrent daemon" "$NAME"
        start-stop-daemon --stop --quiet \
            --exec $DAEMON --retry $STOP_TIMEOUT \
            --oknodo || log_end_msg $?
        start_daemon
        ;;
    status)
        status_of_proc "$DAEMON" "$NAME" && exit 0 || exit $?
        ;;
    *)
        log_action_msg "Usage: /etc/init.d/$NAME {start|stop|reload|force-reload|restart|status}" || true
        exit 2
        ;;
esac

exit 0
```

## Credits
- [Transmission](https://github.com/transmission/transmission/): fork source

## Licenses
Comply with the [original project's license](https://github.com/transmission/transmission?tab=License-1-ov-file).