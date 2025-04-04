// ===== START OF script.txt =====
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
    const messageArea = document.getElementById('message-area'); // メッセージエリア全体を取得

    // --- ゲーム状態 ---
    const INITIAL_PLAYER_SCORE = 2500; // 初期スコア定数
    let playerScore = INITIAL_PLAYER_SCORE; // 現在のプレイヤースコア
    let npcScore = 500; // 現在のNPCスコア
    let currentWave = 1, defeatedCount = 0;
    let totalScoreChange = 0; // 全WAVE通算のスコア変動 (コイン計算・最終スコア用)
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
        // 既存のボタンを削除
        const existingButtons = messageArea.querySelectorAll('.temp-choice-button');
        existingButtons.forEach(btn => btn.remove());

        if (showButtons) {
            const buttonContainer = document.createElement('div');
            buttonContainer.style.marginTop = '10px';
            const button1 = document.createElement('button');
            button1.textContent = button1Text;
            button1.className = 'button-pop temp-choice-button';
            button1.onclick = () => handleUserChoice(true);
            buttonContainer.appendChild(button1);

            const button2 = document.createElement('button');
            button2.textContent = button2Text;
            button2.className = 'button-subtle temp-choice-button';
            button2.style.marginLeft = '10px';
            button2.onclick = () => handleUserChoice(false);
            buttonContainer.appendChild(button2);

            messageArea.appendChild(buttonContainer);
        }
    }
    // ユーザー選択を待つ関数
    function waitForUserChoice() {
        return new Promise(resolve => {
            waitingForUserChoice = true;
            userChoiceResolver = resolve;
            // 念のためタイムアウトを設定しても良い
        });
    }
    // ユーザー選択ハンドラ
    function handleUserChoice(choice) {
        if (!waitingForUserChoice || !userChoiceResolver) return;
        waitingForUserChoice = false;
        const resolver = userChoiceResolver;
        userChoiceResolver = null;
        // ボタン削除はsetMessage側で行う
        resolver(choice); // Promiseを解決
    }

    function rollSingleDice() { return Math.floor(Math.random() * 6) + 1; }

    // === サイコロを振る処理 (拡張: 嵐の予感、天の恵み、ゾロ目UP対応) ===
    function rollDice(isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        let d1 = rollSingleDice();
        let d2 = rollSingleDice();
        let d3 = rollSingleDice();
        const dice = [d1, d2, d3];

        let appliedZoroUp = false; // ゾロ目UPが適用されたか
        let appliedStormWarningReroll = stormWarningRerollsLeft > 0 && !isNpc; // 嵐の予感による振り直しか？

        console.log(`Rolling dice... NPC:${isNpc}, Blinding:${blindingDiceLevel}, SoulRoll:${soulRollLevel}, BlessingActive:${blessingDiceActive}, ZoroUpActive:${zoroChanceUpActive}, StormWarningReroll:${appliedStormWarningReroll}`);

        // --- カード効果適用 (プレイヤーのみ) ---
        if (!isNpc) {
            // 1. 天の恵み (blessingDiceActive) - 確率で6を出す
            if (blessingDiceActive) {
                const blessingCard = playerCards.find(c => c.id === 'blessingDice');
                const blessingLevel = blessingCard?.level || 0;
                const blessingChance = [0.15, 0.3, 0.45][blessingLevel - 1];
                if (Math.random() < blessingChance) {
                    const changeIndex = Math.floor(Math.random() * 3);
                    dice[changeIndex] = 6;
                    console.log(`Card Effect: 天の恵み Lv.${blessingLevel} 発動！ Index ${changeIndex} is now 6.`);
                }
                blessingDiceActive = false; // 効果は1ロールで消滅
            }

            // 2. ゾロ目確率UP (zoroChanceUpActive) - 確率でゾロ目にする
            if (zoroChanceUpActive) {
                const zoroCard = playerCards.find(c => c.id === 'zoroChanceUp');
                const zoroLevel = zoroCard?.level || 0;
                let zoroUpRate = [0.15, 0.3, 0.45][zoroLevel - 1];
                // 嵐の予感(Lv1+)による振り直し中なら、ゾロ目確率も少しUP
                if (appliedStormWarningReroll) zoroUpRate += 0.1;

                if (Math.random() < zoroUpRate) {
                    dice[1] = dice[0]; appliedZoroUp = true;
                }
                if (Math.random() < zoroUpRate) {
                    dice[2] = dice[0]; appliedZoroUp = true;
                }
                if (appliedZoroUp) console.log(`Card Effect: ゾロ目確率UP Lv.${zoroLevel}${appliedStormWarningReroll ? ' (嵐の予感シナジー!)' : ''} 発動！`);
                zoroChanceUpActive = false; // 効果は1ロールで消滅
            }

            // 3. 嵐の予感による振り直し時、アラシ確率UP
            if (appliedStormWarningReroll && !appliedZoroUp) { // ゾロ目UPが発動しなかった場合のみ
                 const stormCard = playerCards.find(c => c.id === 'stormWarning');
                 const stormLevel = stormCard?.level || 1;
                 const arashiBoostChance = 0.05 + (stormLevel - 1) * 0.05; // Lv1で5%, Lv3で15%
                 if (Math.random() < arashiBoostChance) {
                     const targetValue = Math.floor(Math.random() * 5) + 2; // 2から6のゾロ目
                     dice[0] = targetValue; dice[1] = targetValue; dice[2] = targetValue;
                     console.log(`Card Effect: 嵐の予感 Lv.${stormLevel} 振り直し時アラシブースト発動！ ${targetValue}のアラシに！`);
                 }
            }
        }

        return dice;
    }

    // === 役判定 (拡張: 役回避対応) ===
    function getHandResult(dice, isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        const s = [...dice].sort((a, b) => a - b);
        const [d1, d2, d3] = s;
        let result;

        // 基本判定
        if (d1 === d2 && d2 === d3) { result = d1 === 1 ? { ...ROLES.PINZORO, type: '役', value: 1 } : { ...ROLES.ARASHI, type: '役', value: d1 }; }
        else if (d1 === 4 && d2 === 5 && d3 === 6) { result = { ...ROLES.SHIGORO, type: '役', value: 6 }; }
        else if (d1 === 1 && d2 === 2 && d3 === 3) { result = { ...ROLES.HIFUMI, type: '役', value: 3 }; }
        else if (d1 === d2 && d2 !== d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d3 }; }
        else if (d1 !== d2 && d2 === d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d1 }; }
        else { result = { type: '目なし', strength: ROLES.MENASHI.strength }; }

        console.log(`Initial Hand Result: ${getHandDisplayName(result)}`);

        // --- カード効果による役の変更 ---

        // 1. 役回避 (avoid123_456Active) - プレイヤーのみ
        if (!isNpc && avoid123_456Active) {
            const avoidCard = playerCards.find(c => c.id === 'avoid123_456');
            const avoidLevel = avoidCard?.level || 0;
            const shouldAvoidHifumiShigoro = result.name === ROLES.HIFUMI.name || result.name === ROLES.SHIGORO.name;
            const shouldAvoidShonben = (avoidLevel >= 2 && result.type === '目なし'); // Lv2以上で目なし→ションベンも防ぐ

            if (shouldAvoidHifumiShigoro) {
                console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (${result.name} avoided) Result forced to Menashi.`);
                result = { type: '目なし', strength: ROLES.MENASHI.strength };
            } else if (shouldAvoidShonben) {
                 console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (Shonben avoided) Result remains Menashi.`);
                 // result は変更しない（目なしのまま）
            }
            avoid123_456Active = false; // 効果は1ロールで消滅
        }

        // 2. 目くらまし (blindingDice) - NPCのみ
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
            // Lv3: ションベン率UP (目なしを誘発)
            if(blindingDiceLevel >= 3 && !rerollForced && result.type !== '目なし') { // 強制リロールが起きなかった場合のみ
                 const shonbenUpChance = 0.2;
                 if(Math.random() < shonbenUpChance && result.type !== 'ションベン') { // ションベンは除く
                     console.log(`Card Effect: 目くらまし Lv.3 - ションベン率UP発動! Forcing Menashi.`);
                     result = { type: '目なし', strength: ROLES.MENASHI.strength };
                 }
            }
            // フラグ解除は npcTurn 内の適切なタイミングで行う
        }

        // 3. 魂の一振り (soulRoll) - 目なし率低下 (Lv3) - プレイヤーのみ
        if (!isNpc && soulRollLevel >= 3 && result.type === '目なし') {
            const avoidMenashiChance = 0.5;
            if (Math.random() < avoidMenashiChance) {
                console.log("Card Effect: 魂の一振り Lv.3 - 目なし回避発動！ Trying one more roll...");
                const newDice = rollDice(false, 0, 0); // カード効果なしで振り直し
                const newResult = getHandResult(newDice, false, 0, 0); // 再判定
                console.log(`Soul Roll Rerolled Dice: ${newDice}, New Result: ${getHandDisplayName(newResult)}`);
                result = newResult; // 結果を上書き
            }
        }

        return result;
    }

    // --- カード効果適用/計算 ---
    function applyPlayerCardEffects() {
        // パッシブ効果やWAVE開始時に適用すべき効果
        currentMaxRolls = BASE_MAX_ROLLS;
        shopChoicePlus1Active = false; // WAVE開始時にリセット
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
        playerCards = playerCards.filter(card => card.id !== cardIdToRemove);
        applyPlayerCardEffects(); // 効果再計算
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
        // cardDefを渡す必要あり
        for (let lv = 2; lv <= cardData.level; lv++) {
            totalPaidCost += getCostToUpgradeToNextLevel(cardDef, lv);
        }
        const sellPrice = Math.floor(totalPaidCost * SELL_PRICE_RATE);
        return Math.max(0, sellPrice);
    }

    // --- ゲーム初期化 ---
    function initGame(isRestart = false) {
        console.log("--- initGame START ---");
        // isRestart=trueでもスコアリセットしない場合が多いので注意 -> isRestart は難易度変更時のみか？
        // → ユーザー指示通り、initGameではスコアを初期化する
        playerScore = INITIAL_PLAYER_SCORE;
        totalScoreChange = 0; // 通算スコア変動もリセット
        currentWave = 1; defeatedCount = 0; npcScore = NPC_START_SCORE_BASE; currentBet = 0; isPlayerParent = true; playerDice = [0, 0, 0]; npcDice = [0, 0, 0]; playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false; gameHistory = []; baseMinBet = 50; currentMinBet = baseMinBet; consecutiveWins = 0; npcConsecutiveWins = 0; playerCoins = 0; playerCards = []; roundCount = 0; purchasedOrUpgradedInShop = []; currentRoundInWave = 0;
        // === フラグリセット ===
        activeCardUses = {}; ignoreMinBetActive = false; shopChoicePlus1Active = false; zoroChanceUpActive = false; avoid123_456Active = false; activeCardBeingUsed = null; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; riskyBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; freeRerollsAvailableThisShopVisit = 0; waitingForUserChoice = false; userChoiceResolver = null;
        // ===
        applyPlayerCardEffects(); // カード効果(MaxRollsなど)を初期化後に適用
        betArea.style.display = 'flex'; actionArea.style.display = 'flex'; nextWaveArea.style.display = 'none'; rollButton.disabled = true; historyButton.disabled = false; playerDiceEl.textContent = '-'; npcDiceEl.textContent = '-'; diceDisplayEl.textContent = '- - -'; rollCounterEl.textContent = `0/${currentMaxRolls}回`; diceDisplayEl.classList.remove('rolling', 'settled'); playerHandEl.className = 'hand-display'; npcHandEl.className = 'hand-display'; centerRoleAnnouncementEl.className = 'center-role'; centerRoleAnnouncementEl.textContent = ''; if (playerScoreEl.animationId) cancelAnimationFrame(playerScoreEl.animationId); if (npcScoreEl.animationId) cancelAnimationFrame(npcScoreEl.animationId); playerScoreEl.animationId = null; npcScoreEl.animationId = null; currentBetInfoEl.textContent = '';
        updateUI(); // UIを初期状態に更新
        if (!isRestart) showScreen('game-screen');
        startBettingPhase(); // isRestart=true でもベッティングフェーズから開始
        console.log("--- initGame END ---");
    }

    // --- UI更新 ---
    function updateUI() {
        waveNumberEl.textContent = currentWave;
        roundNumberEl.textContent = currentRoundInWave;
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
        // 親権維持Lv3効果
        if (keepParentDiscountNextRound) {
             displayMinBet = Math.max(1, Math.floor(baseMinBet / 2));
        }
        // 危険な賭けLv1効果
        const riskyBetCardCheck = playerCards.find(c => c.id === 'riskyBet');
        if (riskyBetActive && riskyBetCardCheck?.level === 1) {
             displayMinBet = baseMinBet * 2;
        }
        // 最低賭け金無視効果
        if (ignoreMinBetActive) {
            displayMinBet = 1;
        }
        currentMinBet = displayMinBet;
        minBetDisplayEl.textContent = `最低: ${currentMinBet}`;

        // ロールカウント表示
        let maxRollsForTurn = isPlayerTurn ? currentMaxRolls : BASE_MAX_ROLLS;
        let currentRollCountForTurn = isPlayerTurn ? playerRollCount : npcRollCount;
        let turnText = `0/${maxRollsForTurn}回`;
        if (isGameActive || currentRoundInWave > 0) { // isGameActiveだけでなく、ラウンドが開始されていれば表示
            turnText = `${currentRollCountForTurn}/${maxRollsForTurn}回`;
        }
        rollCounterEl.textContent = turnText;

        // 連勝表示 (プレイヤー親の場合のみ)
        if (consecutiveWins > 0 && isPlayerParent) {
            let winStreakText = ` (${consecutiveWins}連勝中!)`;
            consecutiveWinsDisplayEl.textContent = winStreakText;
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
        if (shopScreen.classList.contains('active')) {
            updateShopUI();
        }

        // ゲーム画面の手札表示更新
        displayPlayerHandOnGameScreen();

        // 賭け金上限更新 (startBettingPhase内でも呼ばれるが、UI更新時に常に最新にする)
        updateBetLimits();

        // 現在の賭け金情報
        if (isGameActive && currentBet > 0) {
            const parentName = isPlayerParent ? "あなた" : "相手";
            currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${parentName})</span>`;
        } else if (!isGameActive && currentRoundInWave > 0 && playerScore > 0 && npcScore > 0) {
             // ベットフェーズ中を示すメッセージ（startBettingPhaseで設定）
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
        const effectiveNpcScore = Math.max(1, npcScore); // 相手が0点でも最低1点は賭けられるように
        // プレイヤーが親の場合の上限: min(自分の持ち点(ブースト込み), 相手の持ち点)
        // NPCが親の場合の上限: min(NPCの持ち点, 自分の持ち点) ※NPCはブーストしない
        const maxBet = isPlayerParent
            ? Math.max(currentMinBet, Math.min(playerMaxPotential, effectiveNpcScore))
            : Math.max(currentMinBet, Math.min(npcScore, playerScore));

        betInput.max = maxBet;
        betInput.min = currentMinBet;

        let cv = parseInt(betInput.value);
        if (isNaN(cv)) cv = currentMinBet;

        const canPlayerControlBet = isPlayerParent && !isGameActive;
        betInput.disabled = !canPlayerControlBet || npcScore <= 0 || playerScore < currentMinBet; // 自分が最低額未満なら操作不可

        if (!betInput.disabled) {
            if (cv > maxBet) { betInput.value = maxBet; cv = maxBet; }
            else if (cv < currentMinBet) { betInput.value = currentMinBet; cv = currentMinBet; }
        } else {
             if (!isPlayerParent && !isGameActive && currentBet > 0) { betInput.value = currentBet; } // NPC親が決定したベットを表示
             else { betInput.value = currentMinBet; } // 操作不可なら最低額を表示
        }

        // 調整ボタンの有効/無効
        betAdjustButtons.forEach(b => {
            const a = parseInt(b.dataset.amount);
            const v = parseInt(betInput.value);
            // ボタン無効条件:
            // - 入力自体が無効
            // - プラスボタンで、現在値が上限以上 or 加算すると上限を超える
            // - マイナスボタンで、現在値が下限以下 or 減算すると下限を下回る
            b.disabled = betInput.disabled ||
                         (a > 0 && (v >= maxBet || v + a > maxBet)) ||
                         (a < 0 && (v <= currentMinBet || v + a < currentMinBet));
        });
        // 決定/MAXボタンの有効/無効
        setBetButton.disabled = betInput.disabled;
        maxBetButton.disabled = betInput.disabled;
    }

    // === 賭けフェーズ開始 (最低賭け金チェック強化) ===
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
        activeCardBeingUsed = null; ignoreMinBetActive = false; // riskyBetActiveはベット決定時にリセット
        zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null;
        // ===

        // 最低賭け金計算（UI更新関数でも計算するが、ここでも計算しておく）
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        if (keepParentDiscountNextRound) {
             currentMinBet = Math.max(1, Math.floor(baseMinBet / 2));
             keepParentDiscountNextRound = false; // 効果は1ラウンド限り
        } else {
             currentMinBet = baseMinBet;
        }
        updateUI(); // UIを更新して最新のcurrentMinBetを表示

        // --- 最低賭け金支払いチェック ---
        if (isPlayerParent && playerScore < currentMinBet) {
             setMessage(`あなたの持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、ゲームオーバーです。`);
             currentBetInfoEl.textContent = ''; betArea.style.display = 'none'; actionArea.style.display = 'none';
             historyButton.disabled = false; // 履歴は見れるように
             setTimeout(() => showResultScreen(false, playerScore, currentWave, "最低賭け金不足"), 1500);
             return; // ゲーム終了
        }
        if (!isPlayerParent && npcScore < currentMinBet) {
             setMessage(`相手の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！`);
             currentBetInfoEl.textContent = ''; betArea.style.display = 'none'; actionArea.style.display = 'none';
             historyButton.disabled = false;
             setTimeout(() => {
                  console.log("NPC cannot meet minimum bet, proceeding to shop.");
                  calculateAndAwardCoins();
                  setMessage(`相手が最低賭け金(${currentMinBet}点)を払えないためWAVEクリア！ コイン ${calculateEarnedCoins()} G獲得！`);
                   updateUI();
                  nextWaveArea.style.display = 'flex';
                  currentRoundInWave = 0; // WAVEクリアなのでラウンドリセット
                  activeCardUses = {}; keepParentRightUsedThisWave = 0; // WAVEクリア時リセット
             }, 1500);
             return; // WAVEクリア処理へ
        }
        // --- チェックここまで ---

        currentBetInfoEl.textContent = '賭け金設定中...';

        if (isPlayerParent) {
            betArea.style.display = 'flex';
            actionArea.style.display = 'flex'; // アクションエリアも表示
            setMessage(`あなた(親)が賭け金を設定 (最低 ${currentMinBet}点)。`);
            const lastBet = parseInt(betInput.value);
            updateBetLimits(); // ここで betInput.disabled が適切に設定される
            const maxBetPossible = parseInt(betInput.max);
            betInput.value = (lastBet >= currentMinBet && lastBet <= maxBetPossible) ? lastBet : currentMinBet;
            updateBetLimits(); // 値設定後に再度ボタン状態を更新
            displayPlayerHandOnGameScreen(); // ベットフェーズでもカードを使えるように
        } else { // NPCが親の場合
            betArea.style.display = 'flex';
            actionArea.style.display = 'flex';
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true;
            setMessage(`相手(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            playerHandArea.innerHTML = ''; playerHandArea.style.display = 'none'; // 子はベットフェーズでカードを使えない
            updateBetLimits(); // 表示のため
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);
                // NPCも最低賭け金を払えるか最終チェック (通常は上のチェックで弾かれるはず)
                if (npcScore < npcBet || npcBet < currentMinBet) {
                     console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet})`);
                     setMessage(`相手が賭け金を払えません。WAVEクリア！`);
                     setTimeout(() => { calculateAndAwardCoins(); updateUI(); nextWaveArea.style.display = 'flex'; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; }, 1500);
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
                // 目くらましカード使用タイミング (NPCターン開始直前)
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const canUseBlinding = blindingCard && (activeCardUses['blindingDice'] || 0) < 1; // usesPerWaveはLv依存だが、現状Lv1のみ実装想定？ 仕様を確認。一旦1回のみ。
                if (canUseBlinding) {
                    setMessage(`相手(親)が ${currentBet} 点で勝負！ 相手がサイコロを振ります...(「目くらまし」使用可能)`);
                    displayPlayerHandOnGameScreen(); // 目くらましを使えるように手札表示
                    // npcTurnの呼び出しはhandleActiveCardUse('blindingDice')内か、タイムアウト後に行う
                    // → ここでは何もしない。手札クリック待ち。
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
        // NPCが親の場合の最大ベット額: min(NPCの持ち点, プレイヤーの持ち点)
        const maxBetPossible = Math.min(npcScore, effectivePlayerScore);

        // NPCが最低ベット額を払えない、または最大ベット可能額が最低ベット額未満の場合は、払える最大額（=持ち点）をベットする (startBettingPhaseでチェックされるが念のため)
        if (npcScore < npcMinPossibleBet) return npcScore;
        if (maxBetPossible < npcMinPossibleBet) return maxBetPossible;

        let bet = 0;
        if (Math.random() < maxBetChance) {
            bet = maxBetPossible;
            console.log("NPC AI: Decided Max Bet by chance.");
        } else {
            const randomRate = baseRateMin + Math.random() * (baseRateMax - baseRateMin);
            bet = Math.floor(npcScore * randomRate);
            // プレイヤーが瀕死の場合、強気に攻める
            if (playerScore < npcScore * 0.4 && Math.random() < aggressiveChance) {
                const aggressiveRate = aggressiveRateMin + Math.random() * (aggressiveRateMax - aggressiveRateMin);
                bet = Math.floor(npcScore * aggressiveRate);
                console.log("NPC AI: Aggressive move!");
            }
            // 自分が瀕死の場合、慎重になる
            else if (npcScore < playerScore * 0.4 && Math.random() < cautiousChance) {
                const cautiousRate = cautiousRateMin + Math.random() * (cautiousRateMax - cautiousRateMin);
                bet = Math.floor(npcScore * cautiousRate);
                console.log("NPC AI: Cautious move.");
            }
        }
        // 最終的なベット額は、最低ベット額以上、かつ最大ベット可能額以下にする
        bet = Math.max(npcMinPossibleBet, bet);
        bet = Math.min(bet, maxBetPossible);
        return Math.max(1, bet); // 最低でも1はベット
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
    // === スコアアニメーション ===
    function animateScore(element, startScore, endScore, duration) {
        if (element.animationId) cancelAnimationFrame(element.animationId);
        const range = endScore - startScore;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentScore = Math.floor(startScore + range * progress);
            element.textContent = currentScore;
            if (progress < 1) { element.animationId = requestAnimationFrame(step); }
            else { element.textContent = endScore; element.animationId = null; }
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
        if (npcScore <= 0) { setMessage(`相手の持ち点がありません！`); return; }

        const bv = parseInt(betInput.value);
        const maxBet = parseInt(betInput.max);

        if (bv >= currentMinBet && bv <= maxBet) {
            currentBet = bv;
            // 危険な賭け 効果適用
            if(riskyBetActive) {
                 const riskyCard = playerCards.find(c => c.id === 'riskyBet');
                 if(riskyCard) { // カードが存在する場合のみ
                     currentBet *= 2;
                     // 賭け金は相手の持ち点を超えられない
                     currentBet = Math.min(currentBet, npcScore);
                     console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`);
                     activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1;
                 }
                 riskyBetActive = false; // 効果は1回でリセット
                 updateUI(); // 最低賭け金表示を元に戻すため updateUI を呼ぶ
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

    // サイコロを振るボタン (asyncに変更して選択待ちに対応)
    rollButton.addEventListener('click', async () => { // async追加
        if (playerScore <= 0) { checkGameEnd(); return; }
        if (!isGameActive || !isPlayerTurn || diceAnimationInterval || waitingForUserChoice) return; // 選択待ち中は無効

        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const canUseSoulRoll = soulRollCard && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < 1;

        if (canUseSoulRoll) {
             // 魂の一振りは handleActiveCardUse で処理
             setMessage("振り残り回数がありません。「魂の一振り」を使用しますか？");
             displayPlayerHandOnGameScreen(); // 魂の一振りを使えるように表示
             return; // カードクリック待ち
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

        const soulRollLvFor判定 = soulRollUsedThisTurn ? (soulRollCard?.level || 0) : 0; // 魂の一振りLv3効果用

        // ロール実行前にフラグ確認
        console.log(`Before roll: blessingActive=${blessingDiceActive}, zoroUpActive=${zoroChanceUpActive}, avoidActive=${avoid123_456Active}`);
        const finalDice = rollDice(false, 0, soulRollLvFor判定); // Blessing/ZoroUpは rollDice 内部でフラグを見る

        animateDiceRoll(diceDisplayEl, finalDice, async () => { // コールバックもasyncに
            playerDice = finalDice;
            // 役判定前にフラグ確認
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
                stormWarningActive = false; // 効果判定は1回
                 activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1;
            }

            // ターン進行 or 継続 or カード使用待ち
            if (playerHand.type === '役' || playerHand.type === '目' || playerHand.type === 'ションベン') {
                const handName = getHandDisplayName(playerHand);
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const canUseBlindingNow = isPlayerParent && playerHand.type !== 'ションベン' && blindingCard && (activeCardUses['blindingDice'] || 0) < 1; // Lv依存確認
                const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                const canUseDoubleUp = !isPlayerParent && playerHand.type !== 'ションベン' && doubleUpCard && (activeCardUses['doubleUpBet'] || 0) < 1; // Lv依存確認
                const adjustCard = playerCards.find(c => c.id === 'adjustEye');
                const canUseAdjust = playerHand.type === '目' && adjustCard && !adjustEyeUsedThisTurn && (activeCardUses['adjustEye'] || 0) < (adjustCard.level >= 2 ? 2 : 1);
                // const nextChanceCard = playerCards.find(c => c.id === 'nextChance'); // nextChanceは未実装 or 別途対応

                let proceedToNextTurn = true; // 次のターンに進むかどうかのフラグ

                // --- カード使用選択肢 ---
                if (canUseAdjust) {
                    setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「出目調整」を使用しますか？`, true);
                    proceedToNextTurn = false; // ユーザー選択待ち
                    const useAdjust = await waitForUserChoice();
                    setMessage(''); // ボタン削除
                    if (useAdjust) {
                        // adjustEyeUsedThisTurn = true; // handleDiceChoice で設定
                        showDiceChoiceOverlay('adjustEye');
                        return; // ダイス選択待ち
                    } else {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！ 出目調整を使用しませんでした。`);
                         proceedToNextTurn = true; // 使用しないので進行
                    }
                } else if (canUseDoubleUp) {
                    setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                    proceedToNextTurn = false; // ユーザー選択待ち
                    const useDoubleUp = await waitForUserChoice();
                    setMessage(''); // ボタン削除
                    if (useDoubleUp) {
                        handleActiveCardUse({ currentTarget: { dataset: { cardId: 'doubleUpBet' }, classList: { contains: () => true } } }); // 強制的に使用
                        setMessage(`あなた(子): ${handName}！ ダブルアップを使用！勝負！`);
                        proceedToNextTurn = true; // 使用宣言したので進行
                    } else {
                        setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                        proceedToNextTurn = true; // 使用しないので進行
                    }
                }
                // --- 選択肢ここまで ---

                if (proceedToNextTurn) {
                    isPlayerTurn = false; playerHandArea.style.display = 'none';
                    if (canUseBlindingNow && isPlayerParent) { // 親でションベン以外、相手ターンに進む場合
                        setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                        displayPlayerHandOnGameScreen(); // 目くらましカードを使えるように
                        // npcTurnは呼ばない。カードクリック待ち
                    } else if (isPlayerParent && playerHand.type !== 'ションベン') { // 親でションベン以外
                        setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                        setTimeout(npcTurn, 1400);
                    } else { // 子の場合 or ションベンの場合
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
                 const canUseGiveUp = giveUpCard && !giveUpEyeUsedThisTurn && (activeCardUses['giveUpEye'] || 0) < giveUpCard.level; // Lv依存

                 if (canReroll) {
                     let msg = `あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${messageSuffix}`;
                     rollButton.disabled = false; // 再度振れるように
                     if (canUseGiveUp) {
                         msg = `あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振りますか？(${playerRollCount}/${currentMaxRolls})${messageSuffix} それとも「見切り」を使用しますか？`;
                         setMessage(msg, true, '振り直す', '見切り使用');
                         const choice = await waitForUserChoice();
                         setMessage(''); // ボタン削除
                         if (choice) { // 振り直す
                             setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${messageSuffix}`);
                             displayPlayerHandOnGameScreen();
                         } else { // 見切り使用
                             handleActiveCardUse({ currentTarget: { dataset: { cardId: 'giveUpEye' }, classList: { contains: () => true } } });
                         }
                     } else {
                         setMessage(msg);
                         displayPlayerHandOnGameScreen();
                     }
                 } else { // 振り切り or 無料振り直しなし
                      const soulRollCardCheck = playerCards.find(c => c.id === 'soulRoll');
                      const canUseSoulRollFinal = soulRollCardCheck && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < 1; // Lv依存確認
                     if (canUseSoulRollFinal) {
                         // 魂の一振りは handleActiveCardUse で処理させる
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 振り直し回数がありません。「魂の一振り」を使用しますか？`);
                         rollButton.disabled = true; // 魂の一振り選択待ち
                         displayPlayerHandOnGameScreen();
                     } else { // 魂の一振りも使えない/ない -> ションベン確定
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
                  // blindingDiceActiveはここでリセットしない (次のロールにも影響する可能性がある？いや、1回のはず)
                  // → 目くらましの効果は「相手が振る**直前**に使用」し、「相手**特殊役**確率低下」なので、1回のロールで完結するはず。ここでリセット。
                  blindingDiceActive = false;
                  activeCardUses['blindingDice'] = (activeCardUses['blindingDice'] || 0) + 1; // 消費カウント
                  setTimeout(npcTurn, 1000); // 強制目なしなので再ロール
                  return;
             }
             // 目くらまし効果が（強制リロール以外で）終了した場合
             if (blindingDiceActive && !forcedReroll) {
                 blindingDiceActive = false; // 効果終了
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
        setMessage(`親権維持カード(Lv.${cardLevel})を使用しますか？ (WAVE中 残り${cardLevel - keepParentRightUsedThisWave}回)`, true);
        const useCard = await waitForUserChoice();
        setMessage(''); // ボタン削除
        return useCard;
    }

    // === ラウンド終了処理 (asyncに変更して親権維持確認に対応) ===
    async function handleRoundEnd() { // async追加
        if (waitingForUserChoice) return; // 選択待ちなら何もしない

        isGameActive = false; rollButton.disabled = true;
        playerHandArea.innerHTML = ''; playerHandArea.style.display = 'none';

        let pWin = false, nWin = false, draw = false, msg = "", sc = 0, rClass = 'draw';
        let parentChanged = false; let preventParentChange = false; let parentKeptByCard = false;

        // 勝敗判定 (変更なし)
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

        // 親権維持カード使用確認 (PCポップアップを置き換え)
        const keepRightCard = playerCards.find(card => card.id === 'keepParentalRight');
        const maxKeepUses = keepRightCard ? (keepRightCard.level >= 2 ? 2 : 1) : 0; // Lv2以上で2回
        const keepRightUsesCount = keepParentRightUsedThisWave;
        if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) {
            const useKeepRight = await askKeepParentRight(keepRightCard.level); // 確認待ち
            if (useKeepRight) {
                preventParentChange = true; parentKeptByCard = true; keepParentRightUsedThisWave++;
                if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; }
                console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} 発動！ (${keepParentRightUsedThisWave}/${maxKeepUses}回使用)`);
            }
        }

        // 連勝カウント (変更なし)
        if (pWin && isPlayerParent) { consecutiveWins++; npcConsecutiveWins = 0; }
        else if (nWin && !isPlayerParent) { npcConsecutiveWins++; consecutiveWins = 0; }
        else if (pWin && !isPlayerParent) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = true; } // 子が勝ったら親交代
        else if (nWin && isPlayerParent && !preventParentChange) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = false; } // 親が負けて維持しないなら交代
        else if (nWin && isPlayerParent && preventParentChange) { npcConsecutiveWins = 0; /* プレイヤー連勝維持 */ }
        else { /* 引き分け時は連勝維持、親交代なし */ consecutiveWins = isPlayerParent ? consecutiveWins : 0; npcConsecutiveWins = !isPlayerParent ? npcConsecutiveWins : 0; }

        let baseScoreChange = 0; let playerPayoutMultiplier = 1; let npcPayoutMultiplier = 1;

        // 点数計算 (変更なし)
        if (pWin) {
            // ... (既存の勝利時計算ロジック) ...
             playerPayoutMultiplier = playerHand?.payoutMultiplier || 1;
            if (npcHand?.name === ROLES.HIFUMI.name) playerPayoutMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier); // 相手ヒフミなら2倍勝ち
            if (playerHand?.name === ROLES.HIFUMI.name) playerPayoutMultiplier = 1; // 自分ヒフミは通常負けだが、何らかで勝った場合は1倍

            // カード効果：アラシ/シゴロ強化
            let arashiBonusTotal = 0, shigoroBonusTotal = 0;
            playerCards.forEach(cardData => { const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef || !cardDef.effectTag) return; switch (cardDef.effectTag) { case 'arashiBonus': if (playerHand?.name === ROLES.ARASHI.name) arashiBonusTotal += cardData.level; break; case 'shigoroBonus': if (playerHand?.name === ROLES.SHIGORO.name) shigoroBonusTotal += cardData.level; break; } });
            if (arashiBonusTotal > 0) { playerPayoutMultiplier += arashiBonusTotal; console.log(`Card Effect: Arashi Bonus +${arashiBonusTotal}!`); }
            if (shigoroBonusTotal > 0) { playerPayoutMultiplier += shigoroBonusTotal; console.log(`Card Effect: Shigoro Bonus +${shigoroBonusTotal}!`); }

            // カード効果：報酬増幅
            if (rewardAmplifierActive && playerHand?.type === '役' && [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name].includes(playerHand.name)) {
                 const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier'); const bonus = (amplifierCard && amplifierCard.level >= 2) ? 2 : 1; playerPayoutMultiplier += bonus;
                 console.log(`Card Effect: 報酬増幅 Lv.${amplifierCard?.level} 発動！ Payout Multiplier +${bonus}`);
                 if(amplifierCard) activeCardUses['rewardAmplifier'] = (activeCardUses['rewardAmplifier'] || 0) + 1;
                 rewardAmplifierActive = false; // 効果リセット
            }
            baseScoreChange = currentBet * playerPayoutMultiplier;

            // カード効果：目ボーナス
            let eyeBonusMultiplier = 1.0;
            if (playerHand?.type === '目') {
                 const sixEyeCard = playerCards.find(c => c.id === 'sixEyeBonus'); if (sixEyeCard && playerHand.value === 6) { eyeBonusMultiplier = Math.max(eyeBonusMultiplier, 1.0 + sixEyeCard.level * 0.5); if (eyeBonusMultiplier > 1.0) console.log(`Card Effect: 6 Eye Bonus Lv.${sixEyeCard.level} x${eyeBonusMultiplier.toFixed(1)}!`); }
                 const oneEyeCard = playerCards.find(c => c.id === 'oneEyeBonus'); if (oneEyeCard && playerHand.value === 1) { eyeBonusMultiplier = Math.max(eyeBonusMultiplier, 1.5 + oneEyeCard.level * 0.5); if (eyeBonusMultiplier > 1.0) console.log(`Card Effect: 1 Eye Bonus Lv.${oneEyeCard.level} x${eyeBonusMultiplier.toFixed(1)}!`); }
            }
            baseScoreChange *= eyeBonusMultiplier;

            // カード効果：逆境の魂
             const spiritCard = playerCards.find(card => card.id === 'fightingSpirit');
             if (spiritCard) { const conditionMet = (spiritCard.level < 3 && playerScore <= npcScore / 2) || (spiritCard.level >= 3 && playerScore <= npcScore); if (conditionMet) { const spiritMultiplier = [1.2, 1.4, 1.6][spiritCard.level - 1]; baseScoreChange *= spiritMultiplier; console.log(`Card Effect: 逆境の魂 Lv.${spiritCard.level}適用！ 獲得点数 x${spiritMultiplier}`); } }

             // カード効果：ダブルアップ (子の勝利時)
             if (doubleUpBetActive && !isPlayerParent) {
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                 const winMultiplier = [2, 2.5, 3][(doubleUpCard?.level || 1) - 1];
                 baseScoreChange *= winMultiplier; console.log(`Card Effect: ダブルアップ Lv.${doubleUpCard?.level} 成功！ Win Multiplier x${winMultiplier}`);
                 doubleUpBetActive = false; // 効果リセット
             }
             // 連勝ボーナス (プレイヤー親の場合)
             let winBonusMultiplier = 1.0;
             if (isPlayerParent && consecutiveWins > 0) { winBonusMultiplier = 1 + consecutiveWins * CONSECUTIVE_WIN_BONUS_RATE; console.log(`Player Win Streak Bonus Applied: x${winBonusMultiplier.toFixed(2)} (${consecutiveWins} wins)`); }
             sc = Math.round(baseScoreChange * winBonusMultiplier);

             msg = npcHand?.type === 'ションベン' ? "NPCションベンで勝利！" : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             if (isPlayerParent && consecutiveWins > 1) msg += ` (${consecutiveWins}連勝!)`;
             rClass = 'win';
        } else if (nWin) { // NPC勝利 / プレイヤー敗北の場合
             const insuranceCard = playerCards.find(card => card.id === 'lossInsurance');
             if (insuranceCard) {
                 // 一撃保険適用時
                 const lossMultiplier = [1.5, 1.3, 1.1][insuranceCard.level - 1];
                 npcPayoutMultiplier = lossMultiplier; console.log(`Card Effect: 一撃保険 Lv.${insuranceCard.level}適用！ Loss Multiplier: ${npcPayoutMultiplier}`);
                 // 保険適用時は、ヒフミ/ションベン軽減は適用されない
                 baseScoreChange = - (currentBet * npcPayoutMultiplier);
             } else {
                 // 通常の敗北時倍率計算
                 npcPayoutMultiplier = npcHand?.payoutMultiplier || 1; // 相手の役倍率を基本とする
                 if (playerHand?.name === ROLES.HIFUMI.name) { // 自分がヒフミで負けた場合
                     npcPayoutMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier); // ヒフミの支払い倍率(2倍)
                 } else if (npcHand?.name === ROLES.HIFUMI.name) { // 相手がヒフミで勝った場合 (自分は目など)
                     npcPayoutMultiplier = 1; // 相手がヒフミなら支払い1倍
                 } else if (playerHand?.type === 'ションベン') { // 自分がションベンで負けた場合
                     npcPayoutMultiplier = Math.abs(ROLES.SHONBEN.payoutMultiplier); // ションベンの支払い倍率(1倍)
                 }
                 baseScoreChange = - (currentBet * npcPayoutMultiplier);

                 // カード効果：支払い軽減 (ヒフミ/ションベン)
                 let lossReductionMultiplier = 1.0;
                 if (playerHand?.name === ROLES.HIFUMI.name) {
                     const hifumiCard = playerCards.find(card => card.id === 'hifumiHalf');
                     if (hifumiCard) { const reductionRate = [0.5, 0.75, 1.0][hifumiCard.level - 1]; lossReductionMultiplier *= (1.0 - reductionRate); console.log(`Card Effect: ヒフミ軽減 Lv.${hifumiCard.level} (Payment Multiplier: ${lossReductionMultiplier.toFixed(2)})!`); }
                 } else if (playerHand?.type === 'ションベン') {
                     const shonbenCard = playerCards.find(card => card.id === 'shonbenHalf');
                     if (shonbenCard) { const reductionRate = [0.5, 0.75, 1.0][shonbenCard.level - 1]; lossReductionMultiplier *= (1.0 - reductionRate); console.log(`Card Effect: ションベン半減 Lv.${shonbenCard.level} (Payment Multiplier: ${lossReductionMultiplier.toFixed(2)})!`); }
                     const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
                     if (giveUpEyeUsedThisTurn && giveUpCard?.level >= 2) { // 見切りLv2以上使用時
                          lossReductionMultiplier *= 0.5; console.log(`Card Effect: 見切り Lv.2+ - 支払い半減適用!`);
                     }
                 }
                 baseScoreChange *= lossReductionMultiplier;
             }

             // カード効果：ダブルアップ (子の敗北時)
             if (doubleUpBetActive && !isPlayerParent) {
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                 const lossMultiplier = 2.0; // 敗北時は常に2倍
                 baseScoreChange *= lossMultiplier; console.log(`Card Effect: ダブルアップ Lv.${doubleUpCard?.level} 失敗！ Loss Multiplier x${lossMultiplier}`);
                 doubleUpBetActive = false; // 効果リセット
             }

             // NPC連勝ボーナス (NPC親の場合) - 通常は適用しないが、ルール次第
             let npcWinBonusMultiplier = 1.0;
             // if (!isPlayerParent && npcConsecutiveWins > 0) { npcWinBonusMultiplier = 1 + npcConsecutiveWins * CONSECUTIVE_WIN_BONUS_RATE; console.log(`NPC Win Streak Bonus Applied: x${npcWinBonusMultiplier.toFixed(2)} (${npcConsecutiveWins} wins)`); }
             sc = Math.round(baseScoreChange * npcWinBonusMultiplier);

             msg = playerHand?.type === 'ションベン' ? "ションベンで敗北..." : `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             if (insuranceCard) msg += ` (一撃保険適用)`;
             if (!isPlayerParent && npcConsecutiveWins > 1) msg += ` (相手${npcConsecutiveWins}連勝)`;
             rClass = 'lose';
        } else { // 引き分けの場合
             sc = 0;
             const drawCard = playerCards.find(card => card.id === 'drawBonus');
             if (drawCard) {
                 const bonusRate = (drawCard.level * 10) / 100;
                 sc = Math.round(currentBet * bonusRate); console.log(`Card Effect: Draw Bonus Lv.${drawCard.level} (${(bonusRate * 100).toFixed(0)}%)! Score change: +${sc}`);
             }
             msg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             rClass = 'draw';
        }

        // 親交代判定 (連勝カウントの後)
        // if (isPlayerParent && nWin && !preventParentChange) { parentChanged = true; isPlayerParent = false; }
        // else if (!isPlayerParent && pWin) { parentChanged = true; isPlayerParent = true; }
        // 上記の連勝カウント部分で isPlayerParent, parentChanged は更新済みのはず

        const psStart = playerScore, nsStart = npcScore;
        const psEnd = Math.max(0, psStart + sc); const nsEnd = Math.max(0, nsStart - sc);
        playerScore = psEnd; npcScore = nsEnd;
        totalScoreChange += sc; // 通算スコア変動に加算
        if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); }
        animateScore(playerScoreEl, psStart, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, nsStart, nsEnd, SCORE_ANIMATION_DURATION);

        addHistoryEntry({ wave: currentWave, round: currentRoundInWave, playerDice: playerDice.join(','), playerHandName: getHandDisplayName(playerHand), npcDice: npcDice.join(','), npcHandName: getHandDisplayName(npcHand), result: rClass, scoreChange: sc, consecutiveWins: consecutiveWins, npcConsecutiveWins: npcConsecutiveWins, parentAfter: isPlayerParent ? 'Player' : 'NPC' });

        setTimeout(() => {
            let finalMsg = `${msg} ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`;
            if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? 'あなた' : '相手'}が親です。`; }
            else if (parentKeptByCard) { finalMsg += " (親権維持発動！)"; }
            setMessage(finalMsg); updateUI(); checkGameEnd(); // ゲーム終了チェック or 次のベットフェーズへ
        }, SCORE_ANIMATION_DURATION + 300);

        // === ラウンド終了時フラグリセット ===
        // doubleUpBetActive は勝敗時にリセット済み
        // riskyBetActive はベット決定時にリセット済み
        rewardAmplifierActive = false;
        giveUpEyeUsedThisTurn = false;
        adjustEyeUsedThisTurn = false;
        nextChanceUsedThisTurn = false;
        soulRollUsedThisTurn = false;
        // WAVE跨ぎでリセットされるフラグはここではリセットしない
        // (例: keepParentRightUsedThisWave, keepParentDiscountNextRound)
    } // handleRoundEnd 関数の終わり

    // === ゲーム終了チェック (拡張: 最低賭け金チェック修正) ===
    function checkGameEnd() {
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);

        // 1. 持ち点0チェック
        if (playerScore <= 0) {
            isGO = true; gameOverReason = "持ち点が0になりました。";
        } else if (npcScore <= 0) {
            defeatedCount++; // WAVEクリア前に倒した数をカウント
            if (currentWave >= MAX_WAVES) {
                isC = true; gameOverReason = "最終WAVEで相手の持ち点を0にしました！";
            } else {
                console.log("NPC defeated, proceeding to shop.");
                calculateAndAwardCoins();
                setMessage(`NPC撃破！ コイン ${calculateEarnedCoins()} G獲得！ ショップへどうぞ！`);
                updateUI();
                betArea.style.display = 'none'; actionArea.style.display = 'none'; nextWaveArea.style.display = 'flex';
                currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
                activeCardUses = {}; keepParentRightUsedThisWave = 0; // WAVEクリア時リセット
                return; // ゲーム続行 (ショップへ)
            }
        }

        // 2. 次のラウンドの最低賭け金チェック (startBettingPhaseに移動したので、ここでは不要？)
        // → startBettingPhaseの冒頭でチェック＆即終了させるため、ここではチェックしない。

        // ゲーム終了判定と画面遷移
        if (isGO || isC) {
            console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`);
            isGameActive = false;
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; historyButton.disabled = false; maxBetButton.disabled = true;
            currentBetInfoEl.textContent = '';
            // ゲームオーバー/クリア時もコインは計算する（クリアボーナスなど）
            if(isC) calculateAndAwardCoins(); // クリア時は計算
            showResultScreen(isC, playerScore, currentWave, gameOverReason);
        } else {
            // ゲームが終了しない場合は次のベットフェーズへ
            console.log("Round end, continuing game.");
            startBettingPhase();
        }
    } // checkGameEnd 関数の終わり

    // === コイン計算 ===
    function calculateEarnedCoins() {
        // 計算式: (基本WAVEボーナス) + (スコア変動ボーナス) + (ラウンドペナルティ)
        const waveBonus = currentWave * 15; // WAVEごとに少し多めに
        // totalScoreChange はそのWAVEでのプレイヤーのスコア変動
        const scoreBonus = Math.max(0, Math.floor(totalScoreChange * 0.05)); // プラス変動分だけボーナス
        const roundPenalty = Math.max(0, (currentRoundInWave - 3) * 5); // 3ラウンド超えるとペナルティ
        const earned = Math.max(10, waveBonus + scoreBonus - roundPenalty); // 最低10G
        console.log(`Coin Calculation: WaveBonus=${waveBonus}, ScoreBonus=${scoreBonus}, RoundPenalty=${roundPenalty}, Earned=${earned}`);
        return earned;
    }
    function calculateAndAwardCoins() {
        const earned = calculateEarnedCoins();
        playerCoins += earned;
        console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`);
        totalScoreChange = 0; // コイン計算に使用したので、WAVE間のスコア変動はリセット？
        // → いや、totalScoreChange は最終スコア計算用に全WAVE通算にするべき。リセットしない。
        // WAVE単位のスコア変動を知りたい場合は別の変数を用意する。
    }
    // === 結果画面表示 ===
    function showResultScreen(isClear, currentScore, wave, reason = "") {
        resultTitleEl.textContent = isClear ? "ゲームクリア！" : "ゲームオーバー";
        resultTitleEl.className = isClear ? 'clear' : 'over';
        resultMessageEl.textContent = isClear ? `祝！ 全${MAX_WAVES}WAVE制覇！` : `残念！ WAVE ${wave} で敗北... ${reason}`;
        // 最終スコア計算: (初期スコアとの差分) + (クリアボーナス) + (コインボーナス)
        let finalCalcScore = 0;
        const scoreDiff = playerScore - INITIAL_PLAYER_SCORE; // ゲーム開始からの純粋なスコア増減
        const coinBonus = playerCoins * 3; // コインもスコアに換算

        if (isClear) {
             const clearBonus = MAX_WAVES * 100; // クリアボーナス
             finalCalcScore = Math.max(0, scoreDiff + clearBonus + coinBonus);
        } else {
             // ゲームオーバー時のスコアは、純粋なスコア増減＋コインボーナス
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
            li.className = e.result; // win, lose, draw
            const mark = e.result === 'win' ? '○' : e.result === 'lose' ? '●' : '△';
            const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : '';
            const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : '';
            const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` (相手${e.npcConsecutiveWins}連勝)` : ''; // NPC連勝表示
            const parentStr = e.parentAfter ? `<span class="parent-info">(次の親: ${e.parentAfter === 'Player' ? 'あなた' : '相手'})</span>` : '';
            li.innerHTML = `<span class="wave-num">WAVE ${e.wave} - ROUND ${e.round} ${parentStr}</span><div class="details"><span class="player">${mark} あなた: ${e.playerDice} <span class="hand">${e.playerHandName}</span></span><span class="vs">vs</span><span class="npc">相手: ${e.npcDice} <span class="hand">${e.npcHandName}</span></span></div><div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div>`;
            historyLogEl.appendChild(li);
        });
    }

    // --- ショップ関連 ---
    function openShop() {
        console.log("Opening shop...");
        nextWaveArea.style.display = 'none';
        purchasedOrUpgradedInShop = []; // ショップ入店時にリセット
        setShopMessage(DEFAULT_SHOP_MESSAGE);
        // 手札交換カードの無料リロール回数を設定
        const exchangeCard = playerCards.find(card => card.id === 'handExchange');
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 2 ? 2 : 1) : 0;
        console.log(`Hand Exchange Card Lv.${exchangeCard?.level}, Free rerolls: ${freeRerollsAvailableThisShopVisit}`);
        // ショップ選択肢+1効果を適用（applyPlayerCardEffectsはWAVE開始時に呼ぶので不要？）
        // → applyEffect自体は何度呼んでも大丈夫なはず。ここで呼んで shopChoicePlus1Active を最新にする。
        applyPlayerCardEffects();
        displayShopOffers(); // shopChoicePlus1Active を参照してオファー数を決定
        updateShopUI();
        showScreen('shop-screen');
    }
    function closeShop() {
        console.log("Closing shop, proceeding to next wave.");
        consecutiveWins = 0; npcConsecutiveWins = 0; // WAVE跨ぎで連勝リセット
        currentWave++;

        // !!! ユーザー指示: プレイヤー持ち点はリセットしない !!!
        // playerScore = INITIAL_PLAYER_SCORE; // この行を削除

        // WAVE間のスコア変動記録用変数はリセット（必要なら）
        // let scoreChangeThisWave = 0; // ← こういう変数を使う場合

        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        currentMinBet = baseMinBet;
        // defeatedCount は checkGameEnd でインクリメント済みの想定
        npcScore = NPC_START_SCORE_BASE + defeatedCount * npcScoreIncrement; // NPCスコアリセット＆増加
        isPlayerParent = true; // 次のWAVEはプレイヤー親から開始
        playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
        betArea.style.display = 'flex'; actionArea.style.display = 'flex';
        rollButton.disabled = true; historyButton.disabled = false;
        // WAVE跨ぎでリセットするフラグ
        activeCardUses = {}; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; // 親権維持関連リセット
        applyPlayerCardEffects(); // reroll1などのパッシブ効果を再適用
        updateUI();
        showScreen('game-screen');
        startBettingPhase();
    }
    function displayShopOffers() {
        currentShopOffers = []; shopCardOffersEl.innerHTML = '';
        const ownedCardIds = playerCards.map(card => card.id);
        const availableForPurchaseOrUpgrade = allCards.filter(card => { const owned = playerCards.find(c => c.id === card.id); return !owned || owned.level < MAX_CARD_LEVEL; });
        // ショップ選択肢+1効果
        const numOffersBase = 3;
        let numOffers = numOffersBase;
        // shopChoicePlus1Active は applyPlayerCardEffects で設定される
        if (shopChoicePlus1Active) {
            const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
            if (choiceCard) numOffers += 1; // カードを持っていれば+1
            console.log("Shop Choice+1 Active! Offers:", numOffers);
            // shopChoicePlus1Active = false; // 効果は1回限りなのでここでリセット
            // → applyEffect側でリセットすべきか？ いや、WAVE開始時にリセットする方が確実。applyPlayerCardEffects内でリセットしない。
            // → openShop -> applyPlayerCardEffects -> displayShopOffers の順なので、ここでリセット。
            shopChoicePlus1Active = false;
        }

        const shuffled = availableForPurchaseOrUpgrade.sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numOffers, shuffled.length); i++) {
            const cardData = shuffled[i];
            const ownedCard = playerCards.find(c => c.id === cardData.id);
            const isOwned = !!ownedCard;
            const currentLevel = ownedCard ? ownedCard.level : 0;
            const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL;
            const nextLevel = currentLevel + 1;
            currentShopOffers.push({ ...cardData, isOwned: isOwned, currentLevel: currentLevel });

            const cardElement = document.createElement('div');
            const rarityClass = ['normal', 'rare', 'epic', 'legendary'][cardData.rarity - 1] || 'normal';
            cardElement.className = `card type-${cardData.type} rarity-${rarityClass}`;
            cardElement.dataset.cardId = cardData.id;

            let buttonHtml = ''; let cost = 0; let costDisplay = '';
            let cardNameHtml = cardData.name; let descriptionHtml = cardData.description; let levelSpan = '';

            if (isOwned) {
                cardElement.classList.add('upgradeable');
                if (isMaxLevel) {
                    cardElement.classList.add('max-level'); costDisplay = `<span class="card-cost">最大Lv</span>`;
                    levelSpan = `<span class="card-level">(Lv.${currentLevel})</span>`;
                    descriptionHtml = getUpgradeDescription(cardData, currentLevel); // 現在レベルの説明
                } else {
                    cost = getCostToUpgradeToNextLevel(cardData, nextLevel);
                    costDisplay = `<span class="card-cost">${cost} G</span>`;
                    const levelColorClass = `card-level-value-${nextLevel}`;
                    levelSpan = `<span class="card-level">(Lv.${currentLevel} → <span class="${levelColorClass}">Lv.${nextLevel}</span>)</span>`;
                    descriptionHtml = getUpgradeDescription(cardData, nextLevel); // 次レベルの説明
                    buttonHtml = `<button class="buy-button upgrade-button button-pop" data-card-id="${cardData.id}" data-action="upgrade" data-cost="${cost}">強化</button>`; // data-cost追加
                    if (nextLevel === 3) { cardElement.classList.add('upgradeable-lv3'); }
                }
            } else { // 未所持
                cost = cardData.cost;
                // 手札交換Lv3 コスト割引
                const exchangeCard = playerCards.find(c => c.id === 'handExchange');
                if(exchangeCard && exchangeCard.level >= 3 && freeRerollsAvailableThisShopVisit === 0) { // 無料リロールを使い切った後にリロールした場合のみ適用？いや、常に適用で良いはず。
                     cost = Math.floor(cost * 0.9); // 10%OFF
                     console.log(`Hand Exchange Lv3 Discount applied to ${cardData.name}. New cost: ${cost}`);
                }
                costDisplay = `<span class="card-cost">${cost} G</span>`;
                buttonHtml = `<button class="buy-button button-pop" data-card-id="${cardData.id}" data-action="buy" data-cost="${cost}">購入</button>`; // data-cost追加
                descriptionHtml = getUpgradeDescription(cardData, 1); // Lv1の説明
            }

            if (purchasedOrUpgradedInShop.includes(cardData.id)) {
                cardElement.classList.add('sold-out'); buttonHtml = ''; costDisplay = ''; // 売り切れ表示
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
    // カード強化説明取得 (handExchange修正)
    function getUpgradeDescription(cardData, level) {
        switch (cardData.id) {
            case 'reroll1': return `最大振り直し回数が合計 ${BASE_MAX_ROLLS + level} 回になる。`;
            case 'shonbenHalf': return `ションベン支払いが ${['50%', '75%', '100%'][level-1]} 減少する。`;
            case 'ignoreMinBet': return `WAVE中 ${level} 回、最低1Gで賭けられる。`; // usesPerWaveはレベル依存
            case 'shopChoicePlus1': return `次ショップ提示数+1${level >= 2 ? ` & リロールコスト-${(level-1)*10}G` : ''}${level >= 3 ? '(無料)' : ''}。`;
            case 'changeToOne': case 'changeToSix': return `WAVE中 ${level} 回、サイコロを ${cardData.id === 'changeToOne' ? '1' : '6'} に変更できる。`; // usesPerWaveはレベル依存
            case 'zoroChanceUp': return `使用したラウンドのロール時、ゾロ目確率UP(${['小','中','大'][level-1]})${level >= 3 ? ' & WAVE中2回' : ''}。`; // usesPerWaveはレベル依存
            case 'avoid123_456': return `使用したラウンドのロール時、役回避${level >= 2 ? '(ションベンも)' : ''}${level >= 3 ? ' & WAVE中2回' : ''}。`; // usesPerWaveはレベル依存
            case 'sixEyeBonus': return `6の目勝利時、獲得点数 x${(1.0 + level * 0.5).toFixed(1)}。`;
            case 'oneEyeBonus': return `1の目勝利時、獲得点数 x${(1.5 + level * 0.5).toFixed(1)}。`;
            case 'arashiBonus': case 'shigoroBonus': return `${cardData.name === 'アラシ強化' ? 'アラシ' : 'シゴロ'}勝利時の倍率が合計 +${level} される。`;
            case 'hifumiHalf': return `ヒフミ支払いが ${['50%', '75%', '100%'][level-1]} 減少する。`;
            case 'drawBonus': return `引き分け時、賭け金の ${level * 10}% を獲得。`;
            case 'blessingDice': return `使用したラウンドのロール時、6が出る確率 ${['小','中','大'][level-1]} UP${level >= 3 ? '(WAVE中2回)' : ''}。`; // usesPerWaveはレベル依存
            case 'adjustEye': return `WAVE中${level >= 2 ? '2' : '1'}回、「目」確定後 ${level >= 3 ? '±2' : '±1'} 調整可。`; // usesPerWaveはレベル依存
            case 'stormWarning': return `使用したロールで${level >= 3 ? 'アラシorピンゾロ' : 'アラシ'}以外なら、${level >= 2 ? '2' : '1'}回まで振り直し消費なし。再ロール時アラシ確率微増。`;
            case 'nextChance': return `WAVE中${level >= 3 ? '2' : '1'}回、「目」確定後にその目${level >= 2 ? 'となったダイス1つまたは2つを選んで' : 'となったダイス1つだけを'}振り直せる。`; // usesPerWaveはレベル依存
            case 'betBoost': return `最大ベット額上限が持ち点の ${[1.2, 1.4, 1.6][level-1]}倍 になる。(相手依存有)`;
            case 'fightingSpirit': return `持ち点が相手の${level >= 3 ? '' : '半分'}以下の時、勝利時獲得点数 x${[1.2, 1.4, 1.6][level-1]}。`;
            case 'rewardAmplifier': return `WAVE中${level >= 3 ? '2' : '1'}回、役勝利時の基本配当倍率+${level >= 2 ? '2' : '1'}。`; // usesPerWaveはレベル依存
            case 'keepParentalRight': return `WAVE中${level >= 2 ? '2' : '1'}回、親の時負けても交代しない${level >= 3 ? '& 次R最低賭け金半減' : ''}。(使用選択)`; // usesPerWaveはレベル依存
            case 'handExchange': return `次ショップでのリロールが${level >= 2 ? '2' : '1'}回無料になる${level >= 3 ? '& リロール後のカードコスト10%OFF' : ''}。`; // ★説明変更
            case 'soulRoll': return `WAVE中1回、振り残り0で持ち点の${[10, 5, 5][level-1]}%消費し追加1回ロール${level >= 3 ? '(目なし率減)' : ''}。`;
            case 'doubleUpBet': return `WAVE中1回、子が目/役確定後に使用。勝利時x${[2, 2.5, 3][level-1]}/敗北時x2。`;
            case 'riskyBet': return `WAVE中${level >= 3 ? '2' : '1'}回、賭け金決定時に使用。賭け金2倍${level >= 2 ? '' : '& 最低賭け金も2倍'}。`; // usesPerWaveはレベル依存
            case 'giveUpEye': return `WAVE中${level >= 3 ? '2' : '1'}回、「目なし」時に振り直さずションベン扱いにできる${level >= 2 ? '(支払半減)' : ''}。`; // usesPerWaveはレベル依存
            case 'blindingDice': return `WAVE中1回、相手ロール前に使用。相手特殊役確率低下(${['小','中','大'][level-1]})${level >= 3 ? '&ションベン率UP' : ''}。`;
            case 'lossInsurance': return `敗北時、常に賭け金の ${[1.5, 1.3, 1.1][level-1]}倍 を支払う。`;
            default: return cardData.description;
        }
    }
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } }

    // ショップUI更新 (手札交換の修正含む)
    function updateShopUI() {
        shopCoinDisplayEl.textContent = playerCoins;
        updateShopHandDisplay();

        // カード購入/強化ボタンの状態更新
        shopCardOffersEl.querySelectorAll('.card').forEach(cardElement => {
            const cardId = cardElement.dataset.cardId;
            const footer = cardElement.querySelector('.card-footer');
            const costDisplayEl = cardElement.querySelector('.card-cost');
            const button = cardElement.querySelector('.buy-button, .upgrade-button');

            if (purchasedOrUpgradedInShop.includes(cardId)) {
                cardElement.classList.add('sold-out');
                cardElement.classList.remove('upgradeable', 'max-level', 'upgradeable-lv3');
                if (footer) footer.style.display = 'none';
                if (button) button.style.display = 'none'; // ボタン非表示
                if (costDisplayEl) costDisplayEl.style.display = 'none'; // コスト非表示
                return;
            } else {
                 // SoldOutでない場合は表示を元に戻す
                 cardElement.classList.remove('sold-out');
                 // 強化可能状態のクラスは displayShopOffers で付与されるのでここでは触らない
                 if (footer) footer.style.display = 'flex';
                 if (button) button.style.display = 'inline-block'; // ボタン表示
                 if (costDisplayEl) costDisplayEl.style.display = 'inline-block'; // コスト表示
            }

            const offerData = currentShopOffers.find(offer => offer.id === cardId);
            if (!offerData || !button) return; // offerDataかbuttonがなければ何もしない

            let cost = 0;
            if (offerData.isOwned && offerData.currentLevel < MAX_CARD_LEVEL) { // 強化
                const nextLevel = offerData.currentLevel + 1;
                cost = getCostToUpgradeToNextLevel(offerData, nextLevel);
                button.disabled = playerCoins < cost;
                // コスト表示も更新しておく（displayShopOffersで設定済みだが念のため）
                if (costDisplayEl) costDisplayEl.textContent = `${cost} G`;
            } else if (!offerData.isOwned) { // 購入
                 cost = parseInt(button.dataset.cost || offerData.cost);
                 button.disabled = playerCoins < cost;
                 if (costDisplayEl) costDisplayEl.textContent = `${cost} G`;
            } else { // 最大レベル
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

        if (freeRerollsAvailableThisShopVisit > 0) { // 手札交換による無料回数があるか
            rerollButtonText = `無料リロール (${freeRerollsAvailableThisShopVisit}回)`;
            currentRerollCost = 0; // コストは0
            rerollDisabled = false; // コイン残高に関わらず可能
        } else {
            rerollButtonText = `リロール (${currentRerollCost} G)`;
            rerollDisabled = playerCoins < currentRerollCost;
        }

        shopRerollCostEl.textContent = currentRerollCost; // 表示コスト
        shopRerollButton.innerHTML = `<span class="reroll-icon">↻</span> ${rerollButtonText}`;
        shopRerollButton.disabled = rerollDisabled;
    }
    // カード購入/強化処理
    function handleBuyCard(event) {
        const button = event.target;
        const cardId = button.dataset.cardId;
        const action = button.dataset.action;
        const cost = parseInt(button.dataset.cost || '0'); // data-costから取得
        const offerData = currentShopOffers.find(offer => offer.id === cardId);
        if (!offerData) return;

        if (playerCoins < cost) { setShopMessage("コインが足りません！"); return; }

        if (action === 'upgrade') {
            const currentCardData = playerCards.find(c => c.id === cardId);
            if (!currentCardData || currentCardData.level >= MAX_CARD_LEVEL) { setShopMessage("これ以上強化できません。"); return; }
            const nextLevel = currentCardData.level + 1;
            // コストはボタンのdata-costから取得した値を使う
            playerCoins -= cost;
            currentCardData.level = nextLevel;
            purchasedOrUpgradedInShop.push(cardId);
            console.log(`Upgraded card: ${offerData.name} to Lv.${nextLevel} for ${cost}G`);
            setShopMessage(`${offerData.name} を Lv.${nextLevel} に強化しました！`);
            applyPlayerCardEffects(); // reroll1などの効果を再計算
        } else if (action === 'buy') {
            if (playerCards.length >= MAX_HAND_CARDS) {
                 setShopMessage("手札がいっぱいです！売却するカードを選んでください。");
                 cardToDiscardFor = { ...offerData, cost: cost }; // 購入コストも渡す
                 openDiscardModal(); return;
            }
            purchaseCard({ ...offerData, cost: cost }); // 購入コストを渡す
        }
        updateShopUI(); // ボタン状態などを更新
    }
    // カード購入実行
    function purchaseCard(cardDefinition) {
        playerCoins -= cardDefinition.cost;
        playerCards.push({ id: cardDefinition.id, level: 1 });
        purchasedOrUpgradedInShop.push(cardDefinition.id);
        console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${cardDefinition.cost}G`);
        setShopMessage(`${cardDefinition.name} を購入しました！`);
        applyPlayerCardEffects(); // 新しいカードの効果を適用
        updateShopUI();
    }
    // リロール処理 (手札交換の修正)
    function handleReroll() {
        let actualRerollCost = REROLL_COST;
        const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (shopChoiceCard) { if (shopChoiceCard.level === 2) actualRerollCost = Math.max(0, REROLL_COST - 10); else if (shopChoiceCard.level >= 3) actualRerollCost = 0; }

        if (freeRerollsAvailableThisShopVisit > 0) {
            freeRerollsAvailableThisShopVisit--; // 無料回数を消費
            setShopMessage(`無料リロールを使用しました！ (残り ${freeRerollsAvailableThisShopVisit} 回)`);
            console.log(`Used free reroll. Remaining: ${freeRerollsAvailableThisShopVisit}`);
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
             // 売却してもコインが足りなくなった場合（通常は発生しないはずだが）
             setShopMessage(`売却しましたが、コインが足りず ${newCardDefinition.name} を購入できませんでした。`);
        }

        cardToDiscardFor = null;
        discardModal.style.display = 'none';
        updateShopUI();
    }
    // 破棄キャンセル
    function cancelDiscard() { cardToDiscardFor = null; discardModal.style.display = 'none'; setShopMessage(DEFAULT_SHOP_MESSAGE); }
    function setShopMessage(msg) { shopMessageEl.textContent = msg; }
    // 手札から直接売却
    function handleSellCard(event) {
        const cardId = event.target.dataset.cardId;
        const cardData = playerCards.find(c => c.id === cardId);
        if (!cardData) return;
        const sellPrice = calculateSellPrice(cardData);
        const cardName = allCards.find(c=>c.id===cardId)?.name || cardId;

        // 確認ポップアップを追加しても良い
        // if (!confirm(`${cardName} [Lv.${cardData.level}] を ${sellPrice}G で売却しますか？`)) return;

        removePlayerCardEffect(cardId);
        playerCoins += sellPrice;
        setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`);
        console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
        // displayShopOffers を呼び出して、売却したカードが購入/強化対象として再表示されるようにする
        displayShopOffers();
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
                 // usesPerWave の値がレベル依存か固定か判定
                  const level = cardData.level;
                  switch (card.id) {
                      case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'keepParentalRight':
                      case 'giveUpEye':
                           totalUses = level; break; // Lvがそのまま回数 (keepRightはLv2で2回?) -> 要確認。 일단 Lvで
                      case 'adjustEye': case 'rewardAmplifier': case 'riskyBet':
                           totalUses = (level >= 2 && card.id === 'adjustEye') ? 2 : // 出目調整Lv2で2回
                                     (level >= 3 && card.id === 'rewardAmplifier') ? 2 : // 報酬増幅Lv3で2回
                                     (level >= 3 && card.id === 'riskyBet') ? 2 : // 危険賭けLv3で2回
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

    // アクティブカード使用処理 (asyncに変更)
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
             // rollButtonリスナー内で処理するように変更したので、ここは呼ばれない想定
             // 呼ばれた場合のエラーハンドリング
             console.error("handleActiveCardUse called for giveUpEye unexpectedly.");
             useConsumed = false;
        } else if (cardId === 'doubleUpBet') {
             // rollButtonリスナー内でユーザー確認後にフラグを立てるように変更
             // ここは呼ばれない想定
             console.error("handleActiveCardUse called for doubleUpBet unexpectedly.");
             useConsumed = false;
        } else if (cardId === 'blindingDice') {
             blindingDiceActive = true;
             setMessage(`目くらまし！相手の次のロールに影響します。`);
             // npcTurn を呼び出す必要がある
             setTimeout(npcTurn, 1000); // 少し待ってからNPCターン開始
        } else if (cardId === 'soulRoll') {
             const costPercent = [10, 5, 5][playerCardData.level - 1];
             const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100))); // 最低1点
             if (playerScore < cost) { // コストを払えない
                  setMessage(`魂の一振りのコスト(${cost}点)を払えません！`);
                  useConsumed = false; // 消費しない
             } else {
                  playerScore -= cost;
                  soulRollUsedThisTurn = true; // このターン使用済み
                  setMessage(`魂の一振り！${cost}点を消費して追加ロール！`);
                  updateUI();
                  // ロールボタンを再度有効にする
                  rollButton.disabled = false;
                  // playerRollCount は増やさない（追加ロール扱い）
             }
        } else if (cardId === 'rewardAmplifier') {
             rewardAmplifierActive = true;
             setMessage(`報酬増幅！次の役での勝利時、配当倍率が増加します。`);
             requiresDelay = true;
        } else {
            console.warn(`Active card effect for ${cardId} is not fully implemented yet.`);
            setMessage(`カード「${card.name}」の効果処理が未実装です。`);
            useConsumed = false; // 未実装なら消費しない
        }

        // 使用回数をカウント (ダイス選択系以外)
        if (useConsumed) {
             activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
        }

        // UIロック解除 (ダイス選択系と特殊なフロー以外)
        if (!['changeToOne', 'changeToSix', 'adjustEye', 'nextChance', 'blindingDice', 'soulRoll', 'giveUpEye', 'doubleUpBet'].includes(cardId)) {
            if (requiresDelay) {
                await new Promise(resolve => setTimeout(resolve, 800)); // 少し待つ
            }
             activeCardBeingUsed = null;
             displayPlayerHandOnGameScreen(); // 手札表示更新
        } else if (cardId === 'soulRoll' && !useConsumed) {
             // 魂の一振りがコスト不足で使えなかった場合
             activeCardBeingUsed = null;
             displayPlayerHandOnGameScreen();
        }
        // ダイス選択系は hideDiceChoiceOverlay で解除
        // blindingDice は npcTurn が終わるまでロック？ -> いや、npcTurn開始前に解除すべき
        // giveUpEye, doubleUpBet は別フローで処理

    }

    // ダイス選択オーバーレイ表示
    function showDiceChoiceOverlay(cardId) {
        if (!diceChoiceOverlay) return;
        const card = allCards.find(c => c.id === cardId);
        const playerCardData = playerCards.find(c => c.id === cardId);
        if (!card || !playerCardData) { hideDiceChoiceOverlay(); return; }

        let title = `${card.name} [Lv.${playerCardData.level}]`;
        let instruction = "";
        let diceIndicesToSelect = [];
        let requiresAdjustChoice = false; // 出目調整で+/-選択が必要か
        let requiresNextChanceCount = 0; // ネクストチャンスで何個選択するか

        if (['changeToOne', 'changeToSix'].includes(cardId)) {
             instruction = "変更するサイコロを選んでください";
             diceIndicesToSelect = [0, 1, 2];
        } else if (cardId === 'adjustEye') {
             if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
             instruction = `調整する「${playerHand.value}以外の目」を選んでください`;
             playerDice.forEach((diceValue, index) => { if (diceValue !== playerHand.value) diceIndicesToSelect.push(index); });
             if (diceIndicesToSelect.length > 0) { requiresAdjustChoice = true; } // 対象があれば調整選択が必要
        } else if (cardId === 'nextChance') {
              if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
              const canSelectTwo = playerCardData.level >= 2;
              requiresNextChanceCount = canSelectTwo ? 2 : 1;
              instruction = `振り直す「${playerHand.value}の目」を${requiresNextChanceCount === 2 ? '最大2つ' : '1つ'}選んでください`;
               playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
        } else {
             hideDiceChoiceOverlay(); return;
        }

        diceChoiceOverlay.innerHTML = `<h3>${title}</h3><p>${instruction}</p>`;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dice-choice-buttons';

        if (diceIndicesToSelect.length === 0) { // 対象のサイコロがない場合
             buttonContainer.innerHTML = "<p>対象のサイコロがありません。</p>";
        } else {
             diceIndicesToSelect.forEach(index => {
                  const button = document.createElement('button');
                  button.className = 'dice-choice-button button-pop';
                  button.textContent = playerDice[index]; // 現在のダイスの目
                  button.dataset.diceIndex = index;
                  if (requiresAdjustChoice) {
                       // 出目調整の場合はクリック後に+/-を選択させる
                       button.onclick = () => showAdjustOptions(index);
                  } else if (requiresNextChanceCount > 0) {
                       // ネクストチャンスの場合は複数選択を可能にする？ -> UI複雑化
                       // 一旦、クリックしたら即実行（1つ選択のみ対応）
                       button.onclick = handleDiceChoice;
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
        rollButton.disabled = true; // 選択中はロール不可
        playerHandArea.style.display = 'none'; // 選択中は手札非表示
    }
    // 出目調整の+/-選択表示
    function showAdjustOptions(diceIndex) {
        const cardId = activeCardBeingUsed;
        const playerCardData = playerCards.find(c => c.id === cardId);
        if (!playerCardData) return;
        const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
        const originalValue = playerDice[diceIndex];

        // オーバーレイの内容を書き換え
        diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？</p>`;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dice-choice-buttons';

        // プラスボタン
        if (originalValue < 6) {
            const plusButton = document.createElement('button');
            plusButton.className = 'dice-choice-button button-pop';
            plusButton.textContent = `+${adjustAmount} (→ ${Math.min(6, originalValue + adjustAmount)})`;
            plusButton.dataset.diceIndex = diceIndex;
            plusButton.dataset.adjustDir = 'plus';
            plusButton.onclick = handleDiceChoice;
            buttonContainer.appendChild(plusButton);
        }
        // マイナスボタン
        if (originalValue > 1) {
             const minusButton = document.createElement('button');
             minusButton.className = 'dice-choice-button button-pop';
             minusButton.textContent = `-${adjustAmount} (→ ${Math.max(1, originalValue - adjustAmount)})`;
             minusButton.dataset.diceIndex = diceIndex;
             minusButton.dataset.adjustDir = 'minus';
             minusButton.onclick = handleDiceChoice;
             buttonContainer.appendChild(minusButton);
        }
        // キャンセルボタン
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
             // ダイス選択系カードの使用をキャンセルした場合
             activeCardBeingUsed = null; // UIロック解除
             setMessage("カードの使用をキャンセルしました。"); // メッセージ表示
        } else {
             activeCardBeingUsed = null; // 通常のロック解除
        }
        // ロールボタンの状態を適切に戻す
        if (isGameActive && isPlayerTurn) {
             if (playerHand?.type === '目なし' && playerRollCount < currentMaxRolls) {
                  rollButton.disabled = false;
             } else if (playerHand?.type === '目' && playerCards.some(c => (c.id === 'adjustEye' && !adjustEyeUsedThisTurn) || (c.id === 'nextChance' && !nextChanceUsedThisTurn))) {
                  rollButton.disabled = true; // 目が確定して調整/再ロール可能な場合はロールボタンは無効のまま
             } else if (playerRollCount >= currentMaxRolls) { // 振り切り済み
                   rollButton.disabled = true;
             } else if (playerHand && playerHand.type !== '目なし'){ // 目なし以外が確定済み
                    rollButton.disabled = true;
             }
        } else {
            rollButton.disabled = true; // プレイヤーのターンでない場合は無効
        }
        displayPlayerHandOnGameScreen(); // 手札表示を戻す
    }
    // ダイス選択処理 (asyncに変更)
    async function handleDiceChoice(event) { // async追加
        const button = event.target;
        const diceIndex = parseInt(button.dataset.diceIndex);
        const adjustDir = button.dataset.adjustDir; // 出目調整用
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
        let turnEnd = false; // この操作でターンが終了するか
        let useConsumed = true; // 基本的に消費する

        if (['changeToOne', 'changeToSix'].includes(cardId)) {
             const newValue = cardId === 'changeToOne' ? 1 : 6;
             newDice[diceIndex] = newValue;
             message = `サイコロを ${newValue} に変更しました。`;
             turnEnd = true; // 変更したら役再判定してターンを進める
             activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1; // 消費カウント
        } else if (cardId === 'adjustEye' && adjustDir) {
              const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
              let originalValue = newDice[diceIndex];
              let adjustedValue = originalValue;
              if (adjustDir === 'plus') adjustedValue = Math.min(6, originalValue + adjustAmount);
              else if (adjustDir === 'minus') adjustedValue = Math.max(1, originalValue - adjustAmount); // ここから続き

              if (adjustedValue !== originalValue) {
                    newDice[diceIndex] = adjustedValue;
                    message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
                    adjustEyeUsedThisTurn = true; // このターン使用済み
                    turnEnd = true; // 調整したら役再判定してターンを進める
                    activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1; // 消費カウント
              } else {
                   message = "調整しても値が変わりませんでした。";
                   turnEnd = false; // 変わらないならターンは進めない？ or 進める？ -> 進めない方が自然か
                   useConsumed = false; // 値が変わらないなら消費しない
              }
        } else if (cardId === 'nextChance') {
              // 選択したダイスを振り直す (Lv1: 1つだけ)
              const originalValue = newDice[diceIndex];
              newDice[diceIndex] = rollSingleDice();
              message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`;
              nextChanceUsedThisTurn = true; // このターン使用済み
              turnEnd = true; // 振り直したら役再判定してターンを進める
              activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1; // 消費カウント
              // TODO: Lv2で2つ選択した場合の処理 (UI含めて要検討)
        } else {
             hideDiceChoiceOverlay(); return; // 未対応のカード
        }

        playerDice = newDice; // ダイス目を更新
        const result = getHandResult(playerDice); // 再判定
        const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
        playerHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("Re-evaluated hand:", playerHand);

        // UI更新
        diceDisplayEl.innerHTML = playerDice.map(d => `<span class="dice-num">${d}</span>`).join(' ');
        playerDiceEl.textContent = playerDice.join(' ');
        playerHandEl.textContent = getHandDisplayName(playerHand);
        highlightHand(playerHandEl, playerHand);

        hideDiceChoiceOverlay(); // オーバーレイを閉じる

        // メッセージ表示 (使用回数情報を含める)
        let totalUses = Infinity; let usesLeft = Infinity;
        if (card.usesPerWave) {
             const level = playerCardData.level;
             switch (card.id) { /* ... (displayPlayerHandOnGameScreen と同様の計算) ... */
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
            await new Promise(resolve => setTimeout(resolve, 800)); // 少し待つ

            const handName = getHandDisplayName(playerHand);
            if (playerHand.type === '役' || playerHand.type === '目' || playerHand.type === 'ションベン') {
                 isPlayerTurn = false; playerHandArea.style.display = 'none';
                 const blindingCard = playerCards.find(c => c.id === 'blindingDice'); const canUseBlindingNow = isPlayerParent && playerHand.type !== 'ションベン' && blindingCard && (activeCardUses['blindingDice'] || 0) < 1; // Lv依存確認
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet'); const canUseDoubleUp = !isPlayerParent && playerHand.type !== 'ションベン' && doubleUpCard && (activeCardUses['doubleUpBet'] || 0) < 1; // Lv依存確認

                 if (canUseBlindingNow && isPlayerParent) {
                     setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                     displayPlayerHandOnGameScreen(); // カードを使えるように
                     // カードクリック待ち
                 } else if (isPlayerParent && playerHand.type !== 'ションベン') {
                     setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                     setTimeout(npcTurn, 1400);
                 } else if (canUseDoubleUp && !isPlayerParent) { // 子でダブルアップ可能
                     setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                     const useDoubleUp = await waitForUserChoice();
                     setMessage('');
                     if (useDoubleUp) {
                         handleActiveCardUse({ currentTarget: { dataset: { cardId: 'doubleUpBet' }, classList: { contains: () => true } } }); // 強制使用
                         setMessage(`あなた(子): ${handName}！ ダブルアップを使用！勝負！`);
                         setTimeout(handleRoundEnd, 1000);
                     } else {
                         setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                         setTimeout(handleRoundEnd, 1000);
                     }
                 } else { // 子でダブルアップ不可 or ションベン
                     setMessage(`あなた(${isPlayerParent?'親':'子'}): ${handName}！ ${playerHand.type === 'ションベン' ? '負けです。' : '勝負！'}`);
                     setTimeout(handleRoundEnd, 1000);
                 }
            } else if (playerHand.type === '目なし') { // カード使用後も目なしの場合
                 if (playerRollCount < currentMaxRolls) {
                     setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})`);
                     rollButton.disabled = false; // 再度振れる
                     displayPlayerHandOnGameScreen();
                 } else { // 振り切り後目なし -> ションベン
                     playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                     updateUI();
                     setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なしでションベン！ 負けです。`);
                     highlightHand(playerHandEl, playerHand);
                     playerHandArea.style.display = 'none';
                     isPlayerTurn = false; // 相手ターンにはしないが、ターン終了扱い
                     setTimeout(handleRoundEnd, 800);
                 }
            }
            updateUI(); // 最終的な状態を更新
        } else {
             // turnEndがfalseの場合（出目調整で値が変わらなかった場合など）
             // 再度カードを使えるようにUIを戻す
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
// ===== END OF script.txt =====