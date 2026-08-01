FROM kasmweb/ubuntu-jammy-desktop:1.17.0-rolling-daily

USER root

ENV DEBIAN_FRONTEND=noninteractive

RUN dpkg --add-architecture i386 && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
      wine64 \
      wine32 \
      unzip \
      wget \
      inkscape \
      fonts-liberation \
      fonts-wine \
      winbind && \
    rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/netica && \
    wget -q https://www.norsys.com/downloads/Netica_Win.zip -O /tmp/netica.zip && \
    unzip /tmp/netica.zip -d /opt/netica && \
    rm /tmp/netica.zip

RUN cat > /usr/local/bin/netica <<'EOF'
#!/usr/bin/env bash
set -e
export WINEPREFIX="${HOME}/.wine"
NETICA_EXE="$(find /opt/netica -type f \( -iname 'Netica.exe' -o -iname 'Netica32.exe' \) | head -n 1)"
if [ -z "$NETICA_EXE" ]; then
  echo "Netica executable not found" >&2
  exit 1
fi
exec wine "$NETICA_EXE"
EOF

RUN chmod +x /usr/local/bin/netica && \
    mkdir -p /home/kasm-default-profile/Desktop /dockerstartup/custom_startup && \
    cat > /home/kasm-default-profile/Desktop/Netica.desktop <<'EOF'
[Desktop Entry]
Version=1.0
Type=Application
Name=Netica
Comment=Bayesian network modelling
Exec=/usr/local/bin/netica
Icon=applications-science
Terminal=false
Categories=Education;Science;
StartupNotify=true
EOF

RUN cat > /dockerstartup/custom_startup/netica.sh <<'EOF'
#!/usr/bin/env bash
/usr/bin/desktop_ready
sleep 2
/usr/local/bin/netica >/tmp/netica.log 2>&1 &
EOF

RUN chmod +x /home/kasm-default-profile/Desktop/Netica.desktop \
    /dockerstartup/custom_startup/netica.sh && \
    chown -R 1000:0 /home/kasm-default-profile && \
    /dockerstartup/set_user_permission.sh /home/kasm-default-profile

USER 1000
WORKDIR /home/kasm-user
