const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const kubectlCommand = process.platform === 'win32' ? 'kubectl.exe' : 'kubectl';

const getKubeconfigCandidates = () => {
  const candidates = [
    process.env.K3S_KUBECONFIG,
    process.env.KUBECONFIG,
    path.resolve(__dirname, '../.kube/lens-kubeconfig.yaml'),
    path.resolve(__dirname, '../../../../../k3s/kubeconfig.yaml'),
    path.join(os.homedir(), '.kube', 'config')
  ];

  return [...new Set(candidates.filter(Boolean))];
};

const resolveKubeconfig = () =>
  getKubeconfigCandidates().find((candidate) => fs.existsSync(candidate));

const getKubectlArgs = (kubeconfig, args) => [
  ...(kubeconfig ? ['--kubeconfig', kubeconfig] : []),
  ...args
];

const checkKubectl = (kubeconfig) => {
  const contextResult = spawnSync(
    kubectlCommand,
    getKubectlArgs(kubeconfig, ['config', 'current-context']),
    { encoding: 'utf8' }
  );

  if (contextResult.error) {
    return { ok: false, message: contextResult.error.message };
  }

  if (contextResult.status !== 0 || !contextResult.stdout.trim()) {
    return {
      ok: false,
      message: contextResult.stderr.trim() || 'Kubeconfig không có current-context hợp lệ.'
    };
  }

  const clusterResult = spawnSync(
    kubectlCommand,
    getKubectlArgs(kubeconfig, [
      'config',
      'view',
      '--minify',
      '-o',
      'jsonpath={.clusters[0].cluster.server}'
    ]),
    { encoding: 'utf8' }
  );

  if (clusterResult.error) {
    return { ok: false, message: clusterResult.error.message };
  }

  if (clusterResult.status !== 0 || !clusterResult.stdout.trim()) {
    return {
      ok: false,
      message: clusterResult.stderr.trim() || 'Current-context không tham chiếu tới cluster hợp lệ.'
    };
  }

  return {
    ok: true,
    context: contextResult.stdout.trim(),
    server: clusterResult.stdout.trim()
  };
};

module.exports = {
  checkKubectl,
  getKubectlArgs,
  kubectlCommand,
  resolveKubeconfig
};
