---
layout: default
title: supervisor
---

<div id="menu">
    <h1>Commands</h1>
    <ul></ul>
</div>

# Commands

The supervisor listens on a unix socket and accepts commands through it. By
default, only the user the supervisor is running under can send commands. This
typically is the root.

Certain commands don't require contacting the supervisor and work even if the
supervisor is not running.

<div id="cmd-ps" class="command-title">List all containers</div>
<ul class="command-sequence">
    <li class="cmd">scrz ps</li>
    <li class="out">ID           IMAGE                COMMAND             STATUS
ivevpvcnpa   ubuntu-13.04-64bit   /sbin/init          running
qruqgjfftb   rails-app-v3         /srv/rails/server   stopped</li>
</ul>

<div id="cmd-stop" class="command-title">Stop a container</div>
<ul class="command-sequence">
    <li class="cmd">scrz stop &lt;container id&gt;</li>
    <li class="out">Container [id] has been stopped.</li>
</ul>

<div id="cmd-run" class="command-title">Run a command in a new container</div>
<ul class="command-sequence">
    <li class="cmd">scrz run &lt;image-id&gt; &lt;command...&gt;</li>
    <li class="out">...</li>
</ul>

The container will be destroyed when the command exits. This command is useful
if you want to create a new container, do something with it, and when you are
done have it destroyed.

<ul class="command-options">
    <li>--save-as &lt;image-id&gt;</li>
    <li>--mount &lt;mount-point&gt; &lt;host-path&gt;</li>
</ul>

<div id="cmd-list-images" class="command-title">List all available images</div>
<ul class="command-sequence">
    <li class="cmd">scrz list-images</li>
    <li class="out">1c4231bb76195e47bb8d4d10c0d81f01150f5437
lpaxaanwcj
mail-v1
ubuntu-13.04-64bit</li>
</ul>

<div id="cmd-snapshot" class="command-title">Snapshot a container filesystem</div>
<ul class="command-sequence">
    <li class="cmd">{{ 'scrz snapshot <container-id> <image-id>' | xml_escape }}</li>
</ul>

Snapshots the container filesystem into a new image.

<div id="cmd-destroy" class="command-title">Destroy a container</div>
<ul class="command-sequence">
    <li class="cmd">{{ 'scrz destroy <container-id>' | xml_escape }}</li>
</ul>

The command will stop the container if necessary, then destroy the container
along with all the resources it used. If you want to preserve the root
filesystem for later use, create a snapshot first.

<div id="cmd-quit" class="command-title">Shutdown the supervisor</div>
<ul class="command-sequence">
    <li class="cmd">scrz quit</li>
</ul>

If the supervisor was started using sysvinit, upstart, systemd or another init
system, it will likely be automatically restarted. In that case, use the init
system to shut it down.

<div id="cmd-console" class="command-title">Attach to a console</div>
<ul class="command-sequence">
    <li class="cmd">{{ 'scrz console <container-id>' | xml_escape }}</li>
    <li class="out">Ubuntu 13.04 ydytubjhrg tty1

ydytubjhrg login:</li>
</ul>

If the container is accepting connections on a tty, you can use this command to attach
to one.
