// ===== START OF script.js =====
document.addEventListener('DOMContentLoaded', () => {
    // --- 要素取得 ---
    const titleScreen = document.getElementById('title-screen'), gameScreen = document.getElementById('game-screen'), resultScreen = document.getElementById('result-screen'), shopScreen = document.getElementById('shop-screen');
    const difficultyButtons = document.querySelectorAll('.difficulty-button'), startGameButton = document.getElementById('start-game-button');
    const waveNumberEl = document.getElementById('wave-number'), roundNumberEl = document.getElementById('round-number'), defeatedCountEl = document.getElementById('defeated-count'), difficultyDisplayEl = document.getElementById('difficulty-display');
    const playerScoreEl = document.getElementById('player-score'), playerHandEl = document.getElementById('player-hand'), playerDiceEl = document.getElementById('player-dice');
    const npcScoreEl = document.getElementById('npc-score'), npcHandEl = document.getElementById('npc-hand'), npcDiceEl = document.getElementById('npc-dice');
    const diceDisplayEl = document.getElementById('dice-display'), rollCounterEl = document.getElementById('roll-counter'), messageEl = document.getElementById('message');
    const betInput = document.getElementById('bet-input'), setBetButton = document.getElementById('set-bet-button'), rollButton = document.getElementById('roll-button'), historyButton = document.getElementById('history-button'), nextWaveButton = document.getElementById('next-wave-button');
    const betAdjustButtons = document.querySelectorAll('.bet-adjust-button');
    const betArea = document.getElementById('bet-controls'), actionArea = document.getElementById('action-controls'), nextWaveArea = document.getElementById('next-wave-area');
    const centerRoleAnnouncementEl = document.getElementById('center-role-announcement');
    const playerScoreContainer = playerScoreEl.closest('.score-container'), npcScoreContainer = npcScoreEl.closest('.score-container');
    const resultTitleEl = document.getElementById('result-title'), resultMessageEl = document.getElementById('result-message'), finalScoreEl = document.getElementById('final-score');
    const restartSameDifficultyButton = document.getElementById('restart-same-difficulty-button'), changeDifficultyButton = document.getElementById('change-difficulty-button');
    const historyModal = document.getElementById('history-modal'), historyLogEl = document.getElementById('history-log'), closeHistoryModalButton = document.getElementById('close-history-modal');
    const minBetDisplayEl = document.getElementById('min-bet-display');
    const consecutiveWinsDisplayEl = document.getElementById('consecutive-wins-display');
    const playerParentMarker = document.getElementById('player-parent-marker');
    const npcParentMarker = document.getElementById('npc-parent-marker');
    const gameCoinDisplayEl = document.getElementById('game-coin-display');
    const gameCoinInfoEl = document.getElementById('game-coin-info'); // コインアニメーションのターゲット用
    const playerHandArea = document.getElementById('player-hand-area');
    const diceChoiceOverlay = document.getElementById('dice-choice-overlay');
    const currentBetInfoEl = document.getElementById('current-bet-info');
    const maxBetButton = document.getElementById('max-bet-button');
    const shopCoinDisplayEl = document.getElementById('player-coins');
    const shopHandCountEl = document.getElementById('hand-count');
    const shopHandCardsEl = document.getElementById('hand-cards');
    const shopCardOffersEl = document.getElementById('card-offers');
    const shopRerollButton = document.getElementById('reroll-button');
    const shopRerollCostEl = document.getElementById('reroll-cost');
    const shopCloseButton = document.getElementById('close-shop-button');
    const discardModal = document.getElementById('discard-modal');
    const discardOptionsEl = document.getElementById('discard-options');
    const cancelDiscardButton = document.getElementById('cancel-discard-button');
    const shopMessageEl = document.querySelector('.shop-message');
    const messageArea = document.getElementById('message-area');
    const messageButtonContainer = document.getElementById('message-button-container'); // メッセージ用ボタンコンテナ

    // --- ゲーム状態 ---
    const INITIAL_PLAYER_SCORE = 2500; // 初期スコア定数
    let playerScore = INITIAL_PLAYER_SCORE; // 現在のプレイヤースコア
    let scoreAtWaveStart = INITIAL_PLAYER_SCORE; // WAVE開始時のスコア (コイン計算用)
    let npcScore = 500; // 現在のNPCスコア
    let currentWave = 1, defeatedCount = 0;
    let totalScoreChange = 0; // 全WAVE通算のスコア変動 (最終スコア計算用)
    let currentBet = 0, isPlayerTurn = true, playerDice = [0, 0, 0], npcDice = [0, 0, 0];
    let playerHand = null, npcHand = null, playerRollCount = 0, npcRollCount = 0;
    let isGameActive = false, difficulty = 'normal', npcScoreIncrement = 500;
    let gameHistory = [], diceAnimationInterval = null, handHighlightTimeout = null;
    let betHoldInterval = null, betHoldTimeout = null, betHoldAmount = 0;
    let centerRoleAnnounceTimeout = null;
    let baseMinBet = 50; let currentMinBet = baseMinBet;
    let consecutiveWins = 0; let npcConsecutiveWins = 0; // NPC連勝カウンター追加
    let isPlayerParent = true;
    let playerCoins = 0;
    let playerCards = [];
    let currentShopOffers = [];
    let purchasedOrUpgradedInShop = []; // ショップ内で購入/強化済みのカードIDリスト
    let roundCount = 0; // ゲーム全体のラウンド数 (未使用?)
    let currentRoundInWave = 0; // 現在のWAVE内のラウンド数
    let cardToDiscardFor = null; // 手札満杯時に捨てる対象の購入カード情報
    let activeCardUses = {}; // WAVEごとの使用回数カウンター { cardId: count }
    let activeCardBeingUsed = null; // 現在使用中のカードID (UI制御用)
    let freeRerollsAvailableThisShopVisit = 0; // 手札交換による無料リロール回数

    // --- ユーザー操作待ち関連 ---
    let waitingForUserChoice = false; // ユーザーの選択待ち状態フラグ
    let userChoiceResolver = null;    // 選択結果を解決するための関数

    // === カード効果用フラグ (ラウンド/ターン/ロール単位でリセットが必要なもの) ===
    let ignoreMinBetActive = false; // 最低賭け金無視 (ラウンド中)
    let shopChoicePlus1Active = false; // ショップ選択肢+1 (次のショップ入店時に適用)
    let zoroChanceUpActive = false; // ゾロ目確率UP (次のプレイヤーロール)
    let avoid123_456Active = false; // 役回避 (次のプレイヤーロール)
    let blessingDiceActive = false; // 天の恵み (次のプレイヤーロール)
    let stormWarningActive = false; // 嵐の予感 (次のプレイヤーロール)
    let stormWarningRerollsLeft = 0; // 嵐の予感 残り無料振り直し回数
    let blindingDiceActive = false; // 目くらまし (次のNPCロール)
    let doubleUpBetActive = false; // ダブルアップ (このラウンドの勝敗決定時)
    let riskyBetActive = false; // 危険な賭け (このラウンドの賭け金決定時)
    let rewardAmplifierActive = false; // 報酬増幅 (このラウンドの勝敗決定時)
    let giveUpEyeUsedThisTurn = false; // 見切り使用フラグ (ラウンド内)
    let adjustEyeUsedThisTurn = false; // 出目調整使用フラグ (ラウンド内)
    let nextChanceUsedThisTurn = false; // ネクストチャンス使用フラグ (ラウンド内)
    let soulRollUsedThisTurn = false; // 魂の一振り使用フラグ (ラウンド内)
    // === カード効果用フラグ (WAVE単位でリセットが必要なもの) ===
    let keepParentRightUsedThisWave = 0; // 親権維持使用回数 (WAVE中)
    // === カード効果用フラグ (次のラウンドに影響するもの) ===
    let keepParentDiscountNextRound = false; // 親権維持Lv3効果 (次のラウンドの最低賭け金)

    // --- 定数 ---
    const BASE_MAX_ROLLS = 3; let currentMaxRolls = BASE_MAX_ROLLS; // reroll1カードで変動
    const NPC_START_SCORE_BASE = 500, MAX_WAVES = 10;
    const DICE_ANIMATION_SPEED = 50, DICE_ANIMATION_DURATION_BASE = 1200, DICE_ANIMATION_OFFSET = 250;
    const HAND_HIGHLIGHT_DURATION = 1500;
    const CENTER_ROLE_DURATION = 2000; // デフォルトの表示時間
    const SCORE_ANIMATION_DURATION = 600; const SCORE_POPUP_DURATION = 1500;
    const BET_HOLD_DELAY = 500, BET_HOLD_INTERVAL = 80;
    const CONSECUTIVE_WIN_BONUS_RATE = 0.1;
    const NPC_BET_DELAY = 1500; // NPCが賭け金を決定するまでの時間
    const MAX_HAND_CARDS = 5; const REROLL_COST = 20;
    const MAX_CARD_LEVEL = 3;
    const SELL_PRICE_RATE = 0.5;
    const DEFAULT_SHOP_MESSAGE = "好きなカードを購入して手札を強化しよう！";
    const UPGRADE_COST_MULTIPLIER = 1.5;
    const MIN_BET_INCREMENT = 50; // WAVEごとの最低賭け金上昇量
    const COIN_ANIMATION_DURATION = 1000; // コインアニメーションの時間(ms)

    // --- 役の定義 ---
    const ROLES = { PINZORO: { name: 'ピンゾロ', strength: 7, payoutMultiplier: 5 }, ARASHI: { name: 'アラシ', strength: 6, payoutMultiplier: 3 }, SHIGORO: { name: 'シゴロ', strength: 5, payoutMultiplier: 2 }, NORMAL_EYE: { name: '目', strength: 4, payoutMultiplier: 1 }, HIFUMI: { name: 'ヒフミ', strength: 1, payoutMultiplier: -2 }, MENASHI: { name: '目なし', strength: 0 }, SHONBEN: { name: 'ションベン', strength: -1, payoutMultiplier: -1 } };

    // --- カードデータ定義 ---
    const allCards = [
        // 既存カード (説明文は getUpgradeDescription で更新)
        { id: 'reroll1', name: '振り直し回数+1', type: 'support', cost: 50, description: '振り直し可能な最大回数が1回増える。（累積可）', rarity: 1, applyEffect: (level = 1) => currentMaxRolls = BASE_MAX_ROLLS + level, removeEffect: (level = 1) => currentMaxRolls = BASE_MAX_ROLLS, image: './Card Image/01.jpeg' },
        { id: 'shonbenHalf', name: 'ションベン半減', type: 'support', cost: 70, description: 'ションベン時の支払い(失点)が半分になる。', rarity: 1, effectTag: 'shonbenHalf', image: './Card Image/02.jpeg' },
        { id: 'ignoreMinBet', name: '最低賭け金無視', type: 'support', cost: 40, description: 'このWAVE中、最低賭け金を無視して1点から賭けられる。', rarity: 1, usesPerWave: 1, image: './Card Image/03.jpeg' }, // usesPerWave はレベル依存
        { id: 'shopChoicePlus1', name: 'ショップ選択肢+1', type: 'support', cost: 150, description: '次回のショップで提示されるカードが1枚増える。', rarity: 2, applyEffect: (level = 1) => shopChoicePlus1Active = true, removeEffect: () => shopChoicePlus1Active = false, image: './Card Image/04.jpeg' }, // 強化効果は getUpgradeDescription へ
        { id: 'changeToOne', name: '1に変更', type: 'dice', cost: 80, description: 'WAVE中、任意のサイコロ1つを「1」に変えられる。', rarity: 1, usesPerWave: 1, image: './Card Image/05.jpeg' }, // usesPerWave はレベル依存
        { id: 'changeToSix', name: '6に変更', type: 'dice', cost: 100, description: 'WAVE中、任意のサイコロ1つを「6」に変えられる。', rarity: 1, usesPerWave: 1, image: './Card Image/06.jpeg' }, // usesPerWave はレベル依存
        { id: 'zoroChanceUp', name: 'ゾロ目確率UP', type: 'dice', cost: 120, description: '使用したラウンドのロール時、少しだけゾロ目が出やすくなる。', rarity: 2, usesPerWave: 1, image: './Card Image/07.jpeg' }, // usesPerWave はレベル依存 ★説明変更
        { id: 'avoid123_456', name: '役回避', type: 'dice', cost: 50, description: '使用したラウンドのロール時、ヒフミとシゴロが出なくなる。', rarity: 1, usesPerWave: 1, image: './Card Image/08.jpeg' }, // usesPerWave はレベル依存 ★説明変更
        { id: 'sixEyeBonus', name: '6の目ボーナス', type: 'score', cost: 100, description: '「6の目」で勝利した時、獲得点数が1.5倍になる。', rarity: 1, effectTag: 'sixEyeBonus', image: './Card Image/09.jpeg' },
        { id: 'oneEyeBonus', name: '1の目ボーナス', type: 'score', cost: 120, description: '「1の目」で勝利した時、獲得点数が2倍になる。', rarity: 1, effectTag: 'oneEyeBonus', image: './Card Image/10.jpeg' },
        { id: 'arashiBonus', name: 'アラシ強化', type: 'score', cost: 150, description: 'アラシで勝利した時の獲得倍率が+1される。（累積可）', rarity: 2, effectTag: 'arashiBonus', image: './Card Image/11.jpeg' },
        { id: 'shigoroBonus', name: 'シゴロ強化', type: 'score', cost: 130, description: 'シゴロで勝利した時の獲得倍率が+1される。（累積可）', rarity: 1, effectTag: 'shigoroBonus', image: './Card Image/12.jpeg' },
        { id: 'hifumiHalf', name: 'ヒフミ軽減', type: 'score', cost: 180, description: 'ヒフミで負けた時の支払い(失点)が半分になる。', rarity: 2, effectTag: 'hifumiHalf', image: './Card Image/13.jpeg' },
        { id: 'drawBonus', name: '引き分けボーナス', type: 'score', cost: 90, description: '引き分けた時、賭け金の10%を獲得する。', rarity: 1, effectTag: 'drawBonus', image: './Card Image/14.jpeg' },
        // === 追加カード ===
        { id: 'blessingDice', name: '天の恵み', type: 'dice', cost: 130, description: '使用したラウンドのロール時、いずれかのダイスの目が「6」になる確率が少し上がる。', rarity: 2, usesPerWave: 1, image: null }, // usesPerWave はレベル依存 ★説明変更
        { id: 'adjustEye', name: '出目調整', type: 'dice', cost: 60, description: 'WAVE中1回、「目」確定後にその数字を±1調整できる。', rarity: 1, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'stormWarning', name: '嵐の予感', type: 'dice', cost: 250, description: '使用したロールで「アラシ」以外なら振り直し回数消費なしで1回再ロール。再ロール時アラシ確率微増。', rarity: 3, usesPerWave: 1, image: null }, // 強化内容はgetUpgradeDescriptionへ ★説明変更
        { id: 'nextChance', name: 'ネクストチャンス', type: 'dice', cost: 180, description: 'WAVE中1回、「目」確定後にその目となったダイス1つだけを振り直せる。', rarity: 3, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'betBoost', name: '賭け金ブースト', type: 'score', cost: 160, description: 'このWAVE中、最大ベット可能額の上限が持ち点の1.2倍になる(最大値は相手依存)。', rarity: 2, effectTag: 'betBoost', image: null }, // パッシブ
        { id: 'fightingSpirit', name: '逆境の魂', type: 'score', cost: 140, description: '持ち点が相手の半分以下の時、勝利時の獲得点数1.2倍。', rarity: 2, effectTag: 'fightingSpirit', image: null }, // パッシブ
        { id: 'rewardAmplifier', name: '報酬増幅', type: 'score', cost: 280, description: 'WAVE中1回、役(ピンゾロ,アラシ,シゴロ)勝利時の基本配当倍率+1。', rarity: 3, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'keepParentalRight', name: '親権維持', type: 'support', cost: 180, description: '自分が親の時に負けても、WAVE中1回だけ親交代しない(使用選択)。連勝ボーナスは維持される。', rarity: 2, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'handExchange', name: '手札交換', type: 'support', cost: 50, description: '次ショップでのリロールが1回無料になる。', rarity: 1, effectTag: 'handExchange', image: null }, // パッシブ、効果詳細はupdateShopUI/handleRerollへ ★説明変更
        { id: 'soulRoll', name: '魂の一振り', type: 'support', cost: 200, description: 'WAVE中1回、振り残り0の時に持ち点の10%を消費して追加で1回振れる。', rarity: 3, usesPerWave: 1, image: null },
        { id: 'doubleUpBet', name: 'ダブルアップ', type: 'score', cost: 220, description: 'WAVE中1回、自分が子で役/目確定後に使用。勝てば獲得点2倍、負ければ失点も2倍。', rarity: 3, usesPerWave: 1, image: null },
        { id: 'riskyBet', name: '危険な賭け', type: 'support', cost: 120, description: 'WAVE中1回、賭け金決定時に使用。賭け金を2倍にするが、最低賭け金も2倍になる。', rarity: 2, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'giveUpEye', name: '見切り', type: 'support', cost: 70, description: 'WAVE中1回、「目なし」が出た時に振り直さず「ションベン」扱いにできる。', rarity: 1, usesPerWave: 1, image: null }, // usesPerWave はレベル依存
        { id: 'blindingDice', name: '目くらまし', type: 'dice', cost: 260, description: 'WAVE中1回、相手が振る直前に使用。相手特殊役(ゾロ目,シゴロ,ヒフミ)確率低下。', rarity: 3, usesPerWave: 1, image: null },
        { id: 'lossInsurance', name: '一撃保険', type: 'score', cost: 190, description: '自分が負けた時、常に賭け金の1.5倍を支払う。', rarity: 3, effectTag: 'lossInsurance', image: null }, // パッシブ
    ];

    // --- 基本関数 ---
    function showScreen(screenId) { console.log("Showing screen:", screenId); document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(screenId)?.classList.add('active'); }
    function setDifficulty(newDifficulty) { difficulty = newDifficulty; difficultyButtons.forEach(btn => btn.classList.toggle('selected', btn.dataset.difficulty === difficulty)); switch (difficulty) { case 'easy': npcScoreIncrement = 300; difficultyDisplayEl.textContent = "簡単"; break; case 'hard': npcScoreIncrement = 700; difficultyDisplayEl.textContent = "難しい"; break; default: npcScoreIncrement = 500; difficultyDisplayEl.textContent = "普通"; break; } console.log(`Difficulty set to: ${difficulty}, NPC score increment: ${npcScoreIncrement}`); }
    function getHandDisplayName(hand) { if (!hand) return '-'; if (hand.type === '役') return hand.name; if (hand.type === '目') return `目 (${hand.value})`; if (hand.type === 'ションベン') return 'ションベン'; if (hand.type === '目なし') return '目なし'; return '-'; }
    function setMessage(msg, showButtons = false, button1Text = 'はい', button2Text = 'いいえ') {
        messageEl.textContent = msg;
        messageButtonContainer.innerHTML = ''; // ボタンコンテナをクリア

        if (showButtons) {
            const button1 = document.createElement('button');
            button1.textContent = button1Text;
            button1.className = 'button-pop temp-choice-button';
            button1.onclick = () => handleUserChoice(true);
            messageButtonContainer.appendChild(button1);

            const button2 = document.createElement('button');
            button2.textContent = button2Text;
            button2.className = 'button-subtle temp-choice-button';
            button2.onclick = () => handleUserChoice(false);
            messageButtonContainer.appendChild(button2);
        }
    }
    // ユーザー選択を待つ関数
    function waitForUserChoice() {
        return new Promise(resolve => {
            waitingForUserChoice = true;
            userChoiceResolver = resolve;
            displayPlayerHandOnGameScreen(); // 選択待ち中は手札操作不可に
            // 念のためタイムアウトを設定しても良い
        });
    }
    // ユーザー選択ハンドラ
    function handleUserChoice(choice) {
        if (!waitingForUserChoice || !userChoiceResolver) return;
        waitingForUserChoice = false;
        const resolver = userChoiceResolver;
        userChoiceResolver = null;
        messageButtonContainer.innerHTML = ''; // ボタン削除
        resolver(choice); // Promiseを解決
        displayPlayerHandOnGameScreen(); // 手札操作を可能に戻す
    }

    function rollSingleDice() { return Math.floor(Math.random() * 6) + 1; }

    // === サイコロを振る処理 ===
    function rollDice(isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        let d1 = rollSingleDice();
        let d2 = rollSingleDice();
        let d3 = rollSingleDice();
        const dice = [d1, d2, d3];

        let appliedZoroUp = false;
        let appliedStormWarningReroll = stormWarningRerollsLeft > 0 && !isNpc;

        console.log(`Rolling dice... NPC:${isNpc}, Blinding:${blindingDiceLevel}, SoulRoll:${soulRollLevel}, BlessingActive:${blessingDiceActive}, ZoroUpActive:${zoroChanceUpActive}, StormWarningReroll:${appliedStormWarningReroll}`);

        if (!isNpc) {
            if (blessingDiceActive) {
                const blessingCard = playerCards.find(c => c.id === 'blessingDice');
                const blessingLevel = blessingCard?.level || 0;
                const blessingChance = [0.15, 0.3, 0.45][blessingLevel - 1];
                if (Math.random() < blessingChance) {
                    const changeIndex = Math.floor(Math.random() * 3);
                    dice[changeIndex] = 6;
                    console.log(`Card Effect: 天の恵み Lv.${blessingLevel} 発動！ Index ${changeIndex} is now 6.`);
                }
                blessingDiceActive = false;
            }
            if (zoroChanceUpActive) {
                const zoroCard = playerCards.find(c => c.id === 'zoroChanceUp');
                const zoroLevel = zoroCard?.level || 0;
                let zoroUpRate = [0.15, 0.3, 0.45][zoroLevel - 1];
                if (appliedStormWarningReroll) zoroUpRate += 0.1;
                if (Math.random() < zoroUpRate) { dice[1] = dice[0]; appliedZoroUp = true; }
                if (Math.random() < zoroUpRate) { dice[2] = dice[0]; appliedZoroUp = true; }
                if (appliedZoroUp) console.log(`Card Effect: ゾロ目確率UP Lv.${zoroLevel}${appliedStormWarningReroll ? ' (嵐の予感シナジー!)' : ''} 発動！`);
                zoroChanceUpActive = false;
            }
            if (appliedStormWarningReroll && !appliedZoroUp) {
                 const stormCard = playerCards.find(c => c.id === 'stormWarning');
                 const stormLevel = stormCard?.level || 1;
                 const arashiBoostChance = 0.05 + (stormLevel - 1) * 0.05;
                 if (Math.random() < arashiBoostChance) {
                     const targetValue = Math.floor(Math.random() * 5) + 2;
                     dice[0] = targetValue; dice[1] = targetValue; dice[2] = targetValue;
                     console.log(`Card Effect: 嵐の予感 Lv.${stormLevel} 振り直し時アラシブースト発動！ ${targetValue}のアラシに！`);
                 }
            }
        }
        return dice;
    }

    // === 役判定 ===
    function getHandResult(dice, isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        const s = [...dice].sort((a, b) => a - b);
        const [d1, d2, d3] = s;
        let result;

        if (d1 === d2 && d2 === d3) { result = d1 === 1 ? { ...ROLES.PINZORO, type: '役', value: 1 } : { ...ROLES.ARASHI, type: '役', value: d1 }; }
        else if (d1 === 4 && d2 === 5 && d3 === 6) { result = { ...ROLES.SHIGORO, type: '役', value: 6 }; }
        else if (d1 === 1 && d2 === 2 && d3 === 3) { result = { ...ROLES.HIFUMI, type: '役', value: 3 }; }
        else if (d1 === d2 && d2 !== d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d3 }; }
        else if (d1 !== d2 && d2 === d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d1 }; }
        else { result = { type: '目なし', strength: ROLES.MENASHI.strength }; }

        console.log(`Initial Hand Result: ${getHandDisplayName(result)}`);

        if (!isNpc && avoid123_456Active) {
            const avoidCard = playerCards.find(c => c.id === 'avoid123_456');
            const avoidLevel = avoidCard?.level || 0;
            const shouldAvoidHifumiShigoro = result.name === ROLES.HIFUMI.name || result.name === ROLES.SHIGORO.name;
            const shouldAvoidShonben = (avoidLevel >= 2 && result.type === '目なし');
            if (shouldAvoidHifumiShigoro) {
                console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (${result.name} avoided) Result forced to Menashi.`);
                result = { type: '目なし', strength: ROLES.MENASHI.strength };
            } else if (shouldAvoidShonben) {
                 console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (Shonben avoided) Result remains Menashi.`);
            }
            avoid123_456Active = false;
        }
        if (isNpc && blindingDiceLevel > 0) {
            let rerollForced = false;
            const badRoles = [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name, ROLES.HIFUMI.name];
            if (result.type === '役' && badRoles.includes(result.name)) {
                const avoidChance = [0.2, 0.4, 0.6][blindingDiceLevel - 1];
                if (Math.random() < avoidChance) {
                    console.log(`Card Effect: 目くらまし Lv.${blindingDiceLevel} 発動! Forcing reroll for NPC on ${result.name}.`);
                    rerollForced = true;
                    result = { type: '目なし', strength: ROLES.MENASHI.strength };
                }
            }
            if(blindingDiceLevel >= 3 && !rerollForced && result.type !== '目なし') {
                 const shonbenUpChance = 0.2;
                 if(Math.random() < shonbenUpChance && result.type !== 'ションベン') {
                     console.log(`Card Effect: 目くらまし Lv.3 - ションベン率UP発動! Forcing Menashi.`);
                     result = { type: '目なし', strength: ROLES.MENASHI.strength };
                 }
            }
        }
        if (!isNpc && soulRollLevel >= 3 && result.type === '目なし') {
            const avoidMenashiChance = 0.5;
            if (Math.random() < avoidMenashiChance) {
                console.log("Card Effect: 魂の一振り Lv.3 - 目なし回避発動！ Trying one more roll...");
                const newDice = rollDice(false, 0, 0);
                const newResult = getHandResult(newDice, false, 0, 0);
                console.log(`Soul Roll Rerolled Dice: ${newDice}, New Result: ${getHandDisplayName(newResult)}`);
                result = newResult;
            }
        }
        return result;
    }

    // --- カード効果適用/計算 ---
    function applyPlayerCardEffects() {
        currentMaxRolls = BASE_MAX_ROLLS;
        playerCards.forEach(cardData => {
            const cardDefinition = allCards.find(c => c.id === cardData.id);
            if (cardDefinition?.applyEffect) {
                cardDefinition.applyEffect(cardData.level);
            }
        });
        console.log("Applied passive card effects. Current Max Rolls:", currentMaxRolls);
    }
    function removePlayerCardEffect(cardIdToRemove) {
        const cardToRemove = playerCards.find(card => card.id === cardIdToRemove);
        if (!cardToRemove) return;
        const cardDefinition = allCards.find(c => c.id === cardToRemove.id);
        if (cardDefinition?.removeEffect) {
            cardDefinition.removeEffect(cardToRemove.level);
        }
        if (cardIdToRemove === 'handExchange') {
            freeRerollsAvailableThisShopVisit = 0;
            activeCardUses['handExchangeFreeRerollCount'] = 0; // 使用回数もリセット
            console.log("Hand Exchange card removed, resetting free rerolls.");
        }
        playerCards = playerCards.filter(card => card.id !== cardIdToRemove);
        applyPlayerCardEffects();
        console.log(`Removed card: ${cardIdToRemove}`);
    }
    function getCostToUpgradeToNextLevel(cardData, nextLevel) {
        if (!cardData || nextLevel <= 1 || nextLevel > MAX_CARD_LEVEL) { return 0; }
        const baseCardDef = allCards.find(c => c.id === cardData.id);
        if (!baseCardDef) return 0;
        const baseCost = baseCardDef.cost;
        const cost = Math.floor(baseCost * Math.pow(UPGRADE_COST_MULTIPLIER, nextLevel - 1));
        return Math.max(10, cost);
    }
    function calculateSellPrice(cardData) {
        const cardDef = allCards.find(c => c.id === cardData.id);
        if (!cardDef) return 0;
        let totalPaidCost = cardDef.cost;
        for (let lv = 2; lv <= cardData.level; lv++) {
            totalPaidCost += getCostToUpgradeToNextLevel(cardDef, lv);
        }
        const sellPrice = Math.floor(totalPaidCost * SELL_PRICE_RATE);
        return Math.max(0, sellPrice);
    }

    // --- ゲーム初期化 ---
    function initGame(isRestart = false) {
        console.log("--- initGame START ---");
        playerScore = INITIAL_PLAYER_SCORE;
        scoreAtWaveStart = INITIAL_PLAYER_SCORE;
        if (!isRestart) {
            totalScoreChange = 0;
        }
        currentWave = 1; defeatedCount = 0; npcScore = NPC_START_SCORE_BASE; currentBet = 0; isPlayerParent = true; playerDice = [0, 0, 0]; npcDice = [0, 0, 0]; playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false; gameHistory = []; baseMinBet = 50; currentMinBet = baseMinBet; consecutiveWins = 0; npcConsecutiveWins = 0; playerCoins = 0; playerCards = []; roundCount = 0; purchasedOrUpgradedInShop = []; currentRoundInWave = 0;
        // === フラグリセット ===
        activeCardUses = {}; ignoreMinBetActive = false; shopChoicePlus1Active = false; zoroChanceUpActive = false; avoid123_456Active = false; activeCardBeingUsed = null; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; riskyBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; freeRerollsAvailableThisShopVisit = 0; waitingForUserChoice = false; userChoiceResolver = null;
        // ===
        applyPlayerCardEffects();
        betArea.style.display = 'flex'; actionArea.style.display = 'flex'; nextWaveArea.style.display = 'none'; rollButton.disabled = true; historyButton.disabled = false; playerDiceEl.textContent = '-'; npcDiceEl.textContent = '-'; diceDisplayEl.textContent = '- - -'; rollCounterEl.textContent = `0/${currentMaxRolls}回`; diceDisplayEl.classList.remove('rolling', 'settled'); playerHandEl.className = 'hand-display'; npcHandEl.className = 'hand-display'; centerRoleAnnouncementEl.className = 'center-role'; centerRoleAnnouncementEl.textContent = ''; if (playerScoreEl.animationId) cancelAnimationFrame(playerScoreEl.animationId); if (npcScoreEl.animationId) cancelAnimationFrame(npcScoreEl.animationId); playerScoreEl.animationId = null; npcScoreEl.animationId = null; currentBetInfoEl.textContent = '';
        updateUI();
        if (!isRestart) showScreen('game-screen');
        startBettingPhase();
        console.log("--- initGame END ---");
    }

    // --- UI更新 ---
    function updateUI() {
        // ★ WAVE/ROUND 表示を span で囲むように変更
        waveNumberEl.innerHTML = `<span class="wave-highlight">${currentWave}</span>`;
        roundNumberEl.innerHTML = `<span class="round-normal">${currentRoundInWave}</span>`;
        defeatedCountEl.textContent = defeatedCount;
        playerScoreEl.textContent = playerScore;
        npcScoreEl.textContent = npcScore;
        playerDiceEl.textContent = playerDice.every(d => d === 0) ? '-' : playerDice.join(' ');
        playerHandEl.textContent = getHandDisplayName(playerHand);
        npcDiceEl.textContent = npcDice.every(d => d === 0) ? '-' : npcDice.join(' ');
        npcHandEl.textContent = getHandDisplayName(npcHand);

        // 最低賭け金計算と表示
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        let displayMinBet = baseMinBet;
        if (keepParentDiscountNextRound) { displayMinBet = Math.max(1, Math.floor(baseMinBet / 2)); }
        const riskyBetCardCheck = playerCards.find(c => c.id === 'riskyBet');
        if (riskyBetActive && riskyBetCardCheck?.level === 1) { displayMinBet = baseMinBet * 2; }
        if (ignoreMinBetActive) { displayMinBet = 1; }
        currentMinBet = displayMinBet;
        minBetDisplayEl.textContent = `最低: ${currentMinBet}`;

        // ロールカウント表示
        let maxRollsForTurn = isPlayerTurn ? currentMaxRolls : BASE_MAX_ROLLS;
        let currentRollCountForTurn = isPlayerTurn ? playerRollCount : npcRollCount;
        let turnText = `0/${maxRollsForTurn}回`;
        if (isGameActive || currentRoundInWave > 0) { turnText = `${currentRollCountForTurn}/${maxRollsForTurn}回`; }
        rollCounterEl.textContent = turnText;

        // 連勝/連敗表示 (★ NPC連敗テキスト修正)
        consecutiveWinsDisplayEl.classList.remove('npc-losing-streak'); // Reset class
        if (isPlayerParent && consecutiveWins > 1) {
            consecutiveWinsDisplayEl.textContent = ` (${consecutiveWins}連勝中!)`;
            consecutiveWinsDisplayEl.style.display = 'inline';
        } else if (!isPlayerParent && npcConsecutiveWins > 1) {
            consecutiveWinsDisplayEl.textContent = ` (${npcConsecutiveWins}連敗中...)`; // 「相手」削除
            consecutiveWinsDisplayEl.classList.add('npc-losing-streak');
            consecutiveWinsDisplayEl.style.display = 'inline';
        } else {
            consecutiveWinsDisplayEl.textContent = '';
            consecutiveWinsDisplayEl.style.display = 'none';
        }

        // 親マーカー表示
        playerParentMarker.style.display = isPlayerParent ? 'inline' : 'none';
        npcParentMarker.style.display = !isPlayerParent ? 'inline' : 'none';
        gameScreen.classList.toggle('player-parent', isPlayerParent);
        gameScreen.classList.toggle('npc-parent', !isPlayerParent);

        // 所持コイン表示
        gameCoinDisplayEl.textContent = `${playerCoins} G`;
        if (shopScreen.classList.contains('active')) { updateShopUI(); }

        // ゲーム画面の手札表示更新
        displayPlayerHandOnGameScreen();

        // 賭け金上限更新
        updateBetLimits();

        // 現在の賭け金情報
        if (isGameActive && currentBet > 0) {
            const parentName = isPlayerParent ? "あなた" : "相手";
            currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${parentName})</span>`;
        } else if (!isGameActive && currentRoundInWave > 0 && playerScore >= currentMinBet && npcScore >= currentMinBet) {
             currentBetInfoEl.textContent = '賭け金設定中...';
        } else {
             currentBetInfoEl.textContent = '';
        }
    }
    function updateShopHandDisplay() {
        shopHandCountEl.textContent = playerCards.length;
        shopHandCardsEl.innerHTML = '';
        playerCards.forEach(cardData => {
            const cardDefinition = allCards.find(c => c.id === cardData.id);
            if (cardDefinition) {
                const cardItem = document.createElement('li');
                cardItem.className = 'hand-card-item';
                const cardNameSpan = document.createElement('span');
                cardNameSpan.textContent = `${cardDefinition.name} [Lv.${cardData.level}]`;
                cardNameSpan.title = getUpgradeDescription(cardDefinition, cardData.level);
                cardItem.appendChild(cardNameSpan);
                const sellButton = document.createElement('button');
                const sellPrice = calculateSellPrice(cardData);
                sellButton.className = 'sell-card-button';
                sellButton.textContent = `売却 (${sellPrice}G)`;
                sellButton.dataset.cardId = cardData.id;
                sellButton.dataset.sellPrice = sellPrice;
                sellButton.dataset.cardName = cardDefinition.name;
                sellButton.dataset.cardLevel = cardData.level;
                sellButton.addEventListener('click', handleSellCard);
                cardItem.appendChild(sellButton);
                shopHandCardsEl.appendChild(cardItem);
            }
        });
    }

    // === 賭け金上限更新 ===
    function updateBetLimits() {
        let playerMaxPotential = playerScore;
        const betBoostCard = playerCards.find(card => card.id === 'betBoost');
        if (betBoostCard) {
            const boostMultiplier = [1.2, 1.4, 1.6][betBoostCard.level - 1];
            playerMaxPotential = Math.floor(playerScore * boostMultiplier);
        }
        const effectiveNpcScore = Math.max(1, npcScore);
        const maxBet = isPlayerParent
            ? Math.max(currentMinBet, Math.min(playerMaxPotential, effectiveNpcScore))
            : Math.max(currentMinBet, Math.min(npcScore, playerScore));

        betInput.max = maxBet;
        betInput.min = currentMinBet;

        let cv = parseInt(betInput.value);
        if (isNaN(cv)) cv = currentMinBet;

        const canPlayerControlBet = isPlayerParent && !isGameActive;
        betInput.disabled = !canPlayerControlBet || playerScore < currentMinBet;

        if (!betInput.disabled) {
            if (cv > maxBet) { betInput.value = maxBet; cv = maxBet; }
            else if (cv < currentMinBet) { betInput.value = currentMinBet; cv = currentMinBet; }
        } else {
             if (!isPlayerParent && !isGameActive && currentBet > 0) { betInput.value = currentBet; }
             else { betInput.value = currentMinBet; }
        }

        betAdjustButtons.forEach(b => {
            const a = parseInt(b.dataset.amount);
            const v = parseInt(betInput.value);
            b.disabled = betInput.disabled ||
                         (a > 0 && (v >= maxBet || v + a > maxBet)) ||
                         (a < 0 && (v <= currentMinBet || v + a < currentMinBet));
        });
        setBetButton.disabled = betInput.disabled;
        maxBetButton.disabled = betInput.disabled;
    }

    // === 賭けフェーズ開始 ===
    function startBettingPhase() {
        console.log("--- startBettingPhase START ---");
        currentRoundInWave++;
        isGameActive = false;
        playerDice = [0, 0, 0]; npcDice = [0, 0, 0];
        playerHand = null; npcHand = null;
        playerRollCount = 0; npcRollCount = 0;
        rollButton.disabled = true; historyButton.disabled = false;
        currentBet = 0;
        // === ラウンド開始時フラグリセット ===
        activeCardBeingUsed = null; ignoreMinBetActive = false;
        zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null; riskyBetActive = false;
        // ===

        // 最低賭け金計算
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        if (keepParentDiscountNextRound) {
             currentMinBet = Math.max(1, Math.floor(baseMinBet / 2));
             keepParentDiscountNextRound = false;
        } else {
             currentMinBet = baseMinBet;
        }
        updateUI(); // UIを更新

        // --- 最低賭け金支払いチェック ---
        if (playerScore < currentMinBet) {
             setMessage(`あなたの持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、ゲームオーバーです。`);
             currentBetInfoEl.textContent = ''; betArea.style.display = 'none'; actionArea.style.display = 'none';
             historyButton.disabled = true;
             setTimeout(() => showResultScreen(false, playerScore, currentWave, "最低賭け金不足"), 1000);
             return;
        }
        if (npcScore < currentMinBet) {
            defeatedCount++;
            console.log("NPC cannot meet minimum bet, proceeding to shop.");
            const earnedCoins = calculateEarnedCoins();
            calculateAndAwardCoins();
            setMessage(`相手の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`);
            updateUI();
            betArea.style.display = 'none'; actionArea.style.display = 'none'; nextWaveArea.style.display = 'flex';
            currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
            activeCardUses = {}; keepParentRightUsedThisWave = 0;
            return;
        }
        // --- チェックここまで ---

        currentBetInfoEl.textContent = '賭け金設定中...';

        if (isPlayerParent) {
            betArea.style.display = 'flex';
            actionArea.style.display = 'flex';
            setMessage(`あなた(親)が賭け金を設定 (最低 ${currentMinBet}点)。`);
            const lastBet = parseInt(betInput.value);
            updateBetLimits();
            const maxBetPossible = parseInt(betInput.max);
            betInput.value = (lastBet >= currentMinBet && lastBet <= maxBetPossible) ? lastBet : currentMinBet;
            updateBetLimits();
            displayPlayerHandOnGameScreen();
        } else { // NPCが親の場合
            betArea.style.display = 'flex';
            actionArea.style.display = 'flex';
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true;
            setMessage(`相手(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            playerHandArea.innerHTML = ''; playerHandArea.style.display = 'none';
            updateBetLimits();
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);
                if (npcScore < npcBet || npcBet < currentMinBet) {
                     console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet})`);
                     defeatedCount++;
                     const earnedCoins = calculateEarnedCoins();
                     calculateAndAwardCoins();
                     setMessage(`エラー: 相手が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！`);
                     updateUI();
                     betArea.style.display = 'none'; actionArea.style.display = 'none'; nextWaveArea.style.display = 'flex';
                     currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
                     activeCardUses = {}; keepParentRightUsedThisWave = 0;
                     return;
                }

                currentBet = npcBet;
                betInput.value = currentBet;
                console.log(`NPC (Parent) decided bet: ${currentBet} in Wave ${currentWave}`);
                currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: 相手)</span>`;
                setMessage(`相手(親)が ${currentBet} 点で勝負！ 相手がサイコロを振ります...`);
                isGameActive = true;
                isPlayerTurn = false;
                updateUI();
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const maxBlindingUses = blindingCard ? 1 : 0;
                const canUseBlinding = blindingCard && (activeCardUses['blindingDice'] || 0) < maxBlindingUses;
                if (canUseBlinding) {
                    setMessage(`相手(親)が ${currentBet} 点で勝負！ 相手がサイコロを振ります...(「目くらまし」使用可能)`);
                    displayPlayerHandOnGameScreen();
                } else {
                    setTimeout(npcTurn, NPC_BET_DELAY / 2);
                }
            }, NPC_BET_DELAY);
        }
        console.log("--- startBettingPhase END ---");
    }

    // === NPC賭け金決定ロジック ===
    function determineNpcBet(wave) {
        let baseRateMin = 0.1, baseRateMax = 0.2, aggressiveChance = 0.3, aggressiveRateMin = 0.3, aggressiveRateMax = 0.5, cautiousChance = 0.4, cautiousRateMin = 0.05, cautiousRateMax = 0.15, maxBetChance = 0.05;
        if (wave >= 8) { baseRateMin = 0.2; baseRateMax = 0.35; aggressiveChance = 0.5; aggressiveRateMin = 0.4; aggressiveRateMax = 0.6; cautiousChance = 0.2; cautiousRateMin = 0.1; cautiousRateMax = 0.2; maxBetChance = 0.15; }
        else if (wave >= 5) { baseRateMin = 0.15; baseRateMax = 0.25; aggressiveChance = 0.4; aggressiveRateMin = 0.35; aggressiveRateMax = 0.55; cautiousChance = 0.3; cautiousRateMin = 0.08; cautiousRateMax = 0.18; maxBetChance = 0.1; }

        const effectivePlayerScore = Math.max(1, playerScore);
        const npcMinPossibleBet = currentMinBet;
        const maxBetPossible = Math.min(npcScore, effectivePlayerScore);

        if (npcScore < npcMinPossibleBet) return npcScore;
        if (maxBetPossible < npcMinPossibleBet) return maxBetPossible;

        let bet = 0;
        if (Math.random() < maxBetChance) {
            bet = maxBetPossible;
            console.log("NPC AI: Decided Max Bet by chance.");
        } else {
            const randomRate = baseRateMin + Math.random() * (baseRateMax - baseRateMin);
            bet = Math.floor(npcScore * randomRate);
            if (playerScore < npcScore * 0.4 && Math.random() < aggressiveChance) {
                const aggressiveRate = aggressiveRateMin + Math.random() * (aggressiveRateMax - aggressiveRateMin);
                bet = Math.floor(npcScore * aggressiveRate);
                console.log("NPC AI: Aggressive move!");
            }
            else if (npcScore < playerScore * 0.4 && Math.random() < cautiousChance) {
                const cautiousRate = cautiousRateMin + Math.random() * (cautiousRateMax - cautiousRateMin);
                bet = Math.floor(npcScore * cautiousRate);
                console.log("NPC AI: Cautious move.");
            }
        }
        bet = Math.max(npcMinPossibleBet, bet);
        bet = Math.min(bet, maxBetPossible);
        return Math.max(1, bet);
    }

    // === ダイスロールアニメーション ===
    function animateDiceRoll(targetDiceDisplay, finalDice, onComplete) {
        if (diceAnimationInterval) clearInterval(diceAnimationInterval);
        targetDiceDisplay.classList.remove('settled');
        const displayedDice = ['-', '-', '-'];
        targetDiceDisplay.classList.add('rolling');
        diceAnimationInterval = setInterval(() => {
            const randomDice = [rollSingleDice(), rollSingleDice(), rollSingleDice()];
            const displayStr = displayedDice.map((d, i) => (d !== '-' ? `<span class="dice-num">${d}</span>` : `<span class="dice-num">${randomDice[i]}</span>`)).join(' ');
            targetDiceDisplay.innerHTML = displayStr;
        }, DICE_ANIMATION_SPEED);
        setTimeout(() => {
            displayedDice[0] = finalDice[0];
            targetDiceDisplay.innerHTML = displayedDice.map((d, i) => (d !== '-' ? `<span class="dice-num">${d}</span>` : `<span class="dice-num">${rollSingleDice()}</span>`)).join(' ');
        }, DICE_ANIMATION_DURATION_BASE);
        setTimeout(() => {
            displayedDice[1] = finalDice[1];
            targetDiceDisplay.innerHTML = displayedDice.map((d, i) => (d !== '-' ? `<span class="dice-num">${d}</span>` : `<span class="dice-num">${rollSingleDice()}</span>`)).join(' ');
        }, DICE_ANIMATION_DURATION_BASE + DICE_ANIMATION_OFFSET);
        setTimeout(() => {
            clearInterval(diceAnimationInterval);
            diceAnimationInterval = null;
            displayedDice[2] = finalDice[2];
            targetDiceDisplay.innerHTML = displayedDice.map(d => `<span class="dice-num">${d}</span>`).join(' ');
            targetDiceDisplay.classList.remove('rolling');
            targetDiceDisplay.classList.add('settled');
            setTimeout(()=> targetDiceDisplay.classList.remove('settled'), 250);
            onComplete();
        }, DICE_ANIMATION_DURATION_BASE + DICE_ANIMATION_OFFSET * 2);
    }
    // === 役アナウンス ===
    function announceRoleResult(hand) {
        if (centerRoleAnnounceTimeout) clearTimeout(centerRoleAnnounceTimeout);
        centerRoleAnnouncementEl.textContent = '';
        centerRoleAnnouncementEl.className = 'center-role';
        let centerAnnounceClass = ''; let centerAnnounceText = ''; let centerDuration = CENTER_ROLE_DURATION;
        if (!hand) return;
        if (hand.type === '役') {
            centerAnnounceText = hand.name;
            switch (hand.name) {
                case ROLES.PINZORO.name: centerAnnounceClass = 'role-pinzoro'; centerDuration = 2500; break;
                case ROLES.ARASHI.name: centerAnnounceClass = 'role-arashi'; centerDuration = 2200; break;
                case ROLES.SHIGORO.name: centerAnnounceClass = 'role-shigoro'; break;
                case ROLES.HIFUMI.name: centerAnnounceClass = 'role-hifumi'; centerDuration = 1800; break;
            }
        } else if (hand.type === '目') { centerAnnounceText = `目 ${hand.value}`; centerAnnounceClass = 'role-normal-eye'; centerDuration = 1500; }
        else if (hand.type === 'ションベン'){ centerAnnounceText = 'ションベン'; centerAnnounceClass = 'role-shonben'; centerDuration = 1500; }
        if (centerAnnounceClass) {
            centerRoleAnnouncementEl.textContent = centerAnnounceText;
            centerRoleAnnouncementEl.style.setProperty('--center-role-duration', `${centerDuration / 1000}s`);
            centerRoleAnnouncementEl.classList.add('role-appear', centerAnnounceClass);
            centerRoleAnnounceTimeout = setTimeout(() => { centerRoleAnnouncementEl.classList.remove('role-appear', centerAnnounceClass); centerRoleAnnouncementEl.textContent = ''; }, centerDuration);
        }
    }
    // === 手札ハイライト ===
    function highlightHand(element, hand) {
        if (handHighlightTimeout) clearTimeout(handHighlightTimeout);
        element.className = 'hand-display';
        let sidebarHighlightClass = '';
        if (!hand) return;
        if (hand.type === '役') {
            switch (hand.name) {
                case ROLES.PINZORO.name: sidebarHighlightClass = 'legendary'; break;
                case ROLES.ARASHI.name: sidebarHighlightClass = 'strong'; break;
                case ROLES.SHIGORO.name: sidebarHighlightClass = 'strong'; break;
                case ROLES.HIFUMI.name: sidebarHighlightClass = 'hifumi'; break;
            }
        }
        if (sidebarHighlightClass) {
            element.classList.add('highlight', sidebarHighlightClass);
            handHighlightTimeout = setTimeout(() => { element.className = 'hand-display'; }, HAND_HIGHLIGHT_DURATION);
        }
        announceRoleResult(hand);
    }
    // === スコア/コイン数値アニメーション ===
    function animateScore(element, startScore, endScore, duration) {
        if (element.animationId) cancelAnimationFrame(element.animationId);
        const range = endScore - startScore;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentScore = Math.floor(startScore + range * progress);
            // ★ 修正: コイン表示の場合は " G" を付ける
            if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) {
                element.textContent = `${currentScore} G`;
            } else {
                element.textContent = currentScore;
            }
            if (progress < 1) { element.animationId = requestAnimationFrame(step); }
            else {
                 if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) {
                     element.textContent = `${endScore} G`;
                 } else {
                    element.textContent = endScore;
                 }
                 element.animationId = null;
            }
        }
        element.animationId = requestAnimationFrame(step);
    }
    // === スコア変動ポップアップ ===
    function showScoreChangePopup(container, change) {
        if (change === 0) return;
        const popup = document.createElement('span');
        popup.className = 'score-change-popup';
        const sign = change > 0 ? '+' : '';
        popup.textContent = `${sign}${change}`;
        popup.classList.add(change > 0 ? 'gain' : 'loss');
        container.appendChild(popup);
        setTimeout(() => popup.remove(), SCORE_POPUP_DURATION);
    }
    // === 賭け金調整（長押し対応）===
    function changeBet(amount) {
        if (betInput.disabled) return;
        let cv = parseInt(betInput.value);
        const max = parseInt(betInput.max);
        let nv = cv + amount;
        if (nv > max) nv = max;
        else if (nv < currentMinBet) nv = currentMinBet;
        if (nv !== cv) { betInput.value = nv; updateBetLimits(); }
    }
    function startBetHold(amount) {
        stopBetHold(); betHoldAmount = amount; changeBet(betHoldAmount);
        betHoldTimeout = setTimeout(() => { betHoldInterval = setInterval(() => { changeBet(betHoldAmount); }, BET_HOLD_INTERVAL); }, BET_HOLD_DELAY);
    }
    function stopBetHold() { clearTimeout(betHoldTimeout); clearInterval(betHoldInterval); betHoldTimeout = null; betHoldInterval = null; }

    // --- イベントリスナー ---
    difficultyButtons.forEach(b => b.addEventListener('click', () => setDifficulty(b.dataset.difficulty)));
    startGameButton.addEventListener('click', () => { const sb = document.querySelector('.difficulty-button.selected'); setDifficulty(sb ? sb.dataset.difficulty : 'normal'); initGame(false); });
    betAdjustButtons.forEach(button => { const amount = parseInt(button.dataset.amount); button.addEventListener('mousedown', (e) => { if (e.button !== 0) return; startBetHold(amount); }); button.addEventListener('mouseup', stopBetHold); button.addEventListener('mouseleave', stopBetHold); button.addEventListener('touchstart', (e) => { e.preventDefault(); startBetHold(amount); }, { passive: false }); button.addEventListener('touchend', stopBetHold); button.addEventListener('touchcancel', stopBetHold); });
    betInput.addEventListener('change', () => { if (!betInput.disabled) updateBetLimits(); });
    // 賭け金決定ボタン
    setBetButton.addEventListener('click', () => {
        if (!isPlayerParent || betInput.disabled || isGameActive) return;
        updateBetLimits(); // 最新情報で再チェック

        if (playerScore < currentMinBet) { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満のため、賭けられません。`); return; }
        // ★ 修正: 相手が最低賭け金未満ならここで即WAVEクリア
        if (npcScore < currentMinBet) {
            defeatedCount++;
            console.log("NPC cannot meet minimum bet when player sets bet, proceeding to shop.");
            const earnedCoins = calculateEarnedCoins();
            calculateAndAwardCoins(); // アニメーション含む
            setMessage(`相手の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`);
            updateUI();
            betArea.style.display = 'none'; actionArea.style.display = 'none'; nextWaveArea.style.display = 'flex';
            currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
            activeCardUses = {}; keepParentRightUsedThisWave = 0;
            return; // ショップ遷移へ
        }

        const bv = parseInt(betInput.value);
        const maxBet = parseInt(betInput.max);

        if (bv >= currentMinBet && bv <= maxBet) {
            currentBet = bv;
            // 危険な賭け 効果適用
            if(riskyBetActive) {
                 const riskyCard = playerCards.find(c => c.id === 'riskyBet');
                 if(riskyCard) { // カードが存在する場合のみ
                     currentBet *= 2;
                     currentBet = Math.min(currentBet, npcScore); // 相手スコア上限チェック
                     console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`);
                     activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1;
                 }
                 riskyBetActive = false; // 効果は1回でリセット
                 updateUI(); // 最低賭け金表示を元に戻す
            }

            isGameActive = true; isPlayerTurn = true;
            currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: あなた)</span>`;
            setMessage(`賭け金 ${currentBet} で勝負！ あなた(親)がサイコロを振ってください。`);
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true;
            rollButton.disabled = false; historyButton.disabled = true;
            displayPlayerHandOnGameScreen(); updateUI();
        } else {
            setMessage(`賭け金を正しく設定 (${currentMinBet}～${maxBet})。`);
            updateBetLimits();
        }
    });
    // MAXベットボタン
    maxBetButton.addEventListener('click', () => {
        if (betInput.disabled) return;
        if (playerScore >= currentMinBet) { betInput.value = betInput.max; updateBetLimits(); }
        else { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満です。`); }
    });

    // サイコロを振るボタン (ネクストチャンス対応修正)
    rollButton.addEventListener('click', async () => {
        if (playerScore <= 0) { checkGameEnd(); return; }
        if (!isGameActive || !isPlayerTurn || diceAnimationInterval || waitingForUserChoice) return;

        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const maxSoulRollUses = soulRollCard ? 1 : 0;
        const canUseSoulRoll = soulRollCard && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUses;

        if (canUseSoulRoll) {
             setMessage("振り残り回数がありません。「魂の一振り」を使用しますか？");
             displayPlayerHandOnGameScreen();
             return;
        }

        let isFreeRoll = false;
        if(stormWarningRerollsLeft > 0) {
            isFreeRoll = true;
            stormWarningRerollsLeft--;
            console.log("Using Storm Warning free reroll.");
        }
        else { playerRollCount++; }

        rollButton.disabled = true;
        setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 振っています...`);
        diceDisplayEl.textContent = '- - -'; playerHandEl.className = 'hand-display';
        updateUI();

        const soulRollLvFor判定 = soulRollUsedThisTurn ? (soulRollCard?.level || 0) : 0;

        console.log(`Before roll: blessingActive=${blessingDiceActive}, zoroUpActive=${zoroChanceUpActive}, avoidActive=${avoid123_456Active}`);
        const finalDice = rollDice(false, 0, soulRollLvFor判定);

        animateDiceRoll(diceDisplayEl, finalDice, async () => {
            playerDice = finalDice;
            console.log(`Before getHandResult: avoidActive=${avoid123_456Active}`);
            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Player Rolled:", playerDice, "Hand:", playerHand);
            updateUI(); displayPlayerHandOnGameScreen(); highlightHand(playerHandEl, playerHand);

            let stormWarningAppliedThisRoll = false;
            const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
            if (stormWarningActive && stormCardCheck) {
                const stormLevelCheck = stormCardCheck.level;
                const targetRoles = (stormLevelCheck >= 3) ? [ROLES.ARASHI.name, ROLES.PINZORO.name] : [ROLES.ARASHI.name];
                if (!(playerHand.type === '役' && targetRoles.includes(playerHand.name))) {
                     stormWarningRerollsLeft = (stormLevelCheck >= 2) ? 2 : 1;
                     stormWarningAppliedThisRoll = true;
                     console.log(`Card Effect: 嵐の予感発動！ Target role not hit. ${stormWarningRerollsLeft} free rerolls available.`);
                }
                stormWarningActive = false;
                 activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1;
            }

            // ターン進行 or 継続 or カード使用待ち
            if (playerHand.type === '役' || playerHand.type === '目' || playerHand.type === 'ションベン') {
                const handName = getHandDisplayName(playerHand);
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const maxBlindingUses = blindingCard ? 1 : 0;
                const canUseBlindingNow = isPlayerParent && playerHand.type !== 'ションベン' && blindingCard && (activeCardUses['blindingDice'] || 0) < maxBlindingUses;
                const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                const maxDoubleUpUses = doubleUpCard ? 1 : 0;
                const canUseDoubleUp = !isPlayerParent && playerHand.type !== 'ションベン' && doubleUpCard && (activeCardUses['doubleUpBet'] || 0) < maxDoubleUpUses;
                const adjustCard = playerCards.find(c => c.id === 'adjustEye');
                const maxAdjustUses = adjustCard ? (adjustCard.level >= 2 ? 2 : 1) : 0;
                const canUseAdjust = playerHand.type === '目' && adjustCard && !adjustEyeUsedThisTurn && (activeCardUses['adjustEye'] || 0) < maxAdjustUses;
                const nextChanceCard = playerCards.find(c => c.id === 'nextChance');
                const maxNextChanceUses = nextChanceCard ? (nextChanceCard.level >= 3 ? 2 : 1) : 0;
                const canUseNextChance = playerHand.type === '目' && nextChanceCard && !nextChanceUsedThisTurn && (activeCardUses['nextChance'] || 0) < maxNextChanceUses;

                let proceedToNextTurn = true;

                // --- カード使用選択肢 (優先度: 調整 > ネクストチャンス > ダブルアップ) ---
                if (canUseAdjust) {
                    setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「出目調整」を使用しますか？`, true);
                    proceedToNextTurn = false;
                    const useAdjust = await waitForUserChoice();
                    if (useAdjust) {
                        showDiceChoiceOverlay('adjustEye');
                        return;
                    } else {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！ 出目調整を使用しませんでした。`);
                         proceedToNextTurn = true;
                    }
                }
                if (proceedToNextTurn && canUseNextChance) { // ネクストチャンス確認
                    setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「ネクストチャンス」を使用しますか？`, true);
                    proceedToNextTurn = false;
                    const useNextChance = await waitForUserChoice();
                    if (useNextChance) {
                        showDiceChoiceOverlay('nextChance');
                        return;
                    } else {
                        setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！ ネクストチャンスを使用しませんでした。`);
                        proceedToNextTurn = true;
                    }
                }
                if (proceedToNextTurn && canUseDoubleUp) {
                    setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                    proceedToNextTurn = false;
                    const useDoubleUp = await waitForUserChoice();
                    if (useDoubleUp) {
                        handleActiveCardUse({ currentTarget: { dataset: { cardId: 'doubleUpBet' }, classList: { contains: () => true } } });
                        setMessage(`あなた(子): ${handName}！ ダブルアップを使用！勝負！`);
                        proceedToNextTurn = true;
                    } else {
                        setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                        proceedToNextTurn = true;
                    }
                }
                // --- 選択肢ここまで ---

                if (proceedToNextTurn) {
                    isPlayerTurn = false; playerHandArea.style.display = 'none';
                    if (canUseBlindingNow && isPlayerParent) {
                        setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                        displayPlayerHandOnGameScreen();
                    } else if (isPlayerParent && playerHand.type !== 'ションベン') {
                        setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                        setTimeout(npcTurn, 1400);
                    } else {
                        setMessage(`あなた(${isPlayerParent?'親':'子'}): ${handName}！ ${playerHand.type === 'ションベン' ? '負けです。' : '勝負！'}`);
                        setTimeout(handleRoundEnd, 1000);
                    }
                }

            } else if (playerHand.type === '目なし') {
                 let canReroll = playerRollCount < currentMaxRolls;
                 let messageSuffix = "";
                 if (stormWarningAppliedThisRoll && stormWarningRerollsLeft > 0) {
                      canReroll = true;
                      messageSuffix = ` (嵐の予感により無料振り直し ${stormWarningRerollsLeft} 回)`;
                 }

                 const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
                 const maxGiveUpUses = giveUpCard ? giveUpCard.level : 0;
                 const canUseGiveUp = giveUpCard && !giveUpEyeUsedThisTurn && (activeCardUses['giveUpEye'] || 0) < maxGiveUpUses;

                 if (canReroll) {
                     let msg = `あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${messageSuffix}`;
                     rollButton.disabled = false;
                     if (canUseGiveUp) {
                         msg = `あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振りますか？(${playerRollCount}/${currentMaxRolls})${messageSuffix} それとも「見切り」を使用しますか？`;
                         setMessage(msg, true, '振り直す', '見切り使用');
                         const choice = await waitForUserChoice();
                         if (choice) {
                             setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${messageSuffix}`);
                             displayPlayerHandOnGameScreen();
                         } else {
                             handleActiveCardUse({ currentTarget: { dataset: { cardId: 'giveUpEye' }, classList: { contains: () => true } } });
                         }
                     } else {
                         setMessage(msg);
                         displayPlayerHandOnGameScreen();
                     }
                 } else {
                      const soulRollCardCheck = playerCards.find(c => c.id === 'soulRoll');
                      const maxSoulRollUses = soulRollCardCheck ? 1 : 0;
                      const canUseSoulRollFinal = soulRollCardCheck && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUses;
                     if (canUseSoulRollFinal) {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 振り直し回数がありません。「魂の一振り」を使用しますか？`);
                         rollButton.disabled = true;
                         displayPlayerHandOnGameScreen();
                     } else {
                         playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                         updateUI();
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                         highlightHand(playerHandEl, playerHand);
                         playerHandArea.style.display = 'none';
                         setTimeout(handleRoundEnd, 800);
                     }
                 }
            }
        }); // animateDiceRoll callback end
    }); // rollButton listener end

    nextWaveButton.addEventListener('click', openShop);
    restartSameDifficultyButton.addEventListener('click', () => { initGame(true); showScreen('game-screen'); });
    changeDifficultyButton.addEventListener('click', () => { showScreen('title-screen'); });
    historyButton.addEventListener('click', () => { if (diceAnimationInterval || waitingForUserChoice) return; displayHistory(); historyModal.style.display = 'block'; });
    closeHistoryModalButton.addEventListener('click', () => { historyModal.style.display = 'none'; });
    window.addEventListener('click', (event) => { if (event.target === historyModal) historyModal.style.display = 'none'; if (event.target === discardModal) cancelDiscard(); if (event.target === diceChoiceOverlay) hideDiceChoiceOverlay(); });

    // === NPCターン ===
    function npcTurn() {
        if (!isGameActive || isPlayerTurn || diceAnimationInterval || waitingForUserChoice) return;

        npcRollCount++;
        setMessage(`相手(${!isPlayerParent ? '親' : '子'}): 振っています...`);
        diceDisplayEl.textContent = '- - -'; npcHandEl.className = 'hand-display';
        updateUI();

        const blindingLevel = blindingDiceActive ? (playerCards.find(c => c.id === 'blindingDice')?.level || 0) : 0;

        const finalDice = rollDice(true, blindingLevel, 0); // NPCは魂の一振りを使わない

        animateDiceRoll(diceDisplayEl, finalDice, () => {
            npcDice = finalDice;
            const result = getHandResult(npcDice, true, blindingLevel, 0); // 目くらまし効果を判定に渡す
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            npcHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("NPC Rolled:", npcDice, "Hand:", npcHand);

            let forcedReroll = false; // 目くらましで強制リロールされたか
            if (blindingDiceActive && npcHand.type === '目なし') {
                  console.log("Blinding Dice forced reroll, NPC continues turn...");
                  forcedReroll = true;
                  setTimeout(npcTurn, 1000); // 強制目なしなので再ロール
                  return;
             }
             if (blindingDiceActive && !forcedReroll) {
                 blindingDiceActive = false; // 効果終了フラグはリセット
                 activeCardUses['blindingDice'] = (activeCardUses['blindingDice'] || 0) + 1; // 消費カウント
             }

            updateUI(); highlightHand(npcHandEl, npcHand);

            if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
                const handName = getHandDisplayName(npcHand);
                isPlayerTurn = true; // プレイヤーのターンに戻す
                if (!isPlayerParent && npcHand.type !== 'ションベン') { // NPCが親で、ションベン以外
                    setMessage(`相手(親): ${handName}！ あなた(子)の番です。`);
                    rollButton.disabled = false; // プレイヤーが振れるように
                    displayPlayerHandOnGameScreen(); // プレイヤーの手札を表示
                } else { // NPCが子の場合 or NPCが親でションベンの場合 -> 勝負
                    setMessage(`相手(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : 'あなたの勝ちです。') : '勝負！'}`); // メッセージ修正
                    setTimeout(handleRoundEnd, 1000);
                }
            } else if (npcHand.type === '目なし') {
                if (npcRollCount < BASE_MAX_ROLLS) {
                    setMessage(`相手(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`);
                    setTimeout(npcTurn, 1000);
                } else { // 3回振って目なし -> ションベン
                    npcHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                    updateUI();
                    setMessage(`相手(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : 'あなたの勝ちです。'}`); // メッセージ修正
                    highlightHand(npcHandEl, npcHand);
                    isPlayerTurn = true; // プレイヤーのターンに戻してから終了処理へ
                    setTimeout(handleRoundEnd, 800);
                }
            }
        });
    }

    // === 親権維持確認関数 ===
    async function askKeepParentRight(cardLevel) {
        const maxKeepUses = (cardLevel >= 2 ? 2 : 1);
        setMessage(`親権維持カード(Lv.${cardLevel})を使用しますか？ (WAVE中 残り${maxKeepUses - keepParentRightUsedThisWave}回)`, true);
        const useCard = await waitForUserChoice();
        return useCard;
    }

    // === ラウンド終了処理 (NPC連勝ボーナス復活) ===
    async function handleRoundEnd() {
        if (waitingForUserChoice) return;

        isGameActive = false; rollButton.disabled = true;
        playerHandArea.innerHTML = ''; playerHandArea.style.display = 'none';

        let pWin = false, nWin = false, draw = false, msg = "", sc = 0, rClass = 'draw';
        let parentChanged = false; let preventParentChange = false; let parentKeptByCard = false;

        if (playerHand?.type === 'ションベン') nWin = true;
        else if (npcHand?.type === 'ションベン') pWin = true;
        else {
            const playerStrength = playerHand?.strength ?? ROLES.SHONBEN.strength;
            const npcStrength = npcHand?.strength ?? ROLES.SHONBEN.strength;
            if (playerStrength > npcStrength) pWin = true;
            else if (playerStrength < npcStrength) nWin = true;
            else if (playerStrength === ROLES.NORMAL_EYE.strength) {
                const pv = playerHand?.value ?? 0; const nv = npcHand?.value ?? 0;
                if (pv > nv) pWin = true; else if (pv < nv) nWin = true; else draw = true;
            } else draw = true;
        }

        const keepRightCard = playerCards.find(card => card.id === 'keepParentalRight');
        const maxKeepUses = keepRightCard ? (keepRightCard.level >= 2 ? 2 : 1) : 0;
        const keepRightUsesCount = keepParentRightUsedThisWave;
        if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) {
            const useKeepRight = await askKeepParentRight(keepRightCard.level);
            if (useKeepRight) {
                preventParentChange = true; parentKeptByCard = true; keepParentRightUsedThisWave++;
                if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; }
                console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} 発動！ (${keepParentRightUsedThisWave}/${maxKeepUses}回使用)`);
                 activeCardUses['keepParentalRight'] = (activeCardUses['keepParentalRight'] || 0) + 1;
            }
        }

        if (pWin && isPlayerParent) { consecutiveWins++; npcConsecutiveWins = 0; }
        else if (nWin && !isPlayerParent) { npcConsecutiveWins++; consecutiveWins = 0; }
        else if (pWin && !isPlayerParent) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = true; }
        else if (nWin && isPlayerParent && !preventParentChange) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = false; }
        else if (nWin && isPlayerParent && preventParentChange) { npcConsecutiveWins = 0; /* プレイヤー連勝維持 */ }
        else { consecutiveWins = isPlayerParent ? consecutiveWins : 0; npcConsecutiveWins = !isPlayerParent ? npcConsecutiveWins : 0; }

        let baseScoreChange = 0; let playerPayoutMultiplier = 1; let npcPayoutMultiplier = 1;

        if (pWin) {
             playerPayoutMultiplier = playerHand?.payoutMultiplier || 1;
            if (npcHand?.name === ROLES.HIFUMI.name) playerPayoutMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier);
            if (playerHand?.name === ROLES.HIFUMI.name) playerPayoutMultiplier = 1;

            let arashiBonusTotal = 0, shigoroBonusTotal = 0;
            playerCards.forEach(cardData => { const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef || !cardDef.effectTag) return; switch (cardDef.effectTag) { case 'arashiBonus': if (playerHand?.name === ROLES.ARASHI.name) arashiBonusTotal += cardData.level; break; case 'shigoroBonus': if (playerHand?.name === ROLES.SHIGORO.name) shigoroBonusTotal += cardData.level; break; } });
            if (arashiBonusTotal > 0) { playerPayoutMultiplier += arashiBonusTotal; console.log(`Card Effect: Arashi Bonus +${arashiBonusTotal}!`); }
            if (shigoroBonusTotal > 0) { playerPayoutMultiplier += shigoroBonusTotal; console.log(`Card Effect: Shigoro Bonus +${shigoroBonusTotal}!`); }

            if (rewardAmplifierActive && playerHand?.type === '役' && [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name].includes(playerHand.name)) {
                 const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier'); const bonus = (amplifierCard && amplifierCard.level >= 2) ? 2 : 1; playerPayoutMultiplier += bonus;
                 console.log(`Card Effect: 報酬増幅 Lv.${amplifierCard?.level} 発動！ Payout Multiplier +${bonus}`);
                 if(amplifierCard) activeCardUses['rewardAmplifier'] = (activeCardUses['rewardAmplifier'] || 0) + 1;
                 rewardAmplifierActive = false;
            }
            baseScoreChange = currentBet * playerPayoutMultiplier;

            let eyeBonusMultiplier = 1.0;
            if (playerHand?.type === '目') {
                 const sixEyeCard = playerCards.find(c => c.id === 'sixEyeBonus'); if (sixEyeCard && playerHand.value === 6) { eyeBonusMultiplier = Math.max(eyeBonusMultiplier, 1.0 + sixEyeCard.level * 0.5); if (eyeBonusMultiplier > 1.0) console.log(`Card Effect: 6 Eye Bonus Lv.${sixEyeCard.level} x${eyeBonusMultiplier.toFixed(1)}!`); }
                 const oneEyeCard = playerCards.find(c => c.id === 'oneEyeBonus'); if (oneEyeCard && playerHand.value === 1) { eyeBonusMultiplier = Math.max(eyeBonusMultiplier, 1.5 + oneEyeCard.level * 0.5); if (eyeBonusMultiplier > 1.0) console.log(`Card Effect: 1 Eye Bonus Lv.${oneEyeCard.level} x${eyeBonusMultiplier.toFixed(1)}!`); }
            }
            baseScoreChange *= eyeBonusMultiplier;

             const spiritCard = playerCards.find(card => card.id === 'fightingSpirit');
             if (spiritCard) { const conditionMet = (spiritCard.level < 3 && playerScore <= npcScore / 2) || (spiritCard.level >= 3 && playerScore <= npcScore); if (conditionMet) { const spiritMultiplier = [1.2, 1.4, 1.6][spiritCard.level - 1]; baseScoreChange *= spiritMultiplier; console.log(`Card Effect: 逆境の魂 Lv.${spiritCard.level}適用！ 獲得点数 x${spiritMultiplier}`); } }

             if (doubleUpBetActive && !isPlayerParent) {
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                 const winMultiplier = [2, 2.5, 3][(doubleUpCard?.level || 1) - 1];
                 baseScoreChange *= winMultiplier; console.log(`Card Effect: ダブルアップ Lv.${doubleUpCard?.level} 成功！ Win Multiplier x${winMultiplier}`);
                 if(doubleUpCard) activeCardUses['doubleUpBet'] = (activeCardUses['doubleUpBet'] || 0) + 1;
                 doubleUpBetActive = false;
             }
             let winBonusMultiplier = 1.0;
             if (isPlayerParent && consecutiveWins > 0) { winBonusMultiplier = 1 + consecutiveWins * CONSECUTIVE_WIN_BONUS_RATE; console.log(`Player Win Streak Bonus Applied: x${winBonusMultiplier.toFixed(2)} (${consecutiveWins} wins)`); }
             sc = Math.round(baseScoreChange * winBonusMultiplier);

             msg = npcHand?.type === 'ションベン' ? "NPCションベンで勝利！" : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             if (isPlayerParent && consecutiveWins > 1) msg += ` (${consecutiveWins}連勝!)`;
             rClass = 'win';
        } else if (nWin) { // NPC勝利
             const insuranceCard = playerCards.find(card => card.id === 'lossInsurance');
             if (insuranceCard) {
                 const lossMultiplier = [1.5, 1.3, 1.1][insuranceCard.level - 1];
                 npcPayoutMultiplier = lossMultiplier; console.log(`Card Effect: 一撃保険 Lv.${insuranceCard.level}適用！ Loss Multiplier: ${npcPayoutMultiplier}`);
                 baseScoreChange = - (currentBet * npcPayoutMultiplier);
             } else {
                 npcPayoutMultiplier = npcHand?.payoutMultiplier || 1;
                 if (playerHand?.name === ROLES.HIFUMI.name) { npcPayoutMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier); }
                 else if (npcHand?.name === ROLES.HIFUMI.name) { npcPayoutMultiplier = 1; }
                 else if (playerHand?.type === 'ションベン') { npcPayoutMultiplier = Math.abs(ROLES.SHONBEN.payoutMultiplier); }
                 baseScoreChange = - (currentBet * npcPayoutMultiplier);

                 let lossReductionMultiplier = 1.0;
                 if (playerHand?.name === ROLES.HIFUMI.name) {
                     const hifumiCard = playerCards.find(card => card.id === 'hifumiHalf');
                     if (hifumiCard) { const reductionRate = [0.5, 0.75, 1.0][hifumiCard.level - 1]; lossReductionMultiplier *= (1.0 - reductionRate); console.log(`Card Effect: ヒフミ軽減 Lv.${hifumiCard.level} (Payment Multiplier: ${lossReductionMultiplier.toFixed(2)})!`); }
                 } else if (playerHand?.type === 'ションベン') {
                     const shonbenCard = playerCards.find(card => card.id === 'shonbenHalf');
                     if (shonbenCard) { const reductionRate = [0.5, 0.75, 1.0][shonbenCard.level - 1]; lossReductionMultiplier *= (1.0 - reductionRate); console.log(`Card Effect: ションベン半減 Lv.${shonbenCard.level} (Payment Multiplier: ${lossReductionMultiplier.toFixed(2)})!`); }
                     const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
                     if (giveUpEyeUsedThisTurn && giveUpCard?.level >= 2) { lossReductionMultiplier *= 0.5; console.log(`Card Effect: 見切り Lv.2+ - 支払い半減適用!`); }
                 }
                 baseScoreChange *= lossReductionMultiplier;
             }

             if (doubleUpBetActive && !isPlayerParent) {
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                 const lossMultiplier = 2.0;
                 baseScoreChange *= lossMultiplier; console.log(`Card Effect: ダブルアップ Lv.${doubleUpCard?.level} 失敗！ Loss Multiplier x${lossMultiplier}`);
                 if(doubleUpCard) activeCardUses['doubleUpBet'] = (activeCardUses['doubleUpBet'] || 0) + 1;
                 doubleUpBetActive = false;
             }

             // ★ NPC連勝ボーナス復活
             let npcWinBonusMultiplier = 1.0;
             if (!isPlayerParent && npcConsecutiveWins > 0) {
                 npcWinBonusMultiplier = 1 + npcConsecutiveWins * CONSECUTIVE_WIN_BONUS_RATE;
                 console.log(`NPC Win Streak Bonus Applied: x${npcWinBonusMultiplier.toFixed(2)} (${npcConsecutiveWins} wins)`);
             }
             sc = Math.round(baseScoreChange * npcWinBonusMultiplier); // 適用

             msg = playerHand?.type === 'ションベン' ? "ションベンで敗北..." : `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             if (insuranceCard) msg += ` (一撃保険適用)`;
             // ★ NPC連勝表示 (テキストは updateUI で行う)
             // if (!isPlayerParent && npcConsecutiveWins > 1) msg += ` (相手${npcConsecutiveWins}連勝)`;
             rClass = 'lose';
        } else { // 引き分け
             sc = 0;
             const drawCard = playerCards.find(card => card.id === 'drawBonus');
             if (drawCard) {
                 const bonusRate = (drawCard.level * 10) / 100;
                 sc = Math.round(currentBet * bonusRate); console.log(`Card Effect: Draw Bonus Lv.${drawCard.level} (${(bonusRate * 100).toFixed(0)}%)! Score change: +${sc}`);
             }
             msg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             rClass = 'draw';
        }

        const psStart = playerScore, nsStart = npcScore;
        const psEnd = Math.max(0, psStart + sc); const nsEnd = Math.max(0, nsStart - sc);
        playerScore = psEnd; npcScore = nsEnd;
        totalScoreChange += sc;
        if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); }
        animateScore(playerScoreEl, psStart, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, nsStart, nsEnd, SCORE_ANIMATION_DURATION);

        addHistoryEntry({ wave: currentWave, round: currentRoundInWave, playerDice: playerDice.join(','), playerHandName: getHandDisplayName(playerHand), npcDice: npcDice.join(','), npcHandName: getHandDisplayName(npcHand), result: rClass, scoreChange: sc, consecutiveWins: consecutiveWins, npcConsecutiveWins: npcConsecutiveWins, parentAfter: isPlayerParent ? 'Player' : 'NPC' });

        setTimeout(() => {
            let finalMsg = `${msg} ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`;
            if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? 'あなた' : '相手'}が親です。`; }
            else if (parentKeptByCard) { finalMsg += " (親権維持発動！)"; }
            setMessage(finalMsg); updateUI(); checkGameEnd();
        }, SCORE_ANIMATION_DURATION + 300);

        // === ラウンド終了時フラグリセット ===
        rewardAmplifierActive = false;
        giveUpEyeUsedThisTurn = false;
        adjustEyeUsedThisTurn = false;
        nextChanceUsedThisTurn = false;
        soulRollUsedThisTurn = false;
    } // handleRoundEnd 関数の終わり

    // === ゲーム終了チェック ===
    function checkGameEnd() {
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);

        if (playerScore <= 0) {
            isGO = true; gameOverReason = "持ち点が0になりました。";
        } else if (npcScore <= 0) {
            defeatedCount++;
            if (currentWave >= MAX_WAVES) {
                isC = true; gameOverReason = "最終WAVEで相手の持ち点を0にしました！";
            } else {
                console.log("NPC defeated, proceeding to shop.");
                const earnedCoins = calculateEarnedCoins();
                calculateAndAwardCoins(); // アニメーションとスコア更新含む
                setMessage(`NPC撃破！ コイン ${earnedCoins} G獲得！ ショップへどうぞ！`);
                updateUI();
                betArea.style.display = 'none'; actionArea.style.display = 'none'; nextWaveArea.style.display = 'flex';
                currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
                activeCardUses = {}; keepParentRightUsedThisWave = 0;
                return;
            }
        }

        if (isGO || isC) {
            console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`);
            isGameActive = false;
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; historyButton.disabled = false; maxBetButton.disabled = true;
            currentBetInfoEl.textContent = '';
            if(isC) calculateAndAwardCoins(); // クリア時はコイン計算 & アニメーション
            showResultScreen(isC, playerScore, currentWave, gameOverReason);
        } else {
            console.log("Round end, continuing game.");
            startBettingPhase();
        }
    } // checkGameEnd 関数の終わり

    // === コイン計算 (バランス調整) ===
    function calculateEarnedCoins() {
        const waveBonus = currentWave * 20; // WAVEボーナス
        const defeatBonus = 80; // NPC撃破ボーナス
        // WAVE内スコア増加ボーナス (最大30G程度?)
        const scoreGainInWave = Math.max(0, playerScore - scoreAtWaveStart);
        const scoreGainBonus = Math.min(30, Math.floor(scoreGainInWave * 0.05));
        // オーバーキルボーナス (最大50G程度?)
        const overkillBonus = npcScore < 0 ? Math.min(50, Math.floor(Math.abs(npcScore) * 0.2)) : 0;
        // ラウンドペナルティ (1ラウンド超過ごとに20減点)
        const roundsTaken = Math.max(1, currentRoundInWave);
        const roundPenalty = Math.max(0, (roundsTaken - 1) * 20);

        const baseEarned = waveBonus + defeatBonus + scoreGainBonus + overkillBonus - roundPenalty;
        // 獲得上限を300Gに設定
        const earned = Math.min(300, Math.max(10, baseEarned));

        console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`);
        return earned;
    }
    // === コイン獲得処理とアニメーション ===
    function calculateAndAwardCoins() {
        const earned = calculateEarnedCoins();
        if (earned <= 0) return; // 獲得コインが0以下なら何もしない

        const startCoins = playerCoins;
        playerCoins += earned;
        console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`);
        // アニメーション再生
        playCoinAnimation(earned);
        // コイン表示をアニメーションで更新
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        // ショップ画面が開いていればそちらも更新
        if (shopScreen.classList.contains('active')) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        }
    }
    // === コイン獲得アニメーション再生 ===
    function playCoinAnimation(amount) {
        if (!gameCoinInfoEl || amount <= 0) return;

        const numCoins = Math.min(20, Math.max(5, Math.floor(amount / 10)));
        const targetRect = gameCoinDisplayEl.getBoundingClientRect();
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';

            // 開始位置を画面中央付近にランダムに設定
            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 150;
            const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 150;
            coin.style.left = `${startX}px`;
            coin.style.top = `${startY}px`;

            // ターゲット位置までの相対距離を計算してCSS変数に設定
            const deltaX = targetX - startX;
            const deltaY = targetY - startY;
            coin.style.setProperty('--tx', `${deltaX}px`);
            coin.style.setProperty('--ty', `${deltaY}px`);

            // アニメーションの遅延をランダムに設定
            coin.style.animationDelay = `${Math.random() * 0.4}s`;

            document.body.appendChild(coin);

            // アニメーション終了後に要素を削除
            coin.addEventListener('animationend', () => {
                if (coin.parentNode) {
                    coin.remove();
                }
            }, { once: true }); // イベントリスナーを一度だけ実行
        }
    }

    // === 結果画面表示 ===
    function showResultScreen(isClear, currentScore, wave, reason = "") {
        resultTitleEl.textContent = isClear ? "ゲームクリア！" : "ゲームオーバー";
        resultTitleEl.className = isClear ? 'clear' : 'over';
        resultMessageEl.textContent = isClear ? `祝！ 全${MAX_WAVES}WAVE制覇！` : `残念！ WAVE ${wave} で敗北... ${reason}`;
        let finalCalcScore = 0;
        const scoreDiff = totalScoreChange;
        const coinBonus = playerCoins * 3;

        if (isClear) {
             const clearBonus = MAX_WAVES * 100;
             finalCalcScore = Math.max(0, scoreDiff + clearBonus + coinBonus);
        } else {
             finalCalcScore = Math.max(0, scoreDiff + coinBonus);
        }
        finalScoreEl.textContent = `最終スコア: ${finalCalcScore}`;
        showScreen('result-screen');
    }
    // === 履歴追加・表示 ===
    function addHistoryEntry(entry) { gameHistory.push(entry); }
    function displayHistory() {
        historyLogEl.innerHTML = '';
        if (gameHistory.length === 0) { historyLogEl.innerHTML = '<li>履歴なし</li>'; return; }
        [...gameHistory].reverse().forEach(e => {
            const li = document.createElement('li');
            li.className = e.result;
            const mark = e.result === 'win' ? '○' : e.result === 'lose' ? '●' : '△';
            const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : '';
            const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : '';
            const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${e.npcConsecutiveWins}連敗...)</span>` : ''; // ★ 連敗表示クラス適用
            const parentStr = e.parentAfter ? `<span class="parent-info">(次の親: ${e.parentAfter === 'Player' ? 'あなた' : '相手'})</span>` : '';
            // ★ WAVE/ROUND 色分け
            li.innerHTML = `<span class="wave-num"><span class="wave-highlight">WAVE ${e.wave}</span> - <span class="round-normal">ROUND ${e.round}</span> ${parentStr}</span><div class="details"><span class="player">${mark} あなた: ${e.playerDice} <span class="hand">${e.playerHandName}</span></span><span class="vs">vs</span><span class="npc">相手: ${e.npcDice} <span class="hand">${e.npcHandName}</span></span></div><div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div>`;
            historyLogEl.appendChild(li);
        });
    }

    // --- ショップ関連 ---
    function openShop() {
        console.log("Opening shop...");
        scoreAtWaveStart = playerScore; // WAVE開始時のスコアを記録
        nextWaveArea.style.display = 'none';
        purchasedOrUpgradedInShop = [];
        setShopMessage(DEFAULT_SHOP_MESSAGE);
        const exchangeCard = playerCards.find(card => card.id === 'handExchange');
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 2 ? 2 : 1) : 0;
        activeCardUses['handExchangeFreeRerollCount'] = 0; // ★ ショップ入店時に無料リロール使用回数リセット

        console.log(`Hand Exchange Card Lv.${exchangeCard?.level}, Free rerolls for this visit: ${freeRerollsAvailableThisShopVisit}`);
        applyPlayerCardEffects();
        displayShopOffers();
        shopChoicePlus1Active = false;
        updateShopUI();
        showScreen('shop-screen');
    }
    function closeShop() {
        console.log("Closing shop, proceeding to next wave.");
        consecutiveWins = 0; npcConsecutiveWins = 0;
        currentWave++;

        playerScore = INITIAL_PLAYER_SCORE; // 持ち点リセット

        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        currentMinBet = baseMinBet;
        npcScore = NPC_START_SCORE_BASE + defeatedCount * npcScoreIncrement;
        isPlayerParent = true;
        playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
        betArea.style.display = 'flex'; actionArea.style.display = 'flex';
        rollButton.disabled = true; historyButton.disabled = false;
        activeCardUses = {}; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false;
        applyPlayerCardEffects();
        updateUI();
        showScreen('game-screen');
        startBettingPhase();
    }
    function displayShopOffers() {
        currentShopOffers = []; shopCardOffersEl.innerHTML = '';
        const ownedCardIds = playerCards.map(card => card.id);
        const availableForPurchaseOrUpgrade = allCards.filter(card => { const owned = playerCards.find(c => c.id === card.id); return !owned || owned.level < MAX_CARD_LEVEL; });

        const numOffersBase = 3;
        let numOffers = numOffersBase;
        if (shopChoicePlus1Active) {
            const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
            if (choiceCard) numOffers += 1;
            console.log("Shop Choice+1 Active! Offers:", numOffers);
        }

        const shuffled = availableForPurchaseOrUpgrade.sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numOffers, shuffled.length); i++) {
            const cardData = shuffled[i];
            const ownedCard = playerCards.find(c => c.id === cardData.id);
            const isOwned = !!ownedCard;
            const currentLevel = ownedCard ? ownedCard.level : 0;
            const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL;
            const nextLevel = currentLevel + 1;

            let displayCost = 0;
            if (isOwned && !isMaxLevel) {
                displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel);
            } else if (!isOwned) {
                displayCost = cardData.cost;
            }
            const exchangeCard = playerCards.find(c => c.id === 'handExchange');
            if(exchangeCard && exchangeCard.level >= 3) {
                 displayCost = Math.floor(displayCost * 0.9);
            }

            currentShopOffers.push({ ...cardData, isOwned: isOwned, currentLevel: currentLevel, displayCost: displayCost });

            const cardElement = document.createElement('div');
            const rarityClass = ['normal', 'rare', 'epic', 'legendary'][cardData.rarity - 1] || 'normal';
            cardElement.className = `card type-${cardData.type} rarity-${rarityClass}`;
            cardElement.dataset.cardId = cardData.id;

            let buttonHtml = ''; let cost = displayCost; let costDisplay = '';
            let cardNameHtml = cardData.name; let descriptionHtml = cardData.description; let levelSpan = '';

            if (isOwned) {
                cardElement.classList.add('upgradeable');
                if (isMaxLevel) {
                    cardElement.classList.add('max-level'); costDisplay = `<span class="card-cost">最大Lv</span>`;
                    levelSpan = `<span class="card-level">(Lv.${currentLevel})</span>`;
                    descriptionHtml = getUpgradeDescription(cardData, currentLevel);
                } else {
                    costDisplay = `<span class="card-cost">${cost} G</span>`;
                    const levelColorClass = `card-level-value-${nextLevel}`;
                    levelSpan = `<span class="card-level">(Lv.${currentLevel} → <span class="${levelColorClass}">Lv.${nextLevel}</span>)</span>`;
                    descriptionHtml = getUpgradeDescription(cardData, nextLevel);
                    buttonHtml = `<button class="buy-button upgrade-button button-pop" data-card-id="${cardData.id}" data-action="upgrade" data-cost="${cost}">強化</button>`;
                    if (nextLevel === 3) { cardElement.classList.add('upgradeable-lv3'); }
                }
            } else {
                costDisplay = `<span class="card-cost">${cost} G</span>`;
                buttonHtml = `<button class="buy-button button-pop" data-card-id="${cardData.id}" data-action="buy" data-cost="${cost}">購入</button>`;
                descriptionHtml = getUpgradeDescription(cardData, 1);
            }

            if (purchasedOrUpgradedInShop.includes(cardData.id)) {
                cardElement.classList.add('sold-out'); buttonHtml = ''; costDisplay = '';
                cardElement.classList.remove('upgradeable', 'max-level', 'upgradeable-lv3');
            }
            if (cardData.image) { cardElement.style.backgroundImage = `url('${cardData.image}')`; }

            const rarityText = ['N', 'R', 'EP', 'LG'][cardData.rarity - 1] || 'N';
            const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
            cardNameHtml = `${cardData.name}${levelSpan}`;
            const cardInnerHtml = `<span class="card-type-badge">${getCardTypeName(cardData.type)}</span>${rarityBadgeHtml}<h3 class="card-name">${cardNameHtml}</h3><p class="card-description">${descriptionHtml}</p>`;
            cardElement.innerHTML = cardInnerHtml;

            const footer = document.createElement('div');
            footer.className = 'card-footer';
            footer.innerHTML = `${costDisplay}${buttonHtml}`;
            if(cardElement.classList.contains('sold-out')) { footer.style.display = 'none'; }
            cardElement.appendChild(footer);
            shopCardOffersEl.appendChild(cardElement);
        }
    }
    // カード強化説明取得
    function getUpgradeDescription(cardData, level) {
        switch (cardData.id) {
            case 'reroll1': return `最大振り直し回数が合計 ${BASE_MAX_ROLLS + level} 回になる。`;
            case 'shonbenHalf': return `ションベン支払いが ${['50%', '75%', '100%'][level-1]} 減少する。`;
            case 'ignoreMinBet': return `WAVE中 ${level} 回、最低1Gで賭けられる。`;
            case 'shopChoicePlus1': return `次ショップ提示数+1${level >= 2 ? ` & リロールコスト-${(level-1)*10}G` : ''}${level >= 3 ? '(無料)' : ''}。`;
            case 'changeToOne': case 'changeToSix': return `WAVE中 ${level} 回、サイコロを ${cardData.id === 'changeToOne' ? '1' : '6'} に変更できる。`;
            case 'zoroChanceUp': return `使用したラウンドのロール時、ゾロ目確率UP(${['小','中','大'][level-1]})${level >= 3 ? ' & WAVE中2回' : ''}。`;
            case 'avoid123_456': return `使用したラウンドのロール時、役回避${level >= 2 ? '(ションベンも)' : ''}${level >= 3 ? ' & WAVE中2回' : ''}。`;
            case 'sixEyeBonus': return `6の目勝利時、獲得点数 x${(1.0 + level * 0.5).toFixed(1)}。`;
            case 'oneEyeBonus': return `1の目勝利時、獲得点数 x${(1.5 + level * 0.5).toFixed(1)}。`;
            case 'arashiBonus': case 'shigoroBonus': return `${cardData.name === 'アラシ強化' ? 'アラシ' : 'シゴロ'}勝利時の倍率が合計 +${level} される。`;
            case 'hifumiHalf': return `ヒフミ支払いが ${['50%', '75%', '100%'][level-1]} 減少する。`;
            case 'drawBonus': return `引き分け時、賭け金の ${level * 10}% を獲得。`;
            case 'blessingDice': return `使用したラウンドのロール時、6が出る確率 ${['小','中','大'][level-1]} UP${level >= 3 ? '(WAVE中2回)' : ''}。`;
            case 'adjustEye': return `WAVE中${level >= 2 ? '2' : '1'}回、「目」確定後 ${level >= 3 ? '±2' : '±1'} 調整可。`;
            case 'stormWarning': return `使用したロールで${level >= 3 ? 'アラシorピンゾロ' : 'アラシ'}以外なら、${level >= 2 ? '2' : '1'}回まで振り直し消費なし。再ロール時アラシ確率微増。`;
            case 'nextChance': return `WAVE中${level >= 3 ? '2' : '1'}回、「目」確定後にその目${level >= 2 ? 'となったダイス1つまたは2つを選んで' : 'となったダイス1つだけを'}振り直せる。`;
            case 'betBoost': return `最大ベット額上限が持ち点の ${[1.2, 1.4, 1.6][level-1]}倍 になる。(相手依存有)`;
            case 'fightingSpirit': return `持ち点が相手の${level >= 3 ? '' : '半分'}以下の時、勝利時獲得点数 x${[1.2, 1.4, 1.6][level-1]}。`;
            case 'rewardAmplifier': return `WAVE中${level >= 3 ? '2' : '1'}回、役勝利時の基本配当倍率+${level >= 2 ? '2' : '1'}。`;
            case 'keepParentalRight': return `WAVE中${level >= 2 ? '2' : '1'}回、親の時負けても交代しない${level >= 3 ? '& 次R最低賭け金半減' : ''}。(使用選択)`;
            case 'handExchange': return `次ショップでのリロールが${level >= 2 ? '2' : '1'}回無料になる${level >= 3 ? '& カード購入/強化コスト10%OFF' : ''}。`;
            case 'soulRoll': return `WAVE中1回、振り残り0で持ち点の${[10, 5, 5][level-1]}%消費し追加1回ロール${level >= 3 ? '(目なし率減)' : ''}。`;
            case 'doubleUpBet': return `WAVE中1回、子が目/役確定後に使用。勝利時x${[2, 2.5, 3][level-1]}/敗北時x2。`;
            case 'riskyBet': return `WAVE中${level >= 3 ? '2' : '1'}回、賭け金決定時に使用。賭け金2倍${level >= 2 ? '' : '& 最低賭け金も2倍'}。`;
            case 'giveUpEye': return `WAVE中${level >= 3 ? '2' : '1'}回、「目なし」時に振り直さずションベン扱いにできる${level >= 2 ? '(支払半減)' : ''}。`;
            case 'blindingDice': return `WAVE中1回、相手ロール前に使用。相手特殊役確率低下(${['小','中','大'][level-1]})${level >= 3 ? '&ションベン率UP' : ''}。`;
            case 'lossInsurance': return `敗北時、常に賭け金の ${[1.5, 1.3, 1.1][level-1]}倍 を支払う。`;
            default: return cardData.description;
        }
    }
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } }

    // ショップUI更新
    function updateShopUI() {
        shopCoinDisplayEl.textContent = playerCoins;
        updateShopHandDisplay();

        shopCardOffersEl.querySelectorAll('.card').forEach(cardElement => {
            const cardId = cardElement.dataset.cardId;
            const footer = cardElement.querySelector('.card-footer');
            const costDisplayEl = cardElement.querySelector('.card-cost');
            const button = cardElement.querySelector('.buy-button, .upgrade-button');

            if (purchasedOrUpgradedInShop.includes(cardId)) {
                cardElement.classList.add('sold-out');
                cardElement.classList.remove('upgradeable', 'max-level', 'upgradeable-lv3');
                if (footer) footer.style.display = 'none';
                if (button) button.style.display = 'none';
                if (costDisplayEl) costDisplayEl.style.display = 'none';
                return;
            } else {
                 cardElement.classList.remove('sold-out');
                 if (footer) footer.style.display = 'flex';
                 if (button) button.style.display = 'inline-block';
                 if (costDisplayEl) costDisplayEl.style.display = 'inline-block';
            }

            const offerData = currentShopOffers.find(offer => offer.id === cardId);
            if (!offerData || !button) return;

            let cost = offerData.displayCost;

            if (offerData.isOwned && offerData.currentLevel < MAX_CARD_LEVEL) {
                button.disabled = playerCoins < cost;
                button.dataset.cost = cost;
                if (costDisplayEl) costDisplayEl.textContent = `${cost} G`;
            } else if (!offerData.isOwned) {
                 button.disabled = playerCoins < cost;
                 button.dataset.cost = cost;
                 if (costDisplayEl) costDisplayEl.textContent = `${cost} G`;
            } else {
                button.disabled = true;
                if (costDisplayEl) costDisplayEl.textContent = '最大Lv';
            }
        });
          // リロールボタン制御
          let currentRerollCost = REROLL_COST;
          const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
          if (shopChoiceCard) { // shopChoicePlus1によるコスト減
               if (shopChoiceCard.level === 2) currentRerollCost = Math.max(0, REROLL_COST - 10);
               else if (shopChoiceCard.level >= 3) currentRerollCost = 0;
          }
  
          let rerollButtonText = "";
          let rerollDisabled = false;
  
          // ★ 修正: 無料リロール回数を現在のカード状況から再計算して使用済みと比較
          const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange');
          const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0;
          const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0; // 使用回数を取得
  
          if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) { // まだ無料回数が残っているか
              rerollButtonText = `無料リロール (${currentFreeRerollsAvailable - usedFreeRerollsThisVisit}回)`;
              currentRerollCost = 0;
              rerollDisabled = false;
          } else {
              rerollButtonText = `リロール (${currentRerollCost} G)`;
              rerollDisabled = playerCoins < currentRerollCost;
          }
  
          shopRerollCostEl.textContent = currentRerollCost;
          shopRerollButton.innerHTML = `<span class="reroll-icon">↻</span> ${rerollButtonText}`;
          shopRerollButton.disabled = rerollDisabled;
      }
      // カード購入/強化処理
      function handleBuyCard(event) {
          const button = event.target;
          const cardId = button.dataset.cardId;
          const action = button.dataset.action;
          const cost = parseInt(button.dataset.cost || '0');
          const offerData = currentShopOffers.find(offer => offer.id === cardId);
          if (!offerData) return;
  
          let actualCost = cost;
          const exchangeCard = playerCards.find(c => c.id === 'handExchange');
          if (exchangeCard && exchangeCard.level >= 3) {
              actualCost = Math.floor(cost * 0.9);
              console.log(`Hand Exchange Lv3 Discount Applied! Original Cost: ${cost}, Actual Cost: ${actualCost}`);
          }
  
          if (playerCoins < actualCost) { setShopMessage("コインが足りません！"); return; }
  
          if (action === 'upgrade') {
              const currentCardData = playerCards.find(c => c.id === cardId);
              if (!currentCardData || currentCardData.level >= MAX_CARD_LEVEL) { setShopMessage("これ以上強化できません。"); return; }
              const nextLevel = currentCardData.level + 1;
  
              playerCoins -= actualCost;
              currentCardData.level = nextLevel;
              purchasedOrUpgradedInShop.push(cardId);
              console.log(`Upgraded card: ${offerData.name} to Lv.${nextLevel} for ${actualCost}G`);
              setShopMessage(`${offerData.name} を Lv.${nextLevel} に強化しました！`);
              applyPlayerCardEffects();
          } else if (action === 'buy') {
              if (playerCards.length >= MAX_HAND_CARDS) {
                   setShopMessage("手札がいっぱいです！売却するカードを選んでください。");
                   cardToDiscardFor = { ...offerData, cost: actualCost };
                   openDiscardModal(); return;
              }
              purchaseCard({ ...offerData, cost: actualCost });
          }
          updateShopUI();
      }
      // カード購入実行
      function purchaseCard(cardDefinition) {
          playerCoins -= cardDefinition.cost;
          playerCards.push({ id: cardDefinition.id, level: 1 });
          purchasedOrUpgradedInShop.push(cardDefinition.id);
          console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${cardDefinition.cost}G`);
          setShopMessage(`${cardDefinition.name} を購入しました！`);
          applyPlayerCardEffects();
          updateShopUI();
      }
      // リロール処理
      function handleReroll() {
          let actualRerollCost = REROLL_COST;
          const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
          if (shopChoiceCard) { if (shopChoiceCard.level === 2) actualRerollCost = Math.max(0, REROLL_COST - 10); else if (shopChoiceCard.level >= 3) actualRerollCost = 0; }
  
          // ★ 無料リロール回数をチェック
          const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange');
          const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0;
          const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;
  
          if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) { // 無料回数が残っているか
              activeCardUses['handExchangeFreeRerollCount'] = usedFreeRerollsThisVisit + 1; // 使用回数をカウント
              setShopMessage(`無料リロールを使用しました！ (本日残り ${currentFreeRerollsAvailable - activeCardUses['handExchangeFreeRerollCount']} 回)`);
              console.log(`Used free reroll. Total free used this visit: ${activeCardUses['handExchangeFreeRerollCount']}`);
          } else {
              if (playerCoins < actualRerollCost) { setShopMessage("リロールするためのコインが足りません！"); return; }
              playerCoins -= actualRerollCost;
              setShopMessage(DEFAULT_SHOP_MESSAGE);
              console.log(`Paid ${actualRerollCost}G for reroll.`);
          }
          purchasedOrUpgradedInShop = []; // 購入済み状態リセット
          console.log("Rerolled shop offers.");
          displayShopOffers(); // 新しいオファーを表示
          updateShopUI();
      }
      // 破棄モーダル表示
      function openDiscardModal() {
          discardOptionsEl.innerHTML = '';
          playerCards.forEach(cardData => {
              const cardDefinition = allCards.find(c => c.id === cardData.id);
              if (cardDefinition) {
                  const sellPrice = calculateSellPrice(cardData);
                  const button = document.createElement('button');
                  button.className = 'discard-choice-button';
                  button.textContent = `${cardDefinition.name} [Lv.${cardData.level}] (売却: ${sellPrice}G)`;
                  button.dataset.cardId = cardData.id;
                  button.dataset.sellPrice = sellPrice;
                  button.addEventListener('click', handleDiscardChoice);
                  discardOptionsEl.appendChild(button);
              }
          });
          discardModal.style.display = 'block';
      }
      // 破棄カード選択
      function handleDiscardChoice(event) {
          const discardedCardId = event.target.dataset.cardId;
          const sellPrice = parseInt(event.target.dataset.sellPrice || '0');
          const newCardDefinition = cardToDiscardFor; // 購入しようとしていたカード情報
          if (!newCardDefinition) return;
  
          removePlayerCardEffect(discardedCardId); // カード削除と効果再計算
          playerCoins += sellPrice;
          console.log(`Sold card ${discardedCardId} for ${sellPrice}G.`);
  
          // 新しいカードを購入（コストは破棄前に計算済み）
          if (playerCoins >= newCardDefinition.cost) {
               purchaseCard(newCardDefinition);
          } else {
               setShopMessage(`売却しましたが、コインが足りず ${newCardDefinition.name} を購入できませんでした。`);
          }
  
          cardToDiscardFor = null;
          discardModal.style.display = 'none';
          updateShopUI();
      }
      // 破棄キャンセル
      function cancelDiscard() { cardToDiscardFor = null; discardModal.style.display = 'none'; setShopMessage(DEFAULT_SHOP_MESSAGE); }
      function setShopMessage(msg) { shopMessageEl.textContent = msg; }
      // 手札から直接売却 (asyncに変更、確認フロー追加)
      async function handleSellCard(event) { // async追加
          const button = event.target;
          const cardId = button.dataset.cardId;
          const sellPrice = parseInt(button.dataset.sellPrice || '0');
          const cardName = button.dataset.cardName || cardId;
          const cardLevel = button.dataset.cardLevel || '?';
  
          // ★ 修正: confirm を使用
          if (!confirm(`ショップ: ${cardName} [Lv.${cardLevel}] を ${sellPrice}G で売却しますか？`)) {
              return; // 売却中止
          }
  
          // 売却処理
          removePlayerCardEffect(cardId); // 効果削除と手札からの削除
          playerCoins += sellPrice;
          setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`); // ショップメッセージ更新
          console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
  
          // ★ 修正: updateShopUI() のみ呼ぶ
          updateShopUI();
      }
  
      // ゲーム画面の手札表示とアクティブカード使用
      function displayPlayerHandOnGameScreen() {
          if (!playerHandArea) return;
          playerHandArea.innerHTML = '';
  
          const hideHand = playerCards.length === 0 || activeCardBeingUsed || waitingForUserChoice; // 使用中or選択待ちは非表示
          if (hideHand) { playerHandArea.style.display = 'none'; return; };
          playerHandArea.style.display = 'flex';
  
          playerCards.forEach(cardData => {
              const card = allCards.find(c => c.id === cardData.id); if (!card) return;
              const cardElement = document.createElement('div');
              cardElement.className = `hand-card-display type-${card.type}`;
              cardElement.dataset.cardId = cardData.id;
              cardElement.title = getUpgradeDescription(card, cardData.level);
  
              const cardName = document.createElement('span');
              cardName.className = 'hand-card-name';
              cardName.textContent = `${card.name} [Lv.${cardData.level}]`;
              cardElement.appendChild(cardName);
  
              let totalUses = Infinity; let usesLeft = Infinity;
              let usesPerWaveCard = false; // usesPerWaveを持つかどうかのフラグ
  
              if (card.usesPerWave) {
                   usesPerWaveCard = true;
                    const level = cardData.level;
                    switch (card.id) {
                        case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'keepParentalRight':
                        case 'giveUpEye':
                             totalUses = level; break; // Lvがそのまま回数
                        case 'adjustEye': case 'rewardAmplifier': case 'riskyBet':
                             totalUses = (level >= 2 && card.id === 'adjustEye') ? 2 :
                                       (level >= 3 && card.id === 'rewardAmplifier') ? 2 :
                                       (level >= 3 && card.id === 'riskyBet') ? 2 :
                                       1; break;
                        case 'zoroChanceUp': case 'avoid123_456': case 'blessingDice': case 'nextChance':
                             totalUses = (level >= 3) ? 2 : 1; break; // Lv3で2回
                        case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice':
                             totalUses = 1; break; // これらはレベルで回数増えない想定
                        default: totalUses = card.usesPerWave; break; // 固定値 (現状1のみ)
                    }
                   usesLeft = totalUses - (activeCardUses[cardData.id] || 0);
              }
  
              // 使用可能条件判定 (isUsableNow)
              let isUsableNow = false;
              if (totalUses !== Infinity && usesLeft <= 0) { // 使用回数超過
                   isUsableNow = false;
              } else if (activeCardBeingUsed || waitingForUserChoice) { // 他のカード使用中 or 選択肢待ち
                   isUsableNow = false;
              } else {
                   const isBetPhase = !isGameActive && isPlayerParent; // 自分が親のベットフェーズ
                   const isPlayerRollPhase = isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls; // 自分のロール可能フェーズ
                   const isPlayerPostRollPhase = isGameActive && isPlayerTurn && playerRollCount > 0 && playerDice.some(d => d !== 0); // 自分のロール後
                   const isPlayerPostRollMenashiPhase = isPlayerPostRollPhase && playerHand?.type === '目なし'; // ロール後目なし
                   const isPlayerPostRollEyePhase = isPlayerPostRollPhase && playerHand?.type === '目'; // ロール後目確定
                   const isPlayerPostRollFinalPhase = isPlayerPostRollPhase && (playerHand?.type === '役' || playerHand?.type === '目'); // ロール後役/目確定
                   const isNpcRollBeforePhase = isGameActive && !isPlayerTurn && npcRollCount === 0; // NPCが振る直前
  
                   switch (card.id) {
                       // --- ベットフェーズ用 ---
                       case 'ignoreMinBet': isUsableNow = isBetPhase; break;
                       case 'riskyBet': isUsableNow = isBetPhase; break;
                       // --- 自分ロール前用 ---
                       case 'zoroChanceUp': isUsableNow = isPlayerRollPhase && !zoroChanceUpActive; break;
                       case 'avoid123_456': isUsableNow = isPlayerRollPhase && !avoid123_456Active; break;
                       case 'blessingDice': isUsableNow = isPlayerRollPhase && !blessingDiceActive; break;
                       case 'stormWarning': isUsableNow = isPlayerRollPhase && !stormWarningActive; break;
                       // --- 自分ロール後 (いつでも) ---
                       case 'changeToOne': case 'changeToSix':
                            isUsableNow = isPlayerPostRollPhase; // 目なしでも変更は可能
                            break;
                       // --- 自分ロール後 (目なし時) ---
                       case 'giveUpEye':
                            isUsableNow = isPlayerPostRollMenashiPhase && !giveUpEyeUsedThisTurn;
                            break;
                       // --- 自分ロール後 (目確定時) ---
                       case 'adjustEye':
                            isUsableNow = isPlayerPostRollEyePhase && !adjustEyeUsedThisTurn;
                            break;
                       case 'nextChance':
                             isUsableNow = isPlayerPostRollEyePhase && !nextChanceUsedThisTurn;
                             break;
                       // --- 自分ロール後 (役/目確定、子の時) ---
                       case 'doubleUpBet':
                            isUsableNow = isPlayerPostRollFinalPhase && !isPlayerParent && !doubleUpBetActive; // 子の時、かつまだ使っていない
                            break;
                       // --- 自分振り切り時 ---
                       case 'soulRoll':
                            isUsableNow = isGameActive && isPlayerTurn && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn;
                            break;
                       // --- 相手ロール前 ---
                       case 'blindingDice':
                            isUsableNow = isNpcRollBeforePhase && !blindingDiceActive;
                            break;
                        // --- 勝利確定時用？ ---
                       case 'rewardAmplifier':
                            // 役/目が確定した時点で使えるようにする
                            isUsableNow = isPlayerPostRollFinalPhase && !rewardAmplifierActive;
                            break;
                       // --- その他 (パッシブ系は usable にしない) ---
                       case 'keepParentalRight': // クリックで発動しない
                       default: isUsableNow = false; break;
                   }
              }
  
              if (usesPerWaveCard) {
                   const cardUses = document.createElement('span');
                   cardUses.className = 'hand-card-uses';
                   cardUses.textContent = `(残${usesLeft}/${totalUses})`;
                   cardElement.appendChild(cardUses);
              }
  
              if (isUsableNow) { cardElement.classList.add('usable'); }
              else if (totalUses !== Infinity && usesLeft <= 0) { cardElement.classList.add('used'); }
              else { /* Not usable now and not used up */ }
  
              // パッシブカードに印をつける
              if (!card.usesPerWave && !['keepParentalRight', 'handExchange'].includes(card.id)) { // usesPerWaveがなく、特殊系でもない
                   if (card.applyEffect || card.removeEffect || card.effectTag) {
                        cardElement.classList.add('passive');
                   }
              }
  
              playerHandArea.appendChild(cardElement);
          });
      }
  
      // アクティブカード使用処理
      async function handleActiveCardUse(event) { // async追加
          const cardElement = event.currentTarget;
          const cardId = cardElement.dataset.cardId;
          const playerCardData = playerCards.find(c => c.id === cardId);
          // usableでない、他のカード使用中、選択待ち中は無視
          if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !cardElement.classList.contains('usable')) return;
  
          const card = allCards.find(c => c.id === cardId);
          if (!card) return;
  
          console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
          activeCardBeingUsed = cardId; // UIロック
          setMessage(`カード「${card.name}」を使用します...`);
          displayPlayerHandOnGameScreen(); // 他のカードを非usableに
  
          let useConsumed = true; // 基本的に使用回数を消費する
          let requiresDelay = false; // 効果適用後に少し待つか
  
          // --- カード効果分岐 ---
          if (['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
              showDiceChoiceOverlay(cardId); // ダイス選択へ
              useConsumed = false; // ダイス選択完了時に消費カウント
          } else if (cardId === 'ignoreMinBet') {
              ignoreMinBetActive = true; updateUI(); updateBetLimits();
              setMessage(`最低賭け金が1になりました。`);
              requiresDelay = true;
          } else if (cardId === 'zoroChanceUp') {
              zoroChanceUpActive = true; setMessage(`次のロールでゾロ目確率UP！`);
              requiresDelay = true;
          } else if (cardId === 'avoid123_456') {
              avoid123_456Active = true; setMessage(`次のロールでヒフミ/シゴロ${playerCardData.level >= 2 ? '/ションベン' : ''}を回避します。`);
              requiresDelay = true;
          } else if (cardId === 'blessingDice') {
              blessingDiceActive = true; setMessage(`次のロールで6が出やすくなります。`);
              requiresDelay = true;
          } else if (cardId === 'stormWarning') {
               stormWarningActive = true; setMessage(`次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`);
               requiresDelay = true;
          } else if (cardId === 'riskyBet') {
               riskyBetActive = true; updateUI(); updateBetLimits(); // 最低賭け金表示更新
               setMessage(`危険な賭け！賭け金決定時に効果が適用されます。`);
               requiresDelay = true;
          } else if (cardId === 'giveUpEye') {
               // ションベン扱いにして即座にラウンド終了
               playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
               giveUpEyeUsedThisTurn = true; // このターン使用済み
               setMessage(`見切り使用！ションベン扱いになります。`);
               updateUI();
               highlightHand(playerHandEl, playerHand);
               playerHandArea.style.display = 'none';
               setTimeout(handleRoundEnd, 800); // ラウンド終了処理へ
               // useConsumed は true
          } else if (cardId === 'doubleUpBet') {
               // フラグ立てとメッセージ表示だけ行う
               doubleUpBetActive = true;
               setMessage("ダブルアップ準備完了！");
               requiresDelay = true;
               useConsumed = false; // 消費カウントは handleRoundEnd で行う
          } else if (cardId === 'blindingDice') {
               blindingDiceActive = true;
               setMessage(`目くらまし！相手の次のロールに影響します。`);
               // npcTurn を呼び出す必要がある
               setTimeout(() => {
                   activeCardBeingUsed = null; // npcTurn開始直前にロック解除
                   displayPlayerHandOnGameScreen();
                   npcTurn();
               }, 1000);
               // useConsumed は true (ここで消費)
          } else if (cardId === 'soulRoll') {
               const costPercent = [10, 5, 5][playerCardData.level - 1];
               const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
               if (playerScore < cost) {
                    setMessage(`魂の一振りのコスト(${cost}点)を払えません！`);
                    useConsumed = false;
                    activeCardBeingUsed = null;
                    displayPlayerHandOnGameScreen();
               } else {
                    playerScore -= cost;
                    soulRollUsedThisTurn = true;
                    setMessage(`魂の一振り！${cost}点を消費して追加ロール！`);
                    updateUI();
                    rollButton.disabled = false; // ロールボタンを再度有効に
                    activeCardBeingUsed = null; // ロック解除
                    displayPlayerHandOnGameScreen();
                    // useConsumed は true
               }
          } else if (cardId === 'rewardAmplifier') {
               rewardAmplifierActive = true;
               setMessage(`報酬増幅！次の役での勝利時、配当倍率が増加します。`);
               requiresDelay = true;
               useConsumed = false; // 消費カウントは handleRoundEnd で行う
          } else {
              console.warn(`Active card effect for ${cardId} is not fully implemented yet.`);
              setMessage(`カード「${card.name}」の効果処理が未実装です。`);
              useConsumed = false;
              activeCardBeingUsed = null;
              displayPlayerHandOnGameScreen();
          }
  
          // 使用回数をカウント
          if (useConsumed) {
               activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
          }
  
          // UIロック解除 (必要な場合)
          const immediateUnlock = !(['changeToOne', 'changeToSix', 'adjustEye', 'nextChance', 'blindingDice', 'soulRoll', 'giveUpEye', 'doubleUpBet', 'rewardAmplifier'].includes(cardId));
  
          if (immediateUnlock) {
              if (requiresDelay) {
                  await new Promise(resolve => setTimeout(resolve, 800));
              }
               activeCardBeingUsed = null;
               displayPlayerHandOnGameScreen();
          } else if (['doubleUpBet', 'rewardAmplifier'].includes(cardId) && requiresDelay) {
               await new Promise(resolve => setTimeout(resolve, 800));
               activeCardBeingUsed = null;
               displayPlayerHandOnGameScreen();
          }
      } // handleActiveCardUse 関数の終わり
  
      // ダイス選択オーバーレイ表示
      function showDiceChoiceOverlay(cardId) {
          if (!diceChoiceOverlay) return;
          const card = allCards.find(c => c.id === cardId);
          const playerCardData = playerCards.find(c => c.id === cardId);
          if (!card || !playerCardData) { hideDiceChoiceOverlay(); return; }
  
          activeCardBeingUsed = cardId; // ロック
  
          let title = `${card.name} [Lv.${playerCardData.level}]`;
          let instruction = "";
          let diceIndicesToSelect = [];
          let requiresAdjustChoice = false;
          let requiresNextChanceCount = 0;
          let nextChanceCanSelectTwo = false;
  
          if (['changeToOne', 'changeToSix'].includes(cardId)) {
               instruction = "変更するサイコロを選んでください";
               diceIndicesToSelect = [0, 1, 2];
          } else if (cardId === 'adjustEye') {
               if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
               instruction = `調整する「${playerHand.value}以外の目」を選んでください`;
               playerDice.forEach((diceValue, index) => { if (diceValue !== playerHand.value) diceIndicesToSelect.push(index); });
               if (diceIndicesToSelect.length > 0) { requiresAdjustChoice = true; }
          } else if (cardId === 'nextChance') {
                if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
                nextChanceCanSelectTwo = playerCardData.level >= 2;
                requiresNextChanceCount = nextChanceCanSelectTwo ? 2 : 1;
                instruction = `振り直す「${playerHand.value}の目」を${requiresNextChanceCount === 2 ? '最大2つまで' : '1つ'}選んでください`;
                 playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
          } else {
               hideDiceChoiceOverlay(); return;
          }
  
          diceChoiceOverlay.innerHTML = `<h3>${title}</h3><p>${instruction}</p>`;
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'dice-choice-buttons';
  
          if (diceIndicesToSelect.length === 0) {
               buttonContainer.innerHTML = "<p>対象のサイコロがありません。</p>";
          } else {
               diceIndicesToSelect.forEach(index => {
                    const button = document.createElement('button');
                    button.className = 'dice-choice-button button-pop';
                    button.textContent = playerDice[index];
                    button.dataset.diceIndex = index;
                    if (requiresAdjustChoice) {
                         button.onclick = () => showAdjustOptions(index);
                    } else if (requiresNextChanceCount > 0) {
                         button.onclick = handleDiceChoice;
                         // Lv2以上の場合の複数選択UIは別途考慮
                    } else {
                         button.onclick = handleDiceChoice;
                    }
                    buttonContainer.appendChild(button);
               });
          }
  
          const cancelButton = document.createElement('button');
          cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル';
          cancelButton.style.marginTop = '15px';
          cancelButton.onclick = hideDiceChoiceOverlay;
          buttonContainer.appendChild(cancelButton);
  
          diceChoiceOverlay.appendChild(buttonContainer);
          diceChoiceOverlay.style.display = 'flex';
          rollButton.disabled = true;
          playerHandArea.style.display = 'none';
      }
      // 出目調整の+/-選択表示
      function showAdjustOptions(diceIndex) {
          const cardId = activeCardBeingUsed;
          const playerCardData = playerCards.find(c => c.id === cardId);
          if (!playerCardData) return;
          const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
          const originalValue = playerDice[diceIndex];
  
          diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？</p>`;
          const buttonContainer = document.createElement('div');
          buttonContainer.className = 'dice-choice-buttons';
  
          if (originalValue < 6) {
              const plusButton = document.createElement('button');
              plusButton.className = 'dice-choice-button button-pop';
              plusButton.textContent = `+${adjustAmount} (→ ${Math.min(6, originalValue + adjustAmount)})`;
              plusButton.dataset.diceIndex = diceIndex;
              plusButton.dataset.adjustDir = 'plus';
              plusButton.onclick = handleDiceChoice;
              buttonContainer.appendChild(plusButton);
          }
          if (originalValue > 1) {
               const minusButton = document.createElement('button');
               minusButton.className = 'dice-choice-button button-pop';
               minusButton.textContent = `-${adjustAmount} (→ ${Math.max(1, originalValue - adjustAmount)})`;
               minusButton.dataset.diceIndex = diceIndex;
               minusButton.dataset.adjustDir = 'minus';
               minusButton.onclick = handleDiceChoice;
               buttonContainer.appendChild(minusButton);
          }
          const cancelButton = document.createElement('button');
          cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル';
          cancelButton.style.marginTop = '15px';
          cancelButton.onclick = hideDiceChoiceOverlay;
          buttonContainer.appendChild(cancelButton);
  
          diceChoiceOverlay.appendChild(buttonContainer);
      }
  
      // ダイス選択オーバーレイ非表示
      function hideDiceChoiceOverlay() {
          if (diceChoiceOverlay) diceChoiceOverlay.style.display = 'none';
          if (activeCardBeingUsed && ['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(activeCardBeingUsed)) {
               setMessage("カードの使用をキャンセルしました。");
          }
          activeCardBeingUsed = null;
          // ロールボタンの状態を適切に戻す
          if (isGameActive && isPlayerTurn) {
               if (playerHand?.type === '目なし' && playerRollCount < currentMaxRolls) {
                    rollButton.disabled = false;
               } else if (playerHand?.type === '目') {
                    const adjustCard = playerCards.find(c => c.id === 'adjustEye');
                    const maxAdjustUses = adjustCard ? (adjustCard.level >= 2 ? 2 : 1) : 0;
                    const canAdjust = adjustCard && (activeCardUses['adjustEye'] || 0) < maxAdjustUses && !adjustEyeUsedThisTurn;
                    const nextChanceCard = playerCards.find(c => c.id === 'nextChance');
                    const maxNextChanceUses = nextChanceCard ? (nextChanceCard.level >= 3 ? 2 : 1) : 0;
                    const canNextChance = nextChanceCard && (activeCardUses['nextChance'] || 0) < maxNextChanceUses && !nextChanceUsedThisTurn;
                    if (canAdjust || canNextChance) {
                        rollButton.disabled = true;
                    } else {
                        rollButton.disabled = true;
                    }
               } else if (playerRollCount >= currentMaxRolls) {
                     rollButton.disabled = true;
               } else if (playerHand && playerHand.type !== '目なし'){
                      rollButton.disabled = true;
               } else {
                   rollButton.disabled = true;
               }
          } else {
              rollButton.disabled = true;
          }
          displayPlayerHandOnGameScreen();
      }
      // ダイス選択処理 (asyncに変更)
      async function handleDiceChoice(event) { // async追加
          const button = event.target;
          const diceIndex = parseInt(button.dataset.diceIndex);
          const adjustDir = button.dataset.adjustDir;
          const cardId = activeCardBeingUsed;
          const playerCardData = playerCards.find(c => c.id === cardId);
  
          if (isNaN(diceIndex) || !cardId || !playerCardData || !playerDice || playerDice.length !== 3) {
              console.error("Invalid state for dice choice:", diceIndex, cardId, playerDice);
              hideDiceChoiceOverlay(); return;
          }
          const card = allCards.find(c => c.id === cardId);
          if (!card) { hideDiceChoiceOverlay(); return; }
  
          console.log(`Player chose dice index: ${diceIndex} to apply card: ${card.name} (Lv.${playerCardData.level})${adjustDir ? ' Adjust:'+adjustDir : ''}`);
  
          let newDice = [...playerDice];
          let message = "";
          let turnEnd = false;
          let useConsumed = true;
  
          if (['changeToOne', 'changeToSix'].includes(cardId)) {
               const newValue = cardId === 'changeToOne' ? 1 : 6;
               newDice[diceIndex] = newValue;
               message = `サイコロを ${newValue} に変更しました。`;
               turnEnd = true;
               activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
          } else if (cardId === 'adjustEye' && adjustDir) {
                const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
                let originalValue = newDice[diceIndex];
                let adjustedValue = originalValue;
                if (adjustDir === 'plus') adjustedValue = Math.min(6, originalValue + adjustAmount);
                else if (adjustDir === 'minus') adjustedValue = Math.max(1, originalValue - adjustAmount);
  
                if (adjustedValue !== originalValue) {
                      newDice[diceIndex] = adjustedValue;
                      message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
                      adjustEyeUsedThisTurn = true;
                      turnEnd = true;
                      activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
                } else {
                     message = "調整しても値が変わりませんでした。";
                     turnEnd = false;
                     useConsumed = false;
                }
          } else if (cardId === 'nextChance') {
                const originalValue = newDice[diceIndex];
                newDice[diceIndex] = rollSingleDice();
                message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`;
                nextChanceUsedThisTurn = true;
                turnEnd = true;
                activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
                // TODO: Lv2で2つ選択した場合の処理
          } else {
               hideDiceChoiceOverlay(); return;
          }
  
          playerDice = newDice;
          const result = getHandResult(playerDice);
          const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
          playerHand = rk ? { ...ROLES[rk], ...result } : result;
          console.log("Re-evaluated hand:", playerHand);
  
          diceDisplayEl.innerHTML = playerDice.map(d => `<span class="dice-num">${d}</span>`).join(' ');
          playerDiceEl.textContent = playerDice.join(' ');
          playerHandEl.textContent = getHandDisplayName(playerHand);
          highlightHand(playerHandEl, playerHand);
  
          hideDiceChoiceOverlay(); // オーバーレイを閉じる
  
          let totalUses = Infinity; let usesLeft = Infinity;
          if (card.usesPerWave && useConsumed) {
               const level = playerCardData.level;
               switch (card.id) { /* ... */
                  case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'keepParentalRight': case 'giveUpEye': totalUses = level; break;
                  case 'adjustEye': case 'rewardAmplifier': case 'riskyBet': totalUses = (level >= 2 && card.id === 'adjustEye') ? 2 : (level >= 3 && card.id === 'rewardAmplifier') ? 2 : (level >= 3 && card.id === 'riskyBet') ? 2 : 1; break;
                  case 'zoroChanceUp': case 'avoid123_456': case 'blessingDice': case 'nextChance': totalUses = (level >= 3) ? 2 : 1; break;
                  case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice': totalUses = 1; break;
                  default: totalUses = card.usesPerWave; break;
               }
               usesLeft = totalUses - (activeCardUses[cardId] || 0);
               message += ` (残${usesLeft}/${totalUses})`;
          }
          setMessage(message);
  
          // ターンを進めるかどうかの処理
          if (turnEnd) {
              await new Promise(resolve => setTimeout(resolve, 800));
  
              const handName = getHandDisplayName(playerHand);
              if (playerHand.type === '役' || playerHand.type === '目' || playerHand.type === 'ションベン') {
                   isPlayerTurn = false; playerHandArea.style.display = 'none';
                   const blindingCard = playerCards.find(c => c.id === 'blindingDice'); const maxBlindingUses = blindingCard ? 1 : 0; const canUseBlindingNow = isPlayerParent && playerHand.type !== 'ションベン' && blindingCard && (activeCardUses['blindingDice'] || 0) < maxBlindingUses;
                   const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet'); const maxDoubleUpUses = doubleUpCard ? 1 : 0; const canUseDoubleUp = !isPlayerParent && playerHand.type !== 'ションベン' && doubleUpCard && (activeCardUses['doubleUpBet'] || 0) < maxDoubleUpUses;
                   const nextChanceCard = playerCards.find(c => c.id === 'nextChance');
                   const maxNextChanceUses = nextChanceCard ? (nextChanceCard.level >= 3 ? 2 : 1) : 0;
                   const canUseNextChanceAfterAdjust = playerHand.type === '目' && nextChanceCard && !nextChanceUsedThisTurn && (activeCardUses['nextChance'] || 0) < maxNextChanceUses;
  
                   // 優先順位: Blinding > NextChance > DoubleUp
                   if (canUseBlindingNow && isPlayerParent) {
                       setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                       displayPlayerHandOnGameScreen();
                   } else if (canUseNextChanceAfterAdjust && playerHand.type === '目') {
                       setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「ネクストチャンス」を使用しますか？`, true);
                       const useNextChance = await waitForUserChoice();
                       if (useNextChance) {
                           showDiceChoiceOverlay('nextChance');
                           return;
                       } else {
                           setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！ ネクストチャンスを使用しませんでした。`);
                           if (canUseDoubleUp && !isPlayerParent) {
                               setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                               const useDoubleUp = await waitForUserChoice();
                               if (useDoubleUp) {
                                   handleActiveCardUse({ currentTarget: { dataset: { cardId: 'doubleUpBet' }, classList: { contains: () => true } } });
                                   setMessage(`あなた(子): ${handName}！ ダブルアップを使用！勝負！`);
                                   setTimeout(handleRoundEnd, 1000);
                               } else {
                                   setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                                   setTimeout(handleRoundEnd, 1000);
                               }
                           } else {
                               if (isPlayerParent) {
                                   setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                                   setTimeout(npcTurn, 1400);
                               } else {
                                   setMessage(`あなた(子): ${handName}！ 勝負！`);
                                   setTimeout(handleRoundEnd, 1000);
                               }
                           }
                       }
                   } else if (canUseDoubleUp && !isPlayerParent) {
                       setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                       const useDoubleUp = await waitForUserChoice();
                       if (useDoubleUp) {
                           handleActiveCardUse({ currentTarget: { dataset: { cardId: 'doubleUpBet' }, classList: { contains: () => true } } });
                           setMessage(`あなた(子): ${handName}！ ダブルアップを使用！勝負！`);
                           setTimeout(handleRoundEnd, 1000);
                       } else {
                           setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                           setTimeout(handleRoundEnd, 1000);
                       }
                   } else {
                       if (isPlayerParent && playerHand.type !== 'ションベン') {
                           setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                           setTimeout(npcTurn, 1400);
                       } else {
                           setMessage(`あなた(${isPlayerParent?'親':'子'}): ${handName}！ ${playerHand.type === 'ションベン' ? '負けです。' : '勝負！'}`);
                           setTimeout(handleRoundEnd, 1000);
                       }
                   }
              } else if (playerHand.type === '目なし') {
                   if (playerRollCount < currentMaxRolls) {
                       setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})`);
                       rollButton.disabled = false;
                       displayPlayerHandOnGameScreen();
                   } else {
                       playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                       updateUI();
                       setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なしでションベン！ 負けです。`);
                       highlightHand(playerHandEl, playerHand);
                       playerHandArea.style.display = 'none';
                       isPlayerTurn = false;
                       setTimeout(handleRoundEnd, 800);
                   }
              }
              updateUI();
          } else {
               displayPlayerHandOnGameScreen();
          }
      } // handleDiceChoice end
  
  
      // --- ショップ関連イベントリスナー ---
      shopCloseButton.addEventListener('click', closeShop);
      shopRerollButton.addEventListener('click', handleReroll);
      shopCardOffersEl.addEventListener('click', (event) => {
          if (event.target.matches('.buy-button, .upgrade-button')) {
              handleBuyCard(event);
          }
      });
      cancelDiscardButton.addEventListener('click', cancelDiscard);
      // ゲーム画面の手札カードクリックイベント
      playerHandArea.addEventListener('click', (event) => {
          const cardElement = event.target.closest('.hand-card-display.usable');
          if (cardElement) {
              handleActiveCardUse({ currentTarget: cardElement }); // イベントオブジェクトを模倣して渡す
          }
      });
  
      // --- 初期状態 ---
      showScreen('title-screen');
      setDifficulty(difficulty); // デフォルト難易度を設定
  
  }); // === DOMContentLoaded END ===
  // ===== END OF script.js =====