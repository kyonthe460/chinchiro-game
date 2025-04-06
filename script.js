// ===== START OF script.js =====
document.addEventListener('DOMContentLoaded', () => {
    // --- 要素取得 ---
    const titleScreen = document.getElementById('title-screen'), gameScreen = document.getElementById('game-screen'), resultScreen = document.getElementById('result-screen'), shopScreen = document.getElementById('shop-screen');
    const difficultyButtons = document.querySelectorAll('.difficulty-button'), startGameButton = document.getElementById('start-game-button');
    const waveInfoEl = document.getElementById('wave-info');
    const playerScoreEl = document.getElementById('player-score'), playerHandEl = document.getElementById('player-hand'), playerDiceEl = document.getElementById('player-dice');
    const npcScoreEl = document.getElementById('npc-score'), npcHandEl = document.getElementById('npc-hand'), npcDiceEl = document.getElementById('npc-dice');
    const diceDisplayEl = document.getElementById('dice-display'), rollCounterEl = document.getElementById('roll-counter'), messageEl = document.getElementById('message');
    const betInput = document.getElementById('bet-input'), setBetButton = document.getElementById('set-bet-button'), rollButton = document.getElementById('roll-button'), historyButton = document.getElementById('history-button'), nextWaveButton = document.getElementById('next-wave-button');
    const betAdjustButtons = document.querySelectorAll('.bet-adjust-button');
    const actionArea = document.getElementById('action-controls');
    const nextWaveArea = document.getElementById('next-wave-area');
    const betMainControls = document.querySelector('.bet-main-controls');
    const betActionContainer = document.querySelector('.bet-action-container');
    const cardActionButton = document.getElementById('card-action-button');
    const minBetButton = document.getElementById('min-bet-button'); // MINボタン取得

    const centerRoleAnnouncementEl = document.getElementById('center-role-announcement');
    const playerScoreContainer = playerScoreEl.closest('.score-container'), npcScoreContainer = npcScoreEl.closest('.score-container');
    const resultTitleEl = document.getElementById('result-title'), resultMessageEl = document.getElementById('result-message'), finalScoreEl = document.getElementById('final-score');
    const restartSameDifficultyButton = document.getElementById('restart-same-difficulty-button'), changeDifficultyButton = document.getElementById('change-difficulty-button');
    const historyModal = document.getElementById('history-modal'), historyLogEl = document.getElementById('history-log'), closeHistoryModalButton = document.getElementById('close-history-modal');
    const minBetDisplayEl = document.getElementById('min-bet-display');
    const playerParentMarker = document.getElementById('player-parent-marker');
    const npcParentMarker = document.getElementById('npc-parent-marker');
    const gameCoinDisplayEl = document.getElementById('game-coin-display');
    const gameCoinInfoEl = document.getElementById('game-coin-info');
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
    const shopActionsEl = document.querySelector('#shop-actions');
    const discardModal = document.getElementById('discard-modal');
    const discardOptionsEl = document.getElementById('discard-options');
    const cancelDiscardButton = document.getElementById('cancel-discard-button');
    const shopMessageEl = document.querySelector('.shop-message');
    const messageArea = document.getElementById('message-area');
    const messageButtonContainer = document.getElementById('message-button-container');
    const diceRollModal = document.getElementById('dice-roll-modal');
    const diceRollModalDisplay = document.getElementById('dice-roll-modal-display');
    const closeDiceRollModalButton = document.getElementById('close-dice-roll-modal');
    const cardListModal = document.getElementById('card-list-modal');
    const cardListContent = document.getElementById('card-list-content');
    const closeCardListModalButton = document.getElementById('close-card-list-modal');
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModalButton = document.getElementById('close-settings-modal');
    const settingsNavButtons = document.querySelectorAll('.settings-nav-button');
    const settingsContent = document.getElementById('settings-content');
    const settingsCardListButton = document.getElementById('settings-card-list-button');
    const settingsCardListInner = document.getElementById('settings-card-list-inner');
    const cardActionModal = document.getElementById('card-action-modal');
    const closeCardActionModalButton = document.getElementById('close-card-action-modal');
    const cardActionDisplay = document.getElementById('card-action-display');
    const cardActionMessage = document.getElementById('card-action-message');

    // --- ゲーム状態 ---
    const INITIAL_PLAYER_SCORE = 2500;
    let playerScore = INITIAL_PLAYER_SCORE;
    let scoreAtWaveStart = INITIAL_PLAYER_SCORE;
    let npcScore = 500;
    let currentWave = 1, defeatedCount = 0;
    let totalScoreChange = 0;
    let currentBet = 0, isPlayerTurn = true, playerDice = [0, 0, 0], npcDice = [0, 0, 0];
    let playerHand = null, npcHand = null, playerRollCount = 0, npcRollCount = 0;
    let isGameActive = false, difficulty = 'normal', npcScoreIncrement = 500;
    let gameHistory = [], handHighlightTimeout = null;
    let betHoldInterval = null, betHoldTimeout = null, betHoldAmount = 0;
    let centerRoleAnnounceTimeout = null;
    let centerResultAnnounceTimeout = null;
    let baseMinBet = 50; let currentMinBet = baseMinBet;
    let consecutiveWins = 0; let npcConsecutiveWins = 0;
    let isPlayerParent = true;
    let playerCoins = 0;
    let playerCards = [];
    let currentShopOffers = [];
    let purchasedOrUpgradedInShop = [];
    let roundCount = 0;
    let currentRoundInWave = 0;
    let cardToDiscardFor = null;
    let activeCardUses = {};
    let activeCardBeingUsed = null;
    let freeRerollsAvailableThisShopVisit = 0;

    // --- ユーザー操作待ち関連 ---
    let waitingForUserChoice = false;
    let userChoiceResolver = null;
    let shopConfirmationResolver = null;

    // === カード効果用フラグ ===
    let ignoreMinBetActive = false;
    let shopChoicePlus1Active = false;
    let zoroChanceUpActive = false;
    let avoid123_456Active = false;
    let blessingDiceActive = false;
    let stormWarningActive = false;
    let stormWarningRerollsLeft = 0;
    let blindingDiceActive = false;
    let doubleUpBetActive = false;
    let riskyBetActive = false;
    let rewardAmplifierActive = false;
    let giveUpEyeUsedThisTurn = false;
    let adjustEyeUsedThisTurn = false;
    let nextChanceUsedThisTurn = false;
    let soulRollUsedThisTurn = false;
    let keepParentRightUsedThisWave = 0;
    let keepParentDiscountNextRound = false;

    // --- 定数 ---
    const BASE_MAX_ROLLS = 3; let currentMaxRolls = BASE_MAX_ROLLS;
    const NPC_START_SCORE_BASE = 500, MAX_WAVES = 10;
    const HAND_HIGHLIGHT_DURATION = 1500;
    const CENTER_ROLE_DURATION = 2000;
    const CENTER_RESULT_DURATION = 1800;
    const SCORE_ANIMATION_DURATION = 600; const SCORE_POPUP_DURATION = 1500;
    const BET_HOLD_DELAY = 500, BET_HOLD_INTERVAL = 80;
    const CONSECUTIVE_WIN_BONUS_RATE = 0.1;
    const NPC_BET_DELAY = 1500;
    const MAX_HAND_CARDS = 5; const REROLL_COST = 20;
    const MAX_CARD_LEVEL = 3;
    const SELL_PRICE_RATE = 0.5;
    const DEFAULT_SHOP_MESSAGE = "好きなカードを購入して手札を強化しよう！";
    const UPGRADE_COST_MULTIPLIER = 1.5;
    const MIN_BET_INCREMENT = 50;
    const COIN_ANIMATION_DURATION = 1000;

    // --- 役の定義 ---
    const ROLES = { PINZORO: { name: 'ピンゾロ', strength: 7, payoutMultiplier: 5 }, ARASHI: { name: 'アラシ', strength: 6, payoutMultiplier: 3 }, SHIGORO: { name: 'シゴロ', strength: 5, payoutMultiplier: 2 }, NORMAL_EYE: { name: '目', strength: 4, payoutMultiplier: 1 }, HIFUMI: { name: 'ヒフミ', strength: 1, payoutMultiplier: -2 }, MENASHI: { name: '目なし', strength: 0 }, SHONBEN: { name: 'ションベン', strength: -1, payoutMultiplier: -1 } };

    // --- カードデータ定義 ---
    const allCards = [
        { id: 'reroll1', name: '振り直し回数+1', type: 'support', cost: 50, rarity: 1, flavor: 'もう一回！あと一回だけ！', applyEffect: (level = 1) => currentMaxRolls = BASE_MAX_ROLLS + level, removeEffect: (level = 1) => currentMaxRolls = BASE_MAX_ROLLS, image: './Card Image/01.jpeg' },
        { id: 'shonbenHalf', name: 'ションベン半減', type: 'support', cost: 70, rarity: 1, flavor: 'おっとっと、少しこぼしただけさ。', effectTag: 'shonbenHalf', image: './Card Image/02.jpeg' },
        { id: 'ignoreMinBet', name: '最低賭け金無視', type: 'support', cost: 40, rarity: 1, flavor: 'チリも積もれば...', usesPerWave: 1, image: './Card Image/03.jpeg' },
        { id: 'shopChoicePlus1', name: 'ショップ選択肢+1', type: 'support', cost: 150, rarity: 2, flavor: '選択肢は多いほうがいい。人生も、カードも。', applyEffect: (level = 1) => shopChoicePlus1Active = true, removeEffect: () => shopChoicePlus1Active = false, image: './Card Image/04.jpeg' },
        { id: 'changeToOne', name: '1に変更', type: 'dice', cost: 80, rarity: 1, flavor: 'ピンゾロ狙い？それとも…？', usesPerWave: 1, image: './Card Image/05.jpeg' },
        { id: 'changeToSix', name: '6に変更', type: 'dice', cost: 100, rarity: 1, flavor: '目は力なり。最大値をその手に。', usesPerWave: 1, image: './Card Image/06.jpeg' },
        { id: 'zoroChanceUp', name: 'ゾロ目確率UP', type: 'dice', cost: 120, rarity: 2, flavor: '揃え！揃え！揃えー！', usesPerWave: 1, image: './Card Image/07.jpeg' },
        { id: 'avoid123_456', name: '役回避', type: 'dice', cost: 50, rarity: 1, flavor: '危ない橋は渡らない主義でね。', usesPerWave: 1, image: './Card Image/08.jpeg' },
        { id: 'sixEyeBonus', name: '6の目ボーナス', type: 'score', cost: 100, rarity: 1, flavor: '最高の一点で、最高の報酬を。', effectTag: 'sixEyeBonus', image: './Card Image/09.jpeg' },
        { id: 'oneEyeBonus', name: '1の目ボーナス', type: 'score', cost: 120, rarity: 1, flavor: '最弱の目が、最強の切り札に。', effectTag: 'oneEyeBonus', image: './Card Image/10.jpeg' },
        { id: 'arashiBonus', name: 'アラシ強化', type: 'score', cost: 150, rarity: 2, flavor: '吹き荒れろ！嵐の如く！', effectTag: 'arashiBonus', image: './Card Image/11.jpeg' },
        { id: 'shigoroBonus', name: 'シゴロ強化', type: 'score', cost: 130, rarity: 1, flavor: '4-5-6！幸運の階段。', effectTag: 'shigoroBonus', image: './Card Image/12.jpeg' },
        { id: 'hifumiHalf', name: 'ヒフミ軽減', type: 'score', cost: 180, rarity: 2, flavor: '1-2-3...痛恨のミスも、少しだけ軽く。', effectTag: 'hifumiHalf', image: './Card Image/13.jpeg' },
        { id: 'drawBonus', name: '引き分けボーナス', type: 'score', cost: 90, rarity: 1, flavor: 'まあ、悪くないんじゃない？', effectTag: 'drawBonus', image: './Card Image/14.jpeg' },
        { id: 'blessingDice', name: '天の恵み', type: 'dice', cost: 130, rarity: 2, flavor: '天よ、我に力を！(主に6を)', usesPerWave: 1, image: null },
        { id: 'adjustEye', name: '出目調整', type: 'dice', cost: 60, rarity: 1, flavor: 'あと一つ…！を現実に。', usesPerWave: 1, image: null },
        { id: 'stormWarning', name: '嵐の予感', type: 'dice', cost: 250, rarity: 3, flavor: '嵐の前触れ…次こそは！', usesPerWave: 1, image: null },
        { id: 'nextChance', name: 'ネクストチャンス', type: 'dice', cost: 180, rarity: 3, flavor: '諦めるのはまだ早い。', usesPerWave: 1, image: null },
        { id: 'betBoost', name: '賭け金ブースト', type: 'score', cost: 160, rarity: 2, flavor: 'リスクを取らねば、得られるものも少ない。', effectTag: 'betBoost', image: null },
        { id: 'fightingSpirit', name: '逆境の魂', type: 'score', cost: 140, rarity: 2, flavor: '窮鼠猫を噛む、とはよく言ったものだ。', effectTag: 'fightingSpirit', image: null },
        { id: 'rewardAmplifier', name: '報酬増幅', type: 'score', cost: 280, rarity: 3, flavor: '勝利の美酒は、より甘く。', usesPerWave: 1, image: null },
        { id: 'keepParentalRight', name: '親権維持', type: 'support', cost: 180, rarity: 2, flavor: 'この座は、譲らん！', usesPerWave: 1, image: null },
        { id: 'handExchange', name: '手札交換', type: 'support', cost: 50, rarity: 1, flavor: '不要なものを、新たな可能性に。', effectTag: 'handExchange', image: null },
        { id: 'soulRoll', name: '魂の一振り', type: 'support', cost: 200, rarity: 3, flavor: 'すべてをこの一振りに…！', usesPerWave: 1, image: null },
        { id: 'doubleUpBet', name: 'ダブルアップ', type: 'score', cost: 220, rarity: 3, flavor: '倍プッシュだ…！', usesPerWave: 1, image: null },
        { id: 'riskyBet', name: '危険な賭け', type: 'support', cost: 120, rarity: 2, flavor: '勝負は常に、リスクと隣り合わせ。', usesPerWave: 1, image: null },
        { id: 'giveUpEye', name: '見切り', type: 'support', cost: 70, rarity: 1, flavor: '深追いは禁物。損切りも大事。', usesPerWave: 1, image: null },
        { id: 'blindingDice', name: '目くらまし', type: 'dice', cost: 260, rarity: 3, flavor: 'さあ、惑うがいい！', usesPerWave: 1, image: null },
        { id: 'lossInsurance', name: '一撃保険', type: 'score', cost: 190, rarity: 3, flavor: '備えあれば憂いなし…？', effectTag: 'lossInsurance', image: null },
    ];

    // --- three.js 関連変数 ---
    let scene, camera, renderer, diceMeshes = [], diceAnimationId = null;
    let isThreeJSInitialized = false;
    const DICE_SIZE = 1;
    const DICE_SPACING = DICE_SIZE * 1.8;
    const DICE_CANVAS_SIZE = 128;
    const DICE_DOT_RADIUS = DICE_CANVAS_SIZE * 0.08;
    const DICE_DOT_COLOR = '#333333';
    const DICE_FACE_COLOR = '#FFFFFF';
    const DICE_EDGE_RADIUS = 0.05;
    const ROTATION_SPEED = 40;

    // --- 基本関数 ---
    function showScreen(screenId) { console.log("Showing screen:", screenId); document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); document.getElementById(screenId)?.classList.add('active'); }
    function setDifficulty(newDifficulty) {
        difficulty = newDifficulty;
        difficultyButtons.forEach(btn => btn.classList.toggle('selected', btn.dataset.difficulty === difficulty));
        switch (difficulty) {
            case 'easy': npcScoreIncrement = 300; break;
            case 'hard': npcScoreIncrement = 700; break;
            default: npcScoreIncrement = 500; break;
        }
        console.log(`Difficulty set to: ${difficulty}, NPC score increment: ${npcScoreIncrement}`);
    }
    function getHandDisplayName(hand) { if (!hand) return '-'; if (hand.type === '役') return hand.name; if (hand.type === '目') return `目 (${hand.value})`; if (hand.type === 'ションベン') return 'ションベン'; if (hand.type === '目なし') return '目なし'; return '-'; }
    function setMessage(msg, showButtons = false, button1Text = 'はい', button2Text = 'いいえ') {
        messageEl.textContent = msg;
        messageButtonContainer.innerHTML = '';

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
    function waitForUserChoice() {
        return new Promise(resolve => {
            waitingForUserChoice = true;
            userChoiceResolver = resolve;
        });
    }
    function handleUserChoice(choice) {
        if (!waitingForUserChoice || !userChoiceResolver) return;
        waitingForUserChoice = false;
        const resolver = userChoiceResolver;
        userChoiceResolver = null;
        messageButtonContainer.innerHTML = '';
        resolver(choice);
    }
     function waitForShopConfirmation() {
        return new Promise(resolve => {
            shopConfirmationResolver = resolve;
        });
    }
    function handleShopConfirmation(choice) {
        if (shopConfirmationResolver) {
            const resolver = shopConfirmationResolver;
            shopConfirmationResolver = null;
            const confirmationButtons = document.getElementById('shop-confirmation-buttons');
            if (confirmationButtons) confirmationButtons.remove();
            if(shopActionsEl) shopActionsEl.style.display = 'flex';
            resolver(choice);
        }
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
            activeCardUses['handExchangeFreeRerollCount'] = 0;
            console.log("Hand Exchange card removed, resetting free rerolls.");
        }
        playerCards = playerCards.filter(card => card.id !== cardIdToRemove);
        applyPlayerCardEffects();
        console.log(`Removed card: ${cardIdToRemove}`);
    }
    function getCostToUpgradeToNextLevel(cardData, nextLevel) {
        if (!cardData || nextLevel <= 1 || nextLevel > MAX_CARD_LEVEL) { return 0; }
        const baseCardDef = allCards.find(c => c.id === (cardData.id || cardData));
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
        activeCardUses = {}; ignoreMinBetActive = false; shopChoicePlus1Active = false; zoroChanceUpActive = false; avoid123_456Active = false; activeCardBeingUsed = null; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; freeRerollsAvailableThisShopVisit = 0; waitingForUserChoice = false; userChoiceResolver = null; shopConfirmationResolver = null;
        // ===
        applyPlayerCardEffects();
        // ★ コントロール要素の表示を制御
        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        rollButton.disabled = true; historyButton.disabled = false; playerDiceEl.textContent = '-'; npcDiceEl.textContent = '-'; diceDisplayEl.textContent = '- - -'; diceDisplayEl.style.display = 'block';
        rollCounterEl.textContent = `0/${currentMaxRolls}回`;
        playerHandEl.className = 'hand-display'; npcHandEl.className = 'hand-display'; centerRoleAnnouncementEl.className = 'center-role'; centerRoleAnnouncementEl.textContent = ''; if (playerScoreEl.animationId) cancelAnimationFrame(playerScoreEl.animationId); if (npcScoreEl.animationId) cancelAnimationFrame(npcScoreEl.animationId); playerScoreEl.animationId = null; npcScoreEl.animationId = null; currentBetInfoEl.textContent = '';
        updateUI();
        if (!isRestart) showScreen('game-screen');
        startBettingPhase();
        console.log("--- initGame END ---");
    }

    // --- UI更新 ---
    function updateUI() {
        // WAVE 情報要素を動的に生成・更新
        if (waveInfoEl) {
             const difficultyElText = difficulty === 'easy' ? '簡単' : difficulty === 'hard' ? '難しい' : '普通';
            waveInfoEl.innerHTML = `
                <span>WAVE: <span id="wave-number" class="wave-highlight">${currentWave}</span>/${MAX_WAVES}</span> |
                <span>ROUND: <span id="round-number" class="round-normal">${currentRoundInWave}</span></span> |
                <span>撃破数: <span id="defeated-count">${defeatedCount}</span></span> |
                <span>難易度: <span id="difficulty-display">${difficultyElText}</span></span>
                <span id="consecutive-wins-display" style="display: none;"></span>
            `;
            // 連勝表示要素を再取得
            const consWinsDisplay = document.getElementById('consecutive-wins-display');
            if (consWinsDisplay) {
                consWinsDisplay.classList.remove('npc-losing-streak');
                if (isPlayerParent && consecutiveWins > 1) {
                    consWinsDisplay.textContent = ` (${consecutiveWins}連勝中!)`;
                    consWinsDisplay.style.display = 'inline';
                } else if (!isPlayerParent && npcConsecutiveWins > 1) {
                    consWinsDisplay.textContent = ` (相手${npcConsecutiveWins}連勝中...)`; // ★ NPC連勝時の表示変更
                    consWinsDisplay.classList.add('npc-losing-streak');
                    consWinsDisplay.style.display = 'inline';
                } else {
                    consWinsDisplay.textContent = '';
                    consWinsDisplay.style.display = 'none';
                }
            }
        }

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

        // 親マーカー表示
        playerParentMarker.style.display = isPlayerParent ? 'inline' : 'none';
        npcParentMarker.style.display = !isPlayerParent ? 'inline' : 'none';

        // 所持コイン表示 (gameCoinDisplayEl が存在する場合のみ更新)
        if (gameCoinDisplayEl) {
            gameCoinDisplayEl.textContent = `${playerCoins} G`;
        }
        if (shopScreen.classList.contains('active')) { updateShopUI(); }

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

        // ★ NPC親ターンのコントロール表示制御
        if (betMainControls) betMainControls.style.opacity = !isPlayerParent && !isGameActive ? '0.5' : '1';
        if (betMainControls) betMainControls.style.pointerEvents = !isPlayerParent && !isGameActive ? 'none' : 'auto';
        if (betActionContainer) betActionContainer.style.display = !isPlayerParent && !isGameActive ? 'none' : 'flex';

        // ★ カードボタンのハイライト更新
        updateCardButtonHighlight();
    }

    // ★ カードボタンハイライト更新関数
    function updateCardButtonHighlight() {
        if (!cardActionButton) return;
        let usableCardExists = false;
        for (const cardData of playerCards) {
            if (checkCardUsability(cardData.id)) {
                usableCardExists = true;
                break;
            }
        }
        cardActionButton.classList.toggle('highlight-card-button', usableCardExists);
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

    // === 賭け金上限更新 (NaN対策追加) ===
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
        if (isNaN(cv)) {
            cv = currentMinBet;
            betInput.value = cv;
        }

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
            const v = parseInt(betInput.value) || currentMinBet; // ★ NaNなら最低値で計算
            b.disabled = betInput.disabled ||
                         (a > 0 && (v >= maxBet || v + a > maxBet)) ||
                         (a < 0 && (v <= currentMinBet || v + a < currentMinBet));
        });
        setBetButton.disabled = betInput.disabled;
        maxBetButton.disabled = betInput.disabled;
        minBetButton.disabled = betInput.disabled; // MINボタンの状態も制御
    }

    // === 賭けフェーズ開始 ===
    function startBettingPhase() {
        console.log("--- startBettingPhase START ---");
        currentRoundInWave++;
        isGameActive = false;
        playerDice = [0, 0, 0]; npcDice = [0, 0, 0];
        playerHand = null; npcHand = null;
        playerRollCount = 0; npcRollCount = 0;
        rollButton.disabled = true; historyButton.disabled = false; // 履歴ボタンは常に有効に
        currentBet = 0;
        // === ラウンド開始時フラグリセット ===
        activeCardBeingUsed = null; ignoreMinBetActive = false;
        zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null; riskyBetActive = false;
        // ===

        // ★ コントロール要素の表示/非表示
        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        // 最低賭け金計算
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        if (keepParentDiscountNextRound) {
             currentMinBet = Math.max(1, Math.floor(baseMinBet / 2));
             keepParentDiscountNextRound = false;
        } else {
             currentMinBet = baseMinBet;
        }
         betInput.value = currentMinBet; // ★ 初期値を確実に設定
        updateUI(); // ★ updateUI内でNPCターンの制御も行う

        // --- 最低賭け金支払いチェック ---
        if (playerScore < currentMinBet) {
             setMessage(`あなたの持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、ゲームオーバーです。`);
             currentBetInfoEl.textContent = '';
             // ★ コントロール要素を非表示に
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
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
            announceRoundResult(true, true);
            updateUI();
             // ★ コントロール要素を非表示に
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
             if (nextWaveArea) nextWaveArea.style.display = 'flex'; // ショップへボタン表示
            currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
            activeCardUses = {}; keepParentRightUsedThisWave = 0;
            return;
        }
        // --- チェックここまで ---

        currentBetInfoEl.textContent = '賭け金設定中...';

        if (isPlayerParent) {
            setMessage(`あなた(親)が賭け金を設定 (最低 ${currentMinBet}点)。`);
            updateBetLimits();
            updateCardButtonHighlight(); // ★ カードボタン更新
        } else { // NPCが親の場合
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true; // MINボタンも無効化
            setMessage(`相手(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);
                if (npcScore < npcBet || npcBet < currentMinBet) {
                     console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet})`);
                     defeatedCount++;
                     const earnedCoins = calculateEarnedCoins();
                     calculateAndAwardCoins();
                     setMessage(`エラー: 相手が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！`);
                     announceRoundResult(true, true);
                     updateUI();
                     // ★ コントロール要素非表示
                     if (betMainControls) betMainControls.style.display = 'none';
                     if (betActionContainer) betActionContainer.style.display = 'none';
                     if (actionArea) actionArea.style.display = 'none';
                     if (nextWaveArea) nextWaveArea.style.display = 'flex';
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
                updateUI(); // isPlayerTurn が false になった後のUI更新 (NPCコントロール非表示など)
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const canUseBlinding = blindingCard && (getRemainingUses('blindingDice') > 0); // 使用回数チェック
                if (canUseBlinding && !isPlayerParent) { // ★ 子プレイヤーが目くらましを使える場合 (NPCが親の時)
                    setMessage(`相手(親)が ${currentBet} 点で勝負！ 相手がサイコロを振ります...(「目くらまし」使用可能)`);
                    isPlayerTurn = true; // ★ 目くらまし使用のためにプレイヤー操作に戻す
                    updateCardButtonHighlight(); // ★ カードボタン更新
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

    // === ダイスロールモーダル表示/非表示 (three.js対応) ===
    function showDiceRollModal() {
        if (!diceRollModal || !diceRollModalDisplay) return;
        diceRollModal.style.display = 'flex';
        gameScreen.classList.add('dimmed');
        diceDisplayEl.style.display = 'none';
        if (!isThreeJSInitialized) {
            setupThreeJS();
            isThreeJSInitialized = true;
        }
        while (diceRollModalDisplay.firstChild) {
            diceRollModalDisplay.removeChild(diceRollModalDisplay.firstChild);
        }
        if (renderer) {
            diceRollModalDisplay.appendChild(renderer.domElement);
        } else {
            setupThreeJS();
            if (renderer) diceRollModalDisplay.appendChild(renderer.domElement);
        }
        resizeThreeJS();
    }
    function hideDiceRollModal() {
        if (!diceRollModal) return;
        if (diceRollModal.style.display === 'none') return;
        stopDiceAnimation();
        diceRollModal.style.display = 'none';
        gameScreen.classList.remove('dimmed');
        diceDisplayEl.style.display = 'block';
    }

    // === three.js セットアップ ===
    function setupThreeJS() {
        scene = new THREE.Scene();

        const containerWidth = diceRollModalDisplay.clientWidth || 300;
        const containerHeight = containerWidth / (16/9);

        camera = new THREE.PerspectiveCamera(60, containerWidth / containerHeight, 0.1, 1000);
        camera.position.set(0, DICE_SIZE * 1.5, DICE_SIZE * 4);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(containerWidth, containerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 10, 7.5);
        scene.add(directionalLight);

        diceMeshes = [];
        for (let i = 0; i < 3; i++) {
            const dice = createDiceMesh();
            dice.position.x = (i - 1) * DICE_SPACING;
            diceMeshes.push(dice);
            scene.add(dice);
        }
        console.log("Three.js scene initialized.");
    }

    // === three.js リサイズ処理 ===
    function resizeThreeJS() {
        if (!renderer || !camera || !diceRollModalDisplay) return;
        const containerWidth = diceRollModalDisplay.clientWidth;
        const containerHeight = containerWidth / (16 / 9);
        if (containerWidth > 0 && containerHeight > 0) {
            renderer.setSize(containerWidth, containerHeight);
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();
        }
    }
    window.addEventListener('resize', resizeThreeJS);


    // === サイコロの面を描画 (CanvasTexture用) ===
    function drawDiceFace(value) {
        const canvas = document.createElement('canvas');
        canvas.width = DICE_CANVAS_SIZE;
        canvas.height = DICE_CANVAS_SIZE;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = DICE_FACE_COLOR;
        ctx.fillRect(0, 0, DICE_CANVAS_SIZE, DICE_CANVAS_SIZE);

        ctx.fillStyle = DICE_DOT_COLOR;
        const c = DICE_CANVAS_SIZE / 2;
        const q = DICE_CANVAS_SIZE / 4;
        const r = DICE_DOT_RADIUS;

        const drawDot = (x, y) => {
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        };

        if (value === 1) {
            drawDot(c, c);
        } else if (value === 2) {
            drawDot(q, q);
            drawDot(3 * q, 3 * q);
        } else if (value === 3) {
            drawDot(q, q);
            drawDot(c, c);
            drawDot(3 * q, 3 * q);
        } else if (value === 4) {
            drawDot(q, q);
            drawDot(3 * q, q);
            drawDot(q, 3 * q);
            drawDot(3 * q, 3 * q);
        } else if (value === 5) {
            drawDot(q, q);
            drawDot(3 * q, q);
            drawDot(c, c);
            drawDot(q, 3 * q);
            drawDot(3 * q, 3 * q);
        } else if (value === 6) {
            drawDot(q, q);
            drawDot(3 * q, q);
            drawDot(q, c);
            drawDot(3 * q, c);
            drawDot(q, 3 * q);
            drawDot(3 * q, 3 * q);
        }

        return canvas;
    }

    // === サイコロメッシュ作成 (★ユーザー指摘の正しいマッピングに修正) ===
    function createDiceMesh(initialValue = 1) {
        const geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE);
        const textures = [
            new THREE.CanvasTexture(drawDiceFace(2)), // +X (5)
            new THREE.CanvasTexture(drawDiceFace(5)), // -X (2)
            new THREE.CanvasTexture(drawDiceFace(1)), // +Y (1)
            new THREE.CanvasTexture(drawDiceFace(6)), // -Y (6)
            new THREE.CanvasTexture(drawDiceFace(4)), // +Z (3)
            new THREE.CanvasTexture(drawDiceFace(3)), // -Z (4)
        ];
        const materials = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.6, metalness: 0.1 }));

        const mesh = new THREE.Mesh(geometry, materials);
        mesh.userData.value = initialValue;
        mesh.userData.isRolling = true;
        mesh.userData.targetQuaternion = new THREE.Quaternion().copy(mesh.quaternion);
        mesh.userData.settleStartTime = 0;
        mesh.userData.settleDuration = 800 + Math.random() * 400;
        mesh.userData.rotationSpeed = new THREE.Vector3(
            (Math.random() - 0.5) * ROTATION_SPEED * 0.5,
            (Math.random() - 0.5) * ROTATION_SPEED * 0.5 + ROTATION_SPEED * 0.5,
            (Math.random() - 0.5) * ROTATION_SPEED * 0.5
        );
        return mesh;
    }

    // === three.js アニメーションループ ===
    function startDiceAnimation() {
        if (diceAnimationId) cancelAnimationFrame(diceAnimationId);
        const clock = new THREE.Clock();
        function animateLoop() {
            diceAnimationId = requestAnimationFrame(animateLoop);
            if (!scene || !camera || !renderer || !diceMeshes || diceMeshes.length === 0) return;
            const delta = clock.getDelta();
            const elapsedTime = performance.now();
            diceMeshes.forEach((dice) => {
                if (dice.userData.isRolling) {
                    dice.rotation.x += dice.userData.rotationSpeed.x * delta * 1.5;
                    dice.rotation.y += dice.userData.rotationSpeed.y * delta * 1.5;
                    dice.rotation.z += dice.userData.rotationSpeed.z * delta * 1.5;
                } else {
                    const t = Math.min(1, (elapsedTime - dice.userData.settleStartTime) / dice.userData.settleDuration);
                    const easedT = 1 - Math.pow(1 - t, 3); // EaseOutCubic
                    dice.quaternion.slerp(dice.userData.targetQuaternion, easedT * 0.2);
                }
            });
            renderer.render(scene, camera);
        }
        animateLoop();
    }
    function stopDiceAnimation() {
        if (diceAnimationId) { cancelAnimationFrame(diceAnimationId); diceAnimationId = null; }
    }

    // === 目標の向き (Quaternion) を計算 (★ユーザー指摘のマッピングに合わせる) ===
    function getTargetQuaternionForValue(resultValue) {
        const targetQuaternion = new THREE.Quaternion();
        switch (resultValue) {
            case 4: targetQuaternion.set(0, 0, 0, 1); break; // -Z (手前) -> 4
            case 3: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); break; // +Z (奥) -> 3
            case 1: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); break; // +Y (上) -> 1
            case 6: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2); break; // -Y (下) -> 6
            case 2: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); break; // -X (左) -> 2
            case 5: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); break; // +X (右) -> 5
            default: targetQuaternion.set(0, 0, 0, 1); break; // Default: 4 facing front
        }
        return targetQuaternion;
    }


    // === ダイスロールアニメーション ===
    function animateDiceRoll(finalDice, onComplete) {
        if (!isThreeJSInitialized || !diceMeshes || diceMeshes.length !== 3 || !renderer) {
            console.error("Three.js dice not ready for animation.");
            diceRollModalDisplay.innerHTML = `<div style="font-size: 5em; color: white; text-align: center;">${finalDice.join(' ')}</div>`;
             setTimeout(onComplete, 1000);
             return;
        }
        const settleDelayBase = 1000;
        const settleDelayOffset = 400;
        diceMeshes.forEach((dice, i) => {
            dice.userData.isRolling = true;
            dice.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
            dice.userData.rotationSpeed.set(
                 (Math.random() - 0.5) * ROTATION_SPEED,
                 (Math.random() - 0.5) * ROTATION_SPEED + ROTATION_SPEED * 1.2,
                 (Math.random() - 0.5) * ROTATION_SPEED
            );
            dice.userData.targetQuaternion.copy(dice.quaternion);
        });
        startDiceAnimation();
        finalDice.forEach((value, index) => {
            const dice = diceMeshes[index];
            const settleDelay = settleDelayBase + index * settleDelayOffset;
            setTimeout(() => {
                if (dice) {
                    dice.userData.isRolling = false;
                    dice.userData.targetQuaternion = getTargetQuaternionForValue(value);
                    dice.userData.settleStartTime = performance.now();
                    dice.userData.settleDuration = 900 + Math.random() * 400;
                    console.log(`Dice ${index} settling to show ${value} on front`);
                }
            }, settleDelay);
        });
        const totalDuration = settleDelayBase + (finalDice.length - 1) * settleDelayOffset + 1500;
        setTimeout(() => {
             diceMeshes.forEach(d => {
                 d.userData.isRolling = false;
                 d.quaternion.copy(d.userData.targetQuaternion);
            });
             console.log("Dice animation complete.");
            onComplete();
        }, totalDuration);
    }
    // === 役アナウンス ===
    function announceRoleResult(hand) {
        if (centerResultAnnounceTimeout) clearTimeout(centerResultAnnounceTimeout);
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

        const noBackgroundRoles = ['role-pinzoro', 'role-shonben'];
        const resultClasses = ['result-win', 'result-lose', 'result-wave-clear', 'result-game-over'];
        if (!noBackgroundRoles.includes(centerAnnounceClass) && !resultClasses.includes(centerAnnounceClass)) {
             centerRoleAnnouncementEl.style.backgroundColor = 'rgba(20, 20, 30, 0.7)';
        } else {
             centerRoleAnnouncementEl.style.backgroundColor = 'transparent';
        }

        if (centerAnnounceClass) {
            centerRoleAnnouncementEl.textContent = centerAnnounceText;
            centerRoleAnnouncementEl.style.setProperty('--center-role-duration', `${centerDuration / 1000}s`);
            centerRoleAnnouncementEl.classList.add('role-appear', centerAnnounceClass);
            centerRoleAnnounceTimeout = setTimeout(() => { centerRoleAnnouncementEl.classList.remove('role-appear', centerAnnounceClass); centerRoleAnnouncementEl.textContent = ''; }, centerDuration);
        }
    }
    // === 勝敗アナウンス ===
    function announceRoundResult(isPlayerWin, isWaveEnd = false) {
        if (centerRoleAnnounceTimeout) clearTimeout(centerRoleAnnounceTimeout);
        if (centerResultAnnounceTimeout) clearTimeout(centerResultAnnounceTimeout);
        centerRoleAnnouncementEl.textContent = '';
        centerRoleAnnouncementEl.className = 'center-role';

        let text = '';
        let cssClass = '';
        let duration = CENTER_RESULT_DURATION;

        if (isWaveEnd) {
            if (isPlayerWin) {
                text = 'WAVE CLEAR!';
                cssClass = 'result-wave-clear';
                duration = 2500;
            } else {
                text = 'GAME OVER';
                cssClass = 'result-game-over';
                duration = 2500;
            }
        } else {
            if (isPlayerWin) {
                text = '勝ち！';
                cssClass = 'result-win';
            } else {
                text = '負け...';
                cssClass = 'result-lose';
            }
        }

        const noBackgroundResults = ['result-wave-clear', 'result-game-over'];
        if (!noBackgroundResults.includes(cssClass)) {
            centerRoleAnnouncementEl.style.backgroundColor = 'rgba(20, 20, 30, 0.7)';
        } else {
             centerRoleAnnouncementEl.style.backgroundColor = 'transparent';
        }

        centerRoleAnnouncementEl.textContent = text;
        centerRoleAnnouncementEl.style.setProperty('--center-role-duration', `${duration / 1000}s`);
        centerRoleAnnouncementEl.classList.add('role-appear', cssClass);
        centerResultAnnounceTimeout = setTimeout(() => {
            centerRoleAnnouncementEl.classList.remove('role-appear', cssClass);
            centerRoleAnnouncementEl.textContent = '';
        }, duration);
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
        if (!element) return;
        if (element.animationId) cancelAnimationFrame(element.animationId);
        const range = endScore - startScore;
        let startTime = null;
        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentScore = Math.floor(startScore + range * progress);
            if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) {
                if(element) element.textContent = `${currentScore} G`;
            } else {
                element.textContent = currentScore;
            }
            if (progress < 1) { element.animationId = requestAnimationFrame(step); }
            else {
                 if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) {
                     if(element) element.textContent = `${endScore} G`;
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
        if (change === 0 || !container) return;
        const popup = document.createElement('span');
        popup.className = 'score-change-popup';
        const sign = change > 0 ? '+' : '';
        popup.textContent = `${sign}${change}`;
        popup.classList.add(change > 0 ? 'gain' : 'loss');
        container.appendChild(popup);
        setTimeout(() => popup.remove(), SCORE_POPUP_DURATION);
    }
    // === 賭け金調整（長押し対応）(NaN対策追加) ===
    function changeBet(amount) {
        if (betInput.disabled) return;
        let cv = parseInt(betInput.value);
        if (isNaN(cv)) {
            cv = currentMinBet;
        }
        const max = parseInt(betInput.max);
        let nv = cv + amount;
        if (nv > max) nv = max;
        else if (nv < currentMinBet) nv = currentMinBet;
        if (nv !== cv) {
            betInput.value = nv;
            updateBetLimits();
        }
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
        updateBetLimits(); // 最新の状態に更新

        if (playerScore < currentMinBet) { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満のため、賭けられません。`); return; }
        if (npcScore < currentMinBet) {
            defeatedCount++;
            console.log("NPC cannot meet minimum bet when player sets bet, proceeding to shop.");
            const earnedCoins = calculateEarnedCoins();
            calculateAndAwardCoins();
            setMessage(`相手の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`);
            announceRoundResult(true, true);
            updateUI();
            // ★ コントロール要素非表示
            if (betMainControls) betMainControls.style.display = 'none';
            if (betActionContainer) betActionContainer.style.display = 'none';
            if (actionArea) actionArea.style.display = 'none';
            if (nextWaveArea) nextWaveArea.style.display = 'flex';
            currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
            activeCardUses = {}; keepParentRightUsedThisWave = 0;
            return;
        }

        let bv = parseInt(betInput.value);
        if (isNaN(bv)) { // ★ NaN チェック
            setMessage(`無効な賭け金です。`);
            betInput.value = currentMinBet;
            updateBetLimits();
            return;
        }
        const maxBet = parseInt(betInput.max);

        if (bv >= currentMinBet && bv <= maxBet) {
            currentBet = bv;
            if(riskyBetActive) {
                 const riskyCard = playerCards.find(c => c.id === 'riskyBet');
                 if(riskyCard) {
                     currentBet *= 2;
                     currentBet = Math.min(currentBet, npcScore);
                     console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`);
                     activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1;
                 }
                 riskyBetActive = false;
                 updateUI();
            }

            isGameActive = true; isPlayerTurn = true;
            currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: あなた)</span>`;
            setMessage(`賭け金 ${currentBet} で勝負！ あなた(親)がサイコロを振ってください。`);
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true; // MINボタンも無効化
            rollButton.disabled = false; historyButton.disabled = false; // 履歴ボタン有効化
            updateUI();
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
    // MINベットボタン
    minBetButton.addEventListener('click', () => {
        if (betInput.disabled) return; // 入力不可なら何もしない
        betInput.value = currentMinBet; // 入力値を最低賭け金に設定
        updateBetLimits(); // ボタンの状態等を更新
    });

    // サイコロを振るボタン (three.js版 - 結果表示追加)
    rollButton.addEventListener('click', async () => {
        if (playerScore <= 0) { checkGameEnd(); return; }
        if (!isGameActive || !isPlayerTurn || diceAnimationId || waitingForUserChoice) return;

        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const maxSoulRollUses = soulRollCard ? 1 : 0;
        const canUseSoulRoll = soulRollCard && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUses;

        if (canUseSoulRoll) {
             setMessage("振り残り回数がありません。「魂の一振り」を使用しますか？");
             updateCardButtonHighlight(); // カードボタン更新
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
        historyButton.disabled = true; // ロール中は履歴非表示
        setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 振っています...`);
        showDiceRollModal();
        updateUI();

        const soulRollLvFor判定 = soulRollUsedThisTurn ? (soulRollCard?.level || 0) : 0;

        console.log(`Before roll: blessingActive=${blessingDiceActive}, zoroUpActive=${zoroChanceUpActive}, avoidActive=${avoid123_456Active}`);
        const finalDice = rollDice(false, 0, soulRollLvFor判定);

        animateDiceRoll(finalDice, async () => {
            playerDice = finalDice;
            if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
            hideDiceRollModal();
            diceDisplayEl.textContent = finalDice.join(' ');

            console.log(`Before getHandResult: avoidActive=${avoid123_456Active}`);
            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Player Rolled:", playerDice, "Hand:", playerHand);
            updateUI();
            highlightHand(playerHandEl, playerHand);

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
                 const rewardAmplifierCard = playerCards.find(c => c.id === 'rewardAmplifier');
                 const maxRewardUses = rewardAmplifierCard ? (rewardAmplifierCard.level >= 3 ? 2 : 1) : 0;
                 const canUseReward = playerHand.type === '役' && rewardAmplifierCard && !rewardAmplifierActive && (activeCardUses['rewardAmplifier'] || 0) < maxRewardUses;


                let proceedToNextTurn = true;

                // --- カード使用選択肢 (優先度: 調整 > ネクストチャンス > ダブルアップ > 報酬増幅) ---
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
                if (proceedToNextTurn && canUseNextChance) {
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
                        await handleActiveCardUse('doubleUpBet'); // IDで呼び出し
                        return; // handleActiveCardUse内でターン進行管理
                    } else {
                        setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                        proceedToNextTurn = true;
                    }
                }
                 if (proceedToNextTurn && canUseReward) {
                     setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「報酬増幅」を使用しますか？`, true);
                     proceedToNextTurn = false;
                     const useReward = await waitForUserChoice();
                     if (useReward) {
                          await handleActiveCardUse('rewardAmplifier'); // IDで呼び出し
                     } else {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！ 報酬増幅を使用しませんでした。`);
                     }
                     proceedToNextTurn = true;
                 }

                // --- 選択肢ここまで ---

                if (proceedToNextTurn) {
                    isPlayerTurn = false;
                    if (canUseBlindingNow && isPlayerParent) {
                        setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                        isPlayerTurn = true;
                        updateCardButtonHighlight();
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
                         } else {
                             await handleActiveCardUse('giveUpEye'); // IDで呼び出し
                             return; // handleActiveCardUse内でターン進行管理
                         }
                     } else {
                         setMessage(msg);
                     }
                 } else { // 振り切り＆目なし
                      const soulRollCardCheck = playerCards.find(c => c.id === 'soulRoll');
                      const maxSoulRollUses = soulRollCardCheck ? 1 : 0;
                      const canUseSoulRollFinal = soulRollCardCheck && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUses;
                     if (canUseSoulRollFinal) {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 振り直し回数がありません。「魂の一振り」を使用しますか？`);
                         rollButton.disabled = true;
                         updateCardButtonHighlight();
                     } else {
                         playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                         updateUI();
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                         highlightHand(playerHandEl, playerHand);
                         isPlayerTurn = false;
                         setTimeout(handleRoundEnd, 800);
                     }
                 }
            }
            historyButton.disabled = false; // ロール終了時に履歴ボタン有効化
            updateCardButtonHighlight(); // ★ ロール後のカード使用状況を反映
        }); // animateDiceRoll callback end
    }); // rollButton listener end

    nextWaveButton.addEventListener('click', openShop);
    restartSameDifficultyButton.addEventListener('click', () => { initGame(true); showScreen('game-screen'); });
    changeDifficultyButton.addEventListener('click', () => { showScreen('title-screen'); });
    historyButton.addEventListener('click', () => { if (diceAnimationId || waitingForUserChoice) return; displayHistory(); historyModal.style.display = 'block'; });
    closeHistoryModalButton.addEventListener('click', () => { historyModal.style.display = 'none'; });
    closeCardListModalButton.addEventListener('click', () => cardListModal.style.display = 'none');
    closeDiceRollModalButton.addEventListener('click', hideDiceRollModal);


     // === NPCターン ===
     function npcTurn() {
        if (!isGameActive || isPlayerTurn || diceAnimationId || waitingForUserChoice) return;

        npcRollCount++;
        historyButton.disabled = true; // NPCターン中も履歴非表示
        setMessage(`相手(${!isPlayerParent ? '親' : '子'}): 振っています...`);
        showDiceRollModal();
        updateUI();

        const blindingLevel = blindingDiceActive ? (playerCards.find(c => c.id === 'blindingDice')?.level || 0) : 0;

        const finalDice = rollDice(true, blindingLevel, 0);

        animateDiceRoll(finalDice, () => {
            npcDice = finalDice;
            if(npcDiceEl) npcDiceEl.textContent = npcDice.join(' ');
            hideDiceRollModal();
            diceDisplayEl.textContent = finalDice.join(' ');

            const result = getHandResult(npcDice, true, blindingLevel, 0);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            npcHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("NPC Rolled:", npcDice, "Hand:", npcHand);

            let forcedReroll = false;
            if (blindingDiceActive && npcHand.type === '目なし') {
                  console.log("Blinding Dice forced reroll, NPC continues turn...");
                  forcedReroll = true;
                  setMessage(`相手(${!isPlayerParent ? '親' : '子'}): 目なし。目くらましで再度振ります...`);
                  setTimeout(npcTurn, 1000);
                  return;
             }
             if (blindingDiceActive && !forcedReroll) {
                 blindingDiceActive = false;
                 activeCardUses['blindingDice'] = (activeCardUses['blindingDice'] || 0) + 1;
                 console.log(`Used blindingDice. Remaining uses: ${getRemainingUses('blindingDice')}`);
                 updateCardButtonHighlight();
             }

            updateUI(); highlightHand(npcHandEl, npcHand);

            if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
                const handName = getHandDisplayName(npcHand);
                isPlayerTurn = true; // プレイヤーのターンへ
                historyButton.disabled = false; // プレイヤー操作可能になったら履歴ボタン有効化

                if (!isPlayerParent && npcHand.type !== 'ションベン') { // NPCが親で、ションベン以外
                    setMessage(`相手(親): ${handName}！ あなた(子)の番です。`);
                    rollButton.disabled = false; // 子は振れる
                    updateCardButtonHighlight(); // ★ カードボタン更新
                } else { // NPCが子、またはどちらかがションベン
                    setMessage(`相手(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : 'あなたの勝ちです。') : '勝負！'}`);
                     rollButton.disabled = true; // 勝負が決まったのでロールボタン無効化
                    setTimeout(handleRoundEnd, 1000);
                }
            } else if (npcHand.type === '目なし') {
                if (npcRollCount < BASE_MAX_ROLLS) {
                    setMessage(`相手(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`);
                    setTimeout(npcTurn, 1000);
                } else {
                    npcHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                    updateUI();
                    setMessage(`相手(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : 'あなたの勝ちです。'}`);
                    highlightHand(npcHandEl, npcHand);
                    isPlayerTurn = true; // プレイヤーのターンへ
                    rollButton.disabled = true; // 勝負が決まったのでロールボタン無効化
                    historyButton.disabled = false; // 結果が出たので履歴ボタン有効化
                    setTimeout(handleRoundEnd, 800);
                }
            }
             updateCardButtonHighlight(); // ★ プレイヤーのターンになったので更新
        }); // animateDiceRoll callback end
    }

    // === 親権維持確認関数 ===
    async function askKeepParentRight(cardLevel) {
        const maxKeepUses = (cardLevel >= 2 ? 2 : 1);
        const usedCount = activeCardUses['keepParentalRight'] || 0;
        setMessage(`親権維持カード(Lv.${cardLevel})を使用しますか？ (WAVE中 残り${maxKeepUses - usedCount}回)`, true);
        const useCard = await waitForUserChoice();
        return useCard;
    }

    // === ラウンド終了処理 (勝敗演出追加, ★NPC連勝ボーナス修正) ===
    async function handleRoundEnd() {
        if (waitingForUserChoice) return;

        isGameActive = false; rollButton.disabled = true;
        historyButton.disabled = false; // ラウンド終了時に履歴ボタンを有効化

        let pWin = false, nWin = false, draw = false, msg = "", sc = 0, rClass = 'draw';
        let parentChanged = false; let preventParentChange = false; let parentKeptByCard = false;
        const parentBefore = isPlayerParent ? 'Player' : 'NPC';
        const playerInitialScore = playerScore;
        const npcInitialScore = npcScore;

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
        const keepRightUsesCount = activeCardUses['keepParentalRight'] || 0;
        if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) {
            const useKeepRight = await askKeepParentRight(keepRightCard.level);
            if (useKeepRight) {
                preventParentChange = true; parentKeptByCard = true;
                if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; }
                console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} 発動！ (${keepRightUsesCount + 1}/${maxKeepUses}回使用)`);
                 activeCardUses['keepParentalRight'] = (activeCardUses['keepParentalRight'] || 0) + 1;
                 updateCardButtonHighlight();
            }
        }

        // ★ 連勝カウント修正
        if (pWin && isPlayerParent) { consecutiveWins++; npcConsecutiveWins = 0; }
        else if (nWin && !isPlayerParent) { npcConsecutiveWins++; consecutiveWins = 0; } // NPCが親で勝った場合
        else if (pWin && !isPlayerParent) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = true; }
        else if (nWin && isPlayerParent && !preventParentChange) { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = false; }
        else if (nWin && isPlayerParent && preventParentChange) { consecutiveWins = 0; } // 親維持してもプレイヤー連勝は途切れる
        else if (nWin && !isPlayerParent) { consecutiveWins = 0;} // NPC親勝利時、プレイヤー連勝はリセット
        else { consecutiveWins = isPlayerParent ? consecutiveWins : 0; npcConsecutiveWins = !isPlayerParent ? npcConsecutiveWins : 0; } // 引き分けの場合


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
             if (spiritCard) { const conditionMet = (spiritCard.level < 3 && playerInitialScore <= npcInitialScore / 2) || (spiritCard.level >= 3 && playerInitialScore <= npcInitialScore); if (conditionMet) { const spiritMultiplier = [1.2, 1.4, 1.6][spiritCard.level - 1]; baseScoreChange *= spiritMultiplier; console.log(`Card Effect: 逆境の魂 Lv.${spiritCard.level}適用！ 獲得点数 x${spiritMultiplier}`); } }

             if (doubleUpBetActive && !isPlayerParent) {
                 const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                 const winMultiplier = [2, 2.5, 3][(doubleUpCard?.level || 1) - 1];
                 baseScoreChange *= winMultiplier; console.log(`Card Effect: ダブルアップ Lv.${doubleUpCard?.level} 成功！ Win Multiplier x${winMultiplier}`);
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
                 baseScoreChange = - (currentBet * lossMultiplier); // ★ 支払い額の計算なのでマイナスをつける
                 console.log(`Card Effect: 一撃保険 Lv.${insuranceCard.level}適用！ Loss Multiplier: ${lossMultiplier}`);
             } else {
                 npcPayoutMultiplier = npcHand?.payoutMultiplier || 1;
                 if (playerHand?.name === ROLES.HIFUMI.name) { npcPayoutMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier); }
                 else if (npcHand?.name === ROLES.HIFUMI.name) { npcPayoutMultiplier = 1; } // NPCヒフミ負けは等倍
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
                 doubleUpBetActive = false;
             }

             let npcWinBonusMultiplier = 1.0;
             if (!isPlayerParent && npcConsecutiveWins > 0) {
                 npcWinBonusMultiplier = 1 + npcConsecutiveWins * CONSECUTIVE_WIN_BONUS_RATE;
                 console.log(`NPC Win Streak Bonus Applied: x${npcWinBonusMultiplier.toFixed(2)} (${npcConsecutiveWins} wins)`);
             }
             sc = Math.round(baseScoreChange * npcWinBonusMultiplier); // ★ ボーナスを適用

             msg = playerHand?.type === 'ションベン' ? "ションベンで敗北..." : `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             if (insuranceCard) msg += ` (一撃保険適用)`;
             if (!isPlayerParent && npcConsecutiveWins > 1) msg += ` (相手${npcConsecutiveWins}連勝中...)`; // ★ メッセージ追加
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

        const psEnd = Math.max(0, playerInitialScore + sc);
        const nsEnd = Math.max(0, npcInitialScore - sc);
        playerScore = psEnd; npcScore = nsEnd;
        totalScoreChange += sc;
        if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); }
        animateScore(playerScoreEl, playerInitialScore, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, npcInitialScore, nsEnd, SCORE_ANIMATION_DURATION);

        addHistoryEntry({
            wave: currentWave,
            round: currentRoundInWave,
            playerDice: playerDice.join(','),
            playerHandName: getHandDisplayName(playerHand),
            npcDice: npcDice.join(','),
            npcHandName: getHandDisplayName(npcHand),
            result: rClass,
            scoreChange: sc,
            consecutiveWins: consecutiveWins,
            npcConsecutiveWins: npcConsecutiveWins,
            parentBefore: parentBefore,
            betAmount: currentBet
        });

        // 勝敗演出を追加
        if (!draw) {
            announceRoundResult(pWin, false);
        }

        setTimeout(() => {
            let finalMsg = `${msg} ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`;
            if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? 'あなた' : '相手'}が親です。`; }
            else if (parentKeptByCard) { finalMsg += " (親権維持発動！)"; }
            setMessage(finalMsg); updateUI(); checkGameEnd();
        }, SCORE_ANIMATION_DURATION + 300 + (draw ? 0 : CENTER_RESULT_DURATION)); // 勝敗演出分待つ

        // === ラウンド終了時フラグリセット ===
        rewardAmplifierActive = false;
        giveUpEyeUsedThisTurn = false;
        adjustEyeUsedThisTurn = false;
        nextChanceUsedThisTurn = false;
        soulRollUsedThisTurn = false;
        doubleUpBetActive = false;
    } // handleRoundEnd 関数の終わり

    // === ゲーム終了チェック (勝敗演出追加) ===
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
                calculateAndAwardCoins();
                announceRoundResult(true, true);
                setMessage(`NPC撃破！ コイン ${earnedCoins} G獲得！ ショップへどうぞ！`);
                updateUI();
                // ★ コントロール要素非表示
                if (betMainControls) betMainControls.style.display = 'none';
                if (betActionContainer) betActionContainer.style.display = 'none';
                if (actionArea) actionArea.style.display = 'none';
                if (nextWaveArea) nextWaveArea.style.display = 'flex';
                currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
                activeCardUses = {}; keepParentRightUsedThisWave = 0;
                return;
            }
        }

        if (isGO || isC) {
            console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`);
            isGameActive = false;
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; historyButton.disabled = false; maxBetButton.disabled = true; minBetButton.disabled = true; // MINも無効化
            currentBetInfoEl.textContent = '';
            announceRoundResult(isC, true);
            if(isC) calculateAndAwardCoins();
             // ★ コントロール要素非表示
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
             if (nextWaveArea) nextWaveArea.style.display = 'none'; // ゲーム終了時は非表示
            setTimeout(() => {
                showResultScreen(isC, playerScore, currentWave, gameOverReason);
            }, 2500);
        } else {
            console.log("Round end, continuing game.");
            startBettingPhase();
        }
    } // checkGameEnd 関数の終わり

    // === コイン計算 (バランス調整) ===
    function calculateEarnedCoins() {
        const waveBonus = currentWave * 20;
        const defeatBonus = 80;
        const scoreGainInWave = Math.max(0, playerScore - scoreAtWaveStart);
        const scoreGainBonus = Math.min(30, Math.floor(scoreGainInWave * 0.05));
        const overkillBonus = npcScore < 0 ? Math.min(50, Math.floor(Math.abs(npcScore) * 0.2)) : 0;
        const roundsTaken = Math.max(1, currentRoundInWave);
        const roundPenalty = Math.max(0, (roundsTaken - 1) * 20);

        const baseEarned = waveBonus + defeatBonus + scoreGainBonus + overkillBonus - roundPenalty;
        const earned = Math.min(300, Math.max(10, baseEarned));

        console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`);
        return earned;
    }
    // === コイン獲得処理とアニメーション ===
    function calculateAndAwardCoins() {
        const earned = calculateEarnedCoins();
        if (earned <= 0) return;

        const startCoins = playerCoins;
        playerCoins += earned;
        console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`);
        playCoinAnimation(earned);
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        if (shopScreen.classList.contains('active')) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        }
    }
    // === コイン獲得アニメーション再生 ===
    function playCoinAnimation(amount) {
        // gameCoinDisplayEl が存在しない場合は何もしない
        if (!gameCoinDisplayEl || amount <= 0) return;

        const numCoins = Math.min(20, Math.max(5, Math.floor(amount / 10)));
        const targetRect = gameCoinDisplayEl.getBoundingClientRect();
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';

            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 150;
            const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 150;
            coin.style.left = `${startX}px`;
            coin.style.top = `${startY}px`;

            const deltaX = targetX - startX;
            const deltaY = targetY - startY;
            coin.style.setProperty('--tx', `${deltaX}px`);
            coin.style.setProperty('--ty', `${deltaY}px`);

            coin.style.animationDelay = `${Math.random() * 0.4}s`;

            document.body.appendChild(coin); // body直下に追加

            coin.addEventListener('animationend', () => {
                if (coin.parentNode) {
                    coin.remove();
                }
            }, { once: true });
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
    // === 履歴追加・表示 (親表示、賭け金表示、勝敗テキスト修正) ===
    function addHistoryEntry(entry) { gameHistory.push(entry); }
    function displayHistory() {
        historyLogEl.innerHTML = '';
        if (gameHistory.length === 0) { historyLogEl.innerHTML = '<li>履歴なし</li>'; return; }
        [...gameHistory].reverse().forEach(e => {
            const li = document.createElement('li');
            li.className = e.result;

            // 勝敗テキストとクラス
            let resultText = '';
            let resultClass = '';
            if (e.result === 'win') { resultText = '勝ち'; resultClass = 'history-win'; }
            else if (e.result === 'lose') { resultText = '負け'; resultClass = 'history-lose'; }
            else { resultText = '引き分け'; resultClass = 'history-draw'; }

            const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : '';
            const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : ''; // スタイルはCSSで統一
            const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${e.npcConsecutiveWins}連敗...)</span>` : '';

            // 親表示
            const parentStr = e.parentBefore ? `<span class="parent-info">(親: ${e.parentBefore === 'Player' ? 'あなた' : '相手'})</span>` : '';
            // 賭け金表示
            const betStr = e.betAmount > 0 ? `<span class="bet-amount">賭け金: ${e.betAmount}</span>` : '';

            // WAVE/ROUND 色分け
            li.innerHTML = `
                <span class="wave-num">
                    <span class="wave-highlight">WAVE ${e.wave}</span> -
                    <span class="round-normal">ROUND ${e.round}</span> ${parentStr}
                </span>
                <div class="details">
                    <div><span class="history-result ${resultClass}">${resultText}</span> あなた: ${e.playerDice} <span class="hand">${e.playerHandName}</span></div>
                    <div class="npc-history">相手: ${e.npcDice} <span class="hand">${e.npcHandName}</span> ${betStr}</div>
                </div>
                <div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div>
            `;
            historyLogEl.appendChild(li);
        });
    }

    // --- カード一覧HTML生成関数 ---
    function generateSettingsCardListHtml() {
        if (!settingsCardListInner) return;
        settingsCardListInner.innerHTML = '';

        const sortedCards = [...allCards].sort((a, b) => {
            if (a.rarity !== b.rarity) return b.rarity - a.rarity;
            if (a.type !== b.type) return a.type.localeCompare(b.type);
            return a.name.localeCompare(b.name, 'ja');
        });

        sortedCards.forEach(card => {
            const item = document.createElement('div');
            item.className = 'card-list-item';

            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
            const typeName = getCardTypeName(card.type);
            const typeClass = `type-${card.type}`;
            const rarityClass = `rarity-${rarityText}`;

            item.innerHTML = `
                <h3>
                    ${card.name}
                    <span class="card-meta">
                        <span class="${typeClass}">${typeName}</span>
                        <span class="${rarityClass}">★${rarityText}</span>
                    </span>
                </h3>
                <p class="flavor-text">${card.flavor || '---'}</p>
                <div class="effect-details">
                    <p><strong>Lv.1:</strong> ${getUpgradeDescription(card, 1)}</p>
                    ${(card.rarity > 1 || MAX_CARD_LEVEL > 1) ? `<p><strong>Lv.2:</strong> ${getUpgradeDescription(card, 2)}</p>` : ''}
                    ${(card.rarity > 1 && MAX_CARD_LEVEL >= 3) ? `<p><strong>Lv.3:</strong> ${getUpgradeDescription(card, 3)}</p>` : ''}
                </div>
            `;
            settingsCardListInner.appendChild(item);
        });
    }

    // --- カード一覧モーダル表示関数 (古いモーダル用、呼び出し箇所は削除済) ---
    function showCardListModal() {
        console.warn("showCardListModal is deprecated. Use settings modal instead.");
    }


    // --- ショップ関連 ---
    function openShop() {
        console.log("Opening shop...");
        scoreAtWaveStart = playerScore;
        if(nextWaveArea) nextWaveArea.style.display = 'none';
        purchasedOrUpgradedInShop = [];
        setShopMessage(DEFAULT_SHOP_MESSAGE);
        const exchangeCard = playerCards.find(card => card.id === 'handExchange');
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 2 ? 2 : 1) : 0;
        activeCardUses['handExchangeFreeRerollCount'] = 0;

        console.log(`Hand Exchange Card Lv.${exchangeCard?.level}, Free rerolls for this visit: ${freeRerollsAvailableThisShopVisit}`);
        applyPlayerCardEffects();
        displayShopOffers();
        shopChoicePlus1Active = false; // ショップ選択肢増加は表示後にリセット
        updateShopUI();
        const existingConfirmation = document.getElementById('shop-confirmation-buttons');
        if (existingConfirmation) existingConfirmation.remove();
        if(shopActionsEl) shopActionsEl.style.display = 'flex';

        showScreen('shop-screen');
    }
    function closeShop() {
        console.log("Closing shop, proceeding to next wave.");
        consecutiveWins = 0; npcConsecutiveWins = 0;
        currentWave++;

        playerScore = INITIAL_PLAYER_SCORE;
        scoreAtWaveStart = INITIAL_PLAYER_SCORE;

        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        currentMinBet = baseMinBet;
        npcScore = NPC_START_SCORE_BASE + defeatedCount * npcScoreIncrement;
        isPlayerParent = true;
        playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
        // ★ コントロール要素表示
        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';

        rollButton.disabled = true; historyButton.disabled = false;
        activeCardUses = {}; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false;
        applyPlayerCardEffects(); // 次のWAVEに向けてカード効果を再適用
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
        const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (choiceCard) {
             numOffers += 1;
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
            let cardNameHtml = cardData.name; let descriptionHtml = cardData.flavor;
            let levelSpan = '';

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
            } else { // 未所持
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
            default: return cardData.flavor || '---';
        }
    }
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } }

    // ショップUI更新
    function updateShopUI() {
        if (shopCoinDisplayEl) shopCoinDisplayEl.textContent = playerCoins;
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
                 button.style.display = 'inline-block';
            } else if (!offerData.isOwned) {
                 button.disabled = playerCoins < cost;
                 button.dataset.cost = cost;
                 if (costDisplayEl) costDisplayEl.textContent = `${cost} G`;
                 button.style.display = 'inline-block';
            } else {
                button.disabled = true;
                 button.style.display = 'none';
                if (costDisplayEl) costDisplayEl.textContent = '最大Lv';
            }
        });

        let currentRerollCost = REROLL_COST;
        const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (shopChoiceCard) {
             if (shopChoiceCard.level === 2) currentRerollCost = Math.max(0, REROLL_COST - 10);
             else if (shopChoiceCard.level >= 3) currentRerollCost = 0;
        }

        let rerollButtonText = "";
        let rerollDisabled = false;

        const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange');
        const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0;
        const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

        if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) {
            rerollButtonText = `無料リロール (${currentFreeRerollsAvailable - usedFreeRerollsThisVisit}回)`;
            currentRerollCost = 0;
            rerollDisabled = false;
        } else {
            rerollButtonText = `リロール (${currentRerollCost} G)`;
            rerollDisabled = playerCoins < currentRerollCost;
        }

        if (shopRerollCostEl) shopRerollCostEl.textContent = currentRerollCost;
        if (shopRerollButton) {
            shopRerollButton.innerHTML = `<span class="reroll-icon">↻</span> ${rerollButtonText}`;
            shopRerollButton.disabled = rerollDisabled;
        }
    }
    // カード購入/強化処理
    function handleBuyCard(event) {
        const button = event.target;
        const cardId = button.dataset.cardId;
        const action = button.dataset.action;
        const cost = parseInt(button.dataset.cost || '0');
        const offerData = currentShopOffers.find(offer => offer.id === cardId);
        if (!offerData) return;

        const actualCost = cost;

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

        const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange');
        const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0;
        const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

        if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) {
            activeCardUses['handExchangeFreeRerollCount'] = usedFreeRerollsThisVisit + 1;
            setShopMessage(`無料リロールを使用しました！ (本日残り ${currentFreeRerollsAvailable - activeCardUses['handExchangeFreeRerollCount']} 回)`);
            console.log(`Used free reroll. Total free used this visit: ${activeCardUses['handExchangeFreeRerollCount']}`);
        } else {
            if (playerCoins < actualRerollCost) { setShopMessage("リロールするためのコインが足りません！"); return; }
            playerCoins -= actualRerollCost;
            setShopMessage(DEFAULT_SHOP_MESSAGE);
            console.log(`Paid ${actualRerollCost}G for reroll.`);
        }
        purchasedOrUpgradedInShop = [];
        console.log("Rerolled shop offers.");
        displayShopOffers();
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
        const newCardDefinition = cardToDiscardFor;
        if (!newCardDefinition) return;

        removePlayerCardEffect(discardedCardId);
        playerCoins += sellPrice;
        console.log(`Sold card ${discardedCardId} for ${sellPrice}G.`);

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
    function setShopMessage(msg) {
        if (shopMessageEl) shopMessageEl.textContent = msg;
    }
    // 手札から直接売却
    async function handleSellCard(event) {
        const button = event.target;
        const cardId = button.dataset.cardId;
        const sellPrice = parseInt(button.dataset.sellPrice || '0');
        const cardName = button.dataset.cardName || cardId;
        const cardLevel = button.dataset.cardLevel || '?';

        setShopMessage(`${cardName} [Lv.${cardLevel}] を ${sellPrice}G で売却しますか？`);
        if (shopActionsEl) shopActionsEl.style.display = 'none';

        let confirmationContainer = document.getElementById('shop-confirmation-buttons');
        if (confirmationContainer) {
            confirmationContainer.remove();
        }
        confirmationContainer = document.createElement('div');
        confirmationContainer.id = 'shop-confirmation-buttons';
        confirmationContainer.className = 'shop-actions';
        if (shopActionsEl && shopActionsEl.parentNode) {
            shopActionsEl.parentNode.insertBefore(confirmationContainer, shopActionsEl.nextSibling);
        } else {
            const shopContent = document.querySelector('.shop-content');
            if(shopContent) shopContent.appendChild(confirmationContainer);
            console.warn("#shop-actions not found, appending confirmation buttons to .shop-content");
        }

        const confirmButton = document.createElement('button');
        confirmButton.textContent = '売却';
        confirmButton.className = 'button-pop';
        confirmButton.style.backgroundColor = '#d9534f';
        confirmButton.onclick = () => handleShopConfirmation(true);
        confirmationContainer.appendChild(confirmButton);

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'キャンセル';
        cancelButton.className = 'button-subtle';
        cancelButton.onclick = () => handleShopConfirmation(false);
        confirmationContainer.appendChild(cancelButton);

        const confirmSell = await waitForShopConfirmation();

        if (confirmSell) {
            removePlayerCardEffect(cardId);
            playerCoins += sellPrice;
            setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`);
            console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
            updateShopUI();
        } else {
            setShopMessage(DEFAULT_SHOP_MESSAGE);
        }
    }


    // --- 設定モーダル関連 ---
    if (settingsButton && settingsModal) {
        settingsButton.addEventListener('click', () => {
            settingsModal.style.display = 'flex';
            switchSettingsTab('rules');
        });
    }
    if (closeSettingsModalButton && settingsModal) {
        closeSettingsModalButton.addEventListener('click', () => {
            settingsModal.style.display = 'none';
        });
    }
    window.addEventListener('click', (event) => {
        if (settingsModal && event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (historyModal && event.target === historyModal) historyModal.style.display = 'none';
        if (cardListModal && event.target === cardListModal) cardListModal.style.display = 'none';
        if (discardModal && event.target === discardModal) cancelDiscard();
        if (diceChoiceOverlay && event.target === diceChoiceOverlay) hideDiceChoiceOverlay();
        if (cardActionModal && event.target === cardActionModal) {
             cardActionModal.style.display = 'none';
        }
    });
    settingsNavButtons.forEach(button => {
        if (button.dataset.target) {
             button.addEventListener('click', () => {
                 const targetId = button.dataset.target;
                 switchSettingsTab(targetId);
             });
        }
    });
    if (settingsCardListButton) {
        settingsCardListButton.addEventListener('click', () => {
            switchSettingsTab('card-list');
        });
    }
    function switchSettingsTab(targetId) {
        if (!settingsContent) return;
        settingsNavButtons.forEach(btn => btn.classList.remove('active'));
        const contents = settingsContent.querySelectorAll('.settings-tab-content');
        contents.forEach(content => content.classList.remove('active'));

        const activeButton = document.querySelector(`.settings-nav-button[data-target="${targetId}"]`) || document.getElementById('settings-card-list-button');
        if (activeButton && (activeButton.dataset.target === targetId || (targetId === 'card-list' && activeButton.id === 'settings-card-list-button'))) {
             activeButton.classList.add('active');
        }

        if (targetId === 'card-list') {
            generateSettingsCardListHtml();
        }

        const activeContent = document.getElementById(`settings-${targetId}-content`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }

    // --- カード画面モーダル関連 ---
    function openCardActionModal() {
        if (!cardActionModal) return;
        console.log("Opening Card Action Modal");
        displayCardsInModal();
        cardActionModal.style.display = 'flex';
    }
    function displayCardsInModal() {
        if (!cardActionDisplay || !cardActionMessage) return;

        cardActionDisplay.innerHTML = '';
        let usableCardFound = false;

        if (playerCards.length === 0) {
            cardActionMessage.textContent = "手札にカードがありません。";
            return;
        }

        playerCards.forEach(cardData => {
            const card = allCards.find(c => c.id === cardData.id);
            if (!card) return;

            const cardElement = document.createElement('div');
            const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
            cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass}`;
            cardElement.dataset.cardId = cardData.id;

            const isUsable = checkCardUsability(cardData.id);
            const remainingUses = getRemainingUses(cardData.id);
            const totalUses = getTotalUses(cardData.id);
            const isPassive = !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag);

            let usesHtml = '';
            if (card.usesPerWave && totalUses !== Infinity) {
                usesHtml = `<div class="card-action-uses">残 ${remainingUses} / ${totalUses} 回</div>`;
            } else if (isPassive) {
                 usesHtml = `<div class="card-action-uses" style="color: #aaa;">(パッシブ)</div>`;
            }

            let buttonHtml = '';
            if (card.usesPerWave) {
                buttonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`;
            }

            if (isPassive) { cardElement.classList.add('passive'); }
            else if (!card.usesPerWave) {}
            else if (isUsable) { cardElement.classList.add('usable'); usableCardFound = true; }
            else if (remainingUses <= 0) { cardElement.classList.add('used-up'); }
            else { cardElement.classList.add('not-usable'); }

            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
            const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
            const levelSpan = `<span class="card-level">[Lv.${cardData.level}]</span>`;
            const cardNameHtml = `${card.name} ${levelSpan}`;
            const cardInnerHtml = `
                <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                ${rarityBadgeHtml}
                <h3 class="card-name">${cardNameHtml}</h3>
                <p class="card-description">${getUpgradeDescription(card, cardData.level)}</p>
                ${usesHtml}
                ${buttonHtml}
            `;
            cardElement.innerHTML = cardInnerHtml;

            if (card.image) {
                 cardElement.style.backgroundImage = `url('${card.image}')`;
                 cardElement.style.backgroundSize = 'cover';
                 cardElement.style.backgroundPosition = 'center';
            }

            cardActionDisplay.appendChild(cardElement);
        });

        if (usableCardFound) { cardActionMessage.textContent = "使用したいカードを選択してください。"; }
        else if (playerCards.length > 0) { cardActionMessage.textContent = "現在使用できるカードはありません。"; }
    }
    if (closeCardActionModalButton && cardActionModal) {
        closeCardActionModalButton.addEventListener('click', () => {
            cardActionModal.style.display = 'none';
        });
    }
    if(cardActionDisplay) {
        cardActionDisplay.addEventListener('click', async (event) => {
            if (event.target.matches('.use-card-button:not(:disabled)')) {
                const cardId = event.target.dataset.cardId;
                if (cardId) {
                    cardActionModal.style.display = 'none';
                    await handleActiveCardUse(cardId);
                    updateCardButtonHighlight();
                }
            }
        });
    }
    if (cardActionButton) {
        cardActionButton.addEventListener('click', openCardActionModal);
    }

    // アクティブカード使用処理
    async function handleActiveCardUse(event) {
        let cardElement = null;
        let cardId = null;

        if(event && event.currentTarget && event.currentTarget.dataset.cardId){
            cardElement = event.currentTarget;
            cardId = cardElement.dataset.cardId;
        } else if (typeof event === 'string') {
            cardId = event;
        } else {
            console.error("Invalid event or cardId passed to handleActiveCardUse", event);
            return;
        }

        const playerCardData = playerCards.find(c => c.id === cardId);
        const isUsableNow = checkCardUsability(cardId);

        if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !isUsableNow) {
             console.log(`Card ${cardId} cannot be used now. Active: ${activeCardBeingUsed}, Waiting: ${waitingForUserChoice}, Usable: ${isUsableNow}`);
             return;
        }

        const card = allCards.find(c => c.id === cardId);
        if (!card) return;

        console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
        activeCardBeingUsed = cardId;
        setMessage(`カード「${card.name}」を使用します...`);

        let useConsumed = true;
        let requiresDelay = false;
        let turnProceed = true;

        // --- カード効果分岐 ---
        if (['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
            showDiceChoiceOverlay(cardId);
            useConsumed = false;
            turnProceed = false;
        } else if (cardId === 'ignoreMinBet') {
            ignoreMinBetActive = true; updateUI(); updateBetLimits();
            setMessage(`最低賭け金が1になりました。`);
            requiresDelay = true;
             turnProceed = false;
        } else if (cardId === 'zoroChanceUp') {
            zoroChanceUpActive = true; setMessage(`次のロールでゾロ目確率UP！`);
            requiresDelay = true;
             turnProceed = false;
        } else if (cardId === 'avoid123_456') {
            avoid123_456Active = true; setMessage(`次のロールでヒフミ/シゴロ${playerCardData.level >= 2 ? '/ションベン' : ''}を回避します。`);
            requiresDelay = true;
             turnProceed = false;
        } else if (cardId === 'blessingDice') {
            blessingDiceActive = true; setMessage(`次のロールで6が出やすくなります。`);
            requiresDelay = true;
             turnProceed = false;
        } else if (cardId === 'stormWarning') {
             stormWarningActive = true; setMessage(`次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`);
             requiresDelay = true;
              turnProceed = false;
        } else if (cardId === 'riskyBet') {
             riskyBetActive = true; updateUI(); updateBetLimits();
             setMessage(`危険な賭け！賭け金決定時に効果が適用されます。`);
             requiresDelay = true;
              turnProceed = false;
        } else if (cardId === 'giveUpEye') {
             playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
             giveUpEyeUsedThisTurn = true;
             setMessage(`見切り使用！ションベン扱いになります。`);
             updateUI();
             highlightHand(playerHandEl, playerHand);
             rollButton.disabled = true;
             isPlayerTurn = false;
             turnProceed = false;
             setTimeout(handleRoundEnd, 800);
        } else if (cardId === 'doubleUpBet') {
             doubleUpBetActive = true;
             setMessage("ダブルアップ準備完了！勝負！");
             requiresDelay = true;
             useConsumed = true;
             isPlayerTurn = false;
             turnProceed = false;
             setTimeout(handleRoundEnd, 1000);
        } else if (cardId === 'blindingDice') {
             blindingDiceActive = true;
             setMessage(`目くらまし！相手の次のロールに影響します。`);
             turnProceed = false;
             setTimeout(() => {
                 activeCardBeingUsed = null;
                 npcTurn(); // NPCターン開始
             }, 1000);
        } else if (cardId === 'soulRoll') {
             const costPercent = [10, 5, 5][playerCardData.level - 1];
             const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
             if (playerScore < cost) {
                  setMessage(`魂の一振りのコスト(${cost}点)を払えません！`);
                  useConsumed = false;
                  turnProceed = false;
             } else {
                  playerScore -= cost;
                  soulRollUsedThisTurn = true;
                  setMessage(`魂の一振り！${cost}点を消費して追加ロール！`);
                  updateUI();
                  rollButton.disabled = false; // 再度ロール可能に
                  turnProceed = false;
             }
        } else if (cardId === 'rewardAmplifier') {
             rewardAmplifierActive = true;
             setMessage(`報酬増幅！このラウンドの役での勝利時、配当倍率が増加します。`);
             requiresDelay = true;
             useConsumed = true;
             turnProceed = true;
        } else {
            console.warn(`Active card effect for ${cardId} is not fully implemented yet.`);
            setMessage(`カード「${card.name}」の効果処理が未実装です。`);
            useConsumed = false;
            turnProceed = false;
        }

        // 使用回数をカウント (ダイス選択系以外)
        if (useConsumed && card.usesPerWave && !['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
             activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
             console.log(`Used card ${cardId}. Remaining uses: ${getRemainingUses(cardId)}`);
        }

        // UIロック解除と後処理
        if (turnProceed || requiresDelay || !useConsumed) {
            if (requiresDelay) {
                await new Promise(resolve => setTimeout(resolve, 800));
            }
             activeCardBeingUsed = null;
             updateCardButtonHighlight(); // ★ カードボタンのハイライト更新処理を追加
        }

        // ターンを進める (ダイス選択系以外、かつ turnProceed が true)
        if (turnProceed && !['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
              console.log("Card use finished, potentially proceeding turn.");
              if (isGameActive && isPlayerTurn) { // プレイヤーのターンである場合のみ進行
                   const handName = getHandDisplayName(playerHand);
                   if (playerHand?.type === '役' || playerHand?.type === '目') {
                        const blindingCardCheck = playerCards.find(c => c.id === 'blindingDice');
                        const maxBlindingUsesCheck = blindingCardCheck ? 1 : 0;
                        const canUseBlindingNowCheck = isPlayerParent && playerHand.type !== 'ションベン' && blindingCardCheck && (activeCardUses['blindingDice'] || 0) < maxBlindingUsesCheck;

                       if (canUseBlindingNowCheck && isPlayerParent) {
                            setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                            isPlayerTurn = true; // 目くらまし使用待機
                            updateCardButtonHighlight(); // ★ カードボタン更新
                       } else if (isPlayerParent) {
                            setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                              isPlayerTurn = false;
                              setTimeout(npcTurn, 1400);
                       } else { // 子の場合
                            setMessage(`あなた(子): ${handName}！ 勝負！`);
                            isPlayerTurn = false;
                            setTimeout(handleRoundEnd, 1000);
                       }
                   }
              }
        }
    } // handleActiveCardUse 関数の終わり


     // === カード使用可否チェック関数 ===
     function checkCardUsability(cardId) {
         const cardData = playerCards.find(c => c.id === cardId);
         const card = allCards.find(c => c.id === cardId);
         if (!cardData || !card || !card.usesPerWave) return false; // 使用回数制限のないカードはここでの対象外

         const remainingUses = getRemainingUses(cardId);
         if (remainingUses <= 0) return false; // 使用回数超過

         if (activeCardBeingUsed || waitingForUserChoice) return false; // 他の操作中

         const isBetPhase = !isGameActive && isPlayerParent;
         const isPlayerRollPhase = isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls;
         const isPlayerPostRollPhase = isGameActive && isPlayerTurn && playerRollCount > 0 && playerDice.some(d => d !== 0);
         const isPlayerPostRollMenashiPhase = isPlayerPostRollPhase && playerHand?.type === '目なし';
         const isPlayerPostRollEyePhase = isPlayerPostRollPhase && playerHand?.type === '目';
         const isPlayerPostRollFinalPhase = isPlayerPostRollPhase && (playerHand?.type === '役' || playerHand?.type === '目');
         const isNpcRollBeforePhase = isGameActive && !isPlayerTurn && npcRollCount === 0 && isPlayerParent;

         switch (card.id) {
             case 'ignoreMinBet': return isBetPhase;
             case 'riskyBet': return isBetPhase;
             case 'zoroChanceUp': return isPlayerRollPhase && !zoroChanceUpActive;
             case 'avoid123_456': return isPlayerRollPhase && !avoid123_456Active;
             case 'blessingDice': return isPlayerRollPhase && !blessingDiceActive;
             case 'stormWarning': return isPlayerRollPhase && !stormWarningActive;
             case 'changeToOne': case 'changeToSix': return isPlayerPostRollPhase;
             case 'giveUpEye': return isPlayerPostRollMenashiPhase && !giveUpEyeUsedThisTurn;
             case 'adjustEye': return isPlayerPostRollEyePhase && !adjustEyeUsedThisTurn;
             case 'nextChance': return isPlayerPostRollEyePhase && !nextChanceUsedThisTurn;
             case 'doubleUpBet': return isPlayerPostRollFinalPhase && !isPlayerParent && !doubleUpBetActive;
             case 'soulRoll': return isGameActive && isPlayerTurn && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn;
             case 'blindingDice': return isNpcRollBeforePhase && !blindingDiceActive;
             case 'rewardAmplifier': return isPlayerPostRollFinalPhase && !rewardAmplifierActive;
             case 'keepParentalRight': return false; // 親権維持はラウンド終了時に自動判定
             default: return false;
         }
     }

     // === 残り使用回数取得関数 ===
     function getRemainingUses(cardId) {
         const cardData = playerCards.find(c => c.id === cardId);
         const card = allCards.find(c => c.id === cardId);
         if (!cardData || !card || !card.usesPerWave) return Infinity;

         const level = cardData.level;
         let totalUses = 0;
         switch (card.id) {
             case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'keepParentalRight': case 'giveUpEye':
                  totalUses = level; break;
             case 'adjustEye': case 'rewardAmplifier': case 'riskyBet':
                  totalUses = (level >= 2 && card.id === 'adjustEye') ? 2 :
                            (level >= 3 && card.id === 'rewardAmplifier') ? 2 :
                            (level >= 3 && card.id === 'riskyBet') ? 2 :
                            1; break;
             case 'zoroChanceUp': case 'avoid123_456': case 'blessingDice': case 'nextChance':
                  totalUses = (level >= 3) ? 2 : 1; break;
             case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice':
                  totalUses = 1; break;
             default: totalUses = card.usesPerWave; break;
         }
         return totalUses - (activeCardUses[cardId] || 0);
     }


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
              requiresNextChanceCount = nextChanceCanSelectTwo ? 2 : 1; // Lv2以上は最大2つ
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
                        if (nextChanceCanSelectTwo) {
                           button.onclick = handleDiceChoice; // ★ クリックで選択、複数選択はまだ未実装
                       } else {
                           button.onclick = handleDiceChoice; // 1つ選択で即時実行
                       }
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

        if (originalValue + adjustAmount <= 6) {
            const plusButton = document.createElement('button');
            plusButton.className = 'dice-choice-button button-pop';
            plusButton.textContent = `+${adjustAmount} (→ ${originalValue + adjustAmount})`;
            plusButton.dataset.diceIndex = diceIndex;
            plusButton.dataset.adjustDir = 'plus';
            plusButton.onclick = handleDiceChoice;
            buttonContainer.appendChild(plusButton);
        }
        if (originalValue - adjustAmount >= 1) {
             const minusButton = document.createElement('button');
             minusButton.className = 'dice-choice-button button-pop';
             minusButton.textContent = `-${adjustAmount} (→ ${originalValue - adjustAmount})`;
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
        const cancelledCardId = activeCardBeingUsed; // キャンセルされたカードIDを保持
        activeCardBeingUsed = null; // ロック解除

        if (cancelledCardId && ['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cancelledCardId)) {
             setMessage("カードの使用をキャンセルしました。");
        }


        // ロールボタンの状態を適切に戻す
        if (isGameActive && isPlayerTurn) {
            const soulRollCardCheck = playerCards.find(c => c.id === 'soulRoll');
            const maxSoulRollUsesCheck = soulRollCardCheck ? 1 : 0;
            const canUseSoulRollFinalCheck = soulRollCardCheck && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUsesCheck;

            let enableRollButton = false;

            if (playerHand) {
                if (playerHand.type === '目なし') {
                    let canReroll = playerRollCount < currentMaxRolls;
                    let hasStormWarningReroll = false;
                     const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
                     if (stormCardCheck && stormWarningRerollsLeft > 0) {
                           hasStormWarningReroll = true;
                     }

                    if (canReroll || hasStormWarningReroll) {
                        enableRollButton = true;
                        const giveUpCardCheck = playerCards.find(c => c.id === 'giveUpEye');
                        const maxGiveUpUsesCheck = giveUpCardCheck ? giveUpCardCheck.level : 0;
                        const canUseGiveUpCheck = giveUpCardCheck && !giveUpEyeUsedThisTurn && (activeCardUses['giveUpEye'] || 0) < maxGiveUpUsesCheck;
                        if(canUseGiveUpCheck) {
                            let msg = `あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振りますか？(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)`:''} それとも「見切り」を使用しますか？`;
                              setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)`:''}`);
                        } else {
                             setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)`:''}`);
                        }
                    } else if (playerRollCount >= currentMaxRolls && canUseSoulRollFinalCheck) {
                        enableRollButton = false;
                        setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 振り直し回数がありません。「魂の一振り」を使用しますか？`);
                        updateCardButtonHighlight(); // ★ カードボタン更新
                    } else {
                        enableRollButton = false;
                         // ションベン確定のメッセージは handleRoundEnd で表示される
                    }
                } else if (playerHand.type === '目' || playerHand.type === '役') {
                    enableRollButton = false; // 基本的に役/目が出たらロールボタンは無効
                    const handName = getHandDisplayName(playerHand);
                    const canUseAdjustAgain = checkCardUsability('adjustEye');
                    const canUseNextChanceAgain = checkCardUsability('nextChance');
                    const canUseDoubleUpAgain = checkCardUsability('doubleUpBet');
                    const canUseRewardAgain = checkCardUsability('rewardAmplifier');
                    const canUseBlindingAgain = checkCardUsability('blindingDice');

                    if (canUseAdjustAgain) {setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「出目調整」を使用しますか？`);}
                    else if(canUseNextChanceAgain){ setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「ネクストチャンス」を使用しますか？`);}
                    else if(canUseDoubleUpAgain){setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`);}
                    else if(canUseRewardAgain){setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「報酬増幅」を使用しますか？`);}
                    else if(canUseBlindingAgain){setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);}
                    else if (isPlayerParent && playerHand.type !== 'ションベン') {
                         setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                    } else {
                         setMessage(`あなた(${isPlayerParent?'親':'子'}): ${handName}！ ${playerHand.type === 'ションベン' ? '負けです。' : '勝負！'}`);
                    }

                } else { // ションベンの場合など
                     enableRollButton = false;
                     setMessage(`あなた(${isPlayerParent?'親':'子'}): ${playerHand.type === 'ションベン' ? 'ションベン！ 負けです。' : getHandDisplayName(playerHand)}`);
                }
            } else { // playerHand が null (まだ振っていない)
                 enableRollButton = playerRollCount === 0;
                 if(enableRollButton) setMessage(`賭け金 ${currentBet} で勝負！ あなた(${isPlayerParent?'親':'子'})がサイコロを振ってください。`);
            }
            rollButton.disabled = !enableRollButton;

        } else { // 相手ターン中 or ゲーム非アクティブ
            rollButton.disabled = true;
        }
        historyButton.disabled = false; // オーバーレイが閉じたら履歴は有効
        updateCardButtonHighlight(); // ★ カードボタン更新
    }
    // ダイス選択処理 (ネクストチャンス対応修正)
    async function handleDiceChoice(event) {
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
        let turnEnd = true;
        let useConsumed = true; // ダイス選択が実行されたら消費

        if (['changeToOne', 'changeToSix'].includes(cardId)) {
             const newValue = cardId === 'changeToOne' ? 1 : 6;
             newDice[diceIndex] = newValue;
             message = `サイコロを ${newValue} に変更しました。`;
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
              } else {
                   message = "調整しても値が変わりませんでした。";
                   turnEnd = false;
                   useConsumed = false; // 消費しない
                   hideDiceChoiceOverlay();
                   return;
              }
        } else if (cardId === 'nextChance') {
              const originalValue = newDice[diceIndex];
              newDice[diceIndex] = rollSingleDice();
              message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`;
              nextChanceUsedThisTurn = true;
        } else {
             hideDiceChoiceOverlay(); return;
        }

        // ダイスと役を再評価
        playerDice = newDice;
        if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
        diceDisplayEl.textContent = playerDice.join(' ');
        const result = getHandResult(playerDice);
        const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
        playerHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("Re-evaluated hand:", playerHand);

        // ゲーム画面の表示更新
        playerHandEl.textContent = getHandDisplayName(playerHand);
        highlightHand(playerHandEl, playerHand); // 役のアナウンスもここ

        hideDiceChoiceOverlay(); // オーバーレイを閉じる

        // 使用回数をカウント (ここで消費確定)
        if (card.usesPerWave && useConsumed) {
             activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
             const remainingUses = getRemainingUses(cardId);
             message += ` (残${remainingUses}/${getTotalUses(cardId)})`; // 残り回数を表示
             console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`);
        }
        setMessage(message);
        updateUI(); // UI全体を更新（ロールカウンター、カードボタンハイライトなど）

        // ターンを進めるかどうかの処理
        if (turnEnd) {
            await new Promise(resolve => setTimeout(resolve, 1200)); // メッセージ表示と役演出待ち (少し長めに)

            const handName = getHandDisplayName(playerHand);
            if (playerHand.type === '役' || playerHand.type === '目' || playerHand.type === 'ションベン') {
                 isPlayerTurn = false; // 相手ターンへ移る準備
                 rollButton.disabled = true; // ロールボタン無効

                 // カード使用後の状況で再度カード使用選択肢があるかチェック
                 const blindingCardCheck = playerCards.find(c => c.id === 'blindingDice');
                 const maxBlindingUsesCheck = blindingCardCheck ? 1 : 0;
                 const canUseBlindingNowCheck = isPlayerParent && playerHand.type !== 'ションベン' && blindingCardCheck && (activeCardUses['blindingDice'] || 0) < maxBlindingUsesCheck;

                 const doubleUpCardCheck = playerCards.find(c => c.id === 'doubleUpBet');
                 const maxDoubleUpUsesCheck = doubleUpCardCheck ? 1 : 0;
                 const canUseDoubleUpCheck = !isPlayerParent && playerHand.type !== 'ションベン' && doubleUpCardCheck && (activeCardUses['doubleUpBet'] || 0) < maxDoubleUpUsesCheck;

                  const rewardAmplifierCheck = playerCards.find(c => c.id === 'rewardAmplifier');
                  const maxRewardUsesCheck = rewardAmplifierCheck ? (rewardAmplifierCheck.level >= 3 ? 2 : 1) : 0;
                  const canUseRewardCheck = playerHand.type === '役' && rewardAmplifierCheck && !rewardAmplifierActive && (activeCardUses['rewardAmplifier'] || 0) < maxRewardUsesCheck;


                 // 優先順位: Blinding > DoubleUp > RewardAmplifier
                 if (canUseBlindingNowCheck && isPlayerParent) {
                     setMessage(`あなた(親): ${handName}！ 相手(子)の番です。(「目くらまし」使用可能)`);
                     isPlayerTurn = true; // 目くらまし使用待機
                     updateCardButtonHighlight(); // ★ カードボタン更新
                 } else if (canUseDoubleUpCheck && !isPlayerParent) {
                     setMessage(`あなた(子): ${handName}！「ダブルアップ」を使用しますか？`, true);
                     isPlayerTurn = true; // ダブルアップ使用待機
                     const useDoubleUp = await waitForUserChoice();
                     if (useDoubleUp) {
                         await handleActiveCardUse('doubleUpBet'); // ID直接指定
                         return; // handleActiveCardUse内でターン進行管理
                     } else {
                         setMessage(`あなた(子): ${handName}！ ダブルアップを使用しませんでした。勝負！`);
                         isPlayerTurn = false;
                     }
                 } else if (canUseRewardCheck) {
                     setMessage(`あなた(${isPlayerParent ? '親' : '子'}): ${handName}！「報酬増幅」を使用しますか？`, true);
                     isPlayerTurn = true; // 報酬増幅使用待機
                     const useReward = await waitForUserChoice();
                     if (useReward) {
                         await handleActiveCardUse('rewardAmplifier'); // ID直接指定
                         isPlayerTurn = false; // ターン進行を確定
                     } else {
                         setMessage(`報酬増幅を使用しませんでした。勝負！`);
                         isPlayerTurn = false;
                     }
                 }

                 // ターン終了処理 (プレイヤー操作に戻らなかった場合)
                 if (!isPlayerTurn) {
                      if (isPlayerParent && playerHand.type !== 'ションベン') {
                          setMessage(`あなた(親): ${handName}！ 相手(子)の番です。`);
                          setTimeout(npcTurn, 1400);
                      } else {
                          setMessage(`あなた(${isPlayerParent?'親':'子'}): ${handName}！ ${playerHand.type === 'ションベン' ? '負けです。' : '勝負！'}`);
                          setTimeout(handleRoundEnd, 1000);
                      }
                 }

            } else if (playerHand.type === '目なし') { // カード使用後も目なしの場合
                 let canRerollAfterCard = playerRollCount < currentMaxRolls;
                 let hasStormWarningRerollAfterCard = false;
                 const stormCardCheckAfter = playerCards.find(c => c.id === 'stormWarning');
                 if (stormCardCheckAfter && stormWarningRerollsLeft > 0) {
                      hasStormWarningRerollAfterCard = true;
                 }

                 if (canRerollAfterCard || hasStormWarningRerollAfterCard) {
                     setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningRerollAfterCard ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)`:''}`);
                     rollButton.disabled = false; // 再度ロール可能に
                     updateCardButtonHighlight(); // ★ カードボタン更新
                 } else { // 振り切り後目なし -> ションベン確定? Soul Roll確認
                      const soulRollCardCheck = playerCards.find(c => c.id === 'soulRoll');
                      const maxSoulRollUsesCheck = soulRollCardCheck ? 1 : 0;
                      const canUseSoulRollFinalCheck = soulRollCardCheck && !soulRollUsedThisTurn && (activeCardUses['soulRoll'] || 0) < maxSoulRollUsesCheck;
                      if (canUseSoulRollFinalCheck) {
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): 目なし！ 振り直し回数がありません。「魂の一振り」を使用しますか？`);
                         rollButton.disabled = true; // Soul Roll待ち
                         updateCardButtonHighlight(); // ★ カードボタン更新
                      } else {
                         playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                         updateUI();
                         setMessage(`あなた(${isPlayerParent ? '親' : '子'}): カード使用後も目なしでションベン！ 負けです。`);
                         highlightHand(playerHandEl, playerHand);
                         rollButton.disabled = true;
                         isPlayerTurn = false;
                         setTimeout(handleRoundEnd, 800);
                      }
                 }
            }
        }
        updateCardButtonHighlight(); // ★ ターン終了時にも更新
    } // handleDiceChoice end


     // === 総使用回数取得関数 ===
     function getTotalUses(cardId) {
         const cardData = playerCards.find(c => c.id === cardId);
         const card = allCards.find(c => c.id === cardId);
         if (!cardData || !card || !card.usesPerWave) return Infinity;

         const level = cardData.level;
         let totalUses = 0;
         switch (card.id) {
             case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'keepParentalRight': case 'giveUpEye':
                  totalUses = level; break;
             case 'adjustEye': case 'rewardAmplifier': case 'riskyBet':
                  totalUses = (level >= 2 && card.id === 'adjustEye') ? 2 :
                            (level >= 3 && card.id === 'rewardAmplifier') ? 2 :
                            (level >= 3 && card.id === 'riskyBet') ? 2 :
                            1; break;
             case 'zoroChanceUp': case 'avoid123_456': case 'blessingDice': case 'nextChance':
                  totalUses = (level >= 3) ? 2 : 1; break;
             case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice':
                  totalUses = 1; break;
             default: totalUses = card.usesPerWave; break;
         }
         return totalUses;
     }

    // --- ショップ関連イベントリスナー ---
    shopCloseButton.addEventListener('click', closeShop);
    if (shopRerollButton) shopRerollButton.addEventListener('click', handleReroll);
    shopCardOffersEl.addEventListener('click', (event) => {
        if (event.target.matches('.buy-button, .upgrade-button')) {
            handleBuyCard(event);
        }
    });
    cancelDiscardButton.addEventListener('click', cancelDiscard);

    // --- 設定モーダル関連 ---
    // (要素取得は冒頭で実施済み)
    // 設定ボタンクリック処理
    if (settingsButton && settingsModal) {
        settingsButton.addEventListener('click', () => {
            settingsModal.style.display = 'flex';
            switchSettingsTab('rules');
        });
    }

    // 設定モーダル閉じるボタン処理
    if (closeSettingsModalButton && settingsModal) {
        closeSettingsModalButton.addEventListener('click', () => {
            settingsModal.style.display = 'none';
        });
    }

    // 設定モーダル外クリック処理 (windowイベントリスナーに統合済)
    window.addEventListener('click', (event) => {
        if (settingsModal && event.target === settingsModal) {
            settingsModal.style.display = 'none';
        }
        if (historyModal && event.target === historyModal) historyModal.style.display = 'none';
        if (cardListModal && event.target === cardListModal) cardListModal.style.display = 'none'; // 古いモーダルも閉じる
        if (discardModal && event.target === discardModal) cancelDiscard();
        if (diceChoiceOverlay && event.target === diceChoiceOverlay) hideDiceChoiceOverlay();
        if (cardActionModal && event.target === cardActionModal) {
             cardActionModal.style.display = 'none';
        }
    });

    // 設定モーダル ナビゲーションボタン処理
    settingsNavButtons.forEach(button => {
        if (button.dataset.target) {
             button.addEventListener('click', () => {
                 const targetId = button.dataset.target;
                 switchSettingsTab(targetId);
             });
        }
    });

    // 設定モーダル内のカード一覧ボタン処理
    if (settingsCardListButton) {
        settingsCardListButton.addEventListener('click', () => {
            switchSettingsTab('card-list');
        });
    }

    // 設定タブ切り替え関数
    function switchSettingsTab(targetId) {
        if (!settingsContent) return;
        settingsNavButtons.forEach(btn => btn.classList.remove('active'));
        const contents = settingsContent.querySelectorAll('.settings-tab-content');
        contents.forEach(content => content.classList.remove('active'));

        const activeButton = document.querySelector(`.settings-nav-button[data-target="${targetId}"]`) || document.getElementById('settings-card-list-button');
        if (activeButton && (activeButton.dataset.target === targetId || (targetId === 'card-list' && activeButton.id === 'settings-card-list-button'))) {
             activeButton.classList.add('active');
        }

        if (targetId === 'card-list') {
            generateSettingsCardListHtml();
        }

        const activeContent = document.getElementById(`settings-${targetId}-content`);
        if (activeContent) {
            activeContent.classList.add('active');
        }
    }
    // --- 設定モーダル関連 ここまで ---

    // --- カード画面モーダル関連 ---
    // (要素取得は冒頭で実施済み)
    // 「カード」ボタンクリック処理
    function openCardActionModal() {
        if (!cardActionModal) return;
        console.log("Opening Card Action Modal");
        displayCardsInModal(); // ★ カード表示関数を呼び出す
        cardActionModal.style.display = 'flex';
    }

    // ★ カード表示関数
    function displayCardsInModal() {
        if (!cardActionDisplay || !cardActionMessage) return;

        cardActionDisplay.innerHTML = ''; // 表示エリアをクリア
        let usableCardFound = false;

        if (playerCards.length === 0) {
            cardActionMessage.textContent = "手札にカードがありません。";
            return;
        }

        playerCards.forEach(cardData => {
            const card = allCards.find(c => c.id === cardData.id);
            if (!card) return;

            const cardElement = document.createElement('div');
            const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
            cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass}`; // 新しいクラス名
            cardElement.dataset.cardId = cardData.id; // カードIDをdata属性に

            const isUsable = checkCardUsability(cardData.id);
            const remainingUses = getRemainingUses(cardData.id);
            const totalUses = getTotalUses(cardData.id);
            const isPassive = !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag);

            let usesHtml = '';
            if (card.usesPerWave && totalUses !== Infinity) {
                usesHtml = `<div class="card-action-uses">残 ${remainingUses} / ${totalUses} 回</div>`;
            } else if (isPassive) {
                 usesHtml = `<div class="card-action-uses" style="color: #aaa;">(パッシブ)</div>`;
            }

            let buttonHtml = '';
            if (card.usesPerWave) { // 使用回数があるカードのみ使用ボタンを表示
                buttonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`;
            }

            // スタイルクラスの適用
            if (isPassive) {
                cardElement.classList.add('passive'); // パッシブカードのスタイル（任意）
            } else if (!card.usesPerWave) {
                // 使用効果のないサポートカードなど (例:手札交換) - 何もしないか、別のスタイル
            } else if (isUsable) {
                cardElement.classList.add('usable');
                usableCardFound = true;
            } else if (remainingUses <= 0) {
                cardElement.classList.add('used-up');
            } else {
                cardElement.classList.add('not-usable');
            }


            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
            const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
            const levelSpan = `<span class="card-level">[Lv.${cardData.level}]</span>`; // レベル表示を少し変更
            const cardNameHtml = `${card.name} ${levelSpan}`;
            const cardInnerHtml = `
                <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                ${rarityBadgeHtml}
                <h3 class="card-name">${cardNameHtml}</h3>
                <p class="card-description">${getUpgradeDescription(card, cardData.level)}</p>
                ${usesHtml}
                ${buttonHtml}
            `;
            cardElement.innerHTML = cardInnerHtml;

            if (card.image) {
                 cardElement.style.backgroundImage = `url('${card.image}')`;
                 cardElement.style.backgroundSize = 'cover';
                 cardElement.style.backgroundPosition = 'center';
            }


            cardActionDisplay.appendChild(cardElement);
        });

        // メッセージ更新
        if (usableCardFound) {
            cardActionMessage.textContent = "使用したいカードを選択してください。";
        } else if (playerCards.length > 0) {
            cardActionMessage.textContent = "現在使用できるカードはありません。";
        }
    }

    // カード画面モーダル閉じるボタン処理
    if (closeCardActionModalButton && cardActionModal) {
        closeCardActionModalButton.addEventListener('click', () => {
            cardActionModal.style.display = 'none';
        });
    }

    // カード画面モーダル外クリック処理 (windowイベントリスナーに統合済)

    // ★ カード画面の使用ボタンクリック処理 (イベントデリゲーション)
    if(cardActionDisplay) {
        cardActionDisplay.addEventListener('click', async (event) => {
            if (event.target.matches('.use-card-button:not(:disabled)')) {
                const cardId = event.target.dataset.cardId;
                if (cardId) {
                    cardActionModal.style.display = 'none'; // 先にモーダルを閉じる
                    await handleActiveCardUse(cardId); // IDを渡してカード使用処理を呼び出す
                    updateCardButtonHighlight(); // カード使用後にボタンのハイライト状態を更新
                }
            }
        });
    }


    // ★ 「カード」ボタンのイベントリスナーを追加
    if (cardActionButton) {
        cardActionButton.addEventListener('click', openCardActionModal);
    }
    // --- カード画面モーダル関連 ここまで ---

    // --- 初期状態 ---
    setDifficulty(difficulty);
    if(historyModal) historyModal.style.display = 'none';
    if(cardListModal) cardListModal.style.display = 'none'; // 古いモーダルも非表示
    if(discardModal) discardModal.style.display = 'none';
    if(diceRollModal) diceRollModal.style.display = 'none';
    if(diceChoiceOverlay) diceChoiceOverlay.style.display = 'none';
    if(settingsModal) settingsModal.style.display = 'none';
    if(cardActionModal) cardActionModal.style.display = 'none';
    showScreen('title-screen');


}); // === DOMContentLoaded END ===
// ===== END OF script.js =====