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
    const minBetButton = document.getElementById('min-bet-button');

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

    // --- キャラクター選択画面 要素取得 ---
    const characterSelectScreen = document.getElementById('character-select-screen');
    const selectCharacterButton = document.getElementById('select-character-button');
    const characterListEl = document.getElementById('character-list');
    const characterPreviewEl = document.getElementById('character-preview');
    const characterPreviewImageEl = document.getElementById('character-preview-image');
    const characterPreviewPlaceholderEl = document.getElementById('character-preview-placeholder');
    const characterConfirmAreaEl = document.getElementById('character-confirm-area');
    const confirmCharacterYesButton = document.getElementById('confirm-character-yes');
    const confirmCharacterNoButton = document.getElementById('confirm-character-no');
    const backToTitleButton = document.getElementById('back-to-title-button');
    const characterConfirmMessageEl = document.getElementById('character-confirm-message');

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

    // --- キャラクターデータ ---
    const characters = [
        { id: 'char01', name: 'キャラクター01', image: './Character Image/Character01.png', initialCardId: null, initialCardPool: ['reroll1'] },
        { id: 'char02', name: 'キャラクター02', image: './Character Image/Character02.png', initialCardId: null, initialCardPool: ['shonbenHalf'] },
        { id: 'char03', name: 'キャラクター03', image: './Character Image/Character03.png', initialCardId: null, initialCardPool: ['giveUpEye'] },
        { id: 'char04', name: 'キャラクター04', image: './Character Image/Character04.png', initialCardId: null, initialCardPool: ['changeToOne'] },
        { id: 'char05', name: 'キャラクター05', image: './Character Image/Character05.png', initialCardId: null, initialCardPool: ['changeToSix'] },
        { id: 'char06', name: 'キャラクター06', image: './Character Image/Character06.png', initialCardId: null, initialCardPool: ['sixEyeBonus'] },
        { id: 'char07', name: 'キャラクター07', image: './Character Image/Character07.png', initialCardId: null, initialCardPool: ['oneEyeBonus'] },
        { id: 'char08', name: 'キャラクター08', image: './Character Image/Character08.png', initialCardId: null, initialCardPool: ['soulRoll'] },
        { id: 'char09', name: 'キャラクター09', image: './Character Image/Character09.png', initialCardId: null, initialCardPool: ['stormWarning'] },
        { id: 'char10', name: 'キャラクター10', image: './Character Image/Character10.png', initialCardId: null, initialCardPool: ['drawBonus'] },
        { id: 'char11', name: 'キャラクター11', image: './Character Image/Character11.png', initialCardId: null, initialCardPool: ['betBoost'] },
        { id: 'char12', name: 'キャラクター12', image: './Character Image/Character12.png', initialCardId: null, initialCardPool: ['rewardAmplifier'] },
        { id: 'char13', name: 'キャラクター13', image: './Character Image/Character13.png', initialCardId: null, initialCardPool: ['blindingDice'] },
    ];
    let selectedCharacter = characters[0];
    let currentNpcCharacter = characters[1 % characters.length];
    let usedNpcCharacters = [];
    let previewingCharacter = null;
    let currentNpcCardId = null;

    // --- ユーザー操作待ち関連 ---
    let waitingForUserChoice = false;
    let userChoiceResolver = null;
    let shopConfirmationResolver = null;
    let waitingForPlayerActionAfterRoll = false;

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
    let drawBonusActive = false;

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
         { id: 'shonbenHalf', name: 'ションベン軽減', type: 'score', cost: 70, rarity: 1, flavor: 'おっとっと、少しこぼしただけさ。', effectTag: 'shonbenHalf', image: './Card Image/02.jpeg' },
         { id: 'ignoreMinBet', name: '最低賭け金無視', type: 'support', cost: 40, rarity: 1, flavor: 'チリも積もれば...', usesPerWave: 1, image: './Card Image/03.jpeg' },
        { id: 'shopChoicePlus1', name: 'ショップ選択肢+1', type: 'support', cost: 150, rarity: 2, flavor: '選択肢は多いほうがいい。人生も、カードも。', applyEffect: (level = 1) => shopChoicePlus1Active = true, removeEffect: () => shopChoicePlus1Active = false, image: './Card Image/04.jpeg' },
        { id: 'changeToOne', name: '1に変更', type: 'dice', cost: 80, rarity: 1, flavor: 'ピンゾロ狙い？それとも…？', usesPerWave: 1, image: './Card Image/05.jpeg' },
        { id: 'changeToSix', name: '6に変更', type: 'dice', cost: 100, rarity: 1, flavor: '目は力なり。最大値をその手に。', usesPerWave: 1, image: './Card Image/06.jpeg' },
        { id: 'zoroChanceUp', name: 'ゾロ目確率UP', type: 'dice', cost: 120, rarity: 2, flavor: '揃え！揃え！揃えー！(このラウンド中有効)', usesPerWave: 1, image: './Card Image/07.jpeg' },
        { id: 'avoid123_456', name: '役回避', type: 'dice', cost: 50, rarity: 1, flavor: '危ない橋は渡らない主義でね。', usesPerWave: 1, image: './Card Image/08.jpeg' },
        { id: 'sixEyeBonus', name: '6の目ボーナス', type: 'score', cost: 100, rarity: 1, flavor: '最高の一点で、最高の報酬を。', effectTag: 'sixEyeBonus', image: './Card Image/09.jpeg' },
        { id: 'oneEyeBonus', name: '1の目ボーナス', type: 'score', cost: 120, rarity: 1, flavor: '最弱の目が、最強の切り札に。', effectTag: 'oneEyeBonus', image: './Card Image/10.jpeg' },
        { id: 'arashiBonus', name: 'アラシ強化', type: 'score', cost: 150, rarity: 2, flavor: '吹き荒れろ！嵐の如く！', effectTag: 'arashiBonus', image: './Card Image/11.jpeg' },
        { id: 'shigoroBonus', name: 'シゴロ強化', type: 'score', cost: 130, rarity: 1, flavor: '4-5-6！幸運の階段。', effectTag: 'shigoroBonus', image: './Card Image/12.jpeg' },
        { id: 'hifumiHalf', name: 'ヒフミ軽減', type: 'score', cost: 180, rarity: 2, flavor: '1-2-3...痛恨のミスも、少しだけ軽く。', effectTag: 'hifumiHalf', image: './Card Image/13.jpeg' },
        { id: 'drawBonus', name: '引き分けボーナス', type: 'support', cost: 90, rarity: 1, flavor: 'まあ、悪くないんじゃない？', usesPerWave: 1, image: './Card Image/14.jpeg' },
        { id: 'blessingDice', name: '天の恵み', type: 'dice', cost: 130, rarity: 2, flavor: '天よ、我に力を！(このラウンド中6が出やすく)', usesPerWave: 1, image: null },
        { id: 'adjustEye', name: '出目調整', type: 'dice', cost: 60, rarity: 1, flavor: 'あと一つ…！を現実に。', usesPerWave: 1, image: null },
        { id: 'stormWarning', name: '嵐の予感', type: 'dice', cost: 250, rarity: 3, flavor: '嵐の前触れ…次こそは！(無料ロール時ゾロ目率UP)', usesPerWave: 1, image: null },
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
     const DICE_FACE_COLOR = '#E0FFFF';
     const DICE_EDGE_RADIUS = 0.05;
     const ROTATION_SPEED = 40;

    // --- 基本関数 ---
    function showScreen(screenId) {
        console.log("Showing screen:", screenId);
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });

        const screenToShow = document.getElementById(screenId);
        if (screenToShow) {
            const flexScreens = ['title-screen', 'result-screen', 'character-select-screen', 'shop-screen', 'game-screen', 'settings-modal', 'card-action-modal'];
            if (flexScreens.includes(screenId)) {
                screenToShow.style.display = 'flex';
            } else {
                screenToShow.style.display = 'block';
            }
            screenToShow.classList.add('active');

            if (screenId === 'title-screen') {
                if (startGameButton) startGameButton.disabled = false;
                if (selectCharacterButton) selectCharacterButton.disabled = false;
                difficultyButtons.forEach(btn => btn.disabled = false);
                previewingCharacter = null;
            }
            else if (screenId === 'character-select-screen') {
                populateCharacterList();
                if(characterPreviewImageEl) characterPreviewImageEl.style.display = 'none';
                if(characterPreviewPlaceholderEl) {
                     characterPreviewPlaceholderEl.style.display = 'block';
                     characterPreviewPlaceholderEl.textContent = '← リストから選択';
                }
                if(characterConfirmAreaEl) characterConfirmAreaEl.style.display = 'none';
                previewingCharacter = null;
                 if (characterConfirmMessageEl) {
                     characterConfirmMessageEl.textContent = 'このキャラクターにしますか？';
                     characterConfirmMessageEl.style.color = '#eee';
                 }
                 if(confirmCharacterYesButton) confirmCharacterYesButton.style.display = 'inline-block';
                 if(confirmCharacterNoButton) confirmCharacterNoButton.style.display = 'inline-block';
                 if(characterListEl) {
                     characterListEl.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected'));
                 }
            }
        } else {
            console.error("Screen not found:", screenId);
        }
    }

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

    // === setMessage 関数の修正 ===
    function setMessage(msg, buttonType = 'none') {
        messageEl.textContent = msg;
        messageButtonContainer.innerHTML = ''; 

        if (buttonType === 'yesNo') {
            const button1 = document.createElement('button');
            button1.textContent = 'はい';
            button1.className = 'button-pop temp-choice-button';
            button1.onclick = () => handleUserChoice(true);
            messageButtonContainer.appendChild(button1);

            const button2 = document.createElement('button');
            button2.textContent = 'いいえ';
            button2.className = 'button-subtle temp-choice-button';
            button2.onclick = () => handleUserChoice(false);
            messageButtonContainer.appendChild(button2);
        } else if (buttonType === 'postRollChoice') {
            // 「スキップ」ボタン
            const skipButton = document.createElement('button');
            skipButton.id = 'skip-action-button';
            skipButton.textContent = 'スキップ';
            skipButton.className = 'button-subtle skip-button';
            skipButton.onclick = handleSkipAction;
            messageButtonContainer.appendChild(skipButton);

            // 「カード」ボタン
            const cardButton = document.createElement('button');
            cardButton.id = 'post-roll-card-button';
            cardButton.textContent = 'カード';
            cardButton.className = 'button-pop card-button';
            cardButton.onclick = openCardActionModal;
            messageButtonContainer.appendChild(cardButton);
            // ハイライト状態を既存ボタンと同期
            updateCardButtonHighlight();
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
        messageButtonContainer.innerHTML = ''; // Yes/No ボタンは消す
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

    // === サイコロを振る処理  ===
    function rollDice(isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        let d1 = rollSingleDice();
        let d2 = rollSingleDice();
        let d3 = rollSingleDice();
        let dice = [d1, d2, d3]; 

        let appliedZoroUp = false;
        const isStormWarningReroll = stormWarningRerollsLeft > 0 && !isNpc;

        console.log(`Rolling dice... NPC:${isNpc}, Blinding:${blindingDiceLevel}, SoulRoll:${soulRollLevel}, BlessingActive:${blessingDiceActive}, ZoroUpActive:${zoroChanceUpActive}, StormWarningReroll:${isStormWarningReroll}`);

        if (!isNpc) { // プレイヤーのロールの場合のみカード効果適用

            // --- 天の恵み (Blessing Dice) ---
            if (blessingDiceActive) {
                const blessingCard = playerCards.find(c => c.id === 'blessingDice');
                const blessingLevel = blessingCard?.level || 1;
                const blessingChance = [0.20, 0.35, 0.50][blessingLevel - 1];
                console.log(`天の恵み Lv.${blessingLevel} (各ダイス ${blessingChance * 100}%で6に)`);
                for (let i = 0; i < 3; i++) {
                    if (Math.random() < blessingChance) {
                        if (dice[i] !== 6) {
                            console.log(` -> 天の恵み効果！ ダイス${i + 1} (${dice[i]}) が 6 に！`);
                            dice[i] = 6;
                        }
                    }
                }
            }

            // --- ゾロ目確率UP (Zoro Chance Up) ---
            let totalZoroUpRate = 0;
            if (zoroChanceUpActive) {
                const zoroCard = playerCards.find(c => c.id === 'zoroChanceUp');
                const zoroLevel = zoroCard?.level || 1;
                totalZoroUpRate += [0.20, 0.35, 0.50][zoroLevel - 1];
                console.log(`ゾロ目確率UP Lv.${zoroLevel} (+${totalZoroUpRate * 100}%)`);
            }

            // --- 嵐の予感 (Storm Warning) - 無料ロール時のゾロ目確率UPボーナス ---
            if (isStormWarningReroll) {
                const stormCard = playerCards.find(c => c.id === 'stormWarning');
                const stormLevel = stormCard?.level || 1;
                const stormBonusRate = [0.10, 0.15, 0.20][stormLevel - 1];
                totalZoroUpRate += stormBonusRate;
                console.log(`嵐の予感 無料ロールボーナス Lv.${stormLevel} (+${stormBonusRate * 100}%)`);
            }

            // --- 最終的なゾロ目確率UP判定 ---
            if (totalZoroUpRate > 0) {
                console.log(`最終ゾロ目確率UPレート: ${totalZoroUpRate * 100}%`);
                if (Math.random() < totalZoroUpRate) {
                    if (dice[1] !== dice[0]) {
                         console.log(` -> ゾロ目確率UP効果！ ダイス2 (${dice[1]}) が ${dice[0]} に！`);
                         dice[1] = dice[0];
                         appliedZoroUp = true;
                    }
                }
                if (Math.random() < totalZoroUpRate) {
                     if (dice[2] !== dice[0]) {
                         console.log(` -> ゾロ目確率UP効果！ ダイス3 (${dice[2]}) が ${dice[0]} に！`);
                         dice[2] = dice[0];
                         appliedZoroUp = true;
                    }
                }
            }

            // --- 嵐の予感 - 無料ロール時のアラシブースト (ゾロ目UP不発時) ---
             if (isStormWarningReroll && !appliedZoroUp) {
                 const stormCard = playerCards.find(c => c.id === 'stormWarning');
                 const stormLevel = stormCard?.level || 1;
                 const arashiBoostChance = [0.05, 0.07, 0.10][stormLevel - 1];
                 if (Math.random() < arashiBoostChance) {
                     const targetValue = Math.floor(Math.random() * 5) + 2; // 2-6のゾロ目
                     console.log(`Card Effect: 嵐の予感 Lv.${stormLevel} 振り直し時アラシブースト発動！ ${targetValue}のアラシに！`);
                     dice = [targetValue, targetValue, targetValue]; // ダイス目を上書き
                 }
             }

             // --- 魂の一振り Lv3 効果 (目なし回避) ---
             if (soulRollLevel >= 3) {
                let attempts = 0;
                const maxAttempts = 5; // 無限ループ防止
                // 目なし判定関数を内部で定義
                const isMenashiCheck = (d) => d[0] !== d[1] && d[1] !== d[2] && d[0] !== d[2];

                // 最初に振った目が目なしかどうか
                let isMenashi = isMenashiCheck(dice);

                // 目なしの場合、最大 maxAttempts 回まで振り直す
                while (isMenashi && attempts < maxAttempts) {
                    console.log(`Soul Roll Lv.3: Menashi detected (${dice.join(',')}), rerolling... (Attempt ${attempts + 1})`);
                    // 再度3つのサイコロを振る
                    let rerolledDice = [rollSingleDice(), rollSingleDice(), rollSingleDice()];
                    attempts++;
                    // 再判定
                    isMenashi = isMenashiCheck(rerolledDice);
                    dice = rerolledDice; // 振り直した結果を dice に代入
                }

                if (attempts >= maxAttempts && isMenashi) { // 最大回数試行しても目なしだった場合
                    console.warn("Soul Roll Lv.3: Max reroll attempts reached, still Menashi.");
                } else if (attempts > 0 && !isMenashi) { // 振り直しで目なしを回避できた場合
                    console.log(`Soul Roll Lv.3: Menashi avoided! New dice: ${dice.join(',')}`);
                }
             }

        } // End of if (!isNpc)

        return dice;
    }

    // === 役判定  ===
    function getHandResult(dice, isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) {
        // ダイスを昇順にソート
        const s = [...dice].sort((a, b) => a - b);
        const [d1, d2, d3] = s;
        let result; // 判定結果を格納する変数

        // --- 基本的な役判定ロジック ---
        if (d1 === d2 && d2 === d3) { // ゾロ目
            result = d1 === 1 ? { ...ROLES.PINZORO, type: '役', value: 1 } : { ...ROLES.ARASHI, type: '役', value: d1 };
        } else if (d1 === 4 && d2 === 5 && d3 === 6) { // シゴロ
            result = { ...ROLES.SHIGORO, type: '役', value: 6 };
        } else if (d1 === 1 && d2 === 2 && d3 === 3) { // ヒフミ
            result = { ...ROLES.HIFUMI, type: '役', value: 3 };
        } else if (d1 === d2 && d2 !== d3) { // 2つが同じ数字
            result = { ...ROLES.NORMAL_EYE, type: '目', value: d3 }; // 残りの1つが「目」
        } else if (d1 !== d2 && d2 === d3) { // 2つが同じ数字
            result = { ...ROLES.NORMAL_EYE, type: '目', value: d1 }; // 残りの1つが「目」
        } else { // 上記以外
            result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; // 目なし
        }

        // 最初の判定結果をログに出力
        console.log(`Initial Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`);

         // --- プレイヤー専用カードの効果処理: 役回避 ---
         if (!isNpc && avoid123_456Active) { // プレイヤーの場合 かつ 役回避カードがアクティブな場合
            const avoidCard = playerCards.find(c => c.id === 'avoid123_456');
            const avoidLevel = avoidCard?.level || 1;
            const isHifumi = result.name === ROLES.HIFUMI.name;
            const isShigoro = result.name === ROLES.SHIGORO.name;
            const isMenashi = result.type === '目なし';

            let needsReroll = false;
            let reason = "";

            if (isHifumi || isShigoro) {
                needsReroll = true;
                reason = `${result.name} 回避`;
            } else if (avoidLevel >= 3 && isMenashi) {
                needsReroll = true;
                reason = "目なし 回避 (Lv3)";
            }

            if (needsReroll) {
                console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (${reason})`);
                let rerollDice;
                let rerollResult;
                let attempts = 0;
                const maxAttempts = 10;

                do {
                    // 役回避の振り直しでは他のカード効果は無視
                    rerollDice = rollDice(isNpc, 0, 0); // isNpc=false, blinding=0, soulRoll=0
                    // 役回避による再判定でも、この getHandResult 関数が呼ばれる
                    // その際、blindingDiceLevel や soulRollLevel は 0 で渡される想定
                    rerollResult = getHandResult(rerollDice, isNpc, 0, 0);
                    attempts++;
                } while (
                    attempts < maxAttempts &&
                    (rerollResult.name === ROLES.HIFUMI.name || rerollResult.name === ROLES.SHIGORO.name || (avoidLevel >= 3 && rerollResult.type === '目なし') || rerollResult.type === 'ションベン')
                );

                if (attempts >= maxAttempts) {
                    console.warn("役回避: 再ロール上限到達。最終結果を採用。");
                }

                console.log(` -> 再ロール結果: ${rerollDice.join(',')} (${getHandDisplayName(rerollResult)})`);
                result = rerollResult; // 振り直した結果を最終結果とする
            }
        } // --- 役回避 処理終了 ---

        // 目くらまし効果 
        if (isNpc && blindingDiceLevel > 0) { // NPCの場合 かつ 目くらましが発動中(レベル1以上)の場合
            let specialRoleAvoided = false; // 特殊役回避が成功したかどうかのフラグ

            // 1. 特殊役回避判定 (ピンゾロ、アラシ、シゴロ、ヒフミを対象)
            const specialRolesToAvoid = [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name, ROLES.HIFUMI.name];
            // 現在のNPCの役が回避対象リストに含まれているかチェック
            if (result.type === '役' && specialRolesToAvoid.includes(result.name)) {
                // 回避する確率 (Lv1: 20%, Lv2: 40%, Lv3: 60%)
                const avoidChance = [0.2, 0.4, 0.6][blindingDiceLevel - 1];
                // 確率判定
                if (Math.random() < avoidChance) {
                    // 回避成功！
                    console.log(`%cCard Effect: 目くらまし Lv.${blindingDiceLevel} 発動! NPCの特殊役「${result.name}」を回避 -> 目なしに変更`, 'color: orange; font-weight: bold;');
                    // 結果を強制的に「目なし」に書き換える
                    // 元のコードでは strength しか設定していなかったので name も設定
                    result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name };
                    specialRoleAvoided = true; // 回避成功フラグを立てる
                } else {
                    // 回避失敗
                    console.log(`Card Effect: 目くらまし Lv.${blindingDiceLevel} - NPCの特殊役「${result.name}」回避失敗 (確率 ${avoidChance * 100}%)`);
                }
            } // --- 特殊役回避判定 終了 ---

            // 2. Lv.3 ションベン率UP判定
            // 条件: 上記の特殊役回避が *発動しなかった* 場合 かつ カードレベルが3以上 かつ 現在の結果がションベンや目なし *ではない* 場合
            if (!specialRoleAvoided && blindingDiceLevel >= 3 && result.type !== 'ションベン' && result.type !== '目なし') {
                 const shonbenUpChance = 0.2; // 20% の確率で目なしか
                 // 確率判定
                 if (Math.random() < shonbenUpChance) {
                     // 発動！
                     console.log(`%cCard Effect: 目くらまし Lv.3 - ションベン率UP発動! NPCの結果「${getHandDisplayName(result)}」を目なしに変更`, 'color: orange; font-weight: bold;');
                     // 結果を強制的に「目なし」に書き換える
                     result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name };
                 } else {
                     // 発動失敗
                     console.log(`Card Effect: 目くらまし Lv.3 - ションベン率UP失敗 (確率 ${shonbenUpChance * 100}%)`);
                 }
            } // --- Lv.3 ションベン率UP判定 終了 ---

        } // --- 目くらまし 処理終了 ---

        console.log(`%cFinal Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`, 'font-weight: bold;');
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
        if (!selectedCharacter) {
            selectedCharacter = characters[0];
            console.log("No character selected, using first available:", selectedCharacter.name);
        }
        selectNextNpc(); // 先にNPCを選択

        // スコアとコインの初期化
        playerScore = INITIAL_PLAYER_SCORE;
        npcScore = NPC_START_SCORE_BASE; // NPCも初期スコアに
        totalScoreChange = 0; // 総得点変動をリセット
        playerCoins = 0; // コインもリセット
        playerCards = []; // 手札をクリア
        scoreAtWaveStart = INITIAL_PLAYER_SCORE; // WAVE開始スコアも初期化

        // 初期カード付与
        if (selectedCharacter && selectedCharacter.initialCardPool && selectedCharacter.initialCardPool.length > 0) {
            const randomCardIndex = Math.floor(Math.random() * selectedCharacter.initialCardPool.length);
            const initialCardId = selectedCharacter.initialCardPool[randomCardIndex];
            const initialCardDef = allCards.find(card => card.id === initialCardId);
            if (initialCardDef) {
                playerCards.push({ id: initialCardDef.id, level: 1 });
                console.log(`Added initial card for ${selectedCharacter.name} (New Game/Restart): ${initialCardDef.name}`);
            }
        }

        // その他の状態リセット
        currentWave = 1; defeatedCount = 0; currentBet = 0; isPlayerParent = true; playerDice = [0, 0, 0]; npcDice = [0, 0, 0]; playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false; gameHistory = []; baseMinBet = 50; currentMinBet = baseMinBet; consecutiveWins = 0; npcConsecutiveWins = 0; roundCount = 0; purchasedOrUpgradedInShop = []; currentRoundInWave = 0;
        // === フラグリセット ===
        activeCardUses = {}; ignoreMinBetActive = false; shopChoicePlus1Active = false; zoroChanceUpActive = false; avoid123_456Active = false; activeCardBeingUsed = null; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; freeRerollsAvailableThisShopVisit = 0; waitingForUserChoice = false; userChoiceResolver = null; shopConfirmationResolver = null;
        waitingForPlayerActionAfterRoll = false;
        drawBonusActive = false;
        riskyBetActive = false;
        // ===
        applyPlayerCardEffects();
        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        rollButton.disabled = true; historyButton.disabled = false; playerDiceEl.textContent = '-'; npcDiceEl.textContent = '-'; diceDisplayEl.textContent = '- - -'; diceDisplayEl.style.display = 'block';
        rollCounterEl.textContent = `0/${currentMaxRolls}回`;
        playerHandEl.className = 'hand-display'; npcHandEl.className = 'hand-display'; centerRoleAnnouncementEl.className = 'center-role'; centerRoleAnnouncementEl.textContent = ''; if (playerScoreEl.animationId) cancelAnimationFrame(playerScoreEl.animationId); if (npcScoreEl.animationId) cancelAnimationFrame(npcScoreEl.animationId); playerScoreEl.animationId = null; npcScoreEl.animationId = null; currentBetInfoEl.textContent = '';
        updateUI();
        showScreen('game-screen');
        startBettingPhase();
        console.log("--- initGame END ---");
    }
    // --- UI更新 ---
     function updateUI() {
        if (waveInfoEl) {
             const difficultyElText = difficulty === 'easy' ? '簡単' : difficulty === 'hard' ? '難しい' : '普通';
            waveInfoEl.innerHTML = `
                <span>WAVE: <span id="wave-number" class="wave-highlight">${currentWave}</span>/${MAX_WAVES}</span> |
                <span>ROUND: <span id="round-number" class="round-normal">${currentRoundInWave}</span></span> |
                <span>撃破数: <span id="defeated-count">${defeatedCount}</span></span> |
                <span>難易度: <span id="difficulty-display">${difficultyElText}</span></span>
                <span id="consecutive-wins-display" style="display: none;"></span>
            `;
            const consWinsDisplay = document.getElementById('consecutive-wins-display');
            if (consWinsDisplay) {
                consWinsDisplay.classList.remove('npc-losing-streak');
                if (isPlayerParent && consecutiveWins > 1) {
                    consWinsDisplay.textContent = ` (${consecutiveWins}連勝中!)`;
                    consWinsDisplay.style.display = 'inline';
                } else if (!isPlayerParent && npcConsecutiveWins > 1) {
                    consWinsDisplay.textContent = ` (相手${npcConsecutiveWins}連勝中...)`;
                    consWinsDisplay.classList.add('npc-losing-streak');
                    consWinsDisplay.style.display = 'inline';
                } else {
                    consWinsDisplay.textContent = '';
                    consWinsDisplay.style.display = 'none';
                }
            }
        }

        const playerInfoH2 = document.querySelector('#player-info h2');
        const npcInfoH2 = document.querySelector('#npc-info h2');
        if (playerInfoH2) playerInfoH2.innerHTML = `${selectedCharacter?.name || 'あなた'} <span id="player-parent-marker" class="parent-marker" style="display: ${isPlayerParent ? 'inline' : 'none'};">(親)</span>`;
        if (npcInfoH2) npcInfoH2.innerHTML = `${currentNpcCharacter?.name || 'NPC'} <span id="npc-parent-marker" class="parent-marker" style="display: ${!isPlayerParent ? 'inline' : 'none'};">(親)</span>`;
        displayCharacterImages();

        playerScoreEl.textContent = playerScore;
        npcScoreEl.textContent = npcScore;
        playerDiceEl.textContent = playerDice.every(d => d === 0) ? '-' : playerDice.join(' ');
        playerHandEl.textContent = getHandDisplayName(playerHand);
        npcDiceEl.textContent = npcDice.every(d => d === 0) ? '-' : npcDice.join(' ');
        npcHandEl.textContent = getHandDisplayName(npcHand);

        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        let displayMinBet = baseMinBet;
        if (keepParentDiscountNextRound) { displayMinBet = Math.max(1, Math.floor(baseMinBet / 2)); }
        const riskyBetCardCheck = playerCards.find(c => c.id === 'riskyBet');
        if (riskyBetActive && riskyBetCardCheck?.level === 1) { displayMinBet = baseMinBet * 2; }
        if (ignoreMinBetActive) { displayMinBet = 1; }
        currentMinBet = displayMinBet;
        minBetDisplayEl.textContent = `最低: ${currentMinBet}`;

        let maxRollsForTurn = isPlayerTurn ? currentMaxRolls : BASE_MAX_ROLLS;
        let currentRollCountForTurn = isPlayerTurn ? playerRollCount : npcRollCount;
        let turnText = `0/${maxRollsForTurn}回`;
        if (isGameActive || currentRoundInWave > 0) { turnText = `${currentRollCountForTurn}/${maxRollsForTurn}回`; }
        rollCounterEl.textContent = turnText;

        if (gameCoinDisplayEl) {
            gameCoinDisplayEl.textContent = `${playerCoins} G`;
        }
        if (shopScreen.classList.contains('active')) { updateShopUI(); }

        updateBetLimits();

        if (isGameActive && currentBet > 0) {
            const parentName = isPlayerParent ? (selectedCharacter?.name || "あなた") : (currentNpcCharacter?.name || "相手");
            currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${parentName})</span>`;
        } else if (!isGameActive && currentRoundInWave > 0 && playerScore >= currentMinBet && npcScore >= currentMinBet) {
             currentBetInfoEl.textContent = '賭け金設定中...';
        } else {
             currentBetInfoEl.textContent = '';
        }

        // NPC親ターンのコントロール表示制御
        const isNpcParentTurn = !isPlayerParent && !isGameActive && !waitingForPlayerActionAfterRoll;
        if (betMainControls) betMainControls.style.opacity = isNpcParentTurn ? '0.5' : '1';
        if (betMainControls) betMainControls.style.pointerEvents = isNpcParentTurn ? 'none' : 'auto';
        if (betActionContainer) betActionContainer.style.display = isNpcParentTurn ? 'none' : 'flex';
        gameScreen.classList.toggle('npc-parent', isNpcParentTurn);

        updateCardButtonHighlight();
    }

    // --- キャラクター画像表示関数 ---
    function displayCharacterImages() {
        const playerImageArea = document.querySelector('.character-image-area.player');
        const npcImageArea = document.querySelector('.character-image-area.npc');
        const placeholderText = (name) => `<span style="color:#aaa; font-size:0.9em;">${name} 画像</span>`;

        if (playerImageArea) {
            if (selectedCharacter && selectedCharacter.image && playerImageArea) {
                playerImageArea.innerHTML = `<img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" style="display: none;">`;
                const img = playerImageArea.querySelector('img');
                if (img) {
                    img.onload = () => img.style.display = 'block';
                    img.onerror = () => playerImageArea.innerHTML = placeholderText(selectedCharacter.name);
                }
            } else if (playerImageArea) {
                playerImageArea.innerHTML = placeholderText(selectedCharacter?.name || 'あなた');
            }
        }
        if (npcImageArea) {
             if (currentNpcCharacter && currentNpcCharacter.image && npcImageArea) {
                npcImageArea.innerHTML = `<img src="${currentNpcCharacter.image}" alt="${currentNpcCharacter.name}" style="display: none;">`;
                const img = npcImageArea.querySelector('img');
                 if (img) {
                     img.onload = () => img.style.display = 'block';
                     img.onerror = () => npcImageArea.innerHTML = placeholderText(currentNpcCharacter.name);
                 }
            } else if (npcImageArea) {
                npcImageArea.innerHTML = placeholderText(currentNpcCharacter?.name || 'NPC');
            }
        }
    }
    // --- カードボタンハイライト更新関数 ---
    function updateCardButtonHighlight() {
        if (!cardActionButton) return;
        let usableCardExists = false;

        const checkFunction = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll : checkCardUsability;

        for (const cardData of playerCards) {
            if (checkFunction(cardData.id)) {
                usableCardExists = true;
                break;
            }
        }
        const postRollCardBtn = document.getElementById('post-roll-card-button');
        if (postRollCardBtn) {
            postRollCardBtn.classList.toggle('highlight-card-button', usableCardExists);
        }
        cardActionButton.classList.toggle('highlight-card-button', usableCardExists);
    }

    // --- ショップ関連関数 ---
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
   // === カード強化説明取得  ===
   function getUpgradeDescription(cardData, level) {
    let conditionText = ""; // 発動条件/タイミング
    let effectText = "";    // 効果内容

    // カードIDに基づいて条件と効果を設定
    switch (cardData.id) {
        // --- 点数強化系 (Score) ---
        case 'arashiBonus':
            conditionText = "アラシで勝利した時 (パッシブ)"; // 自動 -> パッシブ
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'shigoroBonus':
            conditionText = "シゴロで勝利した時 (パッシブ)"; // 自動 -> パッシブ
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'oneEyeBonus':
            conditionText = "「1の目」で勝利した時 (パッシブ)"; // 自動 -> パッシブ
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'sixEyeBonus':
            conditionText = "「6の目」で勝利した時 (パッシブ)"; // 自動 -> パッシブ
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'hifumiHalf':
             conditionText = "ヒフミで敗北した時 (パッシブ)"; // 自動 -> パッシブ
             effectText = `支払いスコア計算時の基本倍率から ${level} 軽減される (最低0倍)。`;
             break;
         case 'shonbenHalf':
             conditionText = "ションベンで敗北した時 (パッシブ)"; // 自動 -> パッシブ
             // Lv1, 2, 3 で効果量は同じ
             effectText = `支払いスコア計算時の基本倍率から 0.5 軽減される (最低0倍)。※「見切り」使用時は適用外`;
             break;
         case 'fightingSpirit':
             conditionText = "勝利した時 (パッシブ、持ち点条件あり)"; // 自動 -> パッシブ
             const scoreConditionText = level >= 3 ? "相手と同値以下" : "相手の半分以下";
             const spiritBonusRateText = [10, 20, 30][level - 1];
             effectText = `自分の持ち点が${scoreConditionText}の場合、連勝ボーナスの増加量がさらに ${spiritBonusRateText}% 増える。`;
             break;
         case 'rewardAmplifier':
             conditionText = "自分の役/目が確定した後 (アクティブ)";
             const amplifierUses = level >= 3 ? '2' : '1';
             const amplifierBonus = level >= 2 ? '2' : '1';
             effectText = `WAVE中 ${amplifierUses}回 使用可能。使用したラウンドで「目」以上の役で勝利した場合、獲得スコア計算時の基本倍率に +${amplifierBonus} 加算される。`;
             break;
         case 'doubleUpBet':
             conditionText = "自分が子で、役/目が確定した後 (アクティブ)";
             const doubleUpBonus = [1.0, 1.5, 2.0][level - 1].toFixed(1);
             const doubleUpPenaltyText = (level <= 2) ? `失敗した場合、強制的にヒフミで敗北扱いとなる。` : `失敗してもペナルティはない。`;
             effectText = `WAVE中 1回 使用可能。使用して勝利した場合、獲得スコア計算時の基本倍率に +${doubleUpBonus} 加算される。${doubleUpPenaltyText}`;
             break;
        case 'betBoost':
            conditionText = "賭け金の上限を計算する時 (パッシブ)"; // 自動 -> パッシブ
            const boostMultiplierText = [1.2, 1.4, 1.6][level - 1].toFixed(1);
            effectText = `最大ベット額の上限が、自分の持ち点の ${boostMultiplierText}倍 に引き上げられる (ただし相手の持ち点を超えることはできない)。`;
            break;
        case 'lossInsurance':
            conditionText = "敗北時のスコア計算時 (パッシブ)"; // 自動 -> パッシブ
            const insuranceMultiplierText = [1.5, 1.3, 1.1][level - 1].toFixed(1); // Lv3 効果を反映
            effectText = `敗北時の支払いスコア計算を上書きし、「賭け金の ${insuranceMultiplierText}倍 (相手の連勝数に応じてさらに増加)」を支払うようになる。`;
            break;

        // --- 補助系 (Support) ---
        case 'reroll1':
            conditionText = "常時 (パッシブ)"; // 自動 -> パッシブ
            effectText = `サイコロの最大振り直し回数が、基本の${BASE_MAX_ROLLS}回に加えて +${level} され、合計 ${BASE_MAX_ROLLS + level} 回になる。`;
            break;
        case 'ignoreMinBet':
            conditionText = "賭け金設定フェーズ (アクティブ)";
            effectText = `WAVE中 ${level}回 使用可能。使用したラウンドでは、最低賭け金が強制的に 1点 になる。`;
            break;
        case 'shopChoicePlus1':
            conditionText = "ショップ利用時 (パッシブ)"; // 自動 -> パッシブ
            const rerollCostReductionText = level === 2 ? " さらにリロールコストが10G安くなる。" : level >= 3 ? " さらにリロールが無料になる。" : "";
            effectText = `次にショップを開いた時、提示されるカードの選択肢が 1枚 増える。${rerollCostReductionText}`;
            break;
        case 'drawBonus':
            conditionText = "自分の役/目が確定した後 (アクティブ)";
            const drawBonusUses = level >= 3 ? 3 : (level === 2 ? 2 : 1);
            const drawBonusGainText = level === 3 ? "100%" : "50%";
            effectText = `WAVE中 ${drawBonusUses}回 使用可能。使用したラウンドで引き分けになった場合、ボーナスとして賭け金の ${drawBonusGainText} を獲得する（スコアに加算）。※目なし時は使用不可`;
            break;
        case 'keepParentalRight':
            conditionText = "自分が親で敗北したラウンドの終了時 (アクティブ)"; // 選択式 -> アクティブ
            const keepUses = level >= 2 ? '2' : '1';
            const keepDiscountText = level >= 3 ? " さらに、次のラウンドの最低賭け金が半額になる。" : "";
            effectText = `WAVE中 ${keepUses}回 まで使用可能。使用すると、親で負けても親権を維持できる。${keepDiscountText}`;
            break;
        case 'handExchange':
            conditionText = "ショップ利用時 (パッシブ)"; // 自動 -> パッシブ
            const freeRerollsText = level >= 2 ? "2回" : "1回";
            const buyDiscountText = level >= 3 ? " さらに、そのショップでのカード購入・強化コストが10%割引される。" : "";
            effectText = `次にショップを開いた時、リロールが ${freeRerollsText} 無料になる。${buyDiscountText}`;
            break;
        case 'soulRoll':
             conditionText = "振り残り回数が0になった後 (アクティブ)";
             const soulCostPercent = [10, 5, 5][level - 1];
             const soulMenashiAvoidText = level >= 3 ? " Lv3効果: この追加ロールで目なしが出ても、回避できるまで振り直す。" : "";
             effectText = `WAVE中 1回 使用可能。自分の持ち点の ${soulCostPercent}% (最低1点) を消費して、追加で1回サイコロを振ることができる。${soulMenashiAvoidText}`;
             break;
        case 'riskyBet':
             conditionText = "賭け金設定フェーズ (アクティブ)";
             const riskyUses = level >= 3 ? '2' : '1';
             const riskyMinBetText = level === 1 ? " 最低賭け金も2倍になる。" : "";
             effectText = `WAVE中 ${riskyUses}回 使用可能。使用したラウンドの賭け金が強制的に2倍になる。${riskyMinBetText}`;
             break;
        case 'giveUpEye':
             conditionText = "自分のロール結果が「目なし」になった後 (アクティブ)";
             const giveUpUses = level;
             const giveUpPaymentText = level >= 2 ? " Lv2以上: 支払いスコア計算時の基本倍率が半分(0.5)になる。" : "";
             effectText = `WAVE中 ${giveUpUses}回 使用可能。使用すると、そのラウンドの結果を強制的に「ションベン」扱いに変更する（敗北確定）。${giveUpPaymentText}`;
             break;

        // --- 出目操作系 (Dice) ---
        case 'changeToOne':
            conditionText = "自分のロール後 (アクティブ)";
            const changeOneUses = level;
            effectText = `WAVE中 ${changeOneUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「1」に変更できる。`;
            break;
        case 'changeToSix':
            conditionText = "自分のロール後 (アクティブ)";
            const changeSixUses = level;
            effectText = `WAVE中 ${changeSixUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「6」に変更できる。`;
            break;
        case 'zoroChanceUp':
            conditionText = "自分のロール前 (アクティブ)";
            const zoroUses = level >= 3 ? '2' : '1';
            const zoroChanceText = ['少し上昇', '上昇', '大きく上昇'][level - 1];
            effectText = `WAVE中 ${zoroUses}回 使用可能。使用したラウンド中、ゾロ目が出る確率が${zoroChanceText}する。`;
            break;
        case 'avoid123_456':
            conditionText = "自分のロール前 (アクティブ)";
            const avoidUses = level >= 2 ? '2' : '1';
            const avoidMenashiText = level >= 3 ? " さらに「目なし」も回避する。" : "";
            effectText = `WAVE中 ${avoidUses}回 使用可能。使用したラウンド中、「ヒフミ」と「シゴロ」が出た場合に自動で振り直して回避する。${avoidMenashiText}`;
            break;
        case 'blessingDice':
            conditionText = "自分のロール前 (アクティブ)";
            const blessingUses = level >= 3 ? '2' : '1';
            const blessingChanceText = ['少し', 'そこそこ', 'かなり'][level - 1];
            effectText = `WAVE中 ${blessingUses}回 使用可能。使用したラウンド中、振ったサイコロの各目が${blessingChanceText}の確率で「6」に変わる。`;
            break;
        case 'adjustEye':
            conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
            const adjustUses = level >= 2 ? '2' : '1';
            const adjustAmountText = level >= 3 ? '±2' : '±1';
            effectText = `WAVE中 ${adjustUses}回 使用可能。「目」の数字 *以外* のサイコロを1つ選び、出目を ${adjustAmountText} できる（1未満や6超過は不可）。`;
            break;
        case 'stormWarning':
            conditionText = "自分のロール前 (アクティブ)";
            const stormRerollCount = level >= 2 ? '2' : '1';
            const stormTargetRoleText = level >= 3 ? 'アラシまたはピンゾロ' : 'アラシ';
            const stormBonusChanceText = [10, 15, 20][level - 1];
            effectText = `WAVE中 1回 使用可能。使用後の最初のロールで${stormTargetRoleText} *以外* が出た場合、最大 ${stormRerollCount}回 まで振り直し回数を消費せずに振り直せる。無料振り直し中はゾロ目確率が ${stormBonusChanceText}% 上昇し、低確率で結果がアラシになる。`;
            break;
        case 'nextChance':
            conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
            const nextChanceUses = level >= 3 ? '2' : '1';
            const nextChanceDiceCount = level >= 2 ? '1つまたは2つ' : '1つ';
            effectText = `WAVE中 ${nextChanceUses}回 使用可能。「目」の数字 *と同じ* サイコロを${nextChanceDiceCount}選んで振り直すことができる。`;
            break;
        case 'blindingDice':
             conditionText = "自分が親で、役/目が確定した後 (アクティブ)";
             const blindingAvoidChanceText = ['少し', 'そこそこ', '大きく'][level - 1];
             const blindingShonbenText = level >= 3 ? " さらに相手がションベンする確率も少し上げる。" : "";
             // 修正: (NPC)削除、良い役→役、確率が〜なる→確率が〜上がる
             effectText = `WAVE中 1回 使用可能。使用したラウンド中、相手が良い役（ピンゾロ/アラシ/シゴロ/ヒフミ）を出した場合に、それを無効化（目なし扱い）する確率が${blindingAvoidChanceText}上がる。${blindingShonbenText}`;
             break;

        default:
            // 未定義のカードIDの場合
            conditionText = "---";
            effectText = '---'; // フレーバーテキストは削除
            break;
    }

    // 最終的な説明文を組み立てて返す
    const conditionHtml = conditionText ? `<b>【発動条件/タイミング】</b><br>${conditionText}<br>` : '';
    return `${conditionHtml}<b>【効果】</b><br>${effectText}`;
}
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } }
    // === ショップを開く処理 ===
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
        const choiceCardCheck = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (choiceCardCheck) {
             shopChoicePlus1Active = false;
             console.log("Resetting Shop Choice+1 flag after use.");
        }

        const existingConfirmation = document.getElementById('shop-confirmation-buttons');
        if (existingConfirmation) existingConfirmation.remove();
        if(shopActionsEl) shopActionsEl.style.display = 'flex';

        setTimeout(() => {
            console.log("Updating shop UI after slight delay...");
            updateShopUI();
        }, 0);

        showScreen('shop-screen');
    }
    function closeShop() {
        console.log("Closing shop, proceeding to next wave.");
        currentWave++;

        playerScore = INITIAL_PLAYER_SCORE;
        scoreAtWaveStart = INITIAL_PLAYER_SCORE;
        npcScore = NPC_START_SCORE_BASE + defeatedCount * npcScoreIncrement;

        selectNextNpc();
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        currentMinBet = baseMinBet;
        isPlayerParent = true;
        playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
        consecutiveWins = 0; npcConsecutiveWins = 0;
        currentRoundInWave = 0;

        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';

        rollButton.disabled = true; historyButton.disabled = false;
        activeCardUses = {};
        keepParentRightUsedThisWave = 0;
        keepParentDiscountNextRound = false;
        waitingForPlayerActionAfterRoll = false;

        applyPlayerCardEffects();
        updateUI();
        showScreen('game-screen');
        startBettingPhase();
    }
   function selectNextNpc() {
    const availableNpcs = characters.filter(c =>
        c.id !== selectedCharacter.id &&
        !usedNpcCharacters.includes(c.id)
    );

    if (availableNpcs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableNpcs.length);
        currentNpcCharacter = availableNpcs[randomIndex];
        usedNpcCharacters.push(currentNpcCharacter.id);
    } else {
        console.log("All NPCs used or only player left, resetting NPC history.");
        usedNpcCharacters = [];
        const resettledAvailableNpcs = characters.filter(c => c.id !== selectedCharacter.id);
        if (resettledAvailableNpcs.length > 0) {
            const randomIndex = Math.floor(Math.random() * resettledAvailableNpcs.length);
            currentNpcCharacter = resettledAvailableNpcs[randomIndex];
            usedNpcCharacters.push(currentNpcCharacter.id);
        } else {
             currentNpcCharacter = selectedCharacter;
            console.warn("Critical issue: No available NPC found! Defaulting to player character.");
        }
    }
    console.log(`Selected NPC for Wave ${currentWave}: ${currentNpcCharacter?.name}`);

    currentNpcCardId = null;
    if (currentNpcCharacter && currentNpcCharacter.initialCardPool && currentNpcCharacter.initialCardPool.length > 0) {
        const randomCardIndex = Math.floor(Math.random() * currentNpcCharacter.initialCardPool.length);
        const npcCardId = currentNpcCharacter.initialCardPool[randomCardIndex];
        const cardDef = allCards.find(card => card.id === npcCardId);
        if (cardDef) {
            currentNpcCardId = cardDef.id;
            console.log(`NPC (${currentNpcCharacter.name}) is set to have initial card: ${cardDef.name} (ID: ${currentNpcCardId})`);
        } else {
            console.warn(`NPC initial card definition not found for ID: ${npcCardId}`);
        }
    } else {
        console.log(`NPC (${currentNpcCharacter?.name}) has no initial card pool defined.`);
    }
   }
   // === ショップオファー表示 ===
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
        if (isOwned && !isMaxLevel) { displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel); }
        else if (!isOwned) { displayCost = cardData.cost; }
        const exchangeCard = playerCards.find(c => c.id === 'handExchange');
        if(exchangeCard && exchangeCard.level >= 3) { displayCost = Math.floor(displayCost * 0.9); }

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
// === ショップUI更新関数 ===
function updateShopUI() {
    if (!shopScreen.classList.contains('active')) return;

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
        if (!offerData || !button) {
             console.warn(`Offer data or button not found for cardId: ${cardId} in updateShopUI`);
             if (button) button.style.display = 'none';
             if (costDisplayEl) costDisplayEl.textContent = 'エラー';
            return;
        }

        let cost = 0;
        const ownedCard = playerCards.find(c => c.id === cardId);
        const currentLevel = ownedCard ? ownedCard.level : 0;
        const isMaxLevel = ownedCard && currentLevel >= MAX_CARD_LEVEL;
        if (ownedCard && !isMaxLevel) {
            cost = getCostToUpgradeToNextLevel(offerData, currentLevel + 1);
        } else if (!ownedCard) {
            cost = offerData.cost;
        }
        const exchangeCard = playerCards.find(c => c.id === 'handExchange');
        if(exchangeCard && exchangeCard.level >= 3) {
             cost = Math.floor(cost * 0.9);
        }
        offerData.displayCost = cost;

        button.dataset.cost = cost;
        if (costDisplayEl) {
            costDisplayEl.textContent = isMaxLevel ? '最大Lv' : `${cost} G`;
        }

        if (ownedCard && isMaxLevel) {
            button.disabled = true;
            button.style.display = 'none';
        } else {
             button.disabled = playerCoins < cost;
             button.style.display = 'inline-block';
             button.textContent = ownedCard ? '強化' : '購入';
             button.classList.toggle('upgrade-button', !!ownedCard);
             button.classList.toggle('buy-button', !ownedCard);
        }
    });

    let currentRerollCost = REROLL_COST;
    const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
    if (shopChoiceCard) {
         if (shopChoiceCard.level === 2) currentRerollCost = Math.max(0, REROLL_COST - 10);
         else if (shopChoiceCard.level >= 3) currentRerollCost = 0;
    }

    let rerollButtonText = ""; let rerollDisabled = false;
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
            updateShopUI();
        } else if (action === 'buy') {
            if (playerCards.length >= MAX_HAND_CARDS) {
                 setShopMessage("手札がいっぱいです！売却するカードを選んでください。");
                 cardToDiscardFor = { ...offerData, cost: actualCost };
                 openDiscardModal(); return;
            }
            purchaseCard({ ...offerData, cost: actualCost });
        }
    }
    function purchaseCard(cardDefinition) {
        playerCoins -= cardDefinition.cost;
        playerCards.push({ id: cardDefinition.id, level: 1 });
        purchasedOrUpgradedInShop.push(cardDefinition.id);
        console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${cardDefinition.cost}G`);
        setShopMessage(`${cardDefinition.name} を購入しました！`);
        applyPlayerCardEffects();
        updateShopUI();
    }
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
        discardModal.style.display = 'flex';
    }
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
    function cancelDiscard() { cardToDiscardFor = null; discardModal.style.display = 'none'; setShopMessage(DEFAULT_SHOP_MESSAGE); }
    function setShopMessage(msg) {
        if (shopMessageEl) shopMessageEl.textContent = msg;
    }
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
        if (isNaN(cv)) {
            cv = currentMinBet;
            betInput.value = cv;
        }

        const canPlayerControlBet = isPlayerParent && !isGameActive;
        betInput.disabled = !canPlayerControlBet || playerScore < currentMinBet || waitingForPlayerActionAfterRoll;

        if (!betInput.disabled) {
            if (cv > maxBet) { betInput.value = maxBet; cv = maxBet; }
            else if (cv < currentMinBet) { betInput.value = currentMinBet; cv = currentMinBet; }
        } else {
             if (!isPlayerParent && !isGameActive && currentBet > 0) { betInput.value = currentBet; }
             else { betInput.value = currentMinBet; }
        }

        betAdjustButtons.forEach(b => {
            const a = parseInt(b.dataset.amount);
            const v = parseInt(betInput.value) || currentMinBet;
            b.disabled = betInput.disabled ||
                         (a > 0 && (v >= maxBet || v + a > maxBet)) ||
                         (a < 0 && (v <= currentMinBet || v + a < currentMinBet));
        });
        setBetButton.disabled = betInput.disabled;
        maxBetButton.disabled = betInput.disabled;
        minBetButton.disabled = betInput.disabled;
    }

    // === 賭けフェーズ開始 (drawBonusActiveリセット追加) ===
    function startBettingPhase() {
        console.log("--- startBettingPhase START ---");
        currentRoundInWave++;
        isGameActive = false;
        playerDice = [0, 0, 0]; npcDice = [0, 0, 0];
        playerHand = null; npcHand = null;
        playerRollCount = 0; npcRollCount = 0;
        rollButton.disabled = true;
        historyButton.disabled = false;
        currentBet = 0;
        // === ラウンド開始時フラグリセット ===
        activeCardBeingUsed = null; ignoreMinBetActive = false;
        zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null; riskyBetActive = false;
        waitingForPlayerActionAfterRoll = false;
        drawBonusActive = false; // ★ drawBonusActive フラグをリセット

        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
        if (keepParentDiscountNextRound) {
             currentMinBet = Math.max(1, Math.floor(baseMinBet / 2));
             keepParentDiscountNextRound = false;
        } else {
             currentMinBet = baseMinBet;
        }
         betInput.value = currentMinBet;
        updateUI();

        if (playerScore < currentMinBet) {
             setMessage(`あなたの持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、ゲームオーバーです。`);
             currentBetInfoEl.textContent = '';
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
             historyButton.disabled = true;
             setTimeout(() => showResultScreen(false, playerScore, currentWave, "最低賭け金不足"), 1000);
             return;
        }
        if (npcScore < currentMinBet) {
            defeatedCount++;
            const earnedCoins = calculateEarnedCoins();
            calculateAndAwardCoins();
            addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` });
            setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`);
            announceRoundResult(true, true);
            updateUI();
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
             if (nextWaveArea) nextWaveArea.style.display = 'flex';
            currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
            activeCardUses = {}; keepParentRightUsedThisWave = 0;
            historyButton.disabled = true;
            return;
        }

        currentBetInfoEl.textContent = '賭け金設定中...';
        const playerName = selectedCharacter?.name || 'あなた';
        const npcName = currentNpcCharacter?.name || '相手';

        if (isPlayerParent) {
            setMessage(`${playerName}(親)が賭け金を設定 (最低 ${currentMinBet}点)。`);
            updateBetLimits();
            updateCardButtonHighlight();
        } else {
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true;
            setMessage(`${npcName}(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);
                if (npcScore < npcBet || npcBet < currentMinBet) {
                     console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet})`);
                     defeatedCount++;
                     const earnedCoins = calculateEarnedCoins();
                     calculateAndAwardCoins();
                     addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `エラー: ${npcName}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！` });
                     setMessage(`エラー: ${npcName}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！`);
                     announceRoundResult(true, true);
                     updateUI();
                     if (betMainControls) betMainControls.style.display = 'none';
                     if (betActionContainer) betActionContainer.style.display = 'none';
                     if (actionArea) actionArea.style.display = 'none';
                     if (nextWaveArea) nextWaveArea.style.display = 'flex';
                     currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
                     activeCardUses = {}; keepParentRightUsedThisWave = 0;
                     historyButton.disabled = true;
                     return;
                }

                currentBet = npcBet;
                betInput.value = currentBet;
                console.log(`NPC (${npcName}, Parent) decided bet: ${currentBet} in Wave ${currentWave}`);
                currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${npcName})</span>`;
                setMessage(`${npcName}(親)が ${currentBet} 点で勝負！ ${npcName}がサイコロを振ります...`);
                isGameActive = true;
                isPlayerTurn = false;
                updateUI();
                const blindingCard = playerCards.find(c => c.id === 'blindingDice');
                const canUseBlinding = blindingCard && (getRemainingUses('blindingDice') > 0);
                 if (canUseBlinding && !isPlayerParent) {
                    setMessage(`${npcName}(親)が ${currentBet} 点で勝負！ ${npcName}がサイコロを振ります...`);
                     setTimeout(npcTurn, NPC_BET_DELAY / 2);
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
        if (maxBetPossible < npcMinPossibleBet) return npcMinPossibleBet;

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

    // --- three.js 関連 ---
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
    function setupThreeJS() {
        scene = new THREE.Scene();
        const containerWidth = diceRollModalDisplay.clientWidth || 300;
        const safeContainerWidth = containerWidth > 0 ? containerWidth : 300;
        const containerHeight = safeContainerWidth / (16/9);

        camera = new THREE.PerspectiveCamera(60, safeContainerWidth / containerHeight, 0.1, 1000);
        camera.position.set(0, DICE_SIZE * 1.5, DICE_SIZE * 4);
        camera.lookAt(0, 0, 0);

        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(safeContainerWidth, containerHeight);
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
    function resizeThreeJS() {
        if (!renderer || !camera || !diceRollModalDisplay) return;
        const containerWidth = diceRollModalDisplay.clientWidth;
        if (containerWidth <= 0) return;

        const containerHeight = containerWidth / (16 / 9);
        if (containerHeight > 0) {
            renderer.setSize(containerWidth, containerHeight);
            camera.aspect = containerWidth / containerHeight;
            camera.updateProjectionMatrix();
        }
    }
    window.addEventListener('resize', resizeThreeJS);
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

        const drawDot = (x, y) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); };

        if (value === 1) { drawDot(c, c); }
        else if (value === 2) { drawDot(q, q); drawDot(3 * q, 3 * q); }
        else if (value === 3) { drawDot(q, q); drawDot(c, c); drawDot(3 * q, 3 * q); }
        else if (value === 4) { drawDot(q, q); drawDot(3 * q, q); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); }
        else if (value === 5) { drawDot(q, q); drawDot(3 * q, q); drawDot(c, c); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); }
        else if (value === 6) { drawDot(q, q); drawDot(3 * q, q); drawDot(q, c); drawDot(3 * q, c); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); }

        return canvas;
    }
     function createDiceMesh(initialValue = 1) {
        const geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE);

        const textures = [
            new THREE.CanvasTexture(drawDiceFace(2)), // +X //ここの配置は変更しない
            new THREE.CanvasTexture(drawDiceFace(5)), // -X
            new THREE.CanvasTexture(drawDiceFace(1)), // +Y
            new THREE.CanvasTexture(drawDiceFace(6)), // -Y
            new THREE.CanvasTexture(drawDiceFace(4)), // +Z
            new THREE.CanvasTexture(drawDiceFace(3)), // -Z //ここまで
        ];

        const materials = textures.map(texture => new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.3,
            metalness: 0.1,
        }));

        const mesh = new THREE.Mesh(geometry, materials);
        mesh.userData = {
            value: initialValue,
            isRolling: true,
            targetQuaternion: new THREE.Quaternion().copy(mesh.quaternion),
            settleStartTime: 0,
            settleDuration: 800 + Math.random() * 400,
            rotationSpeed: new THREE.Vector3(
                (Math.random() - 0.5) * ROTATION_SPEED * 0.5,
                (Math.random() - 0.5) * ROTATION_SPEED * 0.5 + ROTATION_SPEED * 0.5,
                (Math.random() - 0.5) * ROTATION_SPEED * 0.5
            ),
        };
        return mesh;
    }
    function startDiceAnimation() {
        if (diceAnimationId) cancelAnimationFrame(diceAnimationId);
        const clock = new THREE.Clock();

        function animateLoop() {
            diceAnimationId = requestAnimationFrame(animateLoop);
            if (!scene || !camera || !renderer || !diceMeshes || diceMeshes.length === 0) return;

            const delta = clock.getDelta();
            const elapsedTime = performance.now();

            diceMeshes.forEach((dice) => {
                if(!dice || !dice.userData) return;

                if (dice.userData.isRolling) {
                    dice.rotation.x += dice.userData.rotationSpeed.x * delta * 1.5;
                    dice.rotation.y += dice.userData.rotationSpeed.y * delta * 1.5;
                    dice.rotation.z += dice.userData.rotationSpeed.z * delta * 1.5;
                } else {
                    const t = Math.min(1, (elapsedTime - dice.userData.settleStartTime) / dice.userData.settleDuration);
                    const easedT = 1 - Math.pow(1 - t, 3);
                    dice.quaternion.slerp(dice.userData.targetQuaternion, easedT * 0.2);
                }
            });

            renderer.render(scene, camera);
        }
        animateLoop();
    }
    function stopDiceAnimation() { if (diceAnimationId) { cancelAnimationFrame(diceAnimationId); diceAnimationId = null; } }
    function getTargetQuaternionForValue(resultValue) {
        const targetQuaternion = new THREE.Quaternion();
        switch (resultValue) {
            case 4: targetQuaternion.set(0, 0, 0, 1); break; // -Z
            case 3: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); break; // +Z
            case 1: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); break; // +Y
            case 6: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2); break; // -Y
            case 2: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); break; // -X
            case 5: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); break; // +X
            default: targetQuaternion.set(0, 0, 0, 1); break;
        }
        return targetQuaternion;
    }
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
            if (!dice || !dice.userData) return;
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
                if (dice && dice.userData) {
                    dice.userData.isRolling = false;
                    dice.userData.targetQuaternion = getTargetQuaternionForValue(value);
                    dice.userData.settleStartTime = performance.now();
                    dice.userData.settleDuration = 900 + Math.random() * 400;
                    console.log(`Dice ${index} settling to show ${value}`);
                }
            }, settleDelay);
        });

        const totalDuration = settleDelayBase + (finalDice.length - 1) * settleDelayOffset + 1500;
        setTimeout(() => {
             diceMeshes.forEach(d => { if(d && d.userData) { d.userData.isRolling = false; d.quaternion.copy(d.userData.targetQuaternion); } });
             console.log("Dice animation complete.");
            onComplete();
        }, totalDuration);
    }

    // --- 役アナウンス、勝敗アナウンス、手札ハイライト、スコアアニメーション、スコアポップアップ、賭け金調整 ---
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
    function announceRoundResult(isPlayerWin, isWaveEnd = false) {
        if (centerRoleAnnounceTimeout) clearTimeout(centerRoleAnnounceTimeout);
        if (centerResultAnnounceTimeout) clearTimeout(centerResultAnnounceTimeout);
        centerRoleAnnouncementEl.textContent = '';
        centerRoleAnnouncementEl.className = 'center-role';
        let text = ''; let cssClass = ''; let duration = CENTER_RESULT_DURATION;

        if (isWaveEnd) {
            if (isPlayerWin) { text = 'WAVE CLEAR!'; cssClass = 'result-wave-clear'; duration = 2500; }
            else { text = 'GAME OVER'; cssClass = 'result-game-over'; duration = 2500; }
        } else {
            if (isPlayerWin) { text = '勝ち！'; cssClass = 'result-win'; }
            else { text = '負け...'; cssClass = 'result-lose'; }
        }

        const noBackgroundResults = ['result-wave-clear', 'result-game-over'];
        if (!noBackgroundResults.includes(cssClass)) { centerRoleAnnouncementEl.style.backgroundColor = 'rgba(20, 20, 30, 0.7)'; }
        else { centerRoleAnnouncementEl.style.backgroundColor = 'transparent'; }

        centerRoleAnnouncementEl.textContent = text;
        centerRoleAnnouncementEl.style.setProperty('--center-role-duration', `${duration / 1000}s`);
        centerRoleAnnouncementEl.classList.add('role-appear', cssClass);
        centerResultAnnounceTimeout = setTimeout(() => { centerRoleAnnouncementEl.classList.remove('role-appear', cssClass); centerRoleAnnouncementEl.textContent = ''; }, duration);
    }
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
            if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${currentScore} G`; }
            else { element.textContent = currentScore; }
            if (progress < 1) { element.animationId = requestAnimationFrame(step); }
            else {
                 if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${endScore} G`; }
                 else { element.textContent = endScore; }
                 element.animationId = null;
            }
        }
        element.animationId = requestAnimationFrame(step);
    }
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
    function changeBet(amount) {
        if (betInput.disabled) return;
        let cv = parseInt(betInput.value);
        if (isNaN(cv)) { cv = currentMinBet; }
        const max = parseInt(betInput.max);
        let nv = cv + amount;
        if (nv > max) nv = max; else if (nv < currentMinBet) nv = currentMinBet;
        if (nv !== cv) { betInput.value = nv; updateBetLimits(); }
    }
    function startBetHold(amount) { stopBetHold(); betHoldAmount = amount; changeBet(betHoldAmount); betHoldTimeout = setTimeout(() => { betHoldInterval = setInterval(() => { changeBet(betHoldAmount); }, BET_HOLD_INTERVAL); }, BET_HOLD_DELAY); }
    function stopBetHold() { clearTimeout(betHoldTimeout); clearInterval(betHoldInterval); betHoldTimeout = null; betHoldInterval = null; }

       // --- イベントリスナー ---
       difficultyButtons.forEach(b => b.addEventListener('click', () => setDifficulty(b.dataset.difficulty)));
       startGameButton.addEventListener('click', () => { const sb = document.querySelector('.difficulty-button.selected'); setDifficulty(sb ? sb.dataset.difficulty : 'normal'); initGame(false); });
       betAdjustButtons.forEach(button => { const amount = parseInt(button.dataset.amount); button.addEventListener('mousedown', (e) => { if (e.button !== 0) return; startBetHold(amount); }); button.addEventListener('mouseup', stopBetHold); button.addEventListener('mouseleave', stopBetHold); button.addEventListener('touchstart', (e) => { e.preventDefault(); startBetHold(amount); }, { passive: false }); button.addEventListener('touchend', stopBetHold); button.addEventListener('touchcancel', stopBetHold); });
       betInput.addEventListener('change', () => { if (!betInput.disabled) updateBetLimits(); });
       maxBetButton.addEventListener('click', () => { if (betInput.disabled) return; if (playerScore >= currentMinBet) { betInput.value = betInput.max; updateBetLimits(); } else { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満です。`); } });
       minBetButton.addEventListener('click', () => { if (betInput.disabled) return; betInput.value = currentMinBet; updateBetLimits(); });

       // 賭け金決定ボタン
       setBetButton.addEventListener('click', () => {
           if (!isPlayerParent || betInput.disabled || isGameActive || waitingForPlayerActionAfterRoll) return;
           updateBetLimits();

           if (playerScore < currentMinBet) { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満のため、賭けられません。`); return; }
           if (npcScore < currentMinBet) {
               defeatedCount++;
               const earnedCoins = calculateEarnedCoins();
               calculateAndAwardCoins();
               addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` });
               setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`);
               announceRoundResult(true, true);
               updateUI();
               if (betMainControls) betMainControls.style.display = 'none';
               if (betActionContainer) betActionContainer.style.display = 'none';
               if (actionArea) actionArea.style.display = 'none';
               if (nextWaveArea) nextWaveArea.style.display = 'flex';
               currentBetInfoEl.textContent = ''; currentRoundInWave = 0;
               activeCardUses = {}; keepParentRightUsedThisWave = 0;
               historyButton.disabled = true;
               return;
           }

           let bv = parseInt(betInput.value);
           if (isNaN(bv)) {
               setMessage(`無効な賭け金です。`); betInput.value = currentMinBet; updateBetLimits(); return;
           }
           const maxBet = parseInt(betInput.max);

           if (bv >= currentMinBet && bv <= maxBet) {
               currentBet = bv;
               if(riskyBetActive) {
                    const riskyCard = playerCards.find(c => c.id === 'riskyBet');
                    if(riskyCard) {
                        currentBet *= 2;
                        currentBet = Math.min(currentBet, npcScore, playerScore);
                        console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`);
                        activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1;
                    }
                    riskyBetActive = false;
                    updateUI();
                    betInput.value = currentBet;
                    updateBetLimits();
               }


               isGameActive = true; isPlayerTurn = true;
               const playerName = selectedCharacter?.name || 'あなた';
               currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${playerName})</span>`;
               setMessage(`賭け金 ${currentBet} で勝負！ ${playerName}(親)がサイコロを振ってください。`);
               betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true;
               rollButton.disabled = false;
               historyButton.disabled = false;
               updateUI();
           } else {
               setMessage(`賭け金を正しく設定 (${currentMinBet}～${maxBet})。`); updateBetLimits();
           }
       });

    // === サイコロを振るボタン ===
    rollButton.addEventListener('click', async () => {
        // 基本的なガード節 
        if (playerScore <= 0 || !isGameActive || !isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll) {
            checkGameEnd();
            return;
        }

        let isFreeRoll = stormWarningRerollsLeft > 0;
        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');

        // --- 魂の一振り使用確認フェーズ ---
        // 条件：ロール回数超過、無料ロールなし、魂フラグOFF、操作待ちOFF、使用回数残あり
        const canUseSoulRollCheck = soulRollCard && playerRollCount >= currentMaxRolls && !isFreeRoll && !soulRollUsedThisTurn && !waitingForPlayerActionAfterRoll && getRemainingUses('soulRoll') > 0;
        if (canUseSoulRollCheck) {
            waitingForPlayerActionAfterRoll = true;
            setMessage("振り残り回数がありません。「魂の一振り」を使用できます。どうしますか？", 'postRollChoice');
            rollButton.disabled = true;
            updateCardButtonHighlight();
            updateBetLimits();
            return; // ユーザーの選択待ち
        }

        // 条件：ロール回数未満、または無料ロールあり、または魂の一振り使用直後
        const canRoll = playerRollCount < currentMaxRolls || isFreeRoll || soulRollUsedThisTurn;
        if (!canRoll) {
            setMessage("振り残り回数がありません。");
            return; // ロール不可
        }

        // --- ロール実行 ---
        if (isFreeRoll) {
            stormWarningRerollsLeft--;
            console.log("Using Storm Warning free reroll.");
        } else if (!soulRollUsedThisTurn) { // 魂の一振り使用直後でなければカウントアップ
            playerRollCount++;
        }
        // 魂の一振り使用直後は playerRollCount は加算しないが、ロールは実行する

        rollButton.disabled = true; historyButton.disabled = true;
        const playerName = selectedCharacter?.name || 'あなた';
        setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 振っています...`);
        showDiceRollModal(); updateUI();

        const soulRollLvFor判定 = (soulRollCard && soulRollUsedThisTurn) ? soulRollCard.level : 0;
        const finalDice = rollDice(false, 0, soulRollLvFor判定);

        // --- animateDiceRoll コールバック内 ---
        animateDiceRoll(finalDice, async () => {
            playerDice = finalDice;
            if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
            hideDiceRollModal(); diceDisplayEl.textContent = finalDice.join(' ');

            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Player Rolled:", playerDice, "Hand:", playerHand);
            updateUI(); highlightHand(playerHandEl, playerHand);

            // --- 嵐の予感効果適用 ---
            let stormWarningAppliedThisRoll = false;
            const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
            if (stormWarningActive && stormCardCheck) {
                const stormLevelCheck = stormCardCheck.level;
                const targetRoles = (stormLevelCheck >= 3) ? [ROLES.ARASHI.name, ROLES.PINZORO.name] : [ROLES.ARASHI.name];
                if (!(playerHand.type === '役' && targetRoles.includes(playerHand.name))) {
                     stormWarningRerollsLeft = (stormLevelCheck >= 2) ? 2 : 1;
                     stormWarningAppliedThisRoll = true;
                     console.log(`Card Effect: 嵐の予感発動！ Target role not hit. ${stormWarningRerollsLeft} free rerolls available.`);
                     setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 嵐の予感効果！ アラシ/ピンゾロが出なかったので無料振り直しが ${stormWarningRerollsLeft} 回可能です。再度振ってください。`);
                     rollButton.disabled = false;
                     historyButton.disabled = false;
                     updateCardButtonHighlight();
                     stormWarningActive = false;
                     activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1;
                     // 魂の一振り使用済みフラグが残らないようにリセット
                     if (soulRollUsedThisTurn) soulRollUsedThisTurn = false;
                     return; // 後続処理スキップ
                } else {
                    console.log(`Card Effect: 嵐の予感 - Target role ${playerHand.name} hit! No free reroll.`);
                    stormWarningActive = false;
                    activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1;
                }
            }

           // 魂の一振り使用済みフラグをリセット (ロールが完了したので)
           if (soulRollUsedThisTurn) {
                console.log("Resetting soulRollUsedThisTurn flag after successful roll.");
                soulRollUsedThisTurn = false;
           }

           // 通常のロール後処理 
           const hasUsablePostRollCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));

           if (playerHand.type === '役' || playerHand.type === '目') {
               if (hasUsablePostRollCard) {
                   const handName = getHandDisplayName(playerHand);
                   waitingForPlayerActionAfterRoll = true;
                   updateBetLimits(); rollButton.disabled = true; historyButton.disabled = false;
                   setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ${handName}！どうしますか？`, 'postRollChoice');
                   updateCardButtonHighlight();
               } else {
                   const handName = getHandDisplayName(playerHand);
                   rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
                   announceRoleResult(playerHand);
                   if (isPlayerParent) {
                       setMessage(`${playerName}(親): ${handName}！ 自動で${currentNpcCharacter?.name || '相手'}(子)の番です。`);
                       setTimeout(npcTurn, 1400);
                   } else {
                       setMessage(`${playerName}(子): ${handName}！ 自動で勝負！`);
                       setTimeout(handleRoundEnd, 1000);
                   }
               }
           } else if (playerHand.type === 'ションベン') {
               setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
               rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
               setTimeout(handleRoundEnd, 800);
           } else if (playerHand.type === '目なし') {
               let canReroll = playerRollCount < currentMaxRolls;
               let hasStormWarningReroll = stormWarningRerollsLeft > 0;
               let messageSuffix = hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)` : '';
               const canUseSoulRollPostMenashi = soulRollCard && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;

               if (hasUsablePostRollCard || (!canReroll && !hasStormWarningReroll && canUseSoulRollPostMenashi)) {
                   waitingForPlayerActionAfterRoll = true;
                   updateBetLimits(); rollButton.disabled = true; historyButton.disabled = false;
                   const rerollStatus = (canReroll || hasStormWarningReroll) ? "(振り直し可能)" : (canUseSoulRollPostMenashi ? "(魂の一振り使用可能)" : "(振り直し不可)");
                   setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！どうしますか？ ${rerollStatus}`, 'postRollChoice');
                   updateCardButtonHighlight();
               } else {
                   if (canReroll || hasStormWarningReroll) {
                       setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${messageSuffix}`);
                       rollButton.disabled = false; historyButton.disabled = false;
                   } else {
                       playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                       updateUI(); setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                       highlightHand(playerHandEl, playerHand); isPlayerTurn = false; rollButton.disabled = true; historyButton.disabled = false;
                       setTimeout(handleRoundEnd, 800);
                   }
               }
           }
       });
   });

    nextWaveButton.addEventListener('click', openShop);
    restartSameDifficultyButton.addEventListener('click', () => { initGame(true); });
    changeDifficultyButton.addEventListener('click', () => { showScreen('title-screen'); });
    historyButton.addEventListener('click', () => { if (diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll) return; displayHistory(); historyModal.style.display = 'flex'; });
    closeHistoryModalButton.addEventListener('click', () => { historyModal.style.display = 'none'; });
    closeCardListModalButton.addEventListener('click', () => cardListModal.style.display = 'none');
    closeDiceRollModalButton.addEventListener('click', hideDiceRollModal);

     // === NPCターン ===
     function npcTurn() {
        if (!isGameActive || isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll) return;

        npcRollCount++;
        historyButton.disabled = true;
        const npcName = currentNpcCharacter?.name || '相手';
        setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 振っています...`);
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
                  console.log("Blinding Dice forced reroll for NPC on Menashi.");
                  forcedReroll = true;
                  setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。目くらましで再度振ります...`);
                  setTimeout(npcTurn, 1000);
                  return;
             }

            updateUI(); highlightHand(npcHandEl, npcHand);
            const playerName = selectedCharacter?.name || 'あなた';

            if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
                const handName = getHandDisplayName(npcHand);
                historyButton.disabled = false;

                if (!isPlayerParent && npcHand.type !== 'ションベン') {
                    setMessage(`${npcName}(親): ${handName}！ ${playerName}(子)の番です。`);
                    isPlayerTurn = true;
                    rollButton.disabled = false;
                    updateCardButtonHighlight();
                } else {
                    setMessage(`${npcName}(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`) : '勝負！'}`);
                     rollButton.disabled = true;
                    setTimeout(handleRoundEnd, 1000);
                }
            } else if (npcHand.type === '目なし') {
                if (npcRollCount < BASE_MAX_ROLLS) {
                    setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`);
                    setTimeout(npcTurn, 1000);
                } else {
                    npcHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                    updateUI();
                    setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`}`);
                    highlightHand(npcHandEl, npcHand);
                    rollButton.disabled = true;
                    historyButton.disabled = false;
                    setTimeout(handleRoundEnd, 800);
                }
            }
             updateCardButtonHighlight();
        });
    }

   // === スキップボタン処理  ===
   function handleSkipAction() {
    if (!waitingForPlayerActionAfterRoll) return;

    console.log("Skip button clicked.");
    waitingForPlayerActionAfterRoll = false;
    messageButtonContainer.innerHTML = '';
    activeCardBeingUsed = null;

    const handName = getHandDisplayName(playerHand);
    const playerName = selectedCharacter?.name || 'あなた';
    const npcName = currentNpcCharacter?.name || 'NPC';

    if (playerHand && playerHand.type !== '目なし') {
        announceRoleResult(playerHand);
    }

    // 魂の一振り待ち状態でのスキップ処理 
    const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
    // 条件：目なし、振り切り、魂フラグOFF、使用回数残あり
    const canUseSoulRollOnSkip = soulRollCard && playerHand?.type === '目なし' && playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0 && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;

    if (canUseSoulRollOnSkip) { // 振り切り後目なしで、魂の一振り使用可能だった場合
        console.log("Skipped Soul Roll choice, confirming Shonben.");
        playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
        updateUI();
        setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
        highlightHand(playerHandEl, playerHand);
        isPlayerTurn = false;
        rollButton.disabled = true;
        historyButton.disabled = false;
        setTimeout(handleRoundEnd, 800);
    }
    else if (playerHand && playerHand.type === '目なし') { // 通常の目なし、または魂の一振り待ちでない場合
        let canReroll = playerRollCount < currentMaxRolls;
        let hasStormWarningReroll = stormWarningRerollsLeft > 0;
        if (canReroll || hasStormWarningReroll) {
            // スキップ = 振り直す
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)`:''}`);
            rollButton.disabled = false;
            historyButton.disabled = false;
            updateUI();
            updateBetLimits();
            updateCardButtonHighlight();
        } else {
            // スキップ = ションベン確定
            playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
            updateUI();
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
            highlightHand(playerHandEl, playerHand);
            isPlayerTurn = false;
            rollButton.disabled = true;
            historyButton.disabled = false;
            setTimeout(handleRoundEnd, 800);
        }
    }
    else if (playerHand && (playerHand.type === '役' || playerHand.type === '目')) {
        if (isPlayerParent) {
            isPlayerTurn = false;
            setMessage(`${playerName}(親): ${handName}！ スキップして${npcName}(子)の番です。`);
            updateUI();
            updateBetLimits();
            setTimeout(npcTurn, 1400);
        } else {
            isPlayerTurn = false;
            setMessage(`${playerName}(子): ${handName}！ スキップして勝負！`);
            updateUI();
            updateBetLimits();
            setTimeout(handleRoundEnd, 1000);
        }
    } else {
        console.warn("Skip action called with unexpected playerHand:", playerHand);
        startBettingPhase();
    }
}

    // === 親権維持確認関数 ===
    async function askKeepParentRight(cardLevel) {
        const maxKeepUses = (cardLevel >= 2 ? 2 : 1);
        const usedCount = activeCardUses['keepParentalRight'] || 0;
        setMessage(`親権維持カード(Lv.${cardLevel})を使用しますか？ (WAVE中 残り${maxKeepUses - usedCount}回)`, 'yesNo');
        const useCard = await waitForUserChoice();
        return useCard;
    }

           // === ラウンド終了処理 ===
           async function handleRoundEnd() {
            if (waitingForUserChoice || waitingForPlayerActionAfterRoll) return;
    
            isGameActive = false; rollButton.disabled = true;
            historyButton.disabled = false;
    
            // === ラウンド終了時フラグリセット ===
            zoroChanceUpActive = false;
            avoid123_456Active = false;
            blessingDiceActive = false;
            blindingDiceActive = false;
            rewardAmplifierActive = false;
            adjustEyeUsedThisTurn = false;
            nextChanceUsedThisTurn = false;
            soulRollUsedThisTurn = false;
            doubleUpBetActive = false;
            riskyBetActive = false;
    
            let pWin = false, nWin = false, draw = false;
            let msg = "", sc = 0, rClass = 'draw'; // sc の初期値は 0
            let parentChanged = false; let preventParentChange = false; let parentKeptByCard = false;
            const parentBefore = isPlayerParent ? 'Player' : 'NPC';
            const playerInitialScore = playerScore; 
            const npcInitialScore = npcScore;     
    
            const playerName = selectedCharacter?.name || 'あなた';
            const npcName = currentNpcCharacter?.name || '相手';
    
            let baseMultiplier = 1.0;
            let multiplierBonus = 0;
            let streakBonusRate = 0.0;
            let paymentRateModifier = 1.0;
            let isHifumiLoss = false;
            let effectiveMultiplier = 0;
            let finalAmount = 0;
            let insuranceApplied = false;
    
             // --- 1. 勝敗判定 ---
             if (playerHand?.type === 'ションベン') nWin = true; // プレイヤーがションベンならNPC勝利
             else if (npcHand?.type === 'ションベン') pWin = true; // NPCがションベンならプレイヤー勝利
             else { // 両者ションベンでない場合、役の強さで比較
                 const getStrength = (hand) => {
                     if (!hand) return -Infinity;
                     if (hand.type === 'ションベン') return ROLES.SHONBEN.strength;
                     if (hand.type === '目なし') return ROLES.MENASHI.strength;
                     if (hand.name === ROLES.HIFUMI.name) return ROLES.HIFUMI.strength;
                     if (hand.type === '目') return ROLES.NORMAL_EYE.strength + hand.value / 10; // 目は数値も加味
                     if (hand.name === ROLES.SHIGORO.name) return ROLES.SHIGORO.strength;
                     if (hand.name === ROLES.ARASHI.name) return ROLES.ARASHI.strength + hand.value / 10; // アラシは数値も加味
                     if (hand.name === ROLES.PINZORO.name) return ROLES.PINZORO.strength;
                     return -Infinity;
                 };
                 const playerStrength = getStrength(playerHand);
                 const npcStrength = getStrength(npcHand);
    
                 if (playerStrength > npcStrength) pWin = true;
                 else if (playerStrength < npcStrength) nWin = true;
                 else draw = true;
             }
    
             // --- 親権維持カード判定 ---
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
    
            // --- 連勝カウントと親交代判定 ---
            if (pWin) {
                if (isPlayerParent) { consecutiveWins++; npcConsecutiveWins = 0; }
                else { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = true; }
            } else if (nWin) {
                if (!isPlayerParent) { npcConsecutiveWins++; consecutiveWins = 0; }
                else { consecutiveWins = 0; npcConsecutiveWins = 0; if (!preventParentChange) { parentChanged = true; isPlayerParent = false; } }
            } else { // draw
                 if (!isPlayerParent) consecutiveWins = 0; else npcConsecutiveWins = 0;
            }
       
        // --- スコア計算 ---
        if (draw) {
            // sc = 0; // ★ 初期値0は維持しつつ、ボーナスで上書きする可能性あり
            msg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
            rClass = 'draw';

            // ★★★ 引き分けボーナスカードの効果 (スコア加算) ★★★
            const drawBonusCardCheck = playerCards.find(c => c.id === 'drawBonus');
            if (drawBonusActive && drawBonusCardCheck) { // このラウンドでカードが使用されたフラグをチェック
                const scoreGainPercent = (drawBonusCardCheck.level === 3) ? 1.0 : 0.5; // Lv3は100%, Lv1/2は50%
                const scoreGain = Math.floor(currentBet * scoreGainPercent); // スコア増加量を計算
                if (scoreGain > 0) {
                    sc = scoreGain; // ★ スコア変動(sc)に増加量を代入
                    msg += ` (引き分けボーナス: +${sc}点)`; // メッセージにスコア変動を追記
                    console.log(`Card Effect: 引き分けボーナス Lv.${drawBonusCardCheck.level} 適用！ スコア +${sc}`);
                    // playCoinAnimation は削除
                    // animateScore は後続の共通処理で行われる

                    // ★ 効果が発動した場合にのみ使用回数をカウント
                    activeCardUses['drawBonus'] = (activeCardUses['drawBonus'] || 0) + 1;
                    console.log(`Draw Bonus card used. Remaining uses: ${getRemainingUses('drawBonus')}`);
                }
            }
        } else { // pWin or nWin
            const winnerHand = pWin ? playerHand : npcHand;
            const loserHand = pWin ? npcHand : playerHand;

                // 2. 基本倍率 (baseMultiplier) 決定
                if (pWin) { // Player Win
                     if (loserHand?.name === ROLES.HIFUMI.name) { // vs ヒフミ
                         if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6;
                         else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4;
                         else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3;
                         else if (winnerHand?.type === '目') baseMultiplier = 2;
                         else baseMultiplier = 2; // 通常の目以外 (目なし等) vs ヒフミの場合
                     } else if (loserHand?.type === 'ションベン') { // vs ションベン
                         baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); // 勝者の役倍率 (最低1)
                     } else { // vs 通常の目, シゴロ, アラシ, ピンゾロ
                         baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); // 勝者の役倍率 (最低1)
                     }
                } else { // NPC Win (Player Lose)
                    // 敗北時の基本倍率 (支払う側)
                    if (loserHand?.name === ROLES.HIFUMI.name) { // 自分がヒフミで負け
                        isHifumiLoss = true;
                        // 相手の役に応じて支払う倍率が変わる
                        if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6;
                        else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4;
                        else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3;
                        else if (winnerHand?.type === '目') baseMultiplier = 2;
                        else baseMultiplier = 2; // 相手が目なし等の場合
                    } else if (loserHand?.type === 'ションベン') { // 自分がションベンで負け
                         baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); // 相手の役倍率 (最低1)
                    } else { // 自分が通常の目などで負け
                        baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); // 相手の役倍率 (最低1)
                    }
                    // ダブルアップ失敗時のヒフミ扱い
                     const doubleUpCardCheck = playerCards.find(c => c.id === 'doubleUpBet');
                     // このラウンドで使用されたかは activeCardUses の変動で見る (より正確には handleActiveCardUse でフラグを立てるべき)
                     const usedDoubleUpThisRound = activeCardUses['doubleUpBet'] > (activeCardUses['doubleUpBet_roundStartCount'] || 0); // 仮のチェック方法
                     if (doubleUpCardCheck && usedDoubleUpThisRound && !isPlayerParent) { // 子でダブルアップ使用 -> 負けた場合
                         if (doubleUpCardCheck.level <= 2) { // Lv1, 2 はペナルティあり
                             console.log(`Card Effect: ダブルアップ失敗 Lv.${doubleUpCardCheck.level} -> ヒフミ負け扱い！`);
                             isHifumiLoss = true; // ヒフミ負け扱いに変更
                             // ヒフミ負け時の倍率を再適用
                             if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6;
                             else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4;
                             else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3;
                             else if (winnerHand?.type === '目') baseMultiplier = 2;
                             else baseMultiplier = 2;
                             console.log(` -> Base Multiplier recalculated to: ${baseMultiplier}`);
                         } else { // Lv3 はペナルティなし
                             console.log(`Card Effect: ダブルアップ失敗 Lv.3 -> ペナルティなし`);
                             // baseMultiplier は通常の敗北時のまま
                         }
                     }
                }
                console.log(`[${pWin?'Win':'Lose'}] Base Multiplier (vs ${getHandDisplayName(loserHand)}): ${baseMultiplier}`);
    
                 // --- 3. カードによる倍率ボーナス (multiplierBonus) 計算 ---
                 multiplierBonus = 0;
                 if (pWin) { // Player Win Bonus
                     playerCards.forEach(cardData => {
                         const cardDef = allCards.find(c => c.id === cardData.id);
                         if (!cardDef || !cardDef.effectTag) return;
                         const level = cardData.level;
                         switch (cardDef.effectTag) {
                             case 'arashiBonus': if (winnerHand?.name === ROLES.ARASHI.name) { multiplierBonus += level; console.log(`Card Effect: アラシ強化 Lv.${level} (+${level})`); } break;
                             case 'shigoroBonus': if (winnerHand?.name === ROLES.SHIGORO.name) { multiplierBonus += level; console.log(`Card Effect: シゴロ強化 Lv.${level} (+${level})`); } break;
                             case 'oneEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 1) { multiplierBonus += level; console.log(`Card Effect: 1の目ボーナス Lv.${level} (+${level})`); } break;
                             case 'sixEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 6) { multiplierBonus += level; console.log(`Card Effect: 6の目ボーナス Lv.${level} (+${level})`); } break;
                         }
                     });
                     const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier');
                     // このラウンドで使用されたかは activeCardUses の変動で見る
                     const usedAmplifierThisRound = activeCardUses['rewardAmplifier'] > (activeCardUses['rewardAmplifier_roundStartCount'] || 0); // 仮のチェック方法
                     if (amplifierCard && usedAmplifierThisRound && (winnerHand?.type === '役' || winnerHand?.type === '目')) {
                          const bonusValue = (amplifierCard.level >= 2) ? 2 : 1;
                          multiplierBonus += bonusValue;
                          console.log(`Card Effect: 報酬増幅 Lv.${amplifierCard.level} (+${bonusValue})`);
                     }
                     const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                     // このラウンドで使用されたかは activeCardUses の変動で見る
                     const usedDoubleUpThisRoundWin = activeCardUses['doubleUpBet'] > (activeCardUses['doubleUpBet_roundStartCount'] || 0); // 仮のチェック方法
                     if (doubleUpCard && usedDoubleUpThisRoundWin && !isPlayerParent) { // 子での使用のみ
                          const bonusValue = [1.0, 1.5, 2.0][(doubleUpCard.level || 1) - 1];
                          multiplierBonus += bonusValue;
                          console.log(`Card Effect: ダブルアップ成功 Lv.${doubleUpCard.level} (+${bonusValue.toFixed(1)})`);
                     }
                 }
                 else { // NPC Win (Player Lose) - Penalty Reduction
                    playerCards.forEach(cardData => {
                        const cardDef = allCards.find(c => c.id === cardData.id);
                        if (!cardDef) return;
                        const level = cardData.level;
                        // ヒフミ軽減
                        if (cardDef.effectTag === 'hifumiHalf' && isHifumiLoss) {
                            multiplierBonus -= level; // ヒフミ支払いをレベル分軽減
                            console.log(`Card Effect: ヒフミ軽減 Lv.${level} (-${level})`);
                        }
                        // ションベン軽減 (見切り使用時は適用しない)
                        if (cardDef.effectTag === 'shonbenHalf' && loserHand?.type === 'ションベン' && !giveUpEyeUsedThisTurn) {
                            const reduction = 0.5;
                            multiplierBonus -= reduction;
                            console.log(`Card Effect: ションベン軽減 Lv.${level} (-${reduction.toFixed(1)})`);
                        }
                    });
    
                    // ★★★ 見切り Lv2+ 効果判定 ★★★
                    const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
                    // 条件：プレイヤーがションベンで敗北し、かつそのラウンドで見切りを使用し、かつ見切りカードのレベルが2以上
                    if (loserHand?.type === 'ションベン' && giveUpEyeUsedThisTurn && giveUpCard && giveUpCard.level >= 2) {
                       const reduction = 0.5;
                       multiplierBonus -= reduction; // 支払い倍率を0.5軽減
                       console.log(`Card Effect: 見切り Lv.${giveUpCard.level} 支払い半減 (-${reduction.toFixed(1)})`);
                       // giveUpEyeUsedThisTurn フラグはこの後のメッセージ表示などで使うかもしれないので、まだリセットしない
                    }
              }
    
                // 4. 実効倍率 (effectiveMultiplier) 計算 (最低0倍)
                effectiveMultiplier = Math.max(0, baseMultiplier + multiplierBonus);
                console.log(`Effective Multiplier (Base + Bonus): ${effectiveMultiplier}`);
    
                // 5. 連勝ボーナスレート (streakBonusRate) 計算
            streakBonusRate = 0.0;
            const currentStreakCount = pWin ? consecutiveWins : npcConsecutiveWins;
            if (currentStreakCount > 0) {
                streakBonusRate = currentStreakCount * CONSECUTIVE_WIN_BONUS_RATE;
                console.log(`Base Streak Bonus Rate: +${(streakBonusRate * 100).toFixed(0)}% (${currentStreakCount} wins)`);
                if (pWin) { // プレイヤー勝利時のみ逆境の魂チェック
                    const spiritCard = playerCards.find(c => c.id === 'fightingSpirit');
                    if (spiritCard) {
                        const level = spiritCard.level;
                        const conditionMet = (level < 3 && playerInitialScore <= npcInitialScore / 2) || (level >= 3 && playerInitialScore <= npcInitialScore);
                        if (conditionMet) {
                            const spiritBonusRate = [0.1, 0.2, 0.3][level - 1];
                            streakBonusRate += spiritBonusRate;
                            console.log(`Card Effect: 逆境の魂 Lv.${level}適用！ Streak Rate +${spiritBonusRate * 100}%`);
                        }
                    }
                }
            }
            streakBonusRate = Math.max(0, streakBonusRate); // ボーナスレートがマイナスにならないように
            console.log(`Final Streak Bonus Rate: +${(streakBonusRate * 100).toFixed(0)}%`);

                // 6. 支払いレート補正 (paymentRateModifier) 計算 (現在は未使用)
                paymentRateModifier = 1.0;
    
                // 7. 最終スコア変動額 (finalAmount) 計算 (勝利時は獲得額、敗北時は支払い額の絶対値)
                finalAmount = currentBet * effectiveMultiplier * paymentRateModifier * (1 + streakBonusRate);
                console.log(`Calculated Amount (Bet * EffMulti * PayMod * (1 + Streak)): ${finalAmount}`);
    
                // 8. 一撃保険 (lossInsurance) 適用判定 & 9. スコア変動 (sc) 決定
                sc = 0;
                if (pWin) { // プレイヤー勝利
                    sc = Math.round(finalAmount);
                } else { // プレイヤー敗北
                    const insuranceCard = playerCards.find(card => card.id === 'lossInsurance');
                    if (insuranceCard) { // 保険適用
                        const level = insuranceCard.level;
                        const insuranceMultiplier = [1.5, 1.3, 1.1][level - 1];
                        // NPC勝利時のNPC連勝ボーナスを計算
                        const npcStreakBonusRate = (npcConsecutiveWins > 1) ? (npcConsecutiveWins - 1) * CONSECUTIVE_WIN_BONUS_RATE : 0.0;
                        const finalPaymentWithInsurance = currentBet * insuranceMultiplier * (1 + npcStreakBonusRate);
                        sc = -Math.round(finalPaymentWithInsurance);
                        insuranceApplied = true;
                        console.log(`Card Effect: 一撃保険 Lv.${level} 適用！ Payment Calculation Overridden.`);
                        console.log(` -> Insurance Multiplier: ${insuranceMultiplier}, NPC Streak Rate: ${npcStreakBonusRate * 100}%`);
                        console.log(` -> Final Score Change (Insurance): ${sc}`);
                    } else { // 保険なし
                        sc = -Math.round(finalAmount); // 通常の支払い
                        insuranceApplied = false;
                    }
                }
                console.log(`Final Score Change (sc): ${sc}`);
    
                // メッセージ設定 (保険適用メッセージ含む)
                if(pWin){
                    msg = loserHand?.type === 'ションベン' ? `${npcName}ションベンで勝利！` : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
                    if (isPlayerParent && consecutiveWins > 1) msg += ` (${consecutiveWins}連勝!)`; // 親の時のみ連勝表示
                    rClass = 'win';
                } else { // nWin
                    if (giveUpEyeUsedThisTurn) {
                        msg = `見切り使用で敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
                    } else if (isHifumiLoss) { // 次にヒフミ負け
                        msg = `ヒフミ扱いで敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
                    } else if (loserHand?.type === 'ションベン') { // 自然なションベン
                        msg = "ションベンで敗北...";
                    } else { // その他の敗北
                        msg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
                    }
                    if (insuranceApplied) { msg += " (一撃保険適用)"; }
                     if (!isPlayerParent && npcConsecutiveWins > 1) msg += ` (${npcName}${npcConsecutiveWins}連勝中...)`; // NPC親の時のみ連勝表示
                    rClass = 'lose';
                }
           }
    
        // --- スコア反映 & UI更新 ---
        // sc には引き分けボーナス(あれば) または 勝敗結果 が入っている
        console.log(`[DEBUG] Final sc value before score update: ${sc}`);
        const psEnd = Math.max(0, playerInitialScore + sc);
        const nsEnd = Math.max(0, npcInitialScore - sc);
        console.log(`[DEBUG] Updating scores: Player ${playerInitialScore} + ${sc} = ${psEnd}, NPC ${npcInitialScore} - ${sc} = ${nsEnd}`);
        playerScore = psEnd;
        npcScore = nsEnd;
        totalScoreChange += sc;

        // スコア変動ポップアップ (sc が 0 でなければ表示)
        if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); }

        // スコア表示アニメーション
        animateScore(playerScoreEl, playerInitialScore, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, npcInitialScore, nsEnd, SCORE_ANIMATION_DURATION);
    
            // --- 履歴追加 ---
            addHistoryEntry({
                wave: currentWave, round: currentRoundInWave,
                playerDice: playerDice.join(','), playerHandName: getHandDisplayName(playerHand),
                npcDice: npcDice.join(','), npcHandName: getHandDisplayName(npcHand),
                result: rClass, scoreChange: sc, betAmount: currentBet,
                consecutiveWins: isPlayerParent ? consecutiveWins : 0, // 親の時の連勝数のみ記録
                npcConsecutiveWins: !isPlayerParent ? npcConsecutiveWins : 0, // NPC親の時の連勝数のみ記録
                parentBefore: parentBefore,
                // 必要ならカード使用情報なども追加
            });
    
            // --- 勝敗演出 ---
            if (!draw) { announceRoundResult(pWin, false); }
    
            // --- メッセージ表示 & 次のアクション ---
            setTimeout(() => {
                let finalMsg = `${msg} ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`;
                if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? playerName : npcName}が親です。`; }
                else if (parentKeptByCard) { finalMsg += ` (${playerName}が親権維持発動！)`; }
                setMessage(finalMsg);
    
                // 見切り使用フラグをここでリセット
                if (giveUpEyeUsedThisTurn) {
                     giveUpEyeUsedThisTurn = false;
                     console.log("Resetting giveUpEyeUsedThisTurn flag after round end processing.");
                }
                // activeCardUsesのラウンド開始時カウントを更新するための準備 (ダブルアップ等で使用)
                // activeCardUses['doubleUpBet_roundStartCount'] = activeCardUses['doubleUpBet'] || 0;
                // activeCardUses['rewardAmplifier_roundStartCount'] = activeCardUses['rewardAmplifier'] || 0;
    
                updateUI();
                checkGameEnd();
            }, SCORE_ANIMATION_DURATION + 300 + (draw ? 0 : CENTER_RESULT_DURATION));
        }
    // === ゲーム終了チェック ===
    function checkGameEnd() {
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);

        if (npcScore <= 0) {
            defeatedCount++;
            const earnedCoins = calculateEarnedCoins();
            calculateAndAwardCoins();
            addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || 'NPC'}撃破！ コイン ${earnedCoins} G獲得！` });
            if (currentWave >= MAX_WAVES) {
                isC = true;
                gameOverReason = "最終WAVEで相手の持ち点を0にしました！";
            } else {
                console.log("NPC defeated, proceeding to shop.");
                announceRoundResult(true, true);
                setMessage(`${currentNpcCharacter?.name || 'NPC'}撃破！ コイン ${earnedCoins} G獲得！ ショップへどうぞ！`);
                updateUI();
                if (betMainControls) betMainControls.style.display = 'none';
                if (betActionContainer) betActionContainer.style.display = 'none';
                if (actionArea) actionArea.style.display = 'none';
                if (nextWaveArea) nextWaveArea.style.display = 'flex';
                historyButton.disabled = true;
                return;
            }
        }
        else if (playerScore <= 0) {
             isGO = true;
             gameOverReason = "持ち点が0になりました。";
        }
        else if (playerScore < currentMinBet && isPlayerParent) {
             isGO = true;
             gameOverReason = `持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、親で賭けられません。`;
        }

        if (isGO || isC) {
            console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`);
            isGameActive = false;
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; maxBetButton.disabled = true; minBetButton.disabled = true;
            historyButton.disabled = false;
            currentBetInfoEl.textContent = '';
            announceRoundResult(isC, true);
             if (betMainControls) betMainControls.style.display = 'none';
             if (betActionContainer) betActionContainer.style.display = 'none';
             if (actionArea) actionArea.style.display = 'none';
             if (nextWaveArea) nextWaveArea.style.display = 'none';
            setTimeout(() => { showResultScreen(isC, playerScore, currentWave, gameOverReason); }, 2500);
        }
        else {
            console.log("Round end, continuing game.");
             if (!isGameActive && !waitingForPlayerActionAfterRoll) {
                 setTimeout(startBettingPhase, 100);
             }
        }
    }

    // --- コイン計算、獲得処理、アニメーション ---
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
        console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, ScoreAtStart=${scoreAtWaveStart}, ScoreNow=${playerScore}, Gain=${scoreGainInWave}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`);
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
        animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
    }
    function playCoinAnimation(amount) {
        if (!gameCoinDisplayEl || amount <= 0) return;
        const numCoins = Math.min(20, Math.max(5, Math.floor(amount / 10)));
        const targetRect = gameCoinDisplayEl.getBoundingClientRect();
        if (!targetRect || targetRect.width === 0 || targetRect.height === 0) return;
        const targetX = targetRect.left + targetRect.width / 2;
        const targetY = targetRect.top + targetRect.height / 2;

        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';
            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 150;
            const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 150;
            coin.style.left = `${startX}px`; coin.style.top = `${startY}px`;
            const deltaX = targetX - startX; const deltaY = targetY - startY;
            coin.style.setProperty('--tx', `${deltaX}px`); coin.style.setProperty('--ty', `${deltaY}px`);
            coin.style.animationDelay = `${Math.random() * 0.4}s`;
            document.body.appendChild(coin);
            coin.addEventListener('animationend', () => { if (coin.parentNode) { coin.remove(); } }, { once: true });
        }
    }

    // === 結果画面表示 ===
    function showResultScreen(isClear, currentScore, wave, reason = "") {
        resultTitleEl.textContent = isClear ? "ゲームクリア！" : "ゲームオーバー";
        resultTitleEl.className = isClear ? 'clear' : 'over';
        resultMessageEl.textContent = isClear ? `祝！ 全${MAX_WAVES}WAVE制覇！` : `残念！ WAVE ${wave} で敗北... ${reason}`;

        let finalCalcScore = 0;
        const coinBonus = playerCoins * 3;
        const clearBonus = MAX_WAVES * 100;

        finalCalcScore = Math.max(0, totalScoreChange + (isClear ? clearBonus : 0) + coinBonus);

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
            li.className = e.result || 'unknown';
            const isClearEntry = e.result === 'clear' || e.isWaveClear;
            if (isClearEntry && e.message) { li.innerHTML = `<div class="wave-clear-info">${e.message}</div>`; }
            else if (!isClearEntry || (isClearEntry && e.earnedCoins !== undefined)) {
                if (isClearEntry) { li.innerHTML = `<div class="wave-clear-info">WAVE ${e.wave} クリア！ コイン ${e.earnedCoins} G獲得！</div>`; }
                else {
                    let resultText = ''; let resultClass = '';
                    if (e.result === 'win') { resultText = '勝ち'; resultClass = 'history-win'; }
                    else if (e.result === 'lose') { resultText = '負け'; resultClass = 'history-lose'; }
                    else { resultText = '引き分け'; resultClass = 'history-draw'; }
                    const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : '';
                    const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : '';
                    const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${e.npcConsecutiveWins}連敗...)</span>` : '';
                    const parentName = e.parentBefore === 'Player' ? (selectedCharacter?.name || 'あなた') : (currentNpcCharacter?.name || 'NPC'); // ここは履歴データに依存すべき
                    const parentStr = e.parentBefore ? `<span class="parent-info">(親: ${parentName})</span>` : '';
                    const betStr = e.betAmount > 0 ? `<span class="bet-amount">賭け金: ${e.betAmount}</span>` : '';
                    const playerNameForHistory = selectedCharacter?.name || 'あなた';
                    const npcNameForHistory = currentNpcCharacter?.name || 'NPC'; // ここも履歴データに依存すべき
                    li.innerHTML = `
                        <span class="wave-num"><span class="wave-highlight">WAVE ${e.wave}</span> - <span class="round-normal">ROUND ${e.round}</span> ${parentStr}</span>
                        <div class="details">
                            <div><span class="history-result ${resultClass}">${resultText}</span> ${playerNameForHistory}: ${e.playerDice || '-'} <span class="hand">${e.playerHandName || '-'}</span></div>
                            <div class="npc-history">${npcNameForHistory}: ${e.npcDice || '-'} <span class="hand">${e.npcHandName || '-'}</span> ${betStr}</div>
                        </div>
                        <div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div>
                    `;
                }
            } else { console.warn("Skipping history entry due to missing/unexpected data:", e); li.innerHTML = `<span class="wave-num">WAVE ${e.wave} - ROUND ${e.round}</span> <div>履歴データエラー</div>`; li.style.color = 'red'; li.style.borderLeftColor = 'red'; }
            historyLogEl.appendChild(li);
        });
    }

    // --- 設定モーダル、カード一覧関連 ---
    function generateSettingsCardListHtml() {
        if (!settingsCardListInner) return;
        settingsCardListInner.innerHTML = '';
        // カードをレアリティ(降順) -> タイプ -> 名前(昇順)でソート
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

            // ★★★ 修正点 1 & 2: レベル表記と説明文を分離し、不要なコメント削除 ★★★
            let effectDetailsHtml = '';
            // Lv.1
            effectDetailsHtml += `<div class="effect-level-title"><strong>Lv.1:</strong></div>`; // レベル表記を別divに
            effectDetailsHtml += `<div class="effect-level-description">${getUpgradeDescription(card, 1)}</div>`; // 説明文を別divに
            // Lv.2
            if (MAX_CARD_LEVEL >= 2) {
                effectDetailsHtml += `<div class="effect-level-title"><strong>Lv.2:</strong></div>`;
                effectDetailsHtml += `<div class="effect-level-description">${getUpgradeDescription(card, 2)}</div>`;
            }
            // Lv.3
            if (MAX_CARD_LEVEL >= 3) {
                effectDetailsHtml += `<div class="effect-level-title"><strong>Lv.3:</strong></div>`;
                effectDetailsHtml += `<div class="effect-level-description">${getUpgradeDescription(card, 3)}</div>`;
            }

            // item の innerHTML を設定
            item.innerHTML = `
                <h3> ${card.name} <span class="card-meta"><span class="${typeClass}">${typeName}</span> <span class="${rarityClass}">★${rarityText}</span></span> </h3>
                <p class="flavor-text">${card.flavor || '---'}</p>
                <div class="effect-details">
                    ${effectDetailsHtml} 
                </div>`;
            settingsCardListInner.appendChild(item);
        });
    }
    function showCardListModal() { console.warn("showCardListModal is deprecated. Use settings modal instead."); }
    if (settingsButton && settingsModal) { settingsButton.addEventListener('click', () => { settingsModal.style.display = 'flex'; switchSettingsTab('rules'); }); }
    if (closeSettingsModalButton && settingsModal) { closeSettingsModalButton.addEventListener('click', () => { settingsModal.style.display = 'none'; }); }
    window.addEventListener('click', (event) => {
        if (settingsModal && event.target === settingsModal) { settingsModal.style.display = 'none'; }
        if (historyModal && event.target === historyModal) historyModal.style.display = 'none';
        if (cardListModal && event.target === cardListModal) cardListModal.style.display = 'none';
        if (discardModal && event.target === discardModal) cancelDiscard();
        if (diceChoiceOverlay && event.target === diceChoiceOverlay) hideDiceChoiceOverlay();
        if (cardActionModal && event.target === cardActionModal) {
            cardActionModal.style.display = 'none';
            if (waitingForPlayerActionAfterRoll) {
                setMessage(`どうしますか？`, 'postRollChoice');
                updateCardButtonHighlight();
            }
       }
    });
    settingsNavButtons.forEach(button => { if (button.dataset.target) { button.addEventListener('click', () => { switchSettingsTab(button.dataset.target); }); } });
    if (settingsCardListButton) { settingsCardListButton.addEventListener('click', () => { switchSettingsTab('card-list'); }); }
    function switchSettingsTab(targetId) {
        if (!settingsContent) return;
        settingsNavButtons.forEach(btn => btn.classList.remove('active'));
        settingsContent.querySelectorAll('.settings-tab-content').forEach(content => content.classList.remove('active'));
        const activeButton = document.querySelector(`.settings-nav-button[data-target="${targetId}"]`) || document.getElementById('settings-card-list-button');
        if (activeButton && (activeButton.dataset.target === targetId || (targetId === 'card-list' && activeButton.id === 'settings-card-list-button'))) { activeButton.classList.add('active'); }
        if (targetId === 'card-list') { generateSettingsCardListHtml(); }
        const activeContent = document.getElementById(`settings-${targetId}-content`);
        if (activeContent) { activeContent.classList.add('active'); }
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

        if (playerCards.length === 0) { cardActionMessage.textContent = "手札にカードがありません。"; return; }

        playerCards.forEach(cardData => {
            const card = allCards.find(c => c.id === cardData.id); if (!card) return;
            const cardElement = document.createElement('div');
            const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
            cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass}`;
            cardElement.dataset.cardId = cardData.id;
            const isUsable = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardData.id) : checkCardUsability(cardData.id);
            const remainingUses = getRemainingUses(cardData.id);
            const totalUses = getTotalUses(cardData.id);
            const isPassive = !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag);
            let usesHtml = '';
            if (card.usesPerWave && totalUses !== Infinity) { usesHtml = `<div class="card-action-uses">残 ${remainingUses} / ${totalUses} 回</div>`; }
            else if (isPassive) { usesHtml = `<div class="card-action-uses" style="color: #aaa;">(パッシブ)</div>`; }
            let buttonHtml = '';
            if (card.usesPerWave) { buttonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`; }
            if (isPassive) { cardElement.classList.add('passive'); }
            else if (!card.usesPerWave) {} // 用途不明
            else if (isUsable) { cardElement.classList.add('usable'); usableCardFound = true; }
            else if (remainingUses <= 0) { cardElement.classList.add('used-up'); }
            else { cardElement.classList.add('not-usable'); }
            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N'; const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
            const levelSpan = `<span class="card-level">[Lv.${cardData.level}]</span>`; const cardNameHtml = `${card.name} ${levelSpan}`;
            const cardInnerHtml = `<span class="card-type-badge">${getCardTypeName(card.type)}</span> ${rarityBadgeHtml} <h3 class="card-name">${cardNameHtml}</h3> <p class="card-description">${getUpgradeDescription(card, cardData.level)}</p> ${usesHtml} ${buttonHtml}`;
            cardElement.innerHTML = cardInnerHtml;
            if (card.image) { cardElement.style.backgroundImage = `url('${card.image}')`; cardElement.style.backgroundSize = 'cover'; cardElement.style.backgroundPosition = 'center'; }
            cardActionDisplay.appendChild(cardElement);
        });

        if (usableCardFound) { cardActionMessage.textContent = "使用したいカードを選択してください。"; }
        else if (playerCards.length > 0) { cardActionMessage.textContent = "現在使用できるカードはありません。"; }
    }
    if (closeCardActionModalButton && cardActionModal) { closeCardActionModalButton.addEventListener('click', () => { cardActionModal.style.display = 'none'; }); }
    if(cardActionDisplay) {
        cardActionDisplay.addEventListener('click', async (event) => {
            if (event.target.matches('.use-card-button:not(:disabled)')) {
                const cardId = event.target.dataset.cardId;
                if (cardId) {
                    cardActionModal.style.display = 'none'; // 先にモーダルを閉じる
                    await handleActiveCardUse(cardId);
                    // updateCardButtonHighlight は handleActiveCardUse 内で呼ばれる
                }
            }
        });
    }
    if (cardActionButton) { cardActionButton.addEventListener('click', openCardActionModal); }

     // === アクティブカード使用処理 ===
    async function handleActiveCardUse(event) {
        let cardElement = null; let cardId = null;
        if(event && event.currentTarget && event.currentTarget.dataset.cardId){ cardElement = event.currentTarget; cardId = cardElement.dataset.cardId; }
        else if (typeof event === 'string') { cardId = event; }
        else { console.error("Invalid event or cardId passed to handleActiveCardUse", event); return; }

        const playerCardData = playerCards.find(c => c.id === cardId);
        const isUsableNow = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardId) : checkCardUsability(cardId);

        if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !isUsableNow) {
            console.log(`Card ${cardId} cannot be used now. Active: ${activeCardBeingUsed}, WaitingChoice: ${waitingForUserChoice}, UsableNow: ${isUsableNow}`);
            if (waitingForPlayerActionAfterRoll && cardActionModal && cardActionModal.style.display === 'none') {
                setMessage("現在そのカードは使用できません。どうしますか？", 'postRollChoice');
                updateCardButtonHighlight();
            }
             activeCardBeingUsed = null;
            return;
        }
        const card = allCards.find(c => c.id === cardId); if (!card) return;

        console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
        activeCardBeingUsed = cardId;

        let useConsumed = true;
        let requiresDelay = false;
        let turnEnd = false;
        let postUseMessage = "";

        // --- カード効果分岐 ---
        if (['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
            showDiceChoiceOverlay(cardId);
            useConsumed = false;
            return;
        } else if (cardId === 'ignoreMinBet') {
            ignoreMinBetActive = true; updateUI(); updateBetLimits();
            postUseMessage = `最低賭け金が1になりました。`;
            requiresDelay = true;
        } else if (cardId === 'zoroChanceUp') {
            zoroChanceUpActive = true;
            postUseMessage = `このラウンド中、ゾロ目確率UP！`;
            requiresDelay = true;
        } else if (cardId === 'avoid123_456') {
            avoid123_456Active = true;
            postUseMessage = `このラウンド中、役回避！`;
            requiresDelay = true;
        } else if (cardId === 'blessingDice') {
            blessingDiceActive = true;
            postUseMessage = `このラウンド中、6が出やすくなります。`;
            requiresDelay = true;
        } else if (cardId === 'stormWarning') {
             stormWarningActive = true;
             postUseMessage = `次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`;
             requiresDelay = true;
        } else if (cardId === 'riskyBet') {
             riskyBetActive = true; updateUI(); updateBetLimits();
             postUseMessage = `危険な賭け！賭け金決定時に効果が適用されます。`;
             requiresDelay = true;
        } else if (cardId === 'giveUpEye') {
                // ★★★ 見切り使用時の処理 ★★★
                playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                giveUpEyeUsedThisTurn = true; 
                useConsumed = true;
                turnEnd = true; // ★ 勝敗判定へ移行

                postUseMessage = `見切り使用！ションベン扱いになります。`;
                setMessage(postUseMessage);
                updateUI();
                highlightHand(playerHandEl, playerHand);

                rollButton.disabled = true;
                isPlayerTurn = false;
                activeCardBeingUsed = null; // 先にロック解除
                waitingForPlayerActionAfterRoll = false; // 操作待ち解除
        } else if (cardId === 'doubleUpBet') {
            doubleUpBetActive = true;
            useConsumed = true;
            isPlayerTurn = false;
            turnEnd = true;
            postUseMessage = "ダブルアップ準備完了！勝負！";
            requiresDelay = true;
        } else if (cardId === 'blindingDice') {
             blindingDiceActive = true;
             postUseMessage = `目くらまし！このラウンド中、相手のロールに影響します。`;
             requiresDelay = true;
             turnEnd = false;
        } else if (cardId === 'soulRoll') {
             const costPercent = [10, 5, 5][playerCardData.level - 1];
             const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
             if (playerScore < cost) {
                 postUseMessage = `魂の一振りのコスト(${cost}点)を払えません！`;
                 useConsumed = false;
                 turnEnd = false;
                 activeCardBeingUsed = null;
                 setMessage(postUseMessage);
                 if (waitingForPlayerActionAfterRoll) {
                      setMessage(`${postUseMessage} どうしますか？`, 'postRollChoice');
                      updateCardButtonHighlight();
                 }
                 return;
             } else {
                 playerScore -= cost; // ★ コスト消費をここで行う
                 soulRollUsedThisTurn = true; // ★ 使用フラグON
                 postUseMessage = `魂の一振り！${cost}点を消費して追加ロール！ サイコロを振ってください。`;
                 updateUI(); // スコア反映
                 rollButton.disabled = false; // ★ ロール可能に！
                 turnEnd = false;
                 waitingForPlayerActionAfterRoll = false; // 操作待ち解除
                 messageButtonContainer.innerHTML = ''; // ボタン削除
             }
        } else if (cardId === 'rewardAmplifier') {
             rewardAmplifierActive = true;
             postUseMessage = `報酬増幅！このラウンドの役での勝利時、配当倍率が増加します。`;
             requiresDelay = true;
             turnEnd = false;
        } else if (cardId === 'drawBonus') {
            drawBonusActive = true; // フラグを立てるのみ
            postUseMessage = `引き分けボーナス準備完了！このラウンド引き分け時に効果発動。`;
            requiresDelay = true; // 少しメッセージ表示時間を設ける
            turnEnd = false; // ターンは継続
            useConsumed = false; 
        }
        else {
            console.warn(`Active card effect for ${cardId} is not fully implemented yet.`);
            postUseMessage = `カード「${card.name}」の効果処理が未実装です。`;
            useConsumed = false;
            turnEnd = false;
        }

        // 使用回数カウント
        if (useConsumed && card.usesPerWave && cardId !== 'drawBonus') { // ★ drawBonusを除外
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            postUseMessage += ` (残${getRemainingUses(cardId)}/${getTotalUses(cardId)})`;
            console.log(`Used card ${cardId}. Remaining uses: ${getRemainingUses(cardId)}`);
       }

       // メッセージ表示 & 遅延 (魂の一振り以外)
       if (cardId !== 'soulRoll') {
           setMessage(postUseMessage);
       }
       if (requiresDelay) {
           await new Promise(resolve => setTimeout(resolve, 800));
       }

       // 魂の一振り使用後はロール待ちなので、ここで終了
       if (cardId === 'soulRoll' && useConsumed) {
           activeCardBeingUsed = null;
           historyButton.disabled = false;
           updateCardButtonHighlight();
           return;
       }

       // その他のカード処理
       activeCardBeingUsed = null;

       if (turnEnd) {
            waitingForPlayerActionAfterRoll = false;
            rollButton.disabled = true;
            historyButton.disabled = false;
            setTimeout(handleRoundEnd, 800);
       } else {
            if (waitingForPlayerActionAfterRoll) {
                const handName = getHandDisplayName(playerHand);
                const canReroll = playerRollCount < currentMaxRolls;
                const hasStormWarningReroll = stormWarningRerollsLeft > 0;
                const soulRollAvailable = playerCards.find(c => c.id === 'soulRoll') && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
                let rerollStatus = "";
                if (canReroll || hasStormWarningReroll) rerollStatus = "(振り直し可能)";
                else if (soulRollAvailable) rerollStatus = "(魂の一振り使用可能)";
                else rerollStatus = "(振り直し不可)";

                const currentStatusMessage = playerHand?.type === '目なし'
                    ? `${handName}！どうしますか？ ${rerollStatus}`
                    : `${handName}！どうしますか？`;
                setMessage(`${postUseMessage} ${currentStatusMessage}`, 'postRollChoice');
                rollButton.disabled = true;
            } else if (['zoroChanceUp', 'avoid123_456', 'blessingDice', 'stormWarning'].includes(cardId) && useConsumed) {
                setMessage(postUseMessage + " サイコロを振ってください。");
                rollButton.disabled = false;
            } else {
                if (['ignoreMinBet', 'riskyBet'].includes(cardId)){
                     updateBetLimits();
                }
            }
            historyButton.disabled = false;
       }
       updateCardButtonHighlight();
   }

      // === カード使用可否チェック関数 ===
      function checkCardUsability(cardId) {
        const cardData = playerCards.find(c => c.id === cardId);
        const card = allCards.find(c => c.id === cardId);
        if (!cardData || !card) return false;
        if (!card.usesPerWave && !(card.applyEffect || card.removeEffect || card.effectTag)) return false;

        if (card.usesPerWave) {
            const remainingUses = getRemainingUses(cardId);
            if (remainingUses <= 0) return false;
        }

        if (activeCardBeingUsed || waitingForUserChoice) return false;

        if (waitingForPlayerActionAfterRoll) {
            return false;
        }

        // 通常のフェーズでの使用可否判定
        const isBetPhase = !isGameActive && isPlayerParent && !waitingForPlayerActionAfterRoll;
        const isPlayerRollPhase = isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls && !waitingForPlayerActionAfterRoll;
        // 魂の一振りは isPlayerPostRollActionPhase (振り切り後) で判定するため、ここでは false
        const canUseSoulRoll = false;

        if (card.usesPerWave) {
            switch (card.id) {
                // ベットフェーズ
                case 'ignoreMinBet': return isBetPhase && !ignoreMinBetActive;
                case 'riskyBet': return isBetPhase && !riskyBetActive;
                // ロール前
                case 'zoroChanceUp': return isPlayerRollPhase && !zoroChanceUpActive;
                case 'avoid123_456': return isPlayerRollPhase && !avoid123_456Active;
                case 'blessingDice': return isPlayerRollPhase && !blessingDiceActive;
                case 'stormWarning': return isPlayerRollPhase && !stormWarningActive;
                // ロール後・特殊
                case 'changeToOne': case 'changeToSix': case 'giveUpEye': case 'adjustEye':
                case 'nextChance': case 'doubleUpBet': case 'blindingDice': case 'rewardAmplifier':
                case 'drawBonus': case 'soulRoll': return false;
                case 'keepParentalRight': return false;
                default: return false;
            }
        } else {
            return false; // パッシブ
        }
    }

     // === 残り使用回数取得関数 ===
     function getRemainingUses(cardId) {
        const cardData = playerCards.find(c => c.id === cardId);
        const card = allCards.find(c => c.id === cardId);
        if (!cardData || !card || !card.usesPerWave) return Infinity;

        const level = cardData.level;
        let totalUses = getTotalUses(cardId);

        return totalUses - (activeCardUses[cardId] || 0);
    }

        // === ダイス選択オーバーレイ表示/非表示/選択処理 ===
        function showDiceChoiceOverlay(cardId) {
            if (!diceChoiceOverlay) return;
            const card = allCards.find(c => c.id === cardId);
            const playerCardData = playerCards.find(c => c.id === cardId);
            if (!card || !playerCardData) { hideDiceChoiceOverlay(); return; }

            let title = `${card.name} [Lv.${playerCardData.level}]`; let instruction = ""; let diceIndicesToSelect = [];
            let requiresAdjustChoice = false; let requiresNextChanceCount = 0; let nextChanceCanSelectTwo = false;

            if (['changeToOne', 'changeToSix'].includes(cardId)) {
                instruction = "変更するサイコロを選んでください";
                diceIndicesToSelect = [0, 1, 2]; // 全てのダイスが対象
            }
            else if (cardId === 'adjustEye') {
                 if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
                 instruction = `調整する「${playerHand.value}以外の目」を選んでください`;
                 playerDice.forEach((diceValue, index) => { if (diceValue !== playerHand.value) diceIndicesToSelect.push(index); });
                 if (diceIndicesToSelect.length > 0) { requiresAdjustChoice = true; }
            } else if (cardId === 'nextChance') {
                  if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); return; }
                  nextChanceCanSelectTwo = playerCardData.level >= 2;
                  requiresNextChanceCount = nextChanceCanSelectTwo ? 2 : 1; // Lv2以上は最大2個
                  instruction = `振り直す「${playerHand.value}の目」を${requiresNextChanceCount === 2 ? '最大2つまで' : '1つ'}選んでください`;
                   playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
                   // ★ nextChance の複数選択UIは未実装。ここでは単純に対象インデックスをリスト化するのみ
            } else {
                hideDiceChoiceOverlay(); // 未対応のカードID
                return;
            }

            diceChoiceOverlay.innerHTML = `<h3>${title}</h3><p>${instruction}</p>`;
            const buttonContainer = document.createElement('div'); buttonContainer.className = 'dice-choice-buttons';

            if (diceIndicesToSelect.length === 0) {
                buttonContainer.innerHTML = "<p>対象のサイコロがありません。</p>";
            } else {
                 diceIndicesToSelect.forEach(index => {
                      const button = document.createElement('button'); button.className = 'dice-choice-button button-pop';
                      button.textContent = playerDice[index]; // ダイスの目を表示
                      button.dataset.diceIndex = index;
                      if (requiresAdjustChoice) {
                          button.onclick = () => showAdjustOptions(index); // 調整オプション表示へ
                      }
                      else { // changeToOne, changeToSix, nextChance (現状1つ選択)
                          button.onclick = handleDiceChoice;
                      }
                      buttonContainer.appendChild(button);
                 });
            }
            const cancelButton = document.createElement('button'); cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル';
            cancelButton.style.marginTop = '15px'; cancelButton.onclick = hideDiceChoiceOverlay; buttonContainer.appendChild(cancelButton);
            diceChoiceOverlay.appendChild(buttonContainer);
            diceChoiceOverlay.style.display = 'flex';
            rollButton.disabled = true; // ダイス選択中はロール不可
            historyButton.disabled = true; // 履歴も一旦不可に
        }

        function showAdjustOptions(diceIndex) {
            const cardId = activeCardBeingUsed; // 使用中のカードIDを取得
            const playerCardData = playerCards.find(c => c.id === cardId);
            if (!playerCardData) { hideDiceChoiceOverlay(); return; }

            const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
            const originalValue = playerDice[diceIndex];

            diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？</p>`;
            const buttonContainer = document.createElement('div'); buttonContainer.className = 'dice-choice-buttons';

            // プラス調整ボタン
            if (originalValue + adjustAmount <= 6) {
                const plusButton = document.createElement('button'); plusButton.className = 'dice-choice-button button-pop';
                plusButton.textContent = `+${adjustAmount} (→ ${originalValue + adjustAmount})`;
                plusButton.dataset.diceIndex = diceIndex;
                plusButton.dataset.adjustDir = 'plus'; // 調整方向をデータ属性に設定
                plusButton.onclick = handleDiceChoice; // 選択処理へ
                buttonContainer.appendChild(plusButton);
            }
            // マイナス調整ボタン
            if (originalValue - adjustAmount >= 1) {
                 const minusButton = document.createElement('button'); minusButton.className = 'dice-choice-button button-pop';
                 minusButton.textContent = `-${adjustAmount} (→ ${originalValue - adjustAmount})`;
                 minusButton.dataset.diceIndex = diceIndex;
                 minusButton.dataset.adjustDir = 'minus'; // 調整方向をデータ属性に設定
                 minusButton.onclick = handleDiceChoice; // 選択処理へ
                 buttonContainer.appendChild(minusButton);
            }
            // 調整不可の場合のメッセージ
            if (buttonContainer.children.length === 0) {
                 buttonContainer.innerHTML = "<p>この目は調整できません。</p>";
            }

            const cancelButton = document.createElement('button'); cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル';
            cancelButton.style.marginTop = '15px'; cancelButton.onclick = hideDiceChoiceOverlay; buttonContainer.appendChild(cancelButton);
            diceChoiceOverlay.appendChild(buttonContainer);
            // オーバーレイは既に表示されているはずなので display の変更は不要
        }

        function hideDiceChoiceOverlay() {
            if (diceChoiceOverlay) diceChoiceOverlay.style.display = 'none';
            const cancelledCardId = activeCardBeingUsed; // キャンセルされたカードIDを保持
            activeCardBeingUsed = null; // ロック解除

            //  キャンセルした場合の処理を見直し
            if (cancelledCardId && waitingForPlayerActionAfterRoll) {
                 // ロール後の操作待ち中にキャンセルした場合のみ、ボタンを再表示
                 const cardName = allCards.find(c=>c.id === cancelledCardId)?.name || '不明';
                 const handName = getHandDisplayName(playerHand);
                 const rerollStatus = (playerRollCount < currentMaxRolls || stormWarningRerollsLeft > 0) ? "(振り直し可能)" : "(振り直し不可)";
                 const soulRollAvailable = playerCards.find(c => c.id === 'soulRoll') && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
                 const finalStatus = playerHand?.type === '目なし' && !canReroll && !hasStormWarningReroll && soulRollAvailable ? "(魂の一振り使用可能)" : rerollStatus;

                 const messageText = playerHand?.type === '目なし'
                    ? `カード「${cardName}」の使用をキャンセルしました。目なし！どうしますか？ ${finalStatus}`
                    : `カード「${cardName}」の使用をキャンセルしました。${handName}！どうしますか？`;

                 setMessage(messageText, 'postRollChoice');
                 rollButton.disabled = true; // ロールボタンは無効のまま
                 historyButton.disabled = false; // 履歴ボタンは有効に戻す
            } else {
                 // その他の場合（例: ベットフェーズ中にキャンセル）
                 if (!isGameActive) { // ゲーム中でない＝ベットフェーズなど
                     setMessage("操作をキャンセルしました。");
                 }
                 // ロールボタンや履歴ボタンの状態は、その時点のゲーム状況に応じて updateUI で更新される想定
                 historyButton.disabled = false; // とりあえず有効に戻す
                 updateBetLimits(); // ベット関連のボタン状態を更新
            }
            updateCardButtonHighlight();
        }

        async function handleDiceChoice(event) {
            const button = event.target;
            const diceIndex = parseInt(button.dataset.diceIndex);
            const adjustDir = button.dataset.adjustDir; // 調整方向を取得
            const cardId = activeCardBeingUsed; // 使用中のカードIDを取得
            const playerCardData = playerCards.find(c => c.id === cardId);

            if (isNaN(diceIndex) || !cardId || !playerCardData || !playerDice || playerDice.length !== 3) {
                console.error("Invalid state for dice choice:", diceIndex, cardId, playerDice);
                hideDiceChoiceOverlay();
                return;
            }
            const card = allCards.find(c => c.id === cardId);
            if (!card) {
                hideDiceChoiceOverlay();
                return;
            }

            console.log(`Player chose dice index: ${diceIndex} to apply card: ${card.name} (Lv.${playerCardData.level})${adjustDir ? ' Adjust:'+adjustDir : ''}`);
            let newDice = [...playerDice];
            let message = "";
            let useConsumed = true; // カード使用をカウントするかどうか

            // --- カード効果適用 ---
            if (['changeToOne', 'changeToSix'].includes(cardId)) {
                const newValue = cardId === 'changeToOne' ? 1 : 6;
                newDice[diceIndex] = newValue;
                message = `サイコロを ${newValue} に変更しました。`;
            }
            else if (cardId === 'adjustEye' && adjustDir) {
                  const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
                  let originalValue = newDice[diceIndex];
                  let adjustedValue = originalValue;
                  if (adjustDir === 'plus') {
                      adjustedValue = Math.min(6, originalValue + adjustAmount);
                  } else if (adjustDir === 'minus') {
                      adjustedValue = Math.max(1, originalValue - adjustAmount);
                  }

                  if (adjustedValue !== originalValue) {
                      newDice[diceIndex] = adjustedValue;
                      message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
                      adjustEyeUsedThisTurn = true;
                  } else {
                      message = "調整しても値が変わりませんでした。";
                      useConsumed = false; // 値が変わらないなら消費しない
                      hideDiceChoiceOverlay(); // オーバーレイを閉じて終了
                      setMessage(message); // メッセージ表示
                      // 再度操作待ち状態に戻す
                      if (waitingForPlayerActionAfterRoll) {
                           setMessage(`${message} どうしますか？`, 'postRollChoice');
                           updateCardButtonHighlight();
                      }
                      return; // 処理中断
                  }
            }
            else if (cardId === 'nextChance') {
                const originalValue = newDice[diceIndex];
                // nextChance 時は単純な振り直し（他のカード効果は適用しない）
                newDice[diceIndex] = rollSingleDice();
                message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`;
                nextChanceUsedThisTurn = true; // 使用済みフラグ
            }
            else {
                console.error("Unhandled card type in handleDiceChoice:", cardId);
                hideDiceChoiceOverlay();
                return;
            }

            playerDice = newDice; // ダイス目を更新
            if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
            diceDisplayEl.textContent = playerDice.join(' ');

            // ダイス変更後の役を再判定 (カード効果なしで)
            const result = getHandResult(playerDice, false, 0, 0);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Re-evaluated hand:", playerHand);
            if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
            highlightHand(playerHandEl, playerHand); // 役ハイライト

            hideDiceChoiceOverlay(); // オーバーレイを閉じる

            // 使用回数カウント
            if (card.usesPerWave && useConsumed) {
                 activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
                 const remainingUses = getRemainingUses(cardId);
                 message += ` (残${remainingUses}/${getTotalUses(cardId)})`;
                 console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`);
            }
            updateUI(); // 全体UI更新

            //  処理後のフロー制御 
            activeCardBeingUsed = null; // カード使用ロック解除
            waitingForPlayerActionAfterRoll = true; //  必ず操作待ち状態に戻す
            rollButton.disabled = true; // ロールボタンは無効
            historyButton.disabled = false; // 履歴ボタンは有効

            // メッセージを設定し、操作ボタンを再表示
            const handName = getHandDisplayName(playerHand);
            // 振り直し可能かの判定を再実行
            let canReroll = playerRollCount < currentMaxRolls;
            let hasStormWarningReroll = stormWarningRerollsLeft > 0;
            const soulRollAvailable = playerCards.find(c => c.id === 'soulRoll') && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
            let rerollStatus = "";
            if (canReroll || hasStormWarningReroll) {
                rerollStatus = "(振り直し可能)";
            } else if (soulRollAvailable) {
                rerollStatus = "(魂の一振り使用可能)";
            } else {
                rerollStatus = "(振り直し不可)";
            }

            const postChoiceMessage = playerHand.type === '目なし'
                ? `${message} 結果目なし！どうしますか？ ${rerollStatus}`
                : `${message} 結果${handName}！どうしますか？`;
            setMessage(postChoiceMessage, 'postRollChoice');
            updateCardButtonHighlight();
        }

         // === 総使用回数取得関数 ===
         function getTotalUses(cardId) {
             const cardData = playerCards.find(c => c.id === cardId);
             const card = allCards.find(c => c.id === cardId);
             if (!cardData || !card || !card.usesPerWave) return Infinity;
             const level = cardData.level;
             let totalUses = 0;
             switch (card.id) {
                 case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'giveUpEye':
                     totalUses = level;
                     break;
                 case 'keepParentalRight':
                     totalUses = (level >= 2) ? 2 : 1;
                     break;
                 case 'drawBonus':
                     totalUses = (level >= 3) ? 3 : (level === 2 ? 2 : 1); // Lv3で3回に
                     break;
                 case 'adjustEye': case 'avoid123_456':
                     totalUses = (level >= 2) ? 2 : 1;
                     break;
                case 'rewardAmplifier': case 'riskyBet': case 'zoroChanceUp': case 'blessingDice': case 'nextChance':
                     totalUses = (level >= 3) ? 2 : 1;
                     break;
                case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice':
                     totalUses = 1;
                     break;
                default:
                     totalUses = card.usesPerWave || 1;
                     break;
             }
             return totalUses;
         }

          // === ロール後操作待ち中に使用可能かチェック ===
     function checkCardUsabilityInPostRoll(cardId) {
        const cardData = playerCards.find(c => c.id === cardId);
        const card = allCards.find(c => c.id === cardId);
        if (!cardData || !card || !card.usesPerWave) return false;

        const remainingUses = getRemainingUses(cardId);
        if (remainingUses <= 0) return false;

        const isPlayerPostRollMenashi = playerHand?.type === '目なし';
        const isPlayerPostRollEye = playerHand?.type === '目';
        const isPlayerPostRollYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目';
        // 振り切り状態かの判定 (無料ロールも考慮)
        const isOutOfRolls = playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0;

        switch (card.id) {
            case 'changeToOne': case 'changeToSix': return true;
            case 'giveUpEye': return isPlayerPostRollMenashi && !giveUpEyeUsedThisTurn;
            case 'adjustEye': return isPlayerPostRollEye && !adjustEyeUsedThisTurn;
            case 'nextChance': return isPlayerPostRollEye && !nextChanceUsedThisTurn;
            case 'doubleUpBet': return isPlayerPostRollYakuOrEye && !isPlayerParent && !doubleUpBetActive;
            case 'blindingDice': return isPlayerPostRollYakuOrEye && isPlayerParent && !blindingDiceActive;
            case 'rewardAmplifier': return isPlayerPostRollYakuOrEye && !rewardAmplifierActive;
            case 'drawBonus':
                 // 条件：役または目が出ていて、まだこのラウンドで drawBonusActive になっていない
                 return isPlayerPostRollYakuOrEye && !drawBonusActive;
            case 'soulRoll':
                // 条件：目なしかつ振り切り状態、かつ魂の一振り未使用
                return isPlayerPostRollMenashi && isOutOfRolls && !soulRollUsedThisTurn;
            default: return false;
        }
    }

        // --- ショップ関連イベントリスナー ---
        shopCloseButton.addEventListener('click', closeShop);
        if (shopRerollButton) shopRerollButton.addEventListener('click', handleReroll);
        shopCardOffersEl.addEventListener('click', (event) => { if (event.target.matches('.buy-button, .upgrade-button')) { handleBuyCard(event); } });
        cancelDiscardButton.addEventListener('click', cancelDiscard);

        // --- キャラクター選択画面 イベントリスナー ---
        if (selectCharacterButton) { selectCharacterButton.addEventListener('click', openCharacterSelectScreen); }
        if (backToTitleButton) { backToTitleButton.addEventListener('click', () => { if (characterConfirmAreaEl) characterConfirmAreaEl.style.display = 'none'; previewingCharacter = null; if(characterListEl) { characterListEl.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected')); } const modals = document.querySelectorAll('.modal'); modals.forEach(modal => { if (modal.id === 'dice-roll-modal') { hideDiceRollModal(); } else if(modal.style.display !== 'none') { modal.style.display = 'none'; } }); if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); } if(gameScreen) gameScreen.classList.remove('dimmed'); showScreen('title-screen'); }); }
        if (characterListEl) { characterListEl.addEventListener('click', handleCharacterSelect); }
        if (confirmCharacterYesButton) { confirmCharacterYesButton.addEventListener('click', confirmCharacterSelection); }
        if (confirmCharacterNoButton) { confirmCharacterNoButton.addEventListener('click', () => { if (characterConfirmAreaEl) characterConfirmAreaEl.style.display = 'none'; const selectedBtn = characterListEl.querySelector('button.selected'); if (selectedBtn) selectedBtn.classList.remove('selected'); previewingCharacter = null; if(characterPreviewImageEl) characterPreviewImageEl.style.display = 'none'; if(characterPreviewPlaceholderEl) { characterPreviewPlaceholderEl.style.display = 'block'; characterPreviewPlaceholderEl.textContent = '← リストから選択'; } if (characterConfirmMessageEl) { characterConfirmMessageEl.textContent = 'このキャラクターにしますか？'; characterConfirmMessageEl.style.color = '#eee'; } }); }

        // --- キャラクター選択画面 関数 ---
        function openCharacterSelectScreen() { console.log("Opening character select screen..."); showScreen('character-select-screen'); }
        function populateCharacterList() {
            if (!characterListEl) { console.error("Character list element not found!"); return; }
            characterListEl.innerHTML = ''; console.log("Populating character list with:", characters);
            characters.forEach(char => { const button = document.createElement('button'); button.textContent = char.name; button.dataset.characterId = char.id; if (selectedCharacter && char.id === selectedCharacter.id) { button.classList.add('selected'); } characterListEl.appendChild(button); });
             if (characterListEl.children.length === 0) { console.warn("Character list populated, but no child elements found."); const p = document.createElement('p'); p.textContent = "キャラクターリストを読み込めませんでした。"; p.style.color = 'red'; characterListEl.appendChild(p); }
        }
        function handleCharacterSelect(event) {
            if (event.target.tagName === 'BUTTON' && event.target.dataset.characterId) {
                const characterId = event.target.dataset.characterId; const char = characters.find(c => c.id === characterId);
                if (char) {
                    previewingCharacter = char;
                    displayCharacterPreview(char);
                    characterListEl.querySelectorAll('button').forEach(btn => btn.classList.remove('selected'));
                    event.target.classList.add('selected');
                    if (characterConfirmMessageEl) { characterConfirmMessageEl.textContent = 'このキャラクターにしますか？'; characterConfirmMessageEl.style.color = '#eee'; }
                    if(confirmCharacterYesButton) confirmCharacterYesButton.style.display = 'inline-block';
                    if(confirmCharacterNoButton) confirmCharacterNoButton.style.display = 'inline-block';
                }
            }
        }
        function displayCharacterPreview(character) {
            const cardPreviewEl = document.getElementById('character-preview-card');
            if (characterPreviewImageEl && characterPreviewPlaceholderEl && characterConfirmAreaEl && cardPreviewEl) {
                if (character.image) {
                    characterPreviewImageEl.src = character.image; characterPreviewImageEl.alt = character.name; characterPreviewImageEl.style.display = 'block'; characterPreviewPlaceholderEl.style.display = 'none';
                     characterPreviewImageEl.onerror = () => {
                        characterPreviewImageEl.style.display = 'none';
                        characterPreviewPlaceholderEl.textContent = '画像読込失敗';
                        characterPreviewPlaceholderEl.style.display = 'block';
                        cardPreviewEl.style.display = 'none';
                    };
                } else {
                    characterPreviewImageEl.style.display = 'none';
                    characterPreviewPlaceholderEl.textContent = `${character.name} (画像なし)`;
                    characterPreviewPlaceholderEl.style.display = 'block';
                    cardPreviewEl.style.display = 'none';
                }
                let initialCardName = "なし";
                if (character.initialCardPool && character.initialCardPool.length > 0) {
                    const initialCardId = character.initialCardPool[0];
                    const cardDef = allCards.find(card => card.id === initialCardId);
                    if (cardDef) {
                        initialCardName = cardDef.name;
                    } else {
                        console.warn(`Initial card definition not found for ID: ${initialCardId}`);
                        initialCardName = "不明なカード";
                    }
                }
                cardPreviewEl.textContent = `初期カード候補：${initialCardName}`;
                cardPreviewEl.style.display = 'block';
                characterConfirmAreaEl.style.display = 'block';
            } else {
                console.error("Required elements for character preview not found.");
            }
        }
        function confirmCharacterSelection() {
            if (previewingCharacter) {
                selectedCharacter = previewingCharacter;
                console.log("Character selected:", selectedCharacter.name);
                if (characterConfirmMessageEl) {
                    characterConfirmMessageEl.textContent = `「${selectedCharacter.name}」に変更しました！`;
                    characterConfirmMessageEl.style.color = '#90ee90';
                }
                if(confirmCharacterYesButton) confirmCharacterYesButton.style.display = 'none';
                if(confirmCharacterNoButton) confirmCharacterNoButton.style.display = 'none';
            }
        }

        // --- 初期状態 ---
        function initializeGame() {
            console.log("Initializing game setup...");
            setDifficulty(difficulty);
            const hideAllModalsAndOverlays = () => {
                console.log("Hiding all modals and overlays...");
                const modals = document.querySelectorAll('.modal');
                modals.forEach(modal => {
                    if (modal.id === 'dice-roll-modal') {
                        hideDiceRollModal();
                    } else if(modal.style.display !== 'none') {
                        modal.style.display = 'none';
                    }
                });
                if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); }
                if(gameScreen) gameScreen.classList.remove('dimmed');
            };
            document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; });
            hideAllModalsAndOverlays();
            showScreen('title-screen');
            console.log("Game setup initialized. Showing title screen.");
        }
        initializeGame(); // ゲーム読み込み時に初期化実行

    }); // === DOMContentLoaded END ===
    // ===== END OF script.js =====