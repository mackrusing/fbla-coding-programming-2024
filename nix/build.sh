#! /usr/bin/env nix-shell
#! nix-shell -i bash --pure
#! nix-shell -p bash bun nodejs_20
#! nix-shell -I nixpkgs=https://github.com/NixOS/nixpkgs/archive/e38d7cb66ea4f7a0eb6681920615dfcc30fc2920.tar.gz
cd /srv/2024-coding-programming/server
bun install
bun run build
