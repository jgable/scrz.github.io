---
layout: default
title: scrz
---

## How do I create an image?

An image is a filesystem snapshot that is used as the rootfs for the container.
You can create your own image from scratch, or you can start with one of the
base images (ubuntu-13.04-64bit) and modify it as required. The scrz repository
contains a script which creates a fresh ubuntu-13.04-64bit image.

## How is scrz different from Capistrano or Fabric?

Both Capistrano and Fabric require that the person performing the deployment
has SSH access to the servers. Scrz uses a management server and developers
only need access to that. Scrz then automatically distributes your application
to the servers.

## How is scrz different from Docker?

Docker is very similar, both in function and implementation. Probably the
biggest difference, other than the implementation language, is that scrz uses
of btrfs instead of aufs.

## Can I use the authority together with docker?

Some people have asked me whether they can use the authority to configure
servers running docker. Technically, that should be possible. Both scrz
supervisors and docker use a very similar entity model (images, services,
ports, volumes etc). It's just a matter of writing a tool that extracts the
data from the supervisor and reconfigures docker accordingly. I'm not planing
to work on such tool, but if you have spare resources to do so, I'll do my best
to help you.
