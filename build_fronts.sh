#!/usr/bin/env bash

set -Eeuo pipefail

ROOT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ENV_BACKUP_DIR=''
ENV_DESTINATIONS=()
ENV_EXISTED=()

frontend_names=(
  "Login"
  "SignUp"
  "Home"
  "Principal"
  "Dashboard"
  "Reportes"
)

frontend_dirs=(
  "Login/login-frontend/gestor-tareas-login-frontend/frontend/login-usuario"
  "SignUp/signup-frontend/frontend/signup-usuario"
  "Home/home-page"
  "Principal/principal-frontend"
  "Dashboard/dashboard-frontend/dashboard"
  "Reportes/reportes-frontend/reportes"
)

cleanup() {
  trap - EXIT INT TERM
  set +e

  for index in "${!ENV_DESTINATIONS[@]}"; do
    env_file="${ENV_DESTINATIONS[$index]}/.env"
    if [[ "${ENV_EXISTED[$index]}" == 1 ]]; then
      cp -- "$ENV_BACKUP_DIR/$index" "$env_file"
    else
      rm -f -- "$env_file"
    fi
  done

  if [[ -n "$ENV_BACKUP_DIR" ]]; then
    rm -rf -- "$ENV_BACKUP_DIR"
  fi
}

trap cleanup EXIT
trap 'exit 130' INT
trap 'exit 143' TERM

if ! command -v npm >/dev/null 2>&1; then
  printf 'Error: npm no está instalado o no está disponible en PATH.\n' >&2
  exit 1
fi

if [[ ! -f "$ROOT_DIR/.env" ]]; then
  printf 'Error: no se encontró el archivo .env en la raíz del proyecto.\n' >&2
  exit 1
fi

env_dirs=("$ROOT_DIR/ReactLibrary")
for frontend_dir in "${frontend_dirs[@]}"; do
  if [[ ! -f "$ROOT_DIR/$frontend_dir/package.json" ]]; then
    printf 'Error: no se encontró %s/package.json\n' "$frontend_dir" >&2
    exit 1
  fi
  env_dirs+=("$ROOT_DIR/$frontend_dir")
done

ENV_BACKUP_DIR="$(mktemp -d)"
for index in "${!env_dirs[@]}"; do
  env_dir="${env_dirs[$index]}"
  env_file="$env_dir/.env"

  if [[ -e "$env_file" ]]; then
    cp -- "$env_file" "$ENV_BACKUP_DIR/$index"
    ENV_EXISTED+=(1)
  else
    ENV_EXISTED+=(0)
  fi

  ENV_DESTINATIONS+=("$env_dir")
  cp -- "$ROOT_DIR/.env" "$env_file"
done

printf 'Construyendo la biblioteca compartida...\n'
(cd "$ROOT_DIR/ReactLibrary" && npm run build)

printf '\nConstruyendo los seis frontends...\n'
for index in "${!frontend_dirs[@]}"; do
  frontend_dir="${frontend_dirs[$index]}"
  frontend_name="${frontend_names[$index]}"

  printf '\n[%s] npm run build\n' "$frontend_name"
  (cd "$ROOT_DIR/$frontend_dir" && npm run build)
done

printf '\nBiblioteca y seis frontends construidos correctamente.\n'
