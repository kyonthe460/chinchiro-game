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
    let activeCardsUsedThisRound = [];
    let keptShopItem = null;

    // --- キャラクターデータ --- 
    const characters = [
        { id: 'char01', name: 'カオル', image: './Character Image/Character01.png', initialCardId: null, initialCardPool: ['lossInsurance'] },
        { id: 'char02', name: 'トキワ', image: './Character Image/Character02.png', initialCardId: null, initialCardPool: ['changeEyeToOne'] },
        { id: 'char03', name: 'ツキコ', image: './Character Image/Character03.png', initialCardId: null, initialCardPool: ['changeEyeToSix'] },
        { id: 'char04', name: 'カゲヤマ', image: './Character Image/Character04.png', initialCardId: null, initialCardPool: ['changeToOne'] },
        { id: 'char05', name: 'シグレ', image: './Character Image/Character05.png', initialCardId: null, initialCardPool: ['changeToSix'] },
        { id: 'char06', name: 'アカギ', image: './Character Image/Character06.png', initialCardId: null, initialCardPool: ['shopChoicePlus1'] },
        { id: 'char07', name: 'サクラ', image: './Character Image/Character07.png', initialCardId: null, initialCardPool: ['passiveHandExpansion'] },
        { id: 'char08', name: 'シノブ', image: './Character Image/Character08.png', initialCardId: null, initialCardPool: ['riskyBet'] },
        { id: 'char09', name: 'アラシマル', image: './Character Image/Character09.png', initialCardId: null, initialCardPool: ['stormWarning'] },
        { id: 'char10', name: 'トウヤマ', image: './Character Image/Character10.png', initialCardId: null, initialCardPool: ['hifumiHalf'] },
        { id: 'char11', name: 'カラスマ', image: './Character Image/Character11.png', initialCardId: null, initialCardPool: ['soulRoll'] },
        { id: 'char12', name: 'ゼニボウズ', image: './Character Image/Character12.png', initialCardId: null, initialCardPool: ['rewardAmplifier'] },
        { id: 'char13', name: 'イナリ', image: './Character Image/Character13.png', initialCardId: null, initialCardPool: ['blindingDice'] },
        { id: 'char14', name: 'アズミ', image: './Character Image/Character14.png', initialCardId: null, initialCardPool: ['allEyeBonus'] },
        { id: 'char15', name: 'リキョウ', image: './Character Image/Character15.png', initialCardId: null, initialCardPool: ['bountyHunter'] },
        { id: 'char16', name: 'ムサシボウ', image: './Character Image/Character16.png', initialCardId: null, initialCardPool: ['lastStand'] },
        { id: 'char17', name: 'ガロウ', image: './Character Image/Character17.png', initialCardId: null, initialCardPool: ['keepParentalRight'] },
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
    let trueBlindingActive = false;

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
     let MAX_ACTIVE_CARDS = 4; // const から let に変更
     let MAX_PASSIVE_CARDS = 4; // const から let に変更
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
         { id: 'shonbenHalf', name: 'ションベン軽減', type: 'score', cost: 100, rarity: 1, flavor: 'おっとっと、少しこぼしただけさ。', effectTag: 'shonbenHalf', image: './Card Image/02.png' },
         { id: 'ignoreMinBet', name: '最低賭け金無視', type: 'support', cost: 40, rarity: 1, flavor: 'チリも積もれば...', usesPerWave: 1, image: './Card Image/03.jpeg' },
         { id: 'shopChoicePlus1', name: 'ショップ選択肢＋', type: 'support', cost: 150, rarity: 2, flavor: '選択肢は多いほうがいい。人生も、カードも。', applyEffect: (level = 1) => shopChoicePlus1Active = true, removeEffect: () => shopChoicePlus1Active = false, image: './Card Image/04.jpeg' },
        { id: 'changeToOne', name: '1に変更', type: 'dice', cost: 60, rarity: 1, flavor: 'ピンゾロ狙い？それとも…？', usesPerWave: 1, image: './Card Image/05.jpeg' },
        { id: 'changeToSix', name: '6に変更', type: 'dice', cost: 90, rarity: 1, flavor: '目は力なり。最大値をその手に。', usesPerWave: 1, image: './Card Image/06.jpeg' },
        { id: 'zoroChanceUp', name: 'ゾロ目確率UP', type: 'dice', cost: 120, rarity: 2, flavor: '揃え！揃え！揃えー！(このラウンド中有効)', usesPerWave: 1, image: './Card Image/07.jpeg' },
        { id: 'avoid123_456', name: '役回避', type: 'dice', cost: 40, rarity: 1, flavor: '危ない橋は渡らない主義でね。', usesPerWave: 1, image: './Card Image/08.jpeg' },
        { id: 'sixEyeBonus', name: '6の目ボーナス', type: 'score', cost: 100, rarity: 1, flavor: '最高の一点で、最高の報酬を。', effectTag: 'sixEyeBonus', image: './Card Image/09.png' },
        { id: 'oneEyeBonus', name: '1の目ボーナス', type: 'score', cost: 50, rarity: 1, flavor: '最弱の目が、最強の切り札に。', effectTag: 'oneEyeBonus', image: './Card Image/10.png' },
        { id: 'arashiBonus', name: 'アラシ強化', type: 'score', cost: 150, rarity: 2, flavor: '吹き荒れろ！嵐の如く！', effectTag: 'arashiBonus', image: './Card Image/11.png' },
        { id: 'shigoroBonus', name: 'シゴロ強化', type: 'score', cost: 130, rarity: 1, flavor: '4-5-6！幸運の階段。', effectTag: 'shigoroBonus', image: './Card Image/12.png' },
        { id: 'hifumiHalf', name: 'ヒフミ軽減', type: 'score', cost: 180, rarity: 2, flavor: '1-2-3...痛恨のミスも、少しだけ軽く。', effectTag: 'hifumiHalf', image: './Card Image/13.png' },
        { id: 'drawBonus', name: '引き分けボーナス', type: 'support', cost: 90, rarity: 1, flavor: 'まあ、悪くないんじゃない？', usesPerWave: 1, image: './Card Image/14.png' },
        { id: 'blessingDice', name: '天の恵み', type: 'dice', cost: 130, rarity: 2, flavor: '天よ、我に力を！(このラウンド中6が出やすく)', usesPerWave: 1, image: './Card Image/15.png' },
        { id: 'adjustEye', name: '隣接変更', type: 'dice', cost: 60, rarity: 1, flavor: '隣の目に変えて、流れを変える。', usesPerWave: 1, image: './Card Image/16.png' },
        { id: 'stormWarning', name: '嵐の予感', type: 'dice', cost: 180, rarity: 3, flavor: '嵐の前触れ…次こそは！(無料ロール時ゾロ目率UP)', usesPerWave: 1, image: './Card Image/17.png' },
        { id: 'nextChance', name: 'ネクストチャンス', type: 'dice', cost: 160, rarity: 3, flavor: '諦めるのはまだ早い。', usesPerWave: 1, image: './Card Image/18.png' },
        { id: 'betBoost', name: '賭け金ブースト', type: 'score', cost: 160, rarity: 2, flavor: 'リスクを取らねば、得られるものも少ない。', effectTag: 'betBoost', image: './Card Image/19.png' },
        { id: 'fightingSpirit', name: '逆境の魂', type: 'score', cost: 120, rarity: 2, flavor: '窮鼠猫を噛む、とはよく言ったものだ。', effectTag: 'fightingSpirit', image: './Card Image/20.png' },
        { id: 'rewardAmplifier', name: '報酬増幅', type: 'score', cost: 260, rarity: 3, flavor: '勝利の美酒は、より甘く。', usesPerWave: 1, image: './Card Image/21.png' },
        { id: 'keepParentalRight', name: '親権維持', type: 'support', cost: 180, rarity: 2, flavor: 'この座は、譲らん！', usesPerWave: 1, image: './Card Image/22.png' },
        { id: 'handExchange', name: '新装開店', type: 'support', cost: 50, rarity: 1, flavor: '不要なものを、新たな可能性に。', effectTag: 'handExchange', image: './Card Image/23.png' },
        { id: 'soulRoll', name: '魂の一振り', type: 'support', cost: 100, rarity: 2, flavor: 'すべてをこの一振りに…！', usesPerWave: 1, image: './Card Image/24.png' },
        { id: 'doubleUpBet', name: 'ダブルアップ', type: 'score', cost: 220, rarity: 3, flavor: '倍プッシュだ…！', usesPerWave: 1, image: './Card Image/25.png' },
        { id: 'riskyBet', name: '危険な賭け', type: 'support', cost: 120, rarity: 2, flavor: '勝負は常に、リスクと隣り合わせ。', usesPerWave: 1, image: './Card Image/26.png' },
        { id: 'giveUpEye', name: '見切り', type: 'support', cost: 50, rarity: 1, flavor: '深追いは禁物。損切りも大事。', usesPerWave: 1, image: './Card Image/27.png' },
        { id: 'blindingDice', name: '蜃気楼', type: 'dice', cost: 200, rarity: 4, flavor: '揺らめく陽炎が、相手の運命を狂わせる。', usesPerWave: 1, image: './Card Image/28.png' },
        { id: 'lossInsurance', name: '一撃保険', type: 'score', cost: 190, rarity: 3, flavor: '備えあれば憂いなし…？', effectTag: 'lossInsurance', image: './Card Image/29.png' },
        { id: 'changeEyeToOne', name: '1の目に変更', type: 'dice', cost: 90, rarity: 1, flavor: 'ピンゾロ…？いや、安全策か。', usesPerWave: 1, image: './Card Image/30.png' },
        { id: 'changeEyeToSix', name: '6の目に変更', type: 'dice', cost: 110, rarity: 1, flavor: 'その目を、最強の目に変えよう。', usesPerWave: 1, image: './Card Image/31.png' },
        { id: 'menashiAdjust', name: '目なし調整', type: 'dice', cost: 70, rarity: 1, flavor: '少しだけ、運命をズラす。', usesPerWave: 1, image: './Card Image/32.png' },
        { id: 'shopDiscount', name: 'ショップ割引', type: 'support', cost: 100, rarity: 2, flavor: '常連さんにはサービスしないとね！', effectTag: 'shopDiscount', image: './Card Image/33.png' },
        { id: 'stormRoulette', name: 'ストームルーレット', type: 'dice', cost: 240, rarity: 4, flavor: '嵐よ、目覚めよ！更なる力を！', usesPerWave: true, image: './Card Image/34.png'},
        { id: 'destinyShift', name: '運命改変', type: 'dice', cost: 300, rarity: 4, flavor: '定められし賽の目すら、捻じ曲げる。', usesPerWave: true, image: './Card Image/35.png' },
        { id: 'twoEyeBonus', name: '2の目ボーナス', type: 'score', cost: 60, rarity: 1, flavor: '二は地味だが、勝ちは勝ち。', effectTag: 'twoEyeBonus', image: './Card Image/36.png' }, 
        { id: 'threeEyeBonus', name: '3の目ボーナス', type: 'score', cost: 70, rarity: 1, flavor: '三度目の正直、とは限らないが良い目だ。', effectTag: 'threeEyeBonus', image: './Card Image/37.png' },
        { id: 'fourEyeBonus', name: '4の目ボーナス', type: 'score', cost: 80, rarity: 1, flavor: '四合わせ（しあわせ）の目？', effectTag: 'fourEyeBonus', image: './Card Image/38.png' },
        { id: 'fiveEyeBonus', name: '5の目ボーナス', type: 'score', cost: 90, rarity: 1, flavor: '五分の魂、いや五分の勝利。', effectTag: 'fiveEyeBonus', image: './Card Image/39.png' },
        { id: 'allEyeBonus', name: '全目ボーナス', type: 'score', cost: 150, rarity: 2, flavor: 'どの目が出ようと、勝てば良いのだ。', effectTag: 'allEyeBonus', image: './Card Image/40.png' }, 
        { id: 'eyeDefense', name: 'アイマスク', type: 'score', cost: 180, rarity: 2, flavor: '相手の目がなんだ。かすり傷にもならんわ。', effectTag: 'eyeDefense', image: './Card Image/41.png' }, 
        { id: 'trueBlinding', name: '目くらまし', type: 'dice', cost: 180, rarity: 3, flavor: '相手の目を眩ませ、好機を潰す。', usesPerWave: 1, image: './Card Image/42.png' }, 
        { id: 'adjustEyeValue', name: '出目調整', type: 'dice', cost: 90, rarity: 2, flavor: 'その目を、狙った目に近づける。', usesPerWave: true, image: './Card Image/43.png' },
        { id: 'pinzoroLossGuard', name: 'ピンゾロガード', type: 'score', cost: 160, rarity: 3, flavor: '最悪の目だけは、避けさせてもらう。', effectTag: 'pinzoroLossGuard', image: './Card Image/44.png' },
        { id: 'arashiLossGuard', name: 'アラシガード', type: 'score',cost: 140,rarity: 2, flavor: '嵐の直撃は避けたいものだ。', effectTag: 'arashiLossGuard', image: './Card Image/45.png' },
        { id: 'shigoroLossGuard', name: 'シゴロガード', type: 'score', cost: 100, rarity: 1, flavor: '4-5-6… あんまり痛くないといいな。', effectTag: 'shigoroLossGuard', image: './Card Image/46.png' },
        { id: 'overallLossGuard', name: '鉄壁防御', type: 'score', cost: 250, rarity: 4, flavor: 'どんな攻撃だろうと、受け止めてみせる！', effectTag: 'overallLossGuard', image: './Card Image/47.png' },
        { id: 'activeHandExpansion', name: '道具袋拡張', type: 'support', cost: 180, rarity: 2, flavor: '備えあれば憂いなし。もっと道具を持てるように。', 
            applyEffect: (level = 1) => { MAX_ACTIVE_CARDS = 4 + level; console.log(`Applied Active Hand Expansion Lv.${level}: MAX_ACTIVE_CARDS is now ${MAX_ACTIVE_CARDS}`); if (shopScreen && shopScreen.classList.contains('active')) {updateShopHandDisplay();}},
            removeEffect: (level = 1) => { MAX_ACTIVE_CARDS = Math.max(4, MAX_ACTIVE_CARDS - level); console.log(`Removed Active Hand Expansion Lv.${level}: MAX_ACTIVE_CARDS returned to ${MAX_ACTIVE_CARDS}`); if (shopScreen && shopScreen.classList.contains('active')) {updateShopHandDisplay();}}, image: './Card Image/48.png' },
        { id: 'passiveHandExpansion', name: '心得拡張', type: 'support', cost: 180, rarity: 2, flavor: '学びを深め、さらなる力をその身に宿す。', 
            applyEffect: (level = 1) => {MAX_PASSIVE_CARDS = 4 + level; console.log(`Applied Passive Hand Expansion Lv.${level}: MAX_PASSIVE_CARDS is now ${MAX_PASSIVE_CARDS}`); if (shopScreen && shopScreen.classList.contains('active')) {updateShopHandDisplay();}},
            removeEffect: (level = 1) => {MAX_PASSIVE_CARDS = Math.max(4, MAX_PASSIVE_CARDS - level); console.log(`Removed Passive Hand Expansion Lv.${level}: MAX_PASSIVE_CARDS returned to ${MAX_PASSIVE_CARDS}`); if (shopScreen && shopScreen.classList.contains('active')) {updateShopHandDisplay();}}, image: './Card Image/49.png' },    
        { id: 'greedyPot', name: '強欲な壺', type: 'support', cost: 150, rarity: 2, flavor: 'もっと、もっとだ…！勝利の報酬は全て我が手に！', effectTag: 'greedyPot', image: './Card Image/50.png' },
        { id: 'bountyHunter', name: '賞金稼ぎ', type: 'support', cost: 220, rarity: 3, flavor: '一勝ごとに、チャリンと鳴る。それが俺の流儀さ。', effectTag: 'bountyHunter', image: './Card Image/51.png' },
        { id: 'offeringBox', name: '賽銭箱', type: 'support', cost: 50, rarity: 1, flavor: '日頃の行いが大事、ってね。', effectTag: 'offeringBox', image: './Card Image/52.png' },    
        { id: 'retryRoll', name: '再起の一投', type: 'dice', cost: 180, rarity: 3, flavor: 'この結果は認めん！もう一度だ！', usesPerWave: true, image: './Card Image/53.png' },
        { id: 'lastStand', name: '土俵際', type: 'support', cost: 300, rarity: 4, flavor: 'まだだ…まだ終わらんよ！', effectTag: 'lastStand', image: './Card Image/54.png' },
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
    const FADE_DURATION = 400; // アニメーション時間 (ms)

    function showScreen(screenId) {
        console.log("Showing screen:", screenId);
        const screenToShow = document.getElementById(screenId);
        if (!screenToShow || !screenToShow.classList.contains('screen')) {
            console.error("Screen not found or invalid:", screenId);
            return;
        }

        let activeScreen = null;
        document.querySelectorAll('.screen.active').forEach(s => {
            activeScreen = s;
            // 既存のアニメーションクラスがあれば削除（念のため）
            s.classList.remove('screen-fade-in');
            // フェードアウト開始
            s.classList.add('screen-fade-out');
        });

        // フェードアウト後に非表示処理
        if (activeScreen) {
            setTimeout(() => {
                activeScreen.classList.remove('active', 'screen-fade-out');
                activeScreen.style.display = 'none';
            }, FADE_DURATION);
        }

        // フェードイン処理
        // display プロパティを設定
        const flexScreens = ['title-screen', 'result-screen', 'character-select-screen', 'shop-screen', 'game-screen'];
        if (flexScreens.includes(screenId)) {
            screenToShow.style.display = 'flex';
        } else {
            screenToShow.style.display = 'block'; // デフォルトは block (もしあれば)
        }

        // 既存のアニメーションクラスがあれば削除（念のため）
        screenToShow.classList.remove('screen-fade-out');

        // 少し遅延させてからフェードイン開始（display反映待ち）
        requestAnimationFrame(() => {
            screenToShow.classList.add('active', 'screen-fade-in');
             // アニメーション完了後にクラスを削除（任意）
             setTimeout(() => {
                 screenToShow.classList.remove('screen-fade-in');
             }, FADE_DURATION);
        });

        // --- 画面ごとの処理 ---
        // 画面に応じたBGM切り替え
        let targetBgm = null;
        switch (screenId) {
            case 'title-screen': targetBgm = 'title'; break;
            case 'game-screen': targetBgm = 'game_normal'; break;
            case 'shop-screen': targetBgm = 'shop'; break;
            case 'result-screen':
                const resultTitleElem = document.getElementById('result-title');
                if (resultTitleElem && resultTitleElem.classList.contains('clear')) {
                    targetBgm = 'result_clear';
                } else {
                    targetBgm = 'result_over';
                }
                break;
            case 'character-select-screen':
                targetBgm = 'title';
                break;
            default:
                stopBGM(true);
                break;
        }
        if (targetBgm) {
            if (!currentBgm || currentBgm !== bgms[targetBgm]) {
                switchBGM(targetBgm, FADE_DURATION); // フェード時間を指定
            } else if (currentBgm.paused) {
                playBGM(targetBgm);
            }
        }

        // その他の画面初期化処理
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
            document.body.addEventListener('click', unlockAudio, { capture: true, once: true }); 
            document.body.addEventListener('touchend', unlockAudio, { capture: true, once: true }); 
            document.body.addEventListener('keydown', unlockAudio, { capture: true, once: true }); 
        }


        // 効果音の読み込み 
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
        // BGMの読み込み 
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
            // 再生前に必ず目標音量を設定
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
                 // 再生しようとしたBGMを記憶しておく（unlock時に再生するため）
                 // この例では currentBgm が設定されているので unlockAudio 内で再生が試みられる
            }

        } else {
            console.warn(`BGM '${bgmName}' not found.`);
        }
    }

    // --- BGM停止 --- 
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

    // --- BGM切り替え --- 
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
        bgmSlider.style.setProperty('--value-percent', `${settings.bgmVolume * 100}%`);
    }
    if (bgmValueDisplay) bgmValueDisplay.textContent = `${Math.round(settings.bgmVolume * 100)}%`;
    if (seSlider) {
        seSlider.value = settings.seVolume;
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
    event.target.style.setProperty('--value-percent', `${volume * 100}%`);
    updateVolumeSliders(); // 表示テキストも更新
    // saveSettings(); // スライダーを動かすたびに保存 (または離した時に保存)
}
    // --- SE音量変更処理 ---
function handleSeVolumeChange(event) {
    const volume = parseFloat(event.target.value);
    settings.seVolume = volume;
    event.target.style.setProperty('--value-percent', `${volume * 100}%`);
    updateVolumeSliders(); // 表示テキストも更新
    // テスト用にクリック音などを鳴らしても良い
    // playSound('click');
    // saveSettings(); // スライダーを動かすたびに保存 (または離した時に保存)
}

    // --- タイトルへ戻る処理 --- 
    function handleBackToTitleFromSettings() {
        playSound('click'); 
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

    // --- ゲーム終了処理 --- 
    function handleCloseGame() {
        playSound('click'); 
        if (confirm("ゲームを終了しますか？")) {
            // 必要であれば終了前の処理
            window.close(); // タブを閉じようと試みる
            // 閉じられなかった場合のフォールバックメッセージ
            alert("タブを閉じられませんでした。手動で閉じてください。");
        }
    }

    // --- ヘルパー関数など --- 
    function getHandDisplayName(hand) { if (!hand) return '-'; if (hand.type === '役') return hand.name; if (hand.type === '目') return `目 (${hand.value})`; if (hand.type === 'ションベン') return 'ションベン'; if (hand.type === '目なし') return '目なし'; return '-'; }
    function updateRoleRatesDisplay() {
        const ratePinzoroEl = document.getElementById('role-rate-pinzoro');
        const rateArashiEl = document.getElementById('role-rate-arashi');
        const rateShigoroEl = document.getElementById('role-rate-shigoro');
        const rateHifumiEl = document.getElementById('role-rate-hifumi');
        const rateShonbenEl = document.getElementById('role-rate-shonben');

        const rateEyeEls = [];
        for (let i = 1; i <= 6; i++) {
            rateEyeEls[i] = document.getElementById(`role-rate-eye${i}`);
        }

        if (!ratePinzoroEl || !rateArashiEl || !rateShigoroEl || !rateHifumiEl || !rateShonbenEl || rateEyeEls.some((el, i) => i > 0 && !el)) { //★ index 0 は無視
             console.warn("Required role rate elements not found in updateRoleRatesDisplay.");
             return;
        }

        let baseRatePinzoro = ROLES.PINZORO.payoutMultiplier;
        let baseRateArashi = ROLES.ARASHI.payoutMultiplier;
        let baseRateShigoro = ROLES.SHIGORO.payoutMultiplier;
        let baseRateEye = ROLES.NORMAL_EYE.payoutMultiplier;
        let baseRateHifumi = Math.abs(ROLES.HIFUMI.payoutMultiplier);
        let baseRateShonben = Math.abs(ROLES.SHONBEN.payoutMultiplier);

        let bonusArashi = 0, bonusShigoro = 0;
        let reductionHifumi = 0;  // 集計用変数は0で初期化
        let reductionShonben = 0; // 集計用変数は0で初期化
        let bonusEye = [0, 0, 0, 0, 0, 0, 0]; 
        let bonusAllEye = 0;

        playerCards.forEach(cardData => {
            const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef || !cardDef.effectTag) return;
            const level = cardData.level;

            switch (cardDef.effectTag) {
                case 'arashiBonus': bonusArashi += level; break;
                case 'shigoroBonus': bonusShigoro += level; break;
                case 'hifumiHalf':
                    reductionHifumi -= level; // 負の値として加算 (例: Lv1なら-1)
                    break;
                case 'shonbenHalf':
                    reductionShonben = [-0.5, -1.0, -1.5][level - 1]; // 直接代入 (負の値)
                    break;
                case 'oneEyeBonus': bonusEye[1] += level; break;
                case 'twoEyeBonus': bonusEye[2] += level; break;
                case 'threeEyeBonus': bonusEye[3] += level; break;
                case 'fourEyeBonus': bonusEye[4] += level; break;
                case 'fiveEyeBonus': bonusEye[5] += level; break;
                case 'sixEyeBonus': bonusEye[6] += level; break; 
                case 'allEyeBonus': bonusAllEye += [0.5, 1.0, 1.5][level - 1]; break;
            }
        });

        ratePinzoroEl.textContent = baseRatePinzoro;
        rateArashiEl.textContent = (baseRateArashi + bonusArashi).toFixed(1);
        rateShigoroEl.textContent = (baseRateShigoro + bonusShigoro).toFixed(1);
        rateHifumiEl.textContent = Math.max(0, baseRateHifumi + reductionHifumi).toFixed(1);
        rateShonbenEl.textContent = Math.max(0, baseRateShonben + reductionShonben).toFixed(1);

        // 各目の最終倍率を計算して表示 (ループ範囲は1から6でOK)
        for (let i = 1; i <= 6; i++) {
            const finalEyeRate = baseRateEye + bonusAllEye + (bonusEye[i] || 0); // bonusEye[i] が undefined でも 0 として扱われるように
            if (rateEyeEls[i]) { // 要素が存在するか確認
                rateEyeEls[i].textContent = finalEyeRate.toFixed(1);
            } else {
                console.warn(`Element role-rate-eye${i} not found!`);
            }
        }
        console.log("Updated role rates display based on current cards.");
    } // updateRoleRatesDisplay 関数の終わり

// === カード使用後などの自動進行チェック関数 ===
async function checkAndProceedAfterAction() {
    console.log("Checking if player can proceed after action...");

    if (isShowingRoleResult || isShowingGameResult) {
        console.log(" -> Modal showing. Proceeding skipped.");
        return; // モーダル表示中は進行しない
    }
    if (activeCardBeingUsed || waitingForUserChoice) {
         console.log(" -> Another action/choice is pending. Proceeding skipped.");
         return; // 他のアクションや選択待ち中は進行しない
    }

    // 他に使用可能なアクティブカードがあるかチェック
    const hasUsablePostRollCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));
    // 目なしの場合、振り直し可能か？
    const canRerollMenashi = playerHand?.type === '目なし' && (playerRollCount < currentMaxRolls || stormWarningRerollsLeft > 0);

    if (!hasUsablePostRollCard && !canRerollMenashi) {
        // カードも使えず、目なし時の振り直しもできない場合のみ自動進行 
        console.log(" -> No usable cards left and no reroll available. Proceeding turn automatically.");
        waitingForPlayerActionAfterRoll = false; // アクション待ち解除
        messageButtonContainer.innerHTML = ''; // ボタンクリア

        const handName = getHandDisplayName(playerHand);
        const playerName = selectedCharacter?.name || 'あなた';
        const npcName = currentNpcCharacter?.name || '相手';

        // ターン進行
        rollButton.disabled = true; // 自動進行するのでロール不可
        historyButton.disabled = false;
        isPlayerTurn = false; // 相手ターンへ

        if (isPlayerParent) {
            setMessage(`${playerName}(親): ${handName}！ 自動で${npcName}(子)の番です。`);
            setTimeout(npcTurn, 800); // 少し間を置いてNPCターンへ
        } else {
            setMessage(`${playerName}(子): ${handName}！ 自動で勝負！`);
            setTimeout(handleRoundEnd, 800); // 少し間を置いてラウンド終了へ
        }
         updateUI(); // UI更新
    } else {
        console.log(` -> Actions available (Card: ${hasUsablePostRollCard}, Reroll: ${canRerollMenashi}). Waiting for player choice.`);
        // 使用可能なカードがある、または目なしで振り直せる場合は、
        // waitingForPlayerActionAfterRoll を true にしてボタン付きメッセージを表示する必要がある
        // この関数の呼び出し元 (handlePostRollPlayerAction) で waitingFor... を設定し、
        //   setMessage でボタンを表示させるようにする
         if (!waitingForPlayerActionAfterRoll) {
             // この関数が呼ばれた時点で waiting... が false だった場合、
             // アクションが残っているのに進行しようとしたことになるので、
             // 強制的にアクション待ち状態に戻す（念のため）
             waitingForPlayerActionAfterRoll = true;
             setMessageAfterActionCancel("操作を選択してください。"); // ボタン再表示
             rollButton.disabled = !canRerollMenashi; // 振り直し可能ならロールボタン有効化
             updateCardButtonHighlight();
         } else {
             // 既に waiting... が true なら、ボタンは表示されているはずなので何もしない
         }
    }
}
function setMessage(msg, buttonType = 'none') {
    messageEl.textContent = msg;
    messageButtonContainer.innerHTML = ''; // ボタンクリア

    if (buttonType === 'postRollChoice') {
        // 実際に使用可能なカードがあるかチェック
        const hasUsableCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));
        const canReroll = playerRollCount < currentMaxRolls || stormWarningRerollsLeft > 0;
        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const canUseSoulRollPostMenashi = playerHand?.type === '目なし' && soulRollCard && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;

        // スキップボタンはロール後アクション選択時なら常に表示？ (目なし以外でも意味はある)
        const skipButton = document.createElement('button');
        skipButton.id = 'skip-action-button';
        skipButton.textContent = 'スキップ';
        skipButton.className = 'button-subtle skip-button';
        skipButton.onclick = () => { playSound('skipButton'); handleSkipAction(); };
        messageButtonContainer.appendChild(skipButton);

        // カードボタンは使用可能なカードがある場合のみ表示
        if (hasUsableCard || (playerHand?.type === '目なし' && canUseSoulRollPostMenashi)) { // 目なしで魂の一振りが使える場合も含む
             const cardButton = document.createElement('button');
             cardButton.id = 'post-roll-card-button';
             cardButton.textContent = 'カード';
             cardButton.className = 'button-pop card-button'; // 通常のカードボタンクラス
             cardButton.onclick = () => { playSound('cardButton'); openCardActionModal(); };
             messageButtonContainer.appendChild(cardButton);
             updateCardButtonHighlight(); // ハイライト更新
        } else {
             console.log("setMessage: No usable cards for postRollChoice, 'カード' button hidden.");
        }

    } else if (buttonType === 'yesNo') {
        const button1 = document.createElement('button');
        button1.textContent = 'はい';
        button1.className = 'button-pop temp-choice-button';
        button1.onclick = () => { playSound('click'); handleUserChoice(true); };
        messageButtonContainer.appendChild(button1);

        const button2 = document.createElement('button');
        button2.textContent = 'いいえ';
        button2.className = 'button-subtle temp-choice-button';
        button2.onclick = () => { playSound('click'); handleUserChoice(false); };
        messageButtonContainer.appendChild(button2);
    }
    // 他の buttonType があればここに追加
}
    function waitForUserChoice() { return new Promise(resolve => { waitingForUserChoice = true; userChoiceResolver = resolve; }); } 
    function handleUserChoice(choice) { if (!waitingForUserChoice || !userChoiceResolver) return; waitingForUserChoice = false; const resolver = userChoiceResolver; userChoiceResolver = null; messageButtonContainer.innerHTML = ''; resolver(choice); } // (変更なし)
    function waitForShopConfirmation() { return new Promise(resolve => { shopConfirmationResolver = resolve; }); } 
    function handleShopConfirmation(choice) { if (shopConfirmationResolver) { const resolver = shopConfirmationResolver; shopConfirmationResolver = null; const confirmationButtons = document.getElementById('shop-confirmation-buttons'); if (confirmationButtons) confirmationButtons.remove(); if(shopActionsEl) shopActionsEl.style.display = 'flex'; resolver(choice); } } // (変更なし)
    function rollSingleDice() { return Math.floor(Math.random() * 6) + 1; } 
    function rollDice(isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) { 
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
        } 
        // --- 目くらまし効果 ---
        if (isNpc && trueBlindingActive && trueBlindingLevel > 0) {
            console.log(`Applying True Blinding Lv.${trueBlindingLevel} effect to NPC roll... Initial dice: [${dice.join(',')}]`); // ★ ログ追加
            const s = [...dice].sort((a, b) => a - b);
            const [d1, d2, d3] = s;
            let originalHandType = "other";

            if (d1 === d2 && d2 === d3) originalHandType = "zoro";
            else if (d1 === 4 && d2 === 5 && d3 === 6) originalHandType = "shigoro";

            if (originalHandType === "zoro" || originalHandType === "shigoro") {
                const suppressChance = [0.15, 0.25, 0.40][trueBlindingLevel - 1];
                console.log(` -> Target hand (${originalHandType}) detected. Suppress chance: ${suppressChance * 100}%`);

                if (Math.random() < suppressChance) {
                    console.log(`%c -> True Blinding SUCCESS! Rerolling one die to disrupt the hand.`, 'color: red; font-weight: bold;');
                    let rerollIndex = Math.floor(Math.random() * 3);
                    let newValue;
                    let attempts = 0;
                    const maxRerollAttempts = 10;

                    do {
                        newValue = rollSingleDice();
                        let potentialNewDice = [...dice];
                        potentialNewDice[rerollIndex] = newValue;
                        const sNew = [...potentialNewDice].sort((a, b) => a - b);
                        const [n1, n2, n3] = sNew;
                        let newHandType = "other";
                        if (n1 === n2 && n2 === n3) newHandType = "zoro";
                        else if (n1 === 4 && n2 === 5 && n3 === 6) newHandType = "shigoro";
                        attempts++;
                        if (newHandType !== originalHandType) break;
                    } while (attempts < maxRerollAttempts);

                    if (attempts < maxRerollAttempts) {
                        console.log(` -> Rerolled dice at index ${rerollIndex} from ${dice[rerollIndex]} to ${newValue}. Final dice: [${dice.map((d, i) => i === rerollIndex ? newValue : d).join(',')}]`); // ★ ログ追加
                        dice[rerollIndex] = newValue;
                    } else {
                        console.warn(` -> True Blinding: Max reroll attempts reached, could not disrupt hand.`);
                    }
                } else {
                    console.log(` -> True Blinding FAILED. Hand remains ${originalHandType}.`);
                }
            } else {
                 console.log(` -> No target hand detected for True Blinding.`); 
            }
        }
        console.log(`Final dice result (${isNpc ? 'NPC' : 'Player'}): ${dice.join(',')}`);
        return dice;
    }
    function getHandResult(dice, isNpc = false, blindingDiceLevel = 0, soulRollLevel = 0) { 
        const s = [...dice].sort((a, b) => a - b); const [d1, d2, d3] = s; let result;
        if (d1 === d2 && d2 === d3) { result = d1 === 1 ? { ...ROLES.PINZORO, type: '役', value: 1 } : { ...ROLES.ARASHI, type: '役', value: d1 }; }
        else if (d1 === 4 && d2 === 5 && d3 === 6) { result = { ...ROLES.SHIGORO, type: '役', value: 6 }; }
        else if (d1 === 1 && d2 === 2 && d3 === 3) { result = { ...ROLES.HIFUMI, type: '役', value: 3 }; }
        else if (d1 === d2 && d2 !== d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d3 }; }
        else if (d1 !== d2 && d2 === d3) { result = { ...ROLES.NORMAL_EYE, type: '目', value: d1 }; }
        else { result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; }
        console.log(`Initial Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`); 
        // --- カード効果適用 (蜃気楼など) ---
        if (isNpc && blindingDiceLevel > 0) { // blindingDiceLevel は蜃気楼カードのレベル
            let specialRoleAvoided = false;
            const specialRolesToAvoid = [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name, ROLES.HIFUMI.name];
            if (result.type === '役' && specialRolesToAvoid.includes(result.name)) {
                const avoidChance = [0.3, 0.5, 0.7][blindingDiceLevel - 1];
                if (Math.random() < avoidChance) {
                    console.log(`%cCard Effect: 蜃気楼 Lv.${blindingDiceLevel} 発動! NPCの特殊役「${result.name}」を回避 -> 目なしに変更`, 'color: orange; font-weight: bold;');
                    result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name, forcedMenashi: true }; // ★ forcedMenashi フラグを追加
                    specialRoleAvoided = true;
                } else {
                    // console.log(`Card Effect: 蜃気楼 Lv.${blindingDiceLevel} - NPCの特殊役「${result.name}」回避失敗 (確率 ${avoidChance * 100}%)`); // ログ抑制
                }
            }
            // Lv3のションベン率UP効果
            if (!specialRoleAvoided && blindingDiceLevel >= 3 && result.type !== 'ションベン' && result.type !== '目なし') {
                 const shonbenUpChance = 0.2;
                 if (Math.random() < shonbenUpChance) {
                     console.log(`%cCard Effect: 蜃気楼 Lv.3 - ションベン率UP発動! NPCの結果「${getHandDisplayName(result)}」を目なしに変更`, 'color: orange; font-weight: bold;');
                     result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name, forcedMenashi: true }; // ★ forcedMenashi フラグを追加
                 } else {
                     // console.log(`Card Effect: 蜃気楼 Lv.3 - ションベン率UP失敗 (確率 ${shonbenUpChance * 100}%)`);
                 }
             }
        }
       console.log(`%cFinal Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`, 'font-weight: bold;');
       return result;
   }
    function applyPlayerCardEffects() { 
         currentMaxRolls = BASE_MAX_ROLLS; // リセットしてから適用
         shopChoicePlus1Active = false;
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
             const isBettingPhase = !isGameActive && !waitingForPlayerActionAfterRoll && !activeCardBeingUsed;
        if (gameScreen.classList.contains('active') && isBettingPhase && !diceAnimationId && !isShowingRoleResult && !isShowingGameResult) {
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

                // BGM切り替え実行
                if (currentBgm !== bgms[situationBgm]) {
                    console.log(`Switching BGM in updateUI (Bet Phase): ${situationBgm}`);
                    switchBGM(situationBgm);
                } else if (currentBgm && currentBgm.paused && isAudioContextUnlocked) {
                     playBGM(situationBgm); // 一時停止からの再開
                 }
            }
        const playerInfoH2 = document.querySelector('#player-info h2'); const npcInfoH2 = document.querySelector('#npc-info h2'); const currentPlayerName = playerName || selectedCharacter?.name || 'あなた'; if (playerInfoH2) playerInfoH2.innerHTML = `${currentPlayerName} <span id="player-parent-marker" class="parent-marker" style="display: ${isPlayerParent ? 'inline' : 'none'};">(親)</span>`; if (npcInfoH2) npcInfoH2.innerHTML = `${currentNpcCharacter?.name || 'NPC'} <span id="npc-parent-marker" class="parent-marker" style="display: ${!isPlayerParent ? 'inline' : 'none'};">(親)</span>`; displayCharacterImages();
        playerScoreEl.textContent = playerScore; npcScoreEl.textContent = npcScore; playerDiceEl.textContent = playerDice.every(d => d === 0) ? '-' : playerDice.join(' '); playerHandEl.textContent = getHandDisplayName(playerHand); npcDiceEl.textContent = npcDice.every(d => d === 0) ? '-' : npcDice.join(' '); npcHandEl.textContent = getHandDisplayName(npcHand);
        // baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT; if (keepParentDiscountNextRound) { baseMinBet = Math.max(1, Math.floor(baseMinBet / 2)); } currentMinBet = baseMinBet; const riskyBetCardCheck = playerCards.find(c => c.id === 'riskyBet'); if (riskyBetActive && riskyBetCardCheck?.level === 1) { currentMinBet = baseMinBet * 2; } if (ignoreMinBetActive) { currentMinBet = 1; } minBetDisplayEl.textContent = `最低: ${currentMinBet}`; // コメントアウト
        let maxRollsForTurn = isPlayerTurn ? currentMaxRolls : BASE_MAX_ROLLS; let currentRollCountForTurn = isPlayerTurn ? playerRollCount : npcRollCount; let turnText = `0/${maxRollsForTurn}回`; if (isGameActive || currentRoundInWave > 0) { turnText = `${currentRollCountForTurn}/${maxRollsForTurn}回`; } rollCounterEl.textContent = turnText;
        if (gameCoinDisplayEl) { gameCoinDisplayEl.textContent = `${playerCoins} G`; } if (shopScreen.classList.contains('active')) { updateShopUI(); }
        // updateBetLimits();
        if (isGameActive && currentBet > 0) { const parentName = isPlayerParent ? currentPlayerName : (currentNpcCharacter?.name || "相手"); currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${parentName})</span>`; }
        else if (!isGameActive && currentRoundInWave > 0 && playerScore >= currentMinBet && npcScore >= currentMinBet) { currentBetInfoEl.textContent = '賭け金設定中...'; } else { currentBetInfoEl.textContent = ''; }
        const isNpcParentTurn = !isPlayerParent && !isGameActive && !waitingForPlayerActionAfterRoll; if (betMainControls) betMainControls.style.opacity = isNpcParentTurn ? '0.5' : '1'; if (betMainControls) betMainControls.style.pointerEvents = isNpcParentTurn ? 'none' : 'auto'; if (betActionContainer) betActionContainer.style.display = isNpcParentTurn ? 'none' : 'flex'; gameScreen.classList.toggle('npc-parent', isNpcParentTurn);
        updateCardButtonHighlight();
        if (scoreCalculationAnimationEl && !scoreCalculationAnimationEl.classList.contains('visible')) {
            scoreCalculationAnimationEl.innerHTML = '';
        }
    }
    function displayCharacterImages() { 
        const playerImageArea = document.querySelector('.character-image-area.player');
        const npcImageArea = document.querySelector('.character-image-area.npc');
        const placeholderText = (name) => `<span style="color:#aaa; font-size:0.9em;">${name} 画像</span>`;
        if (playerImageArea) { if (selectedCharacter && selectedCharacter.image && playerImageArea) { playerImageArea.innerHTML = `<img src="${selectedCharacter.image}" alt="${selectedCharacter.name}" style="display: none;"><div class="win-lose-indicator"></div>`; const img = playerImageArea.querySelector('img'); if (img) { img.onload = () => img.style.display = 'block'; img.onerror = () => playerImageArea.innerHTML = placeholderText(selectedCharacter.name) + '<div class="win-lose-indicator"></div>'; } } else if (playerImageArea) { playerImageArea.innerHTML = placeholderText(selectedCharacter?.name || 'あなた') + '<div class="win-lose-indicator"></div>'; } }
        if (npcImageArea) { if (currentNpcCharacter && currentNpcCharacter.image && npcImageArea) { npcImageArea.innerHTML = `<img src="${currentNpcCharacter.image}" alt="${currentNpcCharacter.name}" style="display: none;"><div class="win-lose-indicator"></div>`; const img = npcImageArea.querySelector('img'); if (img) { img.onload = () => img.style.display = 'block'; img.onerror = () => npcImageArea.innerHTML = placeholderText(currentNpcCharacter.name) + '<div class="win-lose-indicator"></div>'; } } else if (npcImageArea) { npcImageArea.innerHTML = placeholderText(currentNpcCharacter?.name || 'NPC') + '<div class="win-lose-indicator"></div>'; } }
    }
    function updateCardButtonHighlight() { 
        if (!cardActionButton) return;
        let usableCardExists = false;
        const checkFunction = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll : checkCardUsability;
        for (const cardData of playerCards) { if (checkFunction(cardData.id)) { usableCardExists = true; break; } }
        const postRollCardBtn = document.getElementById('post-roll-card-button');
        if (postRollCardBtn) { postRollCardBtn.classList.toggle('highlight-card-button', usableCardExists); }
        cardActionButton.classList.toggle('highlight-card-button', usableCardExists);
    }
    function updateShopHandDisplay() { 
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
            case 'twoEyeBonus':
            conditionText = "「2の目」で勝利した時 (パッシブ)";
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'threeEyeBonus':
            conditionText = "「3の目」で勝利した時 (パッシブ)";
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'fourEyeBonus':
            conditionText = "「4の目」で勝利した時 (パッシブ)";
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'fiveEyeBonus':
            conditionText = "「5の目」で勝利した時 (パッシブ)";
            effectText = `獲得スコア計算時の基本倍率に +${level} 加算される。`;
            break;
        case 'allEyeBonus':
            conditionText = "いずれかの「目」で勝利した時 (パッシブ)";
            const allEyeBonusValue = [0.5, 1.0, 1.5][level - 1].toFixed(1);
            effectText = `獲得スコア計算時の基本倍率に +${allEyeBonusValue} 加算される。`;
            break;
        case 'eyeDefense':
            conditionText = "相手が「目」で自分が敗北した時 (パッシブ)";
            const eyeDefenseReductionValue = [0.5, 1.0, 1.5][level - 1].toFixed(1);
            effectText = `支払いスコア計算時の基本倍率から ${eyeDefenseReductionValue} 軽減される (最低0倍)。`;
            break;
        case 'trueBlinding': 
            conditionText = "自分のロール前 (アクティブ)"; 
            const blindingEffectText = level === 1 ? '少し低下' : level === 2 ? '低下' : '大きく低下';
            effectText = `WAVE中 ${level}回 使用可能。使用したラウンド中、相手が良い役（ピンゾロ、アラシ、シゴロ）を出す確率を${blindingEffectText}させる。`; // 効果説明も仮
            break;
            case 'hifumiHalf':
                conditionText = "ヒフミで敗北した時 (パッシブ)";
                let hifumiReductionText = "不明"; 
                if (level === 1) hifumiReductionText = "1.0";
                else if (level === 2) hifumiReductionText = "2.0";
                else if (level >= 3) hifumiReductionText = "3.0";
                effectText = `支払いスコア計算時の基本倍率から ${hifumiReductionText} 軽減される (最低0倍)。`;
                break;
            case 'shonbenHalf':
                conditionText = "ションベンで敗北した時 (パッシブ)";
                let reductionText = "不明";
                if (level === 1) reductionText = "0.5";
                else if (level === 2) reductionText = "1.0";
                else if (level >= 3) reductionText = "1.5";
                effectText = `支払いスコア計算時の基本倍率から ${reductionText} 軽減される (最低0倍)。※「見切り」使用時は適用外`; break;
            case 'pinzoroLossGuard':
                    conditionText = "相手が「ピンゾロ」で自分が敗北した時 (パッシブ)";
                    const pinzoroReduction = [1.0, 2.0, 3.0][level - 1].toFixed(1); 
                    effectText = `支払いスコア計算時の基本倍率から ${pinzoroReduction} 軽減される (最低0倍)。`;
                    break;
            case 'arashiLossGuard':
                    conditionText = "相手が「アラシ」で自分が敗北した時 (パッシブ)";
                    const arashiReduction = [1.0, 1.5, 2.5][level - 1].toFixed(1); 
                    effectText = `支払いスコア計算時の基本倍率から ${arashiReduction} 軽減される (最低0倍)。`;
                    break;
            case 'shigoroLossGuard':
                    conditionText = "相手が「シゴロ」で自分が敗北した時 (パッシブ)";
                    const shigoroReduction = [0.5, 1.0, 1.5][level - 1].toFixed(1); 
                    effectText = `支払いスコア計算時の基本倍率から ${shigoroReduction} 軽減される (最低0倍)。`;
                    break;
            case 'overallLossGuard':
                    conditionText = "自分が敗北した時 (パッシブ)";
                    const overallReduction = [1.0, 2.0, 3.0][level - 1].toFixed(1); 
                    effectText = `支払いスコア計算時の基本倍率から ${overallReduction} 軽減される (最低0倍)。このカードがある場合、他の個別役ガードの効果は発動しない。`;
                    break;    
            case 'fightingSpirit': conditionText = "勝利した時 (パッシブ、持ち点条件あり)"; const scoreConditionText = level >= 3 ? "相手と同値以下" : "相手の半分以下"; const spiritBonusRateText = [10, 20, 30][level - 1]; effectText = `自分の持ち点が${scoreConditionText}の場合、連勝ボーナスの増加量がさらに ${spiritBonusRateText}% 増える。`; break;
            case 'rewardAmplifier': conditionText = "自分の役/目が確定した後 (アクティブ)"; const amplifierUses = level >= 3 ? '2' : '1'; const amplifierBonus = level >= 2 ? '2' : '1'; effectText = `WAVE中 ${amplifierUses}回 使用可能。使用したラウンドで「目」以上の役で勝利した場合、獲得スコア計算時の基本倍率に +${amplifierBonus} 加算される。`; break;
            case 'doubleUpBet': conditionText = "自分が子で、役/目が確定した後 (アクティブ)"; const doubleUpBonus = [1.0, 1.5, 2.0][level - 1].toFixed(1); const doubleUpPenaltyText = (level <= 2) ? `失敗した場合、強制的にヒフミで敗北扱いとなる。` : `失敗してもペナルティはない。`; effectText = `WAVE中 1回 使用可能。使用して勝利した場合、獲得スコア計算時の基本倍率に +${doubleUpBonus} 加算される。${doubleUpPenaltyText}`; break;
            case 'betBoost': conditionText = "賭け金の上限を計算する時 (パッシブ)"; const boostMultiplierText = [1.2, 1.4, 1.6][level - 1].toFixed(1); effectText = `最大ベット額の上限が、自分の持ち点の ${boostMultiplierText}倍 に引き上げられる (ただし相手の持ち点を超えることはできない)。`; break;
            case 'lossInsurance': conditionText = "敗北時のスコア計算時 (パッシブ)"; const insuranceMultiplierText = [1.5, 1.3, 1.1][level - 1].toFixed(1); effectText = `敗北時の支払いスコア計算を上書きし、「賭け金の ${insuranceMultiplierText}倍 (相手の連勝数に応じてさらに増加)」を支払うようになる。`; break;
            case 'reroll1': conditionText = "常時 (パッシブ)"; effectText = `サイコロの最大振り直し回数が、基本の${BASE_MAX_ROLLS}回に加えて +${level} され、合計 ${BASE_MAX_ROLLS + level} 回になる。`; break;
            case 'ignoreMinBet': conditionText = "賭け金設定フェーズ (アクティブ)"; effectText = `WAVE中 ${level}回 使用可能。使用したラウンドでは、最低賭け金が強制的に 1点 になる。`; break;
            case 'shopChoicePlus1':
            conditionText = "ショップ利用時 (パッシブ)";
            let choiceText = "";
            let rerollCostReductionText = "";
            if (level === 1) {
                choiceText = "提示されるカード/パック/強化の選択肢が合計で 1つ 増える。";
            } else if (level === 2) {
                choiceText = "アクティブカードとパッシブカードの選択肢がそれぞれ 1つずつ 増える（合計+2）。";
            } else if (level >= 3) {
                choiceText = "アクティブ、パッシブ、パックの選択肢がそれぞれ 1つずつ 増える（合計+3）。";
                rerollCostReductionText = " さらにリロールコストが10G安くなる。"; 
            }
            effectText = `次にショップを開いた時、${choiceText}${rerollCostReductionText}`;
            break;
            case 'shopDiscount':
                conditionText = "ショップでの購入/強化時 (パッシブ)";
                let discountPercentText = "不明";
                if (level === 1) discountPercentText = "10%";
                else if (level === 2) discountPercentText = "20%";
                else if (level >= 3) discountPercentText = "30%";
                effectText = `ショップでのカード購入、カード強化、パック購入、持ち点増強にかかるコストが ${discountPercentText} 割引される。(リロールは対象外)`;
                break;
            case 'drawBonus': conditionText = "自分の役/目が確定した後 (アクティブ)"; const drawBonusUses = level >= 3 ? 3 : (level === 2 ? 2 : 1); const drawBonusGainText = level === 3 ? "100%" : "50%"; effectText = `WAVE中 ${drawBonusUses}回 使用可能。使用したラウンドで引き分けになった場合、ボーナスとして賭け金の ${drawBonusGainText} を獲得する（スコアに加算）。※目なし時は使用不可`; break;
            case 'keepParentalRight': conditionText = "自分が親で敗北したラウンドの終了時 (アクティブ)"; const keepUses = level >= 2 ? '2' : '1'; const keepDiscountText = level >= 3 ? " さらに、次のラウンドの最低賭け金が半額になる。" : ""; effectText = `WAVE中 ${keepUses}回 まで使用可能。使用すると、親で負けても親権を維持できる。${keepDiscountText}`; break;
            case 'handExchange': // ← カード名は「新装開店」に変更しましたが、IDは handExchange のままです
            conditionText = "ショップ利用時 (パッシブ)";
            let freeRerollsText = "1回"; 
            if (level === 2) {
                freeRerollsText = "2回";
            } else if (level >= 3) {
                freeRerollsText = "3回"; 
            }
            effectText = `次にショップを開いた時、リロールが ${freeRerollsText} 無料になる。`;
            break;
            case 'greedyPot':
                conditionText = "WAVEクリア時 (パッシブ)";
                const greedyBonus = [30, 40, 50][level - 1];
                effectText = `獲得するコイン量が ${greedyBonus}% 増加する。(獲得コインの最低/最高制限値を超えて加算される)`;
                break;
            case 'bountyHunter':
                conditionText = "ラウンド勝利時 (パッシブ)";
                const bountyCoins = [30, 40, 50][level - 1];
                effectText = `スコアとは別に、${bountyCoins} コインを獲得する。`;
                break;
            case 'offeringBox':
                conditionText = "ラウンド終了時 (パッシブ)";
                const offeringCoins = [10, 20, 30][level - 1];
                effectText = `50% の確率で ${offeringCoins} コインを獲得する。(勝敗問わず)`;
                break;
            case 'soulRoll':
                    conditionText = "振り残り回数が0になった後 (アクティブ)";
                    const soulCostPercentText = "10%"; 
                    let soulEffectDetail = "";
                    if (level === 1) {
                        soulEffectDetail = "20%の確率で結果が「シゴロ」になる。";
                    } else if (level === 2) {
                        soulEffectDetail = "20%の確率で結果がランダムな「アラシ」になる。";
                    } else { 
                        soulEffectDetail = "20%の確率で結果が「ピンゾロ」になる。";
                    }
                    effectText = `WAVE中 1回 使用可能。自分の持ち点の ${soulCostPercentText} (最低1点) を消費して、追加で1回サイコロを振ることができる。追加ロール時、${soulEffectDetail}`;
                    break;
            case 'riskyBet':
                conditionText = "賭け金設定フェーズ (アクティブ)";
                const riskyUsesUpdated = level; 
                effectText = `WAVE中 ${riskyUsesUpdated}回 使用可能。使用したラウンドでは最低賭け金が2倍になる。さらに、そのラウンドで勝利した場合、獲得スコア計算時の基本倍率に+1.0、敗北した場合は支払いスコア計算時の支払い倍率に+1.0される。`;
                break;
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
            case 'avoid123_456':
            conditionText = "自分のロール前 (アクティブ)";
            const avoidUsesUpdated = level; 
            const avoidChanceText = [30, 50, 70][level - 1];
            let targetRolesText = "「ヒフミ」か「シゴロ」";
            if (level >= 3) {
                targetRolesText = "「ヒフミ」、「シゴロ」、「目なし」";
            }
            effectText = `WAVE中 ${avoidUsesUpdated}回 使用可能。使用したラウンドで ${targetRolesText} が出た場合、${avoidChanceText}% の確率で結果を「1の目」に変更する。`;
            break;
            case 'blessingDice': conditionText = "自分のロール前 (アクティブ)"; const blessingUses = level >= 3 ? '2' : '1'; const blessingChanceText = ['少し', 'そこそこ', 'かなり'][level - 1]; effectText = `WAVE中 ${blessingUses}回 使用可能。使用したラウンド中、振ったサイコロの各目が${blessingChanceText}の確率で「6」に変わる。`; break;
            case 'adjustEye':
                const adjustUses = (level === 1) ? 1 : (level === 2 ? 2 : 3); 
                const adjustAmountText = '±1'; 
                conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
                effectText = `WAVE中 ${adjustUses}回 使用可能。「目」の数字 *以外* のサイコロを1つ選び、出目を ${adjustAmountText} できる（1未満や6超過は不可）。`;
                break;
            case 'menashiAdjust': 
                conditionText = "自分のロール結果が「目なし」になった後 (アクティブ)";
                const menashiAdjustUses = level; 
                effectText = `WAVE中 ${menashiAdjustUses}回 使用可能。3つのサイコロから1つを選び、出目を ±1 できる（1未満や6超過は不可）。`;
                break;    
            case 'stormWarning': conditionText = "自分のロール前 (アクティブ)"; const stormRerollCount = level >= 2 ? '2' : '1'; const stormTargetRoleText = level >= 3 ? 'アラシまたはピンゾロ' : 'アラシ'; const stormBonusChanceText = [10, 15, 20][level - 1]; effectText = `WAVE中 1回 使用可能。使用後の最初のロールで${stormTargetRoleText} *以外* が出た場合、最大 ${stormRerollCount}回 まで振り直し回数を消費せずに振り直せる。無料振り直し中はゾロ目確率が ${stormBonusChanceText}% 上昇し、低確率で結果がアラシになる。`; break;
            case 'nextChance':
            conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
            const nextChanceUsesUpdated = level; 
            const zoroUpPercentText = [5, 10, 15][level - 1];
            effectText = `WAVE中 ${nextChanceUsesUpdated}回 使用可能。「目」の数字と同じサイコロを **1つ** 選んで振り直すことができる。振り直し時、その目がゾロ目になる確率が ${zoroUpPercentText}% 追加される。(他のゾロ目UP効果と重複可)`;
            break;
            case 'blindingDice': // ID は blindingDice のまま
                conditionText = "自分が親で、役/目が確定した後 (アクティブ)";
                const blindingAvoidChanceText = ['30%', '50%', '70%'][level - 1];
                const blindingShonbenText = level >= 3 ? " さらに相手がションベンする確率も少し上げる。" : "";
                effectText = `WAVE中 1回 使用可能。使用したラウンド中、相手が良い役（ピンゾロ/アラシ/シゴロ/ヒフミ）を出した場合に、それを無効化（目なし扱い）する確率が ${blindingAvoidChanceText} になる。${blindingShonbenText}`;
                break;
            case 'stormRoulette':
            conditionText = "自分のロール結果が「アラシ」になった後 (アクティブ)";
            const rouletteUses = level; 
            const pinzoroPercentText = [5, 10, 15][level - 1];
            effectText = `WAVE中 ${rouletteUses}回 使用可能。アラシの目を振り直し、別の数字のアラシに変更する。${pinzoroPercentText}% の確率でピンゾロに変化する。`;
            break;
            case 'destinyShift':
                conditionText = "自分のロール結果が特定の役/状態になった後 (アクティブ)";
                const destinyUses = level; 
                let destinyTargetText = "「ヒフミ」か「シゴロ」";
                if (level >= 3) {
                    destinyTargetText = "「ヒフミ」、「シゴロ」、「目なし」";
                }
                effectText = `WAVE中 ${destinyUses}回 使用可能。${destinyTargetText} が出た場合、追加の振り直し権利を得る（ロール回数上限無視）。振り直すか選択でき、振り直した場合は結果が必ず ${destinyTargetText} 以外になる。`;
                break;
            default: conditionText = "---"; effectText = '---'; break;
            case 'adjustEyeValue':
                conditionText = "自分のロール結果が「目」になった後 (アクティブ)";
                const adjustEyeValueUses = level;
                effectText = `WAVE中 ${adjustEyeValueUses}回 使用可能。「目」としてカウントされている数字（ペアでない方の数字）の出目を ±1 できる（1未満や6超過は不可）。使用時に調整方向を選択する。`;
                break;
            case 'activeHandExpansion':
                    conditionText = "常時 (パッシブ)";
                    effectText = `アクティブカードの手札上限が +${level} される。(合計: ${4 + level}枚)`;
                    break;
            case 'passiveHandExpansion':
                    conditionText = "常時 (パッシブ)";
                    effectText = `パッシブカードの手札上限が +${level} される。(合計: ${4 + level}枚)`;
                    break;  
            case 'retryRoll':
                    conditionText = "自分の役または目が確定した後 (アクティブ)";
                    const retryUses = level;
                    const retryCostText = "現在の持ち点の10% (最低1点)"; 
                    effectText = `WAVE中 ${retryUses}回 使用可能。${retryCostText} を消費して、確定した役/目を「目なし」に戻し、振り直し回数をリセットする（再度${currentMaxRolls}回まで振れる）。`;
                    break;     
            case 'lastStand':
                    conditionText = "敗北し持ち点が最低賭け金を下回った時 (自動発動)";
                    let lastStandEffectText = `WAVE中 1回のみ、持ち点を最低賭け金と同額まで回復しゲームオーバーを回避する。`;
                    if (level >= 2) {
                        lastStandEffectText += ` さらに、次のラウンドの最低賭け金が半額になる。`;
                    }
                    if (level >= 3) {
                        lastStandEffectText += ` さらに、発動時に 50 コインを獲得する。`;
                    }
                    effectText = lastStandEffectText;
                    break;             
        }
        const conditionHtml = conditionText ? `<b>【発動条件/タイミング】</b><br>${conditionText}<br>` : '';
        return `${conditionHtml}<b>【効果】</b><br>${effectText}`;
    }
    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } } // (変更なし)
    function openCardDetailModal(cardId, currentLevel = 1) { 
        const cardData = playerCards.find(c => c.id === cardId); 
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
        const exchangeCard = playerCards.find(card => card.id === 'handExchange'); // IDは handExchange のまま
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 3 ? 3 : (exchangeCard.level === 2 ? 2 : 1)) : 0;
        activeCardUses['handExchangeFreeRerollCount'] = 0;

        console.log(`新装開店 Card Lv.${exchangeCard?.level}, Free rerolls for this visit: ${freeRerollsAvailableThisShopVisit}`);

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
        currentShopOffers = []; // オファーリストをリセット
        const activeCardOffersEl = document.getElementById('active-card-offers');
        const passiveCardOffersEl = document.getElementById('passive-card-offers');
        const packOffersEl = document.getElementById('pack-offers');
        const boostOffersEl = document.getElementById('boost-offers');

        if (!shopOffersContainerEl || !activeCardOffersEl || !passiveCardOffersEl || !packOffersEl || !boostOffersEl) {
            console.error("Shop offer container elements not found!");
            return;
        }
        // コンテナクリア
        activeCardOffersEl.innerHTML = ''; passiveCardOffersEl.innerHTML = ''; packOffersEl.innerHTML = ''; boostOffersEl.innerHTML = '';

        // 割引率計算
        const discountCard = playerCards.find(card => card.id === 'shopDiscount');
        const discountLevel = discountCard ? discountCard.level : 0;
        let discountRate = 0;
        if (discountLevel === 1) discountRate = 0.1;
        else if (discountLevel === 2) discountRate = 0.2;
        else if (discountLevel >= 3) discountRate = 0.3;

        if (discountRate > 0) {
            console.log(`Applying Shop Discount Lv.${discountLevel} (${discountRate * 100}%)`);
        }

        // 各種アイテムプール取得
        const activeCardPool = allCards.filter(card => !!card.usesPerWave);
        const passiveCardPool = allCards.filter(card => !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag));
        // boostItems は全種類取得 (フィルタリングしない)
        // const availableBoosts = boostItems.filter(boost => !purchasedOrUpgradedInShop.includes(boost.id));

        // オファー数計算
        let numActiveOffers = 3;
        let numPassiveOffers = 3;
        let numPackOffers = 2;
        let numBoostOffers = boostItems.length;
        const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (choiceCard) {
            const level = choiceCard.level;
            console.log(`ショップ選択肢＋ Lv.${level} 効果適用！`);
            // (ショップ選択肢+のロジックは変更なし - 利用可能なプールで判定)
            const availableActiveForChoice = activeCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL));
            const availablePassiveForChoice = passiveCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL));
            const availablePacksForChoice = packDefinitions.filter(pack => !purchasedOrUpgradedInShop.includes(pack.id)); // purchasedも考慮
            if (level === 1) {
                const canAddActive = availableActiveForChoice.length > numActiveOffers;
                const canAddPassive = availablePassiveForChoice.length > numPassiveOffers;
                const canAddPack = availablePacksForChoice.length > numPackOffers;
                const options = [];
                if (canAddActive) options.push('active');
                if (canAddPassive) options.push('passive');
                if (canAddPack) options.push('pack');
                if (options.length > 0) {
                    const randomChoice = options[Math.floor(Math.random() * options.length)];
                    if (randomChoice === 'active') numActiveOffers++;
                    else if (randomChoice === 'passive') numPassiveOffers++;
                    else if (randomChoice === 'pack') numPackOffers++;
                    console.log(` -> Lv1: Added ${randomChoice} offer.`);
                }
            } else if (level === 2) {
                if (availableActiveForChoice.length > numActiveOffers) numActiveOffers++;
                if (availablePassiveForChoice.length > numPassiveOffers) numPassiveOffers++;
                console.log(` -> Lv2: Active/Passive offers potentially increased.`);
            } else if (level >= 3) {
                if (availableActiveForChoice.length > numActiveOffers) numActiveOffers++;
                if (availablePassiveForChoice.length > numPassiveOffers) numPassiveOffers++;
                if (availablePacksForChoice.length > numPackOffers) numPackOffers++;
                console.log(` -> Lv3: Active/Passive/Pack offers potentially increased.`);
            }
        }


        // --- キープアイテムの処理 ---
        let offersToGenerate = []; // 最終的に表示するオファーの配列
        let keptItemData = null;   // キープされているアイテムの詳細データ

        if (keptShopItem) {
            console.log("Keep item exists:", keptShopItem);
            let poolToCheck;
            if (keptShopItem.type === 'card') {
                poolToCheck = allCards;
            } else if (keptShopItem.type === 'pack') {
                poolToCheck = packDefinitions;
            } else {
                 poolToCheck = [];
            }

            // キープアイテムの完全なデータを取得
            const foundItem = poolToCheck.find(item => item.id === keptShopItem.id);

            if (foundItem) {
                keptItemData = { ...foundItem, itemType: keptShopItem.type }; // タイプを確実に設定

                if (keptItemData.itemType === 'card') {
                    const ownedCard = playerCards.find(c => c.id === keptShopItem.id);
                    keptItemData.cardActualType = keptItemData.usesPerWave ? 'active' : 'passive';
                    keptItemData.isOwned = !!ownedCard;
                    keptItemData.currentLevel = ownedCard ? ownedCard.level : 0;
                     if (keptItemData.isOwned && keptItemData.currentLevel >= MAX_CARD_LEVEL) {
                         console.log(`Kept card (${keptItemData.id}) is max level. Removing keep.`);
                         keptShopItem = null;
                         keptItemData = null; // 表示しない
                     }
                } else if (keptItemData.itemType === 'boost') {
                     if (purchasedOrUpgradedInShop.includes(keptItemData.id)) {
                         console.log(`Kept boost item (${keptItemData.id}) is already purchased. Removing keep.`);
                         keptShopItem = null;
                         keptItemData = null; // 表示しない
                     }
                } else if (keptItemData.itemType === 'pack') {
                     if (purchasedOrUpgradedInShop.includes(keptItemData.id)) {
                         console.log(`Kept pack item (${keptItemData.id}) is already purchased. Removing keep.`);
                         keptShopItem = null;
                         keptItemData = null; // 表示しない
                     }
                 }


                // 有効なキープアイテムデータがある場合のみ処理続行
                if (keptItemData) {
                    console.log("Found valid kept item data:", keptItemData);
                    // キープアイテムの表示コスト計算 (割引適用)
                     let baseCost = 0;
                     const isCardMaxLevel = keptItemData.itemType === 'card' && keptItemData.isOwned && keptItemData.currentLevel >= MAX_CARD_LEVEL;

                     if (keptItemData.itemType === 'card') {
                         if (keptItemData.isOwned && !isCardMaxLevel) {
                             baseCost = getCostToUpgradeToNextLevel(keptItemData, keptItemData.currentLevel + 1);
                         } else if (!keptItemData.isOwned) {
                             baseCost = keptItemData.cost || 0;
                         }
                     } else if (keptItemData.itemType === 'pack') {
                          let calculatedPackCost = keptItemData.baseCost || 0;
                          // パックコスト計算ロジック (必要なら再実行)
                          if (keptItemData.costCalculation === 'average' && keptItemData.cardPool?.length > 0) {
                             let totalCostPack = 0, validCardCountPack = 0;
                             keptItemData.cardPool.forEach(cid => {
                                 const cardInPack = allCards.find(c => c.id === cid);
                                 if(cardInPack) { totalCostPack += cardInPack.cost; validCardCountPack++; }
                             });
                             if(validCardCountPack > 0) calculatedPackCost = Math.max(10, Math.round(Math.floor(totalCostPack / validCardCountPack) / 10) * 10);
                          }
                          baseCost = calculatedPackCost;
                     } else { // boost
                         baseCost = keptItemData.cost || 0;
                     }

                     let displayCost = baseCost;
                     if (discountRate > 0 && !isCardMaxLevel) { // 最大レベルカード以外に割引適用
                         displayCost = Math.max(1, Math.floor(baseCost * (1 - discountRate)));
                     }
                     keptItemData.displayCost = displayCost; // 計算したコストを設定


                    offersToGenerate.push(keptItemData); // 表示リストに追加

                    // キープしたアイテムに応じて、ランダムオファー数を減らす
                    if (keptItemData.itemType === 'card') {
                        if (keptItemData.cardActualType === 'active') numActiveOffers = Math.max(0, numActiveOffers - 1);
                        else numPassiveOffers = Math.max(0, numPassiveOffers - 1);
                    } else if (keptItemData.itemType === 'pack') {
                        numPackOffers = Math.max(0, numPackOffers - 1);
                    } else if (keptItemData.itemType === 'boost') {
                        numBoostOffers = Math.max(0, numBoostOffers - 1);
                    }
                    console.log("Adjusted offer counts due to kept item.");
                }
            } else {
                console.warn("Kept item data could not be found or is invalid. Clearing keep.");
                keptShopItem = null; // データが見つからなければキープ解除
            }
        }

        // --- ランダムオファーの生成 (キープアイテムを除外して抽選) ---
        const generateRandomOffers = (pool, num, type, actualType = null) => {
            if (num <= 0) return [];
            const filteredPool = pool.filter(item => {
                if (keptShopItem && item.id === keptShopItem.id) return false;
                if (type === 'pack' && purchasedOrUpgradedInShop.includes(item.id)) return false;
                if (type === 'card') {
                    const owned = playerCards.find(c => c.id === item.id);
                    if (owned && owned.level >= MAX_CARD_LEVEL) return false;
                }
                return true;
            });
            const shuffled = filteredPool.sort(() => 0.5 - Math.random());
            const selectedOffers = [];
            console.log(`Generating ${num} random offers of type ${type} from pool size ${shuffled.length}`);
            for (let i = 0; i < Math.min(num, shuffled.length); i++) {
                const itemData = { ...shuffled[i], itemType: type };
                if (type === 'card') {
                    itemData.cardActualType = actualType;
                    const ownedCard = playerCards.find(c => c.id === itemData.id);
                    itemData.isOwned = !!ownedCard;
                    itemData.currentLevel = ownedCard ? ownedCard.level : 0;
                }
                 // コスト計算 (割引適用)
                 let baseCost = 0;
                 const isMaxLevel = itemData.itemType === 'card' && itemData.isOwned && itemData.currentLevel >= MAX_CARD_LEVEL;
                 if (itemData.itemType === 'card') {
                     if (itemData.isOwned && !isMaxLevel) {
                         baseCost = getCostToUpgradeToNextLevel(itemData, itemData.currentLevel + 1);
                     } else if (!itemData.isOwned) {
                         baseCost = itemData.cost || 0;
                     }
                 } else if (itemData.itemType === 'pack') {
                      let calculatedPackCost = itemData.baseCost || 0;
                      if (itemData.costCalculation === 'average' && itemData.cardPool?.length > 0) {
                         let totalCostPack = 0, validCardCountPack = 0;
                         itemData.cardPool.forEach(cid => {
                             const cardInPack = allCards.find(c => c.id === cid);
                             if(cardInPack) { totalCostPack += cardInPack.cost; validCardCountPack++; }
                         });
                         if(validCardCountPack > 0) calculatedPackCost = Math.max(10, Math.round(Math.floor(totalCostPack / validCardCountPack) / 10) * 10);
                      }
                      baseCost = calculatedPackCost;
                 } else { // boost
                     baseCost = itemData.cost || 0;
                 }
                 let displayCost = baseCost;
                 if (discountRate > 0 && !isMaxLevel) {
                     displayCost = Math.max(1, Math.floor(baseCost * (1 - discountRate)));
                 }
                 itemData.displayCost = displayCost;

                selectedOffers.push(itemData);
            }
            return selectedOffers;
        };

        // キープアイテム以外のオファーを生成して結合
        offersToGenerate.push(...generateRandomOffers(activeCardPool, numActiveOffers, 'card', 'active'));
        offersToGenerate.push(...generateRandomOffers(passiveCardPool, numPassiveOffers, 'card', 'passive'));
        offersToGenerate.push(...generateRandomOffers(packDefinitions, numPackOffers, 'pack'));
        boostItems.forEach(boostItem => {
            const itemData = { ...boostItem, itemType: 'boost' };
            // コスト計算 (割引適用)
            let baseCost = itemData.cost || 0;
            let displayCost = baseCost;
            if (discountRate > 0) { // Boostも割引する場合
                 displayCost = Math.max(1, Math.floor(baseCost * (1 - discountRate)));
            }
            itemData.displayCost = displayCost;
            if (!offersToGenerate.some(offer => offer.id === itemData.id)) {
                 offersToGenerate.push(itemData);
            }
       });

        // currentShopOffers を更新 (handleBuyCard で参照するため)
        currentShopOffers = [...offersToGenerate];

        // --- オファーのHTML要素生成と表示 ---
        offersToGenerate.forEach(offer => {
            const itemElement = document.createElement('div');
            let targetContainer = null;
            let elementClasses = [];
            let costDisplay = '';
            let itemNameHtml = offer.name || '不明なアイテム';
            let rarityBadgeHtml = '';
            let typeBadgeHtml = '';
            let levelSpan = '';
            let datasetIdAttr = offer.itemType === 'card' ? 'cardId' : 'itemId'; 
            let detailButtonHtml = '';
            let buyButtonHtml = '';
            let keepButtonHtml = '';

            // キープボタンHTML
            if (offer.itemType !== 'boost') {
                const isKept = keptShopItem && keptShopItem.id === offer.id;
                keepButtonHtml = `<button class="shop-keep-toggle ${isKept ? 'kept' : ''}" data-item-id="${offer.id}" data-item-type="${offer.itemType}" title="${isKept ? 'キープ解除' : 'キープする'}">KEEP</button>`;
            }

            // アイテムタイプごとの設定
            if (offer.itemType === 'card') {
                const rarityClass = ['normal', 'rare', 'epic', 'legendary'][offer.rarity - 1] || 'normal';
                elementClasses = ['card', `type-${offer.type}`, `rarity-${rarityClass}`];
                typeBadgeHtml = `<span class="card-type-badge">${getCardTypeName(offer.type)}</span>`;
                const rarityText = ['N', 'R', 'EP', 'LG'][offer.rarity - 1] || 'N';
                rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
                detailButtonHtml = `<button class="card-detail-button button-subtle" data-card-id="${offer.id}" data-current-level="${offer.currentLevel || 1}">詳細</button>`;

                if (offer.isOwned) {
                    elementClasses.push('upgradeable');
                    if (offer.currentLevel >= MAX_CARD_LEVEL) {
                        elementClasses.push('max-level');
                        costDisplay = `<span class="card-cost">最大Lv</span>`;
                        levelSpan = `<span class="card-level">(Lv.${offer.currentLevel})</span>`;
                    } else {
                        costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`;
                        const nextLevel = offer.currentLevel + 1;
                        const levelColorClass = `card-level-value-${nextLevel}`;
                        levelSpan = `<span class="card-level">(Lv.${offer.currentLevel} → <span class="${levelColorClass}">Lv.${nextLevel}</span>)</span>`;
                        buyButtonHtml = `<button class="buy-button upgrade-button button-pop" data-card-id="${offer.id}" data-action="upgrade" data-cost="${offer.displayCost}">強化</button>`;
                        if (nextLevel === 3) elementClasses.push('upgradeable-lv3');
                    }
                } else {
                    costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`;
                    buyButtonHtml = `<button class="buy-button button-pop" data-card-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`;
                }
                itemNameHtml = `${offer.name}${levelSpan}`;
                targetContainer = offer.cardActualType === 'active' ? activeCardOffersEl : passiveCardOffersEl;
            }
            else if (offer.itemType === 'pack') {
                 elementClasses = ['pack', 'shop-item'];
                 costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`;
                 buyButtonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`;
                 targetContainer = packOffersEl;
             }
             else if (offer.itemType === 'boost') {
                 elementClasses = ['boost-item', 'shop-item'];
                 costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`;
                 // 購入済みならボタン非表示、そうでなければ表示
                 if (purchasedOrUpgradedInShop.includes(offer.id)) {
                     buyButtonHtml = ''; // 空にする
                     costDisplay = `<span class="card-cost" style="color:#aaa;">購入済</span>`; // 表示変更
                 } else {
                     buyButtonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`;
                 }
                 targetContainer = boostOffersEl;
             }


            itemElement.className = elementClasses.join(' ');
            itemElement.dataset[datasetIdAttr] = offer.id;
            if (offer.image) { itemElement.style.backgroundImage = `url('${offer.image}')`; }

            const itemInnerHtml = `
                ${keepButtonHtml}
                ${typeBadgeHtml}
                ${rarityBadgeHtml}
                <h3 class="card-name">${itemNameHtml}</h3>`;
            itemElement.innerHTML = itemInnerHtml;

            const footer = document.createElement('div');
            footer.className = 'card-footer';
            if (offer.itemType === 'card') {
                 footer.innerHTML = `${costDisplay}${detailButtonHtml}${buyButtonHtml}`;
             } else {
                 footer.innerHTML = `${costDisplay}${buyButtonHtml}`;
             }
            itemElement.appendChild(footer);

            // キープ状態クラス付与 (boost以外)
            if (offer.itemType !== 'boost' && keptShopItem && keptShopItem.id === offer.id) {
                itemElement.classList.add('item-kept');
            }

            // 購入済みクラス付与 (Boostは別途処理済み)
            if (offer.itemType !== 'boost' && purchasedOrUpgradedInShop.includes(offer.id)) {
                itemElement.classList.add('sold-out');
                const keepBtnEl = itemElement.querySelector('.shop-keep-toggle');
                if (keepBtnEl) keepBtnEl.style.display = 'none'; // sold-outならキープボタン非表示
            }
            if (targetContainer) {
                targetContainer.appendChild(itemElement);
            }
        });

        // 空メッセージ表示 (boostも考慮)
        [activeCardOffersEl, passiveCardOffersEl, packOffersEl, boostOffersEl].forEach(container => {
             if (container && container.children.length === 0) {
                  let emptyMsg = "(オファーなし)";
                  if(container === packOffersEl && !packDefinitions.some(p => !purchasedOrUpgradedInShop.includes(p.id))) emptyMsg = "(全パック購入済み)";
                  container.innerHTML = `<span class="shop-empty-message">${emptyMsg}</span>`;
             }
        });

        // 詳細ボタンリスナー設定
        document.querySelectorAll('.shop-offers-container .card-detail-button').forEach(button => { button.removeEventListener('click', handleDetailButtonClick); button.addEventListener('click', handleDetailButtonClick); });

        // キープボタンのリスナーをここで設定 
        document.querySelectorAll('.shop-keep-toggle').forEach(button => {
             button.removeEventListener('click', handleKeepToggle);
             button.addEventListener('click', handleKeepToggle);
        });

        updateShopUI();
    } // displayShopOffers 関数の終わり

// キープ状態切り替え処理
function handleKeepToggle(event) {
    playSound('click'); // キープボタンクリック音
    const button = event.target;
    const itemId = button.dataset.itemId;
    const itemType = button.dataset.itemType;

    if (!itemId || !itemType) {
        console.error("Keep toggle button missing data:", button);
        return;
    }

    const previouslyKeptId = keptShopItem ? keptShopItem.id : null;

    // --- まず、現在キープされているものがあれば解除 ---
    if (keptShopItem) {
        const oldKeptElement = document.querySelector(`.shop-item-row [data-item-id="${keptShopItem.id}"], .shop-item-row [data-card-id="${keptShopItem.id}"]`);
        if (oldKeptElement) {
            oldKeptElement.classList.remove('item-kept');
            const oldKeepBtn = oldKeptElement.querySelector('.shop-keep-toggle');
            if (oldKeepBtn) {
                oldKeepBtn.classList.remove('kept');
                oldKeepBtn.title = 'キープする';
            }
        }
        keptShopItem = null; // 変数もリセット
    }

    // --- クリックされたものが、以前キープされていたものと違う場合、新たにキープ ---
    if (itemId !== previouslyKeptId) {
        keptShopItem = { id: itemId, type: itemType }; // 新しいアイテムをキープ
        const newKeptElement = document.querySelector(`.shop-item-row [data-item-id="${itemId}"], .shop-item-row [data-card-id="${itemId}"]`);
        if (newKeptElement) {
            newKeptElement.classList.add('item-kept');
            button.classList.add('kept');
            button.title = 'キープ解除';
            console.log("Item kept:", keptShopItem);
        } else {
            console.error("Could not find element to apply keep style:", itemId);
            keptShopItem = null; // スタイル適用失敗ならキープ解除
        }
    } else {
        // 同じアイテムをクリック＝キープ解除なので何もしない（既に解除済み）
        console.log("Item unkept:", itemId);
    }

    // updateShopUI(); // 必要に応じてボタン状態などを再評価する場合
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
        const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1'); // ショップ選択肢＋
        if (shopChoiceCard) {
            if (shopChoiceCard.level >= 3) {
                 currentRerollCost = Math.max(0, REROLL_COST - 10);
            }
        }

        let rerollButtonText = "";
        let rerollDisabled = false;
        const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange'); // 新装開店チェック
        const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 3 ? 3 : (exchangeCardCheck.level === 2 ? 2 : 1)) : 0;
        const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

        console.log(`updateShopUI - Reroll Check: playerCoins=${playerCoins}, currentRerollCost=${currentRerollCost}, freeAvailable=${currentFreeRerollsAvailable}, freeUsed=${usedFreeRerollsThisVisit}`);

        if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) {
            rerollButtonText = `無料リロール (${currentFreeRerollsAvailable - usedFreeRerollsThisVisit}回)`;
            currentRerollCost = 0;
            rerollDisabled = false;
            console.log(" -> Free reroll available. Button enabled.");
        } else {
            rerollButtonText = `リロール (${currentRerollCost} G)`;
            rerollDisabled = playerCoins < currentRerollCost;
            console.log(` -> Paid reroll. Disabled: ${rerollDisabled} (Coins: ${playerCoins}, Cost: ${currentRerollCost})`);
        }

        if (shopRerollCostEl) shopRerollCostEl.textContent = currentRerollCost;
        if (shopRerollButton) {
            shopRerollButton.innerHTML = `<span class="reroll-icon">↻</span> ${rerollButtonText}`;
            shopRerollButton.disabled = rerollDisabled;
        }
    }
    async function handleBuyCard(event) {
        const button = event.target.closest('.buy-button, .upgrade-button');
        if (!button) { console.warn("Buy/Upgrade button not found in clicked element or parents."); return; }

        // datasetから id と action を取得
        const itemId = button.dataset.cardId || button.dataset.itemId;
        const action = button.dataset.action; // 'buy' or 'upgrade'
        const cost = parseInt(button.dataset.cost || '0');

        if (!itemId || !action) {
             console.error("Button missing data-item-id/data-card-id or data-action");
             return;
        }

        // currentShopOffers から該当する offerData を見つける
        const offerData = currentShopOffers.find(offer => offer.id === itemId);

        if (!offerData) {
            console.error("Offer data not found for item:", itemId, "in currentShopOffers:", currentShopOffers);
            setShopMessage("エラー：アイテム情報が見つかりません。");
            return;
        }

        const actualCost = cost; // dataset のコストを使用

        // コインチェック
        if (playerCoins < actualCost) {
            playSound('error');
            setShopMessage("コインが足りません！");
            return;
        }

        console.log(`Processing ${action} for item: ${itemId}, type: ${offerData.itemType}, cost: ${actualCost}`);

        // 効果音再生
        if (action === 'upgrade') {
            playSound('levelUpButton');
        } else {
            playSound('buyButton');
        }

        const startCoins = playerCoins;

        // キープ解除処理用の関数
        const processKeepRemoval = (idToUnkeep) => {
             if (keptShopItem && keptShopItem.id === idToUnkeep) {
                 console.log(`Item ${idToUnkeep} purchased/upgraded, removing keep.`);
                 const keptElement = document.querySelector(`.shop-item-row [data-item-id="${idToUnkeep}"], .shop-item-row [data-card-id="${idToUnkeep}"]`);
                 if (keptElement) {
                     keptElement.classList.remove('item-kept');
                     const keepBtn = keptElement.querySelector('.shop-keep-toggle');
                     if (keepBtn) {
                         keepBtn.classList.remove('kept');
                         keepBtn.title = 'キープする';
                     }
                 }
                 keptShopItem = null;
             }
        };

        let purchaseOrUpgradeSuccess = false; // 処理成功フラグ

        if (offerData.itemType === 'card') {
            if (action === 'upgrade') {
                const currentCardData = playerCards.find(c => c.id === itemId);
                if (!currentCardData || currentCardData.level >= MAX_CARD_LEVEL) {
                    setShopMessage("これ以上強化できません。");
                    playSound('error');
                    return; // 処理中断
                }
                const nextLevel = currentCardData.level + 1;

                playerCoins -= actualCost;
                currentCardData.level = nextLevel;
                purchasedOrUpgradedInShop.push(itemId);
                console.log(`Upgraded card: ${offerData.name} to Lv.${nextLevel} for ${actualCost}G`);
                setShopMessage(`${offerData.name} を Lv.${nextLevel} に強化しました！`);
                purchaseOrUpgradeSuccess = true; // 成功フラグ

                applyPlayerCardEffects();
                // updateShopUI(); // ← processKeepRemoval の後、最後に呼び出す

                await showItemRevealModal({ item: offerData, level: nextLevel, source: 'upgrade' });

                if (actualCost > 0) {
                    playSound('shopBuy');
                    animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                    animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                    playCoinAnimation(actualCost);
                }

            } else { // action === 'buy'
                const purchased = await purchaseCard(offerData, actualCost);
                 if (purchased) {
                     purchaseOrUpgradeSuccess = true; // 成功フラグ
                     // showItemRevealModal は purchaseCard 内で呼ばれる
                 }
            }
        } else if (offerData.itemType === 'pack') {
            if (action === 'buy') {
                 const purchased = await purchasePack(offerData, actualCost); // purchasePack が Promise<boolean> を返すように期待
                 if (purchased) {
                     purchaseOrUpgradeSuccess = true; // 成功フラグ
                     // showItemRevealModal は purchasePack 内で呼ばれる
                 }
            } else { console.warn("Upgrade action requested for a pack item."); }
        } else if (offerData.itemType === 'boost') {
            if (action === 'buy') {
                 const purchased = await purchaseBoost(offerData, actualCost); // purchaseBoost が Promise<boolean> を返すように期待
                 if (purchased) {
                     purchaseOrUpgradeSuccess = true; // 成功フラグ
                     // showItemRevealModal は purchaseBoost 内で呼ばれる
                 }
            } else { console.warn("Upgrade action requested for a boost item."); }
        } else {
            console.error("Unknown item type:", offerData.itemType);
        }

        // 処理成功時にキープ解除
        if (purchaseOrUpgradeSuccess) {
             processKeepRemoval(itemId);
        }

        updateShopUI(); // SOLD OUT表示、ボタン状態、キープ状態などを反映

    } // handleBuyCard 関数の終わり
    async function purchaseCard(cardDefinition, purchaseCost) { 
        return new Promise(async (resolve) => {
            const cardDef = allCards.find(c => c.id === cardDefinition.id); if (!cardDef) { console.error("Card definition not found for", cardDefinition.id); resolve(false); return; }
            const isBuyingActive = !!cardDef.usesPerWave; const cardType = isBuyingActive ? 'active' : 'passive'; let currentCount = 0; playerCards.forEach(handCardData => { const handCardDef = allCards.find(c => c.id === handCardData.id); if (handCardDef) { const handCardIsActive = !!handCardDef.usesPerWave; if ((isBuyingActive && handCardIsActive) || (!isBuyingActive && !handCardIsActive)) { currentCount++; } } }); const limit = isBuyingActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS; const typeNameJp = isBuyingActive ? 'アクティブ' : 'パッシブ';
            if (currentCount >= limit) {
                setShopMessage(`${typeNameJp}カードの手札がいっぱいです！売却する${typeNameJp}カードを選んでください。`);
                cardToDiscardFor = { ...cardDefinition, cost: purchaseCost, itemType: 'card' };
                cardTypeToDiscard = cardType;
                openDiscardModal();
                resolve(false); // 購入自体はまだ完了していない
                return;
           }

           const startCoins = playerCoins;
           playerCoins -= purchaseCost;
           playerCards.push({ id: cardDefinition.id, level: 1 });
           purchasedOrUpgradedInShop.push(cardDefinition.id);
           console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${purchaseCost}G`);
           setShopMessage(`${cardDefinition.name} を購入しました！`);

           applyPlayerCardEffects();
           updateShopUI();         // UI全体を更新

           await showItemRevealModal({ item: cardDefinition, level: 1, source: 'buy' });

           if (purchaseCost > 0) {
               animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
               animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
               playCoinAnimation(purchaseCost);
           }
           resolve(true); // 購入成功
       });
   }
   async function purchasePack(packDefinition, purchaseCost) {
    return new Promise(async (resolve) => {
       const startCoins = playerCoins;
       playerCoins -= purchaseCost; // コインを先に減らす
       purchasedOrUpgradedInShop.push(packDefinition.id);
       console.log(`Bought pack: ${packDefinition.name} for ${purchaseCost}G`);
       setShopMessage(`${packDefinition.name} を購入！ カードを開封中...`);
       updateShopUI();

       // コインアニメーション (UI更新の後)
       if (purchaseCost > 0) {
           playSound('shopBuy'); // 購入成功音
           animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
           animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
           playCoinAnimation(purchaseCost);
       }

       const possibleCards = packDefinition.cardPool || [];
       if (possibleCards.length === 0) {
           await showItemRevealModal({ item: packDefinition, source: 'pack_empty' });
           resolve(true);
           return;
       }
       const randomIndex = Math.floor(Math.random() * possibleCards.length);
       const drawnCardId = possibleCards[randomIndex];
       const drawnCardDef = allCards.find(c => c.id === drawnCardId);

       if (drawnCardDef) {
           await new Promise(res => setTimeout(res, 800)); // 演出待機

           const existingCard = playerCards.find(c => c.id === drawnCardId);
           let newItemLevel = 1;
           let revealSource = 'pack_new';
           let applyEffectAndUpdateUI = false; // 効果適用とUI更新が必要かどうかのフラグ

           if (existingCard) { // 既に持っているカードの場合
               if (existingCard.level < MAX_CARD_LEVEL) { // レベルアップ可能
                   existingCard.level++;
                   newItemLevel = existingCard.level;
                   revealSource = 'pack_upgrade';
                   setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現！Lv.${newItemLevel}にアップグレード！`);
                   console.log(` -> Upgraded ${drawnCardDef.name} to Lv.${newItemLevel} from pack.`);
                   applyEffectAndUpdateUI = true; // 効果適用とUI更新が必要
               } else { // 既に最大レベル
                   revealSource = 'pack_max_level';
                   setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現しましたが、既に最大レベルです。`);
                   console.log(` -> Drew ${drawnCardDef.name} from pack, but already max level.`);
               }
               // アイテム獲得演出はカードの状態が決まってから表示
               await showItemRevealModal({ item: drawnCardDef, level: newItemLevel, source: revealSource, packName: packDefinition.name });

               // 効果適用とUI更新 (レベルアップした場合)
               if (applyEffectAndUpdateUI) {
                   applyPlayerCardEffects();
                   updateShopHandDisplay(); // 手札表示だけ更新で良いかも
                   updateShopUI();         // 念のため全体も更新
               }

               resolve(true);

           } else { // 新規カードの場合
               const isDrawnCardActive = !!drawnCardDef.usesPerWave;
               const drawnCardType = isDrawnCardActive ? 'active' : 'passive';
               let currentCount = 0;
               playerCards.forEach(handCardData => {
                   const handCardDef = allCards.find(c => c.id === handCardData.id);
                   if (handCardDef) {
                       const handCardIsActive = !!handCardDef.usesPerWave;
                       if ((isDrawnCardActive && handCardIsActive) || (!isDrawnCardActive && !handCardIsActive)) {
                           currentCount++;
                       }
                   }
               });
               const limit = isDrawnCardActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS;
               const typeNameJp = isDrawnCardActive ? 'アクティブ' : 'パッシブ';

               // アイテム獲得演出を先に表示
               await showItemRevealModal({ item: drawnCardDef, level: 1, source: 'pack_new', packName: packDefinition.name });

               if (currentCount >= limit) { // 手札上限チェック
                   cardToDiscardFor = { ...drawnCardDef, cost: 0, itemType: 'card' };
                   cardTypeToDiscard = drawnCardType;
                   setShopMessage(`${drawnCardDef.name} を獲得！しかし${typeNameJp}カードの手札がいっぱいです！売却するカードを選んでください（新しいカードを選ぶと保持します）。`);
                   openDiscardModal(); // 破棄モーダルを開く
                   // モーダルが開くので、ここではUI更新しない
                   resolve(true); // 購入自体は成功扱い
                   return;
               } else { // 手札に空きあり
                   playerCards.push({ id: drawnCardDef.id, level: 1 });
                   setShopMessage(`${drawnCardDef.name} を獲得しました！`);
                   console.log(` -> Added ${drawnCardDef.name} (Lv.1) from pack to hand.`);
                   applyEffectAndUpdateUI = true; // 効果適用とUI更新が必要

                   // 効果適用とUI更新 (新規カード追加時)
                   if (applyEffectAndUpdateUI) {
                        applyPlayerCardEffects();
                        updateShopHandDisplay();
                        updateShopUI();
                   }
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
async function purchaseBoost(boostDefinition, purchaseCost) {
    return new Promise(async (resolve) => { 
        if (purchasedOrUpgradedInShop.includes(boostDefinition.id)) {
             console.warn(`Boost item ${boostDefinition.id} already purchased.`);
             setShopMessage("この強化は既に購入済みです。");
             resolve(false);
             return;
        }

        // コインチェックを追加
        if (playerCoins < purchaseCost) {
            playSound('error');
            setShopMessage("コインが足りません！");
            resolve(false);
            return;
        }

        const startCoins = playerCoins;
        const scoreBeforeBoost = playerScore;
        const initialScoreBeforeBoost = INITIAL_PLAYER_SCORE + permanentScoreBoost; // ★ アニメーション用にブースト前の初期スコアを記録

        // データ更新
        playerCoins -= purchaseCost;
        permanentScoreBoost += boostDefinition.boostAmount;
        playerScore += boostDefinition.boostAmount; // ゲーム中のスコアにも即時反映
        scoreAtWaveStart += boostDefinition.boostAmount; // WAVE開始時のスコアにも反映
        purchasedOrUpgradedInShop.push(boostDefinition.id);

        console.log(`Bought boost: ${boostDefinition.name} for ${purchaseCost}G. Permanent boost is now ${permanentScoreBoost}. Player score updated to ${playerScore}.`);
        setShopMessage(`${boostDefinition.name} を購入しました！開始時の持ち点が ${boostDefinition.boostAmount}点 増加します。`);
        updateShopUI();         // UI全体を更新 (コイン、持ち点表示など)

        // アイテム獲得演出 (UI更新の後)
        await showItemRevealModal({ item: boostDefinition, source: 'boost' });

        // スコア/コインアニメーション (UI更新の後)
        animateScore(playerScoreEl, scoreBeforeBoost, playerScore, SCORE_ANIMATION_DURATION); // ゲーム画面のスコア
        const shopPlayerScoreValueEl = document.getElementById('shop-player-score-value');
        if (shopPlayerScoreValueEl) {
             const shopDisplayScoreAfterBoost = INITIAL_PLAYER_SCORE + permanentScoreBoost; // ブースト後の初期スコア
             animateScore(shopPlayerScoreValueEl, initialScoreBeforeBoost, shopDisplayScoreAfterBoost, SCORE_ANIMATION_DURATION); // ショップ画面のスコア
        }
        if (purchaseCost > 0) {
            playSound('shopBuy'); // 購入成功音
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); // ショップのコイン
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); // ゲーム画面のコイン
            playCoinAnimation(purchaseCost);
        }
        resolve(true); // 購入成功
    });
}
    async function handleReroll() { 
        let actualRerollCost = REROLL_COST; const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1'); if (shopChoiceCard) { if (shopChoiceCard.level === 2) actualRerollCost = Math.max(0, REROLL_COST - 10); else if (shopChoiceCard.level >= 3) actualRerollCost = 0; }
        const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange'); const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0; const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

        const startCoins = playerCoins;
        let costPaid = 0;
        let isFree = false; 

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

        console.log("Rerolling shop offers...");
        // (displayShopOffers内でキープアイテムが考慮される)
        displayShopOffers();
    }
    function openDiscardModal() { 
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
    function setShopMessage(msg) { if (shopMessageEl) shopMessageEl.textContent = msg; } 
    
    async function handleSellCard(event) {
        playSound('click'); // SE追加
        const button = event.target;
        const cardId = button.dataset.cardId;
        const sellPrice = parseInt(button.dataset.sellPrice || '0');
        const cardName = button.dataset.cardName || cardId;
        const cardLevel = button.dataset.cardLevel || '?';

        setShopMessage(`${cardName} [Lv.${cardLevel}] を ${sellPrice}G で売却しますか？`);
        if (shopActionsEl) shopActionsEl.style.display = 'none'; // 通常アクション非表示

        let confirmationContainer = document.getElementById('shop-confirmation-buttons');
        if (confirmationContainer) { confirmationContainer.remove(); } // 既存があれば削除

        confirmationContainer = document.createElement('div');
        confirmationContainer.id = 'shop-confirmation-buttons';
        confirmationContainer.className = 'shop-actions'; 
        confirmationContainer.style.display = 'flex'; 
        // 確認ボタン追加ロジック 
        const confirmButton = document.createElement('button');
        confirmButton.textContent = '売却';
        confirmButton.className = 'button-pop'; // スタイルクラス
        confirmButton.style.backgroundColor = '#ff79c6'; // 直接指定 (またはCSSで定義)
        confirmButton.style.borderColor = '#f850a3';     // 直接指定 (またはCSSで定義)
        confirmButton.onclick = () => { playSound('click'); handleShopConfirmation(true); };
        confirmationContainer.appendChild(confirmButton);
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'キャンセル';
        cancelButton.className = 'button-subtle'; // スタイルクラス
        cancelButton.onclick = () => { playSound('click'); handleShopConfirmation(false); };
        confirmationContainer.appendChild(cancelButton);

        // コンテナ挿入ロジック 
        if (shopActionsEl && shopActionsEl.parentNode) {
            shopActionsEl.parentNode.insertBefore(confirmationContainer, shopActionsEl.nextSibling);
        } else {
            const shopFooter = document.querySelector('.shop-footer'); // フッター取得
            if(shopFooter) {
                shopFooter.appendChild(confirmationContainer); // フッターに追加
            } else {
                console.warn("#shop-actions or .shop-footer not found, appending confirmation buttons might fail.");
            }
        }

        const confirmSell = await waitForShopConfirmation(); // 待機

        if (confirmationContainer) confirmationContainer.remove(); // 即時削除する場合

        if (confirmSell) {
            playSound('shopSell');
            const startCoins = playerCoins;
            removePlayerCardEffect(cardId);
            playerCoins += sellPrice;

            setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`);
            console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
            updateShopUI(); // UI更新 (手札表示など)

            if (sellPrice > 0) {
                animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
                playCoinAnimation(sellPrice);
            }
        } else {
            setShopMessage(DEFAULT_SHOP_MESSAGE);
        }
        // 通常アクションを再表示
        if (shopActionsEl) shopActionsEl.style.display = 'flex';
    }
    function updateBetLimits() {
        let playerMaxPotential = playerScore;
        const betBoostCard = playerCards.find(card => card.id === 'betBoost');
        if (betBoostCard) {
            const boostMultiplier = [1.2, 1.4, 1.6][betBoostCard.level - 1];
            playerMaxPotential = Math.floor(playerScore * boostMultiplier);
        }
        const effectiveNpcScore = Math.max(1, npcScore);
        // maxBet 計算時も、プレイヤーが賭けられる最大額は playerMaxPotential だが、
        //    最低賭け金が上がっている可能性を考慮する必要がある。
        //    maxBet は「相手が受けられる最大額」と「自分が払える最大額」の小さい方。
        const maxBetByOpponent = isPlayerParent ? effectiveNpcScore : playerScore;
        const maxBetByPlayer = isPlayerParent ? playerMaxPotential : npcScore; // NPCのMaxPotentialはnpcScoreとする
        let maxBet = Math.min(maxBetByOpponent, maxBetByPlayer);

        let actualMinBet = currentMinBet; // 本来の最低賭け金
        const riskyCard = playerCards.find(c => c.id === 'riskyBet');
        if (riskyBetActive && riskyCard && isPlayerParent) { // プレイヤーが親の時のみ最低賭け金影響
            actualMinBet = currentMinBet * 2;
            console.log(`Risky Bet active (Player Parent)! Actual min bet set to: ${actualMinBet}`);
        }

        maxBet = Math.max(actualMinBet, maxBet);

        betInput.max = maxBet;
        betInput.min = actualMinBet; // 実際の最低ベット額を min 属性に設定
        minBetDisplayEl.textContent = `最低: ${actualMinBet}`; // 表示も実際の最低ベット額に

        let cv = parseInt(betInput.value);
        if (isNaN(cv)) { cv = actualMinBet; betInput.value = cv; }

        const canPlayerControlBet = isPlayerParent && !isGameActive;
        betInput.disabled = !canPlayerControlBet || playerScore < actualMinBet || waitingForPlayerActionAfterRoll; // actualMinBet で判定
        if (!betInput.disabled) { if (cv > maxBet) { betInput.value = maxBet; cv = maxBet; } else if (cv < currentMinBet) { betInput.value = currentMinBet; cv = currentMinBet; } }
        else { if (!isPlayerParent && !isGameActive && currentBet > 0) { betInput.value = currentBet; } else { betInput.value = currentMinBet; } }
        betAdjustButtons.forEach(b => {
            const a = parseInt(b.dataset.amount);
            const v = parseInt(betInput.value) || actualMinBet;
            b.disabled = betInput.disabled ||
                         (a > 0 && (v >= maxBet || v + a > maxBet)) ||
                         (a < 0 && (v <= actualMinBet || v + a < actualMinBet)); 
        });
        setBetButton.disabled = betInput.disabled; maxBetButton.disabled = betInput.disabled; minBetButton.disabled = betInput.disabled;
    }
    function startBettingPhase() {         
        console.log("--- startBettingPhase START ---");
        activeCardsUsedThisRound = []; // ラウンド開始時にリセット
        currentRoundInWave++;
        isGameActive = false;
        playerDice = [0, 0, 0]; npcDice = [0, 0, 0];
        playerHand = null; npcHand = null;
        playerRollCount = 0; npcRollCount = 0;
        rollButton.disabled = true; historyButton.disabled = false;
        currentBet = 0;
    
        // === フラグリセット ===
        activeCardBeingUsed = null; ignoreMinBetActive = false; zoroChanceUpActive = false; avoid123_456Active = false; blessingDiceActive = false; stormWarningActive = false; stormWarningRerollsLeft = 0; blindingDiceActive = false; doubleUpBetActive = false;
        rewardAmplifierActive = false; 
        giveUpEyeUsedThisTurn = false; adjustEyeUsedThisTurn = false; nextChanceUsedThisTurn = false; soulRollUsedThisTurn = false; waitingForUserChoice = false; userChoiceResolver = null;
        riskyBetActive = false;
        waitingForPlayerActionAfterRoll = false; drawBonusActive = false; isShowingRoleResult = false; isShowingGameResult = false;
        blindingDiceActive = false; // 蜃気楼フラグ
        trueBlindingActive = false; // 目くらましフラグ リセット追加
        trueBlindingLevel = 0;      // 目くらましレベル リセット追加

        if (betMainControls) betMainControls.style.display = 'flex';
        if (betActionContainer) betActionContainer.style.display = 'flex';
        if (actionArea) actionArea.style.display = 'flex';
        if (nextWaveArea) nextWaveArea.style.display = 'none';

        const baseMinBetInitial = 50;
        const minBetWaveIncrement = 50;

        let endlessBonusTier = 0;
        let endlessBonusMinBet = 0;
        if (gameMode === 'endless' && currentWave > 10) {
            endlessBonusTier = Math.floor((currentWave - 1) / 10);
            endlessBonusMinBet = endlessBonusTier * 50;
            console.log(`Endless bonus min bet for Wave ${currentWave} (Tier ${endlessBonusTier}): +${endlessBonusMinBet}`);
        }
        let calculatedBaseMinBet = baseMinBetInitial + (currentWave - 1) * minBetWaveIncrement + endlessBonusMinBet;

        if (keepParentDiscountNextRound) {
            currentMinBet = Math.max(1, Math.floor(calculatedBaseMinBet / 2));
            keepParentDiscountNextRound = false;
        } else {
            currentMinBet = calculatedBaseMinBet;
        }

        // プレイヤー所持金チェック
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
        // NPC持ち点不足チェック
        if (npcScore < currentMinBet) {
            console.log(`NPC Score (${npcScore}) is less than Current Min Bet (${currentMinBet}). WAVE CLEAR.`);
            defeatedCount++;
            const coinResult = calculateAndAwardCoins();
            const finalEarnedCoins = coinResult.finalEarned;
            const greedyBonus = coinResult.greedyPotBonus;
            const greedyLevel = coinResult.greedyPotLevel;
            const clearReason = `${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満`;
            addHistoryEntry({
                wave: currentWave, round: currentRoundInWave, result: 'clear',
                scoreChange: finalEarnedCoins, isWaveClear: true, earnedCoins: finalEarnedCoins,
                message: `${clearReason}のため、WAVEクリア！ コイン ${finalEarnedCoins} G獲得！` + (greedyBonus > 0 ? ` (強欲な壺 Lv.${greedyLevel} +${greedyBonus}G)` : ""),
                clearReason: clearReason // 理由を別プロパティで保持
            });

            // メッセージ生成
            let waveClearMessage = `${clearReason}のため、WAVEクリア！ コイン ${finalEarnedCoins} G獲得！`;
            if (greedyBonus > 0) {
                waveClearMessage += ` (強欲な壺 Lv.${greedyLevel} 効果: +${greedyBonus}G)`;
            }
            setMessage(waveClearMessage); // メッセージを設定
            showGameResultModal(true, "相手の最低賭け金不足");
            updateUI();
            if (betMainControls) betMainControls.style.display = 'none';
            if (betActionContainer) betActionContainer.style.display = 'none';
            if (actionArea) actionArea.style.display = 'none';
            if (nextWaveArea) nextWaveArea.style.display = 'flex';
            currentBetInfoEl.textContent = '';
            currentRoundInWave = 0;
            activeCardUses = {};
            keepParentRightUsedThisWave = 0;
            historyButton.disabled = true;
            return; // WAVEクリアなのでここで終了
        }

        // エンドレスモードのスコア制限
        if (gameMode === 'endless') {
            let effectiveMinBetForEndless = Math.min(currentMinBet, playerScore, npcScore);
            effectiveMinBetForEndless = Math.max(1, effectiveMinBetForEndless);
            currentMinBet = effectiveMinBetForEndless; 
            console.log(`Endless mode min bet adjusted by scores: ${currentMinBet}`);
        }

        betInput.value = currentMinBet; // UI更新前に本来の最低値をセット
        updateBetLimits(); // ベット制限更新（riskyBet 有効なら表示上の最低額は変わる）
        updateUI();        // UI全体を更新

        currentBetInfoEl.textContent = '賭け金設定中...';
        const playerNameDisp = playerName || selectedCharacter?.name || 'あなた';
        const npcNameDisp = currentNpcCharacter?.name || '相手'; // ★ 表示用NPC名

        if (isPlayerParent) {
            const displayMinBet = parseInt(betInput.min);
            setMessage(`${playerNameDisp}(親)が賭け金を設定 (最低 ${displayMinBet}点)。`);
            updateCardButtonHighlight();
        } else { // NPCが親の場合
            betInput.disabled = true;
            setBetButton.disabled = true;
            betAdjustButtons.forEach(btn => btn.disabled = true);
            maxBetButton.disabled = true;
            minBetButton.disabled = true;
            setMessage(`${npcNameDisp}(親)が賭け金を決定中... (最低 ${currentMinBet}点)`);
            setTimeout(() => {
                const npcBet = determineNpcBet(currentWave);

                if (npcScore < npcBet || npcBet < currentMinBet) { console.error(`Error: NPC bet ${npcBet} is invalid (NPC Score: ${npcScore}, Min Bet: ${currentMinBet}) - Forcing WAVE clear.`); defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `エラー: ${npcNameDisp}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`エラー: ${npcNameDisp}が賭け金を払えません。WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "エラー：相手が賭け金を払えません"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
                if (playerScore < npcBet) { console.error(`Error: Player cannot afford NPC bet ${npcBet} (Player Score: ${playerScore}) - Game Over.`); setMessage(`あなたの持ち点(${playerScore}点)が${npcNameDisp}(親)の賭け金(${npcBet}点)未満のため、ゲームオーバーです。`); currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; historyButton.disabled = true; setTimeout(() => showResultScreen(false, playerScore, currentWave, `相手の賭け金(${npcBet}点)不足`), 1000); return; }
                currentBet = npcBet;
                betInput.value = currentBet;
                console.log(`NPC (${npcNameDisp}, Parent) decided bet: ${currentBet} in Wave ${currentWave}`);
                currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${npcNameDisp})</span>`;
                setMessage(`${npcNameDisp}(親)が ${currentBet} 点で勝負！ ${npcNameDisp}がサイコロを振ります...`);
                isGameActive = true;
                isPlayerTurn = false;
                updateUI();
                setTimeout(npcTurn, NPC_BET_DELAY / 2); // npcTurn を呼び出す
            }, NPC_BET_DELAY); // setTimeout の終わり
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

    // --- Three.js関連関数 --- 
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

            setBetButton.addEventListener('click', () => {
                if (!isPlayerParent || betInput.disabled || isGameActive || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
                updateBetLimits(); // 最新の制限を反映させてからバリデーション
     
                // riskyBetActive を考慮した最低ベット額を取得
                let actualMinBet = currentMinBet;
                const riskyCardCheck = playerCards.find(c => c.id === 'riskyBet');
                // riskyBetの効果は isPlayerParent チェック済みのはずだが念のため
                if (riskyBetActive && riskyCardCheck && isPlayerParent) {
                    actualMinBet = currentMinBet * 2;
                }
                // プレイヤー/NPCの所持金チェック
                if (playerScore < actualMinBet) {
                     playSound('error'); setMessage(`持ち点が最低賭け金(${actualMinBet}点)未満のため、賭けられません。`); return;
                }
           if (npcScore < currentMinBet) { playSound('error'); defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "相手の最低賭け金不足"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
           let bv = parseInt(betInput.value);
           if (isNaN(bv)) {
                playSound('error'); setMessage(`無効な賭け金です。`); betInput.value = actualMinBet; updateBetLimits(); return;
           }
           const maxBet = parseInt(betInput.max);
           // ベット額のバリデーション（actualMinBet を使用）
           if (bv >= actualMinBet && bv <= maxBet) { 
            playSound('betConfirm');
            currentBet = bv; // 入力された値をそのまま賭け金とする
            if (riskyBetActive && riskyCardCheck) { 
                 console.log(`Risky Bet is active for this round. Bet set to ${currentBet}. (Use count handled in handleActiveCardUse)`);
            }

                isGameActive = true;
                isPlayerTurn = true;
                const playerNameDisp = playerName || selectedCharacter?.name || 'あなた';
                currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${playerNameDisp})</span>`;
                setMessage(`賭け金 ${currentBet} で勝負！ ${playerNameDisp}(親)がサイコロを振ってください。`);
                betInput.disabled = true;
                setBetButton.disabled = true;
                betAdjustButtons.forEach(btn => btn.disabled = true);
                maxBetButton.disabled = true;
                minBetButton.disabled = true;
                rollButton.disabled = false;
                historyButton.disabled = false;
                updateUI(); // UI更新
           }
           else { // ベット額が無効な場合
                playSound('error');
                setMessage(`賭け金を正しく設定 (${actualMinBet}～${maxBet})。`);
                updateBetLimits();
           }
       }); 

    async function handlePostRollPlayerAction() {

        const playerName = selectedCharacter?.name || 'あなた';
        const npcName = currentNpcCharacter?.name || '相手';
        const isMenashi = playerHand?.type === '目なし';
        const isYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目';
        const isShonben = playerHand?.type === 'ションベン';
        let handBeforeAvoidance = playerHand; // 回避前の手を記録

        console.log(`Handle Post Roll Action: Hand=${getHandDisplayName(playerHand)}, RollCount=${playerRollCount}, MaxRolls=${currentMaxRolls}, StormRerolls=${stormWarningRerollsLeft}`);

// 役回避 (確率) の効果判定をここで行う
const avoidCard = playerCards.find(c => c.id === 'avoid123_456');
if (avoid123_456Active && avoidCard && playerHand) { // フラグが立っていて、カードがあり、手がある場合
    const level = avoidCard.level;
    const isHifumi = playerHand.name === ROLES.HIFUMI.name;
    const isShigoro = playerHand.name === ROLES.SHIGORO.name;
    const isMenashi = playerHand.type === '目なし';
    let needsAvoidCheck = false;
    let avoidedRoleName = "";
    avoid123_456Active = false; 

    if (isHifumi || isShigoro) {
        needsAvoidCheck = true;
        avoidedRoleName = playerHand.name;
    } else if (level >= 3 && isMenashi) {
        needsAvoidCheck = true;
        avoidedRoleName = "目なし";
    }

    if (needsAvoidCheck) {
        const avoidChance = [0.3, 0.5, 0.7][level - 1]; // 回避確率 30%/50%/70%
        console.log(`役回避 Lv.${level} チェック: 対象=${avoidedRoleName}, 確率=${avoidChance * 100}%`);

        if (Math.random() < avoidChance) {
            // 回避成功！ 結果を「1の目」に変更
            console.log(` -> 役回避成功！ ${avoidedRoleName} を 1の目に変更します。`);
            // 新しいダイス目を生成 (例: 1, 1, 任意の目)
            let newDiceResult = [1, 1, rollSingleDice()]; // 簡単のため1の目を生成
            // 偶然ピンゾロになったら振り直し (任意)
            while (newDiceResult[0] === newDiceResult[1] && newDiceResult[1] === newDiceResult[2]) {
                 newDiceResult[2] = rollSingleDice();
            }
            playerDice = newDiceResult.sort((a, b) => a - b); // ソートしておく
            const newResult = getHandResult(playerDice, false, 0, 0); // 新しい手を取得
            const newRk = Object.keys(ROLES).find(k => ROLES[k].name === newResult.name || (newResult.type === '目' && ROLES[k].name === '目'));
            playerHand = newRk ? { ...ROLES[newRk], ...newResult } : newResult; // 手を更新

            // UI更新
            if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
            diceDisplayEl.textContent = playerDice.join(' ');
            if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
            highlightHand(playerHandEl, playerHand);
            setMessage(`役回避 Lv.${level} 発動！ ${avoidedRoleName} を回避して ${getHandDisplayName(playerHand)} に変更！`);
            playSound('cardUse'); // 回避成功の効果音
            await new Promise(resolve => setTimeout(resolve, 1000)); // メッセージ表示時間
        } else {
            console.log(` -> 役回避失敗... (${avoidedRoleName})`);
            setMessage(`役回避 Lv.${level} 失敗... (${avoidedRoleName})`);
            await new Promise(resolve => setTimeout(resolve, 800));
        }
    }
    avoid123_456Active = false; // 効果判定が終わったらフラグを下ろす
}

        // BGMチェックは役確定前に実行
        checkAndSwitchRoleBgm(playerHand, null);

        // --- ションベンの場合 ---
        if (playerHand?.type === 'ションベン') { // 回避後の手で判定
            waitingForPlayerActionAfterRoll = false;
            rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
            await showRoleResultModal(playerHand, playerDice);
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
            setTimeout(handleRoundEnd, 500);
        }
        // --- 役または目の場合 ---
        else if (playerHand?.type === '役' || playerHand?.type === '目') { // 回避後の手で判定
            const handName = getHandDisplayName(playerHand);
            await showRoleResultModal(playerHand, playerDice);
            // if (handBeforeAvoidance !== playerHand) { /* 回避で変わったメッセージ */ }
            // else { await showRoleResultModal(playerHand, playerDice); } // 回避なしの場合のみ表示

            const hasUsablePostRollCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));

            if (hasUsablePostRollCard) {
                waitingForPlayerActionAfterRoll = true;
                updateBetLimits();
                rollButton.disabled = true;
                historyButton.disabled = false;
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ${handName}！どうしますか？`, 'postRollChoice');
                updateCardButtonHighlight();
            } else {
                console.log(`Yaku/Eye (${handName}) determined, no usable cards. Auto proceeding.`);
                waitingForPlayerActionAfterRoll = false;
                messageButtonContainer.innerHTML = '';
                rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
                if (isPlayerParent) { setMessage(`${playerName}(親): ${handName}！ 自動で${npcName}(子)の番です。`); setTimeout(npcTurn, 800); }
                else { setMessage(`${playerName}(子): ${handName}！ 自動で勝負！`); setTimeout(handleRoundEnd, 800); }
            }
        }
        // --- 目なしの場合 ---
        else if (playerHand?.type === '目なし') { // 回避後の手で判定
            const canReroll = playerRollCount < currentMaxRolls;
            const hasStormWarningReroll = stormWarningRerollsLeft > 0;
            const hasPostRollCardForMenashi = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));
            let rerollStatus = "";
            if (canReroll) rerollStatus = `(残 ${currentMaxRolls - playerRollCount}回)`;
            if (hasStormWarningReroll) rerollStatus += ` (嵐の予感 残 ${stormWarningRerollsLeft}回)`;

            if (canReroll || hasStormWarningReroll) {
                if (hasPostRollCardForMenashi) {
                    waitingForPlayerActionAfterRoll = true; updateBetLimits(); rollButton.disabled = false; historyButton.disabled = false;
                    setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振るかカードを使用してください ${rerollStatus}`, 'postRollChoice');
                    updateCardButtonHighlight();
                } else {
                    waitingForPlayerActionAfterRoll = false; messageButtonContainer.innerHTML = ''; updateBetLimits(); rollButton.disabled = false; historyButton.disabled = false;
                    setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 使用できるカードがないので再度サイコロを振ってください ${rerollStatus}`);
                }
            } else { // 振り直し不可
                if (hasPostRollCardForMenashi) {
                    waitingForPlayerActionAfterRoll = true; updateBetLimits(); rollButton.disabled = true; historyButton.disabled = false;
                    setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ カードを使用してください (振り直し不可)`, 'postRollChoice');
                    updateCardButtonHighlight();
                } else { // ションベン確定
                    console.log("Menashi and no more actions/rerolls. Forcing Shonben.");
                    playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                    updateUI(); highlightHand(playerHandEl, playerHand);
                    waitingForPlayerActionAfterRoll = false;
                    rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
                    await showRoleResultModal(playerHand, playerDice);
                    setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                    setTimeout(handleRoundEnd, 500);
                }
            }
        }
        // --- その他の予期せぬ状態 ---
        else {
            console.error("Unexpected player hand state after roll and avoidance check:", playerHand);
            setMessage("予期せぬエラーが発生しました。");
            waitingForPlayerActionAfterRoll = false;
            startBettingPhase();
        }

        updateUI(); // 最終的なUI状態を更新
    } // handlePostRollPlayerAction 関数の終わり

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
        const result = getHandResult(npcDice, true, blindingLevel, 0); // ★ getHandResult の戻り値に forcedMenashi が含まれる可能性
        const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
        npcHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("NPC Rolled:", npcDice, "Hand:", npcHand);

        // 役・目・ションベンの場合のBGMチェックと進行
        if (npcHand.type !== 'ションベン' && npcHand.type !== '目なし') {
             checkAndSwitchRoleBgm(playerHand, npcHand);
        }

        updateUI(); highlightHand(npcHandEl, npcHand); const playerName = selectedCharacter?.name || 'あなた';

        // --- 役・目・ションベンの場合の処理 ---
        if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
            const handName = getHandDisplayName(npcHand); historyButton.disabled = false;
            if (npcHand.type !== '目なし' && npcHand.type !== 'ションベン') { // 目なし/ションベン以外なら役モーダル表示
                 await showRoleResultModal(npcHand, npcDice);
             } else if (npcHand.type === 'ションベン') { // ションベンならションベンモーダル表示
                 await showRoleResultModal(npcHand, npcDice);
             }
             // 進行ロジック 
            if (!isPlayerParent && npcHand.type !== 'ションベン') { setMessage(`${npcName}(親): ${handName}！ ${playerName}(子)の番です。`); isPlayerTurn = true; rollButton.disabled = false; updateCardButtonHighlight(); updateUI(); }
            else { setMessage(`${npcName}(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`) : '勝負！'}`); rollButton.disabled = true; setTimeout(handleRoundEnd, 100); }
        }
        // --- 目なしの場合の処理 ---
        else if (npcHand.type === '目なし') {
            // 修正: forcedMenashi フラグをチェック 
            if (npcHand.forcedMenashi) {
                console.log("NPC Menashi was forced by Shinkirou. Treating as Shonben.");
                // カード効果で目なしにされた場合はションベン扱いとしてラウンド終了
                npcHand = { ...ROLES.SHONBEN, type: 'ションベン', name: 'ションベン(蜃気楼)' }; // 名前を区別しても良い
                updateUI(); highlightHand(npcHandEl, npcHand);
                rollButton.disabled = true; historyButton.disabled = false;
                await showRoleResultModal(npcHand, npcDice); // ションベンとして結果表示
                setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 蜃気楼の効果でションベン！ ${isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`}`);
                setTimeout(handleRoundEnd, 100);
            }
            // 通常の目なしの場合 (ロール回数チェック)
            else if (npcRollCount < BASE_MAX_ROLLS) {
                setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`);
                setTimeout(npcTurn, 1000); // 再度 NPC ターンへ
            }
            // 振り切り目なしの場合 
            else {
                npcHand = { ...ROLES.SHONBEN, type: 'ションベン' }; // ションベン扱いに変更
                updateUI(); highlightHand(npcHandEl, npcHand);
                rollButton.disabled = true; historyButton.disabled = false;
                await showRoleResultModal(npcHand, npcDice); // ションベンとして結果表示
                setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`}`);
                setTimeout(handleRoundEnd, 100);
            }
        }
         updateCardButtonHighlight(); // ボタンハイライト更新
    }); // animateDiceRoll コールバック終わり
} // npcTurn 関数終わり

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
        const negativeEffects = data.appliedCardEffects.filter(eff =>
            eff.type === 'negative' ||
            (eff.type === 'multiplier' && parseFloat(String(eff.value).replace(/[^+-.0-9]/g, '')) < 0) // ★ 符号も考慮
        );
        if (negativeEffects.length > 0 && !data.insuranceApplied && !data.draw) {
             const penaltyContainer = document.createElement('div');
             penaltyContainer.className = 'score-calc-step';
             penaltyContainer.innerHTML = `<span class="score-calc-label">カード効果(-/変動):</span><span class="score-calc-value-multi"></span>`; // ラベル変更
             innerContainer.appendChild(penaltyContainer);
             const multiValueContainer = penaltyContainer.querySelector('.score-calc-value-multi');
             if (!multiValueContainer) throw new Error("multiValueContainer not found for negative effects");

             for (const effect of negativeEffects) {
                  let effectValueStr = String(effect.value).trim(); // 文字列化してトリム
                  let numericPartStr = effectValueStr.match(/[+-]?([0-9]*[.])?[0-9]+/)?.[0] || "0"; // 数値部分抽出
                  let textPart = effectValueStr.replace(numericPartStr, "").trim(); // テキスト部分抽出
                  let numericValue = parseFloat(numericPartStr); // 数値化

                  let displayValueStr = "";
                  let displayClass = "negative"; // デフォルトはネガティブ

                  // 表示文字列を整形
                  if (!isNaN(numericValue)) {
                       // 数値がある場合
                       const sign = numericValue >= 0 ? '+' : ''; // ★ プラスの場合も符号をつける
                       displayValueStr = `${sign}${numericValue.toFixed(1)}倍`;
                       if (numericValue > 0 && effect.type === 'negative') {
                           // 例: 危険な賭け敗北 (支払い+1.0倍) type=negative, value=+1.0
                           displayValueStr += ` (支払い増)`; // 補足説明追加
                           // displayClass = "special"; // 色を変えるなら
                       } else if (numericValue < 0) {
                           // 例: ヒフミ軽減 (支払い-1.0倍) type=negative, value=-1.0
                           displayValueStr += ` (軽減)`;
                       }
                  } else {
                      // 数値がない場合 (例: 親権維持) - ここには来ないはずだが念のため
                      displayValueStr = effectValueStr;
                      displayClass = "info";
                  }


                  // ログ要素を作成して追加
                  const effectLogContainer = document.createElement('div');
                  effectLogContainer.innerHTML = `
                      <span class="score-calc-value ${displayClass}">${displayValueStr}</span>
                      <span class="score-calc-label" style="font-size:0.8em; color:#bbb;">└ ${effect.name}</span>`;
                  effectLogContainer.style.opacity = '0';
                  effectLogContainer.style.textAlign = 'right'; // 右寄せにしてみる
                  multiValueContainer.appendChild(effectLogContainer);

                  requestAnimationFrame(() => {
                      effectLogContainer.style.transition = 'opacity 0.3s ease-out';
                      effectLogContainer.style.opacity = '1';
                  });
                  await delay(CALC_MULTI_STEP_DELAY);
             }
             await delay(CALC_STEP_DELAY_SHORT);
        }
        currentDisplayedMultiplier = Math.max(0, currentDisplayedMultiplier); // 念のため0未満にならないように

        // 5. 連勝ボーナス表示修正
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

  async function handleSkipAction() {
    playSound('click'); // SE追加
    if (!waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
    console.log("Skip button clicked.");

    waitingForPlayerActionAfterRoll = false; // スキップしたのでアクション待ち解除
    messageButtonContainer.innerHTML = ''; // ボタンクリア
    activeCardBeingUsed = null; // スキップ時はカード使用フラグ解除

    const handName = getHandDisplayName(playerHand);
    const playerName = selectedCharacter?.name || 'あなた';
    const npcName = currentNpcCharacter?.name || 'NPC';
    const isMenashi = playerHand?.type === '目なし';
    const isYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目';

    if (isMenashi) {
        // 目なし時にスキップした場合
        let canReroll = playerRollCount < currentMaxRolls;
        let hasStormWarningReroll = stormWarningRerollsLeft > 0;

        if (canReroll || hasStormWarningReroll) {
            // 再度振れる場合: メッセージ表示してロールボタン有効化
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)` : ''}`);
            rollButton.disabled = false;
            historyButton.disabled = false;
        } else {
            // 振り直し不可でスキップ: ションベン確定
            console.log("Skipped on Menashi with no rerolls left. Forcing Shonben.");
            playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
            updateUI(); highlightHand(playerHandEl, playerHand);
            isPlayerTurn = false; rollButton.disabled = true; historyButton.disabled = false;
            await showRoleResultModal(playerHand, playerDice);
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
            setTimeout(handleRoundEnd, 100);
        }
    } else if (isYakuOrEye) {
        // 役/目が出ている状態でスキップ: 自動進行
        console.log(`Skipped with Yaku/Eye (${handName}). Proceeding turn.`);
        isPlayerTurn = false; rollButton.disabled = true; historyButton.disabled = false;
        if (isPlayerParent) {
            setMessage(`${playerName}(親): ${handName}！ スキップして${npcName}(子)の番です。`);
            setTimeout(npcTurn, 100);
        } else {
            setMessage(`${playerName}(子): ${handName}！ スキップして勝負！`);
            setTimeout(handleRoundEnd, 100);
        }
    } else {
        // ションベン確定後などの予期せぬ状態でスキップした場合
        console.warn("Skip action called with unexpected playerHand:", playerHand);
        // 基本的には handleRoundEnd が呼ばれるはずだが、念のため
        if (!isPlayerTurn) { // 既に相手ターンに移っているか、ラウンド終了処理中なら何もしない
             console.log("Skip called, but not player's turn anymore.");
        } else {
            startBettingPhase(); // 安全策としてベットフェーズに戻る
        }
    }

    updateUI();
    updateCardButtonHighlight(); // ボタン状態更新
    updateBetLimits(); // 賭け金関連のUI状態も更新
}

   // ラウンド終了処理 
   async function handleRoundEnd() {
    // 処理開始直後に早期リターンする場合のチェック
    if (waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) {
         console.log("handleRoundEnd skipped due to waiting state or modal.");
         return;
    }
    isGameActive = false; rollButton.disabled = true; historyButton.disabled = false;

    // --- ラウンド結果とスコア計算に必要な変数を初期化 ---
    let pWin = false, nWin = false, draw = false;
    let sc = 0, rClass = 'draw';
    let finalMsg = "";
    let preventParentChange = false;
    let parentKeptByCard = false;
    const playerInitialScore = playerScore;
    const npcInitialScore = npcScore;
    const playerNameStr = playerName || selectedCharacter?.name || 'あなた';
    const npcNameStr = currentNpcCharacter?.name || '相手';
    const consecutiveWinsBeforeRound = consecutiveWins;
    const npcConsecutiveWinsBeforeRound = npcConsecutiveWins;
    // (連勝数変数はグローバルなのでここでは初期化しない)
    let baseMultiplier = 1.0;
    let multiplierBonus = 0;
    let streakBonusRate = 0.0; // スコア計算用のボーナス率
    let isHifumiLoss = false;
    let isShonbenLoss = false;
    let insuranceApplied = false;
    let appliedCardEffects = [];
    let calculationData = {}; // スコア計算アニメーション用データ
    let activeCardsUsedThisRoundForHistory = [...activeCardsUsedThisRound]; // 履歴用に使用カードをコピー
    let coinBonusInfoForHistory = { bounty: 0, offering: 0, offeringSuccess: false };

    // --- 勝敗判定 ---
    if (playerHand?.type === 'ションベン') { nWin = true; isShonbenLoss = true; }
    else if (npcHand?.type === 'ションベン') { pWin = true; }
    else {
        const getStrength = (hand) => { if (!hand) return -Infinity; if (hand.type === 'ションベン') return ROLES.SHONBEN.strength; if (hand.type === '目なし') return ROLES.MENASHI.strength; if (hand.name === ROLES.HIFUMI.name) return ROLES.HIFUMI.strength; if (hand.type === '目') return ROLES.NORMAL_EYE.strength + hand.value / 10; if (hand.name === ROLES.SHIGORO.name) return ROLES.SHIGORO.strength; if (hand.name === ROLES.ARASHI.name) return ROLES.ARASHI.strength + hand.value / 10; if (hand.name === ROLES.PINZORO.name) return ROLES.PINZORO.strength; return -Infinity; };
        const playerStrength = getStrength(playerHand);
        const npcStrength = getStrength(npcHand);
        if (playerStrength > npcStrength) pWin = true;
        else if (playerStrength < npcStrength) nWin = true;
        else draw = true;
    }

    // --- riskyBet 効果判定 ---
    const riskyCardCheckEnd = playerCards.find(c => c.id === 'riskyBet');
    const wasRiskyBetActiveThisRound = riskyBetActive; // ラウンド開始時の状態を保持
    let riskyBetWinBonus = 0;
    let riskyBetLossPenalty = false;
    if (wasRiskyBetActiveThisRound && riskyCardCheckEnd) {
        const riskyLevel = riskyCardCheckEnd.level;
        if (pWin) {
            riskyBetWinBonus = 1;
            appliedCardEffects.push({ name: `危険な賭け Lv.${riskyLevel}`, value: `勝利 +1.0倍`, type: 'bonus' });
        } else if (nWin) {
            riskyBetLossPenalty = true;
            appliedCardEffects.push({ name: `危険な賭け Lv.${riskyLevel}`, value: `敗北 支払い+1.0倍`, type: 'negative' });
        }
    }

    // --- 親権維持カードの確認 (敗北時) ---
    const keepRightCard = playerCards.find(card => card.id === 'keepParentalRight');
    const maxKeepUses = keepRightCard ? getTotalUses('keepParentalRight') : 0;
    const keepRightUsesCount = activeCardUses['keepParentalRight'] || 0;
    if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) {
         const useKeepRight = await askKeepParentRight(keepRightCard.level);
         if (useKeepRight) {
             preventParentChange = true; // 親交代阻止
             parentKeptByCard = true; // カード使用フラグ
             if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; }
             activeCardUses['keepParentalRight'] = (activeCardUses['keepParentalRight'] || 0) + 1;
             updateCardButtonHighlight();
             appliedCardEffects.push({ name: '親権維持', value: '(親交代阻止)', type: 'info' });
             console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} used! Parent change prevented.`);
         }
     }

    // --- 連勝数更新と親交代判定 ---
    const parentBefore = isPlayerParent ? 'Player' : 'NPC';
    let parentChanged = false;

    if (draw) {
        // 引き分け: 連勝数は変更しない
        console.log("Draw round. Consecutive wins remain unchanged.");
    } else if (pWin) { // プレイヤー勝利
        if (isPlayerParent) { // プレイヤーが親のまま勝利
            consecutiveWins++;
            console.log(`Player (Parent) wins, streak now ${consecutiveWins}`);
        } else { // プレイヤーが子で勝利 -> 親交代
            parentChanged = true;
            isPlayerParent = true;
            consecutiveWins = 1; // 1連勝目
            npcConsecutiveWins = 0; // 交代したのでNPC連勝リセット
            console.log("Player (Child) wins, becomes Parent, 1 win streak.");
        }
    } else if (nWin) { // プレイヤー敗北 (NPC勝利)
        if (!isPlayerParent) { // NPCが親のまま勝利
            npcConsecutiveWins++;
            console.log(`NPC (Parent) wins, streak now ${npcConsecutiveWins}`);
        } else { // プレイヤーが親で敗北
            consecutiveWins = 0; // プレイヤー連勝リセット
            if (!preventParentChange) { // 親権維持未使用 -> 親交代
                parentChanged = true;
                isPlayerParent = false;
                npcConsecutiveWins = 1; // 1連勝目
                console.log("Player (Parent) loses, NPC becomes Parent, 1 win streak.");
            } else {
                // 親権維持使用 -> 親交代なし
                npcConsecutiveWins = 0; // プレイヤー親継続なのでNPC連勝は0
                console.log("Player (Parent) loses, but kept parent status. Wins reset.");
            }
        }
    }
    // 念のため、現在の親でない方の連勝数を0にする
    if (isPlayerParent) npcConsecutiveWins = 0; else consecutiveWins = 0;

    console.log(`Round End Update - Player Wins: ${consecutiveWins}, NPC Wins: ${npcConsecutiveWins}, Is Player Parent: ${isPlayerParent}, Parent Changed: ${parentChanged}`);

    // --- スコア計算 ---
    if (draw) {
        // ... (引き分け時の処理 - drawBonusActive フラグのチェックとリセットもここで行う) ...
        let baseMsg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
        rClass = 'draw';
        const drawBonusCardCheck = playerCards.find(c => c.id === 'drawBonus');
        // drawBonusActive フラグをチェック
        if (drawBonusActive && drawBonusCardCheck) {
             const scoreGainPercent = (drawBonusCardCheck.level === 3) ? 1.0 : 0.5;
             const scoreGain = Math.floor(currentBet * scoreGainPercent);
             if (scoreGain > 0) {
                 sc = scoreGain; // スコア変動はプラス
                 finalMsg = baseMsg + ` (引き分けボーナス: +${sc}点)`;
                 // 使用回数カウントは handleActiveCardUse で行う
                 appliedCardEffects.push({ name: `引き分けボーナス Lv.${drawBonusCardCheck.level}`, value: `+${sc}点`, type: 'bonus' });
             } else {
                  finalMsg = baseMsg;
             }
        } else {
            sc = 0;
            finalMsg = baseMsg;
        }
        // drawBonusActive フラグは handleRoundEnd の最後でリセットする
        streakBonusRate = 0; // 引き分けなのでボーナスなし

    } else { // 勝敗ありの場合
        const winnerHand = pWin ? playerHand : npcHand;
        const loserHand = pWin ? npcHand : playerHand;
        const winnerIsPlayer = pWin;

        // 一撃保険の適用を先に判定 (敗北時)
        const insuranceCard = playerCards.find(card => card.id === 'lossInsurance');
        if (!winnerIsPlayer && insuranceCard) { // プレイヤー敗北 かつ 保険カードあり
            insuranceApplied = true;
            const level = insuranceCard.level;
            const insuranceMultiplier = [1.5, 1.3, 1.1][level - 1];
            // 相手(勝者=NPC)のラウンド開始前の連勝数を取得
            const opponentWinsBefore = npcConsecutiveWinsBeforeRound; 
            const opponentStreakBonusRate = opponentWinsBefore >= 1 ? (opponentWinsBefore * CONSECUTIVE_WIN_BONUS_RATE) : 0.0;
            const finalPaymentWithInsurance = currentBet * insuranceMultiplier * (1 + opponentStreakBonusRate);
            sc = -Math.round(finalPaymentWithInsurance);
            // 効果ログは保険を主とする (riskyBet など他の倍率効果は表示しない)
            appliedCardEffects = appliedCardEffects.filter(eff => eff.type === 'info'); // info系(親権維持など)は残す
            appliedCardEffects.push({ name: `一撃保険 Lv.${level}`, value: `支払い=${Math.abs(sc)}点`, type: 'special' });
            console.log(`Loss Insurance Lv.${level} applied. Opponent Streak Bonus: ${opponentStreakBonusRate.toFixed(2)}. Final score change: ${sc}`);

            finalMsg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)}) (一撃保険適用)`;
            rClass = 'lose';

        } else { // 保険が適用されない場合 (勝利 or 保険なし敗北)
             // 1. 基本倍率決定
             if (winnerIsPlayer) {
                 if (loserHand?.name === ROLES.HIFUMI.name) { baseMultiplier = (winnerHand?.name === ROLES.PINZORO.name) ? 6 : (winnerHand?.name === ROLES.ARASHI.name) ? 4 : (winnerHand?.name === ROLES.SHIGORO.name) ? 3 : 2; }
                 else if (loserHand?.type === 'ションベン') { if (winnerHand?.name === ROLES.HIFUMI.name) { baseMultiplier = 1; } else if (winnerHand?.name === ROLES.SHIGORO.name) { baseMultiplier = ROLES.SHIGORO.payoutMultiplier; } else if (winnerHand?.name === ROLES.ARASHI.name) { baseMultiplier = ROLES.ARASHI.payoutMultiplier; } else if (winnerHand?.name === ROLES.PINZORO.name) { baseMultiplier = ROLES.PINZORO.payoutMultiplier; } else { baseMultiplier = 1; } }
                 else { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); }
             } else { // プレイヤー敗北 (保険なし)
                 if (loserHand?.name === ROLES.HIFUMI.name) { isHifumiLoss = true; baseMultiplier = (winnerHand?.name === ROLES.PINZORO.name) ? 6 : (winnerHand?.name === ROLES.ARASHI.name) ? 4 : (winnerHand?.name === ROLES.SHIGORO.name) ? 3 : 2; }
                 else if (loserHand?.type === 'ションベン') { isShonbenLoss = true; if (giveUpEyeUsedThisTurn) { baseMultiplier = 1; appliedCardEffects.push({ name: `見切り Lv.${playerCards.find(c=>c.id==='giveUpEye')?.level || 1}`, value: '(ションベン扱い)', type: 'info' }); } else { if (winnerHand?.name === ROLES.HIFUMI.name) { baseMultiplier = 1; } else if (winnerHand?.name === ROLES.SHIGORO.name) { baseMultiplier = ROLES.SHIGORO.payoutMultiplier; } else if (winnerHand?.name === ROLES.ARASHI.name) { baseMultiplier = ROLES.ARASHI.payoutMultiplier; } else if (winnerHand?.name === ROLES.PINZORO.name) { baseMultiplier = ROLES.PINZORO.payoutMultiplier; } else { baseMultiplier = 1; } } }
                 else { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); }
                 // ダブルアップ失敗ペナルティ (保険なしの場合のみ影響)
                 const doubleUpCardCheck = playerCards.find(c => c.id === 'doubleUpBet');
                 if (doubleUpBetActive && doubleUpCardCheck && !isPlayerParent) {
                     if (doubleUpCardCheck.level <= 2) {
                         isHifumiLoss = true; isShonbenLoss = false;
                         const penaltyBonus = Math.abs(ROLES.HIFUMI.payoutMultiplier) - baseMultiplier;
                         multiplierBonus += penaltyBonus;
                         appliedCardEffects.push({ name: `ダブルアップ失敗 Lv.${doubleUpCardCheck.level}`, value: `(ヒフミ扱い x${Math.abs(ROLES.HIFUMI.payoutMultiplier)})`, type: 'negative' });
                         console.log(`Double Up Failure Penalty Applied: Multiplier Bonus adjusted by ${penaltyBonus.toFixed(1)}`);
                     } else {
                         appliedCardEffects.push({ name: `ダブルアップ失敗 Lv.${doubleUpCardCheck.level}`, value: `(ペナルティなし)`, type: 'info' });
                     }
                 }
            }   

             // 2. カード効果による倍率ボーナス/ペナルティ計算 (riskyBet含む)
            multiplierBonus = 0; // 計算前にリセット
            // appliedCardEffects = appliedCardEffects.filter(eff => eff.type === 'info' || eff.name.includes('危険な賭け')); // ★ infoとriskyBet以外をリセット

            if (winnerIsPlayer) {
                // --- 勝利時のカード効果適用 ---
                playerCards.forEach(cardData => {
                    const cardDef = allCards.find(c => c.id === cardData.id);
                    if (!cardDef || !cardDef.effectTag) return;
                    const level = cardData.level;
                    let effectApplied = false;
                    let bonusVal = 0;
                    let effectType = 'bonus';

                    switch (cardDef.effectTag) {
                        case 'arashiBonus':
                            if (winnerHand?.name === ROLES.ARASHI.name) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'shigoroBonus':
                            if (winnerHand?.name === ROLES.SHIGORO.name) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'oneEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 1) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'twoEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 2) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'threeEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 3) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'fourEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 4) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'fiveEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 5) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'sixEyeBonus':
                            if (winnerHand?.type === '目' && winnerHand.value === 6) { bonusVal = level; effectApplied = true; }
                            break;
                        case 'allEyeBonus': 
                            if (winnerHand?.type === '目') { bonusVal = [0.5, 1.0, 1.5][level - 1]; effectApplied = true; }
                            break;
                    }

                    if (effectApplied) {
                        multiplierBonus += bonusVal;
                        appliedCardEffects.push({ name: `${cardDef.name} Lv.${level}`, value: `+${bonusVal.toFixed(1)}倍`, type: effectType });
                        console.log(`Card Effect Applied (Win): ${cardDef.name} Lv.${level} -> Multiplier Bonus +${bonusVal}`);
                    }
                });

                // --- 報酬増幅、ダブルアップ成功の処理 ---
                const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier');
                if (rewardAmplifierActive && amplifierCard && (winnerHand?.type === '役' || winnerHand?.type === '目')) {
                    const bonusValue = (amplifierCard.level >= 2) ? 2 : 1;
                    multiplierBonus += bonusValue;
                    appliedCardEffects.push({ name: `報酬増幅 Lv.${amplifierCard.level}`, value: `+${bonusValue.toFixed(1)}倍`, type: 'bonus' });
                    console.log(`Card Effect Applied (Win): Reward Amplifier Lv.${amplifierCard.level} -> Multiplier Bonus +${bonusValue}`);
                    // フラグリセットは handleRoundEnd の最後で行う
                }
                const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet');
                if (doubleUpBetActive && doubleUpCard && !isPlayerParent) { // 子の場合のみ適用
                    const bonusValue = [1.0, 1.5, 2.0][(doubleUpCard.level || 1) - 1];
                    multiplierBonus += bonusValue;
                    appliedCardEffects.push({ name: `ダブルアップ成功 Lv.${doubleUpCard.level}`, value: `+${bonusValue.toFixed(1)}倍`, type: 'bonus' });
                    console.log(`Card Effect Applied (Win): Double Up Success Lv.${doubleUpCard.level} -> Multiplier Bonus +${bonusValue}`);
                }

            } else { // プレイヤー敗北時の軽減 (保険なし)
                let roleLossReduction = 0; // このラウンドでの役敗北軽減値合計
                const winnerHandName = winnerHand?.name; // 勝者(NPC)の手の名前
                const overallGuardCardData = playerCards.find(c => c.id === 'overallLossGuard'); 
                let overallGuardApplied = false;

                // --- 総合敗北軽減チェック (最優先) ---
                if (overallGuardCardData) { 
                    overallGuardApplied = true;
                    const level = overallGuardCardData.level; 
                    const reductionVal = -(level);
                    roleLossReduction += reductionVal;
                    const overallGuardCardDef = allCards.find(c => c.id === overallGuardCardData.id); // カード定義を取得
                    const cardName = overallGuardCardDef ? overallGuardCardDef.name : '鉄壁防御'; // 名前を取得 (フォールバック付き)
                    appliedCardEffects.push({ name: `${cardName} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: 'negative' });
                    console.log(`Card Effect Applied (Loss): ${cardName} Lv.${level} -> Multiplier Bonus ${reductionVal}`);
                }

                // --- 個別の役敗北軽減チェック (総合防御が適用されていない場合のみ) ---
                if (!overallGuardApplied) {
                    const pinzoroGuardCardData = playerCards.find(c => c.id === 'pinzoroLossGuard'); 
                    if (pinzoroGuardCardData && winnerHandName === ROLES.PINZORO.name) { 
                        const level = pinzoroGuardCardData.level; 
                        const reductionVal = [-1.0, -2.0, -3.0][level - 1];
                        roleLossReduction += reductionVal;
                        const pinzoroGuardCardDef = allCards.find(c => c.id === pinzoroGuardCardData.id);
                        const cardName = pinzoroGuardCardDef ? pinzoroGuardCardDef.name : 'ピンゾロガード';
                        appliedCardEffects.push({ name: `${cardName} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: 'negative' });
                        console.log(`Card Effect Applied (Loss): ${cardName} Lv.${level} -> Multiplier Bonus ${reductionVal}`);
                    }
                    const arashiGuardCardData = playerCards.find(c => c.id === 'arashiLossGuard'); 
                    if (arashiGuardCardData && winnerHandName === ROLES.ARASHI.name) { 
                        const level = arashiGuardCardData.level; 
                        const reductionVal = [-1.0, -1.5, -2.5][level - 1];
                        roleLossReduction += reductionVal;
                        const arashiGuardCardDef = allCards.find(c => c.id === arashiGuardCardData.id);
                        const cardName = arashiGuardCardDef ? arashiGuardCardDef.name : 'アラシガード';
                        appliedCardEffects.push({ name: `${cardName} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: 'negative' });
                        console.log(`Card Effect Applied (Loss): ${cardName} Lv.${level} -> Multiplier Bonus ${reductionVal}`);
                    }
                    const shigoroGuardCardData = playerCards.find(c => c.id === 'shigoroLossGuard'); 
                    if (shigoroGuardCardData && winnerHandName === ROLES.SHIGORO.name) { 
                        const level = shigoroGuardCardData.level; 
                        const reductionVal = [-0.5, -1.0, -1.5][level - 1];
                        roleLossReduction += reductionVal;
                        const shigoroGuardCardDef = allCards.find(c => c.id === shigoroGuardCardData.id);
                        const cardName = shigoroGuardCardDef ? shigoroGuardCardDef.name : 'シゴロガード';
                        appliedCardEffects.push({ name: `${cardName} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: 'negative' });
                        console.log(`Card Effect Applied (Loss): ${cardName} Lv.${level} -> Multiplier Bonus ${reductionVal}`);
                    }
                } 
                // multiplierBonus に役敗北軽減の合計を加算
                multiplierBonus += roleLossReduction;

                // --- 既存の敗北時軽減処理 (ヒフミ、ションベン、目防御) ---
                if (!overallGuardApplied) {
                    playerCards.forEach(cardData => {
                       const cardDef = allCards.find(c => c.id === cardData.id);
                       if (!cardDef) return;
                       const level = cardData.level;
                       let effectApplied = false;
                       let reductionVal = 0;
                       let effectType = 'negative';

                       // ヒフミ/ションベン/目防御の判定
                       if (cardDef.effectTag === 'hifumiHalf' && isHifumiLoss) {
                            reductionVal = -level;
                            effectApplied = true;
                       }
                       if (cardDef.effectTag === 'shonbenHalf' && isShonbenLoss && !giveUpEyeUsedThisTurn) {
                            reductionVal = [-0.5, -1.0, -1.5][level - 1];
                            effectApplied = true;
                       }
                       if (cardDef.effectTag === 'eyeDefense' && loserHand?.type === '目' && winnerHand?.type === '目') {
                            reductionVal = [-0.5, -1.0, -1.5][level - 1];
                            effectApplied = true;
                            console.log(`Card Effect Applied (Loss): Eye Defense Lv.${level} -> Multiplier Reduction ${reductionVal}`);
                        }

                       if (effectApplied) {
                            multiplierBonus += reductionVal; // 倍率計算には含める
                            appliedCardEffects.push({ name: `${cardDef.name} Lv.${level}`, value: `${reductionVal.toFixed(1)}倍`, type: effectType });
                            console.log(`Card Effect Applied (Loss - Existing): ${cardDef.name} Lv.${level} -> Multiplier Bonus ${reductionVal}. Added to effects log.`);
                       }
                    }); 

                    // 見切り使用時のションベン半減処理
                    const giveUpCard = playerCards.find(c => c.id === 'giveUpEye');
                    if (isShonbenLoss && giveUpEyeUsedThisTurn && giveUpCard && giveUpCard.level >= 2) {
                       const reduction = -0.5;
                       multiplierBonus += reduction;
                       appliedCardEffects.push({ name: `見切り Lv.${giveUpCard.level}`, value: `-0.5倍`, type: 'negative' });
                       console.log(`Card Effect Applied (Loss): Give Up Eye Lv.${giveUpCard.level} -> Multiplier Bonus -0.5. Added to effects log.`);
                    }
                } 
           } 
            // 危険な賭けの勝利ボーナスを加算
             multiplierBonus += riskyBetWinBonus;

             // 3. 連勝ボーナス計算
             streakBonusRate = 0.0; // まずリセット
             let currentParentWinsForBonus = 0;
             // **現在の親が勝利した場合のみ**ボーナス発生
             if (isPlayerParent && pWin) {
                 currentParentWinsForBonus = consecutiveWins; // プレイヤー親勝利 -> 更新後のプレイヤー連勝数
             } else if (!isPlayerParent && nWin) {
                 currentParentWinsForBonus = npcConsecutiveWins; // NPC親勝利 -> 更新後のNPC連勝数
             }

             if (currentParentWinsForBonus >= 1) { // 1連勝以上の場合
                 streakBonusRate = currentParentWinsForBonus * CONSECUTIVE_WIN_BONUS_RATE;
                 console.log(`Streak Bonus Calculation: Parent=${isPlayerParent ? 'Player':'NPC'}, Wins=${currentParentWinsForBonus}, Rate=${streakBonusRate}`);
                 // 逆境の魂の効果 (プレイヤーが親で勝利した場合のみチェック)
                 if (isPlayerParent && pWin) {
                     const spiritCard = playerCards.find(c => c.id === 'fightingSpirit');
                     if (spiritCard) {
                          const level = spiritCard.level;
                          const conditionMet = (level < 3 && playerInitialScore <= npcInitialScore / 2) || (level >= 3 && playerInitialScore <= npcInitialScore);
                          if (conditionMet) {
                              const spiritBonusRateInc = [0.1, 0.2, 0.3][level - 1];
                              streakBonusRate += spiritBonusRateInc;
                              appliedCardEffects.push({ name: `逆境の魂 Lv.${level}`, value: `連勝率+${(spiritBonusRateInc * 100).toFixed(0)}%`, type: 'bonus' });
                              console.log(`Fighting Spirit Lv.${level} bonus applied: +${spiritBonusRateInc * 100}%`);
                          }
                      }
                 }
             }
             streakBonusRate = Math.max(0, streakBonusRate); // 最低0%保証

             // 4. 最終スコア計算 (通常)
             const effectiveMultiplier = Math.max(0, baseMultiplier + multiplierBonus); // riskyBet 効果含む
             const finalAmount = currentBet * effectiveMultiplier * (1 + streakBonusRate);
             sc = winnerIsPlayer ? Math.round(finalAmount) : -Math.round(finalAmount);

             if (riskyBetLossPenalty && !winnerIsPlayer) {
                const penaltyAmount = currentBet;
                sc -= penaltyAmount; // マイナス値をさらに減らす (支払い増)
            }

             // 5. メッセージ生成
             if(pWin){
                 finalMsg = loserHand?.type === 'ションベン' ? `${npcNameStr}ションベンで勝利！` : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`;
             } else {
                 if (giveUpEyeUsedThisTurn) { finalMsg = `見切り使用で敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
                 else if (isHifumiLoss) { finalMsg = `ヒフミ扱いで敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
                 else if (isShonbenLoss) { finalMsg = "ションベンで敗北..."; }
                 else { finalMsg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; }
             }
             rClass = pWin ? 'win' : 'lose'; // rClass設定
        } // 保険が適用されない場合の else ブロック終了

        // 勝敗に応じた連勝メッセージ追加
        if (rClass === 'win') {
            if (isPlayerParent && consecutiveWins >= 1) finalMsg += ` (${consecutiveWins}連勝!)`;
       } else if (rClass === 'lose') {
            if (!isPlayerParent && npcConsecutiveWins >= 1) finalMsg += ` (${npcNameStr}${npcConsecutiveWins}連勝中...)`;
       }
       finalMsg += ` ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`;

    } // スコア計算の終わり (else draw)

    // スコア計算アニメーション表示データ準備
    calculationData = {
        bet: currentBet, win: pWin, lose: nWin, draw: draw,
        parent: isPlayerParent ? 'Player' : 'NPC', // 現在の親
        consecutiveWins: isPlayerParent ? consecutiveWins : 0, // 現在の親の連勝数を渡す
        npcConsecutiveWins: !isPlayerParent ? npcConsecutiveWins : 0, // 現在の親の連勝数を渡す
        playerHand: playerHand, npcHand: npcHand,
        baseMultiplier: baseMultiplier,
        multiplierBonus: multiplierBonus,
        streakBonusRate: streakBonusRate, // 計算済みのボーナス率
        insuranceApplied: insuranceApplied,
        finalScoreChange: sc,
        appliedCardEffects: appliedCardEffects
    };
    await displayScoreCalculationAnimation(calculationData);

    // スコア更新とキャラクターアニメーション
     const psEnd = Math.max(0, playerInitialScore + sc);
     const nsEnd = Math.max(0, npcInitialScore - sc);
     playerScore = psEnd; npcScore = nsEnd;
     totalScoreChange += sc;
     const playerImageArea = document.querySelector('.character-image-area.player'); const npcImageArea = document.querySelector('.character-image-area.npc'); const playerIndicator = playerImageArea ? playerImageArea.querySelector('.win-lose-indicator') : null; const npcIndicator = npcImageArea ? npcImageArea.querySelector('.win-lose-indicator') : null; const animationDuration = 1500; const indicatorDisplayDuration = 1200; const indicatorRemoveDelay = indicatorDisplayDuration + 300;
     if (playerImageArea) playerImageArea.classList.remove('shake-damage', 'shake-happy'); if (npcImageArea) npcImageArea.classList.remove('shake-damage', 'shake-happy'); if (playerIndicator) { playerIndicator.classList.remove('indicator-win', 'indicator-lose'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; } if (npcIndicator) { npcIndicator.classList.remove('indicator-win', 'indicator-lose'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; }
     requestAnimationFrame(() => {
         if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); if (sc > 0) { playSound('scoreUp'); } else { playSound('scoreDown'); } }
         animateScore(playerScoreEl, playerInitialScore, playerScore, SCORE_ANIMATION_DURATION); animateScore(npcScoreEl, npcInitialScore, npcScore, SCORE_ANIMATION_DURATION);
         if (sc > 0 || (pWin && !draw)) { playSound('win'); if (playerImageArea) playerImageArea.classList.add('shake-happy'); if (playerIndicator) { playerIndicator.textContent = "WIN!"; playerIndicator.classList.add('indicator-win'); playerIndicator.style.visibility = 'visible'; setTimeout(() => { if (playerIndicator) { playerIndicator.classList.remove('indicator-win'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); } if (npcImageArea) npcImageArea.classList.add('shake-damage'); if (npcIndicator) { npcIndicator.textContent = "LOSE..."; npcIndicator.classList.add('indicator-lose'); npcIndicator.style.visibility = 'visible'; setTimeout(() => { if (npcIndicator) { npcIndicator.classList.remove('indicator-lose'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); } }
         else if (sc < 0 || (nWin && !draw)) { playSound('lose'); if (playerImageArea) playerImageArea.classList.add('shake-damage'); if (playerIndicator) { playerIndicator.textContent = "LOSE..."; playerIndicator.classList.add('indicator-lose'); playerIndicator.style.visibility = 'visible'; setTimeout(() => { if (playerIndicator) { playerIndicator.classList.remove('indicator-lose'); playerIndicator.textContent = ''; playerIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); } if (npcImageArea) npcImageArea.classList.add('shake-happy'); if (npcIndicator) { npcIndicator.textContent = "WIN!"; npcIndicator.classList.add('indicator-win'); npcIndicator.style.visibility = 'visible'; setTimeout(() => { if (npcIndicator) { npcIndicator.classList.remove('indicator-win'); npcIndicator.textContent = ''; npcIndicator.style.visibility = 'hidden'; } }, indicatorRemoveDelay); } }
         else if (draw && sc > 0) { playSound('scoreUp'); }
         if (playerImageArea && (playerImageArea.classList.contains('shake-happy') || playerImageArea.classList.contains('shake-damage'))) { setTimeout(() => { if (playerImageArea) playerImageArea.classList.remove('shake-happy', 'shake-damage') }, animationDuration); }
         if (npcImageArea && (npcImageArea.classList.contains('shake-happy') || npcImageArea.classList.contains('shake-damage'))) { setTimeout(() => { if (npcImageArea) npcImageArea.classList.remove('shake-happy', 'shake-damage') }, animationDuration); }
     });

    // 使用されたアクティブカードのリスト
    const usedActiveCardsForHistory = [...activeCardsUsedThisRound]; // 現在のラウンドで使用されたリストをコピーして使用
    console.log("Used active cards this round (for history):", usedActiveCardsForHistory);

    // --- 金策カード効果処理と履歴情報生成 ---
    let bountyCoinGain = 0;
    let offeringCoinGain = 0;
    let offeringSuccess = false; // 賽銭箱成功フラグ

    // 賞金稼ぎ (プレイヤー勝利時)
    if (pWin) {
        const bountyHunterCard = playerCards.find(c => c.id === 'bountyHunter');
        if (bountyHunterCard) {
            const level = bountyHunterCard.level;
            bountyCoinGain = [30, 40, 50][level - 1];
            if (bountyCoinGain > 0) {
                coinBonusInfoForHistory.bounty = bountyCoinGain; // 履歴用に記録
            }
        }
    }
    // 賽銭箱 (確率判定)
    const offeringBoxCard = playerCards.find(c => c.id === 'offeringBox');
    if (offeringBoxCard) {
        if (Math.random() < 0.50) { // 50%の確率判定
            offeringSuccess = true; // 成功フラグを立てる
            const level = offeringBoxCard.level;
            offeringCoinGain = [10, 20, 30][level - 1];
            if (offeringCoinGain > 0) {
                coinBonusInfoForHistory.offering = offeringCoinGain; // 履歴用に記録
                coinBonusInfoForHistory.offeringSuccess = true;      // 成功したことを記録
            }
        } else {
            coinBonusInfoForHistory.offeringSuccess = false; // 失敗したことを記録
            console.log(`Card Effect Skipped (Coin): 賽銭箱 Lv.${offeringBoxCard.level} (Failed probability check)`);
        }
    }

    // --- 履歴登録 ---
    addHistoryEntry({
        wave: currentWave, round: currentRoundInWave,
        parentBefore: parentBefore, // ラウンド開始前の親
        result: rClass, scoreChange: sc, betAmount: currentBet,
        playerDice: playerDice.join(' '),
        playerHandName: getHandDisplayName(playerHand),
        npcDice: npcDice.join(' '),
        npcHandName: getHandDisplayName(npcHand),
        consecutiveWins: consecutiveWins, // 終了時のプレイヤー連勝数
        npcConsecutiveWins: npcConsecutiveWins, // 終了時のNPC連勝数
        npcName: npcNameStr,
        calculationData: calculationData,
        usedActiveCards: activeCardsUsedThisRoundForHistory,
        coinBonusInfo: coinBonusInfoForHistory // 確定した情報を渡す
    });

    // UI更新とゲーム終了チェックの遅延実行
    const uiUpdateDelay = Math.max(SCORE_ANIMATION_DURATION, indicatorRemoveDelay) + 200;
    setTimeout(async () => { 
        // 親交代メッセージなどの設定
        if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? playerNameStr : npcNameStr}が親です。`; }
        else if (parentKeptByCard) { finalMsg += ` (${playerNameStr}が親権維持発動！)`; }
        
        // 金策アナウンスとコイン加算 (確定情報を使用) 
        let coinBonusMessage = "";
        // 賞金稼ぎ
        if (coinBonusInfoForHistory.bounty > 0) {
            const gain = coinBonusInfoForHistory.bounty;
            const startCoins = playerCoins; playerCoins += gain;
            console.log(`Card Effect Applied (Coin): 賞金稼ぎ -> +${gain} G`);
            playCoinAnimation(gain); animateScore(gameCoinDisplayEl, startCoins, playerCoins, 500); if (shopScreen.classList.contains('active')) { animateScore(shopCoinDisplayEl, startCoins, playerCoins, 500); }
            coinBonusMessage += ` 賞金稼ぎ効果！+${gain}G！`;
        }
        // 賽銭箱 (成功した場合のみ)
        if (coinBonusInfoForHistory.offeringSuccess && coinBonusInfoForHistory.offering > 0) {
             const gain = coinBonusInfoForHistory.offering;
             const startCoins = playerCoins; playerCoins += gain;
             console.log(`Card Effect Applied (Coin): 賽銭箱 (Success!) -> +${gain} G`);
             playCoinAnimation(gain); animateScore(gameCoinDisplayEl, startCoins, playerCoins, 500); if (shopScreen.classList.contains('active')) { animateScore(shopCoinDisplayEl, startCoins, playerCoins, 500); }
             coinBonusMessage += ` 賽銭箱効果！+${gain}G！`;
        }

        // 最終メッセージにコインボーナスアナウンスを追記
        finalMsg += coinBonusMessage;
        setMessage(finalMsg); // 最終的なメッセージを設定

        // フラグリセット
        if (giveUpEyeUsedThisTurn) { giveUpEyeUsedThisTurn = false; }
        rewardAmplifierActive = false;
        doubleUpBetActive = false;
        drawBonusActive = false;
        console.log("Resetting rewardAmplifierActive and doubleUpBetActive flags after round end processing.");

        // 土俵際チェック (スコア更新後に行う)
        const lastStandCard = playerCards.find(c => c.id === 'lastStand');
        const lastStandActivatedKey = `lastStand_activated_wave_${currentWave}`;
        // 条件: 敗北(sc<0) かつ 最低賭け金未満 かつ カード持ち かつ WAVE未発動
        if (sc < 0 && playerScore < currentMinBet && lastStandCard && !activeCardUses[lastStandActivatedKey]) {
            const level = lastStandCard.level;
            const scoreBeforeActivation = playerScore; // 回復前のスコア
            playerScore = currentMinBet; // 最低賭け金まで回復
            activeCardUses[lastStandActivatedKey] = true; // このWAVEで発動済みフラグ
            playSound('scoreUp'); // 回復音 (仮)

            let lastStandMessage = `土俵際 Lv.${level} 発動！ 持ち点が ${currentMinBet} 点に回復！`;
            console.log(`Card Effect Activated: 土俵際 Lv.${level}! Score recovered from ${scoreBeforeActivation} to ${playerScore}.`);

            // レベル別追加効果
            if (level >= 2) {
                keepParentDiscountNextRound = true; // 次回最低賭け金半額
                lastStandMessage += " 次ラウンド最低賭け金半額！";
                console.log(" -> 土俵際 Lv.2+ effect: Next min bet halved.");
            }
            if (level >= 3) {
                const coinGain = 50;
                const startCoins = playerCoins;
                playerCoins += coinGain;
                lastStandMessage += ` さらに ${coinGain}G 獲得！`;
                console.log(` -> 土俵際 Lv.3 effect: +${coinGain}G gained.`);
                playCoinAnimation(coinGain); // コインアニメーション
                animateScore(gameCoinDisplayEl, startCoins, playerCoins, 500);
                 if (shopScreen.classList.contains('active')) {
                     animateScore(shopCoinDisplayEl, startCoins, playerCoins, 500);
                 }
            }

            // UIのスコア表示を即時更新 (アニメーションなしで直接反映)
            playerScoreEl.textContent = playerScore;
            if(scoreCalculationAnimationEl && scoreCalculationAnimationEl.classList.contains('visible')){
                 // 計算アニメーションが表示されている場合、最終結果を上書き
                 const finalNode = scoreCalculationAnimationEl.querySelector('.score-calc-final');
                 if(finalNode) {
                    finalNode.textContent = `再起: ${playerScore} 点`;
                    finalNode.classList.remove('negative', 'positive', 'neutral');
                    finalNode.classList.add('bonus'); // 色を変えるなど
                 }
            }
            // メッセージエリアにも効果発動を追記
            // finalMsg に追記するのではなく、新しいメッセージとして表示
            setMessage(lastStandMessage);
            await new Promise(resolve => setTimeout(resolve, 1500)); // メッセージ表示時間

        }
        if (scoreCalculationAnimationEl) scoreCalculationAnimationEl.classList.remove('visible');        
        if (diceAreaEl) diceAreaEl.classList.remove('calculating');
        if(scoreCalculationAnimationEl) scoreCalculationAnimationEl.innerHTML = '';

        updateUI(); // UI更新

        // checkGameEnd を呼び出す前に少し待つ (アナウンス表示のため)
        await new Promise(resolve => setTimeout(resolve, coinBonusMessage ? 2000 : 1300)); // コインボーナスがあれば少し待つ

        checkGameEnd(); // ゲーム終了チェック
    }, uiUpdateDelay); // setTimeout の終わり
} // handleRoundEnd 関数の終わり

    // 親権維持カード使用確認
    async function askKeepParentRight(cardLevel) {
        playSound('cardUse'); // SE追加
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

    async function checkGameEnd() { 
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);
        if (npcScore <= 0) {
            defeatedCount++;
            const coinResult = calculateAndAwardCoins();
            const finalEarnedCoins = coinResult.finalEarned;
            const greedyBonus = coinResult.greedyPotBonus;
            const greedyLevel = coinResult.greedyPotLevel;
            gameOverReason = `${currentNpcCharacter?.name || '相手'}の持ち点を0にしました！`;
            addHistoryEntry({
                wave: currentWave, round: currentRoundInWave, result: 'clear',
                scoreChange: finalEarnedCoins, isWaveClear: true, earnedCoins: finalEarnedCoins,
                message: `${gameOverReason} コイン ${finalEarnedCoins} G獲得！` + (greedyBonus > 0 ? ` (強欲な壺 Lv.${greedyLevel} +${greedyBonus}G)` : ""),
                clearReason: gameOverReason // 理由を別プロパティで保持
            });

            if (gameMode === 'normal' && currentWave >= MAX_WAVES) {
                isC = true;
                await showGameResultModal(true, gameOverReason);
            } else if (gameMode === 'endless' || currentWave < MAX_WAVES) {
                console.log("NPC defeated, proceeding to shop.");
                await showGameResultModal(true, gameOverReason);
                // ショップ遷移前のメッセージを生成 
                let waveClearMessage = `${gameOverReason} コイン ${finalEarnedCoins} G獲得！`;
                if (greedyBonus > 0) {
                    waveClearMessage += ` (強欲な壺 Lv.${greedyLevel} 効果: +${greedyBonus}G)`;
                }
                waveClearMessage += " ショップへどうぞ！";
                setMessage(waveClearMessage); 
                updateUI();
                if (betMainControls) betMainControls.style.display = 'none';
                if (betActionContainer) betActionContainer.style.display = 'none';
                if (actionArea) actionArea.style.display = 'none';
                if (nextWaveArea) nextWaveArea.style.display = 'flex';
                historyButton.disabled = true;
                return; // WAVEクリア処理終了
            }
        }
        else if (playerScore <= 0) { isGO = true; gameOverReason = "持ち点が0になりました。"; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && isPlayerParent) { isGO = true; gameOverReason = `持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、親で賭けられません。`; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && !isPlayerParent && npcScore >= currentMinBet) { /* 子の場合、NPCが賭けられるなら続行可能 */ } // この条件分岐不要かも
        if (isGO || isC) { console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`); isGameActive = false; betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; maxBetButton.disabled = true; minBetButton.disabled = true; historyButton.disabled = false; currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'none'; showResultScreen(isC, playerScore, currentWave, gameOverReason); }
        else { console.log("Round end, continuing game."); if (!isGameActive && !waitingForPlayerActionAfterRoll && !isShowingRoleResult && !isShowingGameResult) { setTimeout(startBettingPhase, 100); } } // 少し遅延させて開始
    }
    function calculateEarnedCoins() { 
        const waveBonus = currentWave * 20; const defeatBonus = 80; const scoreGainInWave = Math.max(0, playerScore - scoreAtWaveStart); const scoreGainBonus = Math.min(30, Math.floor(scoreGainInWave * 0.05)); const overkillBonus = npcScore < 0 ? Math.min(50, Math.floor(Math.abs(npcScore) * 0.2)) : 0; const roundsTaken = Math.max(1, currentRoundInWave); const roundPenalty = Math.max(0, (roundsTaken - 1) * 20); const baseEarned = waveBonus + defeatBonus + scoreGainBonus + overkillBonus - roundPenalty; const earned = Math.min(300, Math.max(10, baseEarned)); console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, ScoreAtStart=${scoreAtWaveStart}, ScoreNow=${playerScore}, Gain=${scoreGainInWave}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`); return earned;
    }
    function calculateAndAwardCoins() {
        let earned = calculateEarnedCoins();
        if (earned <= 0) {
             console.log("Wave cleared, but no coins earned.");
             return { finalEarned: 0, greedyPotBonus: 0, greedyPotLevel: 0 }; // 獲得情報オブジェクトを返す
        }

        let baseEarnedForMessage = earned;
        let greedyPotBonusCoins = 0;
        let greedyPotLevel = 0;

        const greedyPotCard = playerCards.find(c => c.id === 'greedyPot');
        if (greedyPotCard) {
            greedyPotLevel = greedyPotCard.level;
            const bonusRate = [0.30, 0.40, 0.50][greedyPotLevel - 1];
            greedyPotBonusCoins = Math.floor(baseEarnedForMessage * bonusRate);
            earned += greedyPotBonusCoins;
            console.log(`Card Effect Applied (Coin): 強欲な壺 Lv.${greedyPotLevel} -> +${greedyPotBonusCoins} G (Total Earned: ${earned} G)`);
        }

        const startCoins = playerCoins;
        playerCoins += earned; // コイン加算はここで行う
        console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`);
        playCoinAnimation(earned);
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        if (shopCoinDisplayEl) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        }
        return {
            finalEarned: earned,
            greedyPotBonus: greedyPotBonusCoins,
            greedyPotLevel: greedyPotLevel
        };
    }
    function playCoinAnimation(amount) { 
        if (typeof amount !== 'number' || amount <= 0 || !gameCoinDisplayEl) return;

        playSound('coin'); // SE: コイン獲得音

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
    function showResultScreen(isClear, currentScore, wave, reason = "") { 
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
    function addHistoryEntry(entry) {
        entry.npcName = entry.npcName || currentNpcCharacter?.name || 'NPC不明';
        // ダイス目が配列で渡された場合、文字列に変換 (スペース区切り)
        if (Array.isArray(entry.playerDice)) {
            entry.playerDice = entry.playerDice.join(' ');
        }
        if (Array.isArray(entry.npcDice)) {
            entry.npcDice = npcDice.join(' '); 
        }
        gameHistory.push(entry);
        console.log("History entry added:", entry);
     }
     function displayHistory() {
        historyLogEl.innerHTML = '';
        if (gameHistory.length === 0) {
            historyLogEl.innerHTML = '<li>履歴なし</li>';
            return;
        }

        [...gameHistory].reverse().forEach((entry, index) => {
            const li = document.createElement('li');
            li.className = entry.result || 'unknown';
            li.dataset.historyIndex = gameHistory.length - 1 - index;

            let historyHtml = '';
            const playerNameForHistory = playerName || selectedCharacter?.name || 'あなた';
            const npcNameForHistory = entry.npcName || 'NPC不明';

            // --- WAVE/ROUND/親 情報 (WAVEクリア時以外に表示) ---
            if (!entry.isWaveClear) {
                const parentName = entry.parentBefore === 'Player' ? playerNameForHistory : npcNameForHistory;
                historyHtml += `<div class="history-meta">
                                    <span class="wave-num">
                                        <span class="wave-highlight">WAVE ${entry.wave}</span> -
                                        <span class="round-normal">ROUND ${entry.round}</span>
                                    </span>
                                    <span class="parent-info">(親: ${parentName})</span>
                                </div>`;
            }
            // --- WAVEクリア時の表示 ---
            if (entry.isWaveClear) {
                let clearMsg = `WAVE ${entry.wave} クリア！`; // WAVE番号はクリアメッセージ内に残す
                if (entry.clearReason) {
                    clearMsg = `${entry.clearReason}によりWAVE ${entry.wave} クリア！`; // 理由があれば理由とWAVE番号
                }
                let coinMsg = "";
                if (entry.earnedCoins !== undefined && entry.earnedCoins > 0) {
                    coinMsg += ` ${entry.earnedCoins} G獲得！`;
                    const greedyBonus = entry.greedyPotBonus || 0; // entry から直接取得
                    const greedyLevel = entry.greedyPotLevel || 0;
                    if (greedyBonus > 0 && greedyLevel > 0) {
                         coinMsg += ` (壺 Lv.${greedyLevel} +${greedyBonus}G)`;
                    }
                } else {
                    coinMsg = " (コイン獲得なし)";
                }
                 historyHtml = `<div class="wave-clear-info">${clearMsg}${coinMsg}</div>`;
                 li.style.padding = '8px 12px'; // クリア情報用のパディング調整 (任意)
                 li.style.borderLeft = '4px solid #4CAF50'; // クリア用の左ボーダー (任意)
            }
            // --- 通常ラウンドの表示 ---
            else {
                // 勝敗ラベル
                let resultText = '';
                let resultClass = '';
                if (entry.result === 'win') { resultText = '🏆 勝ち'; resultClass = 'history-win'; }
                else if (entry.result === 'lose') { resultText = '💔 負け'; resultClass = 'history-lose'; }
                else { resultText = '🤝 引き分け'; resultClass = 'history-draw'; }

                // プレイヤー/NPC情報
                const playerDiceStr = entry.playerDice || '-';
                const playerHandStr = entry.playerHandName || '-';
                const npcDiceStr = entry.npcDice || '-';
                const npcHandStr = entry.npcHandName || '-';

                historyHtml += `<div class="history-matchup">
                                    <span class="history-result ${resultClass}">${resultText}</span>
                                    <span class="player-name">${playerNameForHistory}:</span>
                                    <span class="dice-roll">${playerDiceStr}</span>
                                    <span class="hand-name">${playerHandStr}</span>
                                    <span class="vs">vs</span>
                                    <span class="hand-name">${npcHandStr}</span>
                                    <span class="dice-roll">${npcDiceStr}</span>
                                    <span class="npc-name">${npcNameForHistory}</span>
                                </div>`;

                // 賭け金/得失点/コイン/詳細ボタン
                const betStr = entry.betAmount > 0 ? `賭: ${entry.betAmount}` : '賭: -';
                const scoreStr = entry.scoreChange !== 0 ? `点: <span class="${entry.scoreChange > 0 ? 'gain' : 'loss'}">${entry.scoreChange > 0 ? '+' : ''}${entry.scoreChange}</span>` : '点: ±0';
                let coinStr = "";
                if (entry.coinBonusInfo) {
                    if (entry.coinBonusInfo.bounty > 0) {
                        coinStr += `💰賞金+${entry.coinBonusInfo.bounty}G `;
                    }
                    // 賽銭箱は成功した場合のみ表示 (coinBonusInfo.offeringSuccess で判定)
                    if (entry.coinBonusInfo.offeringSuccess && entry.coinBonusInfo.offering > 0) {
                        coinStr += `💰賽銭+${entry.coinBonusInfo.offering}G `;
                    }
                }
                 // 連勝表示
                 const winStreakStr = entry.consecutiveWins > 1 ? ` <span class="win-streak">(${entry.consecutiveWins}連勝)</span>` : '';
                 const npcWinStreakStr = entry.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${npcNameForHistory}${entry.npcConsecutiveWins}連勝中...)</span>` : '';


                historyHtml += `<div class="history-summary">
                                    <span class="bet-amount">${betStr}</span>
                                    <span class="score-change-history">${scoreStr}</span>
                                    <span class="coin-bonus-history">${coinStr.trim()}</span>
                                    <span class="streak-info">${winStreakStr}${npcWinStreakStr}</span>
                                    <button class="history-detail-toggle button-subtle">詳細</button>
                                </div>`;

                // 詳細情報 (最初は非表示)
                historyHtml += `<div class="history-details-content" style="display: none;">`;
                // スコア計算詳細
                if (entry.calculationData) {
                    historyHtml += `<h5>スコア計算:</h5><ul>`;
                    const data = entry.calculationData;
                    historyHtml += `<li>賭け金: ${data.bet}</li>`;
                    let baseMultText = data.draw ? "引き分け" : data.insuranceApplied ? "保険適用" : `${data.baseMultiplier.toFixed(1)}倍`;
                    historyHtml += `<li>基本倍率/結果: ${baseMultText}</li>`;
                    if (data.appliedCardEffects && data.appliedCardEffects.length > 0) {
                        historyHtml += `<li>カード効果:<ul>`;
                        data.appliedCardEffects.forEach(eff => {
                             historyHtml += `<li>${eff.name}: ${eff.value} (${eff.type})</li>`;
                        });
                        historyHtml += `</ul></li>`;
                    }
                    if (!data.draw && !data.insuranceApplied && data.streakBonusRate > 0) {
                        const streakParent = data.parent === 'Player' ? playerNameForHistory : npcNameForHistory;
                        const streakCount = data.consecutiveWins || data.npcConsecutiveWins || 0;
                         historyHtml += `<li>連勝ボーナス (${streakParent} ${streakCount}連勝): +${(data.streakBonusRate * 100).toFixed(0)}%</li>`;
                    }
                    historyHtml += `<li>最終変動: ${data.finalScoreChange > 0 ? '+' : ''}${data.finalScoreChange}</li>`;
                    historyHtml += `</ul>`;
                } else {
                     historyHtml += `<p>スコア計算詳細なし</p>`;
                }
                // 使用アクティブカード
                if (entry.usedActiveCards && entry.usedActiveCards.length > 0) {
                    historyHtml += `<h5>使用カード:</h5><ul>`;
                    entry.usedActiveCards.forEach(cardId => { // entry.usedActiveCards を参照
                        const cardDef = allCards.find(c => c.id === cardId);
                        historyHtml += `<li>${cardDef ? cardDef.name : cardId}</li>`;
                    });
                    historyHtml += `</ul>`;
                } else {
                     historyHtml += `<p>使用カードなし</p>`; // 表示なしの場合
                }
                historyHtml += `</div>`;
            }
            li.innerHTML = historyHtml;
            historyLogEl.appendChild(li);
        });

        // 詳細ボタンのイベントリスナーを設定
        document.querySelectorAll('.history-detail-toggle').forEach(button => {
            button.removeEventListener('click', toggleHistoryDetails); // 念のため既存リスナー削除
            button.addEventListener('click', toggleHistoryDetails);
        });
     }

     // 詳細表示切り替え関数 
     function toggleHistoryDetails(event) {
         playSound('click'); // 詳細ボタンクリック音
         const button = event.target;
         const detailsContent = button.closest('.history-summary').nextElementSibling;
         if (detailsContent && detailsContent.classList.contains('history-details-content')) {
             if (detailsContent.style.display === 'none') {
                 detailsContent.style.display = 'block';
                 button.textContent = '閉じる';
                 // スムーズな展開アニメーションを追加しても良い
                 detailsContent.style.maxHeight = detailsContent.scrollHeight + "px"; // アニメーション用
                 detailsContent.classList.add('details-visible'); // アニメーション用クラス
             } else {
                 detailsContent.style.display = 'none';
                 button.textContent = '詳細';
                 detailsContent.style.maxHeight = '0'; // アニメーション用
                 detailsContent.classList.remove('details-visible'); // アニメーション用クラス
             }
         }
     }
    function generateSettingsCardListHtml() { 
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

            // レベル別説明HTMLを生成
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
                </div>`; // effect-details を直接表示

            settingsListContainer.appendChild(item);
        });
        console.log("Generated settings card list with all level effects displayed.");
    }

    // 設定ボタンのイベントリスナー (SE追加)
    if (settingsButton && settingsModal) {
        settingsButton.addEventListener('click', () => {
            playSound('click'); // SE追加
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
    function switchSettingsTab(targetId) { 
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
    function displayCardsInModal() {
        const activeCardDisplay = document.getElementById('active-card-display');
        const passiveCardDisplay = document.getElementById('passive-card-display');
        const activeCardMessage = document.getElementById('active-card-message');
        const passiveCardMessage = document.getElementById('passive-card-message');
        if (!activeCardDisplay || !passiveCardDisplay || !activeCardMessage || !passiveCardMessage) {
            console.error("Required elements for card action modal not found!");
            return;
        }

        const activeSection = activeCardDisplay.closest('.card-section');
        if (activeSection) {
            const activeTitleH3 = activeSection.querySelector('h3');
            if (activeTitleH3 && !activeTitleH3.querySelector('.section-title-text')) { // spanがまだなければ追加
                activeTitleH3.innerHTML = `<span class="section-title-text">${activeTitleH3.textContent}</span>`;
            }
        } else {
            console.warn("Could not find active card section parent.");
        }

        const passiveSection = passiveCardDisplay.closest('.card-section');
        if (passiveSection) {
            const passiveTitleH3 = passiveSection.querySelector('h3');
            if (passiveTitleH3 && !passiveTitleH3.querySelector('.section-title-text')) { // spanがまだなければ追加
                 const originalText = passiveTitleH3.textContent; // 例: "パッシブカード (装備カード)"
                 passiveTitleH3.innerHTML = `<span class="section-title-text">${originalText}</span>`;
            }
        } else {
            console.warn("Could not find passive card section parent.");
        }

        activeCardMessage.textContent = "使用したいカードを選択してください。";
        passiveCardMessage.textContent = "現在装備中のカードです。"; // メッセージ設定も移動・統一

        activeCardDisplay.innerHTML = ''; passiveCardDisplay.innerHTML = ''; activeCardDisplay.classList.remove('empty'); passiveCardDisplay.classList.remove('empty');
        let activeCards = []; let passiveCards = [];
        playerCards.forEach(cardData => { const card = allCards.find(c => c.id === cardData.id); if (!card) return; const isCardActive = !!card.usesPerWave; if (isCardActive) { activeCards.push(cardData); } else { passiveCards.push(cardData); } });

        let usableActiveCardFound = false;
        if (activeCards.length === 0) {
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
                    <div class="card-name">${cardNameHtml}</div> <!-- h3をdivに変更 -->
                    ${levelSpanHtml}
                    <div class="card-item-footer"> ${detailButtonHtml} ${useButtonHtml} </div>`;
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                const detailBtn = cardElement.querySelector('.card-detail-button');
                if (detailBtn) {
                    detailBtn.addEventListener('click', handleDetailButtonClick);
                }
                const useBtn = cardElement.querySelector('.use-card-button');
                if (useBtn) {
                    useBtn.addEventListener('click', handleActiveCardUse);
                }

                activeCardDisplay.appendChild(cardElement);
            });
            if (!usableActiveCardFound && activeCards.length > 0) {
            }
        }

        if (passiveCards.length === 0) {
            passiveCardDisplay.classList.add('empty');
            passiveCardDisplay.textContent = "(手札にパッシブカードがありません)";
        } else {
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
                    <div class="card-name">${cardNameHtml}</div> <!-- h3をdivに変更 -->
                    ${levelSpanHtml}
                    <div class="card-item-footer"> ${detailButtonHtml} </div>`;
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                const detailBtn = cardElement.querySelector('.card-detail-button');
                if (detailBtn) {
                    detailBtn.addEventListener('click', handleDetailButtonClick);
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

    // === アクティブカード使用処理 ===
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
        // 修正: isUsableNow の判定を簡略化し、呼び出し元でチェック済前提とするか、ここで再チェック
        const isUsableNow = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardId) : checkCardUsability(cardId);

        // 修正: isUsableNow のチェックを強化
        if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !isUsableNow || isShowingRoleResult || isShowingGameResult) {
            console.log(`Card ${cardId} cannot be used now. Active: ${activeCardBeingUsed}, WaitingChoice: ${waitingForUserChoice}, UsableNow: ${isUsableNow}, ShowingRoleResult: ${isShowingRoleResult}, ShowingGameResult: ${isShowingGameResult}`);
            if (!isUsableNow && !activeCardBeingUsed) {
                 playSound('error');
                 // メッセージ表示を追加 (デバッグ用、後で調整)
                 // setMessage(`カード「${allCards.find(c=>c.id === cardId)?.name}」は現在使用できません。`);
            }
            // ここで return する前に activeCardBeingUsed を解除すべきか検討
            // activeCardBeingUsed = null; // 解除してしまうと、後続処理が動く可能性があるため注意
            return; // return は維持
        }
        const card = allCards.find(c => c.id === cardId); if (!card) return;

        playSound('cardUse');

        console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
        activeCardBeingUsed = cardId; // ここで使用中フラグを立てる

        // ラウンド開始時の使用回数を記録
        if (cardId === 'doubleUpBet') activeCardUses['doubleUpBet_roundStartCount'] = activeCardUses['doubleUpBet'] || 0;
        if (cardId === 'rewardAmplifier') activeCardUses['rewardAmplifier_roundStartCount'] = activeCardUses['rewardAmplifier'] || 0;

        let useConsumed = false;
        let requiresDelay = false;
        // let turnEnd = false; // 削除: turnEnd は使わない方向で
        let postUseMessage = "";
        let requiresRoll = false;
        // let requiresNPCAction = false; // 削除: requiresNPCAction は使わない方向で
        let requiresPlayerActionAfterCard = false; // これで制御

        // --- カード効果分岐 ---
        if (['changeToOne', 'changeToSix', 'adjustEye', 'menashiAdjust'].includes(cardId)) {
            // ダイス選択が必要なカードは、選択後に useConsumed, requiresPlayerActionAfterCard を決定
            showDiceChoiceOverlay(cardId);
            // useConsumed = false; // 選択完了まで消費保留 (showDiceChoiceOverlay内でも良いがここで明確化)
            // activeCardBeingUsed は解除しない (選択完了 or キャンセルまで保持)
            return; // ダイス選択の処理に任せる
        }
        else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) {
            let changed = false; // ループ外で宣言
            if (playerHand?.type === '目') {
                const eyeValue = playerHand.value;
                let targetValue = cardId === 'changeEyeToOne' ? 1 : 6;
                let newDice = [...playerDice];
                const indexToChange = newDice.findIndex(d => d === eyeValue);
                if (indexToChange !== -1) {
                    newDice[indexToChange] = targetValue;
                    // postUseMessage は後続の共通処理で設定
                    changed = true;
                } else {
                    postUseMessage = `エラー：変更対象の目(${eyeValue})が見つかりませんでした。`;
                    // changed は false のまま
                }
                if (changed) {
                    playerDice = newDice;
                    const result = getHandResult(playerDice, false, 0, 0);
                    const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
                    playerHand = rk ? { ...ROLES[rk], ...result } : result;
                    console.log("Re-evaluated hand after changeEye:", playerHand);
                    if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                    highlightHand(playerHandEl, playerHand);
                    if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                    diceDisplayEl.textContent = playerDice.join(' ');
                    useConsumed = true;
                    requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
                    postUseMessage = `「${eyeValue}」の目を「${targetValue}」に変更しました。`; // メッセージ設定
                } else {
                     useConsumed = false;
                }
            } else {
                 postUseMessage = `このカードは「目」が出ている時しか使用できません。`;
                 useConsumed = false;
            }
            // フラグ解除は共通処理で行う
        }
        else if (cardId === 'adjustEyeValue') {
            if (playerHand?.type !== '目') {
                postUseMessage = "このカードは「目」が出ている時しか使用できません。";
                useConsumed = false;
                playSound('error');
                activeCardBeingUsed = null; 
            } else {
                showDiceChoiceOverlay(cardId);
                return; // handleDiceChoice に処理を委譲するため、ここで return
            }
        }
        else if (cardId === 'nextChance') {
            let changed = false; // ループ外で宣言
            if (playerHand?.type === '目') {
                const eyeValue = playerHand.value;
                const pairValue = playerDice.find(d => playerDice.filter(v => v === d).length === 2);
                const indexToReroll = playerDice.findIndex(d => d === eyeValue);

                if (indexToReroll !== -1 && pairValue !== undefined) {
                    const originalValue = playerDice[indexToReroll];
                    const nextChanceLevel = playerCardData.level;
                    const zoroUpChance = [0.05, 0.10, 0.15][nextChanceLevel - 1];
                    let rolledValue;
                    if (Math.random() < zoroUpChance) {
                        rolledValue = pairValue;
                    } else {
                        rolledValue = rollSingleDice();
                    }
                    let newDice = [...playerDice];
                    newDice[indexToReroll] = rolledValue;
                    playerDice = newDice;
                    const result = getHandResult(playerDice, false, 0, 0);
                    const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
                    playerHand = rk ? { ...ROLES[rk], ...result } : result;
                    postUseMessage = `ネクストチャンス！ 「${originalValue}」の目を振り直しました。結果: ${rolledValue} (${getHandDisplayName(playerHand)})`;
                    useConsumed = true;
                    nextChanceUsedThisTurn = true;
                    requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
                    // UI更新
                    if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                    diceDisplayEl.textContent = playerDice.join(' ');
                    if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                    highlightHand(playerHandEl, playerHand);
                    changed = true;
                } else {
                    postUseMessage = "エラー：ネクストチャンスの対象が見つかりません。";
                    useConsumed = false;
                }
            } else {
                 postUseMessage = "このカードは「目」が出ている時しか使用できません。";
                 useConsumed = false;
            }
            // フラグ解除は共通処理で行う
        }
        else if (cardId === 'ignoreMinBet') {
            ignoreMinBetActive = true;
            postUseMessage = `最低賭け金が1になりました。`;
            requiresDelay = true;
            useConsumed = true;
            // requiresPlayerActionAfterCard は不要
        }
        else if (cardId === 'zoroChanceUp') {
            zoroChanceUpActive = true;
            postUseMessage = `このラウンド中、ゾロ目確率UP！`;
            requiresDelay = true;
            requiresRoll = true;
            useConsumed = true;
            // requiresPlayerActionAfterCard は不要
        }
        else if (cardId === 'avoid123_456') {
             const canUseAvoidCard = isGameActive && isPlayerTurn && playerRollCount === 0 && !avoid123_456Active;
             if (!canUseAvoidCard) {
                 postUseMessage = "このカードは自分の最初のロール前にのみ使用できます。";
                 useConsumed = false;
                 playSound('error');
             } else {
                 avoid123_456Active = true;
                 postUseMessage = `このラウンド中、役回避！ サイコロを振ってください。`;
                 useConsumed = true;
                 requiresDelay = false; // 即時効果
                 requiresRoll = true;
            }
        }
        else if (cardId === 'blessingDice') {
            blessingDiceActive = true;
            postUseMessage = `このラウンド中、6が出やすくなります。`;
            requiresDelay = true;
            requiresRoll = true;
            useConsumed = true;
        }
        else if (cardId === 'stormWarning') {
            stormWarningActive = true;
            postUseMessage = `次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`;
            requiresDelay = true;
            requiresRoll = true;
            useConsumed = true;
        }
        else if (cardId === 'riskyBet') {
             if (!isPlayerParent || isGameActive) {
                 postUseMessage = "このカードは親で賭け金設定中にのみ使用できます。";
                 useConsumed = false;
             } else {
                 riskyBetActive = true;
                 useConsumed = true;
                 requiresDelay = false;
                 postUseMessage = `危険な賭け！最低賭け金が2倍になり、勝敗結果の倍率が変動します。`;
                 updateBetLimits(); // 即時反映
             }
        }
        else if (cardId === 'giveUpEye') {
            if (playerHand?.type !== '目なし') {
                 postUseMessage = "このカードは目なしの時にしか使用できません。";
                 useConsumed = false;
            } else {
                playerHand = { ...ROLES.SHONBEN, type: 'ションベン' }; giveUpEyeUsedThisTurn = true; useConsumed = true;
                postUseMessage = `見切り使用！ションベン扱いになります。`; updateUI(); highlightHand(playerHandEl, playerHand); rollButton.disabled = true;
                requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
            }
       }
       else if (cardId === 'doubleUpBet') {
        doubleUpBetActive = true; // フラグを立てる (これは維持)
        useConsumed = true;
        postUseMessage = "ダブルアップ準備完了！勝負！"; requiresDelay = true;
        requiresPlayerActionAfterCard = true;
    }
       else if (cardId === 'blindingDice') { // または 'shinkirou'
           blindingDiceActive = true; requiresDelay = true; useConsumed = true; // 使用確定
           postUseMessage = `蜃気楼！このラウンド中、相手のロールに影響します。`; // 名前変更反映
           requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
       }
       else if (cardId === 'soulRoll') { 
        const costPercent = 10; 
        const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
        if (playerScore < cost) {
            playSound('error');
            postUseMessage = `魂の一振りのコスト(${cost}点)を払えません！`;
            useConsumed = false;
            activeCardBeingUsed = null; // フラグ解除
        } else {
            playerScore -= cost;
            useConsumed = true; // 使用はここで確定
            soulRollUsedThisTurn = true; // 使用済みフラグ
            // 確率での役確定処理を追加
            const level = playerCardData.level;
            let determinedHand = null;
            let determinedDice = null;
            const probability = 0.20; // 確率 (20%)

            // コンソールログ追加 (確率判定前)
            console.log(`Soul Roll Lv.${level}: Checking probability (${probability * 100}%)...`);

            if (Math.random() < probability) {
                // コンソールログ追加 (確率成功) 
                console.log(` -> Probability HIT! Determining special role...`);
                if (level === 1) {
                    determinedDice = [4, 5, 6];
                    determinedHand = { ...ROLES.SHIGORO, type: '役', value: 6 };
                    postUseMessage = `魂の一振り！${cost}点消費… シゴロ確定！`;
                    console.log("   -> Soul Roll Lv.1 triggered Shigoro!"); // インデント調整
                } else if (level === 2) {
                    const arashiValue = Math.floor(Math.random() * 5) + 2;
                    determinedDice = [arashiValue, arashiValue, arashiValue];
                    determinedHand = { ...ROLES.ARASHI, type: '役', value: arashiValue };
                    postUseMessage = `魂の一振り！${cost}点消費… ${arashiValue}のアラシ確定！`;
                    console.log(`   -> Soul Roll Lv.2 triggered Arashi (${arashiValue})!`); // インデント調整
                } else if (level >= 3) {
                    determinedDice = [1, 1, 1];
                    determinedHand = { ...ROLES.PINZORO, type: '役', value: 1 };
                    postUseMessage = `魂の一振り！${cost}点消費… ピンゾロ確定！`;
                    console.log("   -> Soul Roll Lv.3 triggered Pinzoro!"); // インデント調整
                }
            } else {
                // コンソールログ追加 (確率失敗) 
                console.log(` -> Probability MISS. Proceeding with normal extra roll.`);
            }
            if (determinedHand && determinedDice) {
                // 役が確定した場合
                playerDice = determinedDice;
                playerHand = determinedHand;
                // UI即時更新
                if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                diceDisplayEl.textContent = playerDice.join(' ');
                if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                highlightHand(playerHandEl, playerHand);
                updateUI(); // スコア反映など
                // 役確定なので、次のアクション判断へ
                requiresPlayerActionAfterCard = true;
                requiresRoll = false; // ロールは不要
                soulRollUsedThisTurn = false; // 役確定したのでフラグリセット
                activeCardBeingUsed = null; // 処理完了なのでフラグ解除
            } else {
                // 確率に外れた場合 (通常の追加ロール)
                postUseMessage = `魂の一振り！${cost}点を消費して追加ロール！ サイコロを振ってください。`;
                requiresRoll = true; // ロール要求
                updateUI(); // スコア反映
                rollButton.disabled = false; // ロールボタン有効化
                historyButton.disabled = false;
                // activeCardBeingUsed は共通処理で解除される
            }
        }
    }
   else if (cardId === 'rewardAmplifier') {
    rewardAmplifierActive = true; // フラグを立てる (これは維持)
    useConsumed = true; // 使用確定
    postUseMessage = `報酬増幅！このラウンドの役での勝利時、配当倍率が増加します。`; requiresDelay = true;
    requiresPlayerActionAfterCard = true;
}
        else if (cardId === 'drawBonus') {
            drawBonusActive = true; useConsumed = true; // 使用確定
            postUseMessage = `引き分けボーナス準備完了！このラウンド引き分け時に効果発動。`; requiresDelay = true;
            requiresPlayerActionAfterCard = true; 
        }
        else if (cardId === 'stormRoulette') {
             if (playerHand?.name === ROLES.ARASHI.name) {
                 const currentArashiValue = playerHand.value;
                 const level = playerCardData.level;
                 const pinzoroChance = [0.05, 0.10, 0.15][level - 1];
                 let newDice, newHand, messageSuffix = "";
                 if (Math.random() < pinzoroChance) {
                     newDice = [1, 1, 1];
                     newHand = { ...ROLES.PINZORO, type: '役', value: 1 };
                     messageSuffix = "ピンゾロに変化！";
                 } else {
                     let possibleValues = [2, 3, 4, 5, 6].filter(v => v !== currentArashiValue);
                     const randomNewValue = possibleValues[Math.floor(Math.random() * possibleValues.length)];
                     newDice = [randomNewValue, randomNewValue, randomNewValue];
                     newHand = { ...ROLES.ARASHI, type: '役', value: randomNewValue };
                     messageSuffix = `${randomNewValue}のアラシに変化！`;
                 }
                 playerDice = newDice;
                 playerHand = newHand;
                 useConsumed = true;
                 requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
                 postUseMessage = `ストームルーレット！ ${messageSuffix}`;
                 // UI更新
                 if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                 diceDisplayEl.textContent = playerDice.join(' ');
                 if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                 highlightHand(playerHandEl, playerHand);
             } else {
                 postUseMessage = "このカードは「アラシ」の時しか使用できません。";
                 useConsumed = false;
              }
        }
        else if (cardId === 'destinyShift') {
            const level = playerCardData.level;
            const currentHandName = getHandDisplayName(playerHand);
            // ユーザー選択の前に activeCardBeingUsed を null にしない
            setMessage(`運命改変 Lv.${level}！ 現在の結果「${currentHandName}」を振り直しますか？ (残${getRemainingUses(cardId)}回)`, 'yesNo');
            const choice = await waitForUserChoice(); // ユーザーの選択を待つ

            if (choice) {
                setMessage("運命を書き換えています...");
                useConsumed = true; // ここで消費確定
                const { dice: newDice, hand: newHand } = await rerollWithGuarantee(level, playerDice);
                playerDice = newDice;
                playerHand = newHand;
                postUseMessage = `運命改変！ 結果は「${getHandDisplayName(playerHand)}」になりました！`;
                // UI更新
                if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
                diceDisplayEl.textContent = playerDice.join(' ');
                if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
                highlightHand(playerHandEl, playerHand);
                requiresPlayerActionAfterCard = true; // 変更: 再度アクション判断へ
                // 使用回数カウントは後続の共通処理で行う
            } else {
                postUseMessage = "運命改変の使用をキャンセルしました。";
                useConsumed = false;
                requiresPlayerActionAfterCard = true; // キャンセルしても後続処理へ
            }
            activeCardBeingUsed = null;
        }
        else if (cardId === 'trueBlinding') {
            const isPlayerInitialRollPhaseNow = isGameActive && isPlayerTurn && playerRollCount === 0; 

            if (!isPlayerInitialRollPhaseNow) { 
                postUseMessage = "このカードは自分の最初のロール前にのみ使用できます。";
                useConsumed = false;
                playSound('error');
                activeCardBeingUsed = null;
            } else {
                trueBlindingActive = true;
                trueBlindingLevel = playerCardData.level;
                useConsumed = true; 
                requiresRoll = true;
                requiresDelay = false;
                postUseMessage = `目くらまし Lv.${trueBlindingLevel} 発動！ このラウンド中、相手の良い役が出にくくなります。サイコロを振ってください。`;
                console.log(`True Blinding Lv.${trueBlindingLevel} activated for this round.`);
            }            
        }
        else if (cardId === 'retryRoll') {
            const card = allCards.find(c => c.id === cardId); 
            const cardLevel = playerCardData.level;
            const costRate = 0.10; // 持ち点の10%
            const minCost = 1;   // 最低コスト
            const cost = Math.max(minCost, Math.floor(playerScore * costRate));

            // 使用条件チェック (役/目が確定しているか)
            if (!(playerHand?.type === '役' || playerHand?.type === '目')) {
                 postUseMessage = "このカードは役または目が確定した時にしか使用できません。";
                 useConsumed = false;
                 playSound('error');
                 activeCardBeingUsed = null; // フラグ解除
            } else if (playerScore < cost) {
                 postUseMessage = `再起の一投のコスト(${cost}点)を払えません！`;
                 useConsumed = false;
                 playSound('error');
                 activeCardBeingUsed = null; // フラグ解除
                } else {
                    // コスト支払い
                    playerScore -= cost;
                    useConsumed = true;
                    // 効果適用: 目なしにしてロール回数をリセット
                    playerHand = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name };
                    playerRollCount = 0;
                    stormWarningRerollsLeft = 0;
                    postUseMessage = `再起の一投！${cost}点消費！ 結果を目なしに戻し、振り直し回数をリセットしました。再度振ってください。`;
                    requiresRoll = true; // ロール要求
   
                    // UI更新
                    updateUI();
                    highlightHand(playerHandEl, playerHand);
                    if(playerDiceEl) playerDiceEl.textContent = '-';
                    diceDisplayEl.textContent = '- - -';

                    isGameActive = true; // ゲームをアクティブ状態に
                    isPlayerTurn = true; // プレイヤーのターンであることを確認
                    waitingForPlayerActionAfterRoll = false; // アクション待ちは解除
               }
           }
        else { console.warn(`Active card effect for ${cardId} is not fully implemented yet.`); postUseMessage = `カード「${card.name}」の効果処理が未実装です。`; useConsumed = false; }

        // --- 処理分岐前の共通処理 ---
        if (useConsumed && card.usesPerWave) {
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            const remainingUses = getRemainingUses(cardId);
            if (postUseMessage) {
                 postUseMessage += ` (残${remainingUses}/${getTotalUses(cardId)})`;
            }
            console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`);
            // 使用したカードIDを記録 
            if (!activeCardsUsedThisRound.includes(cardId)) { // 同じラウンドで複数回使っても1回だけ記録する場合
                 activeCardsUsedThisRound.push(cardId);
                 console.log("Added to activeCardsUsedThisRound:", cardId);
            }
        }

        if (!waitingForUserChoice && postUseMessage) {
             setMessage(postUseMessage);
        }
        if (requiresDelay) await new Promise(resolve => setTimeout(resolve, 800));

        // activeCardBeingUsed の解除 (共通処理部分)
        if (!['changeToOne', 'changeToSix', 'adjustEye', 'menashiAdjust'].includes(cardId) && activeCardBeingUsed === cardId) {
            activeCardBeingUsed = null;
            console.log(`Reset activeCardBeingUsed for ${cardId} in common cleanup.`);
        }

        // --- 後続処理分岐 ---
        if (requiresPlayerActionAfterCard) {
             await handlePostRollPlayerAction();
        } else if (requiresRoll) {
             rollButton.disabled = false;
             historyButton.disabled = false;
             isPlayerTurn = true;
             console.log("Card requires roll. Enabling roll button.");
        } else if (!useConsumed) {
             historyButton.disabled = false;
             if (waitingForPlayerActionAfterRoll) {
                 if (activeCardBeingUsed === cardId) activeCardBeingUsed = null;
                 setMessageAfterActionCancel(card.name + "は使用できませんでした");
             } else if (!isGameActive && isPlayerParent) {
                  updateBetLimits();
             }
        } else {
             historyButton.disabled = false;
             if (!isGameActive && isPlayerParent) {
                 updateBetLimits();
             }
        }

        if (activeCardBeingUsed === cardId &&
            (!diceChoiceOverlay || !diceChoiceOverlay.style.display || diceChoiceOverlay.style.display === 'none')
           ) {
             console.warn(`Final check: Resetting activeCardBeingUsed for ${cardId} at the end of the function.`);
             activeCardBeingUsed = null;
        }

       updateUI();
       updateCardButtonHighlight();
    } // handleActiveCardUse 関数の終わり

    rollButton.addEventListener('click', async () => {
        // --- (早期リターン条件に soulRollUsedThisTurn を追加) ---
        const canBypassChecksForSoulRoll = soulRollUsedThisTurn; // 魂の一振りが使われた直後か？

        if (!canBypassChecksForSoulRoll && (playerScore <= 0 || !isGameActive || !isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult)) {
            // 魂の一振り直後でなければ、通常のチェックを行う
            console.log("Roll button clicked, but conditions not met or Soul Roll not active.");
            checkGameEnd(); // ゲーム終了条件をチェック
            return; // 条件を満たさない場合はリターン
        }

        // ロール可能かどうかの判定 
        const isNormalRollAvailable = playerRollCount < currentMaxRolls;
        const isStormWarningRollAvailable = stormWarningRerollsLeft > 0;
        // const isSoulRollAvailable = soulRollUsedThisTurn; // この変数は canBypassChecksForSoulRoll で代用可能
        const canRoll = isNormalRollAvailable || isStormWarningRollAvailable || canBypassChecksForSoulRoll;

        // --- 魂の一振り使用直後ではないのにロールできない場合 (安全策) ---
        if (!canRoll && !canBypassChecksForSoulRoll) {
            playSound('error');
            setMessage("振り残り回数がありません。");
            console.warn("Roll button clicked, but canRoll is false and not bypassing for Soul Roll.");
            return;
        }

        playSound('diceRollButton'); // ロールボタン SE

        let isFreeRoll = false;

        // ロール回数の消費/フラグリセット
        if (canBypassChecksForSoulRoll) { // 魂の一振りによるロールの場合
            soulRollUsedThisTurn = false; // フラグをここでリセット
            console.log("Using Soul Roll additional roll.");
            // コストはカード使用時に消費済み
        } else if (isStormWarningRollAvailable) {
            stormWarningRerollsLeft--;
            isFreeRoll = true;
            console.log("Using Storm Warning free reroll.");
        } else {
            // 通常のロール
            playerRollCount++;
        }

        playSound('diceRoll'); // ダイスロール SE
        rollButton.disabled = true;
        historyButton.disabled = true;
        const playerNameDisp = playerName || selectedCharacter?.name || 'あなた';
        setMessage(`${playerNameDisp}(${isPlayerParent ? '親' : '子'}): 振っています...`);
        showDiceRollModal();
        updateUI(); // UI更新

        const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const soulRollLvFor判定 = soulRollCard ? soulRollCard.level : 0;

        const finalDice = rollDice(false, 0, soulRollLvFor判定);

        animateDiceRoll(finalDice, async () => {
            playerDice = finalDice;
            if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
            hideDiceRollModal();
            diceDisplayEl.textContent = finalDice.join(' ');

            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定);
            const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
            playerHand = rk ? { ...ROLES[rk], ...result } : result;

            console.log("Player Rolled:", playerDice, "Hand:", playerHand);
            updateUI();
            highlightHand(playerHandEl, playerHand);

            // 嵐の予感の無料ロール判定 
            let stormWarningAppliedThisRoll = false;
            const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
            if (stormWarningActive && stormCardCheck) {
                const stormLevelCheck = stormCardCheck.level;
                const targetRoles = (stormLevelCheck >= 3) ? [ROLES.ARASHI.name, ROLES.PINZORO.name] : [ROLES.ARASHI.name];
                if (!(playerHand.type === '役' && targetRoles.includes(playerHand.name))) {
                    stormWarningRerollsLeft = (stormLevelCheck >= 2) ? 2 : 1;
                    stormWarningAppliedThisRoll = true;
                    console.log(`Card Effect: 嵐の予感発動！ Target role not hit. ${stormWarningRerollsLeft} free rerolls available.`);
                    setMessage(`${playerNameDisp}(${isPlayerParent ? '親' : '子'}): 嵐の予感効果！ アラシ/ピンゾロが出なかったので無料振り直しが ${stormWarningRerollsLeft} 回可能です。再度振ってください。`);
                    rollButton.disabled = false;
                    historyButton.disabled = false;
                    updateCardButtonHighlight();
                    stormWarningActive = false;
                    return; // 無料ロール発生時は処理中断
                } else {
                    console.log(`Card Effect: 嵐の予感 - Target role ${playerHand.name} hit! No free reroll.`);
                    stormWarningActive = false;
                }
            }

            await handlePostRollPlayerAction(); // ロール後の処理へ
        });
    });

    function checkCardUsability(cardId) {
        const cardData = playerCards.find(c => c.id === cardId);
        const card = allCards.find(c => c.id === cardId);
        if (!cardData || !card || !card.usesPerWave) return false; // パッシブは対象外

        const remainingUses = getRemainingUses(cardId);
        if (remainingUses <= 0) return false; // 使用回数切れ

        // 他のアクション実行中やモーダル表示中は使用不可
        if (activeCardBeingUsed || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return false;

        // 現在のフェーズを判定
        const isPlayerInitialRollPhase = isGameActive && isPlayerTurn && playerRollCount === 0;
        const isBetPhase = !isGameActive && isPlayerParent; 

        switch (card.id) {
            case 'ignoreMinBet':
                return isBetPhase && !ignoreMinBetActive;
            case 'riskyBet':
                return isBetPhase && !riskyBetActive;
            case 'zoroChanceUp':
                return isPlayerInitialRollPhase && !zoroChanceUpActive;
            case 'avoid123_456':
                return isPlayerInitialRollPhase && !avoid123_456Active;
            case 'blessingDice':
                return isPlayerInitialRollPhase && !blessingDiceActive;
            case 'stormWarning':
                return isPlayerInitialRollPhase && !stormWarningActive;
            case 'trueBlinding': 
                return isPlayerInitialRollPhase && !trueBlindingActive; 
            // 他の「ロール前」に使用するカードがあればここに追加
            default:
                // ロール後や他のタイミングで使用するカードはここでは false
                return false;
        }
    }
    function getRemainingUses(cardId) { 
         const cardData = playerCards.find(c => c.id === cardId);
         const card = allCards.find(c => c.id === cardId);
         if (!cardData || !card || !card.usesPerWave) return Infinity; // パッシブや定義なしは無限
         const totalUses = getTotalUses(cardId);
         return totalUses - (activeCardUses[cardId] || 0);
    }
    function showDiceChoiceOverlay(cardId) { 
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
        } else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) { 
            if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; setMessageAfterActionCancel(card.name); return; }
            instruction = `変更する「${playerHand.value}の目」を選んでください`;
             playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); });
        }else if (cardId === 'adjustEyeValue') { 
            if (playerHand?.type !== '目') {
                setMessage("「目」が出ていないため使用できません。");
                hideDiceChoiceOverlay();
                activeCardBeingUsed = null;
                setMessageAfterActionCancel(card.name);
                return;
            }
            instruction = `調整する「${playerHand.value}の目」を選んでください`;
            // 「目」の値を持つダイスのインデックスのみを選択対象とする
            playerDice.forEach((diceValue, index) => {
                if (diceValue === playerHand.value) {
                    diceIndicesToSelect.push(index);
                }
            });
            if (diceIndicesToSelect.length > 0) {
                requiresAdjustChoice = true; // 調整方向を選択させるフラグ
            }     
        }else if (cardId === 'menashiAdjust') { 
            if (playerHand?.type !== '目なし') {
                 setMessage("「目なし」でないため使用できません。");
                 hideDiceChoiceOverlay();
                 activeCardBeingUsed = null;
                 setMessageAfterActionCancel(card.name);
                 return;
             }
            instruction = "調整するサイコロを選んでください";
            diceIndicesToSelect = [0, 1, 2]; 
            requiresAdjustChoice = true;    
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
                    // cardId によって showAdjustOptions の挙動が変わる可能性があるため、
                    // cardId も渡すか、showAdjustOptions 側で activeCardBeingUsed を参照する
                    button.onclick = () => { playSound('click'); showAdjustOptions(index); }; // showAdjustOptions を呼び出す
                } else {
                    button.onclick = handleDiceChoice;
                }
                buttonContainer.appendChild(button);
            });
        }
        const cancelButton = document.createElement('button');
        cancelButton.className = 'button-subtle';
        cancelButton.textContent = 'キャンセル';
        cancelButton.style.marginTop = '15px';
        cancelButton.onclick = () => { playSound('click'); hideDiceChoiceOverlay(); }; // SE追加
        buttonContainer.appendChild(cancelButton);
        diceChoiceOverlay.appendChild(buttonContainer);
        diceChoiceOverlay.style.display = 'flex';
        rollButton.disabled = true;
        historyButton.disabled = true;
        activeCardBeingUsed = cardId;
    }
    function showAdjustOptions(diceIndex) {
        const cardId = activeCardBeingUsed;
        const playerCardData = playerCards.find(c => c.id === cardId);
        const adjustAmount = 1; // 常に±1
        const originalValue = playerDice[diceIndex];

        if (!playerCardData) {
            console.error("showAdjustOptions: playerCardData not found for", cardId);
            hideDiceChoiceOverlay();
            return;
        }
        if (isNaN(originalValue)) {
             console.error("showAdjustOptions: Invalid original dice value at index", diceIndex);
             hideDiceChoiceOverlay();
             return;
        }


        diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？ (±${adjustAmount})</p>`;
        const buttonContainer = document.createElement('div');
        buttonContainer.className = 'dice-choice-buttons';

        // プラス調整ボタン
        if (originalValue + adjustAmount <= 6) {
            const plusButton = document.createElement('button');
            plusButton.className = 'dice-choice-button button-pop';
            plusButton.textContent = `+${adjustAmount} (→ ${originalValue + adjustAmount})`;
            plusButton.dataset.diceIndex = diceIndex;
            plusButton.dataset.adjustDir = 'plus';
            plusButton.onclick = handleDiceChoice; // handleDiceChoice 内でSE
            buttonContainer.appendChild(plusButton);
        }

        // マイナス調整ボタン
        if (originalValue - adjustAmount >= 1) {
            const minusButton = document.createElement('button');
            minusButton.className = 'dice-choice-button button-pop';
            minusButton.textContent = `-${adjustAmount} (→ ${originalValue - adjustAmount})`;
            minusButton.dataset.diceIndex = diceIndex;
            minusButton.dataset.adjustDir = 'minus';
            minusButton.onclick = handleDiceChoice; // handleDiceChoice 内でSE
            buttonContainer.appendChild(minusButton);
        }

        // 調整不可の場合のメッセージ
        if (buttonContainer.children.length === 0) {
            buttonContainer.innerHTML = "<p>この目は調整できません。</p>";
        }

        // キャンセルボタン
        const cancelButton = document.createElement('button');
        cancelButton.className = 'button-subtle';
        cancelButton.textContent = 'キャンセル';
        cancelButton.style.marginTop = '15px';
        cancelButton.onclick = () => { playSound('click'); hideDiceChoiceOverlay(); };
        buttonContainer.appendChild(cancelButton);

        diceChoiceOverlay.appendChild(buttonContainer);
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

// === 新規関数: 回避保証付き再ロール ===
async function rerollWithGuarantee(level, currentDice) {
    console.log(`Rerolling with guarantee (Level ${level})...`);
    let newDice;
    let newHand;
    let attempts = 0;
    const maxAttempts = 20; // 無限ループ防止

    const isAvoidTarget = (hand, lvl) => {
        if (!hand) return true; // 手がない場合は回避対象としてやり直し
        const isHifumi = hand.name === ROLES.HIFUMI.name;
        const isShigoro = hand.name === ROLES.SHIGORO.name;
        const isMenashi = hand.type === '目なし';
        return isHifumi || isShigoro || (lvl >= 3 && isMenashi);
    };

    do {
        // 通常のロールを実行 (現時点でのカード効果は考慮しない？ それとも考慮すべき？)
        // → シンプルにするため、ここでは通常の rollDice を呼ぶ
        newDice = rollDice(false, 0, 0); // プレイヤーの通常のロールとして
        newHand = getHandResult(newDice, false, 0, 0); // 結果判定
        attempts++;
        if (attempts > 1) {
            console.log(` -> Reroll attempt ${attempts}: ${newDice.join(',')} (${getHandDisplayName(newHand)}) - Target Avoided: ${!isAvoidTarget(newHand, level)}`);
            await new Promise(res => setTimeout(res, 50)); // 念のため短い待機
        }
    } while (isAvoidTarget(newHand, level) && attempts < maxAttempts); // 回避対象である限り、または上限まで繰り返す

    if (attempts >= maxAttempts) {
        console.warn("rerollWithGuarantee: Max attempts reached! Returning last result.");
        // この場合、回避対象の役が返る可能性がある
    }

    console.log(`Guaranteed reroll finished after ${attempts} attempts. Final dice: ${newDice.join(',')}, Hand: ${getHandDisplayName(newHand)}`);
    return { dice: newDice, hand: newHand };
}

    function setMessageAfterActionCancel(cancelledCardName = "") { 
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
    async function handleDiceChoice(event) {
        playSound('click');
        const button = event.target;
        const diceIndex = parseInt(button.dataset.diceIndex);
        const adjustDir = button.dataset.adjustDir;
        const cardId = activeCardBeingUsed; 
        const playerCardData = playerCards.find(c => c.id === cardId);

        if (isNaN(diceIndex) || !cardId || !playerCardData || !playerDice || playerDice.length !== 3 || isShowingRoleResult || isShowingGameResult) {
            console.error("Invalid state for dice choice:", diceIndex, cardId, playerDice, isShowingRoleResult, isShowingGameResult);
            hideDiceChoiceOverlay(); // オーバーレイを隠し、中で activeCardBeingUsed = null にする
            if(waitingForPlayerActionAfterRoll){
                setMessageAfterActionCancel("ダイス選択がキャンセルされました");
            }
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
            const adjustAmount = (playerCardData.level >= 3) ? 1 : 1; // ★ Lv3でも±1に変更
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
        } else if (['changeEyeToOne', 'changeEyeToSix'].includes(cardId)) {
            console.error(`handleDiceChoice called unexpectedly for ${cardId}`);
            hideDiceChoiceOverlay();
            return;
        }else if (cardId === 'adjustEyeValue' && adjustDir) { 
            const adjustAmount = 1; 
            let originalValue = newDice[diceIndex];
            let adjustedValue = originalValue;
            if (adjustDir === 'plus') { adjustedValue = Math.min(6, originalValue + adjustAmount); }
            else if (adjustDir === 'minus') { adjustedValue = Math.max(1, originalValue - adjustAmount); }

            if (adjustedValue !== originalValue) {
                newDice[diceIndex] = adjustedValue;
                message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
            } else {
                message = "調整しても値が変わりませんでした。";
                useConsumed = false;
            }           
        } else if (cardId === 'menashiAdjust' && adjustDir) { 
            const adjustAmount = 1; 
            let originalValue = newDice[diceIndex];
            let adjustedValue = originalValue;
            if (adjustDir === 'plus') { adjustedValue = Math.min(6, originalValue + adjustAmount); }
            else if (adjustDir === 'minus') { adjustedValue = Math.max(1, originalValue - adjustAmount); }
            if (adjustedValue !== originalValue) {
                newDice[diceIndex] = adjustedValue;
                message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`;
            } else {
                message = "調整しても値が変わりませんでした。";
                useConsumed = false;
            }
        }
         else {
            console.error("Unhandled card type in handleDiceChoice:", cardId);
            hideDiceChoiceOverlay();
            return;
        }

        hideDiceChoiceOverlay(); // ダイス選択オーバーレイを隠す (activeCardBeingUsed = null になる)

        if (!useConsumed) {
             playSound('error');
             setMessage(message);
             // 効果がなかった場合でも、後続のアクション判断は必要
             if(waitingForPlayerActionAfterRoll){
                 setMessageAfterActionCancel(card.name + "の効果はありませんでした"); // メッセージ更新
             }
             return;
        }

        // 使用したカードIDを記録 
        if (card.usesPerWave) { // usesPerWaveを持つカードのみ記録
            if (!activeCardsUsedThisRound.includes(cardId)) {
                 activeCardsUsedThisRound.push(cardId);
                 console.log("Added to activeCardsUsedThisRound (from dice choice):", cardId);
            }
       }

        // ダイスと手札を更新
        playerDice = newDice;
        if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' ');
        diceDisplayEl.textContent = playerDice.join(' ');
        const result = getHandResult(playerDice, false, 0, 0);
        const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目'));
        playerHand = rk ? { ...ROLES[rk], ...result } : result;
        console.log("Re-evaluated hand after dice choice:", playerHand);
        if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand);
        highlightHand(playerHandEl, playerHand);

        // 使用回数カウントをここに追加 
        if (card.usesPerWave) {
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            const remainingUses = getRemainingUses(cardId);
            message += ` (残${remainingUses}/${getTotalUses(cardId)})`;
            console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`);
        }

        setMessage(message);
        await new Promise(resolve => setTimeout(resolve, 500));
        await handlePostRollPlayerAction(); // 再度、カード使用や進行の判断を行う
    }
     function getTotalUses(cardIdentifier) { 
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
                    totalUses = (level === 1) ? 1 : (level === 2 ? 2 : 3); 
                    break;
            case 'avoid123_456':
                totalUses = level; 
                break;
            case 'drawBonus':
                totalUses = (level >= 3) ? 3 : (level === 2 ? 2 : 1);
                break;
            case 'rewardAmplifier':
            case 'riskyBet':
            totalUses = level; 
            break;
            case 'zoroChanceUp':
            case 'blessingDice':
            case 'nextChance':
            totalUses = level; 
            break;
            case 'menashiAdjust': 
                totalUses = level; 
                break;
            case 'stormRoulette':
            totalUses = level; 
            break;
            case 'stormWarning':
            case 'destinyShift':
            totalUses = level; 
            break;
            case 'soulRoll':
            case 'doubleUpBet':
            case 'blindingDice':
                totalUses = 1;
                break;
            case 'trueBlinding': 
                totalUses = level; 
                break;    
            default:
                totalUses = card.usesPerWave || 1;
                console.warn(`Card ${cardId} usesPerWave might not be explicitly handled by level. Using base value: ${totalUses}`);
                break;
            case 'adjustEyeValue': 
                totalUses = level; 
                break;    
            case 'retryRoll':
                totalUses = level; 
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

        // 修正: activeCardBeingUsed のチェックを除外 (自分自身はチェックしないように)
        // if (activeCardBeingUsed && activeCardBeingUsed !== cardId) return false;
        // isShowingRoleResult, isShowingGameResult はチェック継続
        if(isShowingRoleResult || isShowingGameResult) return false;


        const isPlayerPostRollMenashi = playerHand?.type === '目なし';
        const isPlayerPostRollEye = playerHand?.type === '目';
        const isPlayerPostRollYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目';
        const isPlayerPostRollArashi = playerHand?.name === ROLES.ARASHI.name;
        const isPlayerPostRollHifumi = playerHand?.name === ROLES.HIFUMI.name;
        const isPlayerPostRollShigoro = playerHand?.name === ROLES.SHIGORO.name;
        const isOutOfRolls = playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0;

          switch (card.id) {
            // --- 目なし時に使用可能 ---
            case 'changeToOne':
            case 'changeToSix':
                return isPlayerPostRollMenashi;
            case 'giveUpEye':
                 return isPlayerPostRollMenashi && !giveUpEyeUsedThisTurn;
            case 'menashiAdjust':
                // 修正: adjustEyeUsedThisTurn をチェックしない (別のカードの効果なので)
                return isPlayerPostRollMenashi;

            // --- 目が出た時に使用可能 ---
            case 'adjustEye':
                 return isPlayerPostRollEye && !adjustEyeUsedThisTurn;
            case 'nextChance':
                return isPlayerPostRollEye && !nextChanceUsedThisTurn;
            case 'changeEyeToOne':
            case 'changeEyeToSix':
                return isPlayerPostRollEye;
            case 'adjustEyeValue': 
                return isPlayerPostRollEye;    

            // --- 特定の役/目で使用可能 ---
            case 'stormRoulette':
                return isPlayerPostRollArashi;

            // --- 役/目一般 または 特定の役/状態で使用可能 (最終決定前系) ---
            case 'doubleUpBet':
                // 修正: フラグチェックは handleActiveCardUse 内で行う方が確実かもしれない
                return isPlayerPostRollYakuOrEye && !isPlayerParent; // && !doubleUpBetActive;
            case 'blindingDice': // または 'shinkirou'
                 return isPlayerPostRollYakuOrEye && isPlayerParent; // && !blindingDiceActive;
            case 'rewardAmplifier':
                 return isPlayerPostRollYakuOrEye; // && !rewardAmplifierActive;
            case 'drawBonus':
                 return isPlayerPostRollYakuOrEye && playerHand?.type !== '目なし'; // && !drawBonusActive;
            case 'destinyShift':
                 const level = cardData.level;
                 const isTargetRole = isPlayerPostRollHifumi || isPlayerPostRollShigoro || (level >= 3 && isPlayerPostRollMenashi);
                 return isTargetRole;
            case 'retryRoll':
                    // 役または目が確定しており、ションベン・目なしではない場合に使用可能
                    const handDetermined = playerHand?.type === '役' || playerHand?.type === '目';
                    return handDetermined;     

            // --- 振り直し回数0で使用可能 ---
            case 'soulRoll':
                 return isOutOfRolls && isPlayerPostRollMenashi && !soulRollUsedThisTurn;
            default:
                return false;
        }
    } // checkCardUsabilityInPostRoll 関数の終わり

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