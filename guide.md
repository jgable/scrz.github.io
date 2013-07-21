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


# Usage

In this section you'll learn how to configure and use scrz. Let's first start
in the simple mode, running locally without an authority. Make sure the
supervisor is running and in another terminal run:

<ul class="command-sequence">
    <li class="cmd">./dist/build/scrz/scrz run ubuntu-13.04-64bit -- /bin/login -f root</li>
    <li class="out">The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

Welcome to Ubuntu 13.04 (GNU/Linux 3.8.0-25-generic x86_64)

* Documentation:  https://help.ubuntu.com/
root@bxdkmusyfx:~# logout
[2013-07-21 10:09:33] Saving image under id edwdjfighe</li>
</ul>

This will start a new container based on the `ubuntu-13.04-64bit` image. The
container is assigned a random id, in this case `bxdkmusyfx`. After you exit,
the container filesystem is automatically snapshotted and saved as an image
(here `edwdjfighe`).

You can use many other commands, they are described in detail <a
href="/commands.html">here</a>.


# Configuration

There are three different sources of configuration that scrz uses: *Socket*,
*Local* and *Authority*. We've already seen Socket, it's when you use scrz
commands to create and run new containers.

Local configuration is stored in `/etc/scrz/config.json`. The supervisor
detects any changes in that file and automatically starts and stops
containers. (TODO: explain the config file format)

If you have an authority server running, the supervisor can also fetch its
configuration from there. Simply pass the authority server address to the
supervisor command:

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
