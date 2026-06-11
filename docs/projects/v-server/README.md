# V-Server Setup

This page documents how I configured my very first cloud server instance in the Developer Akademie DevSecOps Course.

For this project, I set up a virtual server (VPS) by setting up SSH keys, configuring the SSH daemon, installing and configuring Nginx and configuring Git.

## TOC

- [Quickstart](#quickstart)
- [Configuration steps](#configuration-steps)
    - [Configuring SSH keys](#configuring-ssh-keys)
        - [Creating a key pair](#creating-a-key-pair)
        - [Copying the key to the server](#copying-the-key-to-the-server)
        - [Creating a config](#creating-a-config)
    - [Disabling password login](#disabling-password-login)
    - [Installing Nginx](#installing-nginx)
        - [Updating package repositories](#updating-package-repositories)
        - [Actually installing Nginx](#actually-installing-nginx)
    - [Configuring Nginx](#configuring-nginx)
        - [Creating the new configuration](#creating-the-new-configuration)
        - [Removing the old configuration](#removing-the-old-configuration)
    - [Configuring Git](#configuring-git)
        - [Configuring username & email](#configuring-username--email)
        - [Adding SSH keys to GitHub](#adding-ssh-keys-to-github)
- [Further References](#further-references)

## Quickstart

1. Generate an SSH key pair (skip if you already have one)
    ```bash
    ssh-keygen -t ed25519
    ```

2. Copy your public key to the server
    ```bash
    ssh-copy-id -i ~/.ssh/id_ed25519 <username>@<host>
    ```

3. Add the server to your local ~/.ssh/config
    ```bash
    Host VServer
        Port 22
        User <username>
        HostName <host>
        IdentityFile ~/.ssh/id_ed25519
    ```

4. Disable password login

    Replace `#PasswordAuthentication yes` with `PasswordAuthentication no` in `/etc/ssh/sshd_config` on the server, then restart:

    ```bash
    sudo systemctl restart ssh.service
    ```

5. Install Nginx

    ```bash
    sudo apt update
    sudo apt install nginx
    ```

6. Create your `alternate-index.html` file in `/var/www/alternatives`

7. Create your Nginx config at `/etc/nginx/sites-enabled/alternatives`

    ```nginx
    server {
        listen 8081;
        listen [::]:8081;

        root /var/www/alternatives;
        index alternate-index.html;

        location / {
            try_files $uri $uri/ =404;
        }
    }
    ```

    Then restart Nginx:

    ```bash
    sudo systemctl restart nginx.service
    ```

8. Configure Git

    ```bash
    git config --global user.name "<username>"
    git config --global user.email "<email>"
    ```

9. Create an SSH key pair on the server and add the public key to your [GitHub Settings](https://github.com/settings/keys).

## Configuration steps

### 1. Configuring SSH keys

> **NOTE:**
> These steps need to be done on your computer, not the server!

At first, I added the public key from my computer to the server's keystore.
This allows me to log into the server without having to type my password every time.

#### 1.1. Creating a key pair

I created my SSH keys before to use them on GitHub, but the process is as follows:

1. Run `ssh-keygen -t ed25519`
    - The `-t ed25519` flag tells `ssh-keygen` to use the `ed25519` algorithm, which is a very fast, but also secure algorithm. <sup>[1](#further-references)</sup>
2. Enter a filename where the key will be saved, or just press enter to use the default value.
3. Optionally enter a password, or skip it by pressing enter without typing anything in.
4. You will now have a key and a key.pub (the filename depends on what you input at step #1).

> **WARNING:**
> Don't share the key (without the `.pub` extension) with anyone, treat it like a password!

#### 1.2. Copying the key to the server

To copy the key to my server, I used the `ssh-copy-id` command:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519 <username>@<host>
```

| Parameter | Explanation |
|-----------|-------------|
| `-i ~/.ssh/id_ed25519` | The identity. This is the path to the SSH keys generated in step 1.1. |
| `<username>` | The username for which to add the key. |
| `<host>` | The hostname of the server. In my case, this was an IP address, but it could also be a hostname or domain. |

After that, I was able to log in without my password, simply by running `ssh <user>@<host>`.

#### 1.3. Creating a config

To further reduce the amount of writing required to connect to the server, I created a config and defined it at a host.

At first, I created and edited the `~/.ssh/config` file. There, I added my server as a host:

```
Host VServer
  Port 22
  User my-username
  HostName 123.123.123.123
  IdentityFile ~/.ssh/id_ed25519
```

`my-username` and `123.123.123.123` are just placeholders for my actual username and the server's IP address.

The `IdentityFile` points to the keys I've created in step 1.1.

### 2. Disabling password login

Because I can now sign in with a key instead of a password, and passwords are usually way shorter, and therefore easier to brutefore, I disabled the ability to login with a password.

The config file is located at `/etc/ssh/sshd_config`. To edit it, I used vim, but you could also use nano or any other terminal-based editor.

```bash
sudo vim /etc/ssh/sshd_config
```

> [!NOTE]
> Because the config file required root permissions to edit, I used `sudo`.
> This runs vim as an administrator.

Inside the file I searched for

```
#PasswordAuthentication yes
```

The `#` at the start indicated that this option is commented out.
To uncomment it, I removed the `#` and changed the value from `yes` to `no`, to disable passwords.

```
PasswordAuthentication no
```

Then I saved the file (using `:x` in vim). For these changes to take effect, the SSH server needs to be restarted. To do that, I used `systemctl`:

```
sudo systemctl restart ssh.service
```

When I now try to sign in (using `-o PubKeyAuthentication=no` to force SSH to use passwords), I get an error:

```bash
$ ssh VServer -o PubKeyAuthentication=no

my-username@123.123.123.123: Permission denied (publickey).
```

This means it's no longer possible to use passwords to log in!

### 3. Installing Nginx

#### 3.1. Updating package repositories

This wasn't necessarily needed, because the server was freshly deployed, but I decided to update the package repositories anyways.

```bash
sudo apt update
```

This command uses `apt`, which is the package manager Ubuntu server uses, to update it's repositories.

Then, I also updated any outdated packages, using:

```bash
sudo apt upgrade
```

#### 3.2. Actually installing Nginx

Installing Nginx was really simple, I just used `apt` again, this time to install a new package:

```bash
sudo apt install nginx
```

Thats it! Nginx was now installed and running, which I checked using systemctl:

```
➜  ~ sudo systemctl status nginx
● nginx.service - A high performance web server and a reverse proxy server
     Loaded: loaded (/usr/lib/systemd/system/nginx.service; enabled; preset: enabled)
     Active: active (running) since Wed 2026-06-10 15:23:39 CEST; 7min ago
       Docs: man:nginx(8)
    Process: 4474 ExecStartPre=/usr/sbin/nginx -t -q -g daemon on; master_process on; (code=exited, status=0/SUCC>
    Process: 4476 ExecStart=/usr/sbin/nginx -g daemon on; master_process on; (code=exited, status=0/SUCCESS)
   Main PID: 4505 (nginx)
      Tasks: 3 (limit: 4531)
     Memory: 2.4M (peak: 5.3M)
        CPU: 36ms
     CGroup: /system.slice/nginx.service
             ├─4505 "nginx: master process /usr/sbin/nginx -g daemon on; master_process on;"
             ├─4508 "nginx: worker process"
             └─4509 "nginx: worker process"
```

Typing in the IP address of the server into my browser, I saw the default Nginx landing page:

![Nginx default landing page](img/nginx-default.png)

### 4. Configuring Nginx


#### 4.1. Creating the new configuration

To add an alternative page to my Nginx config, I created a new directory inside of `/var/www` that will contain all the necessary files.

```
sudo mkdir /var/www/alternatives
```

I also created an alternate-index.html file, and copied it into `/var/www/alternatives`.

The html file also includes an image of my cat, which I copied to `/var/www/alternatives` too.

Then, I created a new file at `/etc/nginx/sites-enabled/alternatives`, in which I created a new `server`, that points to the created directory:


```nginx
server {
    listen 8081;
    listen [::]:8081;

    root /var/www/alternatives;
    index alternate-index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

The `listen` configuration options tell Nginx which on which port it should listen. In this example, I used port 8081.

`root /var/www/alternatives;` tells nginx the root of the content.
This directory will be used to resolve the `try_files` action below.

`index alternate-index.html;`: This tell Nginx the index of this server, meaning what will be served if no specific file was requested.

`location / {...}`: This is the root location. Any request made to this server will land here.

`try_files $uri $uri/ =404;` tells Nginx to try to respond with a file that has the same name as the requested file name. If no file was found, it searches for directories (`$uri/`). If also no directory is found, it returns a 404 error (`=404`).

Just like the SSH server, Nginx needs to be restarted to apply the new configuration:

```
sudo systemctl restart nginx.service
```

When I now open my servers IP address with the port 8081, I can see this beautiful page:

![alternate page](img/alternate-page.png)

It works! 😸

#### 4.2. Removing the old configuration

The default configuration is stored inside `/etc/nginx/sites-enabled/default`.

To remove it, I deleted this file, as well as the default landing page, located at `/var/www/html/index.nginx-debian.html`:

```bash
sudo rm /etc/nginx/sites-enabled/default /var/www/html/index.nginx-debian.html
```

After reloading nginx again, it was no longer possible to access the server on port 80.

![Error](img/port-80-error.png)

### 5. Configuring Git

#### 5.1. Configuring username & email

To configure my username and email globally, I used `git config`:

```bash
git config --global user.name <username>
git config --global user.email <email@example.org>
```

#### 5.2. Adding SSH keys to GitHub

First, I generated a new key pair on the server, exactly as described in 1.1.

Then, I opened my [GitHub key settings](https://github.com/settings/keys) and clicked "New SSH key" and pasted the content of ~/.ssh/id_ed25519.pub into the "Key" field.
I also entered a Title so I know where the key belongs to in the future.

After clicking "Add SSH key" and confirming my Identity, I could use GitHub through SSH on my server!

## Further References

1. Learn more about ed25519: https://ed25519.cr.yp.to/
2. Project checklist: [PDF](VServer%20Checkliste.pdf)