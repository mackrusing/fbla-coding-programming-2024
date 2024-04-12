{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShellNoCC {
    nativeBuildInputs = with pkgs; [ 
      bun
      nodejs_20
      curl
     ];
}
