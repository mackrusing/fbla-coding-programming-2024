#! /usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash bun nodejs_20
cd /srv/fbla-coding-programming-2024/server
PORT=3001 bun run start
