let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/tarball/f8de91f6ad163406f09d715dee450e0e795d21ba";
  pkgs = import nixpkgs { config = {}; overlays = []; };
in

pkgs.mkShellNoCC {
  packages = with pkgs; [
    bun
    nodejs_20
    curl
  ];
}
