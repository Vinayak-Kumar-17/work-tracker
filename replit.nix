{ pkgs }: {
  deps = [
    pkgs.jdk17
    pkgs.maven
    pkgs.nodejs-18_x
    pkgs.bashInteractive
  ];
}
