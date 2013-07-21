---
layout: default
title: scrz
---

# Overview

scrz comes in two parts. One part is a the management server where you manage
your deployment configuration, and the other is a process supervisor which
runs and supervises your services.


# Installation

## Supervisor <span class="github-repo-link">(<a href="https://github.com/scrz/scrz">GitHub repository</a>)</span>

The supervisor is written in Haskell. To compile it you only need GHC and
cabal. Download the source and run `cabal configure` followed by `cabal
build`. The binary will then be available at `dist/build/scrz/scrz`.

Before you can start the supervisor, you need to prepare the host. Certain
low-level system configuration is hard to do from Haskell, so you have to do
it manually. The requirements are:

 - lxc-tools version 0.9.0 or later installed and in PATH.
 - iptables and btrfs-tools must be installed.
 - `/srv/scrz` must exist and be a btrfs filesystem.
 - A network bridge with name `scrz` must exist and have IP address 10.1.0.1/24.
 - IPv4 forwarding must be enabled in the kernel.
 - NAT masquerading must be set up for the network that scrz is using.

The repository has a script, `script/setup-host` which does all of it except
the btrfs setup. To start the supervisor, run the binary and give it as first
and only argument `supervisor`, eg:

<ul class="command-sequence">
    <li class="cmd">dist/build/scrz/scrz supervisor</li>
    <li class="out">[2013-07-21 07:26:07] Initializing iptables
...</li>
</ul>

I recommend using init scripts to start the supervisor. A sample init script
for ubuntu's upstart looks like this:

    respawn
    env LANG=en_US.UTF-8
    env PATH=/opt/lxc/0.9.0/bin:/usr/bin:/usr/sbin:/sbin:/bin
    exec /usr/bin/scrz supervisor

Save it under `/etc/init/scrz.conf` and start using `start scrz`.

## Authority <span class="github-repo-link">(<a href="https://github.com/scrz/authority">GitHub repository</a>)</span>

The authority is a Ruby on Rails web server which manages the configuration of
supervisors. It is optional, the supervisors can run just fine without an
authority.

TODO: Explain how to install the authority.

# Images

Images are filesystem snapshots which can be turned into running containers.
The snapshot must contain everything except the kernel, which is provided by
the host. One way to create an image is to use debootstrap to install Ubuntu
into an empty directory. You can use the `script/create-ubuntu-13.04-image`
script which is included in the supervisor repository to create an image.

<ul class="command-sequence">
    <li class="cmd">./script/create-ubuntu-13.04-image</li>
    <li class="out">Create subvolume '/srv/scrz/images/ubuntu-13.04-64bit/volume'
I: Retrieving Release
I: Retrieving Packages
...</li>
</ul>


# Configuration

There are three different sources of configuration that scrz uses: *Socket*,
*Local* and *Remote*. Socket is used when you manually send commands to the
superviser through the local unix socket. Any changes made through the socket
are not saved and lost when you restart the supervisor. Local configuration is
stored in `/etc/scrz/config.json`. Any changes to that file are picked up
automatically and the supervisor starts/stops containers accordingly. If you
have an authority server running, the supervisor can also fetch its
configuration from there. Simply pass the authority server address to the
supervisor command.


## Socket

The simplest way to start with scrz is to use the socket to create containers.
Make sure the supervisor is running and in another terminal run:

<ul class="command-sequence">
    <li class="cmd">./dist/build/scrz/scrz run ubuntu-13.04-64bit -- /bin/login -f root</li>
    <li class="out">Welcome to Ubuntu 13.04 (GNU/Linux 3.8.0-25-generic x86_64)
root@bxdkmusyfx:~#</li>
</ul>

This will start a new container based on the `ubuntu-13.04-64bit` image. The
container is assigned a random id, in this case `bxdkmusyfx`. After you exit,
the container filesystem is automatically snapshotted and saved as an image
(here `edwdjfighe`).

<ul class="command-sequence">
    <li class="out">root@bxdkmusyfx:~# logout
[2013-07-21 10:09:33] Saving image under id edwdjfighe</li>
</ul>

Commands are described in detail [here](/commands.html).



## Local

Here is an sample config file you can put into `/etc/scrz/config.json`.

    {
        "id": 1,
        "fqdn": "localhost",
        "services": [{
            "id": 1,
            "revision": 1,
            "command": [ "/sbin/init" ],
            "image": {
                "id": "ubuntu-13.04-64bit",
                "checksum": "checksum-is-ignored",
                "size": 0
            },
            "ports": [],
            "environment": [],
            "volumes": []
        }]
    }

The supervisor will start a new container using the ubuntu-13.04-64bit image
and run the `/sbin/init` command in it. If you then list all containers it will
show up, like this:

<ul class="command-sequence">
    <li class="cmd">./dist/build/scrz/scrz ps</li>
    <li class="out">ID           IMAGE                COMMAND      STATUS
ghquoboalr   ubuntu-13.04-64bit   /sbin/init   running</li>
</ul>


## Remote

Start the supervisor by giving it the base url to the remote authority. The
supervisor will regularly poll the authority for configuration changes.

<ul class="command-sequence">
    <li class="cmd">dist/build/scrz/scrz supervisor http://scrz.domain.tld</li>
</ul>



# Notes and Warnings

I'm glad you found scrz interesting enough to read to the end of this guide.

Scrz is being used in production at a smaller site. But there probably are
lots of bugs. Some parts are also incomplete, as I haven't had the time to
implement all that I wanted.

If you find the project interesting and want to contribute, <a
href="/contact.html">contact</a> me or fork the repos and send me pull
requests.
