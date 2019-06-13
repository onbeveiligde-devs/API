FROM archlinux/base
RUN pacman -Sy --noconfirm reflector
RUN reflector --verbose --latest 25 --sort rate --save /etc/pacman.d/mirrorlist
RUN pacman -Syu --noconfirm nodejs node-gyp npm git openssh python base-devel
RUN ln -s /usr/bin/node /usr/bin/nodejs
WORKDIR /srv/http
COPY ./install.data/keys/cm_rsa /root/.ssh/id_rsa
RUN chmod 700 /root/.ssh/id_rsa
RUN eval $(ssh-agent -s) && ssh-add /root/.ssh/id_rsa && ssh-keyscan vs-ssh.visualstudio.com >> ~/.ssh/known_hosts && git clone AvansIVT@vs-ssh.visualstudio.com:v3/AvansIVT/A1/CheckCreatorApi /srv/http
RUN npm set registry https://registry.npmjs.org/
RUN CFLAGS=-std=gnu11 npm install
RUN pacman -Runcd --noconfirm git openssh python
EXPOSE 3000/tcp
CMD npm start