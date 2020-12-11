with (import <nixpkgs> {});
mkShell {
  buildInputs = [
    nodejs-14_x
#    nodePackage
  ];
  shellHook = ''
    export PATH=$PATH:$PWD/node_modules/.bin
  '';
}