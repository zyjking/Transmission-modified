## Introduction

This is a modified version of Transmission BitTorrent client, based on official 4.0.5 release.

## What can it do

Block bad client like Thunder (Xunlei).  
Block P2P media player like Xfplay.  
Block bad offline downloader like BaiduNetdisk.

## Build (Only for Ubuntu ≥20.04)

```
    $ sudo apt-get install build-essential automake autoconf libtool pkg-config intltool libcurl4-openssl-dev libglib2.0-dev libevent-dev libminiupnpc-dev libgtk-3-dev libappindicator3-dev libssl-dev libsystemd-dev
    $ git clone --recurse-submodules https://github.com/transmission/transmission Transmission
    $ cd Transmission
    $ cmake -DCMAKE_BUILD_TYPE=Release ..
    $ cd build
    $ cmake --build .
    $ sudo cmake --install .
```

## For systemctl service

In ```/lib/systemd/system``` directory, create a file named ```transmission-daemon.service``` with following content.  
Also, make sure you have created user ```transmission``` or alternative.

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

In ```/etc/init.d``` directory, create a file named ```transmission-daemon``` with following content.  

```
N INIT INFO
# Provides:          transmission-daemon
# Required-Start:    networking
# Required-Stop:     networking
# Default-Start:     2 3 5
# Default-Stop:      0 1 6
# Short-Description: Start the transmission BitTorrent daemon client.
### END INIT INFO

# Original Author: Lennart A. JÃŒtte, based on Rob Howell's script
# Modified by Maarten Van Coile & others (on IRC)

# Do NOT "set -e"

#
# ----- CONFIGURATION -----
#
# For the default location Transmission uses, visit:
# http://trac.transmissionbt.com/wiki/ConfigFiles
# For a guide on how set the preferences, visit:
# http://trac.transmissionbt.com/wiki/EditConfigFiles
# For the available environement variables, visit:
# http://trac.transmissionbt.com/wiki/EnvironmentVariables
#
# The name of the user that should run Transmission.
# It's RECOMENDED to run Transmission in it's own user,
# by default, this is set to 'transmission'.
# For the sake of security you shouldn't set a password
# on this user
USERNAME=transmission


# ----- *ADVANCED* CONFIGURATION -----
# Only change these options if you know what you are doing!
#
# The folder where Transmission stores the config & web files.
# ONLY change this you have it at a non-default location
#TRANSMISSION_HOME="/var/config/transmission-daemon"
#TRANSMISSION_WEB_HOME="/usr/share/transmission/web"
#
# The arguments passed on to transmission-daemon.
# ONLY change this you need to, otherwise use the
# settings file as per above.
#TRANSMISSION_ARGS=""


# ----- END OF CONFIGURATION -----
#
# PATH should only include /usr/* if it runs after the mountnfs.sh script.
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
DESC="bittorrent client"
NAME=transmission-daemon
DAEMON=$(which $NAME)
PIDFILE=/var/run/$NAME.pid
SCRIPTNAME=/etc/init.d/$NAME

# Exit if the package is not installed
[ -x "$DAEMON" ] || exit 0

# Read configuration variable file if it is present
[ -r /etc/default/$NAME ] && . /etc/default/$NAME

# Load the VERBOSE setting and other rcS variables
[ -f /etc/default/rcS ] && . /etc/default/rcS

#
# Function that starts the daemon/service
#

do_start()
{
    # Export the configuration/web directory, if set
    if [ -n "$TRANSMISSION_HOME" ]; then
          export TRANSMISSION_HOME
    fi
    if [ -n "$TRANSMISSION_WEB_HOME" ]; then
          export TRANSMISSION_WEB_HOME
    fi

    # Return
    #   0 if daemon has been started
    #   1 if daemon was already running
    #   2 if daemon could not be started
    start-stop-daemon --chuid $USERNAME --start --pidfile $PIDFILE --make-pidfile \
            --exec $DAEMON --background --test -- -f $TRANSMISSION_ARGS > /dev/null \
            || return 1
    start-stop-daemon --chuid $USERNAME --start --pidfile $PIDFILE --make-pidfile \
            --exec $DAEMON --background -- -f $TRANSMISSION_ARGS \
            || return 2
}

#
# Function that stops the daemon/service
#
do_stop()
{
        # Return
        #   0 if daemon has been stopped
        #   1 if daemon was already stopped
        #   2 if daemon could not be stopped
        #   other if a failure occurred
        start-stop-daemon --stop --quiet --retry=TERM/10/KILL/5 --pidfile $PIDFILE --exec $DAEMON 
        RETVAL="$?"
        [ "$RETVAL" = 2 ] && return 2

        # Wait for children to finish too if this is a daemon that forks
        # and if the daemon is only ever run from this initscript.
        # If the above conditions are not satisfied then add some other code
        # that waits for the process to drop all resources that could be
        # needed by services started subsequently.  A last resort is to
        # sleep for some time.

        start-stop-daemon --stop --quiet --oknodo --retry=0/30/KILL/5 --exec $DAEMON
        [ "$?" = 2 ] && return 2

        # Many daemons don't delete their pidfiles when they exit.
        rm -f $PIDFILE

        return "$RETVAL"
}

case "$1" in
  start)
        echo "Starting $DESC" "$NAME..."
        do_start
        case "$?" in
                0|1) echo "   Starting $DESC $NAME succeeded" ;;
                *)   echo "   Starting $DESC $NAME failed" ;;
        esac
        ;;
  stop)
        echo "Stopping $DESC $NAME..."
        do_stop
        case "$?" in
                0|1) echo "   Stopping $DESC $NAME succeeded" ;;
                *)   echo "   Stopping $DESC $NAME failed" ;;
        esac
        ;;
  restart|force-reload)
        #
        # If the "reload" option is implemented then remove the
        # 'force-reload' alias
        #
        echo "Restarting $DESC $NAME..."
        do_stop
        case "$?" in
          0|1)
                do_start
                case "$?" in
                    0|1) echo "   Restarting $DESC $NAME succeeded" ;;
                    *)   echo "   Restarting $DESC $NAME failed: couldn't start $NAME" ;;
                esac
                ;;
          *)
                echo "   Restarting $DESC $NAME failed: couldn't stop $NAME" ;;
        esac
        ;;
  *)
        echo "Usage: $SCRIPTNAME {start|stop|restart|force-reload}" >&2
        exit 3
        ;;
esac
```