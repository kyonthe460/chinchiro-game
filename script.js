// ===== START OF script.js =====
document.addEventListener('DOMContentLoaded', () => {
    // --- 要素取得 --- 
    const titleScreen = document.getElementById('title-screen'), gameScreen = document.getElementById('game-screen'), resultScreen = document.getElementById('result-screen'), shopScreen = document.getElementById('shop-screen');
    const modeButtons = document.querySelectorAll('.mode-button');
    const startGameButton = document.getElementById('start-game-button');
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
    const playerScoreContainer = playerScoreEl.closest('.score-container'), npcScoreContainer = npcScoreEl.closest('.score-container');
    const resultTitleEl = document.getElementById('result-title'), resultMessageEl = document.getElementById('result-message'), finalScoreEl = document.getElementById('final-score');
    const restartSameModeButton = document.getElementById('restart-same-mode-button');
    const backToTitleFromResultButton = document.getElementById('back-to-title-from-result-button');
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
    const handCardsEl = document.getElementById('hand-cards');
    const shopOffersContainerEl = document.querySelector('.shop-offers-container');
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
    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModalButton = document.getElementById('close-settings-modal');
    const settingsNavButtons = document.querySelectorAll('.settings-nav-button');
    const settingsContent = document.getElementById('settings-content');
    const settingsCardListInner = document.getElementById('settings-card-list-inner');
    const cardActionModal = document.getElementById('card-action-modal');
    const cardActionModalContent = cardActionModal.querySelector('.card-action-modal-content');
    const closeCardActionModalButton = document.getElementById('close-card-action-modal');
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
    const characterPreviewCardEl = document.getElementById('character-preview-card');
    const itemRevealModal = document.getElementById('item-reveal-modal');
    const itemRevealContent = itemRevealModal?.querySelector('.modal-content');
    const closeItemRevealModalButton = document.getElementById('close-item-reveal-modal');
    const itemRevealTitleEl = document.getElementById('item-reveal-title');
    const itemRevealImageEl = document.getElementById('item-reveal-image');
    const itemRevealPlaceholderEl = document.getElementById('item-reveal-placeholder');
    const itemRevealNameEl = document.getElementById('item-reveal-name');
    const itemRevealRarityEl = document.getElementById('item-reveal-rarity');
    const itemRevealTypeEl = document.getElementById('item-reveal-type');
    const itemRevealDescriptionEl = document.getElementById('item-reveal-description');
    const itemRevealLevelEl = document.getElementById('item-reveal-level');
    const confirmItemRevealButton = document.getElementById('confirm-item-reveal-button');
    const roleResultModal = document.getElementById('role-result-modal');
    const roleResultModalBody = document.getElementById('role-result-modal-body');
    const roleResultDiceDisplayEl = document.getElementById('role-result-dice-display');
    const roleResultNameEl = document.getElementById('role-result-name');
    const playerNameInput = document.getElementById('player-name-input');
    const cardDetailModal = document.getElementById('card-detail-modal');
    const closeCardDetailModalButton = document.getElementById('close-card-detail-modal');
    const cardDetailImage = document.getElementById('card-detail-image');
    const cardDetailPlaceholder = document.getElementById('card-detail-placeholder');
    const cardDetailName = document.getElementById('card-detail-name');
    const cardDetailRarity = document.getElementById('card-detail-rarity');
    const cardDetailType = document.getElementById('card-detail-type');
    const cardDetailLevel = document.getElementById('card-detail-level');
    const cardDetailDescription = document.getElementById('card-detail-description');
    const cardDetailFlavor = document.getElementById('card-detail-flavor');
    const cardDetailUsesContainer = document.getElementById('card-detail-uses-container');
    const cardDetailUses = document.getElementById('card-detail-uses');
    const scoreCalculationAnimationEl = document.getElementById('score-calculation-animation');
    const diceAreaEl = document.getElementById('dice-area');

    // --- ゲーム状態 --- 
    const INITIAL_PLAYER_SCORE = 2500;
    let playerScore = INITIAL_PLAYER_SCORE;
    let scoreAtWaveStart = INITIAL_PLAYER_SCORE;
    let npcScore = 500;
    let currentWave = 1, defeatedCount = 0;
    let totalScoreChange = 0;
    let currentBet = 0, isPlayerTurn = true, playerDice = [0, 0, 0], npcDice = [0, 0, 0];
    let playerHand = null, npcHand = null, playerRollCount = 0, npcRollCount = 0;
    let isGameActive = false;
    let permanentScoreBoost = 0;
    let gameMode = 'normal';
    let gameHistory = [], handHighlightTimeout = null;
    let betHoldInterval = null, betHoldTimeout = null, betHoldAmount = 0;
    let roleResultModalTimeout = null;
    let baseMinBet = 50; let currentMinBet = baseMinBet;
    let consecutiveWins = 0; let npcConsecutiveWins = 0;
    let isPlayerParent = true;
    let playerCoins = 0;
    let playerCards = [];
    let currentShopOffers = [];
    let purchasedOrUpgradedInShop = [];
    let currentRoundInWave = 0;
    let cardToDiscardFor = null;
    let cardTypeToDiscard = null;
    let activeCardUses = {};
    let activeCardBeingUsed = null;
    let freeRerollsAvailableThisShopVisit = 0;
    let isShowingRoleResult = false;
    let isShowingGameResult = false;
    let playerName = "";

    // --- キャラクターデータ --- 
    const characters = [
        { id: 'char01', name: 'カオル', image: './Character Image/Character01.png', initialCardId: null, initialCardPool: ['blessingDice'] },
        { id: 'char02', name: 'トキワ', image: './Character Image/Character02.png', initialCardId: null, initialCardPool: ['changeEyeToOne'] },
        { id: 'char03', name: 'ツキコ', image: './Character Image/Character03.png', initialCardId: null, initialCardPool: ['changeEyeToSix'] },
        { id: 'char04', name: 'カゲヤマ', image: './Character Image/Character04.png', initialCardId: null, initialCardPool: ['changeToOne'] },
        { id: 'char05', name: 'シグレ', image: './Character Image/Character05.png', initialCardId: null, initialCardPool: ['changeToSix'] },
        { id: 'char06', name: 'アカギ', image: './Character Image/Character06.png', initialCardId: null, initialCardPool: ['sixEyeBonus'] },
        { id: 'char07', name: 'キャラクター07', image: './Character Image/Character07.png', initialCardId: null, initialCardPool: ['oneEyeBonus'] },
        { id: 'char08', name: 'キャラクター08', image: './Character Image/Character08.png', initialCardId: null, initialCardPool: ['soulRoll'] },
        { id: 'char09', name: 'キャラクター09', image: './Character Image/Character09.png', initialCardId: null, initialCardPool: ['stormWarning'] },
        { id: 'char10', name: 'キャラクター10', image: './Character Image/Character10.png', initialCardId: null, initialCardPool: ['drawBonus'] },
        { id: 'char11', name: 'キャラクター11', image: './Character Image/Character11.png', initialCardId: null, initialCardPool: ['betBoost'] },
        { id: 'char12', name: 'キャラクター12', image: './Character Image/Character12.png', initialCardId: null, initialCardPool: ['rewardAmplifier'] },
        { id: 'char13', name: 'キャラクター13', image: './Character Image/Character13.png', initialCardId: null, initialCardPool: ['blindingDice'] },
    ];
    let selectedCharacter = characters[0];
    playerName = selectedCharacter.name;
    if(playerNameInput) playerNameInput.value = playerName;
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
     const ROLE_RESULT_MODAL_DURATION_BASE = 1500;
     const GAME_RESULT_MODAL_DURATION = 2500;
     const SCORE_ANIMATION_DURATION = 600; const SCORE_POPUP_DURATION = 1500;
     const BET_HOLD_DELAY = 500, BET_HOLD_INTERVAL = 80;
     const CONSECUTIVE_WIN_BONUS_RATE = 0.1;
     const NPC_BET_DELAY = 1500;
     const MAX_ACTIVE_CARDS = 4;
     const MAX_PASSIVE_CARDS = 4;
     const REROLL_COST = 20;
     const MAX_CARD_LEVEL = 3;
     const SELL_PRICE_RATE = 0.5;
     const DEFAULT_SHOP_MESSAGE = "好きなカードを購入して手札を強化しよう！";
     const UPGRADE_COST_MULTIPLIER = 1.5;
     const MIN_BET_INCREMENT = 50;
     const COIN_ANIMATION_DURATION = 1000;
     const CALC_STEP_DELAY_SHORT = 400; // 短い表示時間 (ms)
     const CALC_STEP_DELAY_NORMAL = 700; // 通常の表示時間 (ms)
     const CALC_STEP_DELAY_LONG = 1000; // 長い表示時間 (ms)
     const CALC_FINAL_DELAY = 1500; // 最終結果の表示時間 (ms)
     const CALC_MULTI_STEP_DELAY = 250; // 倍率加算の各ステップ時間


    // --- パック定義 ---
const packDefinitions = [
    {
        id: 'pack_dice', name: '出目操作パック', description: '出目を操作するカードが出やすいパック。', image: './Card Image/Pack_Dice.png',
        cardPool: ['changeToOne', 'changeToSix', 'zoroChanceUp', 'avoid123_456', 'blessingDice', 'adjustEye', 'nextChance', 'blindingDice'], costCalculation: 'average', baseCost: 100, type: 'pack'
    },
    {
        id: 'pack_score', name: '点数強化パック', description: 'スコアに関連するカードが出やすいパック。', image: './Card Image/Pack_Score.png',
        cardPool: ['shonbenHalf', 'sixEyeBonus', 'oneEyeBonus', 'arashiBonus', 'shigoroBonus', 'hifumiHalf', 'betBoost', 'fightingSpirit', 'rewardAmplifier', 'doubleUpBet', 'lossInsurance'], costCalculation: 'average', baseCost: 120, type: 'pack'
    },
    {
        id: 'pack_support', name: '補助パック', description: 'ゲーム進行を助けるカードが出やすいパック。', image: './Card Image/Pack_Support.png',
        cardPool: ['reroll1', 'ignoreMinBet', 'shopChoicePlus1', 'drawBonus', 'keepParentalRight', 'handExchange', 'soulRoll', 'riskyBet', 'giveUpEye'], costCalculation: 'average', baseCost: 90, type: 'pack'
    }
];

// --- 追加持ち点アイテム定義 --- 
const boostItems = [
    {
        id: 'boost_500', name: '+500点持ち点増強', description: 'ゲーム終了まで開始時の持ち点が永続的に500点加算されます。', image: './Card Image/Boost_500.png',
        boostAmount: 500, cost: 400, type: 'boost', rarity: 2
    },
    {
        id: 'boost_1000', name: '+1000点持ち点増強', description: 'ゲーム終了まで開始時の持ち点が永続的に1000点加算されます。', image: './Card Image/Boost_1000.png',
        boostAmount: 1000, cost: 750, type: 'boost', rarity: 3
    }
];

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
        { id: 'blessingDice', name: '天の恵み', type: 'dice', cost: 130, rarity: 2, flavor: '天よ、我に力を！(このラウンド中6が出やすく)', usesPerWave: 1, image: './Card Image/15.png' },
        { id: 'adjustEye', name: '出目調整', type: 'dice', cost: 60, rarity: 1, flavor: 'あと一つ…！を現実に。', usesPerWave: 1, image: './Card Image/16.png' },
        { id: 'stormWarning', name: '嵐の予感', type: 'dice', cost: 250, rarity: 3, flavor: '嵐の前触れ…次こそは！(無料ロール時ゾロ目率UP)', usesPerWave: 1, image: './Card Image/17.png' },
        { id: 'nextChance', name: 'ネクストチャンス', type: 'dice', cost: 180, rarity: 3, flavor: '諦めるのはまだ早い。', usesPerWave: 1, image: './Card Image/18.png' },
        { id: 'betBoost', name: '賭け金ブースト', type: 'score', cost: 160, rarity: 2, flavor: 'リスクを取らねば、得られるものも少ない。', effectTag: 'betBoost', image: './Card Image/19.png' },
        { id: 'fightingSpirit', name: '逆境の魂', type: 'score', cost: 140, rarity: 2, flavor: '窮鼠猫を噛む、とはよく言ったものだ。', effectTag: 'fightingSpirit', image: './Card Image/20.png' },
        { id: 'rewardAmplifier', name: '報酬増幅', type: 'score', cost: 280, rarity: 3, flavor: '勝利の美酒は、より甘く。', usesPerWave: 1, image: './Card Image/21.png' },
        { id: 'keepParentalRight', name: '親権維持', type: 'support', cost: 180, rarity: 2, flavor: 'この座は、譲らん！', usesPerWave: 1, image: './Card Image/22.png' },
        { id: 'handExchange', name: '手札交換', type: 'support', cost: 50, rarity: 1, flavor: '不要なものを、新たな可能性に。', effectTag: 'handExchange', image: './Card Image/23.png' },
        { id: 'soulRoll', name: '魂の一振り', type: 'support', cost: 200, rarity: 3, flavor: 'すべてをこの一振りに…！', usesPerWave: 1, image: './Card Image/24.png' },
        { id: 'doubleUpBet', name: 'ダブルアップ', type: 'score', cost: 220, rarity: 3, flavor: '倍プッシュだ…！', usesPerWave: 1, image: './Card Image/25.png' },
        { id: 'riskyBet', name: '危険な賭け', type: 'support', cost: 120, rarity: 2, flavor: '勝負は常に、リスクと隣り合わせ。', usesPerWave: 1, image: './Card Image/26.png' },
        { id: 'giveUpEye', name: '見切り', type: 'support', cost: 70, rarity: 1, flavor: '深追いは禁物。損切りも大事。', usesPerWave: 1, image: './Card Image/27.png' },
        { id: 'blindingDice', name: '目くらまし', type: 'dice', cost: 260, rarity: 3, flavor: 'さあ、惑うがいい！', usesPerWave: 1, image: './Card Image/28.png' },
        { id: 'lossInsurance', name: '一撃保険', type: 'score', cost: 190, rarity: 3, flavor: '備えあれば憂いなし…？', effectTag: 'lossInsurance', image: './Card Image/29.png' },
        { id: 'changeEyeToOne', name: '1の目に変更', type: 'dice', cost: 90, rarity: 1, flavor: 'ピンゾロ…？いや、安全策か。', usesPerWave: 1, image: './Card Image/30.png' },
        { id: 'changeEyeToSix', name: '6の目に変更', type: 'dice', cost: 110, rarity: 1, flavor: 'その目を、最強の目に変えよう。', usesPerWave: 1, image: './Card Image/31.png' },
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

     // --- 効果音関連 --- 
const soundFiles = {
    click: './sounds/click.mp3', // ボタンクリック汎用
    betConfirm: './sounds/bet_confirm.mp3', // 賭け金決定
    diceRoll: './sounds/dice_roll.mp3', // サイコロロール開始
    diceStop: ['./sounds/dice_stop1.mp3', './sounds/dice_stop2.mp3', './sounds/dice_stop3.mp3'], // サイコロ停止音 (複数からランダム選択)
    yakuEye: './sounds/yaku_eye.mp3', // 目
    yakuShigoro: './sounds/yaku_shigoro.mp3', // シゴロ
    yakuArashi: './sounds/yaku_arashi.mp3', // アラシ
    yakuPinzoro: './sounds/yaku_pinzoro.mp3', // ピンゾロ
    yakuHifumi: './sounds/yaku_hifumi.mp3', // ヒフミ
    yakuShonben: './sounds/yaku_shonben.mp3', // ションベン・目なし確定
    scoreUp: './sounds/score_up.mp3', // スコア増加
    scoreDown: './sounds/score_down.mp3', // スコア減少
    scoreSE: './sounds/scoreSE.mp3', //スコアアニメーション
    cardUse: './sounds/card_use.mp3', // カード使用
    cardSelect: './sounds/click.mp3', // カード選択 (クリック音流用)
    waveClear: './sounds/wave_clear.mp3', // WAVEクリア
    gameOver: './sounds/game_over.mp3', // ゲームオーバー
    coin: './sounds/coin.mp3', // コイン獲得
    shopBuy: './sounds/shop_buy.mp3', // ショップ購入/強化
    shopReroll: './sounds/shop_reroll.mp3', // ショップリロール
    shopSell: './sounds/shop_sell.mp3', // ショップ売却
    error: './sounds/error.mp3', // エラー/不可操作
    win: './sounds/win.mp3', //  勝利SE
    lose: './sounds/lose.mp3', // 敗北SE
    diceRollButton: './sounds/dice_roll_button.mp3', // ロールボタンSE追加
    maxBet: './sounds/max.mp3', // MAXベットSE追加
    minBet: './sounds/min.mp3', // MINベットSE追加
    buyButton: './sounds/buy_button.mp3',         // ★ 購入ボタンSE
    levelUpButton: './sounds/level_up_button.mp3', // ★ 強化ボタンSE
    detailButton: './sounds/detail.mp3',         // ★ 詳細ボタンSE
    startButton: './sounds/start_button.mp3',     // ★ ゲーム開始ボタンSE
    scoreResults: './sounds/score_results.mp3',   // ★ スコア結果表示SE
    skipButton: './sounds/skip.mp3',         // ★ スキップボタンSE
    cardButton: './sounds/card_button.mp3',   // ★ カードボタンSE (共通)
    shopButton: './sounds/shop.mp3',         // ★ ショップ入/出ボタンSE
    // 必要に応じて他の効果音も追加
};
let sounds = {}; // Audioオブジェクトを格納
let isAudioContextUnlocked = false; // ユーザー操作によるAudioContextアンロックフラグ

// ===== BGM関連 ===== 
const bgmFiles = {
    title: './sounds/bgm_title.mp3',
    game_normal: './sounds/bgm_game_normal.mp3',
    game_pinch: './sounds/bgm_game_pinch.mp3',
    game_chance: './sounds/bgm_game_chance.mp3',
    shop: './sounds/bgm_shop.mp3',
    result_clear: './sounds/bgm_result_clear.mp3',
    result_over: './sounds/bgm_result_over.mp3',
    result_over: './sounds/bgm_result_game_over.mp3',
};
let bgms = {}; // Audioオブジェクトを格納
let currentBgm = null; // 現在再生中のBGM Audioオブジェクト
let bgmFadeInterval = null; // フェード処理用のInterval ID

let settings = {
    bgmVolume: 0.5, // デフォルトBGM音量
    seVolume: 0.7   // デフォルトSE音量
};
const SETTINGS_STORAGE_KEY = 'chinchiroSettings'; // LocalStorage用キー

    // --- 基本関数 ---
    function showScreen(screenId) { 
        console.log("Showing screen:", screenId);
        document.querySelectorAll('.screen').forEach(s => {
            s.classList.remove('active');
            s.style.display = 'none';
        });
        const screenToShow = document.getElementById(screenId);
        if (screenToShow && screenToShow.classList.contains('screen')) {
            const flexScreens = ['title-screen', 'result-screen', 'character-select-screen', 'shop-screen', 'game-screen'];
            if (flexScreens.includes(screenId)) {
                screenToShow.style.display = 'flex';
            } else {
                screenToShow.style.display = 'block';
            }
            requestAnimationFrame(() => {
                 screenToShow.classList.add('active');
            });
            // 画面に応じたBGM切り替え
            let targetBgm = null;
            switch (screenId) {
                case 'title-screen': targetBgm = 'title'; break;
                case 'game-screen': targetBgm = 'game_normal'; break;
                case 'shop-screen': targetBgm = 'shop'; break;
                case 'result-screen':
                    //\リザルト画面の内容に応じて切り替え 
                    const resultTitleElem = document.getElementById('result-title'); // 変数名変更
                    if (resultTitleElem && resultTitleElem.classList.contains('clear')) {
                        targetBgm = 'result_clear';
                    } else {
                        targetBgm = 'result_over'; // ★ ゲームオーバーBGMに
                    }
                    break;
                case 'character-select-screen':
                    targetBgm = 'title'; // タイトル画面と同じBGMを使用
                    break;
                default:
                    // その他の画面ではBGMを停止するか、デフォルトBGMを流すなど
                    stopBGM(true); // 例としてフェードアウトで停止
                    break;
            }

            if (targetBgm) {
                // 現在再生中のBGMと比較し、異なる場合のみ切り替え
                if (!currentBgm || currentBgm !== bgms[targetBgm]) {
                     switchBGM(targetBgm);
                 } else if (currentBgm.paused) {
                     // 同じBGMだが停止している場合（例: AudioContextアンロック待ち後）は再生再開
                     playBGM(targetBgm);
                 }
            }
            if (screenId === 'title-screen') {
                if (startGameButton) startGameButton.disabled = false;
                if (selectCharacterButton) selectCharacterButton.disabled = false;
                if(modeButtons) modeButtons.forEach(btn => btn.disabled = false);
                previewingCharacter = null;
            }
            else if (screenId === 'character-select-screen') {
                populateCharacterList();
                if(characterPreviewImageEl) characterPreviewImageEl.style.display = 'none';
                if(characterPreviewPlaceholderEl) {
                     characterPreviewPlaceholderEl.style.display = 'block';
                     characterPreviewPlaceholderEl.textContent = '← リストから選択';
                }
                if(characterPreviewCardEl) characterPreviewCardEl.style.display = 'none';
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
            } else if (screenId === 'shop-screen') {
                updateShopUI();
            }
        } else {
            console.error("Screen not found:", screenId);
        }
    }

    // --- 効果音・BGM読み込み ---
    function loadSounds() {
        console.log("Loading sounds and BGM...");
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            console.error("Web Audio API is not supported in this browser.");
            // ここで代替処理やユーザーへの通知を行うことも検討
            return;
        }
        const audioCtx = new AudioContext();
        isAudioContextUnlocked = audioCtx.state === 'running'; // 初期状態をチェック

        // unlockのため空のバッファソースを作成 (エラーハンドリング追加)
        try {
            const buffer = audioCtx.createBuffer(1, 1, 22050);
            const source = audioCtx.createBufferSource();
            source.buffer = buffer;
            source.connect(audioCtx.destination);
        } catch (e) {
            console.warn("Error creating dummy audio buffer for unlock:", e);
        }


        // ユーザー操作でAudioContextを再開させるためのイベントリスナー
        const unlockAudio = () => {
            if (audioCtx.state === 'suspended') {
                audioCtx.resume().then(() => {
                    console.log("AudioContext resumed!");
                    isAudioContextUnlocked = true;
                    // リスナー解除
                    document.body.removeEventListener('click', unlockAudio, true); // ★ キャプチャフェーズで実行
                    document.body.removeEventListener('touchend', unlockAudio, true); // ★ キャプチャフェーズで実行
                    document.body.removeEventListener('keydown', unlockAudio, true); // ★ キーボード操作も考慮
                    // ★ BGMの再生を開始/再開 (初回アンロック時)
                    if (currentBgm && currentBgm.paused) {
                        // ★ 再生前に音量を再設定
                        currentBgm.volume = settings.bgmVolume;
                        currentBgm.play().catch(e => console.warn("BGM play error after unlock:", e));
                    }
                }).catch(err => {
                    console.error("Failed to resume AudioContext:", err);
                });
            } else {
                 // console.log("AudioContext already running or resuming."); // 頻繁に出るためコメントアウト推奨
                 isAudioContextUnlocked = true; // 状態を更新
                 // リスナー解除
                 document.body.removeEventListener('click', unlockAudio, true);
                 document.body.removeEventListener('touchend', unlockAudio, true);
                 document.body.removeEventListener('keydown', unlockAudio, true);
            }
        };

        // AudioContextがsuspendedの場合のみリスナーを設定
        if (!isAudioContextUnlocked) {
            console.log("AudioContext is suspended, adding unlock listeners.");
            document.body.addEventListener('click', unlockAudio, { capture: true, once: true }); // ★ once: true を追加
            document.body.addEventListener('touchend', unlockAudio, { capture: true, once: true }); // ★ once: true を追加
            document.body.addEventListener('keydown', unlockAudio, { capture: true, once: true }); // ★ once: true を追加
        }


        // 効果音の読み込み (変更なし)
        for (const key in soundFiles) {
            if (Array.isArray(soundFiles[key])) {
                sounds[key] = [];
                soundFiles[key].forEach(filePath => {
                    const audio = new Audio(filePath);
                    audio.preload = 'auto';
                    sounds[key].push(audio);
                    audio.load();
                });
            } else {
                const audio = new Audio(soundFiles[key]);
                audio.preload = 'auto';
                sounds[key] = audio;
                sounds[key].load();
            }
        }
        // BGMの読み込み (変更なし)
        for (const key in bgmFiles) {
            const audio = new Audio(bgmFiles[key]);
            audio.preload = 'auto';
            audio.loop = true; // BGMはループ再生を基本とする
            bgms[key] = audio;
            bgms[key].load();
             // ★ 初期音量を設定しておく (再生時に再度設定されるが念のため)
             audio.volume = settings.bgmVolume;
        }
        console.log("Sounds and BGM loading initiated.");
    }

    // --- 効果音再生 ---
function playSound(soundName) {
    if (!isAudioContextUnlocked) {
        console.warn("AudioContext not unlocked yet. Skipping sound playback:", soundName);
        return; // 音声コンテキストがアンロックされるまで再生しない
    }

    if (sounds[soundName]) {
        let soundToPlay;
        if (Array.isArray(sounds[soundName])) {
            // 配列からランダムに選択
            if (sounds[soundName].length > 0) {
                const randomIndex = Math.floor(Math.random() * sounds[soundName].length);
                soundToPlay = sounds[soundName][randomIndex];
            } else {
                console.warn(`Sound array '${soundName}' is empty.`);
                return;
            }
        } else {
            soundToPlay = sounds[soundName];
        }

        // cloneNode() を使って同時に複数の同じ音を再生可能にする
        const audio = soundToPlay.cloneNode();
        audio.volume = settings.seVolume; // ★ 設定されたSE音量を適用
        audio.play().catch(error => {
            // 特にユーザーインタラクション前の再生エラーは無視してよい場合が多い
            if (error.name !== 'NotAllowedError') {
                 console.warn(`Error playing sound '${soundName}':`, error.name, error.message);
            } else {
                // console.log(`Sound '${soundName}' playback prevented until user interaction.`); // 必要ならログ出力
            }
        });
    } else {
        console.warn(`Sound '${soundName}' not found.`);
    }
}

    // --- BGM再生 ---
    function playBGM(bgmName, volume = settings.bgmVolume, fade = false) {
        if (bgms[bgmName]) {
            // ★ volume 引数が未指定の場合に settings.bgmVolume を使うように修正
            const targetVolume = (typeof volume === 'number' && volume >= 0 && volume <= 1) ? volume : settings.bgmVolume;

            // 既に同じBGMが同じ音量で再生中なら何もしない
            if (currentBgm === bgms[bgmName] && !currentBgm.paused && Math.abs(currentBgm.volume - targetVolume) < 0.01) {
                 // console.log(`BGM ${bgmName} is already playing at the target volume.`); // ログ抑制
                return;
            }
            // 別のBGMが再生中なら停止(フェードアウトはswitchBGMで行う)
            if (currentBgm && currentBgm !== bgms[bgmName]) { // ★ !fade条件を削除 (switchBGMで制御)
                stopBGM(); // フェードなしで即時停止
            }

            currentBgm = bgms[bgmName];
            // ★ 再生前に必ず目標音量を設定
            currentBgm.volume = fade ? 0 : targetVolume;
            if (currentBgm.currentTime > 0 && !fade) { // ★ フェードイン以外で途中から再生する場合もリセット
                 console.log(`Resetting currentTime for ${bgmName}`);
                 currentBgm.currentTime = 0;
            }


            if (isAudioContextUnlocked) {
                currentBgm.play().then(() => {
                    if (fade) {
                        let currentVolume = 0;
                        clearInterval(bgmFadeInterval);
                        const fadeSteps = 20; // 500ms / 25ms step
                        const fadeStepAmount = targetVolume / fadeSteps;
                        bgmFadeInterval = setInterval(() => {
                            currentVolume += fadeStepAmount;
                            if (currentVolume >= targetVolume) {
                                currentVolume = targetVolume;
                                clearInterval(bgmFadeInterval);
                            }
                             if(currentBgm) currentBgm.volume = currentVolume;
                        }, 500 / fadeSteps); // 500msでフェードイン
                    } else {
                         // フェードなしの場合も音量確認
                         currentBgm.volume = targetVolume;
                    }
                    console.log(`Playing BGM: ${bgmName} at volume ${targetVolume.toFixed(2)}`);
                }).catch(error => {
                    // 再生失敗時 (特にユーザー操作前)
                    console.warn(`Error playing BGM '${bgmName}':`, error.name, error.message);
                    // 必要ならここで isAudioContextUnlocked を false に戻すなどの対策も可能
                    if (error.name === 'NotAllowedError') {
                        console.log("Playback prevented until user interaction. Waiting for unlock.");
                        // 再生しようとしたBGMを記憶しておき、unlockAudioで再生試行するなど
                    }
                });
            } else {
                console.log(`BGM '${bgmName}' playback deferred until AudioContext unlock.`);
                 // ★ 再生しようとしたBGMを記憶しておく（unlock時に再生するため）
                 // この例では currentBgm が設定されているので unlockAudio 内で再生が試みられる
            }

        } else {
            console.warn(`BGM '${bgmName}' not found.`);
        }
    }

    // --- BGM停止 --- (変更なし)
    function stopBGM(fade = false, duration = 500) { // フェードアウトオプション追加
        if (currentBgm && !currentBgm.paused) {
            if (fade) {
                let currentVolume = currentBgm.volume;
                clearInterval(bgmFadeInterval); // 既存のフェード処理をクリア
                 const fadeStep = currentVolume / (duration / 50); // 50msごとの減少量
                bgmFadeInterval = setInterval(() => {
                    currentVolume -= fadeStep;
                    if (currentVolume <= 0) {
                        currentVolume = 0;
                        clearInterval(bgmFadeInterval);
                        if(currentBgm) {
                            currentBgm.pause();
                            currentBgm.currentTime = 0; // 必要なら再生位置もリセット
                            console.log("BGM stopped with fade out.");
                            currentBgm = null; // 再生中のBGM情報をクリア
                        }
                    } else {
                         if(currentBgm) currentBgm.volume = currentVolume;
                    }
                }, 50);
            } else {
                currentBgm.pause();
                currentBgm.currentTime = 0;
                console.log("BGM stopped.");
                currentBgm = null;
            }
        }
        // currentBgm = null; // フェードアウト完了時にnullにする
    }

    // --- BGM切り替え --- (変更なし)
    function switchBGM(newBgmName, fadeDuration = 500) {
        console.log(`Switching BGM to: ${newBgmName}`);
        const targetVolume = settings.bgmVolume;

        if (currentBgm && !currentBgm.paused && currentBgm === bgms[newBgmName]) {
             // 同じBGMの場合、音量だけ調整 (フェードはかけない)
             if (currentBgm.volume !== targetVolume) {
                 // 簡単なフェード調整
                 clearInterval(bgmFadeInterval);
                 const diff = targetVolume - currentBgm.volume;
                 const steps = 10;
                 const stepAmount = diff / steps;
                 let count = 0;
                 bgmFadeInterval = setInterval(() => {
                     if(currentBgm) currentBgm.volume += stepAmount;
                     count++;
                     if (count >= steps) {
                         clearInterval(bgmFadeInterval);
                         if(currentBgm) currentBgm.volume = targetVolume; // 最終調整
                     }
                 }, fadeDuration / steps);
             }
             console.log(`BGM ${newBgmName} volume adjusted to ${targetVolume}`);
             return; // 切り替え不要
         }


        if (currentBgm && !currentBgm.paused) {
            // 現在のBGMをフェードアウト
            stopBGM(true, fadeDuration);
            // フェードアウト完了後に新しいBGMをフェードイン
            setTimeout(() => {
                playBGM(newBgmName, targetVolume, true); // ★ playBGMに設定音量を渡す
            }, fadeDuration);
        } else {
            // BGMが再生されていない場合は即時再生（フェードイン付き）
            playBGM(newBgmName, targetVolume, true); // ★ playBGMに設定音量を渡す
        }
    }

    // --- 設定関連 --- (音量スライダーハンドラは修正済み)
    const bgmVolumeSlider = document.getElementById('bgm-volume-slider');
    const seVolumeSlider = document.getElementById('se-volume-slider');
    const backToTitleSettingsButton = document.getElementById('back-to-title-from-settings-button');
    const closeGameButton = document.getElementById('close-game-button');

    if (bgmVolumeSlider) {
        bgmVolumeSlider.addEventListener('input', handleBgmVolumeChange);
        bgmVolumeSlider.addEventListener('change', saveSettings); // マウスを離した時に保存
    }
    if (seVolumeSlider) {
        seVolumeSlider.addEventListener('input', handleSeVolumeChange);
        seVolumeSlider.addEventListener('change', saveSettings); // マウスを離した時に保存
    }
    if (backToTitleSettingsButton) {
        backToTitleSettingsButton.addEventListener('click', handleBackToTitleFromSettings); // SE追加
    }
    if (closeGameButton) {
        closeGameButton.addEventListener('click', handleCloseGame); // SE追加
    }

    function checkAndSwitchRoleBgm(playerHandToCheck, npcHandToCheck) {
        let situationBgmOverride = null;
        const playerHighRole = playerHandToCheck && (playerHandToCheck.name === ROLES.SHIGORO.name || playerHandToCheck.name === ROLES.ARASHI.name || playerHandToCheck.name === ROLES.PINZORO.name);
        const npcHighRole = npcHandToCheck && (npcHandToCheck.name === ROLES.SHIGORO.name || npcHandToCheck.name === ROLES.ARASHI.name || npcHandToCheck.name === ROLES.PINZORO.name);
        const playerIsHifumi = playerHandToCheck && playerHandToCheck.name === ROLES.HIFUMI.name;
        const npcIsHifumi = npcHandToCheck && npcHandToCheck.name === ROLES.HIFUMI.name;

        // ピンチ/チャンス判定
        if (playerIsHifumi) situationBgmOverride = 'game_pinch';
        else if (playerHighRole) situationBgmOverride = 'game_chance';
        else if (npcHighRole) situationBgmOverride = 'game_pinch';
        else if (npcIsHifumi) situationBgmOverride = 'game_chance';

        // ★ 実行条件を緩和: ロール中でなければ実行（isGameActive条件を削除）
        if (situationBgmOverride && currentBgm !== bgms[situationBgmOverride] && !diceAnimationId) {
            console.log(`BGM Override Triggered by Role: ${situationBgmOverride} (Player: ${getHandDisplayName(playerHandToCheck)}, NPC: ${getHandDisplayName(npcHandToCheck)})`);
            switchBGM(situationBgmOverride); // BGMを切り替え
        }
    }


    // --- 設定保存/読み込み ---
    function saveSettings() {
        try {
            localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
            console.log("Settings saved:", settings);
        } catch (e) {
            console.error("Failed to save settings to localStorage:", e);
        }
    }
    function loadSettings() { // (変更なし - UI反映は updateVolumeSliders で実施)
        try {
            const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
            if (savedSettings) {
                const parsedSettings = JSON.parse(savedSettings);
                // 型チェックと範囲チェックを追加
                if (typeof parsedSettings.bgmVolume === 'number' && parsedSettings.bgmVolume >= 0 && parsedSettings.bgmVolume <= 1) {
                     settings.bgmVolume = parsedSettings.bgmVolume;
                }
                if (typeof parsedSettings.seVolume === 'number' && parsedSettings.seVolume >= 0 && parsedSettings.seVolume <= 1) {
                     settings.seVolume = parsedSettings.seVolume;
                }
                console.log("Settings loaded:", settings);
            } else {
                console.log("No saved settings found, using defaults.");
                // デフォルト値は既に settings オブジェクトに設定されている
            }
            // UIに反映
            updateVolumeSliders();
            // 現在再生中のBGMがあれば音量を適用
            if (currentBgm && !currentBgm.paused) {
                currentBgm.volume = settings.bgmVolume;
            }

        } catch (e) {
            console.error("Failed to load or parse settings from localStorage:", e);
            // エラーが発生した場合もデフォルト設定が使われる
        }
    }

    // --- 音量スライダーUI更新 ---
function updateVolumeSliders() {
    const bgmSlider = document.getElementById('bgm-volume-slider');
    const bgmValueDisplay = document.getElementById('bgm-volume-value');
    const seSlider = document.getElementById('se-volume-slider');
    const seValueDisplay = document.getElementById('se-volume-value');

    if (bgmSlider) {
        bgmSlider.value = settings.bgmVolume;
        // ★ スライダー背景更新
        bgmSlider.style.setProperty('--value-percent', `${settings.bgmVolume * 100}%`);
    }
    if (bgmValueDisplay) bgmValueDisplay.textContent = `${Math.round(settings.bgmVolume * 100)}%`;
    if (seSlider) {
        seSlider.value = settings.seVolume;
        // ★ スライダー背景更新
        seSlider.style.setProperty('--value-percent', `${settings.seVolume * 100}%`);
    }
    if (seValueDisplay) seValueDisplay.textContent = `${Math.round(settings.seVolume * 100)}%`;
}

    // --- BGM音量変更処理 ---
function handleBgmVolumeChange(event) {
    const volume = parseFloat(event.target.value);
    settings.bgmVolume = volume;
    if (currentBgm && !currentBgm.paused) {
        currentBgm.volume = volume;
    }
    // ★ スライダー背景更新
    event.target.style.setProperty('--value-percent', `${volume * 100}%`);
    updateVolumeSliders(); // 表示テキストも更新
    // saveSettings(); // スライダーを動かすたびに保存 (または離した時に保存)
}
    // --- SE音量変更処理 ---
function handleSeVolumeChange(event) {
    const volume = parseFloat(event.target.value);
    settings.seVolume = volume;
    // ★ スライダー背景更新
    event.target.style.setProperty('--value-percent', `${volume * 100}%`);
    updateVolumeSliders(); // 表示テキストも更新
    // テスト用にクリック音などを鳴らしても良い
    // playSound('click');
    // saveSettings(); // スライダーを動かすたびに保存 (または離した時に保存)
}

    // --- タイトルへ戻る処理 --- (SE追加)
    function handleBackToTitleFromSettings() {
        playSound('click'); // ★ SE追加
        if (confirm("ゲームを中断してタイトルに戻りますか？\n（現在の進行状況は失われます）")) {
            // BGM停止
            stopBGM(true);
            // ゲーム状態リセット (initGame相当の処理)
            // - スコア、WAVE、カード、コインなどを初期化
            // - 現在の実装ではタイトルに戻るだけで良いかもしれない
            permanentScoreBoost = 0; // 永続ブーストもリセット
            console.log("Returning to title from settings. Resetting game state.");
            settingsModal.style.display = 'none'; // 設定モーダルを閉じる
            showScreen('title-screen');
        }
    }

    // --- ゲーム終了処理 --- (SE追加)
    function handleCloseGame() {
        playSound('click'); // ★ SE追加
        if (confirm("ゲームを終了しますか？")) {
            // 必要であれば終了前の処理
            window.close(); // タブを閉じようと試みる
            // 閉じられなかった場合のフォールバックメッセージ
            alert("タブを閉じられませんでした。手動で閉じてください。");
        }
    }

    // --- ヘルパー関数など --- (変更なし)
    function getHandDisplayName(hand) { if (!hand) return '-'; if (hand.type === '役') return hand.name; if (hand.type === '目') return `目 (${hand.value})`; if (hand.type === 'ションベン') return 'ションベン'; if (hand.type === '目なし') return '目なし'; return '-'; }
    function updateRoleRatesDisplay() { // (変更なし)
        const ratePinzoroEl = document.getElementById('role-rate-pinzoro');
        const rateArashiEl = document.getElementById('role-rate-arashi');
        const rateShigoroEl = document.getElementById('role-rate-shigoro');
        const rateEye1El = document.getElementById('role-rate-eye1');
        const rateEye6El = document.getElementById('role-rate-eye6');
        const rateHifumiEl = document.getElementById('role-rate-hifumi');
        const rateShonbenEl = document.getElementById('role-rate-shonben');
        if (!ratePinzoroEl || !rateArashiEl || !rateShigoroEl || !rateEye1El || !rateEye6El || !rateHifumiEl || !rateShonbenEl) { return; }
        let baseRatePinzoro = ROLES.PINZORO.payoutMultiplier;
        let baseRateArashi = ROLES.ARASHI.payoutMultiplier;
        let baseRateShigoro = ROLES.SHIGORO.payoutMultiplier;
        let baseRateEye = ROLES.NORMAL_EYE.payoutMultiplier;
        let baseRateHifumi = Math.abs(ROLES.HIFUMI.payoutMultiplier);
        let baseRateShonben = Math.abs(ROLES.SHONBEN.payoutMultiplier);
        let bonusArashi = 0, bonusShigoro = 0, bonusEye1 = 0, bonusEye6 = 0, reductionHifumi = 0, reductionShonben = 0;
        playerCards.forEach(cardData => {
            const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef) return; const level = cardData.level;
            switch (cardDef.effectTag) {
                case 'arashiBonus': bonusArashi += level; break;
                case 'shigoroBonus': bonusShigoro += level; break;
                case 'oneEyeBonus': bonusEye1 += level; break;
                case 'sixEyeBonus': bonusEye6 += level; break;
                case 'hifumiHalf': reductionHifumi += level; break;
                case 'shonbenHalf': reductionShonben = 0.5; break; // shonbenHalfはレベルに関わらず半減(0.5)とする仕様に見える
            }
        });
        ratePinzoroEl.textContent = baseRatePinzoro;
        rateArashiEl.textContent = baseRateArashi + bonusArashi;
        rateShigoroEl.textContent = baseRateShigoro + bonusShigoro;
        rateEye1El.textContent = baseRateEye + bonusEye1;
        rateEye6El.textContent = baseRateEye + bonusEye6;
        rateHifumiEl.textContent = Math.max(1, baseRateHifumi - reductionHifumi); // ヒフミは最低1倍支払い? (要確認) -> ルール上2倍なのでMax(1)不要かも
        rateShonbenEl.textContent = Math.max(0.5, baseRateShonben * (1 - reductionShonben)); // ションベン軽減適用 (最低0.5倍?) -> 0.5軽減なので `base - 0.5` かも？ 現状は 乗算 になっている
        console.log("Updated role rates display based on current cards.");
    }
    function setMessage(msg, buttonType = 'none') { 
        messageEl.textContent = msg;
        messageButtonContainer.innerHTML = ''; // ボタンクリア

        if (buttonType === 'yesNo') {
            const button1 = document.createElement('button');
            button1.textContent = 'はい';
            button1.className = 'button-pop temp-choice-button';
            button1.onclick = () => { playSound('click'); handleUserChoice(true); }; // ★ SE追加
            messageButtonContainer.appendChild(button1);

            const button2 = document.createElement('button');
            button2.textContent = 'いいえ';
            button2.className = 'button-subtle temp-choice-button';
            button2.onclick = () => { playSound('click'); handleUserChoice(false); }; // ★ SE追加
            messageButtonContainer.appendChild(button2);
        } else if (buttonType === 'postRollChoice') {
            // 「スキップ」ボタン
            const skipButton = document.createElement('button');
            skipButton.id = 'skip-action-button';
            skipButton.textContent = 'スキップ';
            skipButton.className = 'button-subtle skip-button';
            skipButton.onclick = () => { playSound('skipButton'); handleSkipAction(); };
            messageButtonContainer.appendChild(skipButton);

            // 「カード」ボタン
            const cardButton = document.createElement('button');
            cardButton.id = 'post-roll-card-button';
            cardButton.textContent = 'カード';
            cardButton.className = 'button-pop card-button';
            cardButton.onclick = () => { playSound('cardButton'); openCardActionModal(); };
            messageButtonContainer.appendChild(cardButton);
            updateCardButtonHighlight();
        }
    }
    function waitForUserChoice() { return new Promise(resolve => { waitingForUserChoice = true; userChoiceResolver = resolve; }); } // (変更なし)
    function handleUserChoice(choice) { if (!waitingForUserChoice || !userChoiceResolver) return; waitingForUserChoice = false; const resolver = userChoiceResolver; userChoiceResolver = null; messageButtonContainer.innerHTML = ''; resolver(choice); } // (変更なし)
    function waitForShopConfirmation() { return new Promise(resolve => { shopConfirmationResolver = resolve; }); } // (変更なし)
    function handleShopConfirmation(choice) { if (shopConfirmationResolver) { const resolver = shopConfirmationResolver; shopConfirmationResolver = null; const confirmationButtons = document.getElementById('shop-confirmation-buttons'); if (confirmationButtons) confirmationButtons.remove(); if(shopActionsEl) shopActionsEl.style.display = 'flex'; resolver(choice); } } // (変更なし)
    function rollSingleDice() { return Math.floor(Math.random() * 6) + 1; } // (変更なし)
    function rollDice(isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) { // (変更なし)
        let dice = [rollSingleDice(), rollSingleDice(), rollSingleDice()];
        let appliedZoroUp = false;
        const isStormWarningReroll = stormWarningRerollsLeft > 0 && !isNpc;
        console.log(`Rolling dice... NPC:${isNpc}, Blinding:${blindingDiceLevel}, SoulRoll:${soulRollLevel}, BlessingActive:${blessingDiceActive}, ZoroUpActive:${zoroChanceUpActive}, StormWarningReroll:${isStormWarningReroll}`);
        if (!isNpc) {
            if (blessingDiceActive) { const blessingCard = playerCards.find(c => c.id === 'blessingDice'); const blessingLevel = blessingCard?.level || 1; const blessingChance = [0.20, 0.35, 0.50][blessingLevel - 1]; console.log(`天の恵み Lv.${blessingLevel} (各ダイス ${blessingChance * 100}%で6に)`); for (let i = 0; i < 3; i++) { if (Math.random() < blessingChance) { if (dice[i] !== 6) { console.log(` -> 天の恵み効果！ ダイス${i + 1} (${dice[i]}) が 6 に！`); dice[i] = 6; } } } }
            let totalZoroUpRate = 0; if (zoroChanceUpActive) { const zoroCard = playerCards.find(c => c.id === 'zoroChanceUp'); const zoroLevel = zoroCard?.level || 1; totalZoroUpRate += [0.20, 0.35, 0.50][zoroLevel - 1]; console.log(`ゾロ目確率UP Lv.${zoroLevel} (+${totalZoroUpRate * 100}%)`); }
            if (isStormWarningReroll) { const stormCard = playerCards.find(c => c.id === 'stormWarning'); const stormLevel = stormCard?.level || 1; const stormBonusRate = [0.10, 0.15, 0.20][stormLevel - 1]; totalZoroUpRate += stormBonusRate; console.log(`嵐の予感 無料ロールボーナス Lv.${stormLevel} (+${stormBonusRate * 100}%)`); }
            if (totalZoroUpRate > 0) { console.log(`最終ゾロ目確率UPレート: ${totalZoroUpRate * 100}%`); if (Math.random() < totalZoroUpRate) { if (dice[1] !== dice[0]) { console.log(` -> ゾロ目確率UP効果！ ダイス2 (${dice[1]}) が ${dice[0]} に！`); dice[1] = dice[0]; appliedZoroUp = true; } } if (Math.random() < totalZoroUpRate) { if (dice[2] !== dice[0]) { console.log(` -> ゾロ目確率UP効果！ ダイス3 (${dice[2]}) が ${dice[0]} に！`); dice[2] = dice[0]; appliedZoroUp = true; } } }
            if (isStormWarningReroll && !appliedZoroUp) { const stormCard = playerCards.find(c => c.id === 'stormWarning'); const stormLevel = stormCard?.level || 1; const arashiBoostChance = [0.05, 0.07, 0.10][stormLevel - 1]; if (Math.random() < arashiBoostChance) { const targetValue = Math.floor(Math.random() * 5) + 2; console.log(`Card Effect: 嵐の予感 Lv.${stormLevel} 振り直し時アラシブースト発動！ ${targetValue}のアラシに！`); dice = [targetValue, targetValue, targetValue]; } }
            if (soulRollLevel >= 3) { let attempts = 0; const maxAttempts = 5; const isMenashiCheck = (d) => d[0] !== d[1] && d[1] !== d[2] && d[0] !== d[2]; let isMenashi = isMenashiCheck(dice); while (isMenashi && attempts < maxAttempts) { console.log(`Soul Roll Lv.3: Menashi detected (${dice.join(',')}), rerolling... (Attempt ${attempts + 1})`); let rerolledDice = [rollSingleDice(), rollSingleDice(), rollSingleDice()]; attempts++; isMenashi = isMenashiCheck(rerolledDice); dice = rerolledDice; } if (attempts >= maxAttempts && isMenashi) { console.warn("Soul Roll Lv.3: Max reroll attempts reached, still Menashi."); } else if (attempts > 0 && !isMenashi) { console.log(`Soul Roll Lv.3: Menashi avoided! New dice: ${dice.join(',')}`); } }
        } return dice;
    }
    function getHandResult(dice, isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) { // (変更なし)
        const s = [...dice].sort((a, b) => a - b); const [d1, d2, d3] = s; let result;
        if (d1 === d2 && d2 === d3) { result = d1 === 1 ? { ...ROLES.PINZORO, type: '役', value: 1 } : { ...ROLES.ARASHI, type: '役', value: d1 }; }
        else if (d1 === 4 && d2 === 5 && d3 === 6) { result = { ...ROLES.SHIGORO, type: '役', value: 6 }; }
        else if (d1 === 1 && d2 === 2 && d3 === 3) { result = { ...ROLES.HIFUMI, type: '役', value: 3 }; }
        else if (d1 === d2 && d2 !== d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d3 }; }
        else if (d1 !== d2 && d2 === d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d1 }; }
        else { result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; }
        console.log(`Initial Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`);
        if (!isNpc && avoid123_456Active) { const avoidCard = playerCards.find(c => c.id === 'avoid123_456'); const avoidLevel = avoidCard?.level || 1; const isHifumi = result.name === ROLES.HIFUMI.name; const isShigoro = result.name === ROLES.SHIGORO.name; const isMenashi = result.type === '目なし'; let needsReroll = false; let reason = ""; if (isHifumi || isShigoro) { needsReroll = true; reason = `${result.name} 回避`; } else if (avoidLevel >= 3 && isMenashi) { needsReroll = true; reason = "目なし 回避 (Lv3)"; } if (needsReroll) { console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (${reason})`); let rerollDice; let rerollResult; let attempts = 0; const maxAttempts = 10; do { rerollDice = rollDice(isNpc, 0, 0); rerollResult = getHandResult(rerollDice, isNpc, 0, 0); attempts++; } while ( attempts < maxAttempts && (rerollResult.name === ROLES.HIFUMI.name || rerollResult.name === ROLES.SHIGORO.name || (avoidLevel >= 3 && rerollResult.type === '目なし') || rerollResult.type === 'ションベン') ); if (attempts >= maxAttempts) { console.warn("役回避: 再ロール上限到達。最終結果を採用。"); } console.log(` -> 再ロール結果: ${rerollDice.join(',')} (${getHandDisplayName(rerollResult)})`); result = rerollResult; } }
        if (isNpc && blindingDiceLevel > 0) { let specialRoleAvoided = false; const specialRolesToAvoid = [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name, ROLES.HIFUMI.name]; if (result.type === '役' && specialRolesToAvoid.includes(result.name)) { const avoidChance = [0.2, 0.4, 0.6][blindingDiceLevel - 1]; if (Math.random() < avoidChance) { console.log(`%cCard Effect: 目くらまし Lv.${blindingDiceLevel} 発動! NPCの特殊役「${result.name}」を回避 -> 目なしに変更`, 'color: orange; font-weight: bold;'); result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; specialRoleAvoided = true; } else { console.log(`Card Effect: 目くらまし Lv.${blindingDiceLevel} - NPCの特殊役「${result.name}」回避失敗 (確率 ${avoidChance * 100}%)`); } } if (!specialRoleAvoided && blindingDiceLevel >= 3 && result.type !== 'ションベン' && result.type !== '目なし') { const shonbenUpChance = 0.2; if (Math.random() < shonbenUpChance) { console.log(`%cCard Effect: 目くらまし Lv.3 - ションベン率UP発動! NPCの結果「${getHandDisplayName(result)}」を目なしに変更`, 'color: orange; font-weight: bold;'); result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; } else { console.log(`Card Effect: 目くらまし Lv.3 - ションベン率UP失敗 (確率 ${shonbenUpChance * 100}%)`); } } }
        console.log(`%cFinal Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`, 'font-weight: bold;'); return result;
    }
    function applyPlayerCardEffects() { // (変更なし)
         currentMaxRolls = BASE_MAX_ROLLS; // リセットしてから適用
         playerCards.forEach(cardData => {
             const cardDefinition = allCards.find(c => c.id === cardData.id);
             // applyEffect が存在し、かつパッシブ効果を持つカードのみ適用
             if (cardDefinition && cardDefinition.applyEffect && !cardDefinition.usesPerWave) {
                  console.log(`Applying passive effect for ${cardDefinition.name} Lv.${cardData.level}`);
                 cardDefinition.applyEffect(cardData.level);
             }
         });
         console.log("Applied passive card effects. Current Max Rolls:", currentMaxRolls);
     }
    function removePlayerCardEffect(cardIdToRemove) { // (変更なし)
        const cardToRemove = playerCards.find(card => card.id === cardIdToRemove); if (!cardToRemove) return;
        const cardDefinition = allCards.find(c => c.id === cardToRemove.id);
        // removeEffect が存在し、かつパッシブ効果を持つカードのみリムーブ処理を実行
        if (cardDefinition && cardDefinition.removeEffect && !cardDefinition.usesPerWave) {
            console.log(`Removing passive effect for ${cardDefinition.name} Lv.${cardToRemove.level}`);
            cardDefinition.removeEffect(cardToRemove.level);
        }
        if (cardIdToRemove === 'handExchange') { freeRerollsAvailableThisShopVisit = 0; activeCardUses['handExchangeFreeRerollCount'] = 0; console.log("Hand Exchange card removed, resetting free rerolls."); }
        playerCards = playerCards.filter(card => card.id !== cardIdToRemove);
        applyPlayerCardEffects(); // 他のパッシブ効果を再適用
        console.log(`Removed card: ${cardIdToRemove}`);
    }
    function getCostToUpgradeToNextLevel(cardData, nextLevel) { // (変更なし)
        if (!cardData || nextLevel <= 1 || nextLevel > MAX_CARD_LEVEL) { return 0; }
        const baseCardDef = allCards.find(c => c.id === (cardData.id || cardData));
        if (!baseCardDef) return 0;
        const baseCost = baseCardDef.cost;
        // べき乗で計算 (例: Lv2 = base * 1.5^1, Lv3 = base * 1.5^2)
        const cost = Math.floor(baseCost * Math.pow(UPGRADE_COST_MULTIPLIER, nextLevel - 1));
        return Math.max(10, Math.round(cost / 10) * 10); // 10G単位に丸める（最低10G）
    }
    function calculateSellPrice(cardData) { // (変更なし)
        const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef) return 0;
        let totalPaidCost = cardDef.cost; // 初期コスト
        // 強化にかかったコストを加算
        for (let lv = 2; lv <= cardData.level; lv++) {
            totalPaidCost += getCostToUpgradeToNextLevel(cardDef, lv);
        }
        const sellPrice = Math.floor(totalPaidCost * SELL_PRICE_RATE); // 購入/強化コスト合計の半額
        return Math.max(0, sellPrice); // 最低0G
    }
    function initGame(isRestart = false) {
        console.log("--- initGame START ---");
        if (!selectedCharacter) { selectedCharacter = characters[0]; console.log("No character selected, using first available:", selectedCharacter.name); }
        if (!isRestart) { permanentScoreBoost = 0; playerCoins = 0; playerCards = []; console.log("New game started. Resetting permanentScoreBoost, coins, and player cards."); } else { console.log("Restarting game. Keeping permanentScoreBoost:", permanentScoreBoost); playerCards = []; }
        selectNextNpc(); playerScore = INITIAL_PLAYER_SCORE + permanentScoreBoost; scoreAtWaveStart = playerScore; npcScore = NPC_START_SCORE_BASE; totalScoreChange = 0; console.log("Player cards cleared for new game/restart.");
        playerName = playerNameInput?.value.trim() || selectedCharacter.name; if(playerNameInput) playerNameInput.value = playerName;
        if (selectedCharacter && selectedCharacter.initialCardPool && selectedCharacter.initialCardPool.length > 0) { const randomCardIndex = Math.floor(Math.random() * selectedCharacter.initialCardPool.length); const initialCardId = selectedCharacter.initialCardPool[randomCardIndex]; const initialCardDef = allCards.find(card => card.id === initialCardId); if (initialCardDef) { playerCards.push({ id: initialCardDef.id, level: 1 }); console.log(`Added initial card for ${selectedCharacter.name}: ${initialCardDef.name}`); } }
        currentWave = 1; defeatedCount = 0; currentBet = 0; isPlayerParent = true; playerDice = [0, 0, 0]; npcDice = [0, 0, 0]; playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false; gameHistory = []; baseMinBet = 50; currentMinBet = baseMinBet; consecutiveWins = 0; npcConsecutiveWins = 0; purchasedOrUpgradedInShop = []; currentRoundInWave = 0;
        activeCardUses = {}; ignoreMinBetActive = false; shopChoicePlus1Active = false; zoroChanceUpActive = false; avoid123_456Active = false; activeCardBeingUsed = null; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; keepParentRightUsedThisWave = 0; keepParentDiscountNextRound = false; freeRerollsAvailableThisShopVisit = 0; waitingForUserChoice = false; userChoiceResolver = null; shopConfirmationResolver = null; waitingForPlayerActionAfterRoll = false; drawBonusActive = false; riskyBetActive = false; isShowingRoleResult = false; isShowingGameResult = false;
        applyPlayerCardEffects();
        if (betMainControls) betMainControls.style.display = 'flex'; if (betActionContainer) betActionContainer.style.display = 'flex'; if (actionArea) actionArea.style.display = 'flex'; if (nextWaveArea) nextWaveArea.style.display = 'none';
        rollButton.disabled = true; historyButton.disabled = false; playerDiceEl.textContent = '-'; npcDiceEl.textContent = '-'; diceDisplayEl.textContent = '- - -'; diceDisplayEl.style.display = 'block'; rollCounterEl.textContent = `0/${currentMaxRolls}回`; playerHandEl.className = 'hand-display'; npcHandEl.className = 'hand-display';
        if (playerScoreEl.animationId) cancelAnimationFrame(playerScoreEl.animationId); if (npcScoreEl.animationId) cancelAnimationFrame(npcScoreEl.animationId); playerScoreEl.animationId = null; npcScoreEl.animationId = null; currentBetInfoEl.textContent = '';
        updateUI(); showScreen('game-screen'); startBettingPhase(); console.log("--- initGame END ---");
    }
    function updateUI() {
        if (waveInfoEl) { const maxWaveDisplay = gameMode === 'endless' ? '∞' : MAX_WAVES; const modeText = gameMode === 'normal' ? '通常' : gameMode === 'endless' ? 'エンドレス' : '準備中'; waveInfoEl.innerHTML = ` <span>MODE: <span class="mode-display">${modeText}</span></span> | <span>WAVE: <span id="wave-number" class="wave-highlight">${currentWave}</span>/${maxWaveDisplay}</span> | <span>ROUND: <span id="round-number" class="round-normal">${currentRoundInWave}</span></span> | <span>撃破数: <span id="defeated-count">${defeatedCount}</span></span> <span id="consecutive-wins-display" style="display: none;"></span> `; const consWinsDisplay = document.getElementById('consecutive-wins-display'); if (consWinsDisplay) { consWinsDisplay.classList.remove('npc-losing-streak');
            if (isPlayerParent && consecutiveWins >= 1) { consWinsDisplay.textContent = ` (${consecutiveWins}連勝中!)`; consWinsDisplay.style.display = 'inline'; } // 1勝から表示
            else if (!isPlayerParent && npcConsecutiveWins >= 1) { consWinsDisplay.textContent = ` (相手${npcConsecutiveWins}連勝中...)`; consWinsDisplay.classList.add('npc-losing-streak'); consWinsDisplay.style.display = 'inline'; } // 1勝から表示
            else { consWinsDisplay.textContent = ''; consWinsDisplay.style.display = 'none'; } } }
             // BGM切り替え判定: ゲーム画面が表示されていて、かつロール中でない場合のみ実行
             if (gameScreen.classList.contains('active') && !diceAnimationId && !isShowingRoleResult && !isShowingGameResult && !isGameActive && !waitingForPlayerActionAfterRoll && !activeCardBeingUsed) {
                let situationBgm = 'game_normal'; // デフォルト
                const pinchThreshold = scoreAtWaveStart * 0.3;
                const chanceThreshold = scoreAtWaveStart * 1.5;

                // 親の連勝数と持ち点を考慮
                if (isPlayerParent) { // プレイヤーが親
                    if (playerScore <= pinchThreshold || npcConsecutiveWins >= 3) {
                        situationBgm = 'game_pinch';
                    } else if (playerScore >= chanceThreshold || consecutiveWins >= 3) {
                        situationBgm = 'game_chance';
                    }
                } else { // NPCが親
                    if (playerScore <= pinchThreshold || npcConsecutiveWins >= 3) {
                        situationBgm = 'game_pinch';
                    } // else if (playerScore >= chanceThreshold) { situationBgm = 'game_chance'; } // NPC親のチャンスは控える
                }

                // ★ BGM切り替え実行
                if (currentBgm !== bgms[situationBgm]) {
                    console.log(`Switching BGM in updateUI (Bet Phase): ${situationBgm}`);
                    switchBGM(situationBgm);
                } else if (currentBgm && currentBgm.paused && isAudioContextUnlocked) {
                     playBGM(situationBgm); // 一時停止からの再開
                 }
            }
        const playerInfoH2 = document.querySelector('#player-info h2'); const npcInfoH2 = document.querySelector('#npc-info h2'); const currentPlayerName = playerName || selectedCharacter?.name || 'あなた'; if (playerInfoH2) playerInfoH2.innerHTML = `${currentPlayerName} <span id="player-parent-marker" class="parent-marker" style="display: ${isPlayerParent ? 'inline' : 'none'};">(親)</span>`; if (npcInfoH2) npcInfoH2.innerHTML = `${currentNpcCharacter?.name || 'NPC'} <span id="npc-parent-marker" class="parent-marker" style="display: ${!isPlayerParent ? 'inline' : 'none'};">(親)</span>`; displayCharacterImages();
        playerScoreEl.textContent = playerScore; npcScoreEl.textContent = npcScore; playerDiceEl.textContent = playerDice.every(d => d === 0) ? '-' : playerDice.join(' '); playerHandEl.textContent = getHandDisplayName(playerHand); npcDiceEl.textContent = npcDice.every(d => d === 0) ? '-' : npcDice.join(' '); npcHandEl.textContent = getHandDisplayName(npcHand);
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT; if (keepParentDiscountNextRound) { baseMinBet = Math.max(1, Math.floor(baseMinBet / 2)); } currentMinBet = baseMinBet; const riskyBetCardCheck = playerCards.find(c => c.id === 'riskyBet'); if (riskyBetActive && riskyBetCardCheck?.level === 1) { currentMinBet = baseMinBet * 2; } if (ignoreMinBetActive) { currentMinBet = 1; } minBetDisplayEl.textContent = `最低: ${currentMinBet}`;
        let maxRollsForTurn = isPlayerTurn ? currentMaxRolls : BASE_MAX_ROLLS; let currentRollCountForTurn = isPlayerTurn ? playerRollCount : npcRollCount; let turnText = `0/${maxRollsForTurn}回`; if (isGameActive || currentRoundInWave > 0) { turnText = `${currentRollCountForTurn}/${maxRollsForTurn}回`; } rollCounterEl.textContent = turnText;
        if (gameCoinDisplayEl) { gameCoinDisplayEl.textContent = `${playerCoins} G`; } if (shopScreen.classList.contains('active')) { updateShopUI(); }
        updateBetLimits();
        if (isGameActive && currentBet > 0) { const parentName = isPlayerParent ? currentPlayerName : (currentNpcCharacter?.name || "相手"); currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${parentName})</span>`; }
        else if (!isGameActive && currentRoundInWave > 0 && playerScore >= currentMinBet && npcScore >= currentMinBet) { currentBetInfoEl.textContent = '賭け金設定中...'; } else { currentBetInfoEl.textContent = ''; }
        const isNpcParentTurn = !isPlayerParent && !isGameActive && !waitingForPlayerActionAfterRoll; if (betMainControls) betMainControls.style.opacity = isNpcParentTurn ? '0.5' : '1'; if (betMainControls) betMainControls.style.pointerEvents = isNpcParentTurn ? 'none' : 'auto'; if (betActionContainer) betActionContainer.style.display = isNpcParentTurn ? 'none' : 'flex'; gameScreen.classList.toggle('npc-parent', isNpcParentTurn);
        updateCardButtonHighlight();
        if (scoreCalculationAnimationEl && !scoreCalculationAnimationEl.classList.contains('visible')) {
            scoreCalculationAnimationEl.innerHTML = '';
        }
    }
    function displayCharacterImages() { // (変更なし)
        const playerImageArea = document.querySelector('.character-image-area.player');
        const npcImageArea = document.querySelector('.character-image-area.npc');
        const placeholderText = (name) => `<span style="color:#aaa; font-size:0.9em;">${name} 画像</span>`;
        if (playerImageArea) { if (selectedCharacter && selectedCharacter.image && playerImageArea) { playerImageArea.innerHTML = `<img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" style="display: none;"><div class="win-lose-indicator"></div>`; const img = playerImageArea.querySelector('img'); if (img) { img.onload = () => img.style.display = 'block'; img.onerror = () => playerImageArea.innerHTML = placeholderText(selectedCharacter.name) + '<div class="win-lose-indicator"></div>'; } } else if (playerImageArea) { playerImageArea.innerHTML = placeholderText(selectedCharacter?.name || 'あなた') + '<div class="win-lose-indicator"></div>'; } }
        if (npcImageArea) { if (currentNpcCharacter && currentNpcCharacter.image && npcImageArea) { npcImageArea.innerHTML = `<img src="${currentNpcCharacter.image}" alt="${currentNpcCharacter.name}" style="display: none;"><div class="win-lose-indicator"></div>`; const img = npcImageArea.querySelector('img'); if (img) { img.onload = () => img.style.display = 'block'; img.onerror = () => npcImageArea.innerHTML = placeholderText(currentNpcCharacter.name) + '<div class="win-lose-indicator"></div>'; } } else if (npcImageArea) { npcImageArea.innerHTML = placeholderText(currentNpcCharacter?.name || 'NPC') + '<div class="win-lose-indicator"></div>'; } }
    }
    function updateCardButtonHighlight() { // (変更なし)
        if (!cardActionButton) return;
        let usableCardExists = false;
        const checkFunction = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll : checkCardUsability;
        for (const cardData of playerCards) { if (checkFunction(cardData.id)) { usableCardExists = true; break; } }
        const postRollCardBtn = document.getElementById('post-roll-card-button');
        if (postRollCardBtn) { postRollCardBtn.classList.toggle('highlight-card-button', usableCardExists); }
        cardActionButton.classList.toggle('highlight-card-button', usableCardExists);
    }
    function updateShopHandDisplay() { // (変更なし)
        const totalCards = playerCards.length;
        const maxTotalCards = MAX_ACTIVE_CARDS + MAX_PASSIVE_CARDS;
        if (shopHandCountEl) {
            shopHandCountEl.textContent = `${totalCards}/${maxTotalCards}`;
        } else {
            console.error("Element #hand-count not found!");
        }

        if (handCardsEl) {
            handCardsEl.innerHTML = '';
            playerCards.forEach(cardData => {
                const cardDefinition = allCards.find(c => c.id === cardData.id);
                if (cardDefinition) {
                    const cardItem = document.createElement('li');
                    cardItem.className = 'hand-card-item';
                    const cardNameSpan = document.createElement('span');
                    const isCardActive = !!cardDefinition.usesPerWave;
                    const cardTypeInitial = isCardActive ? 'A' : 'P';
                    cardNameSpan.textContent = `[${cardTypeInitial}] ${cardDefinition.name} [Lv.${cardData.level}]`;
                    cardItem.appendChild(cardNameSpan);

                    // ★ 詳細ボタンを追加
                    const detailButton = document.createElement('button');
                    detailButton.className = 'card-detail-button button-subtle';
                    detailButton.textContent = '詳細';
                    detailButton.dataset.cardId = cardData.id;
                    detailButton.dataset.currentLevel = cardData.level;
                    detailButton.addEventListener('click', handleDetailButtonClick); // イベントリスナー設定 (SE不要箇所)
                    cardItem.appendChild(detailButton);

                    const sellButton = document.createElement('button');
                    const sellPrice = calculateSellPrice(cardData);
                    sellButton.className = 'sell-card-button';
                    sellButton.textContent = `売却 (${sellPrice}G)`;
                    sellButton.dataset.cardId = cardData.id;
                    sellButton.dataset.sellPrice = sellPrice;
                    sellButton.dataset.cardName = cardDefinition.name;
                    sellButton.dataset.cardLevel = cardData.level;
                    sellButton.addEventListener('click', handleSellCard); // handleSellCard 内でSE再生
                    cardItem.appendChild(sellButton);
                    handCardsEl.appendChild(cardItem);
                }
            });
        } else {
             console.error("Element #hand-cards not found!");
        }
    }
    function getUpgradeDescription(cardData, level) {
        let conditionText = "", effectText = "";
        switch (cardData.id) {
            case 'arashiBonus': conditionText = "アラシで勝利した時 (パッシブ)"; effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`; break;
            case 'shigoroBonus': conditionText = "シゴロで勝利した時 (パッシブ)"; effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`; break;
            case 'oneEyeBonus': conditionText = "「1の目」で勝利した時 (パッシブ)"; effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`; break;
            case 'sixEyeBonus': conditionText = "「6の目」で勝利した時 (パッシブ)"; effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`; break;
            case 'hifumiHalf': conditionText = "ヒフミで敗北した時 (パッシブ)"; effectText = `支払いスコア計算時の基本倍率から ${level} 軽減される (最低0倍)。`; break;
            case 'shonbenHalf': conditionText = "ションベンで敗北した時 (パッシブ)"; effectText = `支払いスコア計算時の基本倍率から 0.5 軽減される (最低0倍)。※「見切り」使用時は適用外`; break;
            case 'fightingSpirit': conditionText = "勝利した時 (パッシブ、持ち点条件あり)"; const scoreConditionText = level >= 3 ? "相手と同値以下" : "相手の半分以下"; const spiritBonusRateText = [10, 20, 30][level - 1]; effectText = `自分の持ち点が${scoreConditionText}の場合、連勝ボーナスの増加量がさらに ${spiritBonusRateText}% 増える。`; break;
            case 'rewardAmplifier': conditionText = "自分の役/目が確定した後 (アクティブ)"; const amplifierUses = level >= 3 ? '2' : '1'; const amplifierBonus = level >= 2 ? '2' : '1'; effectText = `WAVE中 ${amplifierUses}回 使用可能。使用したラウンドで「目」以上の役で勝利した場合、獲得スコア計算時の基本倍率に +${amplifierBonus} 加算される。`; break;
            case 'doubleUpBet': conditionText = "自分が子で、役/目が確定した後 (アクティブ)"; const doubleUpBonus = [1.0, 1.5, 2.0][level - 1].toFixed(1); const doubleUpPenaltyText = (level <= 2) ? `失敗した場合、強制的にヒフミで敗北扱いとなる。` : `失敗してもペナルティはない。`; effectText = `WAVE中 1回 使用可能。使用して勝利した場合、獲得スコア計算時の基本倍率に +${doubleUpBonus} 加算される。${doubleUpPenaltyText}`; break;
            case 'betBoost': conditionText = "賭け金の上限を計算する時 (パッシブ)"; const boostMultiplierText = [1.2, 1.4, 1.6][level - 1].toFixed(1); effectText = `最大ベット額の上限が、自分の持ち点の ${boostMultiplierText}倍 に引き上げられる (ただし相手の持ち点を超えることはできない)。`; break;
            case 'lossInsurance': conditionText = "敗北時のスコア計算時 (パッシブ)"; const insuranceMultiplierText = [1.5, 1.3, 1.1][level - 1].toFixed(1); effectText = `敗北時の支払いスコア計算を上書きし、「賭け金の ${insuranceMultiplierText}倍 (相手の連勝数に応じてさらに増加)」を支払うようになる。`; break;
            case 'reroll1': conditionText = "常時 (パッシブ)"; effectText = `サイコロの最大振り直し回数が、基本の${BASE_MAX_ROLLS}回に加えて +${level} され、合計 ${BASE_MAX_ROLLS + level} 回になる。`; break;
            case 'ignoreMinBet': conditionText = "賭け金設定フェーズ (アクティブ)"; effectText = `WAVE中 ${level}回 使用可能。使用したラウンドでは、最低賭け金が強制的に 1点 になる。`; break;
            case 'shopChoicePlus1': conditionText = "ショップ利用時 (パッシブ)"; const rerollCostReductionText = level === 2 ? " さらにリロールコストが10G安くなる。" : level >= 3 ? " さらにリロールが無料になる。" : ""; effectText = `次にショップを開いた時、提示されるカードの選択肢が 1枚 増える。${rerollCostReductionText}`; break;
            case 'drawBonus': conditionText = "自分の役/目が確定した後 (アクティブ)"; const drawBonusUses = level >= 3 ? 3 : (level === 2 ? 2 : 1); const drawBonusGainText = level === 3 ? "100%" : "50%"; effectText = `WAVE中 ${drawBonusUses}回 使用可能。使用したラウンドで引き分けになった場合、ボーナスとして賭け金の ${drawBonusGainText} を獲得する（スコアに加算）。※目なし時は使用不可`; break;
            case 'keepParentalRight': conditionText = "自分が親で敗北したラウンドの終了時 (アクティブ)"; const keepUses = level >= 2 ? '2' : '1'; const keepDiscountText = level >= 3 ? " さらに、次のラウンドの最低賭け金が半額になる。" : ""; effectText = `WAVE中 ${keepUses}回 まで使用可能。使用すると、親で負けても親権を維持できる。${keepDiscountText}`; break;
            case 'handExchange': conditionText = "ショップ利用時 (パッシブ)"; const freeRerollsText = level >= 2 ? "2回" : "1回"; const buyDiscountText = level >= 3 ? " さらに、そのショップでのカード購入・強化コストが10%割引される。" : ""; effectText = `次にショップを開いた時、リロールが ${freeRerollsText} 無料になる。${buyDiscountText}`; break;
            case 'soulRoll': conditionText = "振り残り回数が0になった後 (アクティブ)"; const soulCostPercent = [10, 5, 5][level - 1]; const soulMenashiAvoidText = level >= 3 ? " Lv3効果: この追加ロールで目なしが出ても、回避できるまで振り直す。" : ""; effectText = `WAVE中 1回 使用可能。自分の持ち点の ${soulCostPercent}% (最低1点) を消費して、追加で1回サイコロを振ることができる。${soulMenashiAvoidText}`; break;
            case 'riskyBet': conditionText = "賭け金設定フェーズ (アクティブ)"; const riskyUses = level >= 3 ? '2' : '1'; const riskyMinBetText = level === 1 ? " 最低賭け金も2倍になる。" : ""; effectText = `WAVE中 ${riskyUses}回 使用可能。使用したラウンドの賭け金が強制的に2倍になる。${riskyMinBetText}`; break;
            case 'giveUpEye': conditionText = "自分のロール結果が「目なし」になった後 (アクティブ)"; const giveUpUses = level; const giveUpPaymentText = level >= 2 ? " Lv2以上: 支払いスコア計算時の基本倍率が半分(0.5)になる。" : ""; effectText = `WAVE中 ${giveUpUses}回 使用可能。使用すると、そのラウンドの結果を強制的に「ションベン」扱いに変更する（敗北確定）。${giveUpPaymentText}`; break;
            case 'changeToOne':
                conditionText = "自分のロール結果が「目なし」になった後 (アクティブ)";
                const changeOneUses = level;
                effectText = `WAVE中 ${changeOneUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「1」に変更できる。（目なし専用）`;
                break;
            case 'changeToSix':
                conditionText = "自分のロール結果が「目なし」になった後 (アクティブ)";
                const changeSixUses = level;
                effectText = `WAVE中 ${changeSixUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「6」に変更できる。（目なし専用）`;
                break;
            case 'changeEyeToOne':
                    conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
                    const changeEyeToOneUses = level;
                    effectText = `WAVE中 ${changeEyeToOneUses}回 使用可能。「目」としてカウントされている数字（ペアでない方の数字）の出目を強制的に「1」に変更できる。`;
                    break;
            case 'changeEyeToSix':
                    conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
                    const changeEyeToSixUses = level;
                    effectText = `WAVE中 ${changeEyeToSixUses}回 使用可能。「目」としてカウントされている数字（ペアでない方の数字）の出目を強制的に「6」に変更できる。`;
                    break;
            case 'zoroChanceUp': conditionText = "自分のロール前 (アクティブ)"; const zoroUses = level >= 3 ? '2' : '1'; const zoroChanceText = ['少し上昇', '上昇', '大きく上昇'][level - 1]; effectText = `WAVE中 ${zoroUses}回 使用可能。使用したラウンド中、ゾロ目が出る確率が${zoroChanceText}する。`; break;
            case 'avoid123_456': conditionText = "自分のロール前 (アクティブ)"; const avoidUses = level >= 2 ? '2' : '1'; const avoidMenashiText = level >= 3 ? " さらに「目なし」も回避する。" : ""; effectText = `WAVE中 ${avoidUses}回 使用可能。使用したラウンド中、「ヒフミ」と「シゴロ」が出た場合に自動で振り直して回避する。${avoidMenashiText}`; break;
            case 'blessingDice': conditionText = "自分のロール前 (アクティブ)"; const blessingUses = level >= 3 ? '2' : '1'; const blessingChanceText = ['少し', 'そこそこ', 'かなり'][level - 1]; effectText = `WAVE中 ${blessingUses}回 使用可能。使用したラウンド中、振ったサイコロの各目が${blessingChanceText}の確率で「6」に変わる。`; break;
            case 'adjustEye': conditionText = "自分のロール結果が「目」になった後 (アクティブ)"; const adjustUses = level >= 2 ? '2' : '1'; const adjustAmountText = level >= 3 ? '±2' : '±1'; effectText = `WAVE中 ${adjustUses}回 使用可能。「目」の数字 *以外* のサイコロを1つ選び、出目を ${adjustAmountText} できる（1未満や6超過は不可）。`; break;
            case 'stormWarning': conditionText = "自分のロール前 (アクティブ)"; const stormRerollCount = level >= 2 ? '2' : '1'; const stormTargetRoleText = level >= 3 ? 'アラシまたはピンゾロ' : 'アラシ'; const stormBonusChanceText = [10, 15, 20][level - 1]; effectText = `WAVE中 1回 使用可能。使用後の最初のロールで${stormTargetRoleText} *以外* が出た場合、最大 ${stormRerollCount}回 まで振り直し回数を消費せずに振り直せる。無料振り直し中はゾロ目確率が ${stormBonusChanceText}% 上昇し、低確率で結果がアラシになる。`; break;
            case 'nextChance': conditionText = "自分のロール結果が「目」になった後 (アクティブ)"; const nextChanceUses = level >= 3 ? '2' : '1'; const nextChanceDiceCount = level >= 2 ? '1つまたは2つ' : '1つ'; effectText = `WAVE中 ${nextChanceUses}回 使用可能。「目」の数字 *と同じ* サイコロを${nextChanceDiceCount}選んで振り直すことができる。`; break;
            case 'blindingDice': conditionText = "自分が親で、役/目が確定した後 (アクティブ)"; const blindingAvoidChanceText = ['少し', 'そこそこ', '大きく'][level - 1]; const blindingShonbenText = level >= 3 ? " さらに相手がションベンする確率も少し上げる。" : ""; effectText = `WAVE中 1回 使用可能。使用したラウンド中、相手が良い役（ピンゾロ/アラシ/シゴロ/ヒフミ）を出した場合に、それを無効化（目なし扱い）する確率が${blindingAvoidChanceText}上がる。${blindingShonbenText}`; break;
            default: conditionText = "---"; effectText = '---'; break;
        }
        const conditionHtml = conditionText ? `<b>【発動条件/タイミング】</b><br>${conditionText}<br>` : '';
        return `${conditionHtml}<b>【効果】</b><br>${effectText}`;
    }
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } } // (変更なし)
    function openCardDetailModal(cardId, currentLevel = 1) { // (変更なし)
        const cardData = playerCards.find(c => c.id === cardId); // 手札にあるか確認
        const cardDef = allCards.find(c => c.id === cardId);
        if (!cardDef || !cardDetailModal) {
            console.error(`Card definition or detail modal not found for ID: ${cardId}`);
            return;
        }

        // レベルは手札にあるなら手札のレベル、なければ渡されたレベル（ショップなど）
        const displayLevel = currentLevel;
        const rarityClass = `rarity-${['normal', 'rare', 'epic', 'legendary'][cardDef.rarity - 1] || 'normal'}`;
        const cardDetailContent = cardDetailModal.querySelector('.card-detail-content');
        if(cardDetailContent) cardDetailContent.className = `modal-content card-detail-content ${rarityClass}`;

        if (cardDef.image && cardDetailImage && cardDetailPlaceholder) {
            cardDetailImage.src = cardDef.image;
            cardDetailImage.alt = cardDef.name;
            cardDetailImage.style.display = 'block';
            cardDetailPlaceholder.style.display = 'none';
            cardDetailImage.onerror = () => {
                cardDetailImage.style.display = 'none';
                cardDetailPlaceholder.textContent = '画像読込失敗';
                cardDetailPlaceholder.style.display = 'block';
            };
        } else if(cardDetailImage && cardDetailPlaceholder) {
            cardDetailImage.style.display = 'none';
            cardDetailPlaceholder.textContent = '画像なし';
            cardDetailPlaceholder.style.display = 'block';
        }

        if(cardDetailName) cardDetailName.textContent = cardDef.name;
        const rarityText = ['N', 'R', 'EP', 'LG'][cardDef.rarity - 1] || 'N';
        if(cardDetailRarity) {
            cardDetailRarity.textContent = rarityText;
            cardDetailRarity.className = `rarity-badge ${rarityClass}`;
        }
        if(cardDetailType) {
            const typeName = getCardTypeName(cardDef.type);
            const typeClass = `type-${cardDef.type}`;
            cardDetailType.textContent = typeName;
            cardDetailType.className = `type-badge ${typeClass}`;
        }
        if(cardDetailLevel) cardDetailLevel.textContent = `Lv. ${displayLevel}`;

        // 効果説明（現在のレベルに合わせて）
        if(cardDetailDescription) cardDetailDescription.innerHTML = getUpgradeDescription(cardDef, displayLevel);

        // フレーバーテキスト
        if(cardDetailFlavor) cardDetailFlavor.textContent = cardDef.flavor || '---';

        // 使用回数 (アクティブカードかつ手札にある場合のみ表示)
        if (cardDef.usesPerWave && cardDetailUsesContainer && cardDetailUses) {
            let remaining = Infinity;
            let total = Infinity;
            // 手札にある場合は現在の使用状況を表示、ない場合（ショップ購入前など）は最大回数を表示
            if (cardData) {
                 total = getTotalUses(cardId); // 現在の手札レベルでの最大回数
                 remaining = total === Infinity ? Infinity : total - (activeCardUses[cardId] || 0);
            } else {
                 // 手札にない場合（=ショップで購入/強化前の詳細表示）
                 // 表示レベル(displayLevel = currentLevel)での最大回数を表示
                 total = getTotalUses({id: cardId, level: displayLevel}); // 仮のcardDataで最大回数を取得
                 remaining = total; // 未使用状態として表示
            }

            cardDetailUses.textContent = total === Infinity ? '無限' : `${remaining} / ${total} 回`;
            cardDetailUsesContainer.style.display = 'block';
        } else if (cardDetailUsesContainer) {
            cardDetailUsesContainer.style.display = 'none';
        }

        cardDetailModal.style.display = 'flex';
    }
    function closeCardDetailModal() {
        if(cardDetailModal) cardDetailModal.style.display = 'none';
    }
    function handleDetailButtonClick(event) {
        playSound('detailButton');
        const button = event.target.closest('.card-detail-button');
        if (!button) return;
        const cardId = button.dataset.cardId;
        if (!cardId) return; // カードIDがない場合は何もしない
        let currentLevel = parseInt(button.dataset.currentLevel || '1');

        const shopCardElement = button.closest('.shop-offers-container .card');
        const handCardElement = button.closest('#active-card-display .card-action-item, #passive-card-display .card-action-item, #hand-cards .hand-card-item'); // ★ 修正: ショップ手札表示も考慮

        let targetLevel = currentLevel; // デフォルトは現在のレベル

        if (shopCardElement) {
            const offerData = currentShopOffers.find(offer => offer.id === cardId);
            // 強化可能かどうかの判定とtargetLevelの設定
            if (offerData) {
                if (offerData.isOwned && offerData.currentLevel < MAX_CARD_LEVEL) {
                    targetLevel = offerData.currentLevel + 1; // 強化後のレベルを表示
                    console.log(`Shop upgrade target (${cardId}): Showing details for next Lv.${targetLevel}`);
                } else {
                    targetLevel = offerData.isOwned ? offerData.currentLevel : 1; // 購入対象 or 最大レベル or 手札にない
                    console.log(`Shop non-upgrade target (${cardId}): Showing details for current Lv.${targetLevel}`);
                }
            } else {
                console.warn(`Offer data not found for cardId: ${cardId} in shop context.`);
                // offerDataが見つからない場合も現在のレベルを使う（フォールバック）
            }
        } else if (handCardElement) {
            // 手札のカードの場合は常に現在のレベルを表示
            const handCardData = playerCards.find(c => c.id === cardId);
            if (handCardData) {
                targetLevel = handCardData.level;
                console.log(`Hand card target (${cardId}): Showing details for current Lv.${targetLevel}`);
            } else {
                // 手札からも見つからない場合 (念のため)
                console.warn(`Hand card data not found for cardId: ${cardId}.`);
            }
        }

        // targetLevel が NaN や不正な値でないか確認
        if (isNaN(targetLevel) || targetLevel < 1) {
             console.warn(`Invalid targetLevel calculated: ${targetLevel}. Defaulting to 1.`);
             targetLevel = 1;
        }
        openCardDetailModal(cardId, targetLevel);
    }
    // === ショップを開く処理 ===
    function openShop() {
        playSound('shopButton');
        console.log("Opening shop...");

        const shopDisplayScore = INITIAL_PLAYER_SCORE + permanentScoreBoost;
        console.log(`Shop opened. Displaying initial score: ${shopDisplayScore}, Current Coins: ${playerCoins}`);

        if(nextWaveArea) nextWaveArea.style.display = 'none';
        purchasedOrUpgradedInShop = [];
        setShopMessage(DEFAULT_SHOP_MESSAGE);
        const exchangeCard = playerCards.find(card => card.id === 'handExchange');
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 2 ? 2 : 1) : 0;
        activeCardUses['handExchangeFreeRerollCount'] = 0;

        console.log(`Hand Exchange Card Lv.${exchangeCard?.level}, Free rerolls for this visit: ${freeRerollsAvailableThisShopVisit}`);

        applyPlayerCardEffects();
        displayShopOffers();

        const existingConfirmation = document.getElementById('shop-confirmation-buttons');
        if (existingConfirmation) existingConfirmation.remove();
        if(shopActionsEl) shopActionsEl.style.display = 'flex';

        showScreen('shop-screen');

        requestAnimationFrame(() => {
            if (shopCoinDisplayEl) shopCoinDisplayEl.textContent = playerCoins;
            const shopPlayerScoreValueEl = document.getElementById('shop-player-score-value');
            if (shopPlayerScoreValueEl) {
                shopPlayerScoreValueEl.textContent = shopDisplayScore;
            }
            updateShopUI(); // ボタン状態の更新などを含むUI更新関数を呼び出す
            console.log("Shop UI updated after requestAnimationFrame.");
        });
    }
    // === ショップを閉じる処理 ===
    function closeShop() {
        playSound('shopButton');
        console.log("Closing shop, proceeding to next wave.");
        activeCardUses = {}; // WAVE開始時にアクティブカード使用回数をリセット
        console.log("Active card uses reset for new wave.");

        playerScore = INITIAL_PLAYER_SCORE + permanentScoreBoost;
        console.log(`Player score reset to initial + boost: ${playerScore}`);
        scoreAtWaveStart = playerScore;
        currentWave++;
        const npcScoreWaveIncrement = 500; // WAVEごとの基本増加量
        const npcScoreBase = NPC_START_SCORE_BASE; // ★★★ npcScoreBase をここで定義 ★★★

        let endlessBonusTier = 0; // 10WAVEごとの段階 (0から開始)
        let endlessBonusScore = 0; // 段階に応じた追加スコア
        if (gameMode === 'endless' && currentWave > 10) { // WAVE 11 から段階を計算
             endlessBonusTier = Math.floor((currentWave - 1) / 10); // 例: 11-20はTier 1, 21-30はTier 2
             endlessBonusScore = endlessBonusTier * 500; // 段階 * 500点を追加
             console.log(`Endless bonus score for Wave ${currentWave} (Tier ${endlessBonusTier}): +${endlessBonusScore}`);
        }
        // WAVE進行による基本増加 + エンドレスボーナス
        npcScore = npcScoreBase + (currentWave - 1) * npcScoreWaveIncrement + endlessBonusScore; // ★ 定義された npcScoreBase を使用
        console.log(`NPC score set for Wave ${currentWave}: ${npcScore}`);


        selectNextNpc();
        isPlayerParent = true; // 次はプレイヤー親
        playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
        consecutiveWins = 0; npcConsecutiveWins = 0; // 連勝数リセット
        currentRoundInWave = 0;

        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        rollButton.disabled = true;
        historyButton.disabled = false;

        keepParentRightUsedThisWave = 0;
        keepParentDiscountNextRound = false;
        waitingForPlayerActionAfterRoll = false;

        applyPlayerCardEffects();
        updateUI(); // UI更新してリセット後のスコアを表示
        showScreen('game-screen');
        startBettingPhase(); // startBettingPhase内で最低賭け金計算
    }
    function selectNextNpc() {
       if (gameMode === 'endless' && currentWave > 1 && (currentWave - 1) % 10 === 0) { console.log(`Endless mode: Resetting used NPC list before selecting NPC for wave ${currentWave}`); usedNpcCharacters = []; }
       const availableNpcs = characters.filter(c => c.id !== selectedCharacter.id && !usedNpcCharacters.includes(c.id) );
       if (availableNpcs.length > 0) { const randomIndex = Math.floor(Math.random() * availableNpcs.length); currentNpcCharacter = availableNpcs[randomIndex]; usedNpcCharacters.push(currentNpcCharacter.id); }
       else { console.log("All NPCs used or only player left, resetting NPC history for next cycle."); usedNpcCharacters = []; const resettledAvailableNpcs = characters.filter(c => c.id !== selectedCharacter.id); if (resettledAvailableNpcs.length > 0) { const randomIndex = Math.floor(Math.random() * resettledAvailableNpcs.length); currentNpcCharacter = resettledAvailableNpcs[randomIndex]; usedNpcCharacters.push(currentNpcCharacter.id); } else { currentNpcCharacter = selectedCharacter; console.warn("Critical issue: No available NPC found even after reset! Defaulting to player character."); } }
       console.log(`Selected NPC for Wave ${currentWave}: ${currentNpcCharacter?.name}`);
       currentNpcCardId = null; if (currentNpcCharacter && currentNpcCharacter.initialCardPool && currentNpcCharacter.initialCardPool.length > 0) { const randomCardIndex = Math.floor(Math.random() * currentNpcCharacter.initialCardPool.length); const npcCardId = currentNpcCharacter.initialCardPool[randomCardIndex]; const cardDef = allCards.find(card => card.id === npcCardId); if (cardDef) { currentNpcCardId = cardDef.id; console.log(`NPC (${currentNpcCharacter.name}) is set to have initial card: ${cardDef.name} (ID: ${currentNpcCardId})`); } else { console.warn(`NPC initial card definition not found for ID: ${npcCardId}`); } } else { console.log(`NPC (${currentNpcCharacter?.name}) has no initial card pool defined.`); }
    }
    function displayShopOffers() {
        currentShopOffers = [];
        const activeCardOffersEl = document.getElementById('active-card-offers');
        const passiveCardOffersEl = document.getElementById('passive-card-offers');
        const packOffersEl = document.getElementById('pack-offers');
        const boostOffersEl = document.getElementById('boost-offers');
        if (!shopOffersContainerEl || !activeCardOffersEl || !passiveCardOffersEl || !packOffersEl || !boostOffersEl) {
            console.error("Shop offer container elements not found!");
            return;
        }
        activeCardOffersEl.innerHTML = ''; passiveCardOffersEl.innerHTML = ''; packOffersEl.innerHTML = ''; boostOffersEl.innerHTML = '';
        const activeCardPool = allCards.filter(card => !!card.usesPerWave);
        const passiveCardPool = allCards.filter(card => !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag));
        const availableActive = activeCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL));
        const availablePassive = passiveCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL));
        let numActiveOffers = 3, numPassiveOffers = 3;
        const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (choiceCard) {
            console.log("Shop Choice+1 Active!");
            const canAddActive = availableActive.length > numActiveOffers;
            const canAddPassive = availablePassive.length > numPassiveOffers;
            if (canAddActive && canAddPassive) { if (Math.random() < 0.5) { numActiveOffers++; } else { numPassiveOffers++; } }
            else if (canAddActive) { numActiveOffers++; }
            else if (canAddPassive) { numPassiveOffers++; }
        }
        const shuffledActive = availableActive.sort(() => 0.5 - Math.random());
        const shuffledPassive = availablePassive.sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numActiveOffers, shuffledActive.length); i++) { const cardData = shuffledActive[i]; const ownedCard = playerCards.find(c => c.id === cardData.id); const isOwned = !!ownedCard; const currentLevel = ownedCard ? ownedCard.level : 0; const nextLevel = currentLevel + 1; const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL; let displayCost = 0; if (isOwned && !isMaxLevel) { displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel); } else if (!isOwned) { displayCost = cardData.cost; } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { displayCost = Math.floor(displayCost * 0.9); } currentShopOffers.push({ ...cardData, itemType: 'card', cardActualType: 'active', isOwned: isOwned, currentLevel: currentLevel, displayCost: displayCost }); }
        for (let i = 0; i < Math.min(numPassiveOffers, shuffledPassive.length); i++) { const cardData = shuffledPassive[i]; const ownedCard = playerCards.find(c => c.id === cardData.id); const isOwned = !!ownedCard; const currentLevel = ownedCard ? ownedCard.level : 0; const nextLevel = currentLevel + 1; const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL; let displayCost = 0; if (isOwned && !isMaxLevel) { displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel); } else if (!isOwned) { displayCost = cardData.cost; } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { displayCost = Math.floor(displayCost * 0.9); } currentShopOffers.push({ ...cardData, itemType: 'card', cardActualType: 'passive', isOwned: isOwned, currentLevel: currentLevel, displayCost: displayCost }); }
        if (packDefinitions.length > 0) { const shuffledPacks = [...packDefinitions].sort(() => 0.5 - Math.random()); const numPackOffers = Math.min(2, shuffledPacks.length); for (let i = 0; i < numPackOffers; i++) { const packDef = shuffledPacks[i]; let packCost = packDef.baseCost; if (packDef.costCalculation === 'average' && packDef.cardPool.length > 0) { let totalCost = 0; let validCardCount = 0; packDef.cardPool.forEach(cardId => { const card = allCards.find(c => c.id === cardId); if (card) { totalCost += card.cost; validCardCount++; } }); if (validCardCount > 0) { packCost = Math.floor(totalCost / validCardCount); packCost = Math.max(10, Math.round(packCost / 10) * 10); } else { packCost = packDef.baseCost; } } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { packCost = Math.floor(packCost * 0.9); } if (!purchasedOrUpgradedInShop.includes(packDef.id)) { currentShopOffers.push({ ...packDef, itemType: 'pack', displayCost: packCost }); } } }
        boostItems.forEach(boostItem => { let boostCost = boostItem.cost; const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { boostCost = Math.floor(boostCost * 0.9); } if (!purchasedOrUpgradedInShop.includes(boostItem.id)) { currentShopOffers.push({ ...boostItem, itemType: 'boost', displayCost: boostCost }); } });

        currentShopOffers.forEach(offer => {
            const itemElement = document.createElement('div'); let targetContainer = null; let elementClasses = []; let buyButtonHtml = ''; let costDisplay = ''; let itemNameHtml = offer.name || '不明なアイテム'; let rarityBadgeHtml = ''; let typeBadgeHtml = ''; let levelSpan = ''; let datasetIdAttr = 'itemId';
            let detailButtonHtml = '';
            if (offer.itemType === 'card') { detailButtonHtml = `<button class="card-detail-button button-subtle" data-card-id="${offer.id}" data-current-level="${offer.currentLevel || 1}">詳細</button>`; }

            if (offer.itemType === 'card') {
                datasetIdAttr = 'cardId'; const rarityClass = ['normal', 'rare', 'epic', 'legendary'][offer.rarity - 1] || 'normal'; elementClasses = ['card', `type-${offer.type}`, `rarity-${rarityClass}`]; typeBadgeHtml = `<span class="card-type-badge">${getCardTypeName(offer.type)}</span>`; const rarityText = ['N', 'R', 'EP', 'LG'][offer.rarity - 1] || 'N'; rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`; if (offer.isOwned) { elementClasses.push('upgradeable'); if (offer.currentLevel >= MAX_CARD_LEVEL) { elementClasses.push('max-level'); costDisplay = `<span class="card-cost">最大Lv</span>`; levelSpan = `<span class="card-level">(Lv.${offer.currentLevel})</span>`; buyButtonHtml = ''; } else { costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; const nextLevel = offer.currentLevel + 1; const levelColorClass = `card-level-value-${nextLevel}`; levelSpan = `<span class="card-level">(Lv.${offer.currentLevel} → <span class="${levelColorClass}">Lv.${nextLevel}</span>)</span>`; buyButtonHtml = `<button class="buy-button upgrade-button button-pop" data-card-id="${offer.id}" data-action="upgrade" data-cost="${offer.displayCost}">強化</button>`; if (nextLevel === 3) { elementClasses.push('upgradeable-lv3'); } } } else { costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buyButtonHtml = `<button class="buy-button button-pop" data-card-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; } itemNameHtml = `${offer.name}${levelSpan}`; targetContainer = offer.cardActualType === 'active' ? activeCardOffersEl : passiveCardOffersEl;
            }
            else if (offer.itemType === 'pack') { elementClasses = ['pack', 'shop-item']; costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buyButtonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; targetContainer = packOffersEl; }
            else if (offer.itemType === 'boost') { elementClasses = ['boost-item', 'shop-item']; costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buyButtonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; targetContainer = boostOffersEl; }

            itemElement.className = elementClasses.join(' '); itemElement.dataset[datasetIdAttr] = offer.id; if (offer.image) { itemElement.style.backgroundImage = `url('${offer.image}')`; }
            const itemInnerHtml = `${typeBadgeHtml}${rarityBadgeHtml}<h3 class="card-name">${itemNameHtml}</h3>`; itemElement.innerHTML = itemInnerHtml;
            const footer = document.createElement('div'); footer.className = 'card-footer';
            if (offer.itemType === 'card') {
                 footer.innerHTML = `
                    ${costDisplay}
                    ${detailButtonHtml}
                    ${buyButtonHtml}`;
             } else { // パックとブースト
                 footer.innerHTML = `
                     ${costDisplay}
                     ${buyButtonHtml}`;
             }
            itemElement.appendChild(footer);

            if (purchasedOrUpgradedInShop.includes(offer.id)) { itemElement.classList.add('sold-out'); }
            if (targetContainer) { targetContainer.appendChild(itemElement); }
        });
        [activeCardOffersEl, passiveCardOffersEl, packOffersEl, boostOffersEl].forEach(container => { if (container && container.children.length === 0) { container.innerHTML = `<span class="shop-empty-message">(オファーなし)</span>`; } });

        document.querySelectorAll('.shop-offers-container .card-detail-button').forEach(button => { button.removeEventListener('click', handleDetailButtonClick); button.addEventListener('click', handleDetailButtonClick); }); // SE不要箇所
    }
    function updateShopUI() {
        if (!shopScreen.classList.contains('active')) return;

        if (shopCoinDisplayEl) shopCoinDisplayEl.textContent = playerCoins;

        updateShopHandDisplay(); // 手札表示は更新する
        const shopItemElements = document.querySelectorAll('#shop-scrollable-offers .card, #shop-scrollable-offers .pack, #shop-scrollable-offers .boost-item');

        shopItemElements.forEach(itemElement => {
            const itemId = itemElement.dataset.cardId || itemElement.dataset.itemId;
            if (!itemId) {
                console.warn("Shop item element missing ID", itemElement);
                return;
            }
            const footer = itemElement.querySelector('.card-footer');
            const costDisplayEl = itemElement.querySelector('.card-cost');
            const button = itemElement.querySelector('.buy-button, .upgrade-button');

            // SOLD OUT 状態の処理
            if (purchasedOrUpgradedInShop.includes(itemId)) {
                itemElement.classList.add('sold-out');
                if (footer) footer.style.display = 'none';
                return; // sold-outなら以降の処理は不要
            } else {
                itemElement.classList.remove('sold-out');
                if (footer) footer.style.display = 'flex'; // 表示に戻す
            }

            const offerData = currentShopOffers.find(offer => offer.id === itemId);
            if (!offerData) {
                console.warn(`Offer data not found for item ${itemId} in updateShopUI`);
                itemElement.style.display = 'none'; // オファーデータがない場合は非表示
                return;
            } else {
                 itemElement.style.display = ''; // データがあれば表示
            }

            let cost = offerData.displayCost; // 表示コスト (割引適用済みの場合あり)
            let canAfford = playerCoins >= cost; // ★ コインが足りるか判定
            let buttonText = '購入';
            let isCard = offerData.itemType === 'card';
            let isOwnedCard = isCard && offerData.isOwned;
            let isMaxLevelCard = isOwnedCard && offerData.currentLevel >= MAX_CARD_LEVEL;

            // ボタンとコスト表示の更新
            if (button) {
                if (isMaxLevelCard) {
                    button.style.display = 'none'; // 最大レベルならボタン非表示
                    if(costDisplayEl) costDisplayEl.textContent = '最大Lv';
                } else {
                    button.style.display = 'inline-block'; // ボタン表示
                    button.disabled = !canAfford; // ★ コインが足りなければ無効化
                    button.dataset.cost = cost; // コスト情報をdata属性に設定

                    // ボタンテキストとクラス設定
                    if (isOwnedCard) {
                        buttonText = '強化';
                        button.classList.add('upgrade-button');
                        button.classList.remove('buy-button');
                    } else {
                        buttonText = '購入';
                        button.classList.add('buy-button');
                        button.classList.remove('upgrade-button');
                    }
                    button.textContent = buttonText;
                    if(costDisplayEl) costDisplayEl.textContent = `${cost} G`;
                }
            } else if (!isMaxLevelCard && costDisplayEl) {
                // ボタンがない場合でもコスト表示は更新 (例: パックやブーストアイテムでボタン要素がない場合)
                if(costDisplayEl) costDisplayEl.textContent = `${cost} G`;
            } else if (isMaxLevelCard && costDisplayEl) {
                 if(costDisplayEl) costDisplayEl.textContent = '最大Lv';
            }


            // 詳細ボタンのレベル情報を更新
            const detailButton = itemElement.querySelector('.card-detail-button');
            if (detailButton && offerData.itemType === 'card') {
                detailButton.dataset.currentLevel = offerData.currentLevel || 1;
            }
        });

        // --- リロールボタンの更新ロジック ---
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

        console.log(`updateShopUI - Reroll Check: playerCoins=${playerCoins}, currentRerollCost=${currentRerollCost}, freeAvailable=${currentFreeRerollsAvailable}, freeUsed=${usedFreeRerollsThisVisit}`);

        if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) {
            rerollButtonText = `無料リロール (${currentFreeRerollsAvailable - usedFreeRerollsThisVisit}回)`;
            currentRerollCost = 0; // 無料なのでコスト0
            rerollDisabled = false; // 無料なら有効
            console.log(" -> Free reroll available. Button enabled.");
        } else {
            rerollButtonText = `リロール (${currentRerollCost} G)`;
            rerollDisabled = playerCoins < currentRerollCost; // コインが足りなければ無効
            console.log(` -> Paid reroll. Disabled: ${rerollDisabled} (Coins: ${playerCoins}, Cost: ${currentRerollCost})`);
        }

        if (shopRerollCostEl) shopRerollCostEl.textContent = currentRerollCost;
        if (shopRerollButton) {
            shopRerollButton.innerHTML = `<span class="reroll-icon">↻</span> ${rerollButtonText}`;
            shopRerollButton.disabled = rerollDisabled; // 計算結果を反映
        }
    }
    async function handleBuyCard(event) {
        const button = event.target.closest('.buy-button, .upgrade-button'); if (!button) { console.warn("Buy/Upgrade button not found in clicked element or parents."); return; }
        const itemId = button.dataset.cardId || button.dataset.itemId; const action = button.classList.contains('upgrade-button') ? 'upgrade' : 'buy'; const cost = parseInt(button.dataset.cost || '0'); const offerData = currentShopOffers.find(offer => offer.id === itemId); if (!offerData) { console.error("Offer data not found for", itemId); return; }
        const actualCost = cost; if (playerCoins < actualCost) { playSound('error'); setShopMessage("コインが足りません！"); return; }
        console.log(`Processing ${action} for item: ${itemId}, type: ${offerData.itemType}, cost: ${actualCost}`);

        if (action === 'upgrade') {
            playSound('levelUpButton');
        } else {
            playSound('buyButton');
        }

        const startCoins = playerCoins;
        let purchaseSuccess = false;

        if (offerData.itemType === 'card') {
            if (action === 'upgrade') {
                const currentCardData = playerCards.find(c => c.id === itemId); if (!currentCardData || currentCardData.level >= MAX_CARD_LEVEL) { setShopMessage("これ以上強化できません。"); resolve(false); return; } const nextLevel = currentCardData.level + 1;
                playerCoins -= actualCost;
                currentCardData.level = nextLevel; purchasedOrUpgradedInShop.push(itemId); console.log(`Upgraded card: ${offerData.name} to Lv.${nextLevel} for ${actualCost}G`); setShopMessage(`${offerData.name} を Lv.${nextLevel} に強化しました！`); applyPlayerCardEffects(); updateShopUI();
                await showItemRevealModal({ item: offerData, level: nextLevel, source: 'upgrade' });
                purchaseSuccess = true;
            }
            else {
                purchaseSuccess = await purchaseCard(offerData, actualCost);
            }
        } else if (offerData.itemType === 'pack') {
            if (action === 'buy') { purchaseSuccess = await purchasePack(offerData, actualCost); }
            else { console.warn("Upgrade action requested for a pack item."); }
        } else if (offerData.itemType === 'boost') {
            if (action === 'buy') { purchaseSuccess = await purchaseBoost(offerData, actualCost); }
            else { console.warn("Upgrade action requested for a boost item."); }
        }
        else { console.error("Unknown item type:", offerData.itemType); }

        if (purchaseSuccess && actualCost > 0) {
            playSound('shopBuy'); // ★ SE: 購入/強化成功音
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            playCoinAnimation(actualCost);
        } else if (purchaseSuccess && actualCost === 0){
            // 無料獲得の場合など (例: パックから)
            playSound('shopBuy'); // ★ SE: (無料獲得でも音を鳴らす場合)
        }
    }
    async function purchaseCard(cardDefinition, purchaseCost) { // (変更なし)
        return new Promise(async (resolve) => {
            const cardDef = allCards.find(c => c.id === cardDefinition.id); if (!cardDef) { console.error("Card definition not found for", cardDefinition.id); resolve(false); return; }
            const isBuyingActive = !!cardDef.usesPerWave; const cardType = isBuyingActive ? 'active' : 'passive'; let currentCount = 0; playerCards.forEach(handCardData => { const handCardDef = allCards.find(c => c.id === handCardData.id); if (handCardDef) { const handCardIsActive = !!handCardDef.usesPerWave; if ((isBuyingActive && handCardIsActive) || (!isBuyingActive && !handCardIsActive)) { currentCount++; } } }); const limit = isBuyingActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS; const typeNameJp = isBuyingActive ? 'アクティブ' : 'パッシブ';
            if (currentCount >= limit) { setShopMessage(`${typeNameJp}カードの手札がいっぱいです！売却する${typeNameJp}カードを選んでください。`); cardToDiscardFor = { ...cardDefinition, cost: purchaseCost, itemType: 'card' }; cardTypeToDiscard = cardType; openDiscardModal(); resolve(false); return; }

            const startCoins = playerCoins;
            playerCoins -= purchaseCost;
            playerCards.push({ id: cardDefinition.id, level: 1 }); purchasedOrUpgradedInShop.push(cardDefinition.id); console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${purchaseCost}G`); setShopMessage(`${cardDefinition.name} を購入しました！`); applyPlayerCardEffects(); updateShopUI();

            await showItemRevealModal({ item: cardDefinition, level: 1, source: 'buy' });

            if (purchaseCost > 0) {
                animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                playCoinAnimation(purchaseCost);
            }
            resolve(true);
        });
    }
    async function purchasePack(packDefinition, purchaseCost) { // (変更なし)
        return new Promise(async (resolve) => {
           const startCoins = playerCoins;
           playerCoins -= purchaseCost;
           purchasedOrUpgradedInShop.push(packDefinition.id); console.log(`Bought pack: ${packDefinition.name} for ${purchaseCost}G`); setShopMessage(`${packDefinition.name} を購入！ カードを開封中...`); updateShopUI();

           if (purchaseCost > 0) {
               animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
               animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
               playCoinAnimation(purchaseCost);
           }

           const possibleCards = packDefinition.cardPool || []; if (possibleCards.length === 0) { await showItemRevealModal({ item: packDefinition, source: 'pack_empty' }); resolve(true); return; }
           const randomIndex = Math.floor(Math.random() * possibleCards.length); const drawnCardId = possibleCards[randomIndex]; const drawnCardDef = allCards.find(c => c.id === drawnCardId);
           if (drawnCardDef) {
               await new Promise(res => setTimeout(res, 800)); // 演出待機

               const existingCard = playerCards.find(c => c.id === drawnCardId); let newItemLevel = 1; let revealSource = 'pack_new'; let addedOrUpgraded = false;
               if (existingCard) { // 既に持っているカードの場合
                   if (existingCard.level < MAX_CARD_LEVEL) { // レベルアップ可能
                       existingCard.level++; newItemLevel = existingCard.level; revealSource = 'pack_upgrade';
                       setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現！Lv.${existingCard.level}にアップグレード！`);
                       console.log(` -> Upgraded ${drawnCardDef.name} to Lv.${existingCard.level} from pack.`);
                       applyPlayerCardEffects(); updateShopHandDisplay(); addedOrUpgraded = true;
                   } else { // 既に最大レベル
                       revealSource = 'pack_max_level';
                       setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現しましたが、既に最大レベルです。`);
                       console.log(` -> Drew ${drawnCardDef.name} from pack, but already max level.`);
                   }
                   await showItemRevealModal({ item: drawnCardDef, level: newItemLevel, source: revealSource, packName: packDefinition.name });
                   resolve(true);
               } else { // 新規カードの場合
                   const isDrawnCardActive = !!drawnCardDef.usesPerWave; const drawnCardType = isDrawnCardActive ? 'active' : 'passive'; let currentCount = 0; playerCards.forEach(handCardData => { const handCardDef = allCards.find(c => c.id === handCardData.id); if (handCardDef) { const handCardIsActive = !!handCardDef.usesPerWave; if ((isDrawnCardActive && handCardIsActive) || (!isDrawnCardActive && !handCardIsActive)) { currentCount++; } } }); const limit = isDrawnCardActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS; const typeNameJp = isDrawnCardActive ? 'アクティブ' : 'パッシブ';

                   await showItemRevealModal({ item: drawnCardDef, level: 1, source: 'pack_new', packName: packDefinition.name }); // 先に演出

                   if (currentCount >= limit) { // 手札上限チェック
                       cardToDiscardFor = { ...drawnCardDef, cost: 0, itemType: 'card' }; // パックからの獲得コストは0
                       cardTypeToDiscard = drawnCardType;
                       setShopMessage(`${drawnCardDef.name} を獲得！しかし${typeNameJp}カードの手札がいっぱいです！売却するカードを選んでください（新しいカードを選ぶと保持します）。`);
                       openDiscardModal(); // 破棄モーダルを開く
                       resolve(true); // 購入自体は成功扱い
                       return;
                   } else { // 手札に空きあり
                       playerCards.push({ id: drawnCardDef.id, level: 1 });
                       setShopMessage(`${drawnCardDef.name} を獲得しました！`);
                       console.log(` -> Added ${drawnCardDef.name} (Lv.1) from pack to hand.`);
                       applyPlayerCardEffects(); updateShopHandDisplay(); addedOrUpgraded = true;
                       resolve(true);
                   }
               }
           } else { // カード定義が見つからないエラー
               await showItemRevealModal({ item: packDefinition, source: 'pack_error' });
               console.error(`Card definition not found for ID: ${drawnCardId} from pack ${packDefinition.name}`);
               resolve(true); // 購入自体は成功扱い
           }
       });
    }
    async function purchaseBoost(boostDefinition, purchaseCost) { // (変更なし)
        return new Promise(async (resolve) => {
            if (purchasedOrUpgradedInShop.includes(boostDefinition.id)) { console.warn(`Boost item ${boostDefinition.id} already purchased.`); setShopMessage("この強化は既に購入済みです。"); resolve(false); return; }

            const startCoins = playerCoins;
            const scoreBeforeBoost = playerScore;

            playerCoins -= purchaseCost;
            permanentScoreBoost += boostDefinition.boostAmount;
            playerScore += boostDefinition.boostAmount;
            scoreAtWaveStart += boostDefinition.boostAmount; // WAVE開始時のスコアにも反映
            purchasedOrUpgradedInShop.push(boostDefinition.id); // ★ 購入済みリストに追加

            console.log(`Bought boost: ${boostDefinition.name} for ${purchaseCost}G. Permanent boost is now ${permanentScoreBoost}. Player score updated to ${playerScore}.`);
            setShopMessage(`${boostDefinition.name} を購入しました！開始時の持ち点が ${boostDefinition.boostAmount}点 増加します。`);
            updateShopUI(); // sold-out表示などを更新

            await showItemRevealModal({ item: boostDefinition, source: 'boost' }); // 演出表示

            animateScore(playerScoreEl, scoreBeforeBoost, playerScore, SCORE_ANIMATION_DURATION);
            const shopPlayerScoreValueEl = document.getElementById('shop-player-score-value');
            if (shopPlayerScoreValueEl) { animateScore(shopPlayerScoreValueEl, scoreBeforeBoost, playerScore, SCORE_ANIMATION_DURATION); }
            if (purchaseCost > 0) {
                animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                playCoinAnimation(purchaseCost);
            }
            resolve(true);
        });
    }
    async function handleReroll() { // (変更なし - SEはボタンクリックで再生される)
        let actualRerollCost = REROLL_COST; const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1'); if (shopChoiceCard) { if (shopChoiceCard.level === 2) actualRerollCost = Math.max(0, REROLL_COST - 10); else if (shopChoiceCard.level >= 3) actualRerollCost = 0; }
        const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange'); const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0; const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

        const startCoins = playerCoins;
        let costPaid = 0;
        let isFree = false; // ★ 無料かどうかのフラグ

        if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) {
             activeCardUses['handExchangeFreeRerollCount'] = usedFreeRerollsThisVisit + 1;
             setShopMessage(`無料リロールを使用しました！ (本日残り ${currentFreeRerollsAvailable - activeCardUses['handExchangeFreeRerollCount']} 回)`);
             console.log(`Used free reroll. Total free used this visit: ${activeCardUses['handExchangeFreeRerollCount']}`);
             playSound('shopReroll'); // 無料でも音を鳴らす
             isFree = true;
        } else {
             if (playerCoins < actualRerollCost) { playSound('error'); setShopMessage("リロールするためのコインが足りません！"); return; }
             playerCoins -= actualRerollCost;
             costPaid = actualRerollCost;
             setShopMessage(DEFAULT_SHOP_MESSAGE); // リロール後はデフォルトメッセージに
             console.log(`Paid ${actualRerollCost}G for reroll.`);
             playSound('shopReroll');
        }

        if (costPaid > 0) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            playCoinAnimation(costPaid);
            await new Promise(resolve => setTimeout(resolve, COIN_ANIMATION_DURATION)); // アニメーション待ち
        } else if (isFree) {
            // 無料の場合も少し待つ（演出感）
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log("Rerolled shop offers (Cards only)."); displayShopOffers(); updateShopUI();
    }
    function openDiscardModal() { // (変更なし)
        if (!cardTypeToDiscard || !cardToDiscardFor) {
            console.error("Cannot open discard modal: Card type or card data to add is not specified.");
            return;
        }
        const typeNameJp = cardTypeToDiscard === 'active' ? 'アクティブ' : 'パッシブ';
        const modalTitle = discardModal.querySelector('h3');
        const modalText = discardModal.querySelector('p');
        if(modalTitle) modalTitle.textContent = `${typeNameJp}カードの手札がいっぱいです！`;
        if(modalText) modalText.textContent = `新しく「${cardToDiscardFor.name}」を獲得しましたが、${typeNameJp}の手札が上限です。保持したい場合は下記リストから売却するカードを選んでください。`;

        discardOptionsEl.innerHTML = '';
        let foundDiscardable = false;

        const newCardButton = document.createElement('button');
        newCardButton.className = 'discard-choice-button new-card-option';
        newCardButton.textContent = `${cardToDiscardFor.name} [Lv.1] (保持するには下から売却)`;
        newCardButton.disabled = true;
        newCardButton.style.cursor = 'default';
        newCardButton.style.opacity = 0.7;
        discardOptionsEl.appendChild(newCardButton);

        playerCards.forEach(cardData => {
            const cardDefinition = allCards.find(c => c.id === cardData.id);
            if (cardDefinition) {
                const cardIsActive = !!cardDefinition.usesPerWave;
                const currentCardType = cardIsActive ? 'active' : 'passive';
                if (currentCardType === cardTypeToDiscard) {
                    foundDiscardable = true;
                    const sellPrice = calculateSellPrice(cardData);
                    const button = document.createElement('button');
                    button.className = 'discard-choice-button';
                    button.textContent = `${cardDefinition.name} [Lv.${cardData.level}] (売却: ${sellPrice}G)`;
                    button.dataset.cardId = cardData.id;
                    button.dataset.sellPrice = sellPrice;
                    button.addEventListener('click', handleDiscardChoice); // handleDiscardChoice内でSE
                    discardOptionsEl.appendChild(button);
                }
            }
        });

        if (!foundDiscardable) {
             discardOptionsEl.innerHTML = `<p>売却可能な${typeNameJp}カードが手札にありません。</p>`;
             if(newCardButton) newCardButton.style.display = 'none';
        }

        discardModal.style.display = 'flex';
    }
    function handleDiscardChoice(event) { // (変更なし)
        playSound('click'); // ★ SE追加
        const selectedButton = event.target;
        const selectedDiscardCardId = selectedButton.dataset.cardId;
        const sellPrice = parseInt(selectedButton.dataset.sellPrice || '0');
        const itemToAdd = cardToDiscardFor; // 購入しようとしていたカード情報
        if (!itemToAdd || !selectedDiscardCardId) {
            console.error("Discard choice error: Missing data.");
            cancelDiscard();
            return;
        }

        if (selectedDiscardCardId === itemToAdd.id) {
             console.warn("Discard choice: Cannot select the new card to discard.");
             return; // 同じカードは選べない
        }

        const cardToRemove = playerCards.find(c => c.id === selectedDiscardCardId);
        if (!cardToRemove) {
            console.error(`Card to discard (${selectedDiscardCardId}) not found in hand.`);
            cancelDiscard();
            return;
        }
        const cardToRemoveName = allCards.find(c => c.id === cardToRemove.id)?.name || selectedDiscardCardId;
        const startCoins = playerCoins;
        let coinChange = 0;

        // 1. 選択されたカードを売却
        removePlayerCardEffect(selectedDiscardCardId);
        playerCoins += sellPrice;
        coinChange += sellPrice;
        console.log(`Sold existing card ${cardToRemoveName} (ID: ${selectedDiscardCardId}) for ${sellPrice}G.`);
        playSound('shopSell'); // 売却音

        // 2. 新しいカードを手札に追加 & 購入処理を行う
        if (itemToAdd.itemType === 'card') {
            // 購入コストを取得 (cardToDiscardFor に保持されているはず)
            const purchaseCost = itemToAdd.cost || 0;

            // コイン消費 (パックからの場合はcostが0)
            if (playerCoins >= purchaseCost) {
                if (purchaseCost > 0) {
                    playerCoins -= purchaseCost;
                    coinChange -= purchaseCost; // 正味のコイン変動を計算
                    playSound('shopBuy'); // 購入音 (有料の場合のみ)
                }

                // 手札に追加
                playerCards.push({ id: itemToAdd.id, level: 1 });

                // 購入済みリストに追加 (SOLD OUT表示のため - パック産は関係ないが念のため)
                purchasedOrUpgradedInShop.push(itemToAdd.id);

                setShopMessage(`「${cardToRemoveName}」を売却し、「${itemToAdd.name}」を手札に加えました！ ${purchaseCost > 0 ? `(${purchaseCost}G消費)` : '(無料)'}`);
                console.log(`Added ${itemToAdd.name} (Lv.1) to hand after discarding ${cardToRemoveName}. Cost: ${purchaseCost}G`);
                applyPlayerCardEffects(); // パッシブ効果再適用
                updateShopHandDisplay(); // 手札表示更新
            } else {
                // 万が一コストが払えなくなった場合（売却額が低かった等）
                console.error("Error: Insufficient coins after selling card to afford the new card.");
                setShopMessage(`エラー：「${cardToRemoveName}」を売却しましたが、コインが足りず「${itemToAdd.name}」を購入できませんでした。`);
                // 売却だけは完了しているので、コインは増えたまま
            }

        } else {
            console.error("Error adding non-card item after discard.");
             // 売却だけは完了
             setShopMessage(`エラー：「${cardToRemoveName}」を売却しましたが、アイテム追加に失敗しました。`);
        }

        // 3. コイン表示更新アニメーション
        if (coinChange !== 0) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            if (coinChange > 0) { playCoinAnimation(coinChange); } // プラスの場合のみアニメーション
        }

        // 4. 後処理
        cardToDiscardFor = null;
        cardTypeToDiscard = null;
        discardModal.style.display = 'none';
        updateShopUI(); // ショップ表示更新 (SOLD OUT反映のため)
    }
    function cancelDiscard() { // (変更なし)
        playSound('click'); // ★ SE追加
        cardToDiscardFor = null;
        cardTypeToDiscard = null;
        discardModal.style.display = 'none';
        setShopMessage(DEFAULT_SHOP_MESSAGE);
    }
    function setShopMessage(msg) { if (shopMessageEl) shopMessageEl.textContent = msg; } // (変更なし)
    async function handleSellCard(event) { // (変更なし)
        playSound('click'); // ★ SE追加
        const button = event.target; const cardId = button.dataset.cardId; const sellPrice = parseInt(button.dataset.sellPrice || '0'); const cardName = button.dataset.cardName || cardId; const cardLevel = button.dataset.cardLevel || '?';
        setShopMessage(`${cardName} [Lv.${cardLevel}] を ${sellPrice}G で売却しますか？`); if (shopActionsEl) shopActionsEl.style.display = 'none';
        let confirmationContainer = document.getElementById('shop-confirmation-buttons'); if (confirmationContainer) { confirmationContainer.remove(); } confirmationContainer = document.createElement('div'); confirmationContainer.id = 'shop-confirmation-buttons'; confirmationContainer.className = 'shop-actions'; if (shopActionsEl && shopActionsEl.parentNode) { shopActionsEl.parentNode.insertBefore(confirmationContainer, shopActionsEl.nextSibling); } else { const shopContent = document.querySelector('.shop-content'); if(shopContent) shopContent.appendChild(confirmationContainer); console.warn("#shop-actions not found, appending confirmation buttons to .shop-content"); }
        const confirmButton = document.createElement('button'); confirmButton.textContent = '売却'; confirmButton.className = 'button-pop'; confirmButton.style.backgroundColor = '#d9534f'; confirmButton.onclick = () => { playSound('click'); handleShopConfirmation(true); }; confirmationContainer.appendChild(confirmButton); // ★ SE追加
        const cancelButton = document.createElement('button'); cancelButton.textContent = 'キャンセル'; cancelButton.className = 'button-subtle'; cancelButton.onclick = () => { playSound('click'); handleShopConfirmation(false); }; confirmationContainer.appendChild(cancelButton); // ★ SE追加
        const confirmSell = await waitForShopConfirmation();

        if (confirmSell) {
            playSound('shopSell');
            const startCoins = playerCoins;
            removePlayerCardEffect(cardId);
            playerCoins += sellPrice;

            setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`);
            console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
            updateShopUI();

            if (sellPrice > 0) {
                animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                playCoinAnimation(sellPrice);
            }
        } else { setShopMessage(DEFAULT_SHOP_MESSAGE); } // キャンセル時もメッセージ戻す
    }
    function updateBetLimits() {
        let playerMaxPotential = playerScore; const betBoostCard = playerCards.find(card => card.id === 'betBoost'); if (betBoostCard) { const boostMultiplier = [1.2, 1.4, 1.6][betBoostCard.level - 1]; playerMaxPotential = Math.floor(playerScore * boostMultiplier); }
        const effectiveNpcScore = Math.max(1, npcScore); const maxBet = isPlayerParent ? Math.max(currentMinBet, Math.min(playerMaxPotential, effectiveNpcScore)) : Math.max(currentMinBet, Math.min(npcScore, playerScore));
        betInput.max = maxBet; betInput.min = currentMinBet;
        let cv = parseInt(betInput.value); if (isNaN(cv)) { cv = currentMinBet; betInput.value = cv; }
        const canPlayerControlBet = isPlayerParent && !isGameActive; betInput.disabled = !canPlayerControlBet || playerScore < currentMinBet || waitingForPlayerActionAfterRoll;
        if (!betInput.disabled) { if (cv > maxBet) { betInput.value = maxBet; cv = maxBet; } else if (cv < currentMinBet) { betInput.value = currentMinBet; cv = currentMinBet; } }
        else { if (!isPlayerParent && !isGameActive && currentBet > 0) { betInput.value = currentBet; } else { betInput.value = currentMinBet; } }
        betAdjustButtons.forEach(b => { const a = parseInt(b.dataset.amount); const v = parseInt(betInput.value) || currentMinBet; b.disabled = betInput.disabled || (a > 0 && (v >= maxBet || v + a > maxBet)) || (a < 0 && (v <= currentMinBet || v + a < currentMinBet)); });
        setBetButton.disabled = betInput.disabled; maxBetButton.disabled = betInput.disabled; minBetButton.disabled = betInput.disabled;
    }
    function startBettingPhase() {
        console.log("--- startBettingPhase START ---");
        currentRoundInWave++; isGameActive = false; playerDice = [0, 0, 0]; npcDice = [0, 0, 0]; playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; rollButton.disabled = true; historyButton.disabled = false; currentBet = 0;
        activeCardBeingUsed = null; ignoreMinBetActive = false; zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false; rewardAmplifierActive = false; giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null; riskyBetActive = false; waitingForPlayerActionAfterRoll = false; drawBonusActive = false; isShowingRoleResult = false; isShowingGameResult = false;
        if (betMainControls) betMainControls.style.display = 'flex'; if (betActionContainer) betActionContainer.style.display = 'flex'; if (actionArea) actionArea.style.display = 'flex'; if (nextWaveArea) nextWaveArea.style.display = 'none';

        const baseMinBetInitial = 50; // 最低賭け金の初期値
        const minBetWaveIncrement = 50; // WAVEごとの基本増加量

        let endlessBonusTier = 0;
        let endlessBonusMinBet = 0; // 段階に応じた追加最低賭け金
        if (gameMode === 'endless' && currentWave > 10) { // WAVE 11 から段階を計算
            endlessBonusTier = Math.floor((currentWave - 1) / 10); // 例: 11-20はTier 1
            endlessBonusMinBet = endlessBonusTier * 50; // 段階 * 50G を追加
            console.log(`Endless bonus min bet for Wave ${currentWave} (Tier ${endlessBonusTier}): +${endlessBonusMinBet}`);
        }
        // 基本最低賭け金 (初期値 + WAVE進行による増加 + エンドレスボーナス)
        let calculatedBaseMinBet = baseMinBetInitial + (currentWave - 1) * minBetWaveIncrement + endlessBonusMinBet;

        // 親権維持割引の適用
        if (keepParentDiscountNextRound) {
            currentMinBet = Math.max(1, Math.floor(calculatedBaseMinBet / 2)); // 割引後の値を currentMinBet に
            keepParentDiscountNextRound = false;
            console.log(`KeepParentDiscount applied. Min bet: ${currentMinBet}`);
        } else {
            currentMinBet = calculatedBaseMinBet; // 割引なしの場合は計算結果をそのまま currentMinBet に
        }

        // エンドレスモードでの所持金による最低賭け金制限 (最終調整)
        if (gameMode === 'endless') {
            currentMinBet = Math.min(currentMinBet, playerScore, npcScore); // 自分と相手のスコアを超えない
            currentMinBet = Math.max(1, currentMinBet); // 最低1点は保証
            console.log(`Endless mode min bet adjusted by scores: ${currentMinBet}`);
        }

        betInput.value = currentMinBet; // 最終的な最低賭け金を入力欄に設定
        updateUI(); // UI更新（最低賭け金表示など）
        if (playerScore < currentMinBet) { setMessage(`あなたの持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、ゲームオーバーです。`); currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; historyButton.disabled = true; setTimeout(() => showResultScreen(false, playerScore, currentWave, "最低賭け金不足"), 1000); return; }
        if (npcScore < currentMinBet) { defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "相手の最低賭け金不足"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
        currentBetInfoEl.textContent = '賭け金設定中...'; const playerName = selectedCharacter?.name || 'あなた'; const npcName = currentNpcCharacter?.name || '相手';
        if (isPlayerParent) { setMessage(`${playerName}(親)が賭け金を設定 (最低 ${currentMinBet}点)。`); updateBetLimits(); updateCardButtonHighlight(); }
        else {
            betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true;
            setMessage(`${npcName}(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);
                if (npcScore < npcBet || npcBet < currentMinBet) { console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet}) - Forcing WAVE clear.`); defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `エラー: ${npcName}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`エラー: ${npcName}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "エラー：相手が賭け金を払えません"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
                if (playerScore < npcBet) { console.error(`Error: Player cannot afford NPC bet ${npcBet} (Player Score: ${playerScore}) - Game Over.`); setMessage(`あなたの持ち点(${playerScore}点)が${npcName}(親)の賭け金(${npcBet}点)未満のため、ゲームオーバーです。`); currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; historyButton.disabled = true; setTimeout(() => showResultScreen(false, playerScore, currentWave, `相手の賭け金(${npcBet}点)不足`), 1000); return; }
                currentBet = npcBet; betInput.value = currentBet; console.log(`NPC (${npcName}, Parent) decided bet: ${currentBet} in Wave ${currentWave}`); currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${npcName})</span>`; setMessage(`${npcName}(親)が ${currentBet} 点で勝負！ ${npcName}がサイコロを振ります...`); isGameActive = true; isPlayerTurn = false; updateUI(); setTimeout(npcTurn, NPC_BET_DELAY / 2);
            }, NPC_BET_DELAY);
        }
        if (currentBgm !== bgms['game_normal']) {
            console.log("Resetting BGM to game_normal at startBettingPhase.");
            switchBGM('game_normal');
        }

        console.log("--- startBettingPhase END ---");
    }
    function determineNpcBet(wave) { 
        let baseRateMin = 0.1, baseRateMax = 0.2, aggressiveChance = 0.3, aggressiveRateMin = 0.3, aggressiveRateMax = 0.5, cautiousChance = 0.4, cautiousRateMin = 0.05, cautiousRateMax = 0.15, maxBetChance = 0.05;
        if (wave >= 8) { baseRateMin = 0.2; baseRateMax = 0.35; aggressiveChance = 0.5; aggressiveRateMin = 0.4; aggressiveRateMax = 0.6; cautiousChance = 0.2; cautiousRateMin = 0.1; cautiousRateMax = 0.2; maxBetChance = 0.15; }
        else if (wave >= 5) { baseRateMin = 0.15; baseRateMax = 0.25; aggressiveChance = 0.4; aggressiveRateMin = 0.35; aggressiveRateMax = 0.55; cautiousChance = 0.3; cautiousRateMin = 0.08; cautiousRateMax = 0.18; maxBetChance = 0.1; }
        const effectivePlayerScore = Math.max(1, playerScore); const npcMinPossibleBet = currentMinBet; const maxBetPossible = Math.min(npcScore, effectivePlayerScore);
        if (npcScore < npcMinPossibleBet) return npcScore; if (maxBetPossible < npcMinPossibleBet) return npcMinPossibleBet;
        let bet = 0; if (Math.random() < maxBetChance) { bet = maxBetPossible; console.log("NPC AI: Decided Max Bet by chance."); }
        else { const randomRate = baseRateMin + Math.random() * (baseRateMax - baseRateMin); bet = Math.floor(npcScore * randomRate); if (playerScore < npcScore * 0.4 && Math.random() < aggressiveChance) { const aggressiveRate = aggressiveRateMin + Math.random() * (aggressiveRateMax - aggressiveRateMin); bet = Math.floor(npcScore * aggressiveRate); console.log("NPC AI: Aggressive move!"); } else if (npcScore < playerScore * 0.4 && Math.random() < cautiousChance) { const cautiousRate = cautiousRateMin + Math.random() * (cautiousRateMax - cautiousRateMin); bet = Math.floor(npcScore * cautiousRate); console.log("NPC AI: Cautious move."); } }
        bet = Math.max(npcMinPossibleBet, bet); bet = Math.min(bet, maxBetPossible); return Math.max(1, bet);
    }

    // --- Three.js関連関数 --- (変更なし)
    function showDiceRollModal() { if (!diceRollModal || !diceRollModalDisplay) return; diceRollModal.style.display = 'flex'; gameScreen.classList.add('dimmed'); diceDisplayEl.style.display = 'none'; if (!isThreeJSInitialized) { setupThreeJS(); isThreeJSInitialized = true; } while (diceRollModalDisplay.firstChild) { diceRollModalDisplay.removeChild(diceRollModalDisplay.firstChild); } if (renderer) { diceRollModalDisplay.appendChild(renderer.domElement); } else { setupThreeJS(); if (renderer) diceRollModalDisplay.appendChild(renderer.domElement); } resizeThreeJS(); }
    function hideDiceRollModal() { if (!diceRollModal) return; if (diceRollModal.style.display === 'none') return; stopDiceAnimation(); diceRollModal.style.display = 'none'; gameScreen.classList.remove('dimmed'); diceDisplayEl.style.display = 'block'; }
    function setupThreeJS() { scene = new THREE.Scene(); const containerWidth = diceRollModalDisplay.clientWidth || 300; const safeContainerWidth = containerWidth > 0 ? containerWidth : 300; const containerHeight = safeContainerWidth / (16/9); camera = new THREE.PerspectiveCamera(60, safeContainerWidth / containerHeight, 0.1, 1000); camera.position.set(0, DICE_SIZE * 1.5, DICE_SIZE * 4); camera.lookAt(0, 0, 0); renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); renderer.setSize(safeContainerWidth, containerHeight); renderer.setPixelRatio(window.devicePixelRatio); const ambientLight = new THREE.AmbientLight(0xffffff, 0.7); scene.add(ambientLight); const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8); directionalLight.position.set(5, 10, 7.5); scene.add(directionalLight); diceMeshes = []; for (let i = 0; i < 3; i++) { const dice = createDiceMesh(); dice.position.x = (i - 1) * DICE_SPACING; diceMeshes.push(dice); scene.add(dice); } console.log("Three.js scene initialized."); }
    function resizeThreeJS() { if (!renderer || !camera || !diceRollModalDisplay) return; const containerWidth = diceRollModalDisplay.clientWidth; if (containerWidth <= 0) return; const containerHeight = containerWidth / (16 / 9); if (containerHeight > 0) { renderer.setSize(containerWidth, containerHeight); camera.aspect = containerWidth / containerHeight; camera.updateProjectionMatrix(); } }
    window.addEventListener('resize', resizeThreeJS);
     function drawDiceFace(value) { const canvas = document.createElement('canvas'); canvas.width = DICE_CANVAS_SIZE; canvas.height = DICE_CANVAS_SIZE; const ctx = canvas.getContext('2d'); ctx.fillStyle = DICE_FACE_COLOR; ctx.fillRect(0, 0, DICE_CANVAS_SIZE, DICE_CANVAS_SIZE); ctx.fillStyle = DICE_DOT_COLOR; const c = DICE_CANVAS_SIZE / 2; const q = DICE_CANVAS_SIZE / 4; const r = DICE_DOT_RADIUS; const drawDot = (x, y) => { ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }; if (value === 1) { drawDot(c, c); } else if (value === 2) { drawDot(q, q); drawDot(3 * q, 3 * q); } else if (value === 3) { drawDot(q, q); drawDot(c, c); drawDot(3 * q, 3 * q); } else if (value === 4) { drawDot(q, q); drawDot(3 * q, q); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); } else if (value === 5) { drawDot(q, q); drawDot(3 * q, q); drawDot(c, c); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); } else if (value === 6) { drawDot(q, q); drawDot(3 * q, q); drawDot(q, c); drawDot(3 * q, c); drawDot(q, 3 * q); drawDot(3 * q, 3 * q); } return canvas; }
     function createDiceMesh(initialValue = 1) { const geometry = new THREE.BoxGeometry(DICE_SIZE, DICE_SIZE, DICE_SIZE); const textures = [new THREE.CanvasTexture(drawDiceFace(2)), new THREE.CanvasTexture(drawDiceFace(5)), new THREE.CanvasTexture(drawDiceFace(1)), new THREE.CanvasTexture(drawDiceFace(6)), new THREE.CanvasTexture(drawDiceFace(4)), new THREE.CanvasTexture(drawDiceFace(3))]; const materials = textures.map(texture => new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3, metalness: 0.1, })); const mesh = new THREE.Mesh(geometry, materials); mesh.userData = { value: initialValue, isRolling: true, targetQuaternion: new THREE.Quaternion().copy(mesh.quaternion), settleStartTime: 0, settleDuration: 800 + Math.random() * 400, rotationSpeed: new THREE.Vector3((Math.random() - 0.5) * ROTATION_SPEED * 0.5, (Math.random() - 0.5) * ROTATION_SPEED * 0.5 + ROTATION_SPEED * 0.5, (Math.random() - 0.5) * ROTATION_SPEED * 0.5), }; return mesh; }
    function startDiceAnimation() { if (diceAnimationId) cancelAnimationFrame(diceAnimationId); const clock = new THREE.Clock(); function animateLoop() { diceAnimationId = requestAnimationFrame(animateLoop); if (!scene || !camera || !renderer || !diceMeshes || diceMeshes.length === 0) return; const delta = clock.getDelta(); const elapsedTime = performance.now(); diceMeshes.forEach((dice) => { if(!dice || !dice.userData) return; if (dice.userData.isRolling) { dice.rotation.x += dice.userData.rotationSpeed.x * delta * 1.5; dice.rotation.y += dice.userData.rotationSpeed.y * delta * 1.5; dice.rotation.z += dice.userData.rotationSpeed.z * delta * 1.5; } else { const t = Math.min(1, (elapsedTime - dice.userData.settleStartTime) / dice.userData.settleDuration); const easedT = 1 - Math.pow(1 - t, 3); dice.quaternion.slerp(dice.userData.targetQuaternion, easedT * 0.2); } }); renderer.render(scene, camera); } animateLoop(); }
    function stopDiceAnimation() { if (diceAnimationId) { cancelAnimationFrame(diceAnimationId); diceAnimationId = null; } }
    function getTargetQuaternionForValue(resultValue) { const targetQuaternion = new THREE.Quaternion(); switch (resultValue) { case 4: targetQuaternion.set(0, 0, 0, 1); break; case 3: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI); break; case 1: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2); break; case 6: targetQuaternion.setFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2); break; case 2: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2); break; case 5: targetQuaternion.setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2); break; default: targetQuaternion.set(0, 0, 0, 1); break; } return targetQuaternion; }
    function animateDiceRoll(finalDice, onComplete) {
        if (!isThreeJSInitialized || !diceMeshes || diceMeshes.length !== 3 || !renderer) {
            console.error("Three.js dice not ready for animation.");
            diceRollModalDisplay.innerHTML = `<div style="font-size: 5em; color: white; text-align: center;">${finalDice.join(' ')}</div>`;
            // 個別の停止音は鳴らせないので、完了時にまとめて鳴らすなど代替案を考える
            playSound('diceStop'); // ★ SE: 完了時に代表音
            setTimeout(onComplete, 1000);
            return;
        }
        const settleDelayBase = 1000;
        const settleDelayOffset = 400;
        diceMeshes.forEach((dice, i) => {
            if (!dice || !dice.userData) return;
            dice.userData.isRolling = true;
            dice.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2);
            dice.userData.rotationSpeed.set((Math.random() - 0.5) * ROTATION_SPEED, (Math.random() - 0.5) * ROTATION_SPEED + ROTATION_SPEED * 1.2, (Math.random() - 0.5) * ROTATION_SPEED);
            dice.userData.targetQuaternion.copy(dice.quaternion);
        });
        startDiceAnimation();
        finalDice.forEach((value, index) => {
            const dice = diceMeshes[index];
            const settleDelay = settleDelayBase + index * settleDelayOffset;
            setTimeout(() => {
                if (dice && dice.userData) {
                    playSound('diceStop'); // ★ SE: 各ダイス停止時に再生
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

    // --- 役/目 結果表示モーダル --- (変更なし)
    async function showRoleResultModal(hand, dice) { // ★ async 確認
        return new Promise(async (resolve) => { // ★ async 確認
            if (!roleResultModal || !roleResultModalBody || !roleResultNameEl || !roleResultDiceDisplayEl || isShowingRoleResult || isShowingGameResult) { console.warn("Role result modal not ready or another result modal is showing."); resolve(); return; }
            isShowingRoleResult = true; roleResultModalBody.className = 'role-result-modal-body';
            let resultText = ''; let cssClassSuffix = ''; let duration = ROLE_RESULT_MODAL_DURATION_BASE;
            if (!hand) { resultText = 'エラー'; cssClassSuffix = 'error'; }
            else {
                resultText = getHandDisplayName(hand);
                if (hand.type === '役') {
                    switch (hand.name) {
                        case ROLES.PINZORO.name:
                            cssClassSuffix = 'pinzoro'; duration = 2500;
                            playSound('yakuPinzoro'); // ★ SE: ピンゾロ
                            break;
                        case ROLES.ARASHI.name:
                            cssClassSuffix = 'arashi'; duration = 2200;
                            playSound('yakuArashi'); // ★ SE: アラシ
                            break;
                        case ROLES.SHIGORO.name:
                            cssClassSuffix = 'shigoro'; duration = 2000;
                            playSound('yakuShigoro'); // ★ SE: シゴロ
                            break;
                        case ROLES.HIFUMI.name:
                            cssClassSuffix = 'hifumi'; duration = 1800;
                            playSound('yakuHifumi'); // ★ SE: ヒフミ
                            break;
                        default: cssClassSuffix = 'unknown-yaku'; break;
                    }
                }
                else if (hand.type === '目') {
                    cssClassSuffix = 'normal-eye'; duration = 1500;
                    playSound('yakuEye'); // ★ SE: 目
                } else if (hand.type === 'ションベン') {
                    cssClassSuffix = 'shonben'; duration = 1600;
                    playSound('yakuShonben'); // ★ SE: ションベン
                } else if (hand.type === '目なし') {
                    resultText = '目なし'; cssClassSuffix = 'shonben'; duration = 1600;
                    playSound('yakuShonben'); // ★ SE: 目なし確定 (ションベン流用)
                } else { cssClassSuffix = 'unknown'; }
            }
            roleResultNameEl.textContent = resultText; roleResultDiceDisplayEl.textContent = dice ? dice.join(' ') : '- - -'; roleResultDiceDisplayEl.style.display = (cssClassSuffix === 'shonben') ? 'none' : 'block';
            roleResultModalBody.classList.add(`role-reveal-${cssClassSuffix}`); roleResultModalBody.classList.add('reveal-start'); roleResultModal.style.display = 'flex';
            if (roleResultModalTimeout) clearTimeout(roleResultModalTimeout);
            roleResultModalTimeout = setTimeout(() => { roleResultModalBody.classList.remove('reveal-start'); roleResultModalBody.classList.add('reveal-end'); setTimeout(() => { roleResultModal.style.display = 'none'; roleResultModalBody.classList.remove('reveal-end'); roleResultModalBody.className = 'role-result-modal-body'; isShowingRoleResult = false; resolve(); }, 300); }, duration);
        });
    }
    async function showGameResultModal(isClear, reason = "") { // (変更なし)
        return new Promise(async (resolve) => { // ★ async 確認
            if (!roleResultModal || !roleResultModalBody || !roleResultNameEl || isShowingRoleResult || isShowingGameResult) { console.warn("Game result modal not ready or another result modal is showing."); resolve(); return; }
            isShowingGameResult = true; roleResultModalBody.className = 'role-result-modal-body';
            let resultText = isClear ? "WAVE CLEAR!" : "GAME OVER"; let cssClassSuffix = isClear ? "wave-clear" : "game-over"; let duration = GAME_RESULT_MODAL_DURATION;

            if (isClear) playSound('waveClear'); // ★ SE: WAVEクリア
            else playSound('gameOver'); // ★ SE: ゲームオーバー

            roleResultNameEl.textContent = resultText; roleResultDiceDisplayEl.style.display = 'none';
            roleResultModalBody.classList.add(`role-reveal-${cssClassSuffix}`); roleResultModalBody.classList.add('reveal-start'); roleResultModal.style.display = 'flex';
            if (roleResultModalTimeout) clearTimeout(roleResultModalTimeout);
            roleResultModalTimeout = setTimeout(() => { roleResultModalBody.classList.remove('reveal-start'); roleResultModalBody.classList.add('reveal-end'); setTimeout(() => { roleResultModal.style.display = 'none'; roleResultModalBody.classList.remove('reveal-end'); roleResultModalBody.className = 'role-result-modal-body'; isShowingGameResult = false; resolve(); }, 300); }, duration);
        });
    }

    // --- ハイライト/アニメーション関数 --- 
    function highlightHand(element, hand) { if (handHighlightTimeout) clearTimeout(handHighlightTimeout); element.className = 'hand-display'; let sidebarHighlightClass = ''; if (!hand) return; if (hand.type === '役') { switch (hand.name) { case ROLES.PINZORO.name: sidebarHighlightClass = 'legendary'; break; case ROLES.ARASHI.name: sidebarHighlightClass = 'strong'; break; case ROLES.SHIGORO.name: sidebarHighlightClass = 'strong'; break; case ROLES.HIFUMI.name: sidebarHighlightClass = 'hifumi'; break; } } if (sidebarHighlightClass) { element.classList.add('highlight', sidebarHighlightClass); handHighlightTimeout = setTimeout(() => { element.className = 'hand-display'; }, HAND_HIGHLIGHT_DURATION); } }
    function animateScore(element, startScore, endScore, duration) {
        if (!element) return; if (element.animationId) cancelAnimationFrame(element.animationId); const range = endScore - startScore; let startTime = null; function step(timestamp) { if (!startTime) startTime = timestamp; const elapsed = timestamp - startTime; const progress = Math.min(elapsed / duration, 1); const currentScore = Math.floor(startScore + range * progress); if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${currentScore} G`; } else { element.textContent = currentScore; } if (progress < 1) { element.animationId = requestAnimationFrame(step); } else { if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${endScore} G`; } else { element.textContent = endScore; } element.animationId = null; } } element.animationId = requestAnimationFrame(step);
    }
    function showScoreChangePopup(container, change) { if (change === 0 || !container) return; const popup = document.createElement('span'); popup.className = 'score-change-popup'; const sign = change > 0 ? '+' : ''; popup.textContent = `${sign}${change}`; popup.classList.add(change > 0 ? 'gain' : 'loss'); container.appendChild(popup); setTimeout(() => popup.remove(), SCORE_POPUP_DURATION); }
    function changeBet(amount) { if (betInput.disabled) return; let cv = parseInt(betInput.value); if (isNaN(cv)) { cv = currentMinBet; } const max = parseInt(betInput.max); let nv = cv + amount; if (nv > max) nv = max; else if (nv < currentMinBet) nv = currentMinBet; if (nv !== cv) { betInput.value = nv; updateBetLimits(); } }
    function startBetHold(amount) { stopBetHold(); betHoldAmount = amount; changeBet(betHoldAmount); betHoldTimeout = setTimeout(() => { betHoldInterval = setInterval(() => { changeBet(betHoldAmount); }, BET_HOLD_INTERVAL); }, BET_HOLD_DELAY); }
    function stopBetHold() { clearTimeout(betHoldTimeout); clearInterval(betHoldInterval); betHoldTimeout = null; betHoldInterval = null; }

        // --- イベントリスナー --- 
       modeButtons.forEach(button => { button.addEventListener('click', () => { playSound('click'); // ★ SE追加
            const selectedMode = button.dataset.mode; if (selectedMode === 'pvp') { playSound('error'); alert('対人戦は現在準備中です。'); return; } gameMode = selectedMode; modeButtons.forEach(btn => btn.classList.remove('selected')); button.classList.add('selected'); console.log(`Game mode set to: ${gameMode}`); }); });
       startGameButton.addEventListener('click', () => { playSound('startButton'); console.log(`Starting game with mode: ${gameMode}`); initGame(false); });
       betAdjustButtons.forEach(button => { const amount = parseInt(button.dataset.amount); button.addEventListener('mousedown', (e) => { if (e.button !== 0) return; startBetHold(amount); }); button.addEventListener('mouseup', stopBetHold); button.addEventListener('mouseleave', stopBetHold); button.addEventListener('touchstart', (e) => { e.preventDefault(); startBetHold(amount); }, { passive: false }); button.addEventListener('touchend', stopBetHold); button.addEventListener('touchcancel', stopBetHold); });
       betInput.addEventListener('change', () => { if (!betInput.disabled) updateBetLimits(); }); // SE不要箇所
       maxBetButton.addEventListener('click', () => { playSound('maxBet'); // ★ MAXベットSE再生
            if (betInput.disabled) return; if (playerScore >= currentMinBet) { betInput.value = betInput.max; updateBetLimits(); } else { playSound('error'); setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満です。`); } });
       minBetButton.addEventListener('click', () => { playSound('minBet'); // ★ MINベットSE再生
            if (betInput.disabled) return; betInput.value = currentMinBet; updateBetLimits(); });

       setBetButton.addEventListener('click', () => { // (変更なし - 内部でbetConfirm再生)
           if (!isPlayerParent || betInput.disabled || isGameActive || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return; updateBetLimits();
           if (playerScore < currentMinBet) { playSound('error'); setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満のため、賭けられません。`); return; }
           if (npcScore < currentMinBet) { playSound('error'); defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "相手の最低賭け金不足"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
           let bv = parseInt(betInput.value); if (isNaN(bv)) {  playSound('error'); setMessage(`無効な賭け金です。`); betInput.value = currentMinBet; updateBetLimits(); return; }
           const maxBet = parseInt(betInput.max); if (bv >= currentMinBet && bv <= maxBet) { playSound('betConfirm'); currentBet = bv; if(riskyBetActive) { const riskyCard = playerCards.find(c => c.id === 'riskyBet'); if(riskyCard) { currentBet *= 2; currentBet = Math.min(currentBet, npcScore, playerScore); console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`); activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1; } riskyBetActive = false; updateUI(); betInput.value = currentBet; updateBetLimits(); } isGameActive = true; isPlayerTurn = true; const playerName = selectedCharacter?.name || 'あなた'; currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${playerName})</span>`; setMessage(`賭け金 ${currentBet} で勝負！ ${playerName}(親)がサイコロを振ってください。`); betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true; rollButton.disabled = false; historyButton.disabled = false; updateUI(); }
           else { playSound('error'); setMessage(`賭け金を正しく設定 (${currentMinBet}～${maxBet})。`); updateBetLimits(); }
       });

       rollButton.addEventListener('click', async () => { 
        if (playerScore <= 0 || !isGameActive || !isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) { checkGameEnd(); return; }
        let isFreeRoll = stormWarningRerollsLeft > 0; const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const canUseSoulRollCheck = soulRollCard && playerRollCount >= currentMaxRolls && !isFreeRoll && !soulRollUsedThisTurn && !waitingForPlayerActionAfterRoll && getRemainingUses('soulRoll') > 0; if (canUseSoulRollCheck) { waitingForPlayerActionAfterRoll = true; setMessage("振り残り回数がありません。「魂の一振り」を使用できます。どうしますか？", 'postRollChoice'); rollButton.disabled = true; updateCardButtonHighlight(); updateBetLimits(); return; }
        const canRoll = playerRollCount < currentMaxRolls || isFreeRoll || soulRollUsedThisTurn; if (!canRoll) { playSound('error'); setMessage("振り残り回数がありません。"); return; } // ★ SE: エラー音
        playSound('diceRollButton');
        if (isFreeRoll) { stormWarningRerollsLeft--; console.log("Using Storm Warning free reroll."); } else if (!soulRollUsedThisTurn) { playerRollCount++; }
        playSound('diceRoll'); // ★ SE: サイコロロール開始音
        rollButton.disabled = true; historyButton.disabled = true; const playerName = selectedCharacter?.name || 'あなた'; setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 振っています...`); showDiceRollModal(); updateUI();
        const soulRollLvFor判定 = (soulRollCard && soulRollUsedThisTurn) ? soulRollCard.level : 0; const finalDice = rollDice(false, 0, soulRollLvFor判定);
        animateDiceRoll(finalDice, async () => {
            playerDice = finalDice; if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' '); hideDiceRollModal(); diceDisplayEl.textContent = finalDice.join(' ');
            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定); const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目')); playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Player Rolled:", playerDice, "Hand:", playerHand); updateUI(); highlightHand(playerHandEl, playerHand);
            let stormWarningAppliedThisRoll = false; const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
            if (stormWarningActive && stormCardCheck) { const stormLevelCheck = stormCardCheck.level; const targetRoles = (stormLevelCheck >= 3) ? [ROLES.ARASHI.name, ROLES.PINZORO.name] : [ROLES.ARASHI.name]; if (!(playerHand.type === '役' && targetRoles.includes(playerHand.name))) { stormWarningRerollsLeft = (stormLevelCheck >= 2) ? 2 : 1; stormWarningAppliedThisRoll = true; console.log(`Card Effect: 嵐の予感発動！ Target role not hit. ${stormWarningRerollsLeft} free rerolls available.`); setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 嵐の予感効果！ アラシ/ピンゾロが出なかったので無料振り直しが ${stormWarningRerollsLeft} 回可能です。再度振ってください。`); rollButton.disabled = false; historyButton.disabled = false; updateCardButtonHighlight(); stormWarningActive = false; activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1; if (soulRollUsedThisTurn) soulRollUsedThisTurn = false; return; } else { console.log(`Card Effect: 嵐の予感 - Target role ${playerHand.name} hit! No free reroll.`); stormWarningActive = false; activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1; } }
            if (soulRollUsedThisTurn) { console.log("Resetting soulRollUsedThisTurn flag after successful roll."); soulRollUsedThisTurn = false; }

            await handlePostRollPlayerAction();
        });
    });

    async function handlePostRollPlayerAction() {
        const playerName = selectedCharacter?.name || 'あなた';
        const npcName = currentNpcCharacter?.name || '相手';

        // ★★★ BGMチェックを役確定直後に移動 ★★★
        if (playerHand && playerHand.type !== 'ションベン' && playerHand.type !== '目なし') {
             checkAndSwitchRoleBgm(playerHand, null); // 相手の手札はまだ不明なのでnull
        }

        if (playerHand.type === '目なし') {
            const canReroll = playerRollCount < currentMaxRolls;
            const hasStormWarningReroll = stormWarningRerollsLeft > 0;
            const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
            const canUseSoulRollPostMenashi = soulRollCard && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
            const hasPostRollCardForMenashi = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));

            if (canReroll || hasStormWarningReroll || hasPostRollCardForMenashi || (!canReroll && !hasStormWarningReroll && canUseSoulRollPostMenashi)) {
                waitingForPlayerActionAfterRoll = true;
                updateBetLimits();
                rollButton.disabled = true;
                historyButton.disabled = false;
                let rerollStatus = "";
                if (canReroll || hasStormWarningReroll) rerollStatus = "(振り直し可能)";
                else if (canUseSoulRollPostMenashi) rerollStatus = "(魂の一振り使用可能)";
                else rerollStatus = "(振り直し不可)";
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！どうしますか？ ${rerollStatus}`, 'postRollChoice');
                updateCardButtonHighlight();
            }
            else {
                playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                updateUI();
                highlightHand(playerHandEl, playerHand);
                rollButton.disabled = true;
                historyButton.disabled = false;
                isPlayerTurn = false;
                await showRoleResultModal(playerHand, playerDice);
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                setTimeout(handleRoundEnd, 100);
            }
        }
        else if (playerHand.type === 'ションベン') {
            rollButton.disabled = true;
            historyButton.disabled = false;
            isPlayerTurn = false;
            await showRoleResultModal(playerHand, playerDice);
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
            setTimeout(handleRoundEnd, 100);
        }
        else if (playerHand.type === '役' || playerHand.type === '目') {
            await showRoleResultModal(playerHand, playerDice);
            const hasUsablePostRollCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));
            const handName = getHandDisplayName(playerHand);

            if (hasUsablePostRollCard) {
                waitingForPlayerActionAfterRoll = true;
                updateBetLimits();
                rollButton.disabled = true;
                historyButton.disabled = false;
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ${handName}！どうしますか？`, 'postRollChoice');
                updateCardButtonHighlight();
            }
            else {
                rollButton.disabled = true;
                historyButton.disabled = false;
                isPlayerTurn = false;
                if (isPlayerParent) {
                    setMessage(`${playerName}(親): ${handName}！ 自動で${npcName}(子)の番です。`);
                    setTimeout(npcTurn, 100);
                } else {
                    setMessage(`${playerName}(子): ${handName}！ 自動で勝負！`);
                    setTimeout(handleRoundEnd, 100);
                }
            }
        }
        else {
            console.error("Unexpected player hand state after roll:", playerHand);
            setMessage("予期せぬエラーが発生しました。");
            startBettingPhase();
        }
        updateUI();
        updateCardButtonHighlight();
    }

   nextWaveButton.addEventListener('click', () => { openShop(); }); // ★ SE追加
   restartSameModeButton.addEventListener('click', () => { playSound('click'); initGame(false); }); // ★ SE追加 (initGame内でfalse指定追加)
   backToTitleFromResultButton.addEventListener('click', () => { playSound('click'); permanentScoreBoost = 0; console.log("Returning to title from result. permanentScoreBoost reset."); showScreen('title-screen'); }); // ★ SE追加
   historyButton.addEventListener('click', () => { playSound('click'); if (diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll) return; displayHistory(); historyModal.style.display = 'flex'; }); // ★ SE追加
   closeHistoryModalButton.addEventListener('click', () => { playSound('click'); historyModal.style.display = 'none'; }); // ★ SE追加
   closeDiceRollModalButton.addEventListener('click', () => { playSound('click'); hideDiceRollModal(); }); // ★ SE追加
   if(closeCardDetailModalButton) closeCardDetailModalButton.addEventListener('click', () => { playSound('click'); closeCardDetailModal(); }); // ★ SE追加

   async function npcTurn() {
    if (!isGameActive || isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
    npcRollCount++; historyButton.disabled = true; const npcName = currentNpcCharacter?.name || '相手'; setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 振っています...`);
    playSound('diceRoll');
    showDiceRollModal(); updateUI();
    const blindingLevel = blindingDiceActive ? (playerCards.find(c => c.id === 'blindingDice')?.level || 0) : 0; const finalDice = rollDice(true, blindingLevel, 0);
    animateDiceRoll(finalDice, async () => {
        npcDice = finalDice; if(npcDiceEl) npcDiceEl.textContent = npcDice.join(' '); hideDiceRollModal(); diceDisplayEl.textContent = finalDice.join(' ');
        const result = getHandResult(npcDice, true, blindingLevel, 0); const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目')); npcHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("NPC Rolled:", npcDice, "Hand:", npcHand);
        if (npcHand.type !== 'ションベン' && npcHand.type !== '目なし') {
             checkAndSwitchRoleBgm(playerHand, npcHand); // プレイヤーの手札と比較
        }
        let forcedReroll = false; if (blindingDiceActive && npcHand.type === '目なし') { console.log("Blinding Dice forced reroll for NPC on Menashi."); forcedReroll = true; setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。目くらましで再度振ります...`); setTimeout(npcTurn, 1000); return; }
        updateUI(); highlightHand(npcHandEl, npcHand); const playerName = selectedCharacter?.name || 'あなた';
        if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
            const handName = getHandDisplayName(npcHand); historyButton.disabled = false;
            if (npcHand.type !== '目なし') { await showRoleResultModal(npcHand, npcDice); }
            if (!isPlayerParent && npcHand.type !== 'ションベン') { setMessage(`${npcName}(親): ${handName}！ ${playerName}(子)の番です。`); isPlayerTurn = true; rollButton.disabled = false; updateCardButtonHighlight(); updateUI(); }
            else { setMessage(`${npcName}(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`) : '勝負！'}`); rollButton.disabled = true; setTimeout(handleRoundEnd, 100); }
        } else if (npcHand.type === '目なし') {
            if (npcRollCount < BASE_MAX_ROLLS) { setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`); setTimeout(npcTurn, 1000); }
            else { npcHand = { ...ROLES.SHONBEN, type: 'ションベン' }; updateUI(); highlightHand(npcHandEl, npcHand); rollButton.disabled = true; historyButton.disabled = false; await showRoleResultModal(npcHand, npcDice); setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`}`); setTimeout(handleRoundEnd, 100); }
        }
         updateCardButtonHighlight(); // NPCターン後にも更新
    });
}

// スコア計算アニメーション表示関数
async function displayScoreCalculationAnimation(data) {
    const container = scoreCalculationAnimationEl;
    const diceArea = diceAreaEl;
    if (!container || !diceArea) {
        console.error("Score calculation container or Dice Area not found!");
        return;
    }
    let scoreSound = sounds['scoreSE']; // scoreSEのAudioオブジェクト取得
    if (scoreSound) { // 再生中の scoreSE を停止する準備 (もしあれば)
    }
    console.log("Starting score calculation animation. Data:", data);
    playSound('scoreSE'); // ★ 計算アニメーション開始SE再生

    // --- 準備 ---
    container.innerHTML = '<div class="score-calc-inner"></div>'; // インナーコンテナを確実に作成
    const innerContainer = container.querySelector('.score-calc-inner');
    if (!innerContainer) return; // 安全策
    diceArea.classList.add('calculating');
    container.classList.add('visible'); // ここで表示状態にする
    await new Promise(resolve => requestAnimationFrame(resolve)); // レンダリング待機

    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // --- アニメーションステップ関数 ---
    const addStep = async (label, value, valueClass = 'neutral', stepDelay = CALC_STEP_DELAY_NORMAL) => {
        const stepEl = document.createElement('div');
        stepEl.className = 'score-calc-step';
        stepEl.innerHTML = `
            <span class="score-calc-label">${label}:</span>
            <span class="score-calc-value ${valueClass}">${value}</span>`;
        innerContainer.appendChild(stepEl); // インナーコンテナに追加
        await delay(stepDelay);
    };

    // --- アニメーション実行 ---
    try {
        // 1. 賭け金
        await addStep("賭け金", `${data.bet} 点`, 'neutral', CALC_STEP_DELAY_SHORT);

        // 2. 基本倍率
        if (!data.draw && !data.insuranceApplied) {
            let baseMultiplierText = '';
            let baseMultiplierClass = 'multiplier';
            if (data.win) {
                baseMultiplierText = `勝利: × ${data.baseMultiplier.toFixed(1)} 倍`; // 小数点表示
                baseMultiplierClass = 'positive';
            } else {
                baseMultiplierText = `敗北: × ${data.baseMultiplier.toFixed(1)} 倍`; // 小数点表示
                baseMultiplierClass = 'negative';
            }
            await addStep("基本倍率", baseMultiplierText, baseMultiplierClass);
        } else if (data.draw) {
             await addStep("結果", "引き分け", 'neutral');
        } else if (data.insuranceApplied) {
             await addStep("結果", "敗北 (保険適用)", 'special');
        }


        // 3. カード効果ボーナス (プラス分)
        let currentDisplayedMultiplier = data.baseMultiplier;
        const positiveEffects = data.appliedCardEffects.filter(eff => eff.type === 'bonus' || (eff.type === 'multiplier' && parseFloat(String(eff.value).replace(/[^+0-9.]/g, '')) > 0) ); // String変換追加
         if (positiveEffects.length > 0 && !data.insuranceApplied && !data.draw) {
            const bonusContainer = document.createElement('div');
            bonusContainer.className = 'score-calc-step';
            bonusContainer.innerHTML = `<span class="score-calc-label">カード効果(+):</span><span class="score-calc-value-multi"></span>`;
            innerContainer.appendChild(bonusContainer);
            const multiValueContainer = bonusContainer.querySelector('.score-calc-value-multi');
            if (!multiValueContainer) throw new Error("multiValueContainer not found for positive effects"); // ★ エラーチェック追加

            let totalBonus = 0;
            for (const effect of positiveEffects) {
                 const bonusValue = parseFloat(String(effect.value).replace(/[^+0-9.]/g, '')); // String変換追加
                 if (!isNaN(bonusValue) && bonusValue > 0) {
                     // ステップ表示をやめ、合計値で表示
                     totalBonus += bonusValue;
                     multiValueContainer.innerHTML = `<div><span class="score-calc-value positive">+${totalBonus.toFixed(1)} 倍</span></div>`;
                     const effectLog = document.createElement('div');
                     effectLog.innerHTML = `<span class="score-calc-label" style="font-size:0.8em; color:#bbb;">└ ${effect.name}</span>`;
                     effectLog.style.opacity = '0';
                     multiValueContainer.appendChild(effectLog);
                     // アニメーションで表示
                     requestAnimationFrame(() => {
                         effectLog.style.transition = 'opacity 0.3s ease-out';
                         effectLog.style.opacity = '1';
                     });
                     await delay(CALC_MULTI_STEP_DELAY); // 各効果の表示ディレイ
                 }
            }
            currentDisplayedMultiplier += totalBonus;
            await delay(CALC_STEP_DELAY_SHORT);
        }

        // 4. カード効果ペナルティ (マイナス分)
        const negativeEffects = data.appliedCardEffects.filter(eff => eff.type === 'negative' || (eff.type === 'multiplier' && parseFloat(String(eff.value).replace(/[^0-9.]/g, '')) < 0) ); // String変換追加
        if (negativeEffects.length > 0 && !data.insuranceApplied && !data.draw) {
             const penaltyContainer = document.createElement('div');
             penaltyContainer.className = 'score-calc-step';
             penaltyContainer.innerHTML = `<span class="score-calc-label">カード効果(-):</span><span class="score-calc-value-multi"></span>`;
             innerContainer.appendChild(penaltyContainer);
             const multiValueContainer = penaltyContainer.querySelector('.score-calc-value-multi');
             if (!multiValueContainer) throw new Error("multiValueContainer not found for negative effects"); // ★ エラーチェック追加

             let totalPenalty = 0; // ★ totalPenalty は絶対値で計算
             for (const effect of negativeEffects) {
                  const penaltyValue = Math.abs(parseFloat(String(effect.value).replace(/[^0-9.]/g, ''))); // String変換追加 & 絶対値
                  if (!isNaN(penaltyValue) && penaltyValue > 0) {
                      totalPenalty += penaltyValue;
                      multiValueContainer.innerHTML = `<div><span class="score-calc-value negative">-${totalPenalty.toFixed(1)} 倍</span></div>`; // 表示はマイナス
                      const effectLog = document.createElement('div');
                      effectLog.innerHTML = `<span class="score-calc-label" style="font-size:0.8em; color:#bbb;">└ ${effect.name}</span>`;
                      effectLog.style.opacity = '0';
                      multiValueContainer.appendChild(effectLog);
                      requestAnimationFrame(() => {
                          effectLog.style.transition = 'opacity 0.3s ease-out';
                          effectLog.style.opacity = '1';
                      });
                      currentDisplayedMultiplier -= penaltyValue; // 実際の計算はマイナス
                      await delay(CALC_MULTI_STEP_DELAY);
                  }
             }
             await delay(CALC_STEP_DELAY_SHORT);
        }
        currentDisplayedMultiplier = Math.max(0, currentDisplayedMultiplier); // 念のため0未満にならないように

        // 5. 連勝ボーナス表示修正
        // ★ data から streakBonusRate と連勝数を取得
        const actualStreakBonusRate = data.streakBonusRate || 0;
        let winsToDisplay = 0;
        let streakLabel = "連勝ボーナス";
        if (data.win && data.parent === 'Player' && data.consecutiveWins >= 1) {
            winsToDisplay = data.consecutiveWins;
            streakLabel = `${winsToDisplay}連勝ボーナス`;
        } else if (data.lose && data.parent === 'NPC' && data.npcConsecutiveWins >= 1) {
            winsToDisplay = data.npcConsecutiveWins;
            streakLabel = `相手${winsToDisplay}連勝ボーナス`;
        }

        // ★ 連勝ボーナスがある場合のみ表示
        if (actualStreakBonusRate > 0 && !data.insuranceApplied && !data.draw) {
            const streakContainer = document.createElement('div');
            streakContainer.className = 'score-calc-step';
            // ★ streakLabel を使用
            streakContainer.innerHTML = `<span class="score-calc-label">${streakLabel}:</span><span class="score-calc-value bonus"></span>`;
            innerContainer.appendChild(streakContainer);
            const streakValueEl = streakContainer.querySelector('.score-calc-value');
            if (!streakValueEl) throw new Error("streakValueEl not found"); // ★ エラーチェック追加

            const totalStreakPercent = actualStreakBonusRate * 100;
            const steps = Math.ceil(totalStreakPercent / 10); // 10%刻み
            let currentPercent = 0;
            for (let i = 1; i <= steps; i++) {
                currentPercent = Math.min(totalStreakPercent, i * 10);
                streakValueEl.textContent = `+ ${currentPercent.toFixed(0)} %`;
                await delay(CALC_MULTI_STEP_DELAY / 2); // 少し早く
            }

            // 逆境の魂などの詳細表示
            const spiritEffect = data.appliedCardEffects.find(eff => eff.name.includes('逆境の魂'));
            if (spiritEffect) {
                 const effectLog = document.createElement('div');
                 // ★ spiritEffect.value は文字列（例: "連勝率+10%"）の場合があるためそのまま表示
                 effectLog.innerHTML = `<span class="score-calc-label" style="font-size:0.8em; color:#bbb;">└ ${spiritEffect.name} (${spiritEffect.value})</span>`;
                 effectLog.style.textAlign = 'right';
                 effectLog.style.opacity = '0';
                 streakContainer.appendChild(effectLog);
                 requestAnimationFrame(() => {
                    effectLog.style.transition = 'opacity 0.3s ease-out';
                    effectLog.style.opacity = '1';
                 });
            }
            await delay(CALC_STEP_DELAY_NORMAL);
        }


        // 6. 区切り線
        const separator = document.createElement('div');
        separator.style.height = '1px';
        separator.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        separator.style.margin = '8px 0';
        separator.style.opacity = '0';
        innerContainer.appendChild(separator);
        requestAnimationFrame(() => {
            separator.style.transition = 'opacity 0.3s ease-out 0.2s';
            separator.style.opacity = '1';
        });
        await delay(CALC_STEP_DELAY_SHORT + 200);

          // 7. 最終結果 (スコア変動量) 
          const finalScoreClass = data.finalScoreChange > 0 ? 'positive' : data.finalScoreChange < 0 ? 'negative' : 'neutral';
          const finalScoreSign = data.finalScoreChange > 0 ? '+' : '';
  
          const finalResultNode = document.createElement('div');
          finalResultNode.className = `score-calc-final ${finalScoreClass}`;
          finalResultNode.textContent = `${finalScoreSign}${data.finalScoreChange} 点`; // textContent で内容設定
  
          console.log("Appending final result node:", finalResultNode);
          innerContainer.appendChild(finalResultNode); // innerContainer に追加
          console.log("Final result node appended to innerContainer.");
  
          const finalElementInDOM = innerContainer.querySelector('.score-calc-final');
          if (finalElementInDOM) {
              console.log("Final element found in DOM. Class list:", finalElementInDOM.classList);
          } else {
              // このエラーは出なくなるはず
              console.error("Final element NOT found in DOM after appendChild!");
          }
          playSound('scoreResults');
          await delay(CALC_FINAL_DELAY);
          console.log("Waited for CALC_FINAL_DELAY.");
  
      } catch (error) {
          console.error("Error during score calculation animation:", error);
          innerContainer.innerHTML = `<div class="score-calc-final neutral">計算エラー</div>`;
          await delay(CALC_FINAL_DELAY);
      }
  }

async function handleSkipAction() { // (SE追加)
    playSound('click'); // ★ SE追加
    if (!waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
    console.log("Skip button clicked.");
    waitingForPlayerActionAfterRoll = false;
    messageButtonContainer.innerHTML = '';
    activeCardBeingUsed = null; // スキップ時はカード使用フラグ解除

    const handName = getHandDisplayName(playerHand);
    const playerName = selectedCharacter?.name || 'あなた';
    const npcName = currentNpcCharacter?.name || 'NPC';
    const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
    const canUseSoulRollOnSkip = soulRollCard && playerHand?.type === '目なし' && playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0 && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;

    if (canUseSoulRollOnSkip) {
        console.log("Skipped Soul Roll choice, confirming Shonben.");
        playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
        updateUI();
        highlightHand(playerHandEl, playerHand);
        isPlayerTurn = false;
        rollButton.disabled = true;
        historyButton.disabled = false;
        await showRoleResultModal(playerHand, playerDice);
        setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
        setTimeout(handleRoundEnd, 100);
    }
    else if (playerHand && playerHand.type === '目なし') {
        let canReroll = playerRollCount < currentMaxRolls;
        let hasStormWarningReroll = stormWarningRerollsLeft > 0;
        if (canReroll || hasStormWarningReroll) {
            // 再度振れる場合はロールボタンを有効化
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)` : ''}`);
            rollButton.disabled = false;
            historyButton.disabled = false;
        }
        else { // 振り直し不可でスキップ＝ションベン確定
            playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
            updateUI();
            highlightHand(playerHandEl, playerHand);
            isPlayerTurn = false;
            rollButton.disabled = true;
            historyButton.disabled = false;
            await showRoleResultModal(playerHand, playerDice);
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
            setTimeout(handleRoundEnd, 100);
        }
    }
    else if (playerHand && (playerHand.type === '役' || playerHand.type === '目')) {
        // 役/目が出ている状態でスキップ
        isPlayerTurn = false;
        rollButton.disabled = true; // スキップ後はロール不可
        historyButton.disabled = false;
        if (isPlayerParent) {
            setMessage(`${playerName}(親): ${handName}！ スキップして${npcName}(子)の番です。`);
            setTimeout(npcTurn, 100);
        } else {
            setMessage(`${playerName}(子): ${handName}！ スキップして勝負！`);
            setTimeout(handleRoundEnd, 100);
        }
    }
    else { // 予期せぬ状態
        console.warn("Skip action called with unexpected playerHand:", playerHand);
        startBettingPhase(); // 安全策としてベットフェーズに戻る
    }
    updateUI();
    updateCardButtonHighlight(); // ボタン状態更新
    updateBetLimits(); // 賭け金関連のUI状態も更新
}

   // ラウンド終了処理 
   async function handleRoundEnd() {
    if (waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
    isGameActive = false; rollButton.disabled = true; historyButton.disabled = false;

    let pWin = false, nWin = false, draw = false;
    let sc = 0, rClass = 'draw';
    let finalMsg = ""; // ★ 関数スコープで宣言
    let parentChanged = false;
    let preventParentChange = false;
    let parentKeptByCard = false;
    const parentBefore = isPlayerParent ? 'Player' : 'NPC';
    const playerInitialScore = playerScore;
    const npcInitialScore = npcScore;
    const playerNameStr = playerName || selectedCharacter?.name || 'あなた';
    const npcNameStr = currentNpcCharacter?.name || '相手';

    // ★★★ 重要: 計算前の連勝数を保持 ★★★
    const consecutiveWinsBeforeRound = consecutiveWins;
    const npcConsecutiveWinsBeforeRound = npcConsecutiveWins;

    let baseMultiplier = 1.0;
    let multiplierBonus = 0;
    let streakBonusRate = 0.0;
    let isHifumiLoss = false;
    let isShonbenLoss = false;
    let insuranceApplied = false;
    let appliedCardEffects = [];

    // --- 勝敗判定 ---
    if (playerHand?.type === 'ションベン') { nWin = true; isShonbenLoss = true; } // ★ ションベン負け
    else if (npcHand?.type === 'ションベン') { pWin = true; } // 相手ションベン
    else {
        const getStrength = (hand) => { if (!hand) return -Infinity; if (hand.type === 'ションベン') return ROLES.SHONBEN.strength; if (hand.type === '目なし') return ROLES.MENASHI.strength; if (hand.name === ROLES.HIFUMI.name) return ROLES.HIFUMI.strength; if (hand.type === '目') return ROLES.NORMAL_EYE.strength + hand.value / 10; if (hand.name === ROLES.SHIGORO.name) return ROLES.SHIGORO.strength; if (hand.name === ROLES.ARASHI.name) return ROLES.ARASHI.strength + hand.value / 10; if (hand.name === ROLES.PINZORO.name) return ROLES.PINZORO.strength; return -Infinity; };
        const playerStrength = getStrength(playerHand);
        const npcStrength = getStrength(npcHand);
        if (playerStrength > npcStrength) pWin = true;
        else if (playerStrength < npcStrength) nWin = true;
        else draw = true;
    }

    // 親権維持カードの確認
    const keepRightCard = playerCards.find(card => card.id === 'keepParentalRight');
    const maxKeepUses = keepRightCard ? getTotalUses('keepParentalRight') : 0;
    const keepRightUsesCount = activeCardUses['keepParentalRight'] || 0;
    if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) {
         const useKeepRight = await askKeepParentRight(keepRightCard.level);
         if (useKeepRight) {
             preventParentChange = true;
             parentKeptByCard = true;
             if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; }
             console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} 発動！ (${keepRightUsesCount + 1}/${maxKeepUses}回使用)`);
             activeCardUses['keepParentalRight'] = (activeCardUses['keepParentalRight'] || 0) + 1;
             updateCardButtonHighlight();
             appliedCardEffects.push({ name: '親権維持', value: '(親交代阻止)', type: 'info' });
         }
     }

    // 連勝数更新と親交代判定 
    if (pWin) {
        if (parentBefore === 'Player') { // ラウンド開始時プレイヤーが親で勝利
            consecutiveWins++;
            npcConsecutiveWins = 0;
            console.log(`Player (Parent) Wins! Consecutive Wins: ${consecutiveWins}`); // ログ追加
        } else { // ラウンド開始時NPCが親でプレイヤー(子)が勝利 -> 親交代
            consecutiveWins = 1; // ★ プレイヤーが新しい親として1勝目
            npcConsecutiveWins = 0; // NPCの連勝リセット
            parentChanged = true;
            isPlayerParent = true; // 親交代実行
            console.log(`Player (Child) Wins! Parent changed. Consecutive Wins reset to: ${consecutiveWins}`); // ★ ログ追加
        }
    } else if (nWin) {
        if (parentBefore === 'NPC') { // ラウンド開始時NPCが親で勝利
            npcConsecutiveWins++;
            consecutiveWins = 0;
            console.log(`NPC (Parent) Wins! NPC Consecutive Wins: ${npcConsecutiveWins}`); // ログ追加
        } else { // ラウンド開始時プレイヤーが親で敗北 -> 親交代
            consecutiveWins = 0; // プレイヤーの連勝リセット
            npcConsecutiveWins = 1; // ★ NPCが新しい親として1勝目
            if (!preventParentChange) { // 親権維持カード未使用の場合
                parentChanged = true;
                isPlayerParent = false; // 親交代実行
                console.log(`Player (Parent) Lost! Parent changed. NPC Consecutive Wins reset to: ${npcConsecutiveWins}`); // ★ ログ追加
            } else {
                 console.log(`Player (Parent) Lost! Kept parental right. Player Consecutive Wins reset to: ${consecutiveWins}`); // 親権維持時のログ
            }
        }
    } else { // 引き分け
        // 親の連勝数はリセット
        if (parentBefore === 'Player') consecutiveWins = 0;
        else npcConsecutiveWins = 0;
        console.log("Draw! Parent consecutive wins reset."); // ログ追加
    }

    // スコア計算
    if (draw) {
        msg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; rClass = 'draw';
        const drawBonusCardCheck = playerCards.find(c => c.id === 'drawBonus');
        if (drawBonusActive && drawBonusCardCheck) {
            const scoreGainPercent = (drawBonusCardCheck.level === 3) ? 1.0 : 0.5;
            const scoreGain = Math.floor(currentBet * scoreGainPercent);
            if (scoreGain > 0) {
                sc = scoreGain;
                msg += ` (引き分けボーナス: +${sc}点)`;
                console.log(`Card Effect: 引き分けボーナス Lv.${drawBonusCardCheck.level} 適用！ スコア +${sc}`);
                // ★★★ drawBonus の消費はここで行う ★★★
                activeCardUses['drawBonus'] = (activeCardUses['drawBonus'] || 0) + 1;
                appliedCardEffects.push({ name: `引き分けボーナス Lv.${drawBonusCardCheck.level}`, value: `+${sc}点`, type: 'bonus' });
            }
            drawBonusActive = false; // 使用フラグ解除
        } else {
            sc = 0;
        }
    } else { // 勝敗ありの場合
        const winnerHand = pWin ? playerHand : npcHand;
        const loserHand = pWin ? npcHand : playerHand;
        const winnerIsPlayer = pWin;

        // 1. 基本倍率決定 (★ステップ1.1対応済み)
        if (winnerIsPlayer) { // プレイヤー勝利時
            if (loserHand?.name === ROLES.HIFUMI.name) { // 相手ヒフミ
                baseMultiplier = (winnerHand?.name === ROLES.PINZORO.name) ? 6 : (winnerHand?.name === ROLES.ARASHI.name) ? 4 : (winnerHand?.name === ROLES.SHIGORO.name) ? 3 : 2;
            } else if (loserHand?.type === 'ションベン') { // 相手ションベン
                if (winnerHand?.name === ROLES.HIFUMI.name) { baseMultiplier = 1; }
                 else if (winnerHand?.name === ROLES.SHIGORO.name) { baseMultiplier = ROLES.SHIGORO.payoutMultiplier; }
                 else if (winnerHand?.name === ROLES.ARASHI.name) { baseMultiplier = ROLES.ARASHI.payoutMultiplier; }
                 else if (winnerHand?.name === ROLES.PINZORO.name) { baseMultiplier = ROLES.PINZORO.payoutMultiplier; }
                 else { baseMultiplier = 1; }
            } else { // 通常の勝利
                baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1);
            }
        } else { // プレイヤー敗北時
            if (loserHand?.name === ROLES.HIFUMI.name) { // 自分ヒフミ負け
                isHifumiLoss = true;
                baseMultiplier = (winnerHand?.name === ROLES.PINZORO.name) ? 6 : (winnerHand?.name === ROLES.ARASHI.name) ? 4 : (winnerHand?.name === ROLES.SHIGORO.name) ? 3 : 2;
            } else if (loserHand?.type === 'ションベン') { // 自分ションベン負け
                isShonbenLoss = true; // ★ フラグ設定
                if (giveUpEyeUsedThisTurn) { // 見切り使用時は特別処理
                     baseMultiplier = 1; // 基本1倍 (軽減効果は後で適用)
                     appliedCardEffects.push({ name: `見切り Lv.${playerCards.find(c=>c.id==='giveUpEye')?.level || 1}`, value: '(ションベン扱い)', type: 'info' });
                } else {
                    // ★修正箇所: 相手(勝者)の役に応じて支払い倍率を決定
                    if (winnerHand?.name === ROLES.HIFUMI.name) { baseMultiplier = 1; }
                    else if (winnerHand?.name === ROLES.SHIGORO.name) { baseMultiplier = ROLES.SHIGORO.payoutMultiplier; }
                    else if (winnerHand?.name === ROLES.ARASHI.name) { baseMultiplier = ROLES.ARASHI.payoutMultiplier; }
                    else if (winnerHand?.name === ROLES.PINZORO.name) { baseMultiplier = ROLES.PINZORO.payoutMultiplier; }
                    else { baseMultiplier = 1; }
                }
            } else { // 通常の敗北
                baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1);
            }

            // ダブルアップ失敗ペナルティ (敗北時のみチェック)
            const doubleUpCardCheck = playerCards.find(c => c.id === 'doubleUpBet');
            const usedDoubleUpThisRound = (activeCardUses['doubleUpBet'] || 0) > (activeCardUses['doubleUpBet_roundStartCount'] || 0);
            if (doubleUpCardCheck && usedDoubleUpThisRound && !isPlayerParent) { // 子の時だけ
                if (doubleUpCardCheck.level <= 2) { // Lv1, Lv2 は失敗時ヒフミ負け
                    isHifumiLoss = true;
                    isShonbenLoss = false; // ヒフミ扱い優先
                    baseMultiplier = Math.abs(ROLES.HIFUMI.payoutMultiplier); // ヒフミの基本支払い倍率
                    appliedCardEffects.push({ name: `ダブルアップ失敗 Lv.${doubleUpCardCheck.level}`, value: `(ヒフミ扱い x${baseMultiplier})`, type: 'negative' });
                } else { // Lv3 はペナルティなし
                    appliedCardEffects.push({ name: `ダブルアップ失敗 Lv.${doubleUpCardCheck.level}`, value: `(ペナルティなし)`, type: 'info' });
                }
            }
        }
        console.log(`[${winnerIsPlayer?'Win':'Lose'}] Base Multiplier: ${baseMultiplier.toFixed(1)}`);

        // 2. カード効果による倍率ボーナス/ペナルティ計算
        multiplierBonus = 0;
        if (winnerIsPlayer) { // 勝利時のボーナス
            playerCards.forEach(cardData => {
                const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef || !cardDef.effectTag) return; const level = cardData.level; let effectApplied = false; let bonusVal = 0; let effectType = 'bonus';
                switch (cardDef.effectTag) {
                    case 'arashiBonus': if (winnerHand?.name === ROLES.ARASHI.name) { bonusVal = level; effectApplied = true; } break;
                    case 'shigoroBonus': if (winnerHand?.name === ROLES.SHIGORO.name) { bonusVal = level; effectApplied = true; } break;
                    case 'oneEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 1) { bonusVal = level; effectApplied = true; } break;
                    case 'sixEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 6) { bonusVal = level; effectApplied = true; } break;
                }
                if(effectApplied){ multiplierBonus += bonusVal; appliedCardEffects.push({ name: `${cardDef.name} Lv.${level}`, value: `+${bonusVal.toFixed(1)}倍`, type: effectType }); }
            });
            // 報酬増幅チェック
            const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier');
            const usedAmplifierThisRound = (activeCardUses['rewardAmplifier'] || 0) > (activeCardUses['rewardAmplifier_roundStartCount'] || 0);
            if (amplifierCard && usedAmplifierThisRound && (winnerHand?.type === '役' || winnerHand?.type === '目')) { const bonusValue = (amplifierCard.level >= 2) ? 2 : 1; multiplierBonus += bonusValue; appliedCardEffects.push({ name: `報酬増幅 Lv.${amplifierCard.level}`, value: `+${bonusValue.toFixed(1)}倍`, type: 'bonus' }); }
            // ダブルアップ成功チェック (子の時のみ)
            const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
            const usedDoubleUpThisRoundWin = (activeCardUses['doubleUpBet'] || 0) > (activeCardUses['doubleUpBet_roundStartCount'] || 0);
            if (doubleUpCard && usedDoubleUpThisRoundWin && !isPlayerParent) { const bonusValue = [1.0, 1.5, 2.0][(doubleUpCard.level || 1) - 1]; multiplierBonus += bonusValue; appliedCardEffects.push({ name: `ダブルアップ成功 Lv.${doubleUpCard.level}`, value: `+${bonusValue.toFixed(1)}倍`, type: 'bonus' }); }
        } else { // 敗北時の軽減
             playerCards.forEach(cardData => {
                 const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef) return; const level = cardData.level; let effectApplied = false; let reductionVal = 0; let effectType = 'negative'; // 軽減はマイナス効果として扱う
                 if (cardDef.effectTag === 'hifumiHalf' && isHifumiLoss) { // ヒフミ負けの場合
                      reductionVal = -level; // 倍率から直接引く
                      effectApplied = true;
                 }
                 // ★ ションベン軽減はションベン負け専用 かつ 見切り未使用時
                 if (cardDef.effectTag === 'shonbenHalf' && isShonbenLoss && !giveUpEyeUsedThisTurn) {
                      reductionVal = -0.5; // 倍率から0.5引く
                      effectApplied = true;
                 }
                 if(effectApplied){ multiplierBonus += reductionVal; appliedCardEffects.push({ name: `${cardDef.name} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: effectType }); }
             });
             // 見切りLv2以上の支払い半減効果 (ションベン負け かつ 見切り使用時)
             const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
             if (isShonbenLoss && giveUpEyeUsedThisTurn && giveUpCard && giveUpCard.level >= 2) {
                  const reduction = -0.5; // 倍率から0.5引く (ションベン基本1倍から引かれる想定)
                  multiplierBonus += reduction;
                  appliedCardEffects.push({ name: `見切り Lv.${giveUpCard.level}`, value: `-0.5倍`, type: 'negative' });
             }
        }
        console.log(`Total Multiplier Bonus/Reduction: ${multiplierBonus.toFixed(1)}`);

       // 3. 連勝ボーナス計算
       streakBonusRate = 0.0;
       // 計算に使用する連勝数を決定 (ラウンド開始時の親が勝利した場合) 
       let winsForBonusCalculation = 0;
       if (parentBefore === 'Player' && pWin) { // ラウンド開始時プレイヤー親で、プレイヤー勝利
           winsForBonusCalculation = consecutiveWins; // 更新後の連勝数を使用
       } else if (parentBefore === 'NPC' && nWin) { // ラウンド開始時NPC親で、NPC勝利
           winsForBonusCalculation = npcConsecutiveWins; // 更新後の連勝数を使用
       }

       if (winsForBonusCalculation >= 1) { // 親が1勝以上した場合のみボーナス計算
           streakBonusRate = winsForBonusCalculation * CONSECUTIVE_WIN_BONUS_RATE;
           console.log(`${parentBefore} Parent Streak Bonus Rate Base: +${(streakBonusRate * 100).toFixed(0)}% (${winsForBonusCalculation} wins)`);

           // 逆境の魂チェック (親がプレイヤーの場合のみ)
           if (parentBefore === 'Player' && pWin) { // ★ 条件を parentBefore で判定
               const spiritCard = playerCards.find(c => c.id === 'fightingSpirit');
               if (spiritCard) {
                   const level = spiritCard.level;
                   const conditionMet = (level < 3 && playerInitialScore <= npcInitialScore / 2) || (level >= 3 && playerInitialScore <= npcInitialScore);
                   if (conditionMet) {
                       const spiritBonusRateInc = [0.1, 0.2, 0.3][level - 1];
                       streakBonusRate += spiritBonusRateInc;
                       appliedCardEffects.push({ name: `逆境の魂 Lv.${level}`, value: `連勝率+${(spiritBonusRateInc * 100).toFixed(0)}%`, type: 'bonus' });
                       console.log(`Fighting Spirit Lv.${level} applied! Bonus Rate Increased by ${spiritBonusRateInc}`); // ログ追加
                   }
               }
           }
       }
       streakBonusRate = Math.max(0, streakBonusRate);
       console.log(`Final Streak Bonus Rate for calculation: +${(streakBonusRate * 100).toFixed(0)}%`);

        // 4. 最終スコア計算
        const insuranceCard = playerCards.find(card => card.id === 'lossInsurance');
        if (!winnerIsPlayer && insuranceCard) { // 敗北 かつ 保険カードあり
            const level = insuranceCard.level;
            const insuranceMultiplier = [1.5, 1.3, 1.1][level - 1];
            const npcStreakBonusRateForInsurance = (parentBefore === 'NPC' && npcConsecutiveWinsBeforeRound >= 1) ? (npcConsecutiveWinsBeforeRound * CONSECUTIVE_WIN_BONUS_RATE) : 0.0;
            const finalPaymentWithInsurance = currentBet * insuranceMultiplier * (1 + npcStreakBonusRateForInsurance);
            sc = -Math.round(finalPaymentWithInsurance);
            insuranceApplied = true;
            appliedCardEffects.push({ name: `一撃保険 Lv.${level}`, value: `支払い=${Math.abs(sc)}点`, type: 'special' });

            finalMsg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)}) (一撃保険適用)`;
            if (!isPlayerParent && npcConsecutiveWins >= 1) finalMsg += ` (${npcNameStr}${npcConsecutiveWins}連勝中...)`;
            finalMsg += ` ${sc !== 0 ? sc + '点' : ''}`; // スコア変動も追加
            rClass = 'lose';

        } else { // 通常計算 (勝利時 または 保険なし敗北時)
            const effectiveMultiplier = Math.max(0, baseMultiplier + multiplierBonus);
            const finalAmount = currentBet * effectiveMultiplier * (1 + streakBonusRate);
            sc = winnerIsPlayer ? Math.round(finalAmount) : -Math.round(finalAmount);

            if(pWin){
                finalMsg = loserHand?.type === 'ションベン' ? `${npcNameStr}ションベンで勝利！` : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
                if (isPlayerParent && consecutiveWins >= 1) finalMsg += ` (${consecutiveWins}連勝!)`;
                rClass = 'win';
            } else { // nWin (敗北)
                if (giveUpEyeUsedThisTurn) { finalMsg = `見切り使用で敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
                else if (isHifumiLoss) { finalMsg = `ヒフミ扱いで敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
                else if (isShonbenLoss) { finalMsg = "ションベンで敗北..."; }
                else { finalMsg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
                if (!isPlayerParent && npcConsecutiveWins >= 1) finalMsg += ` (${npcNameStr}${npcConsecutiveWins}連勝中...)`;
                rClass = 'lose';
            }
            finalMsg += ` ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`; // スコア変動も追加
        }
    } // else if (draw) のブロックの終わり

      // スコア変動SE再生
    if (!draw) {
    } else if (sc > 0) { // 引き分けボーナスありの場合
    }

    // スコア計算アニメーション表示データ準備
    const calculationData = {
        bet: currentBet, win: pWin, lose: nWin, draw: draw,
        parent: parentBefore, // 親が誰だったか
        consecutiveWins: (parentBefore === 'Player' && pWin && consecutiveWins >= 1) ? consecutiveWins : 0,
        npcConsecutiveWins: (parentBefore === 'NPC' && nWin && npcConsecutiveWins >= 1) ? npcConsecutiveWins : 0,
        playerHand: playerHand, npcHand: npcHand,
        baseMultiplier: baseMultiplier, multiplierBonus: multiplierBonus,
        streakBonusRate: streakBonusRate, // 計算に使用したレート
        insuranceApplied: insuranceApplied, finalScoreChange: sc,
        appliedCardEffects: appliedCardEffects
    };
    console.log("Prepared calculation data. Awaiting animation..."); // ★ログ追加
    // スコア計算アニメーション表示 (awaitで完了を待つ)
    await displayScoreCalculationAnimation(calculationData);
    console.log("Score calculation animation finished (awaited). Proceeding..."); // ★ログ追加
     // --- アニメーション表示後 ---
     const psEnd = Math.max(0, playerInitialScore + sc);
     const nsEnd = Math.max(0, npcInitialScore - sc);

     // スコア更新とキャラクターアニメーション
     playerScore = psEnd; npcScore = nsEnd;
     totalScoreChange += sc;

     const playerImageArea = document.querySelector('.character-image-area.player'); const npcImageArea = document.querySelector('.character-image-area.npc'); const playerIndicator = playerImageArea ? playerImageArea.querySelector('.win-lose-indicator') : null; const npcIndicator = npcImageArea ? npcImageArea.querySelector('.win-lose-indicator') : null; const animationDuration = 1500; const indicatorDisplayDuration = 1200; const indicatorRemoveDelay = indicatorDisplayDuration + 300;

     if (playerImageArea) playerImageArea.classList.remove('shake-damage', 'shake-happy');
     if (npcImageArea) npcImageArea.classList.remove('shake-damage', 'shake-happy');
     if (playerIndicator) { playerIndicator.classList.remove('indicator-win', 'indicator-lose'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; }
     if (npcIndicator) { npcIndicator.classList.remove('indicator-win', 'indicator-lose'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; }

     requestAnimationFrame(() => {
        // スコアポップアップと数値アニメーション
        if (sc !== 0) {
            showScoreChangePopup(playerScoreContainer, sc);
            showScoreChangePopup(npcScoreContainer, -sc);
            if (sc > 0) {
                playSound('scoreUp');
            } else {
                playSound('scoreDown');
            }
        }
        animateScore(playerScoreEl, playerInitialScore, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, npcInitialScore, nsEnd, SCORE_ANIMATION_DURATION);

         // 勝敗に応じたキャラクターアニメーションとWIN/LOSE表示 & ★SE再生
         if (sc > 0 || (pWin && !draw)) { // プレイヤー勝利
            playSound('win'); // ★勝利SE
            if (playerImageArea) playerImageArea.classList.add('shake-happy');
            if (playerIndicator) { playerIndicator.textContent = "WIN!"; playerIndicator.classList.add('indicator-win'); playerIndicator.style.visibility = 'visible'; setTimeout(() => { if (playerIndicator) { playerIndicator.classList.remove('indicator-win'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); }
            if (npcImageArea) npcImageArea.classList.add('shake-damage');
            if (npcIndicator) { npcIndicator.textContent = "LOSE..."; npcIndicator.classList.add('indicator-lose'); npcIndicator.style.visibility = 'visible'; setTimeout(() => { if (npcIndicator) { npcIndicator.classList.remove('indicator-lose'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); }
        } else if (sc < 0 || (nWin && !draw)) { // プレイヤー敗北
            playSound('lose'); // ★敗北SE
            if (playerImageArea) playerImageArea.classList.add('shake-damage');
            if (playerIndicator) { playerIndicator.textContent = "LOSE..."; playerIndicator.classList.add('indicator-lose'); playerIndicator.style.visibility = 'visible'; setTimeout(() => { if (playerIndicator) { playerIndicator.classList.remove('indicator-lose'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); }
            if (npcImageArea) npcImageArea.classList.add('shake-happy');
            if (npcIndicator) { npcIndicator.textContent = "WIN!"; npcIndicator.classList.add('indicator-win'); npcIndicator.style.visibility = 'visible'; setTimeout(() => { if (npcIndicator) { npcIndicator.classList.remove('indicator-win'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); }
        } else if (draw && sc > 0) { // 引き分けボーナスありの場合
            playSound('scoreUp'); // 引き分けボーナスSE
        }

         // シェイクアニメーション解除タイマー
         if (playerImageArea && (playerImageArea.classList.contains('shake-happy') || playerImageArea.classList.contains('shake-damage'))) { setTimeout(() => { if (playerImageArea) playerImageArea.classList.remove('shake-happy', 'shake-damage') }, animationDuration); }
         if (npcImageArea && (npcImageArea.classList.contains('shake-happy') || npcImageArea.classList.contains('shake-damage'))) { setTimeout(() => { if (npcImageArea) npcImageArea.classList.remove('shake-happy', 'shake-damage') }, animationDuration); }
     });

    // 履歴登録 
    addHistoryEntry({
        wave: currentWave, round: currentRoundInWave,
        playerDice: playerDice.join(','), playerHandName: getHandDisplayName(playerHand),
        npcDice: npcDice.join(','), npcHandName: getHandDisplayName(npcHand),
        result: rClass, scoreChange: sc, betAmount: currentBet,
        consecutiveWins: isPlayerParent ? consecutiveWins : 0,
        npcConsecutiveWins: !isPlayerParent ? npcConsecutiveWins : 0,
        parentBefore: parentBefore
    });

      // UI更新とゲーム終了チェックの遅延時間 
      const uiUpdateDelay = Math.max(SCORE_ANIMATION_DURATION, indicatorRemoveDelay) + 200;
      console.log(`Scheduling next step in ${uiUpdateDelay}ms...`); // ★ログ追加
      setTimeout(() => {
          console.log("Executing setTimeout callback in handleRoundEnd."); // ★ログ追加
          // 親交代/維持メッセージ追記
          if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? playerNameStr : npcNameStr}が親です。`; }
          else if (parentKeptByCard) { finalMsg += ` (${playerNameStr}が親権維持発動！)`; }
          setMessage(finalMsg);
          if (giveUpEyeUsedThisTurn) { giveUpEyeUsedThisTurn = false; }

          console.log("Hiding score calculation container.");
          if (scoreCalculationAnimationEl) scoreCalculationAnimationEl.classList.remove('visible');
          if (diceAreaEl) diceAreaEl.classList.remove('calculating');
          if(scoreCalculationAnimationEl) scoreCalculationAnimationEl.innerHTML = ''; // 内容クリア

          updateUI();
          checkGameEnd(); 
          console.log("checkGameEnd called from handleRoundEnd setTimeout."); // ★ログ追加
      }, uiUpdateDelay);
 }

    // 親権維持カード使用確認
    async function askKeepParentRight(cardLevel) {
        playSound('cardUse'); // ★ SE追加
        setMessage(`親で敗北...「親権維持」を使用しますか？${cardLevel >= 3 ? ' (次ラウンド最低賭け金半額ボーナス付き)' : ''} (残${getRemainingUses('keepParentalRight') - 1}回)`, 'yesNo');
        const choice = await waitForUserChoice();
        if(choice) {
            setMessage('親権維持を使用しました！');
            return true;
        } else {
            setMessage('親権維持を使用しませんでした。');
            return false;
        }
    }

    async function checkGameEnd() { // (変更なし)
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);
        if (npcScore <= 0) { defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); gameOverReason = `${currentNpcCharacter?.name || '相手'}の持ち点を0にしました！`; addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${gameOverReason} コイン ${earnedCoins} G獲得！` }); if (gameMode === 'normal' && currentWave >= MAX_WAVES) { isC = true; await showGameResultModal(true, gameOverReason); } else if (gameMode === 'endless' || currentWave < MAX_WAVES) { console.log("NPC defeated, proceeding to shop."); await showGameResultModal(true, gameOverReason); setMessage(`${gameOverReason} コイン ${earnedCoins} G獲得！ ショップへどうぞ！`); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; historyButton.disabled = true; return; } }
        else if (playerScore <= 0) { isGO = true; gameOverReason = "持ち点が0になりました。"; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && isPlayerParent) { isGO = true; gameOverReason = `持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、親で賭けられません。`; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && !isPlayerParent && npcScore >= currentMinBet) { /* 子の場合、NPCが賭けられるなら続行可能 */ } // この条件分岐不要かも
        if (isGO || isC) { console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`); isGameActive = false; betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; maxBetButton.disabled = true; minBetButton.disabled = true; historyButton.disabled = false; currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'none'; showResultScreen(isC, playerScore, currentWave, gameOverReason); }
        else { console.log("Round end, continuing game."); if (!isGameActive && !waitingForPlayerActionAfterRoll && !isShowingRoleResult && !isShowingGameResult) { setTimeout(startBettingPhase, 100); } } // 少し遅延させて開始
    }
    function calculateEarnedCoins() { // (変更なし)
        const waveBonus = currentWave * 20; const defeatBonus = 80; const scoreGainInWave = Math.max(0, playerScore - scoreAtWaveStart); const scoreGainBonus = Math.min(30, Math.floor(scoreGainInWave * 0.05)); const overkillBonus = npcScore < 0 ? Math.min(50, Math.floor(Math.abs(npcScore) * 0.2)) : 0; const roundsTaken = Math.max(1, currentRoundInWave); const roundPenalty = Math.max(0, (roundsTaken - 1) * 20); const baseEarned = waveBonus + defeatBonus + scoreGainBonus + overkillBonus - roundPenalty; const earned = Math.min(300, Math.max(10, baseEarned)); console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, ScoreAtStart=${scoreAtWaveStart}, ScoreNow=${playerScore}, Gain=${scoreGainInWave}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`); return earned;
    }
    function calculateAndAwardCoins() { const earned = calculateEarnedCoins(); if (earned <= 0) return; const startCoins = playerCoins; playerCoins += earned; console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`); playCoinAnimation(earned); animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); if (shopCoinDisplayEl) { animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); } } // (変更なし)
    function playCoinAnimation(amount) { // (変更なし)
        if (typeof amount !== 'number' || amount <= 0 || !gameCoinDisplayEl) return;

        playSound('coin'); // ★ SE: コイン獲得音

        const numCoins = Math.min(20, Math.max(5, Math.floor(amount / 10)));

        const targetRect = gameCoinDisplayEl.getBoundingClientRect();
        if (!targetRect || targetRect.width === 0 || targetRect.height === 0) {
            console.warn("Coin animation target element not found or not visible.");
            return;
        }
        const targetX = targetRect.left + targetRect.width / 2 + window.scrollX;
        const targetY = targetRect.top + targetRect.height / 2 + window.scrollY;

        for (let i = 0; i < numCoins; i++) {
            const coin = document.createElement('div');
            coin.className = 'coin-animation';
            const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 150 + window.scrollX;
            const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 150 + window.scrollY;
            coin.style.left = `${startX}px`;
            coin.style.top = `${startY}px`;

            const deltaX = targetX - startX;
            const deltaY = targetY - startY;
            coin.style.setProperty('--tx', `${deltaX}px`);
            coin.style.setProperty('--ty', `${deltaY}px`);

            coin.style.animationDelay = `${Math.random() * 0.4}s`;
            document.body.appendChild(coin);
            coin.addEventListener('animationend', () => {
                if (coin.parentNode) {
                    coin.remove();
                }
            }, { once: true });
        }
    }
    function showResultScreen(isClear, currentScore, wave, reason = "") { // (変更なし)
        document.body.classList.remove('shake-game-over');

        if (gameMode === 'endless' && !isClear) {
            resultTitleEl.textContent = "エンドレスモード 終了";
            resultTitleEl.className = 'over';
            resultMessageEl.textContent = `到達 WAVE: ${wave}. ${reason}`;
            document.body.classList.add('shake-game-over');
            setTimeout(() => document.body.classList.remove('shake-game-over'), 800); // shake-game-over の animation-duration に合わせる
        }
        else {
            resultTitleEl.textContent = isClear ? "ゲームクリア！" : "ゲームオーバー";
            resultTitleEl.className = isClear ? 'clear' : 'over';
            resultMessageEl.textContent = isClear ? `祝！ 全${MAX_WAVES}WAVE制覇！` : `残念！ WAVE ${wave} で敗北... ${reason}`;
            if (!isClear) {
                document.body.classList.add('shake-game-over');
                setTimeout(() => document.body.classList.remove('shake-game-over'), 800); // shake-game-over の animation-duration に合わせる
            }
        }
        let finalCalcScore = 0; const coinBonus = playerCoins * 3; const clearBonus = (gameMode === 'normal' && isClear) ? MAX_WAVES * 100 : 0; const waveBonusEndless = (gameMode === 'endless') ? (wave -1) * 50 : 0; finalCalcScore = Math.max(0, totalScoreChange + coinBonus + clearBonus + waveBonusEndless); finalScoreEl.textContent = `最終スコア: ${finalCalcScore}`;
        showScreen('result-screen');
    }
     function addHistoryEntry(entry) { entry.npcName = currentNpcCharacter?.name || 'NPC不明'; gameHistory.push(entry); console.log("History entry added:", entry); } // (変更なし)
     function displayHistory() { // (変更なし)
        historyLogEl.innerHTML = ''; if (gameHistory.length === 0) { historyLogEl.innerHTML = '<li>履歴なし</li>'; return; }
        [...gameHistory].reverse().forEach(e => {
            const li = document.createElement('li'); li.className = e.result || 'unknown'; const isClearEntry = e.result === 'clear' || e.isWaveClear;
            if (isClearEntry && e.message) { li.innerHTML = `<div class="wave-clear-info">${e.message}</div>`; }
            else if (!isClearEntry || (isClearEntry && e.earnedCoins !== undefined)) { if (isClearEntry) { li.innerHTML = `<div class="wave-clear-info">WAVE ${e.wave} クリア！ コイン ${e.earnedCoins} G獲得！</div>`; } else { let resultText = ''; let resultClass = ''; if (e.result === 'win') { resultText = '勝ち'; resultClass = 'history-win'; } else if (e.result === 'lose') { resultText = '負け'; resultClass = 'history-lose'; } else { resultText = '引き分け'; resultClass = 'history-draw'; } const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : ''; const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : ''; const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${e.npcName || '相手'}${e.npcConsecutiveWins}連勝中...)</span>` : ''; const parentName = e.parentBefore === 'Player' ? (playerName || selectedCharacter?.name || 'あなた') : (e.npcName || 'NPC不明'); const parentStr = e.parentBefore ? `<span class="parent-info">(親: ${parentName})</span>` : ''; const betStr = e.betAmount > 0 ? `<span class="bet-amount">賭け金: ${e.betAmount}</span>` : ''; const playerNameForHistory = playerName || selectedCharacter?.name || 'あなた'; const npcNameForHistory = e.npcName || 'NPC不明'; li.innerHTML = ` <span class="wave-num"><span class="wave-highlight">WAVE ${e.wave}</span> - <span class="round-normal">ROUND ${e.round}</span> ${parentStr}</span> <div class="details"> <div><span class="history-result ${resultClass}">${resultText}</span> ${playerNameForHistory}: ${e.playerDice || '-'} <span class="hand">${e.playerHandName || '-'}</span></div> <div class="npc-history">${npcNameForHistory}: ${e.npcDice || '-'} <span class="hand">${e.npcHandName || '-'}</span> ${betStr}</div> </div> <div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div> `; } }
            else { console.warn("Skipping history entry due to missing/unexpected data:", e); li.innerHTML = `<span class="wave-num">WAVE ${e.wave} - ROUND ${e.round}</span> <div>履歴データエラー</div>`; li.style.color = 'red'; li.style.borderLeftColor = 'red'; }
            historyLogEl.appendChild(li);
        });
    }
    function generateSettingsCardListHtml() { // (変更なし)
        const settingsListContainer = document.getElementById('settings-card-list-inner');
        if (!settingsListContainer) {
             console.error("Element #settings-card-list-inner not found in generateSettingsCardListHtml!");
             return;
        }
        settingsListContainer.innerHTML = ''; // 内容をクリア

        const listContentElement = document.getElementById('settings-card-list-content');
        if (listContentElement) {
             listContentElement.className = 'settings-tab-content active filter-all'; // デフォルトは全表示
        } else {
            console.error("#settings-card-list-content not found for setting default filter.");
        }

        // カードソート
        const sortedCards = [...allCards].sort((a, b) => {
            if (a.rarity !== b.rarity) return b.rarity - a.rarity;
            if (a.type !== b.type) return a.type.localeCompare(b.type);
            return a.name.localeCompare(b.name, 'ja');
        });

        sortedCards.forEach(card => {
            const item = document.createElement('div');
            const isCardActive = !!card.usesPerWave;
            const cardTypeClass = isCardActive ? 'card-type-active' : 'card-type-passive';
            item.className = `card-list-item ${cardTypeClass}`; // タイプクラスを追加

            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
            const typeName = getCardTypeName(card.type);
            const typeCssClass = `type-${card.type}`;
            const rarityCssClass = `rarity-${['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal'}`;

            // ★ レベル別説明HTMLを生成
            let effectDetailsHtml = '';
            for (let level = 1; level <= MAX_CARD_LEVEL; level++) {
                effectDetailsHtml += `<div class="effect-level-title"><strong>Lv.${level}:</strong></div>`;
                const desc = getUpgradeDescription(card, level); // 説明文取得
                effectDetailsHtml += `<div class="effect-level-description">${desc}</div>`; // HTMLに追加
            }

            // item の innerHTML を設定 (詳細ボタン削除、effect-details を表示)
            item.innerHTML = `
                <h3> ${card.name} <span class="card-meta"><span class="${typeCssClass}">${typeName}</span> <span class="${rarityCssClass}">★${rarityText}</span></span> </h3>
                <p class="flavor-text">${card.flavor || '---'}</p>
                <div class="effect-details">
                    ${effectDetailsHtml}
                </div>`; // ★ effect-details を直接表示

            settingsListContainer.appendChild(item);
        });
        console.log("Generated settings card list with all level effects displayed.");
        // ★ 詳細ボタンのリスナー設定は不要なので削除
    }

    // 設定ボタンのイベントリスナー (SE追加)
    if (settingsButton && settingsModal) {
        settingsButton.addEventListener('click', () => {
            playSound('click'); // ★ SE追加
            if (cardActionModal && cardActionModal.style.display === 'flex') { cardActionModal.style.display = 'none'; }
            if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; }
            if (cardDetailModal && cardDetailModal.style.display === 'flex') { cardDetailModal.style.display = 'none'; }
            settingsModal.style.display = 'flex';
            switchSettingsTab('rules'); // デフォルトタブ
        });
    }
    if (closeSettingsModalButton && settingsModal) {
        closeSettingsModalButton.addEventListener('click', () => { playSound('click'); settingsModal.style.display = 'none'; }); // ★ SE追加
    }
    window.addEventListener('click', (event) => { // モーダル外クリック (SE不要)
        if (settingsModal && event.target === settingsModal) { settingsModal.style.display = 'none'; }
        if (historyModal && event.target === historyModal) { historyModal.style.display = 'none'; }
        if (discardModal && event.target === discardModal) { cancelDiscard(); } // cancelDiscard内でSE再生
        if (diceChoiceOverlay && event.target === diceChoiceOverlay) { hideDiceChoiceOverlay(); } // hideDiceChoiceOverlay内で処理
        if (cardActionModal && event.target === cardActionModal && !event.target.closest('.card-action-item')) {
            cardActionModal.style.display = 'none';
            if (waitingForPlayerActionAfterRoll) {
                setMessageAfterActionCancel();
            }
       }
        if (itemRevealModal && event.target === itemRevealModal) { itemRevealModal.style.display = 'none'; }
        if (cardDetailModal && event.target === cardDetailModal) { cardDetailModal.style.display = 'none'; }
    });
    settingsNavButtons.forEach(button => { // 設定タブ切り替え (SE追加)
        if (button.dataset.target) {
            button.addEventListener('click', () => { playSound('click'); switchSettingsTab(button.dataset.target); }); // ★ SE追加
        }
    });
    function switchSettingsTab(targetId) { // (変更なし)
        if (!settingsContent) { console.error("Element #settings-content not found in switchSettingsTab!"); return; }
        settingsNavButtons.forEach(btn => btn.classList.remove('active'));
        settingsContent.querySelectorAll('.settings-tab-content').forEach(content => content.classList.remove('active'));
        const activeButton = document.querySelector(`.settings-nav-button[data-target="${targetId}"]`);
        if (activeButton) { activeButton.classList.add('active'); }
        else { console.warn(`No settings navigation button found for target: ${targetId}`); }
        if (targetId === 'card-list') { generateSettingsCardListHtml(); }
        else if (targetId === 'roles') { updateRoleRatesDisplay(); }
        const activeContent = document.getElementById(`settings-${targetId}-content`);
        if (activeContent) { activeContent.classList.add('active'); console.log(`Switched settings tab to: ${targetId}`); }
        else { console.error(`Settings content element not found for ID: settings-${targetId}-content`); const firstTabContent = settingsContent.querySelector('.settings-tab-content'); const firstNavButton = settingsContent.querySelector('.settings-nav-button'); if (firstTabContent && firstNavButton) { firstTabContent.classList.add('active'); if(firstNavButton) firstNavButton.classList.add('active'); console.warn(`Falling back to first settings tab: ${firstTabContent.id}`); if (firstTabContent.id === 'settings-roles-content') { updateRoleRatesDisplay(); } } }
    }
    const filterTabContainer = document.querySelector('.card-list-filter-tabs'); // カードリストフィルタ (SE追加)
    if (filterTabContainer) {
        filterTabContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-tab')) {
                playSound('click'); // ★ SE追加
                const filterType = event.target.dataset.filter;
                const listContentElement = document.getElementById('settings-card-list-content');
                const tabs = filterTabContainer.querySelectorAll('.filter-tab');
                if (listContentElement && tabs) {
                    tabs.forEach(tab => tab.classList.remove('active')); event.target.classList.add('active');
                    listContentElement.className = `settings-tab-content active filter-${filterType}`; console.log(`Card list filter changed to: ${filterType}`);
                } else { console.error("Required elements not found for filtering card list."); }
            }
        });
    } else { console.error(".card-list-filter-tabs container not found."); }
    function openCardActionModal() { // (変更なし - SEは呼び出し元で再生)
        if (!cardActionModal) { console.error("Element #card-action-modal not found!"); return; }
        if (settingsModal && settingsModal.style.display === 'flex') { settingsModal.style.display = 'none'; }
        if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; }
        if (cardDetailModal && cardDetailModal.style.display === 'flex') { cardDetailModal.style.display = 'none'; } // ★ 詳細モーダルも閉じる
        console.log("Opening Card Action Modal"); displayCardsInModal(); cardActionModal.style.display = 'flex';
    }
    function displayCardsInModal() { // (変更なし)
        const activeCardDisplay = document.getElementById('active-card-display');
        const passiveCardDisplay = document.getElementById('passive-card-display');
        const activeCardMessage = document.getElementById('active-card-message');
        const passiveCardMessage = document.getElementById('passive-card-message');
        if (!activeCardDisplay || !passiveCardDisplay || !activeCardMessage || !passiveCardMessage) {
            console.error("Required elements for card action modal not found!");
            return;
        }

        activeCardMessage.textContent = "使用したいカードを選択してください。";

        activeCardDisplay.innerHTML = ''; passiveCardDisplay.innerHTML = ''; activeCardDisplay.classList.remove('empty'); passiveCardDisplay.classList.remove('empty');
        let activeCards = []; let passiveCards = [];
        playerCards.forEach(cardData => { const card = allCards.find(c => c.id === cardData.id); if (!card) return; const isCardActive = !!card.usesPerWave; if (isCardActive) { activeCards.push(cardData); } else { passiveCards.push(cardData); } });

        let usableActiveCardFound = false;
        if (activeCards.length === 0) {
            activeCardMessage.textContent = "使用可能なカードはありません。";
            activeCardDisplay.classList.add('empty');
            activeCardDisplay.textContent = "(手札にアクティブカードがありません)";
        } else {
            activeCards.forEach(cardData => {
                const card = allCards.find(c => c.id === cardData.id);
                const cardElement = document.createElement('div');
                const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
                cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass}`;
                cardElement.dataset.cardId = cardData.id;

                const isUsable = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardData.id) : checkCardUsability(cardData.id);
                const remainingUses = getRemainingUses(cardData.id);
                const totalUses = getTotalUses(cardData.id);

                // ボタンHTML生成
                const detailButtonHtml = `<button class="card-detail-button button-subtle" data-card-id="${cardData.id}" data-current-level="${cardData.level}">詳細</button>`;
                let useButtonHtml = '';
                if (totalUses !== Infinity) {
                    useButtonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`;
                    if (remainingUses <= 0) {
                        cardElement.classList.add('used-up');
                        useButtonHtml = '';
                    } else if (isUsable) {
                        cardElement.classList.add('usable');
                        usableActiveCardFound = true;
                    }
                } else {
                    useButtonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`;
                     if (isUsable) {
                        cardElement.classList.add('usable');
                        usableActiveCardFound = true;
                    }
                }

                const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
                const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
                const currentLevel = cardData.level;
                const levelColorClass = currentLevel === 3 ? 'card-level-value-3' : (currentLevel === 2 ? 'card-level-value-2' : '');
                let levelSpanHtml = `<span class="card-level ${levelColorClass}">[Lv.${currentLevel}]</span>`;
                const cardNameHtml = `${card.name}`;
                const cardInnerHtml = `
                    <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                    ${rarityBadgeHtml}
                    <h3 class="card-name">${cardNameHtml}</h3>
                    ${levelSpanHtml}
                    <div class="card-item-footer"> ${detailButtonHtml} ${useButtonHtml} </div>`;
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                // ★★★ イベントリスナーをここで設定 ★★★
                const detailBtn = cardElement.querySelector('.card-detail-button');
                if (detailBtn) {
                    detailBtn.addEventListener('click', handleDetailButtonClick); // SE不要箇所
                }
                const useBtn = cardElement.querySelector('.use-card-button');
                if (useBtn) {
                    useBtn.addEventListener('click', handleActiveCardUse); // handleActiveCardUse 内でSE再生
                }

                activeCardDisplay.appendChild(cardElement);
            });
            if (!usableActiveCardFound && activeCards.length > 0) {
                 activeCardMessage.textContent = "現在使用できるカードはありません。";
            }
        }

        if (passiveCards.length === 0) {
            passiveCardMessage.textContent = "装備中のカードはありません。";
            passiveCardDisplay.classList.add('empty');
            passiveCardDisplay.textContent = "(手札にパッシブカードがありません)";
        } else {
            passiveCardMessage.textContent = "現在装備中のカードです。";
            passiveCards.forEach(cardData => {
                const card = allCards.find(c => c.id === cardData.id);
                const cardElement = document.createElement('div');
                const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
                cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass} passive`;
                cardElement.dataset.cardId = cardData.id;

                const detailButtonHtml = `<button class="card-detail-button button-subtle" data-card-id="${cardData.id}" data-current-level="${cardData.level}">詳細</button>`;

                const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
                const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
                const currentLevel = cardData.level;
                const levelColorClass = currentLevel === 3 ? 'card-level-value-3' : (currentLevel === 2 ? 'card-level-value-2' : '');
                let levelSpanHtml = `<span class="card-level ${levelColorClass}">[Lv.${currentLevel}]</span>`;
                const cardNameHtml = `${card.name}`;
                const cardInnerHtml = `
                    <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                    ${rarityBadgeHtml}
                    <h3 class="card-name">${cardNameHtml}</h3>
                    ${levelSpanHtml}
                    <div class="card-item-footer"> ${detailButtonHtml} </div>`;
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                // ★★★ イベントリスナーをここで設定 ★★★
                const detailBtn = cardElement.querySelector('.card-detail-button');
                if (detailBtn) {
                    detailBtn.addEventListener('click', handleDetailButtonClick); // SE不要箇所
                }

                passiveCardDisplay.appendChild(cardElement);
            });
        }
    } // <-- displayCardsInModal 関数の終了
    if (closeCardActionModalButton && cardActionModal) { // (SE追加)
        closeCardActionModalButton.addEventListener('click', () => {
            playSound('click'); // ★ SE追加
            cardActionModal.style.display = 'none';
            if (waitingForPlayerActionAfterRoll) {
                 setMessageAfterActionCancel();
            }
        });
    }
    const activeCardDisplayForEvent = document.getElementById('active-card-display'); // カード使用ボタン (変更なし - handleActiveCardUse内でSE)
    if(activeCardDisplayForEvent) {
        activeCardDisplayForEvent.addEventListener('click', async (event) => {
            // 使用ボタンがクリックされた場合のみ処理
            if (event.target.matches('.use-card-button:not(:disabled)')) {
                 const cardId = event.target.dataset.cardId;
                 if (cardId) {
                      cardActionModal.style.display = 'none';
                      await handleActiveCardUse(cardId); // 直接IDを渡す
                 }
             }
        });
    }
    if (cardActionButton) { 
        cardActionButton.addEventListener('click', () => { playSound('cardButton'); if (settingsModal && settingsModal.style.display === 'flex') { settingsModal.style.display = 'none'; } if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; } if (cardDetailModal && cardDetailModal.style.display === 'flex') { cardDetailModal.style.display = 'none'; } openCardActionModal(); });
    }

    // === アクティブカード使用処理 === (変更なし - 内部でSE再生)
    async function handleActiveCardUse(eventOrCardId) {
        let cardId = null;
        if (typeof eventOrCardId === 'string') {
             cardId = eventOrCardId;
        } else if (eventOrCardId && eventOrCardId.target && eventOrCardId.target.dataset.cardId) {
             cardId = eventOrCardId.target.dataset.cardId; // イベントオブジェクトから取得
        } else {
             console.error("Invalid cardId passed to handleActiveCardUse", eventOrCardId);
             return;
        }

        const playerCardData = playerCards.find(c => c.id === cardId);
        const isUsableNow = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardId) : checkCardUsability(cardId);

        if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !isUsableNow || isShowingRoleResult || isShowingGameResult) {
            console.log(`Card ${cardId} cannot be used now. Active: ${activeCardBeingUsed}, WaitingChoice: ${waitingForUserChoice}, UsableNow: ${isUsableNow}, ShowingRoleResult: ${isShowingRoleResult}, ShowingGameResult: ${isShowingGameResult}`);
            if (!isUsableNow && !activeCardBeingUsed) {
                 playSound('error'); // 使用不可の場合はエラー音
            }
            if (waitingForPlayerActionAfterRoll && cardActionModal && cardActionModal.style.display === 'none' && !isShowingRoleResult && !isShowingGameResult) {
                 // setMessageAfterActionCancel(); // 必要に応じて
            }
             // activeCardBeingUsed = null; // ★ ここで解除しない
            return;
        }
        const card = allCards.find(c => c.id === cardId); if (!card) return;

        playSound('cardUse'); // ★ SE: カード使用試行音

        console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
        activeCardBeingUsed = cardId; // ★ カード使用開始時にロック

        if (cardId === 'doubleUpBet') activeCardUses['doubleUpBet_roundStartCount'] = activeCardUses['doubleUpBet'] || 0;
        if (cardId === 'rewardAmplifier') activeCardUses['rewardAmplifier_roundStartCount'] = activeCardUses['rewardAmplifier'] || 0;

        let useConsumed = true;
        let requiresDelay = false;
        let turnEnd = false;
        let postUseMessage = "";
        let requiresRoll = false;
        let requiresNPCAction = false;
        let requiresPlayerAction = false; // ★ アクション選択に戻るかのフラグ（デフォルトfalse）

        // --- カード効果分岐 ---
        if (['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
            // これらのカードはダイス選択が必要
            showDiceChoiceOverlay(cardId);
            useConsumed = false; // ダイス選択完了時に消費
            // activeCardBeingUsed は showDiceChoiceOverlay 内で設定されるのでここでは解除しない
            return; // ダイス選択待ちのためここで処理終了
        }
        // changeEyeToOne, changeEyeToSix の処理をここに追加
        else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) {
            if (playerHand?.type === '目') {
                const eyeValue = playerHand.value; // 目としてカウントされている数字
                let targetValue = cardId === 'changeEyeToOne' ? 1 : 6;
                let changed = false;
                let newDice = [...playerDice];
                for (let i = 0; i < newDice.length; i++) {
                    if (newDice[i] === eyeValue) {
                        newDice[i] = targetValue;
                        postUseMessage = `「${eyeValue}」の目を「${targetValue}」に変更しました。`;
                        changed = true;
                        break; // 1つだけ変更
                    }
                }
                if (changed) {
                    playerDice = newDice; // ダイス更新
                    // 手札再評価
                    const result = getHandResult(playerDice, false, 0, 0);
                    const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
                    playerHand = rk ? { ...ROLES[rk], ...result } : result;
                    console.log("Re-evaluated hand after changeEye:", playerHand);
                    if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                    highlightHand(playerHandEl, playerHand);
                    if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                    diceDisplayEl.textContent = playerDice.join(' ');
                    useConsumed = true;
                    requiresPlayerAction = true; // ★ カード使用後、再度アクション選択に戻る
                } else {
                    postUseMessage = `エラー：対象の目が見つかりませんでした。`;
                    useConsumed = false;
                }
            } else {
                 postUseMessage = `このカードは「目」が出ている時しか使用できません。`;
                 useConsumed = false; // 使えなかったので消費しない
            }
        }
        else if (cardId === 'ignoreMinBet') { ignoreMinBetActive = true; postUseMessage = `最低賭け金が1になりました。`; requiresDelay = true; }
        else if (cardId === 'zoroChanceUp') { zoroChanceUpActive = true; postUseMessage = `このラウンド中、ゾロ目確率UP！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'avoid123_456') { avoid123_456Active = true; postUseMessage = `このラウンド中、役回避！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'blessingDice') { blessingDiceActive = true; postUseMessage = `このラウンド中、6が出やすくなります。`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'stormWarning') { stormWarningActive = true; postUseMessage = `次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'riskyBet') { riskyBetActive = true; postUseMessage = `危険な賭け！賭け金決定時に効果が適用されます。`; requiresDelay = true; }
        else if (cardId === 'giveUpEye') {
            playerHand = { ...ROLES.SHONBEN, type: 'ションベン' }; giveUpEyeUsedThisTurn = true; useConsumed = true; turnEnd = true;
            postUseMessage = `見切り使用！ションベン扱いになります。`; updateUI(); highlightHand(playerHandEl, playerHand); rollButton.disabled = true; isPlayerTurn = false;
        }
        else if (cardId === 'doubleUpBet') { doubleUpBetActive = true; useConsumed = true; turnEnd = true; postUseMessage = "ダブルアップ準備完了！勝負！"; requiresDelay = true; }
        else if (cardId === 'blindingDice') { blindingDiceActive = true; requiresDelay = true; requiresNPCAction = true; postUseMessage = `目くらまし！このラウンド中、相手のロールに影響します。`; }
        else if (cardId === 'soulRoll') {
             const costPercent = [10, 5, 5][playerCardData.level - 1]; const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
             if (playerScore < cost) { playSound('error'); postUseMessage = `魂の一振りのコスト(${cost}点)を払えません！`; useConsumed = false; }
             else { playerScore -= cost; soulRollUsedThisTurn = true; postUseMessage = `魂の一振り！${cost}点を消費して追加ロール！ サイコロを振ってください。`; requiresRoll = true; updateUI(); }
        }
        else if (cardId === 'rewardAmplifier') { rewardAmplifierActive = true; turnEnd = true; postUseMessage = `報酬増幅！このラウンドの役での勝利時、配当倍率が増加します。`; requiresDelay = true; }
        else if (cardId === 'drawBonus') { drawBonusActive = true; turnEnd = true; postUseMessage = `引き分けボーナス準備完了！このラウンド引き分け時に効果発動。`; requiresDelay = true; useConsumed = false; } // ★ drawBonus は消費タイミングが特殊
        else { console.warn(`Active card effect for ${cardId} is not fully implemented yet.`); postUseMessage = `カード「${card.name}」の効果処理が未実装です。`; useConsumed = false; }

        // --- 処理分岐前の共通処理 ---
        if (useConsumed && card.usesPerWave && cardId !== 'drawBonus') {
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            postUseMessage += ` (残${getRemainingUses(cardId)}/${getTotalUses(cardId)})`;
            console.log(`Used card ${cardId}. Remaining uses: ${getRemainingUses(cardId)}`);
        }

        // --- 処理分岐 ---
        if (waitingForPlayerActionAfterRoll && useConsumed) {
            waitingForPlayerActionAfterRoll = false; // ダイス選択系以外はここで解除
            messageButtonContainer.innerHTML = '';
        }

        setMessage(postUseMessage);
        if (requiresDelay) await new Promise(resolve => setTimeout(resolve, 800));

        activeCardBeingUsed = null; // ★ 効果処理完了後にロック解除

        if (turnEnd) {
            rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
            setMessage(postUseMessage + (cardId === 'giveUpEye' ? " 負けです。" : "")); // 勝負メッセージはhandleRoundEndで表示
            // ★ showRoleResultModal は不要。handleRoundEnd内で表示される。
            setTimeout(handleRoundEnd, 100); // スコア計算へ
        } else if (requiresNPCAction) {
            rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
            setMessage(postUseMessage + ` ${currentNpcCharacter?.name || '相手'}の番です。`);
            setTimeout(npcTurn, 1400);
        } else if (requiresRoll) {
            rollButton.disabled = false; historyButton.disabled = false; isPlayerTurn = true;
            if (cardId !== 'soulRoll') { setMessage(postUseMessage + " サイコロを振ってください。"); }
        } else if (requiresPlayerAction) { // ★ 目変更カード使用後など
             await handlePostRollPlayerAction(); // 再度アクション選択へ
        } else if (useConsumed) {
            // 使用したがターン終了でもロール要求でもNPCアクションでもない場合 (例: ignoreMinBetなど)
             historyButton.disabled = false;
             if (!isGameActive && isPlayerParent) updateBetLimits();
        } else { // 使用がキャンセルされた場合 (コスト不足など)
             playSound('error'); // ★ SE: 使用キャンセル/失敗
             historyButton.disabled = false;
             if (waitingForPlayerActionAfterRoll) { // ロール後のキャンセルならアクション選択に戻る
                 setMessageAfterActionCancel(card.name + "は使用できませんでした");
                 rollButton.disabled = true;
             } else if(!isGameActive && isPlayerParent){
                  updateBetLimits();
             }
        }

        updateUI();
        updateCardButtonHighlight();
    }


    function checkCardUsability(cardId) { // (変更なし)
        const cardData = playerCards.find(c => c.id === cardId); const card = allCards.find(c => c.id === cardId); if (!cardData || !card) return false; if (!card.usesPerWave) return false; const remainingUses = getRemainingUses(cardId); if (remainingUses <= 0) return false; if (activeCardBeingUsed || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return false;
        const isBetPhase = !isGameActive && isPlayerParent && !waitingForPlayerActionAfterRoll; const isPlayerRollPhase = isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls && !waitingForPlayerActionAfterRoll;
        switch (card.id) { case 'ignoreMinBet': return isBetPhase && !ignoreMinBetActive; case 'riskyBet': return isBetPhase && !riskyBetActive; case 'zoroChanceUp': return isPlayerRollPhase && !zoroChanceUpActive; case 'avoid123_456': return isPlayerRollPhase && !avoid123_456Active; case 'blessingDice': return isPlayerRollPhase && !blessingDiceActive; case 'stormWarning': return isPlayerRollPhase && !stormWarningActive; default: return false; }
    }
    function getRemainingUses(cardId) { // (変更なし)
         const cardData = playerCards.find(c => c.id === cardId);
         const card = allCards.find(c => c.id === cardId);
         if (!cardData || !card || !card.usesPerWave) return Infinity; // パッシブや定義なしは無限
         const totalUses = getTotalUses(cardId);
         return totalUses - (activeCardUses[cardId] || 0);
    }
    function showDiceChoiceOverlay(cardId) { // (変更なし)
        if (!diceChoiceOverlay || isShowingRoleResult || isShowingGameResult) return;
        const card = allCards.find(c => c.id === cardId);
        const playerCardData = playerCards.find(c => c.id === cardId);
        if (!card || !playerCardData) { hideDiceChoiceOverlay(); return; }
        let title = `${card.name} [Lv.${playerCardData.level}]`;
        let instruction = "";
        let diceIndicesToSelect = [];
        let requiresAdjustChoice = false;
        let requiresNextChanceCount = 0;
        let nextChanceCanSelectTwo = false;

        if (['changeToOne', 'changeToSix'].includes(cardId)) {
            instruction = "変更するサイコロを選んでください";
            if (playerHand?.type === '目なし') {
                diceIndicesToSelect = [0, 1, 2];
            } else {
                console.warn(`Card ${cardId} used without Menashi hand? Hand: ${playerHand?.type}`);
                setMessage("このカードは目なしの時にしか使用できません。");
                hideDiceChoiceOverlay();
                activeCardBeingUsed = null;
                setMessageAfterActionCancel(card.name);
                return;
            }
        } else if (cardId === 'adjustEye') {
            if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; setMessageAfterActionCancel(card.name); return; }
            instruction = `調整する「${playerHand.value}以外の目」を選んでください`;
            playerDice.forEach((diceValue, index) => { if (diceValue !== playerHand.value) diceIndicesToSelect.push(index); });
            if (diceIndicesToSelect.length > 0) { requiresAdjustChoice = true; }
        } else if (cardId === 'nextChance') {
            if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; setMessageAfterActionCancel(card.name); return; }
            nextChanceCanSelectTwo = playerCardData.level >= 2;
            requiresNextChanceCount = nextChanceCanSelectTwo ? 2 : 1;
            instruction = `振り直す「${playerHand.value}の目」を${requiresNextChanceCount === 2 ? '最大2つまで' : '1つ'}選んでください`;
            playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
        } else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) { // ★ 追加
            if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; setMessageAfterActionCancel(card.name); return; }
            instruction = `変更する「${playerHand.value}の目」を選んでください`;
             playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
        } else {
            console.warn("showDiceChoiceOverlay called for unexpected card:", cardId); // 想定外のカード
            hideDiceChoiceOverlay();
            return;
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
                    button.onclick = () => { playSound('click'); showAdjustOptions(index); }; // ★ SE追加
                } else {
                    button.onclick = handleDiceChoice; // handleDiceChoice内でSE
                }
                buttonContainer.appendChild(button);
            });
        }
        const cancelButton = document.createElement('button');
        cancelButton.className = 'button-subtle';
        cancelButton.textContent = 'キャンセル';
        cancelButton.style.marginTop = '15px';
        cancelButton.onclick = () => { playSound('click'); hideDiceChoiceOverlay(); }; // ★ SE追加
        buttonContainer.appendChild(cancelButton);
        diceChoiceOverlay.appendChild(buttonContainer);
        diceChoiceOverlay.style.display = 'flex';
        rollButton.disabled = true;
        historyButton.disabled = true;
        activeCardBeingUsed = cardId;
    }
    function showAdjustOptions(diceIndex) { // (変更なし)
         const cardId = activeCardBeingUsed; const playerCardData = playerCards.find(c => c.id === cardId); if (!playerCardData) { hideDiceChoiceOverlay(); return; } const adjustAmount = (playerCardData.level >= 3) ? 2 : 1; const originalValue = playerDice[diceIndex]; diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？</p>`; const buttonContainer = document.createElement('div'); buttonContainer.className = 'dice-choice-buttons'; if (originalValue + adjustAmount <= 6) { const plusButton = document.createElement('button'); plusButton.className = 'dice-choice-button button-pop'; plusButton.textContent = `+${adjustAmount} (→ ${originalValue + adjustAmount})`; plusButton.dataset.diceIndex = diceIndex; plusButton.dataset.adjustDir = 'plus'; plusButton.onclick = handleDiceChoice; buttonContainer.appendChild(plusButton); } if (originalValue - adjustAmount >= 1) { const minusButton = document.createElement('button'); minusButton.className = 'dice-choice-button button-pop'; minusButton.textContent = `-${adjustAmount} (→ ${originalValue - adjustAmount})`; minusButton.dataset.diceIndex = diceIndex; minusButton.dataset.adjustDir = 'minus'; minusButton.onclick = handleDiceChoice; buttonContainer.appendChild(minusButton); } if (buttonContainer.children.length === 0) { buttonContainer.innerHTML = "<p>この目は調整できません。</p>"; } const cancelButton = document.createElement('button'); cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル'; cancelButton.style.marginTop = '15px'; cancelButton.onclick = () => { playSound('click'); hideDiceChoiceOverlay(); }; buttonContainer.appendChild(cancelButton); diceChoiceOverlay.appendChild(buttonContainer);
    }
    function hideDiceChoiceOverlay() { // (変更なし)
        if (diceChoiceOverlay) diceChoiceOverlay.style.display = 'none';
        const cancelledCardId = activeCardBeingUsed;
        activeCardBeingUsed = null;

        if (cancelledCardId && waitingForPlayerActionAfterRoll) {
             const cardName = allCards.find(c=>c.id === cancelledCardId)?.name || '不明';
             setMessageAfterActionCancel(cardName);
        } else {
             if (!isGameActive) {
                // ベットフェーズでのキャンセル等
                // setMessage("操作をキャンセルしました。"); // メッセージ上書きしない方が良いかも
                updateBetLimits();
            }
             // ロール可能ならロールボタンを有効化
             if (isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls) {
                rollButton.disabled = false;
             }
             historyButton.disabled = false;
        }
        updateCardButtonHighlight();
    }
    function setMessageAfterActionCancel(cancelledCardName = "") { // (変更なし)
        const handName = getHandDisplayName(playerHand);
        const canReroll = playerRollCount < currentMaxRolls;
        const hasStormWarningReroll = stormWarningRerollsLeft > 0;
        const soulRollAvailable = playerCards.find(c => c.id === 'soulRoll') && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
        let rerollStatus = "";
        if (canReroll || hasStormWarningReroll) rerollStatus = "(振り直し可能)";
        else if (soulRollAvailable) rerollStatus = "(魂の一振り使用可能)";
        else rerollStatus = "(振り直し不可)";

        let messageText = "";
        if (cancelledCardName) {
            messageText = `カード「${cancelledCardName}」の使用をキャンセルしました。 `;
        }
        if (playerHand?.type === '目なし') {
            messageText += `目なし！どうしますか？ ${rerollStatus}`;
        } else if (playerHand?.type === '役' || playerHand?.type === '目') {
            messageText += `${handName}！どうしますか？`;
        } else {
            messageText += "操作をキャンセルしました。"; // ションベン等の場合
        }

        setMessage(messageText, 'postRollChoice');
        // ロール可能か再チェックしてボタン状態を設定
        rollButton.disabled = !(canReroll || hasStormWarningReroll);
        historyButton.disabled = false;
        updateCardButtonHighlight();
        updateBetLimits();
    }
    async function handleDiceChoice(event) { // (変更なし)
        playSound('click'); // ★ SE追加
        const button = event.target;
        const diceIndex = parseInt(button.dataset.diceIndex);
        const adjustDir = button.dataset.adjustDir;
        const cardId = activeCardBeingUsed;
        const playerCardData = playerCards.find(c => c.id === cardId);

        if (isNaN(diceIndex) || !cardId || !playerCardData || !playerDice || playerDice.length !== 3 || isShowingRoleResult || isShowingGameResult) {
            console.error("Invalid state for dice choice:", diceIndex, cardId, playerDice, isShowingRoleResult, isShowingGameResult);
            hideDiceChoiceOverlay(); // ★ ここで overlay を隠し、activeCardBeingUsed も解除される
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
        let useConsumed = true; // デフォルトで使用回数を消費

        if (['changeToOne', 'changeToSix'].includes(cardId)) {
            const newValue = cardId === 'changeToOne' ? 1 : 6;
            newDice[diceIndex] = newValue;
            message = `サイコロを ${newValue} に変更しました。`;
        } else if (cardId === 'adjustEye' && adjustDir) {
            const adjustAmount = (playerCardData.level >= 3) ? 2 : 1;
            let originalValue = newDice[diceIndex];
            let adjustedValue = originalValue;
            if (adjustDir === 'plus') { adjustedValue = Math.min(6, originalValue + adjustAmount); }
            else if (adjustDir === 'minus') { adjustedValue = Math.max(1, originalValue - adjustAmount); }
            if (adjustedValue !== originalValue) {
                newDice[diceIndex] = adjustedValue;
                message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
                adjustEyeUsedThisTurn = true;
            } else {
                message = "調整しても値が変わりませんでした。";
                useConsumed = false;
            }
        } else if (cardId === 'nextChance') {
            const originalValue = newDice[diceIndex];
            newDice[diceIndex] = rollSingleDice();
            message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`;
            nextChanceUsedThisTurn = true;
        } else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) {
            const targetValue = cardId === 'changeEyeToOne' ? 1 : 6;
            const originalValue = newDice[diceIndex];
            // 対象のダイスかどうかは showDiceChoiceOverlay でフィルタリング済みのはず
            newDice[diceIndex] = targetValue;
            message = `「${originalValue}」の目を「${targetValue}」に変更しました。`;
        } else {
            console.error("Unhandled card type in handleDiceChoice:", cardId);
            hideDiceChoiceOverlay();
            return;
        }

        hideDiceChoiceOverlay();

        if (!useConsumed) {
             playSound('error'); // 効果なしエラー音
             setMessage(message);
             // ★ キャンセルではなく効果がなかった場合なので、アクション選択に戻る
             if(activeCardBeingUsed === null && waitingForPlayerActionAfterRoll){ // hideOverlayでnullになってるはず
                setMessageAfterActionCancel(card.name + "の効果はありませんでした");
             }
             return;
        }

        // ダイスと手札を更新
        playerDice = newDice;
        if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
        diceDisplayEl.textContent = playerDice.join(' ');
        const result = getHandResult(playerDice, false, 0, 0);
        const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
        playerHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("Re-evaluated hand:", playerHand);
        if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
        highlightHand(playerHandEl, playerHand);

        // 使用回数カウント
        if (card.usesPerWave) {
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            const remainingUses = getRemainingUses(cardId);
            message += ` (残${remainingUses}/${getTotalUses(cardId)})`;
            console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`);
        }

        setMessage(message); // 適用メッセージを表示
        await handlePostRollPlayerAction(); // ロール後と同じ処理を呼び出す
    }
     function getTotalUses(cardIdentifier) { // (変更なし)
        let cardId = null;
        let level = 1; // デフォルトレベル

        if (typeof cardIdentifier === 'string') {
            cardId = cardIdentifier;
            const cardData = playerCards.find(c => c.id === cardId);
            if (cardData) {
                level = cardData.level;
            }
        } else if (typeof cardIdentifier === 'object' && cardIdentifier.id) {
            cardId = cardIdentifier.id;
            level = cardIdentifier.level || 1; // オブジェクトにレベルがあればそれを使う
        } else {
            console.error("Invalid identifier passed to getTotalUses:", cardIdentifier);
            return Infinity;
        }

        const card = allCards.find(c => c.id === cardId);
        if (!card || !card.usesPerWave) return Infinity;

        let totalUses = 0;

        switch (card.id) {
            case 'ignoreMinBet':
            case 'changeToOne':
            case 'changeToSix':
            case 'giveUpEye':
            case 'changeEyeToOne':
            case 'changeEyeToSix':
                totalUses = level;
                break;
            case 'keepParentalRight':
            case 'adjustEye':
            case 'avoid123_456':
                totalUses = (level >= 2) ? 2 : 1;
                break;
            case 'drawBonus':
                totalUses = (level >= 3) ? 3 : (level === 2 ? 2 : 1);
                break;
            case 'rewardAmplifier':
            case 'riskyBet':
            case 'zoroChanceUp':
            case 'blessingDice':
            case 'nextChance':
                totalUses = (level >= 3) ? 2 : 1;
                break;
            case 'stormWarning':
            case 'soulRoll':
            case 'doubleUpBet':
            case 'blindingDice':
                totalUses = 1;
                break;
            default:
                totalUses = card.usesPerWave || 1;
                console.warn(`Card ${cardId} usesPerWave might not be explicitly handled by level. Using base value: ${totalUses}`);
                break;
        }
        return totalUses;
    }
      function checkCardUsabilityInPostRoll(cardId) {
        const cardData = playerCards.find(c => c.id === cardId);
        const card = allCards.find(c => c.id === cardId);
        if (!cardData || !card || !card.usesPerWave) return false;
        const remainingUses = getRemainingUses(cardId);
        if (remainingUses <= 0) return false;
        if(isShowingRoleResult || isShowingGameResult || activeCardBeingUsed) return false;
        const isPlayerPostRollMenashi = playerHand?.type === '目なし';
        const isPlayerPostRollEye = playerHand?.type === '目';
        const isPlayerPostRollYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目';
        const isOutOfRolls = playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0;

        switch (card.id) {
            case 'changeToOne':
            case 'changeToSix':
                return isPlayerPostRollMenashi;
            case 'giveUpEye': return isPlayerPostRollMenashi && !giveUpEyeUsedThisTurn;
            case 'adjustEye': return isPlayerPostRollEye && !adjustEyeUsedThisTurn;
            case 'nextChance': return isPlayerPostRollEye && !nextChanceUsedThisTurn;
            case 'changeEyeToOne':
            case 'changeEyeToSix':
                return isPlayerPostRollEye; // 「目」の場合のみ使用可能
            case 'doubleUpBet': return isPlayerPostRollYakuOrEye && !isPlayerParent && !doubleUpBetActive;
            case 'blindingDice': return isPlayerPostRollYakuOrEye && isPlayerParent && !blindingDiceActive;
            case 'rewardAmplifier': return isPlayerPostRollYakuOrEye && !rewardAmplifierActive;
            case 'drawBonus': return isPlayerPostRollYakuOrEye && !drawBonusActive; // 目なしでは使えないように
            case 'soulRoll': return isPlayerPostRollMenashi && isOutOfRolls && !soulRollUsedThisTurn;
            default: return false;
        }
    }

    // --- アイテム獲得演出モーダル関数 ---
    function showItemRevealModal(data) {
        return new Promise(resolve => {
            if (!itemRevealModal || !itemRevealContent || !data || !data.item) {
                console.error("Cannot show item reveal modal: Missing elements or data.");
                resolve();
                return;
            }

            const item = data.item;
            const source = data.source || 'unknown';
            const level = data.level || 1;
            const packName = data.packName || '';

            let title = "アイテム獲得！";
            if (source.startsWith('pack')) title = `${packName} から出現！`;
            else if (source === 'upgrade') title = "カード強化完了！";
            else if (source === 'boost') title = "永続強化獲得！";

            const rarity = item.rarity || 1;
            const rarityClass = `rarity-${['normal', 'rare', 'epic', 'legendary'][rarity - 1] || 'normal'}`;
            const rarityText = ['N', 'R', 'EP', 'LG'][rarity - 1] || 'N';

            let typeName = '';
            let typeClass = '';
            if (item.itemType === 'card' || allCards.find(c => c.id === item.id)) {
                const cardDef = allCards.find(c => c.id === item.id);
                if (cardDef) {
                    typeName = getCardTypeName(cardDef.type);
                    typeClass = `type-${cardDef.type}`;
                }
            } else if (item.itemType === 'boost') {
                typeName = '永続強化';
                typeClass = 'type-boost';
            } else if (item.itemType === 'pack') {
                typeName = 'パック';
                typeClass = 'type-pack';
            }

            if(itemRevealTitleEl) itemRevealTitleEl.textContent = title;
            if(itemRevealNameEl) itemRevealNameEl.textContent = item.name || '不明なアイテム';

            if(itemRevealImageEl && itemRevealPlaceholderEl) {
                if (item.image) {
                    itemRevealImageEl.src = item.image;
                    itemRevealImageEl.alt = item.name || '';
                    itemRevealImageEl.style.display = 'block';
                    itemRevealPlaceholderEl.style.display = 'none';
                    itemRevealImageEl.onerror = () => {
                        itemRevealImageEl.style.display = 'none';
                        itemRevealPlaceholderEl.textContent = '画像読込失敗';
                        itemRevealPlaceholderEl.style.display = 'block';
                    };
                } else {
                    itemRevealImageEl.style.display = 'none';
                    itemRevealPlaceholderEl.textContent = '画像なし';
                    itemRevealPlaceholderEl.style.display = 'block';
                }
            }

            if(itemRevealRarityEl) {
                itemRevealRarityEl.textContent = rarityText;
                itemRevealRarityEl.className = `rarity-badge ${rarityClass}`;
            }
            if(itemRevealTypeEl) {
                itemRevealTypeEl.textContent = typeName;
                itemRevealTypeEl.className = `type-badge ${typeClass}`;
            }

            let description = item.flavor || item.description || '---';
            if (item.itemType === 'card' && !item.flavor) {
                 const cardDef = allCards.find(c => c.id === item.id);
                 if (cardDef) {
                     description = cardDef.flavor || cardDef.description || '---'; // Flavor優先、なければDescription
                 }
            }
            if(itemRevealDescriptionEl) {
                itemRevealDescriptionEl.style.display = 'none'; // 獲得演出では非表示
            }


            if(itemRevealLevelEl) {
                if (source === 'upgrade' || source === 'pack_upgrade') {
                    itemRevealLevelEl.textContent = `Lv. ${level}`;
                    itemRevealLevelEl.style.display = 'block';
                } else {
                    itemRevealLevelEl.style.display = 'none';
                }
            }

            if(itemRevealContent) {
                itemRevealContent.className = `modal-content item-reveal-content ${rarityClass}`;
            }

            if (source === 'pack_empty') {
                if(itemRevealNameEl) itemRevealNameEl.textContent = "空のパック";
                if(itemRevealImageEl) itemRevealImageEl.style.display = 'none';
                if(itemRevealPlaceholderEl) itemRevealPlaceholderEl.style.display = 'block';
                if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'none';
                if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'none';
            } else if (source === 'pack_max_level') {
                 if(itemRevealNameEl) itemRevealNameEl.textContent += " (最大Lv)";
            } else if (source === 'pack_error') {
                if(itemRevealNameEl) itemRevealNameEl.textContent = "エラー";
                 if(itemRevealImageEl) itemRevealImageEl.style.display = 'none';
                 if(itemRevealPlaceholderEl) itemRevealPlaceholderEl.style.display = 'block';
                 if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'none';
                 if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'none';
            } else {
                if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'inline-block';
                if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'inline-block';
            }

            const closeModalAndResolve = () => {
                itemRevealModal.style.display = 'none';
                confirmItemRevealButton.removeEventListener('click', closeModalAndResolve);
                closeItemRevealModalButton.removeEventListener('click', closeModalAndResolve);
                itemRevealModal.removeEventListener('click', modalOutsideClickHandler);
                resolve();
            };

            const modalOutsideClickHandler = (event) => {
                if (event.target === itemRevealModal) {
                    closeModalAndResolve();
                }
            };

            confirmItemRevealButton.removeEventListener('click', closeModalAndResolve);
            closeItemRevealModalButton.removeEventListener('click', closeModalAndResolve);
            itemRevealModal.removeEventListener('click', modalOutsideClickHandler);

            confirmItemRevealButton.addEventListener('click', closeModalAndResolve, { once: true }); // SE不要箇所
            closeItemRevealModalButton.addEventListener('click', closeModalAndResolve, { once: true }); // SE不要箇所
            itemRevealModal.addEventListener('click', modalOutsideClickHandler); // SE不要箇所

            itemRevealModal.style.display = 'flex';
        });
    }

    // --- ショップ関連イベントリスナー --- (SE追加)
    shopCloseButton.addEventListener('click', () => { closeShop(); });
    if (shopRerollButton) shopRerollButton.addEventListener('click', () => { playSound('click'); handleReroll(); }); // ★ SE追加 (handleReroll内で個別音再生あり)
    if (shopOffersContainerEl) { shopOffersContainerEl.addEventListener('click', (event) => { const button = event.target.closest('.buy-button, .upgrade-button'); if (button && !button.disabled) { playSound('click'); console.log("Shop item button clicked:", button.dataset.cardId || button.dataset.itemId); handleBuyCard(event); } }); } else { console.error(".shop-offers-container element not found for listener setup!"); } // ★ SE追加 (handleBuyCard内で個別音再生あり)
    cancelDiscardButton.addEventListener('click', cancelDiscard); // cancelDiscard 内でSE再生

   // --- キャラクター選択関連イベントリスナー --- (SE追加)
   function setupCharacterSelectListeners() {
       console.log("Setting up character select listeners (Robust check)...");
       const selCharBtn = document.getElementById('select-character-button'); if (selCharBtn) { selCharBtn.removeEventListener('click', openCharacterSelectScreen); selCharBtn.addEventListener('click', openCharacterSelectScreen); } else { console.error("#select-character-button not found for listener."); }
       const backBtn = document.getElementById('back-to-title-button'); if (backBtn) { const backBtnClickHandler = () => { playSound('click'); const confirmArea = document.getElementById('character-confirm-area'); if (confirmArea) confirmArea.style.display = 'none'; previewingCharacter = null; const list = document.getElementById('character-list'); if (list) { list.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected')); } const modals = document.querySelectorAll('.modal'); modals.forEach(modal => { if (modal.id === 'dice-roll-modal') { hideDiceRollModal(); } else if(modal.style.display !== 'none') { modal.style.display = 'none'; } }); if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); } const gameScr = document.getElementById('game-screen'); if(gameScr) gameScr.classList.remove('dimmed'); permanentScoreBoost = 0; console.log("Returning to title from character select. permanentScoreBoost reset."); showScreen('title-screen'); }; backBtn.removeEventListener('click', backBtnClickHandler); backBtn.addEventListener('click', backBtnClickHandler); } else { console.error("#back-to-title-button not found for listener."); } // ★ SE追加
       const charList = document.getElementById('character-list'); if (charList) { charList.removeEventListener('click', handleCharacterSelect); charList.addEventListener('click', handleCharacterSelect); } else { console.error("#character-list not found for listener."); } // ★ SE追加 (handleCharacterSelect内)
       const confirmYesBtn = document.getElementById('confirm-character-yes'); if (confirmYesBtn) { confirmYesBtn.removeEventListener('click', confirmCharacterSelection); confirmYesBtn.addEventListener('click', confirmCharacterSelection); } else { console.error("#confirm-character-yes not found for listener."); } // ★ SE追加 (confirmCharacterSelection内)
       const confirmNoBtn = document.getElementById('confirm-character-no'); if (confirmNoBtn) { const confirmNoBtnClickHandler = () => { playSound('click'); const confirmArea = document.getElementById('character-confirm-area'); if (confirmArea) confirmArea.style.display = 'none'; const list = document.getElementById('character-list'); if (list) { const selectedBtn = list.querySelector('button.selected'); if (selectedBtn) selectedBtn.classList.remove('selected');} previewingCharacter = null; const previewImg = document.getElementById('character-preview-image'); if(previewImg) previewImg.style.display = 'none'; const previewPlaceholder = document.getElementById('character-preview-placeholder'); if(previewPlaceholder) { previewPlaceholder.style.display = 'block'; previewPlaceholder.textContent = '← リストから選択'; } const confirmMsg = document.getElementById('character-confirm-message'); if (confirmMsg) { confirmMsg.textContent = 'このキャラクターにしますか？'; confirmMsg.style.color = '#eee'; } const previewCard = document.getElementById('character-preview-card'); if (previewCard) previewCard.style.display = 'none'; }; confirmNoBtn.removeEventListener('click', confirmNoBtnClickHandler); confirmNoBtn.addEventListener('click', confirmNoBtnClickHandler); } else { console.error("#confirm-character-no not found for listener."); } // ★ SE追加
   }
   if (playerNameInput) { playerNameInput.addEventListener('change', (e) => { playerName = e.target.value.trim(); console.log("Player name updated to:", playerName); }); } // SE不要箇所

   // --- キャラクター選択関数 --- (SE追加)
   function openCharacterSelectScreen() { playSound('click'); console.log("Opening character select screen..."); showScreen('character-select-screen'); } // ★ SE追加
   function populateCharacterList() {
        const listEl = document.getElementById('character-list'); if (!listEl) { console.error("Character list element not found in populateCharacterList!"); return; } listEl.innerHTML = ''; console.log("Populating character list with:", characters); characters.forEach(char => { const button = document.createElement('button'); button.textContent = char.name; button.dataset.characterId = char.id; if (selectedCharacter && char.id === selectedCharacter.id) { button.classList.add('selected'); } listEl.appendChild(button); }); if (listEl.children.length === 0) { console.warn("Character list populated, but no child elements found."); const p = document.createElement('p'); p.textContent = "キャラクターリストを読み込めませんでした。"; p.style.color = 'red'; listEl.appendChild(p); }
   }
   function handleCharacterSelect(event) { // (SE追加)
       const listEl = document.getElementById('character-list'); if (!listEl) return; if (event.target.tagName === 'BUTTON' && event.target.dataset.characterId) { playSound('click'); const characterId = event.target.dataset.characterId; const char = characters.find(c => c.id === characterId); if (char) { previewingCharacter = char; displayCharacterPreview(char); listEl.querySelectorAll('button').forEach(btn => btn.classList.remove('selected')); event.target.classList.add('selected'); const confirmMsg = document.getElementById('character-confirm-message'); if (confirmMsg) { confirmMsg.textContent = 'このキャラクターにしますか？'; confirmMsg.style.color = '#eee'; } const yesBtn = document.getElementById('confirm-character-yes'); if (yesBtn) yesBtn.style.display = 'inline-block'; const noBtn = document.getElementById('confirm-character-no'); if (noBtn) noBtn.style.display = 'inline-block'; } } // ★ SE追加
   }
   function displayCharacterPreview(character) { // (変更なし)
        const previewImg = document.getElementById('character-preview-image'); const previewPlaceholder = document.getElementById('character-preview-placeholder'); const confirmArea = document.getElementById('character-confirm-area'); const cardPreviewEl = document.getElementById('character-preview-card'); if (!previewImg || !previewPlaceholder || !confirmArea || !cardPreviewEl) { console.error("Required elements for character preview not found in displayCharacterPreview."); return; } if (character.image) { previewImg.src = character.image; previewImg.alt = character.name; previewImg.style.display = 'block'; previewPlaceholder.style.display = 'none'; previewImg.onerror = () => { previewImg.style.display = 'none'; previewPlaceholder.textContent = '画像読込失敗'; previewPlaceholder.style.display = 'block'; cardPreviewEl.style.display = 'none'; }; } else { previewImg.style.display = 'none'; previewPlaceholder.textContent = `${character.name} (画像なし)`; previewPlaceholder.style.display = 'block'; cardPreviewEl.style.display = 'none'; } let initialCardName = "なし"; if (character.initialCardPool && character.initialCardPool.length > 0) { initialCardName = character.initialCardPool.map(id => { const cardDef = allCards.find(card => card.id === id); return cardDef ? cardDef.name : "不明"; }).join(', '); } cardPreviewEl.textContent = `初期カード候補：${initialCardName}`; cardPreviewEl.style.display = 'block'; confirmArea.style.display = 'block';
   }
   function confirmCharacterSelection() { // (SE追加)
        playSound('click'); // ★ SE追加
        if (previewingCharacter) { selectedCharacter = previewingCharacter; playerName = selectedCharacter.name; if(playerNameInput) playerNameInput.value = playerName; console.log("Character selected:", selectedCharacter.name); if (characterConfirmMessageEl) { characterConfirmMessageEl.textContent = `「${selectedCharacter.name}」に変更しました！`; characterConfirmMessageEl.style.color = '#90ee90'; } if(confirmCharacterYesButton) confirmCharacterYesButton.style.display = 'none'; if(confirmCharacterNoButton) confirmCharacterNoButton.style.display = 'none'; }
   }

    // --- 初期化処理 ---
    function initializeGame() {
        loadSounds();
        loadSettings();
        console.log("Initializing game setup..."); const hideAllModalsAndOverlays = () => { console.log("Hiding all modals and overlays..."); const modals = document.querySelectorAll('.modal'); modals.forEach(modal => { if (modal.id === 'dice-roll-modal') { hideDiceRollModal(); } else if(modal.style.display !== 'none') { modal.style.display = 'none'; } }); if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); } if(gameScreen) gameScreen.classList.remove('dimmed'); }; document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; }); hideAllModalsAndOverlays(); permanentScoreBoost = 0; console.log("Initializing game. permanentScoreBoost reset."); showScreen('title-screen'); console.log("Game setup initialized. Showing title screen.");
    }
    initializeGame();
    setupCharacterSelectListeners();

    // --- アイテム獲得モーダル関連 --- (SE追加)
    if (closeItemRevealModalButton) { closeItemRevealModalButton.addEventListener('click', () => { playSound('click'); if (itemRevealModal) itemRevealModal.style.display = 'none'; }); } // ★ SE追加
    if (confirmItemRevealButton) { confirmItemRevealButton.addEventListener('click', () => { playSound('click'); if (itemRevealModal) itemRevealModal.style.display = 'none'; }); } // ★ SE追加

console.log("Game setup initialized. Showing title screen.");

}); // === DOMContentLoaded END ===
// ===== END OF script.js =====