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
    const handCardsEl = document.getElementById('hand-cards'); // ★ ID修正
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
    const cardActionModalContent = cardActionModal.querySelector('.card-action-modal-content'); // モーダルの中身を取得
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
        // { id: 'char14', name: 'キャラクター14', image: './Character Image/Character14.png', initialCardId: null, initialCardPool: ['lossInsurance'] },
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
    let waitingForPlayerActionAfterRoll = false; // ★ ロール後のカード/スキップ待ちフラグ

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
                updateShopUI(); // ショップ表示時にUIを更新
            }
        } else {
            console.error("Screen not found:", screenId);
        }
    }

    function getHandDisplayName(hand) { if (!hand) return '-'; if (hand.type === '役') return hand.name; if (hand.type === '目') return `目 (${hand.value})`; if (hand.type === 'ションベン') return 'ションベン'; if (hand.type === '目なし') return '目なし'; return '-'; }

     function updateRoleRatesDisplay() {
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
                case 'shonbenHalf': reductionShonben = 0.5; break;
            }
        });
        ratePinzoroEl.textContent = baseRatePinzoro;
        rateArashiEl.textContent = baseRateArashi + bonusArashi;
        rateShigoroEl.textContent = baseRateShigoro + bonusShigoro;
        rateEye1El.textContent = baseRateEye + bonusEye1;
        rateEye6El.textContent = baseRateEye + bonusEye6;
        rateHifumiEl.textContent = Math.max(0, baseRateHifumi - reductionHifumi);
        rateShonbenEl.textContent = Math.max(0, baseRateShonben - reductionShonben);
        console.log("Updated role rates display based on current cards.");
    }

    // === setMessage 関数の修正 ===
    function setMessage(msg, buttonType = 'none') {
        messageEl.textContent = msg;
        messageButtonContainer.innerHTML = ''; // ボタンクリア

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
            skipButton.onclick = handleSkipAction; // ★ 既存の関数呼び出し
            messageButtonContainer.appendChild(skipButton);

            // 「カード」ボタン
            const cardButton = document.createElement('button');
            cardButton.id = 'post-roll-card-button';
            cardButton.textContent = 'カード';
            cardButton.className = 'button-pop card-button'; // ★ button-pop に変更
            cardButton.onclick = openCardActionModal; // カードモーダルを開く
            messageButtonContainer.appendChild(cardButton);
            // ハイライト状態を更新
            updateCardButtonHighlight(); // ★ ハイライト更新を呼ぶ
        }
    }

    function waitForUserChoice() { return new Promise(resolve => { waitingForUserChoice = true; userChoiceResolver = resolve; }); }
    function handleUserChoice(choice) { if (!waitingForUserChoice || !userChoiceResolver) return; waitingForUserChoice = false; const resolver = userChoiceResolver; userChoiceResolver = null; messageButtonContainer.innerHTML = ''; resolver(choice); }
    function waitForShopConfirmation() { return new Promise(resolve => { shopConfirmationResolver = resolve; }); }
    function handleShopConfirmation(choice) { if (shopConfirmationResolver) { const resolver = shopConfirmationResolver; shopConfirmationResolver = null; const confirmationButtons = document.getElementById('shop-confirmation-buttons'); if (confirmationButtons) confirmationButtons.remove(); if(shopActionsEl) shopActionsEl.style.display = 'flex'; resolver(choice); } }

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
        } return dice;
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
        if (!isNpc && avoid123_456Active) { const avoidCard = playerCards.find(c => c.id === 'avoid123_456'); const avoidLevel = avoidCard?.level || 1; const isHifumi = result.name === ROLES.HIFUMI.name; const isShigoro = result.name === ROLES.SHIGORO.name; const isMenashi = result.type === '目なし'; let needsReroll = false; let reason = ""; if (isHifumi || isShigoro) { needsReroll = true; reason = `${result.name} 回避`; } else if (avoidLevel >= 3 && isMenashi) { needsReroll = true; reason = "目なし 回避 (Lv3)"; } if (needsReroll) { console.log(`Card Effect: 役回避 Lv.${avoidLevel} 発動! (${reason})`); let rerollDice; let rerollResult; let attempts = 0; const maxAttempts = 10; do { rerollDice = rollDice(isNpc, 0, 0); rerollResult = getHandResult(rerollDice, isNpc, 0, 0); attempts++; } while ( attempts < maxAttempts && (rerollResult.name === ROLES.HIFUMI.name || rerollResult.name === ROLES.SHIGORO.name || (avoidLevel >= 3 && rerollResult.type === '目なし') || rerollResult.type === 'ションベン') ); if (attempts >= maxAttempts) { console.warn("役回避: 再ロール上限到達。最終結果を採用。"); } console.log(` -> 再ロール結果: ${rerollDice.join(',')} (${getHandDisplayName(rerollResult)})`); result = rerollResult; } }
        if (isNpc && blindingDiceLevel > 0) { let specialRoleAvoided = false; const specialRolesToAvoid = [ROLES.PINZORO.name, ROLES.ARASHI.name, ROLES.SHIGORO.name, ROLES.HIFUMI.name]; if (result.type === '役' && specialRolesToAvoid.includes(result.name)) { const avoidChance = [0.2, 0.4, 0.6][blindingDiceLevel - 1]; if (Math.random() < avoidChance) { console.log(`%cCard Effect: 目くらまし Lv.${blindingDiceLevel} 発動! NPCの特殊役「${result.name}」を回避 -> 目なしに変更`, 'color: orange; font-weight: bold;'); result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; specialRoleAvoided = true; } else { console.log(`Card Effect: 目くらまし Lv.${blindingDiceLevel} - NPCの特殊役「${result.name}」回避失敗 (確率 ${avoidChance * 100}%)`); } } if (!specialRoleAvoided && blindingDiceLevel >= 3 && result.type !== 'ションベン' && result.type !== '目なし') { const shonbenUpChance = 0.2; if (Math.random() < shonbenUpChance) { console.log(`%cCard Effect: 目くらまし Lv.3 - ションベン率UP発動! NPCの結果「${getHandDisplayName(result)}」を目なしに変更`, 'color: orange; font-weight: bold;'); result = { type: '目なし', strength: ROLES.MENASHI.strength, name: ROLES.MENASHI.name }; } else { console.log(`Card Effect: 目くらまし Lv.3 - ションベン率UP失敗 (確率 ${shonbenUpChance * 100}%)`); } } }
        console.log(`%cFinal Hand Result (${isNpc ? 'NPC' : 'Player'}): ${getHandDisplayName(result)}`, 'font-weight: bold;'); return result;
    }

    function applyPlayerCardEffects() { currentMaxRolls = BASE_MAX_ROLLS; playerCards.forEach(cardData => { const cardDefinition = allCards.find(c => c.id === cardData.id); if (cardDefinition?.applyEffect) { cardDefinition.applyEffect(cardData.level); } }); console.log("Applied passive card effects. Current Max Rolls:", currentMaxRolls); }
    function removePlayerCardEffect(cardIdToRemove) { const cardToRemove = playerCards.find(card => card.id === cardIdToRemove); if (!cardToRemove) return; const cardDefinition = allCards.find(c => c.id === cardToRemove.id); if (cardDefinition?.removeEffect) { cardDefinition.removeEffect(cardToRemove.level); } if (cardIdToRemove === 'handExchange') { freeRerollsAvailableThisShopVisit = 0; activeCardUses['handExchangeFreeRerollCount'] = 0; console.log("Hand Exchange card removed, resetting free rerolls."); } playerCards = playerCards.filter(card => card.id !== cardIdToRemove); applyPlayerCardEffects(); console.log(`Removed card: ${cardIdToRemove}`); }
    function getCostToUpgradeToNextLevel(cardData, nextLevel) { if (!cardData || nextLevel <= 1 || nextLevel > MAX_CARD_LEVEL) { return 0; } const baseCardDef = allCards.find(c => c.id === (cardData.id || cardData)); if (!baseCardDef) return 0; const baseCost = baseCardDef.cost; const cost = Math.floor(baseCost * Math.pow(UPGRADE_COST_MULTIPLIER, nextLevel - 1)); return Math.max(10, cost); }
    function calculateSellPrice(cardData) { const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef) return 0; let totalPaidCost = cardDef.cost; for (let lv = 2; lv <= cardData.level; lv++) { totalPaidCost += getCostToUpgradeToNextLevel(cardDef, lv); } const sellPrice = Math.floor(totalPaidCost * SELL_PRICE_RATE); return Math.max(0, sellPrice); }

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
        if (waveInfoEl) { const maxWaveDisplay = gameMode === 'endless' ? '∞' : MAX_WAVES; const modeText = gameMode === 'normal' ? '通常' : gameMode === 'endless' ? 'エンドレス' : '準備中'; waveInfoEl.innerHTML = ` <span>MODE: <span class="mode-display">${modeText}</span></span> | <span>WAVE: <span id="wave-number" class="wave-highlight">${currentWave}</span>/${maxWaveDisplay}</span> | <span>ROUND: <span id="round-number" class="round-normal">${currentRoundInWave}</span></span> | <span>撃破数: <span id="defeated-count">${defeatedCount}</span></span> <span id="consecutive-wins-display" style="display: none;"></span> `; const consWinsDisplay = document.getElementById('consecutive-wins-display'); if (consWinsDisplay) { consWinsDisplay.classList.remove('npc-losing-streak'); if (isPlayerParent && consecutiveWins > 1) { consWinsDisplay.textContent = ` (${consecutiveWins}連勝中!)`; consWinsDisplay.style.display = 'inline'; } else if (!isPlayerParent && npcConsecutiveWins > 1) { consWinsDisplay.textContent = ` (相手${npcConsecutiveWins}連勝中...)`; consWinsDisplay.classList.add('npc-losing-streak'); consWinsDisplay.style.display = 'inline'; } else { consWinsDisplay.textContent = ''; consWinsDisplay.style.display = 'none'; } } }
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
        if (shopHandCountEl) { // 要素存在チェック
            shopHandCountEl.textContent = `${totalCards}/${maxTotalCards}`;
        } else {
            console.error("Element #hand-count not found!");
        }

        if (handCardsEl) { // ★ 要素存在チェック & 変数名修正
            handCardsEl.innerHTML = ''; // ★ 変数名修正
            playerCards.forEach(cardData => {
                const cardDefinition = allCards.find(c => c.id === cardData.id);
                if (cardDefinition) {
                    const cardItem = document.createElement('li');
                    cardItem.className = 'hand-card-item';
                    const cardNameSpan = document.createElement('span');
                    const isCardActive = !!cardDefinition.usesPerWave;
                    const cardTypeInitial = isCardActive ? 'A' : 'P';
                    cardNameSpan.textContent = `[${cardTypeInitial}] ${cardDefinition.name} [Lv.${cardData.level}]`;
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
                    handCardsEl.appendChild(cardItem); // ★ 変数名修正
                }
            });
        } else {
             console.error("Element #hand-cards not found!"); // ★ ID変更
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
        case 'changeToOne': conditionText = "自分のロール後 (アクティブ)"; const changeOneUses = level; effectText = `WAVE中 ${changeOneUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「1」に変更できる。`; break;
        case 'changeToSix': conditionText = "自分のロール後 (アクティブ)"; const changeSixUses = level; effectText = `WAVE中 ${changeSixUses}回 使用可能。サイコロを1つ選んで、出目を強制的に「6」に変更できる。`; break;
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

    function getCardTypeName(type) { switch(type) { case 'support': return '補助'; case 'dice': return '出目操作'; case 'score': return '点数強化'; case 'special': return '特殊'; default: return '不明'; } }

    // === フォントサイズ調整ヘルパー関数 ===
    function adjustDescriptionFontSize(element, text) {
        if (!element || typeof text !== 'string') return;

        const baseFontSize = 0.9; // em (CSSでのデフォルト値と合わせる)
        const midFontSize = 0.8; // em
        const minFontSize = 0.7; // em
        const maxLengthForBase = 70; // この文字数までは基本サイズ
        const maxLengthForMid = 120; // この文字数までは中間サイズ

        // HTMLタグを除去して文字数をカウント
        const plainText = text.replace(/<[^>]*>?/gm, '');
        const textLength = plainText.length;

        let fontSize = baseFontSize;
        if (textLength > maxLengthForMid) {
            fontSize = minFontSize;
        } else if (textLength > maxLengthForBase) {
            fontSize = midFontSize;
        }
        // console.log(`Text length: ${textLength}, Font size set to: ${fontSize}em`); // デバッグ用
        element.style.fontSize = `${fontSize}em`;
        // 必要に応じてline-heightも調整 (例)
        element.style.lineHeight = fontSize < 0.8 ? '1.4' : '1.5';
    }


    // === ショップを開く処理 ===
    function openShop() {
        console.log("Opening shop...");

        // 持ち点リセット
        playerScore = INITIAL_PLAYER_SCORE + permanentScoreBoost;
        scoreAtWaveStart = playerScore;
        console.log(`Shop opened. Player score reset to base + boost: ${playerScore}`);

        if(nextWaveArea) nextWaveArea.style.display = 'none';
        purchasedOrUpgradedInShop = [];
        setShopMessage(DEFAULT_SHOP_MESSAGE);
        const exchangeCard = playerCards.find(card => card.id === 'handExchange');
        freeRerollsAvailableThisShopVisit = exchangeCard ? (exchangeCard.level >= 2 ? 2 : 1) : 0;
        activeCardUses['handExchangeFreeRerollCount'] = 0;

        console.log(`Hand Exchange Card Lv.${exchangeCard?.level}, Free rerolls for this visit: ${freeRerollsAvailableThisShopVisit}`);

        applyPlayerCardEffects(); // パッシブ効果適用
        displayShopOffers(); // オファー生成

        const choiceCardCheck = playerCards.find(c => c.id === 'shopChoicePlus1');
        if (choiceCardCheck) {
             shopChoicePlus1Active = false;
             console.log("Resetting Shop Choice+1 flag after use.");
        }

        const existingConfirmation = document.getElementById('shop-confirmation-buttons');
        if (existingConfirmation) existingConfirmation.remove();
        if(shopActionsEl) shopActionsEl.style.display = 'flex';

        showScreen('shop-screen'); // ★ 先に画面を表示
        setTimeout(() => {
            console.log("Updating shop UI after showing screen.");
            updateShopUI(); // スコア表示やボタン状態を反映させる
        }, 0); // 0ms遅延で実行キューの最後に回す
    }

    // === ショップを閉じる処理 ===
    function closeShop() {
            console.log("Closing shop, proceeding to next wave.");
            activeCardUses = {}; // アクティブカード使用回数リセット
            console.log("Active card uses reset for new wave.");

            currentWave++;
            const npcScoreBaseIncrease = 500; // NPCスコア増加量 (調整可能)
            npcScore = NPC_START_SCORE_BASE + defeatedCount * npcScoreBaseIncrease;

            selectNextNpc(); // 次のNPC選択

            baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT;
            currentMinBet = baseMinBet;
            isPlayerParent = true; // 次はプレイヤー親
            playerHand = null; npcHand = null; playerRollCount = 0; npcRollCount = 0; isGameActive = false;
            consecutiveWins = 0; npcConsecutiveWins = 0; // 連勝数リセット
            currentRoundInWave = 0; // ラウンド数リセット

            if (betMainControls) betMainControls.style.display = 'flex';
            if (betActionContainer) betActionContainer.style.display = 'flex';
            if (actionArea) actionArea.style.display = 'flex';
            if (nextWaveArea) nextWaveArea.style.display = 'none';

            rollButton.disabled = true;
            historyButton.disabled = false;

            // WAVE固有のカード効果フラグリセット
            keepParentRightUsedThisWave = 0;
            keepParentDiscountNextRound = false;
            waitingForPlayerActionAfterRoll = false;

            applyPlayerCardEffects(); // パッシブ効果再適用
            updateUI(); // UI更新 (ここで持ち点も最新が表示されるはず)
            showScreen('game-screen'); // ゲーム画面表示
            startBettingPhase(); // 新しいWAVEのベットフェーズ開始
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
        const activeCardOffersEl = document.getElementById('active-card-offers'); const passiveCardOffersEl = document.getElementById('passive-card-offers'); const packOffersEl = document.getElementById('pack-offers'); const boostOffersEl = document.getElementById('boost-offers');
        if (!shopOffersContainerEl || !activeCardOffersEl || !passiveCardOffersEl || !packOffersEl || !boostOffersEl) { console.error("Shop offer container elements not found!"); return; }
        activeCardOffersEl.innerHTML = ''; passiveCardOffersEl.innerHTML = ''; packOffersEl.innerHTML = ''; boostOffersEl.innerHTML = '';
        const ownedCardIds = playerCards.map(card => card.id);
        const activeCardPool = allCards.filter(card => !!card.usesPerWave); const passiveCardPool = allCards.filter(card => !card.usesPerWave && (card.applyEffect || card.removeEffect || card.effectTag));
        const availableActive = activeCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL)); const availablePassive = passiveCardPool.filter(card => !playerCards.find(c => c.id === card.id && c.level >= MAX_CARD_LEVEL));
        let numActiveOffers = 3, numPassiveOffers = 3;
        const choiceCard = playerCards.find(c => c.id === 'shopChoicePlus1'); if (choiceCard) { console.log("Shop Choice+1 Active!"); const canAddActive = availableActive.length > numActiveOffers; const canAddPassive = availablePassive.length > numPassiveOffers; if (canAddActive && canAddPassive) { if (Math.random() < 0.5) { numActiveOffers++; console.log(" -> Adding active card offer."); } else { numPassiveOffers++; console.log(" -> Adding passive card offer."); } } else if (canAddActive) { numActiveOffers++; console.log(" -> Adding active card offer (only option)."); } else if (canAddPassive) { numPassiveOffers++; console.log(" -> Adding passive card offer (only option)."); } else { console.log(" -> No additional offer possible despite Shop Choice+1."); } }
        const shuffledActive = availableActive.sort(() => 0.5 - Math.random()); const shuffledPassive = availablePassive.sort(() => 0.5 - Math.random());
        for (let i = 0; i < Math.min(numActiveOffers, shuffledActive.length); i++) { const cardData = shuffledActive[i]; const ownedCard = playerCards.find(c => c.id === cardData.id); const isOwned = !!ownedCard; const currentLevel = ownedCard ? ownedCard.level : 0; const nextLevel = currentLevel + 1; const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL; let displayCost = 0; if (isOwned && !isMaxLevel) { displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel); } else if (!isOwned) { displayCost = cardData.cost; } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { displayCost = Math.floor(displayCost * 0.9); } currentShopOffers.push({ ...cardData, itemType: 'card', cardActualType: 'active', isOwned: isOwned, currentLevel: currentLevel, displayCost: displayCost }); }
        for (let i = 0; i < Math.min(numPassiveOffers, shuffledPassive.length); i++) { const cardData = shuffledPassive[i]; const ownedCard = playerCards.find(c => c.id === cardData.id); const isOwned = !!ownedCard; const currentLevel = ownedCard ? ownedCard.level : 0; const nextLevel = currentLevel + 1; const isMaxLevel = isOwned && currentLevel >= MAX_CARD_LEVEL; let displayCost = 0; if (isOwned && !isMaxLevel) { displayCost = getCostToUpgradeToNextLevel(cardData, nextLevel); } else if (!isOwned) { displayCost = cardData.cost; } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { displayCost = Math.floor(displayCost * 0.9); } currentShopOffers.push({ ...cardData, itemType: 'card', cardActualType: 'passive', isOwned: isOwned, currentLevel: currentLevel, displayCost: displayCost }); }
        if (packDefinitions.length > 0) { const shuffledPacks = [...packDefinitions].sort(() => 0.5 - Math.random()); const numPackOffers = Math.min(2, shuffledPacks.length); for (let i = 0; i < numPackOffers; i++) { const packDef = shuffledPacks[i]; let packCost = packDef.baseCost; if (packDef.costCalculation === 'average' && packDef.cardPool.length > 0) { let totalCost = 0; let validCardCount = 0; packDef.cardPool.forEach(cardId => { const card = allCards.find(c => c.id === cardId); if (card) { totalCost += card.cost; validCardCount++; } }); if (validCardCount > 0) { packCost = Math.floor(totalCost / validCardCount); packCost = Math.max(10, Math.round(packCost / 10) * 10); } else { packCost = packDef.baseCost; } } const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { packCost = Math.floor(packCost * 0.9); } if (!purchasedOrUpgradedInShop.includes(packDef.id)) { currentShopOffers.push({ ...packDef, itemType: 'pack', displayCost: packCost }); } else { console.log(`Pack ${packDef.id} is already purchased this visit. Skipping.`); } } }
        boostItems.forEach(boostItem => { let boostCost = boostItem.cost; const exchangeCard = playerCards.find(c => c.id === 'handExchange'); if(exchangeCard && exchangeCard.level >= 3) { boostCost = Math.floor(boostCost * 0.9); } if (!purchasedOrUpgradedInShop.includes(boostItem.id)) { currentShopOffers.push({ ...boostItem, itemType: 'boost', displayCost: boostCost }); } else { console.log(`Boost item ${boostItem.id} is already purchased this visit. Skipping.`); } });
        console.log("Generated shop offers:", currentShopOffers);
        currentShopOffers.forEach(offer => {
            const itemElement = document.createElement('div'); let targetContainer = null; let elementClasses = []; let buttonHtml = ''; let costDisplay = ''; let itemNameHtml = offer.name || '不明なアイテム'; let descriptionHtml = offer.description || offer.flavor || '---'; let rarityBadgeHtml = ''; let typeBadgeHtml = ''; let levelSpan = ''; let datasetIdAttr = 'itemId';
            if (offer.itemType === 'card') { datasetIdAttr = 'cardId'; const rarityClass = ['normal', 'rare', 'epic', 'legendary'][offer.rarity - 1] || 'normal'; elementClasses = ['card', `type-${offer.type}`, `rarity-${rarityClass}`]; typeBadgeHtml = `<span class="card-type-badge">${getCardTypeName(offer.type)}</span>`; const rarityText = ['N', 'R', 'EP', 'LG'][offer.rarity - 1] || 'N'; rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`; if (offer.isOwned) { elementClasses.push('upgradeable'); if (offer.currentLevel >= MAX_CARD_LEVEL) { elementClasses.push('max-level'); costDisplay = `<span class="card-cost">最大Lv</span>`; levelSpan = `<span class="card-level">(Lv.${offer.currentLevel})</span>`; descriptionHtml = getUpgradeDescription(offer, offer.currentLevel); } else { costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; const nextLevel = offer.currentLevel + 1; const levelColorClass = `card-level-value-${nextLevel}`; levelSpan = `<span class="card-level">(Lv.${offer.currentLevel} → <span class="${levelColorClass}">Lv.${nextLevel}</span>)</span>`; descriptionHtml = getUpgradeDescription(offer, nextLevel); buttonHtml = `<button class="buy-button upgrade-button button-pop" data-card-id="${offer.id}" data-action="upgrade" data-cost="${offer.displayCost}">強化</button>`; if (nextLevel === 3) { elementClasses.push('upgradeable-lv3'); } } } else { costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buttonHtml = `<button class="buy-button button-pop" data-card-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; descriptionHtml = getUpgradeDescription(offer, 1); } itemNameHtml = `${offer.name}${levelSpan}`; targetContainer = offer.cardActualType === 'active' ? activeCardOffersEl : passiveCardOffersEl; }
            else if (offer.itemType === 'pack') { elementClasses = ['pack', 'shop-item']; costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buttonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; targetContainer = packOffersEl; descriptionHtml = offer.description;} // パックの説明文もセット
            else if (offer.itemType === 'boost') { elementClasses = ['boost-item', 'shop-item']; costDisplay = `<span class="card-cost">${offer.displayCost} G</span>`; buttonHtml = `<button class="buy-button button-pop" data-item-id="${offer.id}" data-action="buy" data-cost="${offer.displayCost}">購入</button>`; targetContainer = boostOffersEl; descriptionHtml = offer.description;} // ブーストの説明文もセット
            itemElement.className = elementClasses.join(' '); itemElement.dataset[datasetIdAttr] = offer.id; if (offer.image) { itemElement.style.backgroundImage = `url('${offer.image}')`; } const itemInnerHtml = `${typeBadgeHtml}${rarityBadgeHtml}<h3 class="card-name">${itemNameHtml}</h3><p class="card-description">${descriptionHtml}</p>`; itemElement.innerHTML = itemInnerHtml; const footer = document.createElement('div'); footer.className = 'card-footer'; footer.innerHTML = `${costDisplay}${buttonHtml}`; itemElement.appendChild(footer);
            // ★ adjustDescriptionFontSize 呼び出しを追加
            const descEl = itemElement.querySelector('.card-description');
            if (descEl) adjustDescriptionFontSize(descEl, descriptionHtml.replace(/<[^>]*>?/gm, '')); // HTMLタグを除去して長さを測る
            if (purchasedOrUpgradedInShop.includes(offer.id)) { itemElement.classList.add('sold-out'); }
            if (targetContainer) { targetContainer.appendChild(itemElement); } else { console.warn("Target container not found for item:", offer); }
        });
        [activeCardOffersEl, passiveCardOffersEl, packOffersEl, boostOffersEl].forEach(container => { if (container && container.children.length === 0) { container.innerHTML = `<span class="shop-empty-message">(オファーなし)</span>`; } });
   }

// === ショップUI更新関数 ===
function updateShopUI() {
    if (!shopScreen.classList.contains('active')) return;

    if (shopCoinDisplayEl) shopCoinDisplayEl.textContent = playerCoins;

    const shopPlayerScoreValueEl = document.getElementById('shop-player-score-value');
    if (shopPlayerScoreValueEl) {
        shopPlayerScoreValueEl.textContent = playerScore;
    }

    updateShopHandDisplay(); // ★ 最初に呼ぶことで handCardsEl が確実に取得されるように期待
    const shopItemElements = document.querySelectorAll('#shop-scrollable-offers .card, #shop-scrollable-offers .pack, #shop-scrollable-offers .boost-item');

    shopItemElements.forEach(itemElement => {
        const itemId = itemElement.dataset.cardId || itemElement.dataset.itemId; if (!itemId) { console.warn("Shop item element missing ID", itemElement); return; }
        const footer = itemElement.querySelector('.card-footer'); const costDisplayEl = itemElement.querySelector('.card-cost'); const button = itemElement.querySelector('.buy-button, .upgrade-button');
        const descEl = itemElement.querySelector('.card-description'); // 説明要素を取得

        if (purchasedOrUpgradedInShop.includes(itemId)) { itemElement.classList.add('sold-out'); if (footer) footer.style.display = 'none'; return; }
        else { itemElement.classList.remove('sold-out'); if (footer) footer.style.display = 'flex'; }
        const offerData = currentShopOffers.find(offer => offer.id === itemId); if (!offerData) { console.warn(`Offer data not found for item ${itemId} in updateShopUI`); itemElement.style.display = 'none'; return; }
        else { itemElement.style.display = ''; }
        let cost = offerData.displayCost; let canAfford = playerCoins >= cost; let buttonText = '購入'; let isCard = offerData.itemType === 'card'; let isOwnedCard = isCard && offerData.isOwned; let isMaxLevelCard = isOwnedCard && offerData.currentLevel >= MAX_CARD_LEVEL;

        // ★ 説明文フォントサイズ調整 (updateShopUIでも行う)
        if (descEl) {
            let descriptionText = '';
            if (offerData.itemType === 'card') {
                 const targetLevel = isOwnedCard ? Math.min(MAX_CARD_LEVEL, offerData.currentLevel + 1) : 1;
                 descriptionText = getUpgradeDescription(offerData, targetLevel);
                 if (isMaxLevelCard) {
                     descriptionText = getUpgradeDescription(offerData, offerData.currentLevel);
                 }
            } else {
                 descriptionText = offerData.description || offerData.flavor || '---';
            }
             adjustDescriptionFontSize(descEl, descriptionText.replace(/<[^>]*>?/gm, ''));
        }

        if (button) {
             if (isMaxLevelCard) { button.style.display = 'none'; if(costDisplayEl) costDisplayEl.textContent = '最大Lv'; }
             else {
                 button.style.display = 'inline-block';
                 button.disabled = !canAfford; // ★ disabled 属性をここで設定
                 button.dataset.cost = cost;
                 if (isOwnedCard) { buttonText = '強化'; button.classList.add('upgrade-button'); button.classList.remove('buy-button'); }
                 else { buttonText = '購入'; button.classList.add('buy-button'); button.classList.remove('upgrade-button'); }
                 button.textContent = buttonText; if(costDisplayEl) costDisplayEl.textContent = `${cost} G`;
             }
         }
        else if (!isMaxLevelCard && costDisplayEl) { costDisplayEl.textContent = `${cost} G`; }
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
        // 無料リロールがある場合
        rerollButtonText = `無料リロール (${currentFreeRerollsAvailable - usedFreeRerollsThisVisit}回)`;
        currentRerollCost = 0; // 表示コストは0
        rerollDisabled = false;
        console.log(" -> Free reroll available. Button enabled.");
    } else {
        // 有料リロールの場合
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

    // handleBuyCard 関数 (コインアニメーション追加)
    async function handleBuyCard(event) {
        const button = event.target.closest('.buy-button, .upgrade-button'); if (!button) { console.warn("Buy/Upgrade button not found in clicked element or parents."); return; }
        const itemId = button.dataset.cardId || button.dataset.itemId; const action = button.classList.contains('upgrade-button') ? 'upgrade' : 'buy'; const cost = parseInt(button.dataset.cost || '0'); const offerData = currentShopOffers.find(offer => offer.id === itemId); if (!offerData) { console.error("Offer data not found for", itemId); return; }
        const actualCost = cost; if (playerCoins < actualCost) { setShopMessage("コインが足りません！"); return; }
        console.log(`Processing ${action} for item: ${itemId}, type: ${offerData.itemType}, cost: ${actualCost}`);

        const startCoins = playerCoins;
        let purchaseSuccess = false; // 購入/強化が成功したか

        if (offerData.itemType === 'card') {
            if (action === 'upgrade') {
                const currentCardData = playerCards.find(c => c.id === itemId); if (!currentCardData || currentCardData.level >= MAX_CARD_LEVEL) { setShopMessage("これ以上強化できません。"); return; } const nextLevel = currentCardData.level + 1;
                playerCoins -= actualCost; // ★ コイン減少は先に行う
                currentCardData.level = nextLevel; purchasedOrUpgradedInShop.push(itemId); console.log(`Upgraded card: ${offerData.name} to Lv.${nextLevel} for ${actualCost}G`); setShopMessage(`${offerData.name} を Lv.${nextLevel} に強化しました！`); applyPlayerCardEffects(); updateShopUI();
                await showItemRevealModal({ item: offerData, level: nextLevel, source: 'upgrade' }); // ★ await でモーダル表示完了を待つ
                purchaseSuccess = true;
            }
            else { // 購入
                purchaseSuccess = await purchaseCard(offerData, actualCost); // ★ purchaseCard が Promise を返すように変更
            }
        } else if (offerData.itemType === 'pack') {
            if (action === 'buy') { purchaseSuccess = await purchasePack(offerData, actualCost); } // ★ purchasePack が Promise を返すように変更
            else { console.warn("Upgrade action requested for a pack item."); }
        } else if (offerData.itemType === 'boost') {
            if (action === 'buy') { purchaseSuccess = await purchaseBoost(offerData, actualCost); } // ★ purchaseBoost が Promise を返すように変更
            else { console.warn("Upgrade action requested for a boost item."); }
        }
        else { console.error("Unknown item type:", offerData.itemType); }

    // ★ アニメーションをモーダル表示後に実行
    if (purchaseSuccess && actualCost > 0) { // コストがかかった場合のみアニメーション
        animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        playCoinAnimation(actualCost); // ★ 消費したコスト分のアニメーションに変更
    }
}

// purchaseCard 関数
async function purchaseCard(cardDefinition, purchaseCost) {
    return new Promise(async (resolve) => {
        const cardDef = allCards.find(c => c.id === cardDefinition.id); if (!cardDef) { console.error("Card definition not found for", cardDefinition.id); resolve(false); return; }
        const isBuyingActive = !!cardDef.usesPerWave; const cardType = isBuyingActive ? 'active' : 'passive'; let currentCount = 0; playerCards.forEach(handCardData => { const handCardDef = allCards.find(c => c.id === handCardData.id); if (handCardDef) { const handCardIsActive = !!handCardDef.usesPerWave; if ((isBuyingActive && handCardIsActive) || (!isBuyingActive && !handCardIsActive)) { currentCount++; } } }); const limit = isBuyingActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS; const typeNameJp = isBuyingActive ? 'アクティブ' : 'パッシブ';
        if (currentCount >= limit) { setShopMessage(`${typeNameJp}カードの手札がいっぱいです！売却する${typeNameJp}カードを選んでください。`); cardToDiscardFor = { ...cardDefinition, cost: purchaseCost, itemType: 'card' }; cardTypeToDiscard = cardType; openDiscardModal(); resolve(false); return; } // ★ 破棄が必要な場合は false で解決

        const startCoins = playerCoins;
        playerCoins -= purchaseCost;
        playerCards.push({ id: cardDefinition.id, level: 1 }); purchasedOrUpgradedInShop.push(cardDefinition.id); console.log(`Bought card: ${cardDefinition.name} (Lv.1) for ${purchaseCost}G`); setShopMessage(`${cardDefinition.name} を購入しました！`); applyPlayerCardEffects(); updateShopUI();

        await showItemRevealModal({ item: cardDefinition, level: 1, source: 'buy' });

        // アニメーションをモーダル表示後に実行
        if (purchaseCost > 0) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            playCoinAnimation(purchaseCost); // 消費したコスト分
        }
        resolve(true); //
    });
}

// purchasePack 関数
async function purchasePack(packDefinition, purchaseCost) {
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
           await new Promise(res => setTimeout(res, 800)); // 表示ウェイト

           const existingCard = playerCards.find(c => c.id === drawnCardId); let newItemLevel = 1; let revealSource = 'pack_new'; let addedOrUpgraded = false;
           if (existingCard) { // --- 既存カードの場合 ---
               if (existingCard.level < MAX_CARD_LEVEL) {
                   existingCard.level++; newItemLevel = existingCard.level; revealSource = 'pack_upgrade';
                   setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現！Lv.${existingCard.level}にアップグレード！`);
                   console.log(` -> Upgraded ${drawnCardDef.name} to Lv.${existingCard.level} from pack.`);
                   applyPlayerCardEffects(); updateShopHandDisplay(); addedOrUpgraded = true;
               } else {
                   revealSource = 'pack_max_level';
                   setShopMessage(`${packDefinition.name} から ${drawnCardDef.name} が出現しましたが、既に最大レベルです。`);
                   console.log(` -> Drew ${drawnCardDef.name} from pack, but already max level.`);
               }
               await showItemRevealModal({ item: drawnCardDef, level: newItemLevel, source: revealSource, packName: packDefinition.name }); // ★ とにかく獲得演出は表示
               resolve(true); // 既存カードの場合は破棄モーダル不要なのでここで終了
           } else { // --- 新規カードの場合 ---
               const isDrawnCardActive = !!drawnCardDef.usesPerWave; const drawnCardType = isDrawnCardActive ? 'active' : 'passive'; let currentCount = 0; playerCards.forEach(handCardData => { const handCardDef = allCards.find(c => c.id === handCardData.id); if (handCardDef) { const handCardIsActive = !!handCardDef.usesPerWave; if ((isDrawnCardActive && handCardIsActive) || (!isDrawnCardActive && !handCardIsActive)) { currentCount++; } } }); const limit = isDrawnCardActive ? MAX_ACTIVE_CARDS : MAX_PASSIVE_CARDS; const typeNameJp = isDrawnCardActive ? 'アクティブ' : 'パッシブ';

               // 手札上限チェックの前に獲得演出
               await showItemRevealModal({ item: drawnCardDef, level: 1, source: 'pack_new', packName: packDefinition.name });

               if (currentCount >= limit) { // ★ 獲得演出の後に上限チェック
                   cardToDiscardFor = { ...drawnCardDef, cost: 0, itemType: 'card' }; // 引いたカード情報を保持
                   cardTypeToDiscard = drawnCardType;
                   setShopMessage(`${drawnCardDef.name} を獲得！しかし${typeNameJp}カードの手札がいっぱいです！売却するカードを選んでください（新しいカードを選ぶと保持します）。`); // メッセージ変更
                   openDiscardModal(); // 破棄モーダルを開く
                   resolve(true); // ★ 破棄モーダルに処理を委譲するので成功扱い
                   return; // 破棄モーダルからの処理待ち
               } else { // ★ 手札に空きがあれば通常通り追加
                   playerCards.push({ id: drawnCardDef.id, level: 1 });
                   setShopMessage(`${drawnCardDef.name} を獲得しました！`);
                   console.log(` -> Added ${drawnCardDef.name} (Lv.1) from pack to hand.`);
                   applyPlayerCardEffects(); updateShopHandDisplay(); addedOrUpgraded = true;
                    // showItemRevealModalは上で実行済みなので不要
                   resolve(true); // ★ 成功で resolve
               }
           }
       } else { // カード定義が見つからないエラー
           await showItemRevealModal({ item: packDefinition, source: 'pack_error' });
           console.error(`Card definition not found for ID: ${drawnCardId} from pack ${packDefinition.name}`);
           resolve(true); // エラーでも resolve
       }
   });
}

// purchaseBoost 関数
async function purchaseBoost(boostDefinition, purchaseCost) {
    return new Promise(async (resolve) => {
        if (purchasedOrUpgradedInShop.includes(boostDefinition.id)) { console.warn(`Boost item ${boostDefinition.id} already purchased.`); setShopMessage("この強化は既に購入済みです。"); resolve(false); return; } // ★ 失敗で resolve(false)

        const startCoins = playerCoins;
        const scoreBeforeBoost = playerScore;

        playerCoins -= purchaseCost;
        permanentScoreBoost += boostDefinition.boostAmount;
        playerScore += boostDefinition.boostAmount;
        scoreAtWaveStart += boostDefinition.boostAmount;

        console.log(`Bought boost: ${boostDefinition.name} for ${purchaseCost}G. Permanent boost is now ${permanentScoreBoost}. Player score updated to ${playerScore}.`);
        setShopMessage(`${boostDefinition.name} を購入しました！開始時の持ち点が ${boostDefinition.boostAmount}点 増加します。`);
        updateShopUI(); // アイテムを売り切れ表示にする

        await showItemRevealModal({ item: boostDefinition, source: 'boost' }); // ★ await でモーダル表示完了を待つ

        // スコア増加アニメーション
        animateScore(playerScoreEl, scoreBeforeBoost, playerScore, SCORE_ANIMATION_DURATION);
        const shopPlayerScoreValueEl = document.getElementById('shop-player-score-value');
        if (shopPlayerScoreValueEl) { animateScore(shopPlayerScoreValueEl, scoreBeforeBoost, playerScore, SCORE_ANIMATION_DURATION); }
        // コイン減少アニメーション
        if (purchaseCost > 0) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            playCoinAnimation(purchaseCost); // 消費したコスト分
        }
        resolve(true);
    });
}

// handleReroll 関数
async function handleReroll() {
    let actualRerollCost = REROLL_COST; const shopChoiceCard = playerCards.find(c => c.id === 'shopChoicePlus1'); if (shopChoiceCard) { if (shopChoiceCard.level === 2) actualRerollCost = Math.max(0, REROLL_COST - 10); else if (shopChoiceCard.level >= 3) actualRerollCost = 0; }
    const exchangeCardCheck = playerCards.find(card => card.id === 'handExchange'); const currentFreeRerollsAvailable = exchangeCardCheck ? (exchangeCardCheck.level >= 2 ? 2 : 1) : 0; const usedFreeRerollsThisVisit = activeCardUses['handExchangeFreeRerollCount'] || 0;

    const startCoins = playerCoins;
    let costPaid = 0;

    if (currentFreeRerollsAvailable > usedFreeRerollsThisVisit) { activeCardUses['handExchangeFreeRerollCount'] = usedFreeRerollsThisVisit + 1; setShopMessage(`無料リロールを使用しました！ (本日残り ${currentFreeRerollsAvailable - activeCardUses['handExchangeFreeRerollCount']} 回)`); console.log(`Used free reroll. Total free used this visit: ${activeCardUses['handExchangeFreeRerollCount']}`); }
    else { if (playerCoins < actualRerollCost) { setShopMessage("リロールするためのコインが足りません！"); return; } playerCoins -= actualRerollCost; costPaid = actualRerollCost; setShopMessage(DEFAULT_SHOP_MESSAGE); console.log(`Paid ${actualRerollCost}G for reroll.`); }

    // リロール処理の前にアニメーション (有料の場合)
    if (costPaid > 0) {
        // 即時アニメーションさせるため、モーダル待ちは不要
        animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        playCoinAnimation(costPaid); // 消費したコスト分
        await new Promise(resolve => setTimeout(resolve, COIN_ANIMATION_DURATION));
    }

    console.log("Rerolled shop offers (Cards only)."); displayShopOffers(); updateShopUI();
}

    // === 破棄モーダル表示 ===
    function openDiscardModal() {
        if (!cardTypeToDiscard || !cardToDiscardFor) { // cardToDiscardFor もチェック
            console.error("Cannot open discard modal: Card type or card data to add is not specified.");
            return;
        }
        const typeNameJp = cardTypeToDiscard === 'active' ? 'アクティブ' : 'パッシブ';
        const modalTitle = discardModal.querySelector('h3');
        const modalText = discardModal.querySelector('p');
        if(modalTitle) modalTitle.textContent = `${typeNameJp}カードの手札がいっぱいです！`;
        // メッセージ変更: 新しいカードを選んだ場合の挙動を説明
        if(modalText) modalText.textContent = `新しく「${cardToDiscardFor.name}」を獲得しましたが、${typeNameJp}の手札が上限です。保持したい場合は下記リストから売却するカードを選んでください。`;

        discardOptionsEl.innerHTML = '';
        let foundDiscardable = false;

        // 追加予定のカードを最初に表示 (クリックしても保持できないことを明示的に示す)
        const newCardButton = document.createElement('button');
        newCardButton.className = 'discard-choice-button new-card-option';
        newCardButton.textContent = `${cardToDiscardFor.name} [Lv.1] (保持するには下から売却)`; // テキスト変更
        newCardButton.disabled = true; // クリック不可にする
        newCardButton.style.cursor = 'default';
        newCardButton.style.opacity = 0.7;
        discardOptionsEl.appendChild(newCardButton);


        // 既存のカードを表示
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
                    button.addEventListener('click', handleDiscardChoice);
                    discardOptionsEl.appendChild(button);
                }
            }
        });

        if (!foundDiscardable) {
             // 新しいカードしか選択肢がない（＝既存の同タイプがない）場合は、破棄モーダルは実質不要だが、
             // 念のためメッセージを表示し、キャンセルボタンのみ有効にする
             discardOptionsEl.innerHTML = `<p>売却可能な${typeNameJp}カードが手札にありません。</p>`;
             // 新しいカード保持ボタンも非表示にする（他のカードを売却できないため）
             if(newCardButton) newCardButton.style.display = 'none';
        }

        discardModal.style.display = 'flex';
    }

// === 破棄選択処理 ===
function handleDiscardChoice(event) {
    const selectedButton = event.target;
    const selectedDiscardCardId = selectedButton.dataset.cardId;
    const sellPrice = parseInt(selectedButton.dataset.sellPrice || '0');
    const itemToAdd = cardToDiscardFor; // 追加/保持予定のアイテム情報
    if (!itemToAdd || !selectedDiscardCardId) {
        console.error("Discard choice error: Missing data.");
        cancelDiscard(); // エラー時はキャンセル
        return;
    }

    // ★ 保持ボタン（disabledのはずだが念のため）がクリックされたら何もしない
    if (selectedDiscardCardId === itemToAdd.id) {
         console.warn("Discard choice: Cannot select the new card to discard.");
         return;
    }

    const startCoins = playerCoins;
    let coinChange = 0;

    // --- 既存カード (selectedDiscardCardId) を売却する場合 ---
    const cardToRemove = playerCards.find(c => c.id === selectedDiscardCardId);
    if (!cardToRemove) {
        console.error(`Card to discard (${selectedDiscardCardId}) not found in hand.`);
        cancelDiscard();
        return;
    }
    const cardToRemoveName = allCards.find(c => c.id === cardToRemove.id)?.name || selectedDiscardCardId;

    removePlayerCardEffect(selectedDiscardCardId); // 既存カード削除 & 効果解除
    playerCoins += sellPrice; // 売却額加算
    coinChange += sellPrice;
    console.log(`Sold existing card ${cardToRemoveName} (ID: ${selectedDiscardCardId}) for ${sellPrice}G.`);

    // 保持していた新しいカード (itemToAdd) を手札に追加
    if (itemToAdd.itemType === 'card') {
        playerCards.push({ id: itemToAdd.id, level: 1 });
        setShopMessage(`「${cardToRemoveName}」を売却し、「${itemToAdd.name}」を手札に加えました！`);
        console.log(`Added ${itemToAdd.name} (Lv.1) to hand after discarding ${cardToRemoveName}.`);
        applyPlayerCardEffects();
        updateShopHandDisplay(); // 手札表示更新も忘れずに
    } else {
        // カード以外がここに来ることは基本ないはず
        console.error("Error adding non-card item after discard.");
    }

    // コインアニメーション実行
    if (coinChange !== 0) {
        animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
        if (coinChange > 0) { playCoinAnimation(coinChange); }
    }

    cardToDiscardFor = null;
    cardTypeToDiscard = null;
    discardModal.style.display = 'none';
    updateShopUI(); // ショップ全体のUI更新
}


    function cancelDiscard() { cardToDiscardFor = null; cardTypeToDiscard = null; discardModal.style.display = 'none'; setShopMessage(DEFAULT_SHOP_MESSAGE); }
    function setShopMessage(msg) { if (shopMessageEl) shopMessageEl.textContent = msg; }

// handleSellCard 関数
async function handleSellCard(event) {
    const button = event.target; const cardId = button.dataset.cardId; const sellPrice = parseInt(button.dataset.sellPrice || '0'); const cardName = button.dataset.cardName || cardId; const cardLevel = button.dataset.cardLevel || '?';
    setShopMessage(`${cardName} [Lv.${cardLevel}] を ${sellPrice}G で売却しますか？`); if (shopActionsEl) shopActionsEl.style.display = 'none';
    let confirmationContainer = document.getElementById('shop-confirmation-buttons'); if (confirmationContainer) { confirmationContainer.remove(); } confirmationContainer = document.createElement('div'); confirmationContainer.id = 'shop-confirmation-buttons'; confirmationContainer.className = 'shop-actions'; if (shopActionsEl && shopActionsEl.parentNode) { shopActionsEl.parentNode.insertBefore(confirmationContainer, shopActionsEl.nextSibling); } else { const shopContent = document.querySelector('.shop-content'); if(shopContent) shopContent.appendChild(confirmationContainer); console.warn("#shop-actions not found, appending confirmation buttons to .shop-content"); }
    const confirmButton = document.createElement('button'); confirmButton.textContent = '売却'; confirmButton.className = 'button-pop'; confirmButton.style.backgroundColor = '#d9534f'; confirmButton.onclick = () => handleShopConfirmation(true); confirmationContainer.appendChild(confirmButton);
    const cancelButton = document.createElement('button'); cancelButton.textContent = 'キャンセル'; cancelButton.className = 'button-subtle'; cancelButton.onclick = () => handleShopConfirmation(false); confirmationContainer.appendChild(cancelButton);
    const confirmSell = await waitForShopConfirmation();

    if (confirmSell) {
        const startCoins = playerCoins;
        removePlayerCardEffect(cardId);
        playerCoins += sellPrice;

        setShopMessage(`${cardName} を ${sellPrice}G で売却しました。`);
        console.log(`Sold card ${cardId} from shop hand for ${sellPrice}G.`);
        updateShopUI(); // 表示更新

        // アニメーション実行 (モーダルはないので即時)
        if (sellPrice > 0) {
            animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION);
            playCoinAnimation(sellPrice); // 増加分のアニメーション
        }
    } else { setShopMessage(DEFAULT_SHOP_MESSAGE); }
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
        baseMinBet = 50 + (currentWave - 1) * MIN_BET_INCREMENT; if (keepParentDiscountNextRound) { currentMinBet = Math.max(1, Math.floor(baseMinBet / 2)); keepParentDiscountNextRound = false; } else { currentMinBet = baseMinBet; }
        if (gameMode === 'endless') { currentMinBet = Math.min(currentMinBet, playerScore, npcScore); currentMinBet = Math.max(1, currentMinBet); }
         betInput.value = currentMinBet; updateUI();
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

    // --- three.js 関連 ---
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
    function animateDiceRoll(finalDice, onComplete) { if (!isThreeJSInitialized || !diceMeshes || diceMeshes.length !== 3 || !renderer) { console.error("Three.js dice not ready for animation."); diceRollModalDisplay.innerHTML = `<div style="font-size: 5em; color: white; text-align: center;">${finalDice.join(' ')}</div>`; setTimeout(onComplete, 1000); return; } const settleDelayBase = 1000; const settleDelayOffset = 400; diceMeshes.forEach((dice, i) => { if (!dice || !dice.userData) return; dice.userData.isRolling = true; dice.rotation.set(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2, Math.random() * Math.PI * 2); dice.userData.rotationSpeed.set((Math.random() - 0.5) * ROTATION_SPEED, (Math.random() - 0.5) * ROTATION_SPEED + ROTATION_SPEED * 1.2, (Math.random() - 0.5) * ROTATION_SPEED); dice.userData.targetQuaternion.copy(dice.quaternion); }); startDiceAnimation(); finalDice.forEach((value, index) => { const dice = diceMeshes[index]; const settleDelay = settleDelayBase + index * settleDelayOffset; setTimeout(() => { if (dice && dice.userData) { dice.userData.isRolling = false; dice.userData.targetQuaternion = getTargetQuaternionForValue(value); dice.userData.settleStartTime = performance.now(); dice.userData.settleDuration = 900 + Math.random() * 400; console.log(`Dice ${index} settling to show ${value}`); } }, settleDelay); }); const totalDuration = settleDelayBase + (finalDice.length - 1) * settleDelayOffset + 1500; setTimeout(() => { diceMeshes.forEach(d => { if(d && d.userData) { d.userData.isRolling = false; d.quaternion.copy(d.userData.targetQuaternion); } }); console.log("Dice animation complete."); onComplete(); }, totalDuration); }

    function showRoleResultModal(hand, dice) {
        return new Promise(resolve => {
            if (!roleResultModal || !roleResultModalBody || !roleResultNameEl || !roleResultDiceDisplayEl || isShowingRoleResult || isShowingGameResult) { console.warn("Role result modal not ready or another result modal is showing."); resolve(); return; }
            isShowingRoleResult = true; roleResultModalBody.className = 'role-result-modal-body';
            let resultText = ''; let cssClassSuffix = ''; let duration = ROLE_RESULT_MODAL_DURATION_BASE;
            if (!hand) { resultText = 'エラー'; cssClassSuffix = 'error'; }
            else {
                resultText = getHandDisplayName(hand);
                if (hand.type === '役') { switch (hand.name) { case ROLES.PINZORO.name: cssClassSuffix = 'pinzoro'; duration = 2500; break; case ROLES.ARASHI.name: cssClassSuffix = 'arashi'; duration = 2200; break; case ROLES.SHIGORO.name: cssClassSuffix = 'shigoro'; duration = 2000; break; case ROLES.HIFUMI.name: cssClassSuffix = 'hifumi'; duration = 1800; break; default: cssClassSuffix = 'unknown-yaku'; break; } }
                else if (hand.type === '目') { cssClassSuffix = 'normal-eye'; duration = 1500; } else if (hand.type === 'ションベン') { cssClassSuffix = 'shonben'; duration = 1600; } else if (hand.type === '目なし') { resultText = '目なし'; cssClassSuffix = 'shonben'; duration = 1600; } else { cssClassSuffix = 'unknown'; }
            }
            roleResultNameEl.textContent = resultText; roleResultDiceDisplayEl.textContent = dice ? dice.join(' ') : '- - -'; roleResultDiceDisplayEl.style.display = (cssClassSuffix === 'shonben') ? 'none' : 'block';
            roleResultModalBody.classList.add(`role-reveal-${cssClassSuffix}`); roleResultModalBody.classList.add('reveal-start'); roleResultModal.style.display = 'flex';
            if (roleResultModalTimeout) clearTimeout(roleResultModalTimeout);
            roleResultModalTimeout = setTimeout(() => { roleResultModalBody.classList.remove('reveal-start'); roleResultModalBody.classList.add('reveal-end'); setTimeout(() => { roleResultModal.style.display = 'none'; roleResultModalBody.classList.remove('reveal-end'); roleResultModalBody.className = 'role-result-modal-body'; isShowingRoleResult = false; resolve(); }, 300); }, duration);
        });
    }

     function showGameResultModal(isClear, reason = "") {
        return new Promise(resolve => {
             if (!roleResultModal || !roleResultModalBody || !roleResultNameEl || isShowingRoleResult || isShowingGameResult) { console.warn("Game result modal not ready or another result modal is showing."); resolve(); return; }
             isShowingGameResult = true; roleResultModalBody.className = 'role-result-modal-body';
             let resultText = isClear ? "WAVE CLEAR!" : "GAME OVER"; let cssClassSuffix = isClear ? "wave-clear" : "game-over"; let duration = GAME_RESULT_MODAL_DURATION;
             roleResultNameEl.textContent = resultText; roleResultDiceDisplayEl.style.display = 'none';
             roleResultModalBody.classList.add(`role-reveal-${cssClassSuffix}`); roleResultModalBody.classList.add('reveal-start'); roleResultModal.style.display = 'flex';
             if (roleResultModalTimeout) clearTimeout(roleResultModalTimeout);
             roleResultModalTimeout = setTimeout(() => { roleResultModalBody.classList.remove('reveal-start'); roleResultModalBody.classList.add('reveal-end'); setTimeout(() => { roleResultModal.style.display = 'none'; roleResultModalBody.classList.remove('reveal-end'); roleResultModalBody.className = 'role-result-modal-body'; isShowingGameResult = false; resolve(); }, 300); }, duration);
        });
    }

    function highlightHand(element, hand) { if (handHighlightTimeout) clearTimeout(handHighlightTimeout); element.className = 'hand-display'; let sidebarHighlightClass = ''; if (!hand) return; if (hand.type === '役') { switch (hand.name) { case ROLES.PINZORO.name: sidebarHighlightClass = 'legendary'; break; case ROLES.ARASHI.name: sidebarHighlightClass = 'strong'; break; case ROLES.SHIGORO.name: sidebarHighlightClass = 'strong'; break; case ROLES.HIFUMI.name: sidebarHighlightClass = 'hifumi'; break; } } if (sidebarHighlightClass) { element.classList.add('highlight', sidebarHighlightClass); handHighlightTimeout = setTimeout(() => { element.className = 'hand-display'; }, HAND_HIGHLIGHT_DURATION); } }

    function animateScore(element, startScore, endScore, duration) {
        if (!element) return; if (element.animationId) cancelAnimationFrame(element.animationId); const range = endScore - startScore; let startTime = null; function step(timestamp) { if (!startTime) startTime = timestamp; const elapsed = timestamp - startTime; const progress = Math.min(elapsed / duration, 1); const currentScore = Math.floor(startScore + range * progress); if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${currentScore} G`; } else { element.textContent = currentScore; } if (progress < 1) { element.animationId = requestAnimationFrame(step); } else { if (element === gameCoinDisplayEl || element === shopCoinDisplayEl) { if(element) element.textContent = `${endScore} G`; } else { element.textContent = endScore; } element.animationId = null; } } element.animationId = requestAnimationFrame(step);
    }

    function showScoreChangePopup(container, change) { if (change === 0 || !container) return; const popup = document.createElement('span'); popup.className = 'score-change-popup'; const sign = change > 0 ? '+' : ''; popup.textContent = `${sign}${change}`; popup.classList.add(change > 0 ? 'gain' : 'loss'); container.appendChild(popup); setTimeout(() => popup.remove(), SCORE_POPUP_DURATION); }
    function changeBet(amount) { if (betInput.disabled) return; let cv = parseInt(betInput.value); if (isNaN(cv)) { cv = currentMinBet; } const max = parseInt(betInput.max); let nv = cv + amount; if (nv > max) nv = max; else if (nv < currentMinBet) nv = currentMinBet; if (nv !== cv) { betInput.value = nv; updateBetLimits(); } }
    function startBetHold(amount) { stopBetHold(); betHoldAmount = amount; changeBet(betHoldAmount); betHoldTimeout = setTimeout(() => { betHoldInterval = setInterval(() => { changeBet(betHoldAmount); }, BET_HOLD_INTERVAL); }, BET_HOLD_DELAY); }
    function stopBetHold() { clearTimeout(betHoldTimeout); clearInterval(betHoldInterval); betHoldTimeout = null; betHoldInterval = null; }

        // --- イベントリスナー ---
       modeButtons.forEach(button => { button.addEventListener('click', () => { const selectedMode = button.dataset.mode; if (selectedMode === 'pvp') { alert('対人戦は現在準備中です。'); return; } gameMode = selectedMode; modeButtons.forEach(btn => btn.classList.remove('selected')); button.classList.add('selected'); console.log(`Game mode set to: ${gameMode}`); }); });
       startGameButton.addEventListener('click', () => { console.log(`Starting game with mode: ${gameMode}`); initGame(false); });
       betAdjustButtons.forEach(button => { const amount = parseInt(button.dataset.amount); button.addEventListener('mousedown', (e) => { if (e.button !== 0) return; startBetHold(amount); }); button.addEventListener('mouseup', stopBetHold); button.addEventListener('mouseleave', stopBetHold); button.addEventListener('touchstart', (e) => { e.preventDefault(); startBetHold(amount); }, { passive: false }); button.addEventListener('touchend', stopBetHold); button.addEventListener('touchcancel', stopBetHold); });
       betInput.addEventListener('change', () => { if (!betInput.disabled) updateBetLimits(); });
       maxBetButton.addEventListener('click', () => { if (betInput.disabled) return; if (playerScore >= currentMinBet) { betInput.value = betInput.max; updateBetLimits(); } else { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満です。`); } });
       minBetButton.addEventListener('click', () => { if (betInput.disabled) return; betInput.value = currentMinBet; updateBetLimits(); });

       setBetButton.addEventListener('click', () => {
           if (!isPlayerParent || betInput.disabled || isGameActive || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return; updateBetLimits();
           if (playerScore < currentMinBet) { setMessage(`持ち点が最低賭け金(${currentMinBet}点)未満のため、賭けられません。`); return; }
           if (npcScore < currentMinBet) { defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${currentNpcCharacter?.name || '相手'}の持ち点が最低賭け金未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！` }); setMessage(`${currentNpcCharacter?.name || '相手'}の持ち点(${npcScore}点)が最低賭け金(${currentMinBet}点)未満のため、WAVEクリア！ コイン ${earnedCoins} G獲得！`); showGameResultModal(true, "相手の最低賭け金不足"); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; currentBetInfoEl.textContent = ''; currentRoundInWave = 0; activeCardUses = {}; keepParentRightUsedThisWave = 0; historyButton.disabled = true; return; }
           let bv = parseInt(betInput.value); if (isNaN(bv)) { setMessage(`無効な賭け金です。`); betInput.value = currentMinBet; updateBetLimits(); return; }
           const maxBet = parseInt(betInput.max); if (bv >= currentMinBet && bv <= maxBet) { currentBet = bv; if(riskyBetActive) { const riskyCard = playerCards.find(c => c.id === 'riskyBet'); if(riskyCard) { currentBet *= 2; currentBet = Math.min(currentBet, npcScore, playerScore); console.log(`Card Effect: 危険な賭け適用！ Final Bet: ${currentBet}`); activeCardUses['riskyBet'] = (activeCardUses['riskyBet'] || 0) + 1; } riskyBetActive = false; updateUI(); betInput.value = currentBet; updateBetLimits(); } isGameActive = true; isPlayerTurn = true; const playerName = selectedCharacter?.name || 'あなた'; currentBetInfoEl.innerHTML = `現在の賭け金: ${currentBet} 点 <span class="parent-name">(親: ${playerName})</span>`; setMessage(`賭け金 ${currentBet} で勝負！ ${playerName}(親)がサイコロを振ってください。`); betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); maxBetButton.disabled = true; minBetButton.disabled = true; rollButton.disabled = false; historyButton.disabled = false; updateUI(); }
           else { setMessage(`賭け金を正しく設定 (${currentMinBet}～${maxBet})。`); updateBetLimits(); }
       });

     rollButton.addEventListener('click', async () => {
        if (playerScore <= 0 || !isGameActive || !isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) { checkGameEnd(); return; }
        let isFreeRoll = stormWarningRerollsLeft > 0; const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
        const canUseSoulRollCheck = soulRollCard && playerRollCount >= currentMaxRolls && !isFreeRoll && !soulRollUsedThisTurn && !waitingForPlayerActionAfterRoll && getRemainingUses('soulRoll') > 0; if (canUseSoulRollCheck) { waitingForPlayerActionAfterRoll = true; setMessage("振り残り回数がありません。「魂の一振り」を使用できます。どうしますか？", 'postRollChoice'); rollButton.disabled = true; updateCardButtonHighlight(); updateBetLimits(); return; }
        const canRoll = playerRollCount < currentMaxRolls || isFreeRoll || soulRollUsedThisTurn; if (!canRoll) { setMessage("振り残り回数がありません。"); return; }
        if (isFreeRoll) { stormWarningRerollsLeft--; console.log("Using Storm Warning free reroll."); } else if (!soulRollUsedThisTurn) { playerRollCount++; }
        rollButton.disabled = true; historyButton.disabled = true; const playerName = selectedCharacter?.name || 'あなた'; setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 振っています...`); showDiceRollModal(); updateUI();
        const soulRollLvFor判定 = (soulRollCard && soulRollUsedThisTurn) ? soulRollCard.level : 0; const finalDice = rollDice(false, 0, soulRollLvFor判定);
        animateDiceRoll(finalDice, async () => {
            playerDice = finalDice; if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' '); hideDiceRollModal(); diceDisplayEl.textContent = finalDice.join(' ');
            const result = getHandResult(playerDice, false, 0, soulRollLvFor判定); const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目')); playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Player Rolled:", playerDice, "Hand:", playerHand); updateUI(); highlightHand(playerHandEl, playerHand);
            let stormWarningAppliedThisRoll = false; const stormCardCheck = playerCards.find(c => c.id === 'stormWarning');
            if (stormWarningActive && stormCardCheck) { const stormLevelCheck = stormCardCheck.level; const targetRoles = (stormLevelCheck >= 3) ? [ROLES.ARASHI.name, ROLES.PINZORO.name] : [ROLES.ARASHI.name]; if (!(playerHand.type === '役' && targetRoles.includes(playerHand.name))) { stormWarningRerollsLeft = (stormLevelCheck >= 2) ? 2 : 1; stormWarningAppliedThisRoll = true; console.log(`Card Effect: 嵐の予感発動！ Target role not hit. ${stormWarningRerollsLeft} free rerolls available.`); setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 嵐の予感効果！ アラシ/ピンゾロが出なかったので無料振り直しが ${stormWarningRerollsLeft} 回可能です。再度振ってください。`); rollButton.disabled = false; historyButton.disabled = false; updateCardButtonHighlight(); stormWarningActive = false; activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1; if (soulRollUsedThisTurn) soulRollUsedThisTurn = false; return; } else { console.log(`Card Effect: 嵐の予感 - Target role ${playerHand.name} hit! No free reroll.`); stormWarningActive = false; activeCardUses['stormWarning'] = (activeCardUses['stormWarning'] || 0) + 1; } }
            if (soulRollUsedThisTurn) { console.log("Resetting soulRollUsedThisTurn flag after successful roll."); soulRollUsedThisTurn = false; }

            // ★★★★ 修正依頼1 関連: ロール後の状態チェックと分岐 ★★★★
            await handlePostRollPlayerAction();
        });
   });

    // ★★★★ 修正依頼1 関連: ロール後のプレイヤーアクション処理関数 (新規追加) ★★★★
    async function handlePostRollPlayerAction() {
        const playerName = selectedCharacter?.name || 'あなた';
        const npcName = currentNpcCharacter?.name || '相手';

        // 目なしかどうか
        if (playerHand.type === '目なし') {
            const canReroll = playerRollCount < currentMaxRolls;
            const hasStormWarningReroll = stormWarningRerollsLeft > 0;
            const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
            const canUseSoulRollPostMenashi = soulRollCard && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
            const hasPostRollCardForMenashi = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id)); // 目なしで使えるカード(見切りなど)

            // 1. 振り直し可能か、目なし用カードがあるか、魂の一振りが使えるか
            if (canReroll || hasStormWarningReroll || hasPostRollCardForMenashi || (!canReroll && !hasStormWarningReroll && canUseSoulRollPostMenashi)) {
                waitingForPlayerActionAfterRoll = true;
                updateBetLimits(); // UI状態更新
                rollButton.disabled = true;
                historyButton.disabled = false;
                let rerollStatus = "";
                if (canReroll || hasStormWarningReroll) rerollStatus = "(振り直し可能)";
                else if (canUseSoulRollPostMenashi) rerollStatus = "(魂の一振り使用可能)";
                else rerollStatus = "(振り直し不可)"; // 通常ここには来ないはずだが念のため
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！どうしますか？ ${rerollStatus}`, 'postRollChoice');
                updateCardButtonHighlight();
            }
            // 2. 上記以外 (振り直し不可で、追加アクションもない)
            else {
                playerHand = { ...ROLES.SHONBEN, type: 'ションベン' }; // ションベン扱いに
                updateUI();
                highlightHand(playerHandEl, playerHand);
                rollButton.disabled = true;
                historyButton.disabled = false;
                isPlayerTurn = false;
                await showRoleResultModal(playerHand, playerDice); // 結果表示
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
                setTimeout(handleRoundEnd, 100); // 勝敗判定へ
            }
        }
        // ションベン
        else if (playerHand.type === 'ションベン') {
            rollButton.disabled = true;
            historyButton.disabled = false;
            isPlayerTurn = false;
            await showRoleResultModal(playerHand, playerDice); // 結果表示
            setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ションベン！ 負けです。`);
            setTimeout(handleRoundEnd, 100); // 勝敗判定へ
        }
        // 役 or 目
        else if (playerHand.type === '役' || playerHand.type === '目') {
            await showRoleResultModal(playerHand, playerDice); // 結果表示 (先に表示)
            const hasUsablePostRollCard = playerCards.some(cardData => checkCardUsabilityInPostRoll(cardData.id));
            const handName = getHandDisplayName(playerHand);

            // 1. ロール後に使用可能なカードがある場合
            if (hasUsablePostRollCard) {
                waitingForPlayerActionAfterRoll = true;
                updateBetLimits();
                rollButton.disabled = true;
                historyButton.disabled = false;
                setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): ${handName}！どうしますか？`, 'postRollChoice');
                updateCardButtonHighlight();
            }
            // 2. 使用可能なカードがない場合
            else {
                rollButton.disabled = true;
                historyButton.disabled = false;
                isPlayerTurn = false;
                if (isPlayerParent) { // プレイヤーが親
                    setMessage(`${playerName}(親): ${handName}！ 自動で${npcName}(子)の番です。`);
                    setTimeout(npcTurn, 100); // NPCターンへ
                } else { // プレイヤーが子
                    setMessage(`${playerName}(子): ${handName}！ 自動で勝負！`);
                    setTimeout(handleRoundEnd, 100); // 勝敗判定へ
                }
            }
        }
        // 予期しないケース
        else {
            console.error("Unexpected player hand state after roll:", playerHand);
            setMessage("予期せぬエラーが発生しました。");
            startBettingPhase(); // とりあえずベットフェーズに戻す
        }
        // 最後にUI状態を更新
        updateUI();
        updateCardButtonHighlight();
    }

   nextWaveButton.addEventListener('click', openShop);
   restartSameModeButton.addEventListener('click', () => { initGame(false); });
   backToTitleFromResultButton.addEventListener('click', () => { permanentScoreBoost = 0; console.log("Returning to title from result. permanentScoreBoost reset."); showScreen('title-screen'); });
   historyButton.addEventListener('click', () => { if (diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll) return; displayHistory(); historyModal.style.display = 'flex'; });
   closeHistoryModalButton.addEventListener('click', () => { historyModal.style.display = 'none'; });
   closeDiceRollModalButton.addEventListener('click', hideDiceRollModal);

      async function npcTurn() {
        if (!isGameActive || isPlayerTurn || diceAnimationId || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
        npcRollCount++; historyButton.disabled = true; const npcName = currentNpcCharacter?.name || '相手'; setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 振っています...`); showDiceRollModal(); updateUI();
        const blindingLevel = blindingDiceActive ? (playerCards.find(c => c.id === 'blindingDice')?.level || 0) : 0; const finalDice = rollDice(true, blindingLevel, 0);
        animateDiceRoll(finalDice, async () => {
            npcDice = finalDice; if(npcDiceEl) npcDiceEl.textContent = npcDice.join(' '); hideDiceRollModal(); diceDisplayEl.textContent = finalDice.join(' ');
            const result = getHandResult(npcDice, true, blindingLevel, 0); const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目')); npcHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("NPC Rolled:", npcDice, "Hand:", npcHand);
            let forcedReroll = false; if (blindingDiceActive && npcHand.type === '目なし') { console.log("Blinding Dice forced reroll for NPC on Menashi."); forcedReroll = true; setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。目くらましで再度振ります...`); setTimeout(npcTurn, 1000); return; }
            updateUI(); highlightHand(npcHandEl, npcHand); const playerName = selectedCharacter?.name || 'あなた';
            if (npcHand.type === '役' || npcHand.type === '目' || npcHand.type === 'ションベン') {
                const handName = getHandDisplayName(npcHand); historyButton.disabled = false;
                if (npcHand.type !== '目なし') { await showRoleResultModal(npcHand, npcDice); }
                if (!isPlayerParent && npcHand.type !== 'ションベン') { setMessage(`${npcName}(親): ${handName}！ ${playerName}(子)の番です。`); isPlayerTurn = true; rollButton.disabled = false; updateCardButtonHighlight(); updateUI(); } // ★ UI更新追加
                else { setMessage(`${npcName}(${!isPlayerParent?'親':'子'}): ${handName}！ ${npcHand.type === 'ションベン' ? (isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`) : '勝負！'}`); rollButton.disabled = true; setTimeout(handleRoundEnd, 100); }
            } else if (npcHand.type === '目なし') {
                if (npcRollCount < BASE_MAX_ROLLS) { setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): 目なし。再度振ります... (${npcRollCount}/${BASE_MAX_ROLLS})`); setTimeout(npcTurn, 1000); }
                else { npcHand = { ...ROLES.SHONBEN, type: 'ションベン' }; updateUI(); highlightHand(npcHandEl, npcHand); rollButton.disabled = true; historyButton.disabled = false; await showRoleResultModal(npcHand, npcDice); setMessage(`${npcName}(${!isPlayerParent ? '親' : '子'}): ションベン！ ${isPlayerParent ? '勝ちです。' : `${playerName}の勝ちです。`}`); setTimeout(handleRoundEnd, 100); }
            }
             updateCardButtonHighlight();
        });
    }

   // === スキップボタン処理 ===
   async function handleSkipAction() {
       if (!waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
       console.log("Skip button clicked.");
       waitingForPlayerActionAfterRoll = false; // 操作待ち解除
       messageButtonContainer.innerHTML = ''; // ボタン削除
       activeCardBeingUsed = null; // カード使用中状態解除

       const handName = getHandDisplayName(playerHand);
       const playerName = selectedCharacter?.name || 'あなた';
       const npcName = currentNpcCharacter?.name || 'NPC';
       const soulRollCard = playerCards.find(c => c.id === 'soulRoll');
       const canUseSoulRollOnSkip = soulRollCard && playerHand?.type === '目なし' && playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0 && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;

       // 魂の一振りを使う選択をスキップした場合 -> ションベン確定
       if (canUseSoulRollOnSkip) {
           console.log("Skipped Soul Roll choice, confirming Shonben.");
           playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
           updateUI();
           highlightHand(playerHandEl, playerHand);
           isPlayerTurn = false; // ターン終了
           rollButton.disabled = true;
           historyButton.disabled = false;
           await showRoleResultModal(playerHand, playerDice); // 結果表示
           setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
           setTimeout(handleRoundEnd, 100); // 勝敗判定へ
       }
       // 目なしの場合
       else if (playerHand && playerHand.type === '目なし') {
           let canReroll = playerRollCount < currentMaxRolls;
           let hasStormWarningReroll = stormWarningRerollsLeft > 0;
           // 再度振り直し可能かチェック
           if (canReroll || hasStormWarningReroll) {
               setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): 目なし！ 再度振ってください。(${playerRollCount}/${currentMaxRolls})${hasStormWarningReroll ? ` (嵐の予感 無料振り直し ${stormWarningRerollsLeft} 回)` : ''}`);
               rollButton.disabled = false; // ロール可能に
               historyButton.disabled = false;
           }
           // 振り直し不可の場合 -> ションベン確定
           else {
               playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
               updateUI();
               highlightHand(playerHandEl, playerHand);
               isPlayerTurn = false; // ターン終了
               rollButton.disabled = true;
               historyButton.disabled = false;
               await showRoleResultModal(playerHand, playerDice); // 結果表示
               setMessage(`${playerName}(${isPlayerParent ? '親' : '子'}): スキップしてションベン！ 負けです。`);
               setTimeout(handleRoundEnd, 100); // 勝敗判定へ
           }
       }
       // 役 or 目 の場合 -> その結果で確定
       else if (playerHand && (playerHand.type === '役' || playerHand.type === '目')) {
           isPlayerTurn = false; // ターン終了
           // await showRoleResultModal(playerHand, playerDice); // ★ 役/目モーダルは既に表示されているはずなので不要
           if (isPlayerParent) { // プレイヤーが親
               setMessage(`${playerName}(親): ${handName}！ スキップして${npcName}(子)の番です。`);
               setTimeout(npcTurn, 100); // NPCターンへ
           } else { // プレイヤーが子
               setMessage(`${playerName}(子): ${handName}！ スキップして勝負！`);
               setTimeout(handleRoundEnd, 100); // 勝敗判定へ
           }
       }
       // 予期しないケース
       else {
           console.warn("Skip action called with unexpected playerHand:", playerHand);
           startBettingPhase(); // とりあえずベットフェーズに戻す
       }
       // 最後にUI状態を更新
       updateUI();
       updateCardButtonHighlight();
       updateBetLimits(); // 賭け金関連のUIも更新
   }

    async function askKeepParentRight(cardLevel) { const maxKeepUses = (cardLevel >= 2 ? 2 : 1); const usedCount = activeCardUses['keepParentalRight'] || 0; setMessage(`親権維持カード(Lv.${cardLevel})を使用しますか？ (WAVE中 残り${maxKeepUses - usedCount}回)`, 'yesNo'); const useCard = await waitForUserChoice(); return useCard; }

          async function handleRoundEnd() {
            if (waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return;
            isGameActive = false; rollButton.disabled = true; historyButton.disabled = false;
            let pWin = false, nWin = false, draw = false; let msg = "", sc = 0, rClass = 'draw'; let parentChanged = false; let preventParentChange = false; let parentKeptByCard = false; const parentBefore = isPlayerParent ? 'Player' : 'NPC'; const playerInitialScore = playerScore; const npcInitialScore = npcScore; const playerName = selectedCharacter?.name || 'あなた'; const npcName = currentNpcCharacter?.name || '相手';
            let baseMultiplier = 1.0; let multiplierBonus = 0; let streakBonusRate = 0.0; let paymentRateModifier = 1.0; let isHifumiLoss = false; let effectiveMultiplier = 0; let finalAmount = 0; let insuranceApplied = false;
             if (playerHand?.type === 'ションベン') nWin = true; else if (npcHand?.type === 'ションベン') pWin = true;
             else { const getStrength = (hand) => { if (!hand) return -Infinity; if (hand.type === 'ションベン') return ROLES.SHONBEN.strength; if (hand.type === '目なし') return ROLES.MENASHI.strength; if (hand.name === ROLES.HIFUMI.name) return ROLES.HIFUMI.strength; if (hand.type === '目') return ROLES.NORMAL_EYE.strength + hand.value / 10; if (hand.name === ROLES.SHIGORO.name) return ROLES.SHIGORO.strength; if (hand.name === ROLES.ARASHI.name) return ROLES.ARASHI.strength + hand.value / 10; if (hand.name === ROLES.PINZORO.name) return ROLES.PINZORO.strength; return -Infinity; }; const playerStrength = getStrength(playerHand); const npcStrength = getStrength(npcHand); if (playerStrength > npcStrength) pWin = true; else if (playerStrength < npcStrength) nWin = true; else draw = true; }
             const keepRightCard = playerCards.find(card => card.id === 'keepParentalRight'); const maxKeepUses = keepRightCard ? (keepRightCard.level >= 2 ? 2 : 1) : 0; const keepRightUsesCount = activeCardUses['keepParentalRight'] || 0;
             if (isPlayerParent && nWin && keepRightCard && keepRightUsesCount < maxKeepUses) { const useKeepRight = await askKeepParentRight(keepRightCard.level); if (useKeepRight) { preventParentChange = true; parentKeptByCard = true; if (keepRightCard.level >= 3) { keepParentDiscountNextRound = true; } console.log(`Card Effect: 親権維持 Lv.${keepRightCard.level} 発動！ (${keepRightUsesCount + 1}/${maxKeepUses}回使用)`); activeCardUses['keepParentalRight'] = (activeCardUses['keepParentalRight'] || 0) + 1; updateCardButtonHighlight(); } }
            if (pWin) { if (isPlayerParent) { consecutiveWins++; npcConsecutiveWins = 0; } else { consecutiveWins = 0; npcConsecutiveWins = 0; parentChanged = true; isPlayerParent = true; } }
            else if (nWin) { if (!isPlayerParent) { npcConsecutiveWins++; consecutiveWins = 0; } else { consecutiveWins = 0; npcConsecutiveWins = 0; if (!preventParentChange) { parentChanged = true; isPlayerParent = false; } } }
            else { if (!isPlayerParent) consecutiveWins = 0; else npcConsecutiveWins = 0; } // ★ 修正: 引き分け時は両方の連勝をリセット
            if (draw) { msg = `引き分け！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; rClass = 'draw'; const drawBonusCardCheck = playerCards.find(c => c.id === 'drawBonus'); if (drawBonusActive && drawBonusCardCheck) { const scoreGainPercent = (drawBonusCardCheck.level === 3) ? 1.0 : 0.5; const scoreGain = Math.floor(currentBet * scoreGainPercent); if (scoreGain > 0) { sc = scoreGain; msg += ` (引き分けボーナス: +${sc}点)`; console.log(`Card Effect: 引き分けボーナス Lv.${drawBonusCardCheck.level} 適用！ スコア +${sc}`); activeCardUses['drawBonus'] = (activeCardUses['drawBonus'] || 0) + 1; console.log(`Draw Bonus card used. Remaining uses: ${getRemainingUses('drawBonus')}`); } drawBonusActive = false; } else { sc = 0; /* 引き分けボーナスなしならスコア変動0 */ } }
            else { const winnerHand = pWin ? playerHand : npcHand; const loserHand = pWin ? npcHand : playerHand;
                if (pWin) { if (loserHand?.name === ROLES.HIFUMI.name) { if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6; else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4; else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3; else if (winnerHand?.type === '目') baseMultiplier = 2; else baseMultiplier = 2; } else if (loserHand?.type === 'ションベン') { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); } else { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); } }
                else { if (loserHand?.name === ROLES.HIFUMI.name) { isHifumiLoss = true; if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6; else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4; else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3; else if (winnerHand?.type === '目') baseMultiplier = 2; else baseMultiplier = 2; } else if (loserHand?.type === 'ションベン') { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); } else { baseMultiplier = Math.max(1, winnerHand?.payoutMultiplier || 1); } const doubleUpCardCheck = playerCards.find(c => c.id === 'doubleUpBet'); const usedDoubleUpThisRound = (activeCardUses['doubleUpBet'] || 0) > (activeCardUses['doubleUpBet_roundStartCount'] || 0); if (doubleUpCardCheck && usedDoubleUpThisRound && !isPlayerParent) { if (doubleUpCardCheck.level <= 2) { console.log(`Card Effect: ダブルアップ失敗 Lv.${doubleUpCardCheck.level} -> ヒフミ負け扱い！`); isHifumiLoss = true; if (winnerHand?.name === ROLES.PINZORO.name) baseMultiplier = 6; else if (winnerHand?.name === ROLES.ARASHI.name) baseMultiplier = 4; else if (winnerHand?.name === ROLES.SHIGORO.name) baseMultiplier = 3; else if (winnerHand?.type === '目') baseMultiplier = 2; else baseMultiplier = 2; console.log(` -> Base Multiplier recalculated to: ${baseMultiplier}`); } else { console.log(`Card Effect: ダブルアップ失敗 Lv.3 -> ペナルティなし`); } } }
                console.log(`[${pWin?'Win':'Lose'}] Base Multiplier (vs ${getHandDisplayName(loserHand)}): ${baseMultiplier}`);
                 multiplierBonus = 0; if (pWin) { playerCards.forEach(cardData => { const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef || !cardDef.effectTag) return; const level = cardData.level; switch (cardDef.effectTag) { case 'arashiBonus': if (winnerHand?.name === ROLES.ARASHI.name) { multiplierBonus += level; console.log(`Card Effect: アラシ強化 Lv.${level} (+${level})`); } break; case 'shigoroBonus': if (winnerHand?.name === ROLES.SHIGORO.name) { multiplierBonus += level; console.log(`Card Effect: シゴロ強化 Lv.${level} (+${level})`); } break; case 'oneEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 1) { multiplierBonus += level; console.log(`Card Effect: 1の目ボーナス Lv.${level} (+${level})`); } break; case 'sixEyeBonus': if (winnerHand?.type === '目' && winnerHand.value === 6) { multiplierBonus += level; console.log(`Card Effect: 6の目ボーナス Lv.${level} (+${level})`); } break; } }); const amplifierCard = playerCards.find(c => c.id === 'rewardAmplifier'); const usedAmplifierThisRound = (activeCardUses['rewardAmplifier'] || 0) > (activeCardUses['rewardAmplifier_roundStartCount'] || 0); if (amplifierCard && usedAmplifierThisRound && (winnerHand?.type === '役' || winnerHand?.type === '目')) { const bonusValue = (amplifierCard.level >= 2) ? 2 : 1; multiplierBonus += bonusValue; console.log(`Card Effect: 報酬増幅 Lv.${amplifierCard.level} (+${bonusValue})`); } const doubleUpCard = playerCards.find(c => c.id === 'doubleUpBet'); const usedDoubleUpThisRoundWin = (activeCardUses['doubleUpBet'] || 0) > (activeCardUses['doubleUpBet_roundStartCount'] || 0); if (doubleUpCard && usedDoubleUpThisRoundWin && !isPlayerParent) { const bonusValue = [1.0, 1.5, 2.0][(doubleUpCard.level || 1) - 1]; multiplierBonus += bonusValue; console.log(`Card Effect: ダブルアップ成功 Lv.${doubleUpCard.level} (+${bonusValue.toFixed(1)})`); } }
                 else { playerCards.forEach(cardData => { const cardDef = allCards.find(c => c.id === cardData.id); if (!cardDef) return; const level = cardData.level; if (cardDef.effectTag === 'hifumiHalf' && isHifumiLoss) { multiplierBonus -= level; console.log(`Card Effect: ヒフミ軽減 Lv.${level} (-${level})`); } if (cardDef.effectTag === 'shonbenHalf' && loserHand?.type === 'ションベン' && !giveUpEyeUsedThisTurn) { const reduction = 0.5; multiplierBonus -= reduction; console.log(`Card Effect: ションベン軽減 Lv.${level} (-${reduction.toFixed(1)})`); } }); const giveUpCard = playerCards.find(c => c.id === 'giveUpEye'); if (loserHand?.type === 'ションベン' && giveUpEyeUsedThisTurn && giveUpCard && giveUpCard.level >= 2) { const reduction = 0.5; multiplierBonus -= reduction; console.log(`Card Effect: 見切り Lv.${giveUpCard.level} 支払い半減 (-${reduction.toFixed(1)})`); } }
                effectiveMultiplier = Math.max(0, baseMultiplier + multiplierBonus); console.log(`Effective Multiplier (Base + Bonus): ${effectiveMultiplier}`);
                streakBonusRate = 0.0; if (pWin && isPlayerParent) { if (consecutiveWins > 0) { streakBonusRate = consecutiveWins * CONSECUTIVE_WIN_BONUS_RATE; console.log(`Player Parent Streak Bonus: +${(streakBonusRate * 100).toFixed(0)}% (${consecutiveWins} wins)`); const spiritCard = playerCards.find(c => c.id === 'fightingSpirit'); if (spiritCard) { const level = spiritCard.level; const conditionMet = (level < 3 && playerInitialScore <= npcInitialScore / 2) || (level >= 3 && playerInitialScore <= npcInitialScore); if (conditionMet) { const spiritBonusRate = [0.1, 0.2, 0.3][level - 1]; streakBonusRate += spiritBonusRate; console.log(`Card Effect: 逆境の魂 Lv.${level}適用！ Streak Rate +${spiritBonusRate * 100}%`); } } } } else if (nWin && !isPlayerParent) { if (npcConsecutiveWins > 0) { streakBonusRate = npcConsecutiveWins * CONSECUTIVE_WIN_BONUS_RATE; console.log(`NPC Parent Streak Bonus: +${(streakBonusRate * 100).toFixed(0)}% (${npcConsecutiveWins} wins)`); } }
                streakBonusRate = Math.max(0, streakBonusRate); console.log(`Final Streak Bonus Rate for calculation: +${(streakBonusRate * 100).toFixed(0)}%`);
                paymentRateModifier = 1.0; finalAmount = currentBet * effectiveMultiplier * paymentRateModifier * (1 + streakBonusRate); console.log(`Calculated Amount (Bet * EffMulti * PayMod * (1 + Streak)): ${finalAmount}`);
                sc = 0; if (pWin) { sc = Math.round(finalAmount); } else { const insuranceCard = playerCards.find(card => card.id === 'lossInsurance'); if (insuranceCard) { const level = insuranceCard.level; const insuranceMultiplier = [1.5, 1.3, 1.1][level - 1]; const npcStreakBonusRate = (!isPlayerParent && npcConsecutiveWins > 1) ? (npcConsecutiveWins - 1) * CONSECUTIVE_WIN_BONUS_RATE : 0.0; const finalPaymentWithInsurance = currentBet * insuranceMultiplier * (1 + npcStreakBonusRate); sc = -Math.round(finalPaymentWithInsurance); insuranceApplied = true; console.log(`Card Effect: 一撃保険 Lv.${level} 適用！ Payment Calculation Overridden.`); console.log(` -> Insurance Multiplier: ${insuranceMultiplier}, NPC Streak Rate: ${npcStreakBonusRate * 100}%`); console.log(` -> Final Score Change (Insurance): ${sc}`); } else { sc = -Math.round(finalAmount); insuranceApplied = false; } }
                console.log(`Final Score Change (sc): ${sc}`);
                if(pWin){ msg = loserHand?.type === 'ションベン' ? `${npcName}ションベンで勝利！` : `勝利！ (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; if (isPlayerParent && consecutiveWins > 1) msg += ` (${consecutiveWins}連勝!)`; rClass = 'win'; }
                else { if (giveUpEyeUsedThisTurn) { msg = `見切り使用で敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; } else if (isHifumiLoss) { msg = `ヒフミ扱いで敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; } else if (loserHand?.type === 'ションベン') { msg = "ションベンで敗北..."; } else { msg = `敗北... (${getHandDisplayName(playerHand)} vs ${getHandDisplayName(npcHand)})`; } if (insuranceApplied) { msg += " (一撃保険適用)"; } if (!isPlayerParent && npcConsecutiveWins > 1) msg += ` (${npcName}${npcConsecutiveWins}連勝中...)`; rClass = 'lose'; }
           }
        console.log(`[DEBUG] Final sc value before score update: ${sc}`); const psEnd = Math.max(0, playerInitialScore + sc); const nsEnd = Math.max(0, npcInitialScore - sc); console.log(`[DEBUG] Updating scores: Player ${playerInitialScore} + ${sc} = ${psEnd}, NPC ${npcInitialScore} - ${sc} = ${nsEnd}`); playerScore = psEnd; npcScore = nsEnd; totalScoreChange += sc;

        // キャラクターエリアの揺れアニメーションと勝敗表示
        const playerImageArea = document.querySelector('.character-image-area.player');
        const npcImageArea = document.querySelector('.character-image-area.npc');
        const playerIndicator = playerImageArea ? playerImageArea.querySelector('.win-lose-indicator') : null;
        const npcIndicator = npcImageArea ? npcImageArea.querySelector('.win-lose-indicator') : null;
        const animationDuration = 1500; // 揺れアニメーション時間 (ms)
        const indicatorDisplayDuration = 1200; // インジケーター表示時間
        const indicatorRemoveDelay = indicatorDisplayDuration + 300; // ★ クラス解除までの総遅延時間 (少し余裕を持たせる)

        // デバッグログ強化
        if (!playerIndicator) console.error("Player indicator element NOT FOUND!");
        if (!npcIndicator) console.error("NPC indicator element NOT FOUND!");

        // --- クラスリセット ---
        // ★ 揺れクラスと表示クラスを個別に削除
        if (playerImageArea) {
            playerImageArea.classList.remove('shake-damage', 'shake-happy');
        }
        if (npcImageArea) {
            npcImageArea.classList.remove('shake-damage', 'shake-happy');
        }
        if (playerIndicator) {
            playerIndicator.classList.remove('indicator-win', 'indicator-lose');
            playerIndicator.textContent = ''; // テキストもクリア
        }
        if (npcIndicator) {
            npcIndicator.classList.remove('indicator-win', 'indicator-lose');
            npcIndicator.textContent = ''; // テキストもクリア
        }

        // --- スコアに応じたクラス付与 ---
        if (sc > 0 || (pWin && !draw)) { // プレイヤーWIN
            console.log("Applying WIN effects");
            if (playerImageArea) playerImageArea.classList.add('shake-happy');
            if (playerIndicator) {
                playerIndicator.textContent = "WIN!";
                playerIndicator.classList.add('indicator-win');
                console.log("Player indicator class added:", playerIndicator.className);
                // ★ クラス解除をclassList.removeで、遅延後に実行
                setTimeout(() => {
                    if (playerIndicator) {
                         playerIndicator.classList.remove('indicator-win');
                         playerIndicator.textContent = ''; // テキストもクリア
                         console.log("Player WIN indicator removed.");
                    }
                }, indicatorRemoveDelay);
            }
            if (npcImageArea) npcImageArea.classList.add('shake-damage');
            if (npcIndicator) {
                npcIndicator.textContent = "LOSE...";
                npcIndicator.classList.add('indicator-lose');
                console.log("NPC indicator class added:", npcIndicator.className);
                // ★ クラス解除をclassList.removeで、遅延後に実行
                setTimeout(() => {
                    if (npcIndicator) {
                         npcIndicator.classList.remove('indicator-lose');
                         npcIndicator.textContent = ''; // テキストもクリア
                         console.log("NPC LOSE indicator removed.");
                    }
                }, indicatorRemoveDelay);
            }
        } else if (sc < 0 || (nWin && !draw)) { // プレイヤーLOSE
             console.log("Applying LOSE effects");
            if (playerImageArea) playerImageArea.classList.add('shake-damage');
            if (playerIndicator) {
                playerIndicator.textContent = "LOSE...";
                playerIndicator.classList.add('indicator-lose');
                console.log("Player indicator class added:", playerIndicator.className);
                // ★ クラス解除をclassList.removeで、遅延後に実行
                setTimeout(() => {
                    if (playerIndicator) {
                        playerIndicator.classList.remove('indicator-lose');
                        playerIndicator.textContent = ''; // テキストもクリア
                        console.log("Player LOSE indicator removed.");
                    }
                }, indicatorRemoveDelay);
            }
            if (npcImageArea) npcImageArea.classList.add('shake-happy');
            if (npcIndicator) {
                npcIndicator.textContent = "WIN!";
                npcIndicator.classList.add('indicator-win');
                 console.log("NPC indicator class added:", npcIndicator.className);
                 // ★ クラス解除をclassList.removeで、遅延後に実行
                 setTimeout(() => {
                     if (npcIndicator) {
                         npcIndicator.classList.remove('indicator-win');
                         npcIndicator.textContent = ''; // テキストもクリア
                         console.log("NPC WIN indicator removed.");
                     }
                 }, indicatorRemoveDelay);
            }
        } // ★ 引き分け時はクラスを付与しない

        // 揺れアニメーションのリセット (タイミング調整)
        if (playerImageArea && (playerImageArea.classList.contains('shake-happy') || playerImageArea.classList.contains('shake-damage'))) {
             setTimeout(() => {
                 if (playerImageArea) playerImageArea.classList.remove('shake-happy', 'shake-damage')
             }, animationDuration);
        }
        if (npcImageArea && (npcImageArea.classList.contains('shake-happy') || npcImageArea.classList.contains('shake-damage'))) {
             setTimeout(() => {
                  if (npcImageArea) npcImageArea.classList.remove('shake-happy', 'shake-damage')
             }, animationDuration);
        }
        // スコア表示更新とポップアップ
        if (sc !== 0) { showScoreChangePopup(playerScoreContainer, sc); showScoreChangePopup(npcScoreContainer, -sc); }
        animateScore(playerScoreEl, playerInitialScore, psEnd, SCORE_ANIMATION_DURATION);
        animateScore(npcScoreEl, npcInitialScore, nsEnd, SCORE_ANIMATION_DURATION);

        addHistoryEntry({ wave: currentWave, round: currentRoundInWave, playerDice: playerDice.join(','), playerHandName: getHandDisplayName(playerHand), npcDice: npcDice.join(','), npcHandName: getHandDisplayName(npcHand), result: rClass, scoreChange: sc, betAmount: currentBet, consecutiveWins: isPlayerParent ? consecutiveWins : 0, npcConsecutiveWins: !isPlayerParent ? npcConsecutiveWins : 0, parentBefore: parentBefore });

        // メッセージ表示とゲーム終了チェック
        // ★ ここの遅延もクラス解除タイミングと合わせる
        setTimeout(() => {
            let finalMsg = `${msg} ${sc !== 0 ? (sc > 0 ? `+${sc}` : sc) + '点' : ''}`; if (parentChanged) { finalMsg += ` 親交代！ 次は${isPlayerParent ? playerName : npcName}が親です。`; } else if (parentKeptByCard) { finalMsg += ` (${playerName}が親権維持発動！)`; } setMessage(finalMsg);
            if (giveUpEyeUsedThisTurn) { giveUpEyeUsedThisTurn = false; console.log("Resetting giveUpEyeUsedThisTurn flag after round end processing."); }
            updateUI();
            checkGameEnd(); // ゲーム終了チェック or 次のベットフェーズへ
        }, Math.max(SCORE_ANIMATION_DURATION, indicatorRemoveDelay) + 100); // ★ indicatorRemoveDelay を基準に変更
    } // <-- handleRoundEnd 関数の終了

    async function checkGameEnd() {
        let isGO = false, isC = false, gameOverReason = "";
        console.log(`Checking game end: Player Score=${playerScore}, NPC Score=${npcScore}, Wave=${currentWave}, CurrentMinBet=${currentMinBet}`);
        if (npcScore <= 0) { defeatedCount++; const earnedCoins = calculateEarnedCoins(); calculateAndAwardCoins(); gameOverReason = `${currentNpcCharacter?.name || '相手'}の持ち点を0にしました！`; addHistoryEntry({ wave: currentWave, round: currentRoundInWave, result: 'clear', scoreChange: earnedCoins, isWaveClear: true, earnedCoins: earnedCoins, message: `${gameOverReason} コイン ${earnedCoins} G獲得！` }); if (gameMode === 'normal' && currentWave >= MAX_WAVES) { isC = true; await showGameResultModal(true, gameOverReason); } else if (gameMode === 'endless' || currentWave < MAX_WAVES) { console.log("NPC defeated, proceeding to shop."); await showGameResultModal(true, gameOverReason); setMessage(`${gameOverReason} コイン ${earnedCoins} G獲得！ ショップへどうぞ！`); updateUI(); if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'flex'; historyButton.disabled = true; return; } }
        else if (playerScore <= 0) { isGO = true; gameOverReason = "持ち点が0になりました。"; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && isPlayerParent) { isGO = true; gameOverReason = `持ち点(${playerScore}点)が最低賭け金(${currentMinBet}点)未満のため、親で賭けられません。`; await showGameResultModal(false, gameOverReason); }
        else if (playerScore < currentMinBet && !isPlayerParent && npcScore >= currentMinBet) { }
        if (isGO || isC) { console.log(`Game End Triggered: Clear=${isC}, GameOver=${isGO}, Reason=${gameOverReason}`); isGameActive = false; betInput.disabled = true; setBetButton.disabled = true; betAdjustButtons.forEach(btn => btn.disabled = true); rollButton.disabled = true; maxBetButton.disabled = true; minBetButton.disabled = true; historyButton.disabled = false; currentBetInfoEl.textContent = ''; if (betMainControls) betMainControls.style.display = 'none'; if (betActionContainer) betActionContainer.style.display = 'none'; if (actionArea) actionArea.style.display = 'none'; if (nextWaveArea) nextWaveArea.style.display = 'none'; showResultScreen(isC, playerScore, currentWave, gameOverReason); }
        else { console.log("Round end, continuing game."); if (!isGameActive && !waitingForPlayerActionAfterRoll && !isShowingRoleResult && !isShowingGameResult) { setTimeout(startBettingPhase, 100); } }
    }

    function calculateEarnedCoins() {
        const waveBonus = currentWave * 20; const defeatBonus = 80; const scoreGainInWave = Math.max(0, playerScore - scoreAtWaveStart); const scoreGainBonus = Math.min(30, Math.floor(scoreGainInWave * 0.05)); const overkillBonus = npcScore < 0 ? Math.min(50, Math.floor(Math.abs(npcScore) * 0.2)) : 0; const roundsTaken = Math.max(1, currentRoundInWave); const roundPenalty = Math.max(0, (roundsTaken - 1) * 20); const baseEarned = waveBonus + defeatBonus + scoreGainBonus + overkillBonus - roundPenalty; const earned = Math.min(300, Math.max(10, baseEarned)); console.log(`Coin Calculation: Wave=${currentWave}, Rounds=${roundsTaken}, ScoreAtStart=${scoreAtWaveStart}, ScoreNow=${playerScore}, Gain=${scoreGainInWave}, WaveBonus=${waveBonus}, DefeatBonus=${defeatBonus}, ScoreGainBonus=${scoreGainBonus}, OverkillBonus=${overkillBonus}, RoundPenalty=${roundPenalty}, BaseEarned=${baseEarned}, FinalEarned=${earned}`); return earned;
    }

    function calculateAndAwardCoins() { const earned = calculateEarnedCoins(); if (earned <= 0) return; const startCoins = playerCoins; playerCoins += earned; console.log(`Awarded ${earned} coins. Total coins: ${playerCoins}`); playCoinAnimation(earned); animateScore(gameCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); if (shopCoinDisplayEl) { animateScore(shopCoinDisplayEl, startCoins, playerCoins, COIN_ANIMATION_DURATION); } }
    // playCoinAnimation 関数
function playCoinAnimation(amount) {
    if (typeof amount !== 'number' || amount <= 0 || !gameCoinDisplayEl) return;

    const numCoins = Math.min(20, Math.max(5, Math.floor(amount / 10))); // 表示するコイン数

    // ★ ターゲット要素 (#game-coin-display) の位置を取得
    const targetRect = gameCoinDisplayEl.getBoundingClientRect();
    // ★ 要素が見つからない、または非表示の場合は処理中断
    if (!targetRect || targetRect.width === 0 || targetRect.height === 0) {
        console.warn("Coin animation target element not found or not visible.");
        return;
    }
    const targetX = targetRect.left + targetRect.width / 2 + window.scrollX; // ★ スクロール位置を考慮
    const targetY = targetRect.top + targetRect.height / 2 + window.scrollY; // ★ スクロール位置を考慮

    for (let i = 0; i < numCoins; i++) {
        const coin = document.createElement('div');
        coin.className = 'coin-animation';
        // 開始位置を画面中央付近にランダムに設定
        const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 150 + window.scrollX;
        const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 150 + window.scrollY;
        coin.style.left = `${startX}px`;
        coin.style.top = `${startY}px`;

        // 移動先の座標をCSS変数として設定
        const deltaX = targetX - startX;
        const deltaY = targetY - startY;
        coin.style.setProperty('--tx', `${deltaX}px`);
        coin.style.setProperty('--ty', `${deltaY}px`);

        coin.style.animationDelay = `${Math.random() * 0.4}s`; // 開始タイミングをずらす
        document.body.appendChild(coin); // body直下に追加
        // アニメーション終了後に要素を削除
        coin.addEventListener('animationend', () => {
            if (coin.parentNode) {
                coin.remove();
            }
        }, { once: true });
    }
}

    function showResultScreen(isClear, currentScore, wave, reason = "") {
        if (gameMode === 'endless' && !isClear) { resultTitleEl.textContent = "エンドレスモード 終了"; resultTitleEl.className = 'over'; resultMessageEl.textContent = `到達 WAVE: ${wave}. ${reason}`; }
        else { resultTitleEl.textContent = isClear ? "ゲームクリア！" : "ゲームオーバー"; resultTitleEl.className = isClear ? 'clear' : 'over'; resultMessageEl.textContent = isClear ? `祝！ 全${MAX_WAVES}WAVE制覇！` : `残念！ WAVE ${wave} で敗北... ${reason}`; }
        let finalCalcScore = 0; const coinBonus = playerCoins * 3; const clearBonus = (gameMode === 'normal' && isClear) ? MAX_WAVES * 100 : 0; const waveBonusEndless = (gameMode === 'endless') ? (wave -1) * 50 : 0; finalCalcScore = Math.max(0, totalScoreChange + coinBonus + clearBonus + waveBonusEndless); finalScoreEl.textContent = `最終スコア: ${finalCalcScore}`; showScreen('result-screen');
    }

     function addHistoryEntry(entry) { entry.npcName = currentNpcCharacter?.name || 'NPC不明'; gameHistory.push(entry); console.log("History entry added:", entry); }
     function displayHistory() {
        historyLogEl.innerHTML = ''; if (gameHistory.length === 0) { historyLogEl.innerHTML = '<li>履歴なし</li>'; return; }
        [...gameHistory].reverse().forEach(e => {
            const li = document.createElement('li'); li.className = e.result || 'unknown'; const isClearEntry = e.result === 'clear' || e.isWaveClear;
            if (isClearEntry && e.message) { li.innerHTML = `<div class="wave-clear-info">${e.message}</div>`; }
            else if (!isClearEntry || (isClearEntry && e.earnedCoins !== undefined)) { if (isClearEntry) { li.innerHTML = `<div class="wave-clear-info">WAVE ${e.wave} クリア！ コイン ${e.earnedCoins} G獲得！</div>`; } else { let resultText = ''; let resultClass = ''; if (e.result === 'win') { resultText = '勝ち'; resultClass = 'history-win'; } else if (e.result === 'lose') { resultText = '負け'; resultClass = 'history-lose'; } else { resultText = '引き分け'; resultClass = 'history-draw'; } const scoreStr = e.scoreChange !== 0 ? ` (<span class="${e.scoreChange > 0 ? 'gain' : 'loss'}">${e.scoreChange > 0 ? '+' : ''}${e.scoreChange}</span>)` : ''; const winStreakStr = e.consecutiveWins > 1 ? ` <span class="win-streak">(${e.consecutiveWins}連勝)</span>` : ''; const npcWinStreakStr = e.npcConsecutiveWins > 1 ? ` <span class="npc-losing-streak">(${e.npcName || '相手'}${e.npcConsecutiveWins}連勝中...)</span>` : ''; const parentName = e.parentBefore === 'Player' ? (playerName || selectedCharacter?.name || 'あなた') : (e.npcName || 'NPC不明'); const parentStr = e.parentBefore ? `<span class="parent-info">(親: ${parentName})</span>` : ''; const betStr = e.betAmount > 0 ? `<span class="bet-amount">賭け金: ${e.betAmount}</span>` : ''; const playerNameForHistory = playerName || selectedCharacter?.name || 'あなた'; const npcNameForHistory = e.npcName || 'NPC不明'; li.innerHTML = ` <span class="wave-num"><span class="wave-highlight">WAVE ${e.wave}</span> - <span class="round-normal">ROUND ${e.round}</span> ${parentStr}</span> <div class="details"> <div><span class="history-result ${resultClass}">${resultText}</span> ${playerNameForHistory}: ${e.playerDice || '-'} <span class="hand">${e.playerHandName || '-'}</span></div> <div class="npc-history">${npcNameForHistory}: ${e.npcDice || '-'} <span class="hand">${e.npcHandName || '-'}</span> ${betStr}</div> </div> <div class="score-change-history">${scoreStr}${winStreakStr}${npcWinStreakStr}</div> `; } }
            else { console.warn("Skipping history entry due to missing/unexpected data:", e); li.innerHTML = `<span class="wave-num">WAVE ${e.wave} - ROUND ${e.round}</span> <div>履歴データエラー</div>`; li.style.color = 'red'; li.style.borderLeftColor = 'red'; }
            historyLogEl.appendChild(li);
        });
    }

    function generateSettingsCardListHtml() {
        const settingsListContainer = document.getElementById('settings-card-list-inner');
        if (!settingsListContainer) {
             console.error("Element #settings-card-list-inner not found in generateSettingsCardListHtml!");
             return; // コンテナがない場合は処理中断
        }
        settingsListContainer.innerHTML = ''; // 内容をクリア

        // 親コンテナにデフォルトのフィルタクラスを設定
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
            // ★ カードタイプに応じてクラスを追加
            const isCardActive = !!card.usesPerWave;
            const cardTypeClass = isCardActive ? 'card-type-active' : 'card-type-passive';
            item.className = `card-list-item ${cardTypeClass}`; // タイプクラスを追加

            const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
            const typeName = getCardTypeName(card.type);
            const typeCssClass = `type-${card.type}`; // CSSでのタイプ色分け用クラス
            const rarityCssClass = `rarity-${['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal'}`; // CSSでのレアリティ色分け用クラス

            // レベル別説明
            let effectDetailsHtml = '';
            for (let level = 1; level <= MAX_CARD_LEVEL; level++) {
                effectDetailsHtml += `<div class="effect-level-title"><strong>Lv.${level}:</strong></div>`;
                const desc = getUpgradeDescription(card, level); // ★ 説明文取得
                effectDetailsHtml += `<div class="effect-level-description">${desc}</div>`; // ★ そのままHTMLに入れる
                 // ★ フォントサイズ調整用のプレーンテキストも保持 (後で使う)
                item.dataset[`level${level}DescText`] = desc.replace(/<[^>]*>?/gm, '');
            }

            // item の innerHTML を設定 (CSSクラス名を修正)
            item.innerHTML = `
                <h3> ${card.name} <span class="card-meta"><span class="${typeCssClass}">${typeName}</span> <span class="${rarityCssClass}">★${rarityText}</span></span> </h3>
                <p class="flavor-text">${card.flavor || '---'}</p>
                <div class="effect-details">
                    ${effectDetailsHtml}
                </div>`;

            // ★ ループ外でフォントサイズ調整を実行
            const effectDescElements = item.querySelectorAll('.effect-level-description');
             effectDescElements.forEach((descEl, index) => {
                 const level = index + 1;
                 const textToMeasure = item.dataset[`level${level}DescText`] || descEl.textContent;
                 adjustDescriptionFontSize(descEl, textToMeasure);
             });

            settingsListContainer.appendChild(item);
        });
        console.log("Generated settings card list with type classes and adjusted font sizes.");
    }

    // 設定ボタンのイベントリスナーを修正
    if (settingsButton && settingsModal) {
        settingsButton.addEventListener('click', () => {
            if (cardActionModal && cardActionModal.style.display === 'flex') { cardActionModal.style.display = 'none'; }
            if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; }
            settingsModal.style.display = 'flex';
            switchSettingsTab('rules');
        });
    }
    if (closeSettingsModalButton && settingsModal) {
        closeSettingsModalButton.addEventListener('click', () => { settingsModal.style.display = 'none'; });
    }
    window.addEventListener('click', (event) => {
        if (settingsModal && event.target === settingsModal) { settingsModal.style.display = 'none'; }
        if (historyModal && event.target === historyModal) { historyModal.style.display = 'none'; }
        if (discardModal && event.target === discardModal) { cancelDiscard(); }
        if (diceChoiceOverlay && event.target === diceChoiceOverlay) { hideDiceChoiceOverlay(); }
        if (cardActionModal && event.target === cardActionModal && !event.target.closest('.card-action-item')) { // ★ モーダル背景クリック時のみ閉じる
            cardActionModal.style.display = 'none';
             // ★ 開いているカード表示をリセット
             const allCardItems = cardActionModal.querySelectorAll('.card-action-item[data-display-state="uses"]');
             allCardItems.forEach(item => item.dataset.displayState = 'description');
            if (waitingForPlayerActionAfterRoll) {
                setMessageAfterActionCancel(); // ★ 引数なしで呼び出し
            }
       }
        if (itemRevealModal && event.target === itemRevealModal) { itemRevealModal.style.display = 'none'; }
    });

    settingsNavButtons.forEach(button => {
        if (button.dataset.target) {
            button.addEventListener('click', () => { switchSettingsTab(button.dataset.target); });
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

    const filterTabContainer = document.querySelector('.card-list-filter-tabs');
    if (filterTabContainer) {
        filterTabContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('filter-tab')) {
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

    function openCardActionModal() {
        if (!cardActionModal) { console.error("Element #card-action-modal not found!"); return; }
        if (settingsModal && settingsModal.style.display === 'flex') { settingsModal.style.display = 'none'; }
        if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; }
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

        // ★ メッセージ更新 (クリック操作の説明追加)
        activeCardMessage.textContent = "使用したいカードを選択 (クリックで詳細/回数切替)";

        activeCardDisplay.innerHTML = ''; passiveCardDisplay.innerHTML = ''; activeCardDisplay.classList.remove('empty'); passiveCardDisplay.classList.remove('empty');
        let activeCards = []; let passiveCards = [];
        playerCards.forEach(cardData => { const card = allCards.find(c => c.id === cardData.id); if (!card) return; const isCardActive = !!card.usesPerWave; if (isCardActive) { activeCards.push(cardData); } else { passiveCards.push(cardData); } });

        let usableActiveCardFound = false;
        if (activeCards.length === 0) {
            activeCardMessage.textContent = "使用可能なカードはありません。"; // メッセージ上書き
            activeCardDisplay.classList.add('empty');
            activeCardDisplay.textContent = "(手札にアクティブカードがありません)";
        } else {
            activeCards.forEach(cardData => {
                const card = allCards.find(c => c.id === cardData.id);
                const cardElement = document.createElement('div');
                const rarityClass = ['normal', 'rare', 'epic', 'legendary'][card.rarity - 1] || 'normal';
                cardElement.className = `card-action-item type-${card.type} rarity-${rarityClass}`;
                cardElement.dataset.cardId = cardData.id;
                cardElement.dataset.displayState = 'description'; // ★ 初期状態は説明表示

                const isUsable = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardData.id) : checkCardUsability(cardData.id);
                const remainingUses = getRemainingUses(cardData.id);
                const totalUses = getTotalUses(cardData.id);
                let usesHtml = '';
                if (totalUses !== Infinity) { // 無限でない場合のみ回数表示要素を作成
                    usesHtml = `<div class="card-action-uses">残 ${remainingUses} / ${totalUses} 回</div>`;
                }

                let buttonHtml = `<button class="use-card-button button-pop" data-card-id="${cardData.id}" ${!isUsable ? 'disabled' : ''}>使用</button>`;
                if (remainingUses <= 0 && totalUses !== Infinity) {
                    cardElement.classList.add('used-up');
                    buttonHtml = ''; // 使用済みならボタン非表示
                    usesHtml = `<div class="card-action-uses" style="display: flex;">使用済み</div>`; // 使用済み表示を常時表示
                } else if (isUsable) {
                    cardElement.classList.add('usable');
                    usableActiveCardFound = true;
                } else {
                    // 使用不可だが使用回数が残っている場合 (ボタンはdisabledになる)
                }

                const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
                const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
                const currentLevel = cardData.level;
                const levelColorClass = currentLevel === 3 ? 'card-level-value-3' : (currentLevel === 2 ? 'card-level-value-2' : '');
                let levelSpanHtml = `<span class="card-level ${levelColorClass}">[Lv.${currentLevel}]</span>`;
                const cardNameHtml = `${card.name}`;
                const cardDescriptionHtml = getUpgradeDescription(card, cardData.level); // ★ 説明文取得
                const cardInnerHtml = `
                    <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                    ${rarityBadgeHtml}
                    <h3 class="card-name">${cardNameHtml}</h3>
                    ${levelSpanHtml}
                    <p class="card-description">${cardDescriptionHtml}</p>
                    ${usesHtml}
                    ${buttonHtml}`;
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                // ★ フォントサイズ調整の呼び出しを追加
                const descElModal = cardElement.querySelector('.card-description');
                const rawDescription = cardDescriptionHtml.replace(/<[^>]*>?/gm, ''); // タグ除去
                if(descElModal) adjustDescriptionFontSize(descElModal, rawDescription);

                // ★ クリックイベントリスナーを追加 (使用済みカード以外)
                if (!cardElement.classList.contains('used-up')) {
                    cardElement.addEventListener('click', (e) => {
                        // ボタンクリックの場合は何もしない
                        if (e.target.closest('.use-card-button')) return;

                        // クリックされたカード以外の表示をリセット
                        activeCardDisplay.querySelectorAll('.card-action-item[data-display-state="uses"]').forEach(item => {
                            if (item !== cardElement) {
                                item.dataset.displayState = 'description';
                            }
                        });

                        // クリックされたカードの表示状態を切り替え
                        const currentState = cardElement.dataset.displayState;
                        cardElement.dataset.displayState = (currentState === 'description') ? 'uses' : 'description';
                    });
                }

                activeCardDisplay.appendChild(cardElement);
            });
            if (!usableActiveCardFound && activeCards.length > 0) { // ★ 使用可能カードがない場合のメッセージ
                 activeCardMessage.textContent = "現在使用できるカードはありません。(クリックで回数確認)";
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
                const usesHtml = `<div class="card-action-uses"><span class="passive-status">装備中</span></div>`; // ★ style削除
                const buttonHtml = ''; // パッシブにはボタンなし
                const rarityText = ['N', 'R', 'EP', 'LG'][card.rarity - 1] || 'N';
                const rarityBadgeHtml = `<span class="card-rarity-badge">${rarityText}</span>`;
                const currentLevel = cardData.level;
                const levelColorClass = currentLevel === 3 ? 'card-level-value-3' : (currentLevel === 2 ? 'card-level-value-2' : '');
                let levelSpanHtml = `<span class="card-level ${levelColorClass}">[Lv.${currentLevel}]</span>`;
                const cardNameHtml = `${card.name}`;
                const cardDescriptionHtml = getUpgradeDescription(card, cardData.level); // ★ 説明文取得
                const cardInnerHtml = `
                    <span class="card-type-badge">${getCardTypeName(card.type)}</span>
                    ${rarityBadgeHtml}
                    <h3 class="card-name">${cardNameHtml}</h3>
                    ${levelSpanHtml}
                    <p class="card-description">${cardDescriptionHtml}</p>
                    ${usesHtml}`; // ★ ボタンHTML削除
                cardElement.innerHTML = cardInnerHtml;
                if (card.image) {
                    cardElement.style.backgroundImage = `url('${card.image}')`;
                    cardElement.style.backgroundSize = 'cover';
                    cardElement.style.backgroundPosition = 'center';
                }

                // ★ フォントサイズ調整の呼び出しを追加
                const descElPassive = cardElement.querySelector('.card-description');
                const rawDescPassive = cardDescriptionHtml.replace(/<[^>]*>?/gm, '');
                if(descElPassive) adjustDescriptionFontSize(descElPassive, rawDescPassive);

                passiveCardDisplay.appendChild(cardElement);
            });
        }
    } // <-- displayCardsInModal 関数の終了

    if (closeCardActionModalButton && cardActionModal) {
        closeCardActionModalButton.addEventListener('click', () => {
            cardActionModal.style.display = 'none';
             // ★ 開いているカード表示をリセット
             const allCardItems = cardActionModal.querySelectorAll('.card-action-item[data-display-state="uses"]');
             allCardItems.forEach(item => item.dataset.displayState = 'description');
            if (waitingForPlayerActionAfterRoll) {
                 setMessageAfterActionCancel(); // ★ 引数なしで呼び出し
            }
        });
    }

    // ★ カードモーダルの中身に対するクリックイベントを追加（カード外クリック時のリセット用）
    if (cardActionModalContent) {
        cardActionModalContent.addEventListener('click', (event) => {
             // クリックがカードアイテム自身やその子要素でない場合
             if (!event.target.closest('.card-action-item')) {
                  const displayedUsesCards = cardActionModalContent.querySelectorAll('.card-action-item[data-display-state="uses"]');
                  displayedUsesCards.forEach(card => {
                       card.dataset.displayState = 'description';
                  });
             }
        });
    }


    const activeCardDisplayForEvent = document.getElementById('active-card-display');
    if(activeCardDisplayForEvent) {
        activeCardDisplayForEvent.addEventListener('click', async (event) => {
            // ボタン自身がクリックされた場合のみ処理
            if (event.target.matches('.use-card-button:not(:disabled)')) {
                 const cardId = event.target.dataset.cardId;
                 if (cardId) {
                      cardActionModal.style.display = 'none';
                      // ★ 開いているカード表示をリセット
                      const allCardItems = cardActionModal.querySelectorAll('.card-action-item[data-display-state="uses"]');
                      allCardItems.forEach(item => item.dataset.displayState = 'description');
                      await handleActiveCardUse(cardId);
                 }
             }
        });
    }

    if (cardActionButton) {
        cardActionButton.addEventListener('click', () => { if (settingsModal && settingsModal.style.display === 'flex') { settingsModal.style.display = 'none'; } if (historyModal && historyModal.style.display === 'flex') { historyModal.style.display = 'none'; } openCardActionModal(); });
    }

     // === アクティブカード使用処理 ===
    async function handleActiveCardUse(eventOrCardId) { // ★ 引数を eventOrCardId に変更
        let cardId = null;
        if (typeof eventOrCardId === 'string') {
            cardId = eventOrCardId;
        } else if (eventOrCardId && eventOrCardId.currentTarget && eventOrCardId.currentTarget.dataset.cardId) {
            cardId = eventOrCardId.currentTarget.dataset.cardId;
        } else {
            console.error("Invalid event or cardId passed to handleActiveCardUse", eventOrCardId);
            return;
        }

        const playerCardData = playerCards.find(c => c.id === cardId);
        const isUsableNow = waitingForPlayerActionAfterRoll ? checkCardUsabilityInPostRoll(cardId) : checkCardUsability(cardId);

        if (!playerCardData || activeCardBeingUsed || waitingForUserChoice || !isUsableNow || isShowingRoleResult || isShowingGameResult) { // ★ isShowingGameResult も追加
            console.log(`Card ${cardId} cannot be used now. Active: ${activeCardBeingUsed}, WaitingChoice: ${waitingForUserChoice}, UsableNow: ${isUsableNow}, ShowingRoleResult: ${isShowingRoleResult}, ShowingGameResult: ${isShowingGameResult}`);
            if (waitingForPlayerActionAfterRoll && cardActionModal && cardActionModal.style.display === 'none' && !isShowingRoleResult && !isShowingGameResult) {
                 // ★setMessage("現在そのカードは使用できません。どうしますか？", 'postRollChoice'); // メッセージ重複する場合があるのでコメントアウト
                 // updateCardButtonHighlight();
            }
             activeCardBeingUsed = null;
            return;
        }
        const card = allCards.find(c => c.id === cardId); if (!card) return;

        console.log(`Attempting to use card: ${card.name} (Lv.${playerCardData.level})`);
        activeCardBeingUsed = cardId; // ★ カード使用開始時にロック

        // アクティブカードの使用回数を記録する（ダブルアップ、報酬増幅用）
        if (cardId === 'doubleUpBet') activeCardUses['doubleUpBet_roundStartCount'] = activeCardUses['doubleUpBet'] || 0;
        if (cardId === 'rewardAmplifier') activeCardUses['rewardAmplifier_roundStartCount'] = activeCardUses['rewardAmplifier'] || 0;

        let useConsumed = true; // デフォルトで使用回数を消費する
        let requiresDelay = false; // メッセージ表示後の待機が必要か
        let turnEnd = false; // カード使用後に即座に勝敗判定に移るか
        let postUseMessage = ""; // カード使用後のメッセージ
        let requiresRoll = false; // カード使用後にロールが必要か (魂の一振りなど)
        let requiresNPCAction = false; // 相手のターンに移行するか (目くらましなど)
        let requiresPlayerAction = false; // スキップ/カード選択に戻るか

        // --- カード効果分岐 ---
        if (['changeToOne', 'changeToSix', 'adjustEye', 'nextChance'].includes(cardId)) {
            showDiceChoiceOverlay(cardId); // ダイス選択へ
            useConsumed = false; // ダイス選択完了時に消費
            return; // ダイス選択待ちのためここで処理終了
        }
        // (他のカード効果処理...)
        else if (cardId === 'ignoreMinBet') { ignoreMinBetActive = true; postUseMessage = `最低賭け金が1になりました。`; requiresDelay = true; }
        else if (cardId === 'zoroChanceUp') { zoroChanceUpActive = true; postUseMessage = `このラウンド中、ゾロ目確率UP！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'avoid123_456') { avoid123_456Active = true; postUseMessage = `このラウンド中、役回避！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'blessingDice') { blessingDiceActive = true; postUseMessage = `このラウンド中、6が出やすくなります。`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'stormWarning') { stormWarningActive = true; postUseMessage = `次のロールで${playerCardData.level >= 3 ? 'アラシ/ピンゾロ' : 'アラシ'}以外なら無料振り直し！`; requiresDelay = true; requiresRoll = true; }
        else if (cardId === 'riskyBet') { riskyBetActive = true; postUseMessage = `危険な賭け！賭け金決定時に効果が適用されます。`; requiresDelay = true; }
        else if (cardId === 'giveUpEye') {
            playerHand = { ...ROLES.SHONBEN, type: 'ションベン' }; giveUpEyeUsedThisTurn = true; useConsumed = true; turnEnd = true; // 勝敗判定へ
            postUseMessage = `見切り使用！ションベン扱いになります。`; updateUI(); highlightHand(playerHandEl, playerHand); rollButton.disabled = true; isPlayerTurn = false;
        }
        else if (cardId === 'doubleUpBet') { doubleUpBetActive = true; useConsumed = true; turnEnd = true; postUseMessage = "ダブルアップ準備完了！勝負！"; requiresDelay = true; }
        else if (cardId === 'blindingDice') { blindingDiceActive = true; requiresDelay = true; requiresNPCAction = true; postUseMessage = `目くらまし！このラウンド中、相手のロールに影響します。`; }
        else if (cardId === 'soulRoll') {
             const costPercent = [10, 5, 5][playerCardData.level - 1]; const cost = Math.max(1, Math.floor(playerScore * (costPercent / 100)));
             if (playerScore < cost) { postUseMessage = `魂の一振りのコスト(${cost}点)を払えません！`; useConsumed = false; }
             else { playerScore -= cost; soulRollUsedThisTurn = true; postUseMessage = `魂の一振り！${cost}点を消費して追加ロール！ サイコロを振ってください。`; requiresRoll = true; updateUI(); }
        }
        else if (cardId === 'rewardAmplifier') { rewardAmplifierActive = true; turnEnd = true; postUseMessage = `報酬増幅！このラウンドの役での勝利時、配当倍率が増加します。`; requiresDelay = true; }
        else if (cardId === 'drawBonus') { drawBonusActive = true; turnEnd = true; postUseMessage = `引き分けボーナス準備完了！このラウンド引き分け時に効果発動。`; requiresDelay = true; useConsumed = false; /* 効果発動時に消費 */ }
        else { console.warn(`Active card effect for ${cardId} is not fully implemented yet.`); postUseMessage = `カード「${card.name}」の効果処理が未実装です。`; useConsumed = false; }

        // --- 処理分岐前の共通処理 ---
        // 使用回数カウント
        if (useConsumed && card.usesPerWave && cardId !== 'drawBonus') {
            activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1;
            postUseMessage += ` (残${getRemainingUses(cardId)}/${getTotalUses(cardId)})`;
            console.log(`Used card ${cardId}. Remaining uses: ${getRemainingUses(cardId)}`);
        }

        // --- 処理分岐 ---
        // ロール後の処理 (カード使用後に状態が変化した場合)
        if (waitingForPlayerActionAfterRoll && useConsumed) {
            waitingForPlayerActionAfterRoll = false; // 操作待ち解除
            messageButtonContainer.innerHTML = ''; // ボタン削除
        }

        setMessage(postUseMessage); // メッセージ表示
        if (requiresDelay) await new Promise(resolve => setTimeout(resolve, 800)); // 遅延

        activeCardBeingUsed = null; // ★ カード使用完了時にロック解除

        if (turnEnd) { // 勝敗判定へ
            rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
            // 役/目モーダル表示 (必要なら)
            if (playerHand && playerHand.type !== '目なし' && playerHand.type !== 'ションベン') {
                await showRoleResultModal(playerHand, playerDice);
            }
            setMessage(postUseMessage + (cardId === 'giveUpEye' ? " 負けです。" : " 勝負！"));
            setTimeout(handleRoundEnd, 100);
        } else if (requiresNPCAction) { // 相手ターンへ
            rollButton.disabled = true; historyButton.disabled = false; isPlayerTurn = false;
            setMessage(postUseMessage + ` ${currentNpcCharacter?.name || '相手'}の番です。`);
            setTimeout(npcTurn, 1400);
        } else if (requiresRoll) { // 再度ロールを促す
            rollButton.disabled = false; historyButton.disabled = false; isPlayerTurn = true; // プレイヤーのターン継続
            // (魂の一振り以外は) ロール前の使用なので、メッセージはロールを促す形に
            if (cardId !== 'soulRoll') { setMessage(postUseMessage + " サイコロを振ってください。"); }
        } else if (useConsumed) { // カード使用は完了したが、ターン継続/勝敗判定ではない (ロール後のアクションに戻る場合など)
            const handName = getHandDisplayName(playerHand);
            const canReroll = playerRollCount < currentMaxRolls;
            const hasStormWarningReroll = stormWarningRerollsLeft > 0;
            const soulRollAvailable = playerCards.find(c => c.id === 'soulRoll') && playerRollCount >= currentMaxRolls && !soulRollUsedThisTurn && getRemainingUses('soulRoll') > 0;
            const hasMorePostRollCards = playerCards.some(c => checkCardUsabilityInPostRoll(c.id));

            if (playerHand && (playerHand.type === '役' || playerHand.type === '目')) {
                 if (hasMorePostRollCards) { // 他に使えるカードがある
                     waitingForPlayerActionAfterRoll = true;
                     rollButton.disabled = true;
                     historyButton.disabled = false;
                     setMessage(`${handName}！どうしますか？`, 'postRollChoice');
                 } else { // 使えるカードがない -> 相手ターン or 勝敗へ
                     isPlayerTurn = false;
                     rollButton.disabled = true;
                     historyButton.disabled = false;
                     if (isPlayerParent) {
                         setMessage(`${handName}！ 自動で${currentNpcCharacter?.name || '相手'}(子)の番です。`);
                         setTimeout(npcTurn, 100);
                     } else {
                         setMessage(`${handName}！ 自動で勝負！`);
                         setTimeout(handleRoundEnd, 100);
                     }
                 }
            } else if (playerHand && playerHand.type === '目なし') {
                 if (canReroll || hasStormWarningReroll || hasMorePostRollCards || (!canReroll && !hasStormWarningReroll && soulRollAvailable)) {
                     waitingForPlayerActionAfterRoll = true;
                     rollButton.disabled = true;
                     historyButton.disabled = false;
                     let rerollStatus = "";
                     if (canReroll || hasStormWarningReroll) rerollStatus = "(振り直し可能)";
                     else if (soulRollAvailable) rerollStatus = "(魂の一振り使用可能)";
                     else rerollStatus = "(振り直し不可)";
                     setMessage(`目なし！どうしますか？ ${rerollStatus}`, 'postRollChoice');
                 } else { // 目なしで何もできない -> ションベン
                     playerHand = { ...ROLES.SHONBEN, type: 'ションベン' };
                     updateUI(); highlightHand(playerHandEl, playerHand);
                     isPlayerTurn = false; rollButton.disabled = true; historyButton.disabled = false;
                     await showRoleResultModal(playerHand, playerDice);
                     setMessage(`ションベン！ 負けです。`);
                     setTimeout(handleRoundEnd, 100);
                 }
            } else { // ベットフェーズでの使用など
                historyButton.disabled = false;
                if (!isGameActive && isPlayerParent) updateBetLimits(); // 賭け金UI更新
            }
        } else if (!useConsumed && cardId !== 'soulRoll') { // コスト不足などで使用キャンセルされた場合など
             historyButton.disabled = false;
             // ロール後のアクション選択に戻る
             if (activeCardBeingUsed === null && waitingForPlayerActionAfterRoll) {
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
                 setMessage(currentStatusMessage, 'postRollChoice');
                 rollButton.disabled = true;
             } else if(!isGameActive && isPlayerParent){
                  updateBetLimits(); // 賭け金UI更新
             }
        }

        // 最後にUI更新
        updateUI();
        updateCardButtonHighlight();
   }


      function checkCardUsability(cardId) {
        const cardData = playerCards.find(c => c.id === cardId); const card = allCards.find(c => c.id === cardId); if (!cardData || !card) return false; if (!card.usesPerWave) return false; const remainingUses = getRemainingUses(cardId); if (remainingUses <= 0) return false; if (activeCardBeingUsed || waitingForUserChoice || waitingForPlayerActionAfterRoll || isShowingRoleResult || isShowingGameResult) return false;
        const isBetPhase = !isGameActive && isPlayerParent && !waitingForPlayerActionAfterRoll; const isPlayerRollPhase = isGameActive && isPlayerTurn && playerRollCount < currentMaxRolls && !waitingForPlayerActionAfterRoll;
        switch (card.id) { case 'ignoreMinBet': return isBetPhase && !ignoreMinBetActive; case 'riskyBet': return isBetPhase && !riskyBetActive; case 'zoroChanceUp': return isPlayerRollPhase && !zoroChanceUpActive; case 'avoid123_456': return isPlayerRollPhase && !avoid123_456Active; case 'blessingDice': return isPlayerRollPhase && !blessingDiceActive; case 'stormWarning': return isPlayerRollPhase && !stormWarningActive; default: return false; }
    }

     function getRemainingUses(cardId) { const cardData = playerCards.find(c => c.id === cardId); const card = allCards.find(c => c.id === cardId); if (!cardData || !card || !card.usesPerWave) return Infinity; const totalUses = getTotalUses(cardId); return totalUses - (activeCardUses[cardId] || 0); }

        function showDiceChoiceOverlay(cardId) { if (!diceChoiceOverlay || isShowingRoleResult || isShowingGameResult) return; const card = allCards.find(c => c.id === cardId); const playerCardData = playerCards.find(c => c.id === cardId); if (!card || !playerCardData) { hideDiceChoiceOverlay(); return; } let title = `${card.name} [Lv.${playerCardData.level}]`; let instruction = ""; let diceIndicesToSelect = []; let requiresAdjustChoice = false; let requiresNextChanceCount = 0; let nextChanceCanSelectTwo = false; if (['changeToOne', 'changeToSix'].includes(cardId)) { instruction = "変更するサイコロを選んでください"; diceIndicesToSelect = [0, 1, 2]; } else if (cardId === 'adjustEye') { if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; return; } instruction = `調整する「${playerHand.value}以外の目」を選んでください`; playerDice.forEach((diceValue, index) => { if (diceValue !== playerHand.value) diceIndicesToSelect.push(index); }); if (diceIndicesToSelect.length > 0) { requiresAdjustChoice = true; } } else if (cardId === 'nextChance') { if (playerHand?.type !== '目') { setMessage("「目」が出ていないため使用できません。"); hideDiceChoiceOverlay(); activeCardBeingUsed = null; return; } nextChanceCanSelectTwo = playerCardData.level >= 2; requiresNextChanceCount = nextChanceCanSelectTwo ? 2 : 1; instruction = `振り直す「${playerHand.value}の目」を${requiresNextChanceCount === 2 ? '最大2つまで' : '1つ'}選んでください`; playerDice.forEach((diceValue, index) => { if (diceValue === playerHand.value) diceIndicesToSelect.push(index); }); } else { hideDiceChoiceOverlay(); return; } diceChoiceOverlay.innerHTML = `<h3>${title}</h3><p>${instruction}</p>`; const buttonContainer = document.createElement('div'); buttonContainer.className = 'dice-choice-buttons'; if (diceIndicesToSelect.length === 0) { buttonContainer.innerHTML = "<p>対象のサイコロがありません。</p>"; } else { diceIndicesToSelect.forEach(index => { const button = document.createElement('button'); button.className = 'dice-choice-button button-pop'; button.textContent = playerDice[index]; button.dataset.diceIndex = index; if (requiresAdjustChoice) { button.onclick = () => showAdjustOptions(index); } else { button.onclick = handleDiceChoice; } buttonContainer.appendChild(button); }); } const cancelButton = document.createElement('button'); cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル'; cancelButton.style.marginTop = '15px'; cancelButton.onclick = hideDiceChoiceOverlay; buttonContainer.appendChild(cancelButton); diceChoiceOverlay.appendChild(buttonContainer); diceChoiceOverlay.style.display = 'flex'; rollButton.disabled = true; historyButton.disabled = true; }
        function showAdjustOptions(diceIndex) { const cardId = activeCardBeingUsed; const playerCardData = playerCards.find(c => c.id === cardId); if (!playerCardData) { hideDiceChoiceOverlay(); return; } const adjustAmount = (playerCardData.level >= 3) ? 2 : 1; const originalValue = playerDice[diceIndex]; diceChoiceOverlay.innerHTML = `<h3>出目調整</h3><p>サイコロ (${originalValue}) をどう調整しますか？</p>`; const buttonContainer = document.createElement('div'); buttonContainer.className = 'dice-choice-buttons'; if (originalValue + adjustAmount <= 6) { const plusButton = document.createElement('button'); plusButton.className = 'dice-choice-button button-pop'; plusButton.textContent = `+${adjustAmount} (→ ${originalValue + adjustAmount})`; plusButton.dataset.diceIndex = diceIndex; plusButton.dataset.adjustDir = 'plus'; plusButton.onclick = handleDiceChoice; buttonContainer.appendChild(plusButton); } if (originalValue - adjustAmount >= 1) { const minusButton = document.createElement('button'); minusButton.className = 'dice-choice-button button-pop'; minusButton.textContent = `-${adjustAmount} (→ ${originalValue - adjustAmount})`; minusButton.dataset.diceIndex = diceIndex; minusButton.dataset.adjustDir = 'minus'; minusButton.onclick = handleDiceChoice; buttonContainer.appendChild(minusButton); } if (buttonContainer.children.length === 0) { buttonContainer.innerHTML = "<p>この目は調整できません。</p>"; } const cancelButton = document.createElement('button'); cancelButton.className = 'button-subtle'; cancelButton.textContent = 'キャンセル'; cancelButton.style.marginTop = '15px'; cancelButton.onclick = hideDiceChoiceOverlay; buttonContainer.appendChild(cancelButton); diceChoiceOverlay.appendChild(buttonContainer); }

        // === hideDiceChoiceOverlay の修正 ===
        function hideDiceChoiceOverlay() {
            if (diceChoiceOverlay) diceChoiceOverlay.style.display = 'none';
            const cancelledCardId = activeCardBeingUsed; // キャンセルされたカードIDを保持
            activeCardBeingUsed = null; // ロック解除

            // ロール後の操作待ち状態だった場合、メッセージとボタンを再表示
            if (cancelledCardId && waitingForPlayerActionAfterRoll) {
                 const cardName = allCards.find(c=>c.id === cancelledCardId)?.name || '不明';
                 setMessageAfterActionCancel(cardName); // ★ メッセージ再表示関数を呼び出す
            } else {
                // ロール後以外でキャンセルされた場合
                 if (!isGameActive) {
                    setMessage("操作をキャンセルしました。");
                    updateBetLimits(); // ベットフェーズならベットUI更新
                }
                historyButton.disabled = false; // 履歴ボタン有効化
            }
            updateCardButtonHighlight(); // カードボタンのハイライト更新
        }

        // ★★★★ 修正依頼1 関連: アクションキャンセル後のメッセージ再表示関数 (新規追加) ★★★★
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
                // 予期しない状況（ションベンなど）でキャンセルされた場合
                messageText += "操作をキャンセルしました。";
            }

            setMessage(messageText, 'postRollChoice'); // メッセージとボタンを再表示
            rollButton.disabled = true; // ロールボタンは無効のまま
            historyButton.disabled = false; // 履歴ボタンは有効
            updateCardButtonHighlight(); // カードボタンのハイライト更新
            updateBetLimits(); // 賭け金関連UI更新
        }

        // === handleDiceChoice の修正 ===
        async function handleDiceChoice(event) {
            const button = event.target; const diceIndex = parseInt(button.dataset.diceIndex); const adjustDir = button.dataset.adjustDir; const cardId = activeCardBeingUsed; const playerCardData = playerCards.find(c => c.id === cardId);
            if (isNaN(diceIndex) || !cardId || !playerCardData || !playerDice || playerDice.length !== 3 || isShowingRoleResult || isShowingGameResult) { console.error("Invalid state for dice choice:", diceIndex, cardId, playerDice, isShowingRoleResult, isShowingGameResult); hideDiceChoiceOverlay(); return; }
            const card = allCards.find(c => c.id === cardId); if (!card) { hideDiceChoiceOverlay(); return; }
            console.log(`Player chose dice index: ${diceIndex} to apply card: ${card.name} (Lv.${playerCardData.level})${adjustDir ? ' Adjust:'+adjustDir : ''}`);

            let newDice = [...playerDice]; let message = ""; let useConsumed = true;
            if (['changeToOne', 'changeToSix'].includes(cardId)) { const newValue = cardId === 'changeToOne' ? 1 : 6; newDice[diceIndex] = newValue; message = `サイコロを ${newValue} に変更しました。`; }
            else if (cardId === 'adjustEye' && adjustDir) { const adjustAmount = (playerCardData.level >= 3) ? 2 : 1; let originalValue = newDice[diceIndex]; let adjustedValue = originalValue; if (adjustDir === 'plus') { adjustedValue = Math.min(6, originalValue + adjustAmount); } else if (adjustDir === 'minus') { adjustedValue = Math.max(1, originalValue - adjustAmount); } if (adjustedValue !== originalValue) { newDice[diceIndex] = adjustedValue; message = `出目を ${originalValue} から ${adjustedValue} に調整しました。`; adjustEyeUsedThisTurn = true; } else { message = "調整しても値が変わりませんでした。"; useConsumed = false; } }
            else if (cardId === 'nextChance') { const originalValue = newDice[diceIndex]; newDice[diceIndex] = rollSingleDice(); message = `サイコロ(${originalValue})を振り直しました。結果: ${newDice[diceIndex]}`; nextChanceUsedThisTurn = true; }
            else { console.error("Unhandled card type in handleDiceChoice:", cardId); hideDiceChoiceOverlay(); return; }

            hideDiceChoiceOverlay(); // ★ 先にオーバーレイを隠す
            activeCardBeingUsed = null; // ★ ロック解除もここで行う

            // 効果が適用されなかった場合はメッセージ表示して終了
            if (!useConsumed) {
                 setMessage(message);
                 setMessageAfterActionCancel(); // ★ 適切なメッセージを再表示
                 return;
            }

            // ダイスと手札を更新
            playerDice = newDice; if(playerDiceEl) playerDiceEl.textContent = playerDice.join(' '); diceDisplayEl.textContent = playerDice.join(' ');
            const result = getHandResult(playerDice, false, 0, 0); const rk = Object.keys(ROLES).find(k => ROLES[k].name === result.name || (result.type === '目' && ROLES[k].name === '目')); playerHand = rk ? { ...ROLES[rk], ...result } : result;
            console.log("Re-evaluated hand:", playerHand); if(playerHandEl) playerHandEl.textContent = getHandDisplayName(playerHand); highlightHand(playerHandEl, playerHand);

            // 使用回数カウント
            if (card.usesPerWave) { activeCardUses[cardId] = (activeCardUses[cardId] || 0) + 1; const remainingUses = getRemainingUses(cardId); message += ` (残${remainingUses}/${getTotalUses(cardId)})`; console.log(`Used card ${cardId}. Remaining uses: ${remainingUses}`); }

            // ★★★★ 修正依頼1 関連: ダイス選択完了後の状態チェックと分岐 ★★★★
            setMessage(message); // 適用メッセージを先に表示
            await handlePostRollPlayerAction(); // ロール後と同じ処理を呼び出す
        }

         function getTotalUses(cardId) {
             const cardData = playerCards.find(c => c.id === cardId); const card = allCards.find(c => c.id === cardId); if (!cardData || !card || !card.usesPerWave) return Infinity; const level = cardData.level; let totalUses = 0;
             switch (card.id) { case 'ignoreMinBet': case 'changeToOne': case 'changeToSix': case 'giveUpEye': totalUses = level; break; case 'keepParentalRight': totalUses = (level >= 2) ? 2 : 1; break; case 'drawBonus': totalUses = (level >= 3) ? 3 : (level === 2 ? 2 : 1); break; case 'adjustEye': case 'avoid123_456': totalUses = (level >= 2) ? 2 : 1; break; case 'rewardAmplifier': case 'riskyBet': case 'zoroChanceUp': case 'blessingDice': case 'nextChance': totalUses = (level >= 3) ? 2 : 1; break; case 'stormWarning': case 'soulRoll': case 'doubleUpBet': case 'blindingDice': totalUses = 1; break; default: totalUses = card.usesPerWave || 1; console.warn(`Card ${cardId} usesPerWave might not be level dependent. Using base value: ${totalUses}`); break; } return totalUses;
         }

          function checkCardUsabilityInPostRoll(cardId) {
            const cardData = playerCards.find(c => c.id === cardId); const card = allCards.find(c => c.id === cardId); if (!cardData || !card || !card.usesPerWave) return false; const remainingUses = getRemainingUses(cardId); if (remainingUses <= 0) return false; if(isShowingRoleResult || isShowingGameResult || activeCardBeingUsed) return false; // ★ activeCardBeingUsed もチェック
            const isPlayerPostRollMenashi = playerHand?.type === '目なし'; const isPlayerPostRollEye = playerHand?.type === '目'; const isPlayerPostRollYakuOrEye = playerHand?.type === '役' || playerHand?.type === '目'; const isOutOfRolls = playerRollCount >= currentMaxRolls && stormWarningRerollsLeft <= 0;
            switch (card.id) { case 'changeToOne': case 'changeToSix': return true; case 'giveUpEye': return isPlayerPostRollMenashi && !giveUpEyeUsedThisTurn; case 'adjustEye': return isPlayerPostRollEye && !adjustEyeUsedThisTurn; case 'nextChance': return isPlayerPostRollEye && !nextChanceUsedThisTurn; case 'doubleUpBet': return isPlayerPostRollYakuOrEye && !isPlayerParent && !doubleUpBetActive; case 'blindingDice': return isPlayerPostRollYakuOrEye && isPlayerParent && !blindingDiceActive; case 'rewardAmplifier': return isPlayerPostRollYakuOrEye && !rewardAmplifierActive; case 'drawBonus': return isPlayerPostRollYakuOrEye && !drawBonusActive; case 'soulRoll': return isPlayerPostRollMenashi && isOutOfRolls && !soulRollUsedThisTurn; default: return false; }
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
                const source = data.source || 'unknown'; // 'buy', 'upgrade', 'pack_new', 'pack_upgrade', 'pack_max_level', 'pack_empty', 'pack_error', 'boost', 'initial'
                const level = data.level || 1;
                const packName = data.packName || '';

                // --- モーダルコンテンツ設定 ---
                let title = "アイテム獲得！";
                if (source.startsWith('pack')) title = `${packName} から出現！`;
                else if (source === 'upgrade') title = "カード強化完了！";
                else if (source === 'boost') title = "永続強化獲得！";

                // レアリティ取得 (カードとブーストのみ)
                const rarity = item.rarity || 1; // デフォルトは1
                const rarityClass = `rarity-${['normal', 'rare', 'epic', 'legendary'][rarity - 1] || 'normal'}`;
                const rarityText = ['N', 'R', 'EP', 'LG'][rarity - 1] || 'N';

                // タイプ取得 (カードのみ)
                let typeName = '';
                let typeClass = '';
                if (item.itemType === 'card' || allCards.find(c => c.id === item.id)) { // カード定義が存在するか確認
                    const cardDef = allCards.find(c => c.id === item.id);
                    if (cardDef) {
                        typeName = getCardTypeName(cardDef.type);
                        typeClass = `type-${cardDef.type}`;
                    }
                } else if (item.itemType === 'boost') {
                    typeName = '永続強化';
                    typeClass = 'type-boost'; // 仮のクラス
                } else if (item.itemType === 'pack') {
                    typeName = 'パック';
                    typeClass = 'type-pack'; // 仮のクラス
                }

                // モーダルコンテンツ要素に値を設定
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
                    itemRevealRarityEl.className = `rarity-badge ${rarityClass}`; // クラス名も更新
                }
                if(itemRevealTypeEl) {
                    itemRevealTypeEl.textContent = typeName;
                    itemRevealTypeEl.className = `type-badge ${typeClass}`; // クラス名も更新
                }

                // 説明文設定 (カードの場合は flavor テキスト優先)
                let description = item.flavor || item.description || '---'; // Flavorテキスト優先
                if (item.itemType === 'card' && !item.flavor) { // flavorがなければdescription (元々の挙動)
                     const cardDef = allCards.find(c => c.id === item.id);
                     if (cardDef) {
                         description = getUpgradeDescription(cardDef, level);
                     }
                }
                if(itemRevealDescriptionEl) {
                    itemRevealDescriptionEl.textContent = description;
                    // ★ 説明文のフォントサイズ調整
                    adjustDescriptionFontSize(itemRevealDescriptionEl, description.replace(/<[^>]*>?/gm, ''));
                }


                // レベル表示 (強化時またはパックからのアップグレード時)
                if(itemRevealLevelEl) {
                    if (source === 'upgrade' || source === 'pack_upgrade') {
                        itemRevealLevelEl.textContent = `Lv. ${level}`;
                        itemRevealLevelEl.style.display = 'block';
                    } else {
                        itemRevealLevelEl.style.display = 'none';
                    }
                }

                // モーダルコンテンツにレアリティクラスを設定
                if(itemRevealContent) {
                    itemRevealContent.className = `modal-content item-reveal-content ${rarityClass}`;
                }

                // --- 特殊ケースの表示調整 ---
                if (source === 'pack_empty') {
                    if(itemRevealNameEl) itemRevealNameEl.textContent = "空のパック";
                    if(itemRevealDescriptionEl) itemRevealDescriptionEl.textContent = "残念、何も入っていませんでした...";
                    if(itemRevealImageEl) itemRevealImageEl.style.display = 'none';
                    if(itemRevealPlaceholderEl) itemRevealPlaceholderEl.style.display = 'block';
                    if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'none';
                    if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'none';
                } else if (source === 'pack_max_level') {
                     if(itemRevealDescriptionEl) itemRevealDescriptionEl.textContent += "\n(既に最大レベルです)";
                } else if (source === 'pack_error') {
                    if(itemRevealNameEl) itemRevealNameEl.textContent = "エラー";
                    if(itemRevealDescriptionEl) itemRevealDescriptionEl.textContent = "カード情報の取得に失敗しました。";
                     if(itemRevealImageEl) itemRevealImageEl.style.display = 'none';
                     if(itemRevealPlaceholderEl) itemRevealPlaceholderEl.style.display = 'block';
                     if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'none';
                     if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'none';
                } else {
                    // 通常表示の場合はバッジ表示
                    if(itemRevealRarityEl) itemRevealRarityEl.style.display = 'inline-block';
                    if(itemRevealTypeEl) itemRevealTypeEl.style.display = 'inline-block';
                }

                // Promise を解決する関数 (モーダルを閉じ、resolve を呼ぶ)
                const closeModalAndResolve = () => {
                    itemRevealModal.style.display = 'none';
                    // イベントリスナーを削除 (複数回呼ばれるのを防ぐ)
                    confirmItemRevealButton.removeEventListener('click', closeModalAndResolve);
                    closeItemRevealModalButton.removeEventListener('click', closeModalAndResolve);
                    itemRevealModal.removeEventListener('click', modalOutsideClickHandler); // 外クリック用も削除
                    resolve(); // Promiseを解決
                };

                // モーダル外クリックハンドラ (内部で closeModalAndResolve を呼ぶ)
                const modalOutsideClickHandler = (event) => {
                    if (event.target === itemRevealModal) {
                        closeModalAndResolve();
                    }
                };

                // ボタンとモーダル外クリックにリスナーを設定
                // 既存のリスナーを削除してから追加 (念のため)
                confirmItemRevealButton.removeEventListener('click', closeModalAndResolve);
                closeItemRevealModalButton.removeEventListener('click', closeModalAndResolve);
                itemRevealModal.removeEventListener('click', modalOutsideClickHandler);

                confirmItemRevealButton.addEventListener('click', closeModalAndResolve, { once: true });
                closeItemRevealModalButton.addEventListener('click', closeModalAndResolve, { once: true });
                itemRevealModal.addEventListener('click', modalOutsideClickHandler); // 外クリックは once なし

                // モーダル表示
                itemRevealModal.style.display = 'flex';
            });
        }

        shopCloseButton.addEventListener('click', closeShop);
        if (shopRerollButton) shopRerollButton.addEventListener('click', handleReroll);
        if (shopOffersContainerEl) { shopOffersContainerEl.addEventListener('click', (event) => { const button = event.target.closest('.buy-button, .upgrade-button'); if (button && !button.disabled) { console.log("Shop item button clicked:", button.dataset.cardId || button.dataset.itemId); handleBuyCard(event); } }); } else { console.error(".shop-offers-container element not found for listener setup!"); }
        cancelDiscardButton.addEventListener('click', cancelDiscard);

       function setupCharacterSelectListeners() {
        console.log("Setting up character select listeners (Robust check)...");
        const selCharBtn = document.getElementById('select-character-button'); if (selCharBtn) { selCharBtn.removeEventListener('click', openCharacterSelectScreen); selCharBtn.addEventListener('click', openCharacterSelectScreen); } else { console.error("#select-character-button not found for listener."); }
        const backBtn = document.getElementById('back-to-title-button'); if (backBtn) { const backBtnClickHandler = () => { const confirmArea = document.getElementById('character-confirm-area'); if (confirmArea) confirmArea.style.display = 'none'; previewingCharacter = null; const list = document.getElementById('character-list'); if (list) { list.querySelectorAll('button.selected').forEach(btn => btn.classList.remove('selected')); } const modals = document.querySelectorAll('.modal'); modals.forEach(modal => { if (modal.id === 'dice-roll-modal') { hideDiceRollModal(); } else if(modal.style.display !== 'none') { modal.style.display = 'none'; } }); if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); } const gameScr = document.getElementById('game-screen'); if(gameScr) gameScr.classList.remove('dimmed'); permanentScoreBoost = 0; console.log("Returning to title from character select. permanentScoreBoost reset."); showScreen('title-screen'); }; backBtn.removeEventListener('click', backBtnClickHandler); backBtn.addEventListener('click', backBtnClickHandler); } else { console.error("#back-to-title-button not found for listener."); }
        const charList = document.getElementById('character-list'); if (charList) { charList.removeEventListener('click', handleCharacterSelect); charList.addEventListener('click', handleCharacterSelect); } else { console.error("#character-list not found for listener."); }
        const confirmYesBtn = document.getElementById('confirm-character-yes'); if (confirmYesBtn) { confirmYesBtn.removeEventListener('click', confirmCharacterSelection); confirmYesBtn.addEventListener('click', confirmCharacterSelection); } else { console.error("#confirm-character-yes not found for listener."); }
        const confirmNoBtn = document.getElementById('confirm-character-no'); if (confirmNoBtn) { const confirmNoBtnClickHandler = () => { const confirmArea = document.getElementById('character-confirm-area'); if (confirmArea) confirmArea.style.display = 'none'; const list = document.getElementById('character-list'); if (list) { const selectedBtn = list.querySelector('button.selected'); if (selectedBtn) selectedBtn.classList.remove('selected');} previewingCharacter = null; const previewImg = document.getElementById('character-preview-image'); if(previewImg) previewImg.style.display = 'none'; const previewPlaceholder = document.getElementById('character-preview-placeholder'); if(previewPlaceholder) { previewPlaceholder.style.display = 'block'; previewPlaceholder.textContent = '← リストから選択'; } const confirmMsg = document.getElementById('character-confirm-message'); if (confirmMsg) { confirmMsg.textContent = 'このキャラクターにしますか？'; confirmMsg.style.color = '#eee'; } const previewCard = document.getElementById('character-preview-card'); if (previewCard) previewCard.style.display = 'none'; }; confirmNoBtn.removeEventListener('click', confirmNoBtnClickHandler); confirmNoBtn.addEventListener('click', confirmNoBtnClickHandler); } else { console.error("#confirm-character-no not found for listener."); }
    }

    if (playerNameInput) { playerNameInput.addEventListener('change', (e) => { playerName = e.target.value.trim(); console.log("Player name updated to:", playerName); }); }

    function openCharacterSelectScreen() { console.log("Opening character select screen..."); showScreen('character-select-screen'); }
    function populateCharacterList() { const listEl = document.getElementById('character-list'); if (!listEl) { console.error("Character list element not found in populateCharacterList!"); return; } listEl.innerHTML = ''; console.log("Populating character list with:", characters); characters.forEach(char => { const button = document.createElement('button'); button.textContent = char.name; button.dataset.characterId = char.id; if (selectedCharacter && char.id === selectedCharacter.id) { button.classList.add('selected'); } listEl.appendChild(button); }); if (listEl.children.length === 0) { console.warn("Character list populated, but no child elements found."); const p = document.createElement('p'); p.textContent = "キャラクターリストを読み込めませんでした。"; p.style.color = 'red'; listEl.appendChild(p); } }
    function handleCharacterSelect(event) { const listEl = document.getElementById('character-list'); if (!listEl) return; if (event.target.tagName === 'BUTTON' && event.target.dataset.characterId) { const characterId = event.target.dataset.characterId; const char = characters.find(c => c.id === characterId); if (char) { previewingCharacter = char; displayCharacterPreview(char); listEl.querySelectorAll('button').forEach(btn => btn.classList.remove('selected')); event.target.classList.add('selected'); const confirmMsg = document.getElementById('character-confirm-message'); if (confirmMsg) { confirmMsg.textContent = 'このキャラクターにしますか？'; confirmMsg.style.color = '#eee'; } const yesBtn = document.getElementById('confirm-character-yes'); if (yesBtn) yesBtn.style.display = 'inline-block'; const noBtn = document.getElementById('confirm-character-no'); if (noBtn) noBtn.style.display = 'inline-block'; } } }
    function displayCharacterPreview(character) { const previewImg = document.getElementById('character-preview-image'); const previewPlaceholder = document.getElementById('character-preview-placeholder'); const confirmArea = document.getElementById('character-confirm-area'); const cardPreviewEl = document.getElementById('character-preview-card'); if (!previewImg || !previewPlaceholder || !confirmArea || !cardPreviewEl) { console.error("Required elements for character preview not found in displayCharacterPreview."); return; } if (character.image) { previewImg.src = character.image; previewImg.alt = character.name; previewImg.style.display = 'block'; previewPlaceholder.style.display = 'none'; previewImg.onerror = () => { previewImg.style.display = 'none'; previewPlaceholder.textContent = '画像読込失敗'; previewPlaceholder.style.display = 'block'; cardPreviewEl.style.display = 'none'; }; } else { previewImg.style.display = 'none'; previewPlaceholder.textContent = `${character.name} (画像なし)`; previewPlaceholder.style.display = 'block'; cardPreviewEl.style.display = 'none'; } let initialCardName = "なし"; if (character.initialCardPool && character.initialCardPool.length > 0) { initialCardName = character.initialCardPool.map(id => { const cardDef = allCards.find(card => card.id === id); return cardDef ? cardDef.name : "不明"; }).join(', '); } cardPreviewEl.textContent = `初期カード候補：${initialCardName}`; cardPreviewEl.style.display = 'block'; confirmArea.style.display = 'block'; }
    function confirmCharacterSelection() { if (previewingCharacter) { selectedCharacter = previewingCharacter; playerName = selectedCharacter.name; if(playerNameInput) playerNameInput.value = playerName; console.log("Character selected:", selectedCharacter.name); if (characterConfirmMessageEl) { characterConfirmMessageEl.textContent = `「${selectedCharacter.name}」に変更しました！`; characterConfirmMessageEl.style.color = '#90ee90'; } if(confirmCharacterYesButton) confirmCharacterYesButton.style.display = 'none'; if(confirmCharacterNoButton) confirmCharacterNoButton.style.display = 'none'; } }

        function initializeGame() {
            console.log("Initializing game setup..."); const hideAllModalsAndOverlays = () => { console.log("Hiding all modals and overlays..."); const modals = document.querySelectorAll('.modal'); modals.forEach(modal => { if (modal.id === 'dice-roll-modal') { hideDiceRollModal(); } else if(modal.style.display !== 'none') { modal.style.display = 'none'; } }); if (diceChoiceOverlay && diceChoiceOverlay.style.display !== 'none') { hideDiceChoiceOverlay(); } if(gameScreen) gameScreen.classList.remove('dimmed'); }; document.querySelectorAll('.screen').forEach(s => { s.classList.remove('active'); s.style.display = 'none'; }); hideAllModalsAndOverlays(); permanentScoreBoost = 0; console.log("Initializing game. permanentScoreBoost reset."); showScreen('title-screen'); console.log("Game setup initialized. Showing title screen.");
        }
        initializeGame();
        setupCharacterSelectListeners();

        if (closeItemRevealModalButton) { closeItemRevealModalButton.addEventListener('click', () => { if (itemRevealModal) itemRevealModal.style.display = 'none'; }); }
        if (confirmItemRevealButton) { confirmItemRevealButton.addEventListener('click', () => { if (itemRevealModal) itemRevealModal.style.display = 'none'; }); }

    }); // === DOMContentLoaded END ===
// ===== END OF script.js =====