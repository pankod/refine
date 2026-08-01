#!/usr/bin/env bash
# ============================================================
# 🚀 DEPLOY K3s Script - GreenIQ v2.0.10
# Chạy: bash deploy-k3s.sh
# ============================================================
set -e

KUBECONFIG_PATH="./backend/.kube/lens-kubeconfig.yaml"
VERSION="2.0.14"
DOCKER_USER="${DOCKER_USER:-vtaboss}"
FRONTEND_IMAGE="${FRONTEND_IMAGE:-$DOCKER_USER/greeniq-frontend}"
BACKEND_IMAGE="${BACKEND_IMAGE:-$DOCKER_USER/greeniq-backend}"
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"

# --- Màu sắc output ---
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; NC='\033[0m'
info()  { echo -e "${GREEN}[✔]${NC} $1"; }
warn()  { echo -e "${YELLOW}[!]${NC} $1"; }
error() { echo -e "${RED}[✘]${NC} $1"; exit 1; }

echo ""
echo "=================================================="
echo "  🚀 GreenIQ Deploy → K3s  (v$VERSION)"
echo "=================================================="

# --- Kiểm tra Docker ---
info "Kiểm tra Docker..."
docker info > /dev/null 2>&1 || error "Docker chưa chạy! Hãy khởi động Docker Desktop trước."
info "Kiểm tra đăng nhập Docker Hub cho namespace $DOCKER_USER..."
docker login > /dev/null 2>&1 \
  || error "Chưa đăng nhập Docker Hub. Hãy chạy: docker login --username $DOCKER_USER"

# --- Kiểm tra kubectl & kubeconfig ---
info "Kiểm tra kết nối K3s..."
kubectl --kubeconfig="$KUBECONFIG_PATH" get nodes > /dev/null 2>&1 || error "Không kết nối được K3s. Kiểm tra lại $KUBECONFIG_PATH"
kubectl --kubeconfig="$KUBECONFIG_PATH" get nodes

# ============================================================
# BƯỚC 1: BUILD FRONTEND
# ============================================================
echo ""
warn "📦 BƯỚC 1/5: Build Frontend Docker Image..."
cd "$PROJECT_ROOT"
docker build \
  --platform linux/amd64 \
  -t "$FRONTEND_IMAGE:v$VERSION" \
  -t "$FRONTEND_IMAGE:latest" \
  -f Dockerfile \
  . && info "Frontend build thành công!"

# ============================================================
# BƯỚC 2: BUILD BACKEND
# ============================================================
echo ""
warn "📦 BƯỚC 2/5: Build Backend Docker Image..."
cd "$PROJECT_ROOT/backend"
docker build \
  --platform linux/amd64 \
  -t "$BACKEND_IMAGE:v$VERSION" \
  -t "$BACKEND_IMAGE:latest" \
  -f Dockerfile \
  . && info "Backend build thành công!"

# ============================================================
# BƯỚC 3: PUSH LÊN DOCKER HUB
# ============================================================
echo ""
warn "☁️  BƯỚC 3/5: Push Images lên Docker Hub..."
cd "$PROJECT_ROOT"

docker push "$FRONTEND_IMAGE:v$VERSION" && info "Frontend v$VERSION pushed!"
docker push "$FRONTEND_IMAGE:latest"

docker push "$BACKEND_IMAGE:v$VERSION" && info "Backend v$VERSION pushed!"
docker push "$BACKEND_IMAGE:latest"

# ============================================================
# BƯỚC 4: CẬP NHẬT K3S PODS (Rolling Update)
# ============================================================
echo ""
warn "🔄 BƯỚC 4/5: Cập nhật K3s Pods (Rolling Update)..."

kubectl --kubeconfig="$KUBECONFIG_PATH" set image \
  deployment/vtapro-backend \
  vtapro-backend="$BACKEND_IMAGE:v$VERSION" && info "Backend K3s → $VERSION"

kubectl --kubeconfig="$KUBECONFIG_PATH" set image \
  deployment/vtapro-frontend \
  vtapro-frontend="$FRONTEND_IMAGE:v$VERSION" 2>/dev/null \
  && info "Frontend K3s → $VERSION" \
  || warn "Frontend deployment không tìm thấy"

info "Chờ Backend rollout hoàn tất..."
kubectl --kubeconfig="$KUBECONFIG_PATH" rollout status deployment/vtapro-backend --timeout=120s

# ============================================================
# BƯỚC 5: KIỂM TRA SỨC KHỎE PODS
# ============================================================
echo ""
warn "🩺 BƯỚC 5/5: Kiểm tra sức khỏe Pods..."
kubectl --kubeconfig="$KUBECONFIG_PATH" get pods -o wide
echo ""
kubectl --kubeconfig="$KUBECONFIG_PATH" top pods 2>/dev/null || warn "metrics-server chưa cài"

# ============================================================
# COMMIT & PUSH GIT
# ============================================================
echo ""
warn "📝 Git Commit & Push..."
cd "$PROJECT_ROOT"
git add package.json backend/package.json
git commit -m "chore: bump version to v$VERSION" 2>/dev/null || warn "Không có gì mới để commit"
git push 2>/dev/null || warn "Git push thất bại"

echo ""
echo "=================================================="
echo -e "  ${GREEN}✅ Deploy hoàn tất! GreenIQ v$VERSION${NC}"
echo "=================================================="
echo ""
echo "  Frontend : $FRONTEND_IMAGE:v$VERSION"
echo "  Backend  : $BACKEND_IMAGE:v$VERSION"
echo ""
echo "  📊 Xem logs:"
echo "  kubectl --kubeconfig=$KUBECONFIG_PATH logs -f deployment/vtapro-backend"
echo ""

