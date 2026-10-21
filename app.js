const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const state = { running: false };
const $ = (id) => document.getElementById(id);

function addLog(message) {
  const log = $('log');
  if (log.querySelector('.log-empty')) log.innerHTML = '';
  const line = document.createElement('div');
  line.className = 'log-line';
  line.textContent = message;
  log.appendChild(line);
  log.scrollTop = log.scrollHeight;
}

function update(progress, status, title, object, clue) {
  $('progressBar').style.width = `${progress}%`;
  $('progressText').textContent = `${progress}%`;
  $('statusPill').textContent = status;
  $('sceneTitle').textContent = title;
  $('sceneObject').textContent = object;
  if (clue) $('clue').textContent = clue;
}

async function getInitialClue() {
  await sleep(900);
  return '古老图书馆的月影地图：月光照到的地方，藏着第一枚星砂。';
}

async function decodeAncientScript(clue) {
  if (!clue) throw new Error('没有线索可以解码');
  await sleep(1100);
  return '羊皮卷被月光唤醒：穿过会唱歌的银叶林，去寻找沉睡的月门。';
}

async function crossSingingForest() {
  await sleep(1200);
  return '银叶林为你让路。一只萤火狐叼来星砂，指向了山谷深处。';
}

async function solveMoonGate() {
  await sleep(1100);
  return '月门谜题：把“星砂”放进“月影”里——门后的神庙亮起了蓝色火焰。';
}

async function searchTemple() {
  await sleep(1300);
  return '神庙守卫出现了！你用刚才的星砂点亮壁画，守卫微笑着让开了。';
}

async function openTreasureBox() {
  await sleep(1000);
  return '恭喜！你找到了传说中的月光宝石，整片山谷都亮了起来！';
}

async function findTreasure() {
  if (state.running) return;
  state.running = true;
  $('startButton').disabled = true;
  $('scene').classList.add('active');
  $('log').innerHTML = '';
  update(5, '读取地图', '古老的图书馆正在苏醒……', '🗺️');
  addLog('你推开图书馆的橡木门，灰尘在月光中旋转。');

  try {
    const clue = await getInitialClue();
    update(18, '发现线索', '月影地图在书架后闪烁', '📜', clue);
    addLog(clue);

    const location = await decodeAncientScript(clue);
    update(34, '解码成功', '羊皮卷上的文字开始流动', '🔮', location);
    addLog(location);

    const forest = await crossSingingForest();
    update(52, '穿越森林', '银叶林在风中唱起了歌', '🦊', forest);
    addLog(forest);

    const gate = await solveMoonGate();
    update(69, '破解月门', '石门后传来低沉的回响', '🚪', gate);
    addLog(gate);

    const temple = await searchTemple();
    update(84, '进入神庙', '守卫的长矛化作了蓝色花朵', '🛕', temple);
    addLog(temple);

    const treasure = await openTreasureBox();
    update(100, '任务完成', '宝箱打开了！月光宝石正在歌唱', '💎', treasure);
    $('scene').classList.add('treasure');
    addLog(treasure);
    $('character').textContent = '🧙';
    $('startButton').textContent = '再来一次 ↗';
  } catch (error) {
    update(0, '任务失败', '探险暂时中断，请重新出发', '⚠️');
    addLog(`任务失败：${error.message}`);
  } finally {
    state.running = false;
    $('startButton').disabled = false;
  }
}

$('startButton').addEventListener('click', () => {
  $('scene').classList.remove('treasure');
  $('character').textContent = '🧭';
  findTreasure();
});
